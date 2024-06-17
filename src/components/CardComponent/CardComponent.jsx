import {  Image } from "antd";
import React from "react";
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText } from "./style";
import { StarFilled
   
  } from '@ant-design/icons';
import soldout from '../../assets/image/soldout.png'
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../../utils";

// props là để nhận mấy cái data truyền từ homepage qua
const CardComponent = (props) => {
  const {countInStock,description,image,name,price, rating,type ,discount, selled, id} = props
  const navigate = useNavigate()
  const handleDetailProduct = (id) =>{
    navigate(`/product-details/${id}`)
  }
 
    // Sản phẩm
    return (
        <WrapperCardStyle
        hoverable
        style={{ width: 200 }}
        bodyStyle={{padding:'10px'}}
        cover={<img alt="example" src={image} />}
        onClick={()=>countInStock !==0 && handleDetailProduct(id)}
        disabled={countInStock===0}
      >
        <img src={soldout} alt="" style={{width:'90px', height:'90px', position:'absolute', top:0, left:0}} />
       <StyleNameProduct>{name}</StyleNameProduct>
       <WrapperReportText>
        <span>
             <span>{rating}</span> <StarFilled style={{fontSize:'10px', color:'yellow'}} />
        </span>
        <span> | Đã bán {selled || 0}</span>
       </WrapperReportText>
       <WrapperPriceText>
       {convertPrice(price)} <sup> đ</sup>
        <WrapperDiscountText>-{discount ||5}%</WrapperDiscountText>
       </WrapperPriceText>
      </WrapperCardStyle>
     

    

      
    )
}

export default CardComponent