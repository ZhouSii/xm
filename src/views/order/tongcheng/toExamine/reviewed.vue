<template>
    <div class="identicalStyle clearfix reviewed" v-loading="loading">
            <searchInfo @change="getSearchParam" :showType = 'tabType'></searchInfo>
            <div class="classify_info">
                <div class="info_news">
                    <el-table
                        ref="multipleTable"     
                        :data="tableData"   
                        stripe
                        border
                        align = "center"
                        height="100%"
                        tooltip-effect="dark"
                        @row-click="clickDetails"
                        style="width: 100%">
                       <!-- <el-table-column label="选择" width="60" align="center">
                            <template slot-scope="scope">
                                <el-radio class="radio"  v-model="radio"  :label="scope.row.orderSerial">&nbsp;</el-radio>
                            </template>
                        </el-table-column>  -->
                        <el-table-column label="序号" width="60">
                            <template slot-scope="scope">
                                {{ (listSystemObj.currentPage - 1)*listSystemObj.pageSize + scope.$index + 1 }}
                            </template>
                        </el-table-column>  
                        <el-table-column
                            sortable
                            prop="orderSerial"
                            label="订单号"
                            min-width="250">
                                <template  slot-scope="scope">
                                    <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.orderSerial}}</h4>
                                </template>
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="unnormal"
                            label="订单标识"
                            min-width="150">
                            <template  slot-scope="scope">
                                <span v-html="scope.row.unnormal"></span>
                            </template>
                        </el-table-column>
                       <el-table-column
                            :show-overflow-tooltip="true"
                            prop="provinceCityArea"
                            sortable
                            label="区域"
                            min-width="200">
                        </el-table-column>
                        <el-table-column
                            :show-overflow-tooltip="true"
                            prop="shipperMobile"
                            sortable
                            label="货主"
                            min-width="200">
                            <template  slot-scope="scope">
                                {{scope.row.shipperMobile+'-'}}{{scope.row.shipperName}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            :show-overflow-tooltip="true"
                            prop="shipperMobile"
                            sortable
                            label="车主"
                            min-width="200">
                            <template  slot-scope="scope">
                                {{scope.row.driverMobile+'-'}}{{scope.row.driverName+'-'}}{{scope.row.carNumber}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="下单时间"
                            prop="useTime"
                            sortable
                            min-width="160">
                            <template  slot-scope="scope">
                                {{ scope.row.useTime | parseTime}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="完成时间"
                            prop="finishOrderTime"
                            sortable
                            min-width="160">
                            <template  slot-scope="scope">
                                {{ scope.row.finishOrderTime | parseTime}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="driverIncome"
                            sortable
                            label="车主收入"
                            min-width="150">
                        </el-table-column>
                        <!-- <el-table-column
                            prop=""
                            sortable
                            label="待审核金额"
                            min-width="150">
                        </el-table-column>
                        <el-table-column
                            prop=""
                            sortable
                            label="可提现金额"
                            min-width="150">
                        </el-table-column> -->
                        <el-table-column
                            prop="reviewStatusName"
                            sortable
                            label="审查状态"
                            min-width="150">
                        </el-table-column>
                        <el-table-column
                            prop="complaintStatusName"
                            sortable
                            label="投诉处理状态"
                            min-width="150">
                        </el-table-column>
                        <el-table-column
                            prop="goodsDamageStatusName"
                            sortable
                            label="货损处理状态"
                            min-width="150">
                        </el-table-column>
                        <el-table-column
                            prop="unusualStatusName"
                            sortable
                            label="异常处理状态"
                            min-width="150">
                        </el-table-column>
                        <el-table-column
                            prop="auditStatusName"
                            sortable
                            label="审核状态"
                            min-width="150">
                        </el-table-column>
                        <el-table-column
                            prop="auditName"
                            sortable
                            label="订单审核人"
                            min-width="150">
                        </el-table-column>
                        <el-table-column
                            label="审核通过时间"
                            prop="reviewPassTime"
                            sortable
                            min-width="160">
                            <template  slot-scope="scope">
                                {{ scope.row.useTime | parseTime}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="reauditName"
                            sortable
                            label="复审人"
                            min-width="150">
                        </el-table-column>
                        <el-table-column
                            label="复审时间"
                            prop="reauditTime"
                            sortable
                            min-width="160">
                            <template  slot-scope="scope">
                                {{ scope.row.reauditTime | parseTime}}
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <!-- 页码 -->
            <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange" ref="pager"/></div> </div>    
    </div>
</template>

<script type="text/javascript">

import { orderManagerAuditList, } from '@/api/order/ordermange'
import Pager from '@/components/Pagination/index'
import searchInfo from './components/searchInfo'
import { parseShipStatus } from '@/utils/dict'

export default{
  props: {
    isvisible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Pager,
    searchInfo,
  },
  data() {
    return {
        btnsize: 'mini',
        tabType:'reviewed',
        loading: false, // 加载
        sizes: [20, 50, 100, 400],
        dataTotal: 0,
        radio: '',
        listSystemObj:{
            "currentPage": 1,
            "pageSize": 20,
            "vo": {
                "auditStatus": "AF0850603",//审核状态（待审核 AF0850601、待复审 AF0850602、已复审 AF0850603、复审不通过 AF0850604）
                "complaintStatus": "",//投诉处理状态
                "driverName": "",//driverName
                "endOrderDate": "",//下单结束时间
                "goodsDamageStatus": "",//货损处理状态
                "orderSerial": "",//订单流水号
                "provinceCityArea": "",//省市区
                "reviewStatus": "",//审查状态（待审查 AF0850101、审查中 AF0850102、已审查 AF0850103）
                "startOrderDate": "",//下单起始时间
                "unusualStatus": "",//异常处理状态
                exceptionType:'',//订单标识
                isAd:'',//是否广告车
            }
        },
        tableData: [],
        selected:{},
    }
  },
  watch: {
    isvisible: {
      handler(newVal, oldVal) {
            if (newVal) {
                this.firstblood()
              } else {
              }
          },
        // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
        immediate: true
    }
  },
  created() {

  },
  mounted() {
        setTimeout(()=>{
            this.$refs.multipleTable.$el.style.height = this.$refs.multipleTable.$el.offsetHeight + 'px';
        },300)
  },
  beforeDestroy() {
  },
  methods: {
    handlePageChange(obj) {
        this.listSystemObj.currentPage = obj.pageNum;
        this.listSystemObj.pageSize = obj.pageSize;
        this.firstblood();
    },
    // 刷新页面
    firstblood() {
        this.loading = true;
        orderManagerAuditList(this.listSystemObj).then(res => {
            // console.log('平台定向', res.data)
            this.tableData = res.data.list;
            this.dataTotal = res.data.totalCount;
            this.tableData.forEach(item => {
                item.unnormal = parseShipStatus(item.exceptionType);
            })
            this.loading = false;
        }).catch(err => {
            this.$message({
                type: 'info',
                message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
            })
            this.loading = false;
        })
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
        // this.$refs.multipleTable.toggleRowSelection(row);
        // this.radio = row.id;
        this.selected = row;
        // console.log('this.selected',this.selected)
    },
    // 详情弹窗
    pushOrderSerial(item) {
        this.$router.push({ name: '订单详情', query: { orderSerial: item.orderSerial }})
    },
    getSearchParam(obj) {
        this.listSystemObj.vo = Object.assign(this.listSystemObj.vo, obj);
        this.listSystemObj.vo.auditStatus = "AF0850603";
        if(this.listSystemObj.currentPage!= 1){
            this.listSystemObj.currentPage = 1;
            this.$refs.pager.inputval = this.listSystemObj.currentPage;
            this.$refs.pager.pageNum = this.listSystemObj.currentPage;
        }
        this.firstblood();
    },
  }
}
</script>

<style type="text/css" lang="scss">
    .reviewed{
        // .cell{
        //     .el-radio{
        //         width: 14px;
        //     }
        // }
    }
</style>
