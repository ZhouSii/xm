import fetch from '@/utils/fetch'
const baseurl = 'aflc-uc'
// const baseurl = 'aflcusercenterservice-wtc'
const baseurl_two = 'aflc-sm'
const baseurl_three = 'aflc-common'
const baseurl_four = 'aflc-order'
// 获取交易明细列表
export function data_findShipperMywalletList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcMywallet/v1/findShipperMywalletList',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 获取交易明细列表Excel
export function data_findShipperMywalletListExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcMywallet/v1/findShipperMywalletListExcel',
    method: 'post',
    responseType: 'blob',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 获取优惠券领用明细表
export function data_aflcCouponUseList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl_two + '/sm/aflcCouponUse/v1/listDetail',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 获取券码状态
export function data_couponActive() {
  return fetch({
    url: '/' + baseurl_three + '/sysDict/getSysDictByCodeGet/AF0464',
    method: 'get'
  })
}

// 获取充值明细
export function userRechargeCount(id) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcRecharge/v1/userRechargeCount/' + id,
    method: 'get'
  })
}

// 获取钱包明细
export function userPaymentCount(id) {
  return fetch({
    url: '/' + baseurl_four + '/order/aflcOrderPayment/v1/userPaymentCount/' + id,
    method: 'get'
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

// 获取优惠金激励金使用记录明细表
export function findAflcRewardDetail(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcUserReward/v1/findAflcRewardDetail',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 获取优惠金使用记录Excel明细表
export function userRewardShipperExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcUserReward/v1/userRewardShipperExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
