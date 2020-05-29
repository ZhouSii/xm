import fetch from '@/utils/fetch'
import { cityCode } from '@/api/dispatch/OperationsInformCity'

const baseUrl = 'aflc-uc'
const baseUrl2 = 'aflc-lcl'
// const baseUrl2 = 'aflclclservice-xxl'
// const baseUrl = 'aflcusercenterservice-xxl'

/**
 * 增值服务定价2.1
 * @export
 * @param {*} data
 * @returns
 */
//根据条件获取发物流增值服务标准定价列表2.1
export function otherServiceStandPriceList(data) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclPlatformStandardPriceNewV2/v1/list',
    method: 'post',
    data: data
  })
}

//新增发物流增值服务标准定价2.1
export function newOtherServiceStandPrice(data) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclPlatformStandardPriceNewV2/v1/add',
    method: 'post',
    data: data
  })
}

//根据id修改发物流增值服务标准定价2.1
export function reviseOtherServiceStandPrice(data) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclPlatformStandardPriceNewV2/v1/update',
    method: 'put',
    data: data
  })
}

/**
 *
 * 增值服务定价
 * @export
 * @param {*} data
 * @returns
 */

//根据条件新增发物流增值服务区域定价列表
export function otherServiceAreaPriceList(data) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcLclValueAreaPrice/v1/list',
    method: 'post',
    data: data
  })
}

//根据条件获取发物流增值服务区域定价列表
export function newOtherServiceAreaPrice(data) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcLclValueAreaPrice/v1/add',
    method: 'post',
    data: data
  })
}

//根据id修改发物流增值服务区域定价
export function reviseOtherServiceAreaPrice(data) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcLclValueAreaPrice/v1/update',
    method: 'put',
    data: data
  })
}

//发物流批量修改增值区域定价
export function batchOtherServiceAreaPrice(data) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcLclValueAreaPrice/v1/batchUpdate',
    method: 'put',
    data: data
  })
}

//禁用或启用发物流增值服务区域定价
export function OtherServiceAreaPriceStatus(data) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcLclValueAreaPrice/v1/banOrUse',
    method: 'put',
    data: data
  })
}

/**
 *
 * 干线费定价
 * @export
 * @param {*} data
 * @returns
 */

//根据条件获取发物流干线费定价列表
export function trunkLinePriceList(data) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcLclDeliverLinePrice/v1/list',
    method: 'post',
    data: data
  })
}

//新增发物流干线费定价
export function newTrunkLinePrice(data) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcLclDeliverLinePrice/v1/add',
    method: 'post',
    data: data
  })
}

//禁用或启用发物流发物流干线费定价
export function trunkLinePriceStatus(data) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcLclDeliverLinePrice/v1/banOrUse',
    method: 'put',
    data: data
  })
}

//根据id获取发物流干线费定价
export function trunkLinePriceDetails(id) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcLclDeliverLinePrice/v1/' + id,
    method: 'get',
  })
}

//根据id修改发物流干线费定价
export function reviseTrunkLinePrice(data) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcLclDeliverLinePrice/v1/update',
    method: 'put',
    data: data
  })
}

//发物流批量修改干线运费定价
export function batchTrunkLinePrice(data) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcLclDeliverLinePrice/v1/batchUpdate',
    method: 'put',
    data: data
  })
}

/**
 *
 * 提货费定价 / 送货费定价
 * @export
 * @param {*} data
 * @returns
 */

//根据条件获取发物流送货和提货费定价列表
export function collectFeesList(data) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcLclValueDeliveTakePrice/v1/list',
    method: 'post',
    data: data
  })
}

//根据id获取发物流送货和提货费定价
export function collectFeesDetails(id) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcLclValueDeliveTakePrice/v1/' + id,
    method: 'get',
  })
}

//新增发物流干线费定价
export function newCollectFees(data) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcLclValueDeliveTakePrice/v1/add',
    method: 'post',
    data: data
  })
}

//根据id修改发物流送货和提货费定价
export function updateCollectFees(data) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcLclValueDeliveTakePrice/v1/update',
    method: 'put',
    data: data
  })
}

//发物流批量修改发物流送货和提货费定价
export function batchCollectFees(data) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcLclValueDeliveTakePrice/v1/batchUpdate',
    method: 'put',
    data: data
  })
}

//禁用或启用发物流送货和提货费定价
export function collectFeesStatus(data) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcLclValueDeliveTakePrice/v1/banOrUse',
    method: 'put',
    data: data
  })
}

/**
 *
 * 区代提货范围及定价 2.1
 * @export 
 * @param {*} data
 * @returns
 */
