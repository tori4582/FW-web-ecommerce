import React, { useState } from "react";
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
        account={props.account}
        editFunction={props.editFunction}
      ></EditModal>
      <DeleteModal
        showModal={showModal === 2 && true}
        account={props.account}
        closeModal={closeModal}
        deleteFunction={props.deleteFunction}
      ></DeleteModal>

      <td className="align-middle text-center">
        <span className="text-secondary text-xs font-weight-bold">
          {props.account.makhachhang}
        </span>
      </td>
      <td className="align-middle text-center">
        <span className="text-secondary text-xs font-weight-bold">
          {props.account.username}
        </span>
      </td>
      <td className="align-middle text-center">
        <span className="text-secondary text-xs font-weight-bold">
          {props.account.password}
        </span>
      </td>

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
