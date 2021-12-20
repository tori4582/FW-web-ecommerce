using System;
using System.Collections.Generic;
using Newtonsoft.Json;
#nullable disable

namespace Back.Models
{
    public partial class Vanchuyen
    {
        public Vanchuyen()
        {
            Chitietvanchuyens = new HashSet<Chitietvanchuyen>();
        }

        public int Mavanchuyen { get; set; }
        public int Sohoadon { get; set; }
        public string Trangthai { get; set; }

        public virtual Hoadon SohoadonNavigation { get; set; }
        [JsonIgnore]
        public virtual ICollection<Chitietvanchuyen> Chitietvanchuyens { get; set; }
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
