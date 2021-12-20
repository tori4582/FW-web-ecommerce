import React, { Component } from "react";
import * as imageApi from "../apis/image";
import * as productApi from "../apis/product";
import * as shipApi from "../apis/ship";
import * as customerApi from "../apis/customer";
import Cookies from "universal-cookie";

const cookie = new Cookies();

export default class BillItem extends Component {
  state = { product: null, customer: null, ship: null };
  async componentDidMount() {
    let product = null;
    let customer = null;
    let ship = null;

    var token = cookie.get("token");
    var refreshtoken = cookie.get("refreshtoken");
    await productApi
      .findProductByBillId(this.props.bill.sohoadon, token, refreshtoken)
      .then((success) => {
        if (success.status === 200) product = success.data.value;
      })
      .catch((error) => {});

    token = cookie.get("token");
    refreshtoken = cookie.get("refreshtoken");
    await customerApi
      .findCustomerByBillId(this.props.bill.sohoadon, token, refreshtoken)
      .then((success) => {
        if (success.status === 200) customer = success.data.value;
      })
      .catch((error) => {});

    token = cookie.get("token");
    refreshtoken = cookie.get("refreshtoken");
    await shipApi
      .findShipByBillId(this.props.bill.sohoadon, token, refreshtoken)
      .then((success) => {
        console.log(success.data.value);
        if (success.status === 200) ship = success.data.value;
      })
      .catch((error) => {
        console.error(error);
      });
    this.setState({ product: product, customer: customer, ship: ship });
  }
  render() {
    return (
      <tr>
        <td>
          <div className="d-flex px-2 py-1">
            <div>
              <img
                src={
                  (this.state.product !== undefined) &
                  (this.state.product !== null)
                    ? imageApi.image(this.state.product.image)
                    : ""
                }
                className="avatar avatar-sm me-3"
                alt="xd"
              />
            </div>
            <div className="d-flex flex-column justify-content-center">
              <h6 className="mb-0 text-sm">
                {(this.state.product !== undefined) &
                  (this.state.product !== null) &&
                  this.state.product.tensanpham}
              </h6>
            </div>
          </div>
        </td>
        <td>
          <div className="avatar-group mt-2">
            <h6 className="mb-0 text-sm">
              {(this.state.customer !== undefined) &
                (this.state.customer !== null) &&
                this.state.customer.sodienthoai}{" "}
            </h6>
          </div>
        </td>
        <td className="align-middle text-center text-sm">
          <div className="avatar-group mt-2">
            <h6 className="mb-0 text-sm">
              {(this.state.customer !== undefined) &
                (this.state.customer !== null) &&
                this.state.customer.tenkhachhang}{" "}
            </h6>
          </div>
        </td>
        <td className="align-middle">
          <div className="avatar-group mt-2">
            <h6 className="mb-0 text-sm">
              {(this.state.ship !== undefined) & (this.state.ship !== null) &&
                this.state.ship.trangthai}{" "}
            </h6>
          </div>
        </td>
      </tr>
    );
  }
}
