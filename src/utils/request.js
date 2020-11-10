// 配置axios代码，如axios.baseURL
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn',
  timeout: 3000

})
export default instance
