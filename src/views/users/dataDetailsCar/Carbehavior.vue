<template>
    <div class="Carbehavior detailsArrange" >
        <div class="qd-collapse collapseInfo" v-loading="Behaviorloading">
            <h2>车主行为分</h2>
            <div class="essentialInformation_table">
                <el-table
                    :data="BehaviorDataAll"
                    border
                    style="width: 100%">
                    <el-table-column label="序号"  width="60">
                        <template slot-scope="scope">
                            {{ (BehaviorListObj.currentPage - 1) * BehaviorListObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="orderSerial" label="订单流水号" show-overflow-tooltip width='250'>
                        <template  slot-scope="scope">
                            <span class="BtnInfo" @click="pushOrderSerial(scope.row)">{{scope.row.orderSerial}}</span >
                        </template>
                    </el-table-column>
                    <el-table-column label="货主" show-overflow-tooltip width='160'>
                        <template  slot-scope="scope">
                            {{scope.row.shipperName}}<span v-if="scope.row.shipperMobile"> - </span >{{scope.row.shipperMobile}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="behaviorScore" label="行为异常扣分" show-overflow-tooltip width='120'></el-table-column>
                    <el-table-column prop="riskControl" label="行为异常类型" show-overflow-tooltip width='120'></el-table-column>
                    <el-table-column prop="behaviorDesc" label="行为异常描述" show-overflow-tooltip width='120'></el-table-column>
                    <el-table-column prop="shipperType" label="货主类型" show-overflow-tooltip width='150'></el-table-column>
                    <el-table-column prop="orderType" label="服务类型" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="startAddress" label="始发地" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="endAddress" label="目的地" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="totalAmount" label="订单金额" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="complateTime" label="完成时间" show-overflow-tooltip></el-table-column>
                </el-table>
                <el-pagination
                    background
                    @current-change="handleCurrentChangeBehavior"
                    layout="total,prev, pager, next, jumper"
                    :total="BehaviorTotal">
                </el-pagination>
            </div>
        </div>

        <div class="qd-collapse collapseInfo" v-loading="Bailloading">
            <h2>保证金记录</h2>
            <div class="essentialInformation_table">
                <el-table border style="width: 100%" :data="BailDataAll">
                    <el-table-column label="序号"  width="60">
                        <template slot-scope="scope">
                            {{ (BailListObj.currentPage - 1) * BailListObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="orderSerial" label="交易单号" show-overflow-tooltip width='250'>
                        <!-- <template  slot-scope="scope">
                        <span class="BtnInfo" @click="pushOrderSerial(scope.row)">{{scope.row.orderSerial}}</span >
                        </template> -->
                    </el-table-column>
                    <el-table-column prop="updateTime" label="交易时间" show-overflow-tooltip></el-table-column>
                    <el-table-column label="交易分类" show-overflow-tooltip>
                        <template  slot-scope="scope">
                           <span v-if="scope.row.guaranteeAmountType=='0'" class="behaviorPay">缴纳保证金</span>
                           <span v-else class="behaviorDeduct">扣除保证金</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="金额" show-overflow-tooltip>
                        <template slot-scope="scope">
                        <span :class="scope.row.guaranteeAmountType =='0'?'behaviorPay':'behaviorDeduct'">{{scope.row.guaranteeAmountType=='0'?'+':'-'}}{{scope.row.guaranteeAmount}}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    background
                    @current-change="handleCurrentChangeBail"
                    layout="total,prev, pager, next, jumper"
                    :total="BailTotal">
                </el-pagination>
            </div>
        </div>

    </div>
</template>


<script>
import {  driverBehaviorList,DriverDeposit } from '@/api/users/carDetails/index.js'
import { parseTime } from '@/utils/index.js'
export default {
    name:'Carbehavior',
    props: {
    isvisible: {
        type: Boolean,
        default: false
      }
    }, 
    data(){
        return{
        Behaviorloading:true, //行为分Load
        Bailloading:true,     //保证金Load
        BehaviorDataAll:[],   //行为分
        BehaviorTotal:null,
        BehaviorListObj:{   
            "currentPage": 1,
            "pageSize": 10,
            "vo": {
                "userId": this.$route.query.driverId,
            }
        },
        BailDataAll:[],   //保证金
        BailTotal:null,
        BailListObj:{   
            "currentPage": 1,
            "pageSize": 10,
            "vo": {
                "driverId": this.$route.query.driverId,
            }
        },
        }
    },
    methods:{
        //行为分列表 
        BehaviorListBlood(){
        this.Behaviorloading = true
        driverBehaviorList(this.BehaviorListObj).then(res => {
        this.BehaviorTotal = res.data.totalCount
        this.BehaviorDataAll = res.data.list
        this.Behaviorloading = false
        })
        },
        //行为分分页
        handleCurrentChangeBehavior(i){
        this.BehaviorListObj.currentPage = i
        this.BehaviorListBlood();
        },
        //保证金列表
        BailListBlood(){
        this.Bailloading = true
        DriverDeposit(this.BailListObj).then(res => {
        this.BailTotal = res.data.totalCount
        this.BailDataAll = res.data.list
        this.BailDataAll.forEach(item => {
            item.updateTime = parseTime(item.updateTime,"{y}-{m}-{d} {h}:{i}:{s}");
        })
        this.Bailloading = false
        })
        },
        //保证金分页
        handleCurrentChangeBail(i){
        this.BailListObj.currentPage = i
        this.BailListBlood();
        },

        // 订单号跳转
        pushOrderSerial(item){
            this.$router.push({ name: '订单详情', query: { orderSerial: item.orderSerial }})
        }   
    },
    watch: {
        isvisible: {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.BehaviorListBlood()
                    this.BailListBlood()
                }
            },
            immediate: true
        },
    },
}
</script>

<style type="text/css" lang="scss">
.Carbehavior{
    .behaviorPay{
        color:#F56C6C;
        font-weight:bold;
    }
    .behaviorDeduct{
        color:#67C23A;
    }
}
</style>


