import React, { useEffect, useState } from 'react'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useDispatch, useSelector } from 'react-redux'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import { Button, Image, Upload, message } from "antd";
import { updateUser } from '../../redux/slides/userSlide'
import {UploadOutlined} from '@ant-design/icons'
import { getBase64 } from '../../utils'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'


const ProfilePage = () => {
    // Lấy user ra từ redux
    const user = useSelector((state)=>state.user)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState('')

    const mutation = useMutationHooks(
        (data) => {
            const{id,access_token, ...rests} = data
            // Trả về dữ liệu nghĩa là mutation thành công isSuccess
           return UserService.updateUser(id, rests, access_token)
        }
      )

  const dispatch = useDispatch()
  const { data, isPending, isSuccess, isError } = mutation

          // gọi qua bên api

//   console.log('data', data)

    useEffect(()=>{
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
    },[user])

    useEffect(() =>{
        
        if(isSuccess){
            message.success('Cập nhật thành công')
            handleGetDetailsUser(user?.id, user?.access_token)
            
        }else if(isError) {
            message.error()
        }
    },[isSuccess,isError])

    const handleGetDetailsUser = async(id, token) => {
  
        const res = await UserService.getDetailsUser(id, token)
        // Truyền tất cả thông tin người dùng vào redux/userSlide 
        //Tách từng thuộc tính của data ra, với đưa token vào trong cái biến access_token
        // Gửi dữ liệu lên redux
        dispatch(updateUser({...res?.data, access_token: token}))
        
        
      }

    const handleOnchangeEmail = (value) => {
        // các cái handle này là để khi gõ chữ vào nó hiển thị những gì mình gõ
        // Tại mặc định là nó hiển thị thông tin dưới db
        setEmail(value)
    }

    const handleOnChangeName = (value) =>{
        setName(value)
    }

    const handleOnChangePhone = (value) =>{
        setPhone(value)
    }

    const handleOnChangeAddress = (value) =>{
        setAddress(value)
    }

    const handleOnChangeAvatar = async({fileList}) =>{
        const file = fileList[0]
        if(!file.url && !file.preview){
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview)
    }

    const handleUpdate = () => {
       mutation.mutate( {id:user?.id, email, name, phone, address, avatar, access_token: user?.access_token})
        // console.log('update', email, name, phone, address, avatar)
       
    }
    return (
        <>
        {/* <HeaderComponent isHiddenSearch/> */}
        <div style={{width:'1270px', margin:'0 auto', height:'500px'}}>
            <WrapperHeader>Thông tin người dùng</WrapperHeader>
            <Loading isPending={isPending}>
            <WrapperContentProfile>
            <WrapperInput>
                    <WrapperLabel htmlFor="avatar">Ảnh đại diện</WrapperLabel>
                    {/* max count chỉ được thêm 1 ảnh */}
                    <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
                            <Button icon={<UploadOutlined/>}>Chọn ảnh</Button>
                    </WrapperUploadFile>
                    {/* nếu mà có avt thì hiển thị ra cái hình ảnh */}
                    {/* src có thể nhận vào chuỗi base64 và hiển thị hình ảnh */}
                    {avatar &&(
                        <img src={avatar} style={{
                            height:'60px',
                            width:'60px',
                            borderRadius:'50%',
                            objectFit:'cover',
                            outline:'none'  
                        }} alt='avatar'/>
                    )}
                {/* <InputForm style={{width:'300px'}} id="avatar" value={avatar} onChange={handleOnChangeAvatar}/> */}
               
                </WrapperInput>
                <WrapperInput>
                    <WrapperLabel htmlFor="name">Tên người dùng</WrapperLabel>
                <InputForm style={{width:'300px'}} id="name" value={name} onChange={handleOnChangeName}/>
                {/* <ButtonComponent
                   
                    onClick={handleUpdate}
                            bordered={false}
                            size={40}
                            styleButton={{
                                background: '#444',
                                height: '30px',
                                width: 'fit-content',
                                border: 'none',
                                borderRadius:'4px',
                                color: '#fff',
                                fontWeight: '500'
                                // margin: '26px 0 10px'
                            }}
                            textButton={'Cập nhật '}
                            styleTextButton={{fontSize: '15px', fontWeight:'700'}}
                  
                >

                </ButtonComponent> */}
                </WrapperInput>

                <WrapperInput>
                    <WrapperLabel htmlFor="email">Email</WrapperLabel>
                <InputForm disabled style={{width:'300px'}} id="email" value={email} onChange={handleOnchangeEmail}/>
                {/* <ButtonComponent
                   
                    onClick={handleUpdate}
                            bordered={false}
                            size={40}
                            styleButton={{
                                background: '#444',
                                height: '30px',
                                width: 'fit-content',
                                border: 'none',
                                borderRadius:'4px',
                                color: '#fff',
                                fontWeight: '500'
                                // margin: '26px 0 10px'
                            }}
                            textButton={'Cập nhật '}
                            styleTextButton={{fontSize: '15px', fontWeight:'700'}}
                  
                >

                </ButtonComponent> */}
                </WrapperInput>

                <WrapperInput>
                    <WrapperLabel htmlFor="phone">Số điện thoại</WrapperLabel>
                <InputForm style={{width:'300px'}} id="phone" value={phone} onChange={handleOnChangePhone}/>
                {/* <ButtonComponent
                   
                    onClick={handleUpdate}
                            bordered={false}
                            size={40}
                            styleButton={{
                                background: '#444',
                                height: '30px',
                                width: 'fit-content',
                                border: 'none',
                                borderRadius:'4px',
                                color: '#fff',
                                fontWeight: '500'
                                // margin: '26px 0 10px'
                            }}
                            textButton={'Cập nhật '}
                            styleTextButton={{fontSize: '15px', fontWeight:'700'}}
                  
                >

                </ButtonComponent> */}
                </WrapperInput>

                <WrapperInput>
                    <WrapperLabel htmlFor="address">Địa chỉ</WrapperLabel>
                <InputForm style={{width:'300px'}} id="address" value={address} onChange={handleOnChangeAddress}/>
                {/* <ButtonComponent
                   
                    onClick={handleUpdate}
                            bordered={false}
                            size={40}
                            styleButton={{
                                background: '#444',
                                height: '30px',
                                width: 'fit-content',
                                border: 'none',
                                borderRadius:'4px',
                                color: '#fff',
                                fontWeight: '500'
                                // margin: '26px 0 10px'
                            }}
                            textButton={'Cập nhật '}
                            styleTextButton={{fontSize: '15px', fontWeight:'700'}}
                  
                >

                </ButtonComponent> */}
                </WrapperInput>

             
                <ButtonComponent
                   
                   onClick={handleUpdate}
                           bordered={false}
                           size={40}
                           styleButton={{
                               background: '#444',
                               height: '38px',
                               width: 'fit-content',
                               border: 'none',
                               borderRadius:'4px',
                               color: '#fff',
                               fontWeight: '500',
                               marginLeft:'173px'
                               // margin: '26px 0 10px'
                           }}
                           textButton={'Cập nhật '}
                           styleTextButton={{fontSize: '15px', fontWeight:'700'}}
                 
               >

               </ButtonComponent>
            </WrapperContentProfile>
            </Loading>
        </div>
        </>
    )
    
}

export default ProfilePage