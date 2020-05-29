import fetch from '@/utils/fetch'
// const baseurl = 'aflcusercenterservice'
const baseurl = 'aflc-uc'
// const baseurl = 'aflcusercenterservice-huang'
//
/**
 * 专线列表
 */
export function postSelectAflcTransportRangeList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcTransportRange/v1/selectAflcTransportRangeList',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
/**
 * /usercenter/aflcrecommend/v1/
插入推荐专线表信息
 */
export function postAddline(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcrecommend/v1/',
    method: 'post',
    data: data
  })
}
/**
 *
/usercenter/aflcTransportRange/v1/deleteBatch
删除专线列表信息
 */
export function deleteBatch(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcTransportRange/v1/deleteBatch',
    method: 'delete',
    data: data
    // data: {
    //   ids: data
    // }
  })
}

