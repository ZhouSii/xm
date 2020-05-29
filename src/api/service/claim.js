import fetch from '@/utils/fetch'

const baseurl = 'aflc-order'
// const baseurl = 'aflcorderservice-wtc'
/**
 * 物损理赔
 *  "belongCity": "string",
    "claimDes": "string",
    "claimPic1": "string",
    "claimPic2": "string",
    "claimType": "string",
    "createTime": "2018-09-27T07:42:49.337Z",
    "creater": "string",
    "dealStatus": "string",
    "driver": "string",
    "endAddress": "string",
    "id": "string",
    "orderSerial": "string",
    "orderStatus": "string",
    "reporter": "string",
    "reporterPhone": "string",
    "reporterType": "string",
    "shipper": "string",
    "startAddress": "string",
    "updateTime": "2018-09-27T07:42:49.337Z",
    "updater": "string",
    "useCarTime": "2018-09-27T07:42:49.337Z"
 */
export function postOrderGoodsclaimlist(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrderGoodsclaim/v1/listRecently',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
/**
 *
 * @param {*} page
 * @param {*} pagesize
 * @param {*} data
 * 登记列表
 */
export function postListClain(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrder/v1/listClain',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// /order/aflcOrderGoodsclaim/v1/GoodsclaimAll/{id} 拼接一个id 大列表
// 根据订单号id获取订单物损理赔
export function getGoodsclaimAll(id) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrderGoodsclaim/v1/GoodsclaimAll/' + id,
    method: 'get'
  })
}

// /order/aflcOrderGoodsfollowup/v1/GoodsfollowupAll/{id} 下拉列表
// 根据订单号id获取记录物损跟进
export function getGoodsfollowupAll(id) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrderGoodsfollowup/v1/GoodsfollowupAll/' + id,
    method: 'get'
  })
} 
/**
 * /order/aflcOrderGoodsclaim/v1/updateDealStatus/{id}
更新订单物损理赔处理状态
 */
export function getUpdateDealStatus(id) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrderGoodsclaim/v1/updateDealStatus/' + id,
    method: 'get'
  })
}
/**
 * /order/aflcOrderGoodsclaim/v1/reportClaim 登记新增
 *  "orderSerial": "string",
 */
export function postReportClaim(data) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrderGoodsclaim/v1/reportClaim',
    method: 'post',
    data: data
  })
}

/**
 * 记录物损跟进 /order/aflcOrderGoodsfollowup/v1/add新增记录物损跟进表
 */

export function postReportClaimAdd(data) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrderGoodsfollowup/v1/add',
    method: 'post',
    data: data
  })
}

