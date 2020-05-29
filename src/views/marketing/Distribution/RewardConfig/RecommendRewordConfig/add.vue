<template>
<!-- 新增会员等级 -->
    <div class="RecommendRewordConfigADD commoncss rewordStyle">
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
                        <el-form-item label="成功推荐用户类型：" prop="userTypeCode">
                            <el-select v-model="standForm.userTypeCode" clearable placeholder="请选择" v-if="!isModify">
                                <el-option
                                v-for="item in optionsRecommendtype"
                                :key="item.id"
                                :label="item.name"
                                :value="item.code"
                                :disabled="item.disabled">
                                </el-option>
                            </el-select>
                            <el-input v-model="standForm.userTypeName" auto-complete="off" disabled v-else></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="活动奖励总上限：" prop="rewardTotalLimit">
                            <el-input v-model.number="standForm.rewardTotalLimit" auto-complete="off" v-numberOnly maxlength="6"></el-input>
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
                <el-row :gutter="20">
                    <el-col :span="12">
                        <h2>推荐新用户注册奖励</h2>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item  label="奖励方案：" prop="groupName">
                             <table class="systemTitle">
                                <thead>
                                    <th>推荐人次区间</th>
                                    <th>奖励金额</th>
                                    <th class="lastOne">操作</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(item,keys) in standForm.registerAwardList" :key="keys">
                                        <td>
                                            <el-input v-model="item.recomAuthStart" placeholder="包含" maxlength="7" disabled></el-input>
                                            <span>----</span>
                                            <el-input v-model="item.recomAuthEnd" v-numberOnly placeholder="包含，整数"  maxlength="7" @change="ifWrong(standForm.registerAwardList,keys,'recommendAwards')"></el-input>
                                        </td>
                                        <td>
                                            <el-input v-model="item.awardStart" placeholder="包含" maxlength="5" @change="compareValue('awardEnd',keys,standForm.registerAwardList)" @keyup.native="handlerChoose('awardStart',keys,standForm.registerAwardList)"></el-input>
                                            <span>~</span>
                                            <el-input v-model="item.awardEnd" placeholder="包含，整数"  maxlength="5" @change="compareValue('awardEnd',keys,standForm.registerAwardList)" @keyup.native="handlerChoose('awardEnd',keys,standForm.registerAwardList)"></el-input>
                                        </td>
                                        <td class="lastOne">
                                            <div class="iconItem">
                                                <span class="addItem" @click="addItem('recommendAwards',keys,item)" v-if="keys == standForm.registerAwardList.length-1"></span>
                                                <span class="reduceItem" @click="reduceItem('recommendAwards',keys)" v-if="keys == standForm.registerAwardList.length-1 && standForm.registerAwardList.length !=1"></span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="单个用户活动奖励上限：" prop="recommendAwardsawardUserLimit">
                            <el-input v-model.number="standForm.registerAwardList[0].awardUserLimit" auto-complete="off" v-numberOnly maxlength="6"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="单个用户每天奖励次数上限：" prop="recommendAwardsawardDayLimit">
                            <el-input v-model.number="standForm.registerAwardList[0].awardDayLimit" auto-complete="off" v-numberOnly  maxlength="3"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <h2>推荐新用户认证奖励</h2>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item  label="奖励方案：" prop="groupName">
                             <table class="systemTitle">
                                <thead>
                                    <th>认证人次区间</th>
                                    <th>奖励金额</th>
                                    <th class="lastOne">操作</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(item,keys) in standForm.authAwardList" :key="keys">
                                        <td>
                                            <el-input v-model="item.recomAuthStart" placeholder="包含" maxlength="7" disabled></el-input>
                                            <span>----</span>
                                            <el-input v-model="item.recomAuthEnd" v-numberOnly placeholder="包含，整数"  maxlength="7" @change="ifWrong(standForm.authAwardList,keys,'authAwards')"></el-input>
                                        </td>
                                        <td>
                                            <el-input v-model="item.awardStart" placeholder="包含" maxlength="5" @change="compareValue('awardEnd',keys,standForm.authAwardList)" @keyup.native="handlerChoose('awardStart',keys,standForm.authAwardList)"></el-input>
                                            <span>~</span>
                                            <el-input v-model="item.awardEnd" placeholder="包含，整数"  maxlength="5" @change="compareValue('awardEnd',keys,standForm.authAwardList)" @keyup.native="handlerChoose('awardEnd',keys,standForm.authAwardList)"></el-input>
                                        </td>
                                        <td class="lastOne">
                                            <div class="iconItem">
                                                <span class="addItem" @click="addItem('authAwards',keys,item)" v-if="keys == standForm.authAwardList.length-1"></span>
                                                <span class="reduceItem" @click="reduceItem('authAwards',keys)" v-if="keys == standForm.authAwardList.length-1 && standForm.authAwardList.length !=1"></span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="单个用户活动奖励上限：" prop="authAwardsawardUserLimit">
                            <el-input v-model.number="standForm.authAwardList[0].awardUserLimit" auto-complete="off" v-numberOnly maxlength="6"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="单个用户每天奖励次数上限：" prop="authAwardsawardDayLimit">
                            <el-input v-model.number="standForm.authAwardList[0].awardDayLimit" auto-complete="off" v-numberOnly  maxlength="3"></el-input>
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
import { DicRecommendType } from '@/api/common.js' 
import { newRecommendRewordConfig,updateRecommendRewordConfig } from '@/api/marketing/distribution'
import { objectMerge2 } from '@/utils/'
import getCityList from '@/components/GetCityList/index'

