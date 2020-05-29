import fetch from '@/utils/fetch'

const baseUrl = 'aflc-order'
//根据条件获取订单信息列表
export function getGoodsSourceList(page,pagesize,data){
    return fetch({
      url: '/'+baseUrl+'/order/fclOrder/v1/findTotalOderCarrierList',
      method: 'post',
      data:{
        "currentPage": page,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }
   //更改订单状态
/**
 *
 *
 * @export
 * @param {*} id 
 * @param {*} type 状态码'0' '1'
 * @returns
 */
export function GoodsSourceStatus(id,type){
    return fetch({
      url: '/'+baseUrl+'/order/fclOrder/v1/setEnableType/'+id+'/'+type,
      method: 'PUT',
    })
  }