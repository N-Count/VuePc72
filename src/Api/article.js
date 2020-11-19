import axios from '@/utils/request'

export const getArticleList = (params = {}) => {
  return axios({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params

  })
}
export const getArticleInfo = id => {
  return axios({
    method: 'GET',
    url: '/mp/v1_0/articles/' + id

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
// 添加文章
export const addArticle = (draft, data) => {
  return axios({
    method: 'POST',
    url: '/mp/v1_0/articles',
    data,
    params: {
      draft
    }
  })
}
export const updateCommentStatus = (article_id, allow_comment) => {
  return axios({
    method: 'PUT',
    url: '/mp/v1_0/comments/status',
    params: {
      article_id
    },
    data: {
      allow_comment
    }
  })
}
