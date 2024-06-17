import { axiosJWT } from "./UserService"
import { API_URL_BACK_END, REACT_APP_FB_ID, REACT_APP_IS_LOCAL } from "../apiConfig";
// export const createProduct = async (data) => {
//   const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data)
//   return res.data
// // }
// http://localhost:3001/api/order/get-order-details/639724669c6dda4fa11edcde
export const createOrder = async (data,access_token) => {
  const res = await axiosJWT.post(`${API_URL_BACK_END}/order/create`, data, {
      headers: {
          token: `Bearer ${access_token}`,
      }
  })
  return res.data
}

export const getOrderByUserId = async (id,access_token) => {
  const res = await axiosJWT.get(`${API_URL_BACK_END}/order/get-all-order/${id}`, {
      headers: {
          token: `Bearer ${access_token}`,
      }
  })
  return res.data
}

export const getDetailsOrder = async (id,access_token) => {
  const res = await axiosJWT.get(`${API_URL_BACK_END}/order/get-details-order/${id}`, {
      headers: {
          token: `Bearer ${access_token}`,
      }
  })
  return res.data
}

export const cancelOrder = async (id, access_token, orderItems) => {
  // const data = {orderItems, orderId: id}
  const res = await axiosJWT.delete(`${API_URL_BACK_END}/order/cancel-order/${id}`,{data: orderItems}, {
      headers: {
          token: `Bearer ${access_token}`,
      }
  })
  return res.data
}

export const getAllOrder = async (access_token) => {
  const res = await axiosJWT.get(`${API_URL_BACK_END}/order/get-all-order`, {
      headers: {
          token: `Bearer ${access_token}`,
      }
  })
  return res.data
}