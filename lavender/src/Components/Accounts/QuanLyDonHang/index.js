import React, { Component } from 'react'
import HoadonDagiao from './HoadonDagiao';
import "./QuanLyDonHang.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Dangxuly from './Dangxuly';
import Danggiao from './Danggiao';

class index extends Component {
  state = { active: 0}
  renderTab(n) {
    switch (n) {
      case 0:
        return <i className="">Đang xử lý</i>;
      case 1:
        return <i className="">Đang giao</i>;
      case 2:
        return <i className="">Đã giao</i>;
      default:
        return;
    }
  }
  click = (n) => {
    this.setState({ active: n });
  };
  renderItem(n) {
    switch (n) {
      case 0:
        return (<Dangxuly></Dangxuly>);
      case 1:
        return (<Danggiao></Danggiao>);
      case 2:
        return (<HoadonDagiao makhachhang={this.props.makhachhang}></HoadonDagiao>);
      default:
        return;
    }
  }
    render() {
        return (
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
            {/* End Tabs with icons on Card */}
          </div>
        </div>
        )
    }
}
index.propTypes = {
  makhachhang: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    makhachhang: state.login.makhachhang,
  };
};

export default connect(mapStateToProps)(index);