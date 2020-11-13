import axios from '@/utils/request'

export function reqPictures (params = {}) {
  return axios({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}
