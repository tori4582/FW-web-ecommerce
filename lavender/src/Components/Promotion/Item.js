import React from "react";
import logo from "../../Common/images/logo.png";
import * as myvoucherApi from "../apis/myvoucher";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import * as myToast from "../../Common/helper/toastHelper";

const cookie = new Cookies();

export default function Item(props) {
  const makhachhang = useSelector((state) => state.login.makhachhang);
  const history = useHistory();
  const luuVoucher = () => {
    if (makhachhang === undefined) {
      history.push("/login");
      return;
    }
    var token = cookie.get("token");
    var refreshtoken = cookie.get("refreshtoken");
    myvoucherApi
      .luuVoucher(makhachhang, props.voucher.makhuyenmai, token, refreshtoken)
      .then((success) => {
        if (success.status === 200)
          myToast.toastSucces("Thêm voucher thành công");
      })
      .catch((error) => {
        console.error(error);
        myToast.toastError("Thêm voucher thất bại");
      });
  };
  return (
    <div
      className="sc-jrsJWt bJoZof coupon-list__coupon-item-2"
      type="full"
      style={{ width: "100%", position: "relative", zIndex: 2 }}
    >
      <div className="sc-fujyAs HRJop2" type="full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 474 132"
          className="coupon-bg"
        >
          <g fill="none" fillRule="evenodd">
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <g transform="translate(-3160 -2828) translate(3118 80) translate(42 2487) translate(0 140) translate(0 85) translate(0 36)">
                        <path
                          fill="#FFF"
                          d="M466 0c4.418 0 8 3.582 8 8v116c0 4.418-3.582 8-8 8H140.5c0-4.419-3.582-8-8-8s-8 3.581-8 8H8c-4.418 0-8-3.582-8-8V8c0-4.418 3.582-8 8-8h116.5c0 4.418 3.582 8 8 8s8-3.582 8-8H392z"
                        />
                        <g
                          stroke="#EEE"
                          strokeDasharray="2 4"
                          strokeLinecap="square"
                          mask="url(#14s2l20tnb)"
                        >
                          <path
                            d="M0.5 0L0.5 114"
                            transform="translate(132 11)"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>

        <div className="sc-iqAclL jibPFy">
          <div className="sc-iklJeh hbusih">
            <img className="sc-pNWdM" src={logo} alt="not_eligible-stamp" />
          </div>
          <div className="sc-iJCRrE2">
            <div className="sc-giAqHp bYgUJS"></div>

            <div>
              <h4 className="sc-hBMUJo ifIyhA">{props.voucher.tenkhuyenmai}</h4>
              <p className="sc-fnVZcZ hmqpxx">{props.voucher.dieukien}</p>
              <p className="sc-fnVZcZ hmqpxx">
                Giảm {(props.voucher.tilekhuyenmai * 100).toFixed(0)}%
              </p>
              <p className="sc-fnVZcZ hmqpxx">
                {" "}
                NBD:{" "}
                {(() => {
                  var dateObj = new Date(props.voucher.ngaybatdau);
                  const day = String(dateObj.getDate()).padStart(2, "0");
                  const month = dateObj.getMonth() + 1;
                  const year = dateObj.getFullYear();
                  const output = day + "/" + month + "/" + year;
                  return output;
                })()}
                {"     "}NKT:{" "}
                {(() => {
                  var dateObj = new Date(props.voucher.ngayketthuc);
                  const day = String(dateObj.getDate()).padStart(2, "0");
                  const month = dateObj.getMonth() + 1;
                  const year = dateObj.getFullYear();
                  const output = day + "/" + month + "/" + year;
                  return output;
                })()}
              </p>
            </div>
          </div>
        </div>

        <button
          className="btn btn-primary btn-luu-voucher"
          onClick={luuVoucher}
        >
          Lưu
        </button>
      </div>
    </div>
  );
}
