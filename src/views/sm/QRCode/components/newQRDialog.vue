<template>
     <div class="commoncss">
        <el-dialog
        title="生成二维码"
        :modal="true"
        :visible="dialogVisible"
        custom-class="add-review"
        :close-on-click-modal="false"
        :modal-append-to-body="false"
        v-loading="loading"
        width="40%"
        v-el-drag-dialog
        :before-close="close">
            <el-form   :model="standForm" :rules="newrules"  ref="ruleForm"  :label-width="formLabelWidth" label-position="right">
                <el-form-item label="主题：" prop="topic" >
					<el-input v-model.trim="standForm.topic" maxlength="20" ></el-input>
                </el-form-item>
                 <el-form-item label="业务员：" prop="name" >
                    <!-- <CustomerSearch @returnCustomer = 'getCustomer' :customerName = "standForm.name"  v-model="standForm.name"/> -->
                    <CustomerSearch @returnCustomer = 'getCustomer' :customerName = "standForm.name"/>
                </el-form-item>
                 <el-form-item label="渠道名称：" prop="channal" >
					<!-- <el-input v-model="standForm.channal" ></el-input> -->
                    <selectChannel  @change = "getVal"  v-model="standForm.channal"/>
                    {{standForm.channal}}
                </el-form-item>
                 <el-form-item label="链接：" prop="url" >
                    <el-select v-model="standForm.url" clearable placeholder="请选择">
                        <el-option
                            v-for="item in optionsQRcode"
                            :key="item.id"
                            :label="item.name"
                            :value="item.value"
                            :disabled="item.disabled">
                        </el-option>
                    </el-select>
					<!-- <el-input v-model="standForm.url" ></el-input> -->
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" plain  icon="el-icon-success" @click="submitForm('ruleForm')">确认</el-button>
                <el-button type="primary" plain icon="el-icon-error" @click="close">取消</el-button>
            </div>
        </el-dialog>
     </div>
</template>

<script type="text/javascript">
import { getDictionary,DicQRcodeLink } from '@/api/common.js'
import CustomerSearch from '@/components/CustomerSearch/select'
import { aflcQrcodeNew } from '@/api/server/QRCode.js'
import selectChannel from '@/components/selectTree/QRcode'

    export default{
        name:'newQRcodeCompent',
        components:{
            CustomerSearch,
            selectChannel
        },
        props:{
            dialogVisible:{
                type:Boolean,
                default:false
            },
        },
        watch:{
            dialogVisible(newVal,oldVal){
                if(newVal){
                    this.init();
                }
            }
        },
        data(){
            return{
                cancelReason:'AF00512',//取消原因
                formLabelWidth:'15%',
                loading:false,
                optionsQRcode:[],
                standForm:{
                    topic:'',//主题
                    belongSalesman:'',
                    name:'',
                    channal:'',//渠道
                    url:'',
                },
                optionsCancel:[],
                newrules:{
                    topic: [
                        { required: true, message: '请输入主题名称', trigger: 'change' },
                    ],
                    name:{required: true, message: '请选择业务员', trigger: 'change' },
                    channal:{required: true, message: '请选择渠道', trigger: 'change' },
                    url:{required: true, message: '请输入链接', trigger: 'change' },
                },
            }
        },
        methods: {
            init(){
                DicQRcodeLink().then(res => {
                    this.optionsQRcode = res.data;
                })
            },
            getVal(val){
                console.log('valvalval',val)
                this.standForm.channal = val;
            },
            getCustomer(val){
                // console.log('belongSalesman',val)
                this.standForm.belongSalesman = val.userId;
                this.standForm.name = val.name;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let form = Object.assign({},this.standForm);
                        aflcQrcodeNew(form).then(res => {
                            this.close();
                            this.$message({
                                type: 'success',
                                message: '操作成功~'
                            })
                        }).catch(err => {
                            this.$message({
                                type: 'info',
                                message: '操作失败，原因：' +( err.text ? err.text : err.errorInfo)
                            })
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            close(done) {
                this.$refs.ruleForm.resetFields();
                this.$emit('update:dialogVisible', false);
                this.$emit('close');
                if (typeof done === 'function') {
                    done()
                }
            },
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
   
</style>

