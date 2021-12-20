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
using Microsoft.AspNetCore.Authorization;

namespace Back.Controllers
{
    // [EnableCors(origins: "*", headers: "accept,content-type,origin,x-my-header", methods: "*")]

    [ApiController]
    [Authorize(Roles = "ADMINISTRATOR, STAFF")]
    public class PhieunhapController : Controller
    {
        private readonly ILogger<PhieunhapController> _logger;
        lavenderContext lavenderContext;
        public PhieunhapController(ILogger<PhieunhapController> logger, lavenderContext lavenderContext)
        {
            _logger = logger;
            this.lavenderContext = lavenderContext;
        }

        [Route("/phieu-nhap-san-pham")]
        [HttpGet]
        public async Task<IActionResult> GetAllPhieunhap()
        {
            var phieunhapsanphamlist = await (from p in lavenderContext.Phieunhapsanpham
                                    select p).ToListAsync();
            foreach(var i in phieunhapsanphamlist)
            {
                var e = lavenderContext.Entry(i);
                await e.Reference(x => x.ManhacungcapNavigation).LoadAsync();
                await e.Reference(x => x.MasanphamNavigation).LoadAsync();
            }
            return StatusCode(200, Json(phieunhapsanphamlist));
        }

    }
}
