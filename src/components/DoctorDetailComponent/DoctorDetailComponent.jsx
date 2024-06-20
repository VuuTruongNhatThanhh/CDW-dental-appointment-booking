import { Col, Image, InputNumber, Rate, Row, message } from "antd";
import React, { useEffect, useState } from "react";
import imageProduct from '../../assets/image/test.webp'
import imageProductSmall from '../../assets/image/imageSmall.webp'
import { WrapperBtnQuantityProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQuantityProduct, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStyleTextSell } from "./style";
import { StarFilled, PlusOutlined, MinusOutlined
   
} from '@ant-design/icons';
import { Button } from "antd/es/radio";
import ButtonComponent from "../ButtonComponent/ButtonComponent"
import { genInputSmallStyle } from "antd/es/input/style";
import * as ProductService from '../../services/ProductService'
import * as UserService from '../../services/UserService'
import { useQuery } from "@tanstack/react-query";
import { resetUser } from "../../redux/slides/userSlide";
import Loading from "../LoadingComponent/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import orderSlide, { addOrderProduct, resetOrder } from "../../redux/slides/orderSlide";
import { convertPrice, initFacebookSDK } from "../../utils";
import LikeButtonComponent from "../LikeButtonComponent/LikeButtonComponent";
import CommentComponent from "../CommentComponent/CommentComponent";
import { REACT_APP_IS_LOCAL } from "../../apiConfig";


