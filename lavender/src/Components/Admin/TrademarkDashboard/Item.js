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
        trademark={props.trademark}
        editFunction={props.editFunction}
      ></EditModal>
      <DeleteModal
        showModal={showModal === 2 && true}
        trademark={props.trademark}
        closeModal={closeModal}
        deleteFunction={props.deleteFunction}
      ></DeleteModal>

      <td className="align-middle text-center">
        <span className="text-secondary text-xs font-weight-bold">
          <img
            alt="img"
            style={{ width: "80px", height: "80px" }}
            src={imageApi.image(
              props.trademark.image,
              props.trademark.tenthuonghieu.toLowerCase()
            )}
          ></img>
        </span>
      </td>

      <td className="align-middle text-center">
        <span className="text-secondary text-xs font-weight-bold">
          {props.trademark.tenthuonghieu}
        </span>
      </td>
      <td className="align-middle text-center">
        <span className="text-secondary text-xs font-weight-bold">
          {props.trademark.xuatxu}
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
