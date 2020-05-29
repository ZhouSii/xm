<template>
    <div class="gestureConfig commoncss">
        <el-dialog :title='formtitle' :close-on-click-modal="false" v-el-drag-dialog top="8vh" width="40%" :visible="dialogFormVisible" @close="close">
            <el-form   :model="standForm" :rules="newrules" label-position="right"  ref="ruleForm"  :label-width="formLabelWidth">
                <el-row>
                    <el-col :span="14">
                        <el-form-item  label="年月：" prop="belongMouth">
                            <el-date-picker
                            v-model="standForm.belongMouth"
                            type="month"
                            placeholder="选择月">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row>
                    <el-col :span="14">
                        <el-form-item label="当月图片：" prop="gestureUrl">
                            <!-- <img :src="standForm.gestureUrl" alt="" v-showPicture :imgurl="standForm.gestureUrl" v-if="standForm.isUser == '1'"> -->
                            <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="standForm.gestureUrl"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- <el-row class="rewordRemark">
                    <el-col :span="24">
                        <p>页面备注：</p>
                        <ul>
                            <li v-for="(item,keys) in remarkList" :key="keys"><span>{{item.label}}</span></li>
                        </ul>
                    </el-col>
                </el-row>  -->
            </el-form>
            <div slot="footer" class="dialog-footer" >
                <!-- <el-button type="primary" v-if="standForm.isUser == '0'" plain icon="el-icon-success" @click="submitForm('ruleForm')" :disabled="btnShow">保 存</el-button> -->
                <el-button type="primary" plain icon="el-icon-success" @click="submitForm('ruleForm')" :disabled="btnShow">保 存</el-button>
                <el-button type="primary" plain icon="el-icon-error" @click="close">取 消</el-button>
            </div> 
        </el-dialog>
    </div>
</template>

<script>

import { newGestureConfig,updateGestureConfig,gestureConfigDetails} from '@/api/marketing/carSticker'
import { objectMerge2 } from '@/utils/'
import Upload from '@/components/Upload/singleImage'

export default {
    name: 'gestureConfig',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            required:false,
            default:'每月手势配置'
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
        Upload
    },
    data() {
      return {
        btnShow:false,
        formLabelWidth:'100px',
        standForm:{
            "belongMouth": '',//年月
            "gestureUrl": "",//手势地址
            isUser:'0'
        },
        newrules: {
            belongMouth:{required: true, message:"请选择每月手势配置年月", trigger: 'blur'},
            gestureUrl:{required: true, message:"请上传当月图片", trigger: 'change'},
        },
        // remarkList:[{
        //     label:'当月进行的手势图片，若无人提交月审，可以修改图片；若已有人提交月审资料，则不能修改图片。'
        // }],
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
        this.init();
    },
    methods: {
        reviseForms(){
            if(this.isModify){
                gestureConfigDetails(this.changeForm.id).then(res => {
                    this.$set(this.standForm, 'isUser','0');
                    this.standForm = objectMerge2(res.data);
                })
            }else{
                this.clearForms();
            }
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
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.btnShow = true;
                    let forms = objectMerge2(this.standForm);
                    // console.log(forms)
                    let standarFunction = this.isModify? updateGestureConfig(forms) : newGestureConfig(forms);
                    standarFunction.then(res =>{
                        this.$message({
                            type: 'success',
                            message: '每月手势配置成功！'
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
                if(i == 'isUser'){
                    this.standForm[i] = '0';
                }else{
                    this.standForm[i] = '';
                }
            } 
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .gestureConfig{
        img{
            width: 300px;
            cursor: pointer;
        }
        .rewordRemark{
            padding: 10px;
            margin: 22px 0 0;
            border: 1px dashed #cccc;
            background: #f0f0f0;
            p{
                font-size:16px;
                line-height: 30px;
                color: #606266;
            }
            ul{
                li{
                    line-height: 20px;
                    span+span{
                        margin-left: 5px;
                    }
                }
            }
        }
    }
</style>