export function collectFeesList2(data) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclValueDeliveTakePrice/v1/list',
    method: 'post',
    data: data
  })
}

//新增区代提货范围及定价 2.1
export function newCollectFees2(data) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclValueDeliveTakePrice/v1/add',
    method: 'post',
    data: data
  })
}

//根据id获取区代提货范围及定价 2.1
export function collectFeesDetails2(id) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclValueDeliveTakePrice/v1/' + id,
    method: 'get',
  })
}

//根据id修改区代提货范围及定价 2.1
export function updateCollectFees2(data) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclValueDeliveTakePrice/v1/update',
    method: 'put',
    data: data
  })
}

//禁用或启用发物流送货和提货费定价
export function collectFeesStatus2(data) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclValueDeliveTakePrice/v1/banOrUse',
    method: 'put',
    data: data
  })
}

//导出数据模板2.1
export function deliveryPriceTemplateExcel(type) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclValueDeliveTakePrice/v1/templateExcel?platformType=' + type,
    responseType: 'blob',
    method: 'get',
  })
}

//批量导入区代、承运商送货费定价
export function importDeliveryPriceExcel(data) {
  return fetch({
    //   url: '/'+baseUrl2+'/aflc-lcl/lclserver/aflcLclValueDeliveTakePrice/v1/import?platformType='+obj.platformType+'&carriersId='+obj.carriersId+'&carriersName='+obj.carriersName+'&useType='+obj.useType,
    url: '/' + baseUrl2 + '/lclserver/aflcLclValueDeliveTakePrice/v1/import',
    method: 'post',
    data: data
  })
}

//批量导入区代提货费定价
export function importPickUpChargePriceExcel(data) {
    return fetch({
        // url: '/'+baseUrl2+'/lclserver/aflcLclValueDeliveTakePrice/v1/imAgencyTP?platformType='+obj.platformType+'&carriersId='+obj.carriersId+'&carriersName='+obj.carriersName+'&useType='+obj.useType,
        url: '/'+baseUrl2+'/lclserver/aflcLclValueDeliveTakePrice/v1/imAgencyTP',
      method: 'post',
      data: data
    })
  }

//批量导出区代或者平台定价
export function deliveryPriceOutAgencyExcel(obj) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclValueDeliveTakePrice/v1/outAgencyExcel?platformType=' + obj.platformType + '&carriersId=' + obj.carriersId + '&carriersName=' + obj.carriersName + '&useType=' + obj.useType,
    responseType: 'blob',
    method: 'get',
  })
}

//下载区代提货费数据模板
export function agencyTakeExcel(data) {
    return fetch({
      url: '/' + baseUrl2 + '/lclserver/aflcLclValueDeliveTakePrice/v1/agencyTakeExcel?cityCode='+data.cityCode,
      responseType: 'blob',
      method: 'post',
    })
  }

/**
 *
 * 区代运作路线及定价2.1
 * @export 根据条件获取发物流区代、承运商和平台干线定价
 * @param {*} data
 * @returns
 */

//根据条件获取区代运作路线及定价2.1列表  
export function trunkLinePriceList2(data) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclAgencyLinePriceNewV2/v1/list',
    method: 'post',
    data: data
  })
}

//新增区代运作路线及定价2.1
export function newTrunkLinePrice2(data) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclAgencyLinePriceNewV2/v1/add',
    method: 'post',
    data: data
  })
}

//根据id获取区代运作路线及定价2.1
export function trunkLinePriceDetails2(id) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclAgencyLinePriceNewV2/v1/' + id,
    method: 'get',
  })
}

//根据id修改区代提货范围及定价 2.1
export function reviseTrunkLinePrice2(data) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclAgencyLinePriceNewV2/v1/update',
    method: 'put',
    data: data
  })
}

//禁用或启用修改区代提货范围及定价 2.1
export function trunkLinePriceStatus2(data) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclAgencyLinePriceNewV2/v1/banOrUse',
    method: 'put',
    data: data
  })
}

//批量导入区代定价2.1
export function importAgency(data) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclAgencyLinePriceNewV2/v1/import',
    method: 'post',
    data: data
  })
}

//导出数据模板2.1
export function exportAgency(label) {
  var tab = label ? label : '0'
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclAgencyLinePriceNewV2/v1/templateExcel?platformType=' + tab,
    responseType: 'blob',
    method: 'get',
  })
}

