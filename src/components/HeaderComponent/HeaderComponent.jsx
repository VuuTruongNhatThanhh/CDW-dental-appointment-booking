import React from "react";
import { Col} from "antd";
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount } from "./style";
import Search from "antd/es/transfer/search";
import {
    UserOutlined, CaretDownOutlined, ShoppingCartOutlined
  } from '@ant-design/icons';


const HeaderComponent = () => {
    return (
        <div>
            <WrapperHeader>
                 <Col span={6}>
                    <WrapperTextHeader>LEATHER SHOP</WrapperTextHeader>
                 </Col>
                 <Col span={12}>
                 <Search placeholder="input search text"  enterButton />
                 </Col>
                 <Col span={6}>
               
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
                    <div>
                    <ShoppingCartOutlined />
                <span>Giỏ hàng</span>
                    </div>
              
                </div>
               </Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderComponent