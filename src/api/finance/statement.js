import fetch from '@/utils/fetch'
const baseurl = 'aflc-order'
 /**
 * 平台流水明细
 */
export function getStatementDetailList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrderPayment/v1/getListDetail',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 平台流水明细导出excel
export function getStatementDetailListExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrderPayment/v1/getListDetailExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}