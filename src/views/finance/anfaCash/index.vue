<template>
    <div class="detailsCompnent ANFACash">
        <div class="anfaCsh detailsArrange" v-loading="loading">
            <!-- 用户钱包 -->
            <div class="detailsInfo-collapse collapseInfo">
                <h2>用户钱包</h2>
                <div class="essentialInformation">
                    <el-row class="basicInfo" :span='24'>
                        <!-- 第一行 -->
                        <el-col :span="4">货主充值余额：</el-col>
                        <el-col :span="4">{{anfaCashInfo.shipperRechargeAmountCount ? anfaCashInfo.shipperRechargeAmountCount : 0}}</el-col>
                        <el-col :span="4">货主赠送余额：</el-col>
                        <el-col :span="4">{{anfaCashInfo.shipperAvailableBalanceCount ? anfaCashInfo.shipperAvailableBalanceCount : 0}}</el-col>
                        <el-col :span="4">车主可提现金额余额：</el-col>
                        <el-col :span="4">{{anfaCashInfo.driverAvailableAmountCount ? anfaCashInfo.driverAvailableAmountCount : 0}}</el-col>

                        <!-- 第二行 -->  
                        <el-col :span="4">车主提现审核中金额：</el-col>
                        <el-col :span="4">{{anfaCashInfo.driverExtractCashCount ? anfaCashInfo.driverExtractCashCount : 0}}</el-col>
                        <el-col :span="4">车主冻结金额：</el-col>
                        <el-col :span="4">0</el-col>
                        <el-col :span="4">车主保证金：</el-col>
                        <el-col :span="4">0</el-col>

                        <!-- 第三行 -->  
                        <!-- <el-col :span="4">专线承运商余额：</el-col>
                        <el-col :span="4">{{anfaCashInfo.carriersBalance ? anfaCashInfo.carriersBalance : 0}}</el-col>
                        <el-col :span="4">专线承运商待入账金额：</el-col>
                        <el-col :span="4">{{anfaCashInfo.carriersWaitBalance ? anfaCashInfo.carriersWaitBalance : 0}}</el-col>
                        <el-col :span="4">专线承运商提现审核中金额：</el-col>
                        <el-col :span="4">{{anfaCashInfo.carriersExtractAuditAmount ? anfaCashInfo.carriersExtractAuditAmount : 0}}</el-col> -->

                        <!-- 第四行 -->  
                        <!-- <el-col :span="4">专线承运商剩余保证金：</el-col>
                        <el-col :span="4">{{anfaCashInfo.carriersCollateral ? anfaCashInfo.carriersCollateral : 0}}</el-col>
                        <el-col :span="4">区代余额：</el-col>
                        <el-col :span="4">{{anfaCashInfo.areaAgencyBalance ? anfaCashInfo.areaAgencyBalance : 0}}</el-col>
                        <el-col :span="4">区代待入账金额：</el-col>
                        <el-col :span="4">{{anfaCashInfo.areaAgencyWaitBalance ? anfaCashInfo.areaAgencyWaitBalance : 0}}</el-col> -->

                        <!-- 第五行 -->  
                        <!-- <el-col :span="4">区代提现审核中金额：</el-col>
                        <el-col :span="4">{{anfaCashInfo.areaAgencyExtractAuditAmount ? anfaCashInfo.areaAgencyExtractAuditAmount : 0}}</el-col>
                        <el-col :span="4">区代剩余保证金：</el-col>
                        <el-col :span="4">{{anfaCashInfo.areaAgencyCollateral ? anfaCashInfo.areaAgencyCollateral : 0}}</el-col> -->
                    </el-row>
                </div>
            </div>
            <!-- 营销收支 -->
            <div class="zizhiInfo-collapse collapseInfo">
                <h2>营销收支</h2>
                <div class="qd-collapse_title clearfix">
                    <ul class="classfyTitle fl">
                        <li v-for="(item,index) in FinancialDataType" :key="item.name" :class="{currentClick:item.iscur}" @click="setCur(index,'financial',item.label)">{{item.name}}</li>
                    </ul>
                    <searchInfo :searchType = "searchType2" :searchFrom = 'searchFrom2' @change = "getSearchParam"/>
                </div>
                <div class="essentialInformation" style="padding-top:0;">
                    <el-row class="basicInfo" :span='24'>
                        <!-- 第一行 -->
                        <el-col :span="4">优惠券：</el-col>
                        <el-col :span="4">{{FinancialWayObj.couponAllCount ? FinancialWayObj.couponAllCount : 0}}</el-col>  
                        <el-col :span="4">优惠金：</el-col>
                        <el-col :span="4">{{FinancialWayObj.discountAmount ? FinancialWayObj.discountAmount : 0}}</el-col>
                        <el-col :span="4">奖励金：</el-col>
                        <el-col :span="4">{{FinancialWayObj.bounty ? FinancialWayObj.bounty : 0}}</el-col>

                        <!-- 第二行 -->
                        <el-col :span="4">达量奖励：</el-col>
                        <el-col :span="4">{{FinancialWayObj.quantityReward ? FinancialWayObj.quantityReward : 0}}</el-col>
                        <el-col :span="4">充值赠送：</el-col>
                        <el-col :span="4">{{FinancialWayObj.repaidGift ? FinancialWayObj.repaidGift : 0}}</el-col>
                        <el-col :span="4">平台抽佣：</el-col>
                        <el-col :span="4">{{FinancialWayObj.platformPumping ? FinancialWayObj.platformPumping : 0}}</el-col> 
                    </el-row>
                </div>
            </div>
            <!-- 交易构成 -->
            <div class="logInfo-collapse collapseInfo">
                <h2>交易构成</h2>
                <div class="qd-collapse_title clearfix">
                    <ul class="classfyTitle fl">
                        <li v-for="(item,index) in tradeListDataType" :key="item.name" :class="{currentClick:item.iscur}" @click="setCur(index,'userTradeSurvey',item.label)">{{item.name}}</li>
                    </ul>
                    <searchInfo :searchType = "searchType" :searchFrom = 'searchFrom' @change = "getSearchParam"/>
                </div>
                <div class="essentialInformation anfaCshDetails" style="padding-top:0;">
                    <el-row class="basicInfo" :span='24'>
                        <!-- 第一行 -->
                        <el-col class="el-col-bg" :span="4"></el-col>
                        <el-col class="el-col-bg" :span="4">运费收入</el-col>  
                        <el-col class="el-col-bg" :span="4">退运费</el-col>
                        <el-col class="el-col-bg" :span="4">运费支出</el-col>
                        <el-col class="el-col-bg" :span="4">理赔收入</el-col>
                        <el-col class="el-col-bg" :span="4">理赔支出</el-col>

                        <!-- 第二行 微信-->
                        <el-col :span="4">微信</el-col>
                        <el-col :span="4">{{userTradeSurveyObj.wxIncome ? userTradeSurveyObj.wxIncome : '/'}}</el-col>
                        <el-col :span="4">{{userTradeSurveyObj.wxRefund ? userTradeSurveyObj.wxRefund : '/'}}</el-col>
                        <el-col :span="4">{{userTradeSurveyObj.wxExpend ? userTradeSurveyObj.wxExpend : '/'}}</el-col>
                        <el-col :span="4">{{userTradeSurveyObj.wxClaimIncome ? userTradeSurveyObj.wxClaimIncome : '/'}}</el-col>
                        <el-col :span="4">{{userTradeSurveyObj.wxClaimExpend ? userTradeSurveyObj.wxClaimExpend : '/'}}</el-col> 

                        <!-- 第三行 支付宝-->
                        <el-col :span="4">支付宝</el-col>
                        <el-col :span="4">{{userTradeSurveyObj.aliIncome ? userTradeSurveyObj.aliIncome : '/'}}</el-col>
                        <el-col :span="4">{{userTradeSurveyObj.aliRefund ? userTradeSurveyObj.aliRefund : '/'}}</el-col>
                        <el-col :span="4">{{userTradeSurveyObj.aliExpend ? userTradeSurveyObj.aliExpend : '/'}}</el-col>
                        <el-col :span="4">{{userTradeSurveyObj.aliClaimIncome ? userTradeSurveyObj.aliClaimIncome : '/'}}</el-col>
                        <el-col :span="4">{{userTradeSurveyObj.aliClaimExpend ? userTradeSurveyObj.aliClaimExpend : '/'}}</el-col> 

                         <!-- 第二行 钱包-->
                        <el-col :span="4">钱包</el-col>
                        <el-col :span="4">{{userTradeSurveyObj.walletIncome ? userTradeSurveyObj.walletIncome : '/'}}</el-col>
                        <el-col :span="4">{{userTradeSurveyObj.walletRefund ? userTradeSurveyObj.walletRefund : '/'}}</el-col>
                        <el-col :span="4">{{userTradeSurveyObj.walletExpend ? userTradeSurveyObj.walletExpend : '/'}}</el-col>
                        <el-col :span="4">{{userTradeSurveyObj.walletClaimIncome ? userTradeSurveyObj.walletClaimIncome : '/'}}</el-col>
                        <el-col :span="4">{{userTradeSurveyObj.walletClaimExpend ? userTradeSurveyObj.walletClaimExpend : '/'}}</el-col> 

                         <!-- 第二行 总额-->
                        <el-col :span="4">总额</el-col>
                        <el-col :span="4">{{userTradeSurveyObj.incomeTotal}}</el-col>
                        <el-col :span="4">{{userTradeSurveyObj.refundTotal}}</el-col>
                        <el-col :span="4">{{userTradeSurveyObj.expendTotal}}</el-col>
                        <el-col :span="4">{{userTradeSurveyObj.claimIncomeTotal}}</el-col>
                        <el-col :span="4">{{userTradeSurveyObj.claimExpendTotal}}</el-col> 
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import '@/styles/detailsStyle.scss'

