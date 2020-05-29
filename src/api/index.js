import fetch from '@/utils/fetch'

const baseurl = 'aflc-order'
/**
 * 请求的参数
 * {
	"nowStartTime":"2018-08-01 00:00:00",
	"nowEndTime":"2018-08-22 00:00:00",
	"pastStartTime":"2018-07-01 00:00:00",
	"pastEndTime":"2018-07-31 00:00:00"
}
 * @param {*} params
 */
export function postHomedetail(id, data) {
  return fetch.post('/api-system/system/tmshomedetail/v1/home/' + id, data).then(res => {
    return res.data
  })
}

export function getHomeYearDetail() {
  return fetch.get('/api-system/system/tmshomedetail/v1/findCapacityCompany').then(res => {
    return res.data
  })
}
/**
 * ====== 控制台 =======
 */
export function getConsoleData(data) {
  return fetch.post('/api-system/system/tmshomefinance/v1/get/', data)
}

export function getConsoleChartData() {
  return fetch.get('/api-system/system/tmshomefinance/v1/findCapacityorgid')
}


/**
 * ====== 在途监控 =======
 */

// 获取订单在线监控状态数量
export function getOrderMonitorCount(data) {
    return fetch({
      url: '/' + baseurl + '/order/aflcOrder/v1/getOrderMonitorCount',
      method: 'post',
      data:data
    })
  }

// 获取在线监控列表
export function getOrderMonitorList(data) {
    return fetch({
      url: '/' + baseurl + '/order/aflcOrder/v1/getOrderMonitorList',
      method: 'post',
      data:data
    })
  }

// 通过code获取那么
export function querySysDictUrl(code) {
    return fetch({
      url: '/aflc-common/aflcCommonSysDistApi/findAflcCommonSysDictByCodes/'+code,
      method: 'get',
    })
  }