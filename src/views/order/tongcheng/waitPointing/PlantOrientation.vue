<template>
    <div class="identicalStyle clearfix plantOrigin" v-loading="loading">
            <searchInfo @change="getSearchParam"></searchInfo>
            <div class="classify_info">
                <div class="btns_box">
                    <el-button type="primary" icon="el-icon-edit" plain @click="handleSearch('appoint')" :size="btnsize" v-has:ORDER_CITY_WIDE_ORDER_WIAT_ASSIGN_ASSIGN_DRIVER>指派司机</el-button>
                    <el-button type="primary" icon="el-icon-edit" plain @click="handleSearch('Newappoint')" :size="btnsize">New指派司机</el-button>
                    <!-- <el-button type="primary" plain @click="handleSearch('search')" :size="btnsize" v-has:ORDER_CITY_WIDE_ORDER_WIAT_ASSIGN_PUSH_OPEN>推回公海</el-button> -->
                    <el-button type="primary" icon="el-icon-warning" plain @click="handleSearch('cancel')" :size="btnsize" v-has:ORDER_CITY_WIDE_ORDER_WIAT_ASSIGN_CANCLE>取消订单</el-button>
                    <!-- <el-button type="primary" plain @click="handleSearch('search')" :size="btnsize" v-has:ORDER_CITY_WIDE_ORDER_WIAT_ASSIGN_ADD>新增订单</el-button> -->
                    <!-- <el-button type="primary" plain @click="handleSearch('search')" :size="btnsize">导出Exce</el-button> -->
                </div>
                <div class="info_news">
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
                            prop="orderSerial"
                            label="订单号"
                            min-width="250">
                                <template  slot-scope="scope">
                                    <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.orderSerial}}</h4>
                                </template>
                        </el-table-column>
                        <el-table-column
                            prop="orderType"
                            sortable
                            label="服务分类"
                            min-width="150">
                        </el-table-column>
                        <el-table-column
                            :show-overflow-tooltip="true"
                            prop="provinceCityArea"
                            sortable
                            label="区域"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            :show-overflow-tooltip="true"
                            prop="shipperMobile"
                            sortable
                            label="货主账号"
                            min-width="150">
                        </el-table-column>
                        <el-table-column
                            :show-overflow-tooltip="true"
                            prop="shipperName"
                            sortable
                            label="货主姓名"
                            min-width="150">
                        </el-table-column>
                        <el-table-column prop="shipperSalesmanName" min-width="150" sortable label="货主所属业务员">
                            <!-- <template slot-scope="scope">
                                {{scope.row.shipperSalesmanName ? scope.row.shipperSalesmanName : '暂无' }}
                            </template> -->
                        </el-table-column>
                        <el-table-column
                            prop="usedCarType"
                            sortable
                            label="所需车型"
                            min-width="150">
                        </el-table-column>
                         <el-table-column
                          sortable
                          :show-overflow-tooltip="true"
                          prop="totalAmount"
                          label="运费总额（元）"
                          min-width="150">
                          <!-- <template slot-scope="scope">
                            <span v-if="scope.row.aflcOrderExpenses">{{scope.row.aflcOrderExpenses.totalOrderPrice ? scope.row.aflcOrderExpenses.totalOrderPrice : ''}}</span>
                            <span v-else></span>
                          </template> -->
                      </el-table-column> 
                        <el-table-column
                            prop="useCarTime"
                            sortable
                            label="用车时间"
                            min-width="160">
                              <template  slot-scope="scope">
                                  {{ scope.row.useCarTime | parseTime}}    
                              </template>
                        </el-table-column>
                        <el-table-column
                            label="订单类型"
                            prop="orderClass"
                            sortable
                            min-width="150">
                              <template  slot-scope="scope">
                                  {{ scope.row.orderClass == '1' ? '即时订单' : '预约订单' }}
                              </template>
                        </el-table-column>
                        <el-table-column
                            label="付款状态"
                            prop="payStatus"
                            sortable
                            min-width="150">
                        </el-table-column>
                         <!-- <el-table-column
                            label="提货地"
                            prop="aflcOrderAddresses"
                            sortable
                            :show-overflow-tooltip="true"
                            width="250">
                            <template  slot-scope="scope">
                                {{ scope.row.aflcOrderAddresses[0].viaAddressName}}{{scope.row.aflcOrderAddresses[0].viaAddress ? '('+scope.row.aflcOrderAddresses[0].viaAddress+')' : ''}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="目的地"
                            prop="aflcOrderAddresses"
                            sortable
                            :show-overflow-tooltip="true"
                            width="250">
                            <template  slot-scope="scope">
                                {{ scope.row.aflcOrderAddresses[scope.row.aflcOrderAddresses.length-1].viaAddressName }}{{scope.row.aflcOrderAddresses[scope.row.aflcOrderAddresses.length-1].viaAddress ? '('+scope.row.aflcOrderAddresses[scope.row.aflcOrderAddresses.length-1].viaAddress+')' : ''}}
                            </template>
                        </el-table-column> -->
                        <!-- <el-table-column
                            prop="aflcOrderAddresses"
                            label="配送路径"
                            width="500">
                            <template  slot-scope="scope">
                                <p class="aflcOrderAddresses" v-for="(obj,idx) in scope.row.aflcOrderAddresses" :key="obj.id">
                                    <span v-if="idx == 0">发货地：</span>
                                    <span v-else-if="idx == scope.row.aflcOrderAddresses.length-1">收货地：</span>
                                    <span v-else>途径地{{ scope.row.aflcOrderAddresses.length >3 ? idx : ''}}：</span>
                                    {{obj.viaAddressName}}
                                </p>
                            </template>
                        </el-table-column> -->
                        <el-table-column
                            label="下单时间"
                            prop="createTime"
                            sortable
                            min-width="160">
                            <template  slot-scope="scope">
                                {{ scope.row.createTime | parseTime}}
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
                <!-- 页码 -->
            <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange" ref="pager"/></div> </div>    

            <cancelCompnent :dialogVisible.sync="dialogVisible" :orderSerial = "currentOrderSerial"   @close = "shuaxin"/>
            <appointDriver :dialogFormVisible.sync = "dialogFormVisible" :orderSerial = "appontOrderSerial" @close = "shuaxin" ></appointDriver>
    </div>
</template>

<script type="text/javascript">

import { eventBus } from '@/eventBus'
import { orderStatusList,orderManager2Waitappoint } from '@/api/order/ordermange'
import Pager from '@/components/Pagination/index'
import searchInfo from './components/searchInfo'
import cancelCompnent from '../components/cancel'
import appointDriver from '../components/appointDriver'
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
    cancelCompnent,
    appointDriver
  },
  data() {
    return {
      btnsize: 'mini',
      dialogVisible: false,
      dialogFormVisible: false,
      appontOrderSerial: '',
      currentOrderSerial: '',
      timeOutPlant: null,
      loading: false, // 加载
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      dataTotal: 0,
      searchInfo: {
            // belongCity: '', // 区域
            // shipperName: '', // 货主
            // startOrderDate: '', // 下单起始时间
            // endOrderDate: '', // 下单结束时间
            // orderSerial: '', // 订单号
            // orderStatus: 'AF0080501',
            // parentOrderStatus: 'AF00805', // 订单状态
            // payTimeType:'',//支付时机(null：立即支付，0：收货时付款，1：发货时付款)
            "belongCity": "",
            "endOrderDate": "",
            "orderSerial": "",
            "orderStatus": "AF0080501",
            "shipperInfo": "",
            "startOrderDate": ""
          },
      tableData: [],
      dialogFormVisible_details: false, // 详情弹窗
      DetailsOrderSerial: '',
      checkedinformation: []
    }
  },
  watch: {
    isvisible: {
      handler(newVal, oldVal) {
            if (newVal) {
                this.firstblood()
                this.timeOutPlant = setInterval(this.firstblood,10*1000);
              } else {
                clearInterval(this.timeOutPlant)
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
    clearInterval(this.timeOutPlant);
    this.timeOutPlant = null;
  },
  methods: {
    handlePageChange(obj) {
      this.page = obj.pageNum
      this.pagesize = obj.pageSize
      this.firstblood()
    },
    getParentCount(){
        eventBus.$emit('getOrderCount');
    },
    // 刷新页面
    firstblood() {
        this.loading = true
        orderManager2Waitappoint(this.page, this.pagesize, this.searchInfo).then(res => {
            // console.log('平台定向', res.data)
            this.tableData = res.data.list
            this.dataTotal = res.data.totalCount

            // this.tableData.forEach(item => {
            //     item.aflcOrderAddresses.sort(function(a, b) {
            //           return a.viaOrder - b.viaOrder
            //         })
            //   })
            this.loading = false
          }).catch(err => {
            this.$message({
                type: 'info',
                message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
            })
            this.loading = false;
        })
        // this.getParentCount();
        this.$emit('totalCount')
    },
    // 模糊查询 分类名称或者code
    handleSearch(type) {
        // console.log(this.chooseTime)
      switch (type) {
            case 'appoint':
              if (this.checkedinformation.length == 0) {
                  return this.$message({
                      type: 'info',
                      message: '请选择一个订单'
                    })
                } else if (this.checkedinformation.length > 1) {
                    return this.$message({
                        type: 'info',
                        message: '只能选择一个订单'
                      })
                  } else {
                    this.appontOrderSerial = this.checkedinformation[0].orderSerial
                    this.dialogFormVisible = true
                  }
              break
            case 'cancel':
            //   console.log(this.checkedinformation.length)
              if (this.checkedinformation.length == 0) {
                  return this.$message({
                      type: 'info',
                      message: '请选择一个订单'
                    })
                } else if (this.checkedinformation.length > 1) {
                    return this.$message({
                        type: 'info',
                        message: '只能选择一个订单'
                      })
                  } else {
                    this.currentOrderSerial = this.checkedinformation[0].orderSerial
                    this.dialogVisible = true
                  }
              break
            case 'Newappoint':
                    if (this.checkedinformation.length == 0) {
                        return this.$message({
                            type: 'info',
                            message: '请选择一个订单'
                        })
                } else if (this.checkedinformation.length > 1) {
                        return this.$message({
                            type: 'info',
                            message: '只能选择一个订单'
                        })
                }else {
                this.$router.push({ name: '小货车待指派地图', query: { orderSerial: this.checkedinformation[0].orderSerial }})
                }
                break
          }
    },
    // 判断是否选中
    getinfomation(selection) {
      this.checkedinformation = selection
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    // 详情弹窗
    pushOrderSerial(item) {
        // console.log(item)
        // this.dialogFormVisible_details = true;
        // this.DetailsOrderSerial = item.orderSerial;
        this.$router.push({ name: '订单详情', query: { orderSerial: item.orderSerial }})
    },
    getSearchParam(obj) {
        // console.log(obj)
        this.searchInfo = Object.assign(this.searchInfo, obj,{orderStatus:'AF0080501'});
        if(this.page!= 1){
            this.page = 1;
            this.$refs.pager.inputval = this.page;
            this.$refs.pager.pageNum = this.page;
        }
      this.firstblood();
    },
    shuaxin() {
      this.firstblood()
    }
  }
}
</script>

<style type="text/css" lang="scss" scoped>
    .plantOrigin{
    }
</style>
