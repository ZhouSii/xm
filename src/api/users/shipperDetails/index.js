import fetch from '@/utils/fetch'

const baseurl = 'aflc-order' //订单
const baseurl_tow = 'aflc-sm' //服务
// const baseurl_tow = 'aflcsmservice-wtc' 
const baseurl_three = 'aflc-uc' //用户
// const baseurl_three = 'aflcusercenterservice-wtc' //用户
const baseurl_four = 'aflc-order' //订单
// const baseurl_four = 'aflcorderservice-wtc' //订单

//其他信息-投诉记录-根据条件获取订单投诉建议表列表
export function aflcOrderComplain(data) {
    return fetch({
      url: '/' + baseurl + '/order/aflcOrderComplain/v1/list',
      method: 'post',
      data: data
    })  
  }

//其他信息-评价记录-根据货主数据管理
export function aflcOrderEvaList(data) {
    return fetch({
      url: '/' + baseurl_four + '/order/aflcOrderEvaluation/v1/orderEvaList',
      method: 'post',
      data: data
    })
  }
  
//财务情况-账户优惠券-根据条件获取优惠券领用明细表列表详情
export function aflcCouponList(data) {
    return fetch({
      url: '/' + baseurl_tow + '/sm/aflcCouponUse/v1/listDetail',
      method: 'post',
      data: data
    })
  }

//财务情况-充值记录-根据条件获取充值记录表列表
export function aflcRechargeList(data) {
    return fetch({
      url: '/' + baseurl_three + '/usercenter/aflcRecharge/v1/list',
      method: 'post',
      data: data
    })
  }
  
//财务情况-财务概况-根据id获取货主数据管理
export function aflcFinancialState(userId) {
    return fetch({
      url: '/' + baseurl_three + '/usercenter/aflcShipper/v1/findAflcFinancialStatement/'+ userId,
      method: 'get',
    })
  }

//订单信息-信息概要-根据id获取货主信息管理
export function aflcOrderState(userId) {
    return fetch({
      url: '/' + baseurl_four + '/order/aflcOrder/v1/orderInfo/'+ userId,
      method: 'get',
    })
  }

//订单信息-信息概要-根据时间获取订单信息列表
export function aflcOrderList(data) {
    return fetch({
      url: '/' + baseurl_four + '/order/aflcOrder/v1/shipperOrderManageList',
      method: 'post',
      data: data
    })
  }

//权限配置-绑定车主-根据条件获取车货主绑定列表
export function aflcDriverShipperList(data) {
    return fetch({
      url: '/' + baseurl_four + '/dispatch/aflcDriverShipper/v1/list',
      method: 'post',
      data: data
    })
  }

//权限配置-营销权益-根据id获取货主权益配置
export function aflcEquityConfigDto(userId) {
    return fetch({
      url: '/' + baseurl_three + '/usercenter/aflcShipper/v1/findEquityConfigDto/' + userId,
      method: 'get',
    })
  }
  
//基本信息-概要信息-根据id获取货主基本信息
export function aflcShipperInfo(userId) {
    return fetch({
      url: '/'+baseurl_three+'/usercenter/aflcShipper/v1/findAflcShipperManageByShipperId/' + userId,
      method: 'get',
    })
  }

//货主数据管理-辅助交易信息-历史交易车主 2.0
export function aflcHistoryTradeDrivers(data) {
    return fetch({
      url: '/' + baseurl_four + '/dispatch/aflcDriverStatus/v1/historyTradeDriver',
      method: 'post',
      data: data
    })
  }

//货主数据管理-辅助信息- 收藏司机
export function aflcCollectionDrivers(userId) {
    return fetch({
      url: '/'+baseurl_four+'/dispatch/aflcDriverShipper/v1/shipperDateCollectDriverList/' + userId,
      method: 'get',
    })
  }

//根据条件获取车主货主绑定列表
export function aflcBindCarList(data) {
    return fetch({
      url: '/' + baseurl_four + '/dispatch/aflcDriverShipper/v1/list',
      method: 'post',
      data: data
    })
  }

//查询获取货主信息管理-订单信息-取消订单2.0
export function aflcShipperCancelList(data) {
    return fetch({
      url: '/'+baseurl_four+'/order/aflcOrder/v1/shipperCancelList',
      method: 'post',
      data:data
    })
  }

//银行卡管理-财务信息
export function aflcBankCardList(data) {
    return fetch({
      url: '/'+baseurl_three+'/usercenter/aflcBankCard/v1/list',
      method: 'post',
      data:data
    })
  }

//货主信息管理-财务情况-交易明细列表2.0
export function aflcTradeList(data) {
    return fetch({
      url: '/'+baseurl_four+'/order/aflcOrderPayment/v1/shipperOrderPaymentList',
      method: 'post',
      data:data
    })
  }

//货主信息管理-财务情况-营销信息-优惠金 奖励金列表2.0
export function aflcUserRewardList(data) {
    return fetch({
      url: '/'+baseurl_three+'/usercenter/aflcUserReward/v1/userRewardList',
      method: 'post',
      data:data
    })
  }
//货主信息管理-财务情况-营销信息-优惠劵
export function aflcListCouponTotal(data) {
    return fetch({
      url: '/'+baseurl_tow+'/sm/aflcCouponActivity/v1/listCouponTotal',
      method: 'post',
      data:data
    })
  }

//货主信息管理-财务情况-根据订单号获取优惠券金额
export function aflCouponNum(userId) {
    return fetch({
      url: '/'+baseurl_tow+'/sm/aflcCouponUse/v1/getCouponNumByUserId/'+userId,
      method: 'get',
    })
  }

//货主信息管理-财务情况-获取货主分销奖励统计信息
export function shipperRewardStatisticsInfo(shipperId) {
    return fetch({
      url: '/'+baseurl_tow+'/sm/aflcDistributeReward/v1/shipperRewardStatisticsInfo/'+shipperId,
      method: 'get',
    })
  }

//货主数据管理->货主数据管理表->货主数据增加交易统计
export function transactionTotalList(shipperId) {
    return fetch({
      url: '/'+baseurl_four+'/order/aflcOrder/v1/shipperDateTradeDetail/'+shipperId,
      method: 'get',
    })
  }

//货主数据管理->辅助交易信息 新增黑名单列表
export function shipperBlackDriverList(data) {
    return fetch({
      url: '/'+baseurl_three+'/usercenter/aflcShipperBlackDriver/v1/findShipperBlackDriverList',
      method: 'post',
      data:data
    })
  }

//货主数据管理->辅助交易信息 收发货人历史记录
export function listReceiptOrDelivery(data) {
    return fetch({
      url: '/'+baseurl_four+'/order/aflcOrderAddress/v1/listReceiptOrDelivery',
      method: 'post',
      data:data
    })
  }

//货主数据管理->辅助交易信息 收发货人历史记录
export function shipperOrderSiteInfo(data) {
    return fetch({
      url: '/'+baseurl_three+'/usercenter/aflcShipperOrderSiteInfo/v1/list',
      method: 'post',
      data:data
    })
  }