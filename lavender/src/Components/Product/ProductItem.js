import React, { Component } from "react";
import "./ProductItem.css";
import * as imageApi from "../apis/image.js";
import { Link } from "react-router-dom";
import * as detailProductapi from "../apis/detailProduct";
import * as evalueteApi from "../apis/evaluete";
import * as productApi from "../apis/product";

export default class ProductItem extends Component {
  state = { giamoi: 0, sosao: 0, sodanhgia: 0, thongsokithuat: [] };
  componentDidMount() {
    detailProductapi
      .xemgiamoitheomasanpham(this.props.product.masanpham)
      .then((success) => {
        if (success.status === 200)
          this.setState({ giamoi: success.data.value });
      })
      .catch((error) => {
        console.error(error);
      });

    evalueteApi
      .evalueteByProductId(this.props.product.masanpham)
      .then((success) => {
        if (success.status === 200) {
          this.setState({
            sosao: success.data.value.trungbinh,
            sodanhgia: success.data.value.sodanhgia,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });

    productApi
      .thongsokithuatBangMasanpham(this.props.product.masanpham)
      .then((success) => {
        this.setState({ thongsokithuat: success.data.value.$values });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <div className="product-item " data-aos="zoom-in" data-aos-delay={100}>
        <div className="icon-box iconbox-blue">
          <div className="row">
            {function () {
              if (this.state.giamoi === 0) return;
              if (this.state.giamoi < this.props.product.dongia)
                return (
                  <div className="box-item-sticker-percent">
                    <p>
                      Giảm{""}
                      {(
                        100 -
                        (this.state.giamoi / this.props.product.dongia) * 100
                      ).toFixed(0)}
                      %
                    </p>
                  </div>
                );
            }.bind(this)()}

            <Link to={this.props.product.image} className="box-click">
              <div className="icon">
                <img
                  alt="img"
                  src={imageApi.image(this.props.product.image)}
                ></img>
                <i className="bx bxl-dribbble" />
              </div>
              <h4>
                <div className="product-name">
                  {this.props.product.tensanpham}
                </div>
              </h4>
            </Link>
            <div className="row product-price">
              <div className="">
                {function () {
                  var result = [];
                  if (this.state.giamoi !== this.props.product.dongia) {
                    result.push(
                      <p className="old-price">{this.props.product.dongia}₫</p>
                    );
                  }
                  result.push(
                    <a href={() => false}>
                      {this.state.giamoi === 0
                        ? "Hết hàng"
                        : this.state.giamoi + "₫"}{" "}
                    </a>
                  );
                  return result;
                }.bind(this)()}
              </div>
              <div className="item-product__box-raiting mt-4 ">
                <i
                  className={
                    this.state.sosao < 1 ? "fas fa-star" : "fas fa-star checked"
                  }
                />
                <i
                  className={
                    this.state.sosao < 2 ? "fas fa-star" : "fas fa-star checked"
                  }
                />
                <i
                  className={
                    this.state.sosao < 3 ? "fas fa-star" : "fas fa-star checked"
                  }
                />
                <i
                  className={
                    this.state.sosao < 4 ? "fas fa-star" : "fas fa-star checked"
                  }
                />
                <i
                  className={
                    this.state.sosao < 5 ? "fas fa-star" : "fas fa-star checked"
                  }
                />
                &nbsp;{this.state.sodanhgia} đánh giá
              </div>
            </div>
          </div>

          <div className="product-info row">
            <p className="">
              {(() => {
                var x = this.state.thongsokithuat.find((obj) => {
                  return obj.ten === "cpu" || obj.ten === "chip";
                });
                if (x !== undefined) {
                  return "Cpu : " + x.noidung;
                }
              })()}
            </p>
            <p>
              {(() => {
                var x = this.state.thongsokithuat.find((obj) => {
                  return obj.ten === "ram" || obj.ten === "dung lượng";
                });
                if (x !== undefined) {
                  return "Bộ nhớ : " + x.noidung;
                }
              })()}
            </p>
            <p>
              {(() => {
                var x = this.state.thongsokithuat.find((obj) => {
                  return (
                    obj.ten === "ssd" ||
                    obj.ten === "bộ nhớ" ||
                    obj.ten === "hdd"
                  );
                });
                if (x !== undefined) {
                  return "Dung lượng : " + x.noidung;
                }
              })()}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
