<template>
    <div class="identicalStyle creatQRCode" v-loading="loading">
            <el-form  :inline="true" :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
                <el-form-item label="业务员" prop="salesman">
                    <el-input v-model="searchInfo.salesman" clearable>
                    </el-input>            
                </el-form-item>
                <el-form-item label="渠道名称" prop="channal">
                    <!-- <el-input v-model="searchInfo.channelName" maxlength="20" clearable>
                    </el-input> -->
                    <selectChannel  @change = "getVal"  v-model="searchInfo.channal"/>
                </el-form-item>
                <el-form-item class="btnChoose fr"  style="margin-left:0;">
                    <el-button type="primary" icon="el-icon-search" plain :size="btnsize" @click="handleSearch('search')">搜索</el-button>
                    <el-button type="info" icon="fontFamily aflc-icon-qingkong" :size="btnsize" plain @click="handleSearch('clear')">清空</el-button>
                </el-form-item>
            </el-form>
            <div class="classify_info">
                <!-- <div class="btns_box">
                    <el-button type="primary" icon="el-icon-circle-plus" plain @click="handleSearch('appoint')" :size="btnsize">新增</el-button>
                    <el-button type="primary" icon="el-icon-delete" plain @click="handleSearch('cancel')" :size="btnsize">删除</el-button>
                </div> -->
                <div class="info_news" style="height:89%">
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
                        <!-- <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column> -->
                        <el-table-column label="序号" sortable width="60">
                            <template slot-scope="scope">
                                {{ (page - 1)*pagesize + scope.$index + 1 }}
                            </template>
                        </el-table-column>  
                        <el-table-column
                            sortable
                            prop="salesman"
                            label="业务员"
                            width="160">
                        </el-table-column>
                        <el-table-column
                            prop="channelName"
                            :show-overflow-tooltip="true"
                            sortable
                            label="渠道名称"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="regisShipper"
                            :show-overflow-tooltip="true"
                            sortable
                            label="注册货主"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="cartificationeShipper"
                            :show-overflow-tooltip="true"
                            sortable
                            label="认证货主"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="shipperOrdernum"
                            sortable
                            label="货主下单数量"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="regisDriver"
                            sortable
                            label="注册车主"
                            width="160">
                        </el-table-column>
                        <el-table-column
                            prop="cartificationeDriver"
                            sortable
                            label="认证车主"
                            width="160">
                        </el-table-column>
                        <el-table-column
                            prop="regisLogisticsCompany"
                            sortable
                            label="注册物流公司"
                            width="160">
                        </el-table-column>
                        <el-table-column
                            prop="cartificationeLogisticsCompany"
                            sortable
                            label="认证物流公司"
                            width="160">
                        </el-table-column>
                        <el-table-column
                            prop="logisticsCompanyOrdernum"
                            sortable
                            label="物流公司下单数量"
                            width="160">
                        </el-table-column>
                    </el-table>
                </div>
            </div>   
                <!-- 页码 -->
            <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  ref="pager"/></div> </div>    
    </div>
</template>

<script type="text/javascript">

import { aflcChannelStatistics } from '@/api/server/QRCode.js'
import { parseTime, pickerOptions2 } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
import selectChannel from '@/components/selectTree/QRcode'

export default{
      props: {
          isvisible: {
              type: Boolean,
              default: false
            }
        },
      components: {
            Pager,
            selectChannel
        },
      data() {
          return {
              btnsize: 'mini',
              loading: true, // 加载
              sizes: [20, 50, 100, 400],
              pagesize: 20, // 初始化加载数量
              page: 1, // 初始化页码
              dataTotal: 0,
              searchInfo: {
                    channal:'',//渠道名称
                    salesman:'',//业务员
                },
              tableData: [],
              checkedinformation: [],
            }
        },
      watch: {
          isvisible: {
              handler(newVal, oldVal) {
                  if (newVal) {
                        this.firstblood()
                    } else{
                    }
                },
                // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
              immediate: true
            }
        },
      created() {

        },
      mounted() {
            // this.firstblood();
        },
      beforeDestroy() {
        },
      methods: {
           getVal(val){
                this.searchInfo.channal = val;
            },
          handlePageChange(obj) {
              this.page = obj.pageNum
                this.pagesize = obj.pageSize
                this.firstblood()
            },
            // 刷新页面
          firstblood() {
                this.loading = true;
                aflcChannelStatistics(this.page, this.pagesize, this.searchInfo).then(res => {
                    this.tableData = res.data.list;
                    this.dataTotal = res.data.totalCount;
                    this.loading = false;
                })
            },
            // 模糊查询 分类名称或者code
          handleSearch(type) {
              switch (type) {
                case 'search':
                    
                    break
                case 'clear':
                    this.$refs.ruleForm.resetFields();
                    break
                }
                if(this.page!= 1){
                    this.page = 1;
                    this.$refs.pager.inputval = this.page;
                    this.$refs.pager.pageNum = this.page;
                }
                this.firstblood()
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
    .creatQRCode{
        height: 100%;
    }
</style>
