import React, { Component } from "react";
import AddNote from "./AddNote";
import DeleteNote from "./DeleteNote";

export default class ImportItem extends Component {
  state = { product: undefined, customer: undefined, modal: 0 };
  async componentDidMount() {
  }

  showModal = (index) => {
    this.setState({ modal: index });
  };
  hideModal = () => {
    this.setState({ modal: 0 });
  };
  render() {
    return (
      <>
      {(() => {
          if (this.state.modal === 1)
            return (
              <AddNote
                handleClose={this.hideModal.bind(this)}
                handleSave={(()=>{this.hideModal.bind(this)(); this.props.handleSave()})}
                bill={this.props.bill}
              ></AddNote>
            );
            else
              if (this.state.modal === 2)
            return (
              <DeleteNote
                handleClose={this.hideModal.bind(this)}
                handleSave={(()=>{this.hideModal.bind(this)(); this.props.handleSave()})}
                bill={this.props.bill}
              ></DeleteNote>
            );
          
        })()}
      <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
          <div className="d-flex align-items-center">
            <button className="btn btn-icon-only btn-outline-success mb-0 me-3 p-3 btn-sm d-flex align-items-center justify-content-center">
              <i class="bi bi-receipt"></i>
            </button>
            <div className="d-flex flex-column">
              <h6 className="mb-1 text-dark text-sm">
                {this.props.bill.tensanpham}
              </h6>
              <span className="text-xs">
                Mã phiếu nhập: {this.props.bill.maphieunhap}
              </span>
              <span className="text-xs">
                Số lượng: {this.props.bill.soluongnhap}
              </span>

              <span className="text-xs">
                Nhà cung cấp:{" "}
                {this.props.bill.tennhacungcap}
              </span>
              <span className="text-xs">
                Ngày nhập: {this.props.bill.ngaynhap}
              </span>
              <span className="text-xs">
                Ghi chú:{" "}
                {this.props.bill.ghichu !== undefined && this.props.bill.ghichu}
              </span>
            </div>
          </div>
          <div className="btn btn-link text-dark px-3 mb-0" onClick={() => this.showModal(1)}>
            <i className="bi bi-pencil-square" /> Sửa
          </div>
          <div className="btn btn-link text-danger text-gradient px-3 mb-0" onClick={() => this.showModal(2)}>
            <i className="bi bi-trash" /> Xoá
          </div>
          
        </div>

        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
          <div className="row">
            <div className="d-flex align-items-center text-success text-gradient text-sm font-weight-bold">
              <p>Tổng tiền:</p>
            </div>
          </div>
          <div className="row">
            <div className="d-flex align-items-center text-success text-gradient text-sm font-weight-bold">
              <p>{this.props.bill.tiennhap}</p>
            </div>
          </div>
        </div>
      </li>
      </>
    );
  }
}
