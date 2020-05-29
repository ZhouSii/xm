import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/sm',
  component: Layout,
  redirect: '/sm/xiaohuoche/standardPrice',
  icon: 'yunyingguanli',
  name: '服务管理',
  noDropdown: true,
  meta: {
    title: '服务管理', code: 'SERVICE'
  },
  children: [
    {
      path: '/sm/xiaohuoche', 
      icon: 'xiaohuoche', 
      name: '小货车服务', 
      component: _import('sm/xiaohuoche/index'), 
      meta: { role: ['admin'], title: '小货车', stitle: '小货车', noCache: true , code: 'SERVICE_SMALL_CAR'},
      children: [
        {
            path: '/sm/xiaohuoche/standardPrice',
            name: '标准服务及定价',
            component: _import('sm/xiaohuoche/standardPrice/index'),
            meta: { role: ['admin'], title: '标准服务及定价', stitle: '标准', noCache: true , code: 'SERVICE_SMALL_CAR_STANDARD_PRICE'}
        },
        {
            path: '/sm/xiaohuoche/areaPrice',
            name: '区域服务及定价',
            component: _import('sm/xiaohuoche/areaPrice/index'),
            meta: { role: ['admin'], title: '区域服务及定价', stitle: '区域', noCache: true, code: 'SERVICE_SMALL_CAR_AREA_PRICE' }
        },
        {
            path: '/sm/xiaohuoche/extraPrice',
            name: '额外服务管理',
            component: _import('sm/xiaohuoche/extraPrice/index'),
            meta: { role: ['admin'], title: '额外服务管理', stitle: '额外', noCache: true , code: 'SERVICE_SMALL_CAR_OTHER_SERVICE'}
        },
        {
            path: '/sm/xiaohuoche/waitPrice',
            name: '等候费用定价',
            component: _import('sm/xiaohuoche/waitPrice/index'),
            meta: { role: ['admin'], title: '等候费用定价', stitle: '等候', noCache: true , code: 'SERVICE_SMALL_CAR_WAIT_PRICE'}
        }
      ]
    },
    {
      path: '/sm/lingdan', 
      icon: 'lingdan', 
      name: '发物流区代销售定价', 
      component: _import('sm/lingdan/index'), 
      meta: { role: ['admin'], title: '区代销售定价', stitle: '区代销售', noCache: true , code: 'SERVICE_DISTRICTSALESPRICING'},
      children: [
        {   path: '/sm/lingdan/pickUpChargePrice/index',
            hidden: false,
            name: '区代提货范围及定价',
            component: _import('sm/lingdan/pickUpChargePrice/index'),
            meta: { title: '区代提货范围及定价', stitle: '提货', noCache: true , code: 'SERVICE_DISTRICTSALESPRICING_STANDARDSERVICESANDPRICING'}
        },
        {   path: '/sm/lingdan/trunkLinePrice/index',
            hidden: false,
            name: '区代运作路线及定价',
            component: _import('sm/lingdan/trunkLinePrice/index'),
            meta: { title: '区代运作路线及定价', stitle: '区代路线', noCache: true , code: 'SERVICE_DISTRICTSALESPRICING_OPERATIONROUTEANDPRICINGOFDISTRICTAGENT'}
        },
        {   path: '/sm/lingdan/deliveryCharge/index',
            hidden: false,
            name: '区代送货费定价',
            component: _import('sm/lingdan/deliveryCharge/index'),
            meta: { title: '区代送货费定价', stitle: '定价', noCache: true , code: 'SERVICE_DISTRICTSALESPRICING_DISTRICTDELIVERYFEEANDPRICING'}
        },
        {   path: '/sm/lingdan/otherService/index',
            hidden: false,
            name: '区代增值服务定价',
            component: _import('sm/lingdan/otherService/index'),
            meta: { title: '区代增值服务定价', stitle: '增值', noCache: true , code: 'SERVICE_DISTRICTSALESPRICING_INCREMENT'}
        },
        {   path: '/sm/lingdan/platFormtrunkLine/index',
            hidden: false,
            name: '平台路线标准定价',
            component: _import('sm/lingdan/platFormtrunkLine/index'),
            meta: { title: '平台路线标准定价', stitle: '平台路线', noCache: true , code: 'SERVICE_DISTRICTSALESPRICING_PLATFORMROUTESTANDARDPRICING'}
        },
        {   path: '/sm/lingdan/platformStandPrice/index',
            hidden: false,
            name: '平台增值服务标准定价',
            component: _import('sm/lingdan/platformStandPrice/index'),
            meta: { title: '平台增值服务标准定价', stitle: '服务标准', noCache: true , code: 'SERVICE_DISTRICTSALESPRICING_ADDEDSERVICES'}
        },
      ]  
    },
    {
        path: '/sm/purchasePrice', 
        icon: 'zxcgdj', 
        name: '发物流专线承运商采购定价', 
        component: _import('sm/purchasePrice/index'), 
        meta: { role: ['admin'], title: '专线采购定价', stitle: '采购定价', noCache: true , code: 'SERVICE_SPECIALLINEPURCHASEPRICING'},
        children: [
            {   path: '/sm/purchasePrice/pointLinePrice/index',
                hidden: false,
                name: '干线费定价',
                component: _import('sm/purchasePrice/pointLinePrice/index'),
                meta: { title: '干线费定价', stitle: '干线费', noCache: true , code: 'SERVICE_SPECIALLINEPURCHASEPRICING_PRICINGOFTRUNKLINEFEE'}
            },
            {   path: '/sm/purchasePrice/deliveryPrice/index',
                hidden: false,
                name: '专线承运商送货费定价',
                component: _import('sm/purchasePrice/deliveryPrice/index'),
                meta: { title: '送货费定价', stitle: '送货费', noCache: true , code: 'SERVICE_SPECIALLINEPURCHASEPRICING_DELIVERYFEEPRICING'}
            },
            {   path: '/sm/purchasePrice/valueAddedServices/index',
                hidden: false,
                name: '专线承运商增值服务定价',
                component: _import('sm/purchasePrice/valueAddedServices/index'),
                meta: { title: '增值服务定价', stitle: '送货增值服务费', noCache: true , code: 'SERVICE_SPECIALLINEPURCHASEPRICING_VALUEADDEDSERVICEPRICING'}
            },
        ]  
      },
    {
      path: '/sm/dahuocheService', 
      icon: 'dahuoche', 
      name: '大货车服务', 
      component: _import('sm/dahuocheService/index'), 
      meta: { role: ['admin'], title: '大货车', stitle: '大货车', noCache: true , code: 'SERVICE_BIG_CAR'},
    },
    {
        path: '/sm/xuqiuku', 
        icon: 'xqk', 
        name: '需求库', 
        component: _import('sm/xuqiuku/index'), 
        meta: { role: ['admin'], title: '需求库',stitle: '需求库',  noCache: true , code: 'SERVICE_DEMAND'},
        children:[
            { 
                path: '/sm/xuqiuku/carInfo', 
                hidden: false, 
                name: '车源信息', 
                component: _import('sm/xuqiuku/carInfo/index'), 
                meta: { title: '车源信息',stitle: '车源',  noCache: true , code: 'SERVICE_DEMAND_DRIVER_INFO'},
            },
            { 
                path: '/sm/xuqiuku/driverInfo', 
                hidden: false,
                name: '货源信息', 
                component: _import('sm/xuqiuku/driverInfo/index'), 
                meta: { title: '货源信息',stitle: '货源',  noCache: true , code: 'SERVICE_DEMAND_SHIPPER_GOODS_INFO'
            }},
            { 
                path: '/sm/xuqiuku/manageGroup', 
                hidden: false,
                name: '网点信息', 
                component: _import('sm/xuqiuku/manageGroup/index'), 
                meta: { title: '网点信息',stitle: '网点',  noCache: true , code: 'SERVICE_DEMAND_NETWORK_INFO'
            }},
        ]
    },
    {
        path: '/sm/QRCode', 
        icon: 'QRcode', 
        name: '二维码', 
        component: _import('sm/QRCode/index'), 
        meta: { role: ['admin'], title: '二维码', stitle: '二维码', noCache: true , code: 'SERVICE_QRCODE'},
      },
  ]
}
