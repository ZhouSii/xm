import fetch from '@/utils/fetch'

const baseurl = 'aflc-common'
const baseurl_one = 'aflc-order'

// 新增KPI考核
export function aflcAssessmentSettings(data) {
    return fetch({
        url: '/' + baseurl + '/common/aflcAssessmentSettings/v1/add',
        method: 'post',
          data:data
      })
}

// 获取城市KPI考核
export function aflcAssessmentSettings_list(page,pagesize,data) {
    return fetch({
      url: '/' + baseurl + '/common/aflcAssessmentSettings/v1/list',
      method: 'post',
      data:{
        "currentPage": page,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }

// 考核汇总表
export function aflcAssessmentSum_list(page,pagesize,data) {
  return fetch({
    url: '/' + baseurl_one + '/order/aflcOrderAssessmentSum/v1/list',
    method: 'post',
    data:{
      "currentPage": page,
      "pageSize": pagesize,
      "vo": data
    }
  })
}

// 考核汇总流水号
export function findAssessmentByOrderSerial(page,pagesize,data) {
  return fetch({
    url: '/' + baseurl_one + '/order/aflcOrderAssessmentSum/v1/findAssessmentByOrderSerial',
    method: 'post',
    data:{
      "currentPage": page,
      "pageSize": pagesize,
      "vo": data
    }
  })
}
