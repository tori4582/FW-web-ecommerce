using System;
using System.Collections.Generic;
using Newtonsoft.Json;

#nullable disable

namespace Back.Models
{
    public partial class Sanpham
    {
        public Sanpham()
        {
            Chitietgiohangs = new HashSet<Chitietgiohang>();
            Chitietsanphams = new HashSet<Chitietsanpham>();
            Danhgia = new HashSet<Danhgia>();
            Phieunhapsanphams = new HashSet<Phieunhapsanpham>();
        }

        public int? Masanpham { get; set; }
        public string Tensanpham { get; set; }
        public int Maloai { get; set; }
        public int Mathuonghieu { get; set; }
        public int Soluongton { get; set; }
        public string Mota { get; set; }
        public string Image { get; set; }
        public DateTime? Thoidiemramat { get; set; }
        public float Dongia { get; set; }

        public virtual Loaisanpham MaloaiNavigation { get; set; }
        public virtual Thuonghieu MathuonghieuNavigation { get; set; }
        [JsonIgnore]
        public virtual ICollection<Danhsachyeuthich> Danhsachyeuthichs { get; set; }
        [JsonIgnore]
        public virtual ICollection<Chitietgiohang> Chitietgiohangs { get; set; }
        [JsonIgnore]
        public virtual ICollection<Chitietsanpham> Chitietsanphams { get; set; }
        [JsonIgnore]
        public virtual ICollection<Danhgia> Danhgia { get; set; }
        [JsonIgnore]
        public virtual ICollection<Phieunhapsanpham> Phieunhapsanphams { get; set; }
        [JsonIgnore]
        public virtual ICollection<Thongsokithuat> Thongsokithuats { get; set; }
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
