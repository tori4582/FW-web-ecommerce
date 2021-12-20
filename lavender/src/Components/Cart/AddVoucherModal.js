import React, { Component } from "react";
import "reactjs-popup/dist/index.css";
import Modal from "react-modal";
import "./AddVoucherModal.css";
import VoucherItem from "./VoucherItem";
import * as myVoucherApi from "../apis/myvoucher";
import * as myToast from "../../Common/helper/toastHelper";
import * as voucherApi from "../apis/voucher";
import Cookies from "universal-cookie";

const cookie = new Cookies();

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default class AddVoucherModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle: undefined,
      makhuyenmai: undefined,
      makhuyenmaitemp: undefined,
      listvoucher: [],
      chonkhuyenmai: undefined,
    };
  }
  chonKhuyenmai(makhuyenmai) {
    let chonkhuyenmai = undefined;
    for (var i = 0; i < this.state.listvoucher.length; i++) {
      if (makhuyenmai === this.state.listvoucher[i].makhuyenmai) {
        chonkhuyenmai = this.state.listvoucher[i];
      }
    }
    this.setState({ chonkhuyenmai: chonkhuyenmai, makhuyenmai: makhuyenmai });
  }
  async checkVoucher() {
    var khonghople = true;
    var token = cookie.get("token");
    var refreshtoken = cookie.get("refreshtoken");
    await voucherApi
      .checkVoucherById(this.state.makhuyenmaitemp, token, refreshtoken)
      .then((success) => {
        if (success.status === 200) {
          myToast.toastSucces("Mã khuyến mãi hợp lệ");
          this.setState({
            chonkhuyenmai: success.data.value,
            makhuyenmai: this.state.makhuyenmaitemp,
          });
          khonghople = false;
          return;
        }
      })
      .catch(() => {});
    if (khonghople) {
      myToast.toastError("Mã không hợp lệ");
      this.setState({ chonkhuyenmai: undefined, makhuyenmai: undefined });
    }
  }
  afterOpenModal() {
    var a = this.state.subtitle;
    a.style.color = "#f00";
    a.style.width = "500px";
    a.style.height = "500px";
    this.setState({ subtitle: a });
  }
  closeModal() {
    this.props.closeModal();
  }
  async componentDidMount() {
    let listvoucher = null;
    var token = cookie.get("token");
    var refreshtoken = cookie.get("refreshtoken");
    await myVoucherApi
      .detailMyVoucher(this.props.customer.makhachhang, token, refreshtoken)
      .then((success) => {
        if (success.status === 200) {
          listvoucher = success.data.value.$values;
        }
      })
      .catch((error) => {
        console.error(error);
      });

    this.setState({ listvoucher: listvoucher });
  }

  render() {
    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        onRequestClose={this.closeModal.bind(this)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="styles__StyledCouponModal-sc-evws2p-0 ijfiKe">
          <div className="header">
            <div className="title">Lavender Khuyến Mãi</div>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 24 24"
              className="close"
              size={25}
              color="#999999"
              height={25}
              width={25}
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: "rgb(153, 153, 153)" }}
              onClick={this.closeModal.bind(this)}
            >
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </div>
          <div className="styles__StyledCouponInput-sc-1jz9vfn-0 bBpgLT">
            <input
              data-view-id="cart_coupon_input"
              placeholder="Nhập Mã Khuyến Mãi"
              className="input"
              style={{ width: "330px" }}
              value={
                this.state.makhuyenmaitemp === undefined
                  ? ""
                  : this.state.makhuyenmaitemp
              }
              onChange={(e) =>
                this.setState({ makhuyenmaitemp: e.target.value })
              }
            />
            <button
              data-view-id="cart_coupon_apply.button"
              className="btn btn-primary"
              style={{ opacity: "0.5", width: "100px" }}
              onClick={this.checkVoucher.bind(this)}
            >
              Áp Dụng
            </button>
          </div>
          <div className="body-scroll">
            <div className="styles__GroupedCouponWrapper-sc-evws2p-1 jdEAhj">
              <div className="group-header">
                <div className="group-header__title">Mã Giảm Giá</div>
                <div className="group-header__condition">Áp dụng tối đa: 1</div>
              </div>
              <div
                className="coupon-list"
                data-view-id="platform_coupon"
                data-view-index={0}
              >
                <div>
                  {function () {
                    let result = null;
                    result = this.state.listvoucher.map((value, key) => {
                      return (
                        <VoucherItem
                          voucher={value}
                          chonKhuyenmai={this.chonKhuyenmai.bind(this)}
                          key={key}
                          makhuyenmai={this.state.makhuyenmai}
                        ></VoucherItem>
                      );
                    });
                    return result;
                  }.bind(this)()}
                </div>
              </div>
            </div>
          </div>
          <div className="footer">
            <button
              className="btn btn-primary btn-xong"
              onClick={() => {
                if (this.state.chonkhuyenmai === undefined) {
                  this.props.chonKhuyenmai(undefined);
                  this.closeModal();
                  return;
                }
                this.props.chonKhuyenmai(this.state.chonkhuyenmai);
                this.closeModal();
              }}
            >
              Xong
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}
