using System;
using System.Collections.Generic;
using Newtonsoft.Json;
#nullable disable

namespace Back.Models
{
    public partial class Nhanviendangnhap
    {
        public Nhanviendangnhap()
        {
        }
        public string Refreshtoken { get; set; }
        public int Manhanvien { get; set; }
    
        public string Ip { get; set; }
        public string Location { get; set; }

        public virtual Nhanvien ManhanvienNavigation { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
