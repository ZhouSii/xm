import fetch from '@/utils/fetch'

const baseurl = 'aflc-uc'
// const baseurl = 'aflcusercenterservice-xmy'

//根据条件获取车源信息列表
export function getCarInfolist(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcFLCCarInfoWeb/v1/getCarInfolist',
    method: 'post',
    data: data
  })
}

//根据id获取车源信息
export function vehicleSourceDetails(sourceId) {
    return fetch({
      url: '/' + baseurl + '/usercenter/aflcFLCCarInfoWeb/v1/getDetails/' + sourceId,
      method: 'get'
    })
  }

//根据车源id获取客服备注列表
export function vehicleSourceRemarks(sourceId) {
    return fetch({
      url: '/' + baseurl + '/usercenter/aflcFLCCarInfoWeb/v1/getCarInfoCustsvcListByCarInfoId/' + sourceId,
      method: 'get'
    })
  }

//新增客服备注
export function addCustsvcRemark(data) {
    return fetch({
        url: '/' + baseurl + '/usercenter/aflcFLCCarInfoWeb/v1/addCustsvcRemark',
        method: 'post',
        data: data
    })
  }

//设置启用
export function setEnableType(vehicleID,status) {
    return fetch({
        url: '/' + baseurl + '/usercenter/aflcFLCCarInfoWeb/v1/setEnableType/'+vehicleID+'/'+status,
        method: 'PUT',
    })
  }
