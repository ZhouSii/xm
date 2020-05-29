<template>
    <div class="toReviewDiog commoncss StyleNewinfoComponent">
        <el-dialog :title='formtitle' :close-on-click-modal="false" v-el-drag-dialog top="5vh" :visible="dialogFormVisible" @close="close">
            <el-form   :model="standForm" :rules="newrules" label-position="right"  ref="ruleForm"  :label-width="formLabelWidth">
                <div class="essentialInformation">
                    <el-row class="basicInfo" :span='24'>
                        <!-- 第一行 -->
                        <el-col :span="4">月审申请时间：</el-col>
                        <el-col :span="4">{{monthTrialDetailsObj.submitTime | parseTime}}</el-col>
                        <el-col :span="4">审核操作人：</el-col>
                        <el-col :span="4">{{monthTrialDetailsObj.operator}}</el-col>
                        <el-col :span="4">审核操作时间：</el-col>
                        <el-col :span="4">{{monthTrialDetailsObj.operTime | parseTime}}</el-col>
                        <!-- 第二行 -->
                        <el-col :span="4">车主姓名：</el-col>
                        <el-col :span="4">{{monthTrialDetailsObj.driverName}}</el-col>
                        <el-col :span="4">手机号：</el-col>
                        <el-col :span="4">{{monthTrialDetailsObj.driverMobile}}</el-col>
                        <el-col :span="4">产品所属区域：</el-col>
                        <el-col :span="4">{{monthTrialDetailsObj.productAreaCodeName}}</el-col>
                        <!-- 第三行 -->
                        <el-col :span="4">期数：</el-col>
                        <el-col :span="4">{{monthTrialDetailsObj.periods}}</el-col>
                        <el-col :span="4">实际有效天数：</el-col>
                        <el-col :span="4">{{monthTrialDetailsObj.validDays}}/{{monthTrialDetailsObj.correspondingMonthMaxDays}}</el-col>
                        <el-col :span="4">补贴金额：</el-col>
                        <el-col :span="4">{{monthTrialDetailsObj.actualSubsidyMoney}}</el-col>
                        <!-- 第四行 -->
                        <el-col :span="4">补偿金额：</el-col>
                        <el-col :span="4">{{monthTrialDetailsObj.compensateMoney}}</el-col>
                    </el-row>
                </div>
                <div class="essentialInformation">
                    <el-row :gutter="20" v-viewer>
                        <el-col :span="8" class="CheckPass">
                            <div class="uploadPicture">
                                <h3 class="uploadH3">左后方45°角的全车照片（车牌无遮挡）</h3>
                                <div class="uploadImgBox">
                                    <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                                        <img :src='monthTrialDetailsObj.leftRearPhoto || defaultImg'  alt="" >
                                    </el-tooltip>
                                </div>
                            </div>
                            <el-form-item prop="shipperCardFileNoPass" label="图片审核状态：" label-width="150px">
                                <el-input v-model="monthTrialDetailsObj.leftRearPhotoStatusName" auto-complete="off" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="CheckPass">
                            <div class="uploadPicture">
                                <h3 class="uploadH3">右后方45°角的全车照片（车牌无遮挡）</h3>
                                <div class="uploadImgBox">
                                    <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                                        <img :src='monthTrialDetailsObj.rightRearPhoto || defaultImg'  alt="" >
                                    </el-tooltip>
                                </div>
                            </div>
                            <el-form-item prop="shipperCardFileNoPass" label="图片审核状态：" label-width="150px">
                                <el-input v-model="monthTrialDetailsObj.rightRearPhotoStatusName" auto-complete="off" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="CheckPass">
                            <div class="uploadPicture">
                                <h3 class="uploadH3">每月指定手势</h3>
                                <div class="uploadImgBox">
                                    <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                                        <img :src='monthTrialDetailsObj.gesturePhoto || defaultImg'  alt="" >
                                    </el-tooltip>
                                </div>
                            </div>
                            <el-form-item prop="shipperCardFileNoPass" label="图片审核状态：" label-width="150px">
                                <el-input v-model="monthTrialDetailsObj.gesturePhotoStatusName" auto-complete="off" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row> 
                </div>
                <el-row :span='24'>
                    <el-col :span="8">
                        <el-form-item prop="status" label="月审复审：" label-width="150px">
                            <el-radio-group v-model="standForm.status">
                                <el-radio :label="'AF0880705'">复审通过</el-radio>
                                <el-radio :label="'AF0880706'">复审驳回</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :span='24' v-if="standForm.status == 'AF0880706'">
                    <el-col :span="8">
                        <el-form-item prop="returnReason" label="驳回原因" label-width="150px">
                            <el-select v-model="standForm.returnReason" placeholder="请选择" >
                                <el-option
                                v-for="item in optionsReject"
                                :key="item.id"
                                :label="item.name"
                                :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
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

