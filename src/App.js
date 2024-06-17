import React, { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import {routes} from './routes'

import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { isJsonString } from './utils';
import { jwtDecode } from "jwt-decode";
import * as UserService from '../src/services/UserService'
import { useDispatch, useSelector } from "react-redux";
import { resetUser, updateUser } from './redux/slides/userSlide';
import Loading from './components/LoadingComponent/Loading';





 function App() {
  const dispatch = useDispatch();
  const [isPending, setIsLoading] = useState(false)

  // Lấy dữ liệu user từ redux
  const user = useSelector((state)=> state.user)
    useEffect(() =>{
    
      //Trong 30s thì reload không mất user, cần cái refresh_token
      const { storageData, decoded } = handleDecoded()
    
        if(decoded?.id){
          // setIsLoading(true)
          handleGetDetailsUser(decoded?.id, storageData)
        }else{
          setIsLoading(false)
        }
      
      // console.log(' storageData', storageData)
    },[])

    const handleDecoded = () => {
      let storageData = user?.access_token || localStorage.getItem('access_token')
      let decoded = {}
      if(storageData && isJsonString(storageData) && !user?.access_token){
        // Đưa nó thành dạng bình thường
        storageData = JSON.parse(storageData)
         decoded = jwtDecode(storageData)
     
      
      }
      return { decoded, storageData }
    }

    UserService.axiosJWT.interceptors.request.use(async(config) =>{
      const currentTime = new Date()
      const { decoded} = handleDecoded()
      let storageRefreshToken = localStorage.getItem('refresh_token')
      const refreshToken = JSON.parse(storageRefreshToken)
      const decodedRefreshToken = jwtDecode(refreshToken)
      // Nếu thời gian hết hạn cái token bé hơn thời gian hiện tại
      // :1000 đổi về cùng đơn vị mili second
      if(decoded?.exp <currentTime.getTime()/1000){
        if(decodedRefreshToken?.exp >currentTime.getTime()/1000){
          const data = await UserService.refreshToken(refreshToken)
          config.headers['token'] = `Bearer ${data?.access_token}`
      }else{
        dispatch(resetUser())
      }
    }
      return config;
    },(err) => {
      return Promise.reject(err)
    })

    const handleGetDetailsUser = async(id, token) => {
      let storageRefreshToken = localStorage.getItem('refresh_token')
      const refreshToken = JSON.parse(storageRefreshToken)
      const res = await UserService.getDetailsUser(id, token)
      // Truyền tất cả thông tin người dùng vào redux/userSlide 
      //Tách từng thuộc tính của data ra, với đưa token vào trong cái biến access_token
      dispatch(updateUser({...res?.data, access_token: token, refreshToken: refreshToken}))
      // setIsLoading(false)
      
    }
  // useEffect(()=>{
  //   fetchApi()
  // },[])
//   const apiUrl = process.env.REACT_API_URL_BACKEND;
// console.log('apiUrl:', apiUrl);
//   const fetchApi = async() =>{
//     const res = await axios.get(`http://localhost:3001/api/product/get-all`)
//    return res.data
//   }

//   const query  = useQuery({ queryKey: ['todos'], queryFn: fetchApi})
//   console.log('query', query)
 
  return (
    <div>
      <Loading isPending={isPending}>
      <Router>
        <Routes>
          {/* url để vào page
            được định nghĩa trong folder routes/index.js
          */}
         {routes.map((route) => {
          const Page = route.page
          // Nghĩa là nếu isPrivate trong route/index mà là true thì sẽ không vô được (không hiển thị trang), false thì vô được
          // true thì user phải là admin thì dô được
          const ischeckAuth = !route.isPrivate || user.isAdmin
          // isShowHeader true thì hiện, không thì hiện Fragment (ko hiện)
          const Layout = route.isShowHeader ? DefaultComponent : Fragment
          return (
            // url (route.path) trong routes/index.js
            <Route key={route.path} path={ischeckAuth ? route.path : undefined} element={
            <>
            <Layout>
              {/* Chữ hiện trên trang dc gán vào biến Page (route.page) trong routes/index.js */}
              < Page />
              </Layout>
            </>
            } />
          )
         })}
        </Routes>
      </Router>
      </Loading>
    </div>
  )
}

export default App;