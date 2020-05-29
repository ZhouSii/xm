import fetch from '@/utils/fetch'
const baseurl = 'aflc-uc'
// 充值记录表列表
export function data_aflcRechargeList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcRecharge/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 充值记录表列表导出Excel
export function data_aflcRechargeListExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcRecharge/v1/exportExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