import { monthTrialDetails,monthTrialRepeatCheck } from '@/api/marketing/carSticker'
import { objectMerge2 } from '@/utils/'
import { RejectTypeStatus } from '@/api/common.js'


export default {
    name: 'toReviewDiog',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            required:false,
            default:'复审'
        },
        detailsObj:{
            type:Object,
        },
    },
    components:{
    },
    data() {
      return {
        defaultImg:'/static/test.jpg',//默认第一张图片的url
        btnShow:false,
        formLabelWidth:'150px',
        radio:'',
        standForm:{
            monthTrialId:'',//
            status:'AF0880705',//
            returnReason:'',
        },
        monthTrialDetailsObj:{
            "carNumber": "",
            "carStickerOrderSerial": "",
            "carType": "",
            "carTypeName": "",
            "compensateMoney": 0,
            "driverId": "",
            "driverMobile": "",
            "driverName": "",
            "gesturePhoto": "",
            "gesturePhotoStatus": "",
            gesturePhotoStatusName:'',
            "id": "",
            "leftRearPhoto": "",
            "leftRearPhotoStatus": "",
            "leftRearPhotoStatusName": "",
            "monthTrialSerial": "",
            "operTime": "",//操作人
            "operator": "",//操作时间
            "periods": 0,
            "productAreaCode": "",
            "productAreaCodeName": "",
            "productId": "",
            "productName": "",
            "rightRearPhoto": "",
            "rightRearPhotoStatus": "",
            "rightRearPhotoStatusName": "",
            "status": "",
            "statusName": "",
            "submitTime": "",//提交申请时间
            "subsidyMoney": 0,
            "validDays": 0
        },
        newrules: {
            // agencyBiggestCost:{required: true, message:"请输入代收货款最大金额", trigger: 'blur'},
        },
        optionsReject:[],
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
            // this.clearForms();
            monthTrialDetails(this.detailsObj.id).then(res => {
                this.monthTrialDetailsObj = res.data;
            })
        },
        close(){
            if(this.dialogFormVisible){
                this.$emit('update:dialogFormVisible',false);
                this.$refs.ruleForm.resetFields();
                this.clearForms();
                this.$emit('renovateM');
                this.btnShow = false;
            }
        },
        //初始化选择项数据
        init(){
            RejectTypeStatus().then(res => {
                this.optionsReject = res.data;
            })
        },
        //当前月份
        mGetDate(){
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var d = new Date(year, month, 0);
            return d.getDate();
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.btnShow = true;
                    this.standForm.monthTrialId = this.monthTrialDetailsObj.id;
                    let forms = objectMerge2(this.standForm);
                    // console.log(forms)
                    monthTrialRepeatCheck(forms).then(res =>{
                        this.$message({
                            type: 'success',
                            message: '复审成功！'
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
            // for (const i in this.standForm) {
            //     this.standForm[i] = ''
            // }
            this.standForm ={
                monthTrialId:'',//
                status:'AF0880705',//
                returnReason:'',
            }
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .toReviewDiog{
        .el-form .essentialInformation{
            padding:10px 0;
            .basicInfo{
                border-top: 1px solid #e6e6e6;
                border-left: 1px solid #e6e6e6;
                .el-col{
                    font-size: 14px;
                    line-height: 45px;
                    height: 45px;
                    padding: 0px 10px;
                    border-right: 1px solid #e6e6e6;
                    border-bottom: 1px solid #e6e6e6;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    &:nth-child(odd){
                        background: #fafafa;
                        text-align: right;
                    }
                    &:nth-child(even){
                        text-align: left;
                    }
                }
            }
            .uploadH3{
                line-height: 40px;
                text-align: center;
                border-bottom: 1px solid #eee;
                background: #eee;
                position: relative;
            }
            
            .CheckPass .el-form-item{
                margin-bottom: 0px;
                border: 1px solid #eee;
                border-top: 0 none;
                padding: 5px 10px 5px 0;
            }
        }
    }
</style>
