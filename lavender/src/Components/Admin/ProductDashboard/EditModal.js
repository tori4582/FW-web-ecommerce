import React, { Component } from "react";
import "reactjs-popup/dist/index.css";
import Modal from "react-modal";
import * as productApi from "../../apis/product";
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

export default class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tensanpham: this.props.product.tensanpham,
      maloai: this.props.product.maloai,
      mathuonghieu: this.props.product.mathuonghieu,
      soluongton: this.props.product.soluongton,
      mota: this.props.product.mota,
      image: undefined,
      dongia: this.props.product.dongia,
      thoidiemramat: new Date(this.props.product.thoidiemramat),
      progress: 0,
      thongsokithuat: [],
    };
  }

  async componentDidMount(){
    productApi.thongsokithuatBangMasanpham(this.props.product.masanpham)
    .then(success => {
      if ( success.status===200){
        this.setState({thongsokithuat:success.data.value.$values})
      }
    })
    .catch(error => {
      console.error(error)
    })
  }

  submitHandler = () => {
    const fd = new FormData();
    fd.append("masanpham", this.props.product.masanpham);
    fd.append("tensanpham", this.state.tensanpham);
    fd.append("maloai", this.state.maloai);

    fd.append("mathuonghieu", this.state.mathuonghieu);
    fd.append("soluongton", this.state.soluongton);
    fd.append("mota", this.state.mota);
    fd.append("image", this.state.image);
    fd.append(
      "thoidiemramat",
      new Date(this.state.thoidiemramat).toISOString().split("T")[0]
    );
    fd.append("dongia", this.state.dongia);

    var token = cookie.get("token");
    var refreshtoken = cookie.get("refreshtoken");
    productApi
      .editProduct(fd, this.setProgress.bind(this), token, refreshtoken)
      .then(async (success) => {
        if (success.status === 200) {
          token = cookie.get("token");
          refreshtoken = cookie.get("refreshtoken");
          await productApi
            .addSpecification(
              success.data.value.masanpham,
              this.state.thongsokithuat,
              token,
              refreshtoken
            )
            .then((success2) => {
              if (success2.state === 200) {
                this.props.editProduct(success.data.value);
                this.props.closeModal();
                myToast.toastSucces("Sửa mới thành công");
              }
            })
            .catch((error2) => {
              console.error(error2);
            });
        }
      })
      .catch((error) => {
        myToast.toastError("Sửa thất bại");
        console.error(error);
      });
  };

  setProgress(percent) {
    if (percent === 100) {
      this.props.closeModal();
    }
    this.setState({ progress: percent });
  }

  themthongsokithuat() {
    let newchitiet = this.state.thongsokithuat;
    newchitiet.push({ ten: "", noidung: "" });
    this.setState({ thongsokithuat: newchitiet });
  }


  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        onRequestClose={this.props.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="add-product-item-modal" role="document">
          <div className="">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Sửa sản phẩm
              </h5>
            </div>

            <div className="row group-sanpham-quanly">
              <div className="form-main-add-edit col-xs-7 col-sm-7 col-md-7 col-lg-7 px-4">
                <div className="row mb-3">
                  <span className="text-secondary text-xs font-weight-bold">
                    <img
                      alt="img"
                      style={{ width: "80px", height: "80px" }}
                      src={
                        this.state.image === undefined
                          ? imageApi.image(this.props.product.image)
                          : URL.createObjectURL(this.state.image)
                      }
                    ></img>
                  </span>
                </div>

                <div className="row mb-1">
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    Tên sản phẩm
                  </div>
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                    <input
                      className="form-control border "
                      id="tensanpham"
                      placeholder=""
                      onChange={(e) => {
                        this.setState({ tensanpham: e.target.value });
                      }}
                      value={this.state.tensanpham}
                    ></input>
                  </div>
                </div>

                <div className="row mb-1">
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    Loại sản phẩm
                  </div>
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                    <select
                      className="form-control border"
                      id="maloai"
                      name="maloai"
                      placeholder=""
                      onChange={(e) => {
                        this.setState({ maloai: e.target.value });
                      }}
                      value={this.state.maloai}
                    >
                      <option value="1">Điện thoại</option>
                      <option value="2">Laptop</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-1">
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    Mã thương hiệu
                  </div>
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                    <input
                      className="form-control border"
                      id="mathuonghieu"
                      placeholder=""
                      onChange={(e) => {
                        this.setState({ mathuonghieu: e.target.value });
                      }}
                      value={this.state.mathuonghieu}
                    ></input>
                  </div>
                </div>

                <div className="row mb-1">
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    Số lượng tồn
                  </div>
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                    <input
                      className="form-control border"
                      id="soluongton"
                      placeholder=""
                      onChange={(e) => {
                        this.setState({ soluongton: e.target.value });
                      }}
                      value={this.state.soluongton}
                    ></input>
                  </div>
                </div>

                <div className="row mb-1">
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    Image
                  </div>
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                    <input
                      className="form-control border"
                      id="soluongton"
                      type="file"
                      placeholder=""
                      ref={(fileInput) => (this.fileInput = fileInput)}
                      onChange={(e) => {
                        this.setState({ image: e.target.files[0] });
                      }}
                    ></input>
                  </div>
                </div>

                <div className="row mb-1">
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    Thời điểm ra mắt
                  </div>
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                    <input
                      className="form-control border"
                      type="date"
                      id="ngayhoadon"
                      name="trip-start"
                      onChange={(e) => {
                        this.setState({
                          thoidiemramat: new Date(e.target.value),
                        });
                      }}
                      value={
                        this.state.thoidiemramat.toISOString().split("T")[0]
                      }
                    ></input>
                  </div>
                </div>
                <div className="row mb-1">
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    Đơn giá
                  </div>
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                    <input
                      className="form-control border"
                      id="dongia"
                      placeholder=""
                      onChange={(e) => {
                        this.setState({ dongia: e.target.value });
                      }}
                      value={this.state.dongia}
                    ></input>
                  </div>
                </div>

                <div className="row mb-1">
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    Mô tả
                  </div>
                </div>
                <div className="row mb-1">
                  <textarea
                    class="form-control border"
                    id="mota"
                    rows="30"
                    onChange={(e) => {
                      this.setState({ mota: e.target.value });
                    }}
                    value={this.state.mota}
                  ></textarea>
                </div>
              </div>

              <div className="form-main-add-edit2 col-xs-5 col-sm-5 col-md-5 col-lg-5">
                <div className="row mb-3 ">
                <span className="text-secondary text-xs font-weight-bold pb-5">
                    <h5>Thông số kĩ thuật</h5>
                  </span>
                </div>
                {this.state.thongsokithuat.map((value, key) => {
                  return (
                    <div>
                      <div className="row mb-1">
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                          Tên thông số
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                          <input
                            className="form-control border"
                            id="ten"
                            name="ten"
                            placeholder
                            onChange={((i, e) => {
                              let temp = [...this.state.thongsokithuat];
                              temp[i].ten = e.target.value;
                              this.setState({ thongsokithuat: temp });
                            }).bind(this, key)}
                            value={value.ten}
                          />
                        </div>
                      </div>
                      <div className="row mb-1">
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                          Nội dung
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                          <input
                            className="form-control border"
                            id="noidung"
                            name="noidung"
                            placeholder
                            onChange={((i, e) => {
                              let temp = [...this.state.thongsokithuat];
                              temp[i].noidung = e.target.value;
                              this.setState({ thongsokithuat: temp });
                            }).bind(this, key)}
                            value={value.noidung}
                          />
                        </div>
                      </div>
                      <hr />
                    </div>
                  );
                })}
                <div className="row mb-1">
                  <button
                    className="btn btn-info"
                    onClick={this.themthongsokithuat.bind(this)}
                  >
                    Thêm thông số kỹ thuật
                  </button>
                </div>
              </div>
            </div>

            <hr></hr>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: this.state.progress + "%" }}
              ></div>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.props.closeModal}
              >
                Đóng
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={this.submitHandler.bind(this)}
              >
                Sửa
              </button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
