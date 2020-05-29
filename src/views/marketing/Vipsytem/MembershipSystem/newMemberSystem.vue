<template>
<!-- 新增会员等级 -->
    <div class="newMememberSystem commoncss">
        <el-dialog :title='formtitle' :close-on-click-modal="false" v-el-drag-dialog  :visible="dialogFormVisible" @close="close">
            <el-form   :model="standForm" :rules="newrules"  ref="ruleForm"  :label-width="formLabelWidth" label-position="left">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="一级会员等级：" prop="firstMemberGrade">
                            <el-input  v-model="standForm.firstMemberGrade" maxlength="10" :disabled="isModify"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="前端显示排序序号：" prop="firstMemberSort">
                            <el-input v-model="standForm.firstMemberSort" auto-complete="off" maxlength="2" v-numberOnly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item  label="前端显示提示语：" prop="markedWords">
                            <el-input  v-model="standForm.markedWords" maxlength="50"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="前端显示图标：" prop="firstMemberIcon">
                            <Upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="standForm.firstMemberIcon" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <table class="systemTitle">
                    <thead>
                        <th>前端显示图标</th>
                        <th>二级会员等级</th>
                        <th>中单等级</th>
                        <th>奖励等级</th>
                        <th>抽佣等级</th>
                        <th>提现等级</th>
                        <th class="lastOne">操作</th>
                    </thead>
                    <tbody>
                       <tr v-for="(item,keys) in otherForm" :key="keys">
                           <td>
                                <Upload class="licensePicture" tip="" v-model="item.secondMemberIcon" />
                           </td>
                            <td>
                                <el-input v-model="item.secondMemberGrade" auto-complete="off" maxlength="10" :disabled="keys <= (isModifyLength-1)"></el-input>
                           </td>
                            <td>
                                <el-select v-model="item.winOrderGrade" clearable placeholder="请选择">
                                    <el-option
                                        v-for="item in optionsObtainGrade"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.code"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                           </td>
                            <td>
                                <el-select v-model="item.rewardGrade" clearable placeholder="请选择">
                                    <el-option
                                        v-for="item in optionsRewardGrade"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.code"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                           </td>
                            <td>
                                 <el-select v-model="item.commissionGrade" clearable placeholder="请选择">
                                    <el-option
                                        v-for="item in optionsBrokerageGrade"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.code"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                           </td>
                            <td>
                                 <el-select v-model="item.extractCashGrade" clearable placeholder="请选择">
                                    <el-option
                                        v-for="item in optionsTakeCashGrade"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.code"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                           </td>
                            <td class="lastOne">
                                <div class="iconItem">
                                    <span class="addItem" @click="addItem" v-if="keys == otherForm.length-1 && keys != 4"></span>
                                    <span class="reduceItem" @click="reduceItem(keys)" v-if="keys == otherForm.length-1 && otherForm.length !=1 && keys > isModifyLength-1"></span>
                                </div>
                           </td>
                       </tr>
                    </tbody>
                </table>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" plain  icon="el-icon-success" @click="submitForm('ruleForm')" :disabled="btnShow">{{isModify? '保 存' : '确 定'}}</el-button>
                <el-button type="primary" plain icon="el-icon-error" @click="close">取 消</el-button>
            </div> 
        </el-dialog>
    </div>
</template>

<script>

import { DicObtainGrade,DicRewardGrade,DicBrokerageGrade,DicTakeCashGrade } from '@/api/common.js'
import { addSystemMemberConfig,updateSystemMemberConfig } from '@/api/marketing/MembershipSys.js'
import { objectMerge2, parseTime } from '@/utils/'
import Upload from '@/components/Upload/singleImage'

