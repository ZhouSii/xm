import fetch from '@/utils/fetch'
const baseurl = 'aflc-uc'
// const baseurl = 'aflcusercenterservice-lyw'
// const baseurl = 'aflcusercenterservice-deng'

// 获取商圈管理列表
export function data_get_aflcTradeArea_list(page, pagesize, data) {
    return fetch({
        url: '/' + baseurl + '/usercenter/aflcTradeArea/v1/list',
        method: 'post',
        data: {
        'currentPage': page,
        'pageSize': pagesize,
        'vo': data
        }
    })
}

  //商圈管理列表新增
  export function data_get_aflcTradeArea_create(data) {
    return fetch.post('/' + baseurl + '/usercenter/aflcTradeArea/v1/add', data)
  }

  //商圈管理列表新增
  export function data_get_aflcTradeArea_update(data) {
    return fetch.put('/' + baseurl + '/usercenter/aflcTradeArea/v1/update', data)
  }

//启用禁用商圈管理启用/禁用
export function data_Able_enableOrDisable(ids) {
  return fetch({
           url: '/' + baseurl + '/usercenter/aflcTradeArea/v1/enableOrDisable',
           method: 'post',
           data:ids
    })
   }   

 // id商圈管理树形
 export function data_get_treeList_Id(id) {
    return fetch({
      url: '/' + baseurl + '/usercenter/aflcTradeArea/v1/treeList/' + id,
      method: 'get',
    })
  }

 // 商圈管理树形全部
 export function data_get_treeAllList() {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcTradeArea/v1/treeAllList',
    method: 'get',
  })
}

// id商圈管理树形搜索
export function data_get_treeSearchList(tradeName) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcTradeArea/v1/treeSearchList?tradeName=' + tradeName,
    method: 'get',
  })
}

// 获取商圈管理列表详情
export function data_get_aflcTradeAreaDetail(id) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcTradeArea/v1/' + id,
    method: 'get',
  })
}

// 获取货主覆盖率统计列表详情
export function data_get_shipperCoverageRateList(id) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcTradeArea/v1/shipperCoverageRateList/' + id,
    method: 'get',
  })
}

// 获取货主下单统计列表详情
export function data_get_shipperOrderList(id) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcTradeArea/v1/shipperOrderList/' + id,
    method: 'get',
  })
}

// 获取所有启用商圈的坐标
export function getAllTradeArea() {
    return fetch({
      url: '/' + baseurl + '/usercenter/aflcTradeArea/v1/points',
      method: 'get',
    })
  }