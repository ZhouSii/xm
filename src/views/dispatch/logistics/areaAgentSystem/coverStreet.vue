<template>
    <div class="coverStreet commoncss">
        <el-dialog :title='formtitle' :close-on-click-modal="false" v-el-drag-dialog top="5vh" :visible="dialogFormVisibleCoverStreet" @close="close">
            <el-form   :model="standForm" :rules="newrules" label-position="right"  ref="ruleForm"  :label-width="formLabelWidth">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="区代名称：" prop="agencyName" class="is-required">
                            <el-input v-model="standForm.agencyName" clearable  disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="区代公司：" prop="companyName" class="is-required">
                            <el-input v-model="standForm.companyName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="区代所在地：" prop="agencyArea" class="is-required">
                            <el-input v-model="standForm.agencyArea" clearable disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="区代详细地址：" prop="detailAddress" class="is-required">
                            <el-input v-model="standForm.detailAddress" clearable disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <table class="systemTitle" v-if="isStreet">
                    <thead>
                        <th class="lastOne">序号</th>
                        <th style="width:50%;">街道所在地</th>
                        <th>街道名称</th>
                        <th class="lastOne">操作</th>
                    </thead>
                    <tbody>
                       <tr v-for="(item,keys) in standForm.agencyStreets" :key="keys">
                            <td>{{keys+1}}</td>
                            <td>
                                <el-input :value="item.startProvince + item.startCity + item.startArea" clearable disabled v-if="item.id"></el-input>
                                <getCityList @returnStr="(value)=>{return getStrStart(value,item,keys)}" :isArea="true" v-model="item.startAreaCode" ref="startArea" v-else></getCityList>
                           </td>
                            <td>
                                <el-input :value="item.startStreet" clearable disabled v-if="item.id"></el-input>
                                <el-select v-model="item.startStreetCode" @focus="getStartAreaList(item)" :loading="loadingStreet" clearable placeholder="请选择" @change="streetName(item)" v-else>
                                    <el-option
                                    v-for="item in optionsStreetArr"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                                    </el-option>
                                </el-select>
                           </td>
                            <td class="lastOne">
                                <div class="iconItem">
                                    <span class="addItem" @click="addItem('street')" v-if="keys == standForm.agencyStreets.length-1"></span>
                                    <span class="reduceItem" @click="reduceItem('street',keys)" v-if="standForm.agencyStreets.length !=1"></span>
                                </div>
                           </td>
                       </tr>
                    </tbody>
                </table>
                <table class="systemTitle" v-else>
                    <thead>
                        <th class="lastOne">序号</th>
                        <th style="width:50%;">出发地</th>
                        <th>到达地</th>
                        <th class="lastOne">操作</th>
                    </thead>
                    <tbody>
                       <tr v-for="(item,keys) in standForm.agencyAndLine" :key="keys">
                            <td>{{keys+1}}</td>
                            <td>
                                <el-input :value="item.startProvince + item.startCity + item.startArea" clearable disabled></el-input>
                           </td>
                            <td>
                                <el-input :value="item.endProvince + item.endCity + item.endArea" clearable disabled v-if="item.id"></el-input>
                                <el-cascader
                                v-else
                                v-model="item.templateCode"
                                :options="optionsLineArr"
                                separator = '-'
                                @change="lineName(item)"
                                :props="defaultprops"
                                ></el-cascader>
                           </td>
                            <td class="lastOne">
                                <div class="iconItem">
                                    <span class="addItem" @click="addItem('line')" v-if="keys == standForm.agencyAndLine.length-1"></span>
                                    <span class="reduceItem" @click="reduceItem('line',keys)" v-if="standForm.agencyAndLine.length !=1"></span>
                                </div>
                           </td>
                       </tr>
                    </tbody>
                </table>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" plain  icon="el-icon-success" @click="submitForm('ruleForm')" :disabled="btnShow">保 存</el-button>
                <el-button type="primary" plain icon="el-icon-error" @click="close">取 消</el-button>
            </div> 
        </el-dialog>
    </div>
</template>

<script>

import { AreaAgentStreetOrLine,AreaAgentStreet,getAgencyLine,AreaAgentLine } from '@/api/dispatch/areaAgentSystem.js'
import { objectMerge2 } from '@/utils/'
import { getStreetInfo } from '@/api/common'
import getCityList from '@/components/GetCityList/chinaMap'

