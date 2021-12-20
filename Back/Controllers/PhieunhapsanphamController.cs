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
using Microsoft.AspNetCore.Authorization;

namespace Back.Controllers
{
    // [EnableCors(origins: "*", headers: "accept,content-type,origin,x-my-header", methods: "*")]

    [ApiController]
    [Authorize(Roles = "ADMINISTRATOR, STAFF")]
    public class PhieunhapsanphamController : Controller
    {
        private readonly ILogger<PhieunhapsanphamController> _logger;
        lavenderContext lavenderContext;

        public PhieunhapsanphamController(ILogger<PhieunhapsanphamController> logger, lavenderContext lavenderContext)
        {
            _logger = logger;
            this.lavenderContext = lavenderContext;
        }

       

        [Route("/them-sua-phieu-nhap")]
        [HttpPost]
        public async Task<IActionResult> AddOrUpdatePhieunhapsanpham(JsonElement json)
        {
            var maphieunhap = int.Parse(json.GetString("maphieunhap"));
            var masanpham = int.Parse(json.GetString("masanpham"));
            var manhacungcap = int.Parse(json.GetString("manhacungcap"));
            var soluongnhap = int.Parse(json.GetString("soluongnhap"));
            var ngaynhap = DateTime.Parse(json.GetString("ngaynhap")).ToLocalTime();
            var tiennhap = int.Parse(json.GetString("tiennhap"));
            var ghichu = json.GetString("ghichu");

            Phieunhapsanpham temp = new Phieunhapsanpham();
            if (maphieunhap != 0)
            {
                temp.Maphieunhap = maphieunhap;
            }
            temp.Masanpham = masanpham;
            temp.Manhacungcap = manhacungcap;
            temp.Soluongnhap = soluongnhap;
            temp.Ngaynhap = ngaynhap;
            temp.Tiennhap = tiennhap;
           
            temp.Ghichu = ghichu;
            Phieunhapsanpham phieunhapsanpham = null;

            if (temp.Maphieunhap != null)
            {
                phieunhapsanpham = await lavenderContext.Phieunhapsanpham.SingleOrDefaultAsync(b => b.Maphieunhap == temp.Maphieunhap);
                phieunhapsanpham.Masanpham = temp.Masanpham;
                phieunhapsanpham.Manhacungcap = temp.Manhacungcap;
                phieunhapsanpham.Soluongnhap = temp.Soluongnhap;
                phieunhapsanpham.Ngaynhap = temp.Ngaynhap;
                phieunhapsanpham.Tiennhap = temp.Tiennhap;
                phieunhapsanpham.Ghichu = temp.Ghichu;
                await lavenderContext.SaveChangesAsync();

            }
            else
            {
                await lavenderContext.AddAsync(temp);
                await lavenderContext.SaveChangesAsync();
            }
            return StatusCode(200);
        }

        [Route("/xoa-phieunhap")]
        [HttpDelete]
        public async Task<IActionResult> DeleteNote(int maphieunhap)
        {
            var phieunhapsanpham = await lavenderContext.Phieunhapsanpham.SingleOrDefaultAsync(p => p.Maphieunhap == maphieunhap);
            if (phieunhapsanpham == null) return StatusCode(404);
            lavenderContext.Remove(phieunhapsanpham);
            await lavenderContext.SaveChangesAsync();
            return StatusCode(200);
        }

    }
}
