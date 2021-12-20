import React, { useState } from "react";
import * as imageApi from "../../apis/image";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

export default function Item(props) {
  const [showModal, setShowModal] = useState(0);
  function closeModal() {
    setShowModal(0);
  }
  return (
    <tr>
      <EditModal
        showModal={showModal === 1 && true}
        closeModal={closeModal}
        customer={props.customer}
        editFunction={props.editFunction}
      ></EditModal>
      <DeleteModal
        showModal={showModal === 2 && true}
        customer={props.customer}
        closeModal={closeModal}
        deleteFunction={props.deleteFunction}
      ></DeleteModal>

      <td className="align-middle text-center">
        <span className="text-secondary text-xs font-weight-bold">
          <img
            alt="img"
            style={{ width: "80px", height: "80px" }}
            src={imageApi.image(
              props.customer.image,
              props.customer.makhachhang
            )}
          ></img>
        </span>
      </td>

      <td className="align-middle text-center">
        <span className="text-secondary text-xs font-weight-bold">
          {props.customer.tenkhachhang}
        </span>
      </td>
      <td className="align-middle text-center">
        <span className="text-secondary text-xs font-weight-bold">
          {props.customer.email}
        </span>
      </td>
      <td className="align-middle text-center">
        <span className="text-secondary text-xs font-weight-bold">
          {props.customer.sodienthoai}
        </span>
      </td>
      <td className="align-middle text-center">
        <span className="text-secondary text-xs font-weight-bold">
          {props.customer.diachi}
        </span>
      </td>
      <td className="align-middle text-center">
        <span className="text-secondary text-xs font-weight-bold">
          {(() => {
            var dateObj = new Date(props.customer.ngaysinh);
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
          {props.customer.cccd}
        </span>
      </td>
      {props.customer.loaikhachhang === "Thành viên" ? (
        <td className="align-middle text-center text-sm">
          <span className="badge badge-sm bg-gradient-success">Thành viên</span>
        </td>
      ) : (
        props.customer.loaikhachhang === "Thường" && (
          <td className="align-middle text-center text-sm">
            <span className="badge badge-sm bg-gradient-secondary">Thường</span>
          </td>
        )
      )}
      <td className="align-middle">
        <div
          className="btn btn-link text-dark px-3 mb-0"
          onClick={() => setShowModal(1)}
        >
          <i class="bi bi-pencil-square"></i>
          {"  "}Sửa
        </div>
        <div
          className="btn btn-link text-danger px-3 mb-0 "
          style={{ position: "relative", zIndex: "0" }}
          onClick={() => setShowModal(2)}
        >
          <i class="bi bi-trash"></i>
          {"  "}Xoá
        </div>
      </td>
    </tr>
  );
}
