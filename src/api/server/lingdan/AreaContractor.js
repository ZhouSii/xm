
import fetch from '@/utils/fetch'
// const baseUrl = 'aflcusercenterservice'
const baseUrl = 'aflc-uc'

// 获取区域承办商列表
export function aflcAreaCarrier_List(page,pagesize,data){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcAreaCarrier/v1/list',
      method: 'post',
      data:{
        "currentPage":page,
        "pageSize": pagesize,
        "vo": data
      }
    })
}

// 新增区域承办商列表
export function aflcTradeAreaTrade_Add(data){
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcAreaCarrier/v1/add',
    method: 'post',
    data: data
  })
}

//修改区域承办商列表
export function aflcTradeAreaTrade_Update(data){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcAreaCarrier/v1/update',
      method: 'put',
      data:data
    })
  }

  //删除区域承办商
  export function data_Del_aflcAreaCarrier(id) {
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcAreaCarrier/v1/delete/'+id,
      method: 'delete',
    })
  }

  //id获取马甲单源表
export function data_get_aflcAreaCarrier_Id(id) {
  return fetch.get('/' + baseUrl+'/usercenter/aflcAreaCarrier/v1/' + id)
}