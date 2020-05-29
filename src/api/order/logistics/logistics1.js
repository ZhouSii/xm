import fetch from '@/utils/fetch'

const baseurl = 'aflc-lcl'
// const baseurl = 'aflclclservice-xx'

/* 
  订单管理-发物流-货主订单管理-
*/

//查询平台订单列表
export function logisticsShipperOrderList(data) {
    return fetch({
      url: '/' + baseurl + '/lcl/lclShipperOrder/findPlatformOrderList',
      method: 'post',
      data:data
    })
  }

//导出平台订单列表Excell
export function logisticsShipperOrderListExcel(data) {
    return fetch({
      url: '/' + baseurl + '/lcl/lclShipperOrder/exportPlatformOrderExcel',
      method: 'post',
      responseType: 'blob',
      data:data
    })
  }

//代区代受理订单
export function logisticsShipperOrderAccept(data) {
    return fetch({
      url: '/' + baseurl + '/lcl/lclShipperOrder/agencyAccept',
      method: 'put',
      data:data
    })
  }

//代区代拒绝订单
export function logisticsShipperOrderRefuse(data) {
    return fetch({
      url: '/' + baseurl + '/lcl/lclShipperOrder/agencyRefused',
      method: 'put',
      data:data
    })
  }

//代货主取消订单
export function logisticsShipperOrderCancel(data) {
    return fetch({
      url: '/' + baseurl + '/lcl/lclShipperOrder/replaceShipperCancel',
      method: 'put',
      data:data
    })
  }

//根据流水获取订单信息
export function logisticsShipperOrderDetails(orderSerial) {
    return fetch({
      url: '/' + baseurl + '/lcl/lclShipperOrder/getOrderByOrderSerial/'+orderSerial,
      method: 'get',
    })
  }

//根据流水获取运单信息（来源于网络订单）
export function logisticsWaybillDetails(orderSerial) {
    return fetch({
      url: '/' + baseurl + '/lcl/lclShipperOrder/getNetworkWaybillByOrderSerial/'+orderSerial,
      method: 'get',
    })
  }

//发物流订单详情–区代中转单
export function logisticsOutsourceDetails(orderSerial) {
    return fetch({
      url: '/' + baseurl + '/lcl/waybillOutsource/platform/getOutsourceByOrderSerial/'+orderSerial,
      method: 'get',
    })
  }

//发物流订单详情–专线运单
export function logisticsCarriersDetails(orderSerial) {
    return fetch({
      url: '/' + baseurl + '/lcl/waybillOutsource/platform/getCarriersWaybillByOrderSerial/'+orderSerial,
      method: 'get',
    })
  }

/* 
  云平台–发物流–订单审核
*/
// 发物流订单审核
export function aflcLclOrderAuditList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/lcl/aflcLclOrderAudit/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

//发物流-订单审核费用明细
export function aflcLclOrderAuditDetails(id) {
    return fetch({
      url: '/' + baseurl + '/lcl/aflcLclOrderAudit/v1/detail?id='+id,
      method: 'post',
    })
  }

//发物流-审核发物流订单
export function aflcLclOrderAuditVerify(data) {
    return fetch({
      url: '/' + baseurl + '/lcl/aflcLclOrderAudit/v1/verify',
      method: 'post',
      data:data
    })
  }

/* 
  云平台–发物流–专线运单管理
*/
// 云平台–发物流–专线运单管理-全部
export function carriersWaybillList(data) {
    return fetch({
      url: '/' + baseurl + '/lcl/waybillOutsource/platform/list/carriersWaybill',
      method: 'post',
      data: data
    })
  }

//云平台–发物流–专线运单管理–全部
export function carriersWaybillAllList(data) {
    return fetch({
      url: '/' + baseurl + '/lcl/waybillOutsource/platform/list/carriersAllWaybill',
      method: 'post',
      data: data
    })
  }

//云平台–发物流–导出专线运单
export function exportCarriersWaybillExcel(data) {
    return fetch({
      url: '/' + baseurl + '/lcl/waybillOutsource/platform/exportCarriersWaybillExcel',
      method: 'post',
      responseType: 'blob',
      data:data
    })
  }

/* 
  订单管理-发物流-区代运单管理
*/

//订单管理-发物流-区代运单管理-全部
export function agentWaybillList(data) {
    return fetch({
      url: '/' + baseurl + '/lcl/lclAreaAgencyWaybill/findAreaAgencyWaybillList',
      method: 'post',
      data:data
    })
  }

//导出平台订单列表Excell
export function exportAgentWaybillExcal(data) {
    return fetch({
      url: '/' + baseurl + '/lcl/lclAreaAgencyWaybill/exportAreaAgencyWaybillExcel',
      method: 'post',
      responseType: 'blob',
      data:data
    })
  }

//代区代、专线到车
export function mainLineCarArrive(data) {
    return fetch({
      url: '/' + baseurl + '/lcl/lclAreaAgencyWaybill/mainLineCarArrive',
      method: 'put',
      data:data
    })
  }

//代区代、专线发车
export function mainLineCarDispatch(data) {
    return fetch({
      url: '/' + baseurl + '/lcl/lclAreaAgencyWaybill/mainLineCarDispatch',
      method: 'put',
      data:data
    })
  }

//代区代、专线签收
export function waybillSign(data) {
    return fetch({
      url: '/' + baseurl + '/lcl/lclAreaAgencyWaybill/waybillSign',
      method: 'put',
      data:data
    })
  }

//根据条件获取发物流-订单审核记录列表
export function aflcLclOrderAuditLogList(data) {
    return fetch({
      url: '/' + baseurl + '/lcl/aflcLclOrderAuditLog/v1/list',
      method: 'post',
      data:data
    })
  }

//审查发物流订单
export function aflcLclOrderAuditLogCkeck(data) {
    return fetch({
      url: '/' + baseurl + '/lcl/aflcLclOrderAudit/v1/check',
      method: 'post',
      data:data
    })
  }

//发物流订单审查登记
export function aflcLclOrderAuditLogregister(data) {
    return fetch({
      url: '/' + baseurl + '/lcl/aflcLclOrderAudit/v1/register',
      method: 'post',
      data:data
    })
  }

//订单跟踪
export function orderFollow(data) {
    return fetch({
      url: '/' + baseurl + '/lcl/lclShipperOrder/orderFollow',
      method: 'post',
      data:data
    })
  }

//添加订单跟踪
export function addOrderFollow(data) {
    return fetch({
      url: '/' + baseurl + '/lcl/lclShipperOrder/addOrderFollow',
      method: 'post',
      data:data
    })
  }

//根据订单流水号查询收支明细
export function payMentDetails(orderSerial) {
    return fetch({
      url: '/' + baseurl + '/lcl/lclShipperOrder/getOrderPaymentDetailsByOrderSerial/'+orderSerial,
      method: 'get',
    })
  }