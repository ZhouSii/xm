import fetch from '@/utils/fetch'

const baseurl = 'aflc-uc' // 157环境
// const baseurl = 'aflcusercenterservice-deng' // 开发环境

// 货主拜访任务列表
export function platformList(data) {
  return fetch({
    url: '/' + baseurl + `/usercenter/aflcvisitshippertask/v1/platform/list`,
    method: 'post',
    data: data
  })
}
// 修改货主拜访任务
export function platformUpdate(data) {
  return fetch({
    url: '/' + baseurl + `/usercenter/aflcvisitshippertask/v1/platform/update`,
    method: 'post',
    data: data
  })
}
// 添加货主拜访任务
export function platformAdd(data) {
  return fetch({
    url: '/' + baseurl + `/usercenter/aflcvisitshippertask/v1/platform/add`,
    method: 'post',
    data: data
  })
}
// 手机号获取货主信息
export function checkShipper(data) {
  return fetch({
    url: '/' + baseurl + `/usercenter/aflcvisitshippertask/v1/platform/checkShipper`,
    method: 'get',
    params: data
  })
}
// 删除拜访任务货主
export function deleteDetail(data, taskId) {
  return fetch({
    url: '/' + baseurl + `/usercenter/aflcvisitshippertask/v1/platform/deleteDetail?taskId=${taskId}`,
    method: 'post',
    data: data
  })
}

// 货主拜访任务详情部分
// 获取任务详情,修改也需调用
export function platformId(id) {
  return fetch({
    url: '/' + baseurl + `/usercenter/aflcvisitshippertask/v1/platform/${id}`,
    method: 'get'
  })
}
// 客户列表，拜访详情，优惠券发放详情
export function platformShippersList(data) {
  return fetch({
    url: '/' + baseurl + `/usercenter/aflcvisitshippertask/v1/platform/shippers`,
    method: 'post',
    data: data
  })
}
// 导出客户列表
export function exportVisitShipperExcel(data) {
  return fetch({
    url: '/' + baseurl + `/usercenter/aflcvisitshippertask/v1/platform/exportVisitShipperExcel`,
    method: 'post',
    responseType: 'blob',
    data: data
  })
}
// 获取拜访记录详情
export function deleteId(id) {
  return fetch({
    url: '/' + baseurl + `/usercenter/aflcvisitshippertask/v1/platform/detail/${id}`,
    method: 'get'
  })
}
// 拜访任务执行结果列表
export function visitResult(data) {
  return fetch({
    url: '/' + baseurl + `/usercenter/aflcvisitshippertask/v1/platform/visitResult`,
    method: 'post',
    data: data
  })
}
// 导出拜访任务执行结果
export function exportVisitResultExcel(data) {
  return fetch({
    url: '/' + baseurl + `/usercenter/aflcvisitshippertask/v1/platform/exportVisitResultExcel`,
    method: 'post',
    responseType: 'blob',
    data: data
  })
}

