import fetch from '@/utils/fetch'

const baseurl = '/aflc-report'
// const baseurl = '/aflcusercenterservice-deng'

// 获取货主订单分析列表
export function getShippersOrderAnalysisList(data) {
  return fetch({
    url: baseurl + '/report/aflcshipperorderanalysis/v1/list',
    method: 'post',
    data: data
  })
}

// 导出货主订单分析Excel
export function exportShippersOrderAnalysisListExcel(data) {
  return fetch({
    url: baseurl + '/report/aflcshipperorderanalysis/v1/exportExcel',
    responseType: 'blob',
    method: 'post',
    data: data
  })
}
