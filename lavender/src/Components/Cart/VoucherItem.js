import React, { Component } from "react";
import logo from "../img/logo.png";

export default class VoucherItem extends Component {
  async componentDidMount() {
  }
  chonKhuyenmai() {
    if (this.props.makhuyenmai===this.props.voucher.makhuyenmai) {
      this.props.chonKhuyenmai(undefined);
    } else {
      this.props.chonKhuyenmai(this.props.voucher.makhuyenmai);
    }
  }
  render() {
    return (
      <div
        className="sc-jrsJWt bJoZof coupon-list__coupon-item"
        type="full"
        style={{ width: "100%", position: "relative", zIndex: 2 }}
      >
        <div className="sc-fujyAs HRJop" type="full">
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
              <img
                className="sc-pNWdM"
                src={logo}
                alt="not_eligible-stamp"
                style={{ bottom: "4px", right: "4px" }}
              />
            </div>
            <div className="sc-iJCRrE bojiJp">
              <div className="sc-giAqHp bYgUJS"></div>
              {parseInt(this.props.makhuyenmai)===this.props.voucher.makhuyenmai ? (
                <i
                  class="bi bi-arrow-right-circle"
                  onClick={this.chonKhuyenmai.bind(this)}
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "23px",
                    transform: "translate(8px, -8px)",
                    fontSize: "25px",
                    color: "red",
                    cursor: "pointer"
                  }}
                ></i>
              ) : (
                <i
                  class="bi bi-arrow-right-circle"
                  onClick={this.chonKhuyenmai.bind(this)}
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "23px",
                    transform: "translate(8px, -8px)",
                    fontSize: "25px",
                    cursor: "pointer"
                  }}
                ></i>
              )}

              <div style={{ paddingRight: "28px" }}>
                <h4 className="sc-hBMUJo ifIyhA">
                  {this.props.voucher.tenkhuyenmai}
                </h4>
                <p className="sc-fnVZcZ hmqpxx">
                  {this.props.voucher.dieukien}
                </p>
                <p className="sc-fnVZcZ hmqpxx">
                  Giảm {(this.props.voucher.tilekhuyenmai * 100).toFixed(0)}%
                </p>
              </div>

              <div className="sc-ezzafa dvHFX">
                <p className="sc-pNWdM XJxhY" style={{ paddingRight: "8px" }}>
                  HSD:{" "}
                  {(() => {
                    var dateObj = new Date(this.props.voucher.ngayketthuc);
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
        </div>
      </div>
    );
  }
}
