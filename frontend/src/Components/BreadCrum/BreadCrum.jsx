import React from "react";
import "./BreadCrum.css";
import arrowicon from "../Assets/breadcrum_arrow.png";

const BreadCrum = (props) => {
  const { product } = props;
  return (
    <div className="breadcrum">
      HOME <img src={arrowicon} alt="" /> SHOP <img src={arrowicon} alt="" />{" "}
      {product.category} <img src={arrowicon} alt="" /> {product.name}
    </div>
  );
};

export default BreadCrum;
