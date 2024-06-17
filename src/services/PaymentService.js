import axios from "axios"
import { API_URL_BACK_END, REACT_APP_FB_ID, REACT_APP_IS_LOCAL } from "../apiConfig";
export const getConfig = async () => {
  const res = await axios.get(`${API_URL_BACK_END}/payment/config`)
  return res.data
}