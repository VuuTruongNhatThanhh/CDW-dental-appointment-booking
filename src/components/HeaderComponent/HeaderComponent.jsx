import React from "react";
import { Badge, Col} from "antd";
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount } from "./style";
import {
    UserOutlined, CaretDownOutlined, ShoppingCartOutlined
  } from '@ant-design/icons';
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";



const HeaderComponent = () => {
    return (
        <div>
            {/* Cach anh user va gio hang qua 1 xiu */}
            <WrapperHeader>
                {/* Chia cac cot ra (tong la 24 cot) */}
                 <Col span={6}>
                    <WrapperTextHeader style={{fontFamily:'Courier'}}> TIMELESS PELLE NOOK </WrapperTextHeader>
                 </Col>
                 <Col span={12} >
                 <ButtonInputSearch
                 size="large" 
                 textButton="Tìm kiếm" 
                 placeholder="Nhập sản phẩm muốn tìm kiếm"
                 bordered={false}
               
                 />


                 </Col>
                 <Col span={6} style={{ display: 'flex', gap: '20px', alignItems: 'center'}}>
               
                <WrapperHeaderAccount>
                <UserOutlined style={{ fontSize: '30px'}} />
                    <div>
                        <span>Đăng nhập/Đăng ký</span>
                        <div>
                        <span>Tài khoản</span>
                            <CaretDownOutlined />
                            </div>
                     
                    </div>
                </WrapperHeaderAccount>
                <div>
                    <Badge count={4} size="small">
                    <ShoppingCartOutlined style={{ fontSize: '30px', color: 'black'}} />
                    </Badge>
                <span style={{color:'black'}}>Giỏ hàng</span>
              
                </div>
               </Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderComponent