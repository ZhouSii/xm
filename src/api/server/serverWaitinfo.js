import fetch from '@/utils/fetch'

const baseurl = "aflc-sm"

//根据id获取服务区域定价  he  查询功能(初始化)
export function data_GetCityInfo(page,pagesize,data) {
    return fetch({
      url: '/'+baseurl+'/sm/aflcWaitPrice/v1/list',
      method: 'post',
      data:{
        "currentPage":page ,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }

//更改状态
export function data_ChangeStatus(id) {
  return fetch({
  url: '/'+baseurl+'/sm/aflcWaitPrice/v1/openOrForbidden',
  method: 'post',
  data: id
  })
}

//删除服务区域定价
export function data_Delete(id) {
  return fetch({
    url: '/'+baseurl+'/sm/aflcAreaPrice/v1/delete/',
    method: 'post',
    data:id
  })
}


//删除数据
export function data_DeletInfo(id) {
  return fetch({
  url: '/'+baseurl+'/sm/aflcWaitPrice/v1/delete',
  method: 'post',
  data: id
  })
}


//新增和修改
export function data_NewOrChange(data) {
  return fetch({
    url: '/'+baseurl+'/sm/aflcWaitPrice/v1/add',
    method: 'post',
    data:data
  })
}



  

