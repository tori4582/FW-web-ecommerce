import React, { Component } from "react";
import Modal from "../MyModal/index";
import * as noteApi from "../../apis/note";
import * as myToast from "../../../Common/helper/toastHelper";
import Cookies from "universal-cookie";

const cookie = new Cookies();

export default class DeleteNote extends Component {
  async saveChanges() {
    var token = cookie.get("token");
    var refreshtoken = cookie.get("refreshtoken");
    await noteApi
      .deleteNote(this.props.bill.maphieunhap, token, refreshtoken)
      .then(() => {
        myToast.toastSucces("Xoá thành công");
        this.props.handleSave();
      })
      .catch((error) => {
        myToast.toastError("Xoá thất bại");
        console.log(error);
      });
  }
  render() {
    return (
      <Modal
        handleClose={this.props.handleClose}
        handleSave={() => {
          this.saveChanges();
        }}
        title={"Xoá phiếu nhập"}
      >
        <p>Bạn có chắc chắn muốn xoá phiếu nhập sản phẩm này</p>
      </Modal>
    );
  }
}
