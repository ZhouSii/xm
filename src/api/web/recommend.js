import fetch from '@/utils/fetch'
const baseurl = 'aflc-uc'
// const baseurl = 'aflcusercenterservice-huang'
/**
 *
 * 推荐专线列表
 */
export function postGetLists(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcrecommend/v1/getLists',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
/**
 * /usercenter/aflcrecommend/v1/{id}
根据ID修改推荐专线表信息
 */
export function postAmend(id, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcrecommend/v1/' + id,
    method: 'put',
    data: data
  })
}
/**
 * /usercenter/aflcrecommend/v1/{id}
 * 删除专线列表
 */
export function deleteLine(id) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcrecommend/v1/' + id,
    method: 'delete'
  })
}
/**
 *
/usercenter/aflcrecommend/v1/putSettopStatusById/{id}
根据ID置顶或取消置顶推荐专线表信息
 */
// export function putCancel(id) {
//   return fetch({
//     url: '/' + baseurl + '/usercenter/aflcrecommend/v1/putSettopStatusById/' + id,
//     method: 'put'
//   })
// }
/**
 * 批量置顶/aflc-uc/usercenter/aflcrecommend/v1/deleteBatch
 */
export function putStick(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcrecommend/v1/putSettopStatusByIds?settopStatus=1',
    method: 'put',
    data: data
  })
}
/**
 * 批量取消置顶/aflc-uc/usercenter/aflcrecommend/v1/deleteBatch
 */
export function putUpStick(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcrecommend/v1/putSettopStatusByIds?settopStatus=0',
    method: 'put',
    data: data
  })
}
/**
 * 批量删除/usercenter/aflcrecommend/v1/deleteBatch
 */
export function deleteBatch(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcrecommend/v1/deleteBatch?',
    method: 'delete',
    data: data
  })
}
