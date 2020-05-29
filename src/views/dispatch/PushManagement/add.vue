<template>
    <div class="PushManagement commoncss">
        <el-dialog :title='formtitle' :close-on-click-modal="false" v-el-drag-dialog top="5vh" :visible="dialogFormVisible" @close="close">
            <el-form :model="standForm" :rules="newrules" label-position="right"  ref="ruleForm"  :label-width="formLabelWidth">
                <el-row>
                    <el-col :span="24">
                        <el-form-item  label="所属线路：" class="is-required">
                            <table class="systemTitle" :key="tablekeys">
                                <thead>
                                    <th>出发地</th>
                                    <th>到达地</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <el-input :value="standForm.startProvince + (standForm.startCity ? '-'+ standForm.startCity : '') + (standForm.startArea? '-'+ standForm.startArea : '')" disabled v-if="isView"></el-input>
                                            <getCityList class="chooseItem" :currentObj="isModify ?{'province':standForm.startProvinceCode,'city':standForm.startCityCode,'area':standForm.startAreaCode} :{}" :ifChange="true" @returnStr="(value) => {getStrStart(value,'start')}" :isArea="true" v-model="standForm.areaCode" ref="startArea" v-else></getCityList>
                                        </td>
                                        <td>
                                            <el-input :value="standForm.endProvince + (standForm.endCity? '-'+ standForm.endCity : '') + (standForm.endArea ? '-'+ standForm.endArea : '')" disabled v-if="isView"></el-input>
                                            <getCityList class="chooseItem" :currentObj="isModify ?{'province':standForm.endProvinceCode,'city':standForm.endCityCode,'area':standForm.endAreaCode} :{}" :ifChange="true" @returnStr="(value) => {getStrStart(value,'end')}" :isArea="true" v-model="standForm.areaCode" ref="endArea" v-else></getCityList>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="可见物流：" prop="directionPushCode">
                            <!-- <el-input v-model="standForm.mobilePhone" v-numberOnly clearable :disabled="isView"></el-input> -->
                            <el-radio-group v-model="standForm.directionPushCode" :size="btnSize">
                                <el-radio-button v-for="item in optionsLogistics" :label="item.code" :key="item.id">{{item.name}}</el-radio-button>
                            </el-radio-group>
                            <table class="systemTitle" v-if="standForm.directionPushCode == 'AF07702'" style="margin-top:10px;">
                                <thead>
                                    <th :colSpan="3">超时推公海(根据设定的时间，超时后将把此货源信息推至公海)</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <el-form-item label="" prop="noTack" label-width="0px">
                                                <el-input v-model="standForm.noTack" v-numberOnly clearable :disabled="isView">
                                                    <template slot="append">分钟无人抢单</template>
                                                </el-input>
                                            </el-form-item>
                                        </td>
                                        <td>
                                            <el-form-item label="" prop="noContact" label-width="0px">
                                                <el-input v-model="standForm.noContact" v-numberOnly clearable :disabled="isView">
                                                    <template slot="append">分钟无人联系</template>
                                                </el-input>
                                            </el-form-item>
                                        </td>
                                        <td>
                                            <el-form-item label="" prop="noTrade" label-width="0px">
                                                <el-input v-model="standForm.noTrade" v-numberOnly clearable :disabled="isView">
                                                    <template slot="append">分钟无人成交</template>
                                                </el-input>
                                            </el-form-item>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="状态：" prop="flag">
                           <el-radio-group v-model="standForm.flag">
                                <el-radio :label="'1'">开启</el-radio>
                                <el-radio :label="'0'">禁用</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" v-if="!isView" plain  icon="el-icon-success" @click="submitForm('ruleForm')" :disabled="btnShow">{{isModify ? '保 存' : '确 定'}}</el-button>
                <el-button type="primary" plain icon="el-icon-error" @click="close">取 消</el-button>
            </div> 
        </el-dialog>
    </div>
</template>

<script>

import { newPushManagement,pushManagementDetails,updatePushManagement } from '@/api/dispatch/operationsManagement'
import { objectMerge2 } from '@/utils/'
import { DicShowlogistics } from '@/api/common'
import getCityList from '@/components/GetCityList/chinaMap1'

