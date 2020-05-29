<template>
    <div class="FinancialConSole">
        <h1 class="financialtitle">财务数据中心</h1>
        <div class="financial_top">
            <div class="TransactionFlow financialCommon">
                <h4>
                    交易流水
                    <dataSearch @getValue = "valueChange" countType = "jyls"/>
                </h4>
                <div class="TransactionFlow_classfy">
                    <div class="transItem">
                        <h6>现金流入</h6>
                        <p>{{(this.tradeOrderPaymentCountObj.incomeAmount ? this.tradeOrderPaymentCountObj.incomeAmount+'' : '0') | NumFormat}} 元</p>
                    </div>
                    <div class="transItem">
                        <h6>现金流出</h6>
                        <p>{{(this.tradeOrderPaymentCountObj.expendAmount ? this.tradeOrderPaymentCountObj.expendAmount+'' : '0') | NumFormat}} 元</p>
                    </div>
                    <div class="transItem"> 
                        <h6>流水差</h6>
                        <p>{{(this.tradeOrderPaymentCountObj.incomeAmount - this.tradeOrderPaymentCountObj.expendAmount ?this.tradeOrderPaymentCountObj.incomeAmount - this.tradeOrderPaymentCountObj.expendAmount + '' : '0') | NumFormat}}元</p>
                    </div>
                </div>
            </div>
            <div class="backlog financialCommon">
                <h4>待办事项</h4>
                <ul>
                    <li>
                       <span>待处理提现金额</span>
                       <p class="fr">
                            <span>{{pendingExtractCashCount.amount ? pendingExtractCashCount.amount : 0}} 元 &nbsp;</span>
                       </p>
                   </li>
                   <li>
                       <span>待处理数</span>
                       <p class="fr" @click="junpRoute">
                            <span >{{pendingExtractCashCount.count ? pendingExtractCashCount.count : 0}}</span><span> >> </span>
                       </p>
                   </li>
                </ul>
            </div>
        </div>
        <div class="financial_middle financialCommon">
            <h4>
                流水明细
                <dataSearch @getValue = "valueChange" countType = "lsmx"/>
            </h4>
            <div class="financial_stream">
                <el-row>
                    <el-col :span="3"></el-col>
                    <el-col :span="3" class="financial_stream_title">运费收入</el-col>
                    <el-col :span="3" class="financial_stream_title">支付运费</el-col>
                    <el-col :span="3" class="financial_stream_title">退款金额</el-col>
                    <el-col :span="3" class="financial_stream_title">营销支出</el-col>
                    <el-col :span="3" class="financial_stream_title">货物保障收入</el-col>
                    <el-col :span="3" class="financial_stream_title">平台抽佣</el-col>
                    <el-col :span="3" class="financial_stream_title">净利润</el-col>
                </el-row>
                <el-row> 
                    <el-col :span="3" class="financial_stream_title">小货车</el-col>
                    <el-col :span="3">{{tradeOrderPaymentDetailObj.smallIncome ? tradeOrderPaymentDetailObj.smallIncome : 0}}</el-col>
                    <el-col :span="3">{{tradeOrderPaymentDetailObj.smallExpend ? tradeOrderPaymentDetailObj.smallExpend : 0}}</el-col>
                    <el-col :span="3">{{tradeOrderPaymentDetailObj.smallRefund ? tradeOrderPaymentDetailObj.smallRefund : 0}}</el-col>
                    <el-col :span="3">{{tradeOrderPaymentDetailObj.smallPlatformExpend ? tradeOrderPaymentDetailObj.smallPlatformExpend : 0}}</el-col>
                    <el-col :span="3">{{tradeOrderPaymentDetailObj.smallGoodInsureIncome ? tradeOrderPaymentDetailObj.smallGoodInsureIncome : 0}}</el-col>
                    <el-col :span="3">{{tradeOrderPaymentDetailObj.smallPlatformIncome ? tradeOrderPaymentDetailObj.smallPlatformIncome : 0}}</el-col>
                    <el-col :span="3">{{(tradeOrderPaymentDetailObj.smallPlatformIncome ? tradeOrderPaymentDetailObj.smallPlatformIncome : 0) + (tradeOrderPaymentDetailObj.smallGoodInsureIncome ? tradeOrderPaymentDetailObj.smallGoodInsureIncome : 0) - (tradeOrderPaymentDetailObj.smallPlatformExpend ? tradeOrderPaymentDetailObj.smallPlatformExpend : 0)}}</el-col>
                </el-row>
                <el-row> 
                    <el-col :span="3" class="financial_stream_title">大货车</el-col>
                    <el-col :span="3">{{tradeOrderPaymentDetailObj.bigIncome ? tradeOrderPaymentDetailObj.bigIncome : 0}}</el-col>
                    <el-col :span="3">{{tradeOrderPaymentDetailObj.bigExpend ? tradeOrderPaymentDetailObj.bigExpend : 0}}</el-col>
                    <el-col :span="3">{{tradeOrderPaymentDetailObj.bigRefund ? tradeOrderPaymentDetailObj.bigRefund : 0}}</el-col>
                    <el-col :span="3">{{tradeOrderPaymentDetailObj.bigPlatformExpend ? tradeOrderPaymentDetailObj.bigPlatformExpend : 0}}</el-col>
                    <el-col :span="3">{{tradeOrderPaymentDetailObj.bigGoodInsureIncome ? tradeOrderPaymentDetailObj.bigGoodInsureIncome : 0}}</el-col>
                    <el-col :span="3">{{tradeOrderPaymentDetailObj.bigPlatformIncome ? tradeOrderPaymentDetailObj.bigPlatformIncome : 0}}</el-col>
                    <el-col :span="3">{{(tradeOrderPaymentDetailObj.bigPlatformIncome ? tradeOrderPaymentDetailObj.bigPlatformIncome : 0)+(tradeOrderPaymentDetailObj.bigGoodInsureIncome ? tradeOrderPaymentDetailObj.bigGoodInsureIncome : 0)-(tradeOrderPaymentDetailObj.bigPlatformExpend ? tradeOrderPaymentDetailObj.bigPlatformExpend : 0)}}</el-col>
                </el-row>
                <el-row> 
                    <el-col :span="3" class="financial_stream_title">发物流</el-col>
                    <el-col :span="3">{{tradeOrderPaymentDetailObj.companyIncome ? tradeOrderPaymentDetailObj.companyIncome : 0}}</el-col>
                    <el-col :span="3">{{tradeOrderPaymentDetailObj.companyExpend ? tradeOrderPaymentDetailObj.companyExpend : 0}}</el-col>
                    <el-col :span="3">{{tradeOrderPaymentDetailObj.companyRefund ? tradeOrderPaymentDetailObj.companyRefund : 0}}</el-col>
                    <el-col :span="3">{{tradeOrderPaymentDetailObj.companyPlatformExpend ? tradeOrderPaymentDetailObj.companyPlatformExpend : 0}}</el-col>
                    <el-col :span="3">{{tradeOrderPaymentDetailObj.companyGoodInsureIncome ? tradeOrderPaymentDetailObj.companyGoodInsureIncome : 0}}</el-col>
                    <el-col :span="3">{{tradeOrderPaymentDetailObj.companyPlatformIncome ? tradeOrderPaymentDetailObj.companyPlatformIncome : 0}}</el-col>
                    <el-col :span="3">{{(tradeOrderPaymentDetailObj.companyPlatformIncome ? tradeOrderPaymentDetailObj.companyPlatformIncome : 0)+(tradeOrderPaymentDetailObj.companyGoodInsureIncome ? tradeOrderPaymentDetailObj.companyGoodInsureIncome : 0)-(tradeOrderPaymentDetailObj.companyPlatformExpend ? tradeOrderPaymentDetailObj.companyPlatformExpend : 0)}}</el-col>
                </el-row>
            </div>
        </div>
        <!--  交易变化曲线图 -->
        <tradeLine/>
        <transacitonMap/>
    </div>
