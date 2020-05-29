import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default{
    path: '/vest',
    component: Layout,
    redirect: '/vest/pushsheet',
    name: '马甲货源',
    icon: 'zujian',
    hidden:true,
    children: [
        { path: '/vest/pushsheet', icon: 'QQ', hidden: false, name: '推送设置', component: _import('vest/pushsheet/index'), meta: { title: '推送设置', stitle: '推送',noCache: true },
        },
        { path: '/vest/onesource', icon: 'QQ', hidden: false, name: '马甲单源', component: _import('vest/onesource/index'), meta: { title: '马甲单源', stitle: '单源',noCache: true },
        }
    ]
}