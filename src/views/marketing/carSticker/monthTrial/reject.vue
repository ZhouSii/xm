<template>
    <div class="identicalStyle rejectCompnent" v-loading="loading">
        <el-form  :inline="true" :model="listSystemObj.vo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="审核单号" prop="monthTrialSerial">
                <el-input v-model="listSystemObj.vo.monthTrialSerial" clearable></el-input>
            </el-form-item>
            <el-form-item label="产品所属区域" prop="productAreaCode">
                <getCityList class="chooseItem" @returnStr="getStr" v-model="listSystemObj.vo.productAreaCode" ref="area"></getCityList>
            </el-form-item>
            <el-form-item label="车型" prop="carType">
                <el-select v-model="listSystemObj.vo.carType" clearable placeholder="请选择">
                    <el-option
                    v-for="item in optionsCarType"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="产品名称" prop="productName">
                <el-input v-model="listSystemObj.vo.productName" clearable></el-input>
            </el-form-item>
            <el-form-item label="车主姓名" prop="driverName">
                <el-input v-model="listSystemObj.vo.driverName" clearable></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="driverMobile">
                <el-input v-model="listSystemObj.vo.driverMobile" clearable></el-input>
            </el-form-item>
            <el-form-item label="月申请时间" prop="chooseTime1">
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
            <div class="btns_box">
                <el-button type="primary" icon="el-icon-circle-plus" plain @click="handleClick('ex')" :size="btnsize" v-has:MARKETING_CARSTICKER_MONTHLYREVIEW_REJECTIONOFREVIEW_EXAMINE>审核</el-button>
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
                    @row-click="clickDetails"
                    style="width: 100%">
                    <el-table-column label="选择" width="60" align="center">
                        <template slot-scope="scope">
                            <el-radio class="radio"  v-model="radio"  :label="scope.row.id">&nbsp;</el-radio>
                        </template>
                    </el-table-column>  
                    <el-table-column label="序号" width="60">
                        <template slot-scope="scope">
                            {{ (listSystemObj.currentPage - 1)*listSystemObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column> 
                    <el-table-column
                        sortable
                        label="审核单号"
                        prop="monthTrialSerial"
                        :show-overflow-tooltip="true"
                        min-width="250">
                        <template  slot-scope="scope">
                            <h4 class="needMoreInfo" @click="handleClick('details',scope.row)">{{ scope.row.monthTrialSerial}}</h4>
                        </template>
                    </el-table-column>
                     <el-table-column
                        prop="applyOperTypeName"
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
                        prop="subsidyMoney"
                        sortable
                        min-width="150"
                        label="每月补贴费用"
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
                        prop="submitTime"
                        sortable
                        label="月审申请时间"
                        min-width="160">
                        <template slot-scope="scope">
                            {{ scope.row.submitTime | parseTime }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="statusName"
                        sortable
                        min-width="150"
                        label="月审状态"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="returnReasonName"
                        sortable
                        min-width="150"
                        label="驳回原因"
                        >
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange" ref="pager"/></div> </div>    

        <carStickerDetails :dialogFormVisible.sync = "dialogFormVisible" showType='monthTrial' :tabName="currentTab" :isView = "isView" :detailsObj="scopeObj" :formtitle = "formtitle" :isReject="isReject"  @renovateM="firstblood"/>
    </div>
</template>

<script type="text/javascript">
import { monthTrialList } from '@/api/marketing/carSticker'
import { DicCartype } from '@/api/common.js'
import Pager from '@/components/Pagination/index'
import getCityList from '@/components/GetCityList/index'
import carStickerDetails from '../component/carStickerDetails'

export default{
    name:'rejectCompnent',
    props: {
        isvisible: {
            type: Boolean,
            default: false
        }
    },
    components: {
        Pager,
        getCityList,
        carStickerDetails
        // add,
    },
    data() {
        return {
            btnsize: 'mini',
            loading: false, // 加载
            dialogFormVisible:false,
            currentTab:'monthTrial',
            isReject:true,
            isView:false,
            scopeObj:{},
            formtitle:'',
            radio:'',//
            selected:{},
            dataTotal: 0,
            changeForm:{},
            listSystemObj:{
                "currentPage": 1,
                "pageSize": 20,
                "vo": {
                    status:'AF0880706',//1.【全部】显示：所有状态的数据2.【月审待审核】显示：待月审审核（AF0880701）3.【月审待复审】显示：待月审复审（AF0880704）4.【已复审】显示：复审通过（AF0880705）5.【复审驳回】显示：复审驳回（AF0880706）
                    monthTrialSerial:'',//月审单号
                    carStickerOrderSerial:'',//车贴订单号
                    productAreaCode:'',//产品所属区域
                    carType:'',//车型
                    productName:'',//产品名称
                    driverName:'',//车主姓名
                    driverMobile:'',//车主手机号
                    submitTimeStart:'',//提交申请时间
                    submitTimeEnd:'',//提交申请时间
                }
            },
            chooseTime1:[],
            tableData: [],
            optionsCarType:[{
                name:'全部',
                code:""
            }],
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
            DicCartype().then(res => {
                this.optionsCarType = this.optionsCarType.concat(res.data);
            })
        },
        getStr(d){
            // this.searchInfo.belongCityName = (!d.province&&!d.city&&!d.area) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}`.trim();
            this.listSystemObj.vo.productAreaCode = d.city.code;
        },
        handlePageChange(obj) {
            this.listSystemObj.currentPage = obj.pageNum;
            this.listSystemObj.pageSize = obj.pageSize;
            this.firstblood();
        },
        // 刷新页面
        firstblood() {
            this.loading = true
            monthTrialList(this.listSystemObj).then(res => {
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
                    status:'AF0880706',//1.【全部】显示：所有状态的数据2.【月审待审核】显示：待月审审核（AF0880701）3.【月审待复审】显示：待月审复审（AF0880704）4.【已复审】显示：复审通过（AF0880705）5.【复审驳回】显示：复审驳回（AF0880706）
                    monthTrialSerial:'',//月审单号
                    carStickerOrderSerial:'',//车贴订单号
                    productAreaCode:'',//产品所属区域
                    carType:'',//车型
                    productName:'',//产品名称
                    driverName:'',//车主姓名
                    driverMobile:'',//车主手机号
                    submitTimeStart:'',//提交申请时间
                    submitTimeEnd:'',//提交申请时间
                }
                this.$refs.area.clearData();
                this.chooseTime1 = [];
            }
            if(this.chooseTime1){
                this.listSystemObj.vo.submitTimeStart = this.chooseTime1[0];
                this.listSystemObj.vo.submitTimeEnd = this.chooseTime1[1];
            }
            if(this.listSystemObj.currentPage!= 1){
                this.listSystemObj.currentPage = 1;
                this.$refs.pager.inputval = this.listSystemObj.currentPage;
                this.$refs.pager.pageNum = this.listSystemObj.currentPage;
            }
            this.firstblood();
        },
        handleClick(type,row){
            if(this.selected.id || type == 'details'){
                switch (type) {
                    case 'ex':
                        this.currentTab = 'monthTrial';
                        this.scopeObj = this.selected;
                        this.dialogFormVisible = true;
                        this.isView = false;
                        this.formtitle = '审核';
                        break;
                    case 'details':
                        this.currentTab = 'monthTrial';
                        this.scopeObj = row;
                        this.dialogFormVisible = true;
                        this.isView = true;
                        this.formtitle = '车贴详情';
                        break;
                }
            }else{
                this.$message({
                    type: 'warning',
                    message: '请选择一条列表数据!'
                });
            }
        },
        // 点击选中当前行
        clickDetails(row, event, column) {
            // this.$refs.multipleTable.toggleRowSelection(row)
            this.radio = row.id;
            this.selected = row;
        },
    }
}
</script>

<style type="text/css" lang="scss" scoped>
    .rejectCompnent{
    }
</style>
