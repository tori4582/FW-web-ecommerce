using System;
using System.Collections.Generic;
using Newtonsoft.Json;

#nullable disable

namespace Back.Models
{
    public partial class Khuyenmaicuatoi
    {
        public Khuyenmaicuatoi()
        {
        }
        public int Makhachhang { get; set; }
        public int Makhuyenmai { get; set; }
        public DateTime Ngaythem { get; set; }

        [JsonIgnore]
        public virtual Khachhang MakhachhangNavigation { get; set; }
        public virtual Khuyenmai MakhuyenmaiNavigation { get; set; }
        
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
