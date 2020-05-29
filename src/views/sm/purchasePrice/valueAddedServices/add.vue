<template>
    <div class="otherServiceAreaPriceeADD commoncss">
        <el-dialog :title='formtitle' :close-on-click-modal="false" v-el-drag-dialog top="5vh" :visible="dialogFormVisible" @close="close">
            <el-form   :model="standForm" :rules="newrules" label-position="right"  ref="ruleForm"  :label-width="formLabelWidth">
                <h2>选择专线承运商</h2>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="专线承运商：" prop="agencyId" v-if="!isModify">
                            <el-select v-model="standForm.agencyId" filterable placeholder="请选择" >
                                <el-option
                                v-for="item in optionsCarriers"
                                :key="item.id"
                                :label="item.carriersName"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                         <el-form-item  label="到达地：" class="is-required" v-else>
                            <el-input v-model="standForm.agencyName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <h2>代收货款服务费</h2>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="费率(千分之)：" prop="agencyRate">
                            <NumberOnlyPoint v-model="standForm.agencyRate" placeholderTxt="‰"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="最低一票收费：" prop="agencySingleLowestCost">
                            <!-- <NumberOnlyPoint v-model="standForm.agencySingleLowestCost" placeholderTxt="元"/> -->
                            <el-input v-model="standForm.agencySingleLowestCost" v-numberOnly placeholder="元"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="最高一票收费：" prop="agencySingleHighestCost">
                            <!-- <NumberOnlyPoint v-model="standForm.agencySingleHighestCost" placeholderTxt="元"/> -->
                            <el-input v-model="standForm.agencySingleHighestCost" v-numberOnly placeholder="元"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <h2>货物保价服务费</h2>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="费率(千分之)：" prop="keepRate">
                            <NumberOnlyPoint v-model="standForm.keepRate" placeholderTxt="‰"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="最低一票收费：" prop="keepSingleLowestCost">
                            <!-- <NumberOnlyPoint v-model="standForm.keepSingleLowestCost" placeholderTxt="元"/> -->
                            <el-input v-model="standForm.keepSingleLowestCost" v-numberOnly placeholder="元"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <h2>签收单服务费</h2>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="传真返回：" prop="faxReceiptCost">
                            <!-- <NumberOnlyPoint v-model.number="standForm.faxReceiptCost" placeholderTxt="元"/> -->
                            <el-input v-model.number="standForm.faxReceiptCost" placeholder="元"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="原件返回：" prop="orginReturn">
                            <!-- <NumberOnlyPoint v-model="standForm.orginReturn" placeholderTxt="元"/> -->
                            <el-input v-model.number="standForm.orginReturn" placeholder="元"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" plain  icon="el-icon-success" @click="submitForm('ruleForm')" :disabled="btnShow">{{isModify ? '保 存' : '确 定'}}</el-button>
                <el-button type="primary" plain icon="el-icon-error" @click="close">取 消</el-button>
            </div> 
        </el-dialog>
    </div>
</template>

<script>

import { newOtherServiceAreaPrice2,reviseOtherServiceAreaPrice2,OtherServiceAreaPriceDetails } from '@/api/server/lingdan/otherService.js'
import { objectMerge2 } from '@/utils/'
import NumberOnlyPoint from '@/components//NumberOnlyPoint/index'
import { getCarriersLine } from '@/api/dispatch/CarriersLine.js'

