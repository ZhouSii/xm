<template>
    <div class="identicalStyle shipperCancelCompnent" v-loading="loading">
        <el-form  :inline="true" :model="listSystemObj.vo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="发货地" prop="startAddress">
                <el-input v-model="listSystemObj.vo.startAddress" clearable></el-input>
            </el-form-item>
            <el-form-item label="到货地" prop="endAddress">
                <el-input v-model="listSystemObj.vo.endAddress" clearable></el-input>
            </el-form-item>
            <el-form-item label="货主" prop="shipperNameOrMobile">
                <el-input v-model="listSystemObj.vo.shipperNameOrMobile" placeholder="账号/姓名" clearable></el-input>
            </el-form-item>
            <el-form-item label="区代" prop="agencyName">
                <el-input v-model="listSystemObj.vo.agencyName" clearable></el-input>
            </el-form-item>
            <el-form-item label="区代物流公司" prop="agencyCompanyName">
                <el-input v-model="listSystemObj.vo.agencyCompanyName" clearable></el-input>
            </el-form-item>
            <el-form-item label="下单日期" prop="chooseTime1">
                <el-date-picker
                    v-model="chooseTime1"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    unlink-panels
                    align="right"
                    :default-time="['00:00:00', '23:59:59']"
                    value-format="timestamp">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="订单号" prop="orderSerial">
                <el-input v-model="listSystemObj.vo.orderSerial" clearable></el-input>
            </el-form-item>
            <el-form-item class="btnChoose fr"  style="margin-left:0;">
                <el-button type="primary" icon="el-icon-search" plain :size="btnsize" @click="handleSearch('search')">搜索</el-button>
                <el-button type="info" icon="fontFamily aflc-icon-qingkong" :size="btnsize" plain @click="handleSearch('clear')">清空</el-button>
            </el-form-item>
        </el-form>
        <div class="classify_info">
            <div class="btns_box">
                <el-button type="primary" icon="el-icon-download" plain @click="handleClick('export')" :size="btnsize">导出Excel</el-button>
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
                    style="width: 100%">
                    <el-table-column label="序号" width="60">
                        <template slot-scope="scope">
                            {{ (listSystemObj.currentPage - 1)*listSystemObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column> 
                    <el-table-column
                        sortable
                        label="订单号"
                        prop="orderSerial"
                        :show-overflow-tooltip="true"
                        min-width="250">
                        <template  slot-scope="scope">
                            <h4 class="needMoreInfo" @click="handleClick('details',scope.row)">{{ scope.row.orderSerial}}</h4>
                        </template>
                    </el-table-column>
                     <el-table-column
                        prop="shipperMobile"
                        sortable
                        label="货主账号"
                        min-width="150">
                    </el-table-column>
                    <el-table-column
                        prop="shipperName"
                        sortable
                        label="货主姓名"
                        min-width="150"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="shipperSalesmanName"
                        sortable
                        min-width="150"
                        label="货主所属业务员"
                        >
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="startProvinceCityArea"
                        sortable
                        label="发货地"
                        min-width="200">
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="endProvinceCityArea"
                        sortable
                        min-width="200"
                        label="收货地"
                        >
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="agencyName"
                        sortable
                        min-width="150"
                        label="区代"
                        >
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="agencyCompanyName"
                        sortable
                        min-width="200"
                        label="区代物流公司"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="agencyMobile"
                        sortable
                        min-width="150"
                        label="区代客服电话"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="goodsTypeName"
                        sortable
                        min-width="150"
                        label="货物名称"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="goodsVolume"
                        sortable
                        min-width="150"
                        label="体积(立方)"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="goodsWeight"
                        sortable
                        min-width="150"
                        label="重量(公斤)"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="goodsNum"
                        sortable
                        min-width="150"
                        label="件数"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="useTime"
                        sortable
                        label="下单时间"
                        min-width="160">
                        <template slot-scope="scope">
                            {{ scope.row.useTime | parseTime }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="cancelReason"
                        sortable
                        min-width="150"
                        label="取消原因"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="cancelTime"
                        sortable
                        label="取消时间"
                        min-width="160">
                        <template slot-scope="scope">
                            {{ scope.row.cancelTime | parseTime }}
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
import { logisticsShipperOrderList,logisticsShipperOrderListExcel } from '@/api/order/logistics/logistics1.js'
import Pager from '@/components/Pagination/index'
import { parseTime } from '@/utils/index';
export default{
    name:'shipperCancelCompnent',
    props: {
        isvisible: {
            type: Boolean,
            default: false
        }
    },
    components: {
        Pager,
    },
    data() {
        return {
            btnsize: 'mini',
            loading: false, // 加载
            dataTotal: 0,
            listSystemObj:{
                "currentPage": 1,
                "pageSize": 20,
                "vo": {
                    "agencyCompanyName": "",//区代物流公司名称
                    "agencyName": "",//区代名称
                    "endAddress": "",//收货地
                    "endUseTime": "",//下单结束时间
                    "orderSerial": "",//订单流水号
                    "orderStatus": "",//订单状态
                    "orderStatusList": [],//订单状态列表
                    "shipperNameOrMobile": "",//货主姓名/手机号码
                    "startAddress": "",//发货地
                    "startUseTime": "",//下单开始时间
                    "statusQueryType": "5",//订单状态查询类型（1:全部；2：区代超时未受理；3：区代超时未揽货；4：区代拒单；5：货主取消发货）
                }
            },
            chooseTime1:[],
            tableData: [],
            // timeOutAss: null,
        }
    },
    watch: {
        isvisible: {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.firstblood()
                    // this.timeOutAss = setInterval(this.firstblood,60*1000);
                }else{
                    // clearInterval(this.timeOutAss)
                }
            },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
            immediate: true
        }
    },
    mounted() {
        this.init();
        // this.TimeOut();
    },
    beforeDestroy() {
        // clearInterval(this.timeOutAss);
        // this.timeOutAss = null;
    },
    methods: {
        init(){
           
        },
        TimeOut(){
            const timer = setInterval(() =>{                    
                // 某些定时器操作     
                this.firstblood()           
            }, 1000);            
            // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
            this.$once('hook:beforeDestroy', () => {            
                clearInterval(timer);                                    
            })
        },
        getStr(d){
            // this.searchInfo.belongCityName = (!d.province&&!d.city&&!d.area) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}`.trim();
            this.listSystemObj.vo.productAreaCode = d.city.code;
        },
        handlePageChange(obj) {
            this.listSystemObj.currentPage = obj.pageNum;
            this.listSystemObj.pageSize = obj.pageSize;
            this.firstblood();
        },
        // 刷新页面
        firstblood() {
            this.loading = true
            logisticsShipperOrderList(this.listSystemObj).then(res => {
                this.tableData = res.data.list;
                this.dataTotal = res.data.totalCount;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
                this.$message({
                    type: 'info',
                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                })
            })
        },
        // 模糊查询 分类名称或者code
        handleSearch(type) {
            if(type == 'clear'){
                this.listSystemObj.vo ={
                    "agencyCompanyName": "",//区代物流公司名称
                    "agencyName": "",//区代名称
                    "endAddress": "",//收货地
                    "endUseTime": "",//下单结束时间
                    "orderSerial": "",//订单流水号
                    "orderStatus": "",//订单状态
                    "orderStatusList": [],//订单状态列表
                    "shipperNameOrMobile": "",//货主姓名/手机号码
                    "startAddress": "",//发货地
                    "startUseTime": "",//下单开始时间
                    "statusQueryType": "5",//订单状态查询类型（1:全部；2：区代超时未受理；3：区代超时未揽货；4：区代拒单；5：货主取消发货）
                }
                this.chooseTime1 = [];
            }
            if(this.chooseTime1){
                this.listSystemObj.vo.startUseTime = this.chooseTime1[0];
                this.listSystemObj.vo.endUseTime = this.chooseTime1[1];
            }
            if(this.listSystemObj.currentPage!= 1){
                this.listSystemObj.currentPage = 1;
                this.$refs.pager.inputval = this.listSystemObj.currentPage;
                this.$refs.pager.pageNum = this.listSystemObj.currentPage;
            }
            this.firstblood();
        },
        handleClick(type,row){
            switch (type) {
                case 'export':
                    var timestamp = (new Date()).getTime();
                    this.$message.info('正在导出中...');    
                    logisticsShipperOrderListExcel(this.listSystemObj.vo).then(res => {
                        var blob = new Blob([res]);
                        let href =  window.URL.createObjectURL(blob);
                        var NewDom = document.createElement("a");
                        NewDom.setAttribute('href',href);
                        NewDom.setAttribute('target', '_blank');
                        NewDom.setAttribute('download', '发物流-货主订单管理-货主取消发货-'+parseTime(timestamp)+'.xlsx');
                        document.body.appendChild(NewDom);
                        NewDom.click();
                        document.body.removeChild(NewDom)
                    })
                    break;
                case 'details':
                    this.$router.push({name: '发物流订单详情',query:{ orderSerial:row.orderSerial}});
                    break;
            }
        },
    }
}
</script>

<style type="text/css" lang="scss" scoped>
    .shipperCancelCompnent{
    }
</style>
