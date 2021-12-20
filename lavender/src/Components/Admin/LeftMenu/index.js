import React, { Component } from "react";
import { Route, Link, Redirect } from "react-router-dom";
import logo from "../../../Asset/logo/logo.png";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as loginAct from "../../redux/actions/loginAct";
import PropTypes from "prop-types";
import Cookies from "universal-cookie";
import { withRouter } from "react-router-dom";
import "./style.css";

const cookie = new Cookies();

const table = [
  {
    name: "Tổng quan",
    to: "/admin/overview",
  },
  {
    name: "Hoá đơn",
    to: "/admin/billing",
  },
  {
    name: "Khách hàng",
    to: "/admin/customer",
  },
  {
    name: "Sản phẩm",
    to: "/admin/product",
  },
  {
    name: "Chi tiết sản phẩm",
    to: "/admin/productdetail",
  },
  {
    name: "Nhân viên",
    to: "/admin/staff",
  },
  {
    name: "Nhà cung cấp",
    to: "/admin/suplier",
  },
  {
    name: "Khuyến mãi",
    to: "/admin/promotion",
  },
  {
    name: "Tài khoản nhân viên",
    to: "/admin/staffaccount",
  },
  {
    name: "Tài khoản khách hàng",
    to: "/admin/customeraccount",
  },
  {
    name: "Bảo hành",
    to: "/admin/guarantee",
  },
  {
    name: "Thương hiệu",
    to: "/admin/trademark",
  },
];

var MenuLink = ({ lable, to }) => {
  return (
    <Route
      path={to}
      children={({ match }) => {
        return (
          <li className="nav-item">
            <Link
              to={to}
              className={
                match
                  ? "nav-link text-white bg-gradient-primary"
                  : "nav-link text-white "
              }
            >
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i class="icon-dashboard"></i>
              </div>
              <span className="nav-link-text ms-1">{lable}</span>
            </Link>
          </li>
        );
      }}
    ></Route>
  );
};

class Index extends Component {
  componentDidMount() {
    const refreshtoken = cookie.get("refreshtoken");
    const { loginActionCreators } = this.props;
    const { postRefreshReport } = loginActionCreators;
    if (refreshtoken !== undefined) {
      postRefreshReport(refreshtoken);
    }
  }
  render() {
    return (
      <>
        {this.props.manhanvien === undefined && (
          <Redirect to="/login"></Redirect>
        )}
        <aside
          className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark"
          id="sidenav-main"
        >
          <div className="sidenav-header">
            <i
              className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
              aria-hidden="true"
              id="iconSidenav"
            />
            <a href={() => false} className="navbar-brand m-0">
              <img
                src={logo}
                className="navbar-brand-img h-100"
                alt="main_logo"
              />
              <span className="ms-1 font-weight-normal text-white">
                Lavender
              </span>
            </a>
          </div>

          <hr className="horizontal light mt-0 mb-2" />

          <div
            className="collapse navbar-collapse  w-auto  max-height-vh-100"
            id="sidenav-collapse-main"
          >
            <ul className="navbar-nav">
              {(() => {
                var result = null;
                result = table.map((value, key) => {
                  return (
                    <MenuLink
                      key={key}
                      lable={value.name}
                      to={value.to}
                    ></MenuLink>
                  );
                });
                return result;
              })()}
            </ul>
          </div>

          <div className="sidenav-footer position-absolute w-100 bottom-0 ">
            <div className="mx-3 group-btn-taikhoan text-center">
              <Link
                to="/admin/myaccount"
                className="btn bg-gradient-primary mt-4 w-100"
                href="https://www.creative-tim.com/product/material-dashboard-pro?ref=sidebarfree"
                type="button"
              >
                Tài khoản
              </Link>
            </div>
          </div>
        </aside>
      </>
    );
  }
}
Index.propTypes = {
  loginActionCreators: PropTypes.shape({
    postLoginReport: PropTypes.func,
  }),
  manhanvien: PropTypes.number,
};
const mapStateToProps = (state) => {
  return {
    manhanvien: state.login.manhanvien,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loginActionCreators: bindActionCreators(loginAct, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Index));
