import fetch from '@/utils/fetch'

const baseurl = 'aflc-sm'
const baseurl_two = 'aflc-order'
// const baseurl_two = 'aflcorderservice-wtc'
const baseurl_three = 'aflc-uc'
// const baseurl_three = 'aflcusercenterservice-wtc'
const baseurl_four = 'aflc-common'

//根据id获取车主信息管理-基本信息
export function detailByManageDriver(driverId) {
  return fetch({
    url: '/' + baseurl_three + '/usercenter/aflcDriver/v1/detailByManageDriver/' + driverId,
    method: 'get',
  })
}

// 手机号修改信息
export function aflcMobileBindHistoryApi(data) {
  return fetch({
    url: '/' + baseurl_three + '/usercenter/aflcMobileBindHistoryApi/v1/list',
    method: 'post',
    data: data
  })
}

// 微信绑定/解绑信息
export function aflcBindWxLog(data) {
  return fetch({
    url: '/' + baseurl_four + '/common/aflcBindWxLog/v1/list',
    method: 'post',
    data: data
  })
}

//权限配置-抽佣权限-车主抽佣权益
export function queryCommission(driverId) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcDriverCommission/v1/queryCommission/' + driverId,
    method: 'get',
  })
}

//辅助交易 - 辅助信息
export function auxiliary(driverId) {
  return fetch({
    url: '/' + baseurl_two + '/dispatch/aflcDriverStatus/v1/auxiliary/' + driverId,
    method: 'get',
  })
}

//辅助交易 - 被货主收藏
export function shipperCollectDriver(driverId) {
  return fetch({
    url: '/' + baseurl_two + '/dispatch/aflcDriverShipper/v1/shipperCollectDriver/' + driverId,
    method: 'get',
  })
}

//辅助交易 - 历史交易货主
export function historyTradeShipper(data) {
  return fetch({
    url: '/' + baseurl_two + '/dispatch/aflcDriverStatus/v1/historyTradeShipper',
    method: 'post',
    data: data
  })
}

// 订单信息-对货主的评价记录
export function orderDriverEvaList(data) {
  return fetch({
    url: '/' + baseurl_two + '/order/aflcOrderEvaluation/v1/orderDriverEvaList',
    method: 'post',
    data: data
  })
}

//订单信息-信息概要-根据id获取车主订单信息概要
export function orderPriceInfo(driverId) {
  return fetch({
    url: '/' + baseurl_two + '/dispatch/aflcDriverStatus/v1/orderPriceInfo/' + driverId,
    method: 'get',
  })
}

//订单信息-抢单信息-根据条件获取车主信息管理订单信息抢单列表
export function grapList(data) {
  return fetch({
    url: '/' + baseurl_two + '/dispatch/aflcOrderGrab/v1/driver/grapList',
    method: 'post',
    data: data
  })
}

// 订单信息-小货车订单
export function driverTradOrdeList(data) {
  return fetch({
    url: '/' + baseurl_two + '/order/aflcOrder/v1/driverTradOrdeList',
    method: 'post',
    data: data
  })
}


//订单信息-取消订单-根据条件获取车主信息管理-订单信息-取消订单
export function driverTradOrdeCancelList(data) {
  return fetch({
    url: '/' + baseurl_two + '/order/aflcOrder/v1/driverTradOrdeCancelList',
    method: 'post',
    data: data
  })
}

//订单信息-改派订单
export function reassignmentDriverList(data) {
  return fetch({
    url: '/' + baseurl_two + '/order/aflcOrder/v1/reassignmentDriverList',
    method: 'post',
    data: data
  })
}

//订单信息-装货/回单图片
export function orderFollowingFileList(data) {
  return fetch({
    url: '/' + baseurl_two + '/order/aflcOrderFollowingFile/v1/orderFollowingFileList',
    method: 'post',
    data: data
  })
}

//车主异常行为-行为分
export function driverBehaviorList(data) {
  return fetch({
    url: '/' + baseurl_three + '/usercenter/aflcBehaviorScoreDetail/v1/driverBehaviorList',
    method: 'post',
    data: data
  })
}

//车主异常行为-保证金
export function DriverDeposit(data) {
  return fetch({
    url: '/' + baseurl_three + '/usercenter/aflcDriverDeposit/v1/list',
    method: 'post',
    data: data
  })
}

