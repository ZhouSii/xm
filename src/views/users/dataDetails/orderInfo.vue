<template>
    <div class="ordersInfo detailsArrange" v-loading="loading">
        <!-- 小货车订单 -->
        <div class="xxgy-collapse collapseInfo">
            <h2>小货车订单</h2>
            <div class="essentialInformation">
                <el-row class="basicInfo" :span='24'>
                    <!-- 第一行 -->
                    <el-col :span="3">总下订单数：</el-col>
                    <el-col :span="3">{{orderState.puliclishOrder}}</el-col>
                    <el-col :span="3">立即支付：</el-col>
                    <el-col :span="3">{{orderState.quickPayTimeType}}</el-col>
                    <!-- <el-col :span="3">发货时付款：</el-col>
                    <el-col :span="3">{{orderState.nonTradedOrder}}</el-col> -->
                    <el-col :span="3">收货时付款：</el-col>
                    <el-col :span="3">{{orderState.gainsPay }}</el-col>
                    <el-col :span="3">完成订单：</el-col>
                    <el-col :span="3">{{orderState.dealOrder}}</el-col>
                    <!-- 第二行 -->
                    <el-col :span="3">完成订单总金额：</el-col>
                    <el-col :span="3">{{orderState.dealOrderTotalAmount}}</el-col>
                    <el-col :span="3">线上支付完成订单数：</el-col>
                    <el-col :span="3">{{orderState.onlinePayOrder}}</el-col>
                    <el-col :span="3">线上支付完成订单金额：</el-col>
                    <el-col :span="3">{{orderState.onlinePayOrderTotalAmount ? orderState.onlinePayOrderTotalAmount : 0}}</el-col>
                    <el-col :span="3">线下支付完成订单数：</el-col>
                    <el-col :span="3">{{orderState.offlinePayOrder }}</el-col>
                    <!-- 第三行 -->
                    <el-col :span="3">线下支付完成订单金额：</el-col>
                    <el-col :span="3">{{orderState.offlinePayOrderTotalAmount ? orderState.offlinePayOrderTotalAmount : 0 }}</el-col>
                    <el-col :span="3">线上支付完成订单占比：</el-col>
                    <el-col :span="3">{{orderState.onlinePayOrderRate}}</el-col>
                </el-row>
            </div>
        </div>
        <!-- 交易订单 -->
        <div class="qd-collapse collapseInfo">
            <h2>交易订单</h2>
            <div class="qd-collapse_title clearfix">
                <ul class="classfyTitle fl">
                   <li v-for="(item,index) in orderType" :key="item.name" :class="{currentClick:item.iscur}" @click="setCur(index,item.label)">{{item.name}}</li>
                </ul>
                <el-form :inline="true"  class="demo-ruleForm qdSearch fr" >
                    <el-form-item label="下单时间：">
                        <el-date-picker
                            v-model="orderTime"
                            type="daterange"
                            range-separator="-"
                            unlink-panels
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="right"
                            :default-time="['00:00:00', '23:59:59']"
                            @change='orderTimeVal'
                            value-format="timestamp">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
            </div>
            <div class="essentialInformation_table" style="padding-top:0;">
                <el-table
                    :data="orderData"
                    border
                    style="width: 100%">
                    <el-table-column label="序号"  width="60">
                        <template slot-scope="scope">
                            {{ (orderObj.currentPage - 1) * orderObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>  
                    <el-table-column
                    prop="orderSerial"
                    label="订单号"
                    width="230">
                    </el-table-column>
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="driverName"
                    label="车主">
                    </el-table-column>
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="driverMobile"
                    label="车主账号">
                    </el-table-column>
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="orderType"
                    label="服务类型">
                    </el-table-column>
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="startAddress"
                    label="始发地">
                    </el-table-column>
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="endAddress"
                    label="目的地">
                    </el-table-column>
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="payWay"
                    label="付款方式">
                    </el-table-column>
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="payTimeType"
                    label="支付方式">
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    width="160"
                    label="发单时间">
                        <template slot-scope="scope">
                            {{scope.row.createTime | parseTime}}
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="totalAmount"
                    label="订单金额">
                    </el-table-column>
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="parentOrderStatus"
                    label="订单状态">
                    </el-table-column>
                    <el-table-column
                    width="160"
                    prop="updateTime"
                    label="完成时间">
                        <template slot-scope="scope">
                            {{scope.row.updateTime | parseTime}}
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    background
                    @size-change="(val)=>{return handleSizeChange(val,'complete')}"
                    @current-change="(val)=>{return handleClick(val,'complete')}"
                    layout="total, sizes, prev, pager, next, jumper"
                    :page-sizes="sizes"
                    :total="orderTotalCount">
                </el-pagination>
            </div>
        </div>
        <!-- 取消订单&原因 -->
        <div class="qd-collapse collapseInfo">
            <h2>取消订单&原因</h2>
            <div class="essentialInformation_table">
                <el-table
                    :data="cancelOrderList"
                    border
                    style="width: 100%">
                    <el-table-column label="序号"  width="60">
                        <template slot-scope="scope">
                            {{ (cancelOrderObj.currentPage - 1) * cancelOrderObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>  
                    <el-table-column
                    prop="orderSerial"
                    label="订单号">
                    </el-table-column>
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="belongCity"
                    label="下单区域">
                    </el-table-column>
                    <el-table-column
                    prop="totalAmount"
                    label="订单金额">
                    </el-table-column>
                    <el-table-column
                    prop="cancelTime"
                    label="取消时间">
                        <template slot-scope="scope">
                            {{scope.row.cancelTime | parseTime}}
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="cancelCause"
                    label="取消原因">
                    </el-table-column>
                </el-table>
                <el-pagination
                    background
                    @size-change="(val)=>{return handleSizeChange(val,'cancel')}"
                    @current-change="(val)=>{return handleClick(val,'cancel')}"
                    layout="total, sizes, prev, pager, next, jumper"
                    :page-sizes="sizes"
                    :total="cancelOrderTotalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>

import { parseTime } from '@/utils/index.js'
// import Pager from '@/components/Pagination/index'
import { aflcOrderState,aflcOrderList,aflcShipperCancelList } from '@/api/users/shipperDetails/index.js'

export default {
  name: 'ordersInfo',
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
        orderType:[
            {name:'全部',label:'',iscur:true},
            {name:'已完成',label:'AF00807',iscur:false},
            {name:'已取消',label:'AF00808',iscur:false},
        ],
        page:1,
        pagesize:20,
        totalCount:100,
        orderObj:{
            "currentPage": 1,
            "pageSize": 10,
            "vo": {
                "shipperId": "",
                startDate:'',
                endDate:'',
                parentOrderStatus:'',
            }
        },
        cancelOrderObj:{
            "currentPage": 1,
            "pageSize": 10,
            "vo": {
                "shipperId": "",
            }
        },
        cancelOrderList:[],//取消订单列表
        cancelOrderTotalCount:0,//订单列表初始数量
        orderData:[],//订单列表
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
            this.orderObj.vo.shipperId = userId;
            this.cancelOrderObj.vo.shipperId = userId;

            this.OrderState(userId);
            this.OrderList();
            this.cancelOrder();
        },
        //信息概要
        OrderState(userId){
            aflcOrderState(userId).then(res => {
                this.orderState = res.data;
            })
        },
        //根据时间显示订单列表
        OrderList(){
            aflcOrderList(this.orderObj).then(res => {
                this.orderData = res.data.list;
                this.orderTotalCount = res.data.totalCount;
            })
        },
        cancelOrder(){
            aflcShipperCancelList(this.cancelOrderObj).then(res => {
                this.cancelOrderList = res.data.list;
                this.cancelOrderTotalCount = res.data.totalCount;
            })
        },
        // handleCurrentChange(val) {
        //     console.log(`当前页: ${val}`);
        //     this.orderObj.currentPage = val;
        //     this.OrderList();
        // },
        handleClick(val,type){
            // console.log('val,type',val,type)
            switch(type){
                case 'cancel':
                    this.cancelOrderObj.currentPage = val;
                    this.cancelOrder();
                    break;
                case 'complete':
                    this.orderObj.currentPage = val;
                    this.OrderList();
                    break;
            }
        },
        handleSizeChange(val,type){
            switch(type){
                case 'cancel':
                    this.cancelOrderObj.pageSize = val;
                    this.cancelOrder();
                    break;
                case 'complete':
                    this.orderObj.pageSize = val;
                    this.OrderList();
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
        orderTimeVal(val){
            // console.log(val)
            this.orderObj.vo.startDate = val ? val[0] :'';
            this.orderObj.vo.endDate = val ? val[1] :'';
            this.OrderList();
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .ordersInfo{
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
