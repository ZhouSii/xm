<template>
    <div class="newAgencyArea commoncss">
        <el-dialog :title='formtitle' :close-on-click-modal="false" width="30%"  v-el-drag-dialog top="15vh" :visible="dialogFormVisible" @close="close">
            <el-form   :model="standForm" :rules="newrules" label-position="right"  ref="ruleForm"  :label-width="formLabelWidth">
                <el-form-item label="区代所在地：" prop="startAreaCode">
                    <getCityList class="chooseItem" @returnStr="getAreaDelegate" :isArea="true" v-model="standForm.startAreaCode" ref="areaDelegate"></getCityList>
                </el-form-item>
                <el-form-item label="区代：" prop="agencyIds">
                    <el-select v-model="standForm.agencyIds" filterable  multiple collapse-tags @focus="getAreaAgency" clearable placeholder="请选择">
                        <el-option
                        v-for="item in optionseAreaAgency"
                        :key="item.id"
                        :label="item.agencyName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" plain  icon="el-icon-success" @click="submitForm('ruleForm')" :disabled="btnShow">保 存</el-button>
                <el-button type="primary" plain icon="el-icon-error" @click="close">取 消</el-button>
            </div> 
        </el-dialog>
    </div>
</template>

<script>
import { newAgencyArea } from '@/api/server/lingdan/otherService.js'
import { objectMerge2 } from '@/utils/'
import getCityList from '@/components/GetCityList/chinaMap1'
import { getAreaAgent } from '@/api/dispatch/areaAgentSystem.js'

export default {
    name: 'newAgencyArea',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            required:false,
            default:''
        },
    },
    components:{
        getCityList
    },
    data() {
      return {
        btnShow:false,
        formLabelWidth:'100px',
        standForm:{
            startAreaCode:'',
            agencyId:'',
            agencyIds:[],
        },
        newrules: {
            startAreaCode:{required: true, message: '请选择出发区/县', trigger: 'change'},
            agencyId:{required: true, message: '请选择区代', trigger: 'change'},
            agencyIds:{type: 'array', required: true, message: '请选择区代', trigger: 'change'},
        },
        optionseAreaAgency:[],
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
            // this.form.agencyArea = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
            this.standForm.startAreaCode = d.area ? d.area.code : '';
            this.standForm.agencyId = '';
        },
        getValue(obj){
            return obj ? obj.value:'';
        },
        getAreaAgency(){
            this.optionseAreaAgency = [];
            if(this.standForm.startAreaCode == ''){
                return  this.$message({
                    type: 'warning',
                    message: '请先选择区代所在地！'
                })
            }else{
                getAreaAgent(this.standForm.startAreaCode).then(res => {
                    setTimeout(() => {
                        this.optionseAreaAgency = res.data;
                        if(this.optionseAreaAgency == [] && this.standForm.areaCode){
                            this.standForm.agencyId = '';
                        }
                    }, 200);
                }).catch(err => {
                    this.standForm.agencyId = '';
                })
            }
        },
        reviseForms(){
            if(this.isModify){
                this.standForm = objectMerge2(this.changeForm);
                // this.$set(this.standForm, 'timeVal', [this.changeForm.rewardStartDate,this.changeForm.rewardEndDate])
            }else{
                this.clearForms();
            }
        },
        close(){
            if(this.dialogFormVisible){
                this.$emit('update:dialogFormVisible',false);
                this.$refs.ruleForm.resetFields();
                this.$refs.areaDelegate.clearData();
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
                    this.btnShow = true;
                    let forms = objectMerge2(this.standForm);
                    // console.log(forms)
                    newAgencyArea(forms).then(res =>{
                        this.$message({
                            type: 'success',
                            message: '新增增值服务标准定价区代成功!'
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
    },
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .newAgencyArea{
    }
</style>
