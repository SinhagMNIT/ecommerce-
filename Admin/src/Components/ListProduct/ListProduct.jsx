import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from '../../assets/cross_icon.png'
const ListProduct = () => {
  // to fetch the data from the api
  const [allproducts, setAllProducts] = useState([]);
  const fetchInfo = async () => {
    await fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      });
  };
  useEffect(() => {
    fetchInfo();
  }, []);
  const removeProduct=async(id)=>{
    await fetch("http://localhost:4000/removeProduct",{
      method:'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo(); // to auto update the list
  }
  return (
    <div className="listProduct">
      <h1>All Products List</h1>
      <div className="listProductFormatMain">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listProductAllProducts">
        <hr />
        {allproducts.map((product, index) => {
          return (
            <>
            <div key={index} className="listProductFormatMain listProductFormat">
              <img src={product.image} alt="" className="listproduct-producticon" />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img onClick={()=>{removeProduct(product.id)}} className="listproductremoveicon" src={cross_icon} alt="" />
            </div>
            <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
