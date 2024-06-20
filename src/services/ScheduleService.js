// Chức năng của những file này là tạo ra những function để call api
import axios from "axios";
import { API_URL_BACK_END, REACT_APP_FB_ID, REACT_APP_IS_LOCAL } from "../apiConfig";
export const axiosJWT = axios.create()


export const getAllSchedule = async () => {
    const res = await axios.get(`${API_URL_BACK_END}/schedule/getAll`)
    return res.data
}

export const getDetailSchedule = async (id) => {
    const res = await axios.get(`${API_URL_BACK_END}/schedule/getDetail/${id}`)
    return res.data
}

export const updateSchedule = async (id, data) => {
    const res = await axios.put(`${API_URL_BACK_END}/schedule/update/${id}`,data)
    return res.data
}
