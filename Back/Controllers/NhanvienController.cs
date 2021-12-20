
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
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System.Drawing;
using System.Drawing.Imaging;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;

namespace Back.Controllers
{

    // [EnableCors(origins: "*", headers: "accept,content-type,origin,x-my-header", methods: "*")]
    [ApiController]
    [Authorize(Roles = "ADMINISTRATOR")]
    public class NhanvienController : Controller
    {
        private readonly ILogger<NhanvienController> _logger;
        private readonly IWebHostEnvironment _env;

        private readonly lavenderContext lavenderContext;

        public NhanvienController(ILogger<NhanvienController> logger, IWebHostEnvironment env, lavenderContext lavenderContext)
        {
            _logger = logger;
            _env = env;
            this.lavenderContext = lavenderContext;
        }

        [Route("/tatca-nhanvien")]
        [HttpGet]
        public async Task<IActionResult> AllStaff()
        {
            var nhanvienlist = await (from n in lavenderContext.Nhanvien
                                      orderby n.Manhanvien ascending
                                      select n).ToListAsync();
            return StatusCode(200, Json(nhanvienlist));
        }

        [Route("/them-nhanvien")]
        [HttpPost]
        public async Task<IActionResult> AddStaff([FromForm] string tennhanvien, [FromForm] string email,
            [FromForm] string sodienthoai, [FromForm] string diachi, [FromForm] string ngayvaolam, [FromForm] IFormFile image,
            [FromForm] string cccd, [FromForm] string ngaysinh, [FromForm] string chucvu)
        {
            Nhanvien s = new Nhanvien();
            s.Tennhanvien = tennhanvien;
            s.Email = email;
            s.Sodienthoai = sodienthoai;
            s.Diachi = diachi;
            s.Ngayvaolam = DateTime.Parse(ngayvaolam).ToLocalTime();
            s.Cccd = cccd;
            s.Ngaysinh = DateTime.Parse(ngaysinh).ToLocalTime();
            s.Chucvu = chucvu;
            s.Image = "/nhanvien";
           

            await lavenderContext.AddAsync(s);
            await lavenderContext.SaveChangesAsync();

            Nhanvien temp = await (from n in lavenderContext.Nhanvien
                                   orderby n.Manhanvien descending
                                   select n).FirstAsync();

            if (image == null || image.Length == 0) return StatusCode(200, Json(s));

            string NewDir = _env.ContentRootPath + "/wwwroot/nhanvien" ;

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
                    img.Save(_env.ContentRootPath + "/wwwroot/nhanvien/" + temp.Manhanvien + ".Jpeg", ImageFormat.Jpeg);
                }
            }
            return StatusCode(200, Json(s));
        }

        [Route("/sua-nhanvien")]
        [HttpPost]
        public async Task<IActionResult> EditStaff([FromForm] int manhanvien, [FromForm] string tennhanvien, [FromForm] string email,
       [FromForm] string sodienthoai, [FromForm] string diachi, [FromForm] string ngayvaolam, [FromForm] IFormFile image,
       [FromForm] string cccd, [FromForm] string ngaysinh, [FromForm] string chucvu)
        {
            Nhanvien s = await (from n in lavenderContext.Nhanvien
                                where n.Manhanvien==manhanvien
                                   select n).FirstAsync();
            s.Tennhanvien = tennhanvien;
            s.Email = email;
            s.Sodienthoai = sodienthoai;
            s.Diachi = diachi;
            s.Ngayvaolam = DateTime.Parse(ngayvaolam).ToLocalTime();
            s.Cccd = cccd;
            s.Ngaysinh = DateTime.Parse(ngaysinh).ToLocalTime();
            s.Chucvu = chucvu;
            s.Image = "/nhanvien";

            await lavenderContext.SaveChangesAsync();

            

            if (image == null || image.Length == 0) return StatusCode(200, Json(s));

            string NewDir = _env.ContentRootPath + "/wwwroot/nhanvien";

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
                    img.Save(_env.ContentRootPath + "/wwwroot/nhanvien/" + s.Manhanvien + ".Jpeg", ImageFormat.Jpeg);
                }
            }
            return StatusCode(200, Json(s));
        }

        [Route("/xoa-nhanvien")]
        [HttpDelete]
        public async Task<IActionResult> DeleteStaff(int manhanvien)
        {
            var s = await lavenderContext.Nhanvien.SingleAsync(x => x.Manhanvien == manhanvien);
            lavenderContext.Remove(s);
            string path = _env.ContentRootPath + "/wwwroot/nhanvien/" + s.Manhanvien + ".Jpeg";
            if (System.IO.File.Exists(path))
            {
                System.IO.File.Delete(path);
            }
            await lavenderContext.SaveChangesAsync();
            return StatusCode(200, Json(manhanvien));
        }
    }

}



