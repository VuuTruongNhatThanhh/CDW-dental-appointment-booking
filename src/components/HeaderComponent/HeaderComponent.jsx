import React, { useState } from "react";
import { Badge, Button, Col, Popover} from "antd";
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount, WrapperContentPopUp } from "./style";
import {
    UserOutlined, CaretDownOutlined, ShoppingCartOutlined
  } from '@ant-design/icons';
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from '../../services/UserService'
import { resetUser } from "../../redux/slides/userSlide";
import Loading from "../LoadingComponent/Loading";


const HeaderComponent = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isPending, setLoading] = useState(false)
    const handleNavigateLogin =() =>{
        navigate('/sign-in')
    }

     const handleLogout = async() => {
        setLoading(true)
            await UserService.logoutUser()
            // Reset trong redux
            dispatch(resetUser())
            localStorage.removeItem('access_token');
            setLoading(false)
     }

    const content = (
        <div>
          <WrapperContentPopUp>Thông tin người dùng</WrapperContentPopUp>
          <WrapperContentPopUp onClick={handleLogout}>Đăng xuất</WrapperContentPopUp>
        </div>
      );
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
                 <Loading isPending={isPending}>
                <WrapperHeaderAccount>
                <UserOutlined style={{ fontSize: '30px'}} />
                {/* Nếu có tên thì hiện tên, không thì hiện dk/dn */}
                {user?.name ? (
                    <>
                  

                    <Popover content={content}  trigger="click">
                    <div style={{marginTop:'6px', cursor:'pointer'}}>{user.name}</div>
                    </Popover>
                    </>
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
                </Loading>
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