import fetch from '@/utils/fetch'

// const baseurl = 'aflreportservice'
const baseurl = 'aflc-report'
// const baseurl = "aflcorderservice"

// 货主概况统计
export function DCShipperCount(data) {
  return fetch({
    url: '/' + baseurl + '/report/shipperSurvey/v1/findShipperSurvey',
    method: 'post',
    data: data
  })
}
