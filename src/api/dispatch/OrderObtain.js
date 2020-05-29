import fetch from '@/utils/fetch'

const baseurl = 'aflc-order'

// 获取中单列表
export function data_dispatchList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/dispatch/aflcOrderObtain/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 新增中单数据
export function data_NewData(data) {
  return fetch({
    url: '/' + baseurl + '/dispatch/aflcOrderObtain/v1/add2',
    method: 'post',
    data: data
  })
}

// 修改中单数据
export function data_ChangeData(data) {
  return fetch({
    url: '/' + baseurl + '/dispatch/aflcOrderObtain/v1/update',
    method: 'put',
    data: data
  })
}

// 删除中单数据
export function data_DeletInfo(id) {
  return fetch({
    url: '/' + baseurl + '/dispatch/aflcOrderObtain/v1/delete',
    method: 'delete',
    data: id
  })
}

