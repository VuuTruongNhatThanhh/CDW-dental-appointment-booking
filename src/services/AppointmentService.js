import axios from "axios";
import { API_URL_BACK_END, REACT_APP_FB_ID, REACT_APP_IS_LOCAL } from "../apiConfig";

export const createAppointment = async (data) => {
    const res = await axios.post(`${API_URL_BACK_END}/appointment/create`,data)
    return res.data
}

export const getAllAppointment = async () => {
    const res = await axios.get(`${API_URL_BACK_END}/appointment/getAll`)
    return res.data
}

export const updateAppointment = async (id, data) => {
    const res = await axios.put(`${API_URL_BACK_END}/appointment/update/${id}`,data)
    // console.log('data',data)
    return res.data
}