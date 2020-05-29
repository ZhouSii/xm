<template>
    <el-dialog
    title="备注"
    class="carStickerRemake"
    top="15vh"
    :modal="false"
    :visible="dialogVisible"
    custom-class="add-review"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    v-loading="loading"
    width="30%"
    :before-close="close">
        <el-form :model="form" :rules="rules" ref="ruleForm" :label-width="formLabelWidth" label-position="right" size="mini">
            <el-form-item prop="remark">
                <el-input 
                    :autosize="{ minRows: 6, maxRows: 10}" 
                    type="textarea" 
                    :maxlength="500" 
                    placeholder="请详细描述您的备注内容" 
                    v-model="form.remark">
                </el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" plain icon="el-icon-success" @click="submitForm2('ruleForm')">确认</el-button>
            <el-button type="primary" plain icon="el-icon-error" @click="close">取消</el-button>
        </div>
    </el-dialog>
</template>

<script type="text/javascript">
import { addCarStickerRemake } from '@/api/marketing/carSticker'
// import { getUserInfo } from '@/utils/auth.js'
import { objectMerge2 } from '@/utils/'

    export default{
        name:'carStickerRemake',
        components:{
        },
        props:{
            dialogVisible:{
                type:Boolean,
                default:false
            },
            orderSerial:{
                type:String,
            }
        },
        watch:{
            dialogVisible(newVal,oldVal){
                // console.log('newVal',newVal)
                if(newVal){
                    this.init();
                }
            },
        },
        data(){
            return{
                formLabelWidth:'0',
                loading:true,
                form:{
                    remark:'',//
                    carStickerOrderSerial:'',//订单流水号
                },
                rules:{
                    remark: [
                        { required: true, message: '请输入备注详细内容~', trigger: 'blur' },
                    ],
                },
            }
        },
        methods: {
            init(){
              
            },
           submitForm2(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.form.carStickerOrderSerial = this.orderSerial;
                        let standFrom = objectMerge2(this.form);
                        // console.log('standFromstandFrom',standFrom)
                        addCarStickerRemake(standFrom).then(res => {
                            this.$message({
                                type: 'success',
                                message: '新增车贴备注成功'
                            })
                            this.close();
                        }).catch(err => {
                            this.$message({
                                type: 'warning',
                                message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                            })
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
    .carStickerRemake{
        .el-form{
            padding: 0 20px;
        }
    }
</style>

