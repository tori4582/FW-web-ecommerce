import React, { Component } from "react";
import * as productApi from "../../apis/product";
import * as detailProductapi from "../../apis/detailProduct";
import * as imageApi from "../../apis/image";
import { Redirect } from "react-router-dom";

export default class SanphamItem extends Component {
  state = { sanpham: {}, giamoi: 0 };
  async componentDidMount() {
    let sanpham = {};
    let giamoi = 0;
    await productApi
      .findProductById(this.props.masanpham)
      .then((success) => {
        if (success.status === 200) {
          sanpham = success.data.value;
        }
      })
      .catch((error) => {
        console.error(error);
      });

    await detailProductapi
      .xemgiamoitheomasanpham(this.props.masanpham)
      .then((success) => {
        giamoi = success.data.value;
      })
      .catch((error) => {
        console.error(error);
      });

    this.setState({ sanpham: sanpham, giamoi: giamoi });
  }

  async deleteSanphamyeuthich(){
    
  }

  render() {
    return (
      <li className="item border rounded">
        <button className="btn-delete">×</button>
        <div className="thumbnail">
          <a
            href={this.state.sanpham.image}
            onClick={() => (
              <Redirect to={this.this.state.sanpham.image}></Redirect>
            )}
          >
            <div className="Picture__StyledPicture-sc-10icj7e-0 jDowEZ loaded">
              <img
                alt="anhsanpham"
                className="image"
                src={
                  this.state.sanpham !== undefined &&
                  imageApi.image(this.state.sanpham.image)
                }
              />
            </div>
          </a>
        </div>
        <div className="body">
          <a
            className="name"
            href={() => false}
            onClick={() => (
              <Redirect to={this.this.state.sanpham.image}></Redirect>
            )}
          >
            {this.state.sanpham.tensanpham}
          </a>
          <div className="rating">
            <div className="rating__base">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
            <div className="rating__progress" style={{ width: "100%" }}>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
          </div>
          <span className="review-count">(8 nhận xét)</span>
          <div className="description" />
        </div>
        <div className="footer">
          <div className="price has-discount">{this.state.giamoi}</div>
          <div className="wrap">
            {(() => {
              if (this.state.sanpham.dongia !== this.state.giamoi)
                return (
                  <div className="list-price">{this.state.sanpham.dongia}</div>
                );
            })()}
            {(() => {
              if (this.state.sanpham.dongia !== this.state.giamoi)
                return (
                  <div className="discount">
                    -
                    {(
                      100 -
                      (this.state.giamoi / this.state.sanpham.dongia) * 100
                    ).toFixed(0)}
                    %
                  </div>
                );
            })()}
          </div>
        </div>
      </li>
    );
  }
}
