import React, { Component } from "react";
import * as hoadonAPI from "../../apis/billing";
import * as noteAPI from "../../apis/note";
import BillItem from "./BillItem";
import ImportItem from "./ImportItem";
import "./style.css";
import AddBill from "./AddBill";
import AddNote from "./AddNote";
import Cookies from "universal-cookie";

const cookie = new Cookies();

export default class index extends Component {
  state = {
    billing: [],
    importBilling: [],
    modal: 0,
  };
  showModal = (index) => {
    this.setState({ modal: index });
  };
  hideModal = () => {
    this.setState({ modal: 0 });
  };
  async loadBill() {
    let billing = [];
    var token = cookie.get("token");
    var refreshtoken = cookie.get("refreshtoken");
    await hoadonAPI
      .twentyhoadon(token, refreshtoken)
      .then((success) => {
        billing = success.data.value.$values;
      })
      .catch((error) => {
        console.error(error);
      });

    this.setState({
      billing: billing,
    });
  }
  async loadImport() {
    let importBilling = [];
    var token = cookie.get("token");
    var refreshtoken = cookie.get("refreshtoken");
    await noteAPI
      .importNote(token, refreshtoken)
      .then((success) => {
        importBilling = success.data.value.$values;
      })
      .catch((error) => {});
    this.setState({ importBilling: importBilling });
  }
  async componentDidMount() {
    this.loadBill();
    this.loadImport();
  }
  render() {
    return (
      <main className="main-content position-relative border-radius-lg left-menu">
        <>
          {(() => {
            if (this.state.modal === 1)
              return (
                <AddBill
                  handleClose={this.hideModal.bind(this)}
                  handleSave={() => {
                    this.loadBill();
                    this.hideModal.bind(this)();
                  }}
                ></AddBill>
              );
            else if (this.state.modal === 2)
              return (
                <AddNote
                  handleClose={this.hideModal.bind(this)}
                  handleSave={() => {
                    this.loadImport();
                    this.hideModal.bind(this)();
                  }}
                ></AddNote>
              );
          })()}
        </>
        <nav
          className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
          id="navbarBlur"
          navbar-scroll="true"
        >
          <div className="container-fluid py-1 px-3">
            <div
              className="collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4"
              id="navbar"
            >
              <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                <div className="input-group input-group-outline">
                  <label className="form-label">Type here...</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <ul className="navbar-nav  justify-content-end">
                <li className="nav-item d-flex align-items-center">
                  <a
                    href={() => false}
                    className="nav-link text-body font-weight-bold px-0"
                  >
                    <i className="fa fa-user me-sm-1" />
                    <span className="d-sm-inline d-none">Sign In</span>
                  </a>
                </li>
                <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                  <a
                    href={() => false}
                    className="nav-link text-body p-0"
                    id="iconNavbarSidenav"
                  >
                    <div className="sidenav-toggler-inner">
                      <i className="sidenav-toggler-line" />
                      <i className="sidenav-toggler-line" />
                      <i className="sidenav-toggler-line" />
                    </div>
                  </a>
                </li>
                <li className="nav-item px-3 d-flex align-items-center">
                  <a href={() => false} className="nav-link text-body p-0">
                    <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer" />
                  </a>
                </li>
                <li className="nav-item dropdown pe-2 d-flex align-items-center">
                  <a
                    href={() => false}
                    className="nav-link text-body p-0"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-bell cursor-pointer" />
                  </a>
                  <ul
                    className="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li className="mb-2">
                      <a
                        href={() => false}
                        className="dropdown-item border-radius-md"
                      >
                        <div className="d-flex py-1">
                          <div className="my-auto">
                            <img
                              alt=""
                              src="../assets/img/team-2.jpg"
                              className="avatar avatar-sm  me-3 "
                            />
                          </div>
                          <div className="d-flex flex-column justify-content-center">
                            <h6 className="text-sm font-weight-normal mb-1">
                              <span className="font-weight-bold">
                                New message
                              </span>{" "}
                              from Laur
                            </h6>
                            <p className="text-xs text-secondary mb-0">
                              <i className="fa fa-clock me-1" />
                              13 minutes ago
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="mb-2">
                      <a
                        href={() => false}
                        className="dropdown-item border-radius-md"
                      >
                        <div className="d-flex py-1">
                          <div className="my-auto">
                            <img
                              alt=""
                              src="../assets/img/small-logos/logo-spotify.svg"
                              className="avatar avatar-sm bg-gradient-dark  me-3 "
                            />
                          </div>
                          <div className="d-flex flex-column justify-content-center">
                            <h6 className="text-sm font-weight-normal mb-1">
                              <span className="font-weight-bold">
                                New album
                              </span>{" "}
                              by Travis Scott
                            </h6>
                            <p className="text-xs text-secondary mb-0">
                              <i className="fa fa-clock me-1" />1 day
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item border-radius-md"
                        href={() => false}
                      >
                        <div className="d-flex py-1">
                          <div className="avatar avatar-sm bg-gradient-secondary  me-3  my-auto">
                            <svg
                              width="12px"
                              height="12px"
                              viewBox="0 0 43 36"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                            >
                              <title>credit-card</title>
                              <g
                                stroke="none"
                                strokeWidth={1}
                                fill="none"
                                fillRule="evenodd"
                              >
                                <g
                                  transform="translate(-2169.000000, -745.000000)"
                                  fill="#FFFFFF"
                                  fillRule="nonzero"
                                >
                                  <g transform="translate(1716.000000, 291.000000)">
                                    <g transform="translate(453.000000, 454.000000)">
                                      <path
                                        className="color-background"
                                        d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z"
                                        opacity="0.593633743"
                                      />
                                      <path
                                        className="color-background"
                                        d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z"
                                      />
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </svg>
                          </div>
                          <div className="d-flex flex-column justify-content-center">
                            <h6 className="text-sm font-weight-normal mb-1">
                              Payment successfully completed
                            </h6>
                            <p className="text-xs text-secondary mb-0">
                              <i className="fa fa-clock me-1" />2 days
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* End Navbar */}
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-lg-8">
              <div className="row">
                <div className="col-xl-6 mb-xl-0 mb-1">
                  <div className="card bg-transparent shadow-xl">
                    <div className="overflow-hidden position-relative border-radius-xl">
                      <span className="mask bg-gradient-dark opacity-10" />
                      <div className="card-body position-relative z-index-1 p-3">
                        <i class="bi bi-wifi text-white"></i>
                        <h5 className="text-white mb-5 pb-2">
                          4562&nbsp;&nbsp;&nbsp;1122&nbsp;&nbsp;&nbsp;4594&nbsp;&nbsp;&nbsp;7852
                        </h5>
                        <div className="d-flex">
                          <div className="d-flex">
                            <div className="me-4">
                              <p className="text-white text-sm opacity-8 mb-0">
                                Card Holder
                              </p>
                              <h6 className="text-white mb-0">Jack Peterson</h6>
                            </div>
                            <div>
                              <p className="text-white text-sm opacity-8 mb-0">
                                Expires
                              </p>
                              <h6 className="text-white mb-0">11/22</h6>
                            </div>
                          </div>
                          <div className="ms-auto w-20 d-flex align-items-end justify-content-end">
                            <img
                              className="w-60 mt-2"
                              src={
                                "https://banner2.cleanpng.com/20180824/jbf/kisspng-mastercard-logo-credit-card-visa-brand-mastercard-logo-icon-paypal-icon-logo-png-and-v-5b8036c0e7dcf3.7313769415351292809497.jpg"
                              }
                              alt="logo"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="row">
                    <div className="col-md-6 col-6">
                      <div className="card">
                        <div className="card-bill-custom p-3 text-center ">
                          <div className="icon icon-shape icon-lg bg-gradient-primary shadow text-center border-radius-lg box-shadow">
                            <i className="material-icons opacity-10">
                              account_balance
                            </i>
                          </div>
                        </div>
                        <div className="card-body pt-0 p-3 text-center">
                          <h6 className="text-center mb-0">Salary</h6>
                          <span className="text-xs">Belong Interactive</span>
                          <hr className="horizontal dark my-3" />
                          <h5 className="mb-0">+$2000</h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-6">
                      <div className="card">
                        <div className="card-bill-custom p-3 text-center">
                          <div className="icon icon-shape icon-lg bg-gradient-primary shadow text-center border-radius-lg box-shadow">
                            <i className="material-icons opacity-10">
                              account_balance_wallet
                            </i>
                          </div>
                        </div>
                        <div className="card-body pt-0 p-3 text-center">
                          <h6 className="text-center mb-0">Paypal</h6>
                          <span className="text-xs">Freelance Payment</span>
                          <hr className="horizontal dark my-3" />
                          <h5 className="mb-0">$455.00</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card h-30 card-xuatfile">
                <div className="pb-0 p-3">
                  <div className="row">
                    <div className="col-6 d-flex align-items-center">
                      <h6 className="mb-0">Xuất file thống kê</h6>
                    </div>
                    <div className="col-6 text-end">
                      <button className="btn btn-outline-primary btn-sm mb-0">
                        View All
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body p-3 pb-0">
                  <ul className="list-group">
                    <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                      <div className="d-flex flex-column">
                        <h6 className="text-dark font-weight-bold text-sm">
                          Hoá đơn bán
                        </h6>

                        <div>
                          <div className="">
                            <span className="text-xs">Chọn ngày </span>
                            <input
                              className="form-control border "
                              type="date"
                              id="start"
                              name="trip-start"
                            ></input>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center text-sm">
                        <button
                          className="btn btn-link text-dark display-1"
                          id="fileban"
                        >
                          <h1>
                            <i class="bi bi-file-earmark-excel"></i>
                          </h1>
                        </button>
                      </div>
                    </li>
                    <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                      <div className="d-flex flex-column">
                        <h6 className="text-dark font-weight-bold text-sm">
                          Hoá đơn nhập
                        </h6>
                        <div>
                          <div className="">
                            <span className="text-xs">Chọn ngày </span>
                            <input
                              className="form-control border "
                              type="date"
                              id="start"
                              name="trip-start"
                            ></input>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center text-sm">
                        <button
                          className="btn btn-link text-dark display-1"
                          id="filenhap"
                        >
                          <h1>
                            <i class="bi bi-file-earmark-excel"></i>
                          </h1>
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-7">
              <div className="card">
                <div className="pb-0 px-3">
                  <div className="row">
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                      <h6 className="mt-4 mb-0">Hoá đơn bán</h6>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                      <div className="col-6 text-end">
                        <div className="btn-add-bill">
                          <a
                            href={() => false}
                            className="btn bg-gradient-dark mb-0 mt-4 "
                            onClick={() => this.showModal(1)}
                          >
                            <i class="bi bi-plus"></i> Thêm mới hoá đơn
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-body pt-4 p-3">
                  <ul className="list-group">
                    {function () {
                      let result = null;
                      result = this.state.billing.map((value, key) => {
                        return (
                          <BillItem
                            bill={value}
                            key={key}
                            handleSave={this.loadBill.bind(this)}
                          ></BillItem>
                        );
                      });
                      return result;
                    }.bind(this)()}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="card h-100 mb-4">
                <div className="pb-0 px-3">
                  <div className="row">
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                      <h6 className="mt-4 mb-0">Phiếu nhập kho</h6>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                      <div className="col-6 text-end">
                        <div className="btn-import-bill">
                          <a
                            href={() => false}
                            className="btn bg-gradient-dark mb-0 mt-4"
                            onClick={() => this.showModal(2)}
                          >
                            <i class="bi bi-plus"></i> Thêm mới phiếu nhập
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-body pt-4 p-3">
                  <ul className="list-group">
                    {function () {
                      let result = null;
                      result = this.state.importBilling.map((value, key) => {
                        return (
                          <ImportItem
                            bill={value}
                            key={key}
                            handleSave={this.loadImport.bind(this)}
                          ></ImportItem>
                        );
                      });
                      return result;
                    }.bind(this)()}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
