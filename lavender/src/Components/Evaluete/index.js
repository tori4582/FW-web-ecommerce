import React, { useState, useEffect } from "react";
import "./style.css";
import * as evalueteApi from "../apis/evaluete";
import Item from "./Item";

export default function Index(props) {
  const [trungbinh, setTrungbinh] = useState(0);
  const [list, setList] = useState([]);
  useEffect(() => {
    if (props.product.masanpham===undefined) return;
    evalueteApi
      .getEvaluete(props.product.masanpham)
      .then((success) => {
        if (success.status === 200) {
          setList(success.data.value.$values);
          var sum = 0;
          for (var i = 0; i < success.data.value.$values.length; i++) {
            sum += success.data.value.$values[i].sosao;
          }
          setTrungbinh(sum / success.data.value.$values.length.toFixed(0) || 0);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [props.product.masanpham]);
  return (
    <div
      id="page-review-product"
      data-productid={36499}
      className="block-rating listReviews-36499"
      style={{ display: "block" }}
    >
      <div className="block-rating__box-vote">
        <div className="box-vote">
          <div className="box-vote__chart-vote">
            <div className="chart-vote__box-left">
              <p className="rating-average">{trungbinh}/5</p>
              <div className="rating-star">
                <i
                  className={
                    trungbinh < 1 ? "fas fa-star " : "fas fa-star checked"
                  }
                />
                <i
                  className={
                    trungbinh < 2 ? "fas fa-star " : "fas fa-star checked"
                  }
                />
                <i
                  className={
                    trungbinh < 3 ? "fas fa-star " : "fas fa-star checked"
                  }
                />
                <i
                  className={
                    trungbinh < 4 ? "fas fa-star " : "fas fa-star checked"
                  }
                />
                <i
                  className={
                    trungbinh < 5 ? "fas fa-star " : "fas fa-star checked"
                  }
                />
              </div>
              <p className="rating-total">
                <strong>{list.length}</strong> đánh giá &amp; nhận xét
              </p>
            </div>
            <div className="chart-vote__box-right">
              <div className="box-statistical">
                <div className="item-statistical">
                  {(() => {
                    var sodanhgia = 0;
                    for (var i = 0; i < list.length; i++) {
                      if (list[i].sosao === 5) {
                        sodanhgia++;
                      }
                    }
                    var avg = ((sodanhgia * 5) / list.length*100).toFixed(0);
                    return (
                      <div>
                        <p className="number-star">
                          <strong>5</strong>&nbsp;
                          <i className="fas fa-star checked" />
                        </p>
                        <div className="progress">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: avg + "%" }}
                          ></div>
                        </div>
                        <p className="number-percent">{sodanhgia} đánh giá</p>
                      </div>
                    );
                  })()}
                </div>

                <div className="item-statistical">
                  {(() => {
                    var sodanhgia = 0;
                    for (var i = 0; i < list.length; i++) {
                      if (list[i].sosao === 4) {
                        sodanhgia++;
                      }
                    }
                    var avg = ((sodanhgia * 4) / list.length*100).toFixed(0);
                    return (
                      <div>
                        <p className="number-star">
                          <strong>4</strong>&nbsp;
                          <i className="fas fa-star checked" />
                        </p>
                        <div className="progress">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: avg + "%" }}
                          ></div>
                        </div>
                        <p className="number-percent">{sodanhgia} đánh giá</p>
                      </div>
                    );
                  })()}
                </div>

                <div className="item-statistical">
                  {(() => {
                    var sodanhgia = 0;
                    for (var i = 0; i < list.length; i++) {
                      if (list[i].sosao === 3) {
                        sodanhgia++;
                      }
                    }
                    var avg = ((sodanhgia * 3) / list.length*100).toFixed(0);
                    return (
                      <div>
                        <p className="number-star">
                          <strong>3</strong>&nbsp;
                          <i className="fas fa-star checked" />
                        </p>
                        <div className="progress">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: avg + "%" }}
                          ></div>
                        </div>
                        <p className="number-percent">{sodanhgia} đánh giá</p>
                      </div>
                    );
                  })()}
                </div>
               
                <div className="item-statistical">
                  {(() => {
                    var sodanhgia = 0;
                    for (var i = 0; i < list.length; i++) {
                      if (list[i].sosao === 2) {
                        sodanhgia++;
                      }
                    }
                    var avg = ((sodanhgia * 2) / list.length*100).toFixed(0);
                    return (
                      <div>
                        <p className="number-star">
                          <strong>2</strong>&nbsp;
                          <i className="fas fa-star checked" />
                        </p>
                        <div className="progress">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: avg + "%" }}
                          ></div>
                        </div>
                        <p className="number-percent">{sodanhgia} đánh giá</p>
                      </div>
                    );
                  })()}

<div className="item-statistical">
                  {(() => {
                    var sodanhgia = 0;
                    for (var i = 0; i < list.length; i++) {
                      if (list[i].sosao === 1) {
                        sodanhgia++;
                      }
                    }
                    var avg = ((sodanhgia * 1) / list.length*100).toFixed(0);
                    return (
                      <div>
                        <p className="number-star">
                          <strong>1</strong>&nbsp;
                          <i className="fas fa-star checked" />
                        </p>
                        <div className="progress">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: avg + "%" }}
                          ></div>
                        </div>
                        <p className="number-percent">{sodanhgia} đánh giá</p>
                      </div>
                    );
                  })()}
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="box-rating__box-list-review">
        <div className="list-review">

          {
            list.map((value, key)=>{
              return (<Item evaluete={value} key={key}></Item>)
            })
          }
          
        </div>
      </div>
    </div>
  );
}
