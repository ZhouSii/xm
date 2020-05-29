<template>
    <div class="TwoColumns serviceArea clearfix" v-loading ="loading">
        <div class="columnsContainer">
            <div class="side_left">
                 <el-tree
                :data="cityTree"
                :props="defaultProps"
                default-expand-all
                :highlight-current = "true"
                 @node-click="handleNodeClick"
                >
                </el-tree>
            </div>
            <div class="side_right">
                <searchInfo @change="getSearchParam"></searchInfo>
                <div class="side_right_bottom clearfix">
                    <div class="btns_box clearfix">
                        <el-button type="primary" :size="btnsize" plain icon="el-icon-circle-plus" @click="handleClick('add')" v-has:SERVICE_SMALL_CAR_AREA_PRICE_ADD>新增</el-button>
                        <el-button type="primary" :size="btnsize" plain icon="el-icon-edit" @click="handleClick('revise')" v-has:SERVICE_SMALL_CAR_AREA_PRICE_UPDATE>修改</el-button>
                        <!-- <el-button type="primary" :size="btnsize" plain icon="el-icon-delete" @click="handleClick('delet')" v-has:SERVICE_SMALL_CAR_AREA_PRICE_DELETE>删除</el-button> -->
                        <el-button type="primary" :size="btnsize" plain icon="el-icon-bell" @click="handleClick('status')" v-has:SERVICE_SMALL_CAR_AREA_PRICE_USE>启用/禁用</el-button>
                    </div>
                    <div class="info_news">
                        <el-table
                            ref="multipleTable"
                            :data="tableData"
                            stripe
                            border
                            height="100%"
                            @row-click="clickDetails"
                            @selection-change = "getinfomation"
                            tooltip-effect="dark"
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
                            prop="areaName"
                            label="区域">
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
                            prop="standardPrice"
                            sortable
                            label="标准起步价">
                                <template slot-scope="scope">
                                    {{scope.row.standardPrice + '元' + ' （' + scope.row.standardKm + '公里）'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="outstripPrice"
                            sortable
                            label="标准超里程费">
                                <template slot-scope="scope">
                                    {{scope.row.outstripPrice + '元/公里'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="areaPrice"
                            sortable
                            label="区域起步价">
                                <template slot-scope="scope">
                                    {{scope.row.areaPrice + '元' + '' + '(' + scope.row.areaKm + '公里)'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="areaOutstripPrice"
                            sortable
                            label="区域超里程费">
                                <template slot-scope="scope">
                                    {{scope.row.areaOutstripPrice + '元/公里'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="usingStatus"
                            sortable
                            width="110"
                            label="状态">
                            <template  slot-scope="scope">
                                    {{ scope.row.usingStatus === '1' ? '启用' : '禁用' }}
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
        <AreaPrice :dialogAreaPrice.sync="dialogAreaPrice" :reviseForm = 'reviseForm' :formtitle = 'formtitle' :isModify = "isModify"   @close = "shuaxin"/>
        <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  ref="pager"/></div> </div>    
    </div>
</template>

<script type="text/javascript">

import {  data_GetCityInfo, data_ChangeStatus, data_Delete } from '@/api/server/areaPrice.js'
import { aflcProvinceCode } from '@/api/common.js'
import AreaPrice from './AreaPrice'
import Pager from '@/components/Pagination/index'
import searchInfo from '../component/searchInfo'
import { objectMerge2, parseTime } from '@/utils/'

import '@/styles/dialog.scss'
import '@/styles/side.scss'

export default{
      data() {
          return {
            loading:true,
              cityTree:[],
              dialogAreaPrice:false,
              isModify:false,
              formtitle:'',
              reviseForm:{},
              btnsize: 'mini',
              provinceId: '', // 省级列表
              searchInfo: {
                  valueService: '', // 服务分类
                  valueCarlist: '',
                  valueStatus: ''
                },
              page: 1,
              pagesize: 20,
              dataTotal: 0,
              checkedinformation: [],
              tableData: [],
              defaultProps: {
                  children: 'children',
                  label: 'name'
                }
            }
        },
      components: {
          Pager,
          searchInfo,
          AreaPrice
        },

      mounted() {
            this.firstblood()
        },
    
      methods: {
            shuaxin(){
                this.getCommonFunction();
            },
            getSearchParam(obj) {
              console.log(obj)
              this.searchInfo = Object.assign(this.searchInfo, obj);
                if(this.page!= 1){
                    this.page = 1;
                    this.$refs.pager.inputval = this.page;
                    this.$refs.pager.pageNum = this.page;
                }
              this.getCommonFunction();
            },
            handlePageChange(obj) {
                this.page = obj.pageNum
                this.pagesize = obj.pageSize
                this.getCommonFunction()
            },
            // 刷新页面
            firstblood() {
                aflcProvinceCode().then(res => {
                    console.log('aflcProvinceCode',res)
                    this.cityTree = res.data;
                    this.provinceId = this.cityTree[0].code; 
                    this.getCommonFunction();
                })
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
                        this.dialogAreaPrice = true;
                        this.formtitle = '';
                        break;
                    case 'revise':
                        this.reviseForm =objectMerge2({},this.checkedinformation[0]);
                        this.isModify = true;
                        this.dialogAreaPrice = true;
                        this.formtitle = '修改区域定价';
                        break;
                    case 'delet':
                        const delID = []
                        this.checkedinformation.map((item) => {
                            return delID.push(item.areaPid)
                        })
                        let config = delID.length>1 ?  delID.length + '条' : this.checkedinformation[0].areaName+'这条';
                        this.$confirm('确定要删除'+config+'数据吗？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then( ()=>{
                            data_Delete(delID).then(res => {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功'
                                })
                                this.getCommonFunction();
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
                            return statusID.push(item.areaPid)
                        })
                        data_ChangeStatus(statusID).then(res=>{
                            this.getCommonFunction();
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
            // 查询和获取对应区域的数据
            getCommonFunction() {
                this.loading = true;
                const data = Object.assign({}, { cityId: this.cityId, provinceId: this.provinceId }, this.searchInfo)
                // console.log(data);
                data_GetCityInfo(this.page, this.pagesize, data).then(res => {
                  console.log(res.data.list)
                    this.tableData = res.data.list;
                    this.dataTotal = res.data.totalCount;
                    this.loading = false;
                }).catch(err => {
                    this.$message({
                        type: 'info',
                        message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                    })
                    this.loading = false;
                })
            },
            handleNodeClick(data, checked) {
              console.log(data)
                if (checked.level === 1) {
                    this.provinceId = data.code;
                    this.cityId = '' ;
                }
                if (checked.level === 2) {
                    this.cityId = data.code;
                    this.provinceId = '' ;
                }
                this.getCommonFunction()
            },
            // 点击选中当前行
            clickDetails(row, event, column) {
              this.$refs.multipleTable.toggleRowSelection(row)
            },
            // 判断是否选中
            getinfomation(selection) {
              this.checkedinformation = selection
            },
        }
    }
</script>

<style type="text/css" lang="scss">
    .serviceArea{
        height:100%;    
        position: relative;
        margin-left:7px;
        padding-bottom: 40px;
    }
</style>
