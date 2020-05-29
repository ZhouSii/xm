<template>
    <div class="TCorderInfo clearfix" v-loading="loading" v-if="listInformation.length != 0">
        <!-- 基本信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>基础信息</h2>
            <div class="exIcom" v-if="listInformation.auditStatusName">
                <img :src="imgInfo.imgSrc" :alt="imgInfo.name">
                <!-- <img src="../../../../assets/icom/orderStatus/待复审@2x.png" alt="" v-if="listInformation.auditStatusName === '待复审'"> -->
                <!-- <img src="../../../../assets/icom/orderStatus/已复审@2x.png" alt="" v-if="listInformation.auditStatusName === '已复审'"> -->
                <!-- <img src="../../../../assets/icom/orderStatus/复审不通过@2x.png" alt="" v-if="listInformation.auditStatusName === '复审不通过'"> -->
            </div>
            <div class="essentialInformation">
                <p>
                    <span>订单编号：</span>
                    <span>{{listInformation.orderSerial}}</span>
                 </p>
                <p>
                    <span>所属区域：</span>
                    <span>{{listInformation.belongCityName}}</span>
                </p>
                <p>
                    <span>服务分类：</span>
                    <span>{{listInformation.orderType}}</span>
                </p>
                <p>
                    <span>订单状态：</span>
                    <span>{{listInformation.orderStatus}}</span>
                    <el-button class="ifzhipai fr" icon="el-icon-edit" v-if="listInformation.orderStatusName.indexOf('AF00805') != -1" @click="handlerClick('appoint')"  type="primary" size="mini" plain>指派司机</el-button>
                </p>
            </div>
            <div class="essentialInformation">
                <p>
                    <span>订单类型：</span>
                    <span>{{listInformation.orderClass}}</span>
                </p>
                <p>
                    <span>用车时间：</span>
                    <span>{{listInformation.useCarTime | parseTime}}</span>
                </p>
                <p>
                    <span>下单时间：</span>
                    <span>{{listInformation.useTime | parseTime}}</span>
                </p>
                <p>
                    <span>货主账号：</span>
                    <span class="fontRed routerJump" title="点击查看货主详情" @click="pushOrderSerial(listInformation.shipperId,'shipper')">{{listInformation.shipperMobile}}</span>
                </p>
            </div>
            <div class="essentialInformation">
                <p>
                    <span>货主姓名：</span>
                    <span class="fontRed">{{listInformation.shipperName}}</span>
                </p>        
                <p>
                    <span>所需车型：</span>
                    <span>{{listInformation.usedCarType}} </span>
                    <span v-if="listInformation.spec">- {{listInformation.spec}}</span>
                </p>
                <p>
                    <span>我的司机优先接单：</span>
                    <span>{{listInformation.isFirst == 1 ? '已选' : '未选'}}</span>
                </p>
                <p>
                    <span>订单来源：</span>
                    <span>{{listInformation.orderFrom}}</span>
                </p>
            </div>
            <div class="essentialInformation">
                <p>
                    <span>货主所属业务员：</span>
                    <span>{{listInformation.shipperSalesmanName}}</span>
                </p>    
                <p>
                    <span>支付时机：</span>
                    <span>{{listInformation.payTimeType ? (listInformation.payTimeType == '0' ? '收货时付款' : '发货时付款') : '立即支付'}}</span>
                </p>  
                <p>
                    <span>是否通过下单码下单：</span>
                    <span>{{listInformation.isByOrderCode == '1' ? '是' : '否'}}</span>
                </p> 
                <p>
                    <span>下单码所属货主：</span>
                    <span>{{listInformation.orderCodeShipperPhone}} {{listInformation.orderCodeShipperName ? '-' + listInformation.orderCodeShipperName : ''}}</span>
                </p>     
            </div>
            <div class="essentialInformation">
                <p>
                    <span>下单码货主所属业务员：</span>
                    <span>{{listInformation.orderCodeShipperBelongSalesmanName}}</span>
                </p>    
                <p>
                    <span>是否通过接单码下单：</span>
                    <span>{{listInformation.isByReceivingCode == '1' ? '是' : '否'}}</span>
                </p>  
                <p>
                    <span>接单码所属车主：</span>
                    <span>{{listInformation.receivingCodeDriverPhone}} {{listInformation.receivingCodeDriverName ? '-' + listInformation.receivingCodeDriverName : ''}} {{listInformation.receivingCodeDriverPlateNumber ? '-' + listInformation.receivingCodeDriverPlateNumber : ''}} {{listInformation.receivingCodeDriverVehicleTypeName ? '-' + listInformation.receivingCodeDriverVehicleTypeName : ''}}</span>
                </p> 
                <p>
                    <span>接单码车主所属业务员：</span>
                    <span>{{listInformation.receivingCodeDriverBelongSalesmanName}}</span>
                </p>     
            </div>
        </div>
        <!-- 地址信息 -->
        <div class="address-collapse collapseInfo">
            <h2>地址信息</h2>
            <div class="essentialInformation" v-for="(obj,idx) in listInformation.aflcOrderAddresses" :key="obj.id">
                <p class="morewidth">
                    <span v-if="idx == 0">发货地：</span>
                    <span v-else-if="idx == listInformation.aflcOrderAddresses.length-1">收货地：</span>
                    <span v-else>途径地{{ listInformation.aflcOrderAddresses.length >3 ? idx : ''}}：</span>
                    <span style="width:90%;" :title="obj.viaAddressName + obj.provinceCityArea + obj.viaAddress + obj.viaAddressDetail">{{obj.viaAddressName}}({{obj.provinceCityArea}}{{obj.viaAddress}}{{obj.viaAddressDetail}})</span>
                </p>
                <p>
                    <span v-if="idx == 0">发货人：</span>
                    <span v-else>收货人：</span>
                    <span>{{obj.contacts ? obj.contacts : ''}}</span>
                </p>
                    <p>
                    <span>联系方式：</span>
                    <span>{{obj.contactsPhone}}</span>
                </p>
            </div>
        </div>
        <!-- 货物及备注 -->
        <div class="mark-collapse collapseInfo">
            <h2>货物及备注</h2>
            <div class="essentialInformation">
                <p>
                    <span>货物名称：</span>
                    <span v-if="listInformation.goodsName">{{listInformation.goodsName}}</span>
                    <span v-else>未填写</span>
                 </p>
                <p>
                    <span>重量体积：</span>
                    <span v-if="listInformation.goodsWeight || listInformation.goodsVolume">{{listInformation.goodsWeight ? listInformation.goodsWeight+'吨' : ''}} {{listInformation.goodsVolume ? listInformation.goodsVolume + '方':''}}</span>
                    <span v-else>未填写</span>
                </p>
                <p style="width:48%;">
                    <span>额外服务：</span>
                    <span v-if="listInformation.extraName" class="fontRed">{{listInformation.extraName}}</span>
                    <span v-else>未填写</span>
                </p>
                <!-- <p>
                    <span>备注：</span>
                    <span v-if="!listInformation.remark">未填写</span>
                    <el-tooltip placement="top-start" effect="light" v-else-if="listInformation.remark.length > 24">
                        <div slot="content">{{listInformation.remark}}</div>
                        <span>{{listInformation.remark}}</span>    
                    </el-tooltip>
                    <span v-else>{{listInformation.remark}}</span>
                </p> -->
            </div>
            <div class="essentialInformation">
                 <p style="width:100%;">
                    <span>备注：</span>
                    <span v-if="!listInformation.remark">未填写</span>
                    <!-- <el-tooltip placement="top-start" effect="light" v-else-if="listInformation.remark.length > 24">
                        <div slot="content">{{listInformation.remark}}</div>
                        <span>{{listInformation.remark}}</span>    
                    </el-tooltip> -->
                    <span v-else>{{listInformation.remark}}</span>
                </p>
            </div>
        </div>

        <!-- 运费信息 -->
        <div class="yunfei-collapse collapseInfo">
            <h2>运费信息</h2>
            <div class="essentialInformation">
                <p>
                    <span>运费总额：</span>
                    <span class="fontRed">￥{{listInformation.orderPrice ? listInformation.orderPrice : 0}}</span>
                 </p>
                <p>
                    <span>货主支付：</span>
                    <span class="fontRed">{{listInformation.aflcOrderExpenses.factPay ? '￥' + listInformation.aflcOrderExpenses.factPay :'暂未结算'}}</span>
                    <span v-if="listInformation.payWay">({{listInformation.payWay}})</span>
                </p>
                <p> 
                    <span>车主收入：</span>
                    <span class="fontRed" v-if="listInformation.aflcOrderExpenses.driverIncome">￥{{listInformation.aflcOrderExpenses.driverIncome}}</span>
                    <span v-else>暂未结算</span>
                </p>
                <p>
                    <span>付款状态：</span>
                    <span class="fontRed">{{listInformation.payStatus ? listInformation.payStatus : '未付款'}}</span>
                </p>
            </div>
            <div class="essentialInformation">
                <p>
                    <span>里程数：</span>
                    <span>{{listInformation.aflcOrderExpenses.totalMileage}}公里</span>
                </p>
                <p>
                    <span>起步价：</span>
                    <span>￥{{listInformation.aflcOrderExpenses.startPrice}}</span>
                </p>
                <p>
                    <span>超里程费：</span>
                    <span>￥{{listInformation.aflcOrderExpenses.outMileagePrice}}</span>
                    <span v-if="listInformation.aflcOrderExpenses.outMileagePrice != 0">({{listInformation.outMileage}} 公里)</span>
                </p>
                <p>
                    <span>额外服务费：</span>
                    <span>{{listInformation.ExtraPricesName == '暂无' ? '暂无' : '￥' + listInformation.ExtraPricesName}}</span>
                </p>
            </div>
            <div class="essentialInformation">
                <p>
                    <span>等候费：</span>
                    <span v-if="listInformation.aflcOrderExpenses.unloadingFee">￥{{listInformation.aflcOrderExpenses.unloadingFee}}{{listInformation.factWaitTime ?'(等候时长'+ listInformation.factWaitTime+'分钟)' :''}}</span>
                    <span class="noneNun" v-else>无</span>
                </p>
                <p>
                    <span>小费：</span>
                    <span v-if="listInformation.aflcOrderExpenses.tip">￥{{listInformation.aflcOrderExpenses.tip}} </span>
                    <span class="noneNun" v-else>无</span>
                </p>
                <p>
                    <span>车主改价：</span>
                    <span v-if="listInformation.aflcOrderExpenses.driverChangeFee">￥{{listInformation.aflcOrderExpenses.driverChangeFee}}</span>
                    <span class="noneNun" v-else>无</span>
                </p>
                <p>
                    <span>优惠券抵扣：</span>
                    <span v-if="listInformation.aflcOrderExpenses.preferentialPrice">￥{{listInformation.aflcOrderExpenses.preferentialPrice}}</span>
                    <span class="noneNun" v-else>无</span>
                </p>
            </div>
            <div class="essentialInformation">
                <p>
                    <span>在线交易优惠金：</span>
                    <span v-if="listInformation.aflcOrderExpenses.reward">￥{{listInformation.aflcOrderExpenses.reward}}</span>
                    <span class="noneNun" v-else>无</span>
                </p>
                <p>
                    <span>货主货物保障费：</span>
                    <span v-if="listInformation.aflcOrderExpenses.shipperInsuranceFee">￥{{listInformation.aflcOrderExpenses.shipperInsuranceFee}}</span>
                    <span class="noneNun" v-else>无</span>
                </p>
                <p>
                    <span>在线交易奖励金：</span>
                    <span v-if="listInformation.aflcOrderExpenses.driverReward">￥{{listInformation.aflcOrderExpenses.driverReward}}</span>
                    <span class="noneNun" v-else>无</span>
                </p>
                <p>
                    <span>平台抽佣：</span>
                    <span v-if="listInformation.aflcOrderExpenses.platMaidFee">￥{{listInformation.aflcOrderExpenses.platMaidFee}}</span>
                    <span class="noneNun" v-else>无</span>
                </p> 
            </div>
            <div class="essentialInformation">
                <p>
                    <span>车主货物保障费：</span>
                    <span v-if="listInformation.aflcOrderExpenses.driverInsuranceFee">￥{{listInformation.aflcOrderExpenses.driverInsuranceFee}}</span>
                    <span class="noneNun" v-else>无</span>
                </p>
                <p>
                    <span>多途径地服务费：</span>
                    <span class="fontRed" v-if="listInformation.aflcOrderExpenses">{{listInformation.aflcOrderExpenses.moreWayPrice ? '￥'+ listInformation.aflcOrderExpenses.moreWayPrice : '无'}}</span>
                </p>
                <p>
                    <span>额外支付费用：</span>
                    <span class="fontRed">{{listInformation.extraTotalPrice ? '￥'+ listInformation.extraTotalPrice : '无'}}</span>
                </p>
                 <p>
                    <span>额外费用：</span>
                    <span class="fontRed">{{listInformation.extraCharge ? '￥'+ listInformation.extraCharge : '无'}}{{listInformation.extraChargeName ?'('+ listInformation.extraChargeName+')' :''}}</span>
                </p>
            </div>
            <div class="essentialInformation">
                <p>
                    <span>额外支付等候费：</span>
                    <span class="fontRed">{{listInformation.extraWaitPrice ? '￥'+ listInformation.extraWaitPrice : '无'}}</span>
                </p>
                <p>
                    <span>额外小费：</span>
                    <span class="fontRed">{{listInformation.tip ? '￥'+ listInformation.tip : '无'}}</span>
                </p>
                <p>
                    <span>等候费改价(车主)：</span>
                    <span class="fontRed">{{listInformation.adjustUnloadingFee ? '￥'+ listInformation.adjustUnloadingFee : '无'}}</span>
                </p>
                <p>
                    <span>车主实际收入：</span>
                    <span class="fontRed">{{listInformation.driverFactIncome ? '￥'+ listInformation.driverFactIncome : '无'}}</span>
                </p>
            </div>
             <div class="essentialInformation">
                <p>
                    <span>津贴：</span>
                    <span class="fontRed">{{listInformation.aflcOrderExpenses.reductionAmount ? '￥'+ listInformation.aflcOrderExpenses.reductionAmount : '无'}}</span>
                </p>
            </div>
        </div>

        <!--  车主信息 -->
        <div class="mark-collapse collapseInfo">
            <h2> 车主信息</h2>
            <div v-if="listInformation.aflcDriverStatus">
                <div class="essentialInformation">
                    <p>
                        <span>车主账号：</span>
                        <span class="routerJump fontRed" title="点击查看车主详情"  @click="pushOrderSerial(listInformation.aflcDriverStatus.driverId,'car')">{{listInformation.aflcDriverStatus.driverMobile}}</span>
                    </p>
                    <p>
                        <span>车主姓名：</span>
                        <span>{{listInformation.aflcDriverStatus.driverName}}</span>
                    </p>
                    <p>
                        <span>车牌号：</span>
                        <span>{{listInformation.aflcDriverStatus.carNumber}}</span>
                    </p>
                    <p>
                        <span>车型：</span>
                        <span>{{listInformation.aflcDriverStatus.carType}}</span>
                    </p>
                </div>
            
                <div class="essentialInformation">
                    <p>
                        <span>中单等级：</span>
                        <span>{{listInformation.aflcDriverStatus.obtainGrade}}</span>
                    </p>
                    <p>
                        <span>派单方式：</span>
                        <span>{{listInformation.aflcDriverStatus.dispatchWay? listInformation.aflcDriverStatus.dispatchWay : '未知'}}</span>
                    </p>
                    <p>
                        <span>车主所属业务员：</span>
                        <span>{{listInformation.aflcDriverStatus.belongSalesmanName? listInformation.aflcDriverStatus.belongSalesmanName : '暂无'}}</span>
                    </p>
                    <p>
                        <span>车主标签：</span>
                        <span class="fontRed">{{listInformation.aflcDriverStatus.isAd == '1' ? '广告车': ''}}  {{listInformation.aflcDriverStatus.isVipCar == '1' ? '特权车': ''}}</span>
                    </p>
                </div>
            </div>

            <div class="essentialInformationNull" v-else>
                <img src="../../../../assets/icom/25xinxi.png" alt="">
                <span>车主未接单!</span>
            </div>
        </div>

        <!--  客服备注 -->
        <div class="mark-collapse collapseInfo">
            <h2> 
                客服备注
                <el-button icon="el-icon-circle-plus" @click="handlerClick('remark')"  type="primary" size="mini" plain>添加备注</el-button>
                <el-button icon="el-icon-warning" @click="handlerClick('deduction')"  type="primary" size="mini" plain>扣除奖励金短信通知</el-button>
            </h2>
            <div v-if="listInformation.aflcOrderRemarks.length != 0">
                <div class="essentialInformation"  v-for="item in listInformation.aflcOrderRemarks" :key="item.remarkId">
                    <p>
                        <span>客服：</span>
                        <span>{{item.userName}}</span>
                    </p>
                    <p>
                        <span>备注时间：</span>
                        <span>{{item.createTime | parseTime}}</span>
                    </p>
                    <p class="markInfo remakInfo">
                        <span>备注内容：</span>
                        <el-tooltip placement="top-start" effect="light">
                            <div slot="content">{{item.remark}}</div>
                            <span>{{item.remark}}</span>    
                        </el-tooltip>
                    </p>
                </div>
            </div>
            <div class="essentialInformationNull" v-else>
                <img src="../../../../assets/icom/25xinxi.png" alt="">
                <span>客服未备注!</span>
            </div>
        </div>
        <remarkerInfo :dialogVisible.sync="dialogVisible" :orderSerial = "currentOrderSerial"   @close = "shuaxin"/>
        <appointDriver :dialogFormVisible.sync = "dialogFormVisible" :orderSerial = "appontOrderSerial" @close = "shuaxin" ></appointDriver>
    </div>
