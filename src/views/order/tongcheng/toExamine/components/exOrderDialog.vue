<template>
    <div class="exOrderDialog commoncss">
        <el-dialog
            :title="formtitle"
            top="5vh"
            :visible="dialogFormVisibleEx"
            :close-on-click-modal="false"
            :modal="false"
            width="57%"
            v-el-drag-dialog
            @close="close(true)"
            >
            <el-form :model="standForm" label-position="right"  ref="ruleForm" label-width="150px">
                <div v-if="type !== 'exOrder'">
                    <h2>订单信息</h2>
                    <el-table
                    :data="dataDetails" 
                    border
                    ref="multipleTable"
                    align = "center"
                    >
                        <el-table-column
                            prop="orderSerial"
                            label="订单编号"
                            min-width="200">
                                <template  slot-scope="scope">
                                    <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.orderSerial}}</h4>
                                </template>
                        </el-table-column>
                        <el-table-column
                            prop="firstAddress"
                            :show-overflow-tooltip="true"
                            label="提货地"
                            min-width="150">
                        </el-table-column>
                        <el-table-column
                            prop="lastAddress"
                            :show-overflow-tooltip="true"
                            label="收货地"
                            min-width="150">
                        </el-table-column>
                        <el-table-column
                            prop="shipperInfo"
                            :show-overflow-tooltip="true"
                            label="货主姓名"
                            min-width="150">
                        </el-table-column>
                        <el-table-column
                            prop="driverInfo"
                            :show-overflow-tooltip="true"
                            label="车主姓名"
                            min-width="150">
                        </el-table-column>
                    </el-table>
                    <p v-if="type === 'doubt'" class="tips">{{tips}}</p>
                    <h2>装货照片</h2>
                    <div v-viewer style="text-align: center;">
                        <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                            <img :src="orderObj.filePath ? orderObj.filePath : defaultImg" alt="装货照片">
                        </el-tooltip>
                    </div>
                    <h2>{{type === 'doubt' ? '处理结果' : '审查结果'}}</h2>
                </div>
                <el-row v-if="type === 'exOrder'">
                     <el-row>
                        <el-col :span="24" >
                            <el-form-item label="备注：" prop="auditDesc">
                            <el-input
                                type="textarea"
                                placeholder="请输入备注信息"
                                v-model="standForm.auditDesc"
                                maxlength="100"
                                show-word-limit
                                >
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row :gutter="20">
                   <el-col :span="12">
                        <el-form-item  label="订单审查状态：" prop="reviewStatus">
                            <el-select v-model="standForm.reviewStatus" placeholder="请选择">
                                <el-option
                                v-for="item in optionsOrderExStatus"
                                :key="item.name"
                                :label="item.name"
                                :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" v-if="type !== 'exOrder'">
                        <el-form-item label="订单审核是否通过：" prop="auditStatusFlag">
                            <el-radio-group v-model="standForm.auditStatusFlag">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="是否进行处罚：" prop="punishmentFlag">
                            <el-radio-group v-model="standForm.punishmentFlag">
                                <el-radio label="AF0850802">是</el-radio>
                                <el-radio label="AF0850801">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="12" >
                        <el-form-item label="是否符合达量订单：" prop="auditStatusFlag">
                            <el-radio-group v-model="standForm.auditStatusFlag">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col> -->
                </el-row> 
                <div v-show="standForm.punishmentFlag === 'AF0850802'">
                    <el-row :gutter="20">
                        <el-col :span="12" v-if="type !== 'doubt'">
                            <el-form-item label="违规行为：" prop="riskControlCodeArr">
                                <el-select
                                    v-model="standForm.riskControlCodeArr"
                                    multiple
                                    collapse-tags
                                    @change="riskeAction"
                                    placeholder="请选择">
                                    <el-option
                                    v-for="item in optionsRisk"
                                    :key="item.id"
                                    :label="item.ruleDescSetting"
                                    :value="item.code">
                                        <span style="float: left">{{ item.ruleDescSetting }}</span>
                                        <span style="float: right; color: #8492a6; font-size: 13px;margin-right: 15px;">{{ item.subBehaviorScore ? item.subBehaviorScore + '分' : '' }}</span>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" >
                            <el-form-item label="扣行为分：" prop="deductionBehavior">
                                <el-input v-model="standForm.deductionBehavior" disabled clearable></el-input>  
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!-- <h2>订单奖励优惠扣除</h2> -->
                    <el-row >
                        <el-col :span="24" >
                            <el-form-item label="订单奖励优惠扣除：" prop="auditStatusFlag">
                                <table class="systemTitle">
                                    <thead>
                                        <th>优惠类型</th>
                                        <th>在线交易奖励金</th>
                                        <th>在线交易优惠金</th>
                                        <th>发货津贴</th>
                                        <th>优惠券抵扣</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>奖励金额</td>
                                            <td>{{orderObj.driverReward ? orderObj.driverReward : '-'}}</td>
                                            <td>{{orderObj.reward ? orderObj.reward : '-'}}</td>
                                            <td>{{orderObj.reductionAmount ? orderObj.reductionAmount  : '-'}}</td>
                                            <td>{{orderObj.preferentialPrice ? orderObj.preferentialPrice : '-'}}</td>
                                        </tr>
                                        <tr>
                                            <td>处理操作</td>
                                            <td>
                                                <el-select v-model="standForm.deductionRewardFlag" clearable placeholder="请选择">
                                                    <el-option
                                                    v-for="item in optionsCommon"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item.code"
                                                    :disabled="item.disabled">
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td colspan="3">
                                                <el-select v-model="standForm.deductionCouponRewardFlag" :disabled="!orderObj.reward && !orderObj.preferentialPrice && !orderObj.reductionAmount" clearable placeholder="请选择">
                                                    <el-option
                                                    v-for="item in optionsCommon"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item.code"
                                                    :disabled="item.disabled">
                                                    </el-option>
                                                </el-select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!-- <h2>分销奖励扣除</h2> -->
                    <el-row >
                        <el-col :span="24" >
                            <el-form-item label="分销奖励扣除：" prop="auditStatusFlag">
                                <table class="systemTitle">
                                    <thead>
                                        <th>分销奖励类型</th>
                                        <th>车主接单码奖励</th>
                                        <th>车主推荐货主下单奖励</th>
                                        <th>车主推荐车主接单奖励</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>奖励账号</td>
                                            <td>{{orderObj.codeRewardUserInfo}}</td>
                                            <td>{{orderObj.recommendShipperUserInfo}}</td>
                                            <td>{{orderObj.recommendDriverUserInfo}}</td>
                                        </tr>
                                        <tr>
                                            <td>奖励金额</td>
                                            <td>{{orderObj.codeReward ? orderObj.codeReward : '-'}}</td>
                                            <td>{{orderObj.recommendShipper ? orderObj.recommendShipper : '-'}}</td>
                                            <td>{{orderObj.recommendDriver ? orderObj.recommendDriver : '-'}}</td>
                                        </tr>
                                        <tr>
                                            <td>处理操作</td>
                                            <td colspan="3">
                                                <el-select v-model="standForm.deductionCodeRewardFlag" :disabled="!orderObj.codeReward && !orderObj.recommendShipper && !orderObj.recommendDriver" clearable placeholder="请选择">
                                                    <el-option
                                                    v-for="item in optionsCommon"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item.code"
                                                    :disabled="item.disabled">
                                                    </el-option>
                                                </el-select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12" >
                            <el-form-item label="冻结车主账号：" prop="freezeFlag">
                                <el-select v-model="standForm.freezeFlag" clearable placeholder="请选择">
                                    <el-option
                                    v-for="item in optionsFrozen"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.code"
                                    :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" >
                            <el-form-item label="是否发短信通知：" prop="sendMessageFlag">
                                <el-radio-group v-model="standForm.sendMessageFlag">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="0">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" >
                            <el-form-item label="处罚原因：" prop="punishmentDesc">
                            <el-input
                                type="textarea"
                                placeholder="请输入处罚原因"
                                v-model="standForm.punishmentDesc"
                                maxlength="20"
                                show-word-limit
                                >
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" plain  icon="el-icon-success" @click="submitForm('ruleForm')">确 定</el-button>
                <el-button type="primary" plain icon="el-icon-error" @click="close(false)">取 消</el-button>
            </div> 
        </el-dialog>
    </div>
