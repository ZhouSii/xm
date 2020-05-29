import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/marketing',
  component: Layout,
  redirect: '/marketing/carmarkting/carmaid',
  icon: 'yingxiaogl',
  name: '营销管理',
  // hidden: true,
  noDropdown: false,
  meta: {
    title: '营销管理',
    code: 'MARKETING'
  },
  children: [{
      path: '/marketing/carmarkting',
      icon: 'czyx',
      name: '车主营销管理',
      component: _import('marketing/carmarkting/index'),
      meta: {
        role: ['admin'],
        title: '车主营销管理',
        stitle: '车主',
        noCache: true,
        code: 'MARKETING_DRIVER_MANAGE'
      },
      children: [{
          path: '/marketing/carmarkting/carmaid',
          name: '抽佣管理',
          component: _import('marketing/carmarkting/carmaid/index'),
          meta: {
            role: ['admin'],
            title: '抽佣管理',
            stitle: '抽佣',
            noCache: true,
            code: 'MARKETING_DRIVER_MANAGE_COMMISSION_MANAGE'
          }
        },
        {
          path: '/marketing/carmarkting/carOwner',
          name: '车主奖励',
          component: _import('marketing/carmarkting/carOwner/index'),
          meta: {
            role: ['admin'],
            title: '车主奖励',
            stitle: '奖励',
            noCache: true,
            code: 'MARKETING_DRIVER_MANAGE_DRIVER_REWARD'
          }
        },
        {
          path: '/marketing/carmarkting/orderFrom',
          name: '订单达量',
          component: _import('marketing/carmarkting/orderFrom/index'),
          meta: {
            role: ['admin'],
            title: '订单达量',
            stitle: '达量',
            noCache: true,
            code: 'MARKETING_DRIVER_MANAGE_ORDER_NUM_REWARD'
          }
        },
        {
          path: '/marketing/carmarkting/shareActCarOwner',
          hidden: false,
          name: '车主分享活动',
          component: _import('marketing/carmarkting/shareActCarOwner/index'),
          meta: {
            title: '车主分享活动',
            stitle: '分享活动',
            noCache: true,
            code: '',
            keepAlive: true,
            isClosed: true
          }
        },
        {
          path: '/marketing/carmarkting/shareActCarOwner/shareActDataCarOwner',
          hidden: true,
          name: '车主分享活动数据',
          component: _import('marketing/carmarkting/shareActCarOwner/shareActDataCarOwner'),
          meta: {
            title: '车主分享活动数据',
            stitle: '分享活动数据',
            noCache: true,
            code: '',
            // keepAlive: true,
          }
        },
      ]
    },
    {
      path: '/marketing/shippermarkting',
      icon: 'hzyx',
      name: '货主营销管理',
      component: _import('marketing/shippermarkting/index'),
      meta: {
        role: ['admin'],
        title: '货主营销管理',
        stitle: '货主',
        noCache: true,
        code: 'MARKETING_SHIPPER_MANAGE'
      },
      children: [{
          path: '/marketing/shippermarkting/coupon',
          hidden: false,
          name: '优惠券',
          component: _import('marketing/shippermarkting/coupon/index'),
          meta: {
            title: '优惠券',
            stitle: '优惠券',
            noCache: true,
            code: 'MARKETING_SHIPPER_MANAGE_COUPON_ACTIVITY',
            keepAlive: true,
            isClosed: true,
          }
        },
        {
          path: '/marketing/shippermarkting/couponCash',
          hidden: false,
          name: '优惠金',
          component: _import('marketing/shippermarkting/couponCash/index'),
          meta: {
            title: '优惠金',
            stitle: '优惠金',
            noCache: true,
            code: 'MARKETING_SHIPPER_MANAGE_PREFERENTIAL',
            keepAlive: true,
          }
        },
        {
          path: '/marketing/shippermarkting/couponCollocation',
          hidden: false,
          name: '领券配置',
          component: _import('marketing/shippermarkting/couponCollocation/index'),
          meta: {
            title: '领券配置',
            stitle: '配置',
            noCache: true,
            code: 'MARKETING_SHIPPER_MANAGE_COILCONFIGURATION',
            keepAlive: true,
            isClosed: true,
          }
        },
        {
          path: '/marketing/shippermarkting/rechargeConfig',
          hidden: false,
          name: '充值配置',
          component: _import('marketing/shippermarkting/rechargeConfig/index'),
          meta: {
            title: '充值配置',
            stitle: '配置',
            noCache: true,
            code: 'MARKETING_SHIPPER_MANAGE_RECHARGECONFIGURATION',
            keepAlive: true,
          }
        },
        {
          path: '/marketing/shippermarkting/deliverySubsidy',
          hidden: false,
          name: '发货津贴',
          component: _import('marketing/shippermarkting/deliverySubsidy/index'),
          meta: {
            title: '发货津贴',
            stitle: '发货津贴',
            noCache: true,
            code: '',
            // keepAlive: true,
          }
        },
        {
          path: '/marketing/shippermarkting/deliverySubsidy/subsidyActData',
          hidden: true,
          name: '发货津贴活动数据',
          component: _import('marketing/shippermarkting/deliverySubsidy/subsidyActData'),
          meta: {
            title: '发货津贴活动数据',
            stitle: '发货津贴活动数据',
            noCache: true,
            code: '',
            // keepAlive: true,
          }
        },
        {
          path: '/marketing/shippermarkting/shareAct',
          hidden: false,
          name: '货主分享活动',
          component: _import('marketing/shippermarkting/shareAct/index'),
          meta: {
            title: '货主分享活动',
            stitle: '分享活动管理',
            noCache: true,
            code: '',
            keepAlive: true,
            isClosed: true
          }
        },
        {
          path: '/marketing/shippermarkting/shareAct/shareActData',
          hidden: true,
          name: '货主分享活动数据',
          component: _import('marketing/shippermarkting/shareAct/shareActData'),
          meta: {
            title: '货主分享活动数据',
            stitle: '分享活动数据',
            noCache: true,
            code: '',
            // keepAlive: true,
          }
        },
      ]
    },
    {
        path: '/marketing/specialActivities/',
        icon: 'QQ',
        name: '零担专项活动',
        component: _import('marketing/specialActivities/index'),
        meta: {
          role: ['admin'],
          title: '零担专项活动',
          stitle: '零担',
          noCache: true,
          code: ''
        },
        children: [{
            path: '/marketing/specialActivities/boutiqueLine/index',
            hidden: false,
            name: '精品线路管理',
            component: _import('marketing/specialActivities/boutiqueLine/index'),
            meta: {
              title: '精品线路管理',
              stitle: '线路',
              noCache: true,
              code: ''
            }
          },
        ]
      },
    {
      path: '/marketing/xiaohuocheMJ',
      icon: 'xiaohuochemj',
      name: '小货车马甲单',
      hidden: false,
      component: _import('marketing/xiaohuocheMJ/index'),
      meta: {
        role: ['admin'],
        title: '小货车马甲单',
        stitle: '小货车',
        noCache: true,
        code: 'MARKETING_SMALL_CAR_MJ'
      },
      children: [{
          path: '/marketing/xiaohuocheMJ/pushsheet',
          hidden: false,
          name: '推送设置',
          component: _import('marketing/xiaohuocheMJ/pushsheet/index'),
          meta: {
            title: '推送设置',
            stitle: '推送',
            noCache: true,
            code: 'MARKETING_SMALL_CAR_MJ_PUSH_OPTION'
          }
        },
        {
          path: '/marketing/xiaohuocheMJ/onesource',
          hidden: false,
          name: '单源配置',
          component: _import('marketing/xiaohuocheMJ/onesource/index'),
          meta: {
            title: '单源配置',
            stitle: '单源',
            noCache: true,
            code: 'MARKETING_SMALL_CAR_MJ_SOURCE_OPTION'
          }
        },
        {
          path: '/marketing/xiaohuocheMJ/MjPushLogs',
          hidden: false,
          name: '推送记录',
          component: _import('marketing/xiaohuocheMJ/MjPushLogs/index'),
          meta: {
            title: '推送记录',
            stitle: '记录',
            noCache: true,
            code: 'MARKETING_SMALL_CAR_MJ_PUSH_RECORD'
          }
        },
        {
          path: '/marketing/xiaohuocheMJ/Logs',
          hidden: true,
          name: '推送记录详情',
          component: _import('marketing/xiaohuocheMJ/MjPushLogs/pushLogs'),
          meta: {
            title: '推送记录详情',
            stitle: '详情',
            noCache: false
          }
        }
      ]
    },
    {
      path: '/marketing/userRevitalize/',
      icon: 'hzyx',
      name: '用户盘活',
      component: _import('marketing/userRevitalize/index'),
      meta: {
        role: ['admin'],
        title: '用户盘活',
        stitle: '盘活',
        noCache: true,
        code: 'MARKETING_USERREVITALIZE'
      },
      children: [{
          path: '/marketing/userRevitalize/marketingActivity/index',
          hidden: false,
          name: '营销活动管理',
          component: _import('marketing/userRevitalize/marketingActivity/index'),
          meta: {
            title: '营销活动管理',
            stitle: '营销',
            noCache: true,
            code: 'MARKETING_USERREVITALIZE_MARKETINGACTIVITYMANAGEMENT'
          }
        },
        {
          path: '/marketing/userRevitalize/marketingActivityData/index',
          hidden: false,
          name: '营销活动数据',
          component: _import('marketing/userRevitalize/marketingActivityData/index'),
          meta: {
            title: '营销活动数据',
            stitle: '营销',
            noCache: true,
            code: 'MARKETING_USERREVITALIZE_CAMPAIGNDATA'
          }
        },
      ]
    },
    {
      path: '/marketing/lingdanMJ',
      icon: 'lingdanmj',
      name: '零担马甲单',
      hidden: false,
      component: _import('marketing/lingdanMJ/index'),
      meta: {
        role: ['admin'],
        title: '零担马甲单',
        stitle: '零担',
        noCache: true,
        code: 'MARKETING_LTL_MJ'
      },
      children: []
    },
    {
      path: '/marketing/MarketingNotes',
      icon: 'EXCEL',
      name: '营销发放记录表',
      hidden: false,
      component: _import('marketing/MarketingNotes/index'),
      meta: {
        role: ['admin'],
        title: '营销发放记录表',
        stitle: '营销',
        noCache: true,
        code: 'MARKETING_MARKETINGDISTRIBUTIONRECORD'
      },
      children: [{
          path: '/marketing/MarketingNotes/couponNotes',
          hidden: false,
          name: '优惠券发放记录',
          component: _import('marketing/MarketingNotes/couponNotes'),
          meta: {
            title: '优惠券发放记录',
            stitle: '发放',
            noCache: true,
            code: 'MARKETING_MARKETINGDISTRIBUTIONRECORD_COUPON'
          }
        },
        {
          path: '/marketing/MarketingNotes/takeextraNotes',
          hidden: false,
          name: '优惠金发放记录',
          component: _import('marketing/MarketingNotes/takeextraNotes'),
          meta: {
            title: '优惠金发放记录',
            stitle: '发放',
            noCache: true,
            code: 'MARKETING_MARKETINGDISTRIBUTIONRECORD_PREFERENTIAL'
          }
        },
        {
          path: '/marketing/MarketingNotes/OwnerNotes',
          hidden: false,
          name: '奖励金发放记录',
          component: _import('marketing/MarketingNotes/OwnerNotes'),
          meta: {
            title: '奖励金发放记录',
            stitle: '记录',
            noCache: true,
            code: 'MARKETING_MARKETINGDISTRIBUTIONRECORD_BONUS'
          }
        },
        {
          path: '/marketing/MarketingNotes/deliverySubsidyRecords',
          hidden: false,
          name: '发货津贴明细记录',
          component: _import('marketing/MarketingNotes/deliverySubsidyRecords'),
          meta: {
            title: '发货津贴明细记录',
            stitle: '记录',
            noCache: true,
            code: ''
          }
        }
      ]
    },
    {
      path: '/marketing/adsConfig',
      icon: 'fxjlpz',
      name: '营销广告配置',
      hidden: false,
      component: _import('marketing/adsConfig/index'),
      meta: {
        role: ['admin'],
        title: '营销广告配置',
        stitle: '广告',
        noCache: true,
        code: 'MARKETING_MARKETINGADVERTISEMENT',
      },
      children: []
    },
    {
      path: '/marketing/operating',
      icon: 'yunyingSZ',
      name: '运营收支',
      hidden: false,
      component: _import('marketing/operating/index'),
      meta: {
        role: ['admin'],
        title: '运营收支',
        stitle: '运营',
        noCache: true,
        code: 'MARKETING_OPERATION',
        keepAlive: true,
        isClosed: true
      },
      children: []
    },
    {
      path: '/marketing/announcement',
      icon: 'cheliangguanli',
      hidden: false,
      name: '发布公告',
      component: _import('marketing/announcement/index'),
      meta: {
        title: '发布公告',
        stitle: '公告',
        noCache: true,
        code: 'MARKETING_PUBLISH_NOTICE'
      }
    },
    {
      path: '/marketing/Vipsytem',
      icon: 'czhytx',
      name: '车主会员体系',
      component: _import('marketing/Vipsytem/index'),
      meta: {
        role: ['admin'],
        title: '车主会员体系',
        stitle: '会员',
        noCache: true,
        code: 'MARKETING_DRIVER_MEMBER_SYSTEM'
      },
      children: [{
          path: '/marketing/Vipsytem/MembershipSystem',
          hidden: false,
          name: '会员权益配置',
          component: _import('marketing/Vipsytem/MembershipSystem/index'),
          meta: {
            title: '会员权益配置',
            stitle: '会员权益',
            noCache: true,
            code: 'MARKETING_DRIVER_MEMBER_SYSTEM_DRIVER_MEMBER_EQUITY'
          }
        },
        {
          path: '/marketing/Vipsytem/ExchangeMember',
          hidden: false,
          name: '28币兑换会员配置',
          component: _import('marketing/Vipsytem/ExchangeMember/index'),
          meta: {
            title: '28币兑换会员配置',
            stitle: '兑换会员',
            noCache: true,
            code: 'MARKETING_DRIVER_MEMBER_SYSTEM_DRIVER_MEMBER_EXCHANGE'
          }
        },
        {
          path: '/marketing/Vipsytem/PurchaseMember',
          hidden: false,
          name: '购买会员配置',
          component: _import('marketing/Vipsytem/PurchaseMember/index'),
          meta: {
            title: '购买会员配置',
            stitle: '购买会员',
            noCache: true,
            code: 'MARKETING_DRIVER_MEMBER_SYSTEM_DRIVER_MEMBER_BUY'
          }
        },
        {
          path: '/marketing/Vipsytem/28extendSystem',
          name: '28币发放配置',
          component: _import('marketing/Vipsytem/28extendSystem'),
          meta: {
            role: ['admin'],
            title: '28币发放配置',
            stitle: '发放',
            noCache: true,
            code: 'MARKETING_DRIVER_MEMBER_SYSTEM_DRIVER_MEMBER_GRANT'
          }
        },
        {
          path: '/marketing/Vipsytem/28AcceleratorPacks',
          name: '购买加速包配置',
          component: _import('marketing/Vipsytem/28AcceleratorPacks'),
          meta: {
            role: ['admin'],
            title: '购买加速包配置',
            stitle: '加速',
            noCache: true,
            code: 'MARKETING_DRIVER_MEMBER_SYSTEM_DRIVER_MEMBER_BUY_PACKAGE'
          }
        },
        {
          path: '/marketing/Vipsytem/28PlatformAccount',
          name: '28币平台账户',
          component: _import('marketing/Vipsytem/28PlatformAccount/index'),
          meta: {
            role: ['admin'],
            title: '28币平台账户',
            stitle: '平台',
            noCache: true,
            code: 'MARKETING_DRIVER_MEMBER_SYSTEM_DRIVER_MEMBER_PLATFORM'
          }
        },
        {
          path: '/marketing/Vipsytem/28DriverAccount',
          name: '28币车主账户',
          component: _import('marketing/Vipsytem/28DriverAccount/index'),
          meta: {
            role: ['admin'],
            title: '28币车主账户',
            stitle: '车主账户',
            noCache: true,
            code: 'MARKETING_DRIVER_MEMBER_SYSTEM_DRIVER_MEMBER_ACCOUNT'
          }
        },
        {
          path: '/marketing/Vipsytem/28DriverAccount/28DriverAccountDetails',
          name: '28币车主账户明细',
          hidden: true,
          component: _import('marketing/Vipsytem/28DriverAccount/28DriverAccountDetails'),
          meta: {
            role: ['admin'],
            title: '28币车主账户明细',
            stitle: '账户明细',
            noCache: true,
            code: ''
          }
        },

        {
          path: '/marketing/Vipsytem/ExchangeRecord',
          hidden: false,
          name: '车主兑换会员记录',
          component: _import('marketing/Vipsytem/ExchangeRecord/index'),
          meta: {
            title: '车主兑换会员记录',
            stitle: '车主兑换',
            noCache: true,
            code: 'MARKETING_DRIVER_MEMBER_SYSTEM_DRIVER_MEMBER_CHANGE_RECORD'
          }
        },
        {
          path: '/marketing/Vipsytem/PurchanseRecord',
          hidden: false,
          name: '购买会员记录',
          component: _import('marketing/Vipsytem/PurchanseRecord/index'),
          meta: {
            title: '购买会员记录',
            stitle: '购买记录',
            noCache: true,
            code: 'MARKETING_DRIVER_MEMBER_SYSTEM_DRIVER_MEMBER_BUY_RECORD'
          }
        },
        {
          path: '/marketing/Vipsytem/28AcceleratorNote',
          name: '购买加速包记录',
          component: _import('marketing/Vipsytem/28AcceleratorNote/index'),
          meta: {
            role: ['admin'],
            title: '购买加速包记录',
            stitle: '记录',
            noCache: true,
            code: 'MARKETING_DRIVER_MEMBER_SYSTEM_DRIVER_MEMBER_BUY_PACKAGE_RECORD'
          }
        }
      ]
    },
    {
      path: '/marketing/Distribution/RewardConfig',
      icon: 'fxjlpz',
      name: '分销奖励配置',
      component: _import('marketing/Distribution/RewardConfig/index'),
      meta: {
        role: ['admin'],
        title: '分销奖励配置',
        stitle: '分销奖励',
        noCache: true,
        code: 'MARKETING_DISTRIBUTION_REWARD'
      },
      children: [{
          path: '/marketing/Distribution/RewardConfig/PlaceOrderCodeRewordConfig',
          hidden: false,
          name: '下单码奖励配置',
          component: _import('marketing/Distribution/RewardConfig/PlaceOrderCodeRewordConfig/index'),
          meta: {
            title: '下单码奖励配置',
            stitle: '下单码',
            noCache: true,
            code: 'MARKETING_DISTRIBUTION_REWARD_PLACE_ORDER_REWARD',
            keepAlive: true
          }
        },
        {
          path: '/marketing/Distribution/RewardConfig/RecommendRewordConfig',
          hidden: false,
          name: '推荐奖励配置',
          component: _import('marketing/Distribution/RewardConfig/RecommendRewordConfig/index'),
          meta: {
            title: '推荐奖励配置',
            stitle: '推荐奖',
            noCache: true,
            code: 'MARKETING_DISTRIBUTION_REWARD_RECOMMENDED_REWARD'
          }
        },
        {
          path: '/marketing/Distribution/RewardConfig/BusinessRewordConfig',
          hidden: false,
          name: '业务奖励配置',
          component: _import('marketing/Distribution/RewardConfig/BusinessRewordConfig/index'),
          meta: {
            title: '业务奖励配置',
            stitle: '业务奖',
            noCache: true,
            code: 'MARKETING_DISTRIBUTION_REWARD_BUSINESS_REWARD'
          }
        },
        {
          path: '/marketing/Distribution/RewardConfig/OrderTakeRewordConfig',
          hidden: false,
          name: '接单码奖励配置',
          component: _import('marketing/Distribution/RewardConfig/OrderTakeRewordConfig/index'),
          meta: {
            title: '接单码奖励配置',
            stitle: '接单码',
            noCache: true,
            code: 'MARKETING_DISTRIBUTION_REWARD_ORDER_REWARD'
          }
        },
      ]
    },
    {
      path: '/marketing/Distribution/Expenditure',
      icon: 'fxzc',
      name: '分销支出',
      component: _import('marketing/Distribution/Expenditure/index'),
      meta: {
        role: ['admin'],
        title: '分销支出',
        stitle: '分销支出',
        noCache: true,
        code: 'MARKETING_DISTRIBUTION_EXPENCE'
      },
      children: [{
          path: '/marketing/Distribution/Expenditure/PlaceOrderCodeReword',
          hidden: false,
          name: '下单码奖励',
          component: _import('marketing/Distribution/Expenditure/PlaceOrderCodeReword/index'),
          meta: {
            title: '下单码奖励',
            stitle: '下单码',
            noCache: true,
            code: 'MARKETING_DISTRIBUTION_EXPENCE_PLACE_ORDER_REWARD',
            isClosed: true,
          }
        },
        {
          path: '/marketing/Distribution/Expenditure/RecommendReword',
          hidden: false,
          name: '推荐奖励',
          component: _import('marketing/Distribution/Expenditure/RecommendReword/index'),
          meta: {
            title: '推荐奖励',
            stitle: '推荐',
            noCache: true,
            code: 'MARKETING_DISTRIBUTION_EXPENCE_RECOMMENDED_REWARD'
          }
        },
        {
          path: '/marketing/Distribution/Expenditure/ShipperBusinessReword',
          hidden: false,
          name: '推荐货主业务奖励',
          component: _import('marketing/Distribution/Expenditure/ShipperBusinessReword/index'),
          meta: {
            title: '推荐货主业务奖励',
            stitle: '货主',
            noCache: true,
            code: 'MARKETING_DISTRIBUTION_EXPENCE_SHIPPER_BUSINESS_REWARD',
            isClosed: true,
          }
        },
        {
          path: '/marketing/Distribution/Expenditure/DriverBusinessReword',
          hidden: false,
          name: '推荐车主业务奖励',
          component: _import('marketing/Distribution/Expenditure/DriverBusinessReword/index'),
          meta: {
            title: '推荐车主业务奖励',
            stitle: '车主',
            noCache: true,
            code: 'MARKETING_DISTRIBUTION_EXPENCE_DRIVER_ORDER_REWARD'
          }
        },
        {
          path: '/marketing/Distribution/Expenditure/OrderTakeReword',
          hidden: false,
          name: '接单码奖励',
          component: _import('marketing/Distribution/Expenditure/OrderTakeReword/index'),
          meta: {
            title: '接单码奖励',
            stitle: '接单码',
            noCache: true,
            code: 'MARKETING_DISTRIBUTION_EXPENCE_ORDER_REWARD'
          }
        },
      ]
    },
    {
      path: '/marketing/Distribution/Statistics',
      icon: 'fxtj',
      name: '分销统计',
      component: _import('marketing/Distribution/Statistics/index'),
      meta: {
        role: ['admin'],
        title: '分销统计',
        stitle: '分销统计',
        noCache: true,
        code: 'MARKETING_DISTRIBUTION_STATISTICAL'
      },
      children: [{
          path: '/marketing/Distribution/Statistics/PlaceOrderCodeTotal',
          hidden: false,
          name: '下单码下单汇总',
          component: _import('marketing/Distribution/Statistics/PlaceOrderCodeTotal/index'),
          meta: {
            title: '下单码下单汇总',
            stitle: '下单码下单汇总',
            noCache: true,
            code: 'MARKETING_DISTRIBUTION_STATISTICAL_PLACE_ORDER_SUM',
            isClosed: true,
          }
        },
        {
          path: '/marketing/Distribution/Statistics/RecommendShareTotal',
          hidden: false,
          name: '推荐分享汇总',
          component: _import('marketing/Distribution/Statistics/RecommendShareTotal/index'),
          meta: {
            title: '推荐分享汇总',
            stitle: '推荐分享汇总',
            noCache: true,
            code: 'MARKETING_DISTRIBUTION_STATISTICAL_RECOMMENDED_SHARE_SUM'
          }
        },
        {
          path: '/marketing/Distribution/Statistics/RecommendNewUsersTotal',
          hidden: false,
          name: '推荐新用户汇总',
          component: _import('marketing/Distribution/Statistics/RecommendNewUsersTotal/index'),
          meta: {
            title: '推荐新用户汇总',
            stitle: '推荐新用户汇总',
            noCache: true,
            code: 'MARKETING_DISTRIBUTION_STATISTICAL_RECOMMENDED_NEW_SUM'
          }
        },
        {
          path: '/marketing/Distribution/Statistics/RecommendUsersOrderTotal',
          hidden: false,
          name: '推荐用户订单汇总',
          component: _import('marketing/Distribution/Statistics/RecommendUsersOrderTotal/index'),
          meta: {
            title: '推荐用户订单汇总',
            stitle: '推荐用户订单汇总',
            noCache: true,
            code: 'MARKETING_DISTRIBUTION_STATISTICAL_RECOMMENDED_USEORDER_SUM',
            isClosed: true,
          }
        },
        {
          path: '/marketing/Distribution/Statistics/OrderTakeTotal',
          hidden: false,
          name: '接单码接单汇总',
          component: _import('marketing/Distribution/Statistics/OrderTakeTotal/index'),
          meta: {
            title: '接单码接单汇总',
            stitle: '接单码接单汇总',
            noCache: true,
            code: 'MARKETING_DISTRIBUTION_STATISTICAL_ORDER_SUM'
          }
        },
      ]
    },
    {
      path: '/marketing/activity',
      icon: 'cheliangguanli',
      hidden: false,
      name: '抢购活动',
      component: _import('marketing/activity/index'),
      meta: {
        title: '抢购活动',
        stitle: '活动',
        noCache: true,
        code: 'MARKETING_PANICBUYINGACTIVITIES'
      }
    },
    {
      path: '/marketing/carSticker',
      icon: 'ctgl',
      name: '车贴管理',
      component: _import('marketing/carSticker/index'),
      meta: {
        role: ['admin'],
        title: '车贴管理',
        stitle: '车贴',
        noCache: true,
        code: 'MARKETING_CARSTICKER'
      },
      children: [{
          path: '/marketing/carSticker/productConfig',
          hidden: false,
          name: '车贴产品配置',
          component: _import('marketing/carSticker/productConfig/index'),
          meta: {
            title: '车贴产品配置',
            stitle: '车贴',
            noCache: true,
            code: 'MARKETING_CARSTICKER_CARSTICKERCONFIGURE'
          }
        },
        {
          path: '/marketing/carSticker/gestureConfig',
          hidden: false,
          name: '手势配置',
          component: _import('marketing/carSticker/gestureConfig/index'),
          meta: {
            title: '每月手势配置',
            stitle: '手势',
            noCache: true,
            code: 'MARKETING_CARSTICKER_MONTHLYGESTURECONFIGURE'
          }
        },
        {
          path: '/marketing/carSticker/apply',
          hidden: false,
          name: '车贴申请/上报',
          component: _import('marketing/carSticker/apply/index'),
          meta: {
            title: '车贴申请/上报',
            stitle: '申请',
            noCache: true,
            code: 'MARKETING_CARSTICKER_CARSTICKERREPORT'
          }
        },
        {
          path: '/marketing/carSticker/firstTrial',
          hidden: false,
          name: '车贴初审',
          component: _import('marketing/carSticker/firstTrial/index'),
          meta: {
            title: '车贴初审',
            stitle: '初审',
            noCache: true,
            code: 'MARKETING_CARSTICKER_FIRSTINSTANCE'
          }
        },
        {
          path: '/marketing/carSticker/monthTrial',
          hidden: false,
          name: '车贴月审',
          component: _import('marketing/carSticker/monthTrial/index'),
          meta: {
            title: '车贴月审',
            stitle: '月审',
            noCache: true,
            code: 'MARKETING_CARSTICKER_MONTHLYREVIEW'
          }
        },
      ]
    },
    {
      path: '/marketing/carStickerRecordStatistics',
      icon: 'cttj',
      name: '车贴记录统计',
      component: _import('marketing/carStickerRecordStatistics/index'),
      meta: {
        role: ['admin'],
        title: '车贴记录统计',
        stitle: '车贴',
        noCache: true,
        code: 'MARKETING_CARSTICKERRECORDSTATISTICS'
      },
      children: [{
          path: '/marketing/carStickerRecordStatistics/violationRecord',
          hidden: false,
          name: '违规登记',
          component: _import('marketing/carStickerRecordStatistics/violationRecord'),
          meta: {
            title: '违规登记',
            stitle: '违规',
            noCache: true,
            code: 'MARKETING_CARSTICKERRECORDSTATISTICS_VIOLATIONREGISTRATION'
          }
        },
        {
          path: '/marketing/carStickerRecordStatistics/payMent',
          hidden: false,
          name: '车贴费用报表',
          component: _import('marketing/carStickerRecordStatistics/payMent'),
          meta: {
            title: '车贴费用报表',
            stitle: '车贴费用报表',
            noCache: true,
            code: 'MARKETING_CARSTICKERRECORDSTATISTICS_CARSTICKERFEEREPORT'
          }
        },
        {
          path: '/marketing/carStickerRecordStatistics/tradePay',
          hidden: false,
          name: '车贴交易明细',
          component: _import('marketing/carStickerRecordStatistics/tradePay'),
          meta: {
            title: '车贴交易明细',
            stitle: '车贴交易明细',
            noCache: true,
            code: 'MARKETING_CARSTICKERRECORDSTATISTICS_TRANSACTIONDETAILS'
          }
        },
      ]
    },


  ]
}
