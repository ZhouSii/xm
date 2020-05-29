<template>
    <div class="standarPrice identicalStyle clearfix" v-loading="loading">
            <searchInfo @change="getSearchParam" classfy="standarPrice"></searchInfo>
            <div class="classify_info">
                <div class="btns_box">
                    <el-button type="primary" :size="btnsize" plain icon="el-icon-circle-plus" @click="handleClick('add')" v-has:SERVICE_SMALL_CAR_STANDARD_PRICE_ADD>新增</el-button>
                    <el-button type="primary" :size="btnsize" plain icon="el-icon-edit" @click="handleClick('revise')" v-has:SERVICE_SMALL_CAR_STANDARD_PRICE_UPDATE>修改</el-button>
                    <!-- <el-button type="primary" :size="btnsize" plain icon="el-icon-delete" @click="handleClick('delet')" v-has:SERVICE_SMALL_CAR_STANDARD_PRICE_DELETE>删除</el-button> -->
                    <el-button type="primary" :size="btnsize" plain icon="el-icon-bell" @click="handleClick('status')" v-has:SERVICE_SMALL_CAR_STANDARD_PRICE_USE>启用/禁用</el-button>
                </div>
                <div class="info_news">
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
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
                        <el-table-column
                          prop="serviceName"
                          sortable
                          label="服务分类">
                        </el-table-column>
                        <el-table-column
                          prop="carTypeName"
                          sortable
                          label="车辆类型">
                        </el-table-column>
                        <el-table-column
                          prop="specName"
                          sortable
                          label="车辆规格">
                        </el-table-column>
                        <el-table-column
                          prop="carLength"
                          sortable
                          label="车长">
                            <template  slot-scope="scope"> 
                                {{scope.row.carLength + '*' + scope.row.carWidth + '*' + scope.row.carHeight + 'M'}}
                            </template>
                        </el-table-column>
                        <el-table-column
                          prop="capacityTon"
                          sortable
                          label="负载量">
                            <template  slot-scope="scope"> 
                                {{scope.row.capacityTon + '吨,' + ' ' + scope.row.capacitySquare + '方'}}
                            </template>
                        </el-table-column>
                        <el-table-column
                          prop="standardPrice"
                          sortable
                          label="标准起步价">
                            <template  slot-scope="scope"> 
                                {{scope.row.standardPrice + '元 ' + ' ' + '(' + scope.row.standardKm + '公里)'}}
                            </template>
                        </el-table-column>
                        <el-table-column
                          prop="outstripPrice"
                          sortable
                          label="标准超里程费">
                            <template  slot-scope="scope"> 
                                {{scope.row.outstripPrice + '元/公里'}}
                            </template>
                        </el-table-column>
                        <el-table-column
                          prop="servicePic"
                          sortable
                          label="服务图片">
                            <template  slot-scope="scope"> 
                                <img  :src="scope.row.servicePic" />
                            </template>
                        </el-table-column>
                        <el-table-column
                          prop="usingStatus"
                          sortable
                          label="状态">
                            <template  slot-scope="scope">
                                {{ scope.row.usingStatus === '1' ? '启用' : '禁用' }}
                            </template>
                        </el-table-column>
                      </el-table>
                    
                    <!-- 页码 -->
                    <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  ref="pager"/></div> </div>   
                    </div>
            </div>
             <StandarPrice :dialogStandarPrice.sync="dialogStandarPrice" :reviseForm = 'reviseForm' :formtitle = 'formtitle' :isModify = "isModify"   @close = "shuaxin"/>
    </div>
</template>

<script type="text/javascript">

import { data_GetInformation, data_ChangeStatus, data_DeletInfo, } from '@/api/server/standardPrice.js'
import { DicCarType } from '@/api/common.js'
import Pager from '@/components/Pagination/index'
import searchInfo from '../component/searchInfo'
import { objectMerge2, parseTime } from '@/utils/'
import StandarPrice from './standarPrice'
import '@/styles/dialog.scss'

