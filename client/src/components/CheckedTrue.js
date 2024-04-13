import React from "react";
import "../css/CheckedTrue.css";
import ImgAsset from "../public";
export default function CheckedTrue(props) {
  return (
    <div className={`CheckedTrue_CheckedTrue ${props.className}`}>
      <img className="check" src={ImgAsset.CheckedTrue_check} />
    </div>
  );
}
