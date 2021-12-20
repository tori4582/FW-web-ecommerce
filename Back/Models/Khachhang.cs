using System;
using System.Collections.Generic;
using Newtonsoft.Json;

#nullable disable

namespace Back.Models
{
    public partial class Khachhang
    {
        public Khachhang()
        {
            Danhgias = new HashSet<Danhgia>();
            Giohangs = new HashSet<Giohang>();
            Hoadons = new HashSet<Hoadon>();
            Taikhoankhachhangs = new HashSet<Taikhoankhachhang>();
        }

        public int Makhachhang { get; set; }
        public string Tenkhachhang { get; set; }
        public string Email { get; set; }
        public string Sodienthoai { get; set; }
        public string Diachi { get; set; }
        public DateTime? Ngaysinh { get; set; }
        public string Loaikhachhang { get; set; }
        public string Image { get; set; }
        public string Cccd { get; set; }

        public virtual ICollection<Danhsachyeuthich> Danhsachyeuthichs { get; set; }
        [JsonIgnore]
        public virtual ICollection<Khuyenmaicuatoi> Khuyenmaicuatois { get; set; }
        [JsonIgnore]    
        public virtual ICollection<Danhgia> Danhgias { get; set; }
        [JsonIgnore]
        public virtual ICollection<Giohang> Giohangs { get; set; }
        [JsonIgnore]
        public virtual ICollection<Hoadon> Hoadons { get; set; }
        [JsonIgnore]
        public virtual ICollection<Taikhoankhachhang> Taikhoankhachhangs { get; set; }
        [JsonIgnore]
        public virtual ICollection<Khachhangdangnhap> Khachhangdangnhaps { get; set; }
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
