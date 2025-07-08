import axios from 'axios'

const token = localStorage.getItem("SESSION_TOKEN");
//環境によって切り替えるurlとCoolieとかリクエスト
const axiosInstance = axios.create({
    headers: {'Authorization': `Bearer ${token}`},
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

export default axiosInstance