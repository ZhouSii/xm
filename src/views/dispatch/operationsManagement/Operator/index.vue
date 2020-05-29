<template>
    <div class="identicalStyle ContractProduct" v-loading="loading">
        <el-form  :inline="true" :model="listSystemObj.vo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="运营人员" prop="name">
                <el-input v-model="listSystemObj.vo.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="联系号码"  prop="mobilePhone">
                <el-input v-model="listSystemObj.vo.mobilePhone" clearable></el-input>
            </el-form-item>
            <el-form-item class="btnChoose fr"  style="margin-left:0;">
                <el-button type="primary" icon="el-icon-search" plain :size="btnsize" @click="handleSearch('search')">搜索</el-button>
                <el-button type="info" icon="fontFamily aflc-icon-qingkong" :size="btnsize" plain @click="handleSearch('clear')">清空</el-button>
            </el-form-item>
        </el-form>
        <div class="classify_info">
            <div class="btns_box">
                <el-button type="primary" icon="el-icon-circle-plus" plain @click="handleClick('new')" :size="btnsize" v-has:DISPATCH_OPERATIONMANAGEMENT_OPERATOR_ADD>新增</el-button>
                <el-button type="primary" :size="btnsize" plain icon="el-icon-edit" @click="handleClick('revise')" v-has:DISPATCH_OPERATIONMANAGEMENT_OPERATOR_MODIFY>修改</el-button>
                <el-button type="primary" :size="btnsize" plain icon="el-icon-upload" @click="handleClick('status')" v-has:DISPATCH_OPERATIONMANAGEMENT_OPERATOR_ENABLEDISABLE >启用/禁用</el-button>
                <el-button type="primary" :size="btnsize" plain icon="el-icon-delete" @click="handleClick('delet')" v-has:DISPATCH_OPERATIONMANAGEMENT_OPERATOR_DELETE>删除</el-button>
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
                    @row-click="clickDetails"
                    tooltip-effect="dark"
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
                        prop="name"
                        sortable
                        label="产品名称">
                         <template slot-scope="scope">
                            <h4 class="needMoreInfo" @click="handleClick('details',scope.row)">{{ scope.row.name}}</h4>
                        </template>
                    </el-table-column> 
                    <el-table-column
                        prop="mobilePhone"
                        sortable
                        label="联系号码">
                    </el-table-column>
                    <el-table-column
                        prop="notifyWay"
                        sortable
                        label="通知方式">
                    </el-table-column>
                    <el-table-column
                        prop="messageType"
                        sortable
                        :show-overflow-tooltip="true"
                        label="消息类型">
                    </el-table-column>
                     <el-table-column
                        prop="flag"
                        sortable
                        width="150"
                        label="状态">
                        <template slot-scope="scope">
                            {{ scope.row.flag == '1' ?'启用' : '禁用' }}
                        </template>
                    </el-table-column>
                     <el-table-column
                        prop="createTime"
                        sortable
                        label="创建时间">
                        <template slot-scope="scope">
                            {{ scope.row.createTime | parseTime }}
                        </template>
                    </el-table-column>
                    <!-- <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                        <template slot-scope="scope">
                            <el-button
                            :size="btnsize"
                            type="primary"
                            plain
                            @click="handleClick('revise',scope.row)">修改</el-button>
                            <el-button
                            :size="btnsize"
                            :type="scope.row.flag == '0' ? 'primary' : 'info'"
                            :disabled="scope.row.id ? false : true"
                            plain
                            @click="handleClick('status',scope.row)">{{scope.row.flag == 0 ? '启用' : '禁用'}}</el-button>
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
import { operatorList,deleteOperator,statusOperator } from '@/api/dispatch/operationsManagement'
// import { DicTradeCarrier } from '@/api/common.js'
import Pager from '@/components/Pagination/index'
import add from './add'

export default{
    name:'ContractProduct',
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
            listSystemObj:{
                "currentPage": 1,
                "pageSize": 20,
                "vo": {
                    name:'',//运营人姓名
                    mobilePhone:'',//运营员电话
                }
            },
            tableData: [],
            checkedinformation: [],
        }
    },
    watch: {
    },
    mounted() {
        this.firstblood()
    },
    methods: {
        handlePageChange(obj) {
            this.listSystemObj.currentPage = obj.pageNum;
            this.listSystemObj.pageSize = obj.pageSize;
            this.firstblood();
        },
        // 刷新页面
        firstblood() {
            this.loading = true
            operatorList(this.listSystemObj).then(res => {
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
                    name:'',//运营人姓名
                    mobilePhone:'',//运营员电话
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
            if (this.selected.id || type === 'new'){

                switch (type) {
                    case 'details':
                        this.dialogFormVisible = true;
                        this.formtitle = '查看';
                        this.isModify = false;
                        this.changeForm = this.selected;
                        this.isView = true;
                        break;
                    case 'new':
                        this.dialogFormVisible = true;
                        this.formtitle = '新增运营人员';
                        this.isModify = false;
                        this.isView = false;
                        break;
                    case 'revise':
                        this.dialogFormVisible = true;
                        this.formtitle = '修改运营人员';
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
                            deleteOperator(userId).then(res => {
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
                    case 'status':
                        let message = this.selected.flag == '0' ? '确认启用当前运营人员吗？' :'确认禁用当前运营人员吗？';
                        this.$confirm(message, '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            let userId = this.selected.id;
                            let status =  this.selected.flag == '0' ? '1' : '0';
                            statusOperator(userId,status).then(res => {
                                this.firstblood()
                                this.$message({
                                    type: 'success',
                                    message: this.selected.flag == '0' ? '启用成功!' : '禁用成功!'
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
    .ContractProduct{
    }
</style>
