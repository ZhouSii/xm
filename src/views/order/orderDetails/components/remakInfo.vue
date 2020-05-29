<template>
    <el-dialog
    title="备注"
    class="remakeOrder"
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
                <el-form-item prop="unnormalStatus">
                   <el-checkbox v-model="form.unnormalStatus">标记为异常订单</el-checkbox>
                </el-form-item>
                <el-form-item prop="exceptionFile">
                    <!-- <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" :limit="3" listtype="picture-card" :showFileList='true' v-model="form.exceptionFile"/> -->
                    <div class="clearfix uploadcard">
                        <upload :title="'本地上传'" tip="" v-model="form.exceptionFile" :showFileList="true" :limit="3" listtype="picture" />
                    </div>
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
import { RemarkDriverInfo } from '@/api/order/ordermange.js'
import { getUserInfo } from '@/utils/auth.js'
// import upload from '@/components/Upload/singleImage2'
import upload from '@/components/Upload/multImage'

    export default{
        name:'remaker',
        components:{
            upload
        },
        props:{
            dialogVisible:{
                type:Boolean,
                default:false
            },
            orderSerial:{
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
                    orderSerial:'',//订单流水号
                    unnormalStatus:false,
                    exceptionFile:'',
                    unnormal:'0',
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
                        console.log('form.exceptionFile',this.form)
                        if(this.form.remark){
                            let userInfo = getUserInfo();
                            this.form.unnormal = this.form.unnormalStatus == true ? '1' :'0';
                            let remakeForm = Object.assign({},this.form,{orderSerial:this.orderSerial},{userId:userInfo.id,userName:userInfo.name})
                            RemarkDriverInfo(remakeForm).then(res => {
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

<style type="text/css" lang="scss">
    .remakeOrder{
        .el-form{
            padding: 0 20px;
            .uploadcard{
                .box_container .el-upload .el-upload-dragger {
                    width: 85px;
                    height: 30px;
                    border:0 none;
                    .el-button {
                        margin-top: 0;
                    }
                }
            }
        }
    }
</style>

