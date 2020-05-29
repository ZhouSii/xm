import fetch from '@/utils/fetch'
const baseur = 'aflc-order'
// const baseur = 'aflcorderservice-wtc'
 /**
 * 投保记录
 */
export function aflcOrderPinganInsure(page, pagesize, data) {
  return fetch({
    url: '/' + baseur + '/order/aflcOrderPinganInsure/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
