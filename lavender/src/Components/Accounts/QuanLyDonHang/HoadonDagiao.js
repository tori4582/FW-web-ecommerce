import React, { useState, useEffect } from "react";
import * as customerApi from "../../apis/customer";
import Hoadon from "./Hoadon";
import Cookies from "universal-cookie"

const cookie = new Cookies();

export default function HoadonDagiao(props) {
  const [list, setList] = useState([]);
  useEffect(() => {
    var token = cookie.get("token");
    var refreshtoken = cookie.get("refreshtoken");
    customerApi
      .hoadonDagiao(props.makhachhang, token, refreshtoken)
      .then((success) => {
        if (success.status === 200) {
          setList(success.data.value.$values);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [props.makhachhang]);
  return (
    <div>
      {list.map((value, key) => {
        return (
          <Hoadon
            bill={value}
            key={key}
            makhachhang={props.makhachhang}
          ></Hoadon>
        );
      })}
    </div>
  );
}
