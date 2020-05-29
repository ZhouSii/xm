import fetch from '@/utils/fetch'

const baseurl = 'aflc-uc'
const baseurl_two = 'aflc-order'

// 获取服务分类列表
export function userMywalletSurvey() {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcMywallet/v1/userMywalletSurvey',
    method: 'get'

  })
}

// 财务管理->安发账户概况->交易构成
export function userTradeSurvey(data) {
    return fetch({
      url: '/' + baseurl_two + '/order/aflcOrderPayment/v1/userTradeSurvey',
      method: 'post',
        data:data
    })
  }

//根据time获取财务管理-营销收支
export function financial(time) {
    return fetch({
    //   url: '/' + baseurl + '/sm/aflcCouponUse/v1/financial' + time,
      url: '/aflcsmservice/sm/aflcCouponUse/v1/financial?time=' + time,
      method: 'get'
    })
  }