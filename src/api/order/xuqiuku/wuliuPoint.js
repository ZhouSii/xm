import fetch from '@/utils/fetch'

const baseUrl = 'aflc-uc' ;

  //新增物流公司网点
export function NewPointNetwork(data){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcPointNetwork/v1/add',
      method: 'post',
      data:data
    })
  }


//更改物流公司网点
export function changePointNetwork(data){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcPointNetwork/v1/update',
      method: 'PUT',
      data:data
    })
  }
//根据条件获取物流公司网点列表
export function getPointNetwork(page,pagesize,data){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcPointNetwork/v1/getAflcPointNetworklist',
      method: 'post',
      data:{
        "currentPage": page,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }


//更改物流公司网点状态
export function PointNetworkStatus(id){
    return fetch({
      url: '/aflcusercenterservice/usercenter/aflcPointNetwork/v1/updateAflcPointNetworkStatus/'+id,
      method: 'PUT',
    })
  }

  //删除物流公司网点列表
export function deletePointNetwork(id){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcPointNetwork/v1/delete/'+id,
      method: 'DELETE',
    })
  }

  
  
