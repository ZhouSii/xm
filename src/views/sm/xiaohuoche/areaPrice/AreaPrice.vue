<template>
    <div class="commoncss areaPrice">
        <el-dialog :title="formtitle" :close-on-click-modal="false" :visible="dialogAreaPrice" @close="close" v-loading="loading">
            <el-form :inline="true" v-if="!isModify" :model="standForm" :rules="newrules"  ref="ruleForm"  label-position="left" size="mini">
                <div class="infoinner">
                    <div class="slot_info clearfix">
                        <div class="newarea area_left">
                            <span class="slot_head">新增区域定价</span>
                            <div class="area_left_server area_server">
                                <h4><span>* </span> 选择标准服务类型</h4>
                                <div class="eltree_search chooseclassfy">
                                    <el-form-item class="chose" label="当前服务分类：" >
                                        <!-- <el-select v-model="standForm.serivceCode" clearable placeholder="请选择" @change="choseStyle">
                                            <el-option
                                                v-for="item in optionsService"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.code"
                                                :disabled="item.code != 'AF01701'">
                                            </el-option>
                                        </el-select> -->
                                        <el-input class="showName" v-model="standForm.serviceName" disabled></el-input>
                                    </el-form-item>
                                    <el-form-item class="chose" label="选择车辆类型：" prop="carType">
                                        <el-select v-model="standForm.carType" clearable placeholder="请选择" @change="choseStyle">
                                            <el-option
                                                v-for="item in optionsCar"
                                                :key="item.id"
                                                :label="item.carTypeName"
                                                :value="item.carType"
                                                :disabled="item.disabled">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item class="chose" label="车长：" prop="standardPriceId">
                                        <el-select v-model="standForm.standardPriceId" clearable placeholder="请选择"   @change="choseVule">
                                            <el-option
                                                v-for="item in optionsCarStyle"
                                                :key="item.id"
                                                :label="item.carStyle"
                                                :value="item.standardPid"
                                                :disabled="item.disabled">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                                <label>
                                    <span class="control">标准起步价：</span>
                                    <el-input
                                        disabled
                                        v-model="standForm.standardPrice"
                                        clearable>
                                    </el-input>
                                    <span>元</span>
                                    <el-input
                                        disabled
                                        v-model="standForm.standardKm"
                                        clearable>
                                    </el-input>
                                    <span>公里</span>
                                </label>
                                <label>
                                    <span class="control">超里程费：</span>         
                                    <el-input
                                        disabled
                                        v-model="standForm.outstripPrice"
                                        clearable>
                                    </el-input>
                                    <span>元 / 公里</span>
                                </label>       
                            </div>
                        </div>
                        <div class="newarea area_right">
                            <span class="slot_head">设置区域价</span>
                            <div class="area_right_server area_server">
                                <h4><span>* </span> 选择省市</h4>
                                <div class="eltree_search">
                                    <el-input
                                    class="el_search"
                                    placeholder=""
                                    suffix-icon="el-icon-search"
                                    v-model="filterText">
                                    </el-input>
                                    <el-tree
                                    show-checkbox
                                    :data="cityTree"
                                    :props="defaultProps"
                                    node-key="code"
                                    ref = 'tree'
                                    :highlight-current = "true"
                                    :filter-node-method="filterNode"
                                    >
                                    </el-tree>
                                </div>
                                <label>
                                    <span style="color:red;">* </span><span class="control">区域起步价：</span>
                                    <el-form-item class="itemArea" prop="areaPrice">
                                        <el-input
                                            v-numberOnly
                                            maxlength="5"
                                            placeholder="请输入内容"
                                            v-model="standForm.areaPrice"
                                            clearable>
                                        </el-input>
                                    </el-form-item>
                                    <span>元</span>
                                    <el-form-item class="itemArea" prop="areaKm">
                                        <el-input
                                            placeholder="请输入内容"
                                            maxlength="5"
                                            v-numberOnly
                                            v-model="standForm.areaKm"
                                            clearable>
                                        </el-input>
                                    </el-form-item>
                                    <span>公里</span>
                                </label>
                                <label>
                                    <span style="color:red;">* </span><span class="control">区域超里程费：</span>  
                                    <el-form-item class="itemArea" prop="areaOutstripPrice">
                                        <el-input
                                            maxlength="5"
                                            v-numberOnly
                                            placeholder="请输入内容"
                                            v-model="standForm.areaOutstripPrice"
                                            clearable>
                                        </el-input>
                                    </el-form-item>
                                    <span>元 / 公里</span>
                                </label>       
                            </div>
                        </div>
                    </div>
                </div>
            </el-form>

            <el-form  :inline="true" v-else :model="reviseForm" :rules="reviserules"  ref="ruleForm"  label-position="right">
                <div class="changeInforMation">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item class="nowCity" label="当前城市：" :label-width="formLabelWidth" prop="carType">
                                <!-- <span class="onlyShow">{{reviseForm.areaName}}</span> -->
                                <el-input disabled v-model="reviseForm.areaName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="nowCity" label="当前服务分类：" :label-width="formLabelWidth" prop="carType">
                                <!-- <span class="onlyShow">{{reviseForm.serviceName}}</span> -->
                                <el-input disabled v-model="reviseForm.serviceName"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="12">
                            <el-form-item class="nowCity" label="当前车辆类型：" :label-width="formLabelWidth" prop="carType">
                                <!-- <span class="onlyShow">{{reviseForm.carTypeName}}</span> -->
                                <el-input disabled v-model="reviseForm.carTypeName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="nowCity" label="车长：" :label-width="formLabelWidth" prop="carType">
                                <!-- <span class="onlyShow">{{reviseForm.carLength + '*' + reviseForm.carWidth + '*' + reviseForm.carHeight + 'M'}}</span> -->
                                <el-input disabled :value="reviseForm.carLength + '*' + reviseForm.carWidth + '*' + reviseForm.carHeight + 'M'"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div class="reference">
                        <div class="referenceM">
                                <span class="control">标准起步价：</span>
                                <el-input
                                    disabled
                                    v-model="reviseForm.standardPrice"
                                    clearable>
                                </el-input>
                                <span>元</span>
                                <el-input
                                    disabled
                                    v-model="reviseForm.standardKm"
                                    clearable>
                                </el-input>
                                <span>公里</span>
                            </div>
                            <div class="referenceM">
                                <span class="control">超里程费：</span>         
                                <el-input
                                    disabled
                                    v-model="reviseForm.outstripPrice"
                                    clearable>
                                </el-input>
                                <span>元 / 公里</span>
                            </div>       
                    </div>
                    <div class="nowChange">
                        <span class="control">区域起步价：</span>
                        <el-form-item prop="areaPrice">
                            <el-input
                                v-numberOnly
                                v-model="reviseForm.areaPrice"
                                ref="newPrice"
                                clearable>
                            </el-input>
                        </el-form-item>
                        <span>元</span>
                        <el-form-item prop="areaKm">
                            <el-input
                                v-numberOnly                                   
                                v-model="reviseForm.areaKm"
                                ref="newInfoKm"
                                clearable>
                            </el-input>
                        </el-form-item>
                        <span>公里</span>
                    </div>
                    <div class="nowChange nowChangeInfo">
                        <span class="control">区域超里程费：</span>    
                         <el-form-item prop="areaOutstripPrice">
                            <el-input
                                v-numberOnly                                    
                                v-model="reviseForm.areaOutstripPrice"
                                ref="newMorePrice"
                                clearable>
                            </el-input>
                        </el-form-item>     
                        <span>元 / 公里</span>
                    </div>       
                </div>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" plain  icon="el-icon-success" @click="submitForm('ruleForm')" :disabled="btnShow">{{isModify? '保存' : '确定'}}</el-button>
                <el-button type="primary" plain icon="el-icon-error" @click="close">取 消</el-button>
            </div>
        </el-dialog>    
    </div>
