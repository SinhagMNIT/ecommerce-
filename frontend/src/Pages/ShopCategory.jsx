import React, { useContext } from 'react'
import  './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdownicon from '../Components/Assets/dropdown_icon.png'
import Items from '../Components/Items/Items'
import all_product from '../Components/Assets/all_product'
const ShopCategory = (props) => {
  const {all_product} = useContext(ShopContext)
  return (
    <div className='shop-category'>
      <img className='shopCategory-banner' src={props.banner} alt="" />
      <div className="shopCategory-indexSort">
        <p><span>Showing 1- 12</span> out of 36 products</p>
        <div className="shopCategory-sort">
          Sort by <img src={dropdownicon} alt="" />
        </div>
      </div>
      <div className="shopCategoryProducts">
        {all_product.map((item,i)=>{
          if(props.category === item.category){
            return <Items key={i} id= {item.id}  name= {item.name} image= {item.image}  new_price= {item.new_price} old_price = {item.old_price}/>
          }
          else{
            return null;
          }
        })}
      </div>
      <div className="shopCategoryLoadMore">
        Explore More
      </div>
    </div>
  )
}

export default ShopCategory