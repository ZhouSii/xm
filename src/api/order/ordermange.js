import fetch from '@/utils/fetch'

const baseurl = 'aflc-order'
const baseurl_two = 'aflc-uc'
const baseurl_three = 'aflc-socket'
// const baseurl = 'aflcorderservice-lyc'

// 根据状态获取订单管理列表
export function orderStatusList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrder/v1/orderManager',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 根据流水号获取订单详细信息
export function orderDetailsList(orderSerial) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrder/v1/orderDetail/' + orderSerial,
    method: 'get'
  })
}

// 订单详情(新增)
export function getOrderDetail(orderSerial) {
    return fetch({
      url: '/' + baseurl + '/order/aflcOrder/v1/getOrderDetail/' + orderSerial,
      method: 'get'
    })
  }

  // 获取推单记录(新增)
export function getOrderPushList(data) {
    return fetch({
      url: '/' + baseurl + '/order/aflcOrder/v1/getOrderPushList',
      method: 'post',
      data: data
    })
  }

// 获取抢单记录(新增)
export function getOrderGrabList(data) {
    return fetch({
      url: '/' + baseurl + '/order/aflcOrder/v1/getOrderGrabList',
      method: 'post',
      data: data
    })
  }

// 获取订单跟踪记录(新增)
export function getOrderFollowingFiles(data) {
    return fetch({
      url: '/' + baseurl + '/order/aflcOrder/v1/getOrderFollowingFiles',
      method: 'post',
      data: data
    })
  }

// 获取订单跟踪记录(新增)
export function getReturnListAndEvaluation(orderSerial) {
    return fetch({
      url: '/' + baseurl + '/order/aflcOrder/v1/getReturnListAndEvaluation/'+ orderSerial,
      method: 'post',
    })
  }

// 取消订单
export function cancelOrder(data) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrder/v1/cancelOrder',
    method: 'post',
    data: data
  })
}

//取消订单列表导出
export function cancelOrderExcel(data) {
    return fetch({
      url: '/' + baseurl + '/order/aflcOrder/v1/cancelOrderListExcel',
      method: 'post',
      responseType: 'blob',
      data: data
    })
  }

// web端指派司机
export function appointDriverList(data) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrder/v1/appointDriver',
    method: 'post',
    data: data
  })
}

  // web端指派司机时查询司机列表
export function nearDriverList(data) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrder/v1/nearDriverList',
    method: 'post',
    data: data
  })
}

// 获取订单行车轨迹
export function getOrderCarTrailList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrder/v1/getOrderCarTrailList',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

//添加备注（web端客服备注）
export function RemarkDriverInfo(data) {
    return fetch({
      url: '/' + baseurl + '/order/aflcOrder/v1/customServiceRemark',
      method: 'post',
      data: data
    })
  }

//扣除奖励金短信通知
export function sendDeductBonusSms(data) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrder/v1/sendDeductBonusSms',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: data
  })
}

//获取平台定向,超时无人接单,公海无司机,车主改派,中单后联系货主超时的总数量
export function getCountByStatus() {
    return fetch({
      url: '/' + baseurl + '/order/aflcOrder/v1/getCountByStatus',
      method: 'post',
    })
  }

//确认收货(货主端)
export function webConfirmGoods(data) {
    return fetch({
      url: '/' + baseurl + '/order/aflcOrder/v1/webConfirmGoods',
      method: 'post',
      data: data
    })
  }

//列出异常订单记录
export function listMasterOrderUnusual(data) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrderUnusual/v1/listMasterOrderUnusual',
    method: 'post',
    data: data
  })
}

//扣除行为分
export function deductionBehavior(unusualId) {
  return fetch({
    url: '/aflc-uc/usercenter/aflcBehaviorScoreDetail/v1/deductionBehavior/' +unusualId ,
    method: 'post',
  })
}

//退回行为分
export function returnBehavior(unusualId) {
  return fetch({
    url: '/aflc-uc/usercenter/aflcBehaviorScoreDetail/v1/returnBehavior/' +unusualId ,
    method: 'post',
  })
}

//退回奖励金
export function returnReward(orderSerial) {
  return fetch({
    url: '/aflc-uc/usercenter/aflcBehaviorScoreDetail/v1/returnReward/' +orderSerial ,
    method: 'post',
  })
}

//退回奖励金明细列表
export function listReward(orderSerial) {
    return fetch({
      url: '/aflc-order/order/aflcOrderBackReward/v1/listReward/' +orderSerial ,
      method: 'post',
    })
  }

//退回行为分列表
export function returnBehaviorList(orderSerial,riskControlCod) {
    return fetch({
      url: '/aflc-uc/usercenter/aflcBehaviorScoreDetail/v1/listReturnBehaviorDetial/' + orderSerial + '?riskControlCode=' +riskControlCod ,
      method: 'post',
    })
  }

//订单审查
export function orderReview(data) {
    return fetch({
      url: '/' + baseurl + '/order/aflcOrderAudit/v1/orderReview',
      method: 'post',
      data:data
    })
  }

//订单审核
export function orderAudit(data) {
    return fetch({
      url: '/' + baseurl + '/order/aflcOrderAudit/v1/orderAudit',
      method: 'post',
      data:data
    })
  }

//订单审查修改
export function reviseOrderExStatus(data) {
    return fetch({
      url: '/' + baseurl + '/order/aflcOrderAuditRecord/v1/orderRecordReviewModify/'+data.orderSerial+'?reviewStatus='+data.reviewStatus,
      method: 'put',
    })
  }

//根据orderSerial获取订单费用明细
export function findByOrderSerial(orderSerial) {
    return fetch({
      url: '/' + baseurl + '/order/aflcOrderExpenses/v1/findByOrderSerial/'+orderSerial,
      method: 'get',
    })
  }

