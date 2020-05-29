<template>
    <div class="followUpRegistration commoncss">
        <el-dialog :title='formtitle' :close-on-click-modal="false" v-el-drag-dialog top="5vh"  :visible="dialogFormVisible" @close="close">
            <el-form :model="standForm" :label-width="formLabelWidth">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="手机号：" prop="shipperPhone">
                            <el-input  v-model="standForm.shipperPhone" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="货主姓名：" prop="shipperName">
                            <el-input v-model="standForm.shipperName" auto-complete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="货主所属业务员：" prop="shipperOwnerSalesmanName">
                            <el-input  v-model="standForm.shipperOwnerSalesmanName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="累计申请次数：" prop="applyNum">
                            <el-input :class = "{ifTips: parseInt(standForm.applyNum) > 1}" v-model="standForm.applyNum" auto-complete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="用户注册所在地：" prop="applicantRegisterAreaName">
                            <el-input v-model="standForm.applicantRegisterAreaName" auto-complete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="12">
                        <el-form-item label="注册时详细地址：" prop="applicantRegisterAddress">
                            <el-input v-model="standForm.applicantRegisterAddress" auto-complete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="申请时所在地：" prop="applyAreaName">
                            <el-input  v-model="standForm.applyAreaName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="申请时定位地址：" prop="applyLocateAddress">
                            <el-input v-model="standForm.applyLocateAddress" auto-complete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="申请时间：" prop="applyTime">
                            <el-input  v-model="standForm.applyTime" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="处理状态：" prop="processStatusCodeName">
                            <el-input v-model="standForm.processStatusCodeName" auto-complete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="20">
                    <el-col :span="12">
                        <h2 style="line-height:40px;">跟进记录</h2>
                    </el-col>
                </el-row>
                <table class="systemTitle">
                    <thead>
                        <th>跟进记录人</th>
                        <th>记录时间</th>
                        <th>处理状态</th>
                        <th style="width:40%;">备注</th>
                        <th class="lastOne">附件</th>
                    </thead>
                    <tbody>
                       <tr v-for="(item,keys) in standForm.aflcOrderCodeApplyDetailDtoList" :key="keys">
                            <td>
                                {{item.creater}}
                           </td>
                            <td>
                                {{item.createTime | parseTime}}
                           </td>
                            <td>
                                {{item.processStatusName}}
                           </td>
                            <td>
                                {{item.remark}}
                           </td>
                            <td class="lastOne">
                                <el-button
                                size="medium"
                                type="primary"
                                plain
                                :disabled = "!item.attachment" 
                                v-showPicture :imgurl="item.attachment ? item.attachment : defaultImg"
                                >查看</el-button>
                           </td>
                       </tr>
                    </tbody>
                </table>
            </el-form>
            <el-form :model="applyForm.aflcOrderCodeApplyDetail" :rules="applyNewrules"  ref="ruleForm"  :label-width="formLabelWidth">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="处理状态：" prop="processStatusCode">
                            <el-select v-model="applyForm.aflcOrderCodeApplyDetail.processStatusCode" clearable placeholder="请选择">
                                <el-option
                                v-for="item in optionsHandletype"
                                :key="item.id"
                                :label="item.name"
                                :value="item.code"
                                :disabled="item.disabled">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row> 
                 <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="跟进备注：" prop="remark">
                            <el-input
                               type="textarea"
                               :autosize="{ minRows: 2, maxRows: 4}"
                               clearable
                               maxlength="50"
                               v-model="applyForm.aflcOrderCodeApplyDetail.remark">
                           </el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="附件：" prop="attachment">
                            <Upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="applyForm.aflcOrderCodeApplyDetail.attachment" />
                        </el-form-item>
                    </el-col>
                </el-row> 
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" plain  icon="el-icon-success" @click="submitForm('ruleForm')" :disabled="btnShow">保 存</el-button>
                <el-button type="primary" plain icon="el-icon-error" @click="close">取 消</el-button>
            </div> 
        </el-dialog>
    </div>
</template>

<script>

import { objectMerge2 } from '@/utils/'
import { applyOrderCodeInfo,updateApplyOrderCode } from '@/api/service/applyOrderCode'
import { ClaimStatusType } from '@/api/common.js'
import Upload from '@/components/Upload/singleImage'

export default {
    name: 'followUpRegistration',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            // required:true,
            default:'跟进登记'
        },
        applyId:{
            type:String
        }
    },
    components:{
       Upload
    },
    data() {
      return {
        btnShow:false,
        formLabelWidth:'150px',
        standForm:{},
        applyForm:{
            id:'',
            aflcOrderCodeApplyDetail:{
                processStatusCode:'',//processStatusCode
                remark:'',//remark
                attachment:'',//附件
            }
        },
        defaultImg:'/static/test.jpg',//默认第一张图片的url
        optionsHandletype:[],
        applyNewrules: {
            processStatusCode: [
                { required: true, message:"请选择处理状态", trigger: 'change' },
            ],
            remark:[
                { required: true, message:"请输入跟进备注", trigger: 'change' },
            ],
        },
      };
    },
    watch:{
        dialogFormVisible:{
            handler(newVal,oldVal){
                if(newVal){
                    this.init();
                }
            },
            deep:true
        }
    },
    mounted(){
    },
    methods: {
        close(){
            // console.log('112231231323',this.dialogFormVisible)
            // debugger
            // this.dialogFormVisible = false;
            if(this.dialogFormVisible){
                this.$emit('update:dialogFormVisible',false);
                this.$refs.ruleForm.resetFields();
                this.$emit('renovate');
                this.btnShow = false;
            }
        },
        //初始化选择项数据
        init(){
            // console.log('this.standForm',this.standForm)
            Promise.all([ClaimStatusType(),applyOrderCodeInfo(this.applyId)]).then( resArr => {
                this.optionsHandletype = resArr[0].data;
                this.standForm = resArr[1].data;
            }).catch(err => {
                this.$message({
                    type: 'info',
                    message: '初始化失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                })
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.btnShow = true;
                    this.applyForm.id = this.applyId;
                    let forms = objectMerge2(this.applyForm);
                    // console.log(forms)
                    updateApplyOrderCode(forms).then(res =>{
                        this.$message({
                            type: 'success',
                            message: '登记成功'
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
    },
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .followUpRegistration{
        .el-dialog__wrapper{
            .el-dialog{
                .el-dialog__body{
                    // border-bottom:1px solid #ccc;   
                    margin-bottom: 0; 
                    // margin: 0 25px;
                    .el-form .el-form-item .el-form-item__content .ifTips .el-input__inner{
                        color:red;
                    }
                    .systemTitle {
                        margin-bottom:22px;
                    }
                }
            }
        }
    }
</style>
