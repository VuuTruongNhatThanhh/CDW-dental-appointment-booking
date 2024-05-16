import axios from "axios"
import API_URL_BACK_END from "../apiConfig";
import { axiosJWT } from "./UserService";
export const getAllProduct = async () => {
    const res = await axios.get(`${API_URL_BACK_END}/product/get-all`)
    return res.data
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
