import React, { Component } from "react";
import "./Header.css";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as loginAct from "./redux/actions/loginAct";
import PropTypes from "prop-types";
import logo from "../Asset/logo/logo.png";
import BoxSearch from "./BoxSearch";
import Cookies from "universal-cookie";
import Social from "./Social";

const cookie = new Cookies();

const menus = [
  {
    name: "Trang chủ",
    to: "/",
    exact: true,
    list: [],
  },
  {
    name: "Điện thoại",
    to: "/mobile",
    exact: true,
  },
  {
    name: "Laptop",
    to: "/laptop",
    exact: false,
    list: [],
  },
  {
    name: "Bài viết",
    to: "/article",
    exact: false,
    list: [],
  },
  {
    name: "Bảo hành",
    to: "/guarantee",
    exact: false,
    list: [],
  },
];

var MenuLink = ({ lable, to, activeOnlyWhenExact }) => {
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) => {
        return (
          <li>
            <Link to={to}>{lable}</Link>
            <i class={match ? "fas fa-circle dot-circle-active" : ""}></i>
          </li>
        );
      }}
    ></Route>
  );
};

var showMenu = (temps) => {
  var result = null;
  result = temps.map((value, key) => {
    return (
      <MenuLink
        key={key}
        lable={value.name}
        to={value.to}
        activeOnlyWhenExact={value.exact}
        list={value.list}
      ></MenuLink>
    );
  });
  return result;
};

class Header extends Component {
  componentDidMount() {

  }
  render() {
    return (
      <>
        <Social></Social>
        <header id="header" className="fixed-top">
          <div className="container d-flex align-items-center justify-content-between">
            <Link to="/">
              <img alt="logo-img" className="logo-img" src={logo}></img>
            </Link>

            <BoxSearch></BoxSearch>

            <div id="navbar" className="navbar">
              <ul>
                {showMenu(menus)}
                <li>
                  <Link
                    className="getstarted scrollto button-to-cart"
                    to="/cart"
                  >
                    <i
                      className="fas fa-shopping-cart icon-getstarted"
                      style={{ fontSize: "17px" }}
                    ></i>
                    GIỎ HÀNG
                  </Link>
                </li>
                {this.props.makhachhang !== undefined && (
                  <li>
                    <Link
                      className="getstarted scrollto button-to-cart"
                      to="/lmember"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-person-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path
                          fillRule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                        />
                      </svg>
                      LMEMBER
                    </Link>
                  </li>
                )}
                {this.props.manhanvien !== undefined && (
                  <li>
                    <Link
                      className="getstarted scrollto button-to-cart"
                      to="/admin/overview"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-person-circle icon-getstarted"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path
                          fillRule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                        />
                      </svg>
                      ADMIN
                    </Link>
                  </li>
                )}
                {this.props.makhachhang === undefined &&
                  this.props.manhanvien === undefined && (
                    <li>
                      <Link
                        className="getstarted scrollto button-to-cart"
                        to="/login"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-person-circle icon-getstarted"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                          <path
                            fillRule="evenodd"
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                          />
                        </svg>
                        LOGIN
                      </Link>
                    </li>
                  )}
              </ul>
            </div>
            {/* .navbar */}
          </div>
        </header>
      </>
    );
  }
}

Header.propTypes = {
  loginActionCreators: PropTypes.shape({
    postLoginReport: PropTypes.func,
  }),
  makhachhang: PropTypes.number,
  manhanvien: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    makhachhang: state.login.makhachhang,
    manhanvien: state.login.manhanvien,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loginActionCreators: bindActionCreators(loginAct, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
