import React, { Fragment, useEffect, useState } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import {  Col, Pagination, Row } from "antd";
import { WrapperNavBar, WrapperProduct } from "./style";
import { useLocation } from "react-router-dom";
import * as ProductService from '../../services/ProductService'
import Loading from "../../components/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";

const TypeProductPage = () => {
    // useLocation hiện được đường dẫn của trang và các thông tin khác khi nhấn vào type ở home
    // Lấy ra được state chữ có dấu được lưu trong url
    const {state} = useLocation()
    // Lấy từ khóa search từ redux ra
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 500)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [panigate, setPanigate]= useState({
        page: 0,
        limit: 10, 
        total: 1,
    })
    // console.log('location', location)
    const fetchProductType = async (type, page, limit) =>{
        setLoading(true)
        const res = await ProductService.getProductType(type, page, limit)
        // console.log('res', res)
        if(res?.status == 'OK') {
            setLoading(false)
            setProducts(res?.data)
            setPanigate({...panigate, total: res?.totalPage})
        }else{
            setLoading(false)
        }
    }
    // console.log('loading', loading)

    // useEffect(()=>{
    //     // Dùng khi search trong loại sản phẩm
    //     let newProduct = []
    //     if(searchDebounce){
    //         newProduct = products?.filter((pro)=>pro?.name === searchDebounce)
    //         setProducts(newProduct)
    //     }
    // },[searchDebounce])

    useEffect(()=>{
        if(state){
            fetchProductType(state, panigate.page, panigate.limit)
        }
        
    },[state, panigate.page, panigate.limit])
    const onChange= (current, pageSize)=> {
        // current là cái trang hiện tại đang ở, pageSize là cái giới hạn trang ở cuối
        // console.log({current, pageSize})
        setPanigate({...panigate, page: current-1, limit: pageSize})
    }
    return (
        <Loading isPending={loading}>
            <div style={{padding:'0 120px'}}>
                    <Row style={{ flexWrap:'nowrap', paddingTop:'10px'}}>
                        <WrapperNavBar span={4}>
                        <NavbarComponent/>
                        </WrapperNavBar>
                        <Col span={20}>
                        <WrapperProduct >
                            {/* Tìm kiếm trong trong loại sản phẩm  */}
                            {products?.filter((pro)=>{
                                if(searchDebounce===''){
                                    return pro
                                }else if(pro?.name.toLowerCase()?.includes(searchDebounce?.toLowerCase())){
                                    return pro
                                }
                            })?.map((product) =>{
                                return (
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
                                    id={product._id}
                                    />
                                )
                            })}
                    
                    
                        </WrapperProduct>
                        <Pagination  defaultCurrent={panigate.page +1} total={panigate?.total} onChange={onChange} style={{textAlign:'center', marginTop:'50px', marginBottom:'10px'}} />
                        </Col>
                    </Row>
                    
            </div>
        </Loading>
    )
}

export default TypeProductPage