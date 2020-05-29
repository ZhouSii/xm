import fetch from '@/utils/fetch'
const baseurl_one= "aflc-order"
const baseurl_two = 'aflc-common'


// 获取马甲推单记录列表
export function data_get_MjPushLogs_list(page, pagesize, data) {
    return fetch({
      url: '/'+baseurl_one+'/order/aflcOrder/v1/findVestOrderPushRecordList',
      method: 'post',
      data:{
        "currentPage": page,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }

  //获取马甲推单司机列表
export function data_get_RecordList_list(page,pagesize,data) {
  return fetch({
    url: '/'+baseurl_one+'/order/aflcOrder/v1/findVestOrderDriverPushRecordList',
    method: 'post',
    data:{
      "currentPage": page,
      "pageSize": pagesize,
      "vo": data
    }
  })
}

// 获取车主活跃度字典
export function data_get_car_activeType() { 
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF00204')
}

// 获取车主推送车辆字典
export function data_get_car_pushType() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF018')
}

