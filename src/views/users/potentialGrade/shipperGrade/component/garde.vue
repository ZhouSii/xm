<template>
    <el-dialog
    title="是否将潜力等级调整为以下等级"
    class="garde"
    top="15vh"
    :modal="false"
    :visible="dialogVisible"
    custom-class="add-review"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    v-loading="loading"
    width="30%"
    :before-close="close">
        <div class="ifcancel">
            <el-form :model="form" :rules="rules" ref="ruleForm" :label-width="formLabelWidth" label-position="right">
                <el-form-item prop="potentialGrade">
                    <el-select v-model="form.potentialGrade" clearable placeholder="请选择">
                        <el-option
                        v-for="item in optionsGradeType"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code"
                        :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" plain icon="el-icon-success" @click="submitForm('ruleForm')">确认</el-button>
            <el-button type="primary" plain icon="el-icon-error" @click="close">取消</el-button>
        </div>
    </el-dialog>
</template>

<script type="text/javascript">
import { DicGradeType } from '@/api/common.js'
import { batchPotentialGrade } from '@/api/users/potentialGrade/shipperGrade.js'

    export default{
        name:'garde',
        components:{
        },
        props:{
            dialogVisible:{
                type:Boolean,
                default:false
            },
            initForm:{
                type:Array,
            }
        },
        watch:{
            dialogVisible(newVal,oldVal){
                // console.log('newVal',newVal)
                if(newVal){
                    // this.init();
                    console.log(this.initForm)
                    this.form.potentialGrade = this.initForm[0].levelAdjustmentCode;
                }
            },
        },
        data(){
            return{
                formLabelWidth:'0',
                loading:true,
                form:{
                    potentialGrade:''
                },
                optionsGradeType:[],
                rules:{
                    // remark: [
                    //     { required: true, message: '请输入备注详细内容~', trigger: 'blur' },
                    // ],
                    potentialGrade:{ required: true, message: '请选择调整等级', trigger: 'change' }
                },
            }
        },
        mounted(){
            this.init();
        },
        methods: {
            init(){
                DicGradeType().then(res => {
                    // console.log('resArr',resArr)
                    this.optionsGradeType = res.data;
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.btnShow = true;
                        let formsArr = [];
                        this.initForm.forEach(el => {
                            formsArr.push({
                                id:el.id,
                                potentialGrade:this.form.potentialGrade,
                                potentialGradeName:this.optionsGradeType.find(item => item.code == this.form.potentialGrade)['name'],
                            })
                        })
                        batchPotentialGrade(formsArr).then(res =>{
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

<style type="text/css" lang="scss">
    .garde{
        .el-form{
            padding: 0 20px;
             .el-form-item__content{
                .el-select{
                    width: 100%;
                }
            }
        }
    }
</style>

