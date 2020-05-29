import fetch from '@/utils/fetch'

const baseurl = 'aflc-uc'
// const baseurl = 'aflcusercenterservice-wtc'
const baseurl_two = 'aflc-common'
const baseurl_three = 'aflc-sm'
const baseurl_four = 'aflcsocketioservice'
// 新增车主
export function data_post_createDriver(data) {
  return fetch.post('/' + baseurl + '/usercenter/aflcDriver/v1/addNew', data)
}

// 修改车主
export function data_put_changeDriver(data) {
  return fetch.post('/' + baseurl + '/usercenter/aflcDriver/v1/update2', data)
}

// 代客认证
export function data_post_driverAudit(data) {
  return fetch.post('/' + baseurl + '/usercenter/aflcDriver/v1/valetAuthAflcDriver2', data)
}

// 根据id获取车主
export function data_get_driverName_id(id) {
  // return fetch.get('/' + baseurl + '/usercenter/aflcDriver/v1/detailByDriverId/' + id)
  return fetch.get('/' + baseurl + '/usercenter/aflcDriver/v1/detailByMainDriver/' + id)
}

// 新增身份证信息表
export function aflcUserIdcard(data) {
  return fetch.post('/' + baseurl + '/usercenter/aflcUserIdcard/v1/identificationUserId?pathFile=' + escape(data))
}

// 新增驾驶证信息表
export function aflcDriverLicence(data) {
  return fetch.post('/' + baseurl + '/usercenter/aflcDriverLicence/v1/identificationDriverPermit?filePath=' + escape(data))
}

// 新增行驶证信息表
export function aflcDriverPermit(data) {
  return fetch.post('/' + baseurl + '/usercenter/aflcDriverPermit/v1/identificationDriverPermit?filePath=' + escape(data))
}

// 修改手机货主车主
export function updateUserMobile(data) {
  return fetch.put('/' + baseurl_two + '/common/aflcCommonUser/v1/updateUserMobile', data)
}

// 认证审核
export function data_post_audit(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcDriver/v1/updateDriverComprehensive', data)
}

// 根据车牌检验
export function data_post_checkDriverCarNumber(data) {
  return fetch.post('/' + baseurl + '/usercenter/aflcDriver/v1/checkDriverCarNum', data)
}

// 根据手机号码获取车主
export function data_post_mobileGetDriver(data) {
  return fetch.get('/' + baseurl + '/usercenter/aflcDriver/v1/checkDriverMobile/' + data, data)
}

// 根据获取车主轨迹
export function data_pullTrack(data) {
  return fetch.get('/' + baseurl_four + '/im/driver/v1/pullTrack/' + data)
}

// 修改批量业务员
export function data_batchUpdateBusiness(data) {
  return fetch.post('/' + baseurl + '/usercenter/aflcDriver/v1/batchUpdateBusiness', data)
}

