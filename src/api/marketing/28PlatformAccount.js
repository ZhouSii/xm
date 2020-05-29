import fetch from '@/utils/fetch'
const baseurl = 'aflc-uc'
const baseurl_two = 'aflc-common'

// 获取28加速包列表
export function aflcCoinsGrantDetail(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcCoinsGrantDriverDetail/v1/platformList',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 科目
export function getCode(code) {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/' + code)
}
