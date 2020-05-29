<template>
    <div class="addA commoncss">
        <el-dialog :title='formtitle' :close-on-click-modal="false" v-el-drag-dialog top="5vh" :visible="dialogFormVisible" @close="close">
            <el-form   :model="standForm" :rules="newrules" label-position="right"  ref="ruleForm"  :label-width="formLabelWidth">
                <el-row :gutter="20">
                   <el-col :span="12">
                        <el-form-item  label="区代所在地：" prop="agencyAreaCode" v-if="!isModify">
                            <getCityList class="chooseItem" @returnStr="getAreaDelegate" :isArea="true" v-model="standForm.agencyAreaCode" ref="areaDelegate"></getCityList>
                        </el-form-item>
                        <el-form-item  label="区代所在地：" class="is-required" v-else>
                            <el-input v-model="standForm.agencyArea" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="区代：" prop="agencyId"  v-if="!isModify">
                            <el-select v-model="standForm.agencyId" @focus="getAreaAgency" clearable placeholder="请选择">
                                <el-option
                                v-for="item in optionseAreaAgency"
                                :key="item.id"
                                :label="item.agencyName"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item  label="区代：" class="is-required" v-else>
                            <el-input :value="standForm.agencyName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="按营业额分润比例：" prop="turnoverRatio">
                            <NumberOnlyPoint v-model="standForm.turnoverRatio" slotTxt="%" showType = 'percent'/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="按中转差价分润比例：" prop="transferRatio">
                            <NumberOnlyPoint v-model="standForm.transferRatio" slotTxt="%" showType = 'percent'/>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="最低一票分润金额：" prop="singleLowestCost">
                            <!-- <NumberOnlyPoint v-model="standForm.singleLowestCost" slotTxt="元"/> -->
                            <el-input v-model.number="standForm.singleLowestCost">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row class="rewordRemark">
                    <el-col :span="24">
                        <p>页面字段说明：</p>
                        <ul>
                            <li v-for="(item,keys) in remarkList" :key="keys"><span>{{keys+1+'.'}}</span><span>{{item.label}}</span></li>
                        </ul>
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
import NumberOnlyPoint from '@/components//NumberOnlyPoint/index'
import { getAreaAgent } from '@/api/dispatch/areaAgentSystem.js'
import getCityList from '@/components/GetCityList/chinaMap'
import { newAgencyConfig,agencyConfigDetails,updataAgencyConfig } from '@/api/dispatch/plantformProfit'

export default {
    name: 'addA',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            required:false,
            default:'新增按区代配置平台分润规则'
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
        NumberOnlyPoint,
        getCityList
    },
    data() {
      return {
        btnShow:false,
        formLabelWidth:'160px',
        standForm:{
            agencyArea:'',//区代所在地
            agencyAreaCode:'',
            agencyId:'',//区代ID
            agencyName:'',//区代名称
            companyName:'',//区代公司
            singleLowestCost:'',//单票最低费用
            transferRatio:'',//按照中转差价分润(百分比)
            turnoverRatio:'',//按照营业额分润(百分比)
        },
        optionseAreaAgency:[],
        newrules: {
            agencyAreaCode:{required: true, message: '请选择区代所在地', trigger: 'change'},
            agencyId:{required: true, message: '请选择区代', trigger: 'change'},
            turnoverRatio:{required: true, message: '请输入按营业额分润比例', trigger: 'change'},
            transferRatio:{required: true, message: '请输入按中转差价分润比例', trigger: 'change'},
            singleLowestCost:[
                {required: true, message: '请输入最低一票分润金额', trigger: 'change'},
                { type: 'number', message: '必须为数字值'}
            ],
        },
        remarkList:[{
            label:'按营业额分润比例：当区代接货主订单后，自行运作订单，平台从区代营业额中分润；“营业额”是指货主实际支付给区代的运费总金额；'
        },{
            label:'按中转差价分润比例：当区代接货主订单后，中转外发给平台专线承运商运作订单，平台从【区代收取货主的营业额-区代支付给专线的中转费】价格差中分润；'
        }],
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
    },
    methods: {
        getAreaDelegate(d){
            this.standForm.agencyArea = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
            this.standForm.agencyAreaCode = d.area ? d.area.code : '';
            this.standForm.agencyId = '';
        },
        getValue(obj){
            return obj ? obj.value:'';
        },
        getAreaAgency(){
            this.optionseAreaAgency = [];
            if(this.standForm.agencyAreaCode == ''){
                return  this.$message({
                    type: 'warning',
                    message: '请先选择区代所在地！'
                })
            }else{
                getAreaAgent(this.standForm.agencyAreaCode).then(res => {
                    setTimeout(() => {
                        this.optionseAreaAgency = res.data;
                        if(this.optionseAreaAgency == [] && this.standForm.areaCode){
                            this.standForm.agencyId = '';
                            this.standForm.agencyName = '';
                        }
                    }, 200);
                }).catch(err => {
                    this.standForm.agencyId = '';
                    this.standForm.agencyName = '';
                })
            }
        },
        reviseForms(){
            if(this.isModify){
                agencyConfigDetails(this.changeForm.id).then(res => {
                    this.standForm = objectMerge2(res.data);
                })
                // this.$set(this.standForm, 'timeVal', [this.changeForm.rewardStartDate,this.changeForm.rewardEndDate])
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
                if(!this.isModify){
                    this.$refs.areaDelegate.clearData();
                }
            }
        },
        //初始化选择项数据
        init(){
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.btnShow = true;
                    this.completeName();
                    let forms = objectMerge2(this.standForm);
                    let standarFunction = this.isModify? updataAgencyConfig(forms) : newAgencyConfig(forms);
                    standarFunction.then(res =>{
                        this.$message({
                            type: 'success',
                            message: this.formtitle+'成功！'
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
                this.standForm[i] = ''
            } 
        },
        completeName(){
            if(!this.isModify){
                this.standForm.agencyName = this.optionseAreaAgency.find(item => item.id ==  this.standForm.agencyId)['agencyName'];
                this.standForm.companyName = this.optionseAreaAgency.find(item => item.id ==  this.standForm.agencyId)['companyName'];
            }
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .addA{
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
