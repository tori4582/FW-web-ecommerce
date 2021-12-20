import React, { Component } from "react";
import * as imageApi from "../../apis/image";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

export default class Item extends Component {
  state = { giamoi: 0, showModal: 0 };
  componentDidMount() {}
  closeModal() {
    this.setState({ showModal: 0 });
  }
  render() {
    return (
      <tr>
        <EditModal
          showModal={this.state.showModal === 1 && true}
          closeModal={this.closeModal.bind(this)}
          suplier={this.props.suplier}
          edit={this.props.edit.bind(this)}
        ></EditModal>
        <DeleteModal
          showModal={this.state.showModal === 2 && true}
          suplier={this.props.suplier}
          closeModal={this.closeModal.bind(this)}
          delete={this.props.delete.bind(this)}
        ></DeleteModal>

        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">
            <img
              alt="img"
              style={{ width: "80px", height: "80px" }}
              src={imageApi.image(
                this.props.suplier.image,
                this.props.suplier.tennhacungcap
              )}
            ></img>
          </span>
        </td>
        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">
            {this.props.suplier.tennhacungcap}
          </span>
        </td>
        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">
            {this.props.suplier.email}
          </span>
        </td>
        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">
            {this.props.suplier.sodienthoai}
          </span>
        </td>
        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">
            {this.props.suplier.diachi}
          </span>
        </td>

        <td className="align-middle text-center">
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
