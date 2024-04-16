import { Col, Image, InputNumber, Row } from "antd";
import React from "react";
import imageProduct from '../../assets/image/test.webp'
import imageProductSmall from '../../assets/image/imageSmall.webp'
import { WrapperBtnQuantityProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQuantityProduct, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStyleTextSell } from "./style";
import { StarFilled, PlusOutlined, MinusOutlined
   
} from '@ant-design/icons';
import { Button } from "antd/es/radio";
import ButtonComponent from "../ButtonComponent/ButtonComponent"
import { genInputSmallStyle } from "antd/es/input/style";


const ProductDetailComponent = () => {
    const onChange = () => {}
    return (
       <Row style={{padding:'20px'}}>
        <Col span={13}>
            <Image style={{padding:'24px'}} src={imageProduct} alt="image product" preview={false} />
            <Row style={{paddingTop:'10px', justifyContent:'space-between'}}>
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
                <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false}/>
                </WrapperStyleColImage>
                <WrapperStyleColImage span={4}>
                <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false}/>
                </WrapperStyleColImage>
                
              
            </Row>
        </Col>
        <Col span={11} style={{padding:'10px'}}>
            <WrapperStyleNameProduct>Túi Garden Party</WrapperStyleNameProduct>
            <div>
            <StarFilled style={{fontSize:'10px', color:'rgb(253,216,54)'}} />
            <StarFilled style={{fontSize:'10px', color:'rgb(253,216,54)'}} />
            <StarFilled style={{fontSize:'10px', color:'rgb(253,216,54)'}} />
            <WrapperStyleTextSell> | Đã bán 1000+</WrapperStyleTextSell>
            </div>
            <WrapperPriceProduct>
                <WrapperPriceTextProduct>1.000.000 <sup><u>đ</u></sup></WrapperPriceTextProduct>
            </WrapperPriceProduct>
            <div style={{margin:'10px 0 20px', padding:'10px 0', borderTop:'1px solid #e5e5e5', borderBottom:'1px solid #e5e5e5'}}>
                <div style={{marginBottom:'8px'}}>Số lượng</div>
                <WrapperQuantityProduct>
                    <button style={{border:'none', background:'transparent'}}>
                    <MinusOutlined  style={{fontSize:'10px'}} />
                    </button>
                    <WrapperInputNumber min={1} max={10} defaultValue={3} onChange={onChange} size="small" />
                    <button style={{border:'none', background:'transparent'}}>
                    <PlusOutlined style={{fontSize:'10px'}} />
                    </button>
                     </WrapperQuantityProduct>
            </div>
            <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                <ButtonComponent
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
                    textButton={'Thêm vào giỏ hàng'}
                  
                >

                </ButtonComponent>

                <ButtonComponent
              
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

                </ButtonComponent>
            </div>
        </Col>
       </Row>
    )
}

export default ProductDetailComponent