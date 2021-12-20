import React, { useEffect, useState } from "react";
import * as productApi from "../../apis/product";
import SanphamItem from "./SanphamItem";

export default function Hoadon(props) {
    const [list, setList]= useState([]);
    useEffect(()=>{
        productApi.timCacsanphamTheoSohoadon(props.bill.sohoadon)
        .then((success)=>{
            if (success.status === 200) {
                setList(success.data.value.$values);
            }
        })
        .catch((error)=>{
            console.error(error);
        })
    }, [props.bill.sohoadon])
  return (
    <div className="_2n4gHk border rounded">

      <div className="_37UAJO">
      {
             list.map((value, key)=>{
                 return (<SanphamItem product = {value} key={key} makhachhang= {props.makhachhang}></SanphamItem>);
             })
         }
        <div className="_1CH8fe mt-3">
          <div className="_1mmoh8">Tổng số tiền:</div>
          <div className="_1MS3t2">{props.bill.tongtien}₫</div>
        </div>
      </div>
    </div>
  );
}
