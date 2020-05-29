import fetch from '@/utils/fetch'

const baseurl = 'aflc-uc'
const baseurl_two = 'aflc-common'
// const baseurl = "aflcusercenterservice-wtc"

// 获取商圈管理列表
export function data_get_aflcTradeArea_list(page,pagesize,data) {
    return fetch({
      url: '/'+baseurl+'/usercenter/aflcTradeArea/v1/list',
      method: 'post',
      data:{
        "currentPage": page,
        "pageSize": pagesize,   
        "vo": data
      }
    })
  }

  //商圈管理列表新增
export function data_get_aflcTradeArea_create(data) {
    return fetch.post('/' + baseurl + '/usercenter/aflcTradeArea/v1/add', data)
  }

//删除商圈管理列表
export function data_Del_aflcTradeArea(id) {
  return fetch({
        url: '/'+baseurl+'/usercenter/aflcTradeArea/v1/delete/'+id,
        method: 'delete',
      })
    }

//启用禁用商圈管理列表
export function data_Able_aflcTradeArea(ids) {
  return fetch({
           url: '/'+baseurl+'/usercenter/aflcTradeArea/v1/enableOrDisable',
           method: 'post',
           data:ids
    })
   }    

//  修改商圈管理列表
export function data_get_aflcTradeArea_update(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcTradeArea/v1/update', data)
}      


 //id商圈管理列表
 export function data_get_aflcTradeArea_Id(id) {
  return fetch({
    url: '/'+baseurl+'/usercenter/aflcTradeArea/v1/'+ id,
    method: 'get',
  })
}

// 获取分类单位列表
export function data_get_unitList() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF04903')
}

// 设置货物分类
export function aflcGoodscategorySetting(data) {
  return fetch({   
           url: '/'+baseurl+'/usercenter/aflcGoodscategorySetting/v1/add',
           method: 'post',
           data:data
         })
       }    

// 获取货物分类
export function aflcGoodscategorySettingTrade(data) {
  return fetch({
           url: '/'+baseurl+'/usercenter/aflcGoodscategorySetting/v1/trade/' + data,
           method: 'get',
         })
  }    