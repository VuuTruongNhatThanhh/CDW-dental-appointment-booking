// Chức năng của những file này là tạo ra những function để call api
import axios from "axios";
import API_URL_BACK_END from "../apiConfig";


export const loginUser = async (data) => {
    const res = await axios.post(`${API_URL_BACK_END}/user/sign-in`,data)
    return res.data
}

export const signupUser = async (data) => {
    const res = await axios.post(`${API_URL_BACK_END}/user/sign-up`,data)
    return res.data
}

export const getDetailsUser = async (id, access_token) => {
    const res = await axios.get(`${API_URL_BACK_END}/user/get-details/${id}`,{
        headers: {
            token:`Bearer ${access_token}`, 
        }
    })
    return res.data
}