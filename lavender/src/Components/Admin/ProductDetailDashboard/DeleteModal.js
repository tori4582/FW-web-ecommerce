import React from "react";
import "reactjs-popup/dist/index.css";
import Modal from "react-modal";
import * as myToast from "../../../Common/helper/toastHelper";
import * as productdetailApi from "../../apis/productdetail";
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
    productdetailApi
      .deleteProductdetail(props.productdetail.imei, token, refreshtoken)
      .then((success) => {
        if (success.status) {
          myToast.toastSucces("Xoá chi tiết sản phẩm thành công");
          props.deleteFunction(props.productdetail);
          props.closeModal();
        }
      })
      .catch((error) => {
        myToast.toastError("Xoá chi tiết sản phẩm thất bại");
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
      <div class="add-item-modal chitietsanpham-modal" role="document">
        <div class="">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Bạn có muốn xoá chi tiết sản phẩm này
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
