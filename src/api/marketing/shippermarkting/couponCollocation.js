import fetch from '@/utils/fetch'
const baseurl = 'aflc-sm'

// 获取领券配置列表
export function aflcCouponGetActivityList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcCouponGetActivity/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 获取领券配置ID
export function aflcCouponGetActivity_Id(id) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcCouponGetActivity/v1/' + id,
    method: 'get',
  })
}

// 领券配置新增
export function aflcCouponGetActivityCreate(data) {
  return fetch.post('/' + baseurl + '/sm/aflcCouponGetActivity/v1/add', data)
}

// 修改领券配置
export function aflcCouponGetActivityupdate(data) {
  return fetch.put('/' + baseurl + '/sm/aflcCouponGetActivity/v1/update', data)
}

// 启用领券配置
export function openOrForbidden(ids) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcCouponGetActivity/v1/openOrForbidden',
    method: 'post',
    data: ids
  })
}

// 获取领券记录列表
export function aflcCouponGetDetailList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcCouponGetDetail/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

//领取记录导出excel
export function aflcCouponGetDetailListExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcCouponGetDetail/v1/couponGetDetailExcel',
    method: 'post',
    responseType: 'blob',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
