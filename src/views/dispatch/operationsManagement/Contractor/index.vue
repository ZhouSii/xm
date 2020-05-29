<template>
    <div class="identicalStyle Contractor" v-loading="loading">
        <el-form  :inline="true" :model="listSystemObj.vo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="线路承包商" prop="companyName">
                <el-input v-model="listSystemObj.vo.companyName" clearable></el-input>
            </el-form-item>
            <el-form-item label="承包产品类型"  prop="typeCode">
                <el-select v-model="listSystemObj.vo.typeCode">
                    <el-option 
                    v-for="item in optionsProduct"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="支付方式"  prop="typeCode">
                <el-select v-model="listSystemObj.vo.typeCode">
                    <el-option 
                    v-for="item in optionsProduct"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="承包产品名称" prop="productName">
                <el-input v-model="listSystemObj.vo.productName" clearable></el-input>
            </el-form-item>
            <!-- <el-form-item label="开通渠道"  prop="flag">
                <el-select v-model="listSystemObj.vo.flag">
                    <el-option 
                    v-for="item in optionsFlag"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="开通日期" prop="registeTime">
                <el-date-picker
                    v-model="registeTime"
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
                <el-button type="primary" icon="el-icon-circle-plus" plain @click="handleClick('new')" :size="btnsize" v-has:DISPATCH_OPERATIONMANAGEMENT_CONTRACTOR_ADD>新增</el-button>
                <el-button type="primary" :size="btnsize" plain icon="el-icon-edit" @click="handleClick('revise')" v-has:DISPATCH_OPERATIONMANAGEMENT_CONTRACTOR_MODIFY>修改</el-button>
                <!-- <el-button type="primary" :size="btnsize" plain icon="el-icon-upload" @click="handleClick('status')" v-has:DISPATCH_OPERATIONMANAGEMENT_OPERATOR_ENABLEDISABLE >启用/禁用</el-button> -->
                <el-button type="primary" :size="btnsize" plain icon="el-icon-delete" @click="handleClick('delet')" v-has:DISPATCH_OPERATIONMANAGEMENT_CONTRACTOR_DELETE>删除</el-button>
            </div>
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
                    <el-table-column label="选择" width="60" align="center">
                        <template slot-scope="scope">
                            <el-radio class="radio" v-model="radio" :label="scope.row.id">&nbsp;</el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column label="序号" width="60">
                        <template slot-scope="scope">
                            {{ (listSystemObj.currentPage - 1)*listSystemObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column> 
                    <el-table-column
                        prop="companyName"
                        sortable
                        :show-overflow-tooltip="true"
                        width="200"
                        label="线路承包商">
                         <template slot-scope="scope">
                            <h4 class="needMoreInfo" @click="handleClick('details',scope.row)">{{ scope.row.companyName}}</h4>
                        </template>
                    </el-table-column> 
                    <el-table-column
                        prop="productName"
                        sortable
                        :show-overflow-tooltip="true"
                        width="150"
                        label="承包产品名称">
                    </el-table-column>
                    <el-table-column
                        prop="typeName"
                        sortable
                        width="150"
                        label="承包产品类型">
                    </el-table-column>
                    <el-table-column
                        prop="startTime"
                        sortable
                        width="150"
                        label="承包开始日期">
                        <template slot-scope="scope"><span v-if="scope.row.startTime">{{scope.row.startTime | parseTime('{y}-{m}-{d}')}}</span> <span v-else>-</span></template>
                    </el-table-column>
                    <el-table-column
                        prop="endTime"
                        sortable
                        width="150"
                        label="承包截止日期">
                        <template slot-scope="scope"><span v-if="scope.row.endTime">{{scope.row.endTime | parseTime('{y}-{m}-{d}')}}</span> <span v-else>-</span></template>
                    </el-table-column>
                    <el-table-column
                        prop="stillDayGap"
                        sortable
                        width="150"
                        label="剩余天数">
                    </el-table-column>
                    <el-table-column
                        prop="serviceInfo"
                        sortable
                        width="150"
                        label="服务信息（条）">
                        <template slot-scope="scope">{{scope.row.serviceInfo?scope.row.serviceInfo : '不限'}}</template>
                    </el-table-column>
                    <el-table-column
                        prop="stillServiceInfo"
                        sortable
                        width="150"
                        label="剩余信息（条）">
                        <template slot-scope="scope">{{scope.row.stillServiceInfo?scope.row.stillServiceInfo : '不限'}}</template>
                    </el-table-column>
                    <el-table-column
                        prop="conrtactPrice"
                        sortable
                        width="150"
                        label="承包价格（元）">
                    </el-table-column>
                     <el-table-column
                        prop="createTime"
                        sortable
                        width="160"
                        label="开通日期">
                        <template slot-scope="scope">{{scope.row.createTime | parseTime}}</template>
                    </el-table-column>
                    <el-table-column
                        prop="channel"
                        sortable
                        width="150"
                        label="开通渠道">
                    </el-table-column>
                     <el-table-column
                        prop="userName"
                        sortable
                        width="150"
                        label="业务办理人">
                    </el-table-column>
                     <el-table-column
                        prop="payWay"
                        sortable
                        width="150"
                        label="支付方式">
                    </el-table-column>
                    <!-- <el-table-column
                        fixed="right"
                        label="操作"
                        width="150">
                        <template slot-scope="scope">
                            <el-button
                            :size="btnsize"
                            type="primary"
                            plain
                            @click="handleClick('revise',scope.row)">修改</el-button>
                            <el-button
                            :size="btnsize"
                            type="danger"
                            plain
                            @click="handleClick('delet',scope.row)">删除</el-button>
                        </template>
                    </el-table-column> -->
                </el-table>
            </div>
        </div>
        <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange" ref="pager"/></div> </div>    
        <add :dialogFormVisible.sync = "dialogFormVisible" :isView="isView" :isModify="isModify" :changeForm="changeForm" :formtitle = "formtitle"  @renovate="firstblood"/>
    </div>
</template>

<script type="text/javascript">
import { contractorList,deleteContractor } from '@/api/dispatch/operationsManagement'
import { DicContractProduct } from '@/api/common'
import Pager from '@/components/Pagination/index'
import add from './add'

export default{
    name:'Contractor',
    components: {
        Pager,
        add,
    },
    data() {
        return {
            selected: {},
            radio:'',
            btnsize: 'mini',
            loading: false, // 加载
            dialogFormVisible:false,
            isModify:false,
            isView:false,
            formtitle:'',
            dataTotal: 0,
            changeForm:{},
            ids:[],
            registeTime:[],
            optionsFlag:[{
                code:'',
                name:'全部',
            },{
                code:'1',
                name:'已应用',
            },{
                code:'0',
                name:'未应用',
            },],
            optionsProduct:[{
                code:'',
                name:'全部',
            }],
            listSystemObj:{
                "currentPage": 1,
                "pageSize": 20,
                "vo": {
                    companyName:'',//产品名称
                    productName:'',//承包产品
                    typeCode:'',//产品类型code
                    startTime:'',
                    endTime:'',
                }
            },
            tableData: [],
            checkedinformation: [],
        }
    },
    watch: {
    },
    mounted() {
        this.firstblood();
        this.init();
    },
    methods: {
        init(){
            DicContractProduct().then(res => {
                this.optionsProduct = this.optionsProduct.concat(res.data);
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
            contractorList(this.listSystemObj).then(res => {
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
            if(this.registeTime){
                this.listSystemObj.vo.startTime = this.registeTime[0];
                this.listSystemObj.vo.endTime = this.registeTime[1];
            }
            if(type == 'clear'){
                for (const i in this.listSystemObj.vo) {
                    this.listSystemObj.vo[i] = ''
                } 
                this.registeTime = [];
            }
            if(this.listSystemObj.currentPage!= 1){
                this.listSystemObj.currentPage = 1;
                this.$refs.pager.inputval = this.listSystemObj.currentPage;
                this.$refs.pager.pageNum = this.listSystemObj.currentPage;
            }
            this.firstblood();
        },
        handleClick(type,row){
            if (this.selected.id || type === 'new'){
            
                switch (type) {
                    case 'details':
                        this.dialogFormVisible = true;
                        this.formtitle = '查看';
                        this.isModify = false;
                        this.isView = true;
                        this.changeForm = this.selected;
                        break;
                    case 'new':
                        this.dialogFormVisible = true;
                        this.formtitle = '新增承包商';
                        this.isModify = false;
                        this.isView = false;
                        break;
                    case 'revise':
                        this.dialogFormVisible = true;
                        this.formtitle = '修改承包商';
                        this.isModify = true;
                        this.isView = false;
                        this.changeForm = this.selected;
                        break;
                    case 'delet':
                        this.$confirm('确认要删除吗？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            let userId = this.selected.id;
                            deleteContractor(userId).then(res => {
                                this.firstblood()
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                })
                            }).catch(err => {
                                this.$message({
                                    type: 'info',
                                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                                })
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            })
                        })
                        break;
                }
            } else {
                this.$message({
                type: "warning",
                message: "请选择一条列表数据!"
                });
            }
                //清除选中状态，避免影响下个操作
                // this.$refs.multipleTable.clearSelection();
        },
        // 判断是否选中
        getinfomation(selection) {
            // this.checkedinformation = selection
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
    .Contractor{
    }
</style>
