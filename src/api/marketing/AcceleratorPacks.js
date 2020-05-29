import fetch from '@/utils/fetch'
const baseurl = 'aflc-uc'

// 获取28加速包列表
export function aflcQuickpackageSettings(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcQuickpackageSettings/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 28加速包列表新增
export function aflcQuickpackageSettingsAdd(data) {
  return fetch.post('/' + baseurl + '/usercenter/aflcQuickpackageSettings/v1/add', data)
}

// 28加速包单条数据
export function aflcQuickpackageSettings_id(id) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcQuickpackageSettings/v1/' + id,
    method: 'get'
  })
}

//  28加速包修改
export function aflcQuickpackageSettingsEdit(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcQuickpackageSettings/v1/update', data)
}
