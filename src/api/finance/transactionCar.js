import fetch from '@/utils/fetch'
const baseurl = 'aflc-uc'
// const baseurl = 'aflcusercenterservice-wtc'
const baseurl_four = 'aflc-order'

// 获取交易明细列表
export function data_findDriverMywalletList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcMywallet/v1/findDriverMywalletList',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 获取钱包明细表
export function data_aflcOrderPaymentList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl_four + '/order/aflcOrderPayment/v1/userList',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 获取钱包明细
export function userPaymentCount(id) {
  return fetch({
    url: '/' + baseurl_four + '/order/aflcOrderPayment/v1/userPaymentCount/' + id,
    method: 'get'
  })
}

// 获取保证金明细表
export function data_aflcDriverDeposit(page, pagesize, data) {
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

// 获取行为分明细表
export function data_findAflcDriverDystropyDetail(id, currentPage, pageSize) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcBehaviorScoreDetail/v1/findAflcBehaviorScoreDetail/' + id + '?currentPage=' + escape(currentPage) + '&pageSize=' + escape(pageSize),
    method: 'get'
  })
}

// 根据条件获取车主28币账户发放明细表列表 - 车主28币账户
export function DriverAccountDetailsList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcCoinsGrantDriverDetail/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 获取奖励金金使用记录Excel明细表
export function userRewardDriveExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcUserReward/v1/userRewardDriveExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 流水明细记录excel导出
export function data_aflcOrderPaymentListExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl_four + '/order/aflcOrderPayment/v1/userListExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
