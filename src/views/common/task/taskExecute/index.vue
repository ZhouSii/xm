<template>
    <div class="taskExeute clearfix">
             <div class="classify_searchinfo">
                <el-button type="primary"  plain  icon="el-icon-circle-plus" @click="creatTask('add')" v-has:SYSTEM_TASK_EXECUTE_MANAGE_ADD_EXECUTE>新增执行器</el-button>
                <el-button type="warning"  plain  icon="el-icon-edit" @click="creatTask('edit')" v-has:SYSTEM_TASK_EXECUTE_MANAGE_UPDATE_EXECUTE>编辑执行器</el-button>
                <el-button type="primary"  plain  icon="el-icon-delete" @click="remove" v-has:SYSTEM_TASK_EXECUTE_MANAGE_DELETE_EXECUTE>删除执行器</el-button>
            </div>
            <div class="classify_info">
                <div class="info_news">
                    <el-table
                        ref="multipleTable"
                        :data="tableExecute"
                        stripe
                        border
                        highlight-current-row
                        @current-change="handleCurrentTask"
                        align = "center"
                        height="100%"
                        tooltip-effect="dark"
                        style="width: 100%"> 
                        <el-table-column
                            align = "center"
                            fixed
                            label="排序"
                            prop="order"
                            width="55">
                           </el-table-column>
                        <el-table-column
                            align = "center"
                            fixed
                            prop="appName"
                            label="AppName">
                        </el-table-column>
                        <el-table-column
                        align = "center"
                          prop="title"
                          label="名称">
                        </el-table-column>
                        <el-table-column
                        align = "center"
                          prop="addressType"
                          label="注册方式">
                            <template  slot-scope="scope">
                                {{ scope.row.addressType == 0 ? '自动注册' : '手动录入' }}
                            </template>
                        </el-table-column>
                        <el-table-column
                        align = "center"
                          prop="registryList"
                          label="OnLine 机器">
                            <template  slot-scope="scope">
                                <div v-for="item in scope.row.registryList"  :key="item">
                                    <span  :class="scope.row.registryList ? 'registryStyle' : 'one'">{{ item ? item : null}}</span> 
                                </div>
                            </template>
                        </el-table-column>
                      </el-table>
                      <!-- 页码 -->
                    <div class="Pagination ">
                        <div class="block">
                            <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage4"
                            :page-size="pagesize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="dataTotal">
                            </el-pagination>
                        </div>
                    </div>
                    <!-- <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange" /></div> </div>     -->

                </div>
                
                <creatTaskExecuteComponent :dialogFormVisible.sync = "dialogFormVisible"  :editType = "editType" @renovate="Onrenovate" :taskForm = "taskForms" :formtitle = "formtitle"></creatTaskExecuteComponent>
            </div>
        <!-- loading   -->
        <!-- <spinner v-show="show"></spinner>  -->
        
    </div>
</template>

<script type="text/javascript">

import creatTaskExecuteComponent from './creatTaskExecuteComponent'
import '@/styles/dialog.scss'
import { data_taskExecuteList,data_removeTaskExecute } from '@/api/task/taskExecute.js'
// import spinner from '../../../spinner/spinner'

    export default{
        data(){
            return{
                formtitle:'新增执行器',//新增任务
                dialogFormVisible:false,
                test:null,
                tableExecute:[],
                currentPage4:1,
                pagesize:1,
                dataTotal:null,
                taskForms:{},
                tasktest:{},
                editType:null,//按钮类型
            }
        },
        components:{
            // spinner,
            creatTaskExecuteComponent

        },
        mounted(){
            this.firstblood();
            
            // console.log(this.$store)
        },  
        methods: {
            // 获取翻页返回的数据
            handlePageChange (obj) {
                console.log(obj)
                // Object.assign(this.searchForm, obj)
                // this.fetchData()
            },
            //单选中当前数据
            handleCurrentTask(val){
                console.log(val)
                this.tasktest = val;
            },
            
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pagesize = val ;
                this.firstblood();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.page = val;
                this.firstblood();
            },
          
            //刷新页面  
            firstblood(){
                data_taskExecuteList().then(res => {
                    console.log(res)
                    this.tableExecute = res.list;
                }).catch( err => {
                    console.log('err', err)
                    if(err.code == 200){
                        this.tableExecute = err.content;
                    }else{
                        this.$message.error('操作失败，失败原因：',err.msg)
                    }
                })
            },
           
            //模糊查询 分类名称或者code
            getdata_search(){
                this.firstblood();
            },
            //重置
            reset(){
                this.data = {
                    shipperName:null,
                    driverName:null,
                };
                this.firstblood();
            },
            creatTask(type){
                switch (type){
                    case 'add':
                        this.dialogFormVisible = true ;
                        this.editType = 'add';
                        this.taskForms = {};
                        break;
                    case 'edit':
                        this.dialogFormVisible = true ;
                        this.editType = 'edit';
                        this.taskForms = this.tasktest;
                }
            },
            //移除执行器
            remove(){
                data_removeTaskExecute(this.taskForms.id).catch( err => {
                    console.log(err)
                    if(err.code == 200){
                        this.firstblood();
                    }
                })
            },
            //
            Onrenovate(){
                this.firstblood();
            },

        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .taskExeute{
        &>.classify_searchinfo{
            h3{
                display: inline-block;
                font-size: 18px;
                margin: 0;
                line-height: 1;
                color: #444;
                font-weight: normal;
            }
        }
        .registryStyle{
            display: inline-block;
            background: #00a65a ;
            min-width: 10px;
            padding: 3px 7px;
            font-size: 12px;
            font-weight: 700;
            line-height: 1;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            border-radius: 10px;
            color: #fff;
        }
    }
</style>