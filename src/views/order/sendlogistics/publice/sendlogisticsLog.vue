<template>
    <div class="dingdanxiangqing tabsWrap">
       <el-tabs v-model="orderTabName" type="card" @tab-click="handleClick" >
            <!-- 订单详情 -->
                <el-tab-pane label="订单详情" name="OrderLog">
                    <OrderLog  :isvisible="orderTabName === 'OrderLog'"></OrderLog>
                </el-tab-pane>
                 <el-tab-pane label="物流跟踪" name="orderTracking">
                    <orderTracking :isvisible="orderTabName === 'orderTracking'"></orderTracking>
                </el-tab-pane>
                 <el-tab-pane label="回单回款评价" name="receipt">
                    <receipt  :isvisible="orderTabName === 'receipt'"></receipt>
                </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import OrderLog from './components/OrderLog'
import orderTracking from './components/orderTracking'
import receipt from './components/receipt'
export default {
  name: 'dingdanxiangqing',
  components: {
    OrderLog,
    orderTracking,
    receipt
  },
  data() {
    return {
      orderTabName: 'OrderLog',
      orderType:'',
    }
  },
  computed: {
   
  },
  mounted() {
  },
  methods: {
    handleClick(tab, event) {
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
                        .el-rate__icon{
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
