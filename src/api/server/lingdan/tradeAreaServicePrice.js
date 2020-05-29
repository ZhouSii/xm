
import fetch from '@/utils/fetch'

const baseUrl = 'aflc-uc'
// const baseUrl = 'aflcusercenterservice-wtc'


//新增增值服务定价-根据地区名称获取所有商圈
export function aflcTradeAreaTradeList(areaName){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcTradeArea/v1/tradeList/' + areaName,
      method: 'get',
    })
  }

//新增增值服务定价-新增商圈增值服务定价
export function newAflcTradeAreaServicePrice(data){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcIncrementPrice/v1/addTrade',
      method: 'post',
      data:data
    })
  }

//根据条件获取商圈增值服务定价import列表
export function TradeAreaServicePriceList(page,pagesize,data){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcIncrementPrice/v1/importlistTrade',
      method: 'post',
      data:{
        "currentPage":page,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }

//根据ids启用或禁用商圈增值服务定价
export function TradeAreaServicePriceStatus(ids){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcIncrementPrice/v1/enableOrDisableTrade',
      method: 'post',
      data:ids
    })
  }

//根据areaCode获取增值服务定价
export function TradeAreaServicePriceDetails(tradeId){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcIncrementPrice/v1/areaCodeTrade?areaCodeTrade=' + tradeId,
      method: 'get',
    })
  }

//新增商圈承运商
export function newTradeAreaCarrier(data){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcTradeCarrier/v1/add',
      method: 'post',
      data:data
    })
  }

//根据条件获取商圈承运商列表
export function TradeAreaCarrierList(page,pagesize,data){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcTradeCarrier/v1/list',
      method: 'post',
      data:{
        "currentPage":page,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }

//根据id获取商圈承运商
export function TradeAreaCarrierDetails(tradeId){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcTradeCarrier/v1/' + tradeId,
      method: 'get',
    })
  }