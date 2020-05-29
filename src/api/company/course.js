import fetch from '@/utils/fetch'
const baseurl = 'aflc-uc'

// 查询课程分类信息
export function driverLearningCateList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcdriverlearningcate/v1/findDriverLearningCateList',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 新增课程分类
export function addDriverLearningCate(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcdriverlearningcate/v1/addDriverLearningCate',
    method: 'post',
    data: data
  })
}

// 修改课程分类信息
export function updateDriverLearningCate(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcdriverlearningcate/v1/updateDriverLearningCate',
    method: 'put',
    data: data
  })
}

/**
 * 课程内容管理
 * */


// 查询课程内容管理
export function driverLearningCourseCateList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcdriverlearningcourse/v1/findDriverLearningCourseCateList',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 新增课程内容管理
export function addDriverLearningCourse(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcdriverlearningcourse/v1/addDriverLearningCourse',
    method: 'post',
    data: data
  })
}

// 修改课程内容管理
export function updateDriverLearningCourse(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcdriverlearningcourse/v1/updateDriverLearningCourse',
    method: 'put',
    data: data
  })
}


/**
 * 车主考卷管理
 * */

//查询试卷列表
export function driverLearningTestpaperList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcdriverlearningtestpaper/v1/findDriverLearningTestpaperList',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 新增考卷
export function addDriverLearningTestpaper(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcdriverlearningtestpaper/v1/addDriverLearningTestpaper',
    method: 'post',
    data: data
  })
}

// 修改考卷
export function updateDriverLearningTestpaper(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcdriverlearningtestpaper/v1/updateDriverLearningTestpaper',
    method: 'put',
    data: data
  })
}


/**
 * 车主考试结果
 * */

//查询考试结果列表
export function driverLearningTestpaperRecordList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcdriverlearningtestpaper/v1/findDriverLearningTestpaperRecordList',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

//导出考试结果列表Excel
export function exportDriverLearningTestpaperRecordExcel(data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcdriverlearningtestpaper/v1/exportDriverLearningTestpaperRecordExcel',
    method: 'post',
    responseType: 'blob',
    data: data
  })
}

//获取考试结果详情
export function driverLearningTestpaperRecordDetail(id) {
    return fetch({
      url: '/' + baseurl + '/usercenter/aflcdriverlearningtestpaper/v1/findDriverLearningTestpaperRecordDetailByRecordId/'+id,
      method: 'get',
    })
  }

