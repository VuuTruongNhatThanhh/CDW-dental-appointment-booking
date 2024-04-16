import {  Image } from "antd";
import React from "react";
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText } from "./style";
import { StarFilled
   
  } from '@ant-design/icons';
import soldout from '../../assets/image/soldout.png'

const CardComponent = () => {
    // Sản phẩm
    return (
        <WrapperCardStyle
        hoverable
        style={{ width: 200 }}
        bodyStyle={{padding:'10px'}}
        cover={<img alt="example" src="https://assets.hermes.com/is/image/hermesproduct/084260CKAC_side_wm_4?size=3000,3000&extend=0,0,0,0&align=0,0&$product_item_grid_g$&wid=700&hei=700" />}
      >
        <img src={soldout} alt="" style={{width:'90px', height:'90px', position:'absolute', top:0, left:0}} />
       <StyleNameProduct>Túi Garden Party</StyleNameProduct>
       <WrapperReportText>
        <span>
             <span>4.96</span> <StarFilled style={{fontSize:'10px', color:'yellow'}} />
        </span>
        <span> | Đã bán 1000+</span>
       </WrapperReportText>
       <WrapperPriceText>
        1.000.000 <sup><u>đ</u></sup>
        <WrapperDiscountText>-5%</WrapperDiscountText>
       </WrapperPriceText>
      </WrapperCardStyle>
     

    

      
    )
}

export default CardComponent