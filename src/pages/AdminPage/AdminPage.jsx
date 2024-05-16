import { Menu } from "antd";
import React, { useState } from "react";
import {UserOutlined,ProductOutlined,SettingOutlined } from '@ant-design/icons'
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";

const items = [
    {
      key: 'user',
      label: 'Quản lý người dùng',
      icon: <UserOutlined />,
    //   children: [
    //     {
    //       key: 'g1',
    //       label: 'Item 1',
    //       type: 'group',
    //       children: [
    //         {
    //           key: '1',
    //           label: 'Option 1',
    //         },
    //         {
    //           key: '2',
    //           label: 'Option 2',
    //         },
    //       ],
    //     },
    //     {
    //       key: 'g2',
    //       label: 'Item 2',
    //       type: 'group',
    //       children: [
    //         {
    //           key: '3',
    //           label: 'Option 3',
    //         },
    //         {
    //           key: '4',
    //           label: 'Option 4',
    //         },
    //       ],
    //     },
    //   ],
    },
    {
      key: 'product',
      label: 'Quản lý sản phẩm',
      icon: <ProductOutlined />,
    //   children: [
    //     {
    //       key: '5',
    //       label: 'Option 5',
    //     },
    //     {
    //       key: '6',
    //       label: 'Option 6',
    //     },
    //     {
    //       key: 'sub3',
    //       label: 'Submenu',
    //       children: [
    //         {
    //           key: '7',
    //           label: 'Option 7',
    //         },
    //         {
    //           key: '8',
    //           label: 'Option 8',
    //         },
    //       ],
    //     },
    //   ],
    },
    {
      type: 'divider',
    },
    // {
    //   key: 'sub4',
    //   label: 'Navigation Three',
    //   icon: <SettingOutlined />,
    //   children: [
    //     {
    //       key: '9',
    //       label: 'Option 9',
    //     },
    //     {
    //       key: '10',
    //       label: 'Option 10',
    //     },
    //     {
    //       key: '11',
    //       label: 'Option 11',
    //     },
    //     {
    //       key: '12',
    //       label: 'Option 12',
    //     },
    //   ],
    // },
    // {
    //   key: 'grp',
    //   label: 'Group',
    //   type: 'group',
    //   children: [
    //     {
    //       key: '13',
    //       label: 'Option 13',
    //     },
    //     {
    //       key: '14',
    //       label: 'Option 14',
    //     },
    //   ],
    // },
  ];

  const AdminPage = () => {
    const[keySelected, setKeySelected] = useState('')
    const renderPage=(key)=>{
        switch(key){
            case '':
                return (
                    <AdminUser/>
                )
            case 'user':
                return (
                <AdminUser/>
                    )
            case 'product':
                return (
                    <AdminProduct/>
                )
        }
    }
    // const onOpenChange = (keys)=>{
    //     const latestOpenkey= keys.find(key)
    // }
    const handleOnClick = ({key}) => {
    //   console.log('click ', {item, key, keyPath, domEvent});
    setKeySelected(key)
    };

// console.log('keySelected',keySelected)
    return (
        <>
        <HeaderComponent isHiddenSearch isHiddenCart/>
        <div style={{display:'flex'}}>
      <Menu
        onClick={handleOnClick}
        style={{
          width: 256,
          boxShadow:'1px 1px 2px #ccc',
          height:'100vh', 
          backgroundColor:'#F6F1EB'
        }}
        defaultSelectedKeys={['user']}
        defaultOpenKeys={['user']}
        mode="inline"
        items={items}
        
      />
      <div style={{flex:1,padding:'15px'}}>
           {renderPage(keySelected)}
      </div>
      </div>
      </>
    );
  };
    


export default AdminPage