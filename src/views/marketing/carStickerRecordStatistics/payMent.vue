<template>
    <div class="identicalStyle carStickerPaymentList tabsWrap" v-loading="loading">
        <el-form  :inline="true" :model="listSystemObj.vo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="审核单号" prop="carStickerOrderSerial">
                <el-input v-model="listSystemObj.vo.carStickerOrderSerial" clearable></el-input>
            </el-form-item>
            <el-form-item label="车主姓名" prop="accountName">
                <el-input v-model="listSystemObj.vo.accountName" clearable></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="driverMobile">
                <el-input v-model="listSystemObj.vo.driverMobile" clearable></el-input>
            </el-form-item>
            <el-form-item label="交易时间" prop="chooseTime1">
                <el-date-picker
                    v-model="chooseTime1"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    unlink-panels
                    align="right"
                    :default-time="['00:00:00', '23:59:59']"
                    value-format="timestamp">
                </el-date-picker>
            </el-form-item>
            <el-form-item class="btnChoose fr"  style="margin-left:0;">
                <el-button type="primary" icon="el-icon-search" plain :size="btnsize" @click="handleSearch('search')">搜索</el-button>
                <el-button type="info" icon="fontFamily aflc-icon-qingkong" :size="btnsize" plain @click="handleSearch('clear')">清空</el-button>
            </el-form-item>
        </el-form>
        <div class="classify_info">
            <div class="info_news">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    stripe
                    border
                    align = "center"
                    height="100%"
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column label="序号" width="60">
                        <template slot-scope="scope">
                            {{ (listSystemObj.currentPage - 1)*listSystemObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column> 
                    <el-table-column
                        sortable
                        label="审核单号"
                        prop="carStickerOrderSerial"
                        min-width="250">
                        <template  slot-scope="scope">
                            <h4 class="needMoreInfo" @click="handleClick('CTdetails',scope.row)">{{ scope.row.carStickerOrderSerial}}</h4>
                        </template>
                    </el-table-column>
                     <el-table-column
                        prop="accountName"
                        sortable
                        label="车主姓名"
                        min-width="150">
                    </el-table-column>
                    <el-table-column
                        prop="driverMobile"
                        sortable
                        label="手机号"
                        min-width="150"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="fullCityName"
                        sortable
                        min-width="150"
                        label="产品所属区域"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="carTypeName"
                        sortable
                        label="车型"
                        min-width="150">
                    </el-table-column>
                    <el-table-column
                        prop="produceName"
                        sortable
                        min-width="150"
                        label="产品名称"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="periods"
                        sortable
                        min-width="150"
                        label="期数"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="tradeType"
                        sortable
                        min-width="150"
                        label="交易类型"
                        >
                    </el-table-column>
                     <el-table-column
                        prop="payTotal"
                        sortable
                        min-width="150"
                        label="交易金额"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="payTime"
                        sortable
                        label="交易时间"
                        min-width="160">
                        <template slot-scope="scope">
                            {{ scope.row.payTime | parseTime }}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange" ref="pager"/></div> </div>    
        <carStickerDetails :dialogFormVisible.sync = "dialogFormVisible" showType='details' :tabName="currentTab" :isView = "isView" :detailsObj="scopeObj" :formtitle = "formtitle"  @renovateM="firstblood"/>
    </div>
</template>

<script type="text/javascript">
import { carStickerPaymentList } from '@/api/marketing/carSticker'
import Pager from '@/components/Pagination/index'
import carStickerDetails from '../carSticker/component/carStickerDetails'

export default{
    name:'carStickerPaymentList',
    props: {
    },
    components: {
        Pager,
        carStickerDetails
    },
    data() {
        return {
            btnsize: 'mini',
            loading: false, // 加载
            dialogFormVisible:false,
            currentTab:'applyInfo',
            isView:false,
            scopeObj:{},
            formtitle:'',
            dataTotal: 0,
            listSystemObj:{
                "currentPage": 1,
                "pageSize": 20,
                "vo": {
                    accountName:'',//车主姓名
                    driverMobile:'',//车主手机号
                    carStickerOrderSerial:'',//车贴订单号
                    payStartTime:'',
                    payEndTime:''
                }
            },
            chooseTime1:[],
            tableData: [],
        }
    },
    watch: {
    },
    mounted() {
        this.init();
        this.firstblood();
    },
    methods: {
        init(){
        },
        handlePageChange(obj) {
            this.listSystemObj.currentPage = obj.pageNum;
            this.listSystemObj.pageSize = obj.pageSize;
            this.firstblood();
        },
        // 刷新页面
        firstblood() {
            this.loading = true
            carStickerPaymentList(this.listSystemObj).then(res => {
                this.tableData = res.data.list;
                this.dataTotal = res.data.totalCount;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
                this.$message({
                    type: 'info',
                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                })
            })
        },
        // 模糊查询 分类名称或者code
        handleSearch(type) {
            if(type == 'clear'){
                this.listSystemObj.vo ={
                    accountName:'',//车主姓名
                    driverMobile:'',//车主手机号
                    carStickerOrderSerial:'',//车贴订单号
                    payStartTime:'',
                    payEndTime:''
                }
                this.chooseTime1 = [];
            }
            if(this.chooseTime1){
                this.listSystemObj.vo.payStartTime = this.chooseTime1[0];
                this.listSystemObj.vo.payEndTime = this.chooseTime1[1];
            }
            if(this.listSystemObj.currentPage!= 1){
                this.listSystemObj.currentPage = 1;
                this.$refs.pager.inputval = this.listSystemObj.currentPage;
                this.$refs.pager.pageNum = this.listSystemObj.currentPage;
            }
            this.firstblood();
        },
        handleClick(type,row){
            this.currentTab = 'applyInfo';
            this.scopeObj = row;
            this.dialogFormVisible = true;
            this.isView = true;
            this.formtitle = '车贴详情';
        },
    }
}
</script>

<style type="text/css" lang="scss" scoped>
    .carStickerPaymentList{
    }
</style>
