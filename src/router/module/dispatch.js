import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/dispatch',
  component: Layout,
  redirect: '/dispatch/OpenseaRecommend',
  icon: 'chengyunshang',
  name: '调度管理',
  noDropdown: true, 
  hidden:false,
  meta: {
    title: '调度管理', code: 'DISPATCH'
  },
  children: [
  {
    path: '/dispatch/OpenseaRecommend', 
    icon: 'ghtd', 
    name: '公海推单', 
    component: _import('dispatch/OpenseaRecommend/index'), 
    meta: { role: ['admin'], title: '公海推单',stitle: '公海',  noCache: true , code: 'DISPATCH_OPENSEA_RECOMMEND'}
  },
  {
    path: '/dispatch/Directional', 
    icon: 'dxtdsz', 
    name: '定向推单设置',
    hidden: false, 
    component: _import('dispatch/index'), 
    meta: { role: ['admin'], title: '定向推单设置', stitle:'设置', noCache: true, code: 'DISPATCH_ORIENT_RECOMMEND' },
      children: [{
        path: '/dispatch/Directional/DriverShipper',
        name: '绑定车主', 
        component: _import('dispatch/Directional/DriverShipper/index'), 
        meta: { role: ['admin'], title: '绑定车主',stitle: '车主',  noCache: true , code: ''}
      },
      {
        path: '/dispatch/Directional/DriverPlatform', 
        name: '平台专属', 
        component: _import('dispatch/Directional/DriverPlatform/index'), 
        meta: { role: ['admin'], title: '平台专属', stitle: '平台', noCache: true , code: ''}
      }
    ]
  }, 
  {
    path: '/dispatch/OrderObtain', 
    icon: 'zdsz', name: '中单设置', 
    component: _import('dispatch/OrderObtain/index'), 
    meta: { role: ['admin'], title: '中单设置',stitle: '中单',  noCache: true , code: 'DISPATCH_OBTAIN'}
  },
  {
    path: '/dispatch/evaluation', 
    icon: 'zonghe', name: '考核管理', 
    component: _import('dispatch/evaluation/index'), 
    meta: { role: ['admin'], title: '考核管理',stitle: '考核管理', noCache: true, code: 'DISPATCH_CHECK_MANEGE' },
    children: [{
      path: '/dispatch/evaluation/truck',
      name: '小货车考核', 
      component: _import('dispatch/evaluation/truck/index'), 
      meta: { role: ['admin'], title: '小货车',stitle: '小货车', noCache: true , code: 'DISPATCH_CHECK_MANEGE_SMALL_CAR' }
    },
    {
      path: '/dispatch/evaluation/salesManAchievement',
      name: '业务员业绩目标设置', 
      component: _import('dispatch/evaluation/salesManAchievement/index'), 
      meta: { role: ['admin'], title: '业务员业绩目标设置',stitle: '设置', noCache: true , code: '' }
    }]
  },  
  {
    path: '/dispatch/plusPower', 
    icon: 'gongsiguanli', name: '中单加权分配置', 
    component: _import('dispatch/plusPower/plusPowerSouce'), 
    meta: { role: ['admin'], title: '中单加权分配置',stitle: '中单', noCache: true, code: 'DISPATCH_ORDER_WEIGHTED_SETTING' }
  },  
  {
    path: '/dispatch/RiskManagement',
    icon: 'fkgl',
    hidden: false,
    name: '风控管理',
    component: _import('dispatch/RiskManagement/index'),
    meta: { title: '风控管理', stitle: '风控', noCache: true, code: 'DISPATCH_CONTROL_MANAGE_SETTING' }
  },
  {
    path: '/dispatch/operationsManagement', 
    icon: 'yygl', 
    name: '车货匹配运营管理', 
    component: _import('dispatch/operationsManagement/index'), 
    meta: { role: ['admin'], title: '运营管理',stitle: '运营',  noCache: true , code: 'DISPATCH_OPERATIONMANAGEMENT'},
    children: [{
        path: '/dispatch/operationsManagement/Operator',
        name: '车货匹配运营人员', 
        component: _import('dispatch/operationsManagement/Operator/index'), 
        meta: { role: ['admin'], title: '运营人员',stitle: '运营人员', noCache: true , code: 'DISPATCH_OPERATIONMANAGEMENT_OPERATOR' }
      },{
        path: '/dispatch/operationsManagement/ContractProduct',
        name: '车货匹配承包产品', 
        component: _import('dispatch/operationsManagement/ContractProduct/index'), 
        meta: { role: ['admin'], title: '承包产品',stitle: '承包产品', noCache: true , code: 'DISPATCH_OPERATIONMANAGEMENT_CONTRACTPRODUCT' }
      },{
        path: '/dispatch/operationsManagement/Contractor',
        name: '车货匹配承包商', 
        component: _import('dispatch/operationsManagement/Contractor/index'), 
        meta: { role: ['admin'], title: '承包商',stitle: '承包商', noCache: true , code: 'DISPATCH_OPERATIONMANAGEMENT_CONTRACTOR' }
      },]
  },
//   {
//     path: '/dispatch/PushManagement',
//     icon: 'tsgl',
//     hidden: false,
//     name: '推送管理',
//     component: _import('dispatch/PushManagement/index'),
//     meta: { title: '推送管理', stitle: '推送', noCache: true, code: '' }
//   },
//   {
//     path: '/dispatch/RecommendedManagement',
//     icon: 'tjgl',
//     hidden: false,
//     name: '推荐管理',
//     component: _import('dispatch/RecommendedManagement/index'),
//     meta: { title: '推荐管理', stitle: '推荐', noCache: true, code: '' }
//   },
  {
    path: '/dispatch/logistics', 
    icon: 'fwl', 
    name: '调度发物流区代管理', 
    component: _import('dispatch/logistics/router'), 
    meta: { role: ['admin'], title: '发物流',stitle: '发物流',  noCache: true , code: 'DISPATCH_HAIRLOGISTICS'},
    children: [{
      path: '/dispatch/logistics/areaAgentSystem/index',
      name: '调度区代管理', 
      component: _import('dispatch/logistics/areaAgentSystem/index'), 
      meta: { role: ['admin'], title: '区代管理',stitle: '区代', noCache: true , code: 'DISPATCH_HAIRLOGISTICS_DISTRICTMANAGEMENT' }
    },
    {
        path: '/dispatch/logistics/netWork/index',
        name: '区代网点管理', 
        component: _import('dispatch/logistics/netWork/index'), 
        meta: { role: ['admin'], title: '区代网点管理',stitle: '区代网点', noCache: true , code: '' }
      },
      {
        path: '/dispatch/logistics/plantformProfit/index',
        name: '平台分润规则配置', 
        component: _import('dispatch/logistics/plantformProfit/index'), 
        meta: { role: ['admin'], title: '平台分润规则配置',stitle: '平台分润', noCache: true , code: 'DISPATCH_HAIRLOGISTICS_DISTRIBUTIONCONFIGURATION' }
      },{
        path: '/dispatch/logistics/CarriersLine/index',
        name: '专线承运商管理', 
        component: _import('dispatch/logistics/CarriersLine/index'), 
        meta: { role: ['admin'], title: '专线承运商管理',stitle: '承运商', noCache: true , code: 'DISPATCH_HAIRLOGISTICS_SPECIALLINECARRIER' }
      },{
        path: '/dispatch/logistics/carrierPointNetwork/index',
        name: '专线承运商网点管理', 
        component: _import('dispatch/logistics/carrierPointNetwork/index'), 
        meta: { role: ['admin'], title: '专线承运商网点管理',stitle: '网点', noCache: true , code: 'DISPATCH_HAIRLOGISTICS_DOTMANAGEMENT' }
      }]
  },
  {
    path: '/dispatch/OperationsInformCity', 
    icon: 'qdgl', 
    name: '同城运营通知', 
    component: _import('dispatch/OperationsInformCity/informManage/index'), 
    meta: { role: ['admin'], title: '同城运营通知',stitle: '运营',  noCache: true , code: 'DISPATCH_LOCALOPERATIONNOTICE'},
    children: [{
      path: '/dispatch/OperationsInformCity/informManage',
      name: '业务消息配置', 
      component: _import('dispatch/OperationsInformCity/informManage/index'), 
      meta: { role: ['admin'], title: '业务消息配置',stitle: '通知', noCache: true , code: 'DISPATCH_LOCALOPERATIONNOTICE_BUSINESSMESSAGECONFIGURATION' }
    }]
  },
]
}
