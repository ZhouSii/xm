import fetch from '@/utils/fetch'

const baseUrl = 'aflc-lcl'

//根据条件获取发物流专线承运商网点列表
export function carrierPointNetworkList(data) {
    return fetch({
      url: '/' + baseUrl + '/lclserver/aflcLclCarrierPointNetwork/v1/list',
      method: 'post',
      data: data
    })
  }

//新增发物流专线承运商网点
export function newCarrierPointNetwork(data) {
    return fetch({
      url: '/' + baseUrl + '/lclserver/aflcLclCarrierPointNetwork/v1/add',
      method: 'post',
      data: data
    })
  }

//根据id修改发物流专线承运商网点
export function updateCarrierPointNetwork(data) {
    return fetch({
      url: '/' + baseUrl + '/lclserver/aflcLclCarrierPointNetwork/v1/update',
      method: 'put',
      data: data
    })
  }

//根据id获取发物流专线承运商网点
export function carrierPointNetworkDetails(id) {
    return fetch({
      url: '/' + baseUrl + '/lclserver/aflcLclCarrierPointNetwork/v1/'+id,
      method: 'get',
    })
  }

//禁用或启用发物流专线承运商网点
export function carrierPointNetworkStatus(data) {
    return fetch({
      url: '/' + baseUrl + '/lclserver/aflcLclCarrierPointNetwork/v1/banOrUse',
      method: 'put',
      data:data
    })
  }

//获取专线承运商网点
export function getCarrierPointNetwork(id) {
    return fetch({
      url: '/' + baseUrl + '/lclserver/aflcLclCarrierPointNetwork/v1/pointNetwork?carrierId='+id,
      method: 'get',
    })
  }

/* 
  发物流物流园
*/

//新增发物流物流园
export function newCompanyPark(data) {
    return fetch({
      url: '/' + baseUrl + '/lclserver/aflcLclCompanyPark/v1/add',
      method: 'post',
      data: data
    })
  }

//获取专线承运商网点
export function getCompanyPark() {
    return fetch({
      url: '/' + baseUrl + '/lclserver/aflcLclCompanyPark/v1/companyPark',
      method: 'get',
    })
  }