import fetch from '@/utils/fetch'
const baseurl = 'aflc-lcl' // 测试生产接口
// const baseurl = 'aflclclservice-deng' // 开发接口

// 发物流–区代中转单管理–全部
export function getAll(data) {
  return fetch({
    url: '/' + baseurl + '/lcl/waybillOutsource/platform/list/all',
    method: 'post',
    data: data
  })
}

// 发物流–区代中转单管理–区代中转失败
export function getFail(data) {
  return fetch({
    url: '/' + baseurl + '/lcl/waybillOutsource/platform/list/fail',
    method: 'post',
    data: data
  })
}

// 发物流–区代中转单管理–专线超时未揽货
export function getTimeOut(data) {
  return fetch({
    url: '/' + baseurl + '/lcl/waybillOutsource/platform/list/timeout',
    method: 'post',
    data: data
  })
}

// 发物流–区代中转单管理–导出中转失败运单
export function exportFailListExcel(data) {
  return fetch({
    url: '/' + baseurl + '/lcl/waybillOutsource/platform/exportFailListExcel',
    responseType: 'blob',
    method: 'post',
    data: data
  })
}

// 发物流–区代中转单管理–导出全部
export function exportListExcel(data) {
  return fetch({
    url: '/' + baseurl + '/lcl/waybillOutsource/platform/exportListExcel',
    responseType: 'blob',
    method: 'post',
    data: data
  })
}