export default {
    name: 'otherServiceAreaPriceeADD',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            required:false,
            default:'新增专线承运商增值服务定价'
        },
        isModify:{
            type:Boolean,
            default:false,
        },
        changeForm:{
            type:Object,
        },
    },
    components:{
        NumberOnlyPoint,
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
            // else if (parseFloat(value) <= 0) {
            //     callback(new Error('代收货款服务费单票最低收费需大于0'));
            // }
            else if(Number(this.standForm.agencySingleHighestCost) <= Number(this.standForm.agencySingleLowestCost) && this.standForm.agencySingleHighestCost != ''){
                callback(new Error('单票最高收费应大于单票最低收费'));
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
            }else if(Number(this.standForm.agencySingleHighestCost) <= Number(this.standForm.agencySingleLowestCost)){
                callback(new Error('单票最高收费应大于单票最低收费'));
            }else {
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
            // else if (parseFloat(value) <= 0) {
            //     callback(new Error('货物保价服务费单票最低收费最低收费需大于0'));
            // } 
            else {
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
        loadingCIty:false,
        optionsCarriers:[],//承运商
        standForm:{
            // agencyArea:'',//区代所在地
            // agencyAreaCode:'',//区代所在地Code
            platformType:'1',//平台类型(2：区代，3：平台，1：承运商)
            agencyId:'',//区代ID
            agencyName:'',//区代名称
            agencyRate:'',//代收费率(千分比)
            agencySingleLowestCost:'',//代收单票最低费用
            agencySingleHighestCost:'',//代收单票最高费用
            // agencyBiggestCost:'',//代收最大金额
            keepRate:'',//保价费率(千分比)
            keepSingleLowestCost:'',//保价单票最低费用
            keepSingleHighestCost:'',//货物保价最大金额
            faxReceiptCost:'',//传真返回
            orginReturn:'',//原件返回
        },
        newrules: {
            // agencyAreaCode:{required: true, message: '请选择区代所在地', trigger: 'change'},
            agencyId:{required: true, message: '请选择专线承运商', trigger: 'change'},
            // provinceCode:{required: true, message: '请选择区域', trigger: 'change'},
            // totalAreaCodeArr:{type: 'array', required: true, message: '请选择城市', trigger: 'change'},
            agencyRate:{required: true,validator: checkAgencyRate,trigger: 'blur'},
            agencySingleLowestCost:{required: true,validator: checkAgencySingleLowestCost,trigger: 'blur' },
            agencySingleHighestCost:{ required: true, validator: checkAgencySingleHighestCost,trigger: 'blur'},
            // agencyBiggestCost:{required: true, message:"请输入代收货款最大金额", trigger: 'change'},
            keepRate:{required: true, validator: checkKeepRate,trigger: 'blur'},
            keepSingleLowestCost:{required: true, validator: checkKeepSingleLowestCost,trigger: 'blur'},
            keepSingleHighestCost:{required: true, message:"请输入货物保价最大金额", trigger: 'blur'},
            // faxReceiptCost:{required: true, validator: checkFaxReceiptCost,trigger: 'blur'},
            // orginReturn:{required: true, validator: checkOrginReturn,trigger: 'change'},
            faxReceiptCost:[
                { required: true, message: '请输入签收单服务费传真返回',trigger: 'change'},
                { type: 'number', message: '签收单服务费传真返回必须为数字值',trigger: 'change'},
            ],
            orginReturn:[
                { required: true, message: '请输入签收单服务费原件返回',trigger: 'change'},
                { type: 'number', message: '签收单服务费原件返回必须为数字值',trigger: 'change'},
            ],
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
        getValue(obj){
            return obj ? obj.value:'';
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
            getCarriersLine().then(res => {
                this.optionsCarriers = res.data;
            })
        },
        reviseForms(){
            if(this.isModify){
                OtherServiceAreaPriceDetails(this.changeForm.id).then(res =>{
                    this.standForm = objectMerge2(this.changeForm);
                })
                // this.$set(this.standForm, 'timeVal', [this.changeForm.rewardStartDate,this.changeForm.rewardEndDate])
            }else{
                this.clearForms();
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.btnShow = true;
                    this.completeName();
                    let forms = objectMerge2(this.standForm);
                    // console.log(forms)
                    // let standarFunction = this.isBatch ? batchOtherServiceAreaPrice(forms) : this.isModify? reviseOtherServiceAreaPrice2(forms) : 
                    // newOtherServiceAreaPrice2(forms);
                    let standarFunction = this.isModify? reviseOtherServiceAreaPrice2(forms) : newOtherServiceAreaPrice2(forms);
                    standarFunction.then(res =>{
                        this.$message({
                            type: 'success',
                            // message: this.isBatch ? '批量修改区代增值服务定价成功' : this.isModify ? '修改区代增值服务定价成功' : '新增区代增值服务定价成功!'
                            message: this.isModify ? '修改专线承运商增值服务定价' : '新增专线承运商增值服务定价!'
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
                if(i == 'platformType'){
                    this.standForm[i] = '1'
                }else{
                    this.standForm[i] = ''
                }
            } 
        },
        completeName(){
            if(!this.isModify){
                // this.standForm.agencyName = this.optionseAreaAgency.find(item => item.id ==  this.standForm.agencyId)['agencyName'];
                this.standForm.agencyName = this.optionsCarriers.find(item => item.id === this.standForm.agencyId)['carriersName'];
            }
        },

    },
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .otherServiceAreaPriceeADD{
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
