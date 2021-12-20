using System;
using System.Collections.Generic;
using Newtonsoft.Json;

#nullable disable

namespace Back.Models
{
    public partial class Thongsokithuat
    {
        public int Mathongso { get; set; }
        public int Masanpham { get; set; }
        public string Ten { get; set; }
        public string Noidung { get; set; }

        public virtual Sanpham MasanphamNavigation { get; set; }
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
