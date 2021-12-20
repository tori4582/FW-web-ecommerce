
import React, { Component } from "react";
import * as guaranteeApi from "../apis/guarantee";

export default class Item extends Component {
    state = { ngaybaohanh: [] };
    componentDidMount() {
        guaranteeApi
        .tracuuLichsubaohanhBangImei(this.props.imei)
        .then((success) => {
          if (success.status === 200) {
            this.setState({ ngaybaohanh: success.data.value });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    render(){
    return (
        <div>
            <li class="list-group-item active"> {this.state.ngaybaohanh}</li>
        </div>
    );
    }
}