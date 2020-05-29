import fetch from '@/utils/fetch'

const baseurl = 'aflc-uc'
// const baseurl = 'aflcusercenterservice-wtc'
const baseurl_two = 'aflc-pay'

// 获取提现记录表列表
export function data_aflcExtractCashList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcExtractCash/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 获取提现记录表列表获取Id
export function aflcExtractCashId(id) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcExtractCash/v1/' + id,
    method: 'get'

  })
}

// 提现转账
export function Getwithdraw(data) {   
  return fetch({
           url: '/' + baseurl_two + '/pay/driver/common/v1/withdraw',
           method: 'post',
           data:data
         })
}

// 失败驳回
export function GetextractFailReject(data) {
  return fetch({
           url: '/' + baseurl_two + '/pay/driver/common/v1/extractFailReject',
           method: 'post',
           data:data
         })
}

export function data_aflcExtractCashList_update(ids, data) {
  return fetch({
    url: '/' + baseurl_two + '/pay/driver/common/v1/withdraw/' + ids,
    method: 'post',
    data: data
  })
}

// 获取提现记录表列表
export function data_aflcExtractSettingList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcExtractSetting/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 提现设置
export function aflcExtractSetting(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcExtractSetting/v1/add',
    method: 'post',
    data: data
  })
}

