/* 
* @Author: Marte
* @Date:   2018-05-14 18:21:36
* @Last Modified by:   Marte
* @Last Modified time: 2018-05-16 18:05:26
*/

import fetch from '@/utils/fetch'

const baseurl = "aflc-common"
const baseurl_two = 'aflc-common'

// 获取树节点的数据
export function data_Trees(page,pagesize,pid) {
  return fetch({
    url: '/'+baseurl+'/sysDict/findSysDictByPid',
    method: 'post',
    data: {
        "currentPage": page,
        "pageSize": pagesize,
        "vo": {
          "pid": pid
        }
    }
  })
}

//获取树结构
export function data_Dic(){
    return fetch.get('/'+baseurl+'/sysDict/list') 
}

//模糊查询
export function data_Search(page,pagesize,pid,info) {
  return fetch({
    url: '/'+baseurl+'/sysDict/findSysDictByPid',
    method: 'post',
    data: {
          "currentPage": page,
          "pageSize": pagesize,
          "vo": {
            "pid":pid,
            "likeNameOrCode": info
          }
    }
  })
}

//获取code
export function data_CreatCode(pid) {
  return fetch({
    url: '/'+baseurl+'/sysDict/nextCode/'+pid,
    method: 'get'
  })
}

// 删除数据
export function data_Delet(delID) {
  return fetch({
    url: '/'+baseurl+'/sysDict/deleteSysDict',
    method: 'post',
    data:delID
  })
}

// 更改状态
export function data_changeStatus(ID) {
  return fetch({
    url: '/'+baseurl+'/sysDict/batchForbiddenSysDict',
    method: 'post',
    data:ID
  })
}

//添加数据
export function data_AddForms(infoforms) {
  return fetch({
    url: '/'+baseurl+'/sysDict/batchAddSysDict',
    method: 'post',
    data: infoforms
  })
}

//生成顶层内容
export function data_CreatCode_top() {
  return fetch({
    url:'/'+baseurl+ '/sysDict/nextCode/top',
    method: 'get'
  })
}
//修改数据
export function data_ChangeForms(infoforms) {
  return fetch({
    url: '/'+baseurl+'/sysDict/updateSysDict',
    method: 'post',
    data: infoforms
  })
}

//清除缓存
export function data_clearCache() {
  return fetch({
    url:'/'+baseurl_two+ '/sysDict/clearCache',
    method: 'get'
  })
}


//导入excel的数据字典
export function data_importDictExcel(data) {
  return fetch({
    url: '/'+baseurl_two+'/sysDict/importDictExcel',
    method: 'post',
    data:data
  })
}


