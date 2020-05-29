import fetch from '@/utils/fetch'

// const baseurl_two = "aflcsmservice"
const baseurl = "aflc-sm"

//获取达量同城列表
export function data_get_orderFromsame_list(page,pagesize,data) {
    return fetch({
      url: '/'+baseurl+'/sm/aflcDriverOrdernumReward/v1/list',
      method: 'post',
      data:{
        "currentPage": page,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }

//达量同城列表新增
export function data_get_orderFromsame_create(data) {
    return fetch.post('/' + baseurl + '/sm/aflcDriverOrdernumReward/v1/add', data)
  }

 //id获取达量同城列表
export function data_get_orderFromsame_Id(id) {
        return fetch({
          url: '/'+baseurl+'/sm/aflcDriverOrdernumReward/v1/'+id,
          method: 'get',
        })
      }
    
//删除达量同城列表
export function data_Del_orderFromsame(id) {
    
    return fetch({
          url: '/'+baseurl+'/sm/aflcDriverOrdernumReward/v1/delete/'+id,
          method: 'delete',
        })
      }
//启用禁用达量同城列表
export function data_Able_orderFromsame(ids) {
        
     return fetch({
              url: '/'+baseurl+'/sm/aflcDriverOrdernumReward/v1/enableOrDisable',
              method: 'post',
              data:ids
            })
          }
    
//  修改达量同城列表
export function data_get_orderFromsame_update(data) {
      return fetch.put('/' + baseurl + '/sm/aflcDriverOrdernumReward/v1/update', data)
    }      
