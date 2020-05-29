import fetch from '@/utils/fetch'

// const baseurl_two = "aflcsmservice"
const baseurl_one= "aflc-sm"

//获取马甲推单列表
export function data_get_onesource_list(page,pagesize,data) {
    return fetch({
      url: '/'+baseurl_one+'/sm/aflcVestUnisource/v1/list',
      method: 'post',
      data:{
        "currentPage": page,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }

//增加马甲推单
export function data_add_onesource_list(data) {
  return fetch.post('/' + baseurl_one + '/sm/aflcVestUnisource/v1/add', data)
}
  
  //删除马甲推单
  export function data_Del_onesource(id) {
    return fetch({
      url: '/'+baseurl_one+'/sm/aflcVestUnisource/v1/delete/'+id,
      method: 'delete',
    })
  }

     //启用禁用
  export function data_UseStates_onesource(ids) {
      return fetch({
        url: '/'+baseurl_one+'/sm/aflcVestUnisource/v1/enableOrDisable',
        method: 'post',
        data:ids
      })
    }

  //删除马甲单源地址推单
  export function data_Del_onesourceAddress(id) {
    return fetch({
      url: '/'+baseurl_one+'/sm/aflcVestUnisourceAddress/v1/delete/'+id,
      method: 'delete',
    })
  }

    //获取马甲单源地址
export function data_get_onesourceAddress_list(page,pagesize,data) {
  return fetch({
    url: '/'+baseurl_one+'/sm/aflcVestUnisourceAddress/v1/list',
    method: 'post',
    data:{
      "currentPage": page,
      "pageSize": pagesize,
      "vo": data
    }
  })
}
//id获取马甲单源表
export function data_get_aflcVestUnisource_Id(id) {
  return fetch.get('/' + baseurl_one+'/sm/aflcVestUnisource/v1/' + id)

}

//id获取马甲单源表
       export function data_get_onesource_Id(id) {
        return fetch.get('/' + baseurl_one+'/sm/aflcVestUnisource/v1/getVestUnisourceAddresslist?'+'id=' + id)

      }

//  修改马甲单源表
export function data_get_onesource_update(data) {
  return fetch.put('/' + baseurl_one + '/sm/aflcVestUnisource/v1/update', data)
}      


//  新增马甲单源地址表
export function data_get_onesource_addDetailAddress(data) {
  return fetch.post('/' + baseurl_one + '/sm/aflcVestUnisource/v1/addDetailAddress', data)
}      