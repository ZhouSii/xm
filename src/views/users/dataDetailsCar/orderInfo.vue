<template>
    <div class="ordersInfo detailsArrange">
        <!-- 信息概要 -->
        <div class="detailsInfo-collapse collapseInfo">
            <h2>订单统计</h2>
            <div class="essentialInformation">
                <el-row class="basicInfo" :span='24'>
                    <!-- 第一行 -->
                    <el-col :span="4">推单数：</el-col>
                    <el-col :span="2">{{orderPriceInfo.pushTotal}}</el-col>
                    <el-col :span="4">抢单数：</el-col>
                    <el-col :span="2">{{orderPriceInfo.grabTotal}}</el-col>
                    <el-col :span="4">中单数：</el-col>
                    <el-col :span="2">{{orderPriceInfo.singularTotal}}</el-col>
                    <el-col :span="4">完成订单：</el-col>
                    <el-col :span="2">{{orderPriceInfo.finishOrder}}</el-col>
                    <el-col :span="4">完成订单总金额：</el-col>
                    <el-col :span="2">{{orderPriceInfo.finishOrderTotal}}</el-col>
                    <el-col :span="4">线上支付完成订单数：</el-col>
                    <el-col :span="2">{{orderPriceInfo.onLineTransOrder}}</el-col>
                    <el-col :span="4">线上支付完成订单金额：</el-col>
                    <el-col :span="2">{{orderPriceInfo.onLineTransTotal}}</el-col>
                    <el-col :span="4">线下支付完成订单数：</el-col>
                    <el-col :span="2">{{orderPriceInfo.offlineTransOrder}}</el-col>
                    <el-col :span="4">线下支付完成订单金额：</el-col>
                    <el-col :span="2">{{orderPriceInfo.offlineTransTotal}}</el-col>
                    <el-col :span="4">线上支付完成订单占比：</el-col>
                    <el-col :span="2">{{orderPriceInfo.onLineTransOrderRate}}</el-col>   
                </el-row>
            </div>
            </div>
        <!-- 小货车订单 -->
        <div class="qd-collapse collapseInfo" v-loading="graploading">
            <h2>小货车订单</h2>
            <div class="qd-collapse_title clearfix">
                <ul class="classfyTitle fl">
                   <li v-for="(item,index) in grapListDataType" :key="item.name" :class="{currentClick:item.iscur}" @click="setCur(index,'grap',item.label)">{{item.name}}</li>
                </ul>
                <el-form :inline="true"  class="demo-ruleForm qdSearch fr" >
                <el-form-item label="下单时间：">
                    <el-date-picker
                        v-model="grapListTime"
                        type="daterange"
                        :picker-options="pickerOptions2"
                        range-separator="-"
                        unlink-panels
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right"
                        :default-time="['00:00:00', '23:59:59']"
                        @change='grapListTimeVal'
                        value-format="timestamp">
                    </el-date-picker>
                </el-form-item>
                </el-form>
            </div>
            <div class="essentialInformation_table" style="padding-top:0;">
                <el-table border style="width: 100%" :data="grapListData">
                    <el-table-column label="序号"  width="60">
                        <template slot-scope="scope">
                          {{ (grapListObj.currentPage - 1) * grapListObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>  
                    <el-table-column show-overflow-tooltip prop="orderSerial" label="订单号" width='250'>
                        <template  slot-scope="scope">
                        <span class="BtnInfo" @click="pushOrderSerial(scope.row)">{{scope.row.orderSerial}}</span >
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip prop="" label="货主">
                        <template slot-scope="scoped">
                        {{scoped.row.shipperName}} - {{scoped.row.shipperMobile}}
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip prop="serviceType" label="服务类型">
                    </el-table-column>
                    <el-table-column show-overflow-tooltip prop="startAddress" label="始发地">
                    </el-table-column>
                    <el-table-column show-overflow-tooltip prop="endAddress" label="目的地">
                    </el-table-column>
                    <el-table-column show-overflow-tooltip prop="orderStartTime" label="下单时间" >
                    </el-table-column>
                    <el-table-column show-overflow-tooltip prop="totalAmount" label="订单金额" >
                    </el-table-column>
                    <el-table-column show-overflow-tooltip prop="orderStatus" label="订单状态" >
                    </el-table-column>
                    <el-table-column show-overflow-tooltip prop="complateTime" label="完成时间" >
                    </el-table-column>
                </el-table>
                <el-pagination
                    background
                    @current-change="handleCurrentChangeGrapList"
                    layout="total, prev, pager, next, jumper"
                    :total="grapListTotalCount">
                </el-pagination>
            </div>
        </div>

        <!-- 改派订单&原因 -->
        <div class="logInfo-collapse collapseInfo" v-loading="cancelloading">
            <h2>改派订单&原因</h2>
            <div class="essentialInformation_table">
                <el-table border style="width: 100%" :data="cancelListData">
                    <el-table-column label="序号"  width="60">
                        <template slot-scope="scope">
                            {{ (cancelListObj.currentPage - 1) * cancelListObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>  
                    <el-table-column show-overflow-tooltip prop="orderSerial" label="订单号" width='250'>
                        <template  slot-scope="scope">
                        <span class="BtnInfo" @click="pushOrderSerial(scope.row)">{{scope.row.orderSerial}}</span >
                        </template>
                    </el-table-column>
                    <el-table-column prop="belongCity" label="下单区域" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="totalAmount" label="订单金额" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="cancelTime" label="改派时间" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="cancelCause" label="改派原因" show-overflow-tooltip></el-table-column>
                </el-table>
                <el-pagination
                    background
                    @current-change="handleCurrentChangeCancelList"
                    layout="total, prev, pager, next, jumper"
                    :total="cancelTotalCount">
                </el-pagination>
            </div>
        </div>
    
        <!--  对货主的评价记录 -->
        <div class="logInfo-collapse collapseInfo" v-loading="reassignmentloading">
            <h2> 对货主的评价记录</h2>
            <div class="essentialInformation_table">
                <el-table border style="width: 100%" :data ="reassignmentTotal">
                    <el-table-column label="序号"  width="60">
                        <template slot-scope="scope">
                            {{ (reassignmentListObj.currentPage - 1) * reassignmentListObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>  
                    <el-table-column show-overflow-tooltip prop="orderSerial" label="订单号" width='250'>
                        <template  slot-scope="scope">
                        <span class="BtnInfo" @click="pushOrderSerial(scope.row)">{{scope.row.orderSerial}}</span >
                        </template>
                    </el-table-column>
                    <el-table-column prop="serviceName" label="服务类型" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="starLevel" label="获评星级" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="" label="货主信息" show-overflow-tooltip>
                        <template slot-scope="scoped">
                        {{scoped.row.shipperMobile}} <span v-if="scoped.row.shipperName">-</span> {{scoped.row.shipperName}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="evaluationType" label="评价标签" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="evaluationDes" label="评价内容" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="updateTime" label="评价时间" show-overflow-tooltip></el-table-column>
                </el-table>
                <el-pagination
                    background
                    @current-change="handleCurrentChangeReassignment"
                    layout="total, prev, pager, next, jumper"
                    :total="reassignmentTotalCount">
                </el-pagination>
            </div>
        </div>

        <!-- 装货/回单图片 -->
        <div class="logInfo-collapse collapseInfo" v-loading="shipmentloading">
            <h2>装货/回单图片</h2>
            <div class="essentialInformation_table">
                <el-table border style="width: 100%" :data="shipmentListData">
                    <el-table-column label="序号"  width="60">
                        <template slot-scope="scope">
                            {{ (shipmentListObj.currentPage - 1) * shipmentListObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>  
                    <el-table-column show-overflow-tooltip prop="orderSerial" label="订单号" width='250'>
                        <template  slot-scope="scope">
                        <span class="BtnInfo" @click="pushOrderSerial(scope.row)">{{scope.row.orderSerial}}</span >
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="图片" width="120">
                        <template  slot-scope="scope">
                            <div class="shipmentImg">
                                <img :src="scope.row.filePath" v-viewer>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="startAddress" label="提货地" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="endAddress" label="到达地" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="transportStatus" label="类型" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="createTime" label="上传时间" show-overflow-tooltip></el-table-column>
                     <el-table-column prop="address" label="上传位置" show-overflow-tooltip></el-table-column>
                </el-table>
                <el-pagination
                    background
                    @current-change="handleCurrentChangesShipment"
                    layout="total, prev, pager, next, jumper"
                    :total="shipmentTotalCount">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>

import { parseTime,pickerOptions2} from '@/utils/index.js'
import { orderPriceInfo,grapList,driverTradOrdeList,reassignmentDriverList,orderDriverEvaList,orderFollowingFileList} from '@/api/users/carDetails/index.js'

export default {
  name: 'ordersInfo',
  components: { 
  },
  props: {
    isvisible: {
        type: Boolean,
        default: false
      }
  }, 
  data() {
    return {
        graploading: true,    //小货车订单Load
        cancelloading: true,  //改派订单Load
        reassignmentloading:true, //对货主的评价记录Load
        shipmentloading:true,    //装货/回单图片Load
        pickerOptions2:{
            shortcuts:pickerOptions2
        },
        btnsize:'medium',
        orderPriceInfo:{},//订单信息概要
        grapListObj:{//订单抢单记录表查询条件
            "currentPage": 1,
            "pageSize": 10,
            "vo": {
                "driverId": null,
                "orderTimeStart": null,
                "orderTimeEnd": null,
                "orderStatus": null,
            }
        },
        grapListTime:[],         //小货车下单时间
        grapListTotalCount:null, //小货车订单总数
        grapListDataType:[
            {name:'全部',label:'',iscur:true},
            {name:'已完成',label:'AF00807',iscur:false},
            {name:'已取消',label:'AF00808',iscur:false},
        ],
        grapListData:[],           //小货车订单数据
        cancelListObj:{            //取消原因查询条件
            "currentPage": 1,
            "pageSize": 10,
            "vo": {
                "driverId": this.$route.query.driverId,
            }
        },
        cancelTime:[],             //改派原因时间段
        cancelTotalCount:null,     //改派原因总数
        cancelListData:[],         //改派原因数据
        reassignmentListObj:{      //对货主的评价记录查询条件
            "currentPage": 1,
            "pageSize": 10,
            "vo": {
                "evaluationId": this.$route.query.driverId,
                "type":'0'
            }
        },
        reassignmentTotal:[],        //对货主的评价记录数据
        reassignmentTotalCount:null, //对货主的评价记录总数
        shipmentListObj:{              //装货/回单查询条件
            "currentPage": 1,
            "pageSize": 10,
            "vo": {
                "userId": this.$route.query.driverId,
            }
        },
        shipmentListData:[],         //装货/回单数据
        shipmentTotalCount:null,     //装货/回单总数
      }
  },
    watch: {
        isvisible: {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.init()
                }
            },
            immediate: true
        },
    },
    methods: {
        init() {
            let driverId = this.$route.query.driverId;
            this.grapListObj.vo.driverId = driverId;
            this.PriceInfo(driverId);
            this.GrapList();
            this.cancelMethods();
            this.reassignmentMethods();
            this.shipmentMethods();
        },
        //订单信息概要
        PriceInfo(driverId){
            orderPriceInfo(driverId).then(res => {
                this.orderPriceInfo = res.data;
            })
        },
        //小货车订单列表
        GrapList(){
            this.graploading = true
            driverTradOrdeList(this.grapListObj).then(res => {
                this.grapListData = res.data.list;
                this.grapListTotalCount = res.data.totalCount;
                this.grapListData.forEach(item => {
                item.orderStartTime = parseTime(item.orderStartTime,"{y}-{m}-{d} {h}:{i}:{s}");
                item.complateTime = parseTime(item.complateTime,"{y}-{m}-{d} {h}:{i}:{s}");
                })
                this.graploading = false
            }).catch(err=>{
                console.log(err)
            })
        },
        // 小货车订单当前页
        handleCurrentChangeGrapList(val){
            this.grapListObj.currentPage = val;
            this.GrapList();
        },
        setCur(index,classfy,label){
            switch(classfy){
                case 'grap':
                    this.grapListDataType.forEach((el,idx)=>{
                        idx == index ? el.iscur = true : el.iscur = false;
                    })
                    if(index){
                    this.grapListObj.vo.orderStatus = label;
                    }
                    else{
                    this.grapListObj.vo.orderStatus = null;
                    }
                    this.GrapList();
                    break;
            }
        },
        // 小货车下单时间
        grapListTimeVal(i){
            this.grapListObj.vo.orderStatus = null;
                if(i){
                    this.grapListObj.vo.orderTimeStart = i[0];
                    this.grapListObj.vo.orderTimeEnd = i[1];
                }else{  
                    this.grapListObj.vo.orderTimeStart = '';
                    this.grapListObj.vo.orderTimeEnd = '';
                }
                this.GrapList();
        },
        // 改派原因列表
        cancelMethods(){
            this.cancelloading = true
            reassignmentDriverList(this.cancelListObj).then(res=>{
                this.cancelListData = res.data.list
                this.cancelTotalCount = res.data.totalCount
                this.cancelListData.forEach(item => {
                item.cancelTime = parseTime(item.cancelTime,"{y}-{m}-{d} {h}:{i}:{s}");
                })
            this.cancelloading = false
            })
        },
        // 改派原因当前页
        handleCurrentChangeCancelList(val){
            this.cancelListObj.currentPage = val;
            this.cancelMethods();
        },
        // 对货主的评价记录
        reassignmentMethods(){
            this.reassignmentloading = true
            orderDriverEvaList(this.reassignmentListObj).then(res => {
                this.reassignmentTotal = res.data.list[0].aflcOrderDriverEvaluationDtoList;
                this.reassignmentTotalCount = res.data.totalCount;
                this.reassignmentTotal.forEach(item => {
                item.updateTime = parseTime(item.updateTime,"{y}-{m}-{d} {h}:{i}:{s}");
                })
                this.reassignmentloading = false
                })
        },
        // 对货主的评价记录当前页
        handleCurrentChangeReassignment(val){
            this.reassignmentListObj.currentPage = val;
            this.reassignmentMethods();
        },

        // 装货/回单
        shipmentMethods(){
            this.shipmentloading = true
            orderFollowingFileList(this.shipmentListObj).then(res => {
                this.shipmentListData = res.data.list;
                this.shipmentTotalCount = res.data.totalCount;
                this.shipmentloading = false
                })
        },
        // 装货/回单当前页
        handleCurrentChangesShipment(val){
            this.shipmentListObj.currentPage = val;
            this.shipmentMethods();
        },

        // 详情弹窗
        pushOrderSerial(item) {
        this.$router.push({ name: '订单详情', query: { orderSerial: item.orderSerial }})
        }
        }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .ordersInfo{
        .collapseInfo{
            .qd-collapse_title{
                padding: 10px 0;
            }
        .needMoreInfo{
            cursor: pointer;
            color: #3e9ff1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .shipmentImg{
            width:100px;
            height:100px;
            cursor:pointer;
            img{
                width:100px;
                height:100px;
            }
        }
        }
    }
</style>
