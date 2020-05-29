import fetch from '@/utils/fetch'

// const baseUrl = 'aflcusercenterservice-xxl'
const baseUrl = 'aflc-uc'
const baseUrl2 = 'aflc-lcl'
// const baseUrl2 = 'aflclclservice-xxl'

//根据条件获取发物流调度区代管理基础信息列表
export function areaAgentSystemList(data) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcLclScheduleAreaAgency/v1/list',
    method: 'post',
    data: data,
  })
}

//新增发物流调度区代管理基础信息
export function newAreaAgentSystem(data) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcLclScheduleAreaAgency/v1/add',
    method: 'post',
    data: data
  })
}

//获取运作线路信息
export function getAgencyLine(areaCode, cityName) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcLclScheduleAreaAgency/v1/agencyLine?areaCode=' + areaCode + '&cityName=' + cityName,
    method: 'get',
  })
}

//根据id修改发物流调度区代管理基础信息
export function reviseAreaAgentSystem(data) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcLclScheduleAreaAgency/v1/update',
    method: 'put',
    data: data
  })
}

//查询区代和街道，线路信息(streetOrLine=>0:为街道，1：为线路，null(空值)为全部)
export function AreaAgentStreetOrLine(lineId, streetOrLine) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcLclScheduleAreaAgency/v1/streetOrLine/' + lineId + '?streetOrLine=' + streetOrLine,
    method: 'get',
  })
}

//更新运作覆盖街道
export function AreaAgentStreet(data) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcLclScheduleAreaAgency/v1/update/street',
    method: 'put',
    data: data
  })
}

//更新运作路线
export function AreaAgentLine(data) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcLclScheduleAreaAgency/v1/update/line',
    method: 'put',
    data: data
  })
}

//根据id修改发物流调度区代管理基础信息
export function batchAreaAgentList(areaCode, city) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcLclScheduleAreaAgency/v1/getEntity/' + areaCode + '?city=' + city,
    method: 'put',
  })
}

//批量更新运作路线
export function batchAreaAgent(data) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcLclScheduleAreaAgency/v1/batchUpdate/line',
    method: 'put',
    data: data
  })
}

/* 
  区代2.1
*/
//根据条件获取发物流区代管理V2.1版本列表
export function areaAgentSystemList2(data) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclScheduleAreaAgencyNewV2/v1/list',
    method: 'post',
    data: data
  })
}

//新增发物流区代管理V2.1版本
export function newAreaAgentSystem2(data) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclScheduleAreaAgencyNewV2/v1/add',
    method: 'post',
    data: data
  })
}

//根据id获取发物流区代管理V2.1版本
export function areaAgentSystemDetails(id) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclScheduleAreaAgencyNewV2/v1/' + id,
    method: 'get',
  })
}

//根据id修改发物流区代管理V2.1版本
export function reviseAreaAgentSystem2(data) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclScheduleAreaAgencyNewV2/v1/update',
    method: 'put',
    data: data
  })
}

//根据areaCode获取发物流区代管理V2.1版本
export function getAreaAgent(areaCode) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclScheduleAreaAgencyNewV2/v1/getAgencyNew?areaCode=' + areaCode,
    method: 'get',
  })
}

//根据公司名companyName称搜索发物流-快递100编码
export function aflcLclExpress100Code(areaCode) {
  return fetch({
    url: '/' + baseUrl2 + '/lcl/aflcLclExpress100Code/v1/companyName?companyName=' + areaCode,
    method: 'get',
  })
}

//批量重置密码
export function resetPassword(data) {
  return fetch({
    url: '/aflc-common/system/user/v1/batchResetPassword',
    method: 'put',
    data: data
  })
}

//新增区代TMS账号 /lclserver/aflcLclScheduleAreaAgencyNewV2/v1/initTms/
export function newAreaAgentTMS(id) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclScheduleAreaAgencyNewV2/v1/initTms/' + id,
    method: 'post',
  })
}
