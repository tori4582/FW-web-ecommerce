using System;
using System.Collections.Generic;
using Newtonsoft.Json;

#nullable disable

namespace Back.Models
{
    public partial class Nhacungcap
    {
        public Nhacungcap()
        {
            Phieunhapsanphams = new HashSet<Phieunhapsanpham>();
        }

        public int Manhacungcap { get; set; }
        public string Tennhacungcap { get; set; }
        public string Email { get; set; }
        public string Sodienthoai { get; set; }
        public string Diachi { get; set; }
        public string Image { get; set; }

        [JsonIgnore]
        public virtual ICollection<Phieunhapsanpham> Phieunhapsanphams { get; set; }
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
