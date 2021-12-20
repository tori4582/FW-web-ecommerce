using System;
using System.Collections;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Back.Models;
using Back.Models.ModelDTO;
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

    public class ProductController : Controller
    {
        private readonly ILogger<ProductController> _logger;
        private readonly IWebHostEnvironment _env;

        private readonly lavenderContext lavenderContext;

        public ProductController(ILogger<ProductController> logger, IWebHostEnvironment env, lavenderContext lavenderContext)
        {
            _logger = logger;
            _env = env;
            this.lavenderContext = lavenderContext;
        }

        [Route("/{loai}/{hang}/{dong}/{sanpham}")]
        public async Task<IActionResult> ProductInfo(string loai, string hang, string dong, string sanpham, string dungluong, string mausac)
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
            int productid = (int)await lavenderContext.Sanpham
                .Where(s => s.Tensanpham.Contains(sanpham))
                .Where(s => s.Tensanpham.Contains(dong))
                .Select(s => s.Masanpham).FirstOrDefaultAsync();

            int trademarkid = await lavenderContext.Thuonghieu.Where(s => s.Tenthuonghieu.Contains(hang)).Select(s => s.Mathuonghieu).FirstOrDefaultAsync();
            var product = await (from p in lavenderContext.Sanpham
                                 where
                                 p.Maloai == maloai &&
                                 p.Mathuonghieu == trademarkid &&
                                 p.Masanpham == productid
                                 select p).FirstOrDefaultAsync();
            int fCount = 0;
            if (product != null)
            {
                fCount = Directory.GetFiles($"{_env.ContentRootPath}/wwwroot/{loai}/{hang}/{dong}/{sanpham}", "*", SearchOption.TopDirectoryOnly).Length;
                return StatusCode(200, Json(product, new { sohinhanh = fCount }));
            }
            Console.WriteLine("product" + product);
            return StatusCode(404);

        }

        [Route("/tim-cacsanpham-theo-sohoadon")]
        [HttpGet]
        public async Task<IActionResult> TimCacsanphamTheoSohoadon(int sohoadon)
        {
            var listimei = await (from c in lavenderContext.Chitiethoadon
                                  where c.Sohoadon == sohoadon
                                  select c.Imei).ToListAsync();
            var listproductid = new List<int>();
            foreach (var i in listimei)
            {
                var temp = await (from s in lavenderContext.Chitietsanpham
                                  where s.Imei == i
                                  select s.Masanpham).ToListAsync();
                if (temp != null && temp.Count() != 0) listproductid.AddRange(temp);
            }


            var listproduct = new List<Sanpham>();
            foreach (var i in listproductid)
            {
                var temp = await (from s in lavenderContext.Sanpham
                                  where s.Masanpham == i
                                  select s).ToListAsync();
                if (temp != null && temp.Count() != 0) listproduct.AddRange(temp);
            }
            return StatusCode(200, Json(listproduct));
        }

        [Route("/tim-sanpham-theo-sohoadon")]
        [HttpGet]
        public async Task<IActionResult> FindProductByBillId(int sohoadon)
        {
            var imei = await (from c in lavenderContext.Chitiethoadon
                              where c.Sohoadon == sohoadon
                              select c.Imei).FirstOrDefaultAsync();
            var productid = await (from c in lavenderContext.Chitietsanpham
                                   where c.Imei == imei
                                   select c.Masanpham).FirstOrDefaultAsync();
            var product = await (from p in lavenderContext.Sanpham
                                 where p.Masanpham == productid
                                 select p).FirstOrDefaultAsync();
            return StatusCode(200, Json(product));
        }

        [Route("/tim-sanpham-theo-masanpham")]
        [HttpGet]
        public async Task<IActionResult> FindProductbyId(int masanpham)
        {
            var sanpham = await lavenderContext.Sanpham.SingleOrDefaultAsync(x => x.Masanpham == masanpham);
            if (sanpham == null) return StatusCode(404);
            return StatusCode(200, Json(sanpham));
        }

        [Route("/tim-sanpham-theo-tenthuonghieu")]
        [HttpGet]
        public async Task<IActionResult> TimsanphamTheoThuonghieu(string tenthuonghieu)
        {
            var thuonghieu = await lavenderContext.Thuonghieu.SingleOrDefaultAsync(x => x.Tenthuonghieu.ToLower().Equals(tenthuonghieu));
            if (thuonghieu == null) return StatusCode(404);
            var sanphams = await (from s in lavenderContext.Sanpham
                                  where s.Mathuonghieu == thuonghieu.Mathuonghieu
                                  select s).ToListAsync();
            return StatusCode(200, Json(sanphams));
        }

        [Route("/thongsokithuat-bang-masanpham")]
        [HttpGet]
        public async Task<IActionResult> ThongsokithuatBangMasanpham(int masanpham)
        {
            var temp = await (from x in lavenderContext.Thongsokithuat
                              where x.Masanpham == masanpham
                              select x).ToListAsync();
            List<ThongsokithuatForm> thongsokithuatForms = new List<ThongsokithuatForm>();
            foreach ( var x in temp)
            {
                var thongso = new ThongsokithuatForm();
                thongso.ten = x.Ten;
                thongso.noidung = x.Noidung;
                thongsokithuatForms.Add(thongso);
            }
            return StatusCode(200, Json(thongsokithuatForms));
        }

        [Route("/them-thongsokithuat")]
        [Authorize(Roles = "ADMINISTRATOR, STAFF")]
        [HttpPost]
        public async Task<IActionResult> AddSpecifications(JsonElement json)
        {
            ThongsokithuatForm[] thongsokithuatForms = Newtonsoft.Json.JsonConvert.DeserializeObject<ThongsokithuatForm[]>(json.GetString("thongsokithuat"));
            int masanpham = int.Parse(json.GetString("masanpham"));
            foreach (var i in thongsokithuatForms)
            {
                if (string.IsNullOrEmpty(i.ten)) continue;
                var temp = await (from x in lavenderContext.Thongsokithuat
                                  where x.Masanpham == masanpham
                                  && x.Ten.Equals(i.ten)
                                  select x).FirstOrDefaultAsync();
                if (temp == null)
                {
                    temp = new Thongsokithuat();
                    temp.Masanpham = masanpham;
                    temp.Ten = i.ten;
                    temp.Noidung = i.noidung;
                    await lavenderContext.AddAsync(temp);
                }
                else
                {
                    temp.Noidung = i.noidung;
                    await lavenderContext.SaveChangesAsync();
                }
            }
            await lavenderContext.SaveChangesAsync();
            return Ok();
        }


        [Route("/them-sanpham")]
        [Authorize(Roles = "ADMINISTRATOR, STAFF")]
        [HttpPost]
        public async Task<IActionResult> AddProduct([FromForm] string tensanpham, [FromForm] int maloai,
            [FromForm] int mathuonghieu, [FromForm] int soluongton, [FromForm] string mota, [FromForm] IFormFile image, [FromForm] string thoidiemramat, [FromForm] float dongia
            )
        {
            Sanpham s = new Sanpham();
            s.Tensanpham = tensanpham;
            s.Maloai = maloai;
            s.Mathuonghieu = mathuonghieu;
            s.Soluongton = soluongton;
            s.Mota = mota;
            s.Thoidiemramat = DateTime.Parse(thoidiemramat).ToLocalTime();
            s.Dongia = dongia;

            string loai = "";
            switch (maloai)
            {
                case 1:
                    loai = "mobile";
                    break;
                case 2:
                    loai = "laptop";
                    break;
                default:
                    break;
            }

            string hang = await (from t in lavenderContext.Thuonghieu
                                 where t.Mathuonghieu == mathuonghieu
                                 select t.Tenthuonghieu).FirstOrDefaultAsync();
            string[] tokens = tensanpham.Split(' ');
            string dong = tokens[0];
            string sanpham = tokens[1];
            string path = $"/{loai}/{hang}/{dong}/{sanpham}";

            s.Image = path;

            await lavenderContext.AddAsync(s);
            await lavenderContext.SaveChangesAsync();

            if (image == null || image.Length == 0) return StatusCode(200, Json(s));

            string NewDir = _env.ContentRootPath + "/wwwroot" + path;

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
                    img.Save(_env.ContentRootPath + "/wwwroot" + path + "/0.Jpeg", ImageFormat.Jpeg);
                }
            }
            return StatusCode(200, Json(s));
        }

        [Route("/sua-sanpham")]
        [Authorize(Roles = "ADMINISTRATOR, STAFF")]
        [HttpPost]
        public async Task<IActionResult> EditProduct([FromForm] int masanpham, [FromForm] string tensanpham, [FromForm] int maloai,
            [FromForm] int mathuonghieu, [FromForm] int soluongton, [FromForm] string mota, [FromForm] IFormFile image, [FromForm] string thoidiemramat, [FromForm] float dongia)
        {
            string loai = "";
            switch (maloai)
            {
                case 1:
                    loai = "mobile";
                    break;
                case 2:
                    loai = "laptop";
                    break;
                default:
                    break;
            }

            string hang = await (from t in lavenderContext.Thuonghieu
                                 where t.Mathuonghieu == mathuonghieu
                                 select t.Tenthuonghieu).FirstOrDefaultAsync();
            string[] tokens = tensanpham.Split(' ');
            string dong = tokens[0];
            string sanpham = tokens[1];
            string path = $"/{loai}/{hang}/{dong}/{sanpham}";

            var s = await (from p in lavenderContext.Sanpham
                           where p.Masanpham == masanpham
                           select p).FirstOrDefaultAsync();
            s.Tensanpham = tensanpham;
            s.Maloai = maloai;
            s.Mathuonghieu = mathuonghieu;
            s.Soluongton = soluongton;
            s.Mota = mota;
            s.Thoidiemramat = DateTime.Parse(thoidiemramat).ToLocalTime();
            s.Dongia = dongia;
            s.Image = path;

            if (image == null || image.Length == 0) return StatusCode(200, Json(s));

            await lavenderContext.SaveChangesAsync();

            string NewDir = _env.ContentRootPath + "/wwwroot" + path;

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
                    img.Save(_env.ContentRootPath + "/wwwroot" + path + "/0.Jpeg", ImageFormat.Jpeg);
                }
            }
            return StatusCode(200, Json(s));
        }


        [Route("/xoa-sanpham")]
        [Authorize(Roles = "ADMINISTRATOR, STAFF")]
        [HttpGet]
        public async Task<IActionResult> DeleteProduct(int masanpham)
        {
            var product = await (from s in lavenderContext.Sanpham
                                 where s.Masanpham == masanpham
                                 select s).FirstOrDefaultAsync();

            var detailProducts = await (from c in lavenderContext.Chitietsanpham
                                        where c.Masanpham == masanpham
                                        select c).ToListAsync();

            lavenderContext.RemoveRange(detailProducts);

            var thongsokithuat = await (from x in lavenderContext.Thongsokithuat
                                        where x.Masanpham == masanpham
                                        select x).ToListAsync();
            lavenderContext.RemoveRange(thongsokithuat);

            foreach (var i in detailProducts)
            {
                string path = _env.ContentRootPath + "/wwwroot" + i.Image + "0.Jpeg";
                if (System.IO.File.Exists(path))
                {
                    System.IO.File.Delete(path);
                }
            }
            await lavenderContext.SaveChangesAsync();

            lavenderContext.Remove(product);
            {
                string path = _env.ContentRootPath + "/wwwroot" + product.Image + "0.Jpeg";
                if (System.IO.File.Exists(path))
                {
                    System.IO.File.Delete(path);
                }
            }
            await lavenderContext.SaveChangesAsync();
            return StatusCode(200, Json(masanpham));
        }

        [Route("/tatca-dienthoai")]
        [HttpGet]
        public async Task<IActionResult> AllMobileProduct()
        {
            var listproduct = await (from s in lavenderContext.Sanpham
                                     where s.Maloai == 1
                                     orderby s.Mathuonghieu ascending
                                     select s).ToListAsync();
            return StatusCode(200, Json(listproduct));
        }

        [Route("/tatca-laptop")]
        [HttpGet]
        public async Task<IActionResult> AllLaptopProduct()
        {
            var listproduct = await (from s in lavenderContext.Sanpham
                                     where s.Maloai == 2
                                     orderby s.Mathuonghieu ascending
                                     select s).ToListAsync();
            return StatusCode(200, Json(listproduct));
        }

        [Route("/tim-sanpham")]
        [HttpGet]
        public async Task<IActionResult> FindProduct(string timkiem)
        {
            if (String.IsNullOrEmpty(timkiem))
            {
                var sanphamlist = await (from s in lavenderContext.Sanpham
                                         select s).ToListAsync();
                return StatusCode(200, Json(sanphamlist));
            }
            else
            {
                var sanphamlist = await (from s in lavenderContext.Sanpham
                                         where s.Tensanpham.Contains(timkiem)
                                         select s).ToListAsync();
                return StatusCode(200, Json(sanphamlist));
            }

        }

        [Route("/muoi-sanpham-moinhat")]
        [HttpGet]
        public async Task<IActionResult> TenNewProduct()
        {
            var list = await (from x in lavenderContext.Sanpham
                              orderby x.Thoidiemramat descending
                              select x).ToListAsync();
            return StatusCode(200, Json(list));
        }

        [Route("/timkiem-6-sanpham")]
        [HttpGet]
        public async Task<IActionResult> Timkiem6Sanpham(string timkiem)
        {
            var list = await (from s in lavenderContext.Sanpham
                              where s.Tensanpham.Contains(timkiem)
                              select s).ToListAsync();
            List<Sanpham> newlist = new List<Sanpham>();
            for (int i = 0; i < 6 && i < list.Count(); i++)
            {
                newlist.Add(list[i]);
            }
            return StatusCode(200, Json(newlist));
        }
    }

}



