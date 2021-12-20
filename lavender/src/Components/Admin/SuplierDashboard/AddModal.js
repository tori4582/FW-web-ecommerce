import React, { Component } from "react";
import "reactjs-popup/dist/index.css";
import Modal from "react-modal";
import * as suplierApi from "../../apis/suplier";
import * as myToast from "../../../Common/helper/toastHelper";
import "./style.css";
import Cookies from "universal-cookie";

const cookie = new Cookies();

const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default class AddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tennhacungcap: "",
      email: "",
      sodienthoai: "",
      diachi: "",
      progress: 0,
      image: undefined,
    };
  }
  submitHandler = () => {
    const fd = new FormData();
    fd.append("tennhacungcap", this.state.tennhacungcap);
    fd.append("email", this.state.email);
    fd.append("sodienthoai", this.state.sodienthoai);
    fd.append("diachi", this.state.diachi);
    fd.append("image", this.state.image);

    var token = cookie.get("token");
    var refreshtoken = cookie.get("refreshtoken");
    suplierApi
      .addSuplier(fd, this.setProgress.bind(this), token, refreshtoken)
      .then((success) => {
        this.props.add(success.data.value);
        this.props.closeModal();
      })
      .catch((error) => {
        myToast.toastError("Thêm mới thất bại");
        console.error(error);
      });
  };

  setProgress(percent) {
    if (percent === 100) {
      myToast.toastSucces("Thêm mới thành công");
      this.props.closeModal();
    }
    this.setState({ progress: percent });
  }

  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        onRequestClose={this.props.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div class=" nhacungcapmodal add-item-modal" role="document">
          <div class="">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Thêm mới nhà cung cấp
              </h5>
            </div>

            <div className="form-main-add-edit">
              <div className="row mb-3">
                <span className="text-secondary text-xs font-weight-bold">
                  <img
                    alt=""
                    style={{ width: "80px", height: "80px" }}
                    src={
                      this.state.image !== undefined
                        ? URL.createObjectURL(this.state.image)
                        : ""
                    }
                  ></img>
                </span>
              </div>

              <div className="row mb-1">
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  Tên nhà cung cấp
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                  <input
                    className="form-control border "
                    id="tennhacungcap"
                    placeholder=""
                    onChange={(e) => {
                      this.setState({ tennhacungcap: e.target.value });
                    }}
                    value={this.state.tennhacungcap}
                  ></input>
                </div>
              </div>

              <div className="row mb-1">
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">Email</div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                  <input
                    className="form-control border"
                    id="email"
                    type="email"
                    placeholder=""
                    onChange={(e) => {
                      this.setState({ email: e.target.value });
                    }}
                    value={this.state.email}
                  ></input>
                </div>
              </div>

              <div className="row mb-1">
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  Số điện thoại
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                  <input
                    className="form-control border"
                    id="sodienthoai"
                    type="tel"
                    placeholder=""
                    onChange={(e) => {
                      this.setState({ sodienthoai: e.target.value });
                    }}
                    value={this.state.sodienthoai}
                  ></input>
                </div>
              </div>

              <div className="row mb-1">
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  Địa chỉ
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                  <input
                    className="form-control border"
                    id="diachi"
                    placeholder=""
                    onChange={(e) => {
                      this.setState({ diachi: e.target.value });
                    }}
                    value={this.state.diachi}
                  ></input>
                </div>
              </div>
            </div>
            <hr></hr>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: this.state.progress + "%" }}
              ></div>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.props.closeModal}
              >
                Đóng
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={this.submitHandler.bind(this)}
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
