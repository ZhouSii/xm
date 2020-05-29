import fetch from '@/utils/fetch'
const baseurl = "aflc-uc"
// const baseurl = 'aflcusercenterservice-lxd'
// const baseurl = 'aflcusercenterservice-deng'

// 根据条件获取业务分组表列表（全部）
export function getAllBusinessGroup() {
  return fetch.get('/' + baseurl + '/usercenter/aflcBusinessGroup/v1/tree')
}

//根据条件获取业务分组人员信息表列表
export function aflcBusinessGroupUserList(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcBusinessGroupUser/v1/list',
    method: 'post',
    data: data
  })
}

//新增业务分组和相关人员信息
export function addGroupAndUsers(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcBusinessGroup/v1/addGroupAndUsers',
    method: 'post',
    data: data
  })
}

//修改业务分组和相关人员信息
export function updateGroupAndUsers(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcBusinessGroup/v1/updateGroupAndUsers',
    method: 'put',
    data: data
  })
}

//查询业务分组和相关人员信息(根据id查找当前节点下业务人员)
export function getCurrentBusinessGroupPerson(currentId) {
  return fetch.get('/' + baseurl + '/usercenter/aflcBusinessGroup/v1/selectGroupAndUsers/' + currentId)
}