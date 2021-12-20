import React, { useState, useEffect } from "react";
import * as voucherApi from "../../apis/voucher";
import * as myVoucherApi from "../../apis/myvoucher";
import * as myToast from "../../../Common/helper/toastHelper";
import Modal from "react-modal";
import Cookies from "universal-cookie";

const cookie = new Cookies();

const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function VoucherItem(props) {
  const [showModal, setShowModal] = useState(false);
  const [voucher, setVoucher] = useState();
  useEffect(() => {
    voucherApi
      .findVoucherById(props.myvoucher.makhuyenmai)
      .then((success) => {
        if (success.status === 200) {
          setVoucher(success.data.value);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [props.myvoucher.makhuyenmai]);
  function xoaVoucherCuatoi() {
    var token = cookie.get("token");
    var refreshtoken = cookie.get("refreshtoken");
    myVoucherApi
      .deleteMyVoucher(
        props.makhachhang,
        props.myvoucher.makhuyenmai,
        token,
        refreshtoken
      )
      .then((success) => {
        if (success.status === 200) {
          myToast.toastSucces("Đã xoá voucher");
          props.deleteMyVoucher();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div class="" role="document">
          <div class="">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
               Bạn có chắc chắn xoá voucher này không?
              </h5>
            </div>

          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              onClick={() => setShowModal(false)}
            >
              Đóng
            </button>
            <button
              type="button"
              class="btn btn-primary"
              onClick={xoaVoucherCuatoi}
            >
              Xoá
            </button>
          </div>
        </div>
      </Modal>

      {voucher !== undefined && (
        <div className="styles__StyledItem-sc-1ghyfo6-2 erXBTT item">
          <div className="date">
            {(() => {
              var dateObj = new Date(props.myvoucher.ngaythem);
              const day = String(dateObj.getDate()).padStart(2, "0");
              const month = dateObj.getMonth() + 1;
              const year = dateObj.getFullYear();
              const output = day + "/" + month + "/" + year;
              return output;
            })()}
          </div>
          <div className="icon">
            <div className="circle c-02b7f1">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z" />
              </svg>
            </div>
          </div>
          <div className="content">
            Giảm giá {(voucher.tilekhuyenmai * 100).toFixed(0)}% Áp dụng cho :{" "}
            {voucher.dieukien}
            <div>
              Từ ngày{"  "}{" "}
              {(() => {
                var dateObj = new Date(voucher.ngaybatdau);
                const day = String(dateObj.getDate()).padStart(2, "0");
                const month = dateObj.getMonth() + 1;
                const year = dateObj.getFullYear();
                const output = day + "/" + month + "/" + year;
                return output;
              })()}
            </div>
            <div>
              Đến ngày{" "}
              {(() => {
                var dateObj = new Date(voucher.ngayketthuc);
                const day = String(dateObj.getDate()).padStart(2, "0");
                const month = dateObj.getMonth() + 1;
                const year = dateObj.getFullYear();
                const output = day + "/" + month + "/" + year;
                return output;
              })()}
            </div>
          </div>
          <button className="delete" onClick={() => setShowModal(true)}>
            Xóa
          </button>
        </div>
      )}
    </>
  );
}
