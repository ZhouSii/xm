<template>
    <div class="identicalStyle clearfix toBeAudited" v-loading="loading">
            <searchInfo @change="getSearchParam" :showType = 'tabType'></searchInfo>
            <div class="classify_info">
                 <div class="btns_box">
                    <el-button type="primary" icon="el-icon-check" :size="btnsize" plain @click="handleClick('pass')">审核通过</el-button>
                    <el-button type="primary" icon="el-icon-edit-outline" :size="btnsize" plain @click="handleClick('ex')">审查订单</el-button>
                    <!-- <el-button type="primary" icon="el-icon-warning" :size="btnsize" plain @click="handleClick('complaint')" :disabled="complaintStatus">处理投诉</el-button>
                    <el-button type="primary" icon="el-icon-remove" :size="btnsize" plain @click="handleClick('damage')" :disabled="damageStatus">处理货损</el-button>
                    <el-button type="primary" icon="el-icon-info" :size="btnsize" plain @click="handleClick('abnormal')" :disabled="abnormalStatus">处理异常</el-button> -->
                    <!-- <el-button type="primary" :size="btnsize" plain @click="handleClick('ex')">查看审查</el-button>
                    <el-button type="primary" :size="btnsize" plain @click="handleClick('complaint')">查看投诉</el-button>
                    <el-button type="primary" :size="btnsize" plain @click="handleClick('damage')">查看货损</el-button>
                    <el-button type="primary" :size="btnsize" plain @click="handleClick('abnormal')">查看异常</el-button> -->
                </div>
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
                        @selection-change="getSelection" 
                        style="width: 100%">
                       <!-- <el-table-column label="选择" width="60" align="center">
                            <template slot-scope="scope">
                                <el-radio class="radio"  v-model="radio"  :label="scope.row.orderSerial">&nbsp;</el-radio>
                            </template>
                        </el-table-column>  -->
                        <el-table-column
                            label="选择"
                            type="selection"
                            width="50">
                        </el-table-column>
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
                            label="是否广告车"
                            prop="isAd"
                            sortable
                            min-width="150">
                            <template  slot-scope="scope">
                                {{ scope.row.isAd === "1" ? '是' : '否'}}
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
                    </el-table>
                </div>
            </div>
            <!-- 页码 -->
            <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange" ref="pager"/></div> </div>    
            <reviewDialog :dialogFormVisibleReview.sync="dialogFormVisibleReview"  @renovate="passOrder" :currentData="currentData"/>
            <exDialog :dialogFormVisibleEx.sync="dialogFormVisibleEx"  @renovate="passOrder" :currentData="currentData" :type="toBeAuditType"/>
    </div>
</template>

<script type="text/javascript">

