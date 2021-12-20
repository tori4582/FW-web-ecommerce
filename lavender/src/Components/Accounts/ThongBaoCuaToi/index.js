import React, { Component } from "react";
import "./ThongBaoCuaToi.css";
import Voucher from "./Voucher";
import Lichsu from "./Lichsu";

export default class index extends Component {
  async deleteAllVoucher(){
    
  }
  state = { trang: 1 };
  render() {
    return (
      <div class="Account__StyledAccountLayoutInner-sc-1d5h8iz-1 jXurFV">
        <div class="styles__StyledNotification-sc-1ghyfo6-0 goLqYu">
          <div class="heading">Thông báo của tôi (5)</div>
          <div class="inner">
            <ul class="tabs">
              <li
                class={this.state.trang === 1 && "is-active"}
                title="voucher"
                onClick={() => this.setState({ trang: 1 })}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z"></path>
                </svg>
                <span class="dot-unread"></span>
              </li>
              <li
                class={this.state.trang === 2 && "is-active"}
                title="history"
                onClick={() => this.setState({ trang: 2 })}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1-2.73 2.71-2.73 7.08 0 9.79 2.73 2.71 7.15 2.71 9.88 0C18.32 15.65 19 14.08 19 12.1h2c0 1.98-.88 4.55-2.64 6.29-3.51 3.48-9.21 3.48-12.72 0-3.5-3.47-3.53-9.11-.02-12.58 3.51-3.47 9.14-3.47 12.65 0L21 3v7.12zM12.5 8v4.25l3.5 2.08-.72 1.21L11 13V8h1.5z"></path>
                </svg>
                <span class="dot-unread"></span>
              </li>
              <li class="last">
                <i class="bi bi-trash"></i>
              </li>
            </ul>
            {(() => {
              var result = [];
              switch (this.state.trang) {
                case 1:
                  result.push(<Voucher></Voucher>);
                  break;
                case 2:
                  result.push(<Lichsu></Lichsu>);
                  break;
                default:
                  break;
              }
              return result;
            })()}
          </div>
        </div>
      </div>
    );
  }
}
