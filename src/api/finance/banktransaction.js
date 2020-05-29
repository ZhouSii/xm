import fetch from '@/utils/fetch'
const baseurl = 'aflc-uc'
// const baseurl2 = 'aflcpayservice--xiawenjie'
const baseurl2 = 'aflc-pay'
// 内部资金账户 
// 获取资金账户列表
export function data_aflcFundAccount(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcFundAccount/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 资金账户获取Id
export function aflcFundAccountId(id) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcFundAccount/v1/' + id,
    method: 'get'

  })
}

//  增加资金账户
export function aflcFundAccountAdd(data) {
  return fetch.post('/' + baseurl + '/usercenter/aflcFundAccount/v1/add', data)
}

//  修改资金账户
export function aflcFundAccountUpdate(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcFundAccount/v1/update', data)
}

//  资金账户启用禁用
export function openOrForbidden(data) {
  return fetch.post('/' + baseurl + '/usercenter/aflcFundAccount/v1/openOrForbidden', data)
}

// 获取资金账户明细列表
export function data_aflcFundAccountDetail(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcFundAccountDetail/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 获取资金账户明细列表Excel
export function aflcFundAccountDetailExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcFundAccountDetail/v1/listExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 获取资金账户操作记录 /aflcFundAccountRecord/v1/recordId/
export function data_aflcFundAccountReviseDetail(id) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcFundAccountRecord/v1/recordId/' + id,
    method: 'get',
  })
}

//资金账户明细新增  aflcFundAccountDetail/v1/add
export function aflcFundAccountDetailAdd(data) {
  return fetch.post('/' + baseurl + '/usercenter/aflcFundAccountDetail/v1/addPlate', data)
}

//资金账户明细修改   /usercenter/aflcFundAccountDetail/v1/update
export function aflcFundAccountDetailUpdate(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcFundAccountDetail/v1/update', data)
}


// ============================================================

//外部资金账户
//微信账务订单月汇总列表
export function aflcWxDownloadBillSummaryMonth(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl2 + '/pay/aflcWxDownloadBillSummary/v1/listMonth',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

//微信账务订单日汇总列表
export function aflcWxDownloadBillSummaryDay(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl2 + '/pay/aflcWxDownloadBillSummary/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

//微信账务订单明细列表  /pay/aflcWxDownloadBill/v1/list
export function aflcWxDownloadBillDetail(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl2 + '/pay/aflcWxDownloadBill/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

//微信账务订单明细表excel导出 
export function aflcWxDownloadBillDetailExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl2 + '/pay/aflcWxDownloadBill/v1/getlistExcel',
    method: 'post',
    responseType: "blob",
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}


//微信资金账单月/日汇总列表
export function aflcWxDownloadFundFlowSummary(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl2 + '/pay/aflcWxDownloadFundFlowSummary/v1/listFundFlowSummary',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

//微信资金账单明细表 
export function aflcWxDownloadFundFlowDetail(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl2 + '/pay/aflcWxDownloadFundFlow/v1/listFundFlow',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 微信资金账单明细excel导出 
export function aflcWxDownloadFundFlowDetailExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl2 + '/pay/aflcWxDownloadFundFlow/v1/listFundFlowExcel',
    method: 'post',
    responseType: "blob",
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 支付宝账务明细列表 日/月
export function aflcAliDownloadListFundBillSummary(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl2 + '/pay/aflcAliDownloadBill/v1/listFundBill',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 支付宝账务明细详情 
export function aflcAliDownloadListFundBillDetail(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl2 + '/pay/aflcAliDownloadBillSummary/v1/listFundBusinessSummary',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

//支付宝账务明细详情excel 导出  /pay/aflcAliDownloadBillSummary/v1/listFundBillSummaryExcel
export function aflcAliDownloadListFundBillDetailExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl2 + '/pay/aflcAliDownloadBillSummary/v1/listFundBillSummaryExcel',
    method: 'post',
    responseType: "blob",
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

//支付宝业务明细列表  日/月 /pay/aflcAliDowoloadBusiness/v1/listFundBusiness
export function aflcAliDownloadListFundBusinessSummary(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl2 + '/pay/aflcAliDowoloadBusinessNew/v1/listFundBusiness',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

//支付宝业务明细详情 
export function aflcAliDownloadListFundBusinessDetail(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl2 + '/pay/aflcAliDowoloadBusinessSummary/v1/listFundBusinessSummary',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

//支付宝业务明细详情excel导出  
export function aflcAliDownloadListFundBusinessDetailExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl2 + '/pay/aflcAliDowoloadBusinessSummary/v1/listFundBusinessSummaryExcel',
    method: 'post',
    responseType: "blob",
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
