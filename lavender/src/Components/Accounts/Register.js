import React, { useState } from "react";
import "./Register.css";
import * as registerAct from "../redux/actions/registerAct";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as myToast from "../../Common/helper/toastHelper";

function Register(props) {
  const [hovaten, setHovaten] = useState("");
  const [email, setEmail] = useState("");
  const [sodienthoai, setSodienthoai] = useState("");
  const [ngaysinh, setNgaysinh] = useState(new Date());
  const [tendangnhap, setTendangnhap] = useState("");
  const [matkhau, setMatkhau] = useState("");
  const [nhaplaimatkhau, setNhaplaimatkhau] = useState("");
  const [dongydieukhoan, setDongydieukhoan] = useState(false);

  const handleSubmit = () => {
    if (matkhau !== nhaplaimatkhau) {
      myToast.toastError("Nhập lại mật khẩu sai");
      return;
    }
    myToast.toastLoading();
    var bodyFormData = new FormData();
    bodyFormData.append("hovaten", hovaten);
    bodyFormData.append("email", email);
    bodyFormData.append("sodienthoai", sodienthoai);
    bodyFormData.append(
      "ngaysinh",
      new Date(ngaysinh).toISOString().split("T")[0]
    );
    bodyFormData.append("tendangnhap", tendangnhap);
    bodyFormData.append("matkhau", matkhau);
    var postRegisterReport = props.registerActionCreators.postRegisterReport;
    postRegisterReport(bodyFormData);
  };
  return (
    <section className="section-register">
      {console.log(props.location)}
      <div className="register">
        <div className="container ">
          <div className="row">
            <div className="col-md-3 register-left">
              <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
              <h3 className="text-light font-weight-bold">Welcome</h3>
              <p>You are 30 seconds away from earning your own money!</p>
              <button
                className="btn2"
                type="submit"
                id="submit"
                name
                defaultValue="Login"
                onClick={handleSubmit}
                disabled={!dongydieukhoan}
              >
                Đăng kí
              </button>
              <br />
            </div>
            <div className="col-md-9 register-right">
              <div className="row d-flex justify-content-center align-items-center">
                <div className="">
                  <div className="affix">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Đăng kí
                    </p>
                    <form className="mx-1 mx-md-6">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="name"
                            className="form-control border"
                            value={hovaten}
                            onChange={(e) => setHovaten(e.target.value)}
                          />
                          <label className="form-label" htmlFor="name">
                            Họ và Tên
                          </label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control border"
                          />
                          <label className="form-label" htmlFor="email">
                            Email
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-phone fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="tel"
                            id="tel"
                            className="form-control border"
                            onChange={(e) => setSodienthoai(e.target.value)}
                            value={sodienthoai}
                          />
                          <label className="form-label" htmlFor="name">
                            Số điện thoại
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-calendar fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="date"
                            id="birth"
                            className="form-control border"
                            onChange={(e) =>
                              setNgaysinh(new Date(e.target.value))
                            }
                            value={ngaysinh.toISOString().split("T")[0]}
                          />
                          <label className="form-label" htmlFor="name">
                            Ngày sinh
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="username"
                            id="username"
                            className="form-control border"
                            value={tendangnhap}
                            onChange={(e) => setTendangnhap(e.target.value)}
                          />
                          <label className="form-label" htmlFor="password">
                            Tên đăng nhâp
                          </label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="password"
                            className="form-control border"
                            value={matkhau}
                            onChange={(e) => setMatkhau(e.target.value)}
                          />
                          <label className="form-label" htmlFor="password">
                            Mật khẩu
                          </label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4cd"
                            className="form-control border"
                            value={nhaplaimatkhau}
                            onChange={(e) => setNhaplaimatkhau(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example4cd"
                          >
                            Nhập lại mật khẩu
                          </label>
                        </div>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className=" me-2"
                          type="checkbox"
                          defaultValue
                          id="confirm"
                          checked={dongydieukhoan}
                          onChange={(e) => setDongydieukhoan(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="confirm">
                          Đồng ý với tất cả các tuyên bố trong{" "}
                          <Link to="/rules">Các điều khoản dịch vụ</Link>
                        </label>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Register.propTypes = {
  loregisterginActionCreators: PropTypes.shape({
    postLoginReport: PropTypes.func,
  }),
  email: PropTypes.string,
  password: PropTypes.string,
  hasLogined: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    email: state.register.email,
    password: state.register.password,
    hasLogined: state.register.hasLogined,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    registerActionCreators: bindActionCreators(registerAct, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
