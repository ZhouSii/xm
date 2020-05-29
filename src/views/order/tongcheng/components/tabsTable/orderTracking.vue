<template>
    <div class="ordertrack clearfix">
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                prop="date"
                label="时间"
                width="150"
                >
            </el-table-column>
            <el-table-column
                prop="name"
                label="操作事项"
                width="300"
                >
            </el-table-column>
            <el-table-column
                prop="address"
                label="定位">
            </el-table-column>
            <el-table-column
                prop="address"
                label="备注">
            </el-table-column>
            <el-table-column
                prop="address"
                label="实际行驶时间">
            </el-table-column>
             <el-table-column
                prop="address"
                label="与装卸点距离"
                width="150">
            </el-table-column>
        </el-table>
        <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" :sizes="sizes"/></div> </div>    
    </div>
</template>

<script>

import Pager from '@/components/Pagination/index'

export default {
    name: 'ordertrack',
    components:{
        Pager,
    },
    props: {
       isvisible: {
            type: Boolean,
            default: false
        },
        tableDataArr:{
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
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03', 
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        };
    },
    watch:{
       
    },
    mounted(){
        // this.init();
        console.log('this.tableDataArr',this.tableDataArr)
    },
    methods: {
        init(){
            this.totalCount = this.tableDataArr.length;
            let pageStart =  (this.page - 1) * this.pagesize;
            let pageEnd = this.page * this.pagesize;
            this.tableData = this.tableDataArr.slice(pageStart,pageEnd)
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

    }
    
</style>
