using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text.Json;
using System.Threading.Tasks;
using Back.Common;
using Back.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;
using Newtonsoft.Json.Linq;

namespace Back.Controllers
{

    // [EnableCors(origins: "*", headers: "accept,content-type,origin,x-my-header", methods: "*")]
    [ApiController]

    public class DetailcartController : Controller
    {
        private readonly ILogger<DetailcartController> _logger;
        private readonly IWebHostEnvironment _env;

        private readonly lavenderContext lavenderContext;

        public DetailcartController(ILogger<DetailcartController> logger, IWebHostEnvironment env, lavenderContext lavenderContext)
        {
            _logger = logger;
            _env = env;
            this.lavenderContext = lavenderContext;
        }

        [Route("/chitietgiohang-bang-magiohang")]
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> LoadDetailCartByCartId([FromQuery] int magiohang)
        {
            var chitietgiohangs = await (from c in lavenderContext.Chitietgiohang
                                         where c.Magiohang == magiohang
                                         select c).ToListAsync();
            if (chitietgiohangs == null || chitietgiohangs.Count() == 0) return StatusCode(200);
            return StatusCode(200, Json(chitietgiohangs));
        }

        [Route("dat-soluong-cho-chitietgiohang")]
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> SetQuantityForDetailCart(JsonElement json)
        {
            Console.WriteLine(json);
            var chitietgiohang = await (from x in lavenderContext.Chitietgiohang
                                        where x.Magiohang == int.Parse(json.GetString("magiohang"))
                                                    && x.Masanpham == int.Parse(json.GetString("masanpham"))
            && x.Dungluong == json.GetString("dungluong")
            && x.Mausac == json.GetString("mausac")
                                        select x).FirstOrDefaultAsync();

            if (chitietgiohang == null) return StatusCode(404);
            chitietgiohang.Soluong = int.Parse(json.GetString("soluong"));
            await lavenderContext.SaveChangesAsync();
            return StatusCode(200);
        }

        [Route("/xoa-chitietgiohang")]
        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> deleteDetailCart(int magiohang, int masanpham)
        {
            var chitietgiohang = await (from c in lavenderContext.Chitietgiohang
                                        where c.Magiohang == magiohang
                                        && c.Masanpham == masanpham
                                        select c).FirstOrDefaultAsync();

            if (chitietgiohang == null) return StatusCode(404);
            lavenderContext.Remove(chitietgiohang);
            await lavenderContext.SaveChangesAsync();
            return StatusCode(200);
        }

        [Route("/xoa-tatca-chitietgiohang")]
        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> deleteAllDetailCart(int magiohang)
        {
            var chitietgiohangs = await (from c in lavenderContext.Chitietgiohang
                                         where c.Magiohang == magiohang
                                         select c).ToListAsync();
            if (chitietgiohangs == null || chitietgiohangs.Count() == 0) return StatusCode(404);
            lavenderContext.RemoveRange(chitietgiohangs);
            await lavenderContext.SaveChangesAsync();
            return StatusCode(200);
        }
    }

}



