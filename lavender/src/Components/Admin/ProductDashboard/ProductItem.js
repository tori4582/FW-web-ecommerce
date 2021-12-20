import React, { Component } from "react";
import * as imageApi from "../../apis/image";
import * as detailProductApi from "../../apis/detailProduct";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

export default class ProductItem extends Component {
  state = { giamoi: 0, showModal: 0 };
  componentDidMount() {
    detailProductApi
      .xemgiamoitheomasanpham(this.props.product.masanpham)
      .then((success) => {
        this.setState({ giamoi: success.data.value });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  closeModal() {
    this.setState({ showModal: 0 });
  }
  render() {
    return (
      <tr>
        <EditModal
          showModal={this.state.showModal === 1 && true}
          closeModal={this.closeModal.bind(this)}
          product={this.props.product}
          editProduct={this.props.editProduct.bind(this)}
        ></EditModal>
        <DeleteModal
          showModal={this.state.showModal === 2 && true}
          product={this.props.product}
          closeModal={this.closeModal.bind(this)}
          deleteProduct={this.props.deleteProduct.bind(this)}
        ></DeleteModal>
        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">
            {this.props.product.tensanpham}
          </span>
        </td>

        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">
            <img
              alt="img"
              style={{ width: "80px", height: "80px" }}
              src={imageApi.image(this.props.product.image)}
            ></img>
          </span>
        </td>
        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">
            {this.props.product.maloai}
          </span>
        </td>
        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">
            {this.props.product.mathuonghieu}
          </span>
        </td>
        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">
            {this.props.product.soluongton}
          </span>
        </td>
        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">
            {this.props.product.dongia}
          </span>
        </td>
        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">
            {(() => {
              var dateObj = new Date(this.props.product.thoidiemramat);
              const day = String(dateObj.getDate()).padStart(2, "0");
              const month = dateObj.getMonth() + 1;
              const year = dateObj.getFullYear();
              const output = day + "/" + month + "/" + year;
              return output;
            })()}
          </span>
        </td>
        {this.state.giamoi === 0 ? (
          <td className="align-middle text-center text-sm">
            <span className="badge badge-sm bg-gradient-secondary">
              Hết hàng
            </span>
          </td>
        ) : (
          <td className="align-middle text-center text-sm">
            <span className="badge badge-sm bg-gradient-success">Còn hàng</span>
          </td>
        )}

        <td className="align-middle">
          <div
            className="btn btn-link text-dark px-3 mb-0"
            onClick={() => this.setState({ showModal: 1 })}
          >
            <i class="bi bi-pencil-square"></i>
            {"  "}Sửa
          </div>
          <div
            className="btn btn-link text-danger px-3 mb-0 "
            style={{ position: "relative", zIndex: "0" }}
            onClick={() => this.setState({ showModal: 2 })}
          >
            <i class="bi bi-trash"></i>
            {"  "}Xoá
          </div>
        </td>
      </tr>
    );
  }
}
