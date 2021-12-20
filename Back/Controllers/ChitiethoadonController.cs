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
using System.Text.Json;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Back.Common;

namespace Back.Controllers
{
    // [EnableCors(origins: "*", headers: "accept,content-type,origin,x-my-header", methods: "*")]

    [ApiController]
    public class ChitiethoadonController : Controller
    {
        private readonly ILogger<ChitiethoadonController> _logger;
        lavenderContext lavenderContext;
        public ChitiethoadonController(ILogger<ChitiethoadonController> logger, lavenderContext lavenderContext)
        {
            _logger = logger;
            this.lavenderContext = lavenderContext;
        }

        [Route("/chitietthoadon-theo-sohoadon")]
        [Authorize(Roles = "ADMINISTRATOR, STAFF")]
        [HttpGet]
        public async Task<IActionResult> detailByBillId(int sohoadon)
        {
            
            var chitiethoadons = await (from c in lavenderContext.Chitiethoadon
                                        where c.Sohoadon == sohoadon
                                        select c).ToListAsync();
            return StatusCode(200, Json(chitiethoadons));
        }

    }
}
