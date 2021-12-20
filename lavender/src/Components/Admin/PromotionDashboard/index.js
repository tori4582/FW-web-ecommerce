import React, { useState, useEffect } from "react";
import * as voucherApi from "../../apis/voucher";
import Item from "./Item";
import _ from "lodash";
import "./style.css";
import AddModal from "./AddModal";

export default function Index(props) {
  const [showModal, setShowModal] = useState(false);
  const [list, setList] = useState([]);
  function closeModal() {
    setShowModal(false);
  }
  function openModal() {
    setShowModal(true);
  }

  async function loadPromotion() {
    await voucherApi
      .allPrromotion()
      .then((success) => {
        if (success.status === 200) {
          setList(success.data.value.$values);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    loadPromotion();
  }, []);

  async function editFunction(promotion) {
    var listtemp = list;
    _.remove(listtemp, (n) => {
      return n.makhuyenmai === promotion.makhuyenmai;
    });
    listtemp.push(promotion);
    await setList([...listtemp]);
  }

  async function addFunction(promotion) {
    var listtemp = list;
    listtemp.push(promotion);
    await setList([...listtemp]);
  }

  async function deleteFunction(promotion) {
    var listtemp = list;
    _.remove(listtemp, (n) => {
      return n.makhuyenmai === promotion.makhuyenmai;
    });
    await setList([...listtemp]);
  }

  return (
    <main className="main-content position-relative border-radius-lg left-menu">
      <AddModal
        showModal={showModal}
        closeModal={closeModal}
        addFunction={addFunction}
      ></AddModal>
      {/* End Navbar */}
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            <div className="card my-4">
              <div className="card-header p-0 position-relative mt-n4 mx-3">
                <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                  <h6 className="text-white text-capitalize ps-3 danhsachsanpham-title">
                    Danh sách khuyến mãi
                  </h6>
                  <button
                    className="btn bg-gradient-dark mb-0 mt-4 add-khachhang-button"
                    onClick={openModal}
                  >
                    + Thêm khuyến mãi
                  </button>
                </div>
              </div>
              <div className="card-body px-0 pb-2">
                <div className="table-responsive p-0">
                  <table className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          <b>Mã khuyến mãi</b>
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          <b>Tên khuyến mãi</b>
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          <b>Tỉ lệ khuyến mãi</b>
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          <b>Ngày bắt đầu</b>
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          <b>Ngày kết thúc</b>
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          <b>Điều kiện</b>
                        </th>

                        <th className="text-secondary opacity-7" />
                      </tr>
                    </thead>
                    <tbody>
                      {(function () {
                        var result = null;
                        result = list.map((value, key) => {
                          return (
                            <Item
                              promotion={value}
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
