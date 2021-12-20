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
          staff={this.props.staff}
          edit={this.props.edit.bind(this)}
        ></EditModal>
        <DeleteModal
          showModal={this.state.showModal === 2 && true}
          staff={this.props.staff}
          closeModal={this.closeModal.bind(this)}
          delete={this.props.delete.bind(this)}
        ></DeleteModal>

        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">
            <img
              alt="img"
              style={{ width: "80px", height: "80px" }}
              src={imageApi.image(
                this.props.staff.image,
                this.props.staff.manhanvien
              )}
            ></img>
          </span>
        </td>

        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">
            {this.props.staff.tennhanvien}
          </span>
        </td>
        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">
            {this.props.staff.email}
          </span>
        </td>
        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">
            {this.props.staff.sodienthoai}
          </span>
        </td>
        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">
            {this.props.staff.diachi}
          </span>
        </td>
        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">
            {(() => {
              var dateObj = new Date(this.props.staff.ngayvaolam);
              const day = String(dateObj.getDate()).padStart(2, "0");
              const month = dateObj.getMonth() + 1;
              const year = dateObj.getFullYear();
              const output = day + "/" + month + "/" + year;
              return output;
            })()}
          </span>
        </td>
        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">
            {this.props.staff.cccd}
          </span>
        </td>
        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">
            {(() => {
              var dateObj = new Date(this.props.staff.ngaysinh);
              const day = String(dateObj.getDate()).padStart(2, "0");
              const month = dateObj.getMonth() + 1;
              const year = dateObj.getFullYear();
              const output = day + "/" + month + "/" + year;
              return output;
            })()}
          </span>
        </td>
        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">
            {this.props.staff.chucvu}
          </span>
        </td>

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
