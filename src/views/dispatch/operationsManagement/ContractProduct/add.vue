<template>
    <div class="ContractProductAdd commoncss">
        <el-dialog :title='formtitle' :close-on-click-modal="false" @open='open' v-el-drag-dialog top="5vh" :visible="dialogFormVisible" @close="close">
            <el-form :model="standForm" :rules="newrules" label-position="right"  ref="ruleForm"  :label-width="formLabelWidth">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="产品名称：" prop="productName">
                            <el-input v-model="standForm.productName" :disabled="isView"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="产品类型：" prop="typeCode">
                            <el-input v-model="standForm.typeName"  disabled v-if="isView"></el-input>
                            <el-select v-model="standForm.typeCode" v-else>
                                <el-option 
                                v-for="item in optionsProduct"
                                :key="item.id"
                                :label="item.name"
                                :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="20">
                    <el-col :span="12" v-if="standForm.typeCode == 'AF07601' || standForm.typeCode == 'AF07603'">
                        <el-form-item  label="起止日期：" prop="timeArr">
                            <el-date-picker
                                v-model="standForm.timeArr"
                                type="daterange"
                                start-placeholder="开始日期"
                                value-format="timestamp"
                                unlink-panels
                                :disabled="isView"
                                end-placeholder="结束日期"
                                :default-time="['00:00:00', '23:59:59']">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" v-if="standForm.typeCode == 'AF07602' || standForm.typeCode == 'AF07603'">
                        <el-form-item  label="服务信息：" prop="serviceInfo">
                            <el-input v-model="standForm.serviceInfo" :disabled="isView" v-numberOnly><template slot="append">条</template></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="承包价格：" prop="conrtactPrice">
                            <el-input v-model="standForm.conrtactPrice" v-numberOnly clearable :disabled="isView"><template slot="append">元</template></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row>
                    <el-col :span="24">
                        <el-form-item  label="承包线路：" prop="agencyRate" class="is-required">
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
                                            <!-- <getCityList class="chooseItem" :currentObj="isModify ? {'province':item.startProvinceCode,'city':item.startCityCode,'area':item.startAreaCode} : {}" :ifChange="true" @returnStr="(value) => {getStrStart(value,keys,'start')}" :isArea="true" v-model="item.areaCode" :ref="'startArea'+ keys" v-else></getCityList> -->
                                             <getCityList class="chooseItem" :ifChange="true" @returnStr="(value) => {getStrStart(value,keys,'start')}" :isArea="true" v-model="item.areaCode" :ref="'startArea'+keys" v-else></getCityList>
                                            <!-- {{'startArea'+keys}} -->
                                        </td>
                                        <td>
                                            <el-input :value="item.endProvince + (item.endCity? '-'+ item.endCity : '') + (item.endArea ? '-'+ item.endArea : '')" disabled v-if="isView"></el-input>
                                            <!-- <getCityList class="chooseItem" :currentObj="isModify ?{'province':item.endProvinceCode,'city':item.endCityCode,'area':item.endAreaCode} : {}" :ifChange="true" @returnStr="(value) => {getStrStart(value,keys,'end')}" :isArea="true" v-model="item.areaCode" :ref="'endArea'+ keys" v-else></getCityList> -->
                                            <getCityList class="chooseItem" :ifChange="true" @returnStr="(value) => {getStrStart(value,keys,'end')}" :isArea="true" v-model="item.areaCode" :ref="'endArea'+keys" v-else></getCityList>
                                            <!-- {{'endArea'+keys}} -->
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
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" v-if="!isView" plain  icon="el-icon-success" @click="submitForm('ruleForm')" :disabled="btnShow">{{isModify ? '保 存' : '确 定'}}</el-button>
                <el-button type="primary" plain icon="el-icon-error" @click="close">取 消</el-button>
            </div> 
        </el-dialog>
    </div>
</template>
<script>

