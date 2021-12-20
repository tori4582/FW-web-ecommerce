using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Back.Models;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using Microsoft.AspNetCore.Authentication;
using Back.ModelDTO;
using Microsoft.AspNetCore.Authorization;

namespace Back.Controllers
{
    // [EnableCors(origins: "*", headers: "accept,content-type,origin,x-my-header", methods: "*")]

    [ApiController]

    //[Authorize(Roles = "STAFF")]
    public class HoadonController : Controller
    {
        private readonly ILogger<HoadonController> _logger;
        lavenderContext lavenderContext;

        public HoadonController(ILogger<HoadonController> logger, lavenderContext lavenderContext)
        {
            _logger = logger;
            this.lavenderContext = lavenderContext;
        }

        [Authorize(Roles = "ADMINISTRATOR, STAFF")]
        [Route("/twenty-hoadon")]
        [HttpGet]
        public async Task<IActionResult> TwentyHoadon()
        {
            var hoadonlist = await (from h in lavenderContext.Hoadon
                                    select h).OrderByDescending(x => x.Ngayhoadon).Take(20).ToListAsync();
            if (hoadonlist.Count == 0) return StatusCode(404);
            return StatusCode(200, Json(hoadonlist));
        }

        [Authorize(Roles = "ADMINISTRATOR, STAFF")]
        [Route("/hoa-don-dang-xu-ly")]
        [HttpGet]
        public async Task<IActionResult> ProcessingBilling()
        {
            var hoadonlist = await (from h in lavenderContext.Hoadon
                                    select h).OrderByDescending(x => x.Ngayhoadon).Take(20).ToListAsync();
            if (hoadonlist == null || hoadonlist.Count() == 0) return StatusCode(404);
            var newlist = new List<Hoadon>();
            foreach (var i in hoadonlist)
            {

                var e = lavenderContext.Entry(i);
                await e.Collection(x => x.Vanchuyens).LoadAsync();
                if (!i.Vanchuyens.ElementAt(0).Trangthai.Equals("Đang xử lý"))
                    continue;
                newlist.Add(i);
            }
            return StatusCode(200, Json(newlist));
        }

        [Authorize(Roles = "ADMINISTRATOR, STAFF")]
        [Route("/doanh-thu-theo-thang")]
        [HttpGet]
        public async Task<IActionResult> DoanhThuTheoThang([FromQuery] int thang, int nam)
        {

            var hoadonlist = await (from h in lavenderContext.Hoadon
                                        //where h.Ngayhoadon.Month.ToString().Equals(thang.ToString())
                                        //&& h.Ngayhoadon.Year.ToString().Equals(nam.ToString())
                                    select h).ToListAsync();

            if (hoadonlist == null || hoadonlist.Count == 0) return StatusCode(200, Json(new { tongtien = 0 }));
            var newlist = new List<Hoadon>();
            foreach (var i in hoadonlist)
            {
                if (((DateTime)i.Ngayhoadon).Month == thang && ((DateTime)i.Ngayhoadon).Year == nam)
                    newlist.Add(i);
            }
            if (newlist == null || newlist.Count == 0) return StatusCode(200, Json(new { tongtien = 0 }));

            var tongtien = newlist.Sum(h => h.Tongtien);
            //return StatusCode(200, Json(new {tongtien = tongtien}) );
            return StatusCode(200, Json(new { tongtien = tongtien }));

        }

        [Authorize(Roles = "ADMINISTRATOR, STAFF")]
        [Route("/them-sua-hoa-don")]
        [HttpPost]
        public async Task<IActionResult> AddOrUpdateHoadon(JsonElement json)
        {
            var sohoadon = int.Parse(json.GetString("sohoadon"));
            var makhachhang = int.Parse(json.GetString("makhachhang"));
            var makhuyenmai = int.Parse(json.GetString("makhuyenmai"));
            var ngayhoadon = DateTime.Parse(json.GetString("ngayhoadon")).ToLocalTime();
            var manhanvien = int.Parse(json.GetString("manhanvien"));
            var tongtien = int.Parse(json.GetString("tongtien"));
            Chitiethoadon[] chitiethoadons = Newtonsoft.Json.JsonConvert.DeserializeObject<Chitiethoadon[]>(json.GetString("chitiethoadon"));

            Hoadon temp = new Hoadon();
            if (sohoadon != 0)
            {
                temp.Sohoadon = sohoadon;
            }
            temp.Makhachhang = makhachhang;
            temp.Makhuyenmai = makhuyenmai;
            temp.Ngayhoadon = ngayhoadon;
            temp.Manhanvien = manhanvien;
            temp.Tongtien = tongtien;

            Hoadon hoadon = null;

            if (temp.Sohoadon != null)
            {
                hoadon = await lavenderContext.Hoadon.SingleOrDefaultAsync(b => b.Sohoadon == temp.Sohoadon);
                hoadon.Makhachhang = temp.Makhachhang;
                hoadon.Makhuyenmai = temp.Makhuyenmai;
                hoadon.Ngayhoadon = temp.Ngayhoadon;
                hoadon.Manhanvien = temp.Manhanvien;
                hoadon.Tongtien = temp.Tongtien;
                await lavenderContext.SaveChangesAsync();

            }
            else
            {
                await lavenderContext.AddAsync(temp);
                await lavenderContext.SaveChangesAsync();
                hoadon = await (from h in lavenderContext.Hoadon
                                select h).OrderByDescending(x => x.Ngayhoadon).FirstOrDefaultAsync();

            }

            foreach (var i in chitiethoadons)
            {
                var chitiet = await (from c in lavenderContext.Chitiethoadon
                                     where c.Sohoadon == hoadon.Sohoadon
                                     && c.Imei == i.Imei
                                     select c).FirstOrDefaultAsync();
                if (chitiet != null)
                {
                    chitiet.Tien = i.Tien;
                }
                else
                {
                    i.Sohoadon = (int)hoadon.Sohoadon;
                    await lavenderContext.AddAsync(i);
                }
                await lavenderContext.SaveChangesAsync();
            }
            return StatusCode(200);

        }


        [Route("/xoa-hoadon")]
        [Authorize(Roles = "ADMINISTRATOR, STAFF")]
        [HttpDelete]
        public async Task<IActionResult> DeleteBill(int sohoadon)
        {
            var chitiethoadons = await (from c in lavenderContext.Chitiethoadon
                                        where c.Sohoadon == sohoadon
                                        select c).ToListAsync();
            foreach (var i in chitiethoadons)
            {
                lavenderContext.Remove(i);
            }
            await lavenderContext.SaveChangesAsync();

            var vanchuyens = await (from v in lavenderContext.Vanchuyen
                                    where v.Sohoadon == sohoadon
                                    select v).ToListAsync();
            foreach (var i in vanchuyens)
            {
                lavenderContext.Remove(i);
            }

            await lavenderContext.SaveChangesAsync();
            Hoadon hoadon = await lavenderContext.Hoadon.SingleOrDefaultAsync(x => x.Sohoadon == sohoadon);
            if (hoadon != null)
            {
                lavenderContext.Remove(hoadon);
                await lavenderContext.SaveChangesAsync();
            }


            return StatusCode(200);
        }
    }
       
}
