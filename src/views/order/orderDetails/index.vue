<template>
    <div class="dingdanxiangqing">
       <el-tabs v-model="orderTabName" type="card" @tab-click="handleClick" >
            <!-- 订单详情 -->
                <el-tab-pane label="订单详情" name="orderInfo">
                    <OrderInfo :key="dataKeys" :isvisible="orderTabName === 'orderInfo'"></OrderInfo>
                </el-tab-pane>

            <!-- 推单记录 -->
                <el-tab-pane label="推单记录" name="pushOrderList">
                    <pushList :key="dataKeys" :isvisible="orderTabName === 'pushOrderList'"></pushList>
                </el-tab-pane>

            <!-- 抢单记录 -->
                <el-tab-pane label="抢单记录" name="robbingList">
                    <robbingList :key="dataKeys" :isvisible="orderTabName === 'robbingList'"></robbingList>
                </el-tab-pane>

            <!-- 订单跟踪 -->
                <el-tab-pane label="订单跟踪" name="orderTracking">
                    <orderTracking :key="dataKeys" :isvisible="orderTabName === 'orderTracking'"></orderTracking>
                </el-tab-pane>
                
            <!-- 行驶轨迹 -->
                <el-tab-pane label="行驶轨迹" name="driveTrail">
                    <driverTrail :key="dataKeys" :isvisible="orderTabName === 'driveTrail'"></driverTrail>
                </el-tab-pane>

            <!-- 投诉 -->
                <el-tab-pane label="投诉" name="complaint">
                    <complaint :key="dataKeys" :isvisible="orderTabName === 'complaint'"></complaint>
                </el-tab-pane>

            <!-- 物损理赔 -->
                <el-tab-pane label="物损理赔" name="physicalDamage">
                    <physicalDamage :key="dataKeys" :isvisible="orderTabName === 'physicalDamage'"></physicalDamage>
                </el-tab-pane>

            <!-- 回单回款评价 -->
                <el-tab-pane label="回单回款评价" name="rate">
                    <rate :key="dataKeys" :isvisible="orderTabName === 'rate'"></rate>
                </el-tab-pane>

            <!-- 回单回款评价 -->
                <el-tab-pane label="订单KPI" name="KPI">
                    <orderKPI :key="dataKeys" :isvisible="orderTabName === 'KPI'"></orderKPI>
                </el-tab-pane>
            
            <!-- 订单审查 -->
                <el-tab-pane label="订单审查" name="orderExamine">
                    <orderExamine :key="dataKeys" :isvisible="orderTabName === 'orderExamine'"></orderExamine>
                </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { orderDetailsList } from '@/api/order/ordermange'
import OrderInfo from './components/orderInfo'
import pushList from './components/pushOrderList'
import orderTracking from './components/orderTracking'
import robbingList from './components/robbingList'
import driverTrail from './components/driveTrail'
import complaint from './components/complaint'
import rate from './components/rateComponent'
import orderKPI from './components/orderKPI'
import orderExamine from './components/orderExamine'
import physicalDamage from './components/physicalDamage'

export default {
  name: 'dingdanxiangqing',
  components: {
    OrderInfo,
    pushList,
    orderTracking,
    robbingList,
    driverTrail,
    complaint,
    physicalDamage,
    rate,
    orderKPI,
    orderExamine
  },
  data() {
    return {
      orderTabName: 'orderInfo',
      orderType:'',
      dataKeys: ""

    }
  },
  computed: {

  },

    // created() {
    //     this.routeQuery = sessionStorage.getItem('orderSerial');
    //     console.log('created',this.routeQuery)
    // },

    // beforeUpdate () {
    //     sessionStorage.setItem('orderSerial', this.routeQuery);
    //     console.log('beforeUpdate',this.routeQuery)
    // },

    // beforeDestroy () {
    //     sessionStorage.setItem('orderSerial', this.routeQuery);
    //     console.log('beforeDestroy',this.routeQuery)
    // },

  mounted() {
    if (this.$route.query.currentTab) {
      this.orderTabName = this.$route.query.currentTab;
    }else{
        this.orderTabName = 'orderInfo';
    }
    // this.orderType = this.$route.query.orderType ?  this.$route.query.orderType : '';
  },
  methods: {
    init() {
    //   this.routeQuery = this.$route.query.orderSerial || ''
    },
    handleClick(tab, event) {
      this.dataKeys = Math.random();
      this.orderTabName = tab.name
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .dingdanxiangqing{
        height: 100%;
        background-color: #fafeff;
        padding-right: 16px;
        .el-tabs--card>.el-tabs__header {
            border-bottom: 1px solid #03a9f4;
            padding-left: 10px;
            padding-top: 12px;
        }
        .el-tabs__content {
            overflow: auto;
        }
        .el-tabs--card>.el-tabs__header .el-tabs__nav{
            border: 0 none;
        }

        .el-tabs--card>.el-tabs__header .el-tabs__item:first-child {
            border-left: 1px solid #d2d2d2;
        }

        .el-tabs__item{
            border: 1px solid #d2d2d2;
            border-top-width:2px; 
            border-radius: 4px 4px 0px 0px;
            border-bottom: 0 none;
            height: 30px;
            line-height: 30px;
        }

        .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
            border-top-width: 2px;
            border-color: #03a9f4;
            background: #ffffff;
            border-bottom-color: #fafeff;
        }

        .el-tabs__content{
            padding-left: 10px;
            padding-top: 12px;
        }

        .collapseInfo{
            border: 1px solid #e2e2e2;
            box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
            background: #ffffff;
            color: #333;
            padding: 0 24px;
            padding-bottom: 10px;
            margin-bottom: 12px;
            position: relative;
            h2{
                font-size: 16px;
                line-height: 20px;
                padding: 19px 0 10px 0;
                // border-bottom: 1px solid #e2e2e2; 
            }
            .exIcom{
                position: absolute;
                right: 5%;
                top: 35%;
            }
            .essentialInformation{
                font-size: 14px;
                margin: 5px;
                p{
                    display: inline-block;
                    color:#333333;
                    line-height: 30px;
                    vertical-align: top;
                    width: 24%;
                    font-size: 14px;
                    // overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    margin-right: 10px;
                    .spanDiv{
                        display: block;
                    }
                    span{
                        color:#333;
                        display: inline-block;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow:ellipsis;
                        height: 30px;
                        .el-rate__icon,.el-rate__decimal,.el-icon-star-on{
                            line-height: 30px;
                        }
                    }
                    span:first-child{
                        text-align: center;
                    }
                    span + span{
                        // font-weight: bold;
                        
                    }
                    .fontRed{
                        color: red;
                    }
                    .routerJump{
                        cursor: pointer;
                    }
                }
                .minwidth{
                    width: 200px;
                }
                .morewidth{
                    width: 48.8%;
                }
                .lesswidth{
                    width: 521px;
                }

                .markInfo{
                    width: 50%;
                }
            }


            .essentialInformationNull{
                font-size: 14px;
                font-weight: bold;
                margin: 20px;
                padding-left: 40%;
                img{
                    vertical-align: middle;
                }
                span{
                    margin-left: 10px;
                    vertical-align: middle;
                }
            }
        }
    }
</style>
