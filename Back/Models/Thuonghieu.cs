using System;
using System.Collections.Generic;
using Newtonsoft.Json;

#nullable disable

namespace Back.Models
{
    public partial class Thuonghieu
    {
        public Thuonghieu()
        {
            Sanphams = new HashSet<Sanpham>();
        }

        public int Mathuonghieu { get; set; }
        public string Tenthuonghieu { get; set; }
        public string Xuatxu { get; set; }
        public string Image { get; set; }

        [JsonIgnore]
        public virtual ICollection<Sanpham> Sanphams { get; set; }
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
