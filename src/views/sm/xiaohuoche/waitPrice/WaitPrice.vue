<template>
    <div class="commoncss waitPrice">
        <el-dialog :title="formtitle" :close-on-click-modal="false" :visible="dialogWaitPrice" @close="close" v-loading="loading">
            <el-form class="newWait" v-if="!isModify" :model="standForm" :label-width="formLabelWidth" :rules="newrules"  ref="ruleForm">
                <div class="threePass">
                    <div class="chooseAera chooseCommon">
                        <h4><span>* </span> 选择省市</h4>
                        <div class="eltree_search lesscommon">
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
                        <el-form-item label="免费："   prop="freeTime">
                            <el-input  
                                v-numberOnly
                                placeholder="请输入内容"
                                maxlength="5"
                                v-model="standForm.freeTime"
                                clearable>
                                <template slot="append">分钟</template>
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="chooseServer chooseCommon">
                        <h4><span>* </span> 选择服务分类</h4>
                        <div class="lesscommon">
                            <el-checkbox-group v-model="serverCheckList">
                                <el-checkbox v-for="item in optionsService" :label="item.code" :key="item.id" :disabled="item.code != 'AF01701'" >{{item.name}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <el-form-item label="每间隔："  prop="intervalTime">
                            <el-input  
                                v-numberOnly
                                maxlength="5"
                                placeholder="请输入内容"
                                v-model="standForm.intervalTime"
                                clearable>
                                <template slot="append">分钟</template>
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="chooseCar chooseCommon">
                        <h4><span>* </span> 选择车辆类型</h4>
                        <div class="lesscommon ">
                            <el-checkbox-group v-model="carCheckList">
                                <el-checkbox v-for="item in optionsCar" :label="item.code" :key="item.id">{{item.name}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <el-form-item label="超时费用：" label-width="90px" prop="timeOutstripPrice">
                            <el-input  
                                maxlength="5"
                                v-numberOnly
                                placeholder="请输入内容"
                                v-model="standForm.timeOutstripPrice"
                                clearable>
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="additional ">
                    <p>{{remarkinfo}}</p>
                    <el-form-item label="费用说明：" class="textArea" prop="waitPriceDes">
                        <el-input
                            placeholder="少于500字符"
                            type="textarea"
                            :autosize="{ minRows: 4, maxRows: 10}"
                            clearable
                            :maxlength="maxlengthNum"
                            v-model="standForm.waitPriceDes">
                        </el-input>
                        <p class="countNum">
                             <span class="">{{standForm.waitPriceDes ? standForm.waitPriceDes.length : 0}}</span> <span>/ {{maxlengthNum}}</span> 
                        </p>
                    </el-form-item>
                </div>
            </el-form>

            <el-form v-else :model="reviseForm" :rules="reviserules"  :label-width="formLabelWidth2" ref="ruleForm"  label-position="left">
                <div class="changeWait">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="当前城市：" prop="carType">
                                <!-- <span class="onlyShow">{{reviseForm.areaName}}</span> -->
                                   <el-input  v-model="reviseForm.areaName" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="当前服务分类：" prop="serviceName">
                                <!-- <span class="onlyShow">{{reviseForm.serviceName}}</span> -->
                                   <el-input  v-model="reviseForm.serviceName" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="当前车辆类型：" prop="carTypeName">
                                <!-- <span class="onlyShow">{{reviseForm.carTypeName}}</span> -->
                                   <el-input  v-model="reviseForm.carTypeName" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="infowrite">
                        <el-col :span="8">
                            <el-form-item label="免费：" prop="freeTime" label-width="80px">
                                <el-input  
                                    placeholder="请输入内容"
                                    v-model="reviseForm.freeTime"
                                    clearable>
                                    <template slot="append">分钟</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="每间隔：" prop="intervalTime" label-width="80px">
                                <el-input  
                                    placeholder="请输入内容"
                                    v-model="reviseForm.intervalTime"
                                    clearable>
                                    <template slot="append">分钟</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="超时费用：" prop="timeOutstripPrice" label-width="90px">
                                <el-input  
                                    placeholder="请输入内容"
                                    v-model="reviseForm.timeOutstripPrice"
                                    clearable>
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div class="additional ">
                        <p>{{remarkinfo}}</p>
                        <el-form-item label="超时费用：" class="textArea" prop="carType">
                            <el-input
                                placeholder="少于500字符"
                                type="textarea"
                                :autosize="{ minRows: 4, maxRows: 10}"
                                clearable
                                :maxlength="maxlengthNum"
                                v-model="reviseForm.waitPriceDes">
                            </el-input>
                            <p class="countNum">
                                <span class="">{{reviseForm.waitPriceDes ? reviseForm.waitPriceDes.length : 0}}</span> <span>/ {{maxlengthNum}}</span> 
                            </p>
                        </el-form-item>
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
import { DicServiceType,DicCartype,aflcProvinceCode } from '@/api/common.js'
import { data_NewOrChange } from '@/api/server/serverWaitinfo.js'
import { objectMerge2, parseTime } from '@/utils/'
export default {
    name:'WaitPrice',
    props:{
        dialogWaitPrice:{
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
            remarkinfo: '例：免费0.25小时，每15分钟加收5元，不足15分钟按15分钟计价',
            cityTree:[],//省市区树形结构
            filterText: '',
            maxlengthNum:500,
            formLabelWidth:'80px',
            formLabelWidth2:'110px',
            loading:false,
            btnShow:false,
            optionsService: [],
            optionsCar: [],
            standForm:{
                waitPriceDes:'',
                freeTime:'',
                intervalTime:'',
                carType:'',
                serviceCode:'',
                timeOutstripPrice:'',
                cityId:''
            },
            serverCheckList:['AF01701'],//服务分类
            carCheckList:[],//车辆类型
            defaultProps: {
                label: 'name',
                children: 'children'
            },
            newrules: {
                freeTime: [
                    { required: true, message:"请输入免费时长", trigger: 'blur' },
                ],
                intervalTime:[
                    { required: true, message:"请输入每间隔时长", trigger: 'blur' },
                ],
                timeOutstripPrice:[
                    { required: true, message:"请输入超时费用", trigger: 'blur' },
                ],
            },
            reviserules:{
                freeTime:[
                    {required:true,message:"请输入免费时长",trigger:'blur'},
                ],
                intervalTime:[
                    {required:true,message:"请输入每间隔时长",trigger:'blur'},
                ],
                timeOutstripPrice:[
                    {required:true,message:"请输入超时费用",trigger:'blur'},
                ]
            }
        }
    },
    watch:{
        dialogWaitPrice:{
            handler(newVal,oldVal){
                console.log('this.isModify',this.isModify)
                if(newVal && !this.isModify){
                    this.init()
                }else{
                    console.log('test',this.reviseForm)
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
            Promise.all([DicServiceType(),DicCartype(),aflcProvinceCode()]).then(resArr => {
                this.optionsService = resArr[0].data;
                this.optionsCar = resArr[1].data;
                this.cityTree = resArr[2].data;
            })
        },
        filterNode(value, data) {
            // console.log(value,data)
            if (!value) return true
            return data.name.indexOf(value) !== -1
        },
        submitForm() {
            if(!this.isModify){
                let getNodeId = this.$refs.tree.getCheckedNodes();
                let ifCity =  getNodeId.length>0 ?  true : false;
                if(!ifCity){
                    return this.$message({
                        type: 'warning',
                        message: '请选择省市~'
                    });
                }else if(this.serverCheckList.length == 0){
                    return this.$message({
                        type: 'warning',
                        message: '请选择服务分类~'
                    });
                }else if(this.carCheckList.length == 0){
                    return this.$message({
                        type: 'warning',
                        message: '请选择车辆类型~'
                    });
                }else{
                    this.$refs.ruleForm.validate((valid) => {
                        // let serviceCode = this.serverCheckList.join(',');
                        let carCode = this.carCheckList.join(',');
                        if (valid) {
                            this.btnShow = true;
                            let cityArr =[];
                            getNodeId.forEach(el =>{
                                cityArr.push(el.code);
                            })
                            let forms = objectMerge2({},this.standForm,{cityId:cityArr.join(',')},{serviceCode:'AF01701',carType:carCode})
                            console.log(forms)
                            data_NewOrChange(forms).then(res =>{
                                 this.close();
                             }).catch(err => {
                                 this.$message({
                                     type: 'info',
                                     message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
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
                }
            }else{
                this.$refs.ruleForm.validate((valid) => {
                    if (valid ) {
                        this.btnShow = true;
                        let forms =  objectMerge2({},this.reviseForm);
                        data_NewOrChange(forms).then(res=>{
                             this.close();
                         }).catch(err => {
                             this.$message({
                                 type: 'info',
                                 message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
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
            }
        },  
        close(){
            this.$refs.ruleForm.resetFields();
            this.$emit('update:dialogWaitPrice', false);
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
    .waitPrice{
        .newWait{
            padding:0 30px;
            .threePass{
                display: flex;
                .chooseCommon{
                    flex: 1;
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
                        margin-bottom: 5px;
                    }
                    .lesscommon{
                        height: 300px;
                        margin-bottom: 20px;
                        overflow: auto;
                        border:1px solid #d2d2d2;
                        
                        &>.el-checkbox-group{
                            .el-checkbox{
                                display: block;
                                margin-top:12px;
                                font-size: 12px;
                                font-weight: normal;
                                font-stretch: normal;
                                line-height: 20px;
                                letter-spacing: 0px;
                                color: #666666;
                                margin-left:15px;
                            }
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
                }
                .chooseServer{
                    margin: 0 30px;
                }
            }
            .additional{
                p:first-child{
                    padding:10px 0 10px 90px;
                    font-size: 12px;
                    line-height: 20px;
                    letter-spacing: 0px;
                    color: #999999;
                }
                .el-textarea{
                    vertical-align:middle; 
                    font-size: 12px;
                    line-height: 20px;
                    vertical-align: top;
                    .el-textarea__inner{
                        color: #3e9ff1;
                    }
                }
            }
        }

        .changeWait{
            padding:0 50px;
            .infowrite{
                padding: 0 0 0 20px;
                .el-col-8{
                    padding: 0 10px;
                }
            }
            .additional {
                p:first-child{
                    padding:10px 0 10px 110px;
                    font-size: 12px;
                    line-height: 20px;
                    letter-spacing: 0px;
                    color: #999999;
                }
                .el-textarea{
                    vertical-align:top; 
                    font-size: 12px;
                    line-height: 20px;
                    .el-textarea__inner{
                        color: #3e9ff1;
                    }
                }
            }
        }
    }
</style>
