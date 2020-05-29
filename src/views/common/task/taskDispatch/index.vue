<template>
    <div class="identicalStyle clearfix">
             <div class="classify_searchinfo">
                <label>执行器&nbsp;
                    <el-select v-model="searchForm.title" placeholder="请选择">
                        <el-option
                            v-for="item in taskOptions"
                            :key="item.id"
                            :label="item.title"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </label>
                <label>JobHandler&nbsp;
                   <el-input v-model="test" placeholder="请输入内容"></el-input>
                </label>    
                <el-button type="primary"  plain @click="getdata_search">查询</el-button>
                <el-button type="primary"  plain @click="creatTask" v-has:SYSTEM_TASK_TASK_MANAGE_ADD>新增任务</el-button>
            </div>
            <div class="classify_info">
                <div class="info_news">
                    <el-table
                        ref="multipleTable"
                        :data="aa"
                        stripe
                        border
                        align = "center"
                        height="100%"
                        @selection-change = "getinfomation"
                        @row-dblclick="moreinfo"
                        tooltip-effect="dark"
                        @row-click="clickDetails"
                        style="width: 100%"> 
                        <el-table-column
                        align = "center"
                            fixed
                             type="selection"
                             width="55">
                           </el-table-column>
                        <el-table-column
                        align = "center"
                        fixed
                          prop="shipperInfo"
                          label="JobKey">
                        </el-table-column>
                        <el-table-column
                        align = "center"
                          prop="platInfo"
                          label="描述">
                        </el-table-column>
                        <el-table-column
                        align = "center"
                          prop="interceptStartTime"
                          label="运行模式">
                        </el-table-column>
                        <el-table-column
                        align = "center"
                          prop="interceptEndTime"
                          label="Cron">
                        </el-table-column>
                        <el-table-column
                        align = "center"
                          prop="bindingSource"
                          label="负责人">
                            <template  slot-scope="scope">
                                {{ scope.row.bindingSource === '1' ? '收藏绑定' : '平台绑定' }}
                            </template>
                        </el-table-column>
                        <el-table-column
                        align = "center"
                          prop="usingStatus"
                          label="状态">
                            <template  slot-scope="scope">
                                {{ scope.row.usingStatus === '1' ? '启用' : '禁用' }}
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
                
                <creatTaskComponent :dialogFormVisible.sync = "dialogFormVisible" :formtitle = "formtitle"></creatTaskComponent>
                <!-- 删除信息提示 -->
                <!-- <div class="delData">
                    <el-dialog
                    title="提示"
                    :visible.sync="delDialogVisible">
                    <span class="delwarn"></span>
                    <span class="delinfo">确认删除信息吗 ?</span>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="test">确 定</el-button>
                        <el-button @click="delDialogVisible = false" type="info" plain>取 消</el-button>
                    </span>
                    </el-dialog>
                </div> -->
            </div>
        <!-- loading   -->
        <!-- <spinner v-show="show"></spinner>  -->
        
    </div>
</template>

<script type="text/javascript">

import creatTaskComponent from './creatTaskComponent'
import '@/styles/dialog.scss'
import { data_taskList } from '@/api/task/taskContral.js'
// import spinner from '../../../spinner/spinner'

    export default{
        data(){
            return{
                formtitle:'新增任务',//新增任务
                dialogFormVisible:false,
                test:null,
                aa:[],
                currentPage4:1,
                pagesize:1,
                dataTotal:null,
                searchForm:{
                    title:null,
                },
                taskOptions:[],//执行器下拉列表
            }
        },
        components:{
            // spinner,
            creatTaskComponent

        },
        mounted(){
            this.firstblood();
            this.getTaskMoreInfromation();
            // console.log(this.$store)
        },  
        methods: {
            // 获取翻页返回的数据
            handlePageChange (obj) {
                console.log(obj)
                // Object.assign(this.searchForm, obj)
                // this.fetchData()
            },
            //shuangji
            moreinfo(row, event){
                // console.log(row, event)
               
            },
            //点击选中当前行
            clickDetails(row, event, column){
                this.$refs.multipleTable.toggleRowSelection(row);
            },
            //判断是否选中
            getinfomation(selection){
                this.checkedinformation = selection;
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
                
            },
            getTaskMoreInfromation(){
                let params = 1 ;
                data_taskList(params).then(res => {
                    console.log(res)
                }).catch( err => {
                    console.log(err )
                    this.taskOptions = err.content.JobGroupList;
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
            creatTask(){
                console.log('123')
                this.dialogFormVisible = true ;
            }
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
   
</style>