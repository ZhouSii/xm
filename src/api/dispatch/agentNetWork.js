import fetch from '@/utils/fetch'

// const baseUrl = 'aflcusercenterservice-xxl'
const baseUrl = 'aflc-lcl'

//新增发物流专线区代网点
export function agentNetWorkAdd(data) {
    return fetch({
      url: '/' + baseUrl + '/lclserver/aflcLclAgencyPointNetwork/v1/add',
      method: 'post',
      data: data
    })
  }

//根据条件获取发物流专线区代网点列表
export function agentNetWorkList(data) {
    return fetch({
      url: '/' + baseUrl + '/lclserver/aflcLclAgencyPointNetwork/v1/list',
      method: 'post',
      data: data
    })
  }

//根据id获取发物流专线区代网点
export function agentNetWorkDetails(netId) {
    return fetch({
      url: '/' + baseUrl + '/lclserver/aflcLclAgencyPointNetwork/v1/'+netId,
      method: 'get',
    })
  }

//根据id修改发物流专线区代网点
export function agentNetWorkUpdata(data) {
    return fetch({
      url: '/' + baseUrl + '/lclserver/aflcLclAgencyPointNetwork/v1/update',
      method: 'put',
      data: data
    })
  }

//根据id删除发物流专线区代网点
export function agentNetWorkDelete(netId) {
    return fetch({
      url: '/' + baseUrl + '/lclserver/aflcLclAgencyPointNetwork/v1/delete/'+netId,
      method: 'DELETE',
    })
  }