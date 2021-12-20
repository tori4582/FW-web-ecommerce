using System;
using System.Collections.Generic;
using Newtonsoft.Json;

#nullable disable

namespace Back.Models
{
    public partial class Chitietvanchuyen
    {
        public int Machitietvanchuyen { get; set; }
        public int Mavanchuyen { get; set; }
        public DateTime Thoidiem { get; set; }
        public string Trangthai { get; set; }

        public virtual Vanchuyen MavanchuyenNavigation { get; set; }
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