</template>
<script>

import { parseTime } from '@/utils/index.js'
import { orderDetailsList,getOrderDetail,sendDeductBonusSms } from '@/api/order/ordermange'
import remarkerInfo from './remakInfo'
import appointDriver from '../../tongcheng/components/appointDriver'

export default {
  name: 'TCorderInfo',
  components: {
    remarkerInfo,
    appointDriver
  },
  props: {
    isvisible: {
        type: Boolean,
        default: false
      }

  },
  data() {
    return {
        listInformation: [],
        loading: true,
        dialogVisible: false,
        currentOrderSerial: '',
        appontOrderSerial: '',
        dialogFormVisible: false,
        imgArr:[{
            name:'待审核',
            imgSrc:require('../../../../assets/icom/orderStatus/待审核@2x.png')
        },{
            name:'待复审',
            imgSrc:require('../../../../assets/icom/orderStatus/待复审@2x.png')
        },{
            name:'已复审',
            imgSrc:require('../../../../assets/icom/orderStatus/已复审@2x.png')
        },{
            name:'复审不通过',
            imgSrc:require('../../../../assets/icom/orderStatus/复审不通过@2x.png')
        }],
        imgInfo:{
            name:'',
            imgSrc:'',
        }
      }
  },
  watch: {
    isvisible: {
        handler(newVal, oldVal) {
            if (newVal) {
                this.init()
              }
          },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
        immediate: true
      },
    // $route(to, from) {
    //     console.log('to.path', to.path)
    //   }
  },
  mounted() {
        // console.log(this.$route)
  },
  methods: {
    init() {
        const orderSerial = this.$route.query.orderSerial
        this.loading = true
        orderDetailsList(orderSerial).then(res => {
                // console.log('details', res)
                this.listInformation = res.data
                this.listInformation.aflcOrderAddresses.sort(function(a, b) {
                    return a.viaOrder - b.viaOrder
                })  
                
                if(this.listInformation.aflcOrderExtraPrices){
                    let item = 0 ;
                    this.listInformation.aflcOrderExtraPrices.forEach(el => {
                        item += el.extraPrice;
                    })
                    this.listInformation.ExtraPricesName = item;
                }else{
                    this.listInformation.ExtraPricesName = '暂无';
                }
                this.listInformation.belongCityName = this.listInformation.provinceCityArea.split(",")[2];

                if(this.listInformation.auditStatusName){
                    let arr = this.imgArr.filter(el => {
                        return el.name === this.listInformation.auditStatusName
                    })
                    this.imgInfo = arr[0];
                }

                this.loading = false;
            }).catch(err => {
                this.$message({
                    type: 'info',
                    message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                })
                this.loading = false
            })
      },
    shuaxin() {
        this.init();
      },
    handlerClick(type) {
        switch(type){
            case 'appoint':
                this.appontOrderSerial = this.$route.query.orderSerial;
                this.dialogFormVisible = true
                break;
            case 'remark':
                this.currentOrderSerial = this.$route.query.orderSerial;
                this.dialogVisible = true;
                break;
            case 'deduction':
                this.$confirm('是否发送扣除奖励金短信通知?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let reForm = 'orderSerial='+this.listInformation.orderSerial+'&driverMobile='+this.listInformation.aflcDriverStatus.driverMobile;
                    sendDeductBonusSms(reForm).then(res => {
                        this.$message({
                            type: 'success',
                            message: '操作成功！',
                        })
                        this.shuaxin();
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
                break;
        }
      },
    pushOrderSerial(userId,type){
        switch(type){
            case 'shipper':
                this.$router.push({name: '货主详情',query:{ userId:userId}});
                break;
            case 'car':
                this.$router.push({name: '车主详情',query:{ driverId:userId}});
                break;
        }
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .TCorderInfo{
        .mark-collapse{
            h2{
                position: relative;
                .el-button{
                    position: absolute;
                    right: 0;
                    bottom:8px;
                }
                .el-button + .el-button{
                    right: 105px;
                }
            }
        }
        .remakInfo{
            white-space:nowrap;
            text-overflow:ellipsis;
            overflow:hidden;
        }
    }
</style>

<style rel="stylesheet/scss" lang="scss">
    .TCorderInfo{
        .collapseInfo .essentialInformation .ifzhipai span{
            overflow: inherit; 
            height: auto; 
            color: #0588c3;
        }
        .collapseInfo .essentialInformation .ifzhipai:hover {
            background: #0588c3;
            border-color: #0588c3;
            color: #fff;
            span{
                color:#fff;
            }
        }
    }
</style>
