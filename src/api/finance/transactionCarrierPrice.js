import fetch from '@/utils/fetch'
const baseurl = 'aflc-uc'

// 获取区代/专线概况列表
export function data_findMywalletTotal(page, pagesize, data, usertype) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcMywallet/v1/mywalletTotal/' + usertype,
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 获取钱包明细
export function findAflcMywalletByAccountId(id, userType) {
    return fetch({
      url: '/' + baseurl + '/usercenter/aflcMywallet/v1/findAflcMywalletByAccountId/' + id + '/' + userType,
      method: 'get'
    })
}

// 获取账户余额和保证金列表
export function data_aflcMywalletDetailList(page, pagesize, data) {
    return fetch({
      url: '/' + baseurl + '/usercenter/aflcMywalletDetail/v1/list',
      method: 'post',
      data: {
        'currentPage': page,
        'pageSize': pagesize,
        'vo': data
      }
    })
}

// 获取账户余额和保证金列表导出Excel
export function data_aflcMywalletDetailListExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcMywalletDetail/v1/listExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 获取提现记录列表
export function data_aflcLclExtractCashList(page, pagesize, data) {
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

// 获取提现记录列表导出Excel
export function data_aflcLclExtractCashListExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcLclExtractCash/v1/listExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}