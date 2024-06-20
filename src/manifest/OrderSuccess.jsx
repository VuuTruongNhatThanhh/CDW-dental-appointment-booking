import {Form, Radio, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { Lable, WrapperContainer, WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperItemOrderInfo, WrapperLeft, WrapperRadio, WrapperRight, WrapperTotal, WrapperValue } from './style';

import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { convertPrice } from '../../utils';
import { useMemo } from 'react';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as  UserService from '../../services/UserService'
import * as OrderService from '../../services/OrderService'
import Loading from '../../components/LoadingComponent/Loading';

import { updateUser } from '../../redux/slides/userSlide';
import { useLocation, useNavigate } from 'react-router-dom';
import { removeAllOrderProduct } from '../../redux/slides/orderSlide';
// import { PayPalButton } from "react-paypal-button-v2";
import * as PaymentService from '../../services/PaymentService'
import { WrapperInputNumber } from '../../components/ProductDetailComponent/style'
import { orderContant } from '../../contant';

const OrderSuccess = () => {
  const order = useSelector((state) => state.order)
  const location = useLocation()
  // console.log('location', location)
  // Lấy ra cái state trong location
  const {state} = location

  return (
    <div style={{background: '#f5f5fa', with: '100%', height: '100vh'}}>
      <Loading isPending={false}>
        <div style={{height: '100%', width: '1270px', margin: '0 auto'}}>
          <h3>Đơn hàng đặt thành công</h3>
          <div style={{ display: 'flex', justifyContent: 'center'}}>
            <WrapperContainer>
              <WrapperInfo>
                <div>
                  <Lable>Phương thức giao hàng</Lable>
                  <WrapperValue>
                  <span style={{color: '#ea8500', fontWeight: 'bold'}}>{orderContant.delivery[state?.delivery]}</span> Giao hàng tiết kiệm
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <Lable>Phương thức thanh toán</Lable>
                 
                  <WrapperValue>
                  {orderContant.payment[state?.payment]}
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperItemOrderInfo>
                {state.orders?.map((order)=>{
                  return (
                                       <WrapperItemOrder key={order?.product}>
                                        <div style={{width: '500px', display: 'flex', alignItems: 'center', gap: 4}}> 
                                        {/* checked: nếu trong listChecked có id của nó thì đánh dấu đã check */}
                                          
                                          <img src={order.image} style={{width: '77px', height: '79px', objectFit: 'cover'}}/>
                                          <div style={{
                                            width: 260,
                                            overflow: 'hidden',
                                            textOverflow:'ellipsis',
                                            whiteSpace:'nowrap'
                                          }}>{order?.name}</div>
                                        </div>
                                        <div style={{flex: 1, display: 'flex', alignItems: 'center', gap: '10px'}}>
                                          <span>
                                            <span style={{ fontSize: '13px', color: '#242424' }}>Giá tiền: {convertPrice(order?.price)}<sup> đ</sup></span>
                                          </span>
                                          <span>
                                            <span style={{ fontSize: '13px', color: '#242424' }}>Số lượng: {order?.amount}</span>
                                          </span>
                                        
                                        </div>
                                      </WrapperItemOrder>
                  )
                })}
                  
              </WrapperItemOrderInfo>
                                            <div>
                                            <span style={{ fontSize: '16px', color: 'red' }}>Tổng tiền: {convertPrice(state?.totalPriceMemo)}</span>
                                          </div>
            </WrapperContainer>

          </div>
        </div>
      
      </Loading>
    </div>
  )
}

export default OrderSuccess