import fetch from '@/utils/fetch'

const baseUrl = 'aflc-uc'

//WEB端专线列表
export function getTransportRangeList(page,pagesize,data){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcTransportRange/v1/listWebAflcTransportRange',
      method: 'post',
      data:{
        "currentPage": page,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }

  //WEB端获取专线
export function getWebAflcTransportRange(id){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcTransportRange/v1/getWebAflcTransportRange/'+id,
      method: 'get',
    })
  }


  //WEB端创建专线
export function createWebTransport(data){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcTransportRange/v1/createWebAflcTransportRange',
      method: 'post',
      data:data
    })
  }

//WEB端修改专线
export function updateWebAflcTransportRange(data){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcTransportRange/v1/updateWebAflcTransportRange',
      method: 'post',
      data:data
    })
  }

  
//WEB端删除专线
export function deleteWebAflcTransportRange(data){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcTransportRange/v1/deleteBatch',
      method: 'DELETE',
      data:data
    })
  }





//根据id修改物流专线
export function changeTransportRange(data){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcTransportRange/v1/update',
      method: 'put',
      data:data
    })
  }


  //更改物流公司网点状态
export function TransportRangeStatus(id){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcTransportRange/v1/updateAflcTransportRangeStatus/'+id,
      method: 'PUT',
    })
  }


  //更改物流公司网点状态
export function deleteTransportRange(id){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcTransportRange/v1/delete/'+id,
      method: 'delete',
    })
  }