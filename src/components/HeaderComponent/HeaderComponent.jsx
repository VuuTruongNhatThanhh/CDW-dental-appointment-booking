import React from "react";
import { Badge, Col} from "antd";
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount } from "./style";
import {
    UserOutlined, CaretDownOutlined, ShoppingCartOutlined
  } from '@ant-design/icons';
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";



const HeaderComponent = () => {
    const navigate = useNavigate()
    const handleNavigateLogin =() =>{
        navigate('/sign-in')
    }
    // Lấy thông tin user từ redux
    const user = useSelector((state)=> state.user)
    // console.log('user', user)
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
                {/* Nếu có tên thì hiện tên, không thì hiện dk/dn */}
                {user?.name ? (
                    <div style={{marginTop:'6px', cursor:'pointer'}}>{user.name}</div>
                ) : (
                    <div onClick={handleNavigateLogin} style={{cursor:'pointer'}}>
                        <span>Đăng nhập/Đăng ký</span>
                        <div>
                        <span>Tài khoản</span>
                            <CaretDownOutlined />
                            </div>
                     
                    </div>
                    )}
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