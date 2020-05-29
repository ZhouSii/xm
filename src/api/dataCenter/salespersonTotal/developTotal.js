import fetch from '@/utils/fetch'

const baseurl = 'aflc-report'
// const baseurl = 'aflcreportservice-xmy'

// 获取业务员发展报表
export function data_post_findBusinessDevelopCaseList(data) {
  return fetch.post('/' + baseurl + '/report/userData/v1/findBusinessDevelopCaseList', data)
}

// 导出业务员发展报表
export function data_post_exportBusinessDevelopCaseExcel(data) {
  return fetch({
    url: '/' + baseurl + '/report/userData/v1/exportBusinessDevelopCaseExcel',
    responseType: 'blob',
    method: 'post',
    data: data
  })
}

// 获取业务员提成报表
export function data_post_findSalesmanNamePercentageList(data) {
  return fetch.post('/' + baseurl + '/report/userData/v1/findSalesmanNamePercentageList', data)
}

//获取业务员发展车主数列表 /report/driverSurvey/v1/findSalesmanDriverDevelopDetailList
export function findSalesmanDriverDevelopDetailList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/report/driverSurvey/v1/findSalesmanDriverDevelopDetailList',
    method: 'post',
    data: {
      "currentPage": page,
      "pageSize": pagesize,
      "vo": data
    }
  })
}

//获取业务员发展货主数列表 /report/shipperSurvey/v1/findShipperSalesmanSurveyDetailList
export function findSalesmanShipperDevelopDetailList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/report/shipperSurvey/v1/findSalesmanShipperDevelopDetailList',
    method: 'post',
    data: {
      "currentPage": page,
      "pageSize": pagesize,
      "vo": data
    }
  })
}

//获取业务员发展货主在线订单交易数列表 /report/shipperSurvey/v1/findSalesmanShipperOrderDevelopDetailList
export function findSalesmanShipperOrderDevelopDetailList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/report/shipperSurvey/v1/findSalesmanShipperOrderDevelopDetailList',
    method: 'post',
    data: {
      "currentPage": page,
      "pageSize": pagesize,
      "vo": data
    }
  })
}
