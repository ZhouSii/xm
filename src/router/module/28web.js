import Layout from '@/views/layout/Layout'

const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/28WEB',
  component: Layout,
  redirect: '/28WEB/userclass/logistics/index',
  icon: 'webd',
  name: '28快运WEB端',
  hidden: false,
  noDropdown: false,
  children: [
    {
      path: '/28WEB/userclass/logistics/index',
      icon: 'baobiao',
      name: '用户发布类',
      component: _import('28WEB/userclass/logistics/index'),
      meta: {role: ['admin'], title: '用户发布类', noCache: true},
      children: [{
        path: '/28WEB/userclass/logistics/index',
        name: '28WEB物流专线',
        component: _import('28WEB/userclass/logistics/index'),
        meta: {role: ['admin'], title: '物流专线', noCache: true, code: 'CUSTOM_FEEDBACK_PLATFORM'}
      }, {
        path: '/sm/xuqiuku/carInfo/index',
        name: '28WEB车源信息',
        component: _import('sm/xuqiuku/carInfo/index'),
        meta: {role: ['admin'], title: '车源信息', noCache: true, code: 'CUSTOM_FEEDBACK_PLATFORM'}
      }, {
        path: '/sm/xuqiuku/driverInfo/index',
        name: '28WEB货源信息',
        component: _import('sm/xuqiuku/driverInfo/index'),
        meta: {role: ['admin'], title: '货源信息', noCache: true, code: 'CUSTOM_FEEDBACK_PLATFORM'}
      }, {
        path: '/sm/xuqiuku/manageGroup/index',
        name: '28WEB网点信息',
        component: _import('sm/xuqiuku/manageGroup/index'),
        meta: {role: ['admin'], title: '网点信息', noCache: true, code: 'CUSTOM_FEEDBACK_PLATFORM'}
      }]
    }, {
      path: '/28WEB/garden/index',
      icon: 'baobiao',
      name: '28WEB园区管理',
      component: _import('28WEB/garden/index'),
      meta: {role: ['admin'], title: '园区管理', noCache: true}
    }, {
      path: '/28WEB/recommend/index',
      icon: 'baobiao',
      name: '28WEB推荐管理',
      component: _import('28WEB/recommend/index'),
      meta: {role: ['admin'], title: '推荐管理', noCache: true},
      children: [{
        path: '/28WEB/recommend/rec/index',
        name: '28WEB推荐位管理',
        component: _import('28WEB/recommend/rec/index'),
        meta: {role: ['admin'], title: '推荐位管理', noCache: true, code: 'CUSTOM_FEEDBACK_PLATFORM'}
      }, {
        path: '/28WEB/recommend/line/index',
        name: '28WEB专线推荐管理',
        component: _import('28WEB/recommend/line/index'),
        meta: {role: ['admin'], title: '专线推荐管理', noCache: true, code: 'CUSTOM_FEEDBACK_PLATFORM'}
      }]
    },
    {
      path: '/28WEB/insuranceManage',
      icon: 'txgl',
      hidden: false,
      name: '28WEB保险管理',
      component: _import('28WEB/insuranceManage/index'),
      meta: {title: '保险管理', noCache: true, code: 'FINANCE_WITHDRAW_MANAGE'},
      children: [

        {
          path: '/28WEB/insuranceManage/management',
          hidden: false,
          name: '投保单管理',
          component: _import('28WEB/insuranceManage/management/index'),
          meta: {title: '投保单管理', stitle: '投保单管理', noCache: true, code: 'FINANCE_WITHDRAW_MANAGE_WITHDRAW_AUDIT'},
        }
      ]

    },
    {
      path: '/28WEB/insuranceManage/management/detail',
      icon: 'baobiao',
      hidden: true,
      name: '28WEB保单详情',
      component: _import('28WEB/insuranceManage/management/detail'),
      meta: {role: ['admin'], title: '保单详情', noCache: true}
    },
  ]
}
