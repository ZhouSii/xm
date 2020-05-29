<template>
    <div class="expenses commoncss">
        <el-dialog :title='formtitle' :close-on-click-modal="false" v-el-drag-dialog top="5vh" :visible="dialogFormVisible" @close="close">
            <el-form :model="standForm" label-position="right"  ref="ruleForm">
                <h2>订单信息</h2>
                <el-row class="basicInfo" :span='24'>
                    <el-col :span="6">订单号：</el-col>
                    <el-col :span="18">{{standForm.orderSerial}}</el-col>
                    <div v-for="(item,idx) in standForm.addressList" :key="idx">
                        <el-col :span="6">{{idx == 0 ? '提货地：' : '目的地：'}}</el-col>
                        <el-col :span="18">{{item}}</el-col>
                    </div>
                    <el-col :span="6">需求车型：</el-col>
                    <el-col :span="18">{{standForm.carTypeName}}</el-col>
                </el-row> 
                <h2>费用信息</h2>
                <el-row class="basicInfo" :span='24'>
                    <el-col :span="6">起步价：</el-col>
                    <el-col :span="6">{{standForm.startPrice || 0}}</el-col>
                    <el-col :span="6">超里程费：</el-col>
                    <el-col :span="6">{{standForm.outMileagePrice || 0}}</el-col>
                    <el-col :span="6">返程服务费：</el-col>
                    <el-col :span="6">{{standForm.returnServiceFee || 0}}</el-col>
                    <el-col :span="6">小费：</el-col>
                    <el-col :span="6">{{standForm.tip || 0}}</el-col>
                    <el-col :span="6">等候费：</el-col>
                    <el-col :span="6">{{standForm.unloadingFee || 0}}</el-col>
                    <el-col :span="6">多途径点费：</el-col>
                    <el-col :span="6">{{standForm.moreWayPrice || 0}}</el-col>
                    <el-col :span="6">货主货物保障费：</el-col>
                    <el-col :span="6">{{standForm.shipperInsuranceFee || 0}}</el-col>
                    <el-col :span="6">车主改价费：</el-col>
                    <el-col :span="6">{{standForm.driverChangeFee || 0}}</el-col>
                    <el-col :span="6" class="fontRed">优惠券抵扣：</el-col>
                    <el-col :span="6" class="fontRed">{{standForm.preferentialPrice || 0}}</el-col>
                    <el-col :span="6" class="fontRed">在线交易优惠金：</el-col>
                    <el-col :span="6" class="fontRed">{{standForm.reward || 0}}</el-col>
                    <el-col :span="6">货主线上应支付费用：</el-col>
                    <el-col :span="6">{{standForm.shipperOnlinePay || 0}}</el-col>
                    <el-col :span="6">货主线下应支付费用：</el-col>
                    <el-col :span="6">{{standForm.shipperOfflinePay || 0}}</el-col>
                </el-row> 
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" plain  icon="el-icon-success" @click="submitForm('ruleForm')">确 定</el-button>
                <el-button type="primary" plain icon="el-icon-error" @click="close">取 消</el-button>
            </div> 
        </el-dialog>
    </div>
</template>

<script>

import { getConfirmExpensesInfo,confirmExpense } from '@/api/order/ordermange'
import { objectMerge2 } from '@/utils/'

export default {
    name: 'expenses',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            required:false,
            default:'订单费用确认'
        },
        orderSerial:{
            type:String,
            default:'',
        },
        driverId:{
            type:String,
            default:'',
        }
    },
    components:{
    },
    data() {
      return {
        standForm:{
            orderSerial:'',//订单号
            addressList:[],
            startPrice:null,//起步价
            agencyId:null,//超里程费
            outMileagePrice:null,//返程服务费
            tip:null,//小费
            unloadingFee:null,//等候费
            moreWayPrice:null,//多途径点费
            shipperInsuranceFee:null,//货主货物保障费
            driverChangeFee:null,//车主改价费
            preferentialPrice:null,//优惠券抵扣
            reward:null,//在线交易优惠金
            shipperOnlinePay:null,//货主线上应支付费用
            shipperOfflinePay:null,//货主线下应支付费用
        },
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
        this.init()
    },
    methods: {
        close(){
            if(this.dialogFormVisible){
                this.$emit('update:dialogFormVisible',false);
                this.$emit('renovate');
            }
        },
        //初始化选择项数据
        init(){
           
        },
        reviseForms(){
            getConfirmExpensesInfo(this.orderSerial).then(res => {
                this.standForm = res.data;
            })
        },
        submitForm(formName) {
            // this.$refs[formName].validate((valid) => {
            //     if (valid) {
                    let forms = {
                        driverId:this.driverId,
                    };
                    confirmExpense(this.orderSerial,forms).then(res =>{
                        this.$message({
                            type: 'success',
                            message: '订单费用确认成功!'
                        })
                        this.close();
                    }).catch(err => {
                        this.$message({
                            type: 'info',
                            message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                        })
                    })
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
    .expenses{
        h2{
            border-bottom: solid 2px #e0e0e0;
            line-height: 25px;
            font-size: 18px;
            padding: 0px 0 18px 0;
            color: #333333;
            font-weight: bold;
            font-stretch: normal;
        }
        .basicInfo{
            border-top: 1px solid #e6e6e6;
            border-left: 1px solid #e6e6e6;
            margin: 20px 0;
            .el-col{
                font-size: 14px;
                line-height: 20px;
                height: 45px;
                padding: 12px 10px;
                border-right: 1px solid #e6e6e6;
                border-bottom: 1px solid #e6e6e6;
                &:nth-child(odd){
                    background: #fafafa;
                    text-align: right;
                }
                &:nth-child(even){
                    text-align: left;
                }
            }
            .fontRed{
                color:red;
            }
        }
    }
</style>
