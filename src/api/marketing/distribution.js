import fetch from '@/utils/fetch'
// const baseurl = 'aflcsmservice-lyw'
const baseurl = 'aflc-sm'
// const baseurl = 'aflcsmservice-wdh'

/* 
  分销奖励配置
*/
// 根据条件获取下单码奖励配置、接单码奖励配置表列表
export function OrderCodeRewordConfigList(data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcOrderRewardSetting/v1/list',
    method: 'post',
    data: data
  })
}

// 新增下单码奖励配置、接单码奖励配置表
export function newOrderCodeRewordConfig(data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcOrderRewardSetting/v1/add',
    method: 'post',
    data: data
  })
}

// 根据id启用或禁用下单码奖励配置、接单码奖励配置
export function OrderCodeRewordConfigStatus(data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcOrderRewardSetting/v1/openOrForbidden',
    method: 'post',
    data: data
  })
}

// 修改下单码奖励配置、接单码奖励配置
export function updateOrderCodeRewordConfig(data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcOrderRewardSetting/v1/update',
    method: 'put',
    data: data
  })
}
/* 
  分销奖励配置-推荐奖励配置
*/
// 根据条件获取推荐新用户注册-认证奖励配置表列表
export function RecommendRewordConfigList(data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcRecommendAwardInfo/v1/list',
    method: 'post',
    data: data
  })
}

// 新增推荐新用户注册-认证奖励配置表
export function newRecommendRewordConfig(data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcRecommendAwardInfo/v1/add',
    method: 'post',
    data: data
  })
}

// 根据id修改推荐新用户注册-认证奖励配置表
export function updateRecommendRewordConfig(data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcRecommendAwardInfo/v1/update',
    method: 'put',
    data: data
  })
}

//根据id启用/禁用推荐新用户注册-认证奖励配置表
export function RecommendRewordConfigStatus(data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcRecommendAwardInfo/v1/openOrForbidden',
    method: 'post',
    data: data
  })
}

// 根据条件获取业务奖励配置列表
export function BusinessRewordConfigList(data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcBusinessRewardSetting/v1/list',
    method: 'post',
    data: data
  })
}

// 新增业务奖励配置
export function newBusinessRewordConfig(data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcBusinessRewardSetting/v1/add',
    method: 'post',
    data: data
  })
}

// 根据id修改业务奖励配置
export function updateBusinessRewordConfig(data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcBusinessRewardSetting/v1/update',
    method: 'put',
    data: data
  })
}

// 根据id启用或禁用业务奖励配置
export function BusinessRewordConfigStatus(data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcBusinessRewardSetting/v1/openOrForbidden',
    method: 'post',
    data: data
  })
}


/* 
  分销支出
*/

//根据条件获取小货车下单码奖励明细列表
export function orderCodeList(data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcOrderRewardDetail/v1/orderCodeList',
    method: 'post',
    data: data
  })
}

//导出小货车下单码奖励明细excel  /sm/aflcOrderRewardDetail/v1/orderCodeListExcel
export function orderCodeListExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcOrderRewardDetail/v1/orderCodeListExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

//根据条件获取发物流下单码奖励明细列表  /sm/aflcOrderRewardDetail/v1/lclOrderCodeList
export function lclOrderCodeList(data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcOrderRewardDetail/v1/lclOrderCodeList',
    method: 'post',
    data: data
  })
}

//导出发物流下单码奖励明细excel  
export function lclOrderCodeListExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcOrderRewardDetail/v1/lclOrderCodeListExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
//根据条件获取接单码奖励明细列表
export function receiveCodeList(data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcOrderRewardDetail/v1/receiveCodeList',
    method: 'post',
    data: data
  })
}

//导出接单码奖励明细excel    /sm/aflcOrderCodeRecommend/v1/receiveCodeListExcel
export function receiveCodeListExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcOrderRewardDetail/v1/receiveCodeListExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 根据条件获取推荐奖励明细列表
export function ExpenditureRecommendRewordList(data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcRecommendRewardDetail/v1/list',
    method: 'post',
    data: data
  })
}

