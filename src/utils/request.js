// 配置axios代码，如axios.baseURL
import axios from 'axios'
import { getToken } from '@/utils/storage'

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn',
  timeout: 3000
})
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = getToken()
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
export default instance
