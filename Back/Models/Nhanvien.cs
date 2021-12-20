using System;
using System.Collections.Generic;
using Newtonsoft.Json;

#nullable disable

namespace Back.Models
{
    public partial class Nhanvien
    {
        public Nhanvien()
        {
            Hoadons = new HashSet<Hoadon>();
            Taikhoannhanviens = new HashSet<Taikhoannhanvien>();
        }

        public int Manhanvien { get; set; }
        public string Tennhanvien { get; set; }
        public string Email { get; set; }
        public string Sodienthoai { get; set; }
        public string Diachi { get; set; }
        public DateTime Ngayvaolam { get; set; }
        public string Cccd { get; set; }
        public DateTime Ngaysinh { get; set; }
        public string Chucvu { get; set; }
        public string Image { get; set; }

        [JsonIgnore]
        public virtual ICollection<Hoadon> Hoadons { get; set; }
        [JsonIgnore]
        public virtual ICollection<Taikhoannhanvien> Taikhoannhanviens { get; set; }

        [JsonIgnore]
        public virtual ICollection<Nhanviendangnhap> Nhanviendangnhaps { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
