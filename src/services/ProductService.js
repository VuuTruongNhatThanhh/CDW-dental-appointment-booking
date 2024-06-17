import axios from "axios"
import { API_URL_BACK_END, REACT_APP_FB_ID, REACT_APP_IS_LOCAL } from "../apiConfig";
import { axiosJWT } from "./UserService";
export const getAllProduct = async (search,limit) => {
    let res = {}
    if( search?.length >0){
        res = await axios.get(`${API_URL_BACK_END}/product/get-all?filter=name&filter=${search}&limit=${limit}`)
    } else {
     res = await axios.get(`${API_URL_BACK_END}/product/get-all?limit=${limit}`)
    }
    return res.data
}

export const getProductType = async (type, page, limit) => {
    if( type){
       const res = await axios.get(`${API_URL_BACK_END}/product/get-all?filter=type&filter=${type}&limit=${limit}&page=${page}`)
        return res.data
    } 
  
}

export const createProduct = async (data) => {
    const res = await axios.post(`${API_URL_BACK_END}/product/create`, data)
    return res.data
}

export const getDetailsProduct = async (id) => {
    const res = await axios.get(`${API_URL_BACK_END}/product/get-details/${id}`)
    return res.data
}

export const updateProduct = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${API_URL_BACK_END}/product/update/${id}`,data,{
        headers: {
            token:`Bearer ${access_token}`, 
        }
    })
    return res.data
}

export const deleteProduct = async (id, access_token) => {
    const res = await axiosJWT.delete(`${API_URL_BACK_END}/product/delete/${id}`,{
        headers: {
            token:`Bearer ${access_token}`, 
        }
    })
    return res.data
}

// data là những cái ids
// post là do mình nhận dữ liệu qua request.body
export const deleteManyProduct = async (data, access_token) => {
    const res = await axiosJWT.post(`${API_URL_BACK_END}/product/delete-many`, data,{
        headers: {
            token:`Bearer ${access_token}`, 
        }
    })
    return res.data
}

export const getAllTypeProduct = async () => {
    const res = await axios.get(`${API_URL_BACK_END}/product/get-all-type`)
    return res.data
}
