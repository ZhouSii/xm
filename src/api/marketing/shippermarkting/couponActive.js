import fetch from '@/utils/fetch'

const baseurl = "aflc-sm"
// const baseurl = "aflcsmservice-wtc"
const baseurl_two = "aflc-common"

//获取优惠券手动活动列表
export function data_get_couponActivehand_list(page,pagesize,data) {
    return fetch({
      url: '/'+baseurl+'/sm/aflcCouponActivity/v1/list',
      method: 'post',
      data:{
        "currentPage": page,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }

//获取优惠券自动活动列表
  export function data_get_couponActiveauto_list(page,pagesize,data) {
    return fetch({
      url: '/'+baseurl+'/sm/aflcCouponActivity/v1/listAuto',
      method: 'post',
      data:{
        "currentPage": page,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }
  
//优惠券活动列表新增
export function data_get_couponActive_create(data) {
  return fetch.post('/' + baseurl + '/sm/aflcCouponActivity/v1/add', data)
}

//删除优惠券活动列表
export function data_Del_couponActive(id) {
  return fetch({
        url: '/'+baseurl+'/sm/aflcCouponActivity/v1/delete/'+id,
        method: 'delete',
      })
    }

//启用优惠券活动列表
export function data_Able_couponActive(ids) {
        
  return fetch({
           url: '/'+baseurl+'/sm/aflcCouponActivity/v1/enableOrDisable',
           method: 'post',
           data:ids
         })
       }    


//自动化化配置
export function data_automationActive() {
  return fetch({
    url: '/'+baseurl_two+'/sysDict/getSysDictByCodeGet/AF0461',
    method: 'get'
  })
}

//获取优惠券类型
export function data_couponActive() {
  return fetch({
    url: '/'+baseurl_two+'/sysDict/getSysDictByCodeGet/AF0462',
    method: 'get'
  })
}

//获取时效类型
export function data_couponActiveTime() {
  return fetch({
    url: '/'+baseurl_two+'/sysDict/getSysDictByCodeGet/AF0463',
    method: 'get'
  })
}

//获取券码状态类型
export function data_couponStatus() {
  return fetch({
    url: '/'+baseurl_two+'/sysDict/getSysDictByCodeGet/AF0464',
    method: 'get'
  })
}

 //activity_id获取优惠券活动列表
 export function data_get_couponActive2_Id(activity_id) {
  return fetch({
    url: '/'+baseurl+'/sm/aflcCoupon/v1/query/' + activity_id,
    method: 'get',
  })
}

 //activity_id获取优惠券活动列表2
 export function data_get_couponActive3_Id(activity_id) {
  return fetch({
    url: '/'+baseurl+'/sm/aflcCoupon/v1/queryTrans/' + activity_id,
    method: 'get',
  })
}

 //id优惠券活动列表
 export function data_get_couponActive_Id(id) {
  return fetch({
    url: '/'+baseurl+'/sm/aflcCouponActivity/v1/'+ id,
    method: 'get',
  })
}


//获取优惠券领用明细列表
export function data_get_aflcCouponUse_list(page,pagesize,data) {
  return fetch({
    url: '/'+baseurl+'/sm/aflcCouponUse/v1/listDetail',
    method: 'post',
    data:{
      "currentPage": page,
      "pageSize": pagesize,
      "vo": data
    }
  })
}

//导出优惠券领用明细列表
export function data_get_listDetailExcel(page,pagesize,data) {
  return fetch({
    url: '/'+baseurl+'/sm/aflcCouponUse/v1/listDetailExcel',
    method: 'post',
    responseType: 'blob',
    data:{
      "currentPage": page,
      "pageSize": pagesize,
      "vo": data
    }
  })
}


//  修改优惠券领用明细列表
export function data_get_couponActive_update(data) {
  return fetch.put('/' + baseurl + '/sm/aflcCouponActivity/v1/update', data)
}      

//  新增优惠券
export function data_get_aflcCoupon_add(data) {
  return fetch({
    url: '/'+baseurl+'/sm/aflcCoupon/v1/add',
    method: 'post',
    data:{
      "activityId": data
    }
  })
}      

//  删除优惠券
export function data_get_aflcCoupon_delete(id) {
    
  return fetch({
        url: '/'+baseurl+'/sm/aflcCoupon/v1/delete/'+id,
        method: 'delete',
      })
    }

    
//获取优惠券列表
export function data_get_aflcCoupon_list(page,pagesize,data) {
  return fetch({
    url: '/'+baseurl+'/sm/aflcCoupon/v1/list',
    method: 'post',
    data:{
      "currentPage": page,
      "pageSize": pagesize,
      "vo": data
    }
  })
}

// 生成优惠券
 export function data_get_produceCoupon(activity_id,num) {
  return fetch({
    url: '/'+baseurl+'/sm/aflcCouponUse/v1/produceCoupon/?id=' + activity_id+'&num='+num,
    method: 'get',
  })
}

// 发放优惠券
// export function data_get_grantCoupon(id,data) {
// return fetch.post('/'+baseurl+'/sm/aflcCouponUse/v1/grantCouponCondition/'+id, data)
// }

//  发放优惠券
export function data_get_grantCoupon(data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcCouponUse/v1/salesmanGrantCoupon',
    method: 'post',
    data: data
  })
}

// txt文件上传
export function data_get_BatchDistribution(multipartFile) {
  return fetch({
    url: '/'+baseurl+'/sm/aflcCouponUse/v1/BatchDistribution',
    method: 'post',
    data: multipartFile
  })
}

// // 优惠券发放excel文件导出
// export function data_get_produceCouponExcel(id,num) {
//   return fetch({
//     url: '/'+baseurl+'/sm/aflcCouponUse/v1/produceCoupon?id='+id+'&num='+num,
//     method: 'get',
//     responseType: 'blob',
//   })
// }

// 优惠券发放excel文件导出
export function data_get_produceCouponExcel(data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcCouponUse/v1/salesmanProduceCouponExcel',
    method: 'post',
    data: data,
    responseType: 'blob',
  })
}