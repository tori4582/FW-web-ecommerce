import React, { Component } from "react";
import "./style.css";
import SlideShow from "../SlideShow";
import * as laptopApi from "../apis/laptop";
import * as detailProductApi from "../apis/detailProduct";
import * as imageApi from "../apis/image";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as cartAct from "../redux/actions/cartAct";
import PropTypes from "prop-types";
import * as favoriteApi from "../apis/favorite";
import Article from "./Article";
import { withRouter } from "react-router-dom";
import LoadingContainer from "../../Common/helper/loading/LoadingContainer";
import Evaluete from "../Evaluete";
import * as evalueteApi from "../apis/evaluete";
import Specifications from "./Specifications";
import * as myToast from "../../Common/helper/toastHelper";
import Comment from "../Facebook/Comment/index.js"

class index extends Component {
  state = {
    liked: false,
    product: {},
    sohinhanh: 0,
    active: 0,
    dongia: 0,
    dungluong: [],
    mausac: [],
    chondungluong: "-1",
    chonmausac: "-1",
    loading: true,
    sosao: 0,
    sodanhgia: 0,
  };
  renderTab(n) {
    switch (n) {
      case 0:
        return <h6 className="">Bài viết</h6>;
      case 1:
        return <h6 className="">Thông số kỹ thuật</h6>;
      case 2:
        return <h6 className="">Đánh giá</h6>;
      default:
        return;
    }
  }
  click = (n) => {
    this.setState({ active: n });
  };
  renderItem(n) {
    switch (n) {
      case 0: <Article product={this.state.product}></Article>
        return;
      case 1:
        return <Specifications product={this.state.product}></Specifications>;
      case 2:
        return (
          <Evaluete
            product={this.state.product}
            customer={this.props}
          ></Evaluete>
        );
      default:
        return;
    }
  }

