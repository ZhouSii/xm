import fetch from '@/utils/fetch'
const baseurl = 'aflc-uc'

// 根据条件获取用户二维码表列表
export function UserQrCodeList(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcUserQrCode/v1/findUserQrCodeList',
    method: 'post',
    data: data
  })
}

//新增用户二维码表
export function addUserQrCode(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcUserQrCode/v1/addUserQrCode',
    method: 'post',
    data: data
  })
}

// 根据id修改用户二维码表
export function updateUserQrCode(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcUserQrCode/v1/updateUserQrCode',
    method: 'put',
    data:data
  })
}


//根据id获取用户二维码表
export function userQrCodeDetails(id){
    return fetch.get('/' + baseurl + '/usercenter/aflcUserQrCode/v1/userQrCode/'+id)
}

//根据id查找用户二维码修改记录
export function userQrCodeUpdataList(id){
    return fetch.get('/'+ baseurl + '/usercenter/aflcUserQrCode/v1/findUserQrCodeUpdateListById/'+id)
}
