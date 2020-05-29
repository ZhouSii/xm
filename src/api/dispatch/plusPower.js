
import fetch from '@/utils/fetch'
// const baseUrl = 'aflcusercenterservice'
const baseUrl = 'aflc-uc'

// 获取中单加权分列表
export function aflcMediumOrderWeightedList(page, pagesize, data) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcMediumOrderWeighted/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 新增中单加权分
export function aflcMediumOrderWeightedAdd(data) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcMediumOrderWeighted/v1/add',
    method: 'post',
    data: data
  })
}
