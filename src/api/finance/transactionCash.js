import fetch from '@/utils/fetch'

const baseurl = 'aflc-uc'
const baseurl_two = 'aflc-pay'

// 获取提现记录表列表
export function data_aflcExtractCashList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcExtractCash/v1/userList',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

export function data_aflcExtractCashList_update(ids, data) {   
  return fetch({
           url: '/' + baseurl_two + '/pay/driver/common/v1/withdraw/'+ids,
           method: 'post',
           data:data
         })
}
