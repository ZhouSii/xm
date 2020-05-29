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
                    <el-form-item label="下单时间" prop="chooseTime">
                        <el-date-picker
                            v-model="chooseTime"
                            type="daterange"
                            :picker-options="pickerOptions2"
                            range-separator="-"
                            start-placeholder="开始日期"
                            unlink-panels
                            end-placeholder="结束日期"
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
                <!-- <div class="btns_box">
                    <el-button type="primary" :size="btnsize" plain @click="handleSearch('search')">导出Exce</el-button>
                </div> -->
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
                            :show-overflow-tooltip="true"
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

            <!-- <Details :dialogFormVisible_details.sync = "dialogFormVisible_details" :orderSerial="DetailsOrderSerial" ></Details> -->
    </div>
</template>

<script type="text/javascript">

import '@/styles/dialog.scss'
import { orderStatusList,orderManager2Dispatch } from '@/api/order/ordermange'
import { parseTime,pickerOptions2 } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
// import Details from '../components/detailsInformations'
// import vregion from '@/components/vregion/Region'
import getCityList from '@/components/GetCityList/city'


    export default{
        components:{
            Pager,
            // Details,
            // vregion
            getCityList
        },
        data(){
            return{
                btnsize:'mini',
                timeOutToDispatch:null,
                loading: true,//加载
                sizes:[20,50,100],
                pagesize:20,//初始化加载数量
                page:1,//初始化页码
                dataTotal:0,
                searchInfo:{
                    "belongCity": "",
                    "endOrderDate": "",
                    "orderSerial": "",
                    "shipperInfo": "",
                    "startOrderDate": ""
                },
                pickerOptions2:{
                    shortcuts:pickerOptions2
                },
                chooseTime:'',
                tableData:[],
                dialogFormVisible_details:false,//详情弹窗
                DetailsOrderSerial:'',
            }
        },
        created(){

        },
        mounted(){
            this.firstblood();
            // this.timeOutToDispatch = setInterval(this.firstblood,60000)
            // console.log(this.$store)
        },  
        beforeDestroy(){
            clearInterval(this.timeOutToDispatch);
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
                console.log('data:',d)
                this.searchInfo.belongCityName = (!d.province&&!d.city&&!d.area) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}`.trim();
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

                orderManager2Dispatch(this.page,this.pagesize,this.searchInfo).then(res => {
                    console.log('派单中',res)
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
                            "belongCity": "",
                            "endOrderDate": "",
                            "orderSerial": "",
                            "shipperInfo": "",
                            "startOrderDate": ""
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
                // console.log(item)
                // this.dialogFormVisible_details = true;
                // this.DetailsOrderSerial = item.orderSerial;
                this.$router.push({name: '订单详情',query:{ orderSerial:item.orderSerial }});

            }
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .waitpayment{
       
    }
</style>