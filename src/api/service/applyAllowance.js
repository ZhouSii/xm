import fetch from '@/utils/fetch'

// const baseurl = 'aflcusercenterservice-deng'
const baseurl = 'aflc-uc' ///usercenter/aflcSubsidy/v1/add   /usercenter/aflcSubsidy/v1/exportExcel
const baseurl2 = 'aflc-order'
// 补贴列表查询
export function aflcSubsidyList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcSubsidy/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 新增补贴申请
export function aflcSubsidyAdd(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcSubsidy/v1/submit',
    method: 'post',
    data: data
  })
}

// 修改补贴申请
export function aflcSubsidyupdateApply(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcSubsidy/v1/updateApply',
    method: 'post',
    data: data
  })
}

//补贴审批
export function aflcSubsidyAudit(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcSubsidy/v1/audit',
    method: 'post',
    data: data
  })
}

//补贴列表导出
export function aflcSubsidyExportExcel(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcSubsidy/v1/exportExcel',
    responseType: 'blob',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

//根据输入的手机号查询用户的车牌及姓名   /usercenter/aflcDriverCar/v1/mobile/{mobile}
export function aflcDriverCarMobile(mobileNo) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcDriverCar/v1/mobile/' + mobileNo,
    method: 'get',
  })
}

//确认搜索的订单号是否存在   /order/aflcOrder/v1/findAflcOrderByOrderSerial/{orderSerial}
export function findAflcOrderByOrderSerial(orderSerial) {
  return fetch({
    url: '/' + baseurl2 + '/order/aflcOrder/v1/findAflcOrderByOrderSerial/' + orderSerial,
    method: 'get',
  })
}
