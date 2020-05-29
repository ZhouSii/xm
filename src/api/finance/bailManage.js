import fetch from '@/utils/fetch'
const baseurl = 'aflc-uc'

// 获取车主保证金列表
export function aflcDriverDeposit(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcDriverDeposit/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 解冻
export function aflcDriverDepositFreeze(id) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcDriverDeposit/v1/freeze?id=' + id,
    method: 'get'
  })
}

// 获取区代/专线保证金列表
export function aflcShipperDepositList(page, pagesize, data, status) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcShipperDeposit/v1/list/' + status,
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 代客充值
export function agencyRechargeId(data, status, id) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcShipperDeposit/v1/agencyRecharge/' + status + '/' + id,
    method: 'put',
    data: data
  })
}

// 获取区代/专线保证金明细
export function aflcMywalletDetailist(page, pagesize, data) {
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