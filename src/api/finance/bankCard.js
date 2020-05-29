import fetch from '@/utils/fetch'
const baseurl = 'aflc-uc'

 /**
 * 银行卡管理表
 */
export function aflcBankCardList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcBankCard/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 通过Id获取银行卡管理表
export function aflcBankCard(id) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcBankCard/v1/' + id,
    method: 'get'
  })
}

//  修改银行卡管理表
export function aflcBankCardUpdate(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcBankCard/v1/update', data)
}

// 银行卡客服备注
export function aflcBankCardCustsvcAdd(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcBankCardCustsvc/v1/add',
    method: 'post',
    data
  })
}

