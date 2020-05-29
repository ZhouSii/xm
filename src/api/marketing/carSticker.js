import fetch from '@/utils/fetch'
// const baseurl = 'aflcsmservice-wtc'
const baseurl = 'aflc-sm'

/* 
  车贴产品配置
*/
//根据条件获取车贴产品配置表列表
export function carStickerList(data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcDriverStickerSetting/v1/list',
    method: 'post',
    data:data
  })
}
//新增车贴产品配置表
export function newCarSticker(data) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcDriverStickerSetting/v1/add',
      method: 'post',
      data:data
    })
  }
//根据id修改车贴产品配置表
export function updateCarSticker(data) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcDriverStickerSetting/v1/update',
      method: 'put',
      data:data
    })
  }
//根据id获取车贴产品配置表
export function carStickerDetails(id) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcDriverStickerSetting/v1/'+id,
      method: 'get',
    })
  }
//根据id删除车贴产品配置表
export function deleteCarSticker(id) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcDriverStickerSetting/v1/delete/'+id,
      method: 'DELETE',
    })
  }

//显示或隐藏车贴产品配置表
export function carStickerStatus(data) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcDriverStickerSetting/v1/enableOrDisable',
      method: 'post',
      data:data
    })
  }

/* 
  车贴每月手势配置
*/
//根据条件获取车贴每月手势配置列表
export function gestureConfigList(data) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcDriverStickerGestureSetting/v1/list',
      method: 'post',
      data:data
    })
  }

//新增车贴每月手势配置
export function newGestureConfig(data) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcDriverStickerGestureSetting/v1/add',
      method: 'post',
      data:data
    })
  }

//根据id修改车贴每月手势配置
export function updateGestureConfig(data) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcDriverStickerGestureSetting/v1/update',
      method: 'put',
      data:data
    })
  }

//根据id获取车贴每月手势配置
export function gestureConfigDetails(id) {
    return fetch({
        url: '/' + baseurl + '/sm/aflcDriverStickerGestureSetting/v1/'+id,
        method: 'get',
    })
}

/* 
  车贴申请/上报
*/
//申请/上报审批列表
export function carStickerApplyList(data) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcCarStickerOrder/v1/list',
      method: 'post',
      data:data
    })
  }

//申请/上报审批详情
export function carStickerApplyDetails(orderSerial) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcCarStickerApply/v1/orderSerial/'+orderSerial,
      method: 'get',
    })
  }

//根据条件获取车贴备注表列表
export function carStickerRemakeList(data) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcCarStickerFollowing/v1/list',
      method: 'post',
      data:data
    })
  }

//新增车贴备注表
export function addCarStickerRemake(data) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcCarStickerFollowing/v1/add',
      method: 'post',
      data:data
    })
  }

//申请/上报审核
export function carStickerCheck(data) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcCarStickerApply/v1/check',
      method: 'post',
      data:data
    })
  }

//申请/上报审核
export function carStickerApplyExcel(data) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcCarStickerOrder/v1/exportListExcel',
      method: 'post',
      responseType:'blob',
      data:data
    })
  }

//车贴责任人
export function carStickerConserveFollowUp(data) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcCarStickerResponsible/v1/change',
      method: 'post',
      data:data
    })
  }


/* 
  车贴初审
*/

//初审列表
export function firstTrialList(data) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcCarStickerFirstTrial/v1/list',
      method: 'post',
      data:data
    })
  }

//根据id获取车贴初审
export function firstTrialDetails(id) {
    return fetch({
        url: '/' + baseurl + '/sm/aflcCarStickerFirstTrial/v1/'+id,
        method: 'get',
      })
    }

//车贴初审审核
export function firstTrialCheck(data) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcCarStickerFirstTrial/v1/check',
      method: 'post',
      data:data
    })
  }

//已通过初审修改记录
export function firstTrialRevise(data) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcCarStickerFirstTrial/v1/modify',
      method: 'post',
      data:data
    })
  }

/* 
  车贴月审
*/
//月审列表
export function monthTrialList(data) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcCarStickerMonthTrial/v1/list',
      method: 'post',
      data:data
    })
  }

//车贴月审审核 AF0880704 月审通过,待月审复审
export function monthTrialCheck(data) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcCarStickerMonthTrial/v1/check',
      method: 'post',
      data:data
    })
  }

//车贴月审详情
export function monthTrialDetails(id) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcCarStickerMonthTrial/v1/'+id,
      method: 'get',
    })
  }

//车贴月审复审
export function monthTrialRepeatCheck(data) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcCarStickerMonthTrial/v1/repeatCheck',
      method: 'post',
      data:data
    })
  }

//未提交月审列表
export function monthTrialUnsubmitList(data) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcCarStickerMonthTrial/v1/unsubmit',
      method: 'post',
      data:data
    })
  }

//导出未提交月审
export function exportUnsubmitList(data) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcCarStickerMonthTrial/v1/exportUnsubmitExcel',
      responseType: 'blob',
      method: 'post',
      data:data
    })
  }
  
//导出月审列表
export function exportMonthTrialList(data) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcCarStickerMonthTrial/v1/exportListExcel',
      responseType: 'blob',
      method: 'post',
      data:data
    })
  }

/* 
  车贴记录统计
*/

//违规登记
export function carStickerRecordStatisticsList(data) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcCarStickerCheck/v1/list',
      method: 'post',
      data:data
    })
  }

//获取车贴费用报表列表
export function carStickerPaymentList(data) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcCarStickerOrderPayment/v1/carStickerPaymentList',
      method: 'post',
      data:data
    })
  }

//根据条件获取车贴订单交易明细列表
export function carStickerTradePayList(data) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcCarStickerOrderPayment/v1/list',
      method: 'post',
      data:data
    })
  }

