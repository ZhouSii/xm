import fetch from '@/utils/fetch'
const baseurl = 'aflc-market'
// const baseurl = 'aflcmarketservice-wdh'

// 获取营销广告配置列表
export function marketingAdvSettingsList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/market/marketingAdvSettings/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

//禁用广告配置  /market/marketingAdvSettings/v1/disable/
export function marketingAdvSettingsDisable(id) {
  return fetch({
    url: '/' + baseurl + '/market/marketingAdvSettings/v1/disable/' + id,
    method: 'post',
  })
}

//启用广告配置
export function marketingAdvSettingsEnable(id) {
  return fetch({
    url: '/' + baseurl + '/market/marketingAdvSettings/v1/enable/' + id,
    method: 'post',
  })
}

// 新增营销广告配置 /market/marketingAdvSettings/v1/add
export function marketingAdvSettingsAdd(data) {
  return fetch({
    url: '/' + baseurl + '/market/marketingAdvSettings/v1/add',
    method: 'post',
    data: data
  })
}

//修改营销广告配置   /market/marketingAdvSettings/v1/update
export function marketingAdvSettingsUpdate(data) {
  return fetch({
    url: '/' + baseurl + '/market/marketingAdvSettings/v1/update',
    method: 'post',
    data: data
  })
}
