import fetch from '@/utils/fetch'
const baseurl = 'aflc-uc' // 测试生产接口
// const baseurl = 'aflcusercenterservice-deng' // 开发接口

// 云平台—货主线索管理列表
export function getListData(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcshipperclue/v1/platform/list',
    method: 'post',
    data: data
  })
}

// 添加货主线索
export function addData(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcshipperclue/v1/add',
    method: 'post',
    data: data
  })
}

// 修改货主线索
export function updateData(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcshipperclue/v1/update',
    method: 'post',
    data: data
  })
}

// 编辑前获取线索数据
export function getOneData(id) {
  return fetch({
    url: '/' + baseurl + `/usercenter/aflcshipperclue/v1/${id}`,
    method: 'get'
  })
}

// 云平台—货主线索管理更改负责人
export function changeLiability(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcshipperclue/v1/platform/changeLiability',
    method: 'post',
    data: data
  })
}

// 获取货主线索详情
export function getDetail(id) {
  return fetch({
    url: '/' + baseurl + `/usercenter/aflcshipperclue/v1/whole/${id}`,
    method: 'get'
  })
}

// 检测手机号是否存在记录
export function checkMobile(mobile) {
  return fetch({
    url: '/' + baseurl + `/usercenter/aflcshipperclue/v1/checkMobile?mobile=${mobile}`,
    method: 'get'
  })
}
