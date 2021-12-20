using System;
using System.Collections;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Back.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
namespace Back.Controllers
{
    // [EnableCors(origins: "*", headers: "accept,content-type,origin,x-my-header", methods: "*")]
    [ApiController]

    public class KhuyenmaicuatoiController : Controller
    {
        private readonly ILogger<KhuyenmaicuatoiController> _logger;
        private readonly IWebHostEnvironment _env;

        private readonly lavenderContext lavenderContext;

        public KhuyenmaicuatoiController(ILogger<KhuyenmaicuatoiController> logger, IWebHostEnvironment env, lavenderContext lavenderContext)
        {
            _logger = logger;
            _env = env;
            this.lavenderContext = lavenderContext;
        }

      

        [Route("/khuyenmai")]
        [HttpGet]
        public async Task<IActionResult> Khuyenmai(int makhuyenmai)
        {
            var khuyenmai = await lavenderContext.Khuyenmai.SingleAsync(x => x.Makhuyenmai == makhuyenmai);
            if (khuyenmai == null) return StatusCode(404);
            return StatusCode(200, Json(khuyenmai));
        }

        [Route("/kiemtramakhuyenmai")]
        [HttpGet]
        public async Task<IActionResult> Kiemtrakhuyenmai (int makhuyenmai)
        {
            DateTime now = DateTime.Now;
            var khuyenmai = await lavenderContext.Khuyenmai.SingleOrDefaultAsync(x => x.Makhuyenmai == makhuyenmai);
            if (khuyenmai == null) return StatusCode(200, Json(new { ketqua= false}));
            if (khuyenmai.Ngaybatdau> now || khuyenmai.Ngayketthuc<now) StatusCode(200, Json(new { ketqua = false }));
            return StatusCode(200, Json(khuyenmai));
        }

        [Route("/khuyenmai-hientai")]
        [HttpGet]
        public async Task<IActionResult> KhuyenmaiHientai()
        {
            DateTime now = DateTime.Now;
            var khuyenmai = await (from x in lavenderContext.Khuyenmai
                                   where x.Ngaybatdau <= now && x.Ngayketthuc >= now
                                   select x).ToListAsync();
            return StatusCode(200, Json(khuyenmai));
        }

        [Route("/tatca-khuyenmai")]
        [HttpGet]
        public async Task<IActionResult> AllPromotion()
        {
            var khuyenmailist = await (from n in lavenderContext.Khuyenmai
                                              orderby n.Makhuyenmai ascending
                                              select n).ToListAsync();
            return StatusCode(200, Json(khuyenmailist));
        }

        [Route("/them-khuyenmai")]
        [HttpPost]
        public async Task<IActionResult> AddPromotion([FromForm] string tenkhuyenmai, [FromForm] float tilekhuyenmai,
            [FromForm] string ngaybatdau, [FromForm] string ngayketthuc, [FromForm] string dieukien)
        {
            Khuyenmai s = new Khuyenmai();
            s.Tenkhuyenmai = tenkhuyenmai;
            s.Tilekhuyenmai = tilekhuyenmai;
            s.Ngaybatdau = DateTime.Parse(ngaybatdau).ToLocalTime();
            s.Ngayketthuc = DateTime.Parse(ngayketthuc).ToLocalTime(); ;
            s.Dieukien = dieukien;

            await lavenderContext.AddAsync(s);
            await lavenderContext.SaveChangesAsync();

            Khuyenmai temp = await (from n in lavenderContext.Khuyenmai
                                           orderby n.Makhuyenmai descending
                                           select n).FirstAsync();
            return StatusCode(200, Json(s));
        }

        [Route("/sua-khuyenmai")]
        [HttpPost]
        public async Task<IActionResult> EditPromotion([FromForm] int makhuyenmai, [FromForm] string tenkhuyenmai, [FromForm] float tilekhuyenmai,
            [FromForm] string ngaybatdau, [FromForm] string ngayketthuc, [FromForm] string dieukien)
        {
            Khuyenmai s = await (from n in lavenderContext.Khuyenmai
                                 where n.Makhuyenmai == makhuyenmai
                                 select n).FirstAsync();
            s.Tenkhuyenmai = tenkhuyenmai;
            s.Tilekhuyenmai = tilekhuyenmai;
            s.Ngaybatdau = DateTime.Parse(ngaybatdau).ToLocalTime();
            s.Ngayketthuc = DateTime.Parse(ngayketthuc).ToLocalTime(); ;
            s.Dieukien = dieukien;

            await lavenderContext.SaveChangesAsync();

            return StatusCode(200, Json(s));
        }

        [Route("/xoa-khuyenmai")]
        [HttpDelete]
        public async Task<IActionResult> DeletePromotion(int makhuyenmai)
        {
            var s = await lavenderContext.Khuyenmai.SingleAsync(x => x.Makhuyenmai == makhuyenmai);
            lavenderContext.Remove(s);
            await lavenderContext.SaveChangesAsync();
            return StatusCode(200, Json(makhuyenmai));
        }

    }

}



