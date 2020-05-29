<template>
    <div class="identicalStyle clearfix" v-loading = "loading">
            <el-form :inline="true" :model="data" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
                <el-form-item label="货主账号" prop="pointName">
                    <el-input v-model="data.shipperName" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="平台运营人员" prop="orderSerial">
                    <el-input v-model="data.orgName" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item class="btnChoose fr"  style="margin-left:0;">
                    <el-button type="primary" icon="el-icon-search" plain :size="btnsize" @click="getdata_search">搜索</el-button>
                    <el-button type="info" icon="fontFamily aflc-icon-qingkong" :size="btnsize" plain @click="reset">清空</el-button>
                </el-form-item>
            </el-form>
            <div class="classify_info">
                <div class="btns_box">
                    <el-button type="primary" plain icon="el-icon-circle-plus" :size="btnsize" @click="handleClick('new')">新增</el-button>
                    <el-button type="primary" plain icon="el-icon-edit" :size="btnsize" @click="handleClick('revise')">修改</el-button>
                    <el-button type="primary" plain icon="el-icon-bell" :size="btnsize" @click="handleClick('status')">启用/禁用</el-button>
                </div>
                <div class="info_news">
                    <el-table
                        ref="multipleTable"
                        :data="tableDataTree"
                        stripe
                        border
                        height="100%"
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
                          prop="shipperInfo"
                          label="货主账号">
                        </el-table-column>
                        <el-table-column
                            sortable
                          prop="platInfo"
                          label="平台运营或客服人员">
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="bindingStartDate"
                          label="拦截开始时间">
                            <template slot-scope="scope">
                                {{scope.row.bindingStartDate | parseTime}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="bindingEndDate"
                          label="拦截结束时间">
                            <template slot-scope="scope">
                                {{scope.row.bindingEndDate | parseTime}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            sortable
                          prop="bindingSource"
                          label="绑定来源">
                            <template  slot-scope="scope">
                                {{ scope.row.bindingSource === '1' ? '收藏绑定' : '平台绑定' }}
                            </template>
                        </el-table-column>
                        <el-table-column
                            sortable
                          prop="usingStatus"
                          label="状态">
                            <template  slot-scope="scope">
                                {{ scope.row.usingStatus === '1' ? '启用' : '禁用' }}
                            </template>
                        </el-table-column>
                      </el-table>
                </div>
                
                <!-- 新增数据 -->
                <addClassfy :dialogFormVisible.sync = "dialogFormVisible" :formtitle = "formtitle" @renovate="Onrenovate" ></addClassfy>
                <!-- 修改数据 -->
                <changeclassify :dialogFormVisibleChange.sync = "dialogFormVisibleChange" :formtitle = "formtitle_change" @renovate="Onrenovate" :changeforms = 'changeforms'></changeclassify>
            </div>
            <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" /></div> </div>
    </div>
</template>

<script type="text/javascript">

import { data_dispatchList,data_ChangeStatus } from '@/api/dispatch/PlatForm.js'
import '@/styles/dialog.scss'
import { parseTime,formatTime } from '@/utils/index.js'
import addClassfy from './addclassify'
import changeclassify from './changeclassify'
import Pager from '@/components/Pagination/index'

    export default{

        data(){
            return{
                btnsize:'mini',
                loading:true,
                carNumber:'',//车主账号
                shipperNumber:'',//货主账号
                data:{
                    shipperName:'',
                    orgName:'',
                },//获取页面数据 后端要求传参{}
                changeforms:{},
                page:1,
                pagesize:20,
                formtitle:'新增平台专属',
                formtitle_change:'修改平台专属',
                currentPage4:1,
                dialogFormVisible: false,//新增弹窗
                dialogFormVisibleChange:false,//修改弹窗
                dialogFormVisible_change:false,
                centerDialogVisible:false,
                delDialogVisible:false,
                totalCount:0,
                information:'你想知道什么',
                delIDTree:'',
                checkedinformation:[],
                tableDataTree:[],
            }
        },
        components:{
            Pager,
            addClassfy,
            changeclassify
        },
        mounted(){
            this.firstblood();
        },  
        methods: {
             handlePageChange(obj) {
                this.page = obj.pageNum
                this.pagesize = obj.pageSize
                this.firstblood()
            },
            //子组件调用父组件刷新页面  
            Onrenovate(){
                this.firstblood();
            },
            // 获取翻页返回的数据
            handlePageChange (obj) {
                console.log(obj)
                // Object.assign(this.searchForm, obj)
                // this.fetchData()
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
                        message: '不可同时操作多项内容~'
                    })
                }
                else{
                    switch(type){
                        case 'new':
                            this.dialogFormVisible = true;
                            break;
                        case 'revise':
                            this.dialogFormVisibleChange = true; 
                            this.changeforms = Object.assign({},this.checkedinformation[0]) ;
                            break;
                        case 'status':
                            let statusID = [];
                            this.checkedinformation.map((item)=>{
                                return statusID.push(item.id)
                            })
                            statusID = statusID.join(',');
                            data_ChangeStatus(statusID).then(res=>{
                                this.firstblood();
                            })
                            break;
                    }
                }
                //清空选中内容以免影响其他操作
                this.$refs.multipleTable.clearSelection();
            },
            //刷新页面  
            firstblood(){
                this.loading = true ;
                data_dispatchList(this.page,this.pagesize,this.data).then(res=>{
                    console.log('res:',res.data.list)
                    
                    this.tableDataTree = res.data.list;
                    this.totalCount = res.data.totalCount;
                    this.tableDataTree.forEach(item => {
                        item.platInfo = item.orgPhone +'/'+item.orgName;
                        item.shipperInfo = item.shipperPhone+ '/' +item.shipperName;
                    })
                    this.loading = false ;
                }).catch(err => {
                    this.$message({
                        type: 'info',
                        message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                    })
                    this.loading = false;
                })
            },
            //模糊查询 分类名称或者code
            getdata_search(){
                this.firstblood();
            },
            //重置
            reset(){
                this.data = {
                    shipperName:'',
                    driverName:'',
                };
                this.firstblood();
            },
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .addclassify{
        .el-dialog{
            position: relative;
            width: 760px;
            .el-dialog__body{
                    margin:0 40px;
                    .el-input__inner{
                        height: 24px;
                        line-height: 24px;
                        color: #3e9ff1;
                    }
                .chooseinfo{
                    border:1px solid #d2d2d2;
                    margin-bottom: 20px;
                    .chooseinfo-item{
                        padding: 20px 10px;
                        p{
                            display: inline-block;
                            span{
                                color:red;
                            }
                        }
                        .el-input{
                            width: 150px;
                        }
                        .el-radio-group{
                            display: inline-block;
                            margin:0 9px;
                        }
                        .el-checkbox-group{
                            display: inline-block;
                            margin-left: 10px;
                        }
                    }
                }
                .completeinfo{
                    .detailinfo{
                        margin-bottom: 12px;
                        p{
                            width:120px;
                            text-align: right;
                            display: inline-block;
                            vertical-align: top;
                            span{
                                color:red;
                            }
                        }
                        
                        .el-input{
                            width: 70px;
                            height: 24px;
                            margin-right:6px;
                            .el-input__inner{
                                height:24px;
                                line-height: 24px;
                                padding:5px;
                                font-size: 12px;
                                font-weight: normal;
                                font-stretch: normal;
                                line-height: 20px;
                                letter-spacing: 0px;
                                color: #3e9ff1;
                            }
                        }
                        .dotted{
                            margin-right:9px;
                        }
                        .node{
                            display: inline-block;
                            width:28px;
                            text-align: left;
                            margin-right: 12px;
                        }
                        .morewidth{
                            width: 96px;
                        }
                        .remarks{
                            height: 14px;
                            font-family: MicrosoftYaHei;
                            font-size: 12px;
                            font-weight: normal;
                            font-stretch: normal;
                            line-height: 20px;
                            letter-spacing: 0px;
                            color: #999999;
                        }
                        .licensePicture{
                            width: 180px;
                            height: 116px;
                            line-height: 1.2;
                            display: inline-block;
                            .el-upload-dragger{
                                width: 180px;
                                height: 116px;
                                .el-icon-upload{
                                    margin: 15px 0 16px;
                                }
                                .el-upload__text{
                                    font-size: 12px;
                                }
                            }

                        }
                    }
                }
            }
        }
        
    }
    
</style>