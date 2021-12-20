import React, { useState } from "react";
import "reactjs-popup/dist/index.css";
import Modal from "react-modal";
import * as customerApi from "../../apis/customer";
import * as myToast from "../../../Common/helper/toastHelper";
import * as imageApi from "../../apis/image";

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
  const [makhachhang, setMakhachhang] = useState(props.customer.makhachhang);
  const [tenkhachhang, setTenkhachhang] = useState(props.customer.tenkhachhang);
  const [email, setEmail] = useState(props.customer.email);
  const [sodienthoai, setSodienthoai] = useState(props.customer.sodienthoai);
  const [diachi, setDiachi] = useState(props.customer.diachi);
  const [cccd, setCccd] = useState(props.customer.cccd);
  const [ngaysinh, setNgaysinh] = useState(new Date(props.customer.ngaysinh));
  const [image, setImage] = useState(undefined);
  const [loaikhachhang, setLoaikhachhang] = useState(
    props.customer.loaikhachhang
  );
  const [progress, setProgress] = useState(0);

  function submitHandler() {
    const fd = new FormData();
    fd.append("makhachhang", makhachhang);
    fd.append("tenkhachhang", tenkhachhang);
    fd.append("email", email);
    fd.append("sodienthoai", sodienthoai);
    fd.append("diachi", diachi);
    fd.append("cccd", cccd);
    fd.append("ngaysinh", new Date(ngaysinh).toISOString().split("T")[0]);
    fd.append("image", image);
    fd.append("loaikhachhang", loaikhachhang);

    var token = cookie.get("token");
    var refreshtoken = cookie.get("refreshtoken");
    customerApi
      .editCustomer(fd, runProgress, token, refreshtoken)
      .then((success) => {
        props.editFunction(success.data.value);
        props.closeModal();
      })
      .catch((error) => {
        myToast.toastError("Thêm mới thất bại");
        console.error(error);
      });
  }

  const runProgress = (percent) => {
    if (percent === 100) {
      myToast.toastSucces("Thêm mới thành công");
      props.closeModal();
    }
    setProgress(percent);
  };

  return (
    <Modal
      isOpen={props.showModal}
      onRequestClose={props.closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div class="add-item-modal khachhangmodal" role="document">
        <div class="">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Thêm mới khách hàng
            </h5>
          </div>

          <div className="form-main-add-edit">
            <div className="row mb-3">
              <span className="text-secondary text-xs font-weight-bold">
                <img
                  alt=""
                  style={{ width: "80px", height: "80px" }}
                  src={
                    image === undefined
                      ? imageApi.image(
                          props.customer.image,
                          props.customer.makhachhang
                        )
                      : URL.createObjectURL(image)
                  }
                ></img>
              </span>
            </div>
            <div className="row mb-1">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">Image</div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                <input
                  className="form-control border"
                  id="image"
                  type="file"
                  placeholder=""
                  onChange={(e) => setImage(e.target.files[0])}
                ></input>
              </div>
            </div>

            <div className="row mb-1">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                Mã khách hàng
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                <input
                  className="form-control border "
                  id="tenkhachhang"
                  placeholder=""
                  onChange={(e) => setMakhachhang(e.target.value)}
                  value={makhachhang}
                  disabled
                ></input>
              </div>
            </div>

            <div className="row mb-1">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                Tên khách hàng
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                <input
                  className="form-control border "
                  id="tenkhachhang"
                  placeholder=""
                  onChange={(e) => setTenkhachhang(e.target.value)}
                  value={tenkhachhang}
                ></input>
              </div>
            </div>

            <div className="row mb-1">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">Email</div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                <input
                  className="form-control border"
                  id="email"
                  type="email"
                  placeholder=""
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                ></input>
              </div>
            </div>

            <div className="row mb-1">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                Số điện thoại
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                <input
                  className="form-control border"
                  id="sodienthoai"
                  type="tel"
                  placeholder=""
                  onChange={(e) => setSodienthoai(e.target.value)}
                  value={sodienthoai}
                ></input>
              </div>
            </div>

            <div className="row mb-1">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">Địa chỉ</div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                <input
                  className="form-control border"
                  id="diachi"
                  placeholder=""
                  onChange={(e) => setDiachi(e.target.value)}
                  value={diachi}
                ></input>
              </div>
            </div>

            <div className="row mb-1">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">CCCD</div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                <input
                  className="form-control border"
                  id="cccd"
                  placeholder=""
                  onChange={(e) => setCccd(e.target.value)}
                  value={cccd}
                ></input>
              </div>
            </div>

            <div className="row mb-1">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                Ngày sinh
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                <input
                  className="form-control border"
                  type="date"
                  id="ngaysinh"
                  name="trip-start"
                  onChange={(e) => setNgaysinh(new Date(e.target.value))}
                  value={ngaysinh.toISOString().split("T")[0]}
                ></input>
              </div>
            </div>

            <div className="row mb-1">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                Loại khách hàng
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                <select
                  className="form-control border"
                  id="loaikhachhang"
                  name="loaikhachhang"
                  placeholder=""
                  onChange={(e) => {
                    setLoaikhachhang(e.target.value);
                  }}
                  value={loaikhachhang}
                >
                  <option value="Thành viên">Thành viên</option>
                  <option value="Thường">Thường</option>
                </select>
              </div>
            </div>
          </div>

          <hr></hr>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: progress + "%" }}
            ></div>
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
