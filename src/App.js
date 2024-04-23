import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import {routes} from './routes'

import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';



 function App() {
  
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