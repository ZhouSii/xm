import fetch from '@/utils/fetch'

const baseurl_two = 'aflc-common'
// const baseurl_two = 'aflccommonservice-xxl'
const baseurl = 'aflc-sm'
const baseurl_three = 'aflc-uc'

/**
 * 获取城市数据
 */
export function getCityInfo(code) {
  code = code || ''
  return fetch.get('/' + baseurl_two + '/common/aflcCommonPCA/v1/findAflcCommonPCAByCode?code=' + code).then(res => {
    res.code = code
    return res
  })
}

// 根据区域code查询街道
export function getStreetInfo(parentCode) {
  return fetch.get('/' + baseurl_two + '/common/aflcCommonPCA/v1/findAllStreetby/' + parentCode)
}

// 通过数据字典查询
/**
 * @export
 * @param {*} code 数据字典code值
 * @returns
 */
export function getDictionary(code) {
  return fetch({
    url: '/' + baseurl_two + '/sysDict/getSysDictByCodeGet/' + code,
    method: 'get'
  })
}

/**
 * @export
 * @param {*} codes 数据字典code值
 * @returns
 */
export function getDictionarys(codes) {
  return fetch({
    url: '/' + baseurl_two + '/aflcCommonSysDistApi/findAflcCommonSysDictByCodes/' + codes,
    method: 'get'
  })
}

export function getDictBycode(code) {
  return fetch({
    url: '/' + baseurl_two + '/sysDict/findAflcCommonSysDictBycode/' + code,
    method: 'get'
  })
}

// 投诉分类
export function DicComplainatusType() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF00424')
}
// 货损类型
export function DicClaimStatusType() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF021')
}
// 处理状态
export function DicDelStatusType() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF040')
}
// 物损处理状态
export function ClaimStatusType() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF048')
}
//  数据字典获取移入黑名单原因列表
export function DicBlackType() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF02004')
}

  // 获取冻结原因字典
export function DicfreezeType() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF02003')
}

  // 获取服务分类
export function DicServiceType() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF017')
}
// 获取车辆类型
export function DicCartype() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF018')
}

// 获取车辆规格
export function DicCartypeSpec() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF009')
}

// 获取车源有效期
export function DicCarSourceTime() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF05602')
}

// 获取车源状态
export function DicCarSourceStatus() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF05603')
}

// 根据服务分类和车辆类型选择车长
export function GetCarStyle(serviceTypeCode, cartypeCode) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcStandardPrice/v1/getPriceByServiceAndCarType/' + serviceTypeCode + '/' + cartypeCode,
    method: 'get'
  })
}

// 获取货主类型
export function DicShippertype() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF00101')
}

// 获取车辆规格 加宽  加长等
export function DicCarType() {
  return fetch({
    url: '/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF009',
    method: 'get'
  })
}

// 获取货主优惠等级
export function DicShipperLevel() {
  return fetch({
    url: '/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF00208',
    method: 'get'
  })
}

// 获取货主优惠等级
export function DicQRcodeLink() {
  return fetch({
    url: '/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF054',
    method: 'get'
  })
}

// 承运商类型
export function DicTradeCarrier() {
  return fetch({
    url: '/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF053',
    method: 'get'
  })
}
// 中单等级
export function DicObtainGrade() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF00503')
}

// 奖励等级
export function DicRewardGrade() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF00207')
}

// 抽佣等级
export function DicBrokerageGrade() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF00206')
}

// 提现等级
export function DicTakeCashGrade() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF00209')
}

// 获取用户类型(业务组)
export function DicUsersType() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF062')
}

// 获取成功推荐用户类型
export function DicRecommendType() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF063')
}

// 获取奖励类型类型
export function DicRewordType() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF064')
}

// 获取奖励类型类型
export function DicBehaviorScore() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF057')
}

// 业务权益类型
export function DicBusinessInterests() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF00210')
}

// 推荐类型
export function DicRecommendTypeCode() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF066')
}

// 付款状态
export function DicPayStatus() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF008')
}

// 通知方式管理
export function DicNotifyWay() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF074')
}

