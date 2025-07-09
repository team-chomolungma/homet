import axios from 'axios'

//環境によって切り替えるurlとCoolieとかリクエスト
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem("SESSION_TOKEN")
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.error('リクエストインターセプターでエラー', error)
    return Promise.reject(error)
  }
)

export default axiosInstance