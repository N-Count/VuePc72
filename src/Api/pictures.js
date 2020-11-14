import axios from '@/utils/request'
// 获取素材列表

export const getPictureList = (params) => {
  return axios({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}
export const updatePicture = (id, collect) => {
  return axios({
    method: 'PUT',
    url: `/mp/v1_0/user/images/${id}`,
    data: {
      collect
    }
  })
}
export const delPicture = (id) => {
  return axios({
    method: 'DELETE',
    url: `/mp/v1_0/user/images/${id}`
  })
}