export default {
    name: 'PushManagement',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            required:false,
            default:'新增推送设置'
        },
        isModify:{
            type:Boolean,
            default:false,
        },
        changeForm:{
            type:Object,
        },
        isView:{
            type:Boolean,
            default:false,
        }
    },
    components:{
        getCityList,
    },
    data() {
        var checknoTack = (rule,value,callback) => {
            if(this.standForm.directionPushCode== 'AF07702'){
                if (value == '' && !this.standForm.noContact && !this.standForm.noTrade) {
                    callback(new Error('至少输入一项推送设置!'));
                }else{
                    callback();
                }
            }else{
                callback();
            }
        };

        var checknoTrade = (rule,value,callback) => {
            if(this.standForm.directionPushCode== 'AF07702'){
                if (value == '' && !this.standForm.noContact && !this.standForm.noTack) {
                    callback(new Error('至少输入一项推送设置!'));
                }else{
                    callback();
                }
            }else{
                callback();
            }
        };

        var checknoContact = (rule,value,callback) => {
            if(this.standForm.directionPushCode== 'AF07702'){
                if (value == '' && !this.standForm.noTrade && !this.standForm.noTack) {
                    callback(new Error('至少输入一项推送设置!'));
                }else{
                    callback();
                }
            }else{
                callback();
            }
        };
      return {
        btnShow:false,
        formLabelWidth:'100px',
        btnSize:'medium',
        tablekeys:'',
        optionsLogistics:[],//通知方式
        standForm:{
            endArea:'',//结束区域
            endAreaCode:'',//结束区域code
            endCity:'',//结束城市
            endCityCode:'',//结束城市code
            endProvince:'',//结束省份
            endProvinceCode:'',//结束省份code
            startArea:'',//开始区域
            startAreaCode:'',//开始区域code
            startCity:'',//开始城市
            startCityCode:'',//开始城市code
            startProvince:'',//开始省份
            startProvinceCode:'',//开始省份code
            flag:'1',//数据状态(1:启用,0:禁用)
            noContact:'',//无人联系(分钟)
            noTack:'',//无人抢单(分钟)
            noTrade:'',//无人成交(分钟)
            // carSubscribe:'',//车主订阅
            // carSubscribeCode:'',//车主订阅code
            // shipCollect:'',//货主收藏
            // shipCollectCode:'',//货主收藏code
            directionPush:'',//定向推送
            directionPushCode:'',//定向推送code
        },
        newrules: {
            directionPushCode:{required: true, message: '请选择可见物流类型', trigger: 'change'},
            flag:{required: true, message: '请选择初始状态', trigger: 'change'},
            noTack:{required: true, validator:checknoTack, trigger: 'change'},
            noTrade:{required: true, validator:checknoTrade, trigger: 'change'},
            noContact:{required: true, validator:checknoContact, trigger: 'change'},
        },
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
        },
    },
    mounted(){
        this.init();
    },
    methods: {
        getStrStart(d,label){
            // console.log('getStrStart',d,label)
            switch(label){
                case 'start':
                    this.standForm.startProvinceCode = d.province ? d.province.code : '';//省名称
                    this.standForm.startProvince = d.province ? d.province.name : '';//省名称
                    this.standForm.startCityCode = d.city ? d.city.code : '';//市名称
                    this.standForm.startCity = d.city ? d.city.name : '';//市名称
                    this.standForm.startAreaCode = d.area ? d.area.code : '';//区名称
                    this.standForm.startArea = d.area ? d.area.name : '';//区名称
                    break;
                case 'end':
                    this.standForm.endProvinceCode = d.province ? d.province.code : '';//省名称
                    this.standForm.endProvince = d.province ? d.province.name : '';//省名称
                    this.standForm.endCityCode = d.city ? d.city.code : '';//市名称
                    this.standForm.endCity = d.city ? d.city.name : '';//市名称
                    this.standForm.endAreaCode = d.area ? d.area.code : '';//区名称
                    this.standForm.endArea = d.area ? d.area.name : '';//区名称
                    break;
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
            Promise.all([DicShowlogistics()]).then(resArr => {
                // console.log('Promise.all',resArr)
                this.optionsLogistics = resArr[0].data;
            })
        },
        reviseForms(){
            this.tablekeys = Math.random();
            if(this.isModify || this.isView){
                pushManagementDetails(this.changeForm.id).then(res =>{
                    this.standForm = res.data;
                })
            }else{
                this.clearForms();
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let message;
                    let defaultStatus = true;
                    if(!this.standForm.startProvince || !this.standForm.endProvince){
                        defaultStatus = false;
                        message = '请填写完成线路信息!'
                    }
                    if(defaultStatus){
                        this.btnShow = true;
                        this.completeName();
                        let forms = objectMerge2(this.standForm);
                        // console.log(forms)
                        let standarFunction = this.isModify? updatePushManagement(forms) : newPushManagement(forms);
                        standarFunction.then(res =>{
                            this.$message({
                                type: 'success',
                                message:this.isModify ? '修改推送管理成功' : '新增推送管理成功!'
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
                            message: message
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
            for (const i in this.standForm) {
                if(i == 'flag'){
                    this.standForm[i] = '1';
                }else{
                    this.standForm[i] = ''
                }
            } 
        },
        completeName(){
            this.standForm.directionPush = this.optionsLogistics.find(item => item.code ==  this.standForm.directionPushCode)['name'];
        },
        doName(optionsArr,itemArr){
            let returnName = [];
            optionsArr.forEach(el => {
                itemArr.forEach(item => {
                    if(el.code == item){
                        returnName.push(el.name)
                    }
                })
            })
            return returnName;
        }
    },
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .PushManagement{
        .el-form-item__content .el-radio-group {
            margin-left: 0px;
        }
    }
</style>
