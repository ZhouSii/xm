<template>
    <div class="TCorderInfo clearfix" v-loading="loading">
        <!-- 基本信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>基础信息</h2>
            <div class="essentialInformation">
                <p>
                    <span>专线运单号：</span>
                    <span>{{formData.waybillNo}}</span>
                </p>
                <p>
                    <span>运单状态：</span>
                    <span class="fontRed">{{formData.waybillStatusName}}</span>
                </p>
                <p>
                    <span>揽收时间：</span>
                    <span>{{formData.receiveTime}}</span>
                </p>
                <p>
                    <span>预计到达日期：</span>
                    <span>{{formData.expectArriveTime}}</span>
                </p>
            </div>
            <div class="essentialInformation">
                <p>
                    <span>发车时间：</span>
                    <span>{{formData.carDispatchTime}}</span>
                </p>
                <p>
                    <span>实际到达时间：</span>
                    <span>{{formData.actualArriveTime}}</span>
                </p>
                <p>
                    <span>签收时间：</span>
                    <span>{{formData.signTime}}</span>
                </p>
                <p>
                    <span>货主确认收货时间：</span>
                    <span>{{formData.confirmTime}}</span>
                </p>
            </div>         
    </div>
    <!-- 地址信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>地址信息</h2>
            <div class="essentialInformation">
                <p>
                    <span>发货地：</span>
                    <span class="fontRed">{{formData.sendArea}}</span>
                </p>
                <p>
                    <span>发货街道：</span>
                    <span>{{formData.sendStreet}}</span>
                </p>
                <p>
                    <span>发货详细地址：</span>
                    <span>{{formData.sendAddress}}</span>
                </p>
                <p>
                    <span>发货人：</span>
                    <span>{{formData.sender}}</span>
                </p>
            </div>
            <div class="essentialInformation">
                <p>
                    <span>联系方式：</span>
                    <span>{{formData.senderMobile}}</span>
                </p>
                <p>
                    <span>是否上门接货：</span>
                    <span class="fontRed">{{formData.isPickUp=='1'?'是':'否'}}</span>
                </p>
            </div>
            <div class="essentialInformation">
                <p>
                    <span>收货地：</span>
                    <span class="fontRed">{{formData.consignArea}}</span>
                </p>
                <p>
                    <span>收货街道：</span>
                    <span>{{formData.consignStreet}}</span>
                </p>
                <p>
                    <span>收货详细地址：</span>
                    <span>{{formData.consignAddress}}</span>
                </p>
                <p>
                    <span>收货人：</span>
                    <span>{{formData.consignee}}</span>
                </p>
            </div>
            <div class="essentialInformation">
                <p>
                    <span>联系方式：</span>
                    <span>{{formData.consigneeMobile}}</span>
                </p>
                <p>
                    <span>是否需要送货：</span>
                    <span class="fontRed">{{formData.isDelivery=='1'?'是':'否'}}</span>
                </p>
            </div>     
        </div>
        <!-- 货物信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>货物信息</h2>
            <div class="essentialInformation" >
            <el-table style="width: 100%" :data="goodsTypeList" ref="multipleTable" stripe border highlight-current-row show-summary>
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
                    <span>{{formData.collectPayAmount?formData.collectPayAmount+'元':''}}</span>
                </p>
                <p>
                    <span>签收单：</span>
                    <span>{{formData.receiptTypeName}}</span>
                </p>
                <p class="markInfo remakInfo">
                    <span>发货备注：</span>
                    <span>{{formData.sendRemark}}</span>
                </p>
            </div>
        </div>
        <!-- 运费信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>运费信息</h2>
            <div class="essentialInformation">
                <p>
                    <span>实际运费总金额：</span>
                    <span>{{formData.actualTotalAmount?'￥'+formData.actualTotalAmount : ''}}</span>
                </p>
                <p>
                    <span>付款方式：</span>
                    <span>{{formData.payTimeType=='1'?'现付':'到付'}}</span>
                </p>
            </div>
            <div class="essentialInformation" >
            <el-table style="width: 100%" :data="formData.expensesCourseList" ref="multipleTable" stripe border highlight-current-row >
            <el-table-column  label="费用科目" prop="expensesCourseName" show-overflow-tooltip></el-table-column>
            <el-table-column  label="金额(元)" prop="courseBalance" show-overflow-tooltip></el-table-column>
           </el-table>
            </div>
        </div>
        <!-- 区代费用变更申请 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>区代费用变更申请</h2>
            <div class="essentialInformation" >
            <el-table style="width: 100%" :data="formData.agencyExpensesChangeList" ref="multipleTable" stripe border highlight-current-row >
                <el-table-column  label="申请时间" prop="applyTime" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.applyTime}}
                    </template>
                </el-table-column>
                <el-table-column  label="申请费用变更总金额" prop="applyAmount" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span style="color:red;">{{scope.row.applyAmount}}</span>
                    </template>
                </el-table-column>
                <el-table-column  label="费用变更明细" prop="" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div v-if="scope.row.expensesDetails">
                            <span v-for="(item,idx) in scope.row.expensesDetails" :key="idx">
                                {{idx>0 ? ',':''}}{{item.expensesCourseName}}{{item.coursePrice}}
                            </span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column  label="申请备注" prop="applyRemark" show-overflow-tooltip></el-table-column>
                <el-table-column  label="费用变更状态" prop="applyStatusName" show-overflow-tooltip></el-table-column>
                <el-table-column  label="确认时间" prop="replyTime" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.replyTime}}
                    </template>
                </el-table-column>
                <el-table-column  label="否决原因" prop="acceptRemark" show-overflow-tooltip></el-table-column>
            </el-table>
            </div>
        </div>
        <!-- 专线费用变更申请 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>专线费用变更申请</h2>
            <div class="essentialInformation" >
            <el-table style="width: 100%" :data="formData.carriersExpensesChangeList" ref="multipleTable" stripe border highlight-current-row >
                <el-table-column  label="申请时间" prop="applyTime" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.applyTime}}
                    </template>
                </el-table-column>
                <el-table-column  label="申请费用变更总金额" prop="applyAmount" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span style="color:red;">{{scope.row.applyAmount}}</span>
                    </template>
                </el-table-column>
                <el-table-column  label="费用变更明细" prop="" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div v-if="scope.row.expensesDetails">
                            <span v-for="(item,idx) in scope.row.expensesDetails" :key="idx">
                                {{idx>0 ? ',':''}}{{item.expensesCourseName}}{{item.coursePrice}}
                            </span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column  label="申请备注" prop="applyRemark" show-overflow-tooltip></el-table-column>
                <el-table-column  label="费用变更状态" prop="applyStatusName" show-overflow-tooltip></el-table-column>
                <el-table-column  label="确认时间" prop="replyTime" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.replyTime}}
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
import { logisticsCarriersDetails } from  '@/api/order/logistics/logistics1.js'
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
        goodsTypeList:[],
        }
    },
    methods:{
        firstblood(){
            this.loading = true;
            logisticsCarriersDetails(this.$route.query.orderSerial).then(res=>{
                this.formData = res.data ? res.data : {} ;
                this.goodsTypeList = [];
                this.goodsTypeList.push({
                    goodsTypeName:res.data.goodsTypeName,
                    goodsVolume:res.data.goodsVolume,
                    goodsWeight:res.data.goodsWeight,
                    goodsNum:res.data.goodsNum,
                })
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

