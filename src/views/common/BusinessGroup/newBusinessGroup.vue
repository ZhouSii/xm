<template>
<!-- 新增会员等级 -->
    <div class="newBusinessGroup commoncss">
        <el-dialog :title='formtitle' :close-on-click-modal="false" v-el-drag-dialog  :visible="dialogFormVisible" @close="close">
            <el-form   :model="standForm" :rules="newrules"  ref="ruleForm"  :label-width="formLabelWidth">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="业务组名称：" prop="groupName">
                            <el-input  v-model="standForm.groupName" maxlength="10"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="上级业务组：" prop="parentId">
                            <!-- <el-input v-model="standForm.firstMemberSort" auto-complete="off" maxlength="2" v-numberOnly></el-input> -->
                            <businessGroup  @change = "getVal"  v-model="standForm.parentId" ref ='businessGroup'/>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="业务区域：" prop="areaFullName">
                            <getCityList class="chooseItem" @returnStr="getStr" v-model="standForm.areaFullName" ref="area" v-if="!isModify"></getCityList>
                            <el-input v-model="standForm.areaFullName" auto-complete="off" disabled v-else></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <h2 style="line-height:40px;">业务组成员</h2>
                    </el-col>
                </el-row>
                <table class="systemTitle">
                    <thead>
                        <th style="width:50%;">姓名</th>
                        <th>用户类型</th>
                        <th class="lastOne">操作</th>
                    </thead>
                    <tbody>
                       <tr v-for="(item,keys) in standForm.users" :key="keys">
                            <td>
                                <CustomerSearch @returnCustomer = '(value)=>{getCustomer(value,keys)}' :customerName = "item.name" ref="businessGroupName" apiType = "business"/>
                           </td>
                            <td>
                                 <el-select v-model="item.userType" clearable placeholder="请选择">
                                    <el-option
                                        v-for="item in optionsUsersType"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.code"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                           </td>
                            <td class="lastOne">
                                <div class="iconItem">
                                    <span class="addItem" @click="addItem" v-if="keys == standForm.users.length-1"></span>
                                    <span class="reduceItem" @click="reduceItem(keys)" v-if="standForm.users.length !=1"></span>
                                </div>
                           </td>
                       </tr>
                    </tbody>
                </table>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" plain  icon="el-icon-success" @click="submitForm('ruleForm')" :disabled="btnShow">{{isModify? '保 存' : '确 定'}}</el-button>
                <el-button type="primary" plain icon="el-icon-error" @click="$emit('update:dialogFormVisible',false)">取 消</el-button>
            </div> 
        </el-dialog>
    </div>
</template>

<script>

import { DicUsersType } from '@/api/common.js' 
import { addGroupAndUsers,getCurrentBusinessGroupPerson,updateGroupAndUsers } from '@/api/company/businessGroup'
import { objectMerge2 } from '@/utils/'
import getCityList from '@/components/GetCityList/index'
import CustomerSearch from '@/components/CustomerSearch/select'
import businessGroup from '@/components/selectTree/businessGroup'  

export default {
    name: 'newBusinessGroup',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            required:true,
            default:'新增业务组'
        },
        isModify:{
            type:Boolean,
            default:false,
        },
        currentTreeId:{
            type:String,
            default:''
        }
    },
    components:{
        getCityList,
        CustomerSearch,
        businessGroup
    },
    data() {
      return {
        btnShow:false,
        formLabelWidth:'150px',
        standForm:{
            groupName:'',
            parentId:'',//上级业务组
            areaFullName:'',
            areaCode:'',
            areaName:'',
            cityName:'',
            provinceName:'',
            users:[{
                name:'',
                mobile:'',
                userId:'',
                userType:'',
            }]
        },
        optionsUsersType:'',//用户类型
        newrules: {
            groupName: [
                { required: true, message:"请输入业务组名称", trigger: 'change' },
            ],
            parentId:[
                { required: true, message:"请选择上级业务组", trigger: 'change' },
            ],
            areaFullName:{required: true, message:"请选择业务区域", trigger: 'change' },
        },
      };
    },
    watch:{
        dialogFormVisible:{
            handler(newVal,oldVal){
                if(newVal){
                    this.reviseForms();
                    this.init();
                }
            },
            deep:true
        }
    },
    mounted(){
    },
    methods: {
        getVal(val){
            // console.log(val)
            this.standForm.parentId = val;
        },
        getCustomer(val,keys){
            // console.log('belongSalesman',val,keys)
            this.standForm.users[keys].userId = val.userId;
            this.standForm.users[keys].name = val.name;
            this.standForm.users[keys].mobile = val.mobilephone ? val.mobilephone  :'';
        },
        getStr(d){
            // console.log('data:',d)
            this.standForm.areaFullName = (!d.province&&!d.city&&!d.area) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}`.trim();
            if(d.city){
                this.standForm.areaCode = d.city.code;
            }else{
                this.standForm.areaCode = d.province.code;
            }
            this.standForm.provinceName = d.province ? d.province.name :'';
            this.standForm.cityName =  d.city ?d.city.name :'';
        },
        getValue(obj){
            return obj ? obj.value:'';
        },
        close(){
            // console.log('112231231323',this.dialogFormVisible)
            // debugger
            // this.dialogFormVisible = false;
            this.$emit('update:dialogFormVisible',false);
            this.$refs.ruleForm.resetFields();
            this.clearForms();
            this.$emit('renovate');
            this.btnShow = false;
            if(!this.isModify){
                this.$refs.area.clearData();
            }
        },
        //初始化选择项数据
        init(){
            DicUsersType().then(res => {
                this.optionsUsersType = res.data;
            })
            console.log('this.$refs.businessGroup',this.$refs.businessGroup)
            if(this.$refs.businessGroup){
                this.$refs.businessGroup.init();
            }
        },
        reviseForms(){
            if(this.isModify){
                getCurrentBusinessGroupPerson(this.currentTreeId).then(res => {
                    this.standForm = res.data;
                })
            }else{
               this.clearForms();
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.btnShow = true;
                    let forms = objectMerge2(this.standForm);
                    // console.log(forms)
                    let standarFunction;
                    standarFunction = this.isModify? updateGroupAndUsers(forms) : addGroupAndUsers(forms);
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
                groupName:'',
                parentId:'',//上级业务组
                areaFullName:'',
                areaCode:'',
                areaName:'',
                cityName:'',
                provinceName:'',
                users:[{
                    name:'',
                    mobile:'',
                    userId:'',
                    userType:'',
                }]
            };
        },
        //添加子节点新增
        addItem(){
            this.standForm.users.push({
                name:'',
                mobile:'',
                userId:'',
                userType:'',
            }); 
        },
        //删除子节点新增
        reduceItem(idx){
            this.standForm.users.splice(idx,1);
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .newBusinessGroup{
        .el-dialog__wrapper{
            .el-dialog{
                .el-dialog__body{
                    // border-bottom:1px solid #ccc;   
                    margin-bottom: 0; 
                    // margin: 0 25px;
                    .systemTitle .lastOne .reduceItem , .systemTitle .lastOne .addItem{
                        position: relative;
                        top: 2px;
                    }
                }
            }
        }
    }
</style>
