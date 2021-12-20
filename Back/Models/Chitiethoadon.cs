using System;
using System.Collections.Generic;
using Newtonsoft.Json;

#nullable disable

namespace Back.Models
{
    public partial class Chitiethoadon
    {
        public int Sohoadon { get; set; }
        public string Imei { get; set; }
        public double Tien { get; set; }

        public virtual Chitietsanpham ImeiNavigation { get; set; }
        public virtual Hoadon SohoadonNavigation { get; set; }
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
