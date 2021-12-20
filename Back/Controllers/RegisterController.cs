using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Back.Common;
using Back.ModelDTO;
using Back.Models;
using Back.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;
using Newtonsoft.Json.Linq;
namespace Back.Controllers
{
    // [EnableCors(origins: "*", headers: "accept,content-type,origin,x-my-header", methods: "*")]

    [ApiController]
    public class RegisterController : Controller
    {
        private readonly ILogger<RegisterController> _logger;
        private readonly lavenderContext lavenderContext;
        private readonly IEmailSender sendMailService;
        private readonly IConfiguration _configuration;
        public RegisterController(ILogger<RegisterController> logger, lavenderContext lavenderContext, IConfiguration configuration, IEmailSender sendMailService)
        {
            _logger = logger;
            _configuration = configuration;
            this.lavenderContext = lavenderContext;
            this.sendMailService = sendMailService;
        }

        [Route("/register")]
        [HttpPost]
        public async Task<IActionResult> Register([FromForm] RegisterForm registerForm)
        {
            string status = "";

            {
                Taikhoankhachhang temp = await (from x in lavenderContext.Taikhoankhachhang
                                                where x.Username.Equals(registerForm.tendangnhap)
                                                select x).FirstOrDefaultAsync();
                status = "Tên đăng nhập đã tồn tại";
                if (temp != null) return StatusCode(409, Json(status));
            }
            {
                var temp = await (from x in lavenderContext.Khachhang
                                  where x.Email.Equals(registerForm.email)
                                  select x).FirstOrDefaultAsync();
                status = "Email đã tồn tại";
                if (temp != null) return StatusCode(409, Json(status));
            }
            Khachhang khachhang = new Khachhang();
            khachhang.Tenkhachhang = registerForm.hovaten;
            khachhang.Email = registerForm.email;
            khachhang.Sodienthoai = registerForm.sodienthoai;
            khachhang.Ngaysinh = DateTime.Parse(registerForm.ngaysinh).ToLocalTime();
            khachhang.Loaikhachhang = "Thành viên";
            khachhang.Image = "/khachhang";
            await lavenderContext.AddAsync(khachhang);
            await lavenderContext.SaveChangesAsync();

            var khachhangtemp = await (from s in lavenderContext.Khachhang
                                       where s.Email.Equals(registerForm.email)
                                       select s).FirstOrDefaultAsync();
            var token = MyTokenHandler.GenerateCommonToken(khachhangtemp.Makhachhang.ToString(), _configuration);
            Taikhoankhachhang taikhoankhachhang = new Taikhoankhachhang();
            taikhoankhachhang.Username = registerForm.tendangnhap;
            taikhoankhachhang.Password = registerForm.matkhau;
            taikhoankhachhang.Makhachhang = khachhangtemp.Makhachhang;
            taikhoankhachhang.Token = token;
            taikhoankhachhang.Kichhoat = 0;

            await lavenderContext.AddAsync(taikhoankhachhang);
            await lavenderContext.SaveChangesAsync();
            string htmlemail = $"Bạn đã đăng ký tài khoản trên Lavender, " +
                $"hãy <a href = 'https://localhost:5001/confirm-email?makhachhang={khachhangtemp.Makhachhang}&token={token}'>" +
                "bấm vào đây</a> để kích hoạt tài khoản.";
            await sendMailService.SendEmailAsync(registerForm.email, "Lavender xác nhận đăng ký tài khoản", htmlemail);
            return StatusCode(200);
        }

        [Route("/confirm-email")]
        [HttpGet]
        public async Task<IActionResult> ConfirmEmail(int makhachhang, string token)
        {
            var taikhoankhachhang = await (from x in lavenderContext.Taikhoankhachhang
                                           where x.Makhachhang == makhachhang
                                           && x.Kichhoat == 0
                                           && x.Token.Equals(token)

                                           select x).FirstOrDefaultAsync();
            string tieude = "";
            string noidung = "";
            if (taikhoankhachhang == null)
            {
                tieude = "Lỗi xác thực email";
                noidung = "Có lỗi khi xác thực địa chỉ mail";
            }
            else
            {
                taikhoankhachhang.Kichhoat = 1;
                await lavenderContext.SaveChangesAsync();

                {
                    tieude = "Xác thực email thành công";
                    noidung = "Đăng nhập và sử dụng Lavender <a href = 'http://localhost:3000/login'>" +
                    "tại đây</a>";
                }
            }

            string html = 
                    $"<main role='main' class='pb-3'>" +
                    $"<h1>{tieude}.</h1>" +
                    $"<div><p>{noidung}</p></div></main>";
            return Content(html, "text/html", Encoding.UTF8);
        }
    }
}