import { orderManagerAuditList,orderManagerAuditPass } from '@/api/order/ordermange'
import Pager from '@/components/Pagination/index'
import searchInfo from './components/searchInfo'
import { objectMerge2 } from '@/utils/'
import { parseShipStatus } from '@/utils/dict'
import reviewDialog from './components/reviewDialog'
import exDialog from './components/exOrderDialog'
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
    reviewDialog,
    exDialog,
  },
  data() {
    return {
        btnsize: 'mini',
        tabType:'toBeAudited',
        loading: false, // 加载
        sizes: [20, 50, 100, 400],
        dataTotal: 0,
        radio: '',
        listSystemObj:{
            "currentPage": 1,
            "pageSize": 20,
            "vo": {
                "auditStatus": "AF0850601",//审核状态（待审核 AF0850601、待复审 AF0850602、已复审 AF0850603、复审不通过 AF0850604）
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
        complaintStatus:false,
        toBeAuditType:'ex',
        damageStatus:false,
        abnormalStatus:false,
        selectedArr:[],
        dialogFormVisibleReview:false,
        dialogFormVisibleEx:false,
        currentData:{},
        doActionArr:[],
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
        // this.selected = row;
        // console.log('this.selected',this.selected)
        // this.complaintStatus = (this.selected.complaintStatusName == '待处理' || this.selected.complaintStatusName == '处理中') ? false : true;
        // this.damageStatus = (this.selected.goodsDamageStatusName == '待处理' || this.selected.goodsDamageStatusName == '处理中') ? false : true;
        // this.abnormalStatus = this.selected.unusualStatusName == '未处理' ? false : true;
    },
    // 判断选中与否
    getSelection(val){
        // console.log('选中内容',val)
        this.selectedArr= val;
    },
    // 详情弹窗
    pushOrderSerial(item) {
        this.$router.push({ name: '订单详情', query: { orderSerial: item.orderSerial }})
    },
    getSearchParam(obj) {
        this.listSystemObj.vo = objectMerge2(this.listSystemObj.vo, obj);
        this.listSystemObj.vo.auditStatus = "AF0850601";
        if(this.listSystemObj.currentPage!= 1){
            this.listSystemObj.currentPage = 1;
            this.$refs.pager.inputval = this.listSystemObj.currentPage;
            this.$refs.pager.pageNum = this.listSystemObj.currentPage;
        }
        this.firstblood();
    },
    remove(val){
        if(val){
            var index;
            this.doActionArr.forEach((el,idx) => {
                if(el.orderSerial == val){
                    index = idx
                }
            })
            this.doActionArr.splice(index, 1);
        }
    },
    passOrder(val,classfy){
        this.remove(val);
        // console.log('val',val,classfy,this.doActionArr)
        if(this.doActionArr.length > 0){
            setTimeout(()=>{
                switch(classfy){
                    case 'pass':
                        this.dialogFormVisibleReview = true;
                        break;
                    case 'ex':
                        this.disType = 'ex';
                        this.dialogFormVisibleEx = true; 
                        break;
                }
                this.currentData = this.doActionArr[0];
            },500)
        }else{
            this.firstblood();
        }
    },
    handleClick(type,val){
        if(this.selectedArr.length > 0){
            switch(type){
                case 'pass':
                    this.doActionArr = this.selectedArr;
                    // this.$confirm('确认将订单通过审核吗？', '订单审核', {
                    //     confirmButtonText: '确定',
                    //     cancelButtonText: '取消',
                    //     type: 'warning'
                    // }).then(() => {
                    //     orderManagerAuditPass(this.selected.orderSerial).then(res => {
                    //         this.$message({
                    //             type: 'success',
                    //             message: '订单已通过审核!'
                    //         })
                    //         this.firstblood();
                    //     }).catch((err) => {
                    //         this.$message({
                    //             type: 'error',
                    //             message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                    //         })
                    //     });
                    // }).catch(() => {
                        
                    // });
                    // if(val){
                    //     let aa = remove(val,)
                    // }
                    // doActionArr = this.selectedArr.filter(el =>{
                    //     return el.orderSerial != val
                    // })
                    // console.log('doActionArr',doActionArr)
                    // this.dialogFormVisibleReview = true;
                    // this.currentData = doActionArr[0];
                    this.passOrder(val,type)
                    break;
                case 'ex':
                    this.doActionArr = this.selectedArr;
                    // this.$router.push({ name: '订单详情', query: { orderSerial: this.selected.orderSerial, currentTab: 'orderExamine' }});
                    // this.$router.push({ name: '订单详情', query: { orderSerial: this.selected.orderSerial, currentTab: 'orderExamine',tab:'查看订单'+this.selected.orderSerial }});
                    // this.eventBus.$emit('showOrderDetail', this.selected.orderSerial,true,'orderExamine')
                    this.passOrder(val,type)
                    break;
                case 'complaint':
                    // if(this.selected.complaintStatusName == '待处理' || this.selected.complaintStatusName == '处理中'){
                        this.$router.push({ name: '订单详情', query: { orderSerial: this.selected.orderSerial, currentTab: 'complaint' }});
                    // }else{
                    //     this.$message('该条订单没有投诉');
                    // }
                    break;
                case 'abnormal':
                    this.$router.push({ name: '小货车异常管理', params: { orderSerial: this.selected.orderSerial }});
                    break;
                case 'damage':
                    this.$router.push({ name: '订单详情', query: { orderSerial: this.selected.orderSerial, currentTab: 'physicalDamage' }});
                    break;
            }
            this.$refs.multipleTable.clearSelection();
        }else{
            this.$message({
                type: 'warning',
                message: '请至少选择一条列表数据!'
            });
        }
    }
  }
}
</script>

<style type="text/css" lang="scss">
    .toBeAudited{
        // .cell{
        //     .el-radio{
        //         width: 14px;
        //     }
        // }
    }
</style>
