import React, { useState, useEffect } from "react";
import "./style.css";
import * as productApi from "../../apis/product";

export default function Index(props) {
  const [thongsokithuat, setThongsokithuat] = useState([]);
  useEffect(() => {
    if (props.product.masanpham === undefined) return;
    productApi
      .thongsokithuatBangMasanpham(props.product.masanpham)
      .then((success) => {
        if (success.status === 200) {
          setThongsokithuat(success.data.value.$values);
        }
        
      })
      .catch((error) => {
        console.error(error);
      });
  }, [props.product.masanpham]);
  return (
    <div className="block-information__box-right">
      <div id="id_36499" className="block-technical-info">
        <div className="box-title">
          <h2 className="box-title__title">Thông số kỹ thuật</h2>
        </div>

        <div className="box-content">
          <table id="tskt" className="tskt">
            <tbody>
              {thongsokithuat.map((value, key) => {
                return (
                  <tr>
                    <th>
                      <h6>{value.ten}</h6>
                    </th>
                    <th>{value.noidung}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