import { parseTime,objectMerge2 } from '@/utils/index.js'
import { userMywalletSurvey,userTradeSurvey,financial } from '@/api/finance/anfaZhangHU.js'
// import Pager from '@/components/Pagination/index'
import searchInfo from './components/searchInfo'

export default {
  name: 'detailsInfo',
  components: {
    //   Pager
    searchInfo,
  },
  props: {
  }, 
  data() {
    return {
        page:1,
        pagesize:20,
        totalCount:100,
        loading: true,
        dialogVisible: false,
        anfaCashInfo:{},
        searchType2:'0',
        searchType:'0',
        searchFrom:'',
        searchFrom2:'',
        searchTime:'',
        userTradeSurveyObj:{
            claimExpendTotal: 0,
            claimIncomeTotal: 0,
            expendTotal: 0,
            incomeTotal: 0,
            refundTotal: 0,
        },
        FinancialWayObj:{},
        userTradeData:{
            "dateType": "0",
            "startTime": ""
        },
        FinancialDataType:[
            {name:'全部',label:'0',iscur:true},
            {name:'自然天',label:'1',iscur:false},
            {name:'自然月',label:'2',iscur:false},
        ],
        tradeListDataType:[
            {name:'全部',label:'0',iscur:true},
            {name:'自然天',label:'1',iscur:false},
            {name:'自然月',label:'2',iscur:false},
        ],
      }
  },
    watch: {
      
    },
     mounted() {
        this.init();
    },
    methods: {
        init() {
            this.loading = true;
            userMywalletSurvey().then(res => {
                this.anfaCashInfo = res.data;
            }).catch(err => {
                this.loading = false;
            })
            this.TradeSurvey();
            this.FinancialWay();
            this.loading = false;
        },
        TradeSurvey(){
            userTradeSurvey(this.userTradeData).then(res => {
                this.userTradeSurveyObj = objectMerge2({},this.userTradeSurveyObj,res.data);
                let el = this.userTradeSurveyObj;
                el.incomeTotal = el.wxIncome + el.aliIncome + el.walletIncome ;
                el.refundTotal = el.wxRefund + el.aliRefund + el.walletRefund ;
                el.expendTotal = el.wxExpend + el.aliExpend + el.walletExpend ;
                el.claimIncomeTotal = el.wxClaimIncome + el.aliClaimIncome + el.walletClaimIncome ;
                el.claimExpendTotal = el.wxClaimExpend + el.aliClaimExpend + el.walletClaimExpend ;
            }).catch(err => {
                this.loading = false;
            })
        },
        FinancialWay(){
            financial(this.searchTime).then(res => {
                this.FinancialWayObj = res.data;
            }).catch(err => {
                this.loading = false;
            })
        },
        setCur(index,classfy,label){
            switch(classfy){
                case 'financial':
                    this.FinancialDataType.forEach((el,idx)=>{
                        idx == index ? el.iscur = true : el.iscur = false;
                    })
                    this.searchType2 = label;
                    this.searchFrom2 = classfy;
                    if(label == '0'){
                        this.searchTime = '';
                        this.FinancialWay();
                    }
                    break;
                case 'userTradeSurvey':
                    this.tradeListDataType.forEach((el,idx)=>{
                        idx == index ? el.iscur = true : el.iscur = false;
                    })
                    this.searchType = label;
                    this.userTradeData.dateType = label;
                    this.searchFrom = classfy;
                    if(label == '0'){
                        this.userTradeData.startTime = '';
                        this.TradeSurvey();
                    }
                    break;
            }
        },
        getSearchParam(obj,searchFrom) {
            console.log(obj,searchFrom)
            switch(searchFrom){
                case 'financial':
                    this.searchTime = obj;
                    this.FinancialWay();
                    break;
                case 'userTradeSurvey':
                    this.userTradeData = Object.assign({},this.userTradeData, obj)
                    this.TradeSurvey();
                    break;
            }
        },
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .ANFACash{
        background: #f2f2f2;
        overflow: auto;
        .anfaCsh{
            .collapseInfo{
                .qd-collapse_title{
                    padding: 10px 0;
                }
                .essentialInformation_table{
                    padding-top: 0;
                }
                .anfaCshDetails{
                    .basicInfo{
                        .el-col{
                            background: #fff;
                            text-align: center;
                        }
                        .el-col-bg{
                            background: #fafafa;
                        }
                    }
                }
            }
        }
    }
</style>
