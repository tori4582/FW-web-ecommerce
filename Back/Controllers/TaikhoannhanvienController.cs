
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
    public class TaikhoannhanvienController : Controller
    {
        private readonly ILogger<TaikhoannhanvienController> _logger;
        private readonly IWebHostEnvironment _env;

        private readonly lavenderContext lavenderContext;

        public TaikhoannhanvienController(ILogger<TaikhoannhanvienController> logger, IWebHostEnvironment env, lavenderContext lavenderContext)
        {
            _logger = logger;
            _env = env;
            this.lavenderContext = lavenderContext;
        }

        [Route("/tatca-taikhoannhanvien")]
        [HttpGet]
        public async Task<IActionResult> AllAccount()
        {
            var taikhoannhanvienlist = await (from n in lavenderContext.Taikhoannhanvien
                                               orderby n.Manhanvien ascending
                                               select n).ToListAsync();
            return StatusCode(200, Json(taikhoannhanvienlist));
        }

        [Route("/them-taikhoannhanvien")]
        [HttpPost]
        public async Task<IActionResult> AddAccount([FromForm] int manhanvien, [FromForm] string username,
            [FromForm] string password)
        {
            Taikhoannhanvien s = new Taikhoannhanvien();
            s.Manhanvien = manhanvien;
            s.Username = username;
            s.Password = password;

            await lavenderContext.AddAsync(s);
            await lavenderContext.SaveChangesAsync();

            Taikhoannhanvien temp = await (from n in lavenderContext.Taikhoannhanvien
                                           orderby n.Manhanvien descending
                                            select n).FirstAsync();

            return StatusCode(200, Json(s));
        }

        [Route("/sua-taikhoannhanvien")]
        [HttpPost]
        public async Task<IActionResult> EditAccount([FromForm] int manhanvien,
            [FromForm] string username, [FromForm] string password)
        {
            Taikhoannhanvien s = await (from n in lavenderContext.Taikhoannhanvien
                                        where n.Manhanvien == manhanvien
                                         select n).FirstAsync();
            s.Username = username;
            s.Password = password;

            await lavenderContext.SaveChangesAsync();

            return StatusCode(200, Json(s));
        }

        [Route("/xoa-taikhoannhanvien")]
        [HttpDelete]
        public async Task<IActionResult> DeleteAccount(int manhanvien)
        {
            var s = await lavenderContext.Taikhoannhanvien.SingleAsync(x => x.Manhanvien == manhanvien);
            lavenderContext.Remove(s);
            string path = _env.ContentRootPath + "/wwwroot/nhanvien/" + s.Manhanvien+ ".Jpeg";
            if (System.IO.File.Exists(path))
            {
                System.IO.File.Delete(path);
            }
            await lavenderContext.SaveChangesAsync();
            return StatusCode(200, Json(manhanvien));
        }
    }

}