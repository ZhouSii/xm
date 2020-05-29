import fetch from '../../utils/fetch'

const baseurl = 'aflc-common'
/**
 * 修改密码
 */
// export function putChangeMyPassword(obj) {
//     return fetch.put('/api-system/system/user/v1/updatePassword', obj)
//   }

export function putChangeMyPassword(obj) {
    return fetch({
      url: '/'+baseurl+'/common/aflcCommonUser/v1/updatePlatformAdminPassword',
      method: 'PUT',
      data:obj
    })
  }
  


  
