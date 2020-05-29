import fetch from '@/utils/fetch'
const baseurl = 'aflc-uc' // 测试生产接口
// const baseurl = 'aflcusercenterservice-deng' // 开发接口

// 云平台抢购活动列表
export function getListData(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcflashsaleactivity/v1/list',
    method: 'post',
    data: data
  })
}

// 云平台新增抢购活动
export function addData(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcflashsaleactivity/v1/add',
    method: 'post',
    data: data
  })
}

// 云平台修改抢购活动
export function updateData(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcflashsaleactivity/v1/update',
    method: 'post',
    data: data
  })
}

//获取活动信息
export function getOneData(id) {
  return fetch({
    url: '/' + baseurl + `/usercenter/aflcflashsaleactivity/v1/activity?id=${id}`,
    method: 'post',
    data: {}
  })
}

// 启用/停用活动
export function isEnable(id, data) {
  return fetch({
    url: '/' + baseurl + `/usercenter/aflcflashsaleactivity/v1/isEnable?id=${id}&isEnable=${data}`,
    method: 'post',
    data: {}
  })
}

// 获取活动链接
export function getUrl(id) {
  return fetch({
    url: '/' + baseurl + `/usercenter/aflcflashsaleactivity/v1/url/${id}`,
    method: 'get'
  })
}

