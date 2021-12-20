import React, { Component } from "react";
import "./style.css";
// import _ from "lodash";
import * as imageApi from "../apis/image";

export default class index extends Component {
  state = { slideIndex: 0 };
  nextSlides = () => {
    var n = this.state.slideIndex + 1;
    if (n === this.props.sohinhanh) n = 0;
    this.setState({ slideIndex: n });
  };
  preSlides = () => {
    var n = this.state.slideIndex - 1;
    if (n === -1) n = this.props.sohinhanh - 1;
    this.setState({ slideIndex: n });
  };
  click = (n) => {
    this.setState({ slideIndex: n });
  };
  render() {
    return (
      <div className="box">
        {function () {
          var result = [];
          for (var i = 0; i < this.props.sohinhanh; i++) {
            result.push(
              <div
                className={
                  i === this.state.slideIndex
                    ? "product-img fade show"
                    : "product-img fade hidden"
                }
              >
              
                <img className="main-img box-shadow pink-shadow" alt="" src={imageApi.image(this.props.product.image, i)} />
                
                <a   className="prev" onClick={this.preSlides}>
                  ❮
                </a>
                <a   className="next" onClick={this.nextSlides}>
                  ❯
                </a>
              </div>
            );
          }
          return result;
        }.bind(this)()}

        {/* Image text */}
        <div className="caption-box" alt="">
          <p id="caption" alt=""/>
        </div>
        {/* The dots/circles */}
        <div style={{ textAlign: "center" }}>
          {function () {
            // body
            var result = [];
            for (var i = 0; i < this.props.sohinhanh; i++) {
              if (i === this.state.slideIndex) {
                result.push(<span className="dot dotactive" />);
              } else result.push(<span className="dot" />);
            }

            return result;
          }.bind(this)()}
        </div>
        {/* Thumbnail images */}
        <div className="row">
          {function () {
            var result = [];
            for (var i = 0; i < this.props.sohinhanh; i++) {
              if (i === this.state.slideIndex) {
                result.push(
                  <div className="mini-image">
                    <img
                      className="image-format mini-active"
                      src={imageApi.image(this.props.product.image, i)}
                      style={{ width: "100%" }}
                      alt=""
                    />
                  </div>
                );
              } else
                result.push(
                  <div className="mini-image">
                    <img
                      className="image-format demo cursor mini-inactive"
                      src={imageApi.image(this.props.product.image, i)}
                      style={{ width: "100%" }}
                      alt=""
                      onClick={this.click.bind(this, i)}
                    />
                  </div>
                );
            }
            return result;
          }.bind(this)()}
          {/* Thumbnail images */}
        </div>
        {/* <div className="row">
            {_.times(3, (i) => (
              <div className="mini-image">
                <img
                  className="image-format demo cursor"
                  src={myImage(i)}
                  style={{ width: "100%" }}
                  alt=""
                />
              </div>
            ))}
          </div> */}
      </div>
    );
  }
}
