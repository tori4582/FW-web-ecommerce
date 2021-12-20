using System;
using System.Collections;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Back.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
namespace Back.Controllers
{
    // [EnableCors(origins: "*", headers: "accept,content-type,origin,x-my-header", methods: "*")]
    [ApiController]
    public class CustomerController : Controller
    {
        private readonly ILogger<CustomerController> _logger;
        private readonly IWebHostEnvironment _env;

        private readonly lavenderContext lavenderContext;

        public CustomerController(ILogger<CustomerController> logger, IWebHostEnvironment env, lavenderContext lavenderContext)
        {
            _logger = logger;
            _env = env;
            this.lavenderContext = lavenderContext;
        }

        [Route("/tim-khachhang-theo-sohoadon")]
       [Authorize(Roles = "ADMINISTRATOR, STAFF")]
        [HttpGet]
        public async Task<IActionResult> FindCustomerByBillId(int sohoadon)
        {
            var customerid = await (from h in lavenderContext.Hoadon
                                    where h.Sohoadon == sohoadon
                                    select h.Makhachhang).FirstOrDefaultAsync();

            var customer = await (from k in lavenderContext.Khachhang
                                  where k.Makhachhang == customerid
                                  select k).FirstOrDefaultAsync();
            return StatusCode(200, Json(customer));
        }

        [Route("/tatca-khachhang")]
       [Authorize(Roles = "ADMINISTRATOR, STAFF")]
        [HttpGet]
        public async Task<IActionResult> AllKhachhang()
        {
            var khachhangs = await (from k in lavenderContext.Khachhang
                                    select k).ToListAsync();
            if (khachhangs == null || khachhangs.Count() == 0) return StatusCode(404);
            return StatusCode(200, Json(khachhangs));
        }

        [Route("/khachhang/thaydoi")]
        [Authorize]
        [HttpPut]
        public async Task<IActionResult> ThayDoiThongTin(JsonElement json)
        {
            Khachhang khachhang = await lavenderContext.Khachhang.SingleOrDefaultAsync(x => x.Makhachhang == int.Parse(json.GetString("makhachhang")));
            if (khachhang == null) return StatusCode(404);

            khachhang.Tenkhachhang = json.GetString("hovaten");
            khachhang.Diachi = json.GetString("diachi");
            khachhang.Ngaysinh= DateTime.Parse(json.GetString("ngaysinh")).ToLocalTime();
            await lavenderContext.SaveChangesAsync();

            return StatusCode(200);
            
        }

        [Route("/tim-khachhang-theo-makhachhang")]
        [HttpGet]
        public async Task<IActionResult> TimKhachangTheoMakhachhang(int makhachhang)
        {
            var khachhang = await lavenderContext.Khachhang.SingleOrDefaultAsync(x => x.Makhachhang == makhachhang);
            return StatusCode(200, Json(khachhang));
        }

        [Route("/khachhang/thaydoi/sdt")]
        [Authorize]
        [HttpPut]
        public async Task<IActionResult> ThayDoiSDT(JsonElement json)
        {
            Khachhang khachhang = await lavenderContext.Khachhang.SingleOrDefaultAsync(x => x.Makhachhang == int.Parse(json.GetString("makhachhang")));
            if (khachhang == null) return StatusCode(404);
            khachhang.Sodienthoai = json.GetString("sdt");
            await lavenderContext.SaveChangesAsync();
            return StatusCode(200);
        }

        [Route("/khachhang/thaydoi/email")]
        [Authorize]
        [HttpPut]
        public async Task<IActionResult> ThayDoiEmail(JsonElement json)
        {
            Khachhang khachhang = await lavenderContext.Khachhang.SingleOrDefaultAsync(x => x.Makhachhang == int.Parse(json.GetString("makhachhang")));
            if (khachhang == null) return StatusCode(404);
            khachhang.Email = json.GetString("email");
            await lavenderContext.SaveChangesAsync();
            return StatusCode(200);
        }

