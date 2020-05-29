import fetch from '@/utils/fetch'

// const baseurl = 'aflc-uc'
const baseurl = 'aflcusercenterservice-lxd'
const baseurl_two = 'aflc-common'
const baseurl_three = 'aflc-sm'

// 根据id获取车主
export function data_get_driverName_id(id) {
  return fetch.get('/' + baseurl + '/usercenter/aflcDriver/v1/2/' + id)
} 
