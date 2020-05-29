import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/crm',
  component: Layout,
  redirect: '/crm/crmManagement/ownerVisitTaskManagement',
  name: 'CRM管理',
  hidden: false,
  icon: 'CRM',
  children: [
    {
      path: '/crm/crmManagement/ownerVisitTaskManagement',
      icon: 'CRM',
      name: '任务管理',
      component: _import('crm/crmManagement/index'),
      meta: { title: '任务管理', stitle: '任务管理', noCache: true, code: '' },
      children: [
        {
          path: '/crm/crmManagement/ownerVisitTaskManagement',
          hidden: false,
          icon: 'CRM',
          name: '货主拜访任务管理',
          component: _import('crm/crmManagement/ownerVisitTaskManagement/index'),
          meta: { title: '货主拜访任务管理', stitle: '货主拜访任务管理', noCache: true, code: '' }
        },
        {
          path: '/crm/crmManagement/ownerVisitTaskManagementDetail',
          hidden: true,
          name: '货主拜访任务管理详情',
          component: _import('crm/crmManagement/ownerVisitTaskManagement/ownerVisitTaskManagementDetail'),
          meta: { title: '货主拜访任务管理详情', stitle: '货主拜访任务管理详情', noCache: true }
        }
      ]
    },
    {
      path: '/crm/crmManagement',
      icon: 'cheliangguanli',
      name: '线索管理',
      component: _import('crm/crmManagement/index'),
      meta: { title: '线索管理', stitle: '线索管理', noCache: true, code: '' },
      children: [
        {
          path: '/crm/crmManagement/cheZhuClueManagement',
          hidden: false,
          name: '货主线索管理',
          component: _import('crm/crmManagement/cheZhuClueManagement/index'),
          meta: { title: '货主线索管理', stitle: '线索', noCache: true, code: '' }
        }
      ]
    },
    {
      path: '/crm/messageManagement',
      icon: 'mima',
      name: '消息管理',
      hidden: false,
      component: _import('crm/messageManagement/index'),
      meta: { title: '消息管理', stitle: '消息管理', noCache: true, code: '' },
    }
  ]
}
