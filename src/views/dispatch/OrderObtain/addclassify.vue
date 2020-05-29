<template>
<!-- 新增分类信息 -->
    <div class="orderObtain commoncss">
        <el-dialog :title='formtitle' :close-on-click-modal="false"  :visible="dialogFormVisible" @close="close">
            <el-form   :model="standForm" :rules="newrules"  ref="ruleForm"  :label-width="formLabelWidth" label-position="right">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="所在地：" prop="areaCode">
                            <getCityList class="chooseItem" @returnStr="getStr" v-model="standForm.areaCode" ref="area" v-if="!isModify"></getCityList>
                            <el-input  v-model="standForm.areaCodeName" v-else disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                           <el-form-item  label="选择服务类型：" prop="serivceCode">
                                <el-select v-model="standForm.serivceCode" clearable placeholder="请选择" v-if="!isModify">
                                    <el-option
                                        v-for="item in optionsService"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.code"
                                        :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                                <el-input  v-model="standForm.serivceCodeName" v-else disabled></el-input>
                            </el-form-item>
                    </el-col>
                </el-row> 
              
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="选择用车类型：" prop="carType">
                            <el-select v-model="standForm.carType" clearable placeholder="请选择" v-if="!isModify">
                                <el-option
                                    v-for="item in optionsCarType"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.code"
                                    :disabled="item.disabled">
                                </el-option>
                            </el-select>
                            <el-input  v-model="standForm.carTypeName" v-else disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item  label="中单时间间隔：" prop="obtainTimeInterval">
                            <el-input v-model="standForm.obtainTimeInterval" placeholder="请输入内容" maxlength="4" v-numberOnly clearable>
                                <template slot="append">/秒</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 

                 <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="中单距离间隔：" prop="obtainKmInterval">
                            <el-input v-model="standForm.obtainKmInterval" placeholder="请输入内容" maxlength="4" v-numberOnly clearable>
                                <template slot="append">/公里</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item  label="轮数：" prop="rounds">
                            <el-input v-model="standForm.rounds" placeholder="请输入内容" maxlength="4" v-numberOnly clearable>
                                <template slot="append">/轮</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
             
              

                <!-- <div class="ifBang"  v-for="(form,keys) in ifMoreForms" :key='keys' v-if="!isModify">
                    <p class="needMoreWidth"><span>* </span>第{{keys+1}}轮中单公布时间及距离</p>
                    <div class="publishSet">
                        <div class="chooseTime publishStyle">
                            <span>公布中单时间 ：</span>
                            <el-input v-model="form.time" placeholder="请输入" maxlength="4" clearable ref="times" v-numberOnly></el-input>
                            <span> / 秒</span>
                        </div>
                        <div class="chooseKM publishStyle">
                            <span>公布中单距离 ：</span>
                            <el-input v-model="form.km" placeholder="请输入" maxlength="4" v-numberOnly clearable></el-input>
                            <span>  / 公里</span>
                        </div>
                    </div>
                    <span  @click="addItem" class="addItem" v-if="keys == 0">
                    </span>
                    <span  @click="reduceItem(keys)" class="reduceItem" v-else>
                    </span>
                </div>
                <div class="ifBang" v-else>
                    <p class="needMoreWidth"><span>* </span>当前中单公布时间及距离</p>
                    <div class="publishSet">
                        <el-form-item  label="公布中单时间：" prop="obtainTime" label-width='120px'>
                            <el-input v-model="standForm.obtainTime" placeholder="请输入内容" maxlength="4" v-numberOnly clearable>
                                <template slot="append">/秒</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item  label="公布中单距离：" prop="obtainKm" label-width='120px'>
                            <el-input v-model="standForm.obtainKm" placeholder="请输入内容" maxlength="4" v-numberOnly clearable>
                                <template slot="append">/公里</template>
                            </el-input>
                        </el-form-item>
                    </div>
                 </div> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" plain  icon="el-icon-success" @click="submitForm('ruleForm')" :disabled="btnShow">{{isModify? '保 存' : '确 定'}}</el-button>
                <el-button type="primary" plain icon="el-icon-error" @click="close">取 消</el-button>
            </div> 
        </el-dialog>
    </div>
