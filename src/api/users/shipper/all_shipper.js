import fetch from '@/utils/fetch'

const baseurl = 'aflc-uc'
const baseurl3 = 'aflcusercenterservice--xia'
const baseurl_two = 'aflc-common'
const baseurl_three = 'aflc-sm'

// 获取货主列表
export function data_get_shipper_list(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcShipper/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

//根据ids 启用或禁用货主表 - 货主
export function enableOrDisableShipper(ids) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcShipper/v1/enableOrDisable',
    method: 'post',
    data: ids
  })
}

// 获取状态列表
export function data_get_shipper_status() {
  return fetch({
    url: '/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF00104',
    method: 'get'
  })
}

// 货主页面 -新增
export function data_get_shipper_create(data) {
  return fetch.post('/' + baseurl + '/usercenter/aflcShipper/v1/add', data)
}

// 货主类型的获取
export function data_get_shipper_type() {
  return fetch({
    url: '/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF00101',
    method: 'get'
  })
}

// 根据手机号码获取货主
export function data_get_shipper_view(mobile) {
  return fetch.get('/' + baseurl + '/usercenter/aflcShipper/v1/ifFindByMobile/' + mobile)
}
// 获取省市数据
export function data_Area() {
  return fetch.get('/' + baseurl_three + '/sm/aflcDistrict/v1/getProvinceList')
}


//  修改货主表
export function data_get_shipper_change(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcShipper/v1/update', data)
}

// 获取省级对应的城市列表
export function data_GetCityList(code) {
  return fetch({
    url: '/' + baseurl_three + '/sm/aflcDistrict/v1/lists',
    method: 'post',
    data: {
      'code': code
    }
  })
}

//货主认证审核通过
export function auditShipperPass(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcShipper/v1/auditShipperPass',
    method: 'post',
    data: data
  })
}

//货主认证审核不通过
export function auditShipperNoPass(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcShipper/v1/auditShipperNoPass',
    method: 'post',
    data: data
  })
}

// 获取冻结原因字典
export function data_get_shipper_freezeType() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF02003')
}

// 获取账户状态列表
export function data_get_shipper_auid() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF00105')
}

//车主冻结
export function data_get_freeze(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcDriver/v1/freezeAflcDriver', data)
}
//车主冻结修改
export function data_get_freeze_change(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcDriver/v1/freezeUpdateAflcDriver', data)
}
//车主解冻
export function data_unbind_freeze_change(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcDriver/v1/unfreezeAflcDriver', data)
}
//车主移入解冻
export function data_blacklist(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcDriver/v1/putBlackAflcDriver', data)
}
export function data_remove_blacklist(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcDriver/v1/outPutBlackAflcDriver', data)
}

// 补发优惠卷
export function reissueCoupon(data) {
  return fetch.post('/' + baseurl_three + '/sm/aflcCouponUse/v1/reissueCoupon', data)
}

/* 
  货主2.0 
*/

// 根据条件获取货主表列表
export function shipperListInfo(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcShipper/v1/listNew',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

//新增货主2.0
export function newShipperConfig(data) {
  return fetch.post('/' + baseurl + '/usercenter/aflcShipper/v1/addShipperNew', data)
}

//根据货主ID查找货主2.0 
export function ShipperConfigDetails(shipper) {
  return fetch.get('/' + baseurl + '/usercenter/aflcShipper/v1/findAflcShipperManageByShipperId/' + shipper)
}

//修改货主
export function reviseShipperConfig(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcShipper/v1/updateShipperNew', data)
}

//代客认证货主
export function identificateShipperConfig(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcShipper/v1/substituteAuthUpdateShipper', data)
}

//货主认证审核通过
export function auditShipperPassNew(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcShipper/v1/auditShipperPassNew',
    method: 'post',
    data: data
  })
}

//货主认证审核不通过
export function auditShipperNoPassNew(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcShipper/v1/auditShipperNoPassNew',
    method: 'post',
    data: data
  })
}

//货主冻结、解冻、修改
export function FreezeShipperConfig(data) {
  return fetch.post('/' + baseurl + '/usercenter/aflcShipper/v1/aflcShipperFreeze', data)
}

//货主拉黑，移除
export function BlackShipperConfig(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcShipper/v1/aflcShipperBlack', data)
}

//文字识别用户营业执照
export function identificationShipperBusiness(pathFile) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcShipperBusinessLicence/v1/identificationShipperBusiness?pathFile=' + escape(pathFile),
    method: 'post',
  })
}

//获取专业市场
export function getProfessionTradeArea() {
  return fetch.get('/' + baseurl + '/usercenter/aflcProfessionTradeArea/v1/getProfessionTradeArea')
}

// 修改批量业务员
export function data_batchUpdateBusinessShipper(data) {
  return fetch.post('/' + baseurl + '/usercenter/aflcShipper/v1/batchUpdateBusinessShipper', data)
}

// 商圈管理树形全部 flag数据状态(1:启用,0:禁用)
export function treeAllList() {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcTradeArea/v1/treeAllList?flag=1',
    method: 'get',
  })
}

//已认证货主是否符合补发优惠金资格
export function repairShipperRewardCheck(data) {
  return fetch.get('/' + baseurl + '/usercenter/aflcUserReward/v1/repairShipperRewardCheck/' + data)
}

//已认证货主补发优惠金
export function repairShipperReward(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcUserReward/v1/repairShipperReward',
    method: 'post',
    params: data
  })
}

//修改货主认证商圈
export function reviseTradeAre(data) {
    return fetch({
      url: '/' + baseurl + '/usercenter/aflcShipperExtend/v1/updateTradeAre',
      method: 'post',
      data: data
    })
  }
