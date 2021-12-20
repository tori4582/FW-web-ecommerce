
import "./modal.css";
import React, { Component } from 'react'

export default class index extends Component {
  render() {
    return (
      <div className="modal display-block">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              {this.props.title}
            </h5>
          </div>
          <div class="modal-body">{this.props.children}</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              onClick={this.props.handleClose}
            >
              Đóng
            </button>
            <button type="button" class="btn btn-primary" onClick={this.props.handleSave}>
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

