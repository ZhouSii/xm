import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
    path: '/users/',
    component: Layout,
    redirect: '/users/shipper',
    name: '用户管理',
    icon: 'zonghe', 
    meta: {
        title: '用户管理', code: 'USER'
    },
  children: [
      { path: '/users/shipper', 
        icon: 'hzyx', 
        hidden: false, 
        name: '货主管理', 
        component: _import('users/shipper/index'), 
        meta: { title: '货主管理', stitle: '货主',noCache: false ,code:'SHIPPER_MANAGE',keepAlive:true},
      },
      { path: '/users/carowner', 
        icon: 'chezgl', 
        hidden: false, 
        name: '车主管理', 
        component: _import('users/carowner/index'), 
        meta: { title: '车主管理',stitle: '车主', noCache: true, code:'DRIVER_MANAGE',keepAlive:true}
        },
      { path: '/users/member', 
        icon: 'wlgs', 
        hidden: false, 
        name: '物流公司', 
        component: _import('users/member/index'), 
        meta: { title: '物流公司',stitle: '会员', noCache: true ,code:'COMPANY_MANAGE',keepAlive:true}},
      { 
        path: '/users/district', 
        icon: 'hhrgl', 
        hidden: false, 
        name: '商圈区代', 
        component: _import('users/district/index'), 
        meta: { title: '商圈区代', stitle: '商圈',noCache: true ,code:'BUSINESS_AREA_MANAGE'},
        children:[
            {
                path: '/users/district/shoppingManage/index', 
                hidden: false, 
                name: '商圈管理', 
                component: _import('users/district/shoppingManage/index'), 
                meta: { title: '商圈管理', stitle: '商圈',noCache: true ,code:'BUSINESS_AREA_MANAGE_BUSINESS'},
            },
            {
                path: '/users/district/shoppingManage/details', 
                hidden: true, 
                name: '商圈管理详情', 
                component: _import('users/district/shoppingManage/details'), 
                meta: { title: '商圈管理详情', stitle: '商圈',noCache: true ,code:''},
            },
            {
                path: '/users/district/manageDistrict/index', 
                hidden: false, 
                name: '同城区代管理', 
                component: _import('users/district/manageDistrict/index'), 
                meta: { title: '同城区代管理', stitle: '区代',noCache: true,code:'BUSINESS_AREA_MANAGE_AREA' },
            },              
        ]
    },  
    { 
        path: '/users/salesman', 
        icon: 'QRcode', 
        hidden: false, 
        name: '业务员二维码', 
        component: _import('users/salesman/index'), 
        meta: { title: '业务员二维码', stitle: '业务员',noCache: true,code:'' }
    },
    { 
        path: '/users/shipperData', 
        icon: 'hzsjgl', 
        hidden: false, 
        name: '货主数据管理', 
        component: _import('users/shipperData/index'), 
        meta: { title: '货主数据管理', stitle: '货主',noCache: true,code:'SHIPPER_DATA_MANAGE' }
    },
    { 
        path: '/users/carData', 
        icon: 'czsjgl', 
        hidden: false, 
        name: '车主数据管理', 
        component: _import('users/carData/index'), 
        meta: { title: '车主数据管理', stitle: '车主',noCache: true,code:'DRIVER_DATA_MANAGE',keepAlive: true }
    },
    // {
    //     path: '/users/potentialGrade', 
    //     icon: 'QQ', 
    //     hidden: false, 
    //     name: '潜力等级调整', 
    //     component: _import('users/potentialGrade/index'), 
    //     meta: { title: '潜力等级调整', stitle: '潜力',noCache: true ,code:''},
    //     children:[
    //         {
    //             path: '/users/potentialGrade/shipperGrade/index', 
    //             hidden: false, 
    //             name: '货主潜力等级调整', 
    //             component: _import('users/potentialGrade/shipperGrade/index'), 
    //             meta: { title: '货主潜力等级调整', stitle: '货主潜力',noCache: true ,code:''},
    //         },
    //     ]
    // },  
    { 
        path: '/users/dataDetails', 
        icon: 'QQ', 
        hidden: true, 
        name: '货主详情', 
        component: _import('users/dataDetails/index'), 
        meta: { title: '货主详情', stitle: '详情',noCache: true }
    },
    { 
        path: '/users/dataDetailsCar', 
        icon: 'QQ', 
        hidden: true, 
        name: '车主详情', 
        component: _import('users/dataDetailsCar/index'), 
        meta: { title: '车主详情', stitle: '详情',noCache: true }
    },
    { 
        path: '/users/carowner/carMapDetail', 
        icon: 'QQ', 
        hidden: true, 
        name: '获取车主轨迹', 
        component: _import('users/carowner/carMapDetail'), 
        meta: { title: '获取车主轨迹', stitle: '轨迹',noCache: true }
    },
  ]
}


