import fetch from '@/utils/fetch'

const baseurl = 'aflc-sm'
// const baseurl = 'aflcsmservice-wtc'
const baseurl_two = 'aflc-uc'
// const baseurl_two = 'aflcusercenterservice-wtc'
// 获取所有优惠卷列表
export function data_get_listCouponTotal_list(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcCouponActivity/v1/listCouponTotal',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 导出优惠券Excel
export function data_post_exportlistCouponTotalExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcCouponActivity/v1/listCouponTotalExcel',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 获取所有优惠金列表
export function data_shipperRewardList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl_two + '/usercenter/aflcUserReward/v1/shipperRewardList',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 导出优惠金Excel
export function data_post_exportshipperRewardListExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcUserReward/v1/shipperRewardListExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 获取所有奖励金列表
export function data_driverRewardList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl_two + '/usercenter/aflcUserReward/v1/driverRewardList',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 导出奖励金Excel
export function data_post_exportdriverRewardListExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcUserReward/v1/driverRewardListExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
