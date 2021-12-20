using System;
using System.Collections.Generic;
using Newtonsoft.Json;

#nullable disable

namespace Back.Models
{
    public partial class Giohang
    {
        public Giohang()
        {
            Chitietgiohangs = new HashSet<Chitietgiohang>();
        }

        public int Magiohang { get; set; }
        public int Makhachhang { get; set; }
        public double Tongtien { get; set; }

        public virtual Khachhang MakhachhangNavigation { get; set; }
        [JsonIgnore]
        public virtual ICollection<Chitietgiohang> Chitietgiohangs { get; set; }
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
