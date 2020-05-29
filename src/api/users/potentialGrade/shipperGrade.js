import fetch from '@/utils/fetch'
const baseurl = 'aflc-uc'
// const baseurl = 'aflcusercenterservice-wtc'

// 潜力等级调整列表
export function shipperLevelList(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcShipperExtend/v1/shipperLevelList',
    method: 'post',
    data: data
  })
}

// 潜力等级批量更新
export function batchPotentialGrade(data) {
    return fetch({
      url: '/' + baseurl + '/usercenter/aflcShipperExtend/v1/updatePotentialGrade',
      method: 'put',
      data: data
    })
  }