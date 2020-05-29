<template>
    <div class="identicalStyle clearfix waitpayment" v-loading="loading">
              <el-form  :inline="true" :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
                    <el-form-item label="区域" prop="belongCity">
                        <!-- <vregion :ui="true" @values="regionChange" class="form-control">
                            <el-input v-model="searchInfo.belongCity" placeholder="请选择出发地" clearable></el-input>
                        </vregion> -->
                        <getCityList class="chooseItem" @returnStr="getStr" v-model="searchInfo.belongCity" ref="area"></getCityList>
                    </el-form-item>
                    <el-form-item label="订单号" prop="orderSerial">
                        <el-input v-model="searchInfo.orderSerial" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="货主" maxlength="18"  prop="shipperInfo">
                        <el-input v-model="searchInfo.shipperInfo" clearable placeholder="账户/姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="取消类型" prop="cancelType">
                        <el-select v-model="searchInfo.cancelType" clearable placeholder="请选择">
                            <el-option
                            v-for="item in optionsCancel"
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
                    <el-button type="primary" icon="el-icon-download" :size="btnsize" plain @click="handleClick('export')">导出Excel</el-button>
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
                            prop="provinceCityArea"
                            label="区域"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="shipperInfo"
                            label="货主"
                            min-width="200">
                            <!-- <template slot-scope="scope">
                                <p>{{scope.row.shipperMobile}}<span v-if="scope.row.shipperName">-</span>{{scope.row.shipperName}}</p>    
                            </template> -->
                        </el-table-column>
                        <el-table-column prop="shipperSalesmanName" min-width="150" sortable label="货主所属业务员">
                            <!-- <template slot-scope="scope">
                                {{scope.row.shipperSalesmanName ? scope.row.shipperSalesmanName : '暂无' }}
                            </template> -->
                        </el-table-column>
                         <el-table-column
                            sortable
                            prop="cancelTime"
                            label="取消时间"
                            min-width="160">
                                <template  slot-scope="scope">
                                    <span>
                                        {{ scope.row.cancelTime | parseTime}}    
                                    </span>
                                </template>
                        </el-table-column>
                         <el-table-column
                            sortable
                            :show-overflow-tooltip="true"
                            prop="cancelCause"
                            label="取消原因"
                            min-width="250">
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="cancelType"
                            label="取消类型"
                            min-width="150">
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="cancelCreater"
                            label="取消人"
                            min-width="150">
                        </el-table-column>
                        <el-table-column
                            sortable
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
                        <!-- <el-table-column
                            prop="aflcOrderAddresses"
                            label="配送路径"
                            width="500">
                            <template  slot-scope="scope">
                                <p class="aflcOrderAddresses" v-for="(obj,idx) in scope.row.aflcOrderAddresses" :key="obj.id">
                                    <span v-if="idx == 0">发货地：</span>
                                    <span v-else-if="idx == scope.row.aflcOrderAddresses.length-1">收货地：</span>
                                    <span v-else>途径地{{ scope.row.aflcOrderAddresses.length >3 ? idx : ''}}：</span>
                                    {{obj.viaAddress}}
                                </p>
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
    </div>  
</template>

<script type="text/javascript">