export default{
      data() {
          return {
                loading:true,
                dialogStandarPrice:false,
                reviseForm:{},
                isModify:false,
                sizes: [20, 50, 100, 400],
                btnsize: 'mini',
                searchInfo: {
                    carType: '',
                    serivceCode: '',
                    usingStatus: ''
                    },
                page: 1,
                pagesize: 20,
                formtitle: '',
                dataTotal: 0,
                checkedinformation: [],
                tableData: [],
            }
        },
        components: {
            Pager,
            searchInfo,
            StandarPrice
        },
        mounted() {
            this.firstblood()
        },
        methods: {
            shuaxin(){
                this.firstblood();
            },
            getSearchParam(obj) {
              this.searchInfo = Object.assign(this.searchInfo, obj);
              if(this.page!= 1){
                    this.page = 1;
                    this.$refs.pager.inputval = this.page;
                    this.$refs.pager.pageNum = this.page;
                }
              this.firstblood();
            },
            // 获取翻页返回的数据
            handlePageChange(obj) {
              this.page = obj.pageNum;
                this.pagesize = obj.pageSize;
                this.firstblood();
            },
            handleClick(type){
                if (this.checkedinformation.length == 0 && type != 'add') {
                    // 未选择任何修改内容的提示
                   return this.$message({
                        message: '请选择要操作的数据~',
                        type: 'warning'
                    })
                } else if (this.checkedinformation.length > 1  && type == 'revise') {
                    return this.$message({
                        message: '不可同时修改多条数据~',
                        type: 'warning'
                    })
                     // 清除选中状态，避免影响下个操作
                    this.$refs.multipleTable.clearSelection();
                }
                switch(type){
                    case 'add':
                        this.isModify = false;
                        this.dialogStandarPrice = true;
                        this.formtitle = '新增标准定价';
                        break;
                    case 'revise':
                        this.reviseForm =objectMerge2({},this.checkedinformation[0]);
                        this.isModify = true;
                        this.dialogStandarPrice = true;
                        this.formtitle = '修改标准定价';
                        break;
                    case 'delet':
                        const delID = []
                        this.checkedinformation.map((item) => {
                            return delID.push(item.standardPid)
                        })
                        let config = delID.length>1 ?  delID.length + '条' : this.checkedinformation[0].serviceName+this.checkedinformation[0].carTypeName+'这条';
                        this.$confirm('确定要删除'+config+'数据吗？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then( ()=>{
                            data_DeletInfo(delID).then(res => {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功'
                                })
                                this.firstblood();
                            }).catch(err=>{
                                this.$message({
                                    type: 'info',
                                    message: '删除失败，原因：' + err.errorInfo ? err.errorInfo : err.text
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
                        const statusID = []
                        this.checkedinformation.map((item) => {
                            return statusID.push(item.standardPid)
                        })
                        data_ChangeStatus(statusID).then(res=>{
                            this.firstblood();
                        }).catch(err=>{
                            this.$message({
                                type: 'info',
                                message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                            })
                        })
                        break;
                }
                 // 清除选中状态，避免影响下个操作
                this.$refs.multipleTable.clearSelection();
            },
            // 点击选中当前行
            clickDetails(row, event, column) {
                this.$refs.multipleTable.toggleRowSelection(row)
            },
            // 判断是否选中
            getinfomation(selection) {
                this.checkedinformation = selection;
                console.log(selection)
            },
            // 刷新页面
            firstblood() {
                this.loading = true;
                data_GetInformation(this.page, this.pagesize, this.searchInfo).then(res => {
                    this.dataTotal = res.data.totalCount;
                    this.tableData = res.data.list;
                    this.loading = false;
                }).catch(err => {
                    this.$message({
                        type: 'info',
                        message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                    })
                    this.loading = false;
                })
            },
        }
    }
</script>

<style type="text/css" lang="scss">
    .standarPrice{
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
                                .el-radio{
                                    margin: 5px 20px 5px 0px; 
                                }
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
        .classify_info{
            .el-table{
                table{
                    width: 100% !important;
                    th,td{
                        text-align:center;
                    }
                }
                .cell{
                    img{
                        display: inline-block;
                        width: 100px;
                        height: 100%;
                        vertical-align: middle;
                    }
                }
            }
        }
    }
</style>
