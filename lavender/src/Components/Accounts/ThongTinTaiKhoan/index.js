import React, { Component } from "react";
import "./ThongTinTaiKhoan.css";
import * as customerApi from "../../apis/customer";
import * as myToast from "../../../Common/helper/toastHelper";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as khachhangApi from "../../apis/customer";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookie = new Cookies();

class index extends Component {
  state = {
    hovaten: "",
    diachi: "",
    ngaysinh: new Date(),
    sdt: "",
    email: "",
    sdt: "",
    email: "",
  };
  luuThayDoi() {
    var request = null;

    request = {
      makhachhang: this.props.makhachhang,
      hovaten: this.state.hovaten,
      diachi: this.state.diachi,
      ngaysinh: new Date(this.state.ngaysinh),
    };
    const token = cookie.get("token");
    const refreshtoken = cookie.get("refreshtoken");
    customerApi
      .thayDoiThongTin(request, token, refreshtoken)
      .then((success) => {
        if (success.status === 200) {
          myToast.toastSucces("Thay đổi thông tin thành công");
        } else myToast.toastError("Thay đổi thông tin thất bại");
      })
      .catch((error) => {
        myToast.toastError("Thay đổi thông tin thất bại");
        console.error(error);
      });
  }
  async componentDidMount() {
    let hovaten = "";
    let diachi = "";
    let ngaysinh = new Date();
    let sdt = "";
    let email = "";
    await khachhangApi
      .findCustomerByCustomerId(this.props.makhachhang)
      .then((success) => {
        if (success.status === 200) {
          hovaten = success.data.value.tenkhachhang;
          diachi = success.data.value.diachi;
          ngaysinh = new Date(success.data.value.ngaysinh);
          sdt = success.data.value.sodienthoai;
          email = success.data.value.email;
        }
      })
      .catch((error) => {
        console.error(error);
      });
    this.setState({
      hovaten: hovaten,
      diachi: diachi,
      ngaysinh: ngaysinh,
      email: email,
      sdt: sdt,
    });
  }
  render() {
    return (
      <div className="Account__StyledAccountLayoutInner-sc-1d5h8iz-1 jXurFV">
        <div className="styles__StyledHeading-sc-s5c7xj-0 geNdhL">
          Thông tin tài khoản
        </div>
        <div className="styles__StyleInfoPage-sc-s5c7xj-1 dfHeIP">
          <div className="info">
            <div className="info-left">
              <span className="info-title">Thông tin cá nhân</span>
              <div className="styles__StyledAccountInfo-sc-s5c7xj-2 ">
                <div>
                  <div className="form-control">
                    <div className="mb-3 row">
                      <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-form-label">
                        Họ &amp; Tên
                      </div>
                      <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                        <input
                          className="form-control-plaintext border rounded p-1"
                          type="search"
                          name="hovaten"
                          maxLength={200}
                          placeholder="Thêm họ tên"
                          value={this.state.hovaten}
                          onChange={(e) =>
                            this.setState({ hovaten: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-form-label">
                        Địa chỉ
                      </div>
                      <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                        <input
                          className="form-control-plaintext border rounded p-1"
                          type="address"
                          name="address"
                          onChange={(e) =>
                            this.setState({ diachi: e.target.value })
                          }
                          maxLength={200}
                          placeholder=""
                          value={this.state.diachi}
                        />
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-form-label">
                        Ngày sinh
                      </div>

                      <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9"></div>
                      <input
                        className="form-control-plaintext border w-30 rounded p-1"
                        type="date"
                        id="ngayhoadon"
                        name="trip-start"
                        onChange={(e) => {
                          this.setState({ ngaysinh: new Date(e.target.value) });
                        }}
                        value={this.state.ngaysinh.toISOString().split("T")[0]}
                      ></input>
                    </div>
                  </div>

                  <button
                    className="btn btn-primary"
                    onClick={this.luuThayDoi.bind(this)}
                  >
                    Lưu thay đổi
                  </button>
                </div>
              </div>
            </div>
            <div className="info-vertical" />
            <div className="info-right">
              <span className="info-title">Số điện thoại và Email</span>
              <div className="styles__StyledListItem-sc-s5c7xj-4 lCUBE">
                <div className="list-item">
                  <div className="info">
                    <img
                      src="https://frontend.tikicdn.com/_desktop-next/static/img/account/phone.png"
                      className="icon"
                      alt=""
                    />
                    <div className="detail">
                      <span>Số điện thoại</span>
                      <span>{this.state.sdt}</span>
                    </div>
                  </div>
                  <div className="status">
                    <span />
                    <Link
                      to="/lmember/thongtintaikhoan/sdt"
                      className="btn btn-primary"
                    >
                      Cập nhật
                    </Link>
                  </div>
                </div>

                <div className="list-item">
                  <div className="info">
                    <img
                      src="https://frontend.tikicdn.com/_desktop-next/static/img/account/email.png"
                      className="icon"
                      alt=""
                    />
                    <div className="detail">
                      <span>Địa chỉ email</span>
                      <span>{this.state.email}</span>
                    </div>
                  </div>
                  <div className="status">
                    <span />
                    <Link
                      to="/lmember/thongtintaikhoan/email"
                      className="btn btn-primary"
                    >
                      Cập nhật
                    </Link>
                  </div>
                </div>
              </div>
              <span className="info-title">Bảo mật</span>
              <div className="styles__StyledListItem-sc-s5c7xj-4 lCUBE">
                <div className="list-item">
                  <div>
                    <img
                      src="https://frontend.tikicdn.com/_desktop-next/static/img/account/lock.png"
                      className="icon"
                      alt=""
                    />
                    <span>Đổi mật khẩu</span>
                  </div>
                  <div className="status">
                    <span />
                    <button className="button active">Cập nhật</button>
                  </div>
                </div>
              </div>
              <span className="info-title">Liên kết mạng xã hội</span>
              <div className="styles__StyledListItem-sc-s5c7xj-4 lCUBE">
                <div className="list-item">
                  <div>
                    <img
                      alt="zalo"
                      src="https://frontend.tikicdn.com/_desktop-next/static/img/account/zalo.png"
                      className="icon"
                    />
                    <span>Zalo</span>
                  </div>
                  <div className="status">
                    <span />
                    <button className="button active">Liên kết</button>
                  </div>
                </div>
                <div className="list-item">
                  <div>
                    <img
                      alt="facebook"
                      src="https://frontend.tikicdn.com/_desktop-next/static/img/account/facebook.png"
                      className="icon"
                    />
                    <span>Facebook</span>
                  </div>
                  <div className="status">
                    <span />
                    <button className="button active">Liên kết</button>
                  </div>
                </div>
                <div className="list-item">
                  <div>
                    <img
                      alt="google"
                      src="https://frontend.tikicdn.com/_desktop-next/static/img/account/google.png"
                      className="icon"
                    />
                    <span>Google</span>
                  </div>
                  <div className="status">
                    <span />
                    <button className="button active">Liên kết</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
index.propTypes = {
  makhachhang: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    makhachhang: state.login.makhachhang,
  };
};

export default connect(mapStateToProps)(index);