// 消息通知类型
export function DicMessageType() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF075')
}

// 承包产品类型
export function DicContractProduct() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF076')
}
// 承包商可见
export function DicShowlogistics() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF077')
}
// 推荐专线
export function DicRecommendLogistics() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF078')
}
// 货主同城潜力等级
export function DicGradeType() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF00211')
}
// 商圈行业
export function DicIndustryType() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF06803')
}

//订单审查状态
export function DicOrderExType() {
    return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF08501')
  }
//订单审核状态
export function DicOrderAuditStatusType() {
    return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF08506')
  }

// 异常处理状态
export function DicAbnormalType() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF08502')
}
// 订单复审不通过原因
export function DicOrderDis() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF08507')
}

// 订单取消原因
export function DicOrderCancel() {
    return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF00513')
  }
//车贴类型
export function DicOrderCarSticker() {
    return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF0880301')
  }
//车贴时效
export function DicOrderCarStickerTime() {
    return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF0880302')
}

// 转换状态
export function TransformType() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF08403')
}

// 跟进状态
export function FollowUpType() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF08404')
}

//申请/上报类型
export function ApplyType() {
    return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF0880303')
  }

//当前车贴状态
export function CarStickerType() {
    return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF08805')
  }

//车贴申请结果
export function CarStickerStatusType() {
    return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF08804')
  }

//车贴初审状态
export function firstTrialType() {
    return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF08806')
  }

//车贴申请图片审核结果（AF08808）
export function CarStickerImgType() {
    return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF08808')
  }

//上报补偿金（AF0880304）
export function CompensateMoneyType() {
    return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF0880304')
  }

//复审驳回原因（AF08810）
export function RejectTypeStatus() {
    return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF08810')
  }

//交易方式
export function tradeTypeStatus() {
    return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF00418')
  }
//车贴订单照片不通过原因
export function CarStickerImgNoPassType() {
    return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF08802')
  }

//发物流订单运输状态
export function logisticsOrderType() {
    return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF0710801')
  }
  
//拒绝客户订单原因(AF05006)
export function logisticsRefusedType() {
    return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF05006')
  }
  
// 物流公司确认承运后-货主取消订单（AF04913）
export function logisticsCancelType() {
    return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF04913')
  }

//运单状态AF0710803
export function WaybilllType() {
    return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF0710803')
  }

//派单方式AF00515
export function dispatchWayType() {
    return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF00515')
  }

//中转订单费用变更状态AF07114
export function transferType() {
    return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF07114')
  }

//冻结车主账号
export function driverFrozenType() {
    return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF02005')
  }
//申请不通过原因
export function ApplyUnpassReason() {
    return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF08814')
  }

//月审不通过/驳回原因
export function MonthUnpassReason() {
    return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF08816')
  }

//初审不通过/驳回原因
export function FirstUnpassReason() {
    return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF08815')
  }

/**
 * 获取图片上传的policy
 * callback
 *"data": {
        "accessid": "LTAIFj5nQSIxEZ8H",
        "policy": "eyJleHBpcmF0aW9uIjoiMjAxOC0wNS0yMlQxNjowNTowMC4yNThaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCJ0bXMvIl1dfQ==",
        "signature": "NJ8HhMX9ZpLfNy7ojaA95O0jFxY=",
        "dir": "tms/",
        "host": "http://aflc.oss-cn-shenzhen.aliyuncs.com",
        "expire": "1527005100"
    }
 */

/**
 * 获取图片上传的policy
 * callback
 *"data": {
        "accessid": "LTAIFj5nQSIxEZ8H",
        "policy": "eyJleHBpcmF0aW9uIjoiMjAxOC0wNS0yMlQxNjowNTowMC4yNThaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCJ0bXMvIl1dfQ==",
        "signature": "NJ8HhMX9ZpLfNy7ojaA95O0jFxY=",
        "dir": "tms/",
        "host": "http://aflc.oss-cn-shenzhen.aliyuncs.com",
        "expire": "1527005100"
    }
 */
