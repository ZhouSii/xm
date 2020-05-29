<template>
    <div class="trail clearfix" v-loading = "loading">
        <div class="trailData fl">
            <el-table
                :data="tableData"
                border
                height="100%"
                style="width: 100%">
                <el-table-column label="序号"  width="80">
                    <template slot-scope="scope">
                        {{ (Page - 1)*Pagesize + scope.$index + 1 }}
                    </template>
                </el-table-column>  
                <el-table-column
                    :show-overflow-tooltip="true"
                    prop="address"
                    label="定位地址"
                    >
                </el-table-column>
                <el-table-column
                    prop="coordinateTime"
                    label="定位时间"
                    width="200"
                    >
                    <template slot-scope="scope">
                            {{scope.row.coordinateTime |parseTime}}
                    </template>
                </el-table-column>
            </el-table>
            <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :sizes="sizes" :total="totalCount" @change="handlePageChange"/></div> </div>    
        </div>
        <div class="tarilMap fr">
            <DriverTrack :trackInfo="trackInfo" v-if="trackInfo.length != 0"></DriverTrack>
        </div>
    </div>
</template>

<script>

import Pager from '@/components/Pagination/index'
import { parseTime,objectMerge2 } from '@/utils/index.js'
import { getOrderCarTrailList } from '@/api/order/ordermange'
import DriverTrack from '@/components/gaodeTrack/index'
export default {
    name: 'trail',
    components:{
        Pager,
        DriverTrack
    },
    props: {
       isvisible: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            page:1,
            pagesize:1000000000,
            Page:1,
            Pagesize:200,
            loading:true,
            totalCount:0,
            sizes:[200,500,1000],
            listInformation:[],
            tableData:[],
            trackInfo:[],
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
            let trailform = Object.assign({},{orderSerial:this.$route.query.orderSerial});
            getOrderCarTrailList(this.page,this.pagesize,trailform).then(res => {
                // console.log('details',res)
                this.totalCount = res.data.totalCount;
                let arr = [];
                arr = res.data.list.sort(function(a, b) {
                    return a.coordinateTime - b.coordinateTime
                })             
                let trackInfo = objectMerge2(arr);
                this.listInformation = arr.reverse();
                this.trackInfo = trackInfo;
                this.loading = false;
                this.nowTable();
                // console.log(this.trackInfo)
            })
        },
        nowTable(){
            // console.log(this.Page,this.Pagesize)
            this.listInformation = this.listInformation;
            let pageStart =  (this.Page - 1) * this.Pagesize;
            let pageEnd = this.Page * this.Pagesize;
            this.tableData = this.listInformation.slice(pageStart,pageEnd);
        },
        handlePageChange(obj) {
            this.Page = obj.pageNum;
            this.Pagesize = obj.pageSize;
            this.nowTable();
        },
    },
   
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .trail{
        height: 100%;
        .trailData{
            width: 35%;
            height: 100%;
            display: flex;
            flex-direction:column;
            padding-bottom: 40px;
            position: relative;
            .el-table{
                flex: 1;
            }

        }
        .tarilMap{
            width: 64%;
            height: 100%;
        }
    }
    
</style>
