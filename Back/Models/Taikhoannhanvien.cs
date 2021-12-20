using System;
using System.Collections.Generic;
using Newtonsoft.Json;

#nullable disable

namespace Back.Models
{
    public partial class Taikhoannhanvien
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public int Manhanvien { get; set; }

        public virtual Nhanvien ManhanvienNavigation { get; set; }
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
