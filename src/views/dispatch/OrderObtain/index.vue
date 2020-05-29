<template>
    <div class="orderObtain identicalStyle clearfix" v-loading="loading">
            <div class="classify_info">
                <div class="btns_box">
                    <el-button type="primary" plain icon="el-icon-circle-plus" :size="btnsize" @click="handleClick('new')" v-has:DISPATCH_OBTAIN_ADD>新增</el-button>
                    <el-button type="primary" plain icon="el-icon-edit" :size="btnsize" @click="handleClick('revise')" v-has:DISPATCH_OBTAIN_UPDATE>修改</el-button>
                    <!-- <el-button type="primary" plain icon="el-icon-delete" :size="btnsize" @click="handleClick('delet')" v-has:DISPATCH_OBTAIN_DELETE>删除</el-button> -->
                </div>
                <div class="info_news">
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        stripe
                        height="100%"
                        border
                        @selection-change = "getinfomation"
                        tooltip-effect="dark"
                        @row-click="clickDetails"
                        style="width: 100%"> 
                        <el-table-column
                            type="selection"
                            width="50">
                        </el-table-column>
                        <el-table-column label="序号" width="60">
                                <template slot-scope="scope">
                                    {{ (page - 1)*pagesize + scope.$index + 1 }}
                                </template>
                            </el-table-column>  
                        <el-table-column
                            sortable
                          prop="areaCodeName"
                          label="地区">
                        </el-table-column>
                        <el-table-column
                            sortable
                          prop="serivceCodeName"
                          label="服务类型">
                        </el-table-column>
                        <el-table-column
                            sortable
                          prop="carTypeName"
                          label="用车类型">
                        </el-table-column>
                        <el-table-column
                            sortable
                          prop="obtainTimeInterval"
                          label="公布中单时间间隔">
                          <template slot-scope="scope">
                                {{ scope.row.obtainTimeInterval +'秒'}}
                          </template>
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="obtainKmInterval" 
                            label="公布中单距离间隔">
                           <template slot-scope="scope">
                                {{ scope.row.obtainKmInterval +'公里'}}
                          </template>
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="rounds"
                            label="轮数">
                           <template slot-scope="scope">
                                {{ scope.row.rounds +'轮'}}
                          </template>
                        </el-table-column>
                        <!-- <el-table-column
                          prop="usingStatus"
                          label="状态">
                             <template  slot-scope="scope">
                                {{ scope.row.usingStatus === '1' ? '启用' : '禁用' }}
                            </template>
                        </el-table-column> -->
                      </el-table>
                </div>
                <!-- 新增数据 -->
                <addClassfy :dialogFormVisible.sync = "dialogFormVisible" :isModify="isModify" :changeforms="changeforms" :formtitle = "formtitle" @renovate="Onrenovate" ></addClassfy>
            </div>
            <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" /></div>
        </div>
    </div>
</template>
<script type="text/javascript">

import { data_dispatchList,data_DeletInfo } from '@/api/dispatch/OrderObtain.js'

import '@/styles/dialog.scss'
import addClassfy from './addclassify'
import Pager from '@/components/Pagination/index'

    export default{
        data(){
            return{
                btnsize:'mini',
                isModify:false,
                loading:true,
                page:1,//页码
                pagesize:20,//每页显示数量
                formtitle:'',
                currentPage4: 1,//显示当前页面
                dialogFormVisible: false,//新增弹窗
                totalCount:0,//当前页面数据总数
                searchInfo:{},//获取页面数据 后端要求传参{}
                changeforms:{},
                checkedinformation:[],
                tableData:[],
            }
        },
        components:{
            Pager,
            addClassfy,
        },
        mounted(){
            this.firstblood()
        },  
        methods: {
            handlePageChange(obj) {
                this.page = obj.pageNum;
                this.pagesize = obj.pageSize;
                this.firstblood();
            },
            //子组件调用父组件刷新页面  
            Onrenovate(){
                this.firstblood();
            },
            //点击选中当前行
            clickDetails(row, event, column){
                this.$refs.multipleTable.toggleRowSelection(row);
            },
            //判断是否选中
            getinfomation(selection){
                this.checkedinformation = selection;
            },

            handleClick(type){
                if(Object.keys(this.checkedinformation).length == 0 && type != 'new'){
                    //未选择任何修改内容的提示
                    return this.$message({
                        type: 'warning',
                        message: '请选择您要操作的内容~'
                    })
                }else if(this.checkedinformation.length >1 && type == 'revise'){
                    return this.$message({
                        type: 'warning',
                        message: '不可同时操作多项设置~'
                    })
                }
                else{
                    switch(type){
                        case 'new':
                            this.dialogFormVisible = true;
                            this.formtitle = '新增中单设置';
                            this.isModify = false;
                            break;
                        case 'revise':
                            this.dialogFormVisible = true;
                            this.formtitle = '修改中单设置';
                            this.isModify = true;
                            this.changeforms = Object.assign({},this.checkedinformation[0]) 
                            break;
                        case 'delet':
                            let delID = [];
                            this.checkedinformation.map((item)=>{
                                return delID.push(item.id)
                            });
                            let item = delID.length > 1 ? '这些' : '该条';
                            this.$confirm('确定要删除'+ item +'设置吗？', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then( ()=>{
                                data_DeletInfo(delID.join(',')).then(res=>{
                                // console.log(res)
                                    this.$message({
                                        type: 'success',
                                        message: '您选中的中单设置已被删除！',
                                        duration:2000
                                    })
                                    this.firstblood();
                                }).catch(err => {
                                    this.$message.error('操作失败，失败原因：',err.errorInfo)
                                })
                            }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消'
                                })
                            })
                            break;
                    }
                }
                //清空选中内容以免影响其他操作
                this.$refs.multipleTable.clearSelection();
            },
            //刷新页面和初始化数据
            firstblood(){
                this.loading = true;
                data_dispatchList(this.page,this.pagesize,this.searchInfo).then(res=>{
                    // console.log('res:',res)
                    this.totalCount = res.data.totalCount;
                    this.tableData = res.data.list;
                    this.loading = false;
                }).catch(err => {
                    this.$message({
                        type: 'info',
                        message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                    })
                    this.loading = false;
                })
            },
           
        }
    }
</script>

<style type="text/css" lang="scss">
    .orderObtain{
      
    }
</style>