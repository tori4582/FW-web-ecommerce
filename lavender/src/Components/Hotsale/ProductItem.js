import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as imageApi from "../apis/image";
import * as detailProductapi from "../apis/detailProduct";
import * as evalueteApi from "../apis/evaluete";

export default function ProductItem(props) {
  const [giamoi, setGiamoi] = useState(0);
  const [sosao, setSosao]= useState(0);
  const [sodanhgia, setSodanhgia] = useState(0);
  useEffect(() => {
    detailProductapi
      .xemgiamoitheomasanpham(props.product.masanpham)
      .then((success) => {
        if (success.status === 200) setGiamoi(success.data.value);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [props.product.masanpham]);

  useEffect(() => {
    evalueteApi.evalueteByProductId(props.product.masanpham)
    .then(success => {
      if (success.status===200) {
        setSosao(success.data.value.trungbinh);
        setSodanhgia(success.data.value.sodanhgia);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }, [props.product.masanpham])
  return (
    <div id={35034} className="swiper-slide item-product">
      <div className="item-product__box-img">
        <Link to={props.product.image}>
          <img
            className="cpslazy loaded"
            alt="Product-promotion"
            data-ll-status="loaded"
            src={imageApi.image(props.product.image)}
          />
        </Link>
      </div>
      {giamoi < props.product.dongia && (
        <div className="box-item-sticker-percent">
          <p>
            Giảm {(100 - (giamoi / props.product.dongia) * 100).toFixed(0)}%
          </p>
        </div>
      )}
      <div className="item-product__box-name">
        <Link to={props.product.image}>
          <p>{props.product.tensanpham}</p>
        </Link>
      </div>
      <div className="item-product__box-price">
        <p className="special-price">
          {giamoi !== props.product.dongia && (
            <a href={() => false}>
              {giamoi === 0 ? "Hết hàng" : giamoi + "₫"}{" "}
            </a>
          )}
          &nbsp;
        </p>

        <p className="old-price">{props.product.dongia}&nbsp;₫</p>
      </div>
      <div className="item-product__box-raiting">
        <i className={sosao<1?"fas fa-star":"fas fa-star checked"} />
        <i className={sosao<2?"fas fa-star":"fas fa-star checked"} />
        <i className={sosao<3?"fas fa-star":"fas fa-star checked"} />
        <i className={sosao<4?"fas fa-star":"fas fa-star checked"} />
        <i className={sosao<5?"fas fa-star":"fas fa-star checked"} />
        <div className = "row d-flex justify-content-center">   &nbsp;{sodanhgia} đánh giá</div>
     
      </div>
    </div>
  );
}
