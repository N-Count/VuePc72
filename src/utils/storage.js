// 封装处理token
const KEY = 'hmpc-token'
export function setToken (token) {
  window.localStorage.setItem(KEY, token)
}
export function getToken () {
  return window.localStorage.getItem(KEY)
}
export function removeToken () {
  window.localStorage.removeItem(KEY)
}
