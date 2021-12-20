import React from "react";
import "reactjs-popup/dist/index.css";
import Modal from "react-modal";
import * as myToast from "../../../Common/helper/toastHelper";
import * as trademarkApi from "../../apis/trademark";
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
    trademarkApi
      .deleteTrademark(props.trademark.mathuonghieu, token, refreshtoken)
      .then((success) => {
        if (success.status) {
          myToast.toastSucces("Xoá thương hiệu thành công");
          props.deleteFunction(props.trademark);
          props.closeModal();
        }
      })
      .catch((error) => {
        myToast.toastError("Xoá thương hiệu thất bại");
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
      <div class="add-item-modal khachhangmodal" role="document">
        <div class="">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Bạn có muốn xoá thương hiệu này
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
