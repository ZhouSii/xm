import fetch from '@/utils/fetch'
const baseurl = 'aflc-uc'

// 获取营销活动管理列表
export function aflcMarketingActivityManagement_list(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcMarketingActivityManagement/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
// 营销活动管理新增
export function aflcCouponGetActivityCreate(data) {
  return fetch.post('/' + baseurl + '/usercenter/aflcMarketingActivityManagement/v1/add', data)
}

// 修改营销活动管理
export function aflcCouponGetActivityupdate(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcMarketingActivityManagement/v1/update', data)
}

 // 获取营销活动管理ID
export function aflcMarketingActivityManagement_Id(id) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcMarketingActivityManagement/v1/' + id,
    method: 'get'
  })
}

// 获取短信模板列表
export function aflcSmsTemplate_list(page, pagesize, data) {
    return fetch({
      url: '/' + baseurl + '/usercenter/aflcSmsTemplate/v1/list',
      method: 'post',
      data: {
        'currentPage': page,
        'pageSize': pagesize,
        'vo': data
      }
    })
}

// 短信模板列表新增
export function aflcSmsTemplateCreate(data) {
  return fetch.post('/' + baseurl + '/usercenter/aflcSmsTemplate/v1/add', data)
}

// 短信模板列表修改
export function aflcSmsTemplateupdate(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcSmsTemplate/v1/update', data)
}

// 短信模板列表ID
export function aflcSmsTemplate_Id(id) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcSmsTemplate/v1/' + id,
    method: 'get'
  })
}

// 获取营销数据列表
export function aflcMarketingActivityData_list(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcMarketingActivityData/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 获取营销数据列表Excle
export function aflcMarketingActivityDataExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcMarketingActivityData/v1/exportExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}