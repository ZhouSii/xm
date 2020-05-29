<template>
    <div class="robbingList clearfix" v-loading="loading">
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
                width="180"
                :show-overflow-tooltip="true"
                >
                <template slot-scope="scope">
                    {{scope.row.createTime | parseTime}}
                </template>
            </el-table-column>
            <el-table-column
                label="用户"
                width="180"
                :show-overflow-tooltip="true"
                >
                <template slot-scope="scope">
                    <p class="ifGrap"><i v-if="scope.row.isGrab == 1"></i>{{scope.row.driverName}} - {{scope.row.driverPhone}}</p>
                </template>
            </el-table-column>
            <el-table-column
                prop="carType"
                label="车辆信息"
                :show-overflow-tooltip="true"
                width="200">
                <template slot-scope="scope">
                    {{scope.row.carNumber}}{{scope.row.carType ? '-'+scope.row.carType : ''}}
                </template>
            </el-table-column>
            <el-table-column
                prop="address"
                label="用户中单等级">
            </el-table-column>
            <el-table-column
                prop="address"
                label="是否货主收藏司机">
            </el-table-column>
             <el-table-column
                prop="address"
                label="是否特权车"
                >
                <template slot-scope="scope">
                    {{scope.row.isVipCar == '1' ? '是' : '否'}}
                </template>
            </el-table-column>
             <el-table-column
                prop="address"
                label="抢入速度"
                >
            </el-table-column>
             <el-table-column
                prop="driverDistance"
                label="距离提货地(M)"
                width="100">
            </el-table-column>
            <el-table-column
                prop="address"
                label="本日与该货主交易次数"
                width="100"
                >
            </el-table-column>
             <el-table-column
                prop="address"
                label="本月与该货主交易次数"
                width="100"
                >
            </el-table-column>
             <el-table-column
                prop="address"
                label="本日累计交易次数"
                >
            </el-table-column>
             <el-table-column
                prop="address"
                label="本月累计交易次数"
                >
            </el-table-column>
             <el-table-column
                prop="chooseScore"
                label="中单加权分"
                >
            </el-table-column>
             <el-table-column
                prop="address"
                label="理论中单"
                >
            </el-table-column>
             <el-table-column
                prop="address"
                label="实际中单"
                >
            </el-table-column>
        </el-table>
        <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" :sizes="sizes"/></div> </div>    
    </div>
</template>

<script>

import Pager from '@/components/Pagination/index'
import { parseTime } from '@/utils/index.js'
import { orderDetailsList,getOrderGrabList } from '@/api/order/ordermange'


export default {
    name: 'robbingList',
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
            loading:true,
            orderGrabObj:{
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
            this.loading = true;
            this.orderGrabObj.vo.orderSerial = this.$route.query.orderSerial;

            getOrderGrabList(this.orderGrabObj).then(res => {
                this.tableData = res.data.list;
                console.log(this.tableData)
                this.totalCount = res.data.totalCount;
                this.loading = false;
            })
            // orderDetailsList(this.$route.query.orderSerial).then(res => {
            //     console.log('details',res)
            //     this.tableData = res.data.aflcOrderGrabs;
            //     this.loading = false;
            // })
            // this.totalCount = this.robbingData.length;
            // let pageStart =  (this.page - 1) * this.pagesize;
            // let pageEnd = this.page * this.pagesize;
            // this.tableData = this.robbingData.slice(pageStart,pageEnd);
            console.log(this.tableData)
        },
        handlePageChange(obj) {
            this.orderGrabObj.currentPage = obj.pageNum;
            this.orderGrabObj.pageSize = obj.pageSize;
            this.init();
        },
    },
   
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .robbingList{
        position: relative;
        height: 100%;
        padding-bottom: 40px;
        .el-table{
            .cell{
                .ifGrap{
                    position: relative;
                    padding-left: 20px;
                    i{
                        display: inline-block;
                        position: absolute;
                        top: 0;
                        left: -8px;
                        width: 24px;
                        height: 24px;
                        background: url('../../../../assets/icom/zdq.png') no-repeat center;
                    }
                }
            }
        }
    }
    
</style>
