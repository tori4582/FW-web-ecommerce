using Newtonsoft.Json;

namespace Back.ModelDTO
{
    public class LoginForm
    {
        public string username { get; set; }
        public string password { get; set; }
        public bool savelogin { get; set; }
        public string loaitaikhoan { get; set; }
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}