const DoctorDetailComponent = ({idProduct}) => {
    // Lấy thông tin user từ redux
    const user = useSelector((state)=> state.user)
    const order = useSelector((state) => state.order)
    const [numProduct, setNumProduct] = useState(1)
    const [errorLimitOrder,setErrorLimitOrder] = useState(false)
    const navigate = useNavigate()
    // lấy ra được path
    const location = useLocation()
    // console.log('locaiton', location)
    const dispatch = useDispatch()
    const onChange = (value) => {
        setNumProduct(Number(value))
    }

    const fetchGetDetailsProduct = async (context)=>{
        const id = context?.queryKey && context?.queryKey[1]
        // console.log('id',id)

        if(id){
            const res = await UserService.getDetailsUser(id)
            console.log('res-detail', res)
            return res.data
        }
       
      }


     useEffect(() =>{
        initFacebookSDK()
     },[])

      useEffect(() => {
        const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id) 
        if((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
            setErrorLimitOrder(false)
        } else if(productDetails?.countInStock === 0){
            setErrorLimitOrder(true)
        }
    },[numProduct])

    useEffect(() => {
        if(order.isSucessOrder) {
            message.success('Đã thêm vào giỏ hàng')
        }
        return () => {
            dispatch(resetOrder())
        }
    }, [order.isSucessOrder])

    const { isPending, data: productDetails} = useQuery({
        queryKey: ['product-details', idProduct],
        queryFn: fetchGetDetailsProduct,
        // keep previous data là để data ko reset lại khi load more
        config: { enabled: !!idProduct }
      });

    //   console.log('productdetail', productDetails)

 

   

      const handleChangeCount = (type, limited) => {
        if(type === 'increase') {
            if(!limited) {
                setNumProduct(numProduct + 1)
            }
        }else {
            if(!limited) {
                setNumProduct(numProduct - 1)
            }
        }
    }

    const handleAddOrderProduct = () => {
        if(!user?.id) {
            navigate('/sign-in', {state: location?.pathname})
        }else {
            // {
            //     name: { type: String, required: true },
            //     amount: { type: Number, required: true },
            //     image: { type: String, required: true },
            //     price: { type: Number, required: true },
            //     product: {
            //         type: mongoose.Schema.Types.ObjectId,
            //         ref: 'Product',
            //         required: true,
            //     },
            // },
            const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
            if((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
                dispatch(addOrderProduct({
                    orderItem: {
                        name: productDetails?.name,
                        amount: numProduct,
                        image: productDetails?.image,
                        price: productDetails?.price,
                        product: productDetails?._id,
                        discount: productDetails?.discount,
                        countInstock: productDetails?.countInStock
                    }
                }))
            } else {
                setErrorLimitOrder(true)
            }
        }
    }

    //   console.log('productDetail', productDetails)
  

    return (
        <Loading isPending={isPending}>
       <Row style={{padding:'20px'}}>
        <Col span={13}>
            <Image style={{padding:'24px'}} src={productDetails?.avatar} alt="image product" preview={false} />
            <Row style={{paddingTop:'10px', justifyContent:'space-between'}}>
                <WrapperStyleColImage span={4}>
                {/* <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false}/>
                </WrapperStyleColImage>
                <WrapperStyleColImage span={4}>
                <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false}/>
                </WrapperStyleColImage>
                <WrapperStyleColImage span={4}>
                <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false}/>
                </WrapperStyleColImage>
                <WrapperStyleColImage span={4}>
                <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false}/>
                </WrapperStyleColImage>
                <WrapperStyleColImage span={4}>
                <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false}/> */}
                </WrapperStyleColImage>
                
              
            </Row>
        </Col>
        <Col span={11} style={{padding:'10px'}}>
            <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>
            <div>
                {/* {renderStars(productDetails?.rating)} */}
               {/* <Rate allowHalf value={Number(productDetails?.rating)} style={{fontSize:'10px', color:'rgb(253,216,54)'}}/> */}
            {/* <StarFilled style={{fontSize:'10px', color:'rgb(253,216,54)'}} />
            <StarFilled style={{fontSize:'10px', color:'rgb(253,216,54)'}} />
            <StarFilled style={{fontSize:'10px', color:'rgb(253,216,54)'}} /> */}
            {/* <WrapperStyleTextSell> | Đã bán 1000+</WrapperStyleTextSell> */}
            </div>
            <WrapperPriceProduct>
                <WrapperPriceTextProduct>Số điện thoại: {convertPrice(productDetails?.phone)}</WrapperPriceTextProduct>
            </WrapperPriceProduct>
           

           <LikeButtonComponent dataHref={ REACT_APP_IS_LOCAL
            ? "https://developers.facebook.com/docs/plugins/": window.location.href}/>
           
           <div>
                {/* <span>Giao đến</span> */}
                <span>{productDetails?.describe}</span>
                {/* <span>Đổi địa chỉ</span> */}
            </div>
            <div style={{margin:'10px 0 20px', padding:'10px 0', borderTop:'1px solid #e5e5e5', borderBottom:'1px solid #e5e5e5'}}>
                {/* <div style={{marginBottom:'8px'}}>Số lượng</div>
                <WrapperQuantityProduct>
                    <button style={{border:'none', background:'transparent', cursor:'pointer'}} onClick={()=> handleChangeCount('decrease',numProduct === 1)}>
                    <MinusOutlined  style={{fontSize:'10px'}}  />
                    </button>
                    <WrapperInputNumber min={1} max={productDetails?.countInStock} defaultValue={1} onChange={onChange} value={numProduct} size="small" />
                    <button style={{border:'none', background:'transparent', cursor:'pointer'}} onClick={()=> handleChangeCount('increase',  numProduct === productDetails?.countInStock)}>
                    <PlusOutlined style={{fontSize:'10px'}} />
                    </button>
                     </WrapperQuantityProduct> */}
            </div>
            <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                <div>
                {/* <ButtonComponent
                    bordered={false}
                    size={40}
                    styleButton={{
                        background: '#444',
                        height: '48px',
                        width: '220px',
                        border: 'none',
                        borderRadius:'4px',
                        color: '#fff',
                        fontWeight: '700'
                    }}
                    onClick={handleAddOrderProduct}
                    textButton={'Đặt lịch khám ngay'}
                  
                >

                </ButtonComponent> */}
                {errorLimitOrder && <div style={{color: 'red'}}>Sản phẩm hết hàng</div>}
                </div>
                {/* <ButtonComponent
              
                    styleButton={{
                        background: '#fff',
                        height: '48px',
                        width: '220px',
                        border: 'none',
                        borderRadius:'4px',
                        color: '#444',
                        fontWeight: '700',
                        border: '1px solid #444 '
                    }}
                    textButton={'Thanh toán ngay'}
                  
                >

                </ButtonComponent> */}
            </div>
        </Col>
        <CommentComponent 
        dataHref={REACT_APP_IS_LOCAL
            ?"https://developers.facebook.com/docs/plugins/comments#configurator"
            :window.location.href
        } 
        width="1200" />
      
       </Row>
       </Loading>
    )
}

export default DoctorDetailComponent