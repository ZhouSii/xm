import fetch from '@/utils/fetch'

const baseurl = "aflc-common"
// const baseurl = "aflccommonservice-lyc"


//根据条件获取400通话记录表列表
export function aflcCallLog(page,pagesize,data) {
    return fetch({
      url: '/'+ baseurl + '/common/aflcCallLog/v1/list',
      method: 'post',
      data:{
        "currentPage": page,
        "pageSize": pagesize,   
        "vo": data
      }
    })
  }


//获取400通话记录链接
export function getVoiceUrl(Ish,date) {
    return fetch({
      url: '/'+ baseurl + '/common/aflcCallLog/v1/getVoiceUrl/'+Ish+'?date='+date,
      method: 'get',
    })
  }

//导出400Excel日志数据
export function aflcExcelList(data) {
    return fetch({
      url: '/'+ baseurl + '/common/aflcCallLog/v1/excelList',
      method: 'post',
      data:data
    })
  }