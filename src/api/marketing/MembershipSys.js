import fetch from '@/utils/fetch'

const baseurl = "aflc-uc"
// const baseurl = 'aflcusercenterservice-wtc'

//新增权益配置
export function addSystemMemberConfig(data) {
    return fetch({
      url: '/'+baseurl+'/usercenter/aflcMarketingMemberConfig/v1/addSystemMemberConfig',
      method: 'post',
      data:data
    })
  }

//权益配置列表
export function listSystemMemberConfig(data) {
    return fetch({
      url: '/'+baseurl+'/usercenter/aflcMarketingMemberConfig/v1/listSystemMemberConfig',
      method: 'post',
      data:data
    })
  }

//修改权益配置
export function updateSystemMemberConfig(data) {
    return fetch({
      url: '/'+baseurl+'/usercenter/aflcMarketingMemberConfig/v1/updateSystemMemberConfig',
      method: 'post',
      data:data
    })
  }

//获取兑换会员配置列表-28币兑换会员配置
export function listExchangeMemberConfig(data) {
    return fetch({
      url: '/'+baseurl+'/usercenter/aflcMarketingMemberConfig/v1/listExchangeMemberConfig',
      method: 'post',
      data:data
    })
  }

//启用/禁用 兑换会员配置-28币兑换会员配置
export function updateExchangeMemberConfigUsingStatus(MemberId) {
    return fetch({
      url: '/'+baseurl+'/usercenter/aflcMarketingMemberConfig/v1/updateExchangeMemberConfigUsingStatus/'+MemberId,
      method: 'post',
    })
  }

//保存兑换会员配置-28币兑换会员配置
export function addExchangeMemberConfig(data) {
    return fetch({
      url: '/'+baseurl+'/usercenter/aflcMarketingMemberConfig/v1/addExchangeMemberConfig',
      method: 'post',
      data:data
    })
  }

//获取购买会员配置列表-购买会员配置
export function listBuyMemberConfig(data) {
    return fetch({
      url: '/'+baseurl+'/usercenter/aflcMarketingMemberConfig/v1/listBuyMemberConfig',
      method: 'post',
      data:data
    })
  }

//保存购买会员配置-购买会员配置
export function addBuyMemberConfig(data) {
    return fetch({
      url: '/'+baseurl+'/usercenter/aflcMarketingMemberConfig/v1/addBuyMemberConfig',
      method: 'post',
      data:data
    })
  }

//启用/禁用-购买会员配置
export function updateBuyMemberConfigUsingStatus(MemberId) {
    return fetch({
      url: '/'+baseurl+'/usercenter/aflcMarketingMemberConfig/v1/updateBuyMemberConfigUsingStatus/'+MemberId,
      method: 'post',
    })
  }

//根据条件获取车主兑换会员明细表列表
export function DriverExchangeMemberList(data) {
    return fetch({
      url: '/'+baseurl+'/usercenter/aflcDriverBuyMemberDetail/v1/list',
      method: 'post',
      data:data
    })
  }

//根据条件获取车主28币账户发放列表 - 车主28币账户
export function DriverAccountList(data) {
    return fetch({
      url: '/'+baseurl+'/usercenter/aflcCoinsGrantDriver/v1/driverList',
      method: 'post',
      data:data
    })
  }

//根据条件获取车主28币账户发放明细表列表 - 车主28币账户
export function DriverAccountDetailsList(data) {
    return fetch({
      url: '/'+baseurl+'/usercenter/aflcCoinsGrantDriverDetail/v1/list',
      method: 'post',
      data:data
    })
  }