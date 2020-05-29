import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/dataCenter',
  component: Layout,
  redirect: '/dataCenter/detailProfile/shipperProfileDashbord',
  icon: 'baobiao',
  name: '数据中心',
  noDropdown: true,
  hidden: false,
  meta: {
    title: '数据中心',
    code: 'DATA_CENTER'
  },
  children: [{
      path: '/dataCenter/detailProfile',
      icon: 'hzgk',
      name: '发展概况',
      component: _import('dataCenter/detailProfile/index'),
      meta: {
        role: ['admin'],
        title: '发展概况',
        stitle: '发展',
        noCache: true,
        code: 'DATA_CENTER_DEVELOPMENT_OVERVIEW'
      },
      children: [{
          path: '/dataCenter/detailProfile/shipperProfileDashbord',
          name: '货主概况',
          component: _import('dataCenter/detailProfile/shipperProfileDashbord/index'),
          meta: {
            role: ['admin'],
            title: '货主概况',
            stitle: '首页',
            noCache: true,
            code: 'DATA_CENTER_DEVELOPMENT_OVERVIEW_SAHIPPER_GENERAL'
          }
        },
        {
          path: '/dataCenter/detailProfile/driverProfileDashbord',
          name: '车主概况',
          component: _import('dataCenter/detailProfile/driverProfileDashbord/index'),
          meta: {
            role: ['admin'],
            title: '车主概况',
            stitle: '首页',
            noCache: true,
            code: 'DATA_CENTER_DEVELOPMENT_OVERVIEW_DRIVER_GENERAL'
          }
        },
        {
          path: '/dataCenter/detailProfile/shipperDevelop',
          name: '货主发展概况',
          component: _import('dataCenter/detailProfile/shipperDevelop'),
          meta: {
            role: ['admin'],
            title: '货主发展概况',
            stitle: '货主',
            noCache: true,
            code: 'DATA_CENTER_DEVELOPMENT_OVERVIEW_SAHIPPER_DEVELOP_GENERAL'
          }
        },
        {
          path: '/dataCenter/detailProfile/driverDevelop',
          name: '车主发展概况',
          component: _import('dataCenter/detailProfile/driverDevelop'),
          meta: {
            role: ['admin'],
            title: '车主发展概况',
            stitle: '车主',
            noCache: true,
            code: 'DATA_CENTER_DEVELOPMENT_OVERVIEW_DRIVER_DEVELOP_GENERAL'
          }
        },
        {
          path: '/dataCenter/detailProfile/orderDevelop',
          name: '订单发展概况',
          component: _import('dataCenter/detailProfile/orderDevelop'),
          meta: {
            role: ['admin'],
            title: '订单发展概况',
            stitle: '订单',
            noCache: true,
            code: 'DATA_CENTER_DEVELOPMENT_OVERVIEW_ORDER_DEVELOP_GENERAL'
          }
        },
        {
          path: '/dataCenter/detailProfile/shipperDown',
          name: '货主下单概况',
          component: _import('dataCenter/detailProfile/shipperDown'),
          meta: {
            role: ['admin'],
            title: '货主下单概况',
            stitle: '货主',
            noCache: true,
            code: 'DATA_CENTER_DEVELOPMENT_OVERVIEW_SAHIPPER_ORDER_GENERAL'
          }
        },
        {
          path: '/dataCenter/detailProfile/driverDown',
          name: '车主下单概况',
          component: _import('dataCenter/detailProfile/driverDown'),
          meta: {
            role: ['admin'],
            title: '车主接单概况',
            stitle: '车主',
            noCache: true,
            code: 'DATA_CENTER_DEVELOPMENT_OVERVIEW_DRIVER_ORDER_GENERAL'
          }
        }
      ]
    },
    {
      path: '/dataCenter/salespersonTotal/commissionTotal',
      icon: 'yxywtc',
      name: '营销人员业务提成汇总',
      hidden: false,
      component: _import('dataCenter/salespersonTotal/commissionTotal'),
      meta: {
        role: ['admin'],
        title: '营销业务提成汇总',
        stitle: '提成',
        noCache: true,
        code: 'DATA_CENTER_BUSINESS_COMMISSION_SUM',
        keepAlive: true
      }
    },
    {
      path: '/dataCenter/salespersonTotal/developTotal',
      icon: 'yxywfz',
      name: '营销人员业务发展汇总',
      hidden: false,
      component: _import('dataCenter/salespersonTotal/developTotal'),
      meta: {
        role: ['admin'],
        title: '营销业务发展汇总',
        stitle: '发展',
        noCache: true,
        code: 'DATA_CENTER_BUSINESS_DEVELOP_SUM',
        keepAlive: true
      }
    },
    {
      path: '/dataCenter/salespersonTotal/developShipper',
      icon: 'yxywfz',
      name: '发展货主数',
      hidden: true,
      component: _import('dataCenter/salespersonTotal/developShipper'),
      meta: {
        role: ['admin'],
        title: '发展货主数',
        stitle: '发展',
        noCache: true,
        keepAlive: true
      },
    },
    {
      path: '/dataCenter/salespersonTotal/developCarOwner',
      icon: 'yxywfz',
      name: '发展车主数',
      hidden: true,
      component: _import('dataCenter/salespersonTotal/developCarOwner'),
      meta: {
        role: ['admin'],
        title: '发展车主数',
        stitle: '发展',
        noCache: true,
        keepAlive: true
      },
    },
    {
      path: '/dataCenter/salespersonTotal/developShipperOrderData',
      icon: 'yxywfz',
      name: '发展货主在线交易订单数',
      hidden: true,
      component: _import('dataCenter/salespersonTotal/developShipperOrderData'),
      meta: {
        role: ['admin'],
        title: '发展货主在线交易订单数',
        stitle: '发展',
        noCache: true,
        keepAlive: true
      },
    },
    {
      path: '/dataCenter/carRanking/index',
      icon: 'czjdphb',
      name: '车主接单排行榜',
      hidden: false,
      component: _import('dataCenter/carRanking/index'),
      meta: {
        role: ['admin'],
        title: '车主接单排行榜',
        stitle: '车主',
        noCache: true,
        code: 'DATA_CENTER_DRIVER_LEADERBOARD'
      }
    },
    {
      path: '/dataCenter/shipperRanking/index',
      icon: 'zonghe',
      name: '货主下单排行榜',
      hidden: false,
      component: _import('dataCenter/shipperRanking/index'),
      meta: {
        role: ['admin'],
        title: '货主下单排行榜',
        stitle: '货主',
        noCache: true,
        code: 'DATA_CENTER_SHIPPER_LEADERBOARD'
      }
    },
    {
      path: '/dataCenter/orderDetailRanking/index',
      icon: 'ddhz',
      name: '订单费用明细汇总',
      hidden: false,
      component: _import('dataCenter/orderDetailRanking/index'),
      meta: {
        role: ['admin'],
        title: '订单费用明细汇总',
        stitle: '订单',
        noCache: true,
        code: 'DATA_CENTER_ORDER_EXPENSE_SUMMARY'
      }
    },
    {
      path: '/dataCenter/workDayTrend/orderDayTrend',
      icon: 'ddqs',
      name: '订单发展日趋势表',
      hidden: false,
      component: _import('dataCenter/workDayTrend/orderDayTrend'),
      meta: {
        role: ['admin'],
        title: '订单发展日趋势表',
        stitle: '趋势',
        noCache: true,
        code: 'DATA_CENTER_ORDER_DAILY'
      }
    },
    {
      path: '/dataCenter/workDayTrend/shipperDayTrend',
      icon: 'baobiao',
      name: '货主发展日趋势表',
      hidden: false,
      component: _import('dataCenter/workDayTrend/shipperDayTrend'),
      meta: {
        role: ['admin'],
        title: '货主发展日趋势表',
        stitle: '趋势',
        noCache: true,
        code: 'DATA_CENTER_SHIPPERDEVELOPMENT'
      }
    },
    {
      path: '/dataCenter/workDayTrend/carDayTrend',
      icon: 'hzxdphb',
      name: '车主发展日趋势表',
      hidden: false,
      component: _import('dataCenter/workDayTrend/carDayTrend'),
      meta: {
        role: ['admin'],
        title: '车主发展日趋势表',
        stitle: '趋势',
        noCache: true,
        code: 'DATA_CENTER_CARDEVELOPMENT'
      }
    },
    {
      path: '/dataCenter/responseTimeList/index',
      icon: 'EXCEL',
      name: '订单响应时效明细',
      hidden: false,
      component: _import('dataCenter/responseTimeList/index'),
      meta: {
        role: ['admin'],
        title: '订单响应时效明细',
        stitle: '响应',
        noCache: true,
        code: 'DATA_CENTER_ORDERRESPONSETIME'
      }
    },
    // {
    //   path: '/dataCenter/orderEvaluation/index',
    //   icon: 'ddhz',
    //   name: '订单评价分析',
    //   hidden: false,
    //   component: _import('dataCenter/orderEvaluation/index'),
    //   meta: {
    //     role: ['admin'],
    //     title: '订单评价分析',
    //     stitle: '评价',
    //     noCache: true,
    //     code: ''
    //   }
    // },
    {
      path: '/dataCenter/trendAnalysis',
      icon: 'hzgk',
      name: '趋势分析',
      component: _import('dataCenter/trendAnalysis/index'),
      meta: {
        role: ['admin'],
        title: '趋势分析',
        stitle: '趋势',
        noCache: true,
        code: 'DATA_CENTER_TRENDANALYSIS'
      },
      children: [{
          path: '/dataCenter/trendAnalysis/huoZhuActiveAnalysis',
          name: '货主活跃分析',
          hidden: false,
          component: _import('dataCenter/trendAnalysis/activeAnalysis'),
          meta: {
            role: ['admin'],
            title: '货主活跃分析',
            stitle: '货主',
            noCache: true,
            code: 'DATA_CENTER_TRENDANALYSIS_SHIPPERANALYSIS'
          }
        },
        {
          path: '/dataCenter/trendAnalysis/chuZhuActiveAnalysis',
          name: '车主活跃分析',
          hidden: false,
          component: _import('dataCenter/trendAnalysis/activeAnalysis'),
          meta: {
            role: ['admin'],
            title: '车主活跃分析',
            stitle: '车主',
            noCache: true,
            code: 'DATA_CENTER_TRENDANALYSIS_CARANALYSIS'
          }
        },
        {
          path: '/dataCenter/trendAnalysis/huoZhuTransactionAnalysis',
          name: '货主成交分析',
          hidden: false,
          component: _import('dataCenter/trendAnalysis/transactionAnalysis'),
          meta: {
            role: ['admin'],
            title: '货主成交分析',
            stitle: '货主',
            noCache: true,
            code: 'DATA_CENTER_TRENDANALYSIS_SHIPPERTRANSACTION'
          }
        },
        {
          path: '/dataCenter/trendAnalysis/chuZhuTransactionAnalysis',
          name: '车主成交分析',
          hidden: false,
          component: _import('dataCenter/trendAnalysis/transactionAnalysis'),
          meta: {
            role: ['admin'],
            title: '车主成交分析',
            stitle: '车主',
            noCache: true,
            code: 'DATA_CENTER_TRENDANALYSIS_CARTRANSACTION'
          }
        }
      ]
    },
    {
      path: '/dataCenter/businessAssessmentManagement',
      icon: 'ywkhgl',
      name: '业务考核管理',
      component: _import('dataCenter/businessAssessmentManagement/index'),
      meta: {
        role: ['admin'],
        title: '业务考核管理',
        stitle: '管理',
        noCache: true,
        code: 'DATA_CENTER_BUSINESSEXAMINATION'
      },
      children: [{
          path: '/dataCenter/businessAssessmentManagement/businessEvaluationForm',
          name: '业务考核表',
          hidden: false,
          component: _import('dataCenter/businessAssessmentManagement/businessEvaluationForm/index'),
          meta: {
            role: ['admin'],
            title: '业务考核表',
            stitle: '业务考核表',
            noCache: true,
            code: 'DATA_CENTER_BUSINESSEXAMINATION_FORM'
          }
        },
        {
          path: '/dataCenter/businessAssessmentManagement/examinationRules',
          name: '考核规则配置',
          hidden: false,
          component: _import('dataCenter/businessAssessmentManagement/examinationRules/index'),
          meta: {
            role: ['admin'],
            title: '考核规则配置',
            stitle: '考核规则配置',
            noCache: true,
            code: 'DATA_CENTER_BUSINESSEXAMINATION_ASSESSMENTCONFIGURATION'
          }
        }
      ]
    },
    {
      path: '/dataCenter/ownerDataAnalysis',
      icon: 'ywkhgl',
      name: '货主数据分析',
      component: _import('dataCenter/ownerDataAnalysis/index'),
      meta: {
        role: ['admin'],
        title: '货主数据分析',
        stitle: '分析',
        noCache: true,
        code: 'DATA_CENTER_SHIPPERDATAANALYSIS'
      },
      children: [{
        path: '/dataCenter/ownerDataAnalysis/shippersOrderAnalysis',
        name: '货主订单分析',
        hidden: false,
        component: _import('dataCenter/ownerDataAnalysis/shippersOrderAnalysis/index'),
        meta: {
          role: ['admin'],
          title: '货主订单分析',
          stitle: '分析',
          noCache: true,
          code: 'DATA_CENTER_SHIPPERDATAANALYSIS_SHIPPERORDERANALYSIS'
        }
      }]
    },
  ]
}
