import fetch from '@/utils/fetch'

const baseurl = 'aflc-uc'
// const baseurl = 'aflcusercenterservice-wtc'
const baseurl2 = 'aflc-sm'
// const baseurl2 = 'aflcsmservice-wtc'
const baseur_three = 'aflc-order'
// const baseur_three = 'aflcorderservice-wtc' 
const baseurl4='aflc-lcl'
/**
 * 拥抽
 *
 */
// export function postDriverCommissionTransaction(params) {
//   return fetch.post('/aflcusercenterservice_wtc/usercenter/aflcDriverCommissionDetail/v1/driverCommissionTransaction', params).then(res => {
//     return res.data || {}
//   })
// }

export function postDriverCommissionTransaction(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcDriverCommissionDetail/v1/driverCommissionTransaction',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
/**
 * 导出接口
 * @param {*} page
 * @param {*} pagesize
 * @param {*} data
 */
// export function postCommissionTransactionExcel(page, pagesize, data) {
//   return fetch({
//     responseType: 'blob',
//     url: '/' + baseurl + '/usercenter/aflcDriverCommissionDetail/v1/commissionTransactionExcel',
//     method: 'post',
//     data: {
//       'currentPage': page,
//       'pageSize': pagesize,
//       'vo': data
//     }
//   })
// }

/**
 * 奖励金
 */
export function postUserRewardDriverTransaction(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcUserReward/v1/userRewardDriverTransaction',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
/**
 * 优惠金
 */
export function postUserRewardShipperTransaction(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcUserReward/v1/userRewardShipperTransaction',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
/**
 * 优惠
 */
export function postCouponTransaction(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl2 + '/sm/aflcCouponUse/v1/couponTransaction',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
 /**
 * 达量
 */
export function postDriverOrderNumTransaction(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl2 + '/sm/aflcDriverOrdernumDetail/v1/driverOrderNumTransaction',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

 /**
 * 货物保障
 */
export function aflcOrderGoodsInsure(page, pagesize, data) {
  return fetch({
    url: '/' + baseur_three + '/order/aflcOrderGoodsInsure/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 发物流平台分润 aflc-lcl/lcl/aflcLclPlatformBillProfit/v1/list
export function aflcLclPlatformBillProfit(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl4 + '/lcl/aflcLclPlatformBillProfit/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 抽佣excel导出
export function commissionTransactionExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcDriverCommissionDetail/v1/commissionTransactionExcel',
    method: 'post',
    responseType: 'blob',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 优惠卷excel导出
export function couponTransactionExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl2 + '/sm/aflcCouponUse/v1/couponTransactionExcel',
    method: 'post',
    responseType: 'blob',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 优惠金excel导出
export function userRewardShipperTransactionExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcUserReward/v1/userRewardShipperTransactionExcel',
    method: 'post',
    responseType: 'blob',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 奖励金excel导出
export function userRewardDriverTransactionExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcUserReward/v1/userRewardDriverTransactionExcel',
    method: 'post',
    responseType: 'blob',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 达量奖励excel导出
export function driverOrderTransactionExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl2 + '/sm/aflcDriverOrdernumDetail/v1/driverOrderTransactionExcel',
    method: 'post',
    responseType: 'blob',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 货物保障excel导出
export function aflcOrderGoodsInsureExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseur_three + '/order/aflcOrderGoodsInsure/v1/listExcel',
    method: 'post',
    responseType: 'blob',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

