<template>
    <div class="TCorderInfo clearfix OrderLog" v-if="formData.length != 0" v-loading="loading">
        <!-- 订单基础信息 -->
        <div class="orderInfo-collapse collapseInfo" >
            <h2>订单基础信息</h2>
            <div class="essentialInformation">
                <p>
                    <span>订单编号：</span>
                    <span>{{formData.orderSerial}}</span>
                 </p>
                <p>
                    <span>订单类型：</span>
                    <span >{{formData.orderTypeName}}</span>
                </p>                 
                <p>
                    <span>订单状态：</span>
                    <span>{{formData.orderStatusName}}</span>
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
                    <span>{{formData.useTime}}</span>
                </p>            
            </div>
            <div class="essentialInformation">
                <p>
                    <span>区代响应时间：</span>
                    <span>{{formData.responseTime|parseTime}}</span>
                </p>                
                <p>
                    <span>揽收时间：</span>
                    <span>{{formData.freightTime}}</span>
                 </p>
                <p>
                    <span>预计到货时间：</span>
                    <span>{{formData.expectArriveTime}}</span>
                 </p>
                <p>
                    <span>实际到货日期：</span>
                    <span>{{formData.actualArriveTime}}</span>
                </p>
            </div>
        </div>

        <!-- 区代信息 -->
        <div class="orderInfo-collapse collapseInfo" >
            <h2>区代信息</h2>
            <div class="essentialInformation">
                <p>
                    <span>区代：</span>
                    <span>{{formData.agencyDetailAddress}}</span>
                 </p>
                <p>
                    <span>区代物流公司：</span>
                    <span >{{formData.agencyCompanyName}}</span>
                </p>                 
                <p>
                    <span>联系人：</span>
                    <span>{{formData.agencyContactName}}</span>
                </p>  
                <p>
                    <span>联系电话：</span>
                    <span>{{formData.agencyMobile}}</span>
                </p>   
            </div>
            <div class="essentialInformation">
                <p>
                    <span>区代客服电话：</span>
                    <span>{{formData.agencyCustsvcMobile}}</span>
                </p>       
            </div>
        </div>
        <!-- 地址信息 -->
        <div class="orderInfo-collapse collapseInfo" v-if="formData.orderAddressList">
            <h2>地址信息</h2>
            <div class="essentialInformation">
                <p>
                    <span>发货地：</span>
                    <span v-if="formData.orderAddressList.length>0">{{formData.orderAddressList[0].provinceCityArea}}</span>
                 </p>
                <p>
                    <span>发货街道：</span>
                    <span v-if="formData.orderAddressList.length>0">{{formData.orderAddressList[0].streetName}}</span>
                 </p>
                <p>
                    <span>发货详细地址：</span>
                    <span v-if="formData.orderAddressList.length>0">{{formData.orderAddressList[0].viaAddressName}}</span>
                 </p>
                <p>
                    <span>发货人：</span>
                    <span v-if="formData.orderAddressList.length>0">{{formData.orderAddressList[0].contacts}}</span>
                 </p>                 
                <p>
                    <span>联系方式：</span>
                    <span v-if="formData.orderAddressList.length>0">{{formData.orderAddressList[0].contactsPhone}}</span>
                </p>
                <p>
                    <span>是否上门接货：</span>
                    <span>{{formData.isDoorPickUp==0?'否':'是'}} <i v-if="formData.loadingTime||formData.loadingTimeFragmentName" class="detail_i">({{formData.loadingTime}} {{formData.loadingTimeFragmentName}})</i></span>
                </p>
            </div>
            <div class="essentialInformation">
                <p>
                    <span>收货地：</span>
                    <span v-if="formData.orderAddressList.length>0">{{formData.orderAddressList[1].provinceCityArea}}</span>
                 </p>
                <p>
                    <span>收货街道：</span>
                    <span v-if="formData.orderAddressList.length>0">{{formData.orderAddressList[1].streetName}}</span>
                </p>
                <p>
                    <span>收货详细地址：</span>
                    <span v-if="formData.orderAddressList.length>0">{{formData.orderAddressList[1].viaAddressName}}</span>
                </p>
                <p>
                    <span>收货人：</span>
                    <span v-if="formData.orderAddressList.length>0">{{formData.orderAddressList[1].contacts}}</span>
                </p>                 
                <p>
                    <span>联系方式：</span>
                    <span v-if="formData.orderAddressList.length>0">{{formData.orderAddressList[1].contactsPhone}}</span>
                </p>
                <p>
                    <span>是否需要送货：</span>
                    <span>{{formData.isDoorDelivery==0?'否':'是'}}</span>
                </p>
            </div>
        </div>

        <!-- 货物信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>货物信息</h2>
            <div class="essentialInformation" >
            <el-table style="width: 100%" ref="multipleTable" stripe border highlight-current-row :data="formData.orderGoodsList" show-summary>
            <el-table-column  label="货品名称" prop="goodsName" ></el-table-column>
            <el-table-column  label="重量（公斤）" prop="goodsWeight" ></el-table-column>
            <el-table-column  label="体积（立方）" prop="goodsVolume" ></el-table-column>
            <el-table-column  label="件数" prop="goodsNum" ></el-table-column>
           </el-table>
            </div>
             <div class="essentialInformation">
            <p class="wholeP">
            <span>发货备注:</span>
            <el-tooltip class="item" effect="dark" :content="formData.orderExtra.remark" placement="top-start" v-if="formData.orderExtra">
            <span>{{formData.orderExtra.remark}}</span>
            </el-tooltip>
             </p>
            </div>
        </div>

        <!--  运费信息 -->
        <div class="orderInfo-collapse collapseInfo" v-if="formData.orderExpenses">
            <h2>运费信息</h2>
            <div class="essentialInformation">
                <p>
                    <span>运费总额：</span>
                    <span>￥{{formData.orderExpenses.totalAmount}}</span>
                </p>
                <p>
                    <span>货主选择付款方式：</span>
                    <span >{{formData.payTimeType=='0'?'到付':'现付'}}</span>
                </p>                 
                <p>
                    <span>付款状态：</span>
                    <span>{{formData.payStatusName}} <i v-if="formData.payWayName" class="detail_i">({{formData.payWayName}})</i></span>
                </p>  
                <p>
                    <span>干线费：</span>
                    <span v-if="formData.orderExpenses">￥{{formData.orderExpenses.transportRangeCost}}</span>
                </p>   
            </div>
            <div class="essentialInformation">
                <p>
                    <span>提货费：</span>
                    <span v-if="formData.orderExpenses">￥{{formData.orderExpenses.pickUpCost}}</span>
                </p>
                <p>
                    <span>送货费：</span>
                    <span v-if="formData.orderExpenses">￥{{formData.orderExpenses.deliveryCost}}</span>
                </p>                 
                <p>
                    <span>代收货款服务费：</span>
                    <span v-if="formData.orderExpenses">￥{{formData.orderExpenses.codServiceCost}} <i v-if="formData.orderExtra" class="detail_i">(代收货款{{formData.orderExtra.receivedAmount}}元)</i></span>
                </p>  
                <p>
                    <span>货物保价服务费：</span>
                    <span v-if="formData.orderExpenses">￥{{formData.orderExpenses.valuationCost}} <i v-if="formData.goodsPrice" class="detail_i">(货物保价{{formData.goodsPrice}}元)</i></span>
                </p>       
            </div>
            <div class="essentialInformation">
                <p>
                    <span>签收单服务费：</span>
                    <span v-if="formData.orderExpenses">￥{{formData.orderExpenses.receiptCost}} <i v-if="formData.orderExtra" class="detail_i">({{formData.orderExtra.extraName}})</i></span>
                </p>
                <p>
                    <span>其他费：</span>
                    <span v-if="formData.orderExpenses">￥{{formData.orderExpenses.otherCost?formData.orderExpenses.otherCost:'0'}}</span>
                </p>
                <p>
                    <span>优惠金：</span>
                    <span v-if="formData.orderExpenses">￥{{formData.orderExpenses.preferentialGoldAmount}}</span>
                </p>  
                <p>
                    <span>优惠券：</span>
                    <span v-if="formData.orderExpenses">{{formData.orderExpenses.discountCouponAmount}}</span>
                </p>       
            </div>
        </div>

        <!-- 客服备注 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>客服备注 <el-button type="primary"  plain  size="mini" icon="el-icon-edit" class="btn_right" @click="dialogVisible = true">添加备注</el-button></h2>
            <div class="essentialInformation" v-if="formData.lclOrderCustsvcList.length>0">
            <el-table style="width: 100%" ref="multipleTable" stripe border highlight-current-row :data="formData.lclOrderCustsvcList">
                <el-table-column  label="客服" prop="creater" width='150'></el-table-column>
                <el-table-column  label="备注时间" prop="createTime" width='250'>
                    <template slot-scope="scope">
                    {{scope.row.createTime|parseTime}}
                    </template>
                </el-table-column>
                <el-table-column  label="备注内容" prop="remark" show-overflow-tooltip></el-table-column>
            </el-table>
            </div>
            <div class="essentialInformationNull" v-else>
                    <img src="../../../../../assets/icom/25xinxi.png" alt="">
                    <span>客服未备注!</span>
            </div>
        </div>


        <!-- 客服备注弹框 -->
        <el-dialog :visible.sync="dialogVisible" width="30%" :closeOnClickModal='false'>
                        <el-input
                                type="textarea"
                                    :rows="5"
                                    placeholder="1-500间的字符" 
                                    maxlength="500"
                                    ref="infofocus"
                                    v-model="remark"
                                    clearable>
                                </el-input>
                              <p class="countNum">
                             <span class="remark">{{remark.length}}</span>/<span class="textarea_max"> 500</span> 
                        </p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="custsvcAdd">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import {getOrderByOrderSerial,addCustsvc} from '@/api/order/logistics/logistics.js'