// 推荐奖励明细excel
export function ExpenditureRecommendRewordListExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcRecommendRewardDetail/v1/listExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
//获取推荐小货车货主发货奖励明细
export function ShipperBusinessRewordList(data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcBusinessRewardDetail/v1/shipperList',
    method: 'post',
    data: data
  })
}
//推荐货主业务奖励-小货车excel
export function ShipperBusinessRewordListExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcBusinessRewardDetail/v1/shipperListExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
//获取推荐发物流货主发货奖励明细
export function lclShipperBusinessRewordList(data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcBusinessRewardDetail/v1/lclShipperList',
    method: 'post',
    data: data
  })
}

//推荐货主业务奖励-发物流excel
export function lclShipperBusinessRewordListExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcBusinessRewardDetail/v1/lclShipperListExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
//获取推荐车主发货奖励明细
export function DriverBusinessReword(data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcBusinessRewardDetail/v1/driverList',
    method: 'post',
    data: data
  })
}

// 获取推荐车主发货奖励明细EXCEL   /sm/aflcBusinessRewardDetail/v1/driverListExcel
export function DriverBusinessRewordExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcBusinessRewardDetail/v1/driverListExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

/* 
  分销统计
*/

//根据条件获取小货车订单下单码推荐表列表
export function PlaceOrderCodeTotal(data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcOrderCodeRecommend/v1/orderCodeList',
    method: 'post',
    data: data
  })
}

// 小货车订单下单码推荐列表excel导出 /aflcOrderCodeRecommend/v1/orderCodeListExcel
export function PlaceOrderCodeListExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcOrderCodeRecommend/v1/orderCodeListExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

//根据条件获取发物流订单下单码推荐表列表
export function lclPlaceOrderCodeTotal(data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcOrderCodeRecommend/v1/lclOrderCodeList',
    method: 'post',
    data: data
  })
}

// 发物流订单下单码推荐列表excel导出 /aflcOrderCodeRecommend/v1/orderCodeListExcel
export function PlaceLclOrderCodeListExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcOrderCodeRecommend/v1/lclOrderCodeListExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

//根据条件获取订单接单码推荐表列表
export function OrderTakeTotal(data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcOrderCodeRecommend/v1/receiveCodeList',
    method: 'post',
    data: data
  })
}

//接单码汇总excel /sm/aflcOrderCodeRecommend/v1/receiveCodeListExcel
export function OrderTakeTotalExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcOrderCodeRecommend/v1/receiveCodeListExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

//根据条件获取推荐分享汇总列表
export function RecommendShareTotal(data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcUserRecommendShare/v1/list',
    method: 'post',
    data: data
  })
}

// 推荐分享列表 excel  /sm/aflcUserRecommendShare/v1/listExcel
export function RecommendShareTotalExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcUserRecommendShare/v1/listExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}


//根据条件获取推荐新用户汇总列表
export function RecommendNewUsersTotal(data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcUserRecommender/v1/list',
    method: 'post',
    data: data
  })
}

// 推荐新用户excel   /sm/aflcUserRecommender/v1/listExcel
export function RecommendNewUsersExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcUserRecommender/v1/listExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
//根据条件获取小货车推荐用户订单汇总列表
export function RecommendUsersOrderTotal(data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcOrderRecommend/v1/list',
    method: 'post',
    data: data
  })
}

//小货车推荐用户excel   /sm/aflcOrderRecommend/v1/listExcel
export function RecommendUsersOrderTotalExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcOrderRecommend/v1/listExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
//根据条件获取发物流推荐用户订单汇总列表   /sm/aflcOrderRecommend/v1/lclListExcel
export function lclRecommendUsersOrderTotal(data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcOrderRecommend/v1/lclList',
    method: 'post',
    data: data
  })
}


//发物流推荐用户excel   /sm/aflcOrderRecommend/v1/listExcel
export function lclRecommendUsersOrderTotalExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcOrderRecommend/v1/listExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
