import fetch from '@/utils/fetch'
const baseurl = 'aflc-uc'

// 获取购买加速包列表
export function aflcBuyQuickpackageDetail(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcBuyQuickpackageDetail/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
