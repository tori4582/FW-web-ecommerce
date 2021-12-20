import React, { useState } from "react";
import "reactjs-popup/dist/index.css";
import Modal from "react-modal";
import * as voucherApi from "../../apis/voucher";
import * as myToast from "../../../Common/helper/toastHelper";
import "./style.css";
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

export default function EditModal(props) {
  const [makhuyenmai, setMakhuyenmai] = useState(props.promotion.makhuyenmai);
  const [tenkhuyenmai, setTenkhuyenmai] = useState(props.promotion.tenkhuyenmai);
  const [tilekhuyenmai, setTilekhuyenmai] = useState(props.promotion.tilekhuyenmai);
  const [ngaybatdau, setNgaybatdau] = useState(new Date(props.promotion.ngaybatdau));
  const [ngayketthuc, setNgayketthuc] = useState(new Date(props.promotion.ngayketthuc));
  const [dieukien, setDieukien] = useState("");

  function submitHandler() {
    const fd = new FormData();
    fd.append("makhuyenmai", makhuyenmai);
    fd.append("tenkhuyenmai", tenkhuyenmai);
    fd.append("tilekhuyenmai", tilekhuyenmai);
    fd.append("ngaybatdau", new Date(ngaybatdau).toISOString().split("T")[0]);
    fd.append("ngayketthuc", new Date(ngayketthuc).toISOString().split("T")[0]);
    fd.append("dieukien", dieukien);

    var token = cookie.get("token");
    var refreshtoken = cookie.get("refreshtoken");
    voucherApi
      .editPromotion(fd, token, refreshtoken)
      .then((success) => {
        props.editFunction(success.data.value);
        props.closeModal();
      })
      .catch((error) => {
        myToast.toastError("Sửa thất bại");
        console.error(error);
      });
  }

  return (
    <Modal
      isOpen={props.showModal}
      onRequestClose={props.closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div class="add-item-modal khuyenmai-modal" role="document">
        <div class="">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Sửa khuyến mãi
            </h5>
          </div>

          <div className="form-main-add-edit">
            <div className="row mb-1">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                Mã khuyến mãi
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                <input
                  className="form-control border "
                  id="makhuyenmai"
                  placeholder=""
                  onChange={(e) => setMakhuyenmai(e.target.value)}
                  value={makhuyenmai}
                  disabled
                ></input>
              </div>
            </div>

            <div className="row mb-1">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                Tên khuyến mãi
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                <input
                  className="form-control border "
                  id="tenkhuyenmai"
                  placeholder=""
                  onChange={(e) => setTenkhuyenmai(e.target.value)}
                  value={tenkhuyenmai}
                ></input>
              </div>
            </div>

            <div className="row mb-1">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                Tỉ lệ khuyến mãi
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                <input
                  className="form-control border"
                  type="tilekhuyenmai"
                  placeholder=""
                  onChange={(e) => setTilekhuyenmai(e.target.value)}
                  value={tilekhuyenmai}
                ></input>
              </div>
            </div>

            <div className="row mb-1">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                Ngày bắt đầu
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                <input
                  className="form-control border"
                  type="date"
                  id="ngaybatdau"
                  name="trip-start"
                  onChange={(e) => setNgaybatdau(new Date(e.target.value))}
                  value={ngaybatdau.toISOString().split("T")[0]}
                ></input>
              </div>
            </div>

            <div className="row mb-1">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                Ngày kết thúc
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                <input
                  className="form-control border"
                  type="date"
                  id="ngayketthuc"
                  name="trip-start"
                  onChange={(e) => setNgayketthuc(new Date(e.target.value))}
                  value={ngayketthuc.toISOString().split("T")[0]}
                ></input>
              </div>
            </div>
            <div className="row mb-1">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                Điều kiện
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                <input
                  className="form-control border"
                  id="dieukien"
                  placeholder=""
                  onChange={(e) => setDieukien(e.target.value)}
                  value={dieukien}
                ></input>
              </div>
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
            <button
              type="button"
              class="btn btn-primary"
              onClick={submitHandler}
            >
              Sửa
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
