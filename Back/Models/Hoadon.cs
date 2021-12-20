using System;
using System.Collections.Generic;
using Newtonsoft.Json;

#nullable disable

namespace Back.Models
{
    public partial class Hoadon
    {
        //public Hoadon()
        //{
        //    Chitiethoadons = new HashSet<Chitiethoadon>();
        //    Vanchuyens = new HashSet<Vanchuyen>();
        //}

        public int? Sohoadon { get; set; }
        public int Makhachhang { get; set; }
        public int? Makhuyenmai { get; set; }
        public DateTime? Ngayhoadon { get; set; }
        public int? Manhanvien { get; set; }
        public double? Tongtien { get; set; }

        public virtual Khachhang MakhachhangNavigation { get; set; }
        public virtual Khuyenmai MakhuyenmaiNavigation { get; set; }
        public virtual Nhanvien ManhanvienNavigation { get; set; }
        [JsonIgnore]
        public virtual ICollection<Chitiethoadon> Chitiethoadons { get; set; }
        [JsonIgnore]
        public virtual ICollection<Vanchuyen> Vanchuyens { get; set; }
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
