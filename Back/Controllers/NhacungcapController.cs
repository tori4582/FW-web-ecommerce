
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
    [Authorize(Roles = "ADMINISTRATOR, STAFF")]
    public class NhacungcapController : Controller
    {
        private readonly ILogger<NhacungcapController> _logger;
        private readonly IWebHostEnvironment _env;

        private readonly lavenderContext lavenderContext;

        public NhacungcapController(ILogger<NhacungcapController> logger, IWebHostEnvironment env, lavenderContext lavenderContext)
        {
            _logger = logger;
            _env = env;
            this.lavenderContext = lavenderContext;
        }


        [Route("/tatca-nhacungcap")]
        [HttpGet]
        public async Task<IActionResult> AllStaff()
        {
            var nhacungcaplist = await (from n in lavenderContext.Nhacungcap
                                      orderby n.Manhacungcap ascending
                                      select n).ToListAsync();
            return StatusCode(200, Json(nhacungcaplist));
        }

        [Route("/them-nhacungcap")]
        [HttpPost]
        public async Task<IActionResult> AddStaff([FromForm] string tennhacungcap, [FromForm] string email,
            [FromForm] string sodienthoai, [FromForm] string diachi, [FromForm] IFormFile image)
        {
            Nhacungcap s = new Nhacungcap();
            s.Tennhacungcap = tennhacungcap;
            s.Email = email;
            s.Sodienthoai = sodienthoai;
            s.Diachi = diachi;
            s.Image = "/nhacungcap";
           

            await lavenderContext.AddAsync(s);
            await lavenderContext.SaveChangesAsync();

            Nhacungcap temp = await (from n in lavenderContext.Nhacungcap
                                     orderby n.Manhacungcap descending
                                   select n).FirstAsync();

            if (image == null || image.Length == 0) return StatusCode(200, Json(s));

            string NewDir = _env.ContentRootPath + "/wwwroot/nhacungcap" ;

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
                    img.Save(_env.ContentRootPath + "/wwwroot/nhacungcap/" + temp.Manhacungcap + ".Jpeg", ImageFormat.Jpeg);
                }
            }
            return StatusCode(200, Json(s));
        }

        [Route("/sua-nhacungcap")]
        [HttpPost]
        public async Task<IActionResult> EditStaff([FromForm] int manhacungcap, [FromForm] string tennhacungcap, [FromForm] string email,
       [FromForm] string sodienthoai, [FromForm] string diachi, [FromForm] IFormFile image)
        {
            Nhacungcap s = await (from n in lavenderContext.Nhacungcap
                                  where n.Manhacungcap==manhacungcap
                                   select n).FirstAsync();
            s.Tennhacungcap = tennhacungcap;
            s.Email = email;
            s.Sodienthoai = sodienthoai;
            s.Diachi = diachi;
            s.Image = "/nhacungcap";

            await lavenderContext.SaveChangesAsync();

            

            if (image == null || image.Length == 0) return StatusCode(200, Json(s));

            string NewDir = _env.ContentRootPath + "/wwwroot/nhacungcap";

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
                    img.Save(_env.ContentRootPath + "/wwwroot/nhacungcap/" + s.Manhacungcap + ".Jpeg", ImageFormat.Jpeg);
                }
            }
            return StatusCode(200, Json(s));
        }

        [Route("/xoa-nhacungcap")]
        [HttpDelete]
        public async Task<IActionResult> DeleteStaff(int manhacungcap)
        {
            var s = await lavenderContext.Nhacungcap.SingleAsync(x => x.Manhacungcap == manhacungcap);
            lavenderContext.Remove(s);
            string path = _env.ContentRootPath + "/wwwroot/nhacungcap/" + s.Manhacungcap + ".Jpeg";
            if (System.IO.File.Exists(path))
            {
                System.IO.File.Delete(path);
            }
            await lavenderContext.SaveChangesAsync();
            return StatusCode(200, Json(manhacungcap));
        }
    }

}



