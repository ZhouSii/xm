import fetch from '@/utils/fetch'
const baseurl = 'aflc-lcl'

// 获取线路列表
export function boutiqueLineList(data) {
  return fetch({
    url: '/' + baseurl + '/lcl/aflclclexcellentlineactivity/v1/line/list',
    method: 'post',
    data:data
  })
}

//获取精品线路活动信息
export function getBoutiqueLineInfo() {
    return fetch({
      url: '/' + baseurl + '/lcl/aflclclexcellentlineactivity/v1/activity/info',
      method: 'get',
    })
  }

//获取精品线路活动信息
export function updateBoutiqueLineInfo(data) {
    return fetch({
      url: '/' + baseurl + '/lcl/aflclclexcellentlineactivity/v1/activity/update',
      method: 'post',
      data:data
    })
  }

//导出精品线路
export function exportBoutiqueLine(data) {
    return fetch({
      url: '/' + baseurl + '/lcl/aflclclexcellentlineactivity/v1/exportListExcel',
      responseType: 'blob',
      method: 'post',
      data:data
    })
  }

//提交精品线路
export function submitBoutiqueLine(data) {
    return fetch({
      url: '/' + baseurl + '/lcl/aflclclexcellentlineactivity/v1/excellent/submit',
      method: 'post',
      data:data
    })
  }

//删除精品线路
export function deleteBoutiqueLine(data) {
    return fetch({
      url: '/' + baseurl + '/lcl/aflclclexcellentlineactivity/v1/excellent/delete',
      method: 'post',
      data:data
    })
  }

//设置优先级
export function priorityBoutiqueLine(data) {
    return fetch({
      url: '/' + baseurl + '/lcl/aflclclexcellentlineactivity/v1/priority/update',
      method: 'post',
      data:data
    })
  }