</template>

<script>

import { DicServiceType,DicCartype,GetCarStyle,aflcProvinceCode } from '@/api/common.js'
import { data_GetInformation} from '@/api/server/standardPrice.js'
import { objectMerge2, parseTime } from '@/utils/'
import { data_NewOrChange, data_OnlyChange } from '@/api/server/areaPrice.js'
export default {
    name:'AreaPrice',
    props:{
        dialogAreaPrice:{
            type:Boolean,
            default:false
        },
        isModify:{
            type:Boolean,
            default:false
        },
        formtitle:{
            type:String,

        },
        reviseForm:{
            type:Object
        }
    },
    components:{

    },
    data(){
        return {
            formLabelWidth:'110px',
            cityTree:[],//省市区树形结构
            filterText: '',
            maxlengthNum:200,
            formLabelWidth:'110px',
            loading:false,
            btnShow:false,
            optionsService: [],
            optionsCar: [],
            optionsCarStyle: [], // 车长分类
            standForm:{
                serivceCode:'',
                carType:'',
                standardPriceId:'',
                standardPrice:'',
                standardKm:'',
                outstripPrice:'',
                cityId:'',
                areaOutstripPrice:'',
                areaKm:'',
                areaPrice:'',
            },
            defaultProps: {
                label: 'name',
                children: 'children'
            },
            newrules: {
                serivceCode: [
                    { required: true, message:"请选择服务类型", trigger: 'blur' },
                ],
                carType:[
                    { required: true, message:"请选择车辆类型", trigger: 'blur' },
                ],
                standardPriceId:[
                    { required: true, message:"请选择车长规格", trigger: 'blur' },
                ],
                areaPrice:[
                    {required:true,message:"请输入区域起步价",trigger:'change'},
                ],
                areaKm:[
                    {required:true,message:"请输入区域起步公里",trigger:'change'},
                ],
                areaOutstripPrice:[
                    {required:true,message:"请输入区域超里程费",trigger:'change'},
                ]
            },
            reviserules:{
                areaPrice:[
                    {required:true,message:"请输入区域起步价",trigger:'blur'},
                ],
                areaKm:[
                    {required:true,message:"请输入区域起步公里",trigger:'blur'},
                ],
                areaOutstripPrice:[
                    {required:true,message:"请输入区域超里程费",trigger:'blur'},
                ]
            },
            data:{
                "currentPage":1 ,
                "pageSize": 1000000,
                "vo": {}
            }
        }
    },
    watch:{
        dialogAreaPrice:{
            handler(newVal,oldVal){
                console.log('this.isModify',this.isModify)
                if(newVal && !this.isModify){
                    this.init()
                }
            },  
            deep:true
        },
        filterText(val) {
            this.$refs.tree.filter(val)
        }

    },
    mounted(){
    },
    methods:{
        init(){
            Promise.all([DicServiceType(),data_GetInformation(1,100000,{}),aflcProvinceCode()]).then(resArr => {
                // console.log('resArr:',resArr)
                this.optionsService = resArr[0].data;
                resArr[0].data.forEach(el => {
                    el.code == 'AF01701' ?  this.standForm.serviceName =  el.name : '小货车'
                })
                this.standForm.serivceCode = 'AF01701';
                this.optionsCar = resArr[1].data.list;
                this.cityTree = resArr[2].data;
            })
        },
        choseStyle(val) {
            if (this.standForm.carType){
                GetCarStyle(this.standForm.serivceCode, this.standForm.carType).then(res => {
                    // console.log('cartype',res)
                    if (res.data.length > 0) {
                        this.standForm.standardPriceId = '';
                        this.standForm.standardPrice = '';
                        this.standForm.standardKm = '';
                        this.standForm.outstripPrice = '';
                        this.optionsCarStyle = res.data;
                        this.optionsCarStyle.map((item) => {
                            item.carStyle = item.carLength + '*' + item.carWidth + '*' + item.carHeight + 'M'
                        })
                    }else{
                        for (const i in this.standForm) {
                            this.form[i] = ''
                        }
                    }
                }).catch(err => {
                    this.$message({
                        type: 'info',
                        message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                    })
                })
            }else{
               
            }
        },
        filterNode(value, data) {
            // console.log(value,data)
            if (!value) return true
            return data.name.indexOf(value) !== -1
        },
        // 根据车长显示标准定价
        choseVule(val) {
            console.log(val)
            this.optionsCarStyle.map((item) => {
                if (item.standardPid == val) {
                    this.standForm.standardPrice = item.standardPrice;
                    this.standForm.standardKm = item.standardKm;
                    this.standForm.outstripPrice = item.outstripPrice;

                    this.standForm.areaPrice = item.standardPrice;
                    this.standForm.areaKm = item.standardKm;
                    this.standForm.areaOutstripPrice = item.outstripPrice;
                }
            })
            // console.log(this.optionsCarStyle)
        },
        submitForm() {
            if(!this.isModify){
                this.$refs.ruleForm.validate((valid) => {
                    let getNodeId = this.$refs.tree.getCheckedNodes();
                    let ifCity =  getNodeId.length>0 ?  true : false;
                    if (valid && ifCity) {
                        this.btnShow = true;
                        let cityArr =[];
                        // let provinceId = getNodeId[0].code;
                        // let currentGetNodeId = getNodeId.slice(1);
                        getNodeId.forEach(el =>{
                            cityArr.push(el.code);
                        })

                        // console.log(getNodeId)
                        // let forms = objectMerge2({},this.standForm,{cityId:cityArr.join(','),provinceId:provinceId})
                        let forms = objectMerge2({},this.standForm,{cityId:cityArr.join(',')})

                        // console.log(forms)
                        data_NewOrChange(forms).then(res =>{
                            this.$message({
                                type: 'success',
                                message: '新增成功!' 
                            })
                            this.close();
                         }).catch(err => {
                            this.$message({
                                type: 'info',
                                message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                            })
                            this.btnShow = false;
                         })
                    } else if(!ifCity){
                        return this.$message({
                            type: 'warning',
                            message: '请选择省市'
                        });
                    }
                    else {
                        return this.$message({
                            type: 'warning',
                            message: '请填写完整数据'
                        });
                    }
                 });
            }else{
                this.$refs.ruleForm.validate((valid) => {
                    if (valid ) {
                        this.btnShow = true;
                        let forms =  objectMerge2({},this.reviseForm);
                        data_OnlyChange(forms).then(res =>{
                            this.$message({
                                type: 'success',
                                message: '修改成功!' 
                            })
                            this.close();
                         }).catch(err => {
                            this.$message({
                                 type: 'info',
                                 message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                            })
                            this.btnShow = false;
                         })
                    } 
                    else {
                        return this.$message({
                            type: 'warning',
                            message: '请填写完整数据'
                        });
                    }
                 });
            }
        },  
        close(){
            this.$refs.ruleForm.resetFields();
            this.$emit('update:dialogAreaPrice', false);
            this.$emit('close');
            for (const i in this.standForm) {
                this.standForm[i] = ''
            }
            this.btnShow = false; 
            if (typeof done === 'function') {
                done()
            }
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    .areaPrice{
            .el-dialog{
                position: relative;
                width: 910px;
                .el-dialog__headerbtn{
                    z-index: 99;
                }
            .infoinner{
                height:440px;
                .slot_info{
                    position:absolute;
                    top:0;
                    left:0;
                    width:100%;
                    border-bottom: 1px solid #d0d7e5;
                    .newarea{
                        float:left;
                        width:50%;
                        padding:0 0 0 50px;
                        .slot_head{
                            display: inline-block;
                            text-align: center;
                            width:100%;
                            height: 40px;
                            font-family: MicrosoftYaHei;
                            font-size: 14px;
                            font-weight: normal;
                            font-stretch: normal;
                            line-height: 40px;
                            letter-spacing: 0px;
                            color: #ffffff;
                        }
                        .area_server{
                            padding-top:17px;
                            padding-bottom: 20px;
                            h4{
                                span{
                                    color:red;
                                }
                                font-family: MicrosoftYaHei;
                                font-size: 12px;
                                font-weight: normal;
                                font-stretch: normal;
                                line-height: 20px;
                                letter-spacing: 0px;
                                color: #666;
                                margin-bottom: 13px;
                            }
                            .eltree_search{
                                width: 260px;
                                height: 296px;
                                margin-bottom: 12px;
                                overflow: auto;
                                border: 1px solid #ccc;
                                p{
                                    margin:9px 0 0 33px;
                                    font-size: 12px;
                                    font-weight: normal;
                                    font-stretch: normal;
                                    line-height: 20px;
                                    letter-spacing: 0px;
                                    color: #333333;
                                }
                                .el-radio-group{
                                    margin-left:34px;
                                    font-size: 12px;
                                    line-height: 20px;
                                    color:#333;
                                    .el-radio{
                                        margin:6px 0 0 0;
                                    }
                                }
                                .el_search{
                                    width: 100%;
                                    padding:6px 5px;
                                    .el-input__inner{
                                        height: 26px;
                                        line-height: 26px;
                                    }

                                }
                                .el-tree{
                                    .el-checkbox{
                                        margin-top:0;
                                        .el-checkbox__inner{
                                            width: 12px;
                                            height: 12px;
                                        }
                                    }
                                }
                            }
                            .chooseclassfy{
                                width: 260px;
                                .chose{
                                    margin-bottom: 0;
                                    .el-form-item__label{
                                        margin-left: 10px; 
                                        text-align: left;
                                    }
                                    .showName{
                                        margin:5px 0;
                                        padding-left: 80px;
                                        .el-input__inner{
                                            width: 150px;
                                        }
                                    }
                                    .el-select{
                                        margin:5px 0;
                                        padding-left: 80px;
                                        .el-input{
                                            width: 150px;
                                            .el-input__inner{
                                                padding: 5px;
                                                font-size: 12px;
                                                color:#3e9ff1;
                                            }
                                        }
                                    }
                                }
                            }
                            label{
                                display: block;
                                margin-top:20px;
                                font-size: 12px;
                                font-weight: normal;
                                font-stretch: normal;
                                line-height: 20px;
                                letter-spacing: 0px;
                                color: #666666;
                                .control{
                                    display: inline-block;
                                    text-align: left;
                                    width: 85px;
                                }
                                .itemArea{
                                    margin-bottom: 0;
                                    margin-right: 0;
                                    vertical-align: middle;
                                }
                                .el-input{
                                    width: 96px;
                                    height:30px;
                                    margin:0 6px;
                                    .el-input__inner{
                                        display: inline-block;
                                        width: 96px;
                                        font-size: 12px;
                                        border-radius: 2px;
                                        height: 30px;
                                        line-height: 30px;
                                        border: solid 1px #d4d4d4;
                                        padding:8px;
                                        color: #3e9ff1;
                                    }
                                }
                            }
                        }
                    }
                    .area_left{
                        .slot_head{
                            border-right:1px solid #fff;
                        }
                        .area_left_server{
                            border-right:1px solid #d0d7e5;
                        }
                    }

                    .area_right{
                        .area_right_server{
                            .el-tree{
                                overflow:auto;
                            }
                        }
                    }
                    
                }
            }

            .changeInforMation{
                padding: 0 20px 30px;
                border-bottom: 1px solid #d0d7e5;
                .el-input{
                    width: 250px;
                    .el-input__inner{
                        font-size: 12px;
                        color: #3e9ff1;
                    }
                }
                .nowCity{
                    h4{
                        display: inline-block;
                        width: 111px;
                        span{
                            color: red;
                        }
                    }
                }
                .chose{
                    display: inline-block;
                    margin:10px 30px 10px 0; 
                    p{
                        display: inline-block;
                        height: 24px;
                        line-height: 24px;
                        span{
                            color: red;
                        }
                    }
                    
                }
                .reference{
                    border: 1px dashed #ccc;
                    margin:10px; 
                    padding: 10px;
                    font-size: 12px;
                    .referenceM{
                        display: inline-block;
                        padding: 5px; 
                        margin-left: 50px;
                    }
                    .el-input {
                        width: 120px;
                    }
                }
                .nowChange{
                    display: inline-block;
                    margin-left: 60px;
                    .el-input{
                        width: 120px;
                    }
                    .el-form-item {
                        margin-right: 0;
                        margin-bottom: 0;
                        vertical-align: middle;
                    }
                }
                .nowChangeInfo{
                    margin-left: 32px;
                }
                    
            }
            }
            .el-dialog__footer{
                padding:10px 20px;
            }
        }
</style>
