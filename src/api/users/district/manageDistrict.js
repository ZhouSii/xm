import fetch from '@/utils/fetch'

const baseurl = "aflc-uc"
// const baseurl = "aflcusercenterservice-xxl"


//获取区代管理列表
export function data_get_aflcPartner_list(page,pagesize,data) {
    return fetch({
      url: '/'+baseurl+'/usercenter/aflcPartner/v1/list',
      method: 'post',
      data:{
        "currentPage": page,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }

    //区代管理列表新增
export function data_get_aflcPartner_create(data) {
    return fetch.post('/' + baseurl + '/usercenter/aflcPartner/v1/add', data)
  }

//删除区代管理列表
export function data_Del_aflcPartner(id) {

  return fetch({
        url: '/'+baseurl+'/usercenter/aflcPartner/v1/delete/'+id,
        method: 'delete',
      })
    }

//启用禁用区代管理列表
export function data_Able_aflcPartner(ids) {
  return fetch({
           url: '/'+baseurl+'/usercenter/aflcPartner/v1/enableOrDisable',
           method: 'post',
           data:ids
         })
       }    

//  修改区代管理列表
export function data_get_aflcPartner_update(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcPartner/v1/update', data)
}      


 //id区代管理列表
 export function data_get_aflcPartner_Id(id) {
  return fetch({
    url: '/'+baseurl+'/usercenter/aflcPartner/v1/'+ id,
    method: 'get',
  })
}


 //根据公司名称获取已认证的物流公司
 export function data_get_aflcPartner_findAuthCompany(page,pagesize,data){
  return fetch({
    url: '/'+baseurl+'/usercenter/aflcLogisticsCompany/v1/findAuthCompany',
    method: 'post',
    data:{
      "currentPage": page,
      "pageSize": pagesize,
      "vo": data
    }
  })
}

