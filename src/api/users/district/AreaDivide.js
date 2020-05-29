import fetch from '@/utils/fetch'

const baseurl = "aflc-uc"

// 获取区域划分列表
export function data_post_aflcProfessionTradeArea(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcProfessionTradeArea/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 删除区域划分列表
export function data_Del_aflcProfessionTradeArea(id) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcProfessionTradeArea/v1/delete/' + id,
    method: 'delete'
  })
}

// 启用禁用区域划分列表
export function data_Able_aflcProfessionTradeArea(ids) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcProfessionTradeArea/v1/enableOrDisable',
    method: 'post',
    data: ids
  })
}

// 区域划分列表新增
export function data_post_aflcProfessionTradeArea_create(data) {
  return fetch.post('/' + baseurl + '/usercenter/aflcProfessionTradeArea/v1/add', data)
}

//  修改区域划分列表
export function data_post_aflcProfessionTradeArea_update(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcProfessionTradeArea/v1/update', data)
}

// id区域划分
export function data_get_aflcProfessionTradeAreaId(id) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcProfessionTradeArea/v1/' + id,
    method: 'get'
  })
}
