import React, { Component } from 'react'
import Modal from "../MyModal/index";
import * as noteApi from "../../apis/note";
import * as myToast from "../../../Common/helper/toastHelper";
import Cookies from "universal-cookie";

const cookie = new Cookies();

export default class AddNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
          maphieunhap: this.props.bill !== undefined ? this.props.bill.maphieunhap : 0,
          masanpham:
            this.props.bill !== undefined ? this.props.bill.masanpham : 0,
          manhacungcap:
            this.props.bill !== undefined ? this.props.bill.manhacungcap : 0,
          soluongnhap:
            this.props.bill !== undefined ? this.props.bill.soluongnhap : 0,
          ngaynhap:
            this.props.bill !== undefined ? new Date(this.props.bill.ngaynhap) : new Date(),
          tiennhap: this.props.bill !== undefined ? this.props.bill.tiennhap : 0,
          ghichu: this.props.bill !== undefined ? this.props.bill.ghichu : "",
        };
      }

      async componentDidMount() {
      }
      async saveChanges() {
        let phieunhap = {
          maphieunhap: parseInt(this.state.maphieunhap),
          masanpham: parseInt(this.state.masanpham),
          manhacungcap: parseInt(this.state.manhacungcap),
          soluongnhap: parseInt(this.state.soluongnhap),
          ngaynhap: new Date(this.state.ngaynhap),
          manhanvien: parseInt(this.state.manhanvien),
          tiennhap: parseInt(this.state.tiennhap),
          ghichu: this.state.ghichu,
        };
        let hadDone = false;
        var token = cookie.get("token");
        var refreshtoken = cookie.get("refreshtoken");
        await noteApi.addOrUpdateNote(phieunhap, token, refreshtoken)
        .then((success) => {
         
          if (success.status ===200) {
            hadDone=true;
            myToast.toastSucces("Thành công");
        }else myToast.toastError("Thất bại");
        })
        .catch(error =>{
          console.log(error);
          myToast.toastError("Thất bại");
        });
        if (hadDone) this.props.handleSave();
      }
    render() {
        return (
            <Modal
            handleClose={this.props.handleClose}
            handleSave={this.saveChanges.bind(this)}
            title={"Phiếu nhập sản phẩm"}
          >
            <div className="row mb-1">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">Mã phiếu nhập</div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                <input
                  className="form-control border "
                  id="maphieunhap"
                  placeholder=""
                  disabled
                  value={this.state.maphieunhap}
                ></input>
              </div>
            </div>
            <div className="row mb-1">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                Mã sản phẩm
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                <input
                  className="form-control border "
                  id="masanpham"
                  placeholder=""
                  onChange={((e) => {
                    this.setState({ masanpham: e.target.value });
                  })}
                  value={this.state.masanpham}
                ></input>
              </div>
            </div>
            <div className="row mb-1">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                Mã nhà cung cấp
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                <input
                  className="form-control border"
                  id="manhacungcap"
                  placeholder=""
                  onChange={((e) => {
                    this.setState({ manhacungcap: e.target.value });
                  })}
                  value={this.state.manhacungcap}
                ></input>
              </div>
            </div>
            <div className="row mb-1">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                Số lượng nhập
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                <input
                  className="form-control border"
                  id="soluongnhap"
                  placeholder=""
                  onChange={((e) => {
                    this.setState({ soluongnhap: e.target.value });
                  })}
                  value={this.state.soluongnhap}
                ></input>
              </div>
            </div>
            <div className="row mb-1">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                Ngày nhập
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                <input
                  className="form-control border"
                  type="date"
                  id="ngaynhap"
                  name="trip-start"
                  onChange={((e) => {
                    this.setState({ ngaynhap: new Date(e.target.value) });
                  })}
                  value={(this.state.ngaynhap).toISOString().split('T')[0]}
                ></input>
              </div>
            </div>
            <div className="row mb-1">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                Tiền nhập
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                <input
                  className="form-control border"
                  id="tiennhap"
                  placeholder=""
                  onChange={((e) => {
                    this.setState({ tiennhap: e.target.value });
                  })}
                  value={this.state.tiennhap}
                ></input>
              </div>
            </div>
            <div className="row mb-1">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">Ghi chú</div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                <input
                  className="form-control border"
                  id="ghichu"
                  placeholder=""
                  onChange={((e) => {
                    this.setState({ ghichu: e.target.value });
                  })}
                  value={this.state.ghichu}
                ></input>
              </div>
            </div>
            <hr></hr>
          </Modal>
        );
    }
}
