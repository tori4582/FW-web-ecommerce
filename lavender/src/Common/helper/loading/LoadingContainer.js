import React from "react";
import "./LoadingContainer.css";


function LoadingContainer(props) {
  return (
    <div className="dot-helper" style={!props.loading?{visibility: 'hidden'}:{}}>
      <div className=" dot-helper dot-spin"></div>
    </div>
  );
}

export default (LoadingContainer);