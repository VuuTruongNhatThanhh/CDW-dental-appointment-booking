import React, {useEffect} from "react";
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
import { useQuery } from "@tanstack/react-query";
import * as ProductService from '../../services/ProductService'
import { retry } from "@reduxjs/toolkit/query";

const HomePage = () => {
    // Cái tên trong mảng này là nav
    const arr = ['Trang chủ','Giới thiệu','Sản phẩm','Tự thiết kế','Liên hệ']
   
    const fetchProductAll = async() => {
        const res =  await ProductService.getAllProduct()
        // console.log('res', res)
        return res
     }

     const { isLoading, data: products } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProductAll,
        config: { retry: 3, retryDelay: 1000 }
      });


    //   console.log('data',products)
   
   
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
                {products?.data?.map((product) =>{
                    return (
                        // truyền data trả về từ api vào cardcomponent
                        <CardComponent
                        key={product._id}
                        countInStock={product.countInStock}
                        description={product.description}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        rating={product.rating}
                        type={product.type}
                        discount={product.discount}
                        selled= {product.selled}
                        />
                    )
                })}
               
              
                
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