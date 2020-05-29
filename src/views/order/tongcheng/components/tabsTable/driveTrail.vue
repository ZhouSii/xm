<template>
    <div class="trail clearfix">
        <div class="trailData fl">
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
                    prop="name"
                    label="定位地址"
                    >
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="定位时间"
                    width="200"
                    >
                </el-table-column>
            </el-table>
            <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" :sizes="sizes"/></div> </div>    
        </div>
        <div class="tarilMap fr">

        </div>
    </div>
</template>

<script>

import Pager from '@/components/Pagination/index'
import { parseTime } from '@/utils/index.js'

export default {
    name: 'trail',
    components:{
        Pager,
    },
    props: {
       isvisible: {
            type: Boolean,
            default: false
        },
        driverTrailData:{
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
            parseTimeFunction:null,//时间转换
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
        console.log('this.driverTrailData',this.driverTrailData)
    },
    methods: {
        init(){
            this.parseTimeFunction = parseTime;
            this.totalCount = this.driverTrailData.length;
            let pageStart =  (this.page - 1) * this.pagesize;
            let pageEnd = this.page * this.pagesize;
            this.tableData = this.driverTrailData.slice(pageStart,pageEnd)
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
    .trail{
        .trailData,.tarilMap{
            width: 50%;
        }
    }
    
</style>
