using System;
using System.Collections.Generic;
using Newtonsoft.Json;

#nullable disable

namespace Back.Models
{
    public partial class Danhsachyeuthich
    {
        public int Makhachhang { get; set; }
        public int Masanpham { get; set; }

        public virtual Khachhang MakhachhangNavigation { get; set; }
        public virtual Sanpham MasanphamNavigation { get; set; }
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
