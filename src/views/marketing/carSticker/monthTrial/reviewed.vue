<template>
    <div class="identicalStyle reviewedCompnent" v-loading="loading">
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
            <el-form-item label="审核操作时间" prop="chooseTime2">
                <el-date-picker
                    v-model="chooseTime2"
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
            <el-form-item label="复审操作时间" prop="chooseTime3">
                <el-date-picker
                    v-model="chooseTime3"
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
                <el-button type="primary" icon="el-icon-download" plain @click="handleClickBtn('export')" :size="btnsize">导出Excel</el-button>
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
                        prop="actualSubsidyMoney"
                        sortable
                        min-width="150"
                        label="实际发放金额"
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
                        prop="operator"
                        sortable
                        min-width="150"
                        label="审核操作人"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="operTime"
                        sortable
                        label="审核操作时间"
                        min-width="160">
                        <template slot-scope="scope">
                            {{ scope.row.operTime | parseTime }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="repeatOperator"
                        sortable
                        min-width="150"
                        label="复审操作人"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="repeatOperTime"
                        sortable
                        label="复审操作时间"
                        min-width="160">
                        <template slot-scope="scope">
                            {{ scope.row.repeatOperTime | parseTime }}
                        </template>
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
import { monthTrialList,exportMonthTrialList } from '@/api/marketing/carSticker'
import { DicCartype } from '@/api/common.js'
import Pager from '@/components/Pagination/index'
import getCityList from '@/components/GetCityList/index'
import carStickerDetails from '../component/carStickerDetails'
import { objectMerge2, parseTime } from '@/utils/'

export default{
    name:'reviewedCompnent',
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
            isView:false,
            scopeObj:{},
            formtitle:'',
            dataTotal: 0,
            listSystemObj:{
                "currentPage": 1,
                "pageSize": 20,
                "vo": {
                    status:'AF0880705',//1.【全部】显示：所有状态的数据2.【月审待审核】显示：待月审审核（AF0880701）3.【月审待复审】显示：待月审复审（AF0880704）4.【已复审】显示：复审通过（AF0880705）5.【复审驳回】显示：复审驳回（AF0880706）
                    monthTrialSerial:'',//月审单号
                    carStickerOrderSerial:'',//车贴订单号
                    productAreaCode:'',//产品所属区域
                    carType:'',//车型
                    productName:'',//产品名称
                    driverName:'',//车主姓名
                    driverMobile:'',//车主手机号
                    operTimeStart:'',//操作时间
                    operTimeEnd:'',//操作时间
                    submitTimeStart:'',//提交申请时间
                    submitTimeEnd:'',//提交申请时间
                    repeatOperTimeStart:'',//复审操作时间
                    repeatOperTimeEnd:'',//复审操作时间
                }
            },
            chooseTime1:[],
            chooseTime2:[],
            chooseTime3:[],
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
                    status:'AF0880705',//1.【全部】显示：所有状态的数据2.【月审待审核】显示：待月审审核（AF0880701）3.【月审待复审】显示：待月审复审（AF0880704）4.【已复审】显示：复审通过（AF0880705）5.【复审驳回】显示：复审驳回（AF0880706）
                    monthTrialSerial:'',//月审单号
                    carStickerOrderSerial:'',//车贴订单号
                    productAreaCode:'',//产品所属区域
                    carType:'',//车型
                    productName:'',//产品名称
                    driverName:'',//车主姓名
                    driverMobile:'',//车主手机号
                    operTimeStart:'',//操作时间
                    operTimeEnd:'',//操作时间
                    submitTimeStart:'',//提交申请时间
                    submitTimeEnd:'',//提交申请时间
                    repeatOperTimeStart:'',//复审操作时间
                    repeatOperTimeEnd:'',//复审操作时间
                }
                this.$refs.area.clearData();
                this.chooseTime1 = [];
                this.chooseTime2 = [];
                this.chooseTime3 = [];
            }
            if(this.chooseTime1){
                this.listSystemObj.vo.submitTimeStart = this.chooseTime1[0];
                this.listSystemObj.vo.submitTimeEnd = this.chooseTime1[1];
            }
            if(this.chooseTime2){
                this.listSystemObj.vo.operTimeStart = this.chooseTime2[0];
                this.listSystemObj.vo.operTimeEnd = this.chooseTime2[1];
            }
            if(this.chooseTime3){
                this.listSystemObj.vo.repeatOperTimeStart = this.chooseTime3[0];
                this.listSystemObj.vo.repeatOperTimeEnd = this.chooseTime3[1];
            }
            if(this.listSystemObj.currentPage!= 1){
                this.listSystemObj.currentPage = 1;
                this.$refs.pager.inputval = this.listSystemObj.currentPage;
                this.$refs.pager.pageNum = this.listSystemObj.currentPage;
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
                    exportMonthTrialList(this.listSystemObj).then(res => {
                        let blob = new Blob([res]);
                        let href =  window.URL.createObjectURL(blob);
                        let NewDom = document.createElement("a");
                        NewDom.setAttribute('href',href);
                        NewDom.setAttribute('target', '_blank');
                        NewDom.setAttribute('download', '月审已审核'+parseTime(timestamp)+'.xlsx');
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
    .reviewedCompnent{
    }
</style>
