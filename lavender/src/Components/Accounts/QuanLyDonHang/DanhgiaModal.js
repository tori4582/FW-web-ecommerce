import React, { useState } from "react";
import "reactjs-popup/dist/index.css";
import Modal from "react-modal";
import * as evalueteApi from "../../apis/evaluete";
import * as myToast from "../../../Common/helper/toastHelper";
import Cookies from "universal-cookie";

const cookie = new Cookies();

const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function DanhgiaModal(props) {
  const [image, setImage] = useState(undefined);
  const [binhluan, setBinhluan] = useState("");
  const [sao, setSao] = useState(0);
  function submitHandler() {
    const fd = new FormData();
    fd.append("image", image);
    fd.append("binhluan", binhluan);
    fd.append("sao", sao);

    var token = cookie.get("token");
    var refreshtoken = cookie.get("refreshtoken");
    evalueteApi
      .addEvalue(fd, props.makhachhang, props.masanpham, token, refreshtoken)
      .then((success) => {
        if (success.status === 200) {
          myToast.toastSucces("Thêm đánh giá thành công");
        } else myToast.toastError("Thêm đánh giá thất bại");
      })
      .catch((error) => {
        myToast.toastError("Thêm đánh giá thất bại");
        console.error(error);
      });
  }

  return (
    <Modal
      isOpen={props.showModal}
      onRequestClose={props.closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="danhgia-modal">
        <div className="modal-header">
          <h4 className="modal-title">Đánh giá &amp; nhận xét sản phẩm</h4>
          <button
            type="button"
            data-dismiss="modal"
            className="btn btn-dark"
            onClick={props.closeModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={12}
              height={12}
              viewBox="0 0 12 12"
            >
              <path
                id="cross"
                d="M11.89,9.64h0L8.249,6l3.64-3.64h0a.376.376,0,0,0,0-.53L10.17.109a.376.376,0,0,0-.53,0h0L6,3.749,2.359.109h0a.376.376,0,0,0-.53,0L.109,1.829a.376.376,0,0,0,0,.53h0L3.75,6,.109,9.64h0a.38.38,0,0,0-.086.134.374.374,0,0,0,.086.4l1.72,1.72a.376.376,0,0,0,.53,0h0L6,8.249l3.64,3.64h0a.376.376,0,0,0,.53,0l1.72-1.72a.376.376,0,0,0,0-.53Z"
                transform="translate(0 0)"
                fill="#fff"
              />
            </svg>
            &nbsp;Đóng
          </button>
        </div>
        <div className="modal-body">
          <div className="form-review">
            <div>
              <div className="review box-review">
                <div className="box-upload-file">
                  <div className="cps-group-input">
                    <input
                      id="uploadFile"
                      placeholder="Hình ảnh thực tế"
                      className="cps-input mb-0"
                    />
                    <div className="btn-browse">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13.91"
                        height={10}
                        viewBox="0 0 16.692 12"
                      >
                        <path
                          id="folder"
                          d="M4.022,6.38h10c1.03,0,1.03-1.068.04-1.068H7.15c-.4,0-.594-.594-.594-.594s-.277-.871-.832-.871H.578c-.752,0-.554.871-.554.871s1.148,9.766,1.228,10.36a1,1,0,0,0,.693.769L3.29,7.211A.894.894,0,0,1,4.022,6.38Zm12.036.375H4.339a.633.633,0,0,0-.634.633L2.478,15.213a.634.634,0,0,0,.634.634H14.831a.634.634,0,0,0,.634-.634l1.227-7.824a.633.633,0,0,0-.634-.633Z"
                          transform="translate(0 -3.848)"
                          fill="#707070"
                        />
                      </svg>
                      <input
                        className="form-control border"
                        id="image"
                        type="file"
                        placeholder=""
                        onChange={(e) => setImage(e.target.files[0])}
                      ></input>
                    </div>
                  </div>
                </div>
                <textarea
                  id="detail"
                  name="detail"
                  rows={4}
                  cols={5}
                  placeholder="Xin mời chia sẻ một số cảm nhận về sản phẩm..."
                  className="cps-textarea"
                  onChange={(e) => setBinhluan(e.target.value)}
                  value={binhluan}
                />
                <div className="error-text error-textarea-content-review d-none">
                  Vui lòng nhập bình luận
                </div>
                <div
                  data-sitekey="6LetVbYUAAAAABRM1I3VO6WD-xxhzTKiR9MDmbNK"
                  className="g-recaptcha"
                  style={{ display: "none" }}
                >
                  <div style={{ width: "304px", height: "78px" }}>
                    <div>
                      <iframe
                        title="reCAPTCHA"
                        src="https://www.google.com/recaptcha/api2/anchor?ar=2&k=6LetVbYUAAAAABRM1I3VO6WD-xxhzTKiR9MDmbNK&co=aHR0cHM6Ly9jZWxscGhvbmVzLmNvbS52bjo0NDM.&hl=vi&v=_7Co1fh8iT2hcjvquYJ_3zSP&size=normal&cb=47stvias3fkx"
                        width={304}
                        height={78}
                        role="presentation"
                        name="a-50uulm8nrmfe"
                        frameBorder={0}
                        scrolling="no"
                        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox"
                      />
                    </div>
                    <textarea
                      id="g-recaptcha-response"
                      name="g-recaptcha-response"
                      className="g-recaptcha-response"
                      style={{
                        width: "250px",
                        height: "40px",
                        border: "1px solid rgb(193, 193, 193)",
                        margin: "10px 25px",
                        padding: "0px",
                        resize: "none",
                        display: "none",
                      }}
                      defaultValue={""}
                    />
                  </div>
                </div>
              </div>
              <div className="box-form-vote">
                <p className="title">Bạn cảm thấy sản phẩm như thế nào?</p>
                <div id="ratingId" className="custom-stars">
                  <label className="rate">
                    <i
                      className={
                        sao < 1
                          ? "fas fa-star one-star"
                          : "fas fa-star one-star checked"
                      }
                      onClick={() => setSao(1)}
                    />{" "}
                    <span>Rất tệ</span>
                  </label>
                  <label className="rate">
                    <i
                      className={
                        sao < 2
                          ? "fas fa-star one-star"
                          : "fas fa-star one-star checked"
                      }
                      onClick={() => setSao(2)}
                    />{" "}
                    <span>Tệ</span>
                  </label>
                  <label className="rate">
                    <i
                      className={
                        sao < 3
                          ? "fas fa-star one-star"
                          : "fas fa-star one-star checked"
                      }
                      onClick={() => setSao(3)}
                    />
                    <span>Bình thường</span>
                  </label>
                  <label className="rate">
                    <i
                      className={
                        sao < 4
                          ? "fas fa-star one-star"
                          : "fas fa-star one-star checked"
                      }
                      onClick={() => setSao(4)}
                    />{" "}
                    <span>Tốt</span>
                  </label>
                  <label className="rate">
                    <i
                      className={
                        sao < 5
                          ? "fas fa-star one-star"
                          : "fas fa-star one-star checked"
                      }
                      onClick={() => setSao(5)}
                    />{" "}
                    <span>Rất tốt</span>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={submitHandler}
              >
                Gửi đánh giá
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
