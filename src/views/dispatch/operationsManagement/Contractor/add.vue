<template>
    <div class="ContractorAdd commoncss">
        <el-dialog :title='formtitle' :close-on-click-modal="false" v-el-drag-dialog top="5vh" :visible="dialogFormVisible" @close="close">
            <el-form :model="standForm" :rules="newrules" label-position="right"  ref="ruleForm"  :label-width="formLabelWidth">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="承包商：" prop="companyName">
                            <el-input v-model="standForm.companyName"  disabled v-if="isView"></el-input>
                            <CompanySearch @returnCompany = 'getCompany' v-model="standForm.companyName" :companyName = "standForm.companyName" :clearableStatus = 'true' ref="CompanySearch" v-else/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="承包产品：" prop="productId">
                            <el-input v-model="standForm.productName"  disabled v-if="isView"></el-input>
                            <el-select v-model="standForm.productId" v-else>
                                <el-option 
                                v-for="item in optionsProduct"
                                :key="item.id"
                                :label="item.productName"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="开通渠道：" prop="channel">
                            <el-input v-model="standForm.channel" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="业务办理人：" prop="userName">
                            <CustomerSearch @returnCustomer = 'getCustomer' :customerName = "standForm.userName" v-if="!isView"/>
                            <el-input v-model="standForm.userName" :disabled="isView" v-else></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="支付方式：" prop="payWay">
                            <el-input v-model="standForm.payWay" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="备注：" prop="remark">
                            <el-input
                               placeholder="少于100字符"
                               type="textarea"
                               show-word-limit
                               :autosize="{ minRows: 2, maxRows: 4}"
                               clearable
                               :disabled="isView"
                               maxlength="100"
                               v-model="standForm.remark">
                           </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" v-if="!isView" plain  icon="el-icon-success" @click="submitForm('ruleForm')" :disabled="btnShow">{{isModify ? '保 存' : '确 定'}}</el-button>
                <el-button type="primary" plain icon="el-icon-error" @click="close">取 消</el-button>
            </div> 
        </el-dialog>
    </div>
</template>
<script>

import { newContractor,contractorDetails,updateContractor,ProductList } from '@/api/dispatch/operationsManagement'
import { objectMerge2 } from '@/utils/'
import { DicNotifyWay,DicContractProduct } from '@/api/common'
import CompanySearch from '@/components/CustomerSearch/companyList'
import CustomerSearch from '@/components/CustomerSearch/select'

export default {
    name: 'ContractorAdd',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            required:false,
            default:'新增承包产品'
        },
        isModify:{
            type:Boolean,
            default:false,
        },
        changeForm:{
            type:Object,
        },
        isView:{
            type:Boolean,
            default:false,
        }
    },
    components:{
        CustomerSearch,
        CompanySearch,
    },
    data() {
      return {
        btnShow:false,
        formLabelWidth:'100px',
        optionsProduct:[],//产品列表
        standForm:{
            companyName:'',//承包商
            companyId:'',//承包商ID
            productName:'',//承包产品
            productId:'',//承包产品ID
            serviceInfo:'',
            channel:'线下办理',//开通渠道
            channelCode:'',//开通渠道code
            userName:'',//业务办理人
            userId:'',//业务办理人ID
            payWay:'线下转账',//付款方式
            payWayCode:'',//付款方式code
            remark:'',//备注
        },
        newrules: {
            productName:{required: true, message: '请输入产品名称', trigger: 'change'},
            typeCode:{required: true, message: '请选择产品类型', trigger: 'change'},
            // timeArr:{type: 'array', required: true, message: '请选择起止日期', trigger: 'change'},
            serviceInfo:{required: true, message: '请输入服务信息', trigger: 'change'},
            conrtactPrice:{required: true, message: '请输入承包价格', trigger: 'change'},
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
        },
    },
    mounted(){
        this.init()
    },
    methods: {
        getCustomer(val){
            // console.log('belongSalesman',val)
            this.standForm.userId = val.userId;
            this.standForm.userName = val.name;
            // this.standForm.mobilePhone = val.mobilephone;
        },
        getCompany(val){
            // console.log('getCompany',val)
            this.standForm.companyId = val.id;
            this.standForm.companyName = val.companyName;
        },
        close(){
            if(this.dialogFormVisible){
                this.$emit('update:dialogFormVisible',false);
                this.$refs.ruleForm.resetFields();
                this.clearForms();
                this.$emit('renovate');
                this.btnShow = false;
                if(!this.isView){
                    this.$refs.CompanySearch.clear();
                }
            }
        },
        //初始化选择项数据
        init(){
            ProductList().then(res => {
                this.optionsProduct = res.data;
            }).catch(err => {
                this.$message({
                    type: 'info',
                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                })
            })
        },
        reviseForms(){
            if(this.isModify || this.isView){
                contractorDetails(this.changeForm.id).then(res =>{
                    this.standForm = res.data;
                    // console.log('this.standForm',this.standForm)
                })
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
                    let standarFunction = this.isModify? updateContractor(forms) : newContractor(forms);
                    standarFunction.then(res =>{
                        this.$message({
                            type: 'success',
                            message:this.isModify ? '修改承包产品成功' : '新增承包产品成功!'
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
                if(i == 'channel'){
                    this.standForm[i] = '线下办理';
                }else if(i == 'payWay'){
                    this.standForm[i] = '线下转账';
                }else{
                    this.standForm[i] = ''
                }
            } 
        },
        completeName(){
            this.standForm.productName = this.optionsProduct.find(item => item.id ==  this.standForm.productId)['productName'];
            this.standForm.serviceInfo = this.optionsProduct.find(item => item.id ==  this.standForm.productId)['serviceInfo'];
        },
        doName(optionsArr,itemArr){
            let returnName = [];
            optionsArr.forEach(el => {
                itemArr.forEach(item => {
                    if(el.code == item){
                        returnName.push(el.name)
                    }
                })
            })
            return returnName;
        }
    },
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .ContractorAdd{
        .el-textarea .el-input__count {
            line-height: 14px;
        }
    }
</style>
