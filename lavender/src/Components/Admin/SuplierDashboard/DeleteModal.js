import React, { Component } from "react";
import "reactjs-popup/dist/index.css";
import Modal from "react-modal";
import * as myToast from "../../../Common/helper/toastHelper";
import * as suplierApi from "../../apis/suplier";
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

export default class DeleteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submitHandler() {
    var token = cookie.get("token");
    var refreshtoken = cookie.get("refreshtoken");
    suplierApi
      .deleteSuplier(this.props.suplier.manhanvien, token, refreshtoken)
      .then((success) => {
        if (success.status) {
          myToast.toastSucces("Xoá nhà cung cấp thành công");
          this.props.delete(this.props.suplier);
          this.props.closeModal();
        }
      })
      .catch((error) => {
        myToast.toastError("Xoá nhà cung cấp thất bại");
        console.error(error);
      });
  }

  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        onRequestClose={this.props.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div class="nhacungcapmodal add-item-modal" role="document">
          <div class="">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Bạn có muốn xoá nhà cung cấp này
              </h5>
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
                Xoá
              </button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
