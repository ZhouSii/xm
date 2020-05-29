import fetch from '@/utils/fetch'

// const baseUrl = 'aflcusercenterservice-xxl'
const baseUrl = 'aflc-lcl'

//根据条件获取发物流-专线承运商列表
export function carriersLineList(data) {
    return fetch({
      url: '/' + baseUrl + '/lclserver/aflcLclDedicatedCarriersLine/v1/list',
      method: 'post',
      data: data
    })
  }

//新增发物流-专线承运商
export function newCarriersLine(data) {
    return fetch({
      url: '/' + baseUrl + '/lclserver/aflcLclDedicatedCarriersLine/v1/add',
      method: 'post',
      data: data
    })
  }

//根据id修改发物流-专线承运商
export function updataCarriersLine(data) {
    return fetch({
      url: '/' + baseUrl + '/lclserver/aflcLclDedicatedCarriersLine/v1/update',
      method: 'put',
      data: data
    })
  }

//根据id获取发物流-专线承运商
export function carriersLineDetails(id) {
    return fetch({
      url: '/' + baseUrl + '/lclserver/aflcLclDedicatedCarriersLine/v1/'+id,
      method: 'get',
    })
  }

//禁用或启用发物流-专线承运商
export function carriersLineStatus(data) {
    return fetch({
      url: '/' + baseUrl + '/lclserver/aflcLclDedicatedCarriersLine/v1/banOrUse',
      method: 'put',
      data:data
    })
  }

//获取专线承运商
export function getCarriersLine() {
    return fetch({
      url: '/' + baseUrl + '/lclserver/aflcLclDedicatedCarriersLine/v1/carriersLine',
      method: 'get',
    })
  }