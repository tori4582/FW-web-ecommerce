import React, { Component } from "react";
import AddModal from "./AddModal";
import "./style.css";
import * as productApi from "../../apis/product";
import ProductItem from "./ProductItem";
import _ from "lodash";

export default class index extends Component {
  state = {
    showModal: false,
    listmobile: [],
    listlaptop: [],
  };
  closeModal() {
    this.setState({ showModal: false });
  }
  openModal() {
    this.setState({ showModal: true });
  }

  async loadMobile() {
    await productApi
      .allMobileProduct()
      .then((success) => {
        if (success.status === 200) {
          this.setState({ listmobile: success.data.value.$values });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async loadLaptop() {
    await productApi
      .allLaptopProduct()
      .then((success) => {
        if (success.status === 200) {
          this.setState({ listlaptop: success.data.value.$values });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async componentDidMount() {
    this.loadMobile();
    this.loadLaptop();
  }

  async editProduct(product) {
    var listtemp = null;
    var stringlist = "";
    if (product.maloai === 1) {
      listtemp = this.state.listmobile;
      stringlist = "listmobile";
    } else {
      listtemp = this.state.listlaptop;
      stringlist = "listlaptop";
    }
    _.remove(listtemp, (n) => {
      return n.masanpham === product.masanpham;
    });

    listtemp.push(product);

    await this.setState({ [stringlist]: listtemp });
  }

  async addProduct(product) {
    var listtemp = null;
    var stringlist = "";
    if (product.maloai === 1) {
      listtemp = this.state.listmobile;
      stringlist = "listmobile";
    } else {
      listtemp = this.state.listlaptop;
      stringlist = "listlaptop";
    }
    listtemp.push(product);

    await this.setState({ [stringlist]: listtemp });
  }

  async deleteProduct(product) {
    var listtemp = null;
    var stringlist = "";
    if (product.maloai === 1) {
      listtemp = this.state.listmobile;
      stringlist = "listmobile";
    } else {
      listtemp = this.state.listlaptop;
      stringlist = "listlaptop";
    }

    _.remove(listtemp, (n) => {
      return n.masanpham === product.masanpham;
    });
    await this.setState({ [stringlist]: listtemp });
  }

  render() {
    return (
      <main className="main-content position-relative border-radius-lg left-menu">
        <AddModal
          showModal={this.state.showModal}
          closeModal={this.closeModal.bind(this)}
          addProduct={this.addProduct.bind(this)}
        ></AddModal>
        {/* Navbar */}
        <nav
          className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
          id="navbarBlur"
          navbar-scroll="true"
        >
          <div className="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb">
              <h6 className="font-weight-bolder mb-0">Bảng sản phẩm</h6>
            </nav>
            <div
              className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
              id="navbar"
            >
              <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                <div className="input-group input-group-outline">
                  <label className="form-label">Type here...</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
            </div>
          </div>
        </nav>
        {/* End Navbar */}
        {/* dienthoai */}
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card my-4">
                <div className="card-header p-0 position-relative mt-n4 mx-3">
                  <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                    <h6 className="text-white text-capitalize ps-3 danhsachsanpham-title">
                      Danh sách điện thoại
                    </h6>
                    <button
                      className="btn bg-gradient-dark mb-0 mt-4 add-khachhang-button"
                      onClick={this.openModal.bind(this)}
                    >
                      + Thêm sản phẩm
                    </button>
                  </div>
                </div>
                <div className="card-body px-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            <b>Tên sản phẩm</b>
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            <b>Ảnh</b>
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            <b>Loại</b>
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            <b>Thương hiệu</b>
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            <b>Số lượng tồn</b>
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            <b> Đơn giá</b>
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            <b> Ra mắt</b>
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            <b>Trạng thái</b>
                          </th>
                          <th className="text-secondary opacity-7" />
                        </tr>
                      </thead>
                      <tbody>
                        {function () {
                          var result = null;
                          result = this.state.listmobile.map((value, key) => {
                            return (
                              <ProductItem
                                product={value}
                                key={key}
                                addProduct={this.addProduct.bind(this)}
                                deleteProduct={this.deleteProduct.bind(this)}
                                editProduct={this.editProduct.bind(this)}
                              ></ProductItem>
                            );
                          });
                          return result;
                        }.bind(this)()}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* laptop */}
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card my-4">
                <div className="card-header p-0 position-relative mt-n4 mx-3">
                  <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                    <h6 className="text-white text-capitalize ps-3 danhsachsanpham-title">
                      Danh sách laptop
                    </h6>
                    <button
                      className="btn bg-gradient-dark mb-0 mt-4 add-khachhang-button"
                      onClick={this.openModal.bind(this)}
                    >
                      + Thêm sản phẩm
                    </button>
                  </div>
                </div>
                <div className="card-body px-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            <b>Tên sản phẩm</b>
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            <b>Ảnh</b>
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            <b>Loại</b>
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            <b>Thương hiệu</b>
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            <b>Số lượng tồn</b>
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            <b> Đơn giá</b>
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            <b> Ra mắt</b>
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            <b>Trạng thái</b>
                          </th>
                          <th className="text-secondary opacity-7" />
                        </tr>
                      </thead>
                      <tbody>
                        {function () {
                          var result = null;
                          result = this.state.listlaptop.map((value, key) => {
                            return (
                              <ProductItem
                                product={value}
                                key={key}
                                addProduct={this.addProduct.bind(this)}
                                deleteProduct={this.deleteProduct.bind(this)}
                                editProduct={this.editProduct.bind(this)}
                              ></ProductItem>
                            );
                          });
                          return result;
                        }.bind(this)()}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
