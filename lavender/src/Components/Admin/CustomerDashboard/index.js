import React, { useState, useEffect } from "react";
import * as customerApi from "../../apis/customer";
import Item from "./Item";
import _ from "lodash";
import "./style.css";
import AddModal from "./AddModal";

import Cookies from "universal-cookie";

const cookie = new Cookies();

export default function Index(props) {
  const [showModal, setShowModal] = useState(false);
  // const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [listcustomer, setListcustomer] = useState([]);
  function closeModal() {
    setShowModal(false);
  }
  function openModal() {
    setShowModal(true);
  }

  async function loadCustomer() {
    var token = cookie.get("token");
    var refreshtoken = cookie.get("refreshtoken");
    await customerApi
      .allCustomer(token, refreshtoken)
      .then((success) => {
        if (success.status === 200) {
          setListcustomer(success.data.value.$values);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    // Update the document title using the browser API
    loadCustomer();
  }, []);

  async function editFunction(customer) {
    var listtemp = listcustomer;
    _.remove(listtemp, (n) => {
      return n.makhachhang === customer.makhachhang;
    });

    listtemp.push(customer);

    await setListcustomer([...listtemp]);
    // forceUpdate();
  }

  async function addFunction(customer) {
    var listtemp = listcustomer;
    listtemp.push(customer);
    await setListcustomer([...listtemp]);
  }

  async function deleteFunction(customer) {
    var listtemp = listcustomer;

    _.remove(listtemp, (n) => {
      return n.makhachhang === customer.makhachhang;
    });
    await setListcustomer([...listtemp]);
  }

  return (
    <main className="main-content position-relative border-radius-lg left-menu">
      <AddModal
        showModal={showModal}
        closeModal={closeModal}
        addFunction={addFunction}
      ></AddModal>
      {/* End Navbar */}
      {console.log(listcustomer)}
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            <div className="card my-4">
              <div className="card-header p-0 position-relative mt-n4 mx-3">
                <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                  <h6 className="text-white text-capitalize ps-3 danhsachsanpham-title">
                    Danh sách điện thoại
                  </h6>
                  <button
                    className="btn bg-gradient-dark mb-0 mt-4 add-khachhang-button"
                    onClick={openModal}
                  >
                    + Thêm khách hàng
                  </button>
                </div>
              </div>
              <div className="card-body px-0 pb-2">
                <div className="table-responsive p-0">
                  <table className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          <b>Ảnh</b>
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          <b>Tên khách hàng</b>
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          <b>Email</b>
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          <b>SĐT</b>
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          <b>Địa chỉ</b>
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          <b>Ngày sinh</b>
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          <b>CCCD</b>
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          <b>Loại khách hàng</b>
                        </th>
                        <th className="text-secondary opacity-7" />
                      </tr>
                    </thead>
                    <tbody>
                      {(function () {
                        var result = null;
                        result = listcustomer.map((value, key) => {
                          return (
                            <Item
                              customer={value}
                              key={key}
                              addFunction={addFunction}
                              deleteFunction={deleteFunction}
                              editFunction={editFunction}
                            ></Item>
                          );
                        });
                        return result;
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
