import React from "react";
import "./LMember.css";
import routes from "./routes";
import { Redirect } from "react-router-dom";
import { Route, Switch, BrowserRouter, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie/es6";
import { withRouter } from "react-router-dom";
import * as loginAct from "../redux/actions/loginAct";
import { useGoogleLogout } from "react-google-login";
import * as myConst from "../../Common/constants/index";

const cookie = new Cookies();

function Lmember(props) {
  const makhachhang = useSelector((state) => state.login.makhachhang);
  const dispatch = useDispatch();
  const clientId = myConst.CLIENT_ID;
  const logout = async () => {
    dispatch(
      loginAct.postLogoutReport(
        makhachhang,
        "khachhang",
        cookie.get("token"),
        cookie.get("refreshtoken")
      )
    );
    signOut();
  };
  const onLogoutSuccess = () => {
    console.log("logout google");

    const auth2 = window.gapi.auth2.getAuthInstance();
    if (auth2 != null) {
      auth2.signOut().then(auth2.disconnect().then());
    }
  };
  const onFailure = () => {
    console.log("google logout failure");
  };
  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
    isSignedIn:false,
    disabled	:false
  });
  const showContentMenus = (routes) => {
    var result = null;
    if (routes.length) {
      result = routes.map((value, key) => {
        let keyRan = key;
        if (value.path === "/cart") keyRan = Date.now();
        return (
          <Route
            path={value.path}
            exact={value.exact}
            component={value.main}
            keyProp={key}
            key={keyRan}
          ></Route>
        );
      });
    }
    return <Switch>{result}</Switch>;
  };
  return (
    <section>
      {makhachhang === undefined && <Redirect to="/login"></Redirect>}
      <BrowserRouter>
        {makhachhang !== undefined && (
          <Redirect to="/lmember/thongtintaikhoan" />
        )}
        <div className="container">
          <div className="row">
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
              <div className="leftmember">
                <div className="Container-sc-itwfbd-0 hfMLFx">
                  <div className="Account__StyledAccountLayout-sc-1d5h8iz-0 dLDnti">
                    <aside className="Account__StyledSideBar-sc-1d5h8iz-2 bhbbJ">
                      <div className="Account__StyledAvatar-sc-1d5h8iz-3 jIFHQL">
                        <img
                          src={
                            "https://salt.tikicdn.com/desktop/img/avatar.png"
                          }
                          alt=""
                        />
                        <div className="info">
                         <strong> Tài khoản của tôi </strong>
                        </div>
                      </div>
                      <ul className="Account__StyledNav-sc-1d5h8iz-4 fAkTRM">
                        <li>
                          <Link className="" to="/lmember/thongtintaikhoan">
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth={0}
                              viewBox="0 0 24 24"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                            <span>Thông tin tài khoản</span>
                          </Link>
                        </li>
                        <li>
                          <Link className to="/lmember/thongbaocuatoi">
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth={0}
                              viewBox="0 0 24 24"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                            </svg>
                            <span>Thông báo của tôi</span>
                            <span className="badge">5</span>
                          </Link>
                        </li>
                        <li>
                          <Link className to="/lmember/quanlydonhang">
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth={0}
                              viewBox="0 0 24 24"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M13 12h7v1.5h-7zm0-2.5h7V11h-7zm0 5h7V16h-7zM21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15h-9V6h9v13z" />
                            </svg>
                            <span>Quản lý đơn hàng</span>
                          </Link>
                        </li>

                        <li>
                          <Link className to="/lmember/sanphamyeuthich">
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth={0}
                              viewBox="0 0 24 24"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            <span>Sản phẩm yêu thích</span>
                          </Link>
                        </li>
                        <li>
                          <a
                            href={() => false}
                            className="text-light btn btn-success"
                            to="/lmember/sanphamyeuthich"
                            onClick={logout}
                          >
                            <span>
                              <i class="fas fa-sign-out-alt btn-logout-lmember-logo"></i>
                              Đăng xuất
                            </span>
                          </a>
                        </li>
                      </ul>
                    </aside>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
              <div className="rightmember">{showContentMenus(routes)}</div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </section>
  );
}

export default withRouter(Lmember);
