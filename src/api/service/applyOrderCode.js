
import fetch from '@/utils/fetch'

// const baseurl = 'aflcsmservice-lyw'
const baseurl = 'aflc-sm'

//根据条件获取下单码申请列表
export function applyOrderCodeList(data) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcOrderCodeApply/v1/list',
      method: 'post',
      data: data
    })
  }

//根据id获取下单码申请
export function applyOrderCodeInfo(applyId) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcOrderCodeApply/v1/' + applyId,
      method: 'get',
    })
  }

//下单码申请跟进登记
export function updateApplyOrderCode(data) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcOrderCodeApply/v1/update',
      method: 'put',
      data: data
    })
  }