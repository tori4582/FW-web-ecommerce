import React, { Component } from "react";
import "./Home.css";
import Carousel from "react-bootstrap/Carousel";
import ProductItem from "./Product/ProductItem.js";
import * as mobileApi from "./apis/mobile";
import * as laptopApi from "./apis/laptop";
import { Link } from "react-router-dom";
import LoadingContainer from "../Common/helper/loading/LoadingContainer";
import Hotsale from "./Hotsale";
import banner from "../Asset/logo/banner.png";
import promotion from "../Asset/logo/promotion.png";


export default class Home extends Component {
  state = { listmobile: [], listlaptop: [], loading: true };

  renderListMobile() {
    var result = [];
    for (var i = 0; i < this.state.listmobile.length; i++) {
      result.push(
        <ProductItem key={i} product={this.state.listmobile[i]}></ProductItem>
      );
    }
    return result;
  }

  renderListLaptop() {
    var result = [];
    for (var i = 0; i < this.state.listlaptop.length; i++) {
      result.push(
        <ProductItem key={i} product={this.state.listlaptop[i]}></ProductItem>
      );
    }
    return result;
  }

  async componentDidMount() {
    mobileApi
      .mobile()
      .then((success) => {
        if (success.status === 200) {
          this.setState({
            listmobile: success.data.value.$values,
            loading: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    laptopApi
      .laptop()
      .then((success) => {
        if (success.status === 200) {
          this.setState({
            listlaptop: success.data.value.$values,
            loading: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <section className="container section-home">
        <LoadingContainer loading={this.state.loading}></LoadingContainer>
        <div className="row promotion1 ">
          <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 carousel-title ">
            <div className="">
              <Carousel variant="light" interval={3000}>
                <Carousel.Item>
                  <img
                    className="d-block border promotion-carousel"
                    src="https://cdn.tgdd.vn/2021/11/banner/830-300-830x300-1.png"
                    alt="First slide"
                  />
                  <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block promotion-carousel"
                    src="https://cdn.tgdd.vn/2021/10/banner/830-300-830x300-26.png"
                    alt="Second slide"
                  />
                  <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block promotion-carousel"
                    src="https://cdn.tgdd.vn/2021/11/banner/830-300-830x300.png"
                    alt="Third slide"
                  />
                  <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block promotion-carousel"
                    src="https://cdn.tgdd.vn/2021/11/banner/830-300-830x300-24.png"
                    alt="Four slide"
                  />
                  <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block promotion-carousel"
                    src="https://cdn.tgdd.vn/2021/11/banner/830-300-830x300-22.png"
                    alt="Fi slide"
                  />
                  <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block promotion-carousel"
                    src="https://cdn.tgdd.vn/2021/12/banner/Aseri-830-300-830x300.png"
                    alt="Fi slide"
                  />
                  <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </div>




            <div className="container">
                {/* <img
                  className="cpslazy loaded border rounded"
                  //data-src="http://localhost:3000/details/img/myImage.png "
                  alt="Sale for Chrismas"
                  data-ll-status="loaded"
                  src={banner}
                /> */}
          
           <div className="row">
              <div className="col-md-4">
                <div className="maincard p-1">
                  <div className="thecard">
                    <div className="thefront text-center"> <img alt="hinh1" src="https://timhangcongnghe.com/uploads/erp/products/product_image/image_url/100238/MSI_Prestige_14_A10RB-028VN_02.jpg" width={70} />
                      <p className="mt-2"><strong>Sale off 5%</strong></p> 
                    </div>
                    <div className="theback">
                        <p>MÃ GIẢM GIÁ 5% CHO LAPTOP: <strong>laptoplavender</strong></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="maincard p-1">
                  <div className="thecard">
                    <div className="thefront text-center"> <img alt="hinh2" src="https://cdn.fptshop.com.vn/Uploads/Originals/2020/10/26/637393169370871358_ip-11-dd.png" width={45} />
                      <p className="mt-2 "><strong>Sale off 10%</strong></p> 
                    </div>
                    <div className="theback">
                        <p>MÃ GIẢM GIÁ 10% CHO ĐIỆN THOẠI: <strong>dienthoailavender</strong></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="maincard p-1">
                  <div className="thecard">
                    <div className="thefront text-center"> <img alt="hinh3" src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/watch-202109-watch-se_GEO_AE_FMT_WHH?wid=520&hei=482&fmt=jpeg&qlt=80&.v=1633230442000" width={50} />
                      <p className="mt-2 mb-0"><strong>Sale off 15%</strong></p> 
                    </div>
                    <div className="theback">
                        <p>MÃ GIẢM GIÁ 15% CHO PHỤ KIỆN: <strong>phukienlavender</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>






          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 p-2">
            <div className="promotion-row promotion2">
              <img
                className="d-block promotion-img box-shadow"
                src="https://cdn.tgdd.vn/2021/11/banner/laptopdesk(3)-340x340.jpg"
                alt="Third slide"
              />
              <img
                className="d-block promotion-img box-shadow"
                src="https://cdn.tgdd.vn/2021/11/banner/laptopdesk(1)-340x340-1.jpg"
                alt="Third slide"
              />
            </div>
            <div className="promotion-row promotion3">
              <img
                className="d-block promotion-img box-shadow"
                src="https://cdn.tgdd.vn/2021/11/banner/laptopdesk-340x340.jpg"
                alt="Third slide"
              />
              <img
                className="d-block promotion-img box-shadow"
                src="https://cdn.tgdd.vn/2021/11/banner/die%CC%A3%CC%82nthoaidesk-340x340.jpg"
                alt="Third slide"
              />
            </div>
          </div>
        </div>

        {/* voucher */}

        <Link to="/promotion" className="row promotion4 ">
          <img alt="promotion " src={promotion}></img>
        </Link>

        <div className="row mt-2 promotion2">
          <Hotsale className=""></Hotsale>
        </div>
        {/* Điện thoại nổi bật */}

        <div className="row">
          <div className="box-title">
            <Link to="/mobile" className="box-title__title">
              <h2>Điện thoại nổi bật nhất</h2>
            </Link>
            <div className="box-related-tag">
              <div className="list-related-tag">
                <Link
                  to="/mobile?hang=apple"
                  className="btn btn-default btn-sm"
                >
                  Apple
                </Link>
                <Link
                  to="/mobile?hang=samsung"
                  className="btn btn-default btn-sm"
                >
                  Samsung
                </Link>
                <Link
                  to="/mobile?hang=xiaomi"
                  className="btn btn-default btn-sm"
                >
                  Xiaomi
                </Link>
                <Link to="/mobile?hang=oppo" className="btn btn-default btn-sm">
                  OPPO
                </Link>
                <Link
                  to="/mobile?hang=realme"
                  className="btn btn-default btn-sm"
                >
                  Realme
                </Link>
                <Link
                  to="/mobile?hang=nokia"
                  className="btn btn-default btn-sm"
                >
                  Nokia
                </Link>
                <Link to="/mobile?hang=vivo" className="btn btn-default btn-sm">
                  Vivo
                </Link>
                <Link to="/mobile" className="item-related-tag">
                  Xem tất cả
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* list-item */}

        <div id="highlight" className="highlight section-bg">
          <div className="container list-item " data-aos="fade-up">
            <div className="row row-item">{this.renderListMobile()}</div>
          </div>
        </div>

        {/* Laptop nổi bật */}
        <div className="row">
          <div className=" box-title">
            <Link to="/laptop" className="box-title__title">
              <h2>Laptop</h2>
            </Link>
            <div className="box-related-tag">
              <div className="list-related-tag">
                <Link to="/laptop?hang=mac" className="btn btn-default btn-sm">
                  Mac
                </Link>
                <Link to="/laptop?hang=asus" className="btn btn-default btn-sm">
                  ASUS
                </Link>
                <Link to="/laptop?hang=hp" className="btn btn-default btn-sm">
                  HP
                </Link>
                <Link
                  to="/laptop?hang=surface"
                  className="btn btn-default btn-sm"
                >
                  Surface
                </Link>
                <Link to="/laptop?hang=msi" className="btn btn-default btn-sm">
                  MSI
                </Link>
                <Link to="/laptop?hang=dell" className="btn btn-default btn-sm">
                  Dell
                </Link>
                <Link to="/laptop" className="item-related-tag">
                  Xem tất cả
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* list-item */}

        <div className="highlight section-bg laptopnoibat">
          <div className="container list-item2 " data-aos="fade-up">
            <div className="row row-item">{this.renderListLaptop()}</div>
          </div>
        </div>

        {/* Các thương hiệu */}

        <div className="row">
          <div
            id="widget_gearvn_brands"
            style={{ display: "block", marginTop: "20px" }}
          >
            <div className="brands">
              <div className="brand-header">
                <h3>Thương hiệu sản phẩm</h3>
              </div>
              <div className="brand-body">
                <div className="brand-items">
                  <div className="brch-row">
                    <div className="brand-item">
                      <Link to="/mobile?hang=samsung">
                        <img
                          src="https://images.samsung.com/is/image/samsung/assets/vn/about-us/brand/logo/mo/360_197_1.png?$FB_TYPE_B_PNG$"
                          alt="Samsung"
                        />
                      </Link>
                    </div>
                    <div className="brand-item">
                      <Link to="/mobile?hang=apple">
                        <img
                          src="https://gstatic.gearvn.com/2021/08/hYY5dAy9-1-1.png"
                          alt="Apple"
                        />
                      </Link>
                    </div>
                    <div className="brand-item">
                      <Link to="/mobile?hang=xiaomi">
                        <img
                          src="https://printgo.vn/uploads/media/788346/kham-pha-nhung-diem-dang-tien-trong-thiet-ke-logo-moi-nhat-cua-xiaomi-2_1617161956.png"
                          alt="Xiaomi"
                        />
                      </Link>
                    </div>
                    <div className="brand-item">
                      <Link to="/mobile?hang=oppo">
                        <img
                          src="https://www.techniknews.net/wp-content/uploads/2020/04/oppo-logo.png"
                          alt="Oppo"
                        />
                      </Link>
                    </div>
                    <div className="brand-item">
                      <Link to="/mobile?hang=realme">
                        <img
                          src="https://www.orissapost.com/wp-content/uploads/2019/12/realme-logo.jpg"
                          alt="Realme"
                        />
                      </Link>
                    </div>
                    <div className="brand-item">
                      <Link to="/mobile?hang=nokia">
                        <img
                          src="https://1000marcas.net/wp-content/uploads/2020/01/Nokia-Logo-tm.jpg"
                          alt="Nokia"
                        />
                      </Link>
                    </div>
                    <div className="brand-item">
                      <Link to="/mobile?hang=vivo">
                        <img
                          src="https://vnrom.net/wp-content/uploads/2017/01/Vivo-Logo.png"
                          alt="Vivo"
                        />
                      </Link>
                    </div>
                    <div className="brand-item">
                      <Link to="/mobile?hang=vsmart">
                        <img
                          src="https://bloganchoi.com/wp-content/uploads/2020/10/logo-vsmart.jpg"
                          alt="Vsmart"
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="brch-row">
                    <div className="brand-item">
                      <Link to="/laptop?hang=asus">
                        <img
                          src="data:image/png;base64,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"
                          alt="Asus"
                        />
                      </Link>
                    </div>
                    <div className="brand-item">
                      <Link to="/laptop?hang=lg">
                        <img
                          src="https://gstatic.gearvn.com/2021/08/lg.png"
                          alt="LG"
                        />
                      </Link>
                    </div>
                    <div className="brand-item">
                      <Link to="/laptop?hang=acer">
                        <img
                          src="data:image/png;base64,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"
                          alt="Acer"
                        />
                      </Link>
                    </div>
                    <div className="brand-item">
                      <Link to="/laptop?hang=hp">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfJRFRc8B5fLf7Us_2jFPsBs8HKCfm8FYMH-4PgmsTDTAbAFXl--7bYH-iv7eltu_1nEI&usqp=CAU"
                          alt="Hp"
                        />
                      </Link>
                    </div>
                    <div className="brand-item">
                      <Link to="/laptop?hang=dell">
                        <img
                          src="https://rubee.com.vn/admin/webroot/upload/image/images/bai-viet/dell-old-logo.jpg"
                          alt="Dell"
                        />
                      </Link>
                    </div>
                    <div className="brand-item">
                      <Link to="/laptop?hang=microsoft">
                        <img
                          src="http://icdn.dantri.com.vn/zoom/1200_630/tI0YUx18mEaF5kMsGHJ/Image/2012/08/MS-logo-av-7445f.jpg"
                          alt="Microsoft"
                        />
                      </Link>
                    </div>
                    <div className="brand-item">
                      <Link to="/laptop?hang=msi">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/1/13/Msi-Logo.jpg"
                          alt="Msi"
                        />
                      </Link>
                    </div>
                    <div className="brand-item">
                      <Link to="/laptop?hang=lenovo">
                        <img
                          src="https://gstatic.gearvn.com/2021/10/LenovoLogo-282x152-02.png"
                          alt="Lenovo"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
