<template>
    <div class="identicalStyle clearfix waitpayment" v-loading="loading">
        <el-form :inline="true" :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="区域" prop="belongCity">
                <!-- <vregion :ui="true" @values="regionChange" class="form-control">
                    <el-input v-model="searchInfo.belongCity" placeholder="请选择出发地" clearable></el-input>
                </vregion> -->
                <getCityList class="chooseItem" @returnStr="getStr" v-model="searchInfo.belongCity" ref="area"></getCityList>
            </el-form-item>
            <el-form-item label="订单号" prop="orderSerial">
                <el-input v-model="searchInfo.orderSerial" clearable>
                </el-input>
            </el-form-item>
            <el-form-item label="货主" maxlength="18"  prop="shipperInfo">
                <el-input v-model="searchInfo.shipperInfo" clearable placeholder="账户/姓名">
                </el-input>
            </el-form-item>
            <el-form-item label="订单状态"   prop="parentOrderStatus">
                <el-select v-model="searchInfo.parentOrderStatus" clearable placeholder="请选择">
                    <el-option
                    v-for="item in optionsOrderStatus"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="下单时间" prop="chooseTime">
                <el-date-picker
                    v-model="chooseTime"
                    type="daterange"
                    :picker-options="pickerOptions2"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    unlink-panels
                    align="right"
                    :default-time="['00:00:00', '23:59:59']"
                    value-format="timestamp">
                </el-date-picker>
            </el-form-item>
            <el-form-item class="btnChoose fr"  style="margin-left:0;">
                <el-button type="primary" icon="el-icon-search" plain :size="btnsize" @click="handleSearch('search')">搜索</el-button>
                <el-button type="info" icon="fontFamily aflc-icon-qingkong" :size="btnsize" plain @click="handleSearch('clear')">清空</el-button>
            </el-form-item>
        </el-form>
        <div class="classify_info">
            <div class="btns_box">
                <el-button type="primary" icon="el-icon-warning" plain @click="handleSearch('cancel')" :size="btnsize">取消订单</el-button>
                <!-- <el-button type="primary" :size="btnsize" plain @click="handleSearch('outExce')">导出Exce</el-button> -->
            </div>
            <div class="info_news">
                <el-table
                    id="out-table"
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
                    <el-table-column label="序号"  width="60">
                        <template slot-scope="scope">
                            {{ (page - 1)*pagesize + scope.$index + 1 }}
                        </template>
                    </el-table-column>  
                    <el-table-column
                        prop="orderSerial"
                        sortable
                        label="订单号"
                        min-width="250">
                            <template  slot-scope="scope">
                                <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.orderSerial}}</h4>
                            </template>
                    </el-table-column>
                    <el-table-column
                        prop="orderType"
                        :show-overflow-tooltip="true"
                        sortable
                        label="服务分类"
                        min-width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        :show-overflow-tooltip="true"
                        prop="provinceCityArea"
                        label="区域"
                        min-width="180">
                    </el-table-column>
                    <el-table-column
                        sortable
                        :show-overflow-tooltip="true"
                        prop="shipperMobile"
                        label="货主账号"
                        min-width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        :show-overflow-tooltip="true"
                        prop="shipperName"
                        label="货主姓名"
                        min-width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        :show-overflow-tooltip="true"
                        prop="usedCarType"
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
                        sortable
                        prop="useCarTime"
                        label="用车时间"
                        min-width="160">
                            <template  slot-scope="scope">
                                {{ scope.row.useCarTime | parseTime}}    
                            </template>
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="orderClass"
                        label="订单类型"
                        min-width="150">
                            <template  slot-scope="scope">
                                {{ scope.row.orderClass == '1' ? '即时订单' : '预约订单' }}
                            </template>
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="parentOrderStatus"
                        label="订单状态"
                        min-width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="payStatus"
                        label="付款状态"
                        min-width="150">
                    </el-table-column>
                    <!-- <el-table-column
                        sortable
                        prop="aflcOrderAddresses"
                        label="提货地"
                        :show-overflow-tooltip="true"
                        width="250">
                        <template  slot-scope="scope">
                            {{ scope.row.aflcOrderAddresses[0].viaAddressName}}{{scope.row.aflcOrderAddresses[0].viaAddress ? '('+scope.row.aflcOrderAddresses[0].viaAddress+')' : ''}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="aflcOrderAddresses"
                        label="目的地"
                        :show-overflow-tooltip="true"
                        width="250">
                        <template  slot-scope="scope">
                            {{ scope.row.aflcOrderAddresses[scope.row.aflcOrderAddresses.length-1].viaAddressName }}{{scope.row.aflcOrderAddresses[scope.row.aflcOrderAddresses.length-1].viaAddress ? '('+scope.row.aflcOrderAddresses[scope.row.aflcOrderAddresses.length-1].viaAddress+')' : ''}}
                        </template>
                    </el-table-column> -->
                    <el-table-column
                        sortable
                        prop="createTime"
                        label="下单时间"
                        min-width="160">
                        <template  slot-scope="scope">
                            {{ scope.row.createTime | parseTime}}
                        </template>
                    </el-table-column>
                </el-table>
                    <!-- 页码 -->
                <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange" ref="pager"/></div> </div>    
            </div>
        </div>
        <cancelCompnent :dialogVisible.sync="dialogVisible" :orderSerial = "currentOrderSerial"   @close = "firstblood"/>
    </div>
</template>

<script type="text/javascript">

import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import '@/styles/dialog.scss'
import { orderStatusList,orderManager2Unpay } from '@/api/order/ordermange'
import { parseTime, pickerOptions2 } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
// import vregion from '@/components/vregion/Region'
import getCityList from '@/components/GetCityList/city'
import cancelCompnent from '../components/cancel'

export default{
    components: {
        Pager,
        // vregion,
        getCityList,
        cancelCompnent
    },
    data() {
        return {
            btnsize: 'mini',
            timeOutWaitPay: null,
            loading: true, // 加载
            sizes: [20, 50, 100, 400],
            pagesize: 20, // 初始化加载数量
            page: 1, // 初始化页码
            dataTotal: 0,
            searchInfo: {
                "belongCity": "",
                "endOrderDate": "",
                "orderSerial": "",
                "parentOrderStatus": "",
                "shipperInfo": "",
                "startOrderDate": ""
            },
            pickerOptions2: {
                shortcuts: pickerOptions2
            },
            chooseTime: [],
            tableData: [],
            dialogFormVisible_details: false, // 详情弹窗
            DetailsOrderSerial: '',
            dialogVisible: false,
            currentOrderSerial: '',
            checkedinformation: [],
            optionsOrderStatus:[{
                name:'全部',
                code:'',
            },{
                name:'待指派',
                code:'AF00805',
            },{
                name:'派单中',
                code:'AF00804',
            },{
                name:'进行中',
                code:'AF00806PT',
            },{
                name:'已完成',
                code:'AF00807',
            },
            // {
            //     name:'已取消',
            //     code:'AF00808',
            // }
            ]
        }
    },
  watch: {

  },
  created() {

  },
  mounted() {
    this.firstblood()

    // console.log('```````````', process.env.NODE_ENV)
            // this.timeOutWaitPay = setInterval(this.firstblood,60000)
            // console.log(this.$store)
  },
  beforeDestroy() {
    clearInterval(this.timeOutWaitPay)
  },
  methods: {
    exportExcel() {
        /* generate workbook object from table */
        var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
        /* get binary string as output */
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        console.log(wb)
        console.log(wbout)
        try {
            FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
        } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        return wbout
    },
    // regionChange(d) {
    //   console.log('data:', d)
    //   this.searchInfo.belongCityName = (!d.province && !d.city && !d.area && !d.town) ? '' : `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim()
    //   if (d.area) {
    //               this.searchInfo.belongCity = d.area.code
    //             } else if (d.city) {
    //               this.searchInfo.belongCity = d.city.code
    //             } else {
    //               this.searchInfo.belongCity = d.province.code
    //             }
    //   console.log('this.searchInfo.belongCityName',this.searchInfo.belongCityName)

    // },
    getStr(d){
        console.log('data:',d)
        this.searchInfo.belongCityName = (!d.province&&!d.city&&!d.area) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}`.trim();
        // if(d.city){
            this.searchInfo.belongCity = d.area.code;
        // }else{
            // this.searchInfo.belongCity = d.province.code;
        // }
    },
    getValue(obj) {
      return obj ? obj.value : ''
    },
    handlePageChange(obj) {
        this.page = obj.pageNum
        this.pagesize = obj.pageSize
        this.firstblood()
    },
    // 刷新页面
    firstblood() {
        this.loading = true;
        orderManager2Unpay(this.page, this.pagesize, this.searchInfo).then(res => {
            console.log('待付款', res)
            this.tableData = res.data.list
            this.dataTotal = res.data.totalCount
        //   this.tableData.forEach(item => {
        //     item.aflcOrderAddresses.sort(function(a, b) {
        //         return a.viaOrder - b.viaOrder
        //       })
        //   })
            this.loading = false;
        }).catch(err => {
            this.$message({
                type: 'info',
                message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
            })
            this.loading = false;
        })
    },
    // 模糊查询 分类名称或者code
    handleSearch(type) {
        switch (type) {
            case 'search':
                if (this.chooseTime) {
                    this.searchInfo.startOrderDate = this.chooseTime[0]
                    this.searchInfo.endOrderDate = this.chooseTime[1]
                } else {
                    this.searchInfo.startOrderDate = ''
                    this.searchInfo.endOrderDate = ''
                }
                if(this.page!= 1){
                    this.page = 1;
                    this.$refs.pager.inputval = this.page;
                }
                this.firstblood();
                break;
            case 'clear':
                this.searchInfo = {
                    "belongCity": "",
                    "endOrderDate": "",
                    "orderSerial": "",
                    "parentOrderStatus": "",
                    "shipperInfo": "",
                    "startOrderDate": ""
                }
                this.chooseTime = [];
                if(this.page!= 1){
                    this.page = 1;
                    this.$refs.pager.inputval = this.page;
                }
                this.$refs.area.clearData();
                this.firstblood();
                break;
            case 'outExce':
                this.exportExcel();
                break;
            case 'cancel':
                // console.log(this.checkedinformation.length)
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
                    } else{
                        this.currentOrderSerial = this.checkedinformation[0].orderSerial
                        this.dialogVisible = true
                    }
                break
            }
    // 清除选中状态，避免影响下个操作
      this.$refs.multipleTable.clearSelection()
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
      this.$router.push({ name: '订单详情', query: { orderSerial: item.orderSerial }})
    }
  }
}
</script>

<style type="text/css" lang="scss" scoped>
    .waitpayment{
       
    }
</style>
