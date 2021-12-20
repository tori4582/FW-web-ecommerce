using System;
using System.Collections.Generic;
using Newtonsoft.Json;

#nullable disable

namespace Back.Models
{
    public partial class Baohanh
    {
        public int Mabaohanh { get; set; }
        public string Imei { get; set; }
        public DateTime Ngaybaohanh { get; set; }
        public double Chiphi { get; set; }
        public string Ghichu { get; set; }

        public virtual Chitietsanpham ImeiNavigation { get; set; }
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
