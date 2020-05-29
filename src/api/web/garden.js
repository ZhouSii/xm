import fetch from '@/utils/fetch'

// /usercenter/aflclogisticspark/v1/list
// 云平台-查询物流园区表分页信息
// const baseUrl = 'aflc-uc'
// const baseUrl1 = 'aflcusercenterservice-huang'
const baseUrl = 'aflc-uc'

export function postList(page, pagesize, data) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflclogisticspark/v1/list',
    method: 'post',
    data: {
      "currentPage": page,
      "pageSize": pagesize,
      "vo": data
    }
  })
}

//usercenter/aflclogisticspark/v1/
// 插入物流园区表信息
export function postAddLogisticspark(data) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflclogisticspark/v1/',
    method: 'post',
    data: data
  })
}

// /usercenter/aflclogisticspark/v1/{id}
// 根据ID修改物流园区表信息
export function putTextedLogisticspark(id,data) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflclogisticspark/v1/' + id,
    method: 'put',
    data: data
  })
}
//usercenter/aflclogisticspark/v1/updateDisableStatus/{id}
// 根据ID启用或禁用物流园
//disableStatus = 0  启用
// disableStatus = 1 禁用

export function putUpdateDisableStatus(disableStatus,ids) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflclogisticspark/v1/updateDisableStatus?disableStatus=' + disableStatus,
    method: 'put',
    data: ids
  })
}
