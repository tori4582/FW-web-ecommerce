import React, { useState } from "react";
import * as imageApi from "../../apis/image";
import { Link } from "react-router-dom";
import DanhgiaModal from "./DanhgiaModal";

export default function SanphamItem(props) {
  const [showModal, setShowModal] = useState(false);
  function closeModal() {
    setShowModal(false);
  }
  function openModal() {
    setShowModal(true);
  }

  return (
    <div>
      <DanhgiaModal
        showModal={showModal}
        closeModal={closeModal}
        masanpham = {props.product.masanpham}
        makhachhang = {props.makhachhang}
      ></DanhgiaModal>
      <div>
        <div className="GuWdvd">
          <div className="WqnWb-">
            <div className="_1DPpu5"></div>
          </div>
          <div className="_39XDzv" />
          <Link to={props.product.image}>
            <div className="_2lVoQ1">
              <div className="_1limL3">
                <div>
                  <span className="_1BJEKe">
                    <div />
                    <div className="_3huAcN">
                      <div className="_3btL3m">
                        <div className="shopee-image__wrapper">
                          <img
                            alt="anhthunho"
                            className="shopee-image__content"
                            src={imageApi.image(props.product.image)}
                          ></img>
                        </div>
                      </div>
                      <div className="_1cxKtp">
                        <div>
                          <div className="_1xHDVY">
                            <span className="_30COVM">
                              {props.product.tensanpham}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="_1kvNGb">
                      <div>
                        <span className="mBERmM">{props.product.dongia}₫</span>
                      </div>
                    </div>
                  </span>
                </div>
                <div className="_3tEHtP" />
              </div>
            </div>
          </Link>
          <div className="h_Pf2y" />
        </div>
      </div>
      <div className="_1J7vLy">
        <div className="DI-rNr tyOBoQ"> </div>
        <div className="DI-rNr _25igL4"> </div>
        <button className="btn btn-primary danhgia-btn" onClick={openModal}>Đánh giá</button>
      </div>
      <hr></hr>
    </div>
  );
}
