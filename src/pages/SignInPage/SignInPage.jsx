import React, { useEffect, useState } from "react";
import InputForm from "../../components/InputForm/InputForm";
import {WrapperContainerLeft, WrapperContainerRight, WrapperTextLight} from './style'
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import imageLogo  from '../../assets/image/logo_login.png'
import { Divider, Image } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import * as UserService from '../../services/UserService'
import { useMutation } from "@tanstack/react-query";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";


const SignInPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    // lấy được cái state đường dẫn chi tiết sản phẩm sau khi đăng nhập
    const location = useLocation()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch();


    // gọi qua bên api
const mutation = useMutationHooks(
  data => UserService.loginUser(data)
)

const { data, isPending, isSuccess } = mutation

useEffect(()=>{
  // console.log('location', location)
  if(isSuccess &&data?.status !== 'ERR'){
    // Nếu có cái location state được truyền từ trang chi tiết sản phẩm qua thì sau khi đăng nhập chuyển đến trang sản phẩm đó
    if(location?.state){
      navigate(location?.state)
    }else{
      navigate('/')
    }
    
    // set nó xong lấy ra bên app.js, Đưa nó thành dạng json để có thể nhận biết bên app.js
    localStorage.setItem('access_token', JSON.stringify(data?.access_token))
    localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token))
    if(data?.access_token){
      // Giải mã cái accesstoken đính kèm id với isAdmin
      const decoded = jwtDecode(data?.access_token)
      // console.log('decoded', decoded)
      // Lấy id đính kèm trong access token
      if(decoded?.id){
        handleGetDetailsUser(decoded?.id, data?.access_token)
      }
  }
}
},[isSuccess])

const handleGetDetailsUser = async(id, token) => {
  const storage = localStorage.getItem('refresh_token')
  const refreshToken = JSON.parse(storage)
  const res = await UserService.getDetailsUser(id, token)
  // Truyền tất cả thông tin người dùng vào redux/userSlide 
  //Tách từng thuộc tính của data ra, với đưa token vào trong cái biến access_token
  // Dùng redux
  dispatch(updateUser({...res?.data, access_token: token,
    refreshToken
  }))
  
  
}

// console.log('mutation',mutation)

    const handleNavigateSignUp =() =>{
        navigate('/sign-up')
    }

    const handleOnchangeEmail=(value) =>{
        // Lấy tất cả ký tự từ bàn phím nhận vào bên InputForm truyền vào đây
       setEmail(value)
   } 

   const handleOnchangePassword=(value) =>{
     setPassword(value)
 }
 
    const handleSignIn=()=>{
      mutation.mutate({
        email,
        password
      })
        // console.log('sign-in', email, password)
    }
    return (
       <div style={{display:'flex', alignItems:'center', justifyContent:'center',background:'#ccc' , height:'100vh'}}>
         <div style={{width: '800px', height:'445px', borderRadius: '6px', background:'#fff', display:'flex'}}>
            <WrapperContainerLeft>
            <h1>Đăng nhập</h1>
            <p>Đăng nhập vào tài khoản của bạn</p>
            <InputForm style={{ marginBottom: '10px'}} placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail}/>
          
            <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px'
              }}
            >{
                isShowPassword ? (
                  <EyeFilled />
                ) : (
                  <EyeInvisibleFilled />
                )
              }
            </span>
            <InputForm placeholder="password" style={{ marginBottom: '10px' }} type={isShowPassword ? "text" : "password"}
              value={password} onChange={handleOnchangePassword}
              />
          </div>

                {data?.status === 'ERR' && <span style={{color:'red'}}>{data?.message}</span>}
              <Loading isPending={isPending}>
            <ButtonComponent
             disabled ={!email.length || !password.length }
             onClick={handleSignIn}
                    bordered={false}
                    size={40}
                    styleButton={{
                        background: '#444',
                        height: '48px',
                        width: '100%',
                        border: 'none',
                        borderRadius:'4px',
                        color: '#fff',
                        fontWeight: '700'
                        // margin: '26px 0 10px'
                    }}
                    textButton={'Đăng nhập'}
                  
                >

                </ButtonComponent>
                </Loading>
                <p><WrapperTextLight>Quên mật khẩu</WrapperTextLight></p>
                <p>Chưa có tài khoản? <WrapperTextLight onClick={handleNavigateSignUp}>Tạo tài khoản</WrapperTextLight></p>
            </WrapperContainerLeft>
            <WrapperContainerRight>
                <Image src={imageLogo} preview={false} alt="image-logo" height="180" width="180"/>
            </WrapperContainerRight>
        </div>
       </div>
    )
}

export default SignInPage