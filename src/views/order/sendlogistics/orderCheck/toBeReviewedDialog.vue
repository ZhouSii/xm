<template>
    <div class="toBeReviewedDialog commoncss">
        <el-dialog :title='formtitle' :close-on-click-modal="false" width="60%" v-el-drag-dialog top="5vh" :visible="dialogFormVisible" @close="close">
            <el-form   :model="standForm" :rules="newrules" label-position="right"  ref="ruleForm"  :label-width="formLabelWidth">
                <h2>货主支付金额校验</h2>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <p class="paramsStyle">货主支付：{{initData.totalShipperPrice}} 元</p>
                    </el-col>
                </el-row> 
                <table class="systemTitle">
                    <thead>
                        <th v-for="(item,idx) in shipperParams" :key="idx">
                            <p>{{item.name}}</p>
                            <p v-if="item.mark">{{item.mark}}</p>
                        </th>
                    </thead>
                    <tbody>
                       <tr>
                           <td>{{initData.shipperPrice.lineCourseBalance || 0}}</td>
                           <td>{{initData.shipperPrice.takeCourseBalance || 0}}</td>
                           <td>{{initData.shipperPrice.deCourseBalance || 0}}</td>
                           <td>{{initData.shipperPrice.agencyCourseBalance || 0}}</td>
                           <td>{{initData.shipperPrice.keepCourseBalance || 0}}</td>
                           <td>{{initData.shipperPrice.signCourseBalance || 0}}</td>
                           <td>{{initData.shipperPrice.upCourseBalance || 0}}</td>
                           <td>{{initData.shipperPrice.loadCourseBalance || 0}}</td>
                           <td>{{initData.shipperPrice.packageCourseBalance || 0}}</td>
                           <td>{{initData.shipperPrice.otherCourseBalance || 0}}</td>
                           <td>{{initData.shipperPrice.couponCourseBalance || 0}}</td>
                           <td>{{initData.shipperPrice.preferentCourseBalance || 0}}</td>
                           <td>{{initData.totalShipperPrice}}</td>
                       </tr>
                    </tbody>
                </table>
                <h2>区代运单金额校验</h2>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <p class="paramsStyle">审核前区代收入：{{initData.totalAgencyPrice}} 元</p>
                    </el-col>
                </el-row> 
                <table class="systemTitle">
                    <thead>
                        <th v-for="(item,idx) in driverParams" :key="idx">
                            <p>{{item.name}}</p>
                            <p v-if="item.mark">{{item.mark}}</p>
                        </th>
                    </thead>
                    <tbody>
                       <tr>
                            <td>{{initData.agencyPrice.lineCourseBalance || 0}}</td>
                            <td>{{initData.agencyPrice.takeCourseBalance || 0}}</td>
                            <td>{{initData.agencyPrice.deCourseBalance || 0}}</td>
                            <td>{{initData.agencyPrice.agencyCourseBalance || 0}}</td>
                            <td>{{initData.agencyPrice.keepCourseBalance || 0}}</td>
                            <td>{{initData.agencyPrice.signCourseBalance || 0}}</td>
                            <td>{{initData.agencyPrice.upCourseBalance || 0}}</td>
                            <td>{{initData.agencyPrice.loadCourseBalance || 0}}</td>
                            <td>{{initData.agencyPrice.packageCourseBalance || 0}}</td>
                            <td>{{initData.agencyPrice.otherCourseBalance || 0}}</td>
                            <td>{{initData.totalAgencyPrice || 0}}</td>
                        </tr>
                    </tbody>
                </table>
                <div v-show="itemForm.ifPlatform == '是'">
                    <h2>专线运单金额校验</h2>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <p class="paramsStyle">审核前专线收入：{{initData.totalCarrierPrice}} 元</p>
                        </el-col>
                    </el-row> 
                    <table class="systemTitle">
                        <thead>
                            <th v-for="(item,idx) in driverParams" :key="idx">
                                <p>{{item.name}}</p>
                                <p v-if="item.mark">{{item.mark}}</p>
                            </th>
                        </thead>
                        <tbody>
                        <tr>
                                <td>{{initData.carrierPrice.lineCourseBalance || 0}}</td>
                                <td>{{initData.carrierPrice.takeCourseBalance || 0}}</td>
                                <td>{{initData.carrierPrice.deCourseBalance || 0}}</td>
                                <td>{{initData.carrierPrice.agencyCourseBalance || 0}}</td>
                                <td>{{initData.carrierPrice.keepCourseBalance || 0}}</td>
                                <td>{{initData.carrierPrice.signCourseBalance || 0}}</td>
                                <td>{{initData.carrierPrice.upCourseBalance || 0}}</td>
                                <td>{{initData.carrierPrice.loadCourseBalance || 0}}</td>
                                <td>{{initData.carrierPrice.packageCourseBalance || 0}}</td>
                                <td>{{initData.carrierPrice.otherCourseBalance || 0}}</td>
                                <td>{{initData.totalCarrierPrice || 0}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h2>审核处理</h2>
                <el-row class="textStyle">
                    <el-col :span="24">
                        <span>支付方式：</span>
                        <span>{{initData.payTimeType == '1' ? '现付' :'到付'}}</span>
                    </el-col>
                    <el-col :span="24">
                        <span>区代钱包余额账户转入金额：</span>
                        <span>{{initData.profit.areaAgencyWaitAmount || 0}} 元</span>
                    </el-col>
                    <el-col :span="24" v-show="itemForm.ifPlatform == '是'">
                        <span>专线承运商钱包余额账户转入金额：</span>
                        <span>{{initData.profit.carriersWaitAmount || 0}} 元</span>
                    </el-col>
                     <el-col :span="24">
                        <span>平台运营账户分润收入：</span>
                        <span>{{initData.profit.commissionAmount || 0}} 元</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item  label="处理结果：" prop="verifyCode" class="exFormItem">
                            <el-radio-group v-model="standForm.verifyCode">
                                <el-radio label="AF0850603" >审核通过</el-radio>
                                <el-radio label="AF0850604" >审核不通过</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item  label="不通过原因：" prop="verifyRemarkCode" v-if="standForm.verifyCode == 'AF0850604'">
                            <el-select v-model="standForm.verifyRemarkCode" clearable placeholder="请选择" size="small">
                                <el-option
                                v-for="item in optionsDis"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row class="rewordRemark">
                    <el-col :span="24">
                        <p>平台分润规则：</p>
                        <ul>
                            <li v-for="(item,keys) in remarkList" :key="keys"><span>{{keys+1+'.'}}</span><span>{{item.label}}</span></li>
                        </ul>
                    </el-col>
                </el-row> 
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" plain  icon="el-icon-success" @click="submitForm('ruleForm')" :disabled="btnShow">保 存</el-button>
                <el-button type="primary" plain icon="el-icon-error" @click="close">取 消</el-button>
            </div> 
        </el-dialog>
    </div>
</template>
<script>

import { aflcLclOrderAuditDetails,aflcLclOrderAuditVerify } from '@/api/order/logistics/logistics1.js'
import { objectMerge2 } from '@/utils/'
import { DicOrderDis } from '@/api/common'

export default {
    name: 'toBeReviewedDialog',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            required:false,
            default:'订单复审'
        },
        itemForm:{
            type:Object,
            default:() => ({})
        }
    },
    components:{
    },
    data() {
      return {
        btnShow:false,
        formLabelWidth:'100px',
        initData:{
            agencyPrice:{},
            carrierPrice:{},
            profit:{},
            shipperPrice:{},
            "totalAgencyPrice": 0,
            "totalCarrierPrice": 0,
            "totalShipperPrice": 0,
            payTimeType:''
        },
        standForm:{
            "examineCode": "",//审查状态
            "examineRemark": "",//审查描述
            "examineStatus": "",//审查状态
            "orderSerial": "",//orderSerial
            "verifyCode": "AF0850603",//审核状态（待审核 AF0850601、待复审 AF0850602、已复审 AF0850603、复审不通过 AF0850604）
            "verifyName": "",//审核状态
            verifyRemark:'',
            verifyRemarkCode:''
        },
        optionsDis:[],
        newrules: {
         
        },
        shipperParams:[{name:'运费',mark:'( + )'},{name:'提货费',mark:'( + )'},{name:'送货费',mark:'( + )'},{name:'代收货款服务费',mark:'( + )'},{name:'货物保价服务费',mark:'( + )'},{name:'签收单服务费',mark:'( + )'},{name:'上楼费',mark:'( + )'},{name:'装卸费',mark:'( + )'},{name:'包装费',mark:'( + )'},{name:'其他费',mark:'( + )'},{name:'优惠券抵扣',mark:'( - )'},{name:'在线交易优惠金',mark:'( - )'},{name:'总计',mark:''},],
        driverParams:[{name:'运费',mark:'( + )'},{name:'提货费',mark:'( + )'},{name:'送货费',mark:'( - )'},{name:'代收货款服务费',mark:'( - )'},{name:'货物保价服务费',mark:'( + )'},{name:'签收单服务费',mark:'( + )'},{name:'上楼费',mark:'( + )'},{name:'装卸费',mark:'( + )'},{name:'包装费',mark:'( + )'},{name:'其他费',mark:'( + )'},{name:'总计',mark:''},],
        remarkList:[{
            label:'无平台专线参与中转按区代“营业额分润比例”收取佣金；（如：佣金=区代运单*分润比例）；'
        },{
            label:'有平台专线参与中转按“中转差价分润比例”收取佣金；（如：佣金=（区代运单-专线运单）*分润比例）；'
        },{
            label:'最后分润金额小于“最低一票分润金额”则按“最低一票分润金额”收取佣金。'
        }]
      };
    },
    watch:{
        dialogFormVisible:{
            handler(newVal,oldVal){
                if(newVal){
                    this.reviseForms();
                }
            },
            deep:true
        }
    },
    mounted(){
        this.init();
    },
    methods: {
        reviseForms(){
            aflcLclOrderAuditDetails(this.itemForm.id).then(res => {
                this.initData.agencyPrice = res.data.agencyPrice ? res.data.agencyPrice : {};
                this.initData.carrierPrice = res.data.carrierPrice ? res.data.carrierPrice : {};
                this.initData.profit = res.data.profit ? res.data.profit : {};
                this.initData.shipperPrice = res.data.shipperPrice ? res.data.shipperPrice : {};
                this.initData.totalAgencyPrice = res.data.totalAgencyPrice ? res.data.totalAgencyPrice : 0;
                this.initData.totalCarrierPrice = res.data.totalCarrierPrice ? res.data.totalCarrierPrice : 0;
                this.initData.totalShipperPrice = res.data.totalShipperPrice ? res.data.totalShipperPrice : 0;
                this.initData.payTimeType = res.data.payTimeType ? res.data.payTimeType : '';
            })
        },
        close(){
            if(this.dialogFormVisible){
                this.$emit('update:dialogFormVisible',false);
                this.$refs.ruleForm.resetFields();
                this.clearForms();
                this.$emit('renovate');
                this.btnShow = false;
            }
        },
        //初始化选择项数据
        init(){
            DicOrderDis().then(res => {
                this.optionsDis = res.data;
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.btnShow = true;
                    if(this.standForm.verifyRemarkCode){
                        this.standForm.verifyRemark = this.optionsDis.find(el => el.code ==  this.standForm.verifyRemarkCode )['name'];
                    }
                    this.standForm.orderSerial = this.itemForm.orderSerial;
                    let forms = objectMerge2(this.standForm);
                    aflcLclOrderAuditVerify(forms).then(res =>{
                        this.$message({
                            type: 'success',
                            message: '操作成功！'
                        })
                        this.close();
                    }).catch(err => {
                        this.$message({
                            type: 'info',
                            message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                        })
                        this.btnShow = false;
                    })
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请填写完整数据!'
                    })
                    return false;
                }
            });
        },
        clearForms(){
            for (const i in this.standForm) {
                if(i == 'verifyCode'){
                    this.standForm[i] = "AF0850603";
                }else{
                    this.standForm[i] = ''
                }
            } 
            this.initData ={
                agencyPrice:{},
                carrierPrice:{},
                profit:{},
                shipperPrice:{},
                "totalAgencyPrice": 0,
                "totalCarrierPrice": 0,
                "totalShipperPrice": 0
            };
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .toBeReviewedDialog{
        h2{
            border-bottom: solid 2px #e0e0e0;
            line-height: 25px;
            font-size: 18px;
            padding: 0px 0 10px 0;
            color: #333333;
            font-weight: bold;
            font-stretch: normal;
            margin-bottom: 10px;
        }
        .exFormItem{
            margin-bottom: 10px;
        }
        .systemTitle{
            margin-bottom: 20px;
            th{
                p{
                    line-height: 25px;
                }
            }
        }
        .paramsStyle{
            line-height: 30px;
            font-size: 16px;
        }
        .textStyle{
            span{
                font-size: 14px;
                line-height: 30px;
            }
        }
        .rewordRemark{
            padding: 10px;
            margin: 22px 0 0;
            border: 1px dashed #cccc;
            background: #f0f0f0;
            p{
                font-size:16px;
                line-height: 30px;
            }
            ul{
                li{
                    line-height: 20px;
                    span+span{
                        margin-left: 5px;
                    }
                }
            }
        }
    }
</style>
