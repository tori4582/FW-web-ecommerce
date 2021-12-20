
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;

using System.Threading.Tasks;

using Back.Models;
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

    public class ThuonghieuController : Controller
    {
        private readonly ILogger<ThuonghieuController> _logger;
        private readonly IWebHostEnvironment _env;

        private readonly lavenderContext lavenderContext;

        public ThuonghieuController(ILogger<ThuonghieuController> logger, IWebHostEnvironment env, lavenderContext lavenderContext)
        {
            _logger = logger;
            _env = env;
            this.lavenderContext = lavenderContext;
        }

        [Route("/thuonghieu")]
        [HttpGet]
        public async Task<IActionResult> AllTrademark(string loai)
        {
            int maloai = 0;
            switch (loai)
            {
                case "mobile":
                    maloai = 1;
                    break;
                case "laptop":
                    maloai = 2;
                    break;
                default:
                    break;
            }

            var sanphamtemp = await (from s in lavenderContext.Sanpham
                                     where s.Maloai == maloai
                                     select s).ToListAsync();

            List<int> danhsachthuonghieu = new List<int>();

            foreach (var i in sanphamtemp)
            {
                bool timthaycaigido = false;
                foreach (var j in danhsachthuonghieu)
                {
                    if (i.Mathuonghieu == j)
                    {
                        timthaycaigido = true;
                    }
                }
                if (timthaycaigido == false) danhsachthuonghieu.Add(i.Mathuonghieu);
            }
            if (sanphamtemp == null) return StatusCode(404);

            var thuonghieus = new List<Thuonghieu>();
            foreach (var i in danhsachthuonghieu)
            {
                thuonghieus.Add(await (from t in lavenderContext.Thuonghieu
                                       where t.Mathuonghieu == i
                                       select t).FirstOrDefaultAsync());
            }

            return StatusCode(200, Json(thuonghieus));
        }

        [Route("/tim-mathuonghieu-bang-tenthuonghieu")]
        [HttpGet]
        public async Task<IActionResult> TimMaThuonghieu(string tenthuonghieu)
        {
            var ma = await (from t in lavenderContext.Thuonghieu
                            where string.IsNullOrEmpty(tenthuonghieu) ? true : t.Tenthuonghieu.ToLower().Contains(tenthuonghieu)
                            select t.Mathuonghieu).FirstOrDefaultAsync();
            return StatusCode(200, Json(ma));
        }

        [Route("/tatca-thuonghieu")]
        [HttpGet]
        public async Task<IActionResult> AllTrademark()
        {
            var thuonghieulist = await (from n in lavenderContext.Thuonghieu
                                        orderby n.Mathuonghieu ascending
                                        select n).ToListAsync();
            return StatusCode(200, Json(thuonghieulist));
        }

        [Route("/them-thuonghieu")]
       [Authorize(Roles = "ADMINISTRATOR, STAFF")]
        [HttpPost]
        public async Task<IActionResult> AddTrademark([FromForm] string tenthuonghieu,
            [FromForm] string xuatxu,
             [FromForm] IFormFile image)
        {
            Thuonghieu s = new Thuonghieu();
            s.Tenthuonghieu = tenthuonghieu;
            s.Xuatxu = xuatxu;
            s.Image = "/thuonghieu";


            await lavenderContext.AddAsync(s);
            await lavenderContext.SaveChangesAsync();

            Thuonghieu temp = await (from n in lavenderContext.Thuonghieu
                                     orderby n.Mathuonghieu descending
                                     select n).FirstAsync();

            if (image == null || image.Length == 0) return StatusCode(200, Json(s));

            string NewDir = _env.ContentRootPath + "/wwwroot/thuonghieu";

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
                    img.Save(_env.ContentRootPath + "/wwwroot/thuonghieu/" + temp.Tenthuonghieu.ToLower() + ".Jpeg", ImageFormat.Jpeg);
                }
            }
            return StatusCode(200, Json(s));
        }

        [Route("/sua-thuonghieu")]
       [Authorize(Roles = "ADMINISTRATOR, STAFF")]
        [HttpPost]
        public async Task<IActionResult> EditTrademark([FromForm] int mathuonghieu, [FromForm] string tenthuonghieu,
            [FromForm] IFormFile image,
       [FromForm] string xuatxu)
        {
            Thuonghieu s = await (from n in lavenderContext.Thuonghieu
                                  where n.Mathuonghieu == mathuonghieu
                                  select n).FirstAsync();
            s.Tenthuonghieu = tenthuonghieu;
            s.Xuatxu = xuatxu;
            s.Image = "/thuonghieu";

            await lavenderContext.SaveChangesAsync();



            if (image == null || image.Length == 0) return StatusCode(200, Json(s));

            string NewDir = _env.ContentRootPath + "/wwwroot/thuonghieu";

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
                    img.Save(_env.ContentRootPath + "/wwwroot/thuonghieu/" + s.Tenthuonghieu.ToLower() + ".Jpeg", ImageFormat.Jpeg);
                }
            }
            return StatusCode(200, Json(s));
        }

        [Route("/xoa-thuonghieu")]
       [Authorize(Roles = "ADMINISTRATOR, STAFF")]
        [HttpDelete]
        public async Task<IActionResult> DeleteTrademark(int mathuonghieu)
        {
            var s = await lavenderContext.Thuonghieu.SingleAsync(x => x.Mathuonghieu == mathuonghieu);
            lavenderContext.Remove(s);
            string path = _env.ContentRootPath + "/wwwroot/thuonghieu/" + s.Tenthuonghieu.ToLower() + ".Jpeg";
            if (System.IO.File.Exists(path))
            {
                System.IO.File.Delete(path);
            }
            await lavenderContext.SaveChangesAsync();
            return StatusCode(200, Json(mathuonghieu));
        }

        [Route("/tim-thuonghieu")]
        [HttpGet]
        public async Task<IActionResult> TimThuonghieu(string timkiem)
        {
            var list = await (from t in lavenderContext.Thuonghieu
                              where string.IsNullOrEmpty(timkiem) ? true : t.Tenthuonghieu.Contains(timkiem)
                              select t).ToListAsync();
            return StatusCode(200, Json(list));
        }
    }
}
