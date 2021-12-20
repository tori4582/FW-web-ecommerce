import React, { useState, useEffect } from "react";
import "reactjs-popup/dist/index.css";
import Modal from "react-modal";
import "./style.css";
import * as trademarkApi from "../../apis/trademark";

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

export default function FindTrademarkModal(props) {
  const [timkiem, setTimkiem] = useState("");
  const [danhsach, setDanhsach] = useState([]);
  useEffect(() => {
    // Update the document title using the browser API
    findFunction("");
  }, []);

  const findFunction = (timkiem) => {
    trademarkApi
      .timThuonghieu(timkiem)
      .then((success) => {
        if (success.status === 200) {
          setDanhsach(success.data.value.$values);
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
      <div class="add-item-modal timkiemthuonghieu-modal" role="document">
        <div class="">
          <div className="form-main-add-edit p-2">
            <div className="row mb-3 ">
              <input
                className="form-control border"
                id="image"
                placeholder="Tìm kiếm thương hiệu"
                onChange={(e) => {
                  setTimkiem(e.target.value);
                  findFunction(e.target.value);
                }}
                value={timkiem}
              ></input>
            </div>

            <div className=" form-control">
              {danhsach.map((value, key) => {
                return (
                  <div className="col-form-label " key={key}>
                    <div className="border rounded px-3">
                      <div target="_blank">
                        <p className="price"> {value.tenthuonghieu}</p>
                        <p className="name">
                          Mã thương hiệu: {value.mathuonghieu}
                          <button
                            className="add-to-build btn btn-primary"
                            type="button"
                            onClick={() => {
                              props.chooseFunction(value);
                              props.closeModal();
                            }}
                          >
                            Chọn
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

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
