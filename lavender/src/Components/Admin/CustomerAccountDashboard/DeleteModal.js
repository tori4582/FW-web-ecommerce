import React from "react";
import "reactjs-popup/dist/index.css";
import Modal from "react-modal";
import * as myToast from "../../../Common/helper/toastHelper";
import * as customerAccountApi from "../../apis/customeraccount";
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

export default function DeleteModal(props) {
  function submitHandler() {
    var token = cookie.get("token");
    var refreshtoken = cookie.get("refreshtoken");
    customerAccountApi
      .deleteAccount(props.account.makhachhang, token, refreshtoken)
      .then((success) => {
        if (success.status) {
          myToast.toastSucces("Xoá tài khoản thành công");
          props.deleteFunction(props.account);
          props.closeModal();
        }
      })
      .catch((error) => {
        myToast.toastError("Xoá tài khoản thất bại");
        console.error(error);
      });
  }

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
              Bạn có muốn xoá tài khoản khách hàng này
            </h5>
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
              onClick={submitHandler.bind(this)}
            >
              Xoá
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
