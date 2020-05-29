<template>
    <div class="TCorderInfo clearfix" v-loading="loading">
        <!-- 基本信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>基础信息</h2>
            <div class="essentialInformation">
                <p>
                    <span>区代运单号：</span>
                    <span>{{formData.waybillNo}}</span>
                </p>
                <p>
                    <span>运单状态：</span>
                    <span class="fontRed">{{formData.waybillStatusName}}</span>
                </p>
                <p>
                    <span>揽收时间：</span>
                    <span>{{formData.freightTime | parseTime}}</span>
                </p>
                <p>
                    <span>预计到达日期：</span>
                    <span>{{formData.expectArriveTime | parseTime('{y}-{m}-{d}')}}</span>
                </p>
            </div>
            <div class="essentialInformation">
                <p>
                    <span>发车时间：</span>
                    <span>{{formData.carDispatchTime | parseTime}}</span>
                </p>
                <p>
                    <span>实际到达时间：</span>
                    <span>{{formData.carArriveTime | parseTime}}</span>
                </p>
                <p>
                    <span>签收时间：</span>
                    <span>{{formData.signTime | parseTime}}</span>
                </p>
                <p>
                    <span>货主确认收货时间：</span>
                    <span>{{formData.confirmTime | parseTime}}</span>
                </p>
            </div>
            <div class="essentialInformation">
                <p>
                    <span>走货渠道：</span>
                    <span class="fontRed"></span>
                </p>
            </div>         
    </div>
        <!-- 地址信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>地址信息</h2>
            <div v-for="(item,key) in addressArr" :key="key">
                <div class="essentialInformation">
                    <p>
                        <span>{{item.viaOrder == 0 ? '发货地：' : '收货地：'}}</span>
                        <span class="fontRed">{{item.city+item.area}}</span>
                    </p>
                    <p>
                        <span>{{item.viaOrder == 0 ? '发货街道：' : '收货街道：'}}</span>
                        <span>{{item.streetName}}</span>
                    </p>
                    <p>
                        <span>{{item.viaOrder == 0 ? '发货详细地址：' : '收货详细地址：'}}</span>
                        <span>{{item.viaAddressName}}({{item.viaAddress}})</span>
                    </p>
                    <p>
                        <span>{{item.viaOrder == 0 ? '发货人：' : '收货人：'}}</span>
                        <span>{{item.contacts}}</span>
                    </p>
                </div>
                <div class="essentialInformation">
                    <p>
                        <span>联系方式：</span>
                        <span>{{item.contactsPhone}}</span>
                    </p>
                    <p>
                        <span>{{item.viaOrder == 0 ? '是否上门接货：' : '是否需要送货：'}}</span>
                        <span class="fontRed">{{item.viaOrder == 0 ? (formData.isDoorPickUp == '1' ? '需要' : '不需要') : (formData.isDoorDelivery == '1' ? '需要' : '不需要')}}</span>
                    </p>
                </div>
            </div>
        </div>
        <!-- 货物信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>货物信息</h2>
            <div class="essentialInformation" >
            <el-table style="width: 100%" :data="waybillGoodsList" ref="multipleTable" stripe border highlight-current-row show-summary>
            <el-table-column  label="货品名称" prop="goodsTypeName" show-overflow-tooltip></el-table-column>
            <el-table-column  label="重量（公斤）" prop="goodsWeight" show-overflow-tooltip></el-table-column>
            <el-table-column  label="体积（立方）" prop="goodsVolume" show-overflow-tooltip></el-table-column>
            <el-table-column  label="件数" prop="goodsNum" show-overflow-tooltip></el-table-column>
           </el-table>
            </div>
        </div>
        <!-- 增值服务 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>增值服务</h2>
            <div class="essentialInformation">
                <p>
                    <span>货物保价：</span>
                    <span>{{formData.goodsPrice?formData.goodsPrice+'元':''}}</span>
                </p>
                <p>
                    <span>代收货款：</span>
                    <span>{{formData.receivedAmount?formData.receivedAmount+'元':''}}</span>
                </p>
                <p>
                    <span>签收单：</span>
                    <span>{{formData.receiptTypeName}}</span>
                </p>
                <p>
                    <span>发票：</span>
                    <span>{{formData.ifInvoice === "1" ? "是" : "否"}}</span>
                </p>
                <p class="markInfo remakInfo">
                    <span>发货备注：</span>
                    <span>{{formData.remark}}</span>
                </p>
            </div>
        </div>
        <!-- 运费信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>运费信息</h2>
            <div class="essentialInformation">
                <p>
                    <span>实际运费总金额：</span>
                    <span class="fontRed">{{formData.totalAmount?'￥'+formData.totalAmount:''}}</span>
                </p>
                <!-- <p>
                    <span>开单运费总金额：</span>
                    <span>0</span>
                </p> -->
                <p>
                    <span>货主选择付款方式：</span>
                    <span>{{formData.payTimeTypeName}}</span>
                </p>
                <p>
                    <span>优惠金：</span>
                    <span class="fontRed">{{formData.preferentialAmount}}</span>
                </p>
                <p>
                    <span>优惠券：</span>
                    <span class="fontRed">{{formData.discountCouponAmount}}</span>
                </p>
            </div>
            <div class="essentialInformation">
               
                <p>
                    <span>货主应付运费金额：</span>
                    <span class="fontRed">{{formData.payAmount	?'￥'+formData.payAmount	:''}}</span>
                </p>
                <p>
                    <span>付款状态：</span>
                    <span class="fontRed">{{formData.payStatusName}}</span>
                </p>
            </div>
            <div class="essentialInformation" >
            <el-table style="width: 100%" :data="waybillExpensesCourseList" ref="multipleTable" stripe border highlight-current-row >
            <el-table-column  label="费用科目" prop="expensesCourseName" show-overflow-tooltip></el-table-column>
            <el-table-column  label="金额(元)" prop="coursePrice" show-overflow-tooltip>
                 <template slot-scope="scope">
                    {{scope.row.courseType == '3' ? '-'+scope.row.coursePrice : scope.row.coursePrice}}
                </template>
            </el-table-column>
           </el-table>
            </div>
        </div>
        <!-- 货主退款申请 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>货主退款申请</h2>
            <div class="essentialInformation" >
            <el-table style="width: 100%" :data="refundExpensesChangeList" ref="multipleTable" stripe border highlight-current-row >
            <el-table-column  label="申请时间" prop="applyTime" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{scope.row.applyTime | parseTime}}
                </template>
            </el-table-column>
            <el-table-column  label="申请退款总金额" prop="applyAmount" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span style="color:red;">{{scope.row.applyAmount}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="退款明细" prop="" show-overflow-tooltip>
                <template slot-scope="scope">
                    <div v-if="scope.row.lclWaybillExpensesCourseList">
                        <span v-for="(item,idx) in scope.row.lclWaybillExpensesCourseList" :key="idx">
                            {{idx>0 ? ',':''}}{{item.expensesCourseName}}{{item.coursePrice}}
                        </span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column  label="申请退款备注" prop="applyRemark" show-overflow-tooltip></el-table-column>
            <el-table-column  label="退款状态" prop="applyStatusName" show-overflow-tooltip></el-table-column>
            <el-table-column  label="退款时间" prop="acceptTime" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{scope.row.acceptTime | parseTime}}
                </template>
            </el-table-column>
            <el-table-column  label="否决原因" prop="acceptRemark" show-overflow-tooltip></el-table-column>
           </el-table>
            </div>
        </div>
        <!-- 区代费用变更申请 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>区代费用变更申请</h2>
            <div class="essentialInformation" >
            <el-table style="width: 100%" :data="appendExpensesChangeList" ref="multipleTable" stripe border highlight-current-row >
            <el-table-column  label="申请时间" prop="applyTime" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{scope.row.applyTime | parseTime}}
                </template>
            </el-table-column>
            <el-table-column  label="申请费用变更总金额" prop="applyAmount" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span style="color:red;">{{scope.row.applyAmount}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="费用变更明细" prop="" show-overflow-tooltip>
                <template slot-scope="scope">
                    <div v-if="scope.row.lclWaybillExpensesCourseList">
                        <span v-for="(item,idx) in scope.row.lclWaybillExpensesCourseList" :key="idx">
                            {{idx>0 ? ',':''}}{{item.expensesCourseName}}{{item.coursePrice}}
                        </span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column  label="申请备注" prop="applyRemark" show-overflow-tooltip></el-table-column>
            <el-table-column  label="费用变更状态" prop="applyStatusName" show-overflow-tooltip></el-table-column>
            <el-table-column  label="付款时间" prop="acceptTime" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{scope.row.acceptTime | parseTime}}
                </template>
            </el-table-column>
            <el-table-column  label="否决原因" prop="acceptRemark" show-overflow-tooltip></el-table-column>
           </el-table>
            </div>
        </div>