</template>

<script>

import './FinancialConSole.scss'
import tradeLine from './line/tradeLine'
import transacitonMap from './point/transactionMap'
import { pendingExtractCashCount,tradeOrderPaymentCount,tradeOrderPaymentDetail } from '@/api/transaction.js'
import dataSearch from './components/dataSearch'
import { NumFormat } from '@/utils/index'
export default {
    name:'FinancialConSole',
    components:{
        tradeLine,
        transacitonMap,
        dataSearch
    },
    watch: {
        
    },
    filters:{
        // 过滤器名称（任何名称）： 对应过滤函数方法名称
        NumFormat:NumFormat
    },
    data() {
        return {
            tradeOrderPaymentCountTime:{
                "endTime": "",
                "startTime": "",
            },//交易流水时间
            tradeOrderPaymentCountObj:{
                expendAmount: 0,
                incomeAmount: 0
            },//交易流水
            pendingExtractCashCount:{},//待办事项
            tradeOrderPaymentDetailTime:{
                "endTime": "",
                "startTime": "",
            },//流水明细时间
            tradeOrderPaymentDetailObj:{},//流水明细
            timeOutComplate:null,
        }
    },
    methods: {
        init(){
            this.ExtractCashCount();
            // this.PaymentCount();
            // this.PaymentDetail();
        },
        //交易流水
        PaymentCount(){
            tradeOrderPaymentCount(this.tradeOrderPaymentCountTime).then(res => {
                this.tradeOrderPaymentCountObj = res.data;
            })
        },
        //待办事项
        ExtractCashCount(){
            pendingExtractCashCount().then(res => {
                this.pendingExtractCashCount = res.data;
            })
        },
        //交易流水
        PaymentDetail(){
            tradeOrderPaymentDetail(this.tradeOrderPaymentDetailTime).then(res => {
                this.tradeOrderPaymentDetailObj = res.data;
            })
        },
        junpRoute(){
            this.$router.push({ name: '提现审核' });
            sessionStorage.setItem('cashAuditingName', 'second')
        },
        valueChange(val,type){
            // console.log('val,type',val,type)
            switch(type){
                case 'jyls':
                    this.tradeOrderPaymentCountTime.startTime = val[0];
                    this.tradeOrderPaymentCountTime.endTime = val[1];
                    this.PaymentCount();
                    break;
                case 'lsmx':
                    this.tradeOrderPaymentDetailTime.startTime = val[0];
                    this.tradeOrderPaymentDetailTime.endTime = val[1];
                    this.PaymentDetail();
                    break;
            }
        }
    },
    beforeDestroy(){

    },
    mounted() {
        this.init();
    }

}
</script>
