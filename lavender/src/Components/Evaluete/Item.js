import React, {useState, useEffect} from 'react'
import * as imageApi from "../apis/image";
import * as customerApi from "../apis/customer";
import logo from "../../Common/images/logo.png";
import Cookies from "universal-cookie";

const cookie = new Cookies();

export default function Item(props) {
  const [khachhang, setKhachhang] = useState(undefined)
  useEffect(() => {


    customerApi.findCustomerByCustomerId(props.evaluete.makhachhang)
    .then(success => {
      if (success.status===200) {
        setKhachhang(success.data.value);
      }
    })
    .catch(error => {
      console.error(error);
    })
  }, [props.evaluete.makhachhang])
    return (
        <div className="item-review">
            <div className="item-review__box-review">
              <div className="box-review__box-info">
                <div className="box-info">
                  <div className="box-info__avatar">
                    <img
                    alt="avatar"
                    src={khachhang===undefined?logo:imageApi.image(khachhang.image, khachhang.makhachhang)}
                    ></img>
                  </div>
                  <div className="box-info__user">
                    <p className="box-info__name">{khachhang===undefined?"Tài khoản khách hàng":khachhang.tenkhachhang}</p>
                  </div>
                </div>
                <p className="box-time-review">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={12}
                    height={12}
                    viewBox="0 0 12 12"
                    style={{ marginBottom: "2px" }}
                  >
                    <path
                      id="clock"
                      d="M7.72,8.78,5.25,6.31V3h1.5v2.69L8.78,7.72ZM6,0a6,6,0,1,0,6,6A6,6,0,0,0,6,0ZM6,10.5A4.5,4.5,0,1,1,10.5,6,4.5,4.5,0,0,1,6,10.5Z"
                      fill="#707070"
                    />
                  </svg>
                  &nbsp;{props.evaluete.thoigian}
                </p>
              </div>
              <div className="box-review__box-question">
                <div className="raiting">
                  <strong>Đánh giá: </strong>
                  <i className={props.evaluete.sosao<1?"fas fa-star":"fas fa-star checked"} />
                  <i className={props.evaluete.sosao<2?"fas fa-star":"fas fa-star checked"} />
                  <i className={props.evaluete.sosao<3?"fas fa-star":"fas fa-star checked"} />
                  <i className={props.evaluete.sosao<4?"fas fa-star":"fas fa-star checked"} />
                  <i className={props.evaluete.sosao<5?"fas fa-star":"fas fa-star checked"} />
                </div>
                <div className="question">
                  <p>
                    <strong>Nhận xét: </strong>{props.evaluete.noidung}
                  </p>
                </div>
                <div className="review-comment__images">
                  <img
                    data-view-id="pdp_product_review_view_photo"
                    className="review-comment__image"
                    alt="anhbinhluan"
                    src={imageApi.image(props.evaluete.image, props.evaluete.madanhgia)}
                  ></img>
                </div>
              </div>
            </div>
          </div>
    )
}
