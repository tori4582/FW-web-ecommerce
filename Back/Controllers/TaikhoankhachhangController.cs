
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
   
    public class TaikhoankhachhangController : Controller
    {
        private readonly ILogger<TaikhoankhachhangController> _logger;
        private readonly IWebHostEnvironment _env;

        private readonly lavenderContext lavenderContext;

        public TaikhoankhachhangController(ILogger<TaikhoankhachhangController> logger, IWebHostEnvironment env, lavenderContext lavenderContext)
        {
            _logger = logger;
            _env = env;
            this.lavenderContext = lavenderContext;
        }

        [Route("/tatca-taikhoankhachhang")]
        [Authorize(Roles = "ADMINISTRATOR, STAFF")]
        [HttpGet]
        public async Task<IActionResult> AllAccount()
        {
            var taikhoankhachhanglist = await (from n in lavenderContext.Taikhoankhachhang
                                               orderby n.Makhachhang ascending
                                               select n).ToListAsync();
            return StatusCode(200, Json(taikhoankhachhanglist));
        }

        [Route("/them-taikhoankhachhang")]
        [Authorize(Roles = "ADMINISTRATOR, STAFF")]
        [HttpPost]
        public async Task<IActionResult> AddAccount([FromForm] int makhachhang, [FromForm] string username,
            [FromForm] string password)
        {
            Taikhoankhachhang s = new Taikhoankhachhang();
            s.Makhachhang = makhachhang;
            s.Username = username;
            s.Password = password;

            await lavenderContext.AddAsync(s);
            await lavenderContext.SaveChangesAsync();

            Taikhoankhachhang temp = await (from n in lavenderContext.Taikhoankhachhang
                                            orderby n.Makhachhang descending
                                            select n).FirstAsync();

            return StatusCode(200, Json(s));
        }

        [Route("/sua-taikhoankhachhang")]
        [Authorize(Roles = "ADMINISTRATOR, STAFF")]
        [HttpPost]
        public async Task<IActionResult> EditAccount([FromForm] int makhachhang,
            [FromForm] string username, [FromForm] string password)
        {
            Taikhoankhachhang s = await (from n in lavenderContext.Taikhoankhachhang
                                         where n.Makhachhang == makhachhang
                                         select n).FirstAsync();
            s.Makhachhang = makhachhang;
            s.Username = username;
            s.Password = password;

            await lavenderContext.SaveChangesAsync();

            return StatusCode(200, Json(s));
        }

        [Route("/xoa-taikhoankhachhang")]
        [Authorize(Roles = "ADMINISTRATOR, STAFF")]
        [HttpDelete]
        public async Task<IActionResult> DeleteAccount(int makhachhang)
        {
            var taikhoankhachhang = await lavenderContext.Taikhoankhachhang.SingleAsync(x => x.Makhachhang == makhachhang);
            lavenderContext.Remove(taikhoankhachhang);
            await lavenderContext.SaveChangesAsync();
            return StatusCode(200, Json(makhachhang));
        }
    }

}