import { parseTime,pickerOptions2 } from '@/utils/index.js'
export default {
    data(){
        return{
         formData:[],
         custsvcObject:[],
         dialogVisible:false,
         remark:'',
         loading:true,
        }
    },
    props: {
        isvisible: {
            type: Boolean,
            default: false
        }
    },
    methods:{
    firstblood(){
        this.loading = true;
        getOrderByOrderSerial(this.$route.query.orderSerial).then(res=>{
            this.formData = res.data
            this.formData.useTime = parseTime(this.formData.useTime,"{y}-{m}-{d} {h}:{i}:{s}");
            this.loading = false;
        })
    },
    // 添加客服备注
    custsvcAdd(){
            if(!this.remark){
                this.$message.error('客服备注不能为空，不能提交')
            }else{
            // var formdata = new FormData()
            // formdata.append('orderSerial',this.$route.query.orderSerial);
            // formdata.append('remark',this.remark);
            let reForm = 'orderSerial='+this.$route.query.orderSerial+'&remark='+this.remark;
            addCustsvc(reForm).then(res=>{
              this.$message.success('增加客服备注成功')
              this.firstblood()
            }).catch(err=>{
              this.$message.error('增加客服备注失败')
            })
              this.dialogVisible = false
            }
    }
    },
    watch:{
        dialogVisible:{
            handler: function(val, oldVal) {
            if (!val) {
                this.remark = ''
            }
            }   
        },
        isvisible:{
          handler(newVal,oldVal){
            if (newVal) {
            this.firstblood()
            }   
          },
          immediate: true
      }
    },
    mounted() {
    },
}
</script>

<style lang="scss">
.OrderLog{
    .red{
        color: red;
        padding: 0px 10px;
    }
    .essentialInformationCustsvc{
        width: 100%!important
    }
    .btn_right{
        float: right;
    }
    .remark{
        color:red
    }
    .wholeP{
        width: 100%!important
    }
    .detail_i{
        font-style:normal
    }
}
</style>
