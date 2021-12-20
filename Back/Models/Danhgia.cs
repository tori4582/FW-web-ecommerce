using System;
using System.Collections.Generic;
using Newtonsoft.Json;

#nullable disable

namespace Back.Models
{
    public partial class Danhgia
    {
        public int Madanhgia { get; set; }
        public int Masanpham { get; set; }
        public int Makhachhang { get; set; }
        public string Noidung { get; set; }
        public int Sosao { get; set; }
        public DateTime Thoigian { get; set; }
        public string Image { get; set; }

        public virtual Khachhang MakhachhangNavigation { get; set; }
        public virtual Sanpham MasanphamNavigation { get; set; }
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
