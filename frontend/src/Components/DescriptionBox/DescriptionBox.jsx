import React from "react";
import "./DescriptionBox.css";
const DescriptionBox = () => {
  return (
    <div className="descriptionBox">
      <div className="descriptionBox-navigator">
        <div className="descriptionBox-navbox">Description</div>
        <div className="descriptionBox-navbox fade">Reviews (122)</div>
      </div>
      <div className="descriptionBox-description">
       <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi, unde. Placeat numquam cum itaque molestiae, voluptatibus quas voluptates corporis nostrum, saepe voluptas unde.</p>
       <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam minima itaque veniam. Totam accusamus repellendus omnis deleniti molestiae ipsam animi cum libero ab itaque.</p>
      </div>
    </div>
  );
};

export default DescriptionBox;
