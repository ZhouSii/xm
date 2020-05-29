import fetch from '@/utils/fetch'

const baseurl = "aflc-sm"

const baseurl_two = "aflc-common"


//根据id获取服务区域定价  he  查询功能
export function data_GetCityInfo(page,pagesize,data) {
    return fetch({
      url: '/'+baseurl+'/sm/aflcAreaPrice/v1/list',
      method: 'post',
      data:{
        "currentPage":page ,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }

//获取车辆类型列表
export function data_CarList(){
  return fetch.get('/'+baseurl+'/sm/aflcSysDict/v1/getCarTypeList') 
}

//获取服务分类子分类
export function data_ServerClassList(){
  return fetch.get('/'+baseurl+'/sm/aflcSysDict/v1/getServiceClassList') 
}


//更改状态
export function data_ChangeStatus(id) {
  return fetch({
  url: '/'+baseurl+'/sm/aflcAreaPrice/v1/openOrForbidden',
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

//根据服务分类和车辆类型选择车长

export function data_GetCarStyle(servicecode,cartype) {
  return fetch({
    url: '/'+baseurl+'/sm/aflcStandardPrice/v1/getPriceByServiceAndCarType/'+servicecode+'/'+cartype,
    method: 'get'
  })
}

//xinzneg
export function data_NewOrChange(data) {
  return fetch({
    url: '/'+baseurl+'/sm/aflcAreaPrice/v1/addList',
    method: 'post',
    data:data
  })
}

//修改
export function data_OnlyChange(data) {
  return fetch({
    url: '/'+baseurl+'/sm/aflcAreaPrice/v1/update',
    method: 'post',
    data:data
  })
}

//车主抽佣
export function data_Commission() {
  return fetch({
    url: '/'+baseurl+'/sm/aflcDriverCommission/v1/list',
    method: 'post',
    data:{
      "currentPage": 1 ,
      "pageSize": 10,
      "vo": null
    },
  })
}

//获取车主抽佣等级
export function data_MaidLevel() {
  return fetch({
    url: '/'+baseurl_two+'/sysDict/getSysDictByCodeGet/AF00206',
    method: 'get'
  })
}






  

