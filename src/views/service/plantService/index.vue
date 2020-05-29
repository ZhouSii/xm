<template>
    <div class="identicalStyle clearfix plantService" v-loading="loading">
            <searchInfo @change="getSearchParam" :serviceType = 'serviceType'></searchInfo>
            <div class="classify_info">
                <!-- <div class="btns_box">
                    <el-button type="primary" plain @click="handleSearch('cancel')" size="mini">取消订单</el-button>
                    <el-button type="primary" plain @click="handleSearch('export')" size="mini">导出Exce</el-button>
                </div> -->
                <div class="info_news">
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        stripe
                        border
                        align = "center"
                        height="100%"
                        @selection-change = "getinfomation"
                        tooltip-effect="dark"
                        @row-click="clickDetails"
                        style="width: 100%"> 
                        <el-table-column
                            label="选择"
                            type="selection"
                            width="50">
                        </el-table-column>
                        <el-table-column label="序号" sortable  width="80">
                            <template slot-scope="scope">
                            {{ (page - 1)*pagesize + scope.$index + 1 }}
                            </template>
                        </el-table-column> 
                        <el-table-column
                            label="工单编号"
                            width="250" sortable>
                                <template  slot-scope="scope">
                                    {{ scope.row.workSerial}}
                                </template>
                        </el-table-column>
                        <el-table-column
                            prop="complainTypeName"
                            label="提交类型"
                            width="120"
                            sortable
                            >
                        </el-table-column>
                        <el-table-column
                            prop="orderSerial"
                            label="运单号"
                            width="250"
                            sortable
                            >
                        </el-table-column>
                        <el-table-column
                            prop="title"
                            :show-overflow-tooltip="true"
                            label="提交主题"
                            width="150"
                            sortable
                            >
                        </el-table-column>
                        <el-table-column
                            :show-overflow-tooltip="true"
                            prop="complainDes"
                            label="提交内容"
                            width="300"
                            sortable
                            >
                        </el-table-column>
                        <el-table-column
                            prop="complainTime"
                            label="提交时间"
                            width="160"
                            sortable
                            >
                        </el-table-column>
                         <el-table-column
                            prop="complainName"
                            label="提交人"
                            width="120"
                            sortable
                            >
                        </el-table-column> 
                        <el-table-column
                            prop="phone"
                            label="联系电话"
                            width="150"
                            sortable
                            >
                        </el-table-column>
                         <el-table-column
                         prop="email"
                            label="电子邮箱"
                            width="200"
                            sortable
                            >
                        </el-table-column>
                        <el-table-column
                            prop="complainStatusName"
                            label="处理状态"
                            width="100"
                            sortable
                            >
                                <!-- <template  slot-scope="scope">
                                    <span :class="{reMark:scope.row.complainStatusName == '待处理',sussces:scope.row.complainStatusName == '已处理'}">{{ scope.row.complainStatusName}}</span>
                                </template> -->
                        </el-table-column>
                        <el-table-column
                            prop="platformTime"
                            label="处理时间"
                            width="160"
                            sortable
                            >
                        </el-table-column>
                        <el-table-column
                        prop="replyName"
                            label="处理人"
                            width="120"
                            sortable
                            >
                        </el-table-column>
                        <el-table-column
                            :show-overflow-tooltip="true"
                            label="回复内容"
                            width="300"
                            sortable
                            >
                            <template  slot-scope="scope">
                                {{scope.row.reply}}
                            </template>
                        </el-table-column><el-table-column
                            label="操作"
                            width="200"
                            sortable
                            >
                            <template  slot-scope="scope">
                                <!-- <el-button-group> -->
                                    <el-button type="primary" plain icon="el-icon-document" :size="btnsize" @click="handleClick(scope.row,'reply')">回复</el-button>
                                    <el-button type="primary" plain icon="el-icon-delete" :size="btnsize" @click="handleClick(scope.row,'delet')">删除</el-button>
                                <!-- </el-button-group> -->
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
                <!-- 页码 -->
            <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"/></div> </div> 

            <Reply :dialogVisible.sync="dialogVisible" :currentRow = "currentRow"   @close = "shuaxin"/>
    </div>
</template>

<script type="text/javascript">

import { getListPlatformComplain,deletReply } from '@/api/service/index.js'
import { parseTime } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
import searchInfo from '../components/searchInfo'
import Reply from './replyComponent'
    export default{
        components:{
            Pager,
            // Details,
            searchInfo,
            Reply
            // cancelCompnent,
        },
        data(){
            return{
                btnsize:'mini',
                currentRow:{},
                serviceType:'plant',
                loading: true,//加载
                sizes:[20,50,100],
                pagesize:20,//初始化加载数量
                page:1,//初始化页码
                dataTotal:0,
                searchInfo:{
                    complainType:'',//类型
                    workSerial:'',//工单号                    
                },
                tableData:[],
                parseTimeFunction:null,
                dialogFormVisible_details:false,//详情弹窗
                DetailsOrderSerial:'',
                dialogVisible:false,//回复弹窗
                checkedinformation:[],//选中数据
            }
        },
        watch:{

        },
        created(){

        },
        mounted(){
            this.firstblood();
        },  
        beforeDestroy(){
            // clearInterval(this.timeOut);
        },
        methods: {
            handlePageChange(obj) {
                this.page = obj.pageNum;
                this.pagesize = obj.pageSize;
                this.firstblood();
            },
            //刷新页面  
            firstblood(){
                this.loading = true;
                getListPlatformComplain(this.page,this.pagesize,this.searchInfo).then(res => {
                    console.log('是否刷新',res.data)
                    this.tableData = res.data.list;
                    this.dataTotal = res.data.totalCount;
                    this.loading = false;
                })
            },
            //模糊查询 分类名称或者code
            handleSearch(row,type){
               
                switch(type){
                    case 'cancel':

                        break;
                    case 'export':
                        
                }
            },
            handleClick(row,type){
                console.log(row)
                switch(type){
                    case 'reply':
                        this.currentRow = Object.assign({},row)
                        this.dialogVisible = true;
                        break;
                    case 'delet':
                        this.$confirm('确定要删除工单号为'+ row.workSerial +'改条记录吗？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(()=>{
                            deletReply(row.id).then(res => {
                                this.firstblood();
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            })
                        })
                        break;
                }
            },
             //判断是否选中
            getinfomation(selection){
                this.checkedinformation = selection;
            },
             //点击选中当前行
            clickDetails(row, event, column){
                this.$refs.multipleTable.toggleRowSelection(row);
            },
            //详情弹窗
            pushOrderSerial(item){
                // console.log(item)
                this.dialogFormVisible_details = true;
                this.DetailsOrderSerial = item.orderSerial;
            },
            getSearchParam(obj) {
                console.log(obj)
                this.searchInfo = Object.assign(this.searchInfo, obj)
                this.loading = true ;
                this.firstblood();
            },
            shuaxin(){
                this.firstblood();
            }
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .plantService{
        height: 100%;
        .reMark{
            padding: 5px 15px;
            border-radius: 20%  / 50%;
            background: #eca438;
            color: #fff;
        }
        .sussces{
            padding: 5px 15px;
            border-radius: 20%  / 50%;
            background: skyblue;
            color: #fff;
        }
    }
</style>