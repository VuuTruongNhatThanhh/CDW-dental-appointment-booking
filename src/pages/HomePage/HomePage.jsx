import React, {useEffect, useRef, useState} from "react";
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
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import * as ProductService from '../../services/ProductService'
import { retry } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";
import './TableStyles.css';
import { convertPrice } from "../../utils";
import Popup from "../../components/PopUpComponent/PopUpComponent";
import './ButtonStyles.css';

const HomePage = () => {
    // Cái tên trong mảng này là nav
    const user = useSelector((state)=> state.user)
    const arr = ['Đặt lịch khám','Nha sĩ']
//    Lấy giá trị search từ Redux, truyền từ headercomponent 
    const searchProduct = useSelector((state) => state.product?.search)
    // Dùng để delay thời gian search 1s
    const searchDebounce = useDebounce(searchProduct, 500)
    const refSearch = useRef()
    const [stateProduct, setStateProduct] = useState([])
    const [limit, setLimit] = useState(100)
    const [loading, setLoading] = useState(false)
    const [typeProducts, setTypeProducts] = useState([])
    const [selectedType, setSelectedType] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const fetchProductAll = async(context) => {
        // In ra xem context nó gồm có những gì
    //    console.log('context', context)
    //    Lấy phần tử thứ 2 ở dưới cái useQuery
       const limit = context?.queryKey && context?.queryKey[1]
         //    Lấy phần tử thứ 3 ở dưới cái useQuery
       const search = context?.queryKey && context?.queryKey[2]
      const res = await ProductService.getAllProduct(search, limit)
    //   refSearch.current để khi nhập xong xóa hết đi thì nó lại hiện all, tại vì từ lần chạy thứ 2 đều là true
    //   if(search?.length >0 || refSearch.current){
    //     setStateProduct(res?.data)
    //     return []
    //   }else{
    //     return res
    //   }

    return res
        
     }

     const fetchAllTypeProduct = async () =>{
        const  res = await ProductService.getAllTypeProduct()
        // console.log('res', res)
        if(res?.status === 'OK'){
            setTypeProducts(res?.data)
        }
      
     }

     useEffect(()=>{
        fetchAllTypeProduct()
     },[])

        // useEffect(()=>{
        //     // Lần đầu tải trang thì nó không search trong thanh tìm kiếm
        //     // nghĩa là refSearch.current ở lần chạy đầu tiên nó sẽ là undefined nghĩa là đoạn mã trong if không chạy
        //     if(refSearch.current){
        //         setLoading(true)
        //         fetchProductAll(searchDebounce)    
        //     }
        //     // Sau lần chạy 1 thì đặt là true để đảm bảo các lần chạy tiếp theo đều chạy được
        //     refSearch.current = true
        //     setLoading(false)
        // },[searchDebounce]) //useEffect được thực hiện mỗi khi searchDebounce thay đổi

     const { isPending, data: products , isPreviousData} = useQuery({
        queryKey: ['products',limit,searchDebounce],
        queryFn: fetchProductAll,
        // keep previous data là để data ko reset lại khi load more
        config: { retry: 3, retryDelay: 1000, keepPreviousData: true }
      });

      const handleTypeClick = (type) => {
        const productsByType = products?.data?.filter(product => product.type === type);
        setSelectedType({ type, products: productsByType });
        setShowPopup(true);
    };

     // Lấy danh sách các loại dịch vụ duy nhất
     const uniqueTypes = [...new Set(products?.data?.map(product => product.type))];

    //   console.log('isPreviousData', isPreviousData, isPending)


    //   console.log('data',products)

    // useEffect(()=>{
    //     if(products?.data?.length >0){
    //         setStateProduct(products?.data)
    //     }
    // },[products])
   
//    console.log('product-data',products?.data)
    return (
       <Loading isPending={isPending || loading}>
        <div style={ {padding:'0 120px'}}>
        {!user?.isDoctor && (
            <WrapperTypeProduct>
           {arr.map((item) => {
            return (
                <TypeProduct name={item} key={item}/>
            )
           })}
           </WrapperTypeProduct>
            )}
           <div id="container" style={{height: '1000px', width:'100%'}}>
           <SliderComponent  arrImages={[ slider1, slider2, slider3]}/>  
           {/* flexwrap: wrap để tự động xuống hàng khi hết chỗ */}
           {/* <WrapperProduct >
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
                        id={product._id}
                        />
                    )
                })}
               
              
                
            </WrapperProduct>  */}
           <div style={{marginTop:'60px'}} className="table-container">
            <h1>BẢNG GIÁ DỊCH VỤ</h1>
            <h4>CLICK VÀO Ô ĐỂ XEM CHI TIẾT BẢNG GIÁ</h4>
           <div className="button-container">
                        {uniqueTypes.map((type, index) => (
                            <button key={index} className="service-button" onClick={() => handleTypeClick(type)}>
                                {type}
                            </button>
                        ))}
                    </div>
                        </div>
            <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop:'10px'}}>
            {/* <WrapperButtonMore
            style={{marginBottom:'10px', 
            background:'rgb(68, 68, 68)',
            height:'38px',
            width:'fit-content',
            border:'none',
            borderRadius:'4px',
            color:'rgb(255, 255, 255)',
            fontWeight:'500',
            cursor:'pointer'}} 
            textButton="Xem thêm" type="outline" 
            disabled={products?.total === products?.data?.length || products?.totalPage==1}
            styleButton={{
                border: '1px solid black',
                color: `${products?.total === products?.data?.length ? 'white' : 'black'}`
              }}
            // click vào nút xem thêm thì tăng thêm 5 sản phẩm
            onClick={() => setLimit((prev)=>prev+5)}
        
            
            /> */}
            {/* <NavbarComponent /> */}
            </div>

           </div>
        </div>
        {showPopup && selectedType && (
                <Popup onClose={() => setShowPopup(false)} type={selectedType.type} products={selectedType.products} />
            )}
       </Loading>
    )
}

export default HomePage                     