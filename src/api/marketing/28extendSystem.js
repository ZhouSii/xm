import fetch from '@/utils/fetch'
const baseurl = 'aflc-uc'

// 获取28发放配置列表
export function aflcCoinsSettings(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcCoinsSettings/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 28发放配置列表新增
export function aflcCoinsSettingsAdd(data) {
  return fetch.post('/' + baseurl + '/usercenter/aflcCoinsSettings/v1/add', data)
}
