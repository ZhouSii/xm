<template>
    <el-dialog
    title="取消订单"
    class="delData cancel"
    top="35vh"
    :modal="false"
    :visible="dialogVisible"
    custom-class="add-review"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    v-loading="loading"
    width="25%"
    v-el-drag-dialog
    :before-close="close">
        <div class="ifcancel">
            <p>
                <img class="delwarn" src="../../../../assets/icom/25xinxi.png" alt="">
                <span class="delinfo">是否确认取消订单 ?</span>
            </p>
            <el-form :model="form" :rules="rules" ref="ruleForm" :label-width="formLabelWidth" label-position="right" size="mini">
                <el-form-item label="取消原因：" prop="cancelCode">
                    <el-select v-model="form.cancelCode" placeholder="请选择">
                        <el-option
                        v-for="item in optionsCancel"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="备注：" prop="cancelRemark">
                    <el-input :autosize="{ minRows: 3, maxRows: 10}" type="textarea" :maxlength="400" v-model="form.cancelRemark"></el-input>
                <!-- <div class="last-input-num">还可输入<span>{{ 400 - form.evaluationDes.length}}</span>字</div> -->
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" plain  icon="el-icon-success" @click="handleSearch('sure')">确认</el-button>
            <el-button type="primary" plain icon="el-icon-error" @click="handleSearch('cancel')">取消</el-button>
        </div>
    </el-dialog>
</template>

<script type="text/javascript">
import { getDictionary } from '@/api/common.js'
import { cancelOrder } from '@/api/order/ordermange.js'
    export default{
        components:{

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
            }
        },
        data(){
            return{
                cancelReason:'AF00512',//取消原因
                formLabelWidth:'25%',
                loading:true,
                form:{
                    cancelRemark:'',//取消说明
                    cancelCode:'',//取消原因code
                    cancelCause:'',//取消原因
                    cancelType:'AF0051302',
                    orderSerial:'',//订单流水号
                },
                optionsCancel:[],
                rules:{
                    cancel: [
                        { required: true, message: '请选择取消原因', trigger: 'blur' },
                    ],
                },
            }
        },
        methods: {
            init(){
                this.$store.dispatch("GetInfoDic",this.cancelReason).then(res => {
                    this.optionsCancel = res;
                    this.form.cancelCode = res[0].code;
                    this.loading = false;
                });
                // getDictionary(this.cancelReason).then(res => {
                //     // console.log('cancel',res)
                //     this.optionsCancel = res.data;
                //     this.form.cancelCode = res.data[0].code;
                //     this.loading = false;
                // })
            },
            handleSearch(type){
                switch(type){
                    case 'cancel':
                        this.close();
                        break;
                    case 'sure':
                        this.form.cancelCause = this.optionsCancel.find(item => item.code == this.form.cancelCode)['name'];
                        let cancelForm = Object.assign({},this.form,{orderSerial:this.orderSerial})
                        // console.log(cancelForm)
                        // this.close();
                        cancelOrder(cancelForm).then(res => {
                            // console.log('是否取消成功',res)
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
    .cancel{
        .ifcancel{
            p{
                text-align: center;
                margin-bottom: 20px;
                font-size: 16px;
                font-weight: bold;
                .delwarn{
                    vertical-align: middle;
                    margin-right:20px; 
                }
            }
            .el-form{
                padding: 0 20px;
                .el-select {
                    width: 100%;
                }
            }
        }
    }
</style>

