import fetch from '@/utils/fetch'
const baseurl = 'aflc-report'
// const baseurl = 'aflcreportservice-deng'

// 导出团队考核表
export function exportGroupDataExcel(data) {
  return fetch({
    url: '/' + baseurl + '/report/aflcsalesmanperformance/v1/exportGroupDataExcel',
    responseType: 'blob',
    method: 'post',
    data
  })
}
// 获取团队考核表
export function viewGroupData(data) {
  return fetch({
    url: '/' + baseurl + '/report/aflcsalesmanperformance/v1/viewGroupData',
    method: 'post',
    data
  })
}
// 导出个人考核表
export function exportGroupMemberDataExcel(data) {
  return fetch({
    url: '/' + baseurl + '/report/aflcsalesmanperformance/v1/exportGroupMemberDataExcel',
    responseType: 'blob',
    method: 'post',
    data
  })
}
// 获取个人考核表
export function viewGroupMemberData(data) {
  return fetch({
    url: '/' + baseurl + '/report/aflcsalesmanperformance/v1/viewGroupMemberData',
    method: 'post',
    data
  })
}
// 获取考核规则配置
export function getViewSetting(data) {
  return fetch({
    url: '/' + baseurl + '/report/aflcsalesmanperformance/v1/viewSetting',
    method: 'post',
    data
  })
}
//添加考核规则配置
export function addSetting(data) {
  return fetch({
    url: '/' + baseurl + '/report/aflcsalesmanperformance/v1/addSetting',
    method: 'post',
    data
  })
}
//修改考核规则配置
export function updateSetting(data) {
  return fetch({
    url: '/' + baseurl + '/report/aflcsalesmanperformance/v1/updateSetting',
    method: 'post',
    data
  })
}
//删除考核规则配置
export function deleteSetting(data) {
  return fetch({
    url: '/' + baseurl + '/report/aflcsalesmanperformance/v1/deleteSetting',
    method: 'post',
    data
  })
}
