import fetch from '@/utils/fetch'
const baseurl = 'aflc-report' // 测试生产接口
// const baseurl = 'aflcreportservice-deng' // 开发接口

// 业务团队组织架构(管理后台)
export function getOrgTree2(data) {
  return fetch({
    url: '/' + baseurl + '/report/aflcbusinessstatisticsdata/v1/orgTree2',
    method: 'post',
    data: data
  })
}

// 查询货主活跃分析数据(管理后台使用)
// 查询车主活跃分析数据(管理后台使用)
// 查询货主成交分析数据(管理后台使用)
export function getViewData(url, data) {
  return fetch({
    url: '/' + baseurl + url,
    method: 'post',
    data: data
  })
}

// 分析数据导出Excel(管理后台使用)
export function getExcel(url, data) {
  return fetch({
    url: '/' + baseurl + url,
    responseType: 'blob',
    method: 'post',
    data: data
  })
}
