import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_Icon from "../Assets/star_icon.png";
import start_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
const ProductDisplay = (props) => {
  const { product } = props;
  const {addToCart} = useContext(ShopContext)
  return (
    <div className="productdisplay">
      <div className="productdisplayleft">
        <div className="productdisplayimagelist">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          {/* <img src={product.image} alt="" /> */}
        </div>
        <div className="productdisplayimage">
          <img className="productdisplaymainmg" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplayright">
        <h1>{product.name}</h1>
        <div className="productdisplayrightstars">
          <img src={star_Icon} alt="" />
          <img src={star_Icon} alt="" />
          <img src={star_Icon} alt="" />
          <img src={star_Icon} alt="" />
          <img src={start_dull_icon} alt="" />
          <p>{122}</p>
        </div>
        <div className="productdisplayrightprices">
          <div className="productdisplayrightpricesold">
            ${product.old_price}
          </div>
          <div className="productdisplayrightpricesnew">
            ${product.new_price}
          </div>
        </div>
        <div className="productdisplayrightdescription">
            A lightweight usually knitted , pullover shirt, close- fitting and 
        </div>
        <div className="productdisplayrightsize">
            <h1>Select Size</h1>
            <div className="productdisplayrightsizes">
                <div>S</div>
                <div>M</div>
                <div>L</div>
                <div>XL</div>
            </div>
        </div>
        <button  onClick={()=>{addToCart(product.id)}} >
           ADD TO CART
        </button >
        <p className="productdisplayrightcategory">
            <span>Category:</span>Women,T-shirts,Crop Top
        </p>
        <p className="productdisplayrightcategory">
            <span>Tags:</span>Modern , latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
