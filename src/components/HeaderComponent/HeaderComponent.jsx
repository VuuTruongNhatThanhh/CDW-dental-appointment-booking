import React, { useEffect, useState } from "react";
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
import { searchProduct } from "../../redux/slides/productSlide";


const HeaderComponent = ({isHiddenSearch=false, isHiddenCart =false}) => {
    // Lấy ra cái order từ redux
    const order = useSelector((state) =>state.order)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isPending, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [search, setSearch] = useState('')
    const [isOpenPopup, setIsOpenPopup] = useState(false)


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
            navigate('/')
     }
   



   
    // Lấy thông tin user từ redux
    const user = useSelector((state)=> state.user)
    // console.log('user', user)

      // Dùng để cập nhật cái tên user trên header sau khi update bên profile
      useEffect(()=>{
        setLoading(true)
        setUsername(user?.name)
        setUserAvatar(user?.avatar)
        setLoading(false)
    },[user?.name, user?.avatar])


    const content = (
        <div style={{userSelect:'none'}}>
          <WrapperContentPopUp  onClick={() => handleClickNavigate('profile')}>Thông tin người dùng</WrapperContentPopUp>
          {/* là admin thì mới hiện mục này */}
          {user?.isAdmin && (
                <WrapperContentPopUp  onClick={() => handleClickNavigate('admin')}>Quản lý hệ thống</WrapperContentPopUp>
          )}
          <WrapperContentPopUp onClick={() => handleClickNavigate('my-order')}>Đơn hàng của tôi</WrapperContentPopUp>
          <WrapperContentPopUp onClick={() => handleClickNavigate()}>Đăng xuất</WrapperContentPopUp>
        </div>
      );

      const handleClickNavigate = (type) => {
        if(type === 'profile'){
            navigate('/profile-user')
        } else if(type === 'admin'){
            navigate('/system/admin')
        } else if (type === 'my-order'){
            navigate('/my-order',{ state : {
                id: user?.id,
                token : user?.access_token
              }
            })
        }else{
            handleLogout()
        }
        setIsOpenPopup(false)
      }

    const onSearch = (e) =>{
// Hiển thị các ký tự nhập từ bàn phím vào ô tìm kiếm
        // console.log('e', e.target.value)

        setSearch(e.target.value)
        // Gửi dữ liệu search cho Redux
        dispatch(searchProduct(e.target.value))
        
    }   
      
    return (
        <div>
            {/* Cach anh user va gio hang qua 1 xiu */}
            <WrapperHeader 
            style={{justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between':'unset'}}
            >
                {/* Chia cac cot ra (tong la 24 cot) */}
                 <Col span={6}>
                    <WrapperTextHeader onClick={()=> navigate('/')}  style={{fontFamily:'Courier', cursor:'pointer'}}> TIMELESS PELLE NOOK </WrapperTextHeader>
                 </Col>
                 {/* hidden search bên admin page là true thì không hiện cái này */}
                 {!isHiddenSearch &&(
                        <Col span={12} >
                        <ButtonInputSearch
                        size="large" 
                        textButton="Tìm kiếm" 
                        placeholder="Nhập sản phẩm muốn tìm kiếm"
                        bordered={false}
                      onChange={onSearch}
                        />
       
       
                        </Col>
                  )} 
             
                 <Col span={6} style={{ display: 'flex', gap: '20px', alignItems: 'center'}}>
                 <Loading isPending={isPending}>
                <WrapperHeaderAccount >
                    {/* Nếu có avt thì hiển thị avt còn không hiển thị icon user */}
                    {userAvatar ?(
                        <img src={userAvatar} alt="avatar" style={{
                            height:'40px',
                            width:'40px',
                            borderRadius:'50%',
                            objectFit:'cover'  
                        }}/>
                    ):(
                        <UserOutlined style={{ fontSize: '30px'}} />
                    )}
               
                {/* Nếu có tên thì hiện tên, không thì hiện dk/dn */}
                {user?.access_token ? (
                    <>
                  

                    <Popover  content={content}  trigger="click" open={isOpenPopup}>
                    <div style={{marginTop:'6px', cursor:'pointer', userSelect:'none'}} onClick={() =>setIsOpenPopup((prev)=>!prev)}>{username || user.email || 'User'}</div>
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
                {!isHiddenCart&&(
                    <div onClick={()=> navigate('/order')} style={{cursor:'pointer'}}>
                    <Badge count={order?.orderItems?.length} size="small">
                    <ShoppingCartOutlined style={{ fontSize: '30px', color: 'black'}} />
                    </Badge>
                    <span style={{color:'black'}}>Giỏ hàng</span>

                    </div>
                )}
               
               </Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderComponent