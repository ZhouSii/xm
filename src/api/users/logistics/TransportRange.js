import fetch from '@/utils/fetch'

const baseurl = "aflc-uc"

/**
 * 物流专线
 */

//获取物流专线
export function data_TransportRangeList(page,pagesize,data) {
    return fetch({
        url: '/'+baseurl+'/usercenter/aflcTransportRange/v1/listPlatform',
        method: 'post',
        data:{
            "currentPage":page ,
            "pageSize": pagesize,
            "vo": data
          }
    })
}

//删除物流专线

export function data_DelTransportRange(id) {
    return fetch({
        url: '/'+baseurl+'/usercenter/aflcTransportRange/v1/delete/'+id,
        method: 'DELETE',
    })
}

/**
 * 车源信息
 *
 * 
 * 
 *
 */

//获取车源信息
export function data_CarInfoList(page,pagesize,data) {
    return fetch({
        url: '/'+baseurl+'/usercenter/aflcCarInfo/v1/list',
        method: 'post',
        data:{
            "currentPage":page ,
            "pageSize": pagesize,
            "vo": data
          }
    })
}

//删除车源信息

export function data_DelCarInfo(id) {
    return fetch({
        url: '/'+baseurl+'/usercenter/aflcCarInfo/v1/delete/'+id,
        method: 'DELETE',
    })
}








  

