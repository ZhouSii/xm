<template>
    <el-dialog
    title="备注"
    class="remake"
    top="35vh"
    :modal="false"
    :visible="dialogVisible"
    custom-class="add-review"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    v-loading="loading"
    width="30%"
    :before-close="close">
        <div class="ifcancel">
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
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" plain icon="el-icon-success" @click="handleSearch('sure')">确认</el-button>
            <el-button type="primary" plain icon="el-icon-error" @click="handleSearch('cancel')">取消</el-button>
        </div>
    </el-dialog>
</template>

<script type="text/javascript">
import { addCustsvcRemark } from '@/api/order/vehicleSource.js'
    export default{
        name:'vehicleSourceRemaker',
        components:{

        },
        props:{
            dialogVisible:{
                type:Boolean,
                default:false
            },
            carInfoId:{
                type:String,
                required:true
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
                    carInfoId:'',//车源ID
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
            handleSearch(type){
                switch(type){
                    case 'cancel':
                        this.close();
                        break;
                    case 'sure':
                        if(this.form.remark){
                            let remakeForm = Object.assign({},this.form,{carInfoId:this.carInfoId});
                            addCustsvcRemark(remakeForm).then(res => {
                                this.$message({
                                    type: 'success',
                                    message: '添加备注成功！'
                                })
                                this.close();
                            }).catch(err => {
                                this.$message({
                                    type: 'info',
                                    message: '操作失败，原因：' + (err.text ? err.text : err.errorInfo)
                                })
                            })
                        }else{
                            this.$message({
                                type: 'warning',
                                message: '请填写完整备注信息！'
                            })
                        }
                       
                        break;
                }
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
    .remake{
        .el-form{
            padding: 0 20px;
        }
    }
</style>

