<template>
    <div class="identicalStyle clearfix plantOrigin" v-loading="loading">
        <searchInfo @change="getSearchParam" :searchType="status"></searchInfo>
        <div class="classify_info">
            <div class="btns_box">
                <el-button type="primary" icon="el-icon-error" v-if="status != 'AF0080607PT' && status != 'AF0080606PT'" :size="btnsize" plain @click="handleSearch('cancel')">取消订单</el-button>
                <el-button type="primary" icon="el-icon-warning" v-if="status == 'AF0080607PT'" :disabled="sureStatus" :size="btnsize" plain @click="handleSearch('sure')" v-has:ORDER_CITY_WIDE_ORDER_ING_CONFIRM_RECEIPT>确认收货</el-button>
                <el-button type="primary" icon="el-icon-circle-check" v-if="status == 'AF0080607PT'" :disabled="expensesStatus" :size="btnsize" plain @click="handleSearch('expenses')">确认费用</el-button>
                <!-- <el-button type="primary" :size="btnsize" plain @click="handleSearch('export')">导出Exce</el-button> -->
            </div>
            <div class="info_news">
                <el-table
                    :ref="'multipleTable'+status"
                    :data="tableData"
                    stripe
                    border
                    align = "center"
                    height="100%"
                    @selection-change = "getinfomation"
                    tooltip-effect="dark"
                    @row-click="clickDetails"
                    style="width: 100%"> 
                    <el-table-column label="选择" width="60" align="center">
                        <template slot-scope="scope">
                            <el-radio class="radio"  v-model="radio"  :label="scope.row.orderSerial">&nbsp;</el-radio>
                        </template>
                    </el-table-column> 
                    <el-table-column label="序号"  width="60">
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
                        sortable
                        prop="orderType"
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
                        prop="shipperInfo"
                        label="货主"
                        min-width="200">
                        <!-- <template slot-scope="scope">
                            <p>{{scope.row.shipperMobile}}<span v-if="scope.row.shipperName">-</span>{{scope.row.shipperName}}</p>    
                        </template> -->
                    </el-table-column>
                    <el-table-column
                        label="车主"  
                        :show-overflow-tooltip="true"
                        sortable
                        prop="driverInfo"
                        min-width="200">
                        <!-- <template slot-scope="scope">
                            {{scope.row.aflcDriverStatus.driverMobile}}{{scope.row.aflcDriverStatus.driverName ? '-' + scope.row.aflcDriverStatus.driverName : ''}}{{scope.row.aflcDriverStatus.carNumber ? "-" + scope.row.aflcDriverStatus.carNumber : ''}}
                        </template> -->
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
                        prop="complateUnloadTime"
                        label="卸货完成时间"
                        min-width="160">
                            <template  slot-scope="scope">
                                {{ scope.row.complateUnloadTime | parseTime}}    
                            </template>
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="confirmExpenseTime"
                        label="确认费用时间"
                        min-width="160">
                            <template  slot-scope="scope">
                                {{ scope.row.confirmExpenseTime | parseTime}}    
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
                        v-if="status == 'AF0080607PT'"
                        sortable
                        prop="payTimeType"
                        label="支付时机"
                        min-width="150">
                            <template  slot-scope="scope">
                                {{scope.row.payTimeType ? (scope.row.payTimeType == '0' ? '收货时付款' : '发货时付款') : '立即支付'}}
                            </template>
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="payStatus"
                        label="付款状态"
                        min-width="150">
                            <template  slot-scope="scope">
                                <span :class="scope.row.payStatus == '待付款' ? 'ifWaitPay' : ''">{{scope.row.payStatus}}</span>
                            </template>
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
            </div>
        </div>
            <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange" ref="pager"/></div> </div>    
        <cancelCompnent :dialogVisible.sync="dialogVisible" :orderSerial = "currentOrderSerial"   @close = "shuaxin"/>
        <expenses :dialogFormVisible.sync="dialogFormVisible" :orderSerial = "currentOrderSerial"  :driverId="currentId" @renovate="firstblood"/>
    </div>
</template>

<script type="text/javascript">

