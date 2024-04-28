import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import {routes} from './routes'

import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { isJsonString } from './utils';
import { jwtDecode } from "jwt-decode";
import * as UserService from '../src/services/UserService'
import { useDispatch } from "react-redux";
import { updateUser } from './redux/slides/userSlide';




 function App() {
  const dispatch = useDispatch();
    useEffect(() =>{
      //Trong 30s thì reload không mất user, cần cái refresh_token
      const { storageData, decoded } = handleDecoded()
    
        if(decoded?.id){
          handleGetDetailsUser(decoded?.id, storageData)
        }
      
      // console.log(' storageData', storageData)
    },[])

    const handleDecoded = () => {
      let storageData = localStorage.getItem('access_token')
      let decoded = {}
      if(storageData && isJsonString(storageData)){
        // Đưa nó thành dạng bình thường
        storageData = JSON.parse(storageData)
         decoded = jwtDecode(storageData)
     
      
      }
      return { decoded, storageData }
    }

    UserService.axiosJWT.interceptors.request.use(async(config) =>{
      const currentTime = new Date()
      const { decoded} = handleDecoded()
      // Nếu thời gian hết hạn cái token bé hơn thời gian hiện tại
      // :1000 đổi về cùng đơn vị mili second
      if(decoded?.exp <currentTime.getTime()/1000){
          const data = await UserService.refreshToken()
          config.headers['token'] = `Bearer ${data?.access_token}`
      }
      return config;
    },(err) => {
      return Promise.reject(err)
    })

    const handleGetDetailsUser = async(id, token) => {
      const res = await UserService.getDetailsUser(id, token)
      // Truyền tất cả thông tin người dùng vào redux/userSlide 
      //Tách từng thuộc tính của data ra, với đưa token vào trong cái biến access_token
      dispatch(updateUser({...res?.data, access_token: token}))
      
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
      
      <Router>
        <Routes>
          {/* url để vào page
            được định nghĩa trong folder routes/index.js
          */}
         {routes.map((route) => {
          const Page = route.page
          // isShowHeader true thì hiện, không thì hiện Fragment (ko hiện)
          const Layout = route.isShowHeader ? DefaultComponent : Fragment
          return (
            // url (route.path) trong routes/index.js
            <Route key={route.path} path={route.path} element={
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
    </div>
  )
}

export default App;