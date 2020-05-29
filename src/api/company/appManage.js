import fetch from '@/utils/fetch'
const baseurl = 'aflc-common'
// const baseurl = "aflccommonservice-wtc"

// 获取APP下载表列表
export function data_get_aflcAppDownload_list(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/common/aflcAppDownload/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// APP下载表新增
export function data_get_aflcAppDownload_create(data) {
  return fetch.post('/' + baseurl + '/common/aflcAppDownload/v1/add', data)
}

// APP下载表修改
export function data_get_aflcAppDownload_update(data) {
  return fetch.put('/' + baseurl + '/common/aflcAppDownload/v1/update', data)
}

// 删除APP下载表
export function data_Del_aflcAppDownload(id) {
  return fetch({
    url: '/' + baseurl + '/common/aflcAppDownload/v1/delete/' + id,
    method: 'delete'
  })
}

// id获取APP下载表
export function data_get_aflcAppDownload_Id(id) {
  return fetch.get('/' + baseurl + '/common/aflcAppDownload/v1/' + id)
}
