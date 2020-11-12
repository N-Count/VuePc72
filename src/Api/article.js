import axios from '@/utils/request'

export const getArticleList = (params = {}) => {
  return axios({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params

  })
}
