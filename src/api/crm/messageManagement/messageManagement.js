import fetch from '@/utils/fetch'

const baseurl = 'aflc-uc' // 157环境
// const baseurl = 'aflcusercenterservice-deng' // 开发环境

// 拜访打卡报错处理列表
export function visitFailList(params, data) {
  return fetch({
    url: '/' + baseurl + `/usercenter/aflcvisitshippertask/v1/platform/visitFailList?${params}`,
    method: 'post',
    data: data
  })
}
// 提交处理
export function updateVisitFail(data) {
  return fetch({
    url: '/' + baseurl + `/usercenter/aflcvisitshippertask/v1/platform/updateVisitFail`,
    method: 'post',
    data: data
  })
}