export default {
    name: 'coverStreet',
    props: {
        dialogFormVisibleCoverStreet:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            required:false,
            default:'维护区代运作覆盖街道'
        },
        isStreet:{
            type:Boolean,
            default:true,
        },
        lineId:{
            type:String,
        }
    },
    components:{
        getCityList
    },
    data() {
      return {
        btnShow:false,
        formLabelWidth:'120px',
        standForm:{
            agencyName:'',//区代名称
            companyId:'',//区代公司
            companyName:'',//区代公司名称
            comContactName:'',//公司联系人
            comMobile:'',//公司联系人电话
            detailAddress:'',//区代详细地址
            latitude:'',//纬度
            longitude:'',//经度
            agencyArea:'',//区代所在地
            province:'',//区代省份
            city:'',//区代市
            area:'',//区域
            areaCode:'',//区域code
            agencyStreets:[],//覆盖街道
            agencyAndLine:[],//运作路线
        },
        optionsStreetArr:[],
        optionsLineArr:[],
        loadingStreet:false,
        defaultprops:{
            label: 'label',
            value: 'value',
            children: 'children'
        },
        newrules: {
        },
      };
    },
    watch:{
        dialogFormVisibleCoverStreet:{
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
        lineName(item){
            item.lineId = item.templateCode[2];
        },
        streetName(item){
            item.startStreet = this.optionsStreetArr.find(el => el.code == item.startStreetCode )['name'];
        },
        getStrStart(d,item,idx){
            item.startProvince = d.province ? d.province.name : '';//省名称
            item.startProvinceCode = d.province ? d.province.code : '';//省code

            item.startCity = d.city ? d.city.name : '';//市名称
            item.startCityCode = d.city ? d.city.code : '';//市code

            item.startArea = d.area ? d.area.name : ''
            item.startAreaCode = d.area ? d.area.code : ''
        },
        getStartAreaList(item){
            this.optionsStreetArr = [];
            if(item.startAreaCode == ''){
                return  this.$message({
                    type: 'warning',
                    message: '请先选择提货省市区！'
                })
            }else{
                this.loadingStreet = true;
                getStreetInfo(item.startAreaCode).then(res => {
                    setTimeout(() => {
                        this.loadingStreet = false;
                        this.optionsStreetArr = res.data;
                        if(this.optionsStreetArr == [] && item.startAreaCode){
                            item.startStreetCode = '';
                        }
                    }, 200);
                }).catch(err => {
                    item.startStreetCode = '';
                })
            }
        },
        //添加子节点新增
        addItem(type){
            switch(type){
                case 'street':
                    this.standForm.agencyStreets.push({
                        startProvince:'',//开始省份
                        startProvinceCode:'',//开始省份code
                        startCity:'',//开始城市
                        startCityCode:'',//开始城市code
                        startArea:'',//开始区域
                        startAreaCode:'',//开始区域code
                        startStreet:'',//开始街道
                        startStreetCode:'',//开始街道code
                    }); 
                    break;
                case 'line':
                    this.standForm.agencyAndLine.push({
                        startProvince:this.standForm.province,//开始省份
                        startCity:this.standForm.city,//开始城市
                        startArea:this.standForm.area,//开始区域
                        startAreaCode:this.standForm.areaCode,//开始区域code
                        templateCode:[],
                        lineId:''
                    }); 
                    break;
            }
        },
        //删除子节点新增
        reduceItem(type,idx){
            switch(type){
                case 'street':
                    this.standForm.agencyStreets.splice(idx,1);
                    break;
                case 'line':
                    this.standForm.agencyAndLine.splice(idx,1);
                    break;
            }
        },
        reviseForms(){
            // console.log('this.isStreet',this.isStreet)
            let streetOrLine = this.isStreet ? '0' : '1';
            AreaAgentStreetOrLine(this.lineId,streetOrLine).then(res => {
                this.standForm = res.data;
                this.showLine(streetOrLine);
            }).catch(err => {
                this.$message({
                    type: 'info',
                    message: '网络失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                })
            });
        },
        showLine(status){
            if(status == '1'){
                getAgencyLine(this.standForm.areaCode,this.standForm.city).then(res => {
                    this.optionsLineArr = res.data;
                    if(!res.data){
                        this.$message({
                            type: 'info',
                            message: '当前区代所在地没有线路信息，请先添加干线费定价!'
                        })
                    }
                }).catch(err => {
                    this.$message({
                        type: 'info',
                        message: '网络失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                    })
                })
            }
        },
        close(){
            if(this.dialogFormVisibleCoverStreet){
                this.$emit('update:dialogFormVisibleCoverStreet',false);
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
                    let isWrong = false;
                    let messageTip;
                    if(this.isStreet){
                        this.standForm.agencyStreets.forEach(el => {
                            if(el.startAreaCode == '' || el.startStreetCode == ''){
                                isWrong = true;
                                messageTip = '请完善接到所在地或者街道名称!';
                            }
                        })
                    }else{
                        this.standForm.agencyAndLine.forEach(el => {
                            if(el.lineId == ''){
                                isWrong = true;
                                messageTip = '请完善线路到达地!';
                            }
                        })
                    }

                    if(!isWrong){
                        this.btnShow = true;
                        let forms = objectMerge2(this.standForm);
                        // console.log(forms)
                        let mesg;
                        let standarFunction;
                        standarFunction = this.isStreet ? AreaAgentStreet : AreaAgentLine;
                        mesg = this.isStreet ? '维护区代运作覆盖街道成功!' : '维护区代运作路线成功!';
                        standarFunction(forms).then(res =>{
                            this.$message({
                                type: 'success',
                                message: mesg
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
            for (const i in this.standForm) {
                if(i == 'agencyStreets' || i == 'agencyAndLine'){
                    this.standForm[i] = []
                }
                this.standForm[i] = ''
            };
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .coverStreet{
        .el-dialog__wrapper{
            .el-dialog{
                .el-dialog__body{
                    .systemTitle .lastOne .reduceItem , .systemTitle .lastOne .addItem{
                        position: relative;
                        top: 2px;
                    }
                }
            }
        }
    }
</style>
