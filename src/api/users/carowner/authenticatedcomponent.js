import fetch from '@/utils/fetch'

const baseurl = 'aflc-uc'

// 获取车主列表
export function data_get_driver_list(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcDriver/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
