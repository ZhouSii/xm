import fetch from '@/utils/fetch'

const baseurl = 'aflc-uc'
// const baseurl = 'aflcusercenterservice-wtc'
const baseurl_two = 'aflc-common'
const baseurl_three = 'aflc-sm'

// 新增货主2.0
export function addShipperNewObject(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcShipper/v1/addShipperNew',
    method: 'post',
    data: data
  })
}