import '@/styles/dialog.scss'
import { orderStatusList,cancelOrderExcel,orderManager2Cancel } from '@/api/order/ordermange'
import { parseTime,pickerOptions2 } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
// import vregion from '@/components/vregion/Region'
import getCityList from '@/components/GetCityList/city'
import { DicOrderCancel } from '@/api/common'
    export default{
        name:'cancelOrder',
        components:{
            Pager,
            // vregion
            getCityList
        },
        data(){
            return{
                btnsize:'mini',
                timeOutCancel:null,
                loading: true,//加载
                sizes:[20,50,100],
                pagesize:20,//初始化加载数量
                page:1,//初始化页码
                dataTotal:0,
                searchInfo:{
                    // belongCity:'',//区域
                    // belongCityName:'',//区域
                    // shipperName:'',//货主
                    // startOrderDate:'',//下单起始时间
                    // endOrderDate:'',//下单结束时间
                    // orderSerial:'',//订单号
                    // parentOrderStatus:'AF00808',//订单状态
                    // userType:'',
                    // payTimeType:'',//支付时机(null：立即支付，0：收货时付款，1：发货时付款)
                    // provinceCityArea:'',
                    "belongCity": "",//区域
                    "cancelType": "",//取消类型
                    "endOrderDate": "",//下单结束时间
                    "orderSerial": "",//订单号
                    "shipperInfo": "",//货主
                    "startOrderDate": ""//下单起始时间
                },
                pickerOptions2:{
                    shortcuts:pickerOptions2
                },
                chooseTime:'',
                tableData:[],
                dialogFormVisible_details:false,//详情弹窗
                DetailsOrderSerial:'',
                optionsCancel:[{
                    name:'全部',
                    code:''
                }]
            }
        },
        created(){

        },
        mounted(){
            this.firstblood();
            // this.timeOutCancel = setInterval(this.firstblood,60000)
            // console.log(this.$store)
            this.$store.dispatch("GetInfoDic", "AF00513").then(res => {
                this.optionsCancel = this.optionsCancel.concat(res);
                this.optionsCancel = this.optionsCancel.filter(el =>{
                    return el.code != 'AF0051303'
                })
            });
            // DicOrderCancel().then(res => {
            //     this.optionsCancel = this.optionsCancel.concat(res.data);
            //     this.optionsCancel = this.optionsCancel.filter(el =>{
            //         return el.code != 'AF0051303'
            //     })
            // })
        },  
        beforeDestroy(){
            clearInterval(this.timeOutCancel);
        },
        methods: {
            // regionChange(d) {
            //     console.log('data:',d)
            //     this.searchInfo.belongCityName = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
            //     if(d.area){
            //         this.searchInfo.belongCity = d.area.code;
            //     }else if(d.city){
            //         this.searchInfo.belongCity = d.city.code;
            //     }
            //     else{
            //         this.searchInfo.belongCity = d.province.code;
            //     }
            // },
            getStr(d){
                this.searchInfo.belongCityName = (!d.province&&!d.city&&!d.area) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}`.trim();
                this.searchInfo.provinceCityArea = (!d.province&&!d.city&&!d.area) ? '': `${this.getValue(d.province)},${this.getValue(d.city)},${this.getValue(d.area)}`.trim();
                this.searchInfo.belongCity = d.area.code;
            },
             getValue(obj){
                return obj ? obj.value:'';
            },
            handlePageChange(obj) {
                this.page = obj.pageNum;
                this.pagesize = obj.pageSize;
                this.firstblood();
            },
            //刷新页面  
            firstblood(){
                this.loading = true;
                orderManager2Cancel(this.page,this.pagesize,this.searchInfo).then(res => {
                    console.log('取消',res)
                    this.tableData = res.data.list;
                    this.dataTotal = res.data.totalCount;

                    // this.tableData.forEach(item => {
                    //     item.aflcOrderAddresses.sort(function(a,b){  
                    //         return a.viaOrder - b.viaOrder;  
                    //     })  
                    //     item.cancelReazon = item.cancelFile.remark.slice(5).replace(/,$/gi,'');

                    //     // item.cancelReazon = item.cancelFile.remark.slice(5).replace(',','');
                    // })
                    this.loading = false;
                }).catch(err => {
                    this.$message({
                        type: 'info',
                        message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                    })
                    this.loading = false;
                })
            },
           
            //模糊查询 分类名称或者code
            handleSearch(type){
                // console.log(this.chooseTime)
                switch(type){
                    case 'search':
                        if(this.chooseTime){
                            this.searchInfo.startOrderDate = this.chooseTime[0];
                            this.searchInfo.endOrderDate = this.chooseTime[1];
                        }
                        break;
                    case 'clear':
                        this.searchInfo = {
                            "belongCity": "",//区域
                            "cancelType": "",//取消类型
                            "endOrderDate": "",//下单结束时间
                            "orderSerial": "",//订单号
                            "shipperInfo": "",//货主
                            "startOrderDate": ""//下单起始时间
                        };
                        this.chooseTime = [];
                        this.$refs.area.clearData();
                }
                if(this.page!= 1){
                    this.page = 1;
                    this.$refs.pager.inputval = this.page;
                    this.$refs.pager.pageNum = this.page;
                }
                this.firstblood();
            },
            handleClick(type){
                switch(type){
                    case 'export':
                        if(this.chooseTime.length == 0){
                            this.$message({
                                type: 'warning',
                                message: '请选择下单时间'
                            })
                        }else if(this.getDaysBetween(this.chooseTime[0],this.chooseTime[1]) > 180){
                            this.$message({
                                type: 'warning',
                                message: '下单时间区间不能大于半年'
                            })
                        }else{
                            this.searchInfo.startOrderDate = this.chooseTime[0];
                            this.searchInfo.endOrderDate = this.chooseTime[1];
                            this.$message.info('正在导出中...');    
                            cancelOrderExcel(this.searchInfo).then(res => {
                                var blob = new Blob([res]);
                                let href =  window.URL.createObjectURL(blob);
                                var NewDom = document.createElement("a");
                                NewDom.setAttribute('href',href);
                                NewDom.setAttribute('target', '_blank');
                                NewDom.setAttribute('download', '取消订单.xlsx');
                                document.body.appendChild(NewDom);
                                NewDom.click();
                                document.body.removeChild(NewDom)
                            })
                        }
                        break;
                }
            },
            getDaysBetween(dateString1,dateString2){
                // var  startDate = Date.parse(dateString1);
                // var  endDate = Date.parse(dateString2);
                var days=(dateString2 - dateString1)/(1*24*60*60*1000);
                // alert(days);
                return  days;
            },
            //判断是否选中
            getinfomation(selection){
                this.checkedinformation = selection;
            },
             //点击选中当前行
            clickDetails(row, event, column){
                this.$refs.multipleTable.toggleRowSelection(row);
            },
            //详情弹窗
            pushOrderSerial(item){
                this.$router.push({name: '订单详情',query:{ orderSerial:item.orderSerial}});
            }
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .waitpayment{
       
    }
</style>