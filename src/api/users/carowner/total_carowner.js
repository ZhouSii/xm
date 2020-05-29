import fetch from '@/utils/fetch'

const baseurl = 'aflc-uc'
const baseurl3 = 'aflcusercenterservice--xia'
const baseurl_two = 'aflc-common'
const baseurl_three = 'aflc-sm'

// 获取车主列表
export function data_get_driver_list(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcDriver/v1/list2',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 获取状态列表
export function data_get_driver_status() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF00104')
}

// 根据id获取车主
export function data_get_driverName_id(id) {
  return fetch.get('/' + baseurl + '/usercenter/aflcDriver/v1/' + id)
}

// 新增车主
export function data_post_createDriver(data) {
  return fetch.post('/' + baseurl + '/usercenter/aflcDriver/v1/add', data)
}

// 认证审核
export function data_post_audit(data) {
  return fetch.post('/' + baseurl + '/usercenter/aflcDriver/v1/authAflcDriver', data)
}

// 根据手机号码获取车主
export function data_post_mobileGetDriver(data) {
  return fetch.get('/' + baseurl + '/usercenter/aflcDriver/v1/checkDriverMobile/' + data, data)
}

// 冻结车主
export function data_put_freezeDriver(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcDriver/v1/freezeAflcDriver', data)
}
// 车主冻结修改
export function data_get_freezeDriverchange(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcDriver/v1/freezeUpdateAflcDriver', data)
}
// 车主解冻
export function data_unbind_freezeDriverchange(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcDriver/v1/unfreezeAflcDriver', data)
}
// 移入黑名单
export function data_put_PutBlack(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcDriver/v1/putBlackAflcDriver', data)
}

// 移入黑名单
export function data_put_OutBlack(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcDriver/v1/outPutBlackAflcDriver', data)
}

// 修改车主
export function data_put_changeDriver(data) {
  return fetch.post('/' + baseurl + '/usercenter/aflcDriver/v1/update', data)
}

// 代客认证
export function data_post_driverAudit(data) {
  return fetch.post('/' + baseurl + '/usercenter/aflcDriver/v1/valetAuthAflcDriver', data)
}

// 获取车辆类型列表
export function data_CarList() {
  return fetch.get('/' + baseurl_three + '/sm/aflcSysDict/v1/getCarTypeList')
}

//  获取车型列表
export function data_Get_carType() {
  return fetch.get('/' + baseurl_three + '/sm/aflcSysDict/v1/getCarSpecList')
}

// 获取中单等级列表
export function data_get_driver_obStatus() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF00503')
}

// 获取账户状态列表
export function data_get_shipper_auid() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF00105')
}

// 获取车主抽佣列表
export function data_get_shipper_carmaid() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF00206')
}

// 获取车主奖励列表
export function data_get_shipper_carOwner() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF00207')
}

// 获取车主冻结原因字典
export function data_get_car_freezeType() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF02001')
}

// 获取黑名单原因字典
export function data_get_car_BlackType() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF02002')
}

// 获取活跃值字典
export function data_get_car_ActiveValue() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF00204')
}

// 根据身份证检验
export function data_post_checkDriverCardid(data) {
  return fetch.post('/' + baseurl + '/usercenter/aflcDriver/v1/checkDriverCardid/', data)
}

// 根据车牌检验
export function data_post_checkDriverCarNumber(data) {
  return fetch.post('/' + baseurl + '/usercenter/aflcDriver/v1/checkDriverCarNum/', data)
}

// 发送短信
export function sendMsgInviteAuth(data) {
  return fetch.post('/' + baseurl + '/usercenter/aflcDriver/v1/sendMsgInviteAuth', data)
}

// 启用禁用
export function DriverCarenableOrDisable(data) {
  return fetch.post('/' + baseurl + '/usercenter/aflcDriver/v1/enableOrDisable', data)
}

//已认证车主是否符合补发奖励金资格
export function repairDriverRewardCheck(data) {
  return fetch.get('/' + baseurl + '/usercenter/aflcUserRewardDetail/v1/repairDriverRewardCheck/' + data)
}

//已认证车主补发奖励金
export function repairDriverReward(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcUserRewardDetail/v1/repairDriverReward',
    method: 'post',
    params: data
  })
}
