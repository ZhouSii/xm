import fetch from '@/utils/fetch'

const baseurl = "aflc-common"

//根据条件获取二维码生成表列表
export function aflcQrcodeList(page,pagesize,data) {
    return fetch({
      url: '/'+baseurl+'/common/aflcQrcode/v1/list',
      method: 'post',
      data:{
        "currentPage":page ,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }

//根据id删除二维码生成表
export function aflcQrcodeDelet(delID) {
    return fetch({
      url: '/'+baseurl+'/common/aflcQrcode/v1/delete/' + delID,
      method: 'DELETE',
    })
  }

//根据id删除二维码生成表
export function aflcQrcodeNew(data) {
    return fetch({
      url: '/'+baseurl+'/common/aflcQrcode/v1/add',
      method: 'post',
      data:data
    })
  } 

//获取渠道编码
export function getChannel() {
    return fetch({
      url: '/'+baseurl+'/sysDict/getChannel/?code=AF0030103',
      method: 'get',
    })
  } 


//根据条件获取渠道数据统计列表
export function aflcChannelStatistics(page,pagesize,data) {
    return fetch({
      url: '/'+baseurl+'/common/aflcChannelStatistics/v1/list',
      method: 'post',
      data:{
        "currentPage":page ,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }