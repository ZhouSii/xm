import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/service',
  component: Layout,
  redirect: '/service/plantService/index',
  name: '客服管理',
  icon: 'kehuguanli',
  hidden: false,
  meta: {
    title: '客服管理',
    code: 'CUSTOM'
  },
  children: [{
      path: '/service/index',
      name: '客服反馈',
      icon: 'zonghe',
      component: _import('service/index'),
      meta: {
        title: '客服反馈',
        noCache: true,
        code: 'CUSTOM_FEEDBACK'
      },
      children: [{
        path: '/service/plantService/index',
        name: '平台类',
        component: _import('service/plantService/index'),
        meta: {
          role: ['admin'],
          title: '平台类',
          noCache: true,
          code: 'CUSTOM_FEEDBACK_PLATFORM'
        }
      }, {
        path: '/service/couseService/index',
        name: '用户类',
        component: _import('service/couseService/index'),
        meta: {
          role: ['admin'],
          title: '用户类',
          noCache: true,
          code: 'CUSTOM_FEEDBACK_USER'
        }
      }]
    }, {
      path: '/service/claim/index',
      icon: 'dahuoche',
      name: '物损理赔',
      component: _import('service/claim/index'),
      meta: {
        role: ['admin'],
        title: '物损理赔',
        stitle: '物损理赔',
        noCache: true,
        code: 'CUSTOM_CLAIM'
      },
    }, {
      path: '/service/dispose/index',
      icon: 'dahuoche',
      name: '投诉处理',
      component: _import('service/dispose/index'),
      meta: {
        role: ['admin'],
        title: '投诉处理',
        stitle: '投诉处理',
        noCache: true,
        code: 'CUSTOM_COMPLAIN',
        keepAlive: true
      },
    }, {
      path: '/service/400Manage/index',
      icon: '400',
      name: '400管理',
      component: _import('service/400Manage/index'),
      meta: {
        role: ['admin'],
        title: '400管理',
        stitle: '400',
        noCache: true,
        code: 'CUSTOM_400_MANAGE'
      },
    }, {
      path: '/service/applyOrderCode/index',
      icon: 'xdmsq',
      name: '下单码申请',
      component: _import('service/applyOrderCode/index'),
      meta: {
        role: ['admin'],
        title: '下单码申请',
        stitle: '下单码',
        noCache: true,
        code: 'CUSTOM_PLACE_ORDER_APPLY'
      },
    }, {
      path: '/service/customerReported/index',
      icon: 'khsb',
      name: '客户上报管理',
      component: _import('service/customerReported/index'),
      meta: {
        role: ['admin'],
        title: '客户上报管理',
        stitle: '客户上报管理',
        noCache: true,
        code: 'CUSTOM_CUSTOMERREPORT'
      },
    },
    {
      path: '/service/logistics',
      name: '发物流',
      icon: 'QQ',
      component: _import('service/logistics/index'),
      meta: {
        title: '发物流',
        noCache: true,
        code: 'CUSTOM_HAIRLOGISTICS'
      },
      children: [{
        path: '/service/logistics/costChange/index',
        name: '费用变更管理',
        component: _import('service/logistics/costChange/index'),
        meta: {
          role: ['admin'],
          title: '费用变更管理',
          noCache: true,
          code: 'CUSTOM_HAIRLOGISTICS_EXPENSECHANGE'
        }
      }]
    },
    {
      path: '/service/messageCenter',
      name: '消息中心',
      icon: 'zonghe',
      component: _import('service/messageCenter/index'),
      meta: {
        title: '消息中心',
        noCache: true,
        code: 'CUSTOM_LINEDISTRICTCHANGE'
      },
      children: [{
        path: '/service/messageCenter/customMessage/index',
        name: '自定义消息',
        component: _import('service/messageCenter/customMessage/index'),
        meta: {
          role: ['admin'],
          title: '自定义消息',
          noCache: true,
          code: 'CUSTOM_LINEDISTRICTCHANGE_CUSTOMMESSAGE'
        }
      }, {
        path: '/service/messageCenter/messagePushRecord/index',
        name: '消息推送记录',
        component: _import('service/messageCenter/messagePushRecord/index'),
        meta: {
          role: ['admin'],
          title: '消息推送记录',
          noCache: true,
          code: 'CUSTOM_LINEDISTRICTCHANGE_PUSHRECORDS'
        }
      }]
    },
    {
      path: '/service/applyAllowance',
      name: '补贴申请',
      icon: 'sjzd',
      component: _import('service/applyAllowance/index'),
      meta: {
        title: '补贴申请',
        noCache: true,
        code: 'CUSTOM_SUBSIDYAPPLICATION'
      },
    }


  ]
}
