import fetch from '@/utils/fetch'
const baseurl = "aflc-common"
const baseurl_two = "aflc-uc"

// const baseurl = "aflccommonservice-wtc"
// const baseurl_two = "aflcusercenterservice-wtc"

//获取同城列表

export function data_CityList() {
  return fetch.get('/'+baseurl+'/common/aflcCityTree/v1/cityList')
}

//增加城市

export function data_AddCity(data) {
  return fetch.post('/' + baseurl + '/common/aflcCityTree/v1/add', data)
}
// 根据地区获取所有商圈

export function data_CityCode(code) {
  return fetch.get('/'+ baseurl_two+'/usercenter/aflcTradeArea/v1/tradeAll/'+ code)
}