</template>

<script>

import getCityList from '@/components/GetCityList/index'
import { data_CarList,data_ServerClassList } from '@/api/common.js'
import { data_NewData,data_ChangeData } from '@/api/dispatch/OrderObtain.js'
import { objectMerge2, parseTime } from '@/utils/'

export default {
    name: 'addClassfy',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            required:true
        },
        isModify:{
            type:Boolean,
            default:false,
        },
        changeforms:{
            type:Object,
        }
    },
    components:{
        getCityList,
    },
    data() {
        var checknoTack = (rule,value,callback) => {
            if (value == '') {
                callback(new Error('请输入中单时间间隔'));
            }else if(parseInt(value) <5 ){
                callback(new Error('限制中单时间间隔不小于5秒'));
            }else{
                callback();
            }
        };
      return {
          btnShow:false,
            formLabelWidth:'120px',
            // ifMoreForms:[
            //     {
            //         time:'',
            //         km:''
            //     }  
            // ],
            standForm:{
                areaCode:'',//地区code
                areaCodeName:'',
                serivceCode:'',//服务类型
                serivceCodeName:'',
                carType:'',//货主用车类型
                carTypeName:'',
                obtainKmList:'',//中单时间
                obtainTimeList:'',//中单距离
                obtainTime:'',
                obtainKm:'',
                obtainTimeInterval:'',//中单时间间隔(秒)
                obtainKmInterval:'',//中单公里间隔(公里)
                rounds:'',//中单公布轮数
            },
            optionsService:'',//服务选项
            optionsCarType:'',//车辆类型选项
            information:'',
            newrules: {
                areaCode: [
                    { required: true, message:"请选择所在地点", trigger: 'change' },
                ],
                serivceCode:[
                    { required: true, message:"请选择服务类型", trigger: 'change' },
                ],
                carType:[
                    { required: true, message:"请选择用车类型", trigger: 'change' },
                ],
                obtainTimeInterval:{required: true, validator:checknoTack, trigger: 'change'},
                obtainKmInterval:{required: true, message:"请输入中单距离间隔", trigger: 'change'},
                rounds:{required: true, message:"请输入中单公布轮数", trigger: 'change'},
            },
        };
    },
    watch:{
        dialogFormVisible:{
            handler(newVal,oldVal){
                if(newVal){
                    this.init()
                }
            },
            deep:true
        }
    },
    mounted(){

    },
    methods: {
        
        close(){
            this.$emit('update:dialogFormVisible',false);
            this.$refs.ruleForm.resetFields();
            this.clearForms();
            this.$emit('renovate');
            if(this.$refs.area){
                this.$refs.area.selectedOptions = [];
            }
            this.btnShow = false;
        },
        getStr(d){
            console.log('data:',d)
            // this.standForm.areaCode = val;
            // this.standForm.areaCodeName = name;
            this.standForm.areaCodeName = (!d.province&&!d.city&&!d.area) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}`.trim();
            if(d.city){
                this.standForm.areaCode = d.city.code;
            }else{
                this.standForm.areaCode = d.province.code;
            }
        },
        getValue(obj){
            return obj ? obj.value:'';
        },
        //初始化选择项数据
        init(){
             this.clearForms();
            if(!this.isModify){
                return Promise.all([data_CarList(), data_ServerClassList()]).then(resArr => {
                     console.log(resArr)
                     this.optionsCarType = resArr[0].data;
                     this.optionsService =resArr[1].data;
                }).catch(err => {
                    this.$message({
                        type: 'warning',
                        message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                    })
                })
            }else{
                 this.standForm = objectMerge2({},this.changeforms);
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.complantName();
                    let form = objectMerge2({},this.standForm);
                    let executeFunction = this.isModify ? data_ChangeData(form) : data_NewData(form) ;
                    // let ifOk = false;
                    console.log(form)
                    // if(!this.isModify){
                        // executeFunction = data_NewData(form);
                        // this.ifMoreForms.forEach(el => {
                        //     if(el.time == '' || el.km == ''){
                        //         ifOk = true;
                        //     }
                        // })
                    // }else{
                        // executeFunction = data_ChangeData(form);
                    // }
                    // if(ifOk){
                    //     return  this.$message({
                    //         type: 'warning',
                    //         message: '中单时间或者中单距离不能为空！'
                    //     })
                    // }else{
                        this.btnShow = true;
                        executeFunction.then(res => {
                            this.$message({
                                type: 'success',
                                message: '操作成功'
                            })
                            this.close();
                        }).catch(err => {
                            this.$message({
                                type: 'warning',
                                message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                            })
                            this.btnShow = false;
                        })
                    // }
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请填写完整数据'
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
        //添加子节点新增
        // addItem(){
        //     this.ifMoreForms.push({
        //         time:'',
        //         km:'',
        //     }); 
        // },
        //删除子节点新增
        // reduceItem(idx){
        //     this.ifMoreForms.splice(idx,1);
        // },
        //完善数据
        complantName(){
            if(!this.isModify){
                //筛选获取服务和车类型name
                if(this.standForm.serivceCode){
                    this.standForm.serivceCodeName = this.optionsService.find(item => item.code === this.standForm.serivceCode)['name'];
                }
                if(this.standForm.carType){
                    this.standForm.carTypeName = this.optionsCarType.find(item => item.code === this.standForm.carType)['name'];
                }
                // console.log(this.ifMoreForms)
                
                // let TimeList = [];
                // let KmList = [];
                
                // this.ifMoreForms.forEach( el => {
                //     TimeList.push(el.time);
                //     KmList.push(el.km)
                // })
    
                // this.standForm.obtainTimeList = TimeList.join(',');
                // this.standForm.obtainKmList = KmList.join(',');
            }
        },
    },
   
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .orderObtain{
        .el-dialog__wrapper{
            // .el-dialog{
            //     width: 920px;
            //     .el-dialog__body{
            //         border-bottom:1px solid #ccc;   
            //         margin-bottom: 0; 
            //         margin: 0 25px;
            //         .el-input{
            //             width: 250px;
            //         }
            //         .el-form-item .el-form-item__content{
            //             width: 250px;
            //         }
            //         .ifBang{
            //             position: relative;
            //             .needMoreWidth{
            //                 display: block;
            //                 width: 180px;
            //                 margin: 10px 0;
            //                 font-size: 14px;
            //                 line-height: 20px;
            //                 text-align: right;
            //                 color: #666666;
            //                 span{
            //                     color: red;
            //                 }
            //             }
            //             .publishSet{
            //                 border: 1px solid #ccc;
            //                 margin: 5px 50px;
            //                 padding: 10px;
            //                 .publishStyle{
            //                     display: inline-block;
            //                     width: 47%;
            //                     .el-input{
            //                         width: 38%;
            //                         .el-input__inner{
            //                             height: 30px;
            //                             line-height: 30px;
            //                         }
            //                     }
            //                     span{
            //                         font-size: 12px;
            //                         line-height: 20px;
            //                         color: #666666;
            //                         text-align: right;
            //                     }
            //                 }
            //                 .chooseTime{
            //                     margin-left: 30px; 
            //                 }
            //                 .el-form-item{
            //                     display: inline-block;
            //                     margin-bottom: 0;
            //                     .el-input{
            //                         width: 190px;
            //                     }
            //                 }
            //             }
            //             .addItem,.reduceItem{
            //                 top: 30px;
            //                 left: 96%;
            //             }
            //         }
            //     }
            // }
        }
    }
</style>
