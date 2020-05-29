
import fetch from '@/utils/fetch'

const baseUrl = 'aflc-uc'
// const baseUrl = 'aflcusercenterservice-wtc'

//新增增值服务定价-线路增值服务定价
export function newTradeAreaLineCarrier(data){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcIncrementPrice/v1/add',
      method: 'post',
      data:data
    })
  }

//根据条件获取增值服务定价import列表-线路增值服务定价
export function TradeAreaLineCarrierList(page,pagesize,data){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcIncrementPrice/v1/importlist',
      method: 'post',
      data:{
        "currentPage":page,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }

//根据ids 启用或禁用增值服务定价
export function TradeAreaLineCarrierStatus(data){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcIncrementPrice/v1/enableOrDisable',
      method: 'post',
      data:data
    })
  }


//根据areaCode获取增值服务定价
export function TradeAreaLineCarrierDetails(areaCode){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcIncrementPrice/v1/areaCode?areaCode=' + areaCode,
      method: 'get',
    })
  }

  //新增线路承运商
export function newTradeLineCarrier(data){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcTransportRange/v1/LineAdd',
      method: 'post',
      data:data
    })
  }

//根据条件获取获取线路承运商列表
export function TradeLineCarrierlist(page,pagesize,data){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcTransportRange/v1/LineCarrierImplist',
      method: 'post',
      data:{
        "currentPage":page,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }

//通过id获取线路承运商
export function LineCarrierDetails(LineId){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcTransportRange/v1/transportRangeLine/' + LineId,
      method: 'get',
    })
  }

//承运商在线路承运商中的所有承运商重泡比
export function LineCarrierWvRatio(carrierType,carrierId){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcTransportRange/v1/WvRatio?carrierType=' + carrierType+'&carrierId='+carrierId,
      method: 'get',
    })
  }