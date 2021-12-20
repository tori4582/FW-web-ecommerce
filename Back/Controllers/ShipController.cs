using System;
using System.Collections;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Back.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
namespace Back.Controllers
{
    // [EnableCors(origins: "*", headers: "accept,content-type,origin,x-my-header", methods: "*")]
    [ApiController]

    public class ShipController : Controller
    {
        private readonly ILogger<ShipController> _logger;
        private readonly IWebHostEnvironment _env;

        private readonly lavenderContext lavenderContext;

        public ShipController(ILogger<ShipController> logger, IWebHostEnvironment env, lavenderContext lavenderContext)
        {
            _logger = logger;
            _env = env;
            this.lavenderContext = lavenderContext;
        }

        [Route("/tim-vanchuyen-theo-sohoadon")]
        [HttpGet]
        public async Task<IActionResult> FindShipByBillId(int sohoadon)
        {
            var vanchuyen = await (from v in lavenderContext.Vanchuyen
                                   where v.Sohoadon == sohoadon
                                   select v).FirstOrDefaultAsync();
            return StatusCode(200, Json(vanchuyen));
        }
    }

}



