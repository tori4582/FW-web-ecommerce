import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import "./style.css";
import * as trademarkApi from "../apis/trademark";

function importAll(r) {
  return r.keys().map(r);
}

const images = (type)=>{
  if (type==="mobile")  return importAll(require.context("../../Asset/trademark/mobile", false, /\.(png|jpe?g|svg)$/));
  if (type==="laptop")  return importAll(require.context("../../Asset/trademark/laptop", false, /\.(png|jpe?g|svg)$/));
  return importAll(require.context("../../Asset/trademark/mobile", false, /\.(png|jpe?g|svg)$/));
}
  

const myImage = (name, type) => {
  let img = null;
  images(type).map((data) => {
    if (data.default.includes(name)) img = data.default;
    return data.default;
  });
  return img;
};

export default class index extends Component {
  state = { trademark: [] };
  componentDidMount() {
    let trademark = [];
    trademarkApi
      .trademark(this.props.type)
      .then((success) => {
        if (success.status === 200) {
          let temp = success.data.value.$values;
          for (var i = 0; i < temp.length; i++) {
            trademark.push(temp[i].tenthuonghieu.toLowerCase());
          }
          this.setState({ trademark: trademark });
        }
      })
      .catch((error) => {
        console.error(error);
        return;
      });
  }
  mapTrademark = () => {
    let result = null;
    if (this.state.trademark.length === 0) return;

    result = this.state.trademark.map((value, index) => {
      let url = null;
      if (value === this.props.hang) url = "/" + this.props.type;
      else url = "/" + this.props.type + "?hang=" + value;
      return (
        <Link
          to={url}
          key={index}
          className={
            value === this.props.hang
              ? "trademark-item trademark-selected"
              : "trademark-item "
          }
        >
          <img
            className="trademark-icon loaded"
            // data-ll-status="loaded"
            src={myImage(value, this.props.type)}
            alt=""
          ></img>
        </Link>
      );
    });

    return <Route>{result}</Route>;
  };
  render() {
    return <div className="trademark-list">{this.mapTrademark()}</div>;
  }
}
