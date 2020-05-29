import fetch from '@/utils/fetch'
const baseurl = 'aflc-order'
const baseurl_two = 'aflc-common'

// 获取消息通知管理列表
export function aflcMsgNoticeManagementList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/order/aflcMsgNoticeManagement/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 获取业务区域
export function cityCode(code) {
  return fetch({
    url: '/' + baseurl_two + '/common/aflcCityTree/v1/cityCode/' + code,
    method: 'get'
  })
}

// 消息通知管理新增
export function aflcMsgNoticeManagementCreate(data) {
  return fetch.post('/' + baseurl + '/order/aflcMsgNoticeManagement/v1/add', data)
}

// 修改消息通知管理
export function aflcMsgNoticeManagementupdate(data) {
  return fetch.put('/' + baseurl + '/order/aflcMsgNoticeManagement/v1/update', data)
}

// 删除消息通知管理
export function aflcMsgNoticeManagementDelete(id) {
  return fetch.delete('/' + baseurl + '/order/aflcMsgNoticeManagement/v1/delete/' + id)
}