  changeLike() {
    if (this.props === undefined) {
      this.props.history.push("/login");
      return;
    }
    if (this.props.makhachhang === undefined) {
      this.props.history.push("/login");
      return;
    }
    if (this.state.liked) {
      favoriteApi
        .unlike(this.props.makhachhang, this.state.product.masanpham)
        .then((success) => {
          if (success.status === 200) {
            this.setState({ liked: false });
          }
        })
        .catch((error) => {
          console.error(error);
        });
      return;
    }

    favoriteApi
      .like(this.props.makhachhang, this.state.product.masanpham)
      .then((success) => {
        if (success.status === 200) {
          this.setState({ liked: true });
        }
      })
      .catch((error) => {
        console.error(error);
      });
    return;
  }
  xemGia() {
    var { loai } = this.props.match.params;
    var { hang } = this.props.match.params;
    var { dong } = this.props.match.params;
    var { sanpham } = this.props.match.params;

    var request = {
      loai: loai,
      hang: hang,
      dong: dong,
      sanpham: sanpham,
      dungluong: this.state.chondungluong,
      mausac: this.state.chonmausac,
    };

    detailProductApi
      .xemgiatheodungluongvamausac(request)
      .then((success) => {
        if (success.status === 200) {
          this.setState({
            dongia: success.data.value,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async loadDungluong() {
    var { loai } = this.props.match.params;
    var { hang } = this.props.match.params;
    var { dong } = this.props.match.params;
    var { sanpham } = this.props.match.params;
    var query;
    query = `/${loai}/${hang}/${dong}/${sanpham}/dungluong?mausac=${this.state.chonmausac}`;
    await detailProductApi
      .dungluong(query)
      .then((success) => {
        if (success.status === 200) {
          this.setState({ dungluong: success.data.value.$values });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async loadMausac() {
    var { loai } = this.props.match.params;
    var { hang } = this.props.match.params;
    var { dong } = this.props.match.params;
    var { sanpham } = this.props.match.params;
    var query;
    query = `/${loai}/${hang}/${dong}/${sanpham}/mausac?dungluong=${this.state.chondungluong}`;
    await detailProductApi
      .mausac(query)
      .then((success) => {
        if (success.status === 200) {
          this.setState({ mausac: success.data.value.$values });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async checked() {
    if (this.props === undefined) return;
    if (this.props.makhachhang === undefined) {
      return;
    }
    await favoriteApi
      .checklike(this.props.makhachhang, this.state.product.masanpham)
      .then((success) => {
        if (success.status === 200 && success.data.value.liked) {
          this.setState({ liked: true });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async componentDidMount() {
    var { loai } = this.props.match.params;
    var { hang } = this.props.match.params;
    var { dong } = this.props.match.params;
    var { sanpham } = this.props.match.params;

    this.loadDungluong();
    this.loadMausac();

    var query = `/${loai}/${hang}/${dong}/${sanpham}`;
    await laptopApi
      .laptopInfo(query)
      .then((success) => {
        if (success.status === 200) {
          this.setState({
            product: success.data.value,
            sohinhanh: success.data.serializerSettings.sohinhanh,
          });
        }
      })
      .catch((error) => {
        console.error("error" + error);
      });
    await this.xemGia();
    await this.checked();
    await this.xemdanhgia();
    this.setState({ loading: false });
  }
  addToCart = () => {
    if (this.props.makhachhang === undefined) {
      this.props.history.push("/login");
      return;
    }
    let { product } = this.state;
    let { cartActionCreators } = this.props;
    if (this.state.chondungluong === "-1") {
      myToast.toastError("Bạn cần chọn dung lượng");
      return;
    }
    if (this.state.chonmausac === "-1") {
      myToast.toastError("Bạn cần chọn màu sắc");
      return;
    }
    cartActionCreators.addToCartReport({
      makhachhang: this.props.makhachhang,
      masanpham: product.masanpham,
      dungluong: this.state.chondungluong,
      mausac: this.state.chonmausac,
    });
  };
  xemdanhgia = async () => {
    await evalueteApi
      .evalueteByProductId(this.state.product.masanpham)
      .then((success) => {
        if (success.status === 200) {
          this.setState({
            sosao: success.data.value.trungbinh,
            sodanhgia: success.data.value.sodanhgia,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  render() {
    return (
      <section>
        <LoadingContainer loading={this.state.loading}></LoadingContainer>
        <div className="container">
          <div className="detail-product__box-name">
            <div className="cps-container">
              <div className="box-name__box-product-name">
                <h1>{this.state.product.tensanpham} </h1>
              </div>
              <div className="box-name__box-raiting">
                <i
                  className={
                    this.state.sosao < 1 ? "fas fa-star" : "fas fa-star checked"
                  }
                />
                <i
                  className={
                    this.state.sosao < 2 ? "fas fa-star" : "fas fa-star checked"
                  }
                />
                <i
                  className={
                    this.state.sosao < 3 ? "fas fa-star" : "fas fa-star checked"
                  }
                />
                <i
                  className={
                    this.state.sosao < 4 ? "fas fa-star" : "fas fa-star checked"
                  }
                />
                <i
                  className={
                    this.state.sosao < 5 ? "fas fa-star" : "fas fa-star checked"
                  }
                />
                &nbsp;{this.state.sodanhgia} đánh giá
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <SlideShow
                  product={this.state.product}
                  sohinhanh={this.state.sohinhanh}
                ></SlideShow>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div id="price" className="price mt-5">
                  {this.state.dongia}₫
                </div>
                <div className="box-linked">
                  <div className="box-title">
                    <p className="box-title__title">Chọn dung lượng</p>
                  </div>
                  <div className="list-linked">
                    {function () {
                      var result = [];
                      result = this.state.dungluong.map((value, key) => {
                        return (
                          <a
                            className={
                              key ===
                                (() => {
                                  var i = 0;
                                  for (; i < this.state.dungluong.length; i++) {
                                    if (
                                      this.state.dungluong[i].dungluong ===
                                      this.state.chondungluong
                                    )
                                      break;
                                  }
                                  return i;
                                })()
                                ? "item-linked box-shadow selected"
                                : "item-linked box-shadow"
                            }
                            href={() => false}
                            key={key}
                            onClick={async () => {
                              if (
                                key ===
                                (() => {
                                  var i = 0;
                                  for (; i < this.state.dungluong.length; i++) {
                                    if (
                                      this.state.dungluong[i].dungluong ===
                                      this.state.chondungluong
                                    )
                                      break;
                                  }
                                  return i;
                                })()
                              ) {
                                await this.setState({ chondungluong: "-1" });
                                if (this.state.chonmausac === "-1")
                                  this.xemGia();
                              } else
                                await this.setState({
                                  chondungluong:
                                    this.state.dungluong[key].dungluong,
                                });
                              this.loadMausac();
                              if (this.state.chonmausac === "-1") return;

                              this.xemGia();
                            }}
                          >
                            <strong>{value.dungluong}</strong>
                          </a>
                        );
                      });

                      return result;
                    }.bind(this)()}
                  </div>
                </div>

                <div className="box-product-option">
                  <div className="box-title">
                    <p className="box-title__title">Chọn màu</p>
                  </div>
                  <div className="box-content">
                    <ul id="configurable_swatch_color" className="list-colors">
                      {function () {
                        var result = [];
                        result = this.state.mausac.map((value, key) => {
                          return (
                            <li
                              key={key}
                              id="option161"
                              className={
                                key ===
                                  (() => {
                                    var i = 0;
                                    for (; i < this.state.mausac.length; i++) {
                                      if (
                                        this.state.mausac[i].mausac ===
                                        this.state.chonmausac
                                      )
                                        break;
                                    }
                                    return i;
                                  })()
                                  ? "item-color option-b-c  wide-swatch swatch box-shadow selected"
                                  : "item-color option-b-c  wide-swatch swatch box-shadow "
                              }
                            >
                              <a
                                name="b-c"
                                id="swatch161"
                                className=""
                                title={value.mausac}
                                href={() => false}
                                alt={value.mausac}
                                onClick={async () => {
                                  if (
                                    key ===
                                    (() => {
                                      var i = 0;
                                      for (
                                        ;
                                        i < this.state.mausac.length;
                                        i++
                                      ) {
                                        if (
                                          this.state.mausac[i].mausac ===
                                          this.state.chonmausac
                                        )
                                          break;
                                      }
                                      return i;
                                    })()
                                  ) {
                                    await this.setState({ chonmausac: "-1" });
                                    if (this.state.chondungluong === "-1")
                                      this.xemGia();
                                  } else
                                    await this.setState({
                                      chonmausac: this.state.mausac[key].mausac,
                                    });
                                  this.loadDungluong();
                                  if (this.state.chondungluong === "-1") return;
                                  this.xemGia();
                                }}
                              >
                                <img
                                  className="cpslazy loaded"
                                  alt={value.mausac}
                                  title={value.mausac}
                                  data-ll-status="loaded"
                                  src={imageApi.image(value.image)}
                                />
                                <p>
                                  <strong>{value.mausac}</strong>
                                </p>
                              </a>
                            </li>
                          );
                        });
                        return result;
                      }.bind(this)()}
                    </ul>
                  </div>
                </div>

                <div className="box-promotion">
                  <div className="box-title">
                    <p className="box-title__title">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13.125"
                        height={15}
                        viewBox="0 0 13.125 15"
                      >
                        <path
                          id="gift"
                          d="M14.656,4.693H2.469A.468.468,0,0,0,2,5.161V9.38a.468.468,0,0,0,.469.469h.469v4.687A.468.468,0,0,0,3.406,15H13.719a.468.468,0,0,0,.469-.469V9.849h.469a.468.468,0,0,0,.469-.469V5.161A.468.468,0,0,0,14.656,4.693ZM7.625,13.6a.468.468,0,0,1-.469.469H4.344a.468.468,0,0,1-.469-.469V9.849a.468.468,0,0,1,.469-.469H7.156a.468.468,0,0,1,.469.469Zm0-5.625a.468.468,0,0,1-.469.469H3.406a.468.468,0,0,1-.469-.469V6.1a.468.468,0,0,1,.469-.469h3.75a.468.468,0,0,1,.469.469ZM13.25,13.6a.468.468,0,0,1-.469.469H9.969A.468.468,0,0,1,9.5,13.6V9.849a.468.468,0,0,1,.469-.469h2.812a.468.468,0,0,1,.469.469Zm.937-5.625a.468.468,0,0,1-.469.469H9.969A.468.468,0,0,1,9.5,7.974V6.1a.468.468,0,0,1,.469-.469h3.75a.468.468,0,0,1,.469.469ZM6.481,4.692h4.312A3.266,3.266,0,0,0,12.314,2.72a1.5,1.5,0,0,0-.645-1.383,1.64,1.64,0,0,0-1.013-.4c-1.07,0-1.675,1.312-2,2.483C8.264,1.926,7.509.005,6.213.005A1.7,1.7,0,0,0,5.092.492a1.886,1.886,0,0,0-.725,1.747A4.185,4.185,0,0,0,6.481,4.692Zm4.176-2.631a.686.686,0,0,1,.386.18c.242.19.228.308.225.347-.045.41-.814,1.055-1.711,1.587.264-1.135.7-2.114,1.1-2.114Zm-4.891-.7a.782.782,0,0,1,.447-.228c.58,0,1.177,1.523,1.525,3-1.1-.584-2.229-1.412-2.33-2.077C5.394,1.965,5.357,1.719,5.766,1.357Z"
                          transform="translate(-2 -0.005)"
                          fill="#d70018"
                        />
                      </svg>
                      &nbsp;Khuyến Mãi
                    </p>
                  </div>
                  <div className="box-content">
                    <ul className="list-promotions">
                      <li className="item-promotion general-promotion">
                        <a href={() => false}>
                          Giảm 1 triệu khi thanh toán qua ví Moca, thẻ tín dụng
                          ACB, BIDV, Sacombank, mPOS, Shinhan, Standard Charter
                          (số lượng có hạn)&nbsp;
                        </a>
                      </li>
                      <li className="item-promotion general-promotion">
                        <a href={() => false}>
                          Thu cũ lên đời - Trợ giá 1 triệu&nbsp;
                        </a>
                      </li>
                    </ul>
                    <div className="cps-additional-note">
                      <p>
                        <a
                          data-toggle="modal"
                          data-target="#myModal"
                          href={() => false}
                        >
                          <strong className="color-red">
                            <img
                              alt=""
                              src="/media/icon/icon_fire.png"
                              style={{ width: "20px" }}
                            />
                            &nbsp;DANH SÁCH CỬA HÀNG ĐÃ CÓ HÀNG TRẢI NGHIỆM
                          </strong>
                        </a>
                      </p>
                    </div>{" "}
                  </div>
                </div>

                <div className="box-action-button">
                  <a
                    href={() => false}
                    className="action-button button-red"
                    onClick={this.addToCart}
                  >
                    <strong>MUA NGAY</strong>
                    <span>(Giao tận nơi hoặc lấy tại cửa hàng)</span>
                  </a>
                  <div className="group-button mb-5">
                    <div className="styles__ProductActionV2Container-sc-1l4uvuo-0 iVoRpG">
                      <div className="styles__Text-sc-1l4uvuo-1 iBQIpk">
                        Chia sẻ:
                      </div>
                      <img
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/social-facebook.svg"
                        alt="social-facebook"
                        className="styles__Icon-sc-1l4uvuo-2 hUSuHV left"
                      />
                      <img
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/social-messenger.svg"
                        alt="social-messenger"
                        className="styles__Icon-sc-1l4uvuo-2 hUSuHV"
                      />
                      <img
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/social-pinterest.svg"
                        alt="social-pinterest"
                        className="styles__Icon-sc-1l4uvuo-2 hUSuHV"
                      />
                      <img
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/social-twitter.svg"
                        alt="social-twitter"
                        className="styles__Icon-sc-1l4uvuo-2 hUSuHV"
                      />
                      <img
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/social-copy.svg"
                        alt="social-copy"
                        className="styles__Icon-sc-1l4uvuo-2 hUSuHV last"
                      />
                      <div className="styles__Separator-sc-1l4uvuo-3 hdEAcm" />
                      {(() => {
                        if (this.state.liked)
                          return (
                            <div
                              data-view-id="pdp_details_like"
                              className="styles__LikeInfo-sc-1l4uvuo-4 kQruUZ"
                              onClick={this.changeLike.bind(this)}
                            >
                              <img
                                src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-liked.svg"
                                alt="social-liked"
                                className="styles__Icon-sc-1l4uvuo-2 hUSuHV"
                              />
                              <div className="styles__Text-sc-1l4uvuo-1 iBQIpk">
                                Đã thích
                              </div>
                            </div>
                          );
                        return (
                          <div
                            data-view-id="pdp_details_like"
                            className="styles__LikeInfo-sc-1l4uvuo-4 kQruUZ"
                            onClick={this.changeLike.bind(this)}
                          >
                            <img
                              src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-like.svg"
                              alt="social-like"
                              className="styles__Icon-sc-1l4uvuo-2 hUSuHV"
                            />
                            <div className="styles__Text-sc-1l4uvuo-1 iBQIpk">
                              Thích
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* phần thôn tin thêm */}
          <div className="row">
            <div className="col-md-12">
              {/* Tabs with icons on Card */}
              <div className="card card-nav-tabs">
                <div className="card-header card-header-primary">
                  {/* colors: "header-primary", "header-info", "header-success", "header-warning", "header-danger" */}
                  <div className="nav-tabs-navigation">
                    <div className="nav-tabs-wrapper">
                      <ul className="nav nav-tabs" data-tabs="tabs">
                        {function () {
                          var result = [];
                          for (var i = 0; i < 3; i++) {
                            if (i === this.state.active) {
                              result.push(
                                <li
                                  className="nav-item"
                                  onClick={this.click.bind(this, i)}
                                >
                                  <a
                                    href={() => false}
                                    className="nav-link active"
                                    id="nav-link"
                                    data-toggle="tab"
                                  >
                                    {this.renderTab(i)}
                                  </a>
                                </li>
                              );
                            } else {
                              result.push(
                                <li
                                  className="nav-item"
                                  onClick={this.click.bind(this, i)}
                                >
                                  <a
                                    href={() => false}
                                    className="nav-link"
                                    id="nav-link"
                                    data-toggle="tab"
                                  >
                                    {this.renderTab(i)}
                                  </a>
                                </li>
                              );
                            }
                          }
                          return result;
                        }.bind(this)()}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-body ">
                  <div className="tab-content text-center">
                    {function () {
                      var result = [];
                      for (var i = 0; i < 3; i++) {
                        if (i === this.state.active) {
                          result.push(
                            <div className="tab-pane active" id="tab-pane">
                              {this.renderItem(i)}
                            </div>
                          );
                        } else {
                          result.push(
                            <div className="tab-pane" id="tab-pane">
                              {this.renderItem(i)}
                            </div>
                          );
                        }
                      }
                      return result;
                    }.bind(this)()}
                  </div>
                </div>
              </div>
              <div className="col-9">
                <div class="fb-comments" data-href={window.location.href} data-width="100%" data-numposts="5"></div>
                {/* End Tabs with icons on Card */}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
index.propTypes = {
  cartActionCreators: PropTypes.shape({
    addToCartReport: PropTypes.func,
  }),
  makhachhang: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    makhachhang: state.login.makhachhang,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    cartActionCreators: bindActionCreators(cartAct, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
