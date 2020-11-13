import axios from '@/utils/request'

export const getArticleList = (params = {}) => {
  return axios({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params

  })
}
export const getChannelList = () => {
  return axios({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}
export const delArticle = (id) => {
  return axios({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${id}`
  })
}
