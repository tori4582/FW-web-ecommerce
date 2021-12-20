using System;
using System.Collections.Generic;
using Newtonsoft.Json;

#nullable disable

namespace Back.Models
{
    public partial class Chitietsanpham
    {
        public Chitietsanpham()
        {
            Baohanhs = new HashSet<Baohanh>();
            Chitiethoadons = new HashSet<Chitiethoadon>();
        }

        public string Imei { get; set; }
        public int Masanpham { get; set; }
        public DateTime Ngaysanxuat { get; set; }
        public string Tinhtrang { get; set; }
        public string Mausac { get; set; }
        public string Dungluong { get; set; }
        public float Giamoi { get; set; }
        public string Image { get; set; }

        public virtual Sanpham MasanphamNavigation { get; set; }
        [JsonIgnore]
        public virtual ICollection<Baohanh> Baohanhs { get; set; }
        [JsonIgnore]
        public virtual ICollection<Chitiethoadon> Chitiethoadons { get; set; }
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
