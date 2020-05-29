import fetch from '@/utils/fetch'

const baseurl = 'aflc-order'

// 获取公海推单设置列表
export function data_dispatchList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/dispatch/aflcOpenseaRecommend/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 启用或禁用公海推单设置
export function data_ChangeStatus(id) {
  return fetch({
    url: '/' + baseurl + '/dispatch/aflcOpenseaRecommend/v1/enableOrDisable/',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: id
  })
}

// 新增公海推单设置
export function data_NewData(data) {
  return fetch({
    url: '/' + baseurl + '/dispatch/aflcOpenseaRecommend/v1/add',
    method: 'post',
    data: data
  })
}

// 修改公海推单设置
export function data_ChangeData(data) {
  return fetch({
    url: '/' + baseurl + '/dispatch/aflcOpenseaRecommend/v1/update',
    method: 'put',
    data: data
  })
}

// 删除公海推单
export function data_DeletInfo(id) {
  return fetch({
    url: '/' + baseurl + '/dispatch/aflcOpenseaRecommend/v1/delete',
    method: 'delete',
    data: id
  })
}

