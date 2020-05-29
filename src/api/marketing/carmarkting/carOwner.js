import fetch from '@/utils/fetch'

const baseurl = "aflc-sm"
// const baseurl = "aflcsmservice-wtc"

//获取车主奖励列表
export function data_get_ownerFromsame_list(page,pagesize,data) {
    return fetch({
      url: '/'+baseurl+'/sm/aflcDriverOrderamountReward/v1/list',
      method: 'post',
      data:{
        "currentPage": page,
        "pageSize": pagesize,
        "vo": data
      }
    })   
  }
    
//删除车主奖励列表
export function data_Del_ownerFromsame(id) {

    return fetch({
          url: '/'+baseurl+'/sm/aflcDriverOrderamountReward/v1/delete/'+id,
          method: 'delete',
        })
      }
//启用禁用车主奖励列表
export function data_Able_ownerFromsame(ids) {
    return fetch({
              url: '/'+baseurl+'/sm/aflcDriverOrderamountReward/v1/enableOrDisable',
              method: 'post',
              data:ids
            })
          }
    
//  修改车主奖励列表
export function data_get_ownerFromsame_update(data) {
      return fetch.put('/' + baseurl + '/sm/aflcDriverOrderamountReward/v1/updateNew', data)
    }      


//车主奖励列表新增2
export function data_get_ownerFromsame_createNew(data) {
  return fetch.post('/' + baseurl + '/sm/aflcDriverOrderamountReward/v1/addNew', data)
}


 //id车主订单金额奖励
export function data_get_mainDetail(id) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcDriverOrderamountReward/v1/mainDetail/' + id,
    method: 'get',
  })
}