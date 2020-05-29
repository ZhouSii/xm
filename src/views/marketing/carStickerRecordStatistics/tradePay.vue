<template>
    <div class="identicalStyle tradePay tabsWrap" v-loading="loading">
        <el-form  :inline="true" :model="listSystemObj.vo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="审核单号" prop="carStickerOrderSerial">
                <el-input v-model="listSystemObj.vo.carStickerOrderSerial" clearable></el-input>
            </el-form-item>
            <el-form-item label="流水号" prop="tradeSerial">
                <el-input v-model="listSystemObj.vo.tradeSerial" clearable></el-input>
            </el-form-item>
            <el-form-item label="交易类型" prop="tradeType">
                <el-select v-model="listSystemObj.vo.tradeType" clearable placeholder="请选择">
                    <el-option
                    v-for="item in optionsTradeType"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="用户姓名/账号" prop="accountName">
                <el-input v-model="listSystemObj.vo.accountName" clearable></el-input>
            </el-form-item>
            <el-form-item label="账号类型" prop="accountType">
                <el-select v-model="listSystemObj.vo.accountType" clearable placeholder="请选择">
                    <el-option
                    v-for="item in optionsAccountType"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="交易方式" prop="payAccountType">
                <el-select v-model="listSystemObj.vo.payAccountType" clearable placeholder="请选择">
                    <el-option
                    v-for="item in optionsPayAccountType"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="付款时间" prop="chooseTime1">
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
                        sortable
                        label="流水号"
                        prop="tradeSerial"
                        min-width="250">
                    </el-table-column>
                    <el-table-column
                        sortable
                        label="支付单号"
                        prop="tradeNo"
                        min-width="250">
                    </el-table-column>
                    <el-table-column
                        prop="tradeTypeName"
                        sortable
                        min-width="150"
                        label="交易类型"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="accountName"
                        sortable
                        label="用户姓名/账号"
                        min-width="150">
                    </el-table-column>
                    <el-table-column
                        prop="accountTypeName"
                        sortable
                        label="账号类型"
                        min-width="150">
                    </el-table-column>
                    <el-table-column
                        prop="payTotal"
                        sortable
                        min-width="150"
                        label="交易金额"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="incomeExpendTypeName"
                        sortable
                        min-width="150"
                        label="收支类型"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="payAccountTypeName"
                        sortable
                        min-width="150"
                        label="交易方式"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="payTime"
                        sortable
                        label="付款时间"
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
import { carStickerTradePayList } from '@/api/marketing/carSticker'
import { tradeTypeStatus } from '@/api/common.js'
import Pager from '@/components/Pagination/index'
import carStickerDetails from '../carSticker/component/carStickerDetails'

export default{
    name:'tradePay',
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
                    tradeType:'',//交易类型
                    payAccountType:'',
                    accountType:'',//账号类型
                    carStickerOrderSerial:'',//车贴订单号
                    tradeSerial:'',//流水号
                    payStartTime:'',
                    payEndTime:''
                }
            },
            chooseTime1:[],
            tableData: [],
            optionsPayAccountType:[{
                name:'全部',
                code:''
            }],
            optionsTradeType:[{
                name:'全部',
                code:''
            },{
                name:'平台支出车贴奖励',
                code:'AF01543'
            },{
                name:'车主收入车贴奖励',
                code:'AF01442'
            },{
                name:'平台支出上报补偿',
                code:'AF01542'
            },{
                name:'车主收入上报补偿',
                code:'AF01441'
            },{
                name:'平台收入车贴申请费',
                code:'AF01440'
            },{
                name:'车主支出车贴申请费',
                code:'AF01541'
            },],
            optionsAccountType:[{
                name:'全部',
                code:''
            },{
                name:'运营账户',
                code:'AF01602'
            },{
                name:'车主',
                code:'AF00102'
            }],

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
           Promise.all([tradeTypeStatus()]).then(resArr => {
               this.optionsPayAccountType = this.optionsPayAccountType.concat(resArr[0].data)
           })
        },
        handlePageChange(obj) {
            this.listSystemObj.currentPage = obj.pageNum;
            this.listSystemObj.pageSize = obj.pageSize;
            this.firstblood();
        },
        // 刷新页面
        firstblood() {
            this.loading = true
            carStickerTradePayList(this.listSystemObj).then(res => {
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
                    tradeType:'',//交易类型
                    accountType:'',//账号类型
                    payAccountType:'',
                    carStickerOrderSerial:'',//车贴订单号
                    tradeSerial:'',//流水号
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
    .tradePay{
    }
</style>
