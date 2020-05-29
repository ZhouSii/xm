<template>
    <div class="commoncss standarPrice">
        <el-dialog width="70%" :title="formtitle" :close-on-click-modal="false" top="10vh" :visible="dialogStandarPrice" @close="close" v-loading="loading">
            <el-form  :model="standForm" :label-width="formLabelWidth" :rules="newrules"  ref="ruleForm">
                <div class="chooseinfo">
                    <el-form-item class="chooseinfo-item" label="当前服务分类：">
                        <el-radio-group v-model="standForm.serivceCode" v-if="!isModify">
                            <el-radio  v-for="(obj,key) in optionsService" :label="obj.code" :key='key'>{{obj.name}}</el-radio>
                        </el-radio-group>
                        <el-input v-model="standForm.serviceName" disabled v-else></el-input>
                        <!-- <span class="onlyShow" >{{standForm.serviceName}}</span> -->
                    </el-form-item>
                    <el-form-item class="chooseinfo-item" :label="isModify ? '当前车辆类型：' : '选择车辆类型：'"   prop="carType">
                        <el-radio-group v-model="standForm.carType" v-if="!isModify">
                            <el-radio   v-for="(obj,key) in optionsCar" :label="obj.code" :key='key'>{{obj.name}}</el-radio>
                        </el-radio-group>   
                        <!-- <span class="onlyShow" v-else>{{standForm.carTypeName}}</span> -->
                        <el-input  v-else v-model="standForm.carTypeName" disabled></el-input>
                    </el-form-item>
                    <el-form-item class="chooseinfo-item" :label="isModify ? '当前车辆规格：':'可选车辆规格：'" >
                        <el-checkbox-group v-model="specList">
                            <el-checkbox v-for="obj in optionsCarTypeM" :label="obj.code" :key="obj.name" >{{obj.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </div>
                <div class="completeinfo">
                    <el-form-item label="车长："   prop="carLength">
                        <!-- <el-input
                            placeholder="长"
                            maxlength="5"
                            v-model="standForm.carLength"
                            clearable>
                        </el-input> -->
                        <NumberOnlyPoint v-model="standForm.carLength" length = '5' placeholderTxt='长'/>
                    </el-form-item>
                    <el-form-item  label-width="0" prop="carWidth">
                       <!-- <el-input
                            placeholder="宽"
                            maxlength="5"
                            v-model="standForm.carWidth"
                            clearable>
                        </el-input> -->
                        <NumberOnlyPoint v-model="standForm.carWidth" length = '5' placeholderTxt='宽'/>
                    </el-form-item>
                    <el-form-item  label-width="0" prop="carHeight">
                        <!-- <el-input
                            placeholder="高"
                            maxlength="5"
                            v-model="standForm.carHeight"
                            clearable>
                        </el-input> -->
                        <NumberOnlyPoint v-model="standForm.carHeight" length = '5' placeholderTxt='高'/>
                    </el-form-item>
                    <span class="node">米</span>
                    <span class="remarks">(例如：长/宽/高 1.8*1.3*.1.2米)</span>
                </div>
                <div class="completeinfo">
                    <el-form-item label="负载量："   prop="capacityTon">
                        <!-- <el-input
                            v-number-only:point
                            class="morewidth"
                            maxlength="5"
                            v-model="standForm.capacityTon"
                            clearable>
                        </el-input> -->
                        <NumberOnlyPoint v-model="standForm.capacityTon" length = '5'/>
                    </el-form-item>
                    <span class="dotted">吨</span>
                    <el-form-item label-width="0" prop="capacitySquare">
                        <!-- <el-input
                            v-number-only:point
                            class="morewidth"   
                            maxlength="5"
                            v-model="standForm.capacitySquare"
                            clearable>
                        </el-input> -->
                        <NumberOnlyPoint v-model="standForm.capacitySquare" length = '5'/>
                    </el-form-item>
                    <span>方</span>
                </div>

                <div class="completeinfo">
                    <el-form-item label="标准起步价："   prop="standardPrice">
                        <!-- <el-input
                            v-number-only:point
                            class="morewidth"
                            maxlength="5"
                            v-model="standForm.standardPrice"
                            clearable>
                        </el-input> -->
                        <NumberOnlyPoint v-model="standForm.standardPrice" length = '5'/>
                    </el-form-item>
                    <span class="dotted">元</span>
                    <el-form-item label-width="0" prop="standardKm">
                        <!-- <el-input
                            v-number-only:point
                            class="morewidth"
                            maxlength="5"
                            v-model="standForm.standardKm"
                            clearable>
                        </el-input> -->
                        <NumberOnlyPoint v-model="standForm.standardKm" length = '5'/>
                    </el-form-item>
                    <span class="node">公里</span>
                    <span class="remarks">(例如：16元/3公里)</span>
                </div>
                <div class="completeinfo">
                    <el-form-item label="标准超里程费："   prop="outstripPrice">
                        <!-- <el-input
                            v-number-only:point
                            class="morewidth"
                            maxlength="5"
                            v-model="standForm.outstripPrice"
                            clearable>
                        </el-input> -->
                        <NumberOnlyPoint v-model="standForm.outstripPrice" length = '5'/>
                    </el-form-item>
                    <span>元/公里</span>
                </div>
                 <div class="completeinfo">
                <el-row>
                    <el-col :span="10">
                    <el-form-item  class="labelLine">
                        <span slot="label">基础搬运费：<br/>(仅参考)</span>
                         <el-input
                            v-numberOnly
                            maxlength="5"
                            v-model="standForm.transportPrice"
                            style="width:150px"
                            clearable
                            >
                        <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="10">
                    <el-form-item class="labelLine">
                        <span slot="label" >楼层费：<br/>(仅参考)</span>
                        <el-input
                        v-numberOnly
                        maxlength="5"
                        v-model="standForm.storeyPrice"
                        style="width:150px"
                        clearable
                        >
                        <template slot="append">元/层</template>
                        </el-input>
                    </el-form-item>
                    </el-col>
                </el-row>
                <p v-html="remarkinfo" class="remarkinfo"></p>
                </div>
                <div class="completeinfo">
                     <el-row>
                    <el-col :span="12">
                    <el-form-item label="上传服务图片："   prop="servicePic">
                        <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="standForm.servicePic" />
                    </el-form-item>
                     </el-col>
                    <el-col :span="12">
                    <el-form-item label="侧面图片：">
                        <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="standForm.sideImage" />
                    </el-form-item>
                     </el-col>
                </el-row>
                </div>
                <div class="completeinfo">
                      <el-row>
                    <el-col :span="12">
                    <el-form-item label="45度角图片：">
                        <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="standForm.fortyFiveAngleImage" />
                    </el-form-item>
                     </el-col>
                    <el-col :span="12">
                    <el-form-item label="背面图片：" >
                        <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="standForm.backImage" />
                    </el-form-item>
                     </el-col>
                </el-row>
                </div>
                <div class="additional ">
                    <el-form-item label="载货空间及重量：" class="textArea">
                        <el-input
                            placeholder="少于200字符"
                            type="textarea"
                            :autosize="{ minRows: 4, maxRows: 10}"
                            clearable
                            :maxlength="maxlengthNum"
                            v-model="standForm.weightSpace">
                        </el-input>
                        <p class="countNum">
                             <span>{{standForm.weightSpace ? standForm.weightSpace.length : 0}}</span> <span>/ {{maxlengthNum}}</span> 
                        </p>
                    </el-form-item>
                    <el-form-item label="用车参考：" class="textArea">
                        <el-input
                            placeholder="少于200字符"
                            type="textarea"
                            :autosize="{ minRows: 4, maxRows: 10}"
                            clearable
                            :maxlength="maxlengthNum"
                            v-model="standForm.useCarRefer">
                        </el-input>
                        <p class="countNum">
                             <span>{{standForm.useCarRefer ? standForm.useCarRefer.length : 0}}</span> <span>/ {{maxlengthNum}}</span> 
                        </p>
                    </el-form-item>
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
import { DicServiceType,DicCartype,DicCarType } from '@/api/common.js'
import { data_NewClassfy, data_changeClassfy } from '@/api/server/standardPrice.js'
import { objectMerge2, parseTime } from '@/utils/'
import Upload from '@/components/Upload/singleImage'
import NumberOnlyPoint from '@/components//NumberOnlyPoint/index'

export default {
    name:'standarPrice',
    props:{
        dialogStandarPrice:{
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
        Upload,
        NumberOnlyPoint
    },
    data(){
        return {
            maxlengthNum: 200,
            remarkinfo:'备注:</br>1.若需搬运的地点有电梯，则楼层费按基础楼层费计算；楼层费为20元/层，则计算费用为20。</br>2.若需搬运的地点没电梯，则楼层费用按【N-1层】的费用计算；如搬运的楼层在4楼，楼层费为20元/层，则计算费用为60元。',
            formLabelWidth:'120px',
            formLabelWidth2:'110px',
            loading:false,
            btnShow:false,
            optionsService: [],
            optionsCar: [],
            optionsCarTypeM:[],
            standForm:{
                serivceCode: '',
                serviceName:'',
                carType: '',
                spec: '',
                carLength: '',
                carWidth: '',
                carHeight: '',
                capacityTon: '',
                capacitySquare: '',
                standardPrice: '',
                standardKm: '',
                outstripPrice: '',
                servicePic: '',
                transportPrice: '',//基础搬运费
                storeyPrice:'',//楼层费
                sideImage: '',//侧面图
                backImage: '',//背面图片
                fortyFiveAngleImage: '',//45度角图片
                weightSpace: '',//载货空间及重量
                useCarRefer: '',//用车参考用车参考
            },
            specList: [],
            specListName:[],
            serverCheckList:[],//服务分类
            carCheckList:[],//车辆类型
            newrules: {
                serivceCode: [
                    { required: true, message:"请选择服务分类", trigger: 'blur' },
                ],
                carType:[
                    { required: true, message:"请选择车辆类型", trigger: 'blur' },
                ],
                carLength:[
                    { required: true, message:"请输入车长", trigger: 'blur' },
                ],
                carWidth:[
                    { required: true, message:"请输入车宽", trigger: 'blur' },
                ],
                carHeight:[
                    { required: true, message:"请输入车高", trigger: 'blur' },
                ],
                capacityTon:[
                    { required: true, message:"请输入负载重量", trigger: 'blur' },
                ],
                capacitySquare:[
                    { required: true, message:"请输入负载体积", trigger: 'blur' },
                ],
                standardPrice:[
                    { required: true, message:"请输入标准价格", trigger: 'blur' },
                ],
                standardKm:[
                    { required: true, message:"请输入标准里程", trigger: 'blur' },
                ],
                outstripPrice:[
                    { required: true, message:"请输入标准超里程费", trigger: 'blur' },
                ],
                servicePic:[
                    { required: true, message:"请上传服务图片", trigger: 'blur' },
                ],
            },
        }
    },
    watch:{
        dialogStandarPrice:{
            handler(newVal,oldVal){
                // console.log('this.isModify',this.isModify)
                if(newVal && !this.isModify){
                    // for (const i in this.standForm) {
                    //     this.standForm[i] = ''
                    // }
                    this.init();
                }else{
                    if(Object.keys(this.reviseForm).length != 0){
                        this.standForm = objectMerge2({},this.reviseForm);
                        this.specList = this.reviseForm.spec.split(',');
                        console.log(this.standForm,'this.standForm')
                        DicCarType().then(res =>{
                            this.optionsCarTypeM = res.data;
                        }).catch(err => {
                            this.$message({
                                type: 'info',
                                message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                            })
                        })
                    }
                }
            },  
            deep:true
        },
    },
    mounted(){
    },
    methods:{
        init(){
            Promise.all([DicServiceType(),DicCartype(),DicCarType()]).then(resArr => {
                this.optionsService = resArr[0].data;
                // resArr[0].data.forEach(el => {
                //     el.code == 'AF01701' ?  this.standForm.serviceName =  el.name : '小货车'
                //     console.log(this.standForm.serviceName)
                // })
                this.optionsCar = resArr[1].data;
                this.optionsCarTypeM = resArr[2].data;
            }).catch(err => {
                this.$message({
                    type: 'info',
                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                })
            })
        },
        submitForm() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.btnShow = true;
                    let standarFunction;
                    this.specListName = [];
                    this.optionsCarTypeM.forEach(el => {
                        this.specList.forEach(item => {
                            if(el.code == item){
                                this.specListName.push(el.name)
                            }
                        })
                    })
                    let spec = this.specList.join(',');
                    let specName = this.specListName.join(',');
                    // let forms = objectMerge2({},this.standForm,{spec:spec,specName:specName,serivceCode:'AF01701'});
                    let forms = objectMerge2({},this.standForm,{spec:spec,specName:specName});
                    if(!this.isModify){
                        standarFunction = data_NewClassfy(forms);
                    }else{
                        standarFunction = data_changeClassfy(forms);
                    }
                    standarFunction.then(res =>{
                        this.$message({
                            type: 'success',
                            message: this.isModify ? '修改成功！' : '新增成功！'
                        })
                        this.close()
                    }).catch(err => {
                        this.$message({
                            type: 'info',
                            message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                        })
                        this.btnShow = false;
                    })
                }else {
                    return this.$message({
                        type: 'warning',
                        message: '请填写完整数据'
                    });
                }
            });
        },  
        close(done){
            this.$refs.ruleForm.resetFields();
            for (const i in this.standForm) {
                this.standForm[i] = ''
            }
            this.specList = [];
            this.$emit('update:dialogStandarPrice', false);
            this.$emit('close');
            this.btnShow = false; 
            if (typeof done === 'function') {
                done()
            }
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    .standarPrice{
        .el-dialog{
            position: relative;
            width: 810px;
            .el-dialog__body{
                margin:0 40px;
                padding-bottom: 0;
                border-bottom: 1px solid #d2d2d2;
                .el-input__inner{
                    height: 24px;
                    line-height: 24px;
                    color: #3e9ff1;
                }
                .chooseinfo{
                    border:1px solid #d2d2d2;
                    margin-bottom: 20px;
                    padding-top: 20px;
                    padding-right: 20px;
                    .chooseinfo-item{
                        // padding: 20px 10px;
                        .el-input{
                            width: 150px;
                        }
                        .is-disabled{
                            width: 100%;
                        }
                        .el-radio-group{
                            display: inline-block;
                            margin:0 9px;
                            .el-radio{
                                margin: 5px 20px 5px 0px; 
                            }
                        }
                        .el-checkbox-group{
                            display: inline-block;
                            margin-left: 10px;
                        }
                    }
                }
                .completeinfo{
                    &>.el-form-item{
                        display: inline-block;
                        margin-bottom: 15px;
                    }
                    .el-input{
                        width: 79px;
                        height: 24px;
                        margin-right:6px;
                        .el-input__inner{
                            height:24px;
                            line-height: 24px;
                            padding:5px;
                            font-size: 12px;
                            color: #3e9ff1;
                        }
                    }
                    .dotted{
                        margin-right:9px;
                    }
                    .node{
                        display: inline-block;
                        width:28px;
                        text-align: left;
                        margin-right: 12px;
                    }
                    .morewidth{
                        width: 110px;
                    }
                    .remarks{
                        height: 14px;
                        font-family: MicrosoftYaHei;
                        font-size: 12px;
                        font-weight: normal;
                        font-stretch: normal;
                        line-height: 20px;
                        letter-spacing: 0px;
                        color: #999999;
                    }
                    .licensePicture{
                        width: 230px;
                        height: 116px;
                        line-height: 1.2;
                        display: inline-block;
                        margin-top: 10px;
                        .el-upload-dragger{
                            .el-icon-upload{
                                margin: 15px 0 16px;
                            }
                            .el-upload__text{
                                font-size: 12px;
                            }
                        }

                    }
                }
            }
        }
    }
    .labelLine {
        label {
            line-height: 20px;
            text-align: center;
        }
    
}
</style>
<style lang="scss" scoped>
.remarkinfo {
    font-size: 12px;
    line-height: 20px;
}

    
</style>