export default {
    name: 'RecommendRewordConfigADD',
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
      return {
        btnShow:false,
        formLabelWidth:'150px',
        standForm:{
            rewardCityCode:'',//奖励市编码
            rewardCity:'',//奖励市
            rewardProvince:'',//奖励省
            userTypeName:'',//推荐用户类型
            userTypeCode:'',//推荐用户类型code
            rewardTotalLimit:'',//活动奖励总上限
            rewardStartDate:'',//活动开始时间
            rewardEndDate:'',//活动结束时间
            timeVal:[],
            registerAwardList:[{//注册
                recomAuthStart: '0',//推荐人次区间区间
                recomAuthEnd:'',//推荐认证人次结束区间
                awardStart:'',//奖励始金额
                awardEnd:'',//奖励结束金额
                awardUserLimit:'',//单个用户活动奖励上限
                awardDayLimit:'',//单个用户每天奖励上限
            }],
            authAwardList:[{//认证
                recomAuthStart:'0',//推荐人次区间区间
                recomAuthEnd:'',//推荐认证人次结束区间
                awardStart:'',//奖励始金额
                awardEnd:'',//奖励结束金额
                awardUserLimit:'',//单个用户活动奖励上限
                awardDayLimit:'',//单个用户每天奖励上限
            }],
        },
        optionsRecommendtype:[],//用户类型
        newrules: {
            rewardCityCode:{required: true, message:"请选择奖励区域", trigger: 'change' },
            userTypeCode:{required: true, message:"请选择成功推荐用户类型", trigger: 'change' },
            rewardTotalLimit:{ required: true, validator: checkNumber, trigger: 'change'},
            timeVal:{type: 'array', required: true, message: '请选择奖励日期', trigger: 'change'},
        },
        remarkList:[{
            label:'推荐奖励鼓励所有用户分发；在活动期间内，用户推荐新用户进入平台，新用户注册、认证可根据配置，奖励推荐人；'
        },{
            label:'活动奖励总上限：当前配置的活动，所有用户获取的总奖励金额不能大于该数值；超出该数值时，活动奖励自动熔断，不再发放奖励；'
        },{
            label:'新用户注册、认证奖励推荐人时，每项配置单个用户奖励最多可获取的上限；'
        },{
            label:'新用户注册、认证奖励推荐人时，每项配置单个用户每天可获得奖励次数的上限。'
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
        ifWrong(item,idx,type){
            // console.log(item,idx)
            let mess = type == 'authAwards' ? '认证人次区间' : '推荐人次区间'
            let flag = item[idx].recomAuthEnd <= item[idx].recomAuthStart ? true : false;
            if(item.length == (idx+1)){
                this.addItem(type,idx,item)
            }
            if(flag){
                this.$message({
                    type: 'info',
                    message: mess+'终止值应不小于起始值' 
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
                            message: mess+'终止值应不小于起始值' 
                        })
                        item.splice(idx+1);
                        this.addItem(type,idx)
                    }
                }
            }
        },
        compareValue(type,key,item){
            // console.log(key,item,item[key])
            switch(type){
                case 'awardStart':
                    if(item[key].awardEnd){
                        if(parseInt(item[key].awardEnd) < parseInt(item[key].awardStart)){
                            this.$message({
                                type: 'info',
                                message: '奖励金额区间起始值不小于终止值' 
                            })
                            item[key].awardStart = ''
                        }
                    }
                    break;
                case 'awardEnd':
                    if(item[key].awardStart){
                        if(parseInt(item[key].awardEnd) < parseInt(item[key].awardStart)){
                            this.$message({
                                type: 'info',
                                message: '奖励金额区间起始值不小于终止值' 
                            })
                            item[key].awardEnd = ''
                        }
                    }
                    break;
            }
        },
        handlerChoose(type,key,item){
            var transportAging = type == 'awardStart' ?  item[key].awardStart : item[key].awardEnd ;
            transportAging = transportAging.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
            transportAging = transportAging.replace(/^\./g,""); //验证第一个字符是数字
            transportAging = transportAging.replace(/\.{2,}/g,"."); //只保留第一个, 清除多余的
            transportAging = transportAging.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
            transportAging = transportAging.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入er位小数
            if(type == 'awardStart'){
                item[key].awardStart = transportAging;
            }else{
                item[key].awardEnd = transportAging;
            }
        },
        getStr(d){
            // console.log('data:',d)
            // this.standForm.areaFullName = (!d.province&&!d.city&&!d.area) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}`.trim();
            this.standForm.rewardProvince = d.province ? d.province.name :'';
            this.standForm.rewardCity =  d.city ?d.city.name :'';
            this.standForm.rewardCityCode = d.city ? d.city.code :'';
        },
        getValue(obj){
            return obj ? obj.value:'';
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
            DicRecommendType().then(res => {
                this.optionsRecommendtype = res.data;
            })
        },
        reviseForms(){
            if(this.isModify){
                this.standForm = objectMerge2(this.changeForm);
                if(this.standForm.authAwardList.length == 0){
                    this.standForm.authAwardList.push({
                        recomAuthStart:'0',//推荐人次区间区间
                        recomAuthEnd:'',//推荐认证人次结束区间
                        awardStart:'',//奖励始金额
                        awardEnd:'',//奖励结束金额
                        awardUserLimit:'',//单个用户活动奖励上限
                        awardDayLimit:'',//单个用户每天奖励上限
                    })
                }else if(this.standForm.registerAwardList.length == 0){
                    this.standForm.registerAwardList.push({
                        recomAuthStart: '0',//推荐人次区间区间
                        recomAuthEnd:'',//推荐认证人次结束区间
                        awardStart:'',//奖励始金额
                        awardEnd:'',//奖励结束金额
                        awardUserLimit:'',//单个用户活动奖励上限
                        awardDayLimit:'',//单个用户每天奖励上限
                    })
                }
                this.$set(this.standForm, 'timeVal', [this.changeForm.rewardStartDate,this.changeForm.rewardEndDate])
            }else{
               this.clearForms();
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.completeName();
                    let isWrong = false;
                    let messageTip;
                    let justOne = false;
                    let recommendStatus = false;
                    let authAwardsStatus = false;

                    // console.log(this.standForm)
                    if(this.standForm.registerAwardList.length == 1 ){
                        // console.log('this.standForm.registerAwardList.length == 1')
                        if(!this.standForm.registerAwardList[0].awardStart && !this.standForm.registerAwardList[0].awardEnd && !this.standForm.registerAwardList[0].awardUserLimit && !this.standForm.registerAwardList[0].awardDayLimit){
                            recommendStatus = true;
                            // this.standForm.recommendAwards = [];
                        }else{
                            // console.log('this.standForm.registerAwardList.length == 2')
                            if(!this.standForm.registerAwardList[0].awardStart || !this.standForm.registerAwardList[0].awardEnd){
                                isWrong = true;
                                messageTip = '请填写推荐新用户注册奖励完整奖励金额!'
                            }else if(!this.standForm.registerAwardList[0].awardUserLimit){
                                isWrong = true;
                                messageTip = '请填写推荐新用户注册奖励单个用户活动奖励上限!'
                            }else if(!this.standForm.registerAwardList[0].awardDayLimit){
                                isWrong = true;
                                messageTip = '请填写推荐新用户注册奖励单个用户每天奖励次数上限!'
                            }else{
                                recommendStatus = false;
                            }
                        }
                    }else{
                        // console.log('this.standForm.registerAwardList.length')
                        this.standForm.registerAwardList.forEach(el => {
                            if(!(el.awardStart+'') || !(el.awardEnd + '')){
                                isWrong = true;
                                messageTip = '请填写推荐新用户注册奖励完整奖励金额!'
                            }else if(!(el.recomAuthStart+ '')){
                                isWrong = true;
                                messageTip = '请完善推荐新用户注册奖励推荐人次区间!'
                            }else if(!el.awardUserLimit){
                                isWrong = true;
                                messageTip = '请填写推荐新用户注册奖励单个用户活动奖励上限!'
                            }else if(!el.awardDayLimit){
                                isWrong = true;
                                messageTip = '请填写推荐新用户注册奖励单个用户每天奖励次数上限!'
                            }
                        })
                    }

                    if(this.standForm.authAwardList.length == 1 ){
                        // console.log('this.standForm.authAwardList.length == 1',this.standForm.authAwardList)
                        if(!this.standForm.authAwardList[0].awardStart && !this.standForm.authAwardList[0].awardEnd && !this.standForm.authAwardList[0].awardUserLimit && !this.standForm.authAwardList[0].awardDayLimit){
                            authAwardsStatus = true;
                            // this.standForm.authAwards = [];
                        }else{
                            // console.log('this.standForm.authAwardList.length == 2')
                            if(!this.standForm.authAwardList[0].awardStart || !this.standForm.authAwardList[0].awardEnd){
                                isWrong = true;
                                messageTip = '请填写推荐新用户认证奖励完整奖励金额!'
                            }else if(!this.standForm.authAwardList[0].awardUserLimit){
                                isWrong = true;
                                messageTip = '请填写推荐新用户认证奖励单个用户活动奖励上限!'
                            }else if(!this.standForm.authAwardList[0].awardDayLimit){
                                isWrong = true;
                                messageTip = '请填写推荐新用户认证奖励单个用户每天奖励次数上限!'
                            }else{
                                authAwardsStatus = false;
                            }
                        }
                    }else{
                        this.standForm.authAwardList.forEach(el => {
                            if(!(el.awardStart+'') || !(el.awardEnd + '')){
                                isWrong = true;
                                messageTip = '请填写推荐新用户认证奖励完整奖励金额!'
                            }else if(!(el.recomAuthStart+ '')){
                                isWrong = true;
                                messageTip = '请完善推荐新用户认证奖励推荐人次区间!'
                            }else if(!el.awardUserLimit){
                                isWrong = true;
                                messageTip = '请填写推荐新用户认证奖励单个用户活动奖励上限!'
                            }else if(!el.awardDayLimit){
                                isWrong = true;
                                messageTip = '请填写推荐新用户认证奖励单个用户每天奖励次数上限!'
                            }
                        })
                    }

                    if(authAwardsStatus && recommendStatus){
                        messageTip = '请至少维护一种推荐奖励方案!'
                        justOne = true
                    }

                    if(!isWrong && !justOne){
                        // if(authAwardsStatus){
                        //     this.standForm.authAwardList = []
                        // }

                        // if(recommendStatus){
                        //     this.standForm.registerAwardList = []
                        // }
                        // console.log('isWrong:',isWrong,'justOne:',justOne,'authAwardsStatus:',authAwardsStatus,'recommendStatus:',recommendStatus)
                        this.btnShow = true;
                        let forms = objectMerge2(this.standForm);
                        // console.log(forms)
                        let standarFunction;
                        standarFunction = this.isModify? updateRecommendRewordConfig(forms) : newRecommendRewordConfig(forms);
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
                rewardCityCode:'',//区域code
                rewardCity:'',//市名称
                rewardProvince:'',//区域省名称
                userTypeName:'',//推荐用户类型
                userTypeCode:'',//推荐用户类型code
                rewardTotalLimit:'',//活动奖励总上限
                rewardStartDate:'',//活动开始时间
                rewardEndDate:'',//活动结束时间
                timeVal:[],
                registerAwardList:[{//注册
                    recomAuthStart:'0',//推荐人次区间区间
                    recomAuthEnd:'',//推荐认证人次结束区间
                    awardStart:'',//奖励始金额
                    awardEnd:'',//奖励结束金额
                    awardUserLimit:'',//单个用户活动奖励上限
                    awardDayLimit:'',//单个用户每天奖励上限
                }],
                authAwardList:[{//认证
                    recomAuthStart:'0',//推荐人次区间区间
                    recomAuthEnd:'',//推荐认证人次结束区间
                    awardStart:'',//奖励始金额
                    awardEnd:'',//奖励结束金额
                    awardUserLimit:'',//单个用户活动奖励上限
                    awardDayLimit:'',//单个用户每天奖励上限
                }],
            };
        },
        //添加子节点新增
        addItem(type,idx,item){
            switch(type){
                case 'recommendAwards':
                    this.standForm.registerAwardList.push({
                        recomAuthStart:this.standForm.registerAwardList[idx].recomAuthEnd,//单数开始
                        recomAuthEnd:'',//单数结束
                        awardStart:'',//奖励结束金额
                        awardEnd:'',//奖励结束金额
                        awardUserLimit:'',//单个用户活动奖励上限
                        awardDayLimit:'',//单个用户每天奖励上限
                    }); 
                    break;
                case 'authAwards':
                    this.standForm.authAwardList.push({
                        recomAuthStart:this.standForm.authAwardList[idx].recomAuthEnd,//单数开始
                        recomAuthEnd:'',//单数结束
                        awardStart:'',//奖励结束金额
                        awardEnd:'',//奖励结束金额
                        awardUserLimit:'',//单个用户活动奖励上限
                        awardDayLimit:'',//单个用户每天奖励上限
                    }); 
                    break;
            }
        },
        //删除子节点新增
        reduceItem(type,idx){
            switch(type){
                case 'recommendAwards':
                    this.standForm.registerAwardList.splice(idx,1);
                    break;
                case 'authAwards':
                    this.standForm.authAwardList.splice(idx,1);
                    break;
            }
        },
        completeName(){
            if(!this.isModify){
                // this.standForm.serivceCodeName = this.optionsService.find(item => item.code === this.standForm.serivceCode)['name']
                this.standForm.userTypeName = this.optionsRecommendtype.find(item => item.code === this.standForm.userTypeCode)['name'];
            }
            this.standForm.rewardStartDate =  this.standForm.timeVal[0] ? this.standForm.timeVal[0] : '';
            this.standForm.rewardEndDate =  this.standForm.timeVal[1] ? this.standForm.timeVal[1] :'';
            this.loopTask(this.standForm.registerAwardList);
            this.loopTask(this.standForm.authAwardList);
        },
        loopTask(item){
            let recommendAwardUserLimit = item[0].awardUserLimit;
            let recommendAwardDayLimit = item[0].awardDayLimit;
            item.forEach(el => {
                el.awardUserLimit = recommendAwardUserLimit;
                el.awardDayLimit = recommendAwardDayLimit;
            })
        }
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .RecommendRewordConfigADD{
      
    }
</style>
