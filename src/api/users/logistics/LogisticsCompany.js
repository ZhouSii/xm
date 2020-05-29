import fetch from '@/utils/fetch'

const baseurl = 'aflc-uc'
// const baseurl = 'aflcusercenterservice-xxl'

// 获取物流公司列表
export function data_LogisticsCompanyList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcLogisticsCompany/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 修改物流公司
export function data_ChangeLogisticsCompany(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcLogisticsCompany/v1/update',
    method: 'PUT',
    data: data
  })
}

// 认证物流公司
export function authAflcLogisticsCompany(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcLogisticsCompany/v1/authAflcLogisticsCompany',
    method: 'post',
    data: data
  })
}

//新增物流公司
export function newLogisticsCompany(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcLogisticsCompany/v1/addV2',
    method: 'post',
    data: data
  })
}

// 解冻时获取冻结原因 || 根据id获取物流公司
export function getaflcLogisticsCompanyFreezeReason(id) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcLogisticsCompany/v1/comId/' + id,
    method: 'get',
  })
}
