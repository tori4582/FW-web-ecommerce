using System;
using System.Collections.Generic;
using System.Data;
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

    public class ChitietsanphamController : Controller
    {
        private readonly ILogger<ChitietsanphamController> _logger;
        private readonly IWebHostEnvironment _env;

        private readonly lavenderContext lavenderContext;

        public ChitietsanphamController(ILogger<ChitietsanphamController> logger, IWebHostEnvironment env, lavenderContext lavenderContext)
        {
            _logger = logger;
            _env = env;
            this.lavenderContext = lavenderContext;
        }

        [Route("{loai}/{hang}/{dong}/{sanpham}/dungluong")]
        [HttpGet]
        public async Task<IActionResult> Sokieudungluong(string loai, string hang, string dong, string sanpham, string mausac)
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

            int thuonghieuid = await (from t in lavenderContext.Thuonghieu
                                      where t.Tenthuonghieu.Equals(hang)
                                      select t.Mathuonghieu).FirstOrDefaultAsync();
            if (thuonghieuid == 0) return StatusCode(404);

            var sanphamtemp = await lavenderContext.Sanpham.SingleOrDefaultAsync(x => x.Maloai == maloai && x.Tensanpham.Contains(dong) && x.Tensanpham.Contains(sanpham) && x.Mathuonghieu == thuonghieuid);
            if (sanphamtemp == null) return StatusCode(404);
            var chitietsanphams = await (from c in lavenderContext.Chitietsanpham
                                         where c.Masanpham == sanphamtemp.Masanpham
                                         && mausac.Equals("-1") ? true : c.Mausac.Equals(mausac)
                                         select c).ToListAsync();
            if (chitietsanphams.Count() == 0) return StatusCode(204);

            List<Chitietsanpham> listsanphamtheodungluong = new List<Chitietsanpham>();
            List<dynamic> dungluong = new List<dynamic>();
            foreach (var i in chitietsanphams)
            {
                var timduoccaimoinaodo = true;
                foreach (var j in listsanphamtheodungluong)
                {
                    if (j.Dungluong.Equals(i.Dungluong))
                    {
                        timduoccaimoinaodo = false;
                        break;
                    }
                }

                if (timduoccaimoinaodo == true)
                {
                    listsanphamtheodungluong.Add(i);
                    dungluong.Add(new { dungluong = i.Dungluong });
                }

            }

            return StatusCode(200, Json(dungluong));
        }

        [Route("{loai}/{hang}/{dong}/{sanpham}/mausac")]
        [HttpGet]
        public async Task<IActionResult> Sokieumausac(string loai, string hang, string dong, string sanpham, string dungluong)
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

            int thuonghieuid = await (from t in lavenderContext.Thuonghieu
                                      where t.Tenthuonghieu.Equals(hang)
                                      select t.Mathuonghieu).FirstOrDefaultAsync();
            if (thuonghieuid == 0) return StatusCode(404);

            var sanphamtemp = await lavenderContext.Sanpham.SingleOrDefaultAsync(x => x.Maloai == maloai && x.Tensanpham.Contains(dong) && x.Tensanpham.Contains(sanpham) && x.Mathuonghieu == thuonghieuid);
            if (sanphamtemp == null) return StatusCode(404);

            var chitietsanphams = await (from c in lavenderContext.Chitietsanpham
                                         where c.Masanpham == sanphamtemp.Masanpham
                                         && dungluong.Equals("-1") ? true : c.Dungluong.Equals(dungluong)
                                         select c).ToListAsync();

            if (chitietsanphams.Count() == 0) return StatusCode(204);

            List<Chitietsanpham> listsanphamtheomausac = new List<Chitietsanpham>();
            List<dynamic> mausac = new List<dynamic>();
            foreach (var i in chitietsanphams)
            {
                var timduoccaimoinaodo = true;
                foreach (var j in listsanphamtheomausac)
                {
                    if (j.Mausac.Equals(i.Mausac))
                    {
                        timduoccaimoinaodo = false;
                        break;
                    }
                }

                if (timduoccaimoinaodo == true)
                {
                    listsanphamtheomausac.Add(i);
                    mausac.Add(new { mausac = i.Mausac, image = i.Image });
                }
            }
            return StatusCode(200, Json(mausac));
        }

        [Route("/{loai}/{hang}/{dong}/{sanpham}/xemgia")]
        [HttpGet]
        public async Task<IActionResult> XemGia(string loai, string hang, string dong, string sanpham, string dungluong, string mausac)
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

            int thuonghieuid = await (from t in lavenderContext.Thuonghieu
                                      where t.Tenthuonghieu.Equals(hang)
                                      select t.Mathuonghieu).FirstOrDefaultAsync();
            if (thuonghieuid == 0) return StatusCode(404);


            var sanphamtemp = await lavenderContext.Sanpham.SingleOrDefaultAsync(x => x.Maloai == maloai && x.Tensanpham.Contains(dong) && x.Tensanpham.Contains(sanpham) && x.Mathuonghieu == thuonghieuid);
            if (sanphamtemp == null) return StatusCode(404);

            float giamoi = 0;

            giamoi = await (from c in lavenderContext.Chitietsanpham
                            where c.Masanpham == sanphamtemp.Masanpham
                            && dungluong.Equals("-1")?true:c.Dungluong.Equals(dungluong)
                            && mausac.Equals("-1")?true:c.Mausac.Equals(mausac)
                            orderby c.Giamoi ascending
                            select c.Giamoi).FirstOrDefaultAsync();

            if (giamoi == 0) return StatusCode(200, Json(giamoi)); 
            return StatusCode(200, Json(giamoi));
        }

        [Route("xem-gia-theo-masanpham")]
        [HttpGet]
        public async Task<IActionResult> XemGiaTheoMasanpham(int masanpham)
        {
            float giamoi = 0;

            giamoi = await (from c in lavenderContext.Chitietsanpham
                            where c.Masanpham == masanpham
                            orderby c.Giamoi ascending
                            select c.Giamoi).FirstOrDefaultAsync();

            return StatusCode(200, Json(giamoi));
        }

        [Route("/xemgia-theo-dungluong-mausac-masanpham")]
        [HttpGet]
        public async Task<IActionResult> XemGiaTheoDungluongMausacMasanpham(int masanpham, string dungluong, string mausac)
        {
            var chitietsanpham = await lavenderContext.Chitietsanpham.SingleOrDefaultAsync(x => x.Masanpham == masanpham
            && x.Dungluong.ToLower().Equals(dungluong.ToLower())
            && x.Mausac.Equals(mausac));
            if (chitietsanpham == null) return StatusCode(200, Json(new { giamoi = 0}));
            return StatusCode(200, Json(chitietsanpham.Giamoi));
        }

        [Route("/tim-mausac-bang-masanpham")]
        [HttpGet]
        public async Task<IActionResult> TimMausacBangMasanpham(int masanpham)
        {
            var chitietsanphams = await (from c in lavenderContext.Chitietsanpham
                                         where c.Masanpham == masanpham
                                         select c).ToListAsync();

            if (chitietsanphams.Count() == 0) return StatusCode(204);

            List<Chitietsanpham> listsanphamtheomausac = new List<Chitietsanpham>();
            List<dynamic> mausac = new List<dynamic>();
            foreach (var i in chitietsanphams)
            {
                var timduoccaimoinaodo = true;
                foreach (var j in listsanphamtheomausac)
                {
                    if (j.Mausac.Equals(i.Mausac))
                    {
                        timduoccaimoinaodo = false;
                        break;
                    }
                }

                if (timduoccaimoinaodo == true)
                {
                    listsanphamtheomausac.Add(i);
                    mausac.Add(new { mausac = i.Mausac });
                }
            }

            return StatusCode(200, Json(mausac));
        }

        [Route("/tim-dungluong-bang-masanpham")]
        [HttpGet]
        public async Task<IActionResult> TimDungluongBangMasanpham(int masanpham)
        {
            var chitietsanphams = await (from c in lavenderContext.Chitietsanpham
                                         where c.Masanpham == masanpham
                                         select c).ToListAsync();
            if (chitietsanphams.Count() == 0) return StatusCode(204);

            List<Chitietsanpham> listsanphamtheodungluong = new List<Chitietsanpham>();
            List<dynamic> dungluong = new List<dynamic>();
            foreach (var i in chitietsanphams)
            {
                var timduoccaimoinaodo = true;
                foreach (var j in listsanphamtheodungluong)
                {
                    if (j.Dungluong.Equals(i.Dungluong))
                    {
                        timduoccaimoinaodo = false;
                        break;
                    }
                }

                if (timduoccaimoinaodo == true)
                {
                    listsanphamtheodungluong.Add(i);
                    dungluong.Add(new { dungluong = i.Dungluong });
                }

            }

            return StatusCode(200, Json(dungluong));
        }


        [Route("/them-chitietsanpham")]
        [Authorize(Roles = "ADMINISTRATOR, STAFF")]
        [HttpPost]
        public async Task<IActionResult> AddDetail([FromForm] string imei, [FromForm] int masanpham,
            [FromForm] string ngaysanxuat, [FromForm] string tinhtrang, [FromForm] IFormFile image,
            [FromForm] string mausac, [FromForm] string dungluong, [FromForm] float giamoi)
        {
            Chitietsanpham s = new Chitietsanpham();
            s.Imei = imei;
            s.Masanpham = masanpham;
            s.Ngaysanxuat = DateTime.Parse(ngaysanxuat).ToLocalTime();
            s.Tinhtrang = tinhtrang;
            s.Mausac = mausac;
            s.Dungluong = dungluong;
           
            s.Giamoi = giamoi;

            var productpath = await (from p in lavenderContext.Sanpham
                                     where p.Masanpham == masanpham
                                     select p.Image).FirstAsync();

            s.Image = productpath + "/" + mausac;


            await lavenderContext.AddAsync(s);
            await lavenderContext.SaveChangesAsync();

            Chitietsanpham temp = await (from n in lavenderContext.Chitietsanpham
                                    orderby n.Imei descending
                                    select n).FirstAsync();

            if (image == null || image.Length == 0) return StatusCode(200, Json(s));

            string NewDir = _env.ContentRootPath + "/wwwroot" + s.Image;

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
                    img.Save(NewDir + "/0.Jpeg", ImageFormat.Jpeg);
                }
            }
            return StatusCode(200, Json(s));
        }

        [Route("/sua-chitietsanpham")]
        [Authorize(Roles = "ADMINISTRATOR, STAFF")]
        [HttpPost]
        public async Task<IActionResult> EditDetail([FromForm] string imei, [FromForm] int masanpham,
            [FromForm] string ngaysanxuat, [FromForm] string tinhtrang, [FromForm] IFormFile image,
            [FromForm] string mausac, [FromForm] string dungluong, [FromForm] float giamoi)
        {
            Chitietsanpham s = await (from n in lavenderContext.Chitietsanpham
                                 where n.Image == imei
                                 select n).FirstAsync();
            s.Imei = imei;
            s.Masanpham = masanpham;
            s.Ngaysanxuat = DateTime.Parse(ngaysanxuat).ToLocalTime();
            s.Tinhtrang = tinhtrang;
            s.Mausac = mausac;
            s.Dungluong = dungluong;

            s.Giamoi = giamoi;

            var productpath = await (from p in lavenderContext.Sanpham
                                     where p.Masanpham == masanpham
                                     select p.Image).FirstAsync();

            s.Image = productpath + "/" + mausac;

            await lavenderContext.SaveChangesAsync();

            if (image == null || image.Length == 0) return StatusCode(200, Json(s));

            string NewDir = _env.ContentRootPath + "/wwwroot" + s.Image;

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
                    img.Save(NewDir + "/0.Jpeg", ImageFormat.Jpeg);
                }
            }
            return StatusCode(200, Json(s));
        }

        [Route("/xoa-chitietsanpham")]
       [Authorize(Roles = "ADMINISTRATOR, STAFF")]
        [HttpDelete]
        public async Task<IActionResult> DeleteDetail(string imei)
        {
            var s = await lavenderContext.Chitietsanpham.SingleAsync(x => x.Imei == imei);
            lavenderContext.Remove(s);
            string path = _env.ContentRootPath + "/wwwroot" + s.Image + "/0.Jpeg";
            if (System.IO.File.Exists(path))
            {
                System.IO.File.Delete(path);
            }
            await lavenderContext.SaveChangesAsync();
            return StatusCode(200, Json(imei));
        }

        [Route("/tatca-chitietsanpham")]
       [Authorize(Roles = "ADMINISTRATOR, STAFF")]
        [HttpGet]
        public async Task<IActionResult> TatcaChitietsanpham()
        {
            var list = await (from c in lavenderContext.Chitietsanpham
                              select c).ToListAsync();
            return StatusCode(200, Json(list));
        }

        [Route("/tim-chitietsanpham-bang-imei")]
        [HttpGet]
        public async Task<IActionResult> TimChitietsanphamBangImei(string imei)
        {
            var chitietsanpham = await (from x in lavenderContext.Chitietsanpham
                                        where x.Imei.Equals(imei)
                                        select x).FirstOrDefaultAsync();
            if (chitietsanpham == null) return StatusCode(404);
            return StatusCode(200, Json(chitietsanpham));
        }
    }

}



