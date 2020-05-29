import Vue from 'vue'
import Router from 'vue-router'
// import configRouters from './module/index'

const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout'

// ========================引入各个版块类别================
// 公司
import Common from './module/common'
// 财务
import Finance from './module/finance'
// 客服
import Service from './module/service'
// 服务
import Server from './module/server'
// 服务
import Dispatch from './module/dispatch'
// 营销
import Marketing from './module/marketing'
// 用户
import Users from './module/users'
// 订单
import Order from './module/orderManage'
//28WEB
import KYWEB from './module/28web'
//数据中心
import DataCenter from './module/dataCenter'
//crm管理
import crmManage from './module/crmManage'

Vue.use(Router)

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will not redirct in the levelbar
 * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
 * meta : `{ role: ['admin'] }`  will control the page role
 **/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true }

]
export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    noDropdown: true,
    icon: 'shouye',
    // name: '首页',
    name: 'dashboard',
    meta: {
      'code': 'HOME'
    },
    hidden: true,
    children: [{
      path: '/dashboard',
      name: '首页',
      icon: 'shouye',
      hidden: false,
      component: _import('dashboard/index'),
      meta: { title: '运营控制台', noCache: false, 'code': 'HOME_OPERATION_CONSOLE', 'proute': 'dashboard' }
    }, {
      path: '/common/myinfo',
      icon: 'information',
      hidden: true,
      name: '个人中心',
      component: _import('common/myinfo/index'),
      meta: {
        title: '个人中心',
        noCache: true,
        'proute': 'dashboard'
      }
    }, {
      path: '/report',
      icon: 'baobiao',
      hidden: false,
      name: '财务控制台',
      component: _import('report/newReport'),
      meta: {
        title: '财务控制台',
        noCache: true,
        'code': 'HOME_FINANCE_EXECUTE',
        'proute': 'dashboard'
      }
    },
      //  {
      //   path: '/html5',
      //   icon: 'guiji',
      //   hidden: false,
      //   name: '订单在途监控',
      //   component: _import('html5/index'),
      //   meta: {
      //     title: '订单在途监控',
      //     noCache: true,
      //     'code': '',
      //     'proute': 'dashboard'
      //   }
      // },
      {
        path: '/carmonitor',
        icon: 'gzdw',
        hidden: false,
        name: '车辆跟踪',
        component: _import('carmonitor/index'),
        meta: { title: '车辆跟踪', noCache: false, keepAlive: true, 'code': 'HOME_DRIVER_TRACE', 'proute': 'dashboard' }
      }, {
        path: '/onlineService',
        icon: 'zxkf',
        hidden: false,
        name: '在线客服',
        component: _import('onlineService/index'),
        meta: {
          title: '在线客服',
          noCache: true,
          'code': 'HOME_ONLINE_SERVICE',
          'proute': 'dashboard'
        }
      }]
  },
  Users,
  Server,
  Dispatch,
  Order,
  Finance,
  Marketing,
  Service,
  KYWEB,
  DataCenter,
  Common,
  crmManage,

  { path: '*', redirect: '/404', hidden: true }
]
