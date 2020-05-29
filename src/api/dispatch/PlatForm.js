import fetch from '@/utils/fetch'

const baseurl = "aflc-order"
// const baseurl = "aflcorderservice"

//获取货主平台绑定列表
export function data_dispatchList(page,pagesize,data) {
    return fetch({
      url: '/'+baseurl+'/dispatch/aflcShipperPlatform/v1/list',
      method: 'post',
      data:{
        "currentPage":page ,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }
  
//启用或禁用
export function data_ChangeStatus(id) {
  return fetch({
  url: '/'+baseurl+'/dispatch/aflcShipperPlatform/v1/enableOrDisable',
  method: 'post',   
  headers: {'Content-Type':'application/json'},
  data: id
  })
}



//新增货主平台绑定
export function data_NewData(data) {
  return fetch({
    url: '/'+baseurl+'/dispatch/aflcShipperPlatform/v1/add',
    method: 'post',
    data:data
  })
}

//修改货主平台绑定
export function data_ChangeData(data) {
  return fetch({
    url: '/'+baseurl+'/dispatch/aflcShipperPlatform/v1/update',
    method: 'put',
    data:data
  })
}

//获取货主列表，可根据模糊查询 search
export function data_findAflcShipperList(data) {
  return fetch({
    url: '/'+baseurl+'/dispatch/aflcShipperPlatform/v1/findAflcShipperList',
    method: 'post',
    data:data
  })
}

//获取平台运营人员列表，可根据模糊查询 search
export function data_findAflcSystemUserList(data) {
  return fetch({
    url: '/'+baseurl+'/dispatch/aflcShipperPlatform/v1/findAflcSystemUserList',
    method: 'post',
    data:data
  })
}
