<template>
<!-- 新增会员等级 -->
    <div class="BusinessRewordConfigADD commoncss rewordStyle">
        <el-dialog :title='formtitle' :close-on-click-modal="false" v-el-drag-dialog top="5vh" :visible="dialogFormVisible" @close="close">
            <el-form   :model="standForm" :rules="newrules" label-position="top"  ref="ruleForm"  :label-width="formLabelWidth">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="奖励区域：" prop="rewardCityCode">
                            <getCityList class="chooseItem" @returnStr="getStr" v-model="standForm.rewardCityCode" ref="area" v-if="!isModify"></getCityList>
                            <el-input :value = "standForm.rewardProvince + standForm.rewardCity" auto-complete="off" disabled v-else></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="服务分类：" prop="serviceClassifyCode">
                            <el-select v-model="standForm.serviceClassifyCode" clearable placeholder="请选择" v-if="!isModify">
                                <el-option
                                v-for="item in optionsServicetype"
                                :key="item.id"
                                :label="item.name"
                                :value="item.code"
                                :disabled="item.disabled">
                                </el-option>
                            </el-select>
                            <el-input v-model="standForm.serviceClassify" auto-complete="off" disabled v-else></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="奖励类型：" prop="rewardTypeCode">
                            <el-select v-model="standForm.rewardTypeCode" clearable placeholder="请选择" v-if="!isModify">
                                <el-option
                                v-for="item in optionsRewordType"
                                :key="item.id"
                                :label="item.name"
                                :value="item.code"
                                :disabled="item.disabled">
                                </el-option>
                            </el-select>
                            <el-input v-model="standForm.rewardType" auto-complete="off" disabled v-else></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="12">
                        <el-form-item label="活动奖励总上限：" prop="rewardTotalLimit">
                            <el-input v-model.number="standForm.rewardTotalLimit" v-numberOnly maxlength="6"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                 <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="单个用户奖励上限：" prop="perUserRewardLimit">
                            <el-input v-model.number="standForm.perUserRewardLimit" auto-complete="off" v-numberOnly maxlength="6"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="单个用户每天奖励单数上限：" prop="perUserDayRewardTimeLimit">
                            <el-input v-model.number="standForm.perUserDayRewardTimeLimit" auto-complete="off" v-numberOnly maxlength="3"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                 <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="同一用户完成订单奖励推荐人单数上限：" prop="perUserOrderRewardTimeLimit">
                            <el-input v-model.number="standForm.perUserOrderRewardTimeLimit" auto-complete="off" v-numberOnly maxlength="3"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="奖励日期：" prop="timeVal">
                            <el-date-picker
                                v-model="standForm.timeVal"
                                type="daterange"
                                start-placeholder="开始日期"
                                value-format="timestamp"
                                unlink-panels
                                end-placeholder="结束日期"
                                :default-time="['00:00:00', '23:59:59']">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item  label="奖励方案：">
                             <table class="systemTitle">
                                <thead>
                                    <th>单数区间</th>
                                    <th>奖励金额</th>
                                    <th class="lastOne">操作</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(item,keys) in standForm.aflcRecommendAwardList" :key="keys">
                                     <td>
                                        <el-input v-model.number="item.recomAuthStart" v-numberOnly placeholder="包含" maxlength="7" disabled></el-input>
                                        <span>----</span>
                                        <el-input v-model.number="item.recomAuthEnd" v-numberOnly placeholder="包含，整数"  maxlength="7" @change="ifWrong(standForm.aflcRecommendAwardList,keys,item)"></el-input>
                                    </td>
                                    <td>
                                        <el-input v-model="item.awardStart" placeholder="包含" maxlength="5" @change="compareValue('awardEnd',keys)" @keyup.native="handlerChoose('awardStart',keys)"></el-input>
                                        <span>~</span>
                                        <el-input v-model="item.awardEnd" placeholder="包含，整数"  maxlength="5" @change="compareValue('awardEnd',keys)" @keyup.native="handlerChoose('awardEnd',keys)"></el-input>
                                    </td>
                                    <td class="lastOne">
                                        <div class="iconItem">
                                            <span class="addItem" @click="addItem(keys)" v-if="keys == standForm.aflcRecommendAwardList.length-1"></span>
                                            <span class="reduceItem" @click="reduceItem(keys)" v-if="keys == standForm.aflcRecommendAwardList.length-1 && standForm.aflcRecommendAwardList.length !=1"></span>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row class="rewordRemark">
                    <el-col :span="24">
                        <p>页面备注：</p>
                        <ul>
                            <li v-for="(item,keys) in remarkList" :key="keys"><span>{{keys+1+'.'}}</span><span>{{item.label}}</span></li>
                        </ul>
                    </el-col>
                </el-row> 
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" plain  icon="el-icon-success" @click="submitForm('ruleForm')" :disabled="btnShow">{{isModify? '保 存' : '确 定'}}</el-button>
                <el-button type="primary" plain icon="el-icon-error" @click="close">取 消</el-button>
            </div> 
        </el-dialog>
    </div>
