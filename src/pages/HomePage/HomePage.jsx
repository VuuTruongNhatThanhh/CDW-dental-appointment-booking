import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperButtonMore, WrapperProduct, WrapperTypeProduct } from "./style";
// Ảnh slider
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import  slider1 from "../../assets/image/slider1.png";
import slider2 from "../../assets/image/slider2.png";
import slider3 from "../../assets/image/slider3.png";
import CardComponent from "../../components/CardComponent/CardComponent";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

const HomePage = () => {
    // Cái tên trong mảng này là nav
    const arr = ['Trang chủ','Giới thiệu','Sản phẩm','Tự thiết kế','Liên hệ']
    return (
       <>
        <div style={ {padding:'0 120px'}}>
            <WrapperTypeProduct>
           {arr.map((item) => {
            return (
                <TypeProduct name={item} key={item}/>
            )
           })}
           </WrapperTypeProduct>
           <div id="container" style={{height: '1000px', width:'100%'}}>
           <SliderComponent arrImages={[ slider1, slider2, slider3]}/>  
           {/* flexwrap: wrap để tự động xuống hàng khi hết chỗ */}
           <WrapperProduct>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
                
            </WrapperProduct> 
            <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop:'10px'}}>
            <WrapperButtonMore textButton="Xem thêm" type="outline" 
            styleButton={{border: '1px solid black', color: 'black'}}
            
            />
            {/* <NavbarComponent /> */}
            </div>
           </div>
        </div>
       </>
    )
}

export default HomePage                     