import fetch from '@/utils/fetch'

const baseurl = 'aflc-uc'
// const baseurl = 'aflcusercenterservice-lyw'
const baseurl_two = 'aflc-pay'

// 区代/专线提现列表
export function data_aflcLclExtractCash(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcLclExtractCash/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 区代/专线提现列表获取Id
export function aflcLclExtractCashId(id) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcLclExtractCash/v1/' + id,
    method: 'get'
  })
}

// 区代/专线提现列表审核
export function aflcLclExtractCashAudit(data) {
    return fetch({
      url: '/' + baseurl + '/usercenter/aflcLclExtractCash/v1/audit',
      method: 'put',
      data
    })
}

// 区代/专线付款登记
export function aflcLclExtractCashSettleAdd(data) {
    return fetch({
      url: '/' + baseurl + '/usercenter/aflcLclExtractCashSettle/v1/add',
      method: 'post',
      data
    })
}

// 区代/专线付款记录
export function aflcLclExtractCashSettleList(page, pagesize, data) {
    return fetch({
      url: '/' + baseurl + '/usercenter/aflcLclExtractCashSettle/v1/list',
      method: 'post',
      data: {
        'currentPage': page,
        'pageSize': pagesize,
        'vo': data
      }
    })
  }

// 区代/专线付款记录删除
export function aflcLclExtractCashSettleDelete(id) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcLclExtractCashSettle/v1/delete/' + id,
    method: 'delete'
  })
}

// 区代/专线提现列表提现核销
export function aflcwriteOff(id) {
    return fetch({
      url: '/' + baseurl + '/usercenter/aflcLclExtractCash/v1/writeOff/' + id,
      method: 'put'
    })
}