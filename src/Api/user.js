// 处理用户请求的模块
import request from '@/utils/request.js'

export const postLogin = (mobile
  , code) => {
  return request({
    url: '/mp/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}
export const getUserInfo = () => {
  const token = window.localStorage.getItem('hmpc-token')
  return request({
    url: '/mp/v1_0/user/profile',
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
}