</div>
</template>
<script>
import { parseTime,pickerOptions2 } from '@/utils/index.js'
import { logisticsWaybillDetails } from '@/api/order/logistics/logistics1.js'
export default {
    props:{
        isvisible: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return{
            loading: false,    
            addressArr:[],
            waybillGoodsList:[],
            waybillExpensesCourseList:[],
            refundExpensesChangeList:[],
            appendExpensesChangeList:[],
            formData: {},
        }
    },
    methods:{
    firstblood(){
        this.loading = true;
        logisticsWaybillDetails(this.$route.query.orderSerial).then(res=>{
            this.formData = res.data;
            this.addressArr = res.data.lclWaybillAddressList;
            this.waybillGoodsList = res.data.lclWaybillGoodsList;
            this.waybillExpensesCourseList = res.data.lclWaybillExpensesCourseList;
            this.refundExpensesChangeList = res.data.refundExpensesChangeList;
            this.appendExpensesChangeList = res.data.appendExpensesChangeList;
            this.loading = false;
        }).catch(err => {
            this.addressArr = [];
            this.waybillGoodsList = [];
            this.waybillExpensesCourseList = [];
            this.refundExpensesChangeList = [];
            this.appendExpensesChangeList = [];
            this.$message({
                type: 'info',
                message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
            })
            this.loading = false
        })
    },
    },
    watch:{
        isvisible:{
          handler(newVal,oldVal){
            if (newVal) {
            this.firstblood()
            }   
          },
          immediate: true
      }
    },
}
</script>

