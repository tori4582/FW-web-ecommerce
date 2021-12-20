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

namespace Back.Controllers
{
    public class BaiVietController : Controller
    {
        private readonly ILogger<BaiVietController> _logger;
        lavenderContext lavenderContext;
        public BaiVietController(ILogger<BaiVietController> logger, lavenderContext lavenderContext)
        {
            _logger = logger;
            this.lavenderContext = lavenderContext;
        }

        [Route("/baiviet")]
        [HttpGet]
        public async Task<IActionResult> GetAllBaiViet()
        {
            var baivietlist = await (from bv in lavenderContext.Baiviets
                                     select bv).ToListAsync();
            return StatusCode(200, JsonConvert.SerializeObject(baivietlist));
        }

        
        [Route("/baiviet/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetBaiViet(int id)
        {
            var baivietlist = await (from bv in lavenderContext.Baiviets where bv.mabaiviet==id select bv ).ToListAsync();
            return StatusCode(200, JsonConvert.SerializeObject(baivietlist));
        }
    }
}