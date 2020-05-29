import fetch from '@/utils/fetch'

const baseurl = 'aflc-sm'

//获取车贴待审查明细列表
export function CarStickerCheckList(data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcCarStickerCheck/v1/list',
    method: 'post',
    data:data
  })
}

//批量审批车贴订单
export function CarStickerBatchCheck(data) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcCarStickerCheck/v1/updateCarStickerOrder',
      method: 'put',
      data:data
    })
  }

//获取车贴待审查明细列表
export function CarStickerCheckList2(data) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcCarStickerCheck/v1/checkList',
      method: 'post',
      data:data
    })
  }
  
