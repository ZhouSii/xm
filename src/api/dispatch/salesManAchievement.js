
import fetch from '@/utils/fetch'
const baseUrl = 'aflc-uc'

// 业务员目标设置列表
export function aflcSalesmanAimsSettingList(page, pagesize, data) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcSalesmanAimsSetting/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 新增业务员目标设置
export function aflcSalesmanAimsSettingAdd(data) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcSalesmanAimsSetting/v1/add',
    method: 'post',
    data: data
  })
}

// 修改业务员目标设置
export function aflcSalesmanAimsSettingUpdate(data) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcSalesmanAimsSetting/v1/update',
    method: 'put',
    data: data
  })
}

// 删除业务员目标设置
export function aflcSalesmanAimsSettingDelete(id) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcSalesmanAimsSetting/v1/delete/' + id,
    method: 'delete'
  })
}

// id业务员目标设置
export function aflcSalesmanAimsSetting_Id(id) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcSalesmanAimsSetting/v1/' + id,
    method: 'get'
  })
}
