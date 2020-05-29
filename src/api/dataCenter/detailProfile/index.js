import fetch from '@/utils/fetch'

const baseurl = 'aflc-report'
// const baseurl = 'aflcusercenterservice-xmy'

// 货主下单总况报表
export function data_post_findShipperOrderDevelSurveyList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/report/shipperSurvey/v1/findShipperOrderDevelSurveyList',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 导出货主下单总况Excel
export function data_post_exportShipperOrderDevelSurveyExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/report/shipperSurvey/v1/exportShipperOrderDevelSurveyExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 货主发展订单报表
export function data_post_findSalesmanShipperDevelSurveyList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/report/shipperSurvey/v1/findSalesmanShipperDevelSurveyList',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 导出货主发展订单Excel
export function data_post_exportSalesmanShipperDevelSurveyExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/report/shipperSurvey/v1/exportSalesmanShipperDevelSurveyExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 车主下单总况报表
export function data_post_findDriverOrderDevelSurveyList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/report/driverSurvey/v1/findDriverOrderDevelSurveyList',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
// 导出车主下单总况Excel
export function data_post_exportDriverOrderDevelSurveyExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/report/driverSurvey/v1/exportDriverOrderDevelSurveyExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 车主发展订单报表
export function data_post_findSalesmanDriverDevelSurveyList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/report/driverSurvey/v1/findSalesmanDriverDevelSurveyList',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

  // 导出车主发展订单Excel
export function data_post_exportSalesmanDriverDevelSurveyExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/report/driverSurvey/v1/exportSalesmanDriverDevelSurveyExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
// 业务员订单报表
export function data_post_findSalesmanOrderDevelSurveyList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/report/userData/v1/findSalesmanOrderDevelSurveyList',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 业务员订单Excel
export function data_post_exportSalesmanOrderDevelSurveyExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/report/userData/v1/exportSalesmanOrderDevelSurveyExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
