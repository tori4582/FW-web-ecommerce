using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

using Back.Models;
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

    public class DanhsachyeuthichController : Controller
    {
        private readonly ILogger<DanhsachyeuthichController> _logger;
        private readonly IWebHostEnvironment _env;

        private readonly lavenderContext lavenderContext;

        public DanhsachyeuthichController(ILogger<DanhsachyeuthichController> logger, IWebHostEnvironment env, lavenderContext lavenderContext)
        {
            _logger = logger;
            _env = env;
            this.lavenderContext = lavenderContext;
        }

        [Route("/danhsachyeuthich")]
        [HttpGet]
        public async Task<IActionResult> Danhsachyeuthich()
        {
            var favorites = await (from d in lavenderContext.Danhsachyeuthich
                                   select d).ToListAsync();
            return StatusCode(200, Json(favorites));
        }

        [Route("/kiemtrayeuthich")]
        [HttpGet]
        public async Task<IActionResult> Kiemtrayeuthich(int makhachhang, int masanpham)
        {
            var favorites = await (from d in lavenderContext.Danhsachyeuthich
                                   where d.Masanpham == masanpham
                                   && d.Makhachhang == makhachhang
                                   select d).FirstOrDefaultAsync();
            Boolean liked = false;
            if (favorites != null) liked = true;
            return StatusCode(200, Json(new { liked = liked }));
        }

        [Route("/yeuthich")]

        [HttpGet]
        public async Task<IActionResult> Themyeuthich(int makhachhang, int masanpham)
        {
            var favorite = new Danhsachyeuthich();
            favorite.Makhachhang = makhachhang;
            favorite.Masanpham = masanpham;
            await lavenderContext.AddAsync(favorite);
            await lavenderContext.SaveChangesAsync();
            return StatusCode(200);
        }

        [Route("/boyeuthich")]
        [HttpGet]
        public async Task<IActionResult> Boyeuthich(int makhachhang, int masanpham)
        {
            var favorite = await lavenderContext.Danhsachyeuthich.SingleOrDefaultAsync(x => x.Makhachhang == makhachhang && x.Masanpham == masanpham);
            if (favorite == null) return StatusCode(404);
            lavenderContext.Remove(favorite);
            await lavenderContext.SaveChangesAsync();
            return StatusCode(200);
        }
    }

}


