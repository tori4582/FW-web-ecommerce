import React, { useState, useEffect } from "react";
import * as imageApi from "../apis/image";
import { Link } from "react-router-dom";

export default function Item(props) {
  return (
    <li className="odd first last">
      <Link to={props.product.image}>
        <div className="box-img">
          <img alt="anhthunho" src={imageApi.image(props.product.image)} />
        </div>
        <div className="box-info">
          <div className="box-name">
            <p>{props.product.tensanpham}</p>
          </div>
          <div className="box-price">
            <p className="special-price">{props.product.dongia}&nbsp;₫</p>
          </div>
        </div>
      </Link>
    </li>
  );
}
