import React, { useState, useEffect } from "react";
import "reactjs-popup/dist/index.css";
import Modal from "react-modal";
import "./style.css";
import * as productApi from "../../apis/product";
import * as imageApi from "../../apis/image";

const customStyles = {
  content: {
    top: "45%",
    left: "79%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function FindProductModal(props) {
  const [timkiem, setTimkiem] = useState("");
  const [danhsachsanpham, setDanhsachsanpham] = useState([]);
  useEffect(() => {
    // Update the document title using the browser API
    findProduct("");
  }, []);

  const findProduct = (timkiem) => {
    productApi
      .findProduct(timkiem)
      .then((success) => {
        if (success.status === 200) {
          setDanhsachsanpham(success.data.value.$values);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Modal
      isOpen={props.showModal}
      onRequestClose={props.closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div class="add-item-modal timkiemsanpham-modal" role="document">
        <div class="">
          <div className="form-main-add-edit">
            <div className="row mb-3">
              <input
                className="form-control border"
                id="image"
                placeholder="Tìm kiếm sản phẩm"
                onChange={(e) => {
                  setTimkiem(e.target.value);
                  findProduct(e.target.value);
                }}
                value={timkiem}
              ></input>
            </div>

            <div className="list-product-data">
              {danhsachsanpham.map((value, key) => {
                return (
                  <div className="modal-product-detail" key={key}>
                    <div className="image">
                      <img alt="anh" src={imageApi.image(value.image)} />
                    </div>
                    <div className="content">
                      <div target="_blank">
                        <p className="name"> {value.tensanpham} </p>
                        <p className="price"> Giá: {value.dongia}đ</p>
                        <p className="productid">
                          {" "}
                          Mã sản phẩm: {value.masanpham}{" "}
                        </p>
                      </div>
                      <button
                        className="add-to-build btn btn-primary"
                        type="button"
                        onClick={() => {
                          props.chooseProduct(value);
                          props.closeModal();
                        }}
                      >
                        Chọn
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <hr></hr>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              onClick={props.closeModal}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
