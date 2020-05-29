<template>
    <div class="TwoColumns businessGroup clearfix" v-loading ="loading">
        <div class="columnsContainer">
            <div class="side_left">
                 <el-tree
                 ref="businessGroupTree"
                :data="cityTree"
                node-key="id"
                :props="defaultProps"
                :expand-on-click-node="false"
                default-expand-all
                :highlight-current = "true"
                 @node-click="handleNodeClick"
                >
                </el-tree>
            </div>
            <div class="side_right">
                <div class="side_right_bottom clearfix">
                    <div class="btns_box clearfix">
                        <el-button type="primary" :size="btnsize" plain icon="el-icon-circle-plus" @click="handleClick('new')" v-has:SYSTEM_BUSINESS_GROUP_ADD>新增业务分组</el-button>
                        <el-button type="primary" :size="btnsize" plain icon="el-icon-edit" :disabled = "currentTreeId == '1'" @click="handleClick('revise')" v-has:SYSTEM_BUSINESS_GROUP_UPDATE>修改业务分组</el-button>
                        <el-col class="org-name"><h4>{{currentName}}</h4></el-col>
                    </div>
                    <div class="info_news">
                        <el-table
                        :data="tableData"
                        border
                        ref="multipleTable" 
                        stripe
                        align = "center"
                        height="100%"   
                        tooltip-effect="dark"
                        style="width: 100%"
                        >
                            <el-table-column label="序号" width="60">
                                <template slot-scope="scope">
                                    {{ (listSystemObj.currentPage - 1)*listSystemObj.pageSize + scope.$index + 1 }}
                                </template>
                            </el-table-column>  
                            <el-table-column
                                prop="name"
                                label="姓名"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="mobile"
                                label="手机号"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="userTypeName"
                                label="用户类型"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="groupName"
                                label="所属业务组"
                                >
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>  
        </div>
        <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  ref="pager"/></div> </div>    
        
        <newBusinessGroup :dialogFormVisible.sync = "dialogFormVisible" @renovate="Onrenovate" :currentTreeId="currentTreeId" :isModify="isModify" :formtitle = "formtitle"/>
    </div>
</template>   

<script type="text/javascript">

import { getAllBusinessGroup,aflcBusinessGroupUserList } from '@/api/company/businessGroup'
import { objectMerge2 } from '@/utils/'
import Pager from '@/components/Pagination/index'
import newBusinessGroup from './newBusinessGroup'

export default{
    data() {
        return {
            dialogFormVisible:false,
            isModify:false,
            loading:true,
            btnShow:false,
            inputSize:'small',
            cityTree:[],
            btnsize: 'mini',
            tableData: [],
            dataTotal:0,
            listSystemObj:{
                "currentPage": 1,
                "pageSize": 20,
                "vo": {
                    groupCode:'',
                }
            },
            defaultProps: {
                children: 'children',
                label: 'groupName'
            },
            currentTreeId:'',
            currentGroupCode:'',
            currentName:'',
            formtitle:'',
        }
    },
    components: {
        Pager,
        newBusinessGroup
    },
    mounted() {
        this.firstblood();
    },
    methods: {
        handlePageChange(obj) {
            this.listSystemObj.currentPage = obj.pageNum;
            this.listSystemObj.pageSize = obj.pageSize;
            this.getCommonFunction();
        },
        // 刷新页面
        firstblood() {
            getAllBusinessGroup().then(res => {
                this.cityTree = res.data;
                this.listSystemObj.vo.groupCode = this.currentGroupCode ? this.currentGroupCode : this.cityTree[0].groupCode;
                this.currentName = this.currentName ? this.currentName : this.cityTree[0].groupName;
                this.currentTreeId = this.cityTree[0].id;
                this.getCommonFunction();
            }).catch(err => {
                this.$message({
                    type: 'info',
                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                })
                this.loading = false;
            })
        },
        handleClick(type,row){
            switch(type){
                case 'revise':
                    this.formtitle = '修改业务组';
                    this.dialogFormVisible = true;
                    this.isModify = true;
                    break;
                case 'new':
                    this.formtitle = '新增业务组';
                    this.dialogFormVisible = true;
                    this.isModify = false;
                    break;
            }
        },
        // 查询和获取对应区域的数据
        getCommonFunction() {
            this.loading = true;
            aflcBusinessGroupUserList(this.listSystemObj).then(res => {
                this.tableData = res.data.list;
                this.dataTotal = res.data.totalCount;
                this.loading = false;
            }).catch(err => {
                this.$message({
                    type: 'info',
                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                })
                this.loading = false;
            })
        },
        handleNodeClick(data, checked) {
            this.listSystemObj.vo.groupCode = data.groupCode;
            this.currentGroupCode = data.groupCode;
            this.currentName = data.groupName;
            this.currentTreeId = data.id;
            this.getCommonFunction();
        },
        Onrenovate(){
            // this.dialogFormVisible = false;
            this.firstblood();
        }
    }
}
</script>

<style type="text/css" lang="scss">
    .businessGroup{
        height:100%;    
        position: relative;
        margin-left:7px;
        padding-bottom: 0px;
        .el-checkbox{
            display: none;
            margin: 60px;
        }
        .el-tree-node__children{
            .el-checkbox{
                display: block
            }

        }
    }
</style>
