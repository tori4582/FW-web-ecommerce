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
    public class BaohanhController : Controller
    {
        private readonly ILogger<BaohanhController> _logger;
        lavenderContext lavenderContext;
        public BaohanhController(ILogger<BaohanhController> logger, lavenderContext lavenderContext)
        {
            _logger = logger;
            this.lavenderContext = lavenderContext;
        }

        [Route("/tracuu-lichsu-baohanh")]
        [HttpGet]
        public async Task<IActionResult> TracuuLichsuBaohanh(string imei)
        {
            var listbaohanh = await (from x in lavenderContext.Baohanhs
                                     where x.Imei.Equals(imei)
                                     select x).ToListAsync();
            return StatusCode(200, Json(listbaohanh));
        }
    }
}