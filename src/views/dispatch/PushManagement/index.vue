<template>
    <div class="identicalStyle PushManagement" v-loading="loading">
        <el-form  :inline="true" :model="listSystemObj.vo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="出发地" prop="totalStartArea">
                <el-input v-model="listSystemObj.vo.totalStartArea" clearable></el-input>
            </el-form-item>
            <el-form-item label="到达地"  prop="totalEndArea">
                <el-input v-model="listSystemObj.vo.totalEndArea" clearable></el-input>
            </el-form-item>
            <el-form-item label="可见物流"  prop="directionPushCode">
                <el-select v-model="listSystemObj.vo.directionPushCode">
                    <el-option 
                    v-for="item in optionsShowLogistics"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态"  prop="flag">
                <el-select v-model="listSystemObj.vo.flag">
                    <el-option 
                    v-for="item in optionsFlag"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="btnChoose fr"  style="margin-left:0;">
                <el-button type="primary" icon="el-icon-search" plain :size="btnsize" @click="handleSearch('search')">搜索</el-button>
                <el-button type="info" icon="fontFamily aflc-icon-qingkong" :size="btnsize" plain @click="handleSearch('clear')">清空</el-button>
            </el-form-item>
        </el-form>
        <div class="classify_info">
            <div class="btns_box">
                <el-button type="primary" icon="el-icon-circle-plus" plain @click="handleClick('new')" :size="btnsize">新增</el-button>
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
                    <el-table-column label="序号" width="60">
                        <template slot-scope="scope">
                            {{ (listSystemObj.currentPage - 1)*listSystemObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column> 
                    <el-table-column
                        prop="id"
                        :show-overflow-tooltip="true"
                        sortable
                        min-width="200"
                        label="所属线路">
                        <template slot-scope="scope">
                            <h4 class="needMoreInfo" @click="handleClick('details',scope.row)">{{scope.row.startProvince}}{{scope.row.startCity}}{{scope.row.startArea}}-{{scope.row.endProvince}}{{scope.row.endCity}}{{scope.row.endArea}}</h4>
                        </template>
                    </el-table-column> 
                    <el-table-column
                        prop="directionPush"
                        sortable
                        width="150"
                        label="可见物流">
                    </el-table-column>
                    <el-table-column
                        prop="noTack"
                        sortable
                        label="超时无抢单公海推送(分钟)">
                        <template slot-scope="scope">
                            {{ scope.row.noTack  ?scope.row.noTack : '-' }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="noContact"
                        sortable
                        label="超时无联系公海推送(分钟)">
                         <template slot-scope="scope">
                            {{ scope.row.noContact  ?scope.row.noContact : '-' }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="noTrade"
                        sortable
                        label="超时无成交公海推送(分钟)">
                         <template slot-scope="scope">
                            {{ scope.row.noTrade  ?scope.row.noTrade : '-' }}
                        </template>
                    </el-table-column>
                     <el-table-column
                        prop="flag"
                        sortable
                        width="150"
                        label="状态">
                        <template slot-scope="scope">
                            {{ scope.row.flag == '1' ?'已启用' : '已禁用' }}
                        </template>
                    </el-table-column>
                     <el-table-column
                        prop="createTime"
                        sortable
                        width="160"
                        label="创建时间">
                        <template slot-scope="scope">
                            {{ scope.row.createTime | parseTime }}
                        </template>
                    </el-table-column>
                    <el-table-column
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
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange" ref="pager"/></div> </div>    
        <add :dialogFormVisible.sync = "dialogFormVisible" :isView="isView" :isModify="isModify" :changeForm="changeForm" :formtitle = "formtitle"  @renovate="firstblood"/>
    </div>
</template>

<script type="text/javascript">
import { pushManagementList,deletePushManagement,statusOperator } from '@/api/dispatch/operationsManagement'
import Pager from '@/components/Pagination/index'
import add from './add'
import { DicShowlogistics } from '@/api/common'

export default{
    name:'PushManagement',
    components: {
        Pager,
        add,
    },
    data() {
        return {
            btnsize: 'mini',
            loading: false, // 加载
            dialogFormVisible:false,
            isModify:false,
            isView:false,
            formtitle:'',
            dataTotal: 0,
            changeForm:{},
            listSystemObj:{
                "currentPage": 1,
                "pageSize": 20,
                "vo": {
                    totalStartArea:'',//出发地
                    totalEndArea:'',//到达地
                    flag:'',
                    directionPushCode:''
                }
            },
            optionsFlag:[{
                code:'',
                name:'全部',
            },{
                code:'1',
                name:'已应用',
            },{
                code:'0',
                name:'已禁用',
            }],
            optionsShowLogistics:[{
                code:'',
                name:'全部',
            }],
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
            DicShowlogistics().then(res => {
                this.optionsShowLogistics = this.optionsShowLogistics.concat(res.data);
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
            pushManagementList(this.listSystemObj).then(res => {
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
                for (const i in this.listSystemObj.vo) {
                    this.listSystemObj.vo[i] = ''
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
                case 'details':
                    this.dialogFormVisible = true;
                    this.formtitle = '查看';
                    this.isModify = false;
                    this.changeForm = row;
                    this.isView = true;
                    break;
                case 'new':
                    this.dialogFormVisible = true;
                    this.formtitle = '新增推送设置';
                    this.isModify = false;
                    this.isView = false;
                    break;
                case 'revise':
                    this.dialogFormVisible = true;
                    this.formtitle = '修改推送设置';
                    this.isModify = true;
                    this.isView = false;
                    this.changeForm = row;
                    break;
                case 'delet':
                    this.$confirm('确认要删除吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let userId = row.id;
                        deletePushManagement(userId).then(res => {
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
              //清除选中状态，避免影响下个操作
            this.$refs.multipleTable.clearSelection();
        },
        // 判断是否选中
        getinfomation(selection) {
            this.checkedinformation = selection
        },
        // 点击选中当前行
        clickDetails(row, event, column) {
            this.$refs.multipleTable.toggleRowSelection(row)
        },
    }
}
</script>

<style type="text/css" lang="scss" scoped>
    .PushManagement{
    }
</style>
