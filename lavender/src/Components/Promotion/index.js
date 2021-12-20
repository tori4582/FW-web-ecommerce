import React, { useState, useEffect } from "react";
import Item from "./Item";
import "./style.css";
import * as voucherApi from "../apis/voucher";

export default function Index() {
  const [listKhuyenmai, setListKhuyenmai] = useState([]);
  useEffect(() => {
    voucherApi
      .khuyenmaiHientai()
      .then((success) => {
        if (success.status === 200) {
          setListKhuyenmai(success.data.value.$values);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      {/* tieude */}
      <div className="promotion-tieude">
        <div>
          <div className>
            <div id>
              <div className="container-ev-inner">
                <div className="event-dc-2__image-block">
                  <div className="event-dc-2__image-block--desktop clearfix">
                    <div>
                      <div style={{ display: "block" }}>
                        <img
                          alt="anh-tieude-1.1"
                          src="https://media3.scdn.vn/img4/2021/12_10/FWtcZLLPfFLsAQHdYbyj.png"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="event-dc-2__image-block--mobile clearfix">
                    <div style={{ display: "block" }}>
                      <img
                        alt="anh-tieude-1.2"
                        src="https://media3.scdn.vn/img4/2021/12_10/8hyrE97iLZle0ZVYX0hy.png"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className>
              <div id>
                <div className="container-ev-inner">
                  <div className="event-dc-2__image-block">
                    <div className="event-dc-2__image-block--desktop clearfix">
                      <div>
                        <div style={{ display: "block" }}>
                          <img
                            alt="anh-tieude-2.1"
                            src="https://media3.scdn.vn/img4/2021/12_10/tDcvqJanxeaJCvFR61Gr.png"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="event-dc-2__image-block--mobile clearfix">
                      <div style={{ display: "block" }}>
                        <img
                          alt="anh-tieude-2.2"
                          src="https://media3.scdn.vn/img4/2021/12_10/RiVerfulrWhAfxMyeyGm.png"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* noi dung */}
      <div className="container">
        <div className="row">
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            {(() => {
              var result = [];
              for (var i = 0; i < listKhuyenmai.length; i++)
                if (i % 2 === 0) {
                  result.push(<Item voucher={listKhuyenmai[i]} key={i}></Item>);
                }
              return result;
            })()}
          </div>
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            {(() => {
              var result = [];
              for (var i = 0; i < listKhuyenmai.length; i++)
                if (i % 2 === 1) {
                  result.push(<Item voucher={listKhuyenmai[i]} key={i}></Item>);
                }
              return result;
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
