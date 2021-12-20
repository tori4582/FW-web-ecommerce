using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

#nullable disable

namespace Back.Models
{
    public class Chitietgiohang
    {
        [Key]
        public int Magiohang { get; set; }
        public int Masanpham { get; set; }
        public int? Soluong { get; set; }
        public string Dungluong { get; set; }
        public string Mausac { get; set; }

        [ForeignKey(nameof(Masanpham))]
        public Sanpham MasanphamNavigation { get; set; }
        public Giohang MagiohangNavigation { get; set; }
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
