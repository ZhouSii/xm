import fetch from '@/utils/fetch'
const baseurl = 'aflc-report'
const baseurl_two = 'aflc-order'
// const baseurl = 'aflcusercenterservice-xmy'
// 车主排行
export function findDriverOrderSortList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/report/driverSurvey/v1/findDriverOrderSortList',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 货主排行
export function findShipperOrderSortList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/report/shipperSurvey/v1/findShipperOrderSortList',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 订单费用明细汇总
export function orderExpenseSummary(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/report/aflcOrder/v1/orderExpenseSummary',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 车主排行Excel
export function exportDriverOrderSortExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/report/driverSurvey/v1/exportDriverOrderSortExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 货主主排行Excel
export function exportShipperOrderSortExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/report/shipperSurvey/v1/exportShipperOrderSortExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 订单费用明细汇总Excel
export function orderExpenseSummaryExcel(data) {
  return fetch({
    url: '/' + baseurl + '/report/aflcOrder/v1/orderExpenseSummaryExcel',
    responseType: 'blob',
    method: 'post',
    data: data
  })
}
