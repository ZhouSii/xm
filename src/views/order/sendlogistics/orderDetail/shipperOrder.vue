<template>
    <div class="TCorderInfo clearfix" v-loading="loading">
        <!-- 基本信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>基础信息</h2>
            <div class="essentialInformation">
                <p>
                    <span>订单号：</span>
                    <span>{{formData.orderSerial}}</span>
                </p>
                <p>
                    <span>订单类型：</span>
                    <span>{{formData.orderTypeName}}</span>
                </p>
                <p>
                    <span>订单状态：</span>
                    <span class="fontRed">{{formData.orderStatusName}}</span>
                </p>
                <p>
                    <span>货主账号：</span>
                    <span>{{formData.shipperMobile}}</span>
                </p>
            </div>
            <div class="essentialInformation">
                <p>
                    <span>货主姓名：</span>
                    <span>{{formData.shipperName}}</span>
                </p>
                <p>
                    <span>货主所属业务员：</span>
                    <span>{{formData.shipperSalesmanName}}</span>
                </p>
                <p>
                    <span>订单来源：</span>
                    <span>{{formData.orderFromName}}</span>
                </p>
                <p>
                    <span>下单时间：</span>
                    <span>{{formData.useTime | parseTime}}</span>
                </p>
            </div>
            <div class="essentialInformation">
                <p>
                    <span>区代响应时间：</span>
                    <span class="fontRed">{{formData.responseTime | parseTime}}</span>
                </p>
                <p>
                    <span>揽收时间：</span>
                    <span class="fontRed">{{formData.freightTime | parseTime}}</span>
                </p>
            </div>         
    </div>
    <!-- 区代信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>区代信息</h2>
            <div class="essentialInformation">
                <p>
                    <span>区代：</span>
                    <span class="fontRed">{{formData.agencyName}}</span>
                </p>
                <p>
                    <span>区代物流公司：</span>
                    <span class="fontRed">{{formData.agencyCompanyName}}</span>
                </p>
                <p>
                    <span>联系人：</span>
                    <span>{{formData.agencyContact}}</span>
                </p>
                <p>
                    <span>联系电话：</span>
                    <span>{{formData.agencyContactPhone}}</span>
                </p>
            </div>
            <div class="essentialInformation">
                <p>
                    <span>区代客服电话：</span>
                    <span>{{formData.agencyServiceMobile}}</span>
                </p>
            </div>
        </div>
        <!-- 地址信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>地址信息</h2>
            <div v-for="(item,key) in formData.lclOrderAddressList" :key="key">
                <div class="essentialInformation">
                    <p>
                        <span>{{item.viaOrder == 0 ? '发货地：' : '收货地：'}}</span>
                        <span class="fontRed">{{item.city+item.area}}</span>
                    </p>
                    <p>
                        <span>{{item.viaOrder == 0 ? '发货街道：' : '收货街道：'}}</span>
                        <span>{{item.streetName}}</span>
                    </p>
                    <p class="morewidth">
                        <span>{{item.viaOrder == 0 ? '发货详细地址：' : '收货详细地址：'}}</span>
                        <span>{{item.viaAddressName}}({{item.viaAddress}})</span>
                    </p>
                </div>
                <div class="essentialInformation">
                    <p>
                        <span>{{item.viaOrder == 0 ? '发货人：' : '收货人：'}}</span>
                        <span>{{item.contacts}}</span>
                    </p>
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
            <el-table style="width: 100%" :data="formData.lclOrderGoodsList"  ref="multipleTable" stripe border highlight-current-row show-summary>
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
                    <span>{{formData.receivedAmount}}</span>
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
        <!-- 预估运费 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>预估运费</h2>
            <div class="essentialInformation">
                <p>
                    <span>预估运费总额：</span>
                    <span class="fontRed">{{formData.totalAmount? '￥'+formData.totalAmount :''}}</span>
                </p>
                <p>
                    <span>付款方式：</span>
                    <span>{{formData.payTimeTypeName}}</span>
                </p>
                <p>
                    <span>预估优惠金减免：</span>
                    <span class="fontRed">{{formData.preferentialAmount?'￥'+formData.preferentialAmount:''}}</span>
                </p>
                <p>
                    <span>预估优惠券减免：</span>
                    <span class="fontRed">{{formData.discountCouponAmount?'￥'+formData.discountCouponAmount:''}}</span>
                </p>
            </div>
            <div class="essentialInformation">
                <p>
                    <span>预估货主应付款金额：</span>
                    <span class="fontRed">{{formData.shipperShouldPayAmount?'￥'+formData.shipperShouldPayAmount:''}}</span>
                </p>
            </div>
            <div class="essentialInformation" >
            <el-table style="width: 100%" :data="formData.lclOrderExpensesCourseList" ref="multipleTable" stripe border highlight-current-row >
            <el-table-column  label="费用科目" prop="expensesCourseName" show-overflow-tooltip></el-table-column>
            <el-table-column  label="预估金额(元)" prop="coursePrice" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{scope.row.courseType == '3' ? '-'+scope.row.coursePrice : scope.row.coursePrice}}
                </template>
            </el-table-column>
           </el-table>
            </div>
        </div>
</div>
</template>
<script>
import { parseTime,pickerOptions2 } from '@/utils/index.js'
import { logisticsShipperOrderDetails } from '@/api/order/logistics/logistics1.js'
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
        formData: {},
        }
    },
    methods:{
        firstblood(){
            this.loading = true;
            logisticsShipperOrderDetails(this.$route.query.orderSerial).then(res=>{
                this.formData = res.data
                // this.formData.useTime = parseTime(this.formData.useTime,"{y}-{m}-{d} {h}:{i}:{s}");
                this.loading = false;
            }).catch(err => {
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