</template>

<script>

import { orderReviewConfirm,gainOrderReviewDetail } from '@/api/order/ordermange'
import { listComplainSetting } from '@/api/service/dispose.js'
import { objectMerge2 } from '@/utils/'
import { driverFrozenType } from '@/api/common.js'

export default {
    name: 'exOrderDialog',
    props: {
        dialogFormVisibleEx:{
            type:Boolean,
            required:true
        },
        currentData:{
            type:Object,
            required:true,
            default:()=>({})
        },
        formtitle:{
            type:String,
            required:false,
            default:'订单审查'
        },
        type:{
            type:String,
            required:false,
            default:'ex'
        },

    },
    components:{
    },
    data() {
        return {
            defaultImg:'/static/test.jpg',//默认第一张图片的url
            dataDetails:[],
            standForm:{
                "auditDesc": "",//备注
                "auditStatusFlag": '1',//订单审核是否通过（0 不通过 1 通过）
                "deductionBehavior": 0,//扣除行为分
                "deductionBehaviorFlag": "0",//扣除行为分Flag
                "deductionCodeReward": 0,//扣车主接单码奖励
                "deductionCodeRewardFlag": "0",//扣车主接单码奖励Flag（0 不扣除 1 扣除）
                "deductionCoupon": 0,//扣除优惠券
                "deductionCouponFlag": "0",//扣除优惠券Flag（0 不扣除 1 扣除）
                "deductionCouponReward": 0,//扣除优惠金
                "deductionCouponRewardFlag": "0",//扣除优惠金Flag（0 不扣除 1 扣除）
                "deductionRecommendDriver": 0,//扣车主推荐车主接单奖励
                "deductionRecommendDriverFlag": "0",//扣车主推荐车主接单奖励Flag（0 不扣除 1 扣除）
                "deductionRecommendShipper": 0,//扣车主推荐货主发货奖励
                "deductionRecommendShipperFlag": "0",//扣车主推荐货主发货奖Flag（0 不扣除 1 扣除）
                "deductionReward": 0,//扣除奖励金
                "deductionRewardFlag": "0",//扣除奖励金Flag（0 不扣除 1 扣除）
                // "freezeEndTime": "",//冻结结束时间
                "freezeFlag": "AF0200501",//冻结标志（0 不冻结, 1 冻结）
                // "freezeStartTime": "",//冻结开始时间
                "orderSerial": "",//订单流水号
                "punishmentDesc": "",//处罚原因
                "punishmentFlag": "AF0850801",//处罚Flag（AF0850801 正常 AF0850802 处罚）
                "reviewStatus": "AF0850103",//订单审查状态（待审查 AF0850101、审查中 AF0850102、已审查 AF0850103）
                "riskControlCode": '',//风控Code
                "riskControlName": '',//风控Name
                "riskControlValue": '',//风控Value
                "sendMessageFlag": '0',//发送短信Flag
                "riskControlCodeArr": [],//风控Code
                exceptionManagementFlag:'0',///是否来源异常管理审查
                deductionReductionAmountFlag :'0',//扣除津贴Flag
                deductionReductionAmount:0 //扣除津贴金额
            },
            loadImg:'',
            orderObj:{},
            optionsOrderExStatus:[{
                name:'已审查',
                code:'AF0850103'
            },{
                name:'审查中',
                code:'AF0850102'
            }],
            optionsRisk:[],
            optionsFrozen:[],
            optionsCommon:[{
                name:'不扣除',
                code:'0'
            },{
                name:'扣除',
                code:'1'
            },],
            tips:'违规行为：货主下单提货地至收货地距离小于10公里；货主下单时间与司机完成卸货时间过短,在5分钟内完成'
        };
    },
    watch:{
        dialogFormVisibleEx:{
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
        //详情弹窗
        pushOrderSerial(item){
            this.$router.push({name: '订单详情',query:{ orderSerial:item.orderSerial }});
            // this.$emit('update:dialogFormVisibleEx',false);
        },
        riskeAction(val){
            let count = 0;
            let riskControlName = [];
            let riskControlValue = [];
            val.forEach(el => {
                this.optionsRisk.forEach(item => {
                    if(el === item.code){
                        count+=item.subBehaviorScore; 
                        riskControlName.push(item.ruleDescSetting);
                        riskControlValue.push(item.subBehaviorScore);
                    }
                })
            })
            this.standForm.deductionBehavior = count;
            this.standForm.deductionBehaviorFlag = this.standForm.deductionBehavior > 0 ? '1' : '0';
            this.standForm.riskControlName = riskControlName.join('|');
            this.standForm.riskControlValue = riskControlValue.join('|');
            this.standForm.riskControlCode = val.join('|');
        },
        close(status){
            if(this.dialogFormVisibleEx){
                this.$emit('update:dialogFormVisibleEx',false);
                if(!status){
                    this.$emit('renovate',this.currentData.orderSerial,'ex');
                }
                this.clearForms();
            }
        },
        clearForms(){
            this.standForm = {
                "auditDesc": "",//备注
                "auditStatusFlag": this.type === "exOrder" ? '0' : '1',//订单审核是否通过（0 不通过 1 通过）
                "deductionBehavior": 0,//扣除行为分
                "deductionBehaviorFlag": "0",//扣除行为分Flag
                "deductionCodeReward": 0,//扣车主接单码奖励
                "deductionCodeRewardFlag": "0",//扣车主接单码奖励Flag（0 不扣除 1 扣除）
                "deductionCoupon": 0,//扣除优惠券
                "deductionCouponFlag": "0",//扣除优惠券Flag（0 不扣除 1 扣除）
                "deductionCouponReward": 0,//扣除优惠金
                "deductionCouponRewardFlag": "0",//扣除优惠金Flag（0 不扣除 1 扣除）
                "deductionRecommendDriver": 0,//扣车主推荐车主接单奖励
                "deductionRecommendDriverFlag": "0",//扣车主推荐车主接单奖励Flag（0 不扣除 1 扣除）
                "deductionRecommendShipper": 0,//扣车主推荐货主发货奖励
                "deductionRecommendShipperFlag": "0",//扣车主推荐货主发货奖Flag（0 不扣除 1 扣除）
                "deductionReward": 0,//扣除奖励金
                "deductionRewardFlag": "0",//扣除奖励金Flag（0 不扣除 1 扣除）
                // "freezeEndTime": "",//冻结结束时间
                "freezeFlag": "AF0200501",//冻结标志（0 不冻结, 1 冻结）
                // "freezeStartTime": "",//冻结开始时间
                "orderSerial": "",//订单流水号
                "punishmentDesc": "",//处罚原因
                "punishmentFlag": "AF0850801",//处罚Flag（AF0850801 正常 AF0850802 处罚）
                "reviewStatus": "AF0850103",//订单审查状态（待审查 AF0850101、审查中 AF0850102、已审查 AF0850103）
                "riskControlCode": '',//风控Code
                "riskControlName": '',//风控Name
                "riskControlValue": '',//风控Value
                "sendMessageFlag": '0',//发送短信Flag
                "riskControlCodeArr": [],//风控Code
                exceptionManagementFlag:'0',///是否来源异常管理审查
            };
        },
        //初始化选择项数据
        init(){
            let currentCity = '440100';
            listComplainSetting(currentCity).then(res => {
                // console.log('resdata2',res)
                this.optionsRisk = res.data;
            })
            driverFrozenType().then(res => {
                this.optionsFrozen = res.data;
            })
        }, 
        reviseForms(){
            if(this.formtitle !== '修改审查记录'){
                let orderSerial = this.currentData.orderSerial ? this.currentData.orderSerial : this.$route.query.orderSerial;
                gainOrderReviewDetail(orderSerial).then(res => {
                    this.dataDetails = [];
                    this.orderObj = res.data;
                    this.dataDetails.push(res.data);
                    if(this.type === 'doubt'){
                        // console.log('this.currentData',this.currentData)
                        let count = 0;
                        let riskControlCode = [];
                        let riskControlName = [];
                        let riskControlBehaviorScore = [];
                        this.currentData.orderUnusuals.forEach(el => {
                            count+=el.behaviorScore;
                            riskControlCode.push(el.riskControlCode); 
                            riskControlName.push(el.riskControlName); 
                            riskControlBehaviorScore.push(el.behaviorScore); 
                        })
                        // console.log('xxx,',riskControlCode,riskControlName,riskControlBehaviorScore)
                        this.standForm.deductionBehavior = count;
                        this.standForm.deductionBehaviorFlag = this.standForm.deductionBehavior > 0 ? '1' : '0';
                        this.standForm.riskControlName = riskControlName.join('|');
                        this.standForm.riskControlValue = riskControlBehaviorScore.join('|');
                        this.standForm.riskControlCode = riskControlCode.join('|');
                    }
                    console.log('this.standForm',this.standForm)
                    if(this.type === "exOrder"){
                        this.standForm.auditStatusFlag = '0';
                        // console.log('this.standForm1',this.standForm)
                    }
                }).catch(err => {
                    this.$message({
                        type: 'error',
                        message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                    })
                })
            }else{
                this.orderObj = this.currentData;
                this.standForm = this.currentData;
                this.standForm.riskControlCodeArr = this.standForm.riskControlCode.split('|');
                // console.log('this.standForm',this.standForm)
            }
        },
        submitForm(formName) {
            // this.$refs[formName].validate((valid) => {
            //     if (valid) {
                        // this.close();
                    this.standForm.exceptionManagementFlag = this.type === 'doubt' ? '1' : '0';

                    this.standForm.orderSerial = this.orderObj.orderSerial ? this.orderObj.orderSerial : this.$route.query.orderSerial;;

                    this.standForm.deductionCodeReward = this.orderObj.codeReward ? this.orderObj.codeReward : 0;
                    this.standForm.deductionRecommendShipper = this.orderObj.recommendShipper ? this.orderObj.recommendShipper : 0;
                    this.standForm.deductionRecommendDriver = this.orderObj.recommendDriver ? this.orderObj.recommendDriver : 0;
                    this.standForm.deductionReward = this.orderObj.driverReward ? this.orderObj.driverReward : 0;
                    this.standForm.deductionCouponReward = this.orderObj.reward ? this.orderObj.reward : 0;
                    this.standForm.deductionReductionAmount = this.orderObj.reductionAmount ? this.orderObj.reductionAmount : 0;

                    this.standForm.deductionCoupon = this.orderObj.preferentialPrice ? this.orderObj.preferentialPrice : 0;
                    
                    this.standForm.deductionRecommendShipperFlag = this.standForm.deductionCodeRewardFlag;
                    this.standForm.deductionRecommendDriverFlag = this.standForm.deductionCodeRewardFlag;
                    this.standForm.deductionReductionAmountFlag = this.standForm.deductionCouponRewardFlag;
                    this.standForm.deductionCouponFlag = this.standForm.deductionCouponRewardFlag;

                    // console.log('standform',this.standForm)

                    orderReviewConfirm(this.standForm).then(res => {
                        this.$message({
                            type: 'success',
                            message: '订单已审查!'
                        })
                        this.close();
                    }).catch((err) => {
                        this.$message({
                            type: 'error',
                            message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                        })
                        this.close();
                    });
            //     } else {
            //         this.$message({
            //             type: 'warning',
            //             message: '请填写完整数据!'
            //         })
            //         return false;
            //     }
            // });
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .exOrderDialog{
        h2{
            border-bottom: solid 2px #e0e0e0;
            line-height: 25px;
            font-size: 18px;
            padding: 0px 0 5px 0;
            color: #333333;
            font-weight: bold;
            font-stretch: normal;
            margin-bottom: 10px;
        }
        img{
            cursor: pointer;
            width: 500px;
            height: 300px;
        }
        .tips{
            margin-bottom: 20px;
            color: red;
        }
    }
</style>
