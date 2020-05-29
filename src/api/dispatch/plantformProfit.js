import fetch from '@/utils/fetch'

// const baseUrl = 'aflcusercenterservice-xxl'
const baseUrl = 'aflc-lcl'

/**
 * 平台区代分润规则
 * @export
 * @param {*} data
 * @returns
 */

//根据条件获取发物流平台区代分润规则列表
export function agencyConfigList(data) {
    return fetch({
      url: '/' + baseUrl + '/lclserver/aflcLclPlatformProfitAreaAgency/v1/list',
      method: 'post',
      data: data
    })
  }

//新增发物流平台区代分润规则
export function newAgencyConfig(data) {
    return fetch({
      url: '/' + baseUrl + '/lclserver/aflcLclPlatformProfitAreaAgency/v1/add',
      method: 'post',
      data: data
    })
  }

//根据id获取发物流平台区代分润规则
export function agencyConfigDetails(id) {
    return fetch({
      url: '/' + baseUrl + '/lclserver/aflcLclPlatformProfitAreaAgency/v1/'+id,
      method: 'get',
    })
  }

//根据id修改发物流平台区代分润规则
export function updataAgencyConfig(data) {
    return fetch({
      url: '/' + baseUrl + '/lclserver/aflcLclPlatformProfitAreaAgency/v1/update',
      method: 'put',
      data: data
    })
  }

//根据id禁用发物流平台区代分润规则
export function agencyConfigStatus(data) {
    return fetch({
      url: '/' + baseUrl + '/lclserver/aflcLclPlatformProfitAreaAgency/v1/banOrUse',
      method: 'post',
      data: data
    })
  }

/**
 * 平台区代分润规则
 * @export
 * @param {*} data
 * @returns
 */

//根据条件获取发物流平台区代分润规则列表
export function regionConfigList(data) {
    return fetch({
      url: '/' + baseUrl + '/lclserver/aflcLclPlatformProfitRegion/v1/list',
      method: 'post',
      data: data
    })
  }

//新增发物流平台区域分润规则
export function newRegionConfig(data) {
    return fetch({
      url: '/' + baseUrl + '/lclserver/aflcLclPlatformProfitRegion/v1/add',
      method: 'post',
      data: data
    })
  }

//根据id修改发物流平台区域分润规则
export function updataRegionConfig(data) {
    return fetch({
      url: '/' + baseUrl + '/lclserver/aflcLclPlatformProfitRegion/v1/update',
      method: 'put',
      data: data
    })
  }

//根据id获取发物流平台区域分润规则
export function regionConfigDetails(id) {
    return fetch({
      url: '/' + baseUrl + '/lclserver/aflcLclPlatformProfitRegion/v1/'+id,
      method: 'get',
    })
  }

//根据id禁用发物流平台区代分润规则
export function regionConfigStatus(data) {
    return fetch({
      url: '/' + baseUrl + '/lclserver/aflcLclPlatformProfitRegion/v1/banOrUse',
      method: 'post',
      data: data
    })
  }
