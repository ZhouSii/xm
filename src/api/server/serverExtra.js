import fetch from '@/utils/fetch'

const baseurl = "aflc-sm"

//获取额外服务费用列表
export function data_GetInformation(page,pagesize,data) {
    return fetch({
      url: '/'+baseurl+'/sm/aflcExtraPrice/v1/getListByKeywords',
      method: 'post',
      data:{
        "currentPage":page ,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }

//新增数据
export function data_AddForms(infoforms) {
    return fetch({
		url: '/'+baseurl+'/sm/aflcExtraPrice/v1/addOrUpdateList',
		method: 'post',
		data: infoforms
    })
  }

//删除数据
export function data_DeletInfo(infoforms) {
    return fetch({
		url: '/'+baseurl+'/sm/aflcExtraPrice/v1/delete',
		method: 'post',
		data: infoforms
    })
  }

//更改状态
export function data_ChangeStatus(id) {
    return fetch({
		url: '/'+baseurl+'/sm/aflcExtraPrice/v1/openOrForbidden',
		method: 'post',
		data: id
    })
  }




  


  