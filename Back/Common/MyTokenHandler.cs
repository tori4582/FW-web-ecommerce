using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Back.Common
{
    public class MyTokenHandler
    {
        public static readonly string ADMINISTRATOR = "ADMINISTRATOR";
        public static readonly string STAFF = "STAFF";
        public static readonly string GUEST = "GUEST";

        public MyTokenHandler()
        {
        }

        public static string GenerateRefreshToken(string username, string role, IConfiguration configuration)
        {
            var key = configuration["JwtSecurityKey"];
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes(key);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, username),
                    new Claim(ClaimTypes.Role, role)
                }),
                Expires = DateTime.UtcNow.AddDays(int.Parse(configuration["RefreshTokenExpiryInDays"])),
                //Expires = DateTime.UtcNow.AddMilliseconds(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public static string GenerateAccessToken(string username, string role, IConfiguration configuration)
        {
            var key = configuration["JwtSecurityKey"];
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes(key);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, username),
                    new Claim(ClaimTypes.Role, role)
                }),
                Expires = DateTime.UtcNow.AddHours(int.Parse(configuration["AccessTokenExpiryInHours"])),
                //Expires = DateTime.UtcNow.AddSeconds(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public static string GenerateCommonToken(string id, IConfiguration configuration)
        {
            var key = configuration["JwtSecurityKey"];
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.UTF8.GetBytes(key);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("id", id)
                }),
                Expires = DateTime.UtcNow.AddHours(int.Parse(configuration["AccessTokenExpiryInHours"])),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }


        public static Dictionary<string, string> TokenPayloadHandler(string encodedBearer)
        {
            if (encodedBearer != null)
            {


                var handler = new JwtSecurityTokenHandler();
                var jwtSecurityToken = handler.ReadJwtToken(encodedBearer);
                string[] jwttoken = jwtSecurityToken.ToString().Split("}.{");

                //string jwtheader = jwttoken[0];
                string jwtpayload = jwttoken[1];

                string[] attributes = jwtpayload.Replace("{", "").Replace("}", "").Split(',');

                Dictionary<string, string> dict = new Dictionary<string, string>();

                foreach (var i in attributes)
                {
                    string[] phrase = i.Replace("\"", "").Split(':');
                    dict.Add(phrase[0], phrase[1]);
                }
                return dict;
            }
            return null;
        }
    }
}