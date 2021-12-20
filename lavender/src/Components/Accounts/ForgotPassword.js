import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
function ForgotPassword() {
    const [email, setEmail] = useState("");
    function saveUser() {
        let url = "https://localhost:5001/forgotpassword/" + email.toString();
        console.log(email);
        axios.get(url);
        window.location.href="https://mail.google.com/mail/u/?authuser="+email.toString();
    }
    return (
        <div className="row d-flex justify-content-center">
            <div className="col-4">
                <form>
                    <div className="form-group ">
                        <h3>Quên mật khẩu</h3>
                        <input type="text"
                            value={email} name="email"
                            onChange={(e) => { setEmail(e.target.value) }}
                            className="form-control border mb-3" placeholder="Nhập Email hoặc tên đăng nhập" />
                        <small id="emailHelp" className="form-text text-muted"></small>
                    </div>
                    <button type="button" onClick={saveUser} className="btn btn-primary">Lấy Mật Khẩu</button>
                </form>
            </div>
        </div>
    )
}
export default ForgotPassword;