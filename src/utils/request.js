// 配置axios代码，如axios.baseURL
import axios from 'axios'
import JSONbig from 'json-bigint'
import { getToken } from '@/utils/storage'

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn',
  transformResponse: [function (data) {
    // 这里的data是字符串，在这个字符串的是没有丢失精度的，所以需要在这里先把精度调好
    console.log(data)

    // 后端返回数据可能不是 JSON 字符串，而JSONbig.parse()只能处理JSON字符串, try catch一下
    try {
      // 作用1：把json字符串转为js对象
      // 作用2：把里面的大数字做安全处理
      return JSONbig.parse(data)
    } catch (err) {
      return data
    }
  }],
  timeout: 5000
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
