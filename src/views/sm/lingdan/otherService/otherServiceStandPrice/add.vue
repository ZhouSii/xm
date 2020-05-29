<template>
    <div class="otherServiceStandPriceADD commoncss">
        <el-dialog :title='formtitle' :close-on-click-modal="false" v-el-drag-dialog top="5vh" :visible="dialogFormVisible" @close="close">
            <el-form   :model="standForm" :rules="newrules" label-position="right"  ref="ruleForm"  :label-width="formLabelWidth">
                <h2>代收货款服务费</h2>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="费率(千分之)：" prop="agencyRate">
                            <NumberOnlyPoint v-model="standForm.agencyRate" placeholderTxt="‰"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="单票最低收费：" prop="agencySingleLowestCost">
                            <!-- <NumberOnlyPoint v-model="standForm.agencySingleLowestCost" placeholderTxt="元"/> -->
                            <el-input v-model="standForm.agencySingleLowestCost" v-numberOnly placeholder="元"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="单票最高收费：" prop="agencySingleHighestCost">
                            <!-- <NumberOnlyPoint v-model="standForm.agencySingleHighestCost" placeholderTxt="元"/> -->
                            <el-input v-model="standForm.agencySingleHighestCost" v-numberOnly placeholder="元"></el-input>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="12">
                        <el-form-item label="代收货款最大金额：" prop="agencyBiggestCost">
                            <el-input v-model="standForm.agencyBiggestCost" v-numberOnly placeholder="元"></el-input>
                        </el-form-item>
                    </el-col> -->
                </el-row>
                <h2>货物保价服务费</h2>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="费率(千分之)：" prop="keepRate">
                            <NumberOnlyPoint v-model="standForm.keepRate" placeholderTxt="‰"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="单票最低收费：" prop="keepSingleLowestCost">
                            <!-- <NumberOnlyPoint v-model="standForm.keepSingleLowestCost" placeholderTxt="元"/> -->
                            <el-input v-model="standForm.keepSingleLowestCost" v-numberOnly placeholder="元"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <!-- <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="货物保价最大金额：" prop="keepSingleHighestCost">
                            <el-input v-model="standForm.keepSingleHighestCost" v-numberOnly placeholder="元"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> -->
                <h2>签收单服务费</h2>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="传真返回：" prop="faxReceiptCost">
                            <NumberOnlyPoint v-model="standForm.faxReceiptCost" placeholderTxt="元"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="原件返回：" prop="orginReturn">
                            <NumberOnlyPoint v-model="standForm.orginReturn" placeholderTxt="元"/>
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

import { newOtherServiceStandPrice,reviseOtherServiceStandPrice } from '@/api/server/lingdan/otherService.js'
import { objectMerge2 } from '@/utils/'
import NumberOnlyPoint from '@/components//NumberOnlyPoint/index'

export default {
    name: 'otherServiceStandPriceADD',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            required:false,
            default:'维护增值服务标准定价'
        },
        isModify:{
            type:Boolean,
            default:false,
        },
        changeForm:{
            type:Object,
        }
    },
    components:{
        NumberOnlyPoint
    },
    data() {

        var checkAgencyRate = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入代收货款服务费费率'));
            }
            else if (parseFloat(value) <= 0) {
                callback(new Error('代收货款服务费费率需大于0'));
            } else {
                callback();
            }
        };
        var checkAgencySingleLowestCost = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入代收货款服务费单票最低收费'));
            }
            else if (parseFloat(value) <= 0) {
                callback(new Error('代收货款服务费单票最低收费需大于0'));
            } else {
                callback();
            }
        };
        var checkAgencySingleHighestCost = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入代收货款服务费单票最高收费'));
            }
            else if (parseFloat(value) <= 0) {
                callback(new Error('代收货款服务费单票最高收费需大于0'));
            } else {
                callback();
            }
        };
        var checkKeepRate = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入货物保价服务费费率'));
            }
            else if (parseFloat(value) <= 0) {
                callback(new Error('货物保价服务费费率需大于0'));
            } else {
                callback();
            }
        };
        var checkKeepSingleLowestCost = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入货物保价服务费单票最低收费'));
            }
            else if (parseFloat(value) <= 0) {
                callback(new Error('货物保价服务费单票最低收费最低收费需大于0'));
            } else {
                callback();
            }
        };

        var checkFaxReceiptCost = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入签收单服务费传真返回'));
            }
            else if (parseFloat(value) <= 0) {
                callback(new Error('签收单服务费传真返回需大于0'));
            } else {
                callback();
            }
        };

        var checkOrginReturn = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入签收单服务费原件返回'));
            }
            else if (parseFloat(value) <= 0) {
                callback(new Error('签收单服务费原件返回需大于0'));
            } else {
                callback();
            }
        };

      return {
        btnShow:false,
        formLabelWidth:'150px',
        standForm:{
            agencyRate:'',//代收费率(千分比)
            agencySingleLowestCost:'',//代收单票最低费用
            agencySingleHighestCost:'',//代收单票最高费用
            agencyBiggestCost:'',//代收最大金额
            keepRate:'',//保价费率(千分比)
            keepSingleLowestCost:'',//保价单票最低费用
            keepSingleHighestCost:'',//货物保价最大金额
            faxReceiptCost:'',//传真返回
            orginReturn:'',//原件返回
        },
        newrules: {
            agencyRate:{required: true,validator: checkAgencyRate,trigger: 'blur'},
            agencySingleLowestCost:{required: true,validator: checkAgencySingleLowestCost,trigger: 'blur' },
            agencySingleHighestCost:{ required: true, validator: checkAgencySingleHighestCost,trigger: 'blur'},
            agencyBiggestCost:{required: true, message:"请输入代收货款最大金额", trigger: 'blur'},
            keepRate:{required: true, validator: checkKeepRate,trigger: 'blur'},
            keepSingleLowestCost:{required: true, validator: checkKeepSingleLowestCost,trigger: 'blur'},
            keepSingleHighestCost:{required: true, message:"请输入货物保价最大金额", trigger: 'blur'},
            faxReceiptCost:{required: true, validator: checkFaxReceiptCost,trigger: 'blur'},
            orginReturn:{required: true, validator: checkOrginReturn,trigger: 'blur'},
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
    },
    methods: {
        reviseForms(){
            if(this.isModify){
                this.standForm = objectMerge2(this.changeForm);
                // this.$set(this.standForm, 'timeVal', [this.changeForm.rewardStartDate,this.changeForm.rewardEndDate])
            }else{
                this.clearForms();
            }
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
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.btnShow = true;
                    let forms = objectMerge2(this.standForm);
                    // console.log(forms)
                    let standarFunction = this.isModify? reviseOtherServiceStandPrice(forms) : newOtherServiceStandPrice(forms);
                    standarFunction.then(res =>{
                        this.$message({
                            type: 'success',
                            message: '维护增值服务标准定价成功！'
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
                this.standForm[i] = ''
            } 
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .otherServiceStandPriceADD{
        h2{
            border-bottom: solid 2px #e0e0e0;
            line-height: 25px;
            font-size: 18px;
            padding: 0px 0 18px 0;
            color: #333333;
            font-weight: bold;
            font-stretch: normal;
            margin-bottom: 20px;
        }
    }
</style>
