import React, { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import {routes} from './routes'

import DefaultComponent from './components/DefaultComponent/DefaultComponent';

 function App() {
 
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