using System;
using Newtonsoft.Json;

namespace Back.ModelDTO
{
    public class CartPayingObject
    {
        public CartPayingObject()
        {
           
        }
        public int Masanpham { get; set; }
        public string Dungluong { get; set; }
        public string Mausac { get; set; }
        public int Soluong { get; set; }
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