window.UPLOADPOLICYDATA = '' // 用来缓存上传policy
window.UPLOADPOLICYDATA_timer = '' // 加个定时器变量，防止没有引用的定时器被自动回收
/* window.UPLOADPOLICYDATA = {
  'accessid': 'LTAIFj5nQSIxEZ8H',
  'policy': 'eyJleHBpcmF0aW9uIjoiMjAxOC0wOS0xNlQxOToyMDowMS4zMTJaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCJ0bXMvIl1dfQ==',
  'signature': 'A+ZRKPmw0mFXhNNdd5ycyoH6g9c=',
  'dir': 'tms/',
  'host': 'http://aflc.oss-cn-shenzhen.aliyuncs.com',
  'expire': '1537125601'
} */
// new阿里云上传    aflc公用桶   aflcprivate私有桶
export function getUploadPolicy(data) {
  // 后期可添加是否过期的验证
  if (window.UPLOADPOLICYDATA) {
    return new Promise((resolve) => {
      resolve(window.UPLOADPOLICYDATA)
    })
  } else {
      //   return fetch.get('/api-common/common/oss/v1/policy').then(res => {
    return fetch.get('/aflc-common/common/oss/v1/policy?bucket=' + data).then(res => {
      window.UPLOADPOLICYDATA = res.data || ''
      // 定时清除旧数据
      window.UPLOADPOLICYDATA_timer = setTimeout(() => {
        window.UPLOADPOLICYDATA = ''
      }, 1 * 60 * 1000)
      return window.UPLOADPOLICYDATA
    })
  }
}

// 签名URL进行临时授权
export function generatePreSignedUrl(url_data) {
  return fetch.get('/aflc-common/common/oss/v1/generatePreSignedUrl?bucket=aflcprivate&key=' + url_data)
}
/**
 * 获取下拉框类型
 * @param {*} type 下拉类型
 * @param {*} orgid 网点id
 */
export function getSelectType(type = '', orgid) {
  return fetch.get('/api-system/system/dict/v1/selectDictInfo', {
    params: {
      dictType: type,
      orgid
    }
  }).then(res => {
    return res.data || []
  })
}

  // 获取省级数据
export function data_getProvinceList() {
  return fetch.get('/' + baseurl + '/sm/aflcDistrict/v1/getProvinceList')
}

// 获取省级对应的城市列表
export function data_GetCityList(code) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcDistrict/v1/lists',
    method: 'post',
    data: {
      'code': code
    }
  })
}

// 获取车辆类型列表
export function data_CarList() {
  return fetch.get('/' + baseurl + '/sm/aflcSysDict/v1/getCarTypeList')
}

// 获取服务分类子分类
export function data_ServerClassList() {
  return fetch.get('/' + baseurl + '/sm/aflcSysDict/v1/getServiceClassList')
}

// 获取会员服务承诺（增值服务）
export function data_LogisticsCompany() {
  return fetch({
    url: '/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF025',
    method: 'get'
  })
}

  // 获取三级业务城市树表
export function aflcAreaCode() {
  return fetch.get('/' + baseurl_two + '/common/aflcCityTree/v1/treaCode')
}

  // 获取二级业务城市树表
export function aflcProvinceCode() {
  return fetch.get('/' + baseurl_two + '/common/aflcCityTree/v1/provinceCode')
}

// 根据cityId获取开放城市服务区域定价
export function aflcCityCheckout(cityId) {
  return fetch.get('/aflc-sm/sm/aflcAreaPrice/v1/open/' + cityId)
}

// 根据公司名称获取物流公司
export function aflcLogisticsCompany(companyName) {
  return fetch.get('/aflc-uc/usercenter/aflcLogisticsCompany/v1/companyName?id=' + companyName)
}

// 获取平台运营人员列表，可根据模糊查询 search
export function businessSystemUserList(data) {
  return fetch({
    url: '/' + baseurl_three + '/usercenter/aflcBusinessGroup/v1/findAflcSystemUserList',
    method: 'post',
    data: data
  })
}

// 获取系统运营人员
export function operateStaff(data) {
  return fetch({
    url: '/' + baseurl_two + '/system/user/v1/operate/staff',
    method: 'post',
    data: data
  })
}
