import fetch from '@/utils/fetch'

const baseurl = "aflc-lcl"

//客服管理-发物流-中转运单费用变更查询
export function waybilloutsourceexpenseschangeList(data) {
    return fetch({
      url: '/'+ baseurl + '/lcl/waybilloutsourceexpenseschange/platform/list',
      method: 'post',
      data:data
    })
  }

//客服管理费用变列表
export function findOrderExpensesChangeManageList(data) {
    return fetch({
      url: '/'+ baseurl + '/lcl/lclAreaAgencyWaybill/findOrderExpensesChangeManageList',
      method: 'post',
      data:data
    })
  }