//批量导出区代或者平台定价
export function exportAgencyOrPlatformExcel(obj) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclAgencyLinePriceNewV2/v1/outAgencyExcel?agencyName=' + obj.agencyName + '&agencyId=' + obj.agencyId + '&platformType=' + obj.platformType + '&agencyArea=' + obj.agencyArea + '&startArea=' + obj.startArea + '&startProvince=' + obj.startProvince + '&startCity=' + obj.startCity + '&startAreaCode=' + obj.startAreaCode + '&carriersId=' + obj.carriersId + '&carriersName=' + obj.carriersName + '&pointId=' + obj.pointId + '&pointName=' + obj.pointName + '&pointArea=' + obj.pointArea,
    responseType: 'blob',
    method: 'get',
  })
}

/**
 *
 * 区代增值服务定价2.1
 * @export
 * @param {*} data
 * @returns
 */

//根据条件获取区代增值服务定价2.1列表
export function otherServiceAreaPriceList2(data) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclValueAreaPriceNewV2/v1/list',
    method: 'post',
    data: data
  })
}

//新增发物流增值服务区域定价v2.1
export function newOtherServiceAreaPrice2(data) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclValueAreaPriceNewV2/v1/add',
    method: 'post',
    data: data
  })
}

//根据id修改发物流增值服务区域定价
export function reviseOtherServiceAreaPrice2(data) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclValueAreaPriceNewV2/v1/update',
    method: 'put',
    data: data
  })
}

//根据id获取发物流增值服务区域定价v2.1
export function OtherServiceAreaPriceDetails(id) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclValueAreaPriceNewV2/v1/' + id,
    method: 'get',
  })
}

//禁用或启用发物流增值服务区域定价v2.1
export function OtherServiceAreaPriceStatus2(data) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclValueAreaPriceNewV2/v1/banOrUse',
    method: 'put',
    data: data
  })
}

/**
 * 路线标准定价区代列表2.1
 * @export
 * @param {*} data
 * @returns
 */

//路线标准定价区代列表v2.1
export function lineStandPrice(data) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclAreaAgencyAndLinePriceNewV2/v1/list',
    method: 'post',
    data: data
  })
}

//获取运作线路信息v2.1
export function getAgencyLine2(areaCode, cityName) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclAgencyLinePriceNewV2/v1/agencyLine?areaCode=' + areaCode + '&cityName=' + cityName,
    method: 'get',
  })
}

//新增发物流区代运作路线与平台运作路线v2.1(区代使用)
export function newlineStandPrice(data) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclAreaAgencyAndLinePriceNewV2/v1/add',
    method: 'post',
    data: data
  })
}

//修改发物流区代运作路线与平台运作路线v2.1(区代使用)
export function reviselineStandPrice(data) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclAreaAgencyAndLinePriceNewV2/v1/update',
    method: 'put',
    data: data
  })
}

//根据id获取发物流区代运作路线与平台运作路线v2.1(区代使用)
export function lineStandPriceDetails(id) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclAreaAgencyAndLinePriceNewV2/v1/' + id,
    method: 'get',
  })
}

//禁用或启用发物流区代运作路线与平台运作路线v2.1(区代使用)
export function lineStandPriceStatus(data) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclAreaAgencyAndLinePriceNewV2/v1/banOrUse',
    method: 'put',
    data: data
  })
}

//导出标准定价路线
export function exportStandAgencyExcel(agencyId) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclAreaAgencyAndLinePriceNewV2/v1/outAgencyExcel?agencyId=' + agencyId,
    responseType: 'blob',
    method: 'get',
  })
}


/**
 * 增值服务标准定价区代列表2.1
 * @export
 * @param {*} data
 * @returns
 */

//根据条件获取发物流区代增值服务与平台标准增值服务v2.1(区代使用)列表
export function agencyAreaList(data) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclValueAgencyAndPlatformPriceNewV2/v1/list',
    method: 'post',
    data: data
  })
}

//新增发物流区代增值服务与平台标准增值服务v2.1(区代使用)
export function newAgencyArea(data) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclValueAgencyAndPlatformPriceNewV2/v1/add',
    method: 'post',
    data: data
  })
}

//禁用或启用发物流区代增值服务与平台标准增值服务v2.1(区代使用)
export function agencyAreaStatus(data) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclValueAgencyAndPlatformPriceNewV2/v1/banOrUse',
    method: 'put',
    data: data
  })
}

//preAdd新增发物流区代运作路线与平台运作路线v2.1(区代使用)
export function lineStandPriceEx(data) {
  return fetch({
    url: '/' + baseUrl2 + '/lclserver/aflcLclAreaAgencyAndLinePriceNewV2/v1/preAdd',
    method: 'post',
    data: data
  })
}
