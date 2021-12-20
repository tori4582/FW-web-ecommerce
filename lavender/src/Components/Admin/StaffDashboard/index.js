import React, { Component } from "react";
import AddModal from "./AddModal";
import "./style.css";
import * as staffApi from "../../apis/staff";
import Item from "./Item";
import _ from "lodash";
import Cookies from "universal-cookie";

const cookie = new Cookies();

export default class index extends Component {
  state = {
    showModal: false,
    liststaff: [],
  };
  closeModal() {
    this.setState({ showModal: false });
  }
  openModal() {
    this.setState({ showModal: true });
  }

  async loadStaff() {
    var token = cookie.get("token");
    var refreshtoken = cookie.get("refreshtoken");

    await staffApi
      .allStaff(token, refreshtoken)
      .then((success) => {
        if (success.status === 200) {
          this.setState({ liststaff: success.data.value.$values });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async componentDidMount() {
    this.loadStaff();
  }

  async edit(staff) {
    var listtemp = this.state.liststaff;
    _.remove(listtemp, (n) => {
      return n.manhanvien === staff.manhanvien;
    });

    listtemp.push(staff);

    await this.setState({ liststaff: listtemp });
  }

  async add(staff) {
    var listtemp = this.state.liststaff;

    listtemp.push(staff);

    await this.setState({ liststaff: listtemp });
  }

  async delete(staff) {
    var listtemp = this.state.liststaff;

    _.remove(listtemp, (n) => {
      return n.manhanvien === staff.manhanvien;
    });
    await this.setState({ liststaff: listtemp });
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
              <h6 className="font-weight-bolder mb-0">Bảng sản nhân viên</h6>
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
                      + Thêm nhân viên
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
                            <b>Tên nhân viên</b>
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
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            <b>Ngày vào làm</b>
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            <b>CCCD</b>
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            <b>Ngày sinh</b>
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            <b>Chức vụ</b>
                          </th>
                          <th className="text-secondary opacity-7" />
                        </tr>
                      </thead>
                      <tbody>
                        {function () {
                          var result = null;
                          result = this.state.liststaff.map((value, key) => {
                            return (
                              <Item
                                staff={value}
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
