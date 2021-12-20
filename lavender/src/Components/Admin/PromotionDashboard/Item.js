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
        promotion={props.promotion}
        editFunction={props.editFunction}
      ></EditModal>
      <DeleteModal
        showModal={showModal === 2 && true}
        promotion={props.promotion}
        closeModal={closeModal}
        deleteFunction={props.deleteFunction}
      ></DeleteModal>

      <td className="align-middle text-center">
        <span className="text-secondary text-xs font-weight-bold">
          {props.promotion.makhuyenmai}
        </span>
      </td>
      <td className="align-middle text-center">
        <span className="text-secondary text-xs font-weight-bold">
          {props.promotion.tenkhuyenmai}
        </span>
      </td>
      <td className="align-middle text-center">
        <span className="text-secondary text-xs font-weight-bold">
          {props.promotion.tilekhuyenmai}
        </span>
      </td>
      <td className="align-middle text-center">
        <span className="text-secondary text-xs font-weight-bold">
          {(() => {
            var dateObj = new Date(props.promotion.ngaybatdau);
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
          {(() => {
            var dateObj = new Date(props.promotion.ngayketthuc);
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
          {props.promotion.dieukien}
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
