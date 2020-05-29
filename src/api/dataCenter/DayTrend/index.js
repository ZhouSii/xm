import fetch from '@/utils/fetch'
const baseurl = 'aflc-report'
const baseurl_two = 'aflc-order'
// 订单日趋势表
export function orderStatistics(data) {
  return fetch({
    url: '/' + baseurl + '/report/aflcOrder/v1/orderStatistics',
    method: 'post',
    data
  })
}

// 订单响应时效明细
export function orderResponseAging(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/report/aflcOrder/v1/orderResponseAging',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 订单响应时效明细Excle
export function orderResponseAgingExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/report/aflcOrder/v1/orderResponseAgingExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 货主日趋势表
export function dateTrendTableShipper(data) {
  return fetch({
    url: '/' + baseurl + '/report/shipperSurvey/v1/dateTrendTable',
    method: 'post',
    data
  })
}

// 车主日趋势表
export function dateTrendTableDriver(data) {
  return fetch({
    url: '/' + baseurl + '/report/driverSurvey/v1/dateTrendTable',
    method: 'post',
    data
  })
}
