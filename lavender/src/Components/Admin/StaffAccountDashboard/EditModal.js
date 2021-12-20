import React, { useState } from "react";
import "reactjs-popup/dist/index.css";
import Modal from "react-modal";
import * as staffAccountApi from "../../apis/staffaccount";
import * as myToast from "../../../Common/helper/toastHelper";
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

export default function EditModal(props) {
  const [manhanvien, setManhanvien] = useState(props.account.manhanvien);
  const [username, setUsername] = useState(props.account.username);
  const [password, setPassword] = useState(props.account.password);

  const [progress, setProgress] = useState(0);

  function submitHandler() {
    const fd = new FormData();
    fd.append("manhanvien", manhanvien);
    fd.append("username", username);
    fd.append("password", password);

    var token = cookie.get("token");
    var refreshtoken = cookie.get("refreshtoken");
    staffAccountApi
      .editAccount(fd, runProgress, token, refreshtoken)
      .then((success) => {
        props.editFunction(success.data.value);
        props.closeModal();
      })
      .catch((error) => {
        myToast.toastError("Thêm mới thất bại");
        console.error(error);
      });
  }

  const runProgress = (percent) => {
    if (percent === 100) {
      myToast.toastSucces("Sửa thành công");
      props.closeModal();
    }
    setProgress(percent);
  };

  return (
    <Modal
      isOpen={props.showModal}
      onRequestClose={props.closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div class="add-item-modal taikhoankhachhang" role="document">
        <div class="">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Thêm mới nhân viên
            </h5>
          </div>

          <div className="form-main-add-edit">
            <div className="row mb-1">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                Mã nhân viên
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                <input
                  className="form-control border "
                  id="manhanvien"
                  placeholder=""
                  onChange={(e) => setManhanvien(e.target.value)}
                  value={manhanvien}
                ></input>
              </div>
            </div>

            <div className="row mb-1">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                Username
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                <input
                  className="form-control border"
                  type="username"
                  placeholder=""
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                ></input>
              </div>
            </div>

            <div className="row mb-1">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                Password
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                <input
                  className="form-control border"
                  id="password"
                  placeholder=""
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                ></input>
              </div>
            </div>
          </div>

          <hr></hr>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: progress + "%" }}
            ></div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              onClick={props.closeModal}
            >
              Đóng
            </button>
            <button
              type="button"
              class="btn btn-primary"
              onClick={submitHandler}
            >
              Sửa
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
