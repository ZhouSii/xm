<template>
    <div class="identicalStyle notSubmittedCompnent" v-loading="loading">
        <el-form  :inline="true" :model="listSystemObj.vo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="车主姓名" prop="driverName">
                <el-input v-model="listSystemObj.vo.driverName" clearable></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="driverMobile">
                <el-input v-model="listSystemObj.vo.driverMobile" clearable></el-input>
            </el-form-item>
            <el-form-item class="btnChoose fr"  style="margin-left:0;">
                <el-button type="primary" icon="el-icon-search" plain :size="btnsize" @click="handleSearch('search')">搜索</el-button>
                <el-button type="info" icon="fontFamily aflc-icon-qingkong" :size="btnsize" plain @click="handleSearch('clear')">清空</el-button>
            </el-form-item>
        </el-form>
        <div class="classify_info">
            <div class="btns_box">
                <el-button type="primary" icon="el-icon-circle-plus" plain @click="handleClickBtn('export')" :size="btnsize">导出Excel</el-button>
            </div>
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
                        label="申请单号"
                        prop="carStickerOrderSerial"
                        :show-overflow-tooltip="true"
                        min-width="250">
                        <template  slot-scope="scope">
                            <h4 class="needMoreInfo" @click="handleClick('details',scope.row)">{{ scope.row.carStickerOrderSerial}}</h4>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="operTypeName"
                        sortable
                        min-width="150"
                        label="申请/上报类型"
                        >
                    </el-table-column>
                     <el-table-column
                        prop="driverName"
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
                        prop="productAreaCodeName"
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
                        prop="productName"
                        sortable
                        min-width="150"
                        label="产品名称"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="firstTrialPassTime"
                        sortable
                        min-width="160"
                        label="初审通过时间"
                        >
                        <template slot-scope="scope">
                            {{ scope.row.firstTrialPassTime | parseTime }}
                        </template>
                    </el-table-column> 
                    <el-table-column
                        prop="currPeriods"
                        sortable
                        min-width="150"
                        label="当前期数"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="followUpName"
                        sortable
                        min-width="150"
                        label="第一责任人"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="followUpNameTwo"
                        sortable
                        min-width="150"
                        label="第二责任人"
                        >
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange" ref="pager"/></div> </div>    
        <carStickerDetails :dialogFormVisible.sync = "dialogFormVisible" showType='monthTrial' :tabName="currentTab" :isView = "isView" :detailsObj="scopeObj" :formtitle = "formtitle"  @renovateM="firstblood"/>
    </div>
</template>

<script type="text/javascript">
import { monthTrialUnsubmitList,exportUnsubmitList } from '@/api/marketing/carSticker'
// import { DicCartype } from '@/api/common.js'
import Pager from '@/components/Pagination/index'
// import getCityList from '@/components/GetCityList/index'
import carStickerDetails from '../component/carStickerDetails'
import { objectMerge2, parseTime } from '@/utils/'

export default{
    name:'notSubmittedCompnent',
    props: {
        isvisible: {
            type: Boolean,
            default: false
        }
    },
    components: {
        Pager,
        // getCityList,
        carStickerDetails
    },
    data() {
        return {
            btnsize: 'mini',
            loading: false, // 加载
            dialogFormVisible:false,
            currentTab:'monthTrial',
            isView:false,
            scopeObj:{},
            formtitle:'',
            dataTotal: 0,
            listSystemObj:{
                "currentPage": 1,
                "pageSize": 20,
                "vo": {
                    driverName:'',//车主姓名
                    driverMobile:'',//车主手机号
                }
            },
            tableData:[],
            tableDataArr:[]//储存所有数据
        }
    },
    watch: {
        isvisible: {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.firstblood()
                } 
            },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
            immediate: true
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init(){
           
        },
        handlePageChange(obj) {
            this.listSystemObj.currentPage = obj.pageNum;
            this.listSystemObj.pageSize = obj.pageSize;
            this.nowTable();
        },
        // 刷新页面
        firstblood() {
            this.loading = true
            monthTrialUnsubmitList(this.listSystemObj.vo).then(res => {
                this.tableDataArr = res.data;
                this.dataTotal = res.data.length;
                this.nowTable();
                this.loading = false;
            }).catch(err => {
                this.loading = false;
                this.$message({
                    type: 'info',
                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                })
            })
        },
        nowTable() {
            let pageStart = (this.listSystemObj.currentPage - 1) * this.listSystemObj.pageSize;
            let pageEnd = this.listSystemObj.currentPage * this.listSystemObj.pageSize;
            this.tableData = this.tableDataArr.slice(pageStart, pageEnd);
        },

        // 模糊查询 分类名称或者code
        handleSearch(type) {
            if(type == 'clear'){
                this.listSystemObj.vo ={
                    driverName:'',//车主姓名
                    driverMobile:'',//车主手机号
                }
            }
            this.firstblood();
        },
        handleClick(type,row){
            this.currentTab = 'monthTrial';
            this.scopeObj = row;
            this.dialogFormVisible = true;
            this.isView = true;
            this.formtitle = '车贴详情';
        },
        handleClickBtn(type){
            switch (type) {
                case 'export':
                    let timestamp = (new Date()).getTime();
                    this.$message.info('正在导出中...');    
                    exportUnsubmitList(this.listSystemObj.vo).then(res => {
                        let blob = new Blob([res]);
                        let href =  window.URL.createObjectURL(blob);
                        let NewDom = document.createElement("a");
                        NewDom.setAttribute('href',href);
                        NewDom.setAttribute('target', '_blank');
                        NewDom.setAttribute('download', '车贴未提交月审'+parseTime(timestamp)+'.xlsx');
                        document.body.appendChild(NewDom);
                        NewDom.click();
                        document.body.removeChild(NewDom)
                    })
                    break;
            }
        }
    }
}
</script>

<style type="text/css" lang="scss" scoped>
    .notSubmittedCompnent{
    }
</style>
