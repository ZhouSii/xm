import axios from 'axios'
import {
  Message,
  MessageBox
} from 'element-ui'
import store from '../store'
import {
  getToken,
  getUserInfo
} from './auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 120000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    // 让每个请求携带自定义token 请根据实际情况自行修改
    // config.headers['access_token'] = getToken()
    // config.headers.Authorization = 'Bearer ' + getToken()

    // 暂时放到链接中
    if (!config.params) {
      config.params = {}
    }

    if (getUserInfo() && getUserInfo().id) {
      config.headers.user_id = getUserInfo().id
    }

    if (getUserInfo() && getUserInfo().userToken) {
      config.headers.usertoken = getUserInfo().userToken
    }

    config.params['access_token'] = getToken()
    // console.log(config.url, config.params)
  }

  //   console.log('process.env.NODE_ENV',process.env.NODE_ENV)
  if (config.url.indexOf('http://') === -1) {
    // 如果是生产环境，强制访问157
    if (process.env.NODE_ENV === 'production' && window.location.href.indexOf('192.168.1') === -1) {
      // 这个值也要转为设定的值
      window.tms_testapiurl = 'api'
      localStorage.tms_testapiurl = 'api'
      config.url = '/api' + config.url
    } else {
      /**
       * 测试环境修改这里，不要修改上面那句代码
       */
      // 统一加上/api 前缀，方便后台转发接口
      // console.log(' window.tms_testapiurl', window.tms_testapiurl)
      window.tms_testapiurl = localStorage.tms_testapiurl || 'api'

      if (window.tms_testapiurl) {
        config.url = '/' + window.tms_testapiurl + config.url
      } else {
        config.url = '/api' + config.url // 157服务器
        // config.url = '/79service' + config.url
        // config.url = '/localapi' + config.url
        // config.url = '/wukunzhi' + config.url
        // config.url = '/huangyuwen' + config.url
        // config.url = '/dingfei' + config.url
        // config.url = '/ceshi' + config.url // 157测试
        // config.url = '/chenrongtao' + config.url
        // config.url = '/home' + config.url
        // config.url = '/fangjian' + config.url
        // config.url = '/aliyun' + config.url
        // config.url = '/lingzhiying' + config.url
        // config.url = '/79service' + config.url
      }
    }
  }

  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * status为非200是抛错 可结合自己业务进行修改
     */
    const res = response.data
    // console.log('请求链接：', response.config.url,response)
    // console.log('请求链接：',response,res)
    res.headers = response.headers // 导出excel时需要根据response headers中的content-disposition的filename来确定导出文件的类型（zip或excel）
    if (res.status !== 200 && response.config.url.indexOf('/uaa/password/token') === -1 && response.config.url.indexOf('Excel') === -1 && response.config.url.indexOf('produceCoupon') === -1) {
      // Message({
      //   message: res.errorInfo + res.status,
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      return Promise.reject(res)
    } else {
      return response.data
    }
  },
  error => {
    if (error.response) {
      const status = error.response.status

      if (status === 403) {
        Message({
          message: '禁止访问',
          type: 'error',
          duration: 5 * 1000
        })
      } else if (status === 404) {
        Message({
          message: '未找到相关信息',
          type: 'error',
          duration: 5 * 1000
        })
      } else if (status === 401) {
        // 401:非法的token;Token 过期了;
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      } else {
        Message({
          //   message: '请求错误：账号在其他地方登陆！' ,
          message: '请求错误：网络延迟请刷新页面！',
          type: 'error',
          duration: 5 * 1000
        })
      }
    } else {
      console.log('err' + error) // for debug
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
