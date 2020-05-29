import fetch from '@/utils/fetch'
const baseUrl = 'aflc-uc'
// const baseUrl = 'aflcusercenterservice'
// const baseUrl = 'aflcusercenterservice-huang'

export function postList(page, pagesize, data) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcrecommendposition/v1/',
    method: 'post',
    data: {
      "currentPage": page,
      "pageSize": pagesize,
      "vo": data
    }
  })
}

export function getRecDetial(id) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcrecommendposition/v1/' + id,
    method: 'get'
  })
}

export function putRecDetial(id, data) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcrecommendposition/v1/' + id,
    method: 'put',
    data: data
  })
}
