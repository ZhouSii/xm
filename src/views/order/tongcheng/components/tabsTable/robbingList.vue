<template>
    <div class="robbingList clearfix">
        <el-table
            :data="tableData"
            border
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
                    {{parseTimeFunction(scope.row.createTime)}}
                </template>
            </el-table-column>
            <el-table-column
                label="用户"
                width="200"
                >
                <template slot-scope="scope">
                    {{scope.row.driverName}} - {{scope.row.driverPhone}}
                </template>
            </el-table-column>
            <el-table-column
                prop="address"
                label="车辆信息"
                width="200">
                <template slot-scope="scope">
                    {{scope.row.driverName}} - {{scope.row.driverPhone}}
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
                width="150">
                <template slot-scope="scope">
                    {{scope.row.isVipCar == '1' ? '是' : '否'}}
                </template>
            </el-table-column>
             <el-table-column
                prop="address"
                label="抢入速度"
                width="150">
            </el-table-column>
             <el-table-column
                prop="driverDistance"
                label="距离提货地(KM)"
                width="100">
            </el-table-column>
            <el-table-column
                prop="address"
                label="本日与该货主交易次数"
                width="150">
            </el-table-column>
             <el-table-column
                prop="address"
                label="本月与该货主交易次数"
                width="150">
            </el-table-column>
             <el-table-column
                prop="address"
                label="本日累计交易次数"
                width="150">
            </el-table-column>
             <el-table-column
                prop="address"
                label="本月累计交易次数"
                width="150">
            </el-table-column>
             <el-table-column
                prop="chooseScore"
                label="中单加权分"
                width="150">
            </el-table-column>
             <el-table-column
                prop="address"
                label="理论中单"
                width="150">
            </el-table-column>
             <el-table-column
                prop="address"
                label="实际中单"
                width="150">
            </el-table-column>
        </el-table>
        <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" :sizes="sizes"/></div> </div>    
    </div>
</template>

<script>

import Pager from '@/components/Pagination/index'
import { parseTime } from '@/utils/index.js'


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
        robbingData:{
            type: Array,
            required:true,
        }
    },
    data() {
        return {
            totalCount:0,
            page:1,
            pagesize:20,
            sizes:[20,30,50],
            tableData: null,
            parseTimeFunction:null,//时间转换
        };
    },
    watch:{
       
    },
    mounted(){
        this.init();
        console.log('this.robbingData',this.robbingData)
    },
    methods: {
        init(){
            this.parseTimeFunction = parseTime;
            this.totalCount = this.robbingData.length;
            let pageStart =  (this.page - 1) * this.pagesize;
            let pageEnd = this.page * this.pagesize;
            this.tableData = this.robbingData.slice(pageStart,pageEnd);
            console.log(this.tableData)
        },
        handlePageChange(obj) {
            this.page = obj.pageNum;
            this.pagesize = obj.pageSize;
            this.init();
        },
    },
   
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .ordertrack{
        position: relative;
       

    }
    
</style>
