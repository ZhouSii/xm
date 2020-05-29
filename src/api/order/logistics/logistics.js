
import fetch from '@/utils/fetch'
const baseurl = 'aflc-order'
const baseurl_two = 'aflc-common'
const baseurl_three = 'aflc-uc'
// const baseurl_three = 'aflcusercenterservice-lyc'
const baseurl_four = 'aflc-lcl'

  // 根据发物流订单管理列表
  export function findFCLOrderInfoList(page, pagesize, data) {
    return fetch({
      url: '/' + baseurl + '/order/aflcFCLOrderWeb/findFCLSupplyGoodsList',
      method: 'post',
      data: {
        'currentPage': page,
        'pageSize': pagesize,
        'vo': data
      }
    })
  }

  // 根据发物流待跟进订单管理列表
  export function findWaitFollowList(page, pagesize, data) {
    return fetch({
      url: '/' + baseurl_four + '/lcl/orderV2/findWaitFollowList',
      method: 'post',
      data: {
        'currentPage': page,
        'pageSize': pagesize,
        'vo': data
      }
    })
  }

  // 根据发物流待跟进订单管理Excle
export function exportWaitFollowExcel(data) {
  return fetch({
    url: '/' + baseurl_four + '/lcl/orderV2/exportWaitFollowExcel',
    responseType: 'blob',
    method: 'post',
    data: data
  })
}

  // 根据发物流待跟进订单详情
export function getOrderByOrderSerial(orderSerial) {
  return fetch({
    url: '/' + baseurl_four + '/lcl/orderV2/getOrderByOrderSerial/' + orderSerial,
    method: 'get'
  })
}

  // 根据发物流待跟进订单详情添加客服备注
  export function addCustsvc(data) {
    return fetch({
      url: '/' + baseurl_four + '/lcl/orderV2/addCustsvc',
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data
    })
  }

// 根据流水号获取订单详细信息
export function getFCLOrderByOrderSerial(orderSerial) {
  return fetch({
    url: '/' + baseurl + '/order/aflcFCLOrderWeb/getFCLOrderByOrderSerial/' + orderSerial,
    method: 'get'
  })
}

// 根据流水号获订单跟踪信息
export function orderStatusFollow(orderSerial) {
  return fetch({
    url: '/' + baseurl + '/order/aflcFCLOrderWeb/orderStatusFollow/' + orderSerial,
    method: 'get'
  })
}

// 未开通线路订单列表
export function aflcLclUnAgencyOrderList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl_four + '/lclserver/aflcLclUnAgencyOrder/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 获取来源订单字典
export function orderSerialFun() {
return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF00400')
}

// 获取付款状态订单字典
export function paymentFun() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF05105')
}

// 获取货主获取物流公司
export function aflcTransportEvaluation(data) {
  return fetch.get('/' + baseurl_three + '/usercenter/aflcTransportEvaluation/v1/findByOrderSerial/' + data)
}

// 获取物流公司获取货主
export function aflcShipperEvaluation(data) {
      return fetch.get('/' + baseurl_three + '/usercenter/aflcShipperEvaluation/v1/findByOrderSerial/' + data)
}

// 获取物流公司获取货主评价
export function shipAndTransport(data) {
  return fetch.get('/' + baseurl_three + '/usercenter/aflcShipperEvaluation/v1/shipAndTransport?orderSerial=' + data)
}
