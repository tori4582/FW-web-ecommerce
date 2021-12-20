import React, { Component } from "react";
import AddModal from "./AddModal";
import "./style.css";
import * as suplierApi from "../../apis/suplier";
import Item from "./Item";
import _ from "lodash";
import Cookies from "universal-cookie";

const cookie = new Cookies();

export default class index extends Component {
  state = {
    showModal: false,
    listsuplier: [],
  };
  closeModal() {
    this.setState({ showModal: false });
  }
  openModal() {
    this.setState({ showModal: true });
  }

  async loadsuplier() {
    var token = cookie.get("token");
    var refreshtoken = cookie.get("refreshtoken");
    await suplierApi
      .allSuplier(token, refreshtoken)
      .then((success) => {
        if (success.status === 200) {
          this.setState({ listsuplier: success.data.value.$values });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async componentDidMount() {
    this.loadsuplier();
  }

  async edit(suplier) {
    var listtemp = this.state.listsuplier;
    _.remove(listtemp, (n) => {
      return n.manhacungcap === suplier.manhacungcap;
    });

    listtemp.push(suplier);

    await this.setState({ listsuplier: listtemp });
  }

  async add(suplier) {
    var listtemp = this.state.listsuplier;

    listtemp.push(suplier);

    await this.setState({ listsuplier: listtemp });
  }

  async delete(suplier) {
    var listtemp = this.state.listsuplier;

    _.remove(listtemp, (n) => {
      return n.manhacungcap === suplier.manhacungcap;
    });
    await this.setState({ listsuplier: listtemp });
  }

  render() {
    return (
      <main className="main-content position-relative border-radius-lg left-menu">
        <AddModal
          showModal={this.state.showModal}
          closeModal={this.closeModal.bind(this)}
          add={this.add.bind(this)}
        ></AddModal>
        {/* Navbar */}
        <nav
          className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
          id="navbarBlur"
          navbar-scroll="true"
        >
          <div className="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb">
              <h6 className="font-weight-bolder mb-0">Bảng sản nhà cung cấp</h6>
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
                      Danh sách nhà cung cấp
                    </h6>
                    <button
                      className="btn bg-gradient-dark mb-0 mt-4 add-khachhang-button"
                      onClick={this.openModal.bind(this)}
                    >
                      + Thêm nhà cung cấp
                    </button>
                  </div>
                </div>
                <div className="card-body px-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            <b>Ảnh</b>
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            <b>Tên nhà cung cấp</b>
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            <b>Email</b>
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            <b>Số điện thoại</b>
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            <b>Địa chỉ</b>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {function () {
                          var result = null;
                          result = this.state.listsuplier.map((value, key) => {
                            return (
                              <Item
                                suplier={value}
                                key={key}
                                add={this.add.bind(this)}
                                delete={this.delete.bind(this)}
                                edit={this.edit.bind(this)}
                              ></Item>
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
