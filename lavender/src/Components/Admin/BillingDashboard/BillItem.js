import React, { Component } from "react";
import * as productApi from "../../apis/product";
import * as customerApi from "../../apis/customer";
import AddBill from "./AddBill";
import DeleteBill from "./DeleteBill";
import Cookies from "universal-cookie";

const cookie = new Cookies();

export default class BillItem extends Component {
  state = { product: undefined, customer: undefined, modal: 0 };
  async componentDidMount() {
    let product = undefined;
    let customer = undefined;
    var token = cookie.get("token");
    var refreshtoken = cookie.get("refreshtoken");
    await productApi
      .findProductByBillId(this.props.bill.sohoadon, token, refreshtoken)
      .then((success) => {
        product = success.data.value;
      })
      .catch((error) => {});

    token = cookie.get("token");
    refreshtoken = cookie.get("refreshtoken");
    await customerApi
      .findCustomerByBillId(this.props.bill.sohoadon, token, refreshtoken)
      .then((success) => {
        customer = success.data.value;
      })
      .catch((error) => {});

    this.setState({ product: product, customer: customer });
  }

  showModal = (index) => {
    this.setState({ modal: index });
  };
  hideModal = () => {
    this.setState({ modal: 0 });
  };
  render() {
    return (
      <>
        {(() => {
          if (this.state.modal === 1)
            return (
              <AddBill
                handleClose={this.hideModal.bind(this)}
                handleSave={(() => {
                  this.hideModal.bind(this)();
                  this.props.handleSave();
                })}
                bill={this.props.bill}
              ></AddBill>
            );
          else if (this.state.modal === 2)
            return (
              <DeleteBill
                handleClose={this.hideModal.bind(this)}
                handleSave={(() => {
                  this.hideModal.bind(this)();
                  this.props.handleSave();
                })}
                bill={this.props.bill}
              ></DeleteBill>
            );
        })()}
        <li className="list-group-item border-0 d-flex p-4 bg-gray-100 border-radius-lg">
          <div className="d-flex flex-column">
            <h6 className="text-sm">
              {(this.state.customer !== undefined) &
                (this.state.customer !== null) &&
                this.state.customer.tenkhachhang}
            </h6>
            <span className="mb-2 text-xs">
              Số điện thoại:{" "}
              <span className="text-dark font-weight-bold ms-sm-2">
                {(this.state.customer !== undefined) &
                  (this.state.customer !== null) &&
                  this.state.customer.sodienthoai}
              </span>
            </span>
            <span className="mb-2 text-xs">
              Email:{" "}
              <span className="text-dark ms-sm-2 font-weight-bold">
                {(this.state.customer !== undefined) &
                  (this.state.customer !== null) && this.state.customer.email}
              </span>
            </span>
            <span className="text-xs">
              Tên sản phẩm:{" "}
              <span className="text-dark ms-sm-2 font-weight-bold">
                {(this.state.product !== undefined) &
                  (this.state.product !== null) &&
                  this.state.product.tensanpham}
                {"    "}
              </span>
              {"    "}Đơn giá:{" "}
              <span className="text-dark ms-sm-2 font-weight-bold">
                {(this.state.product !== undefined) &
                  (this.state.product !== null) && this.state.product.dongia}
                {"    "}
              </span>
              {"    "}Số lượng:{" "}
              <span className="text-dark ms-sm-2 font-weight-bold">
                soluong
              </span>
            </span>
            <span className=" mt-2 text-xs">
              Ngày hoá đơn:{" "}
              <span className="text-dark ms-sm-2 font-weight-bold">
                {this.props.bill.ngayhoadon}
              </span>
            </span>
            <span className=" mt-2 text-xs">
              Tổng tiền:{" "}
              <span className="text-dark ms-sm-2 font-weight-bold">
                {this.props.bill.tongtien}
              </span>
            </span>
          </div>
          <div className="ms-auto text-end">
            <div
              className="btn btn-link text-dark px-3 mb-0"
              onClick={() => this.showModal(1)}
            >
              <i class="bi bi-pencil-square"></i>
              {"  "}Sửa
            </div>
            <div
              className="btn btn-link text-danger text-gradient px-3 mb-0"
              onClick={() => this.showModal(2)}
            >
              <i class="bi bi-trash"></i>
              {"  "}Xoá
            </div>
          </div>
        </li>
      </>
    );
  }
}
