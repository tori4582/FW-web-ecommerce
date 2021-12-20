import React, { Component } from "react";
import "./SanPhamYeuThich.css";
import * as favoriteApi from "../../apis/favorite";
import SanphamItem from "./SanphamItem";

export default class index extends Component {
  state = { listyeuthich: [] };
   componentDidMount() {
     this.loadDanhsach();
  }
  async loadDanhsach() {
    await favoriteApi
      .favorite()
      .then((success) => {
        this.setState({ listyeuthich: success.data.value.$values });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async deleteYeuthich(){
    await this.loadDanhsach();
  }
  render() {
    return (
      <div className="Account__StyledAccountLayoutInner-sc-1d5h8iz-1 jXurFV">
        <div className="styles__StyledAccountWishList-sc-11qh9gl-0 kagiDG">
          <div className="heading">Danh sách yêu thích (4)</div>
          <div className="inner">
            <ul className="list">
              {function () {
                var result = null;
                result = this.state.listyeuthich.map((value, key) => {
                  return (
                    <SanphamItem
                      key={key}
                      masanpham={value.masanpham}
                      deleteYeuthich={this.deleteYeuthich.bind(this)}
                    ></SanphamItem>
                  );
                });
                return result;
              }.bind(this)()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
