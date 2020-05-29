<template>
    <div class="identicalStyle pendingCompnent" v-loading="loading">
        <el-form  :inline="true" :model="listSystemObj.vo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="申请单号" prop="carStickerOrderSerial">
                <el-input v-model="listSystemObj.vo.carStickerOrderSerial" clearable></el-input>
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
            <el-form-item label="申请/上报类型"   prop="operType">
                <el-select v-model="listSystemObj.vo.operType" clearable placeholder="请选择">
                    <el-option
                    v-for="item in optionsApplyType"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>
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
                <el-button type="primary" icon="el-icon-circle-plus" plain @click="handleClick('ex')" :size="btnsize" v-has:MARKETING_CARSTICKER_CARSTICKERREPORT_PENDINGDISPOSAL_EXAMINE>审核</el-button>
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
                        label="申请单号"
                        prop="carStickerOrderSerial"
                        min-width="250">
                        <template  slot-scope="scope">
                            <h4 class="needMoreInfo" @click="handleClick('details',scope.row)">{{ scope.row.carStickerOrderSerial}}</h4>
                        </template>
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
                        prop="operTypeName"
                        sortable
                        min-width="150"
                        label="申请/上报类型"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="applyMoneyView"
                        sortable
                        min-width="150"
                        label="申请费用"
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
                        prop="submitTime"
                        sortable
                        label="申请时间"
                        min-width="160">
                        <template slot-scope="scope">
                            {{ scope.row.submitTime | parseTime }}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange" ref="pager"/></div> </div>    
        <carStickerDetails :dialogFormVisible.sync = "dialogFormVisible" showType='applyInfo' :isView = "isView" :isModify="isModify" :detailsObj="scopeObj" :formtitle = "formtitle"  @renovate="firstblood"/>
    </div>
</template>

<script type="text/javascript">
import { carStickerApplyList } from '@/api/marketing/carSticker'
import { DicCartype,ApplyType } from '@/api/common.js'
import Pager from '@/components/Pagination/index'
import getCityList from '@/components/GetCityList/index'
import carStickerDetails from '../component/carStickerDetails'
export default{
    name:'pendingCompnent',
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
            isView:false,
            isModify:false,
            formtitle:'',
            radio:'',//
            selected:{},
            scopeObj:{},
            dataTotal: 0,
            listSystemObj:{
                "currentPage": 1,
                "pageSize": 20,
                "vo": {
                    applyStatus:'AF0880401',//当前车贴状态(【待处理】显示：待处理（AF0880401）【已通过】显示：通过（AF0880402）【不通过】显示：车主取消（AF0880403）不符合条件（AF0880404） )
                    carStickerOrderSerial:'',//车贴订单号
                    productAreaCode:'',//产品所属区域
                    carType:'',//车型
                    productName:'',//产品名称
                    operType:'',//申请/上报类型
                    driverName:'',//车主姓名
                    driverMobile:'',//车主手机号
                }
            },
            tableData: [],
            optionsApplyType:[{
                name:'全部',
                code:""
            }],
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
        setTimeout(()=>{
            this.$refs.multipleTable.$el.style.height = this.$refs.multipleTable.$el.offsetHeight + 'px';
        },300)
    },
    methods: {
        init(){
            Promise.all([DicCartype(),ApplyType()]).then(resArr => {
                this.optionsCarType = this.optionsCarType.concat(resArr[0].data);
                this.optionsApplyType = this.optionsApplyType.concat(resArr[1].data);
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
            carStickerApplyList(this.listSystemObj).then(res => {
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
                    applyStatus:'AF0880401',//当前车贴状态(【待处理】显示：待处理（AF0880401）【已通过】显示：通过（AF0880402）【不通过】显示：车主取消（AF0880403）不符合条件（AF0880404） )
                    carStickerOrderSerial:'',//车贴订单号
                    productAreaCode:'',//产品所属区域
                    carType:'',//车型
                    productName:'',//产品名称
                    operType:'',//申请/上报类型
                    driverName:'',//车主姓名
                    driverMobile:'',//车主手机号
                }
                this.$refs.area.clearData();
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
                        this.scopeObj = this.selected
                        this.dialogFormVisible = true;
                        this.isView = false;
                        this.isModify = false;
                        this.formtitle = '审核';
                        break;
                    case 'details':
                        this.scopeObj = row;
                        this.dialogFormVisible = true;
                        this.isView = true;
                        this.isModify = false;
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
    .pendingCompnent{
    }
</style>