</template>

<script>

import '../rewordStyle.scss'
import { newBusinessRewordConfig,updateBusinessRewordConfig } from '@/api/marketing/distribution'
import { objectMerge2 } from '@/utils/'
import getCityList from '@/components/GetCityList/index'
import { DicServiceType,DicRewordType } from '@/api/common.js'

export default {
    name: 'BusinessRewordConfigADD',
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
        changeForm:{
            type:Object,
        }
    },
    components:{
        getCityList,
    },
    data() {
          var checkNumber = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('活动奖励总上限不能为空'));
            }
            else if (!Number.isInteger(value)) {
                callback(new Error('请输入数字值'));
            } else {
                callback();
            }
        };
        var checkNumberA = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('单个用户奖励上限不能为空'));
            }
            else if (!Number.isInteger(value)) {
                callback(new Error('请输入数字值'));
            } else {
                callback();
            }
        };
        var checkNumberC = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('单个用户每天奖励单数上限不能为空'));
            }
            else if (!Number.isInteger(value)) {
                callback(new Error('请输入数字值'));
            } else {
                callback();
            }
        };
        var checkNumberD = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('同一用户完成订单奖励推荐人单数上限不能为空'));
            }
            else if (!Number.isInteger(value)) {
                callback(new Error('请输入数字值'));
            } else {
                callback();
            }
        };
      return {
        btnShow:false,
        formLabelWidth:'150px',
        standForm:{
            rewardType:'',//奖励类型
            rewardTypeCode:'',//奖励类型编码
            rewardCityCode:'',//奖励市编码
            rewardCity:'',//奖励市
            rewardProvince:'',//奖励省
            serviceClassify:'',//服务分类
            serviceClassifyCode:'',//服务分类编码
            rewardTotalLimit:'',//活动奖励总上限
            perUserRewardLimit:'',//单个用户奖励上限
            perUserDayRewardTimeLimit:'',//单个用户每天奖励单数上限
            perUserOrderRewardTimeLimit:'',//同一用户完成订单奖励推荐人单数上限
            timeVal:[],
            rewardStartDate:'',//奖励开始日期
            rewardEndDate:'',//奖励结束日期
            aflcRecommendAwardList:[{
                recomAuthStart:'0',//单数开始
                recomAuthEnd:'',//单数结束
                awardStart:'',//奖励结束金额
                awardEnd:'',//奖励结束金额
            }]
        },
        optionsServicetype:[],
        optionsRewordType:[],
        newrules: {
            rewardCityCode:{required: true, message:"请选择奖励区域", trigger: 'change' },
            serviceClassifyCode:{required: true, message:"请选择服务分类", trigger: 'change' },
            rewardTypeCode:{required: true, message:"请选择奖励类型", trigger: 'change' },
            rewardTotalLimit:{ required: true, validator: checkNumber, trigger: 'change'},
            timeVal:{type: 'array', required: true, message: '请选择奖励日期', trigger: 'change'},
            perUserRewardLimit:{ required: true, validator: checkNumberA, trigger: 'change'},
            perUserDayRewardTimeLimit:{ required: true, validator: checkNumberC, trigger: 'change'},
            perUserOrderRewardTimeLimit:{ required: true, validator: checkNumberD, trigger: 'change'},
        },
        remarkList:[{
            label:'业务奖励鼓励所有用户分发，用户介绍新用户进入平台后，新用户交易的订单在活动期内，货主或车主绑定的用户将获得奖励；'
        },{
            label:'活动奖励总上限：当前配置的活动，所有用户获取的总奖励金额不能大于该数值；超出该数值时，活动奖励自动熔断，不再发放奖励；'
        },{
            label:'单个用户奖励上限：当前配置的活动中，每个用户最多可获得的奖励上限；活动期内单个用户获得的奖励不能超出该数值；'
        },{
            label:'单个用户每天奖励单数上限：当前配置的活动中，每个用户每天可获得奖励次数的上限；当天单个用户获得奖励次数不能大于该数值；'
        },{
            label:'同一用户完成订单奖励业务绑定用户单数上限：当前配置的活动中，同一用户完成订单奖励其业务绑定用户的次数，不能大于该数值；超出该数值后，用户完成订单交易，其业务绑定的用户不能得到奖励，防止刷单。'
        }]
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
       ifWrong(item,idx){
            // console.log(item,idx)
            let flag = item[idx].recomAuthEnd <= item[idx].recomAuthStart ? true : false;
            if(item.length == (idx+1)){
                this.addItem(idx)
            }
            if(flag){
                this.$message({
                    type: 'info',
                    message: '单数区间终止值应不小于起始值' 
                })
                if(item.length > (idx+1)){
                    item.splice(idx+1);
                }
                return item[idx].recomAuthEnd = ''
            }
            else if(item.length > (idx+1)){
                item[idx+1].recomAuthStart = item[idx].recomAuthEnd ;
                if(item[idx+1].recomAuthEnd){
                    if(item[idx+1].recomAuthEnd <= item[idx+1].recomAuthStart){
                        this.$message({
                            type: 'info',
                            message: '单数区间终止值应不小于起始值' 
                        })
                        item.splice(idx+1);
                        this.addItem(idx)
                    }
                }
            }
        },
        compareValue(type,key){
            switch(type){
                case 'awardStart':
                    if(this.standForm.aflcRecommendAwardList[key].awardEnd){
                        if(parseInt(this.standForm.aflcRecommendAwardList[key].awardEnd) < parseInt(this.standForm.aflcRecommendAwardList[key].awardStart)){
                            this.$message({
                                type: 'info',
                                message: '奖励金额区间起始值不小于终止值' 
                            })
                            this.standForm.aflcRecommendAwardList[key].awardStart = ''
                        }
                    }
                    break;
                case 'awardEnd':
                    if(this.standForm.aflcRecommendAwardList[key].awardStart){
                        if(parseInt(this.standForm.aflcRecommendAwardList[key].awardEnd) < parseInt(this.standForm.aflcRecommendAwardList[key].awardStart)){
                            this.$message({
                                type: 'info',
                                message: '奖励金额区间起始值不小于终止值' 
                            })
                            this.standForm.aflcRecommendAwardList[key].awardEnd = ''
                        }
                    }
                    break;
            }
        },
        handlerChoose(type,key){
            var transportAging = type == 'awardStart' ?  this.standForm.aflcRecommendAwardList[key].awardStart : this.standForm.aflcRecommendAwardList[key].awardEnd ;
            transportAging = transportAging.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
            transportAging = transportAging.replace(/^\./g,""); //验证第一个字符是数字
            transportAging = transportAging.replace(/\.{2,}/g,"."); //只保留第一个, 清除多余的
            transportAging = transportAging.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
            transportAging = transportAging.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入er位小数
            if(type == 'awardStart'){
                this.standForm.aflcRecommendAwardList[key].awardStart = transportAging;
            }else{
                this.standForm.aflcRecommendAwardList[key].awardEnd = transportAging;
            }
        },
        getStr(d){
            this.standForm.rewardProvince = d.province ? d.province.name :'';
            this.standForm.rewardCity =  d.city ?d.city.name :'';
            this.standForm.rewardCityCode = d.city ? d.city.code :'';
        },
        close(){
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
            this.$store.dispatch('GetInfoDic','AF017').then(res => {
                this.optionsServicetype = res;
            })
            this.$store.dispatch('GetInfoDic','AF064').then(res => {
                this.optionsRewordType = res;
            })  
            // Promise.all([DicServiceType(),DicRewordType()]).then( resArr => {
            //     this.optionsServicetype = resArr[0].data;
            //     this.optionsRewordType = resArr[1].data;
            // }).catch(err => {
            //     this.$message({
            //         type: 'info',
            //         message: '初始化失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
            //     })
            // })
        },
        reviseForms(){
            if(this.isModify){
                // console.log(this.changeForm)
                this.standForm = objectMerge2(this.changeForm);
                this.$set(this.standForm, 'timeVal', [this.changeForm.rewardStartDate,this.changeForm.rewardEndDate])
            }else{
               this.clearForms();
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let isWrong = false;
                    let messageTip;
                    this.standForm.aflcRecommendAwardList.forEach(el => {
                        if(!el.awardStart || !el.awardEnd){
                            isWrong = true;
                            messageTip = '请填写业务奖励完整奖励金额数据!'
                        }else if(!(el.recomAuthStart + '')){
                            isWrong = true;
                            messageTip = '请完善业务奖励单数区间!'
                        }
                    })
                    if(!isWrong){
                        this.completeName();
                        this.btnShow = true;
                        let forms = objectMerge2(this.standForm);
                        // console.log(forms)
                        let standarFunction;
                        standarFunction = this.isModify? updateBusinessRewordConfig(forms) : newBusinessRewordConfig(forms);
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
                            type: 'info',
                            message: messageTip
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
                rewardType:'',//奖励类型
                rewardTypeCode:'',//奖励类型编码
                rewardCityCode:'',//奖励市编码
                rewardCity:'',//奖励市
                rewardProvince:'',//奖励省
                serviceClassify:'',//服务分类
                serviceClassifyCode:'',//服务分类编码
                rewardTotalLimit:'',//活动奖励总上限
                perUserRewardLimit:'',//单个用户奖励上限
                perUserDayRewardTimeLimit:'',//单个用户每天奖励单数上限
                perUserOrderRewardTimeLimit:'',//同一用户完成订单奖励推荐人单数上限
                timeVal:[],
                rewardStartDate:'',//奖励开始日期
                rewardEndDate:'',//奖励结束日期
                aflcRecommendAwardList:[{
                    recomAuthStart:'0',//单数开始
                    recomAuthEnd:'',//单数结束
                    awardStart:'',//奖励结束金额
                    awardEnd:'',//奖励结束金额
                }]
            };
        },
        //添加子节点新增
        addItem(idx){
            this.standForm.aflcRecommendAwardList.push({
                recomAuthStart:this.standForm.aflcRecommendAwardList[idx].recomAuthEnd,//单数开始
                recomAuthEnd:'',//单数结束
                awardStart:'',//奖励结束金额
                awardEnd:'',//奖励结束金额
            }); 
        },
        //删除子节点新增
        reduceItem(idx){
            this.standForm.aflcRecommendAwardList.splice(idx,1);
        },
        completeName(){
            if(!this.isModify){
                // this.standForm.serivceCodeName = this.optionsService.find(item => item.code === this.standForm.serivceCode)['name']
                this.standForm.serviceClassify = this.optionsServicetype.find(item => item.code === this.standForm.serviceClassifyCode)['name'];
                this.standForm.rewardType = this.optionsRewordType.find(item => item.code === this.standForm.rewardTypeCode)['name'];
            }
            this.standForm.rewardStartDate =  this.standForm.timeVal[0] ? this.standForm.timeVal[0] : '';
            this.standForm.rewardEndDate =  this.standForm.timeVal[1] ? this.standForm.timeVal[1] :'';
        }
    },
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .BusinessRewordConfigADD{
    
    }
</style>
