
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

    public class DanhgiaController : Controller
    {
        private readonly ILogger<DanhgiaController> _logger;
        private readonly IWebHostEnvironment _env;

        private readonly lavenderContext lavenderContext;

        public DanhgiaController(ILogger<DanhgiaController> logger, IWebHostEnvironment env, lavenderContext lavenderContext)
        {
            _logger = logger;
            _env = env;
            this.lavenderContext = lavenderContext;
        }

        [Route("/them-danhgia")]
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddEvaluete([FromForm] string binhluan, [FromForm] int sao,
            [FromForm] IFormFile image,[FromQuery] int makhachhang, [FromQuery] int masanpham)
        {
            Danhgia s = new Danhgia();
            s.Makhachhang = makhachhang;
            s.Masanpham = masanpham;
            s.Noidung = binhluan;
            s.Sosao = sao;
            s.Thoigian = DateTime.Now.ToLocalTime();

            await lavenderContext.AddAsync(s);
            await lavenderContext.SaveChangesAsync();

            Danhgia temp = await (from n in lavenderContext.Danhgia
                                  where n.Makhachhang==makhachhang
                                  && n.Masanpham==masanpham
                                    orderby n.Madanhgia descending
                                    select n).FirstAsync();
          
            if (image == null || image.Length == 0) return StatusCode(200, Json(s));
            temp.Image = "/danhgia" ;
            await lavenderContext.SaveChangesAsync();
            string NewDir = _env.ContentRootPath + "/wwwroot/danhgia";
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
                    img.Save(_env.ContentRootPath+ "/wwwroot" +temp.Image+ ".Jpeg", ImageFormat.Jpeg);
                }
            }
            return StatusCode(200, Json(s));
        }

        [Route("/xem-danhgia")]
        [HttpGet]
        public async Task<IActionResult> XemDanhgia(int masanpham)
        {
            var listdanhgia = await (from d in lavenderContext.Danhgia
                                     where d.Masanpham == masanpham
                                     select d).ToListAsync();
            return StatusCode(200, Json(listdanhgia));
        }

        [Route("/danhgia-theo-masanpham")]
        [HttpGet]
        public async Task<IActionResult> DanhgiaTheoMasanpham(int masanpham)
        {
            var listdanhgia = await (from d in lavenderContext.Danhgia
                                     where d.Masanpham == masanpham
                                     select d).ToListAsync();
            if (listdanhgia == null || listdanhgia.Count()==0) return StatusCode(200, Json(new { trungbinh = 0, sodanhgia = 0 }));
            double avg = listdanhgia.Average(x=>x.Sosao);
            return StatusCode(200, Json(new { trungbinh = avg, sodanhgia = listdanhgia.Count()}));
        }

    }

}