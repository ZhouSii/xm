<template>
    <div class="ContractProductAdd commoncss">
        <el-dialog :title='formtitle' :close-on-click-modal="false" @open='open' v-el-drag-dialog top="5vh" :visible="dialogFormVisible" @close="close">
            <el-form :model="standForm" :rules="newrules" label-position="right"  ref="ruleForm"  :label-width="formLabelWidth">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="运营人员：" prop="name">
                            <CustomerSearch @returnCustomer = 'getCustomer' :customerName = "standForm.name" v-if="!isView"/>
                            <el-input v-model="standForm.name" :disabled="isView" v-else></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系号码：" prop="mobilePhone">
                            <el-input v-model="standForm.mobilePhone" v-numberOnly clearable :disabled="isView"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row>
                    <el-col :span="24">
                        <el-form-item  label="运营线路：" prop="agencyRate" class="is-required">
                            <table class="systemTitle" :key="tablekeys">
                                <thead>
                                    <th>出发地</th>
                                    <th>到达地</th>
                                    <th class="lastOne" v-if="!isView">操作</th>
                                </thead>
                                <tbody> 
                                    <tr v-for="(item,keys) in standForm.areaList" :key="keys">
                                        <td>
                                            <el-input :value="item.startProvince + (item.startCity ? '-'+ item.startCity : '') + (item.startArea? '-'+ item.startArea : '')" disabled v-if="isView"></el-input>
                                            <!-- <getCityList class="chooseItem" :currentObj="isModify ?{'province':item.startProvinceCode,'city':item.startCityCode,'area':item.startAreaCode} : {}" :ifChange="true" @returnStr="(value) => {getStrStart(value,keys,'start')}" :isArea="true" v-model="item.areaCode" ref="startArea" v-else></getCityList> -->
                                            <getCityList class="chooseItem" :ifChange="true" @returnStr="(value) => {getStrStart(value,keys,'start')}" :isArea="true" v-model="item.areaCode" :ref="'startArea'+keys" v-else></getCityList>
                                        </td>
                                        <td>
                                            <el-input :value="item.endProvince + (item.endCity? '-'+ item.endCity : '') + (item.endArea ? '-'+ item.endArea : '')" disabled v-if="isView"></el-input>
                                            <!-- <getCityList class="chooseItem" :currentObj="isModify ?{'province':item.endProvinceCode,'city':item.endCityCode,'area':item.endAreaCode}:{}" :ifChange="true" @returnStr="(value) => {getStrStart(value,keys,'end')}" :isArea="true" v-model="item.areaCode" ref="endArea" v-else></getCityList> -->
                                            <getCityList class="chooseItem" :ifChange="true" @returnStr="(value) => {getStrStart(value,keys,'end')}" :isArea="true" v-model="item.areaCode" :ref="'endArea'+keys" v-else></getCityList>
                                        </td>
                                        <td class="lastOne" v-if="!isView">
                                            <div class="iconItem">
                                                <span class="addItem" @click="addItem(keys)" v-if="keys == standForm.areaList.length-1"></span>
                                                <span class="reduceItem" @click="reduceItem(keys)" v-if="standForm.areaList.length !=1"></span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="通知方式：" prop="notifyWayArr">
                            <el-checkbox-group v-model="standForm.notifyWayArr" :size="btnSize">
                                <el-checkbox-button v-for="obj in optionsNotifyWay" :label="obj.code" :key="obj.id">{{obj.name}}</el-checkbox-button>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="消息类型：" prop="messageTypeArr">
                            <el-checkbox-group v-model="standForm.messageTypeArr" :size="btnSize">
                                <el-checkbox-button v-for="obj in optionsMessageType" :label="obj.code" :key="obj.id">{{obj.name}}</el-checkbox-button>
                            </el-checkbox-group>
                            <table class="systemTitle" v-if="standForm.messageTypeArr.indexOf('AF07505') != -1">
                                <thead>
                                    <th :colSpan="3">超时通知</th>
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
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" v-if="!isView" plain  icon="el-icon-success" @click="submitForm('ruleForm')" :disabled="btnShow">{{isModify ? '保 存' : '确 定'}}</el-button>
                <el-button type="primary" plain icon="el-icon-error" @click="close">取 消</el-button>
            </div> 
        </el-dialog>
    </div>
