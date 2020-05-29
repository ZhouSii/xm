import fetch from '@/utils/fetch'

// const baseurl = 'aflcusercenterservice-deng'
const baseurl = 'aflc-market'

// 消息中心–添加自定义消息
export function addCustomMessage(data) {
  return fetch({
    url: '/' + baseurl + '/market/aflccustommessage/v1/add',
    method: 'post',
    data: data
  })
}

// 消息中心–自定义消息列表
export function getCustomMessage(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/market/aflccustommessage/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 消息中心–消息推送记录列表
export function getRecords(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/market/aflccustommessage/v1/records',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
