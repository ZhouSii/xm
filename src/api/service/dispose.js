
import fetch from '@/utils/fetch'

// const baseurl = 'aflcorderservice'
const baseurl = 'aflc-order'
// const baseurl = 'aflcorderservice-lyc'
/**
 * 投诉列表
 *
 */
export function postListAppShipperComplain(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrderComplain/v1/listAppShipperComplain',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 订单响应时效明细Excle
export function listAppShipperComplainExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrderComplain/v1/listAppShipperComplainExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 获取投诉人列表
export function postlistComplainant(data) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrderComplain/v1/listComplainant',
    method: 'post',
    data: data
  })
}

// 获取被投诉人列表
export function postlistRespondent(data) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrderComplain/v1/listRespondent',
    method: 'post',
    data: data
  })
}

/**
 * 投诉登记/order/aflcOrderComplain/v1/reportComplain
 * {
  "complainDes": "string",
  "complainType": "string",
  "orderSerial": "string",
  "reporterType": "string"
}
 */
// 投诉登记
export function postReportComplain(data) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrderComplain/v1/reportComplain',
    method: 'post',
    data: data
  })
}

export function aflcOrderComplainUpdate(data) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrderComplain/v1/update',
    method: 'put',
    data: data
  })
}
// 投诉登记ID
export function aflcOrderComplainId(id) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrderComplain/v1/' + id,
    method: 'get'
  })
}


/**
 *订单详情大列表/order/aflcOrderComplain/v1/listAppShipperComplainByOrderSerial/{orderSerial}
 */
export function getListAppShipperComplainByOrderSerial(id) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrderComplain/v1/listAppShipperComplainByOrderSerial/' + id,
    method: 'get'
  })
}
/**
 * 投诉跟进/order/aflcOrderGoodsfollowup/v1/addComplain
 */
export function postAddComplain(data) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrderGoodsfollowup/v1/addComplain',
    method: 'post',
    data: data
  })
}
/**
 * 改变受理状态/order/aflcOrderComplain/v1/updateDealStatus/{id}
 *
 */
export function getUpdateDealStatus(id) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrderComplain/v1/updateDealStatus/' + id,
    method: 'get'
  })
}

/**
 * 列出风控管理的对应投诉值
 *
 */
export function listComplainSetting(belongCity) {
  return fetch({ 
    url: '/' + baseurl + '/order/aflcRiskControlManageSetting/v1/listComplainSetting/' + belongCity,
    method: 'get'
  })
}

// 记录投诉跟进
export function recordFollowup(data) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrderGoodsfollowup/v1/recordFollowup',
    method: 'post',
    data: data
  })
}
// 获取订单详情
export function OutorderSerial(orderSerial) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrderComplain/v1/orderDetal/' + orderSerial,
    method: 'get'
  })
}
