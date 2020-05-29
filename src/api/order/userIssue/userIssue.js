
import fetch from '@/utils/fetch'
const baseUrl = 'aflc-order'
const baseUrl_two = 'aflc-uc'

  // 上架
export function OrderSoldIn(data) {
  return fetch({
    url: '/' + baseUrl + '/order/aflcFCLOrderWeb/soldIn',
    method: 'post',
    data: data
  })
}
  // 下架
export function OrderSoldOut(data) {
  return fetch({
    url: '/' + baseUrl + '/order/aflcFCLOrderWeb/soldOut',
    method: 'post',
    data: data
  })
}

// 根据流水号获取订单详细信息
export function getFCLOrderByOrderSerial(orderSerial) {
  return fetch({
    url: '/' + baseUrl + '/order/aflcFCLOrderWeb/getFCLOrderByOrderSerial/' + orderSerial,
    method: 'get'
  })
}
// 删除货源
export function deletePointNetwork(id) {
  return fetch({
    url: '/' + baseUrl + '/order/aflcFCLOrderWeb/batchDeleteOrder',
    method: 'post',
    data: id
  })
}

  // 获取上架下架总数量
export function findFCLSoldInfoCount(data) {
  return fetch({
    url: '/' + baseUrl + '/order/aflcFCLOrderWeb/findFCLSoldInfoCount',
    method: 'post',
    data: data
  })
}

// 根据发物流订单管理列表
export function findCompanyWebPageList(page, pagesize, data) {
  return fetch({
    url: '/' + baseUrl_two + '/usercenter/aflcLogisticsCompany/v1/findCompanyWebPageList',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 客服处理
export function custsvcDealWith(data) {
  return fetch({
    url: '/' + baseUrl + '/order/aflcFCLOrderWeb/custsvcDealWith',
    method: 'post',
    data: data
  })
}

// 列表
export function companyOrderList(page, pagesize, data) {
  return fetch({
    url: '/' + baseUrl + '/order/aflcFCLOrderWeb/companyOrderList',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 派单抢单列表
export function orderPushList(page, pagesize, data) {
  return fetch({
    url: '/' + baseUrl + '/order/aflcFCLOrderWeb/orderPushList',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 处理状态
export function editDealState(orderSerial, status) {
  return fetch({
    url: '/' + baseUrl + '/order/aflcFCLOrderWeb/editDealState?orderSerial=' + orderSerial + '&dealState=' + status,
    method: 'post'
  })
}