import { orderStatusList,webConfirmGoods,orderManager2Running } from '@/api/order/ordermange'
import { parseTime } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
import searchInfo from './components/searchInfo'
import cancelCompnent from '../components/cancel'
import { getUserInfo } from '@/utils/auth'
import expenses from './components/expenses'
    export default{
        props: {
            isvisible: {
                type: Boolean,
                default: false
            },
            status: {
                type: String,
                required : true
            }
        },
        components:{
            Pager,
            // Details,
            searchInfo,
            cancelCompnent,
            expenses,
        },
        data(){
            return{
                btnsize:'mini',
                currentOrderSerial:'',//当前选择的流水号
                timeOut:null,
                loading: true,//加载
                sizes:[20,50,100],
                pagesize:20,//初始化加载数量
                page:1,//初始化页码
                currentId:'',//车主id
                dataTotal:0,
                searchInfo:{
                    "belongCity": "",//区域
                    "complateUnloadEndTime": "",//卸货完成结束时间
                    "complateUnloadStartTime": "",//卸货完成开始时间
                    "driverInfo": "",//车主
                    "endOrderDate": "",//下单结束时间
                    "orderSerial": "",//订单流水号
                    "orderStatus": "",//订单状态
                    "payStatus": "",//付款状态
                    "payTimeType": "",//支付时机(‘’ 全部，null 立即支付，0，收货时付款，1，发货时付款)
                    "shipperInfo": "",//货主
                    "startOrderDate": ""//下单起始时间
                },
                tableData:[],
                dialogFormVisible:false,//详情弹窗
                DetailsOrderSerial:'',
                dialogVisible:false,//取消订单弹框
                // checkedinformation:[],//选中数据
                selected:{},
                radio: '',
                expensesStatus:false,
                sureStatus:false,
            }
        },
        watch:{
            isvisible: {
                handler(newVal, oldVal) {
                    if(newVal){
                        this.firstblood();
                        // this.timeOut = setInterval(this.firstblood,60000)
                    }else{
                        clearInterval(this.timeOut);
                    }
                },
                // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
                immediate: true
            },
        },
        created(){

        },
        mounted(){
            // this.firstblood();
            setTimeout(()=>{
                // console.log('this.$refs',this.$refs['multipleTable'+this.status])
                this.$refs['multipleTable'+this.status].$el.style.height = this.$refs['multipleTable'+this.status].$el.offsetHeight + 'px';
            },300)
        },  
        beforeDestroy(){
            clearInterval(this.timeOut);
        },
        methods: {
            handlePageChange(obj) {
                this.page = obj.pageNum;
                this.pagesize = obj.pageSize;
                this.firstblood();
            },
            //刷新页面  
            firstblood(){
                this.loading = true;
                this.searchInfo.orderStatus = this.status;
                orderManager2Running(this.page,this.pagesize,this.searchInfo).then(res => {
                    // console.log('是否刷新',res.data)
                    this.tableData = res.data.list;
                    this.dataTotal = res.data.totalCount;
                    // this.tableData.forEach(item => {
                    //     item.aflcOrderAddresses.sort(function(a,b){  
                    //         return a.viaOrder - b.viaOrder;  
                    //     })  
                    // })
                    this.loading = false;
                }).catch(err => {
                    this.$message({
                        type: 'warning',
                        message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                    })
                    this.loading = false;
                })
            },
            //模糊查询 分类名称或者code
            handleSearch(type){
                // console.log(this.chooseTime)
                // if(this.checkedinformation.length == 0){
                if(this.selected.orderSerial){
                //     return this.$message({
                //         type: 'info',
                //         message: '请选择一个订单' 
                //     })
                // } else if(this.checkedinformation.length > 1){
                //     return this.$message({
                //         type: 'info',
                //         message: '只能选择一个订单',
                //     })
                // }else{
                    switch(type){
                        case 'cancel':
                            this.currentOrderSerial = this.selected.orderSerial;
                            this.dialogVisible = true;
                            break;
                        case 'expenses':
                            // if(this.selected.aflcOrderExpenses.confirmExpenseTime){
                            //     return this.$message({
                            //         type: 'warning',
                            //         message: '当前订单已确认费用!',
                            //     })
                            // }else{
                                this.currentOrderSerial = this.selected.orderSerial;
                                this.currentId = this.selected.driverId;
                                this.dialogFormVisible = true;
                            // }
                            break;
                        case 'sure':
                            // if(this.selected.payStatus == '待付款'){
                            //     return this.$message({
                            //         type: 'warning',
                            //         message: '当前订单待付款，不可进行确认收货操作!',
                            //     })
                            // }else{
                                // console.log(getUserInfo(),this.checkedinformation[0])
                                this.sureStatus = true;
                                let dto = {
                                    orderSerial:this.selected.orderSerial,
                                    shipperId:this.selected.shipperId,
                                    name:getUserInfo().name,
                                    userId:getUserInfo().id,
                                    userName:getUserInfo().username,
                                }
                                webConfirmGoods(dto).then(res => {
                                    this.sureStatus = false;
                                    this.$message({
                                        type: 'success',
                                        message: '已确认收货！' 
                                    })
                                    this.firstblood();
                                }).catch(err => {
                                    this.sureStatus = false;
                                    this.$message({
                                        type: 'error',
                                        message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                                    })
                                })
                            // }
                            break;
                    }
                }else{
                    this.$message({
                        type: 'warning',
                        message: '请选择一条列表数据!'
                    });
                }
            },
            //判断是否选中
            getinfomation(selection){
                // console.log('当前选中',selection)
                this.checkedinformation = selection;
            },
             //点击选中当前行
            clickDetails(row, event, column){
                // this.$refs.multipleTable.toggleRowSelection(row);
                this.radio = row.id;
                this.selected = row;
                this.expensesStatus = this.selected.payStatus == '已付款'|| this.selected.confirmExpenseTime ? true : false;
                this.sureStatus = this.selected.payStatus == '待付款' ? true : false;
            },
            //详情弹窗
            pushOrderSerial(item){
                this.$router.push({name: '订单详情',query:{ orderSerial:item.orderSerial }});
            },
            getSearchParam(obj) {
                // console.log(obj)
                this.searchInfo = Object.assign(this.searchInfo, obj)
                this.loading = false;
                if(this.page!= 1){
                    this.page = 1;
                    this.$refs.pager.inputval = this.page;
                    this.$refs.pager.pageNum = this.page;
                }
                this.firstblood()
            },
            shuaxin(){
                this.firstblood();
            }
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .plantOrigin{
        height: 100%;
        .ifWaitPay{
            color:red;
        }
    }
</style>