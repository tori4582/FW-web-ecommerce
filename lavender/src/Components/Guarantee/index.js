//import React, { useState, useEffect  } from "react";
import Cookies from "universal-cookie";
import React, { useState, useEffect, useRef } from "react";
//import "./style.css";
import * as productApi from "../apis/product";
import LoadingContainer from "../../Common/helper/loading/LoadingContainer";
import * as detailProductApi from "../apis/detailProduct";
import * as guaranteeApi from "../apis/guarantee";
import * as imageApi from "../apis/image";
import { Collapse } from 'react-collapse';
import Item from "./Item";

export default function Index(props) {
  const [timkiem, setTimkiem] = useState("");
  const [chitietsanpham, setChitietsanpham] = useState(undefined);
  const [sanpham, setSanpham] = useState(undefined);
  const [lichsubaohanh, setLichsubaohanh] = useState([]);
  useEffect(() => {
    //   (async()=>{
    //         await
    //         await
    //   })()
  }, []);

  const tracuuBaohanh = async () => {
    let chitietsanphamtemp;
    await detailProductApi
      .timkiemChitietsanphamImei(timkiem)
      .then((success) => {
        if (success.status === 200) {
          chitietsanphamtemp = success.data.value;
          setChitietsanpham(success.data.value);
        }
        else {
          setChitietsanpham(undefined);
          return;
        }
      })
      .catch((error) => {
        console.error(error);
        setChitietsanpham(undefined)
        return;
      });

    if (chitietsanphamtemp === undefined) {
      return;
    }
    await productApi
      .findProductById(chitietsanphamtemp.masanpham)
      .then((success) => {
        if (success.status === 200) {
          setSanpham(success.data.value);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    guaranteeApi
      .tracuuLichsubaohanhBangImei(timkiem)
      .then((success) => {
        if (success.status === 200) {
          setLichsubaohanh(success.data.value.$values);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <title>Trung tâm bảo hành</title>
      <section id="head-content">
        <div
          className="container carousel slide carousel-light"
          id="carouselExampleControls"
        >
          <div className="carousel-inner">
            <div className="active carousel-item">
              <img
                className="d-block"
                src="https://img4.thuthuatphanmem.vn/uploads/2020/06/26/hinh-anh-banner-dien-may-thong-minh_033705387.png"
                height={253}
                width={1700}
                alt="First slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block"
                src="https://img3.thuthuatphanmem.vn/uploads/2019/10/08/banner-quang-cao-dien-thoai_103211774.jpg"
                height={253}
                width={1700}
                alt="Second slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block"
                src="http://file.hstatic.net/1000347078/collection/banner-20200131075945_0ab9acddca024f60a44e7814b352fce1.jpg"
                height={253}
                width={1700}
                alt="Third slide"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className="container ">
          <div className="row mt-2 g-4">
            <div className="col-md-3">
              <div className="card p-2">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1 imagename">
                    {" "}
                    <span>Mobile</span> <span>Phones</span>{" "}
                  </div>
                  <div>
                    {" "}
                    <img
                      src="https://i.imgur.com/b9zkoz0.jpg"
                      height={100}
                      width={100}
                    />{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-2">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1 imagename">
                    {" "}
                    <span>Head</span> <span>Phones</span>{" "}
                  </div>
                  <div>
                    {" "}
                    <img
                      src="https://i.imgur.com/SHWASPG.png"
                      height={100}
                      width={100}
                    />{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-2">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1 imagename">
                    {" "}
                    <span>Smart</span> <span>Watches</span>{" "}
                  </div>
                  <div>
                    {" "}
                    <img
                      src=" https://i.imgur.com/Ya0OXCv.png"
                      height={100}
                      width={100}
                    />{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-2">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1 imagename">
                    {" "}
                    <span>Air</span> <span>Purifiers</span>{" "}
                  </div>
                  <div>
                    {" "}
                    <img
                      src="https://i.imgur.com/2gvGwbh.png"
                      height={100}
                      width={100}
                    />{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-2">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1 imagename">
                    {" "}
                    <span>Vacuum</span> <span>Cleaners</span>{" "}
                  </div>
                  <div>
                    {" "}
                    <img
                      src="https://i.imgur.com/UMQJpSG.png"
                      height={100}
                      width={100}
                    />{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-2">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1 imagename">
                    {" "}
                    <span>Washing</span> <span>Machines</span>{" "}
                  </div>
                  <div>
                    {" "}
                    <img
                      src="https://i.imgur.com/e9CyhXR.png"
                      height={100}
                      width={100}
                    />{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-2">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1 imagename">
                    {" "}
                    <span>Smart</span> <span>Televisions</span>{" "}
                  </div>
                  <div>
                    {" "}
                    <img
                      src=" https://i.imgur.com/Zq8VigZ.png"
                      height={100}
                      width={100}
                    />{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-2">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1 imagename">
                    {" "}
                    <span>Laptops</span>{" "}
                  </div>
                  <div>
                    {" "}
                    <img
                      alt=""
                      src="https://i.imgur.com/6pK5oZl.jpg"
                      height={100}
                      width={100}
                    />{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-12">
              <div className="bg-white">
                <ul
                  className="nav nav-tabs nav-fill navbar-dark bg-dark"
                  id="myTab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    {" "}
                    <button
                      className="nav-link active"
                      id="faq_tab_1-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#faq_tab_1"
                      type="button"
                      role="tab"
                      aria-controls="faq_tab_1"
                      aria-selected="true"
                    >
                      <div className="d-flex flex-column lh-lg">
                        {" "}
                        <i className="bx bxs-plane-alt" /> <span>Tra cứu</span>{" "}
                      </div>
                    </button>{" "}
                  </li>
                  <li className="nav-item" role="presentation">
                    {" "}
                    <button
                      className="nav-link"
                      id="faq_tab_2-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#faq_tab_2"
                      type="button"
                      role="tab"
                      aria-controls="faq_tab_2"
                      aria-selected="false"
                    >
                      <div className="d-flex flex-column lh-lg">
                        {" "}
                        <i className="bx bxs-shopping-bag" />{" "}
                        <span>Địa chỉ bảo hành</span>{" "}
                      </div>
                    </button>{" "}
                  </li>
                  <li className="nav-item" role="presentation">
                    {" "}
                    <button
                      className="nav-link"
                      id="faq_tab_3-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#faq_tab_3"
                      type="button"
                      role="tab"
                      aria-controls="faq_tab_3"
                      aria-selected="false"
                    >
                      <div className="d-flex flex-column lh-lg">
                        {" "}
                        <i className="bx bx-check-circle" />{" "}
                        <span>Chính sách bảo hành</span>{" "}
                      </div>
                    </button>{" "}
                  </li>
                  {/* <li className="nav-item" role="presentation"> <button className="nav-link" id="faq_tab_4-tab" data-bs-toggle="tab" data-bs-target="#faq_tab_4" type="button" role="tab" aria-controls="faq_tab_4" aria-selected="false">
                                <div className="d-flex flex-column lh-lg"> <i className="bx bxs-plane-alt" /> <span>Đặt câu hỏi về bảo hành</span> </div>
                                </button> </li> */}
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade active show"
                    id="faq_tab_1"
                    role="tabpanel"
                    aria-labelledby="faq_tab_1-tab"
                  >
                    <div className="container p-3">
                      <div className="containwar">
                        <h1 style={{ textAlign: "center" }}>
                          Tra cứu thông tin bảo hành
                        </h1>
                        <div className="devvn_baohanh_form_box">
                          <form
                            action="#"
                            method="post"
                            className="form_devvn_baohanh"
                          >
                            <input
                              type="text"
                              name="q"
                              id="search"
                              className=" form-control bg-light"
                              placeholder="Nhập imei sản phẩm"
                              maxLength={128}
                              autoComplete="off"
                              value={timkiem}
                              onChange={(e) => setTimkiem(e.target.value)}
                            />
                            <hr></hr>
                            <button
                              type="button"
                              href="#demo"
                              //onClick={ }
                              //   data-bs-toggle="collapse"
                              onClick={tracuuBaohanh}
                              className="devvn_masp_submit submit submitSearch btn btn-outline-secondary m-2"
                              id="button-addon2"
                            >
                              Tìm kiếm
                            </button>
                            <button
                              type="button"
                              onClick={() => { setTimkiem("") }}
                              className="submit submitSearch btn btn-outline-secondary m-2"
                              id="button-addon3"
                            >
                              Clear
                            </button>
                          </form>
                          <h4 style={{ textAlign: "center" }}>
                            Tổng đài liên hệ hỗ trợ: 0123456789
                          </h4>
                        </div>
                      </div>
                      <Collapse isOpened={chitietsanpham !== undefined}>
                        <div className="container">
                          <div id="demo" className="">
                            <div className="d-flex justify-content-center container mt-5">
                              <div className="card p-3 bg-white">
                                <i className="fa fa-apple" />
                                <div className="about-product text-center mt-2">
                                  <img
                                    alt=""
                                    src={(chitietsanpham !== undefined && chitietsanpham.image !== undefined) ? imageApi.image(chitietsanpham.image) : ""}
                                    width={300}
                                  />
                                  <div>
                                    <h4>{(sanpham !== undefined && sanpham.tensanpham !== undefined) && sanpham.tensanpham}</h4>
                                    <h6 className="mt-0 text-black-50">
                                      {/*{chitietsanpham.dungluong} - {chitietsanpham.mausac}*/}
                                    </h6>
                                  </div>
                                </div>
                                <div className="stats mt-2">
                                  <div className="d-flex justify-content-between p-price">
                                    <span>Màu sắc</span>
                                    <span>{(chitietsanpham !== undefined && chitietsanpham.mausac !== undefined) && chitietsanpham.mausac}</span>
                                  </div>
                                  <div className="d-flex justify-content-between p-price">
                                    <span>Dung lượng</span>
                                    <span>{(chitietsanpham !== undefined && chitietsanpham.dungluong !== undefined) && chitietsanpham.dungluong}</span>
                                  </div>
                                  <div className="d-flex justify-content-between p-price">
                                    <span>Giá</span>
                                    <span>{(chitietsanpham !== undefined && chitietsanpham.giamoi !== undefined) && chitietsanpham.giamoi}</span>
                                  </div>
                                </div>
                                <div className="d-flex justify-content-between total font-weight-bold mt-4">
                                  <span>Ngày bảo hành</span>
                                  <span>$7,197.00</span>
                                </div>

                                <ul class="list-group">
                                  <li class="list-group-item active bg-dark mt-3">Lịch sử bảo hành</li>
                                  {
                                    lichsubaohanh.map((value, key) => {
                                      return (<Item item={value} key={key}></Item>)
                                    })
                                  }
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Collapse>

                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="faq_tab_2"
                    role="tabpanel"
                    aria-labelledby="faq_tab_2-tab"
                  >
                    <div className="container p-3 scroll-y">
                      <div className="p-3 d-flex justify-content-between align-items-center">
                        <div className="d-flex flex-column">
                          {" "}
                          <span>Cửa hàng chi nhánh 1</span>
                          <div className="d-flex justify-content-between align-items-center">
                            {" "}
                            <span>Số điện thoại</span>{" "}
                            <i className="bx bxs-plane-take-off ms-3 me-3 text-warning" />{" "}
                            <span>0123123123</span>{" "}
                          </div>
                        </div>
                        <div>
                          {" "}
                          <span>Địa chỉ: 123 ABC quận 3 TPHCM</span>{" "}
                        </div>
                      </div>
                      <div className="border-top p-3 d-flex justify-content-between align-items-center">
                        <div className="d-flex flex-column">
                          {" "}
                          <span>Cửa hàng chi nhánh 2</span>
                          <div className="d-flex justify-content-between align-items-center">
                            {" "}
                            <span>Số điện thoại</span>{" "}
                            <i className="bx bxs-plane-take-off ms-3 me-3 text-warning" />{" "}
                            <span>0123123124</span>{" "}
                          </div>
                        </div>
                        <div>
                          {" "}
                          <span>Địa chỉ: 122 ABC quận 5 TPHCM</span>{" "}
                        </div>
                      </div>
                      <div className="border-top p-3 d-flex justify-content-between align-items-center">
                        <div className="d-flex flex-column">
                          {" "}
                          <span>Cửa hàng chi nhánh 3</span>
                          <div className="d-flex justify-content-between align-items-center">
                            {" "}
                            <span>Số điện thoại</span>{" "}
                            <i className="bx bxs-plane-take-off ms-3 me-3 text-warning" />{" "}
                            <span>0123123124</span>{" "}
                          </div>
                        </div>
                        <div>
                          {" "}
                          <span>Địa chỉ: 122 ABC quận 5 TPHCM</span>{" "}
                        </div>
                      </div>
                      <div className="border-top p-3 d-flex justify-content-between align-items-center">
                        <div className="d-flex flex-column">
                          {" "}
                          <span>Cửa hàng chi nhánh 4</span>
                          <div className="d-flex justify-content-between align-items-center">
                            {" "}
                            <span>Số điện thoại</span>{" "}
                            <i className="bx bxs-plane-take-off ms-3 me-3 text-warning" />{" "}
                            <span>0123123124</span>{" "}
                          </div>
                        </div>
                        <div>
                          {" "}
                          <span>Địa chỉ: 122 ABC quận 5 TPHCM</span>{" "}
                        </div>
                      </div>
                      <div className="border-top p-3 d-flex justify-content-between align-items-center">
                        <div className="d-flex flex-column">
                          {" "}
                          <span>Cửa hàng chi nhánh 5</span>
                          <div className="d-flex justify-content-between align-items-center">
                            {" "}
                            <span>Số điện thoại</span>{" "}
                            <i className="bx bxs-plane-take-off ms-3 me-3 text-warning" />{" "}
                            <span>0123123124</span>{" "}
                          </div>
                        </div>
                        <div>
                          {" "}
                          <span>Địa chỉ: 122 ABC quận 5 TPHCM</span>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="faq_tab_3"
                    role="tabpanel"
                    aria-labelledby="faq_tab_3-tab"
                  >
                    <div className="container p-3 mt-3">
                      <div className="container mt-1">
                        <div className="row d-flex justify-content-center">
                          <div className="col-md">
                            <div
                              className="panel-group checkbox_collapse"
                              id="accordion"
                            >
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    {" "}
                                    <a
                                      data-bs-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapse1"
                                    >
                                      {" "}
                                      <span className="circle" />
                                      ĐỐI VỚI ĐIỆN THOẠI, MÁY TÍNH BẢNG, LAPTOP,
                                      MUA GIÁ THƯỜNG?
                                    </a>
                                  </h4>
                                </div>
                                <div
                                  id="collapse1"
                                  className="panel-collapse collapse in"
                                >
                                  <table
                                    width="100%"
                                    cellSpacing={1}
                                    cellPadding={1}
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          colSpan={2}
                                          bgcolor="#FFCC99"
                                          height={32}
                                        >
                                          <div>
                                            <strong>
                                              Sản phẩm lỗi do nhà sản xuất:
                                            </strong>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          align="center"
                                          bgcolor="#FFFFCC"
                                          width="51%"
                                          height={32}
                                        >
                                          <strong>Tháng 1</strong>
                                        </td>
                                        <td
                                          align="center"
                                          bgcolor="#FFFFCC"
                                          width="49%"
                                        >
                                          <p>
                                            <strong>Tháng 2 – 12</strong>
                                          </p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td valign="top" bgcolor="#FFFFCC">
                                          <div>
                                            <p>
                                              <strong>
                                                – 1 đổi 1 (cùng mẫu, cùng màu,
                                                cùng dung lượng…)
                                              </strong>
                                              .<br />
                                              – Trường hợp sản phẩm đổi hết
                                              hàng, khách hàng có thể đổi sang
                                              sản phẩm khác cùng nhóm hàng có
                                              giá trị lớn hơn 50% giá trị sản
                                              phẩm lỗi (didong88.com sẽ hoàn
                                              tiền phần chênh lệch cho khách
                                              hàng).
                                              <br />
                                              <strong>Hoặc:</strong>
                                            </p>
                                            <p>
                                              Khách hàng trả máy &amp;
                                              <em> lavender.com</em>&nbsp;hoàn
                                              lại tiền với mức giá bằng 80% giá
                                              trên hoá đơn.
                                            </p>
                                          </div>
                                          <p>&nbsp;</p>
                                        </td>
                                        <td valign="top" bgcolor="#FFFFCC">
                                          <div>
                                            <p>
                                              Gửi máy bảo hành theo quy định của
                                              hãng.
                                            </p>
                                            <p>
                                              <strong>Hoặc:</strong>
                                              <br />
                                              Khách hàng trả máy &amp;
                                              <em> lavender.com </em>
                                              <strong>
                                                hoàn lại tiền và thu phí thêm 5%
                                              </strong>
                                              &nbsp;so với mức hoàn tiền khi trả
                                              ở tháng thứ 1.
                                            </p>
                                            <p>
                                              <strong>VD</strong>: Ở tháng thứ
                                              nhất, nếu khách hàng trả sản phẩm
                                              sẽ được hoàn lại tiền với mức giá
                                              bằng 80% thì sang tháng thứ 2 nếu
                                              khách hàng trả máy sẽ thu phí thêm
                                              5% nên mức hoàn tiền sẽ còn 75%
                                              giá trị sản phẩm trên hoá đơn,
                                              tháng thứ 3 mức hoàn tiền sẽ trừ
                                              thêm 5% thành 70%….
                                            </p>
                                          </div>
                                          <p>&nbsp;</p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          colSpan={2}
                                          valign="top"
                                          bgcolor="#FFFFCC"
                                          width="51%"
                                          height={32}
                                        >
                                          <div>
                                            <p>
                                              <strong>
                                                RIÊNG ĐỐI VỚI LAPTOP:
                                              </strong>
                                              <br />
                                              – Thời gian bảo hành Laptop tại
                                              các Trung tâm bảo hành chính HÃNG,
                                              được kích hoạt bảo hành khi xuất
                                              hàng ra khỏi nhà máy sản xuất của
                                              HÃNG do đó thời gian bảo hành của
                                              laptop có thể “bằng hoặc thấp hơn”
                                              thời gian bảo hành&nbsp; của
                                              Thegioididong.com ghi trên hóa đơn
                                              xuất bán cho Khách Hàng.
                                              <br />– Lavender.com cam kết bảo
                                              hành chính hãng theo thời gian
                                              ĐƯỢC ghi trên hóa đơn khi xuất bán
                                              cho Khách Hàng. Trường hợp có sự
                                              chênh lệch thời gian bảo hành của
                                              HÃNG thấp hơn thời gian bảo hành
                                              của Thegioididong.com thì Khách
                                              Hàng vui lòng mang sản phẩm đến
                                              Thegioididong.com để được bảo hành
                                              chính hãng.
                                            </p>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          colSpan={2}
                                          bgcolor="#FFCC99"
                                          height={32}
                                        >
                                          <div>
                                            <strong>
                                              Sản phẩm không lỗi (không phù hợp
                                              với nhu cầu của khách hàng):
                                            </strong>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          align="center"
                                          bgcolor="#FFFFCC"
                                          width="51%"
                                          height={32}
                                        >
                                          <strong>Tháng 1</strong>
                                        </td>
                                        <td
                                          align="center"
                                          bgcolor="#FFFFCC"
                                          width="49%"
                                        >
                                          <p>
                                            <strong>Tháng 2 – 12</strong>
                                          </p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          valign="top"
                                          bgcolor="#FFFFCC"
                                          width="51%"
                                          height={32}
                                        >
                                          <div>
                                            <p>
                                              Hoàn lại tiền máy với giá bằng 80%
                                              giá trên hoá đơn.
                                            </p>
                                          </div>
                                        </td>
                                        <td
                                          valign="top"
                                          bgcolor="#FFFFCC"
                                          width="49%"
                                        >
                                          <div>
                                            <p>
                                              <strong>
                                                Hoàn lại tiền với mức phí thêm
                                                5%
                                              </strong>
                                              &nbsp;so với tháng thứ 1
                                              (80%).&nbsp;<strong>VD</strong>:
                                              tháng thứ 2 hoàn lại tiền với mức
                                              giá 75% giá trên hoá đơn, tháng
                                              thứ 3 là 70%…
                                            </p>
                                          </div>
                                          <p>&nbsp;</p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          colSpan={2}
                                          valign="top"
                                          bgcolor="#FFFFCC"
                                          width="51%"
                                          height={32}
                                        >
                                          <div>
                                            <p>
                                              Công ty nhập lại sản phẩm cũ theo
                                              điều khoản “trả lại hàng” (*) đồng
                                              thời xuất bán lại sản phẩm mới.
                                              <br />
                                              Phần chênh lệch giá là khoản phí
                                              sử dụng khách hàng phải trả và
                                              công ty xuất hoá đơn giá trị gia
                                              tăng (GTGT) cho khoản phí này.
                                            </p>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          colSpan={2}
                                          bgcolor="#FFCC99"
                                          height={32}
                                        >
                                          <div>
                                            <strong>
                                              Sản phẩm lỗi do người sử dụng:
                                            </strong>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          colSpan={2}
                                          valign="top"
                                          bgcolor="#FFFFCC"
                                          height={32}
                                        >
                                          <div>
                                            <ul>
                                              <li>
                                                Không đủ điều kiện bảo hành theo
                                                qui định của hãng.
                                              </li>
                                              <li>
                                                Máy không giữ nguyên 100% hình
                                                dạng ban đầu.
                                              </li>
                                              <li>Màn hình bị trầy xước.</li>
                                            </ul>
                                            <p>
                                              =&gt;&nbsp;
                                              <strong>
                                                Không áp dụng bảo hành, đổi trả.
                                                Thegioididong.com hỗ trợ chuyển
                                                bảo hành, khách hàng chịu chi
                                                phí sửa chữa.
                                              </strong>
                                            </p>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <p>&nbsp;</p>
                                </div>
                              </div>
                              <div className="panel panel-default ">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    {" "}
                                    <a
                                      data-bs-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapse2"
                                    >
                                      {" "}
                                      <span className="circle" />
                                      ĐỐI VỚI ĐIỆN THOẠI, MÁY TÍNH BẢNG, LAPTOP,
                                      MUA GIÁ RẺ ONLINE?
                                    </a>{" "}
                                  </h4>
                                </div>
                                <div
                                  id="collapse2"
                                  className="panel-collapse collapse"
                                >
                                  <div className="panel-body">
                                    <p>
                                      – Lỗi là đổi mới trong vòng 7 ngày
                                      <br />
                                      – Sau 7 ngày, nếu sản phẩm lỗi thời gian
                                      bảo hành theo chính sách của hãng. Quý
                                      khách tự liên hệ bảo hành hãng, TGDD/ĐMX
                                      không nhận sản phẩm bảo hành tại siêu thị.
                                      <br />– Không áp dụng chính sách trả hàng
                                      hoàn tiền nếu sản phẩm không lỗi.
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default ">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    {" "}
                                    <a
                                      data-bs-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapse3"
                                    >
                                      {" "}
                                      <span className="circle" />
                                      PHỤ KIỆN MỚI?
                                    </a>{" "}
                                  </h4>
                                </div>
                                <div
                                  id="collapse3"
                                  className="panel-collapse collapse"
                                >
                                  <table width="100%">
                                    <tbody>
                                      <tr>
                                        <td bgcolor="#FFCC99" width="52%">
                                          <strong>NHÓM SẢN PHẨM</strong>
                                        </td>
                                        <td bgcolor="#FFCC99" width="52%">
                                          <strong>CHÍNH SÁCH BẢO HÀNH</strong>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td bgcolor="#FFFFCC" width="52%">
                                          <div>
                                            Pin sạc dự phòng, Pin điện thoại,
                                            Thẻ nhớ, USB, Adapter – sạc, Tai
                                            nghe, Chuột,&nbsp;Loa vi tính,
                                            &nbsp;Loa kéo (phụ kiện kèm theo
                                            không bảo hành),…Ổ cắm, Cáp HDMI
                                            (trừ sản phẩm của thương hiệu AVA),
                                            Camera giám sát, Camera hành trình,
                                            Thiết bị mạng, Phụ kiện ô tô, Bút
                                            trình chiếu, Android TV Box
                                          </div>
                                        </td>
                                        <td bgcolor="#FFFFCC" width="48%">
                                          <div>
                                            <ul>
                                              <li>
                                                Nếu sản phẩm lỗi: bảo hành 1 năm
                                                1 đổi 1 nếu mua với giá thường,
                                                đổi trong vòng 7 ngày nếu mua
                                                với giá rẻ online
                                              </li>
                                            </ul>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td bgcolor="#FFFFCC" height={50}>
                                          <div>Miếng dán trước – sau</div>
                                        </td>
                                        <td bgcolor="#FFFFCC">
                                          <div>
                                            <ul>
                                              <li>
                                                Dán lần đầu mua nguyên giá, từ
                                                lần thứ 2 mua với giá 50% giá
                                                mới.
                                              </li>
                                            </ul>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td bgcolor="#FFFFCC" height={50}>
                                          <div>Miếng dán kính</div>
                                        </td>
                                        <td bgcolor="#FFFFCC">
                                          <div>
                                            <ul>
                                              <li>
                                                Dán lại miễn phí trong vòng 30
                                                ngày nếu sản phẩm lỗi bong tróc
                                                keo hoặc lỗi cảm ứng.
                                              </li>
                                            </ul>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td bgcolor="#FFFFCC" height={50}>
                                          <div>Ốp lưng – bao da</div>
                                        </td>
                                        <td bgcolor="#FFFFCC">
                                          <div>
                                            <ul>
                                              <li>
                                                Bảo hành 2 tuần đối với sản phẩm
                                                lỗi,&nbsp;đổi trong vòng 7 ngày
                                                nếu mua với giá rẻ online
                                              </li>
                                              <li>
                                                (Lưu ý: Không áp dụng ốp lưng
                                                5.000đ, 10.000đ, 30.000đ tại
                                                siêu thị)
                                              </li>
                                            </ul>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td bgcolor="#FFFFCC" height={50}>
                                          <div>
                                            Phụ kiện đồ chơi (gậy chụp ảnh, giá
                                            điện thoại,… ),&nbsp; Adapter thẻ
                                            nhớ TF, Balo, Túi chống sốc
                                          </div>
                                        </td>
                                        <td bgcolor="#FFFFCC">
                                          <div>
                                            <ul>
                                              <li>Không bảo hành</li>
                                            </ul>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td bgcolor="#FFFFCC" height={50}>
                                          <div>
                                            Pin sạc dự phòng, cáp sạc, tai nghe…
                                            thương hiệu AVA
                                          </div>
                                        </td>
                                        <td bgcolor="#FFFFCC">
                                          <div>
                                            <ul>
                                              <li>
                                                Nếu sản phẩm lỗi: bảo hành 3
                                                tháng 1 đổi 1 nếu mua giá
                                                thường,&nbsp;đổi trong vòng 7
                                                ngày nếu mua với giá rẻ online
                                              </li>
                                            </ul>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td bgcolor="#FFFFCC" height={50}>
                                          <div>
                                            Phụ kiện chính hãng Apple, Tai nghe
                                            Beats
                                            <br />
                                            &nbsp;
                                          </div>
                                        </td>
                                        <td bgcolor="#FFFFCC">
                                          <div>
                                            <ul>
                                              <li>
                                                Bảo hành 1 năm chính hãng*
                                              </li>
                                            </ul>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <p>&nbsp;</p>
                                </div>
                              </div>
                              <div className="panel panel-default ">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    {" "}
                                    <a
                                      data-bs-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapse4"
                                    >
                                      {" "}
                                      <span className="circle" />
                                      SẢN PHẨM ĐỔI TRẢ (ĐÃ SỬ DỤNG)?
                                    </a>{" "}
                                  </h4>
                                </div>
                                <div
                                  id="collapse4"
                                  className="panel-collapse collapse"
                                >
                                  <table
                                    border={1}
                                    cellSpacing={0}
                                    cellPadding={0}
                                  >
                                    <tbody>
                                      <tr>
                                        <td bgcolor="#FFCC99" width="13%">
                                          &nbsp;
                                        </td>
                                        <td bgcolor="#FFCC99" width="37%">
                                          <p>
                                            <strong>
                                              SẢN PHẨM LỖI KỸ THUẬT (Lỗi do nhà
                                              sản xuất)
                                            </strong>
                                          </p>
                                        </td>
                                        <td bgcolor="#FFCC99" width="13%">
                                          <p>
                                            <strong>SẢN PHẨM KHÔNG LỖI</strong>
                                          </p>
                                        </td>
                                        <td bgcolor="#FFCC99" width="37%">
                                          <p>
                                            <strong>
                                              LỖI DO NGƯỜI SỬ DỤNG (Không áp
                                              dụng đổi trả)
                                            </strong>
                                          </p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td bgcolor="#FFFFCC">
                                          <p>&nbsp;Tháng thứ 1&nbsp; &nbsp;</p>
                                        </td>
                                        <td bgcolor="#F6DFEB">
                                          <p>&nbsp; Bao xài 1 tháng</p>
                                          <p>
                                            1. Đổi sản phẩm tương đương (cùng
                                            giá, cùng model, cùng dung
                                            lượng,cùng thời gian bảo hành…)
                                          </p>
                                          <p>
                                            2. Nếu không có sản phẩm tương đương
                                            thì hoàn tiền 100%.
                                          </p>
                                        </td>
                                        <td bgcolor="#F6DFEB">
                                          <p>Không đổi trả</p>
                                        </td>
                                        <td rowSpan={2} bgcolor="#F6DFEB">
                                          <p>
                                            1. Không đủ điều kiện bảo hành theo
                                            qui định của hãng
                                          </p>
                                          <p>
                                            2. Điện thoại, tablet, laptop, đồng
                                            hồ thông minh bị trầy xước MÀN HÌNH
                                          </p>
                                          <p>
                                            3. Máy không giữ nguyên 100% hình
                                            dạng ban đầu
                                          </p>
                                          <p>
                                            =&gt; Khách hàng chịu phí sửa
                                            chữa&nbsp;&nbsp;
                                          </p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td bgcolor="#FFFFCC">
                                          <p>&nbsp;Tháng thứ 2-12</p>
                                        </td>
                                        <td bgcolor="#FFFFCC">
                                          <p>
                                            Gửi máy bảo hành theo đúng qui định
                                            của hãng hoặc bảo hành của&nbsp;
                                            <em>Thegioididong.com</em>
                                            &nbsp;(*)&nbsp;
                                          </p>
                                          <p>&nbsp;</p>
                                        </td>
                                        <td bgcolor="#FFFFCC">
                                          <p>Không đổi trả</p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <p>&nbsp;</p>
                                  <p>
                                    <strong>Điều kiện đổi trả:</strong>
                                  </p>
                                  <p>
                                    1.&nbsp;Còn đầy đủ phiếu bảo hành (nếu có)
                                    và phụ kiện đi kèm
                                  </p>
                                  <p>
                                    2.&nbsp;Ngoài ra, KHÔNG thu thêm bất kỳ phí
                                    nào khác.
                                  </p>
                                  <p>
                                    <strong>(*) Riêng với laptop</strong>
                                  </p>
                                  <p>
                                    – Laptop đã qua sử dụng tại
                                    Thegioididong.com/DienmayXanh.com được bán
                                    ra tuỳ theo hiện trạng máy tại từng siêu
                                    thị, bao gồm phần mềm và phần cứng.
                                  </p>
                                  <p>
                                    –&nbsp;Ngoại trừ Windows 10 bản quyền được
                                    tích hợp theo máy được cam kết sử dụng bình
                                    thường, ngoài ra các phần mềm theo hãng như
                                    ứng dụng văn phòng như Office 365, Office
                                    Home &amp; Student 2019,…
                                    Thegioididong.com/DienmayXanh.com không cam
                                    kết còn sử dụng được hay không.
                                  </p>
                                  <p>
                                    <strong>(*) Khái niệm về bảo hành</strong>
                                  </p>
                                  <p>
                                    – Khách hàng đem máy lên hệ thống
                                    Thegioididong.com/DienmayXanh.com hoặc đem
                                    trực tiếp lên hãng để được bảo hành.
                                  </p>
                                  <p>
                                    – Tuỳ vào thời hạn bảo hành còn lại của sản
                                    phẩm,&nbsp;Thegioididong.com sẽ gởi máy đến
                                    trung tâm bảo hành hãng hoặc bảo hành trực
                                    tiếp tại trung tâm bảo hành đối tác. Chính
                                    sách, quy trình &amp; các nghiệp vụ sửa chữa
                                    bảo hành tại Thegioididong.com sẽ hoàn toàn
                                    giống với bảo hành tại hãng.
                                  </p>
                                  <table
                                    border={1}
                                    cellSpacing={0}
                                    cellPadding={0}
                                  >
                                    <tbody>
                                      <tr>
                                        <td bgcolor="#FFCC99" width="13%">
                                          &nbsp;
                                        </td>
                                        <td bgcolor="#FFCC99" width="37%">
                                          <p>
                                            <strong>
                                              SẢN PHẨM LỖI KỸ THUẬT (
                                            </strong>
                                            <strong>Lỗi do nhà sản xuất</strong>
                                            <strong>)</strong>
                                          </p>
                                        </td>
                                        <td bgcolor="#FFCC99" width="13%">
                                          <p>
                                            <strong>SẢN PHẨM KHÔNG LỖI</strong>
                                          </p>
                                        </td>
                                        <td bgcolor="#FFCC99" width="370%">
                                          <p>
                                            <strong>
                                              LỖI DO NGƯỜI SỬ DỤNG (Không áp
                                              dụng đổi trả)
                                            </strong>
                                          </p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td bgcolor="#FFFFCC">
                                          <p>&nbsp;Tháng thứ 1</p>
                                        </td>
                                        <td bgcolor="#FFFFCC">
                                          <p>&nbsp; Bao xài 1 tháng</p>
                                          <p>
                                            1. Đổi sản phẩm tương đương (cùng
                                            model, cùng dung lượng, cùng thời
                                            gian bảo hành…)&nbsp; &nbsp;
                                          </p>
                                          <p>
                                            2. Nếu không có sản phẩm tương đương
                                            thì hoàn tiền 100%
                                          </p>
                                        </td>
                                        <td bgcolor="#FFFFCC">
                                          <p>Không đổi trả</p>
                                        </td>
                                        <td bgcolor="#FFFFCC">
                                          <p>
                                            1. Không đủ điều kiện bảo hành theo
                                            qui định của hãng
                                          </p>
                                          <p>
                                            2. Máy không giữ nguyên 100% hình
                                            dạng ban đầu
                                          </p>
                                          <p>
                                            =&gt; Khách hàng chịu phí sửa chữa
                                          </p>
                                          <p>&nbsp;</p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td bgcolor="#FFFFCC">
                                          <p>&nbsp;Tháng thứ 2-12</p>
                                        </td>
                                        <td colSpan={3} bgcolor="#FFFFCC">
                                          <p>
                                            &nbsp; Không đổi trả, không bảo hành
                                          </p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <p>&nbsp;</p>
                                  <p>
                                    <strong>Điều kiện đổi trả:</strong>
                                  </p>
                                  <p>
                                    1. Còn đầy đủ phiếu bảo hành (nếu có) và phụ
                                    kiện đi kèm.
                                  </p>
                                  <p>
                                    2. Ngoài ra, KHÔNG thu thêm bất kỳ phí nào
                                    khác.
                                  </p>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    {" "}
                                    <a
                                      data-bs-toggle="collapse"
                                      data-parent="#accordion"
                                      href="#collapse5"
                                    >
                                      {" "}
                                      <span className="circle" />
                                      THÔNG TIN THÊM
                                    </a>{" "}
                                  </h4>
                                </div>
                                <div
                                  id="collapse5"
                                  className="panel-collapse collapse"
                                >
                                  <div>
                                    <p>
                                      Từ ngày 1/6/2015 (tại TP.HCM) và từ
                                      1/7/2015 (trên toàn quốc) Thegioididong
                                      triển khai sử dụng&nbsp;
                                      <a
                                        title="hóa đơn điện tử tại Thegioididong"
                                        href="https://hddt.thegioididong.com/gioi-thieu"
                                        target="_blank"
                                        rel="noopener"
                                      >
                                        <strong>hóa đơn điện tử</strong>
                                      </a>
                                      &nbsp;thay cho hóa đơn giấy như trước đây.
                                    </p>
                                    <p>
                                      Đối với khách hàng mua hàng từ thời gian
                                      này khách hàng&nbsp;
                                      <strong>
                                        không cần hóa đơn giấy và không bị trừ
                                        phí mất hóa đơn
                                      </strong>
                                      &nbsp;khi đổi trả sản phẩm.
                                    </p>
                                    <p>
                                      Đối với các khách hàng mua hàng trước thời
                                      gian này, Khách hàng vẫn&nbsp;
                                      <strong>
                                        cần có hóa đơn khi đổi trả sản phẩm, nếu
                                        mất hóa đơn sẽ bị trừ phí theo quy định
                                        (10% giá trên hóa đơn).
                                      </strong>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {/* <div className="tab-pane fade" id="faq_tab_4" role="tabpanel" aria-labelledby="faq_tab_4-tab">
                    <div className="container">
                      <div className="container">
                        <div className="row height d-flex justify-content-center align-items-center">
                          <div className="col-md">
                            <div className="card">
                              <div className="p-3">
                                <h6>Câu hỏi</h6>
                              </div>
                              <div className="p-3 form-color">                           
                                <form action="#" method="post" className="form_devvn_baohanh">
                                  <input type="text" class="form-control bg-light" placeholder="Đặt câu hỏi" aria-label="Recipient's username" aria-describedby="button-addon2"></input>
                                  <hr></hr>
                                  <input type="submit" class="btn btn-outline-secondary" id="button-addon2" value="Submit" />
                                </form>
                              </div> 
                              <div className="mt-2">
                                <div className="d-flex flex-row p-3"> <img src="https://i.imgur.com/zQZSWrt.jpg" width={40} height={40} className="rounded-circle mr-3" />
                                  <div className="w-100 px-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                      <div className="d-flex flex-row align-items-center"> <span className="mr-2"><b>Tran Ly C</b></span></div> <small>12h ago</small>
                                    </div>
                                    <p className="text-justify comment-text mb-0">E muốn bảo hành điện thoại mà đang dịch thì e gửi ở chi nhánh gần nhất ko shop</p>
                                    <div className="container">
                                      <div className="panel-heading">
                                        <button type="button" href="#reply1" className="btn btn-primary mt-3 mb-3" data-bs-toggle="collapse">Xem câu trả lời</button>
                                      </div>
                                      <div id="reply1" className="panel-collapse collapse in">
                                        <div className="panel-body">
                                          Chào anh! <br />
                                          Sản phẩm anh mua bên em có thể mang sản phẩm tới siêu thị Thế Giới Di Động nào cũng được ạ <br />
                                          Thông tin đến anh. 
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex flex-row p-3"> <img src="https://i.imgur.com/3J8lTLm.jpg" width={40} height={40} className="rounded-circle mr-3" />
                                  <div className="w-100 px-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                      <div className="d-flex flex-row align-items-center"> <span className="mr-2"><b>Nguyen Thi A</b></span></div> <small>2h ago</small>
                                    </div>
                                    <p className="text-justify comment-text mb-0">shop xem giúp em laptop dell của em đã bảo hành đến đâu rồi ạ. Em mang qua tgdđ được 1 tuần rồi ạ. sđt: xxxx656348</p>
                                    <div className="container">
                                      <div className="panel-heading">
                                        <button type="button" href="#reply2" className="btn btn-primary mt-3 mb-3" data-bs-toggle="collapse">Xem câu trả lời</button>
                                      </div>
                                      <div id="reply2" className="panel-collapse collapse in">
                                        <div className="panel-body">
                                          Chào anh <br />
                                          Dạ bên em đã tiếp nhận thông tin của mình, mình vui lòng đợi thêm bên em sẽ có liên hệ phản hồi trong 60p ạ<br />
                                          Thông tin đến anh. 
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex flex-row p-3"> <img src="https://i.imgur.com/agRGhBc.jpg" width={40} height={40} className="rounded-circle mr-3" />
                                  <div className="w-100 px-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                      <div className="d-flex flex-row align-items-center"> <span className="mr-2"><b>Le Van B</b></span></div> <small>12h ago</small>
                                    </div>
                                    <p className="text-justify comment-text mb-0">Mình có mua cáp sạc xmobile và đầu sạc ava ở thế giới di động bảo hành qua số xxxx592456 mà sao check ra k có thông tin ạ? Chỉ có cáp sạc 3 đàu mua trc đấy?</p>
                                    <div className="container">
                                      <div className="panel-heading">
                                        <button type="button" href="#reply3" className="btn btn-primary mt-3 mb-3" data-bs-toggle="collapse">Xem câu trả lời</button>
                                      </div>
                                      <div id="reply3" className="panel-collapse collapse in">
                                        <div className="panel-body">
                                          Chào anh! <br />
                                          Dạ số điện thoại  bên em kiểm tra có mua Cáp 3 đầu Lightning Type C Micro 1m AVA AP03-1000 Trắng (Mới) 83,000 09:00 13/07/2021 anh nha <br />
                                          Thông tin đến anh. 
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
