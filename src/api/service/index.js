import fetch from '@/utils/fetch'

const baseurl = "aflc-order"


// 客服管理-平台类-客服管理首页-投诉列表

export function getListPlatformComplain(page,pagesize,data) {
    return fetch({
      url: '/'+ baseurl + '/order/aflcOrderComplain/v1/listPlatformComplain',
      method: 'post',
      data:{
        "currentPage": page,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }

  // 客服管理-用户类-客服管理首页-投诉列表

export function getListCouseComplain(page,pagesize,data) {
    return fetch({
      url: '/'+ baseurl + '/order/aflcOrderComplain/v1/listPlatformUserComplain',
      method: 'post',
      data:{
        "currentPage": page,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }


    // 客服管理-平台类-客服管理首页-投诉列表-回复

export function replyPlantComplain(data) {
    return fetch({
      url: '/'+ baseurl + '/order/aflcOrderComplain/v1/update',
      method: 'put',
      data:data
    })
  }

    // 根据id删除订单投诉建议表
    export function deletReply(id) {
        return fetch({
          url: '/'+ baseurl + '/order/aflcOrderComplain/v1/delete/' + id,
          method: 'DELETE',
        })
      }


  

 
