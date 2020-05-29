import fetch from '@/utils/fetch'

const baseUrl = 'aflc-order'
// const baseUrl = 'aflcorderservice-xiawenjie'

//新增风控管理设置表
export function newRiskManageSetting(data) {
    return fetch({
      url: '/' + baseUrl + '/order/aflcRiskControlManageSetting/v1/add',
      method: 'post',
      data: data
    })
  }

//根据条件获取风控管理设置表列表
export function RiskManageList(data) {
    return fetch({
      url: '/' + baseUrl + '/order/aflcRiskControlManageSetting/v1/list',
      method: 'post',
      data: data
    })
  }