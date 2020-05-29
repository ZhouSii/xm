<template>
    <el-dialog
    title=""
    class="remake"
    top="35vh"
    :modal="true"
    :visible="dialogVisible"
    custom-class="add-review"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    v-loading="loading"
    v-el-drag-dialog
    width="20%"
    :before-close="close">
        <div class="ifcancel">
            <el-form :model="form" :rules="rules" ref="ruleForm" :label-width="formLabelWidth" label-position="right">
                <el-form-item prop="belongCity">
                    <getCityList class="chooseItem" @returnStr="getStr" v-model="form.belongCity" ref="area"></getCityList>
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" plain icon="el-icon-success" @click="submitForm('ruleForm')">确认</el-button>
            <el-button type="primary" plain icon="el-icon-error" @click="resetForm('ruleForm')">取消</el-button>
        </div>
    </el-dialog>
</template>

<script type="text/javascript">
import getCityList from '@/components/GetCityList/index'
import { objectMerge2 } from '@/utils/'
import { newRiskManageSetting } from '@/api/company/riskManagement.js'

    export default{
        name:'copyCity',
        components:{
            getCityList
        },
        props:{
            dialogVisible:{
                type:Boolean,
                default:false
            },
            currentTableData:{
                type:Array,
                required:true
            },

        },
        watch:{
            dialogVisible(newVal,oldVal){
                // console.log('newVal',newVal)
                if(newVal){
                    this.init();
                }
            },
        },
        data(){
            return{
                formLabelWidth:'0',
                loading:true,
                form:{
                    belongCity:'',
                    city:'',
                    province:''
                },
                rules:{
                    belongCity: [
                        { required: true, message: '请选择城市', trigger: 'change' },
                    ],
                },
            }
        },
        methods: {
            getStr(d){
                // console.log('data:',d)
                // this.form.areaCodeName = (!d.province&&!d.city&&!d.area) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}`.trim();
                if(d.city){
                    this.form.belongCity = d.city.code;
                }else{
                    this.form.belongCity = d.province.code;
                }
                this.form.province = d.province ?  d.province.name : '';
                this.form.city = d.city ?  d.city.name : '';
            },
            getValue(obj){
                return obj ? obj.value:'';
            },
            init(){
                // console.log(this.currentTableData)
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let standForm = objectMerge2(this.currentTableData);
                        standForm.forEach(el => {
                            el.belongCity = this.form.belongCity;
                            el.city = this.form.city;
                            el.province = this.form.province;
                        })
                        newRiskManageSetting(standForm).then(res=>{
                            this.$message({
                                type: 'success',
                                message: '操作成功！'
                            })
                            this.close();
                        }).catch(err => {
                            this.$message({
                                type: 'info',
                                message: '操作失败，原因：' + (err.text ? err.text : err.errorInfo)
                            })
                        })
                    } else {
                        return  this.$message({
                            type: 'warning',
                            message: '请填写完整数据'
                        })
                    }
                });
            },
            resetForm(formName) {
                this.close();
            },
            close(done) {
                this.$refs.ruleForm.resetFields();
                this.$emit('update:dialogVisible', false);
                this.$emit('close');
                if (typeof done === 'function') {
                    done()
                }
                this.$refs.area.clearData();
            },
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .remake{
        .el-form{
            padding: 0 20px;
        }
    }
</style>

