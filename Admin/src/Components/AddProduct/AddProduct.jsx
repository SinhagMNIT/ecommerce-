import React, { useDebugValue, useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";
const AddProduct = () => {
  const url ="https://ecommerce-backend-ygl4.onrender.com"
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };
  
 
  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };
  
  const Add_Product=async()=>{
    console.log(productDetails);
    let responseData;
    let product = productDetails;
    let formData= new FormData();
    formData.append('product',image);
    await fetch(url+'/upload',{
      method: 'POST',
      headers:{
        Accept:'application/json',
      },
      body: formData,
    }).then((resp)=>resp.json()).then((data)=>{responseData= data});
    if(responseData.success){
      product.image = responseData.image_url;
      console.log(product);
      await fetch(url+'/addproduct',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
        },
        body:JSON.stringify(product),
      }).then((resp)=>resp.json()).then((data)=>{
        data.success?alert("product added"):alert("failed")
      })
    }
  }
  return (
    <div className="addproduct">
      <div className="addproductitemfield">
        <p>Products title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>
      <div className="addproductprice">
        <div className="addproductitemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type here"
          />
        </div>
        <div className="addproductitemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="addproductitemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="addproductselector"
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproductitemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="addproductthumbnailimage"
            alt=""
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button onClick={()=>{Add_Product()}}  className="addproductbutton">
        Add
      </button>
    </div>
  );
};

export default AddProduct;
