using System;
using System.Collections.Generic;
using Newtonsoft.Json;
#nullable disable

namespace Back.Models
{
    public partial class Khachhangdangnhap
    {
        public Khachhangdangnhap()
        {
        }
        public string Refreshtoken { get; set; }
        public int Makhachhang { get; set; }
      
        public string Ip { get; set; }
        public string Location { get; set; }

        public virtual  Khachhang MakhachhangNavigation { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
