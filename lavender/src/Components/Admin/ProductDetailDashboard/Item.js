import React, { useState, useEffect } from "react";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import * as imageApi from "../../apis/image";
import * as productApi from "../../apis/product";

export default function Item(props) {
  const [showModal, setShowModal] = useState(0);
  const [product, setProduct] = useState({});
  function closeModal() {
    setShowModal(0);
  }
  useEffect(() => {
    productApi
      .findProductById(props.productdetail.masanpham)
      .then((success) => {
        if (success.status === 200) {
          setProduct(success.data.value);
        }
      });
  }, [props.productdetail.masanpham]);
  return (
    <tr>
      <EditModal
        showModal={showModal === 1 && true}
        closeModal={closeModal}
        productdetail={props.productdetail}
        editFunction={props.editFunction}
      ></EditModal>
      <DeleteModal
        showModal={showModal === 2 && true}
        productdetail={props.productdetail}
        closeModal={closeModal}
        deleteFunction={props.deleteFunction}
      ></DeleteModal>

      <td className="align-middle text-center">
        <span className="text-secondary text-xs font-weight-bold">
          <img
            alt="img"
            style={{ width: "80px", height: "80px" }}
            src={imageApi.image(props.productdetail.image)}
          ></img>
        </span>
      </td>
      <td className="align-middle text-center">
        <span className="text-secondary text-xs font-weight-bold">
          {props.productdetail.imei}
        </span>
      </td>
      <td className="align-middle text-center">
        <span className="text-secondary text-xs font-weight-bold">
          {props.productdetail.masanpham}
        </span>
      </td>
      <td className="align-middle text-center">
        <span className="text-secondary text-xs font-weight-bold">
          {product.tensanpham}
        </span>
      </td>
      <td className="align-middle text-center">
        <span className="text-secondary text-xs font-weight-bold">
          {(() => {
            var dateObj = new Date(props.productdetail.ngaysanxuat);
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
          {props.productdetail.tinhtrang}
        </span>
      </td>
      <td className="align-middle text-center">
        <span className="text-secondary text-xs font-weight-bold">
          {props.productdetail.mausac}
        </span>
      </td>
      <td className="align-middle text-center">
        <span className="text-secondary text-xs font-weight-bold">
          {props.productdetail.giamoi}
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