export default {
    name: 'newMememberSystem',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            required:true
        },
        isModify:{
            type:Boolean,
            default:false,
        },
        changeforms:{
            type:Object,
        }
    },
    components:{
        Upload
    },
    data() {
      return {
        btnShow:false,
        formLabelWidth:'150px',
        isModifyLength:0,
        standForm:{
            firstMemberGrade:'',
            firstMemberSort:'',
            markedWords:'',
            firstMemberIcon:''
        },
        otherForm:[
            {
                secondMemberIcon:'',//二级会员图标
                secondMemberGrade:'',//二级会员等级
                winOrderGrade:'',//中单等级
                rewardGrade:'',//奖励等级
                commissionGrade:'',//抽佣等级
                extractCashGrade:'',//提现等级
            },
        ],
        optionsObtainGrade:'',//中单等级选项
        optionsRewardGrade:'',//奖励等级选项
        optionsBrokerageGrade:'',//抽佣等级选项
        optionsTakeCashGrade:'',//提现等级选项
        information:'',
        newrules: {
            firstMemberGrade: [
                { required: true, message:"请输入一级会员等级", trigger: 'change' },
            ],
            firstMemberSort:[
                { required: true, message:"请输入前端显示排序序号", trigger: 'change' },
            ],
            markedWords:{required: true, message:"请输入前端显示提示语", trigger: 'change' },
            firstMemberIcon:{required: true, message:"请上传前端显示图标", trigger: 'change' },
        },
      };
    },
    watch:{
        dialogFormVisible:{
            handler(newVal,oldVal){
                if(newVal){
                    this.init();
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
        close(){
            this.$emit('update:dialogFormVisible',false);
            this.$refs.ruleForm.resetFields();
            this.clearForms();
            this.$emit('renovate');
            this.btnShow = false;
        },
        //初始化选择项数据
        init(){
            Promise.all([DicObtainGrade(),DicRewardGrade(),DicBrokerageGrade(),DicTakeCashGrade()]).then(resArr => {
                this.optionsObtainGrade = resArr[0].data;
                this.optionsRewardGrade = resArr[1].data;
                this.optionsBrokerageGrade = resArr[2].data;
                this.optionsTakeCashGrade = resArr[3].data;
            })
        },
        reviseForms(){
            if(this.isModify){
                console.log('this.changeforms',this.changeforms)
                this.standForm.firstMemberGrade = this.changeforms.firstMemberGrade ;
                this.standForm.firstMemberSort= this.changeforms.firstMemberSort;
                this.standForm.markedWords= this.changeforms.configs[0].markedWords;
                this.standForm.firstMemberIcon= this.changeforms.configs[0].firstMemberIcon;
                this.otherForm = this.changeforms.configs;
                this.isModifyLength = this.changeforms.configs.length;
            }else{
               this.clearForms();
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let isOk = false;
                    this.otherForm.forEach(el => {
                        if(!el.secondMemberIcon || !el.secondMemberGrade || !el.winOrderGrade || !el.rewardGrade || !el.commissionGrade || !el.extractCashGrade){
                            isOk = true;
                        }
                    })
                    if(!isOk){
                        this.btnShow = true;
                        this.complantForm();
                        let forms = objectMerge2(this.otherForm);
                        let standarFunction;
                        standarFunction = this.isModify? updateSystemMemberConfig(forms) : addSystemMemberConfig(forms);
                        standarFunction.then(res =>{
                            this.$message({
                                type: 'success',
                                message: this.isModify ? '修改成功！' : '新增成功！'
                            })
                            this.close();
                        }).catch(err => {
                            this.$message({
                                type: 'info',
                                message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                            })
                            this.btnShow = false;
                        })
                    }else{
                        this.$message({
                            type: 'warning',
                            message: '选择等级存在必填项未选择！'
                        })
                    }
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
            this.standForm = {
                firstMemberGrade:'',
                firstMemberSort:'',
                markedWords:'',
                firstMemberIcon:''
            };
            this.otherForm = [
                {
                    secondMemberIcon:'',//二级会员图标
                    secondMemberGrade:'',//二级会员等级
                    winOrderGrade:'',//中单等级
                    rewardGrade:'',//奖励等级
                    commissionGrade:'',//抽佣等级
                    extractCashGrade:'',//提现等级
                },
            ];
        },
        //添加子节点新增
        addItem(){
            this.otherForm.push({
                secondMemberIcon:'',//二级会员图标
                secondMemberGrade:'',//二级会员等级
                winOrderGrade:'',//中单等级
                rewardGrade:'',//奖励等级
                commissionGrade:'',//抽佣等级
                extractCashGrade:'',//提现等级
            }); 
        },
        //删除子节点新增
        reduceItem(idx){
            this.otherForm.splice(idx,1);
        },
        //完善数据
        complantForm(){
           this.otherForm.forEach(el => {
               el.firstMemberGrade =  this.standForm.firstMemberGrade;
               el.firstMemberSort = this.standForm.firstMemberSort;
               el.markedWords = this.standForm.markedWords;
               el.firstMemberIcon = this.standForm.firstMemberIcon;
           })
        },
    },
   
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .newMememberSystem{
        .el-dialog__wrapper{
            .el-dialog{
                width: 1200px;
                .el-dialog__body{
                    // border-bottom:1px solid #ccc;   
                    margin-bottom: 0; 
                    // margin: 0 25px;
                    .systemTitle{
                        text-align: center; 
                        border-collapse: collapse;
                        th,tr td { 
                            border:1px solid #ccc; 
                        }
                        th{
                            line-height: 30px;
                        }
                        tr td{
                            padding: 5px 10px;
                        }
                        .lastOne{
                            width: 100px;
                            .addItem,.reduceItem{
                                position: relative;
                                top: 3px;
                            }
                        }
                        .licensePicture{
                            height: 80px;
                            .el-upload-dragger .el-button{
                                margin-top: 10px;
                            }
                            .el-upload-dragger{
                                padding: 0 10px;
                            }
                            .image-preview .image-preview-action{
                                line-height: 95px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
