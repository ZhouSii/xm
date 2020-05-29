import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
    path: '/order',
    component: Layout,
    redirect: '/order/tongcheng/waitpayment',
    icon: 'from',
    name: '订单管理',
    noDropdown: true,
    meta: {
        title: '订单管理', code: 'ORDER'
    },
  children: [
    {
        path: '/order/tongcheng',
        icon: 'tcdd',
        name: 'orderManage',
        component: _import('order/index'),
        meta: { role: ['admin'], title: '小货车',stitle: '小货车',  noCache: true, code: 'ORDER_CITY_WIDE_ORDER',keepAlive:true },
        children: [
            {
                path: '/order/tongcheng/waitPointing',
                name: '小货车待指派',
                component: _import('order/tongcheng/waitPointing/index'),
                meta: { role: ['admin'], title: '待指派',stitle: '待指派',  noCache: true, code: 'ORDER_CITY_WIDE_ORDER_WIAT_ASSIGN',keepAlive:false }
            },
            {
                path: '/order/tongcheng/waitpayment',
                name: '小货车待付款',
                component: _import('order/tongcheng/waitpayment/index'),
                meta: { role: ['admin'], title: '待付款',stitle: '待付款',  noCache: true, code: 'ORDER_CITY_WIDE_ORDER_WIAT_PAY',keepAlive:true }
            },
            {
                path: '/order/tongcheng/toDispatch',
                name: '小货车派单中',
                component: _import('order/tongcheng/toDispatch/index'),
                meta: { role: ['admin'], title: '派单中', stitle: '派单中', noCache: true , code: 'ORDER_CITY_WIDE_ORDER_SENG_ORDER_ING',keepAlive:true}
            },
            {
                path: '/order/tongcheng/implementing',
                name: '小货车进行中',
                component: _import('order/tongcheng/implementing/index'),
                meta: { role: ['admin'], title: '进行中', stitle: '进行中',  noCache: true, code: 'ORDER_CITY_WIDE_ORDER_ING',keepAlive:true }
            },
            {
                path: '/order/tongcheng/complate',
                name: '小货车已完成',
                component: _import('order/tongcheng/complate/index'),
                meta: { role: ['admin'], title: '已完成', stitle: '已完成',noCache: true, code: 'ORDER_CITY_WIDE_ORDER_FINISHED',keepAlive:true }
            },
            {
                path: '/order/tongcheng/canceled',
                name: '小货车已取消',
                component: _import('order/tongcheng/canceled/index'),
                meta: { role: ['admin'], title: '已取消', stitle: '已取消',noCache: false, code: 'ORDER_CITY_WIDE_ORDER_CANCLE',keepAlive:true }
            },
            {
                path: '/order/tongcheng/allOrderList',
                name: '小货车全部',
                component: _import('order/tongcheng/allOrderList/index'),
                meta: { role: ['admin'], title: '全部', stitle: '全部',noCache: true , code: 'ORDER_CITY_WIDE_ORDER_ALL',keepAlive:true}
            },
            {
                path: '/order/tongcheng/toExamine', 
                name: '小货车订单审核', 
                component: _import('order/tongcheng/toExamine/index'), 
                meta: { role: ['admin'], title: '订单审核', stitle: '订单审核',noCache: true , code: '',keepAlive:true}
            },
            {
                path: '/order/tongcheng/carStickerEX', 
                name: '小货车车贴审查', 
                component: _import('order/tongcheng/carStickerEX/index'), 
                meta: { role: ['admin'], title: '车贴审查', stitle: '车贴审查',noCache: true , code: '',keepAlive:false}
            },
            {
                path: '/order/tongcheng/abnormalList',
                name: '小货车异常管理',
                component: _import('order/tongcheng/abnormalList/index'),
                meta: { role: ['admin'], title: '异常管理', stitle: '异常',noCache: true , code: 'ORDER_CITY_WIDE_ORDER_EXCEPTION_MANAGE'}
            },
            {
                path: '/order/tongcheng/components/appointDriverMap',
                name: '小货车待指派地图',
                hidden: true,
                component: _import('order/tongcheng/components/appointDriverMap'),
                meta: { role: ['admin'], title: '小货车待指派地图', stitle: '指派',noCache: true , code: ''}
            },
        ]
    },
    {
        path: '/order/sendlogistics',
        icon: 'lddingdan',
        name: '发物流订单',
        component: _import('order/sendlogistics/index'),
        meta: { role: ['admin'], title: '发物流',stitle: '发物流',  noCache: true , code: 'ORDER_LTL_ORDER'},
        children: [
            {
                path: '/order/sendlogistics/shipperOrder',
                name: '货主订单管理',
                component: _import('order/sendlogistics/shipperOrder/index'),
                meta: { role: ['admin'], title: '货主订单管理',stitle: '货主',  noCache: true,code: '' }
            },
            {
                path: '/order/sendlogistics/agentWaybill',
                name: '区代运单管理',
                component: _import('order/sendlogistics/agentWaybill/index'),
                meta: { role: ['admin'], title: '区代运单管理',stitle: '区代',  noCache: true,code: '' }
            },
            {
                path: '/order/sendlogistics/transferOrderManagement/index',
                name: '区代中转订单管理',
                component: _import('order/sendlogistics/transferOrderManagement/index'),
                meta: { role: ['admin'], title: '区代中转订单管理',stitle: '中转',noCache: true,code: '' }
            }, 
            {
                path: '/order/sendlogistics/carriersWaybill',
                name: '专线运单管理',
                component: _import('order/sendlogistics/carriersWaybill/index'),
                meta: { role: ['admin'], title: '专线运单管理',stitle: '专线',  noCache: true,code: '' }
            },
            // {
            //     path: '/order/sendlogistics/waitFollowUp/index',
            //     name: '发物流待跟进',
            //     component: _import('order/sendlogistics/waitFollowUp/index'),
            //     meta: { role: ['admin'], title: '待跟进',stitle: '跟进',  noCache: true,code: '' }
            // },
            // {
            //     path: '/order/sendlogistics/allsendlogistics',
            //     name: '发物流全部',
            //     component: _import('order/sendlogistics/allsendlogistics'),
            //     meta: { role: ['admin'], title: '全部',stitle: '全部',noCache: true,code: 'ORDER_LTL_ORDER_ALL' }
            // },
            // {
            //     path: '/order/sendlogistics/NotAvailableRoute',
            //     name: '未开通路线订单',
            //     component: _import('order/sendlogistics/NotAvailableRoute'),
            //     meta: { role: ['admin'], title: '未开通路线订单',stitle: '路线',noCache: true,code: '' }
            // },
           
            {
                path: '/order/sendlogistics/orderDetail',
                name: '发物流订单详情',
                hidden: true,
                component: _import('order/sendlogistics/orderDetail/index'),
                meta: { role: ['admin'], title: '发物流订单详情',stitle: '详情',noCache: true,code: '' }
            },
            {
                path: '/order/sendlogistics/orderCheck',
                name: '发物流订单审核',
                hidden: false,
                component: _import('order/sendlogistics/orderCheck/index'),
                meta: { role: ['admin'], title: '订单审核',stitle: '审核',noCache: true,code: '' }
            },
        ]
      },
        {
            path: '/order/dahuocheOrder',
            icon: 'dahuochedd',
            name: '大货车订单',
            component: _import('order/dahuocheOrder/index'),
            meta: { role: ['admin'], title: '大货车',stitle: '大货车',  noCache: true , code: 'ORDER_BIG_CAR_ORDER'}
        },
        {
            path: '/order/userIssue',
            icon: 'shouce',
            name: '货源管理',
            component: _import('order/userIssue/index'),
            meta: { role: ['admin'], title: '货源管理',stitle: '货源',  noCache: true , code: 'ORDER_ORDER_GOODS_MANAGE'},
            children: [
                {
                    path: '/order/userIssue/waitCarriySource/index',
                    name: '待处理货源',
                    component: _import('order/userIssue/waitCarriySource/index'),
                    meta: { role: ['admin'], title: '待处理货源',stitle: '待处理',  noCache: true,code: 'ORDER_ORDER_GOODS_MANAGE_PROCESS' }
                },
                {
                    path: '/order/userIssue/ProcessedSource/index',
                    name: '已处理货源',
                    component: _import('order/userIssue/ProcessedSource/index'),
                    meta: { role: ['admin'], title: '已处理货源',stitle: '已处理',  noCache: true,code: 'ORDER_ORDER_GOODS_MANAGE_DEAL' }
                },
                {
                    path: '/order/userIssue/totalSource/index',
                    name: '全部',
                    component: _import('order/userIssue/totalSource/index'),
                    meta: { role: ['admin'], title: '全部',stitle: '全部',  noCache: true,code: 'ORDER_ORDER_GOODS_MANAGE_ALL' }
                },
            ]
        },
        {
            path: '/order/VehicleSource',
            icon: 'cheyuan',
            name: '订单管理车源信息',
            component: _import('order/VehicleSource/index'),
            meta: { role: ['admin'], title: '车源信息',stitle: '车源',  noCache: true , code: 'ORDER_ORDER_CARS_MANAGE'}
        },
        {
            path: '/order/VehicleSource/VehicleSourceDetails',
            hidden: true,
            name: '车源详情',
            component: _import('order/VehicleSource/VehicleSourceDetails'),
            meta: { role: ['admin'], title: '车源详情',stitle: '车源',  noCache: true , code: ''}
        },
        {
            path: '/order/orderDetails',
            name: '订单详情',
            hidden: true,
            component: _import('order/orderDetails/index'),
            meta: { role: ['admin'], title: '订单详情',stitle: '详情',  noCache: false }
        },
        // {
        //     path: '/order/sendlogisticsLog',
        //     name: '发物流订单详情',
        //     hidden: true,
        //     component: _import('order/sendlogistics/publice/sendlogisticsLog'),
        //     meta: { role: ['admin'], title: '发物流订单详情',stitle: '详情',  noCache: false }
        // },
        {
            path: '/order/guiji',
            icon: 'guijihf',
            name: '车辆轨迹回放',
            hidden:true,
            component: _import('order/guiji/index'),
            meta: { role: ['admin'], title: '车辆轨迹回放',stitle: '轨迹',  noCache: false , code: 'ORDER_CAR_TRACK'}
        },
        {
            path: '/order/userIssue/components/index',
            name: '货源详情',
            icon: 'shouce',
            hidden:true,
            component: _import('order/userIssue/components/index'),
            meta: { role: ['admin'], title: '货源详情',stitle: '详情',  noCache: true }
        },
    ]
}
