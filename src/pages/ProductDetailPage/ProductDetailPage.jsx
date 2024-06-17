import React from "react";
import ProductDetailComponent from "../../components/ProductDetailComponent/ProductDetailComponent";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailPage = () => {
    // Lấy cái id sản phẩm trên thanh url
    const {id} = useParams()
    const navigate = useNavigate()
    return (
        <div style={{padding: '0 120px'}}>
       <h5>
  <span style={{ cursor: 'pointer', fontWeight: 'normal' }} onClick={() => { navigate('/') }}>
    Trang chủ
  </span> 
  {' > Chi tiết sản phẩm'}
</h5>
            <div>
            <ProductDetailComponent idProduct={id}/>
            </div>
        </div>
    )
}

export default ProductDetailPage