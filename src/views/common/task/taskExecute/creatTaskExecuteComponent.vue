<template>
    <div>
        <!-- 新增分类信息 -->
            <div class="creatTaskExecute commoncss">
                <el-dialog v-el-drag-dialog :title='formtitle' :close-on-click-modal="false"  :visible="dialogFormVisible" @close="close">
                    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="AppName" prop="appName">
                            <el-input v-model="form.appName" placeholder="请输入“AppName”" auto-complete="off" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="名称" prop="title">
                            <el-input v-model="form.title" placeholder="请输入“名称”" auto-complete="on" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="排序" prop="order">
                            <el-input v-model="form.order" placeholder="请输入“排序”" auto-complete="off" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="注册方式">
                            <el-radio-group v-model="form.addressType">
                                <el-radio v-for="item in radioFrom"  :label="item.value" :key="item.value">{{item.label}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                         <el-form-item label="机器地址">
                            <el-input v-model="form.addressList" placeholder="请输入执行器地址列表，多地址逗号分隔" auto-complete="off" :disabled="form.addressType == '0'" clearable></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="newInfoSave('ruleForm')">保 存</el-button>
                    <el-button @click="closeAddNewInfo('ruleForm')">取 消</el-button>
                    </div> 
                </el-dialog>
            </div>
    </div>
</template>

<script>

import { data_newTaskExecute,data_changeTaskExecute } from '@/api/task/taskExecute.js'
import { REGEX } from '@/utils/validate.js'

export default {
    name: 'taskComponent',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            required:true
        },
        taskForm:{
            type:Object,
            required:true
        },
        editType:{
            type:String,
        }
    },
    components:{
        
    },
    computed: {
     
    },
    watch:{
        editType:{
            handler(newVal, oldVal) {
                if(newVal == 'edit'){
                    this.form = Object.assign({},this.taskForm)
                }else{
                    this.form = Object.assign({},this.taskForm)
                }
            },
        },
    },
    data() {
        var validateAppName = (rule, value, callback) => {
            if (!value ) {
                callback(new Error('请输入“AppName”'));
            } else {
                if (!/^[a-z][a-z0-9\-]{3,63}$/.test(value.trim())) {
                    callback(new Error('限制以小写字母开头，由小写字母、数字和中划线组成'));
                }
            callback();
            }
        };
        var validateOrder = (rule, value, callback) => {
            if (!value ) {
                callback(new Error('请输入“排序”'));
            } 
            else if(!REGEX.ONLY_NUMBER.test(value)) {
                callback(new Error('请输入整数'));
            } else {
                if (value > 1000 || value < 1 ) {
                    callback(new Error('取值范围为1~1000'));
                } else {
                    callback();
                }
            }
        };
        return {
            form:{
                addressType:0,
                order:null,
                title:null,
                appName:null,
                addressList:null,
            },
            radioFrom:[
                {value:0,label:'自动注册'},
                {value:1,label:'手动录入'},
            ],
            rules: {
                appName: [
                    { required: true, validator: validateAppName, trigger: 'change'},
                    { min: 4, max: 64, message: 'AppName长度限制为4~64', trigger: 'change' }
                ],
                title: [
                    { required: true, message: '请输入“执行器名称”', trigger: 'change' },
                    { min: 4, max: 12, message: '长度限制为4~12', trigger: 'change' }
                ],
                order: [
                    { required: true, validator: validateOrder, trigger: 'change' },
                ]
            }
      };
    },
    mounted(){
        this.init();
    },
    methods: {
        close(){
            this.$emit('update:dialogFormVisible',false);
        },
        getTaskChoose(){
            let params = 1 ;
            data_taskList(params).then(res => {
                console.log(res)
            }).catch( res => {
                console.log(res )
            })
        },
        //初始化选择项数据
        init(){
             
        },
        newInfoSave(formName){
            console.log(this.form)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.form.addressType != 0  && !this.form.addressList){
                        this.$alert('手动录入注册方式，机器地址不可为空', '系统提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                return
                            }
                        });
                        return false
                    }
                    let exeuteFuntion;
                    if(this.editType == 'add'){
                        exeuteFuntion = data_newTaskExecute(this.form)
                    }else{
                        exeuteFuntion = data_changeTaskExecute(this.form)
                    }
                    exeuteFuntion.then(res => {
                        console.log(res)
                    }).catch( err => {
                        console.log('err',err)
                        if(err.code == 200){
                            this.close();
                            this.$emit('renovate');
                            this.$message({
                                type: 'success',
                                message: '操作成功',
                                duration:2000
                            })
                        }else{
                            this.$message.error('操作失败，失败原因：',err.msg)
                        }
                    })
                } else {
                    this.$message.error('操作失败，失败原因：内容不符 ')
                    return false;
                }
            });
        },
        closeAddNewInfo(done){
            this.close();
            this.$refs['ruleForm'].resetFields()
            if(typeof done === 'function'){
                done()
            }
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
    .creatTaskExecute{
        .el-dialog{
            width: 600px;
            .el-dialog__body{
                border-bottom:1px solid #ccc;   
                margin-bottom: 0; 
                overflow: hidden;
                margin: 0 20px;
                .el-form {
                    .el-form-item{  
                        width: 100%;
                        margin-left: 10px;
                        .el-form-item__label{
                            font-weight: bold;
                            font-size: 14px;
                            color: #333;
                        }
                        .el-form-item__content{
                            width: 75%;
                        }
                        .el-input{
                            width:100%;
                            margin-left:20px;

                        }
                        .el-form-item__error{
                            top: 84%;
                            left: 5%;
                        }
                    }
                }
            }
        }
    }

</style>
