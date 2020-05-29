<template>
    <el-dialog
    title="回复信息"
    class="delData replyComponnet"
    top="35vh"
    :modal="false"
    :visible="dialogVisible"
    custom-class="add-review"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    v-loading="loading"
    width="25%"
    :before-close="close">
        <div class="replyPlant">
            <!-- <p>
                <span class="delwarn"></span>
                <span class="delinfo">是否确认取消订单 ?</span>
            </p> -->
            <el-form :model="currentRow" :rules="rules" ref="ruleForm" :label-width="formLabelWidth" label-position="right" size="mini">
                <el-form-item label="提交类型：">
                    <span>{{currentRow.complainTypeName}}</span>
                </el-form-item>
                 <el-form-item label="提交内容：">
                    <span>{{currentRow.complainDes}}</span>
                </el-form-item>
                <el-form-item label="回复内容：" prop="reply">
                    <el-input :autosize="{ minRows: 3, maxRows: 10}" type="textarea" :maxlength="400" v-model="currentRow.reply"></el-input>
                <!-- <div class="last-input-num">还可输入<span>{{ 400 - form.evaluationDes.length}}</span>字</div> -->
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" plain icon="el-icon-success" @click="handleSearch('reply')">确认</el-button>
            <el-button type="primary" plain icon="el-icon-error" @click="handleSearch('cancel')">取消</el-button>
        </div>
    </el-dialog>
</template>

<script type="text/javascript">
import { replyPlantComplain } from '@/api/service/index.js'
import { getUserInfo } from '@/utils/auth.js'

    export default{
        name:'replyPlant',
        components:{

        },
        props:{
            dialogVisible:{
                type:Boolean,
                default:false
            },
            currentRow:{
                type:Object,
                required:true
            }
        },
        watch:{
            dialogVisible(newVal,oldVal){
                // console.log('newVal',newVal)
                if(newVal){
                    this.init();
                }
            }
        },
        data(){
            return{
                userInfo:{},
                cancelReason:'AF00512',//取消原因
                formLabelWidth:'25%',
                loading:false,
                form:{
                    cancelRemark:'',//取消说明
                    cancelCode:'',//取消原因code
                    cancelCause:'',//取消原因
                    cancelType:'AF0051302',
                    orderSerial:'',//订单流水号
                },
                optionsCancel:[],
                rules:{
                    reply: [
                        { message: '请选择取消原因', trigger: 'blur' },
                    ],
                },
            }
        },
        methods: {
            init(){
                this.userInfo = getUserInfo()
            },
            handleSearch(type){
                switch(type){
                    case 'cancel':
                        this.close();
                        break;
                    case 'reply':
                        
                        let replyForm = Object.assign({},this.currentRow,{replyName:this.userInfo.username,replyId:this.userInfo.id})
                        console.log(replyForm)
                        replyPlantComplain(replyForm).then(res => {
                            // console.log('是否回复成功',res)
                            // this.$alert('操作成功', '提示', {
                            //     confirmButtonText: '确定',
                            //     callback: action => {
                                    this.close();
                                      this.$message({
                                    type: 'success',
                                    message: '操作成功~'
                                })
                                // }
                            // });
                        }).catch(err => {
                            this.$message({
                                type: 'info',
                                message: '操作失败，原因：' + err.text ? err.text : err.errorInfo
                            })
                        })
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
    .replyComponnet{
        .replyPlant{
            .el-form{
                padding: 0 20px;
                .el-select {
                    width: 100%;
                }
            }
        }
    }
</style>

