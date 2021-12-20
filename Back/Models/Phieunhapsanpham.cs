using System;
using System.Collections.Generic;
using Newtonsoft.Json;

#nullable disable

namespace Back.Models
{
    public partial class Phieunhapsanpham
    {
        public int? Maphieunhap { get; set; }
        public int Masanpham { get; set; }
        public int Manhacungcap { get; set; }
        public int Soluongnhap { get; set; }
        public DateTime Ngaynhap { get; set; }
        public double Tiennhap { get; set; }
        public string Ghichu { get; set; }

        public virtual Nhacungcap ManhacungcapNavigation { get; set; }
        public virtual Sanpham MasanphamNavigation { get; set; }
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
