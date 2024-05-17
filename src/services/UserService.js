// Chức năng của những file này là tạo ra những function để call api
import axios from "axios";
import API_URL_BACK_END from "../apiConfig";
export const axiosJWT = axios.create()

export const loginUser = async (data) => {
    const res = await axios.post(`${API_URL_BACK_END}/user/sign-in`,data)
    return res.data
}

export const signupUser = async (data) => {
    const res = await axios.post(`${API_URL_BACK_END}/user/sign-up`,data)
    return res.data
}

export const getDetailsUser = async (id, access_token) => {
    const res = await axiosJWT.get(`${API_URL_BACK_END}/user/get-details/${id}`,{
        headers: {
            token:`Bearer ${access_token}`, 
        }
    })
    return res.data
}

export const deleteUser = async (id, access_token) => {
    const res = await axiosJWT.delete(`${API_URL_BACK_END}/user/delete-user/${id}`,{
        headers: {
            token:`Bearer ${access_token}`, 
        }
    })
    return res.data
}

export const getAllUser = async (access_token) => {
    const res = await axiosJWT.get(`${API_URL_BACK_END}/user/getAll`,{
        headers: {
            token:`Bearer ${access_token}`, 
        }
    })
    return res.data
}

export const refreshToken = async () => {
    const res = await axios.post(`${API_URL_BACK_END}/user/refresh-token`, {
        // Khi mà có cookie thì sẽ tự động lấy cookie
        // Phải đổi port back end thành 3000 để lấy được cookie ở front end, trong proxy package.json vẫn để 3001
        withCredentials: true
    })
    return res.data
}

export const logoutUser = async () => {
    const res = await axios.post(`${API_URL_BACK_END}/user/log-out`)
    return res.data
}

//access token là để đúng user đó hoặc là admin mới được update
export const updateUser = async (id, data, access_token) => {
    const res = await axiosJWT.put(`${API_URL_BACK_END}/user/update-user/${id}`,data,{
        headers: {
            token:`Bearer ${access_token}`, 
        }
    })
    
    return res.data
}

// data là những cái ids
export const deleteManyUser = async (data, access_token) => {
    const res = await axiosJWT.post(`${API_URL_BACK_END}/user/delete-many`, data,{
        headers: {
            token:`Bearer ${access_token}`, 
        }
    })
    return res.data
}
