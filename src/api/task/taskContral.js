import fetch from '@/utils/fetch'

const baseurl = "aflcjobadmin"


// 任务组列表信息

export function data_taskList(params){
    return fetch.get('/'+baseurl+'/jobinfo?'+'jobGroup='+params).then(res => {
        return res.data || {} 
    })
}

// 新增任务
export function data_newTaskList(data) {
    return fetch({
      url: '/'+baseurl+'/jobinfo/add',
      method: 'post',
      data:data
    })
  }


//

// export function data_taskList(params){
//     return fetch.get('/'+baseurl+'/jobinfo/pageList?'+'jobGroup='+params).then(res => {
//         return res.data || {} 
//     })
// }


// 获取省级对应的城市列表
// export function data_GetCityList(code) {
//     return fetch({
//       url: '/'+baseurl+'/sm/aflcDistrict/v1/lists',
//       method: 'post',
//       data: {
//         "code": code
//       }
//     })
//   }









  