import { newContractProductList,contractProductDetails,updataContractProductList } from '@/api/dispatch/operationsManagement'
import { objectMerge2 } from '@/utils/'
import { DicNotifyWay,DicContractProduct } from '@/api/common'
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
            default:'新增承包产品'
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
      return {
        btnShow:false,
        formLabelWidth:'100px',
        btnSize:'medium',
        tablekeys:'',
        optionsNotifyWay:[],//通知方式
        optionsProduct:[],//消息类型
        standForm:{
            productName:'',//产品名称
            typeCode:'',//产品类型code
            typeName:'',//产品类型名称
            timeArr:[],//通知方式(只供前端操作)
            startTime:'',//开始日期
            endTime:'',//结束日期
            serviceInfo:'',//服务信息
            conrtactPrice:'',//承包价格
            notifyWayArr:[],//通知方式(只供前端操作)
            notifyWay:'',//通知方式
            notifyWayCode:'',//通知方式code
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
            productName:{required: true, message: '请输入产品名称', trigger: 'change'},
            typeCode:{required: true, message: '请选择产品类型', trigger: 'change'},
            timeArr:{type: 'array', required: true, message: '请选择起止日期', trigger: 'change'},
            serviceInfo:{required: true, message: '请输入服务信息', trigger: 'change'},
            conrtactPrice:{required: true, message: '请输入承包价格', trigger: 'change'},
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
            Promise.all([DicNotifyWay(),DicContractProduct()]).then(resArr => {
                // console.log('Promise.all',resArr)
                this.optionsNotifyWay = resArr[0].data;
                this.optionsProduct = resArr[1].data;
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
                contractProductDetails(this.changeForm.id).then(res =>{
                    this.standForm = res.data;
                    this.$nextTick(()=>{
                        this.$set(this.standForm, 'timeArr',[this.standForm.startTime,this.standForm.endTime])
                        this.$set(this.standForm, 'notifyWayArr',this.standForm.notifyWayCode ? this.standForm.notifyWayCode.split(',') : [])
                        // setTimeout(()=>{
                        //     console.log('this.$refs',this.$refs.startArea1)
                        // },500)
                        if(this.isModify && this.standForm.areaList.length != 0){
                            this.standForm.areaList.forEach((el,idx)=>{
                                // console.log('idxidxidx',idx)
                                // console.log('this.$refs',this.$refs)
                                let stName = 'startArea'+idx;
                                let endName = 'endArea'+idx;
                                // console.log('this.$refs.startArea[idx]','startArea'+idx,this.$refs['startArea'+idx][0])
                                //  setTimeout(()=>{
                                    console.log('this.$refs',this.$refs.startArea1)
                                    this.$refs[stName][0].doActions([el.startProvinceCode*1,el.startCityCode*1,el.startAreaCode*1]);
                                    this.$refs[endName][0].doActions([el.endProvinceCode*1,el.endCityCode*1,el.endAreaCode*1]);
                                // },500)
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
                            message = '请填写完成承包线路!'
                        }
                    })
                    if(defaultStatus){
                        this.btnShow = true;
                        this.completeName();
                        let forms = objectMerge2(this.standForm);
                        // console.log(forms)
                        let standarFunction = this.isModify? updataContractProductList(forms) : newContractProductList(forms);
                        standarFunction.then(res =>{
                            this.$message({
                                type: 'success',
                                message:this.isModify ? '修改承包产品成功' : '新增承包产品成功!'
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
                }else if(i == 'notifyWayArr' || i == 'timeArr'){
                    this.standForm[i] = [];
                }else{
                    this.standForm[i] = ''
                }
            } 
        },
        completeName(){
            this.standForm.typeName = this.optionsProduct.find(item => item.code ==  this.standForm.typeCode)['name'];
            this.standForm.startTime = this.standForm.timeArr[0] ? this.standForm.timeArr[0] : '';
            this.standForm.endTime = this.standForm.timeArr[1] ? this.standForm.timeArr[1] : '';
            if(this.standForm.notifyWayArr.length > 0){
                this.standForm.notifyWay = this.doName(this.optionsNotifyWay,this.standForm.notifyWayArr).join(',');
                this.standForm.notifyWayCode = this.standForm.notifyWayArr.join(',');
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
