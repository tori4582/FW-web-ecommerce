using System;
using System.Collections.Generic;
using Newtonsoft.Json;

#nullable disable

namespace Back.Models
{
    public partial class Khuyenmai
    {
        public Khuyenmai()
        {
            Hoadons = new HashSet<Hoadon>();
        }

        public int Makhuyenmai { get; set; }
        public string Tenkhuyenmai { get; set; }
        public double Tilekhuyenmai { get; set; }
        public DateTime Ngaybatdau { get; set; }
        public DateTime Ngayketthuc { get; set; }
        public string Dieukien { get; set; }

        public virtual ICollection<Khuyenmaicuatoi> Khuyenmaicuatois { get; set; }
        [JsonIgnore]
        public virtual ICollection<Hoadon> Hoadons { get; set; }
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
