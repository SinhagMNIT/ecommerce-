import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import removeIcon from '../Assets/cart_cross_icon.png'
const CartItems = () => {
  const {getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);

  return (
    <div className="cartitems">
      <div className="cartitemformatmain">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e)=>{
        if(cartItems[e.id] > 0){
            return  <div>
            <div className="cartItemsFormat cartitemformatmain">
              <img
                src={e.image}
                alt=""
                className="cartIcon-producticon"
              />
              <p>{e.name}</p>
              <p>${e.new_price}</p>
              <button className="cartItemsQuantity">{cartItems[e.id]}</button>
              <p>${e.new_price * cartItems[e.id]}</p>
              <img className="cartitemremoveicon" src={removeIcon} onClick={()=>{removeFromCart(e.id)}} alt="" />
            </div>
            <hr />
          </div>
        }
        return null;

      })}
      <div className="cartitems-down">
        <div className="cartitemstotal">
            <h1>Cart Total</h1>
            <div>
                <div className="cartitemstotalitems">
                    <p>Subtotal</p>
                    <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cartitemstotalitems">
                    <p>Shipping Fee</p>
                    <p>Free</p>
                </div>
                <hr />
                <div className="cartitemstotalitems">
                    <h3>Total</h3>
                    <h3>${getTotalCartAmount()}</h3>

                </div>
            </div>
            <button>PROCEED TO CHECKOUT</button>

        </div>
        <div className="cartitemspromocode">
            <p>If you have a promo code, Enter it here</p>
            <div className="cartitemspromobox">
                <input type="text" placeholder="Promo code" />
                <button>Submit</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
