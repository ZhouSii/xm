<template>
    <div class="identicalStyle partThree" v-loading="loading">
        <el-form  :inline="true" :model="listSystemObj.vo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="费用变更状态" prop="applyStatus">
                <el-select v-model="listSystemObj.vo.applyStatus" clearable placeholder="请选择">
                    <el-option
                    v-for="item in optionsCarriersWaybill"
                    :key="item.name"
                    :label="item.name"
                    :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="区代" prop="agencyName">
                <el-input v-model="listSystemObj.vo.agencyName" clearable></el-input>
            </el-form-item>
            <el-form-item label="区代物流公司" prop="agencyCompanyName">
                <el-input v-model="listSystemObj.vo.agencyCompanyName" clearable></el-input>
            </el-form-item>
            <el-form-item label="专线承运商" prop="carrierName">
                <el-input v-model="listSystemObj.vo.carrierName" clearable></el-input>
            </el-form-item>
            <el-form-item label="专线运单号" prop="waybillNo">
                <el-input v-model="listSystemObj.vo.waybillNo" clearable></el-input>
            </el-form-item>
            <el-form-item class="btnChoose fr"  style="margin-left:0;">
                <el-button type="primary" icon="el-icon-search" plain :size="btnsize" @click="handleSearch('search')">搜索</el-button>
                <el-button type="info" icon="fontFamily aflc-icon-qingkong" :size="btnsize" plain @click="handleSearch('clear')">清空</el-button>
            </el-form-item>
        </el-form>
        <div class="classify_info">
            <!-- <div class="btns_box">
                <el-button type="primary" icon="el-icon-download" plain @click="handleClick('export')" :size="btnsize">导出Excel</el-button>
            </div> -->
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
                        label="专线运单号"
                        prop="waybillNo"
                        :show-overflow-tooltip="true"
                        min-width="250">
                        <template  slot-scope="scope">
                            <h4 class="needMoreInfo" @click="handleClick('details',scope.row)">{{ scope.row.waybillNo}}</h4>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="agencyName"
                        sortable
                        min-width="150"
                        label="区代"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="agencyCompanyName"
                        sortable
                        min-width="200"
                        label="区代物流公司"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="agencyServiceMobile"
                        sortable
                        min-width="150"
                        label="区代客服电话"
                        >
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="carrierName"
                        sortable
                        label="专线承运商"
                        min-width="200"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="carrierServiceMobile"
                        sortable
                        min-width="180"
                        label="专线承运商客服电话"
                        >
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="startAddress"
                        sortable
                        min-width="200"
                        label="发货地"
                        >
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="endAddress"
                        sortable
                        min-width="200"
                        label="收货地"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="applyAmount"
                        sortable
                        min-width="150"
                        label="申请变更金额"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="applyStatusName"
                        sortable
                        min-width="150"
                        label="费用变更状态"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="expensesDetails"
                        sortable
                        min-width="150"
                        label="费用变更明细"
                        >
                        <template slot-scope="scope">
                            <div v-if="scope.row.expensesDetails">
                                <span v-for="(item,idx) in scope.row.expensesDetails" :key="idx">
                                    {{idx>0 ? ',':''}}{{item.expensesCourseName}}{{item.coursePrice}}
                                </span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="applyTime"
                        sortable
                        label="申请时间"
                        min-width="160">
                        <template  slot-scope="scope">
                            {{scope.row.applyTime | parseTime}}
                        </template>
                    </el-table-column>
                     <el-table-column
                        prop="replyTime"
                        sortable
                        label="确认时间"
                        min-width="160">
                        <template  slot-scope="scope">
                            {{scope.row.replyTime | parseTime}}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange" ref="pager"/></div> </div> 
    </div>
</template>

<script type="text/javascript">
import { waybilloutsourceexpenseschangeList, } from '@/api/service/logistics.js'
import { transferType } from '@/api/common.js'
import Pager from '@/components/Pagination/index'
import { parseTime } from '@/utils/index';

export default{
    name:'partThree',
    props: {
        isvisible: {
            type: Boolean,
            default: false
        }
    },
    components: {
        Pager,
    },
    data() {
        return {
            btnsize: 'mini',
            loading: false, // 加载
            dataTotal: 0,
            listSystemObj:{
                "currentPage": 1,
                "pageSize": 20,
                "vo": {
                    "agencyCompanyName": "",//区代物流公司
                    "agencyName": "",//区代
                    "carrierName": "",//专线承运商
                    "waybillNo": "",//区代运单号
                    applyStatus:'',//费用变更状态字典
                    applyUserType:'AF00112',//申请用户类型(AF00112:区代向专线申请，AF00113:专线向区代申请)
                }
            },
            tableData: [],
            optionsCarriersWaybill:[{
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
            transferType().then(res => {
                this.optionsCarriersWaybill = this.optionsCarriersWaybill.concat(res.data);
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
            waybilloutsourceexpenseschangeList(this.listSystemObj).then(res => {
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
                    "agencyCompanyName": "",//区代物流公司
                    "agencyName": "",//区代
                    "carrierName": "",//专线承运商
                    "waybillNo": "",//区代运单号
                    applyStatus:'',//费用变更状态字典
                    applyUserType:'AF00112',//申请用户类型(AF00112:区代向专线申请，AF00113:专线向区代申请)
                }
            }
            if(this.listSystemObj.currentPage!= 1){
                this.listSystemObj.currentPage = 1;
                this.$refs.pager.inputval = this.listSystemObj.currentPage;
                this.$refs.pager.pageNum = this.listSystemObj.currentPage;
            }
            this.firstblood();
        },
        handleClick(type,row){
            switch (type) {
                case 'export':
                    break;
                case 'details':
                    this.$router.push({name: '发物流订单详情',query:{ orderSerial:row.orderSerial}});
                    break;
            }
        },
    }
}
</script>

<style type="text/css" lang="scss" scoped>
    .partThree{
    }
</style>
