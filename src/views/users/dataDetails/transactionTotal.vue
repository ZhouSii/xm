<template>
    <div class="transactionTotal detailsArrange" v-loading="loading">
        <!-- 交易订单 -->
        <div class="qd-collapse collapseInfo">
            <div class="essentialInformation_table">
                <el-table
                    :data="transactionTotalData"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="classfy"
                    label="服务分类">
                    </el-table-column>
                    <el-table-column
                    prop="potentialGradeName"
                    label="潜力等级">
                    </el-table-column>
                    <el-table-column
                    prop="orderFinishNumRecentThirtyToSixty"
                    label="近31-60天订单成交量">
                    </el-table-column>
                    <el-table-column
                    prop="orderFinishNumRecentThirty"
                    label="近30天订单成交量">
                    </el-table-column>
                    <el-table-column
                    prop="ringGrowthRate"
                    label="环比增长率">
                    </el-table-column>
                    <el-table-column
                    prop="orderNumRecentThirty"
                    label="近30天下单量">
                    </el-table-column>
                    <el-table-column
                    prop="orderCancelNumRecentThirty"
                    label="近30天取消量">
                    </el-table-column>
                    <el-table-column
                    prop="occupancyRate"
                    label="占有率">
                    </el-table-column>
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="pairingRate"
                    label="配对率">
                    </el-table-column>
                    <el-table-column
                    prop="cancelRate"
                    label="取消率">
                    </el-table-column>
                </el-table>
                <!-- <el-pagination
                    background
                    @size-change="(val)=>{return handleSizeChange(val,'complete')}"
                    @current-change="(val)=>{return handleClick(val,'complete')}"
                    layout="total, sizes, prev, pager, next, jumper"
                    :page-sizes="sizes"
                    :total="orderTotalCount">
                </el-pagination> -->
            </div>
        </div>
    </div>
</template>

<script>

import { parseTime } from '@/utils/index.js'
// import Pager from '@/components/Pagination/index'
import { transactionTotalList } from '@/api/users/shipperDetails/index.js'

export default {
  name: 'transactionTotal',
  components: {
    //   Pager
  },
  props: {
    isvisible: {
        type: Boolean,
        default: false
      }
  }, 
  data() {
    return {
        sizes:[10,20,50,100],
        orderState:{},//信息概要
        page:1,
        pagesize:20,
        totalCount:100,
        // cancelOrderObj:{
        //     "currentPage": 1,
        //     "pageSize": 10,
        //     "vo": {
        //         "shipperId": "",
        //     }
        // },
        cancelOrderList:[],//取消订单列表
        cancelOrderTotalCount:0,//订单列表初始数量
        transactionTotalData:[],//订单列表
        orderTotalCount:0,//订单列表初始数量
        orderTime:[],
        loading: false,
        dialogVisible: false,
        currentOrderSerial: '',
      }
  },
    watch: {
        isvisible: {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.init()
                }
            },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
            immediate: true
        },
    },
     mounted() {
        // console.log(this.$route)
    },
    methods: {
        init() {
            let userId = this.$route.query.userId;
            this.totalList(userId);
        },
        totalList(val){
            transactionTotalList(val).then(res => {
                this.$set(res.data,'classfy', '同城');
                this.transactionTotalData = [(res.data)];
            })
        },
        handleClick(val,type){
            // console.log('val,type',val,type)
            switch(type){
                case 'cancel':
                    this.cancelOrderObj.currentPage = val;
                    this.cancelOrder();
                    break;
            }
        },
        handleSizeChange(val,type){
            switch(type){
                case 'cancel':
                    this.cancelOrderObj.pageSize = val;
                    this.cancelOrder();
                    break;
            }
        },
        setCur(index,label){
            // console.log(index,label)
            this.orderType.forEach((el,idx)=>{
                idx == index ? el.iscur = true : el.iscur = false;
            })
            this.orderObj.vo.parentOrderStatus = label;
            this.OrderList();
        },
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .transactionTotal{
        .collapseInfo{
            .qd-collapse_title{
                padding: 10px 0;
                .el-form-item{
                    margin-bottom: 0px;
                }
            }
        }
    }
</style>