//订单审核
export function orderExamineList(data) {
    return fetch({
      url: '/' + baseurl + '/order/aflcOrderAudit/v1/list',
      method: 'post',
      data: data
    })
  }

// 获取附近司机
export function nearbyDriver(Obj) {
    return fetch({
      url: '/' + baseurl_three + '/im/driver/v1/nearbyDriver?longitude=' + Obj.longitude + '&latitude=' + Obj.latitude + '&carTypeCode=' + Obj.carTypeCode + '&distance=' + Obj.distance + '&keyword=' + Obj.keyword + '&isVipCar=' + Obj.isVipCar + '&currentPage=' + Obj.currentPage + '&pageSize=' + Obj.pageSize,
      method: 'get',
    })
}

// 查询车主时间段内下单量及排名(可查询单个人)
export function orderNumAndRank(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl_two + '/usercenter/driverSurvey/v1/orderNumAndRank',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 地图指派司机
export function appointDriver(data) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrder/v1/appointDriver',
    method: 'post',
    data: data
  })
}

// 订单审核列表
export function orderManagerAuditList(data) {
    return fetch({
      url: '/' + baseurl + '/order/aflcOrder/v1/orderManagerAudit',
      method: 'post',
      data: data
    })
  }

//订单审核修改（订单进入复核状态）
export function orderManagerAuditPass(orderSerial) {
    return fetch({
      url: '/' + baseurl + '/order/aflcOrderAuditRecord/v1/orderRecordAuditModify/'+orderSerial,
      method: 'put',
    })
  }

//订单复核完成、复审不通过
export function orderRecordAuditFinish(data) {
    return fetch({
      url: '/' + baseurl + '/order/aflcOrderAuditRecord/v1/orderRecordAuditFinish',
      method: 'post',
      data:data
    })
  }

//订单复核费用明细
export function orderRecordAuditExpenses(orderSerial) {
    return fetch({
      url: '/' + baseurl + '/order/aflcOrderAuditRecord/v1/orderRecordAuditExpenses/'+orderSerial,
      method: 'get',
    })
  }

//获取订单回单回款车贴订单
export function getCarStickerPictureOrderByOrderSerial(orderSerial) {
    return fetch({
      url: '/aflc-sm/sm/aflcCarStickerCheck/v1/getCarStickerPictureOrderByOrderSerial/'+orderSerial,
      method: 'get',
    })
  }

//订单费用确认信息
export function getConfirmExpensesInfo(orderSerial) {
    return fetch({
      url: '/' + baseurl + '/order/aflcOrder/v1/getConfirmExpensesInfo/'+orderSerial,
      method: 'get',
    })
  }

//车主确认订单价格
export function confirmExpense(orderSerial,data) {
    return fetch({
      url: '/' + baseurl + '/aflcTripApi/confirmExpense/'+orderSerial,
      method: 'put',
      data:data
    })
  }

//获取订单审查信息
export function gainOrderReviewDetail(orderSerial) {
    return fetch({
      url: '/' + baseurl + '/order/aflcOrderAudit/v1/gainOrderReviewDetail/'+orderSerial,
      method: 'get',
    })
  }

//订单审查确认
export function orderReviewConfirm(data) {
    return fetch({
      url: '/' + baseurl + '/order/aflcOrderAudit/v1/orderReviewConfirm',
      method: 'post',
      data:data
    })
  }


//订单管理-全部列表
  export function orderManager2All(page, pagesize, data) {
    return fetch({
      url: '/' + baseurl + '/order/aflcOrder/v1/orderManager2All',
      method: 'post',
      data: {
        'currentPage': page,
        'pageSize': pagesize,
        'vo': data
      }
    })
  }

//订单管理-取消列表
export function orderManager2Cancel(page, pagesize, data) {
    return fetch({
      url: '/' + baseurl + '/order/aflcOrder/v1/orderManager2Cancel',
      method: 'post',
      data: {
        'currentPage': page,
        'pageSize': pagesize,
        'vo': data
      }
    })
  }

//订单管理-派单列表
export function orderManager2Dispatch(page, pagesize, data) {
    return fetch({
      url: '/' + baseurl + '/order/aflcOrder/v1/orderManager2Dispatch',
      method: 'post',
      data: {
        'currentPage': page,
        'pageSize': pagesize,
        'vo': data
      }
    })
  }

//订单管理-完成列表
export function orderManager2Finish(page, pagesize, data) {
    return fetch({
      url: '/' + baseurl + '/order/aflcOrder/v1/orderManager2Finish',
      method: 'post',
      data: {
        'currentPage': page,
        'pageSize': pagesize,
        'vo': data
      }
    })
  }

//订单管理-进行中列表
export function orderManager2Running(page, pagesize, data) {
    return fetch({
      url: '/' + baseurl + '/order/aflcOrder/v1/orderManager2Running',
      method: 'post',
      data: {
        'currentPage': page,
        'pageSize': pagesize,
        'vo': data
      }
    })
  }

//订单管理-待支付列表
export function orderManager2Unpay(page, pagesize, data) {
    return fetch({
      url: '/' + baseurl + '/order/aflcOrder/v1/orderManager2Unpay',
      method: 'post',
      data: {
        'currentPage': page,
        'pageSize': pagesize,
        'vo': data
      }
    })
  }

//订单管理-待指派列表
export function orderManager2Waitappoint(page, pagesize, data) {
    return fetch({
      url: '/' + baseurl + '/order/aflcOrder/v1/orderManager2Waitappoint',
      method: 'post',
      data: {
        'currentPage': page,
        'pageSize': pagesize,
        'vo': data
      }
    })
  }