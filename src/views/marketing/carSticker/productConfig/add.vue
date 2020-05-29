<template>
    <div class="productConfigadd commoncss">
        <el-dialog :title='formtitle' :close-on-click-modal="false" v-el-drag-dialog top="5vh" :visible="dialogFormVisible" @close="close">
            <el-form   :model="standForm" :rules="newrules" label-position="right"  ref="ruleForm"  :label-width="formLabelWidth">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="所属区域：" prop="fullCityName">
                            <getCityList class="chooseItem" @returnStr="getStr" v-model="standForm.fullCityName" ref="area" v-if="!isModify && !isView"></getCityList>
                            <el-input v-model="standForm.fullCityName" disabled v-else></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="产品名称：" prop="produceName">
                            <el-input v-model="standForm.produceName" maxlength="20" clearable :disabled="isView || standForm.isUser == '1'"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="车贴类型：" prop="carStickerType">
                            <el-select v-model="standForm.carStickerType" clearable placeholder="请选择" v-if="standForm.isUser == '0'  && !isView">
                                <el-option
                                v-for="item in optionsCarSticker"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                                </el-option>
                            </el-select>
                            <el-input v-model="standForm.carStickerTypeName" disabled v-else></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="车辆类型：" prop="carType">
                            <el-select v-model="standForm.carType" clearable placeholder="请选择" v-if="standForm.isUser == '0'  && !isView">
                                <el-option
                                v-for="item in optionsCarType"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                                </el-option>
                            </el-select>
                            <el-input v-model="standForm.carTypeName" disabled v-else></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="车贴时效(月)：" prop="carVaild">
                            <el-select v-model="standForm.carVaild" clearable placeholder="请选择" v-if="standForm.isUser == '0' && !isView">
                                <el-option
                                v-for="item in optionsCarStickerTime"
                                :key="item.code"
                                :label="item.name"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            <el-input :value="standForm.carVaild + '月'" disabled v-else></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="每月补贴费用：" prop="reward">
                            <el-input v-model.number="standForm.reward" placeholder="请输入费用" v-numberOnly clearable :disabled="standForm.isUser == '1' || isView"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="20">
                    <el-col :span="12">
                         <el-form-item label="首次申请费用：" prop="firstApplyFee">
                            <el-input v-model.number="standForm.firstApplyFee" placeholder="请输入费用" clearable :disabled="standForm.isUser == '1' || isView"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="再次申请费用：" prop="againApplyFee">
                            <el-input v-model.number="standForm.againApplyFee" placeholder="请输入费用" clearable :disabled="standForm.isUser == '1' || isView"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="权利说明：" prop="rightExplain">
                            <el-input type="textarea" :rows="2" :maxlength="100" :disabled="isView" v-model="standForm.rightExplain" class="textArea" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="义务说明：" prop="dutyExplain">
                            <el-input type="textarea" :rows="2" :maxlength="100" :disabled="isView" v-model="standForm.dutyExplain" class="textArea" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer" >
                <el-button type="primary" plain v-if="!isView" icon="el-icon-success" @click="submitForm('ruleForm')" :disabled="btnShow">保 存</el-button>
                <el-button type="primary" plain icon="el-icon-error" @click="close">取 消</el-button>
            </div> 
        </el-dialog>
    </div>
</template>

<script>

import { newCarSticker,updateCarSticker,carStickerDetails } from '@/api/marketing/carSticker'
import { objectMerge2 } from '@/utils/'
// import NumberOnlyPoint from '@/components//NumberOnlyPoint/index'
import getCityList from '@/components/GetCityList/index'
import { DicOrderCarSticker,DicCartype,DicOrderCarStickerTime } from '@/api/common'
export default {
    name: 'productConfigadd',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            required:false,
            default:'维护增值服务标准定价'
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
        // NumberOnlyPoint,
        getCityList
    },
    data() {
        var checkreward = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入每月补贴费用'));
            }else {
                callback();
            }
        };
      return {
        btnShow:false,
        formLabelWidth:'120px',
        optionsCarSticker:[],//车贴类型
        optionsCarType:[],//车辆类型
        optionsCarStickerTime:[],//车贴时效
        standForm:{
            "againApplyFee": '',//再次申请费用
            "carStickerType": "",//车贴类型
            "carType": "",//车类型
            "carVaild": '',//车贴时效
            "cityCode": "",//所属区域编码
            "dutyExplain": "",//义务说明
            "firstApplyFee": '',//首次申请费用
            "fullCityName": "",//所属区域
            "produceName": "",//产品名称
            "reward": '',//奖励  每月补贴
            "rightExplain": "",//权利说明
            isUser:'0'
        },
        newrules: {
            fullCityName:{required: true, message:"请选择车贴所属区域", trigger: 'blur'},
            produceName:{required: true, message:"请输入产品名称", trigger: 'change'},
            carStickerType:{required: true, message:"请选择车贴类型", trigger: 'change'},
            carType:{required: true, message:"请选择车辆类型", trigger: 'change'},
            carVaild:{required: true, message:"请选择车贴时效", trigger: 'change'},
            reward:{required: true,validator: checkreward, trigger: 'change'},
            firstApplyFee:{required: true, message:"请输入首次申请费用", trigger: 'change'},
            againApplyFee:{required: true, message:"请输入再次申请费用", trigger: 'change'},
            rightExplain:{required: true, message:"请输入权利说明", trigger: 'change'},
            dutyExplain:{required: true, message:"请输入义务说明", trigger: 'change'},
        },
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
        getStr(d){
            this.standForm.fullCityName = (!d.province&&!d.city&&!d.area) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}`.trim();
            this.standForm.cityCode = d.city.code;
        },
        getValue(obj){
            return obj ? obj.value:'';
        },
        reviseForms(){
            if(this.isModify || this.isView){
                carStickerDetails(this.changeForm.id).then(res => {
                    this.$set(this.standForm, 'isUser','0');
                    this.standForm = objectMerge2(res.data);
                    this.standForm.carVaild = this.standForm.carVaild + '';
                })
                // this.standForm = objectMerge2(this.changeForm);
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
                if(!this.isModify && !this.isView){
                    this.$refs.area.clearData();
                }
            }
        },
        //初始化选择项数据
        init(){
            Promise.all([DicOrderCarSticker(),DicCartype(),DicOrderCarStickerTime()]).then(resArr => {
                this.optionsCarSticker = resArr[0].data;
                this.optionsCarType = resArr[1].data;
                this.optionsCarStickerTime = resArr[2].data;
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.btnShow = true;
                    let forms = objectMerge2(this.standForm);
                    // console.log(forms)
                    let standarFunction = this.isModify? updateCarSticker(forms) : newCarSticker(forms);
                    standarFunction.then(res =>{
                        this.$message({
                            type: 'success',
                            message: '维护增值服务标准定价成功！'
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
                if(i == 'isUser'){
                    this.standForm[i] = '0'
                }else{
                    this.standForm[i] = ''
                }
            } 
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .productConfigadd{
    }
</style>
