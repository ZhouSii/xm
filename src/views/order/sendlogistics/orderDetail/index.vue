<template>
  <div class="dingdanxiangqing">
    <el-tabs v-model="logisticsTypeName" type="card"  @tab-click='handleClick'>
        <!-- 货主订单 -->
            <el-tab-pane label="货主订单" name="one">
                <shipperOrder :isvisible="logisticsTypeName === 'one'" />
            </el-tab-pane>
        <!-- 区代运单 -->
            <el-tab-pane label="区代运单" name="two">
                <priceOrder :isvisible="logisticsTypeName === 'two'" />
            </el-tab-pane>
        <!-- 区代中转单 -->
            <el-tab-pane label="区代中转单" name="three">
                <priceTransfer :isvisible="logisticsTypeName === 'three'" />
            </el-tab-pane>
        <!-- 专线运单 -->
            <el-tab-pane label="专线运单" name="four">
                <carrierOrder :isvisible="logisticsTypeName === 'four'" />
            </el-tab-pane> 
        <!-- 订单跟踪 -->
            <el-tab-pane label="订单跟踪" name="five">
                <trackingOrder :isvisible="logisticsTypeName === 'five'" />
            </el-tab-pane> 
        <!-- 收支明细 -->
            <el-tab-pane label="收支明细" name="six">
                <inComeDetail :isvisible="logisticsTypeName === 'six'" />
            </el-tab-pane>
        <!-- 订单审查 -->
            <!-- <el-tab-pane label="订单审查" name="seven">
                <censor :isvisible="logisticsTypeName === 'seven'" />
            </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import shipperOrder from './shipperOrder.vue'
import priceTransfer from './priceTransfer.vue'
import carrierOrder from './carrierOrder.vue'
import priceOrder from './priceOrder.vue'
import trackingOrder from './trackingOrder.vue'
import inComeDetail from './inComeDetail.vue'
import censor from './censor.vue'
export default {
    data(){
        return{
            logisticsTypeName: this.$route.query.currentTab || 'one'
        }
    },
    components:{
        shipperOrder,    
        priceOrder,
        priceTransfer,
        carrierOrder,
        trackingOrder,
        inComeDetail,
        censor,
    },
    mounted() {
        if (this.$route.query.currentTab) {
            this.logisticsTypeName = this.$route.query.currentTab;
        }else{
            this.logisticsTypeName = 'one';
        }
        // this.orderType = this.$route.query.orderType ?  this.$route.query.orderType : '';
    },
    methods: {
        handleClick(tab, event) {
            this.logisticsTypeName = tab.name;
        }
     },
}
</script>

<style lang="scss" >
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
            h2{
                font-size: 16px;
                line-height: 20px;
                padding: 19px 0 10px 0;
                // border-bottom: 1px solid #e2e2e2; 
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
                    overflow: hidden;
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

