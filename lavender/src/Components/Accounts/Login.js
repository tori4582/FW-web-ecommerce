import React, { useState } from "react";
import "./Login.css";
import { useSelector, useDispatch } from "react-redux";
import * as loginAct from "../redux/actions/loginAct";
import { Link, Redirect } from "react-router-dom";
import * as myToast from "../../Common/helper/toastHelper";
import { useGoogleLogin } from "react-google-login";
import * as myConst from "../../Common/constants/index";
import Cookies from "universal-cookie";

const cookie = new Cookies();

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [savelogin, setSaveLogin] = useState(false);
  const [lanhanvien, setLanhanvien] = useState(false);
  const makhachhang = useSelector((state) => state.login.makhachhang);
  const manhanvien = useSelector((state) => state.login.manhanvien);
  const dispatch = useDispatch();
  const clientId = myConst.CLIENT_ID;

  const submitSignin = () => {
    if (username === "") {
      myToast.toastError("Username không được bỏ trống");
      return;
    }
    if (password === "") {
      myToast.toastError("Password không được bỏ trống");
      return;
    }
    myToast.toastLoading();
    dispatch(
      loginAct.postLoginReport({
        username: username,
        password: password,
        loaitaikhoan: lanhanvien ? "nhanvien" : "khachhang",
        savelogin: savelogin,
      })
    );
  };

  const onSuccess = (res) => {
    if (cookie.get("refreshtoken") !== undefined) {
      return;
    }
    myToast.toastLoading();
    dispatch(loginAct.postLoginWithGoogleReport(res.profileObj));
  };
  const onFailure = (res) => {
    console.log("loginfail", res);
    myToast.toastError("đăng nhập thất bại");
  };
  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: "offline",
  });
  return (
    <section>
      {makhachhang !== undefined && <Redirect to="/" />}
      {manhanvien !== undefined && <Redirect to="/admin/overview" />}
      <div className="group-login">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6 ">
              <img
                src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid img-login px-2 mt-6"
                alt="img-login"
              ></img>
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 z-index-2 pt-3 bg-white rounded">
              <div className="group-switch d-flex justify-content-around">
                <h5>Khách hàng</h5>
                <label className="switch">
                  <input
                    type="checkbox"
                    onChange={(e) => setLanhanvien(e.target.checked)}
                    checked={lanhanvien}
                  />
                  <span className="slider round" />
                </label>
                <h5>Nhân viên</h5>
              </div>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="username"
                  className="form-control form-control-lg border"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
                <label className="form-label" htmlFor="form1Example13">
                  Tên đăng nhập
                </label>
              </div>
              {/* Password input */}
              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="password"
                  className="form-control form-control-lg border"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <label className="form-label" htmlFor="form1Example23">
                  Mật khẩu
                </label>
              </div>
              <div className="d-flex justify-content-around align-items-center mb-4">
                {/* Checkbox */}
                <div className="">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue
                    id="form1Example3"
                    defaultChecked
                    onChange={(e) => setSaveLogin(e.target.checked)}
                    checked={savelogin}
                  />
                  <label className="form-check-label" htmlFor="form1Example3">
                    Ghi nhớ đăng nhập
                  </label>
                </div>
                <Link to="/forgotpassword" className="forgot-password-link">Quên mật khẩu?</Link>
              </div>
              <button
                className="btn btn-primary btn-lg btn-block"
                onClick={() => {
                  submitSignin();
                }}
              >
                Đăng nhập
              </button>
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0 text-muted"></p>
              </div>

              { !lanhanvien&& (  <div className="group-expand-login">
                  <Link
                    className="btn btn-success btn-lg btn-block"
                    to="/register"
                    role="button"
                    Suplier
                  >
                    <i className="fab fa-register me-2" />
                    Đăng kí
                  </Link>
                  {/* <Link
                    className="btn btn-info btn-lg btn-block d-block"
                    role="button"
                    Suplier
                  >
                    <i className="fab fa-facebook-f me-2 " />
                    Đăng nhập bằng Facebook
                  </Link> */}
                  <button
                    className="btn btn-warning btn-lg btn-block d-block "
                    onClick={() => {
                      signIn(); 
                    }}
                  >
                    <i className="fab fa-google me-2" />
                    đăng nhập bằng google
                  </button>
                </div>)
              
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default (Login);