        [Route("/them-khachhang")]
       [Authorize(Roles = "ADMINISTRATOR, STAFF")]
        [HttpPost]
        public async Task<IActionResult> AddStaff([FromForm] string tenkhachhang, [FromForm] string email,
            [FromForm] string sodienthoai, [FromForm] string diachi, [FromForm] IFormFile image,
            [FromForm] string cccd, [FromForm] string ngaysinh, [FromForm] string loaikhachhang)
         {
            Khachhang s = new Khachhang();
            s.Tenkhachhang = tenkhachhang;
            s.Email = email;
            s.Sodienthoai = sodienthoai;
            s.Diachi = diachi;
            s.Cccd = cccd;
            s.Ngaysinh = DateTime.Parse(ngaysinh).ToLocalTime();
            s.Loaikhachhang = loaikhachhang;
            s.Image = "/khachhang";


            await lavenderContext.AddAsync(s);
            await lavenderContext.SaveChangesAsync();

            Khachhang temp = await (from n in lavenderContext.Khachhang
                                   orderby n.Makhachhang descending
                                   select n).FirstAsync();

            if (image == null || image.Length == 0) return StatusCode(200, Json(s));

            string NewDir = _env.ContentRootPath + "/wwwroot/khachhang";

            if (!Directory.Exists(NewDir))
            {
                // Create the directory.
                Directory.CreateDirectory(NewDir);
            }
            using (var memoryStream = new MemoryStream())
            {
                await image.CopyToAsync(memoryStream);
                using (var img = Image.FromStream(memoryStream))
                {
                    // TODO: ResizeImage(img, 100, 100);
                    img.Save(_env.ContentRootPath + "/wwwroot/khachhang/" + temp.Makhachhang + ".Jpeg", ImageFormat.Jpeg);
                }
            }
            return StatusCode(200, Json(s));
        }

        [Route("/sua-khachhang")]
       [Authorize(Roles = "ADMINISTRATOR, STAFF")]
        [HttpPost]
        public async Task<IActionResult> EditStaff([FromForm] int makhachhang, [FromForm] string tenkhachhang, [FromForm] string email,
       [FromForm] string sodienthoai, [FromForm] string diachi, [FromForm] IFormFile image,
       [FromForm] string cccd, [FromForm] string ngaysinh, [FromForm] string loaikhachhang)
        {
            Khachhang s = await (from n in lavenderContext.Khachhang
                                 where n.Makhachhang == makhachhang
                                select n).FirstAsync();
            s.Tenkhachhang = tenkhachhang;
            s.Email = email;
            s.Sodienthoai = sodienthoai;
            s.Diachi = diachi;
            s.Cccd = cccd;
            s.Ngaysinh = DateTime.Parse(ngaysinh).ToLocalTime();
            s.Loaikhachhang = loaikhachhang;
            s.Image = "/khachhang";

            await lavenderContext.SaveChangesAsync();



            if (image == null || image.Length == 0) return StatusCode(200, Json(s));

            string NewDir = _env.ContentRootPath + "/wwwroot/khachhang";

            if (!Directory.Exists(NewDir))
            {
                // Create the directory.
                Directory.CreateDirectory(NewDir);
            }
            using (var memoryStream = new MemoryStream())
            {
                await image.CopyToAsync(memoryStream);
                using (var img = Image.FromStream(memoryStream))
                {
                    // TODO: ResizeImage(img, 100, 100);
                    img.Save(_env.ContentRootPath + "/wwwroot/khachhang/" + s.Makhachhang + ".Jpeg", ImageFormat.Jpeg);
                }
            }
            return StatusCode(200, Json(s));
        }

        [Route("/xoa-khachhang")]
       [Authorize(Roles = "ADMINISTRATOR, STAFF")]
        [HttpDelete]
        public async Task<IActionResult> DeleteStaff(int makhachhang)
        {
            var s = await lavenderContext.Khachhang.SingleAsync(x => x.Makhachhang == makhachhang);
            lavenderContext.Remove(s);
            string path = _env.ContentRootPath + "/wwwroot/khachhang/" + s.Makhachhang + ".Jpeg";
            if (System.IO.File.Exists(path))
            {
                System.IO.File.Delete(path);
            }
            await lavenderContext.SaveChangesAsync();
            return StatusCode(200, Json(makhachhang));
        }

        [Route("/hoadon-dagiao-theo-makhachhang")]
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> HoadonDagiao(int makhachhang)
        {
            var listsohoadon = await (from k in lavenderContext.Hoadon
                                  where k.Makhachhang == makhachhang
                                  select k.Sohoadon).ToListAsync();
            var listhoadon = new List<Hoadon>();
            foreach( var i in listsohoadon)
            {
                var hoadontemp = await (from h in lavenderContext.Hoadon
                                            join v in lavenderContext.Vanchuyen
                                            on h.Sohoadon equals v.Sohoadon
                                            where h.Sohoadon==i
                                            && v.Trangthai.Equals("Đã giao")
                                            select h).FirstOrDefaultAsync();
                if (hoadontemp!=null) listhoadon.Add(hoadontemp);
            }
            
            listhoadon.Distinct().ToList();
            return StatusCode(200, Json(listhoadon));
        }
    }

}