//财务信息-财务概况-根据id获取车主信息管理-财务概况
export function findDrivrTrans(driverId) {
  return fetch({
    url: '/' + baseurl_three + '/usercenter/aflcDriver/v1/findDrivrTrans/' + driverId,
    method: 'get',
  }).then(res => {
    let data = res.data
    for (let i in data) {
      data[i] = parseFloat(data[i]) || 0
    }
    res.data = data
    return res
  })
}

//财务信息-财务概况-根据分销奖励-财务概况
export function driverRewardStatisticsInfo(driverId) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcDistributeReward/v1/driverRewardStatisticsInfo/' + driverId,
    method: 'get',
  }).then(res => {
    let data = res.data
    for (let i in data) {
      data[i] = parseFloat(data[i]) || 0
    }
    res.data = data
    return res
  })
}

//财务信息-提现记录-根据条件获取车主信息管理
export function extractCashlist(data) {
  return fetch({
    url: '/' + baseurl_three + '/usercenter/aflcExtractCash/v1/extractCashlist',
    method: 'post',
    data: data
  })
}

//财务信息-银行卡管理表
export function aflcBankCard(data) {
  return fetch({
    url: '/' + baseurl_three + '/usercenter/aflcBankCard/v1/list',
    method: 'post',
    data: data
  })
}


//财务信息-交易记录-根据条件获取车主信息交易明细列表
export function driverOrderPaymentList(data) {
  return fetch({
    url: '/' + baseurl_two + '/order/aflcOrderPayment/v1/driverOrderPaymentList',
    method: 'post',
    data: data
  })
}
//财务信息-交易记录-根据条件获取车主信息交易明细列表
export function driverOrderPaymentList2(data) {
  return fetch({
    url: '/' + baseurl_two + '/order/aflcOrderPayment/v1/driverOrderPaymentList_v2',
    method: 'post',
    data: data
  })
}

//财务信息-营销信息
export function findEquityConfigDriverDto(driverId) {
  return fetch({
    url: '/' + baseurl_three + '/usercenter/aflcDriver/v1/findEquityConfigDriverDto/' + driverId,
    method: 'get',
  })
}

//财务信息-营销信息列表
export function userRewardList(data) {
  return fetch({
    url: '/' + baseurl_three + '/usercenter/aflcUserReward/v1/userRewardList',
    method: 'post',
    data: data
  })
}

//其他信息-绑定货主
export function aflcDriverShipperList(data) {
  return fetch({
    url: '/' + baseurl_two + '/dispatch/aflcDriverShipper/v1/list',
    method: 'post',
    data: data
  })
}


//基本信息-概要信息-根据id获取货主基本信息
export function aflcDriverInfo(driverId) {
  return fetch({
    url: '/' + baseurl_three + '/usercenter/aflcDriver/v1/driverBase/' + driverId,
    method: 'get'
  })
}

// 获取28加速包列表
export function aflcDriverDystropyList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl_two + '/order/aflcDriverDystropy/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// driverId获取车主数据管理-会员权益
export function aflcCoinsGrantDriverDetail(driverId) {
  return fetch({
    url: '/' + baseurl_three + '/usercenter/aflcCoinsGrantDriverDetail/v1/member/' + driverId,
    method: 'get'
  })
}

// 会员历史记录
export function aflcDriverBuyMemberDetailList(data) {
  return fetch({
    url: '/' + baseurl_three + '/usercenter/aflcDriverBuyMemberDetail/v1/list',
    method: 'post',
    data: data
  })
}

// 会员用户权益
export function aflcUserBenefitsDetailList(data) {
  return fetch({
    url: '/' + baseurl_three + '/usercenter/aflcUserBenefitsDetail/v1/list',
    method: 'post',
    data: data
  })
}

// 会员新增用户权益
export function aflcUserBenefitsDetail(data) {
  return fetch({
    url: '/' + baseurl_three + '/usercenter/aflcUserBenefitsDetail/v1/add',
    method: 'post',
    data: data
  })
}

// 购买加速包记录
export function aflcBuyQuickpackageDetailList(data) {
  return fetch({
    url: '/' + baseurl_three + '/usercenter/aflcBuyQuickpackageDetail/v1/list',
    method: 'post',
    data: data
  })
}

// 订单信息-推抢单记录
export function orderPushAndGrabList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl_two + '/dispatch/aflcOrderPush/v1/orderPushAndGrabList',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
