<template>
    <div class="pushorder clearfix">
        <el-table
            :data="tableData"
            border
            height="100%"
            style="width: 100%">
            <el-table-column
                type="index"
                label="序号"
                width="80"
                >
            </el-table-column>
             <el-table-column
                prop="date"
                label="时间"
                width="200"
                >
                <template slot-scope="scope">
                    {{scope.row.createTime | parseTime}}
                </template>
            </el-table-column>
            <el-table-column
                prop="driverName"
                label="用户"
                :show-overflow-tooltip="true"
                width="200"
                >
                <template slot-scope="scope">
                    {{scope.row.driverName}} - {{scope.row.driverPhone}}
                </template>
            </el-table-column>
            <el-table-column
                prop="carType"
                label="车辆信息"
                width="200">
                <template slot-scope="scope">
                    {{scope.row.carNumber}}{{scope.row.carType ? '-'+scope.row.carType : ''}}
                </template>
            </el-table-column>
            <el-table-column
                prop="driverDistance"
                label="距离提货地(M)"
                width="120"
                >
            </el-table-column>
            <el-table-column
                prop="isReallyPush"
                label="是否推单"
                width="120"
                >
                <template slot-scope="scope">
                    {{scope.row.isReallyPush == '0' ? '否' : '是'}}
                </template>
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="canotPushCause"
                label="未推单原因"
                width="200"
                >
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="driverAddress"
                label="当前地址"
                width="300">
            </el-table-column>
             <el-table-column
                prop="address"
                label="用户认证状态"
                width="120">
            </el-table-column>
            <el-table-column
                prop="address"
                label="用户账户状态"
                width="120">
            </el-table-column>
            <el-table-column
                prop="address"
                label="车主当前有进行中即时订单"
                width="120">
            </el-table-column>
            <el-table-column
                prop="address"
                label="车主当前有进行中预约订单"
                width="120">
            </el-table-column>
            <el-table-column
                prop="address"
                label="是否特权车"
                >
            </el-table-column>
        </el-table>
        <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange"/></div> </div>    
    </div>
</template>

<script>

import Pager from '@/components/Pagination/index'
import { parseTime } from '@/utils/index.js'
import { orderDetailsList,getOrderPushList } from '@/api/order/ordermange'

export default {
    name: 'pushOrderList',
    components:{
        Pager,
    },
    props: {
       isvisible: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            totalCount:0,
            page:1,
            pagesize:20,
            sizes:[20,30,50],
            tableData: [],
            orderPushObj:{
                "currentPage": 1,
                "pageSize": 30,
                "vo": {
                    orderSerial:'',
                }
            }
        };
    },
    watch:{
        isvisible: {
            handler(newVal, oldVal) {
                if(newVal){
                    this.init();
                }
            },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
            immediate: true
        }
    },
    mounted(){
       
    },
    methods: {
        init(){
            this.orderPushObj.vo.orderSerial = this.$route.query.orderSerial;
            getOrderPushList(this.orderPushObj).then(res => {
                this.tableData = res.data.list;
                this.totalCount = res.data.totalCount;
                this.loading = false;
                // console.log(this.tableData)
            })
            // orderDetailsList(this.$route.query.orderSerial).then(res => {
            //     console.log('details',res)
            //     this.tableData = res.data.aflcOrderPushes;
            //     this.loading = false;
            // })
            // this.totalCount = this.pushOrderData.length;
            // let pageStart =  (this.page - 1) * this.pagesize;
            // let pageEnd = this.page * this.pagesize;
            // this.tableData = this.pushOrderData.slice(pageStart,pageEnd)
        },
        handlePageChange(obj) {
            this.orderPushObj.currentPage = obj.pageNum;
            this.orderPushObj.pageSize = obj.pageSize;
            this.init();
        },
    },
   
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .pushorder{
        height: 100%;
        padding-bottom: 40px;
    }
    
</style>
