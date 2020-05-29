import fetch from '../utils/fetch'

const baseurl = 'aflc-order'
const baseurl_two = 'aflc-uc'
const baseurl_three = 'aflc-common'

//工单处理
export function aflcWorkOrderDealController() {
    return fetch({
      url: '/'+baseurl+'/order/aflcWorkOrderDealController/v1/dealCount',
      method: 'get',
    }) 
  }
  
//首页-在线客服-账号审核
export function aflcAccountAuditController() {
    return fetch({
      url: '/'+baseurl_two+'/usercenter/aflcAccountAuditController/v1/auditCount',
      method: 'get',
    }) 
  }

//首页-在线客服-订单处理
export function aflcOrderDealController() {
    return fetch({
      url: '/'+baseurl+'/order/aflcWorkOrderDealController/v1/dealOrderCount',
      method: 'get',
    }) 
  }

//首页-在线客服-工作概况
export function aflcCallLog(timeType) {
    return fetch({
      url: '/'+baseurl_three+'/common/aflcCallLog/v1/callLogCount',
      method: 'post',
      data:{
          type:timeType
      }
    }) 
  }

//首页-在线客服-工作概况-响应率
export function aflcAppRes(timeType) {
    return fetch({
      url: '/'+baseurl+'/order/aflcWorkOrderDealController/v1/dealWorkCount',
      method: 'post',
      data:{
          type:timeType
      }
    }) 
  }