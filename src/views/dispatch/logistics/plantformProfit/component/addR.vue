<template>
    <div class="addR commoncss">
        <el-dialog :title='formtitle' :close-on-click-modal="false" v-el-drag-dialog top="5vh" :visible="dialogFormVisible" @close="close">
            <el-form   :model="standForm" :rules="newrules" label-position="right"  ref="ruleForm"  :label-width="formLabelWidth">
                <el-row :gutter="20" v-if="!isModify">
                   <el-col :span="12">
                        <el-form-item  label="省市：" prop="city" >
                            <getCityList class="chooseItem" @returnStr="getAreaDelegate" :isArea="false" v-model="standForm.city" ref="areaDelegate"></getCityList>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="区/县" prop="areatCodes">
                            <el-select v-model="standForm.areatCodes" :loading="loadingCIty"  multiple collapse-tags @focus="getAreaList" clearable placeholder="请选择">
                                <el-option
                                v-for="item in optionsArea"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="20" v-else>
                    <el-col :span="12">
                        <el-form-item  label="按营业额分润比例：" class="is-required">
                            <el-input :value="standForm.province+standForm.city+standForm.area" disabled></el-input>
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
import getCityList from '@/components/GetCityList/chinaMap'
import { newRegionConfig,regionConfigDetails,updataRegionConfig } from '@/api/dispatch/plantformProfit'
import { getCityInfo  } from '@/api/common'

export default {
    name: 'addR',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            required:false,
            default:'新增按区域配置平台分润规则'
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
            areas:[],//
            areatCodes:[],//
            city:'',//
            cityCode:'',
            province:'',
            singleLowestCost:'',//单票最低费用
            transferRatio:'',//按照中转差价分润(百分比)
            turnoverRatio:'',//按照营业额分润(百分比)
        },
        cityCode:'',
        optionsArea:[],
        loadingCIty:false,
        newrules: {
            city:{required: true, message: '请选择省市', trigger: 'change'},
            areatCodes:{type: 'array', required: true, message: '请选择区/县', trigger: 'change'},
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
            // this.standForm.agencyArea = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
            this.standForm.cityCode = d.city ? d.city.code : '';
            this.standForm.city = d.city ? d.city.name : '';
            this.standForm.province = d.province ? d.province.name : '';
            if(this.cityCode != this.standForm.cityCode){
                this.standForm.areatCodes = [];
                this.cityCode = this.standForm.cityCode;
            }
        },
        getValue(obj){
            return obj ? obj.value:'';
        },
        getAreaList(){
            if(this.standForm.areatCodes.length == 0){
                if(this.standForm.cityCode == ''){
                    return  this.$message({
                        type: 'warning',
                        message: '请先选择省市！'
                    })
                }else{
                    this.loadingCIty = true;
                    getCityInfo(this.standForm.cityCode).then(res => {
                        setTimeout(() => {
                            this.loadingCIty = false;
                            this.optionsArea = res.data;
                            if(this.optionsArea == [] && this.standForm.cityCode){
                                this.standForm.totalStratAreaCode = [];
                            }
                        }, 200);
                    }).catch(err => {
                        this.standForm.totalStratAreaCode = [];
                    })
                }
            }
        },
        reviseForms(){
            if(this.isModify){
                regionConfigDetails(this.changeForm.id).then(res => {
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
                    let standarFunction = this.isModify? updataRegionConfig(forms) : newRegionConfig(forms);
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
                    // this.standForm = { brand_right : 0};
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
                if(i == 'areas' || i == 'areatCodes'){
                    this.standForm[i] = []
                }
                this.standForm[i] = ''
            } 
        },
        completeName(){
            if(!this.isModify){
                let areaName = [];
                this.standForm.areatCodes.forEach(el => {
                    this.optionsArea.forEach(item => {
                        if(el == item.code ){
                            areaName.push(item.name);
                        }
                    })
                })
                this.standForm.areas = areaName;
            }
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .addR{
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
