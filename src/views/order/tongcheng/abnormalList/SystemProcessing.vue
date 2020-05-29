<template>
    <div class="identicalStyle clearfix systemProcessing" v-loading="loading">
        <searchInfo @change="getSearchParam" searchType="system"></searchInfo>
        <div class="classify_info">
            <!-- <div class="btns_box">
                <el-button type="primary" :size="btnsize" @click="handleSearch('search')">导出Exce</el-button>
            </div> -->
            <div class="info_news">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    stripe
                    border
                    align = "center"
                    height="100%"
                    :span-method="objectSpanMethod"
                    tooltip-effect="dark"
                    style="width: 100%"> 
                    <el-table-column label="序号"  width="60">
                        <template slot-scope="scope">
                            {{ (listSystemObj.currentPage - 1)*listSystemObj.pageSize + scope.row.currentKey + 1 }}
                        </template>
                    </el-table-column>  
                    <el-table-column
                        sortable
                        prop="orderSerial"
                        label="订单编号"
                        min-width="250"
                        >
                        <template  slot-scope="scope">
                            <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.orderSerial}}</h4>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column
                        sortable
                        prop="useCarTime"
                        label="用车时间"
                        width="160"
                        >
                        <template  slot-scope="scope">
                            {{scope.row.useCarTime | parseTime}}
                        </template>
                    </el-table-column>
                   -->
                    <!-- <el-table-column
                        :show-overflow-tooltip="true"
                        sortable
                        prop="startAddress"
                        min-width="200"
                        label="提货地"
                        >
                        <template  slot-scope="scope">
                            {{scope.row.startAddress ? scope.row.startAddress.replace(/,/g,"-") : scope.row.startAddress}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        sortable
                        prop="endAddress"
                        min-width="200"
                        label="到达地"
                        >
                        <template  slot-scope="scope">
                            {{scope.row.endAddress ? scope.row.endAddress.replace(/,/g,"-") : scope.row.endAddress}}
                        </template>
                    </el-table-column> -->
                    <el-table-column
                        sortable
                        prop="orderPrice"
                        min-width="150"
                        label="订单总额"
                        >
                    </el-table-column>
                    <el-table-column
                        sortable
                        :show-overflow-tooltip="true"
                        prop="shipperMobile"
                        min-width="150"
                        label="车主姓名"
                        >
                        <template  slot-scope="scope">
                            <span>{{scope.row.driverName}} / {{scope.row.driverMobile}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="createTime"
                        label="下单时间"
                        min-width="160"
                        >
                        <template  slot-scope="scope">
                            {{scope.row.createTime | parseTime}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="finishOrderTime"
                        label="完成时间"
                        min-width="160"
                        >
                        <template  slot-scope="scope">
                            {{scope.row.finishOrderTime | parseTime}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        sortable
                        :show-overflow-tooltip="true"
                        prop="riskControlName"
                        min-width="200"
                        label="违规说明"
                        >
                    </el-table-column>
                    <!-- <el-table-column
                        sortable
                        :show-overflow-tooltip="true"
                        prop="behaviorScore"
                        label="扣除行为分分数"
                        >
                    </el-table-column>
                    <el-table-column
                        sortable
                        :show-overflow-tooltip="true"
                        prop="rewardSum"
                        label="已扣奖励金"
                        >
                    </el-table-column> -->
                    <el-table-column
                        sortable
                        :show-overflow-tooltip="true"
                        prop="dealTime"
                        min-width="160"
                        label="处理时间"
                        >
                        <template slot-scope="scope">
                            {{scope.row.dealTime | parseTime}}
                        </template>
                    </el-table-column>
                    <!-- <el-table-column label="行为分" width="110">
                        <template slot-scope="scope">
                            <el-button :size="btnsize" 
                            :type="scope.row.behaviorScoreStatus == '1' ? 'primary' : 'success'" 
                            plain 
                            @click="handleClick(scope.row.behaviorScoreStatus == '1' ? 'returnBehaviorScore' : 'hasReturnBehaviorScore',scope.row)">{{scope.row.behaviorScoreStatus == '1' ? '退回行为分' : '已退回行为分'}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="奖励金" width="110">
                        <template slot-scope="scope">
                            <el-button :size="btnsize" 
                            :type="scope.row.rewardSumStatus == '1' ? 'primary' : 'success'" 
                            plain 
                            @click="handleClick(scope.row.rewardSumStatus == '1' ? 'returnReward' : 'hasReturnReward',scope.row)">{{scope.row.rewardSumStatus == '1' ? '退回奖励金' : '已退回奖励金'}}</el-button>
                        </template>
                    </el-table-column> -->
                </el-table>
            </div>

            <!-- <el-dialog
            top="35vh"
            :visible.sync="dialogVisibleDetails"
            :close-on-click-modal="false"
            width="57%"
            v-el-drag-dialog
            >
                <el-table
                :data="showDetails" 
                border
                ref="multipleTable"
                align = "center"
                >
                    <template v-for="(column,key) in tableColumn">
                        <el-table-column :key="key" :label="column.label" :prop="column.prop" :show-overflow-tooltip="column.overflow" v-if="!column.slot" :width="column.width"></el-table-column>
                        <el-table-column :key="key" :label="column.label" v-else :width="column.width || ''">
                            <template slot-scope="scope">
                                <span class="clickitem" v-if="column.click" v-html="column.slot(scope)" @click.stop="column.click(scope.row)"></span>
                                <span v-else v-html="column.slot(scope)"></span>
                            </template>
                        </el-table-column>
                    </template>
                </el-table>
            </el-dialog> -->
            <!-- 页码 -->
            <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  ref="pager"/></div> </div>    
        </div>
    </div>
</template>

<script type="text/javascript">

import '@/styles/dialog.scss'
import { listMasterOrderUnusual,returnBehavior,returnReward,listReward,returnBehaviorList } from '@/api/order/ordermange'
import { parseTime,pickerOptions2,objectMerge2 } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
import getCityList from '@/components/GetCityList/city'
// import { parseShipStatus } from '@/utils/dict'
import searchInfo from './abnormalSearch'

    export default{
        props: {
            isvisible: {
                type: Boolean,
                default: false
            }
        },
        components:{
            Pager,
            getCityList,
            searchInfo
        },
        data(){
            return{
                btnsize:'mini',
                timeOutAll:null,
                loading: false,//加载
                listSystemObj:{
                    "currentPage": 1,
                    "pageSize": 20,
                    "vo": {
                        belongCityName:'',
                        orderSerial:'',
                        driverName:'',
                        unusualType:'1',
                        riskControlCode:'',//违规原因Code
                        startUseCarTime:'',//开始用车时间
                        endUseCarTime:'',//结束用车时间
                    }
                },
                // tableKeys:'',
                // dialogVisibleDetails:false,
                tableColumn:[],//
                tableColumn1:[{
                    'label': '订单编号',
                    'prop': 'orderSerial',
                    'width':'230',
                    overflow:true
                },{
                    'label': '车主账号',
                    'prop': 'driverMobile',
                    'width':'150',
                    overflow:false
                },{
                    'label': '退回奖励金金额',
                    'prop': 'driverReward',
                    'width':'150',
                    overflow:false
                },{
                    'label': '退回奖励金时间',
                    'prop': 'backTime',
                    'width':'160',
                    overflow:false,
                    slot: (scope) => {
                        return parseTime(scope.row.backTime, '{y}-{m}-{d} {h}:{i}:{s}')
                    }
                },{
                    'label': '处理人',
                    'prop': 'dealName',
                    'width':'150',
                    overflow:false
                },{
                    'label': '描述',
                    'prop': 'desc',
                    overflow:true
                }],
                tableColumn2:[{
                    'label': '订单编号',
                    'prop': 'orderSerial',
                    'width':'230',
                    overflow:true
                },{
                    'label': '车主账号',
                    'prop': 'mobile',
                    'width':'150',
                    overflow:false
                },{
                    'label': '退回行为分值',
                    'prop': 'behaviorScore',
                    'width':'150',
                    overflow:false
                },{
                    'label': '退回行为分时间',
                    'prop': 'createTime',
                    'width':'160',
                    overflow:false,
                    slot: (scope) => {
                        return parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}')
                    }
                },{
                    'label': '处理人',
                    'prop': 'creater',
                    'width':'150',
                    overflow:false
                },{
                    'label': '描述',
                    'prop': 'behaviorDesc',
                    overflow:true
                }],
                showDetails:[],
                spanArr:[],
                pos:0,
                dataTotal:0,
                pickerOptions2:{
                    shortcuts:pickerOptions2
                },
                tableData:[],
            }
        },
        watch:{
            isvisible: {
                handler(newVal, oldVal) {
                    if(newVal){
                        // this.$nextTick(()=>{
                            // this.tableKeys = (new Date()).getTime();
                            // console.log('this.tableKeys',this.tableKeys)
                            this.firstblood();
                        // })
                        // this.timeOut = setInterval(this.firstblood,60000)
                    }
                    // else{
                    //     clearInterval(this.timeOut);
                    // }
                },
                // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
                immediate: true
            },
        },
        mounted(){
            // this.firstblood();
            // this.timeOutAll = setInterval(this.firstblood,2000)
        },  
        beforeDestroy(){
            // clearInterval(this.timeOutAll);
        },
        methods: {
            getValue(obj){
                return obj ? obj.value:'';
            },
            getSearchParam(obj) {
                // console.log(obj)
                this.listSystemObj.vo = objectMerge2(this.listSystemObj.vo, obj);
                if(this.listSystemObj.currentPage!= 1){
                    this.listSystemObj.currentPage = 1;
                    this.$refs.pager.inputval = this.listSystemObj.currentPage;
                    this.$refs.pager.pageNum = this.listSystemObj.currentPage;
                }
                this.firstblood();
            },
            handlePageChange(obj) {
                this.listSystemObj.currentPage = obj.pageNum;
                this.listSystemObj.pageSize = obj.pageSize;
                this.firstblood();
            },
            //刷新页面  
            firstblood(){
                this.loading = true;
                listMasterOrderUnusual(this.listSystemObj).then(res => {
                    // console.log('全部',res)
                    this.dataTotal = res.data.totalCount;
                    let tableArr = objectMerge2(res.data.list);
                    let rowData = [];
                    tableArr.forEach((el,idx) => {
                        el.orderUnusuals.forEach(item => {
                            item.driverMobile = el.driverMobile;
                            item.driverName = el.driverName;
                            item.endAddress = el.endAddress;
                            item.orderPrice = el.orderPrice;
                            item.orderSerial = el.orderSerial;
                            item.startAddress = el.startAddress;
                            item.createTime = el.createTime;
                            item.useCarTime = el.useCarTime;
                            item.finishOrderTime = el.finishOrderTime;
                            item.currentKey = idx;
                            rowData.push(item)
                        })
                    })
                    this.tableData = rowData;
                    this.getSpanArr(this.tableData)
                    this.loading = false;
                }).catch(err => {
                    this.$message({
                        type: 'info',
                        message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                    })
                    this.loading = false;
                })
            },
            getSpanArr(data) {　
                this.spanArr = [];
                this.pos = 0 ;
                for (var i = 0; i < data.length; i++) {
                    if (i === 0) {
                        this.spanArr.push(1);
                        this.pos = 0
                    } else {
                    // 判断当前元素与上一个元素是否相同
                    if (data[i].orderSerial === data[i - 1].orderSerial) {
                            this.spanArr[this.pos] += 1;
                            this.spanArr.push(0);
                        } else {
                            this.spanArr.push(1);
                            this.pos = i;
                        }
                     }
                 }
                // console.log('this.spanArr',this.spanArr)
            },
            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                // console.log('row, column, rowIndex, columnIndex',row, column, rowIndex, columnIndex)
                // console.log('rowIndex',rowIndex)
                if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 || columnIndex === 3 || columnIndex === 4 || columnIndex === 5 || columnIndex === 6) {
                    const _row = this.spanArr[rowIndex];
                    const _col = _row > 0 ? 1 : 0;
                    // console.log('_row,_col',_row,_col,this.spanArr[rowIndex])
                    return {
                        rowspan: _row,
                        colspan: _col
                    }
                }
            },
            //模糊查询 分类名称或者code
            handleSearch(type){
              
            },
            //详情弹窗
            pushOrderSerial(item){
                this.$router.push({name: '订单详情',query:{ orderSerial:item.orderSerial }});
            },
            handleClick(type,row){
                let message ;
                let doAction;
                let params;
                switch(type){
                    case 'returnBehaviorScore':
                        message = '确认退回车主违规已扣行为分吗?'
                        doAction = returnBehavior;
                        params = row.id;
                        break;
                    case 'returnReward':
                        message = '确认退回车主违规已扣奖励金吗?';
                        doAction = returnReward;
                        params = row.orderSerial;
                        break;
                    case 'hasReturnBehaviorScore':
                        // console.log('hasReturnBehaviorScore',type,row)
                        this.tableColumn = this.tableColumn2;
                        returnBehaviorList(row.orderSerial,row.riskControlCode).then(res => {
                            let resArr = [];
                            resArr.push(res.data)
                            this.showDetails = resArr;
                            this.dialogVisibleDetails = true;
                        })
                        break;
                    case 'hasReturnReward':
                        this.tableColumn = this.tableColumn1;
                        listReward(row.orderSerial).then(res => {
                            this.showDetails = res.data;
                            this.dialogVisibleDetails = true;
                        })
                        break;
                }
                // console.log('type',type)

                if(type == 'returnBehaviorScore' || type == 'returnReward'){
                    console.log('type',type)
                    this.$confirm(message, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        doAction(params).then(res => {
                            this.$message({
                                type: 'success',
                                message: '操作成功！',
                            })
                            this.firstblood();
                        }).catch(err => {
                            this.$message({
                                type: 'warning',
                                message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                            })
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        })
                    })
                }
            }
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .systemProcessing{
       
    }
</style>
