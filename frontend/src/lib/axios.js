import axios from 'axios'
//環境によって切り替えるurlとCoolieとかリクエスト
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

export default axiosInstance