</template>

<script>

import { newOperator,operatorDetails,updateOperator } from '@/api/dispatch/operationsManagement'
import { objectMerge2 } from '@/utils/'
import { DicNotifyWay,DicMessageType } from '@/api/common'
import CustomerSearch from '@/components/CustomerSearch/select'
import getCityList from '@/components/GetCityList/chinaMap1'

export default {
    name: 'ContractProductAdd',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            required:false,
            default:'新增运营人员'
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
        CustomerSearch,
    },
    data() {
        var checknoTack = (rule,value,callback) => {
            if(this.standForm.messageTypeArr.indexOf('AF07505') != -1){
                if (value == '') {
                    callback(new Error('请输入分钟无人抢单值!'));
                }else{
                    callback();
                }
            }else{
                callback();
            }
        };

        var checknoTrade = (rule,value,callback) => {
            if(this.standForm.messageTypeArr.indexOf('AF07505') != -1){
                if (value == '') {
                    callback(new Error('请输入分钟无人成交值!'));
                }else{
                    callback();
                }
            }else{
                callback();
            }
        };

        var checknoContact = (rule,value,callback) => {
            if(this.standForm.messageTypeArr.indexOf('AF07505') != -1){
                if (value == '') {
                    callback(new Error('请输入分钟无人联系值!'));
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
        optionsNotifyWay:[],//通知方式
        optionsMessageType:[],//消息类型
        showLocationStart:'',
        standForm:{
            userId:'',//运营人员ID
            name:'',//运营人姓名
            mobilePhone:'',//运营员电话
            messageTypeArr:[],//通知方式(只供前端操作)
            messageType:'',//消息类型
            messageTypeCode:'',//消息类型code
            notifyWayArr:[],//通知方式(只供前端操作)
            notifyWay:'',//通知方式
            notifyWayCode:'',//通知方式code
            noContact:'',//无人联系(分钟)
            noTack:'',//无人抢单(分钟)
            noTrade:'',//无人成交(分钟)
            areaList:[{
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
            }]
        },
        newrules: {
            name:{required: true, message: '请选择运营人员', trigger: 'change'},
            mobilePhone:{required: true, message: '请输入运营人员联系号码', trigger: 'change'},
            noTack:{required: true, validator:checknoTack, trigger: 'change'},
            noTrade:{required: true, validator:checknoTrade, trigger: 'change'},
            noContact:{required: true, validator:checknoContact, trigger: 'change'},
        },
      };
    },
    watch:{
        // dialogFormVisible:{
        //     handler(newVal,oldVal){
        //         if(newVal){
        //             this.reviseForms();
        //         }
        //     },
        //     deep:true
        // },
    },
    mounted(){
        this.init()
    },
    methods: {
        getStrStart(d,idx,label){
            // console.log('getStrStart',d,idx,label)
            switch(label){
                case 'start':
                    this.standForm.areaList[idx].startProvinceCode = d.province ? d.province.code : '';//省名称
                    this.standForm.areaList[idx].startProvince = d.province ? d.province.name : '';//省名称
                    this.standForm.areaList[idx].startCityCode = d.city ? d.city.code : '';//市名称
                    this.standForm.areaList[idx].startCity = d.city ? d.city.name : '';//市名称
                    this.standForm.areaList[idx].startAreaCode = d.area ? d.area.code : '';//区名称
                    this.standForm.areaList[idx].startArea = d.area ? d.area.name : '';//区名称
                    break;
                case 'end':
                    this.standForm.areaList[idx].endProvinceCode = d.province ? d.province.code : '';//省名称
                    this.standForm.areaList[idx].endProvince = d.province ? d.province.name : '';//省名称
                    this.standForm.areaList[idx].endCityCode = d.city ? d.city.code : '';//市名称
                    this.standForm.areaList[idx].endCity = d.city ? d.city.name : '';//市名称
                    this.standForm.areaList[idx].endAreaCode = d.area ? d.area.code : '';//区名称
                    this.standForm.areaList[idx].endArea = d.area ? d.area.name : '';//区名称
                    break;
            }
        },
        getCustomer(val){
            // console.log('belongSalesman',val)
            this.standForm.userId = val.userId;
            this.standForm.name = val.name;
            this.standForm.mobilePhone = val.mobilephone;
        },
        //添加子节点新增
        addItem(idx){
            if(this.standForm.areaList[idx].startProvince && this.standForm.areaList[idx].endProvince){
                this.standForm.areaList.push({
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
                }); 
            }else{
               this.$message.error('请填写当前完成内容!');
            }
        },
        //删除子节点新增
        reduceItem(idx){
            this.standForm.areaList.splice(idx,1);
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
            Promise.all([DicNotifyWay(),DicMessageType()]).then(resArr => {
                // console.log('Promise.all',resArr)
                this.optionsNotifyWay = resArr[0].data;
                this.optionsMessageType = resArr[1].data;
            })
        },
        open(){
            this.$nextTick(()=>{
                this.reviseForms();
            })
        },
        reviseForms(){
            this.tablekeys = Math.random();
            if(this.isModify || this.isView){
                operatorDetails(this.changeForm.id).then(res =>{
                    this.standForm = res.data;
                    this.$nextTick(()=>{
                        this.$set(this.standForm, 'notifyWayArr',this.standForm.notifyWayCode ? this.standForm.notifyWayCode.split(',') : []);
                        this.$set(this.standForm, 'messageTypeArr', this.standForm.messageTypeCode ? this.standForm.messageTypeCode.split(',') : []);
                        if(this.isModify && this.standForm.areaList.length != 0){
                            this.standForm.areaList.forEach((el,idx)=>{
                                let stName = 'startArea'+idx;
                                let endName = 'endArea'+idx;
                                this.$refs[stName][0].doActions([el.startProvinceCode*1,el.startCityCode*1,el.startAreaCode*1]);
                                this.$refs[endName][0].doActions([el.endProvinceCode*1,el.endCityCode*1,el.endAreaCode*1]);
                            })
                        }
                    })
                })
            }else{
                this.clearForms();
                // this.$refs.startArea.clearData();
                // this.$refs.endArea.clearData();
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let message;
                    let defaultStatus = true;
                    this.standForm.areaList.forEach(el => {
                        if(!el.startProvince || !el.endProvince){
                            defaultStatus = false;
                            message = '请填写完成运营线路!'
                        }
                    })
                    if(defaultStatus){
                        this.btnShow = true;
                        this.completeName();
                        let forms = objectMerge2(this.standForm);
                        // console.log(forms)
                        let standarFunction = this.isModify? updateOperator(forms) : newOperator(forms);
                        standarFunction.then(res =>{
                            this.$message({
                                type: 'success',
                                message:this.isModify ? '修改运营人员成功' : '新增运营人员成功!'
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
                if(i == 'areaList'){
                    this.standForm[i] = [{
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
                    }]
                }else if(i == 'notifyWayArr' || i == 'messageTypeArr'){
                    this.standForm[i] = [];
                }else{
                    this.standForm[i] = ''
                }
            } 
        },
        completeName(){
            // this.standForm.province = this.optionsProvince.find(item => item.code ==  this.standForm.provinceCode)['name'];
            if(this.standForm.notifyWayArr.length > 0){
                this.standForm.notifyWay = this.doName(this.optionsNotifyWay,this.standForm.notifyWayArr).join(',');
                this.standForm.notifyWayCode = this.standForm.notifyWayArr.join(',');
            }

            if(this.standForm.messageTypeArr.length > 0){
                this.standForm.messageType = this.doName(this.optionsMessageType,this.standForm.messageTypeArr).join(',');
                this.standForm.messageTypeCode = this.standForm.messageTypeArr.join(',');
            }
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
    .ContractProductAdd{
    }
</style>
