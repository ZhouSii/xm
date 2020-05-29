import fetch from '@/utils/fetch'
// const baseUrl = 'aflcusercenterservice-xxl'
const baseUrl = 'aflc-uc'

/* 
    运营人员
 */

// 根据条件获取发物流运营人员管理列表
export function operatorList(data) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcLclInformationOperater/v1/list',
    method: 'post',
    data: data
  })
}

// 新增发物流运营人员管理
export function newOperator(data) {
    return fetch({
      url: '/' + baseUrl + '/usercenter/aflcLclInformationOperater/v1/add',
      method: 'post',
      data: data
    })
  }

// 根据id获取发物流运营人员管理
export function operatorDetails(userId) {
    return fetch({
      url: '/' + baseUrl + '/usercenter/aflcLclInformationOperater/v1/'+userId,
      method: 'get',
    })
  }

// 根据id修改发物流运营人员管理
export function updateOperator(data) {
    return fetch({
      url: '/' + baseUrl + '/usercenter/aflcLclInformationOperater/v1/update',
      method: 'put',
      data: data
    })
  }

// 根据id删除发物流运营人员管理
export function deleteOperator(userId) {
    return fetch({
      url: '/' + baseUrl + '/usercenter/aflcLclInformationOperater/v1/delete/'+userId,
      method: 'DELETE',
    })
  }

// 启用或者禁用发物流运营人员管理
export function statusOperator(userId,status) {
    return fetch({
      url: '/' + baseUrl + '/usercenter/aflcLclInformationOperater/v1/banOrUse/'+userId+'?banOrUse='+status,
      method: 'post',
    })
  }

/* 
    承包产品
 */
//根据条件获取发物流承包产品管理列表
export function contractProductList(data) {
    return fetch({  
      url: '/' + baseUrl + '/usercenter/aflcLclContractProduct/v1/list',
      method: 'post',
      data: data
    })
  }
//新增发物流承包产品管理
export function newContractProductList(data) {
    return fetch({
      url: '/' + baseUrl + '/usercenter/aflcLclContractProduct/v1/add',
      method: 'post',
      data: data
    })
  }
//根据id修改发物流承包产品管理
export function updataContractProductList(data) {
    return fetch({
      url: '/' + baseUrl + '/usercenter/aflcLclContractProduct/v1/update',
      method: 'put',
      data: data
    })
  }
//根据id获取发物流承包产品管理
export function contractProductDetails(id) {
    return fetch({
      url: '/' + baseUrl + '/usercenter/aflcLclContractProduct/v1/'+ id,
      method: 'get',
    })
  }

//根据id删除发物流承包产品管理
export function deleteContractProduct(id) {
    return fetch({
      url: '/' + baseUrl + '/usercenter/aflcLclContractProduct/v1/delete/'+ id,
      method: 'DELETE',
    })
  }

//查询发物流承包产品管理(供承包商新增接口)
export function ProductList() {
    return fetch({
      url: '/' + baseUrl + '/usercenter/aflcLclContractProduct/v1/idAndName',
      method: 'post',
    })
  }

/* 
    承包商
 */
//新增发物流承包商户管理V2.0
export function newContractor(data) {
    return fetch({
      url: '/' + baseUrl + '/usercenter/aflcLclContractMerchant/v1/add',
      method: 'post',
      data:data
    })
  }

//获取发物流承包商户管理V2.0
export function contractorList(data) {
    return fetch({
      url: '/' + baseUrl + '/usercenter/aflcLclContractMerchant/v1/list',
      method: 'post',
      data:data
    })
  }

//根据id获取发物流承包商户管理V2.0
export function contractorDetails(id) {
    return fetch({
      url: '/' + baseUrl + '/usercenter/aflcLclContractMerchant/v1/'+id,
      method: 'get',
    })
  }

//根据id修改发物流承包商户管理V2.0
export function updateContractor(data) {
    return fetch({
      url: '/' + baseUrl + '/usercenter/aflcLclContractMerchant/v1/update',
      method: 'put',
      data:data
    })
  }

//根据id删除发物流承包商户管理V2.0
export function deleteContractor(id) {
    return fetch({
      url: '/' + baseUrl + '/usercenter/aflcLclContractMerchant/v1/delete/'+ id,
      method: 'DELETE',
    })
  }

/* 
    推送管理
 */

//获取发物流承包商户管理V2.0
export function pushManagementList(data) {
    return fetch({
      url: '/' + baseUrl + '/usercenter/aflcLclCargoInformationPush/v1/list',
      method: 'post',
      data:data
    })
  }

//新增发物流货源推送管理
export function newPushManagement(data) {
    return fetch({
      url: '/' + baseUrl + '/usercenter/aflcLclCargoInformationPush/v1/add',
      method: 'post',
      data:data
    })
  }

//根据id修改发物流货源推送管理
export function updatePushManagement(data) {
    return fetch({
      url: '/' + baseUrl + '/usercenter/aflcLclCargoInformationPush/v1/update',
      method: 'put',
      data:data
    })
  }

//根据id获取发物流货源推送管理
export function pushManagementDetails(id) {
    return fetch({
      url: '/' + baseUrl + '/usercenter/aflcLclCargoInformationPush/v1/'+id,
      method: 'get',
    })
  }

//根据id删除发物流货源推送管理
export function deletePushManagement(id) {
    return fetch({
      url: '/' + baseUrl + '/usercenter/aflcLclCargoInformationPush/v1/delete/'+ id,
      method: 'DELETE',
    })
  }

/* 
    推荐管理
 */
//获取发物流承包商户管理V2.0
export function RecommendedManagementList(data) {
    return fetch({
      url: '/' + baseUrl + '/usercenter/aflcLclMerchantInfoPush/v1/list',
      method: 'post',
      data:data
    })
  }
//新增发物流商家信息推荐v2.0
export function newRecommendedManagement(data) {
    return fetch({
      url: '/' + baseUrl + '/usercenter/aflcLclMerchantInfoPush/v1/add',
      method: 'post',
      data:data
    })
  }
//根据id修改发物流商家信息推荐v2.0
export function updateRecommendedManagement(data) {
    return fetch({
      url: '/' + baseUrl + '/usercenter/aflcLclMerchantInfoPush/v1/update',
      method: 'put',
      data:data
    })
  }

//根据id获取发物流商家信息推荐v2.0
export function recommendedManagementDetails(id) {
    return fetch({
      url: '/' + baseUrl + '/usercenter/aflcLclMerchantInfoPush/v1/'+id,
      method: 'get',
    })
  }

//根据id删除发物流商家信息推荐v2.0
export function deleteRecommendedManagement(id) {
    return fetch({
      url: '/' + baseUrl + '/usercenter/aflcLclMerchantInfoPush/v1/delete/'+ id,
      method: 'DELETE',
    })
  }