import React, { Component } from "react";
import Modal from "../MyModal/index";
import * as billApi from "../../apis/billing";
import * as myToast from "../../../Common/helper/toastHelper";
import Cookies  from "universal-cookie";

const cookie = new Cookies();

export default class DeleteBill extends Component {
  async saveChanges() {
    var token = cookie.get("token");
    var refreshtoken = cookie.get("refreshtoken");
    await billApi
      .deleteBill(this.props.bill.sohoadon, token, refreshtoken)
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
        title={"Xoá hoá đơn"}
      >
        <p>Bạn có chắc chắn muốn xoá hoá đơn này</p>
      </Modal>
    );
  }
}
