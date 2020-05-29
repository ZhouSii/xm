import fetch from '@/utils/fetch'

const baseurl = 'aflc-order'
const baseurl_two = 'aflc-common'

// 获取交易明细列表
export function data_financeList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrderPayment/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 获取服务分类列表
export function data_GetServerType() {
  return fetch({
    url: '/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF017',
    method: 'get'

  })
}

// 交易类型的AF014子集
export function data_GetServerType2() {
  return fetch({
    url: '/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF014',
    method: 'get'

  })
}
// 交易类型的AF015子集
export function data_GetServerType3() {
  return fetch({
    url: '/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF015',
    method: 'get'

  })
}

