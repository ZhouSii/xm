<template>
    <el-dialog
    :title="currentTitle"
    class="batchImport"
    top="15vh"
    :modal="false"
    :visible="dialogVisible"
    custom-class="add-review"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    v-loading="loading"
    width="30%"
    :before-close="close">
        <div class="ifcancel">
            <el-form :model="form" :rules="rules" ref="ruleForm" :label-width="formLabelWidth" label-position="right">
                <el-form-item label="出发区/县：" prop="startAreaCode">
                    <getCityList class="chooseItem" @returnStr="getAreaDelegate" :isArea="true" v-model="form.startAreaCode" ref="areaDelegate"></getCityList>
                </el-form-item>
                <el-form-item label="导入数据：" prop="fileName" v-if="exportType == 'batchImport'">
                    <el-input v-model="form.fileName" clearable>
                        <el-button slot="prepend" title="点击下载导入模板" icon="el-icon-download" @click="downloading"></el-button>
                        <label class="file-box" slot="append" for="file">
                            <span class="look-file">浏览</span>
                            <input id="file" ref="inputer" type="file" class="file-input Js_file-input" @change="getfileName">
                        </label>
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" plain icon="el-icon-success" v-if="exportType == 'batchImport'" @click="submitForm('ruleForm')">确认</el-button>
            <el-button type="primary" plain icon="el-icon-success" v-else @click="submitForm2('ruleForm')">确认</el-button>
            <el-button type="primary" plain icon="el-icon-error" @click="close">取消</el-button>
        </div>
    </el-dialog>
</template>

<script type="text/javascript">
import getCityList from '@/components/GetCityList/chinaMap'
import { getAreaAgent } from '@/api/dispatch/areaAgentSystem.js'
import { importAgency,exportAgencyOrPlatformExcel } from '@/api/server/lingdan/otherService.js'
import { objectMerge2 } from '@/utils/';
    export default{
        name:'batchImport',
        components:{
            getCityList,
        },
        props:{
            dialogVisible:{
                type:Boolean,
                default:false
            },
            currentTitle:{
                type:String,
                default:'请选择导入定价的出发区/县'
            },
            exportType:{
                type:String,
            }
        },
        watch:{
            dialogVisible(newVal,oldVal){
                if(newVal){
                    // this.init();
                }
            },
        },
        data(){
            return{
                formLabelWidth:'120px',
                loading:true,
                form:{
                    agencyName:'',//区代名称
                    fileName :'',//
                    agencyId:'',//区代ID
                    platformType:'3',//平台类型(2：区代，3：平台)
                    agencyArea:'',//区代所在地(区代必填)
                    startArea:'',//开始区域名称
                    startProvince:'',//开始省名称
                    startCity:'',//开始市名称
                    startAreaCode:'',//开始区域code
                },
                optionseAreaAgency:[],
                rules:{
                    startAreaCode:{ required: true, message: '请选择区代所在地', trigger: 'change' },
                    fileName:{ required: true, message: '请选择导入文件', trigger: 'change' },
                },
                btnShow:false,
            }
        },
        mounted(){
            this.init();
        },
        methods: {
            getfileName(val){
                this.form.fileName = val.path[0].files[0].name;
            },
            getAreaDelegate(d){
                this.form.agencyArea = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
                this.form.startAreaCode = d.area ? d.area.code : '';
                this.form.startArea = d.area ? d.area.name : '';
                this.form.startCity = d.city ? d.city.name : '';
                this.form.startProvince = d.province ? d.province.name : '';
            },
            getValue(obj){
                return obj ? obj.value:'';
            },
            init(){
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.btnShow = true;
                        let inputFile = this.$refs.inputer;
                        var formdata = new FormData();
                        formdata.append('excelFile',inputFile.files[0]);
                        formdata.append('platformType',this.form.platformType);
                        formdata.append('agencyArea',this.form.agencyArea);
                        formdata.append('startArea',this.form.startArea);
                        formdata.append('startProvince',this.form.startProvince);
                        formdata.append('startCity',this.form.startCity);
                        formdata.append('startAreaCode',this.form.startAreaCode);
                        importAgency(formdata).then(res =>{
                            this.$message({
                                type: 'success',
                                message: '操作成功！'
                            })
                            this.close();
                        }).catch(err => {
                            this.$message({
                                type: 'warning',
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
            submitForm2(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let standFrom = objectMerge2(this.form);
                        // console.log('standFromstandFrom',standFrom)
                        this.$message.info('正在导出中...');    
                        exportAgencyOrPlatformExcel(standFrom).then(res => {
                            var blob = new Blob([res]);
                            let href =  window.URL.createObjectURL(blob);
                            var NewDom = document.createElement("a");
                            NewDom.setAttribute('href',href);
                            NewDom.setAttribute('target', '_blank');
                            NewDom.setAttribute('download', standFrom.agencyArea +'平台标准定价.xlsx');
                            document.body.appendChild(NewDom);
                            NewDom.click();
                            document.body.removeChild(NewDom)
                            this.close();
                        }).catch(err => {
                            this.$message({
                                type: 'warning',
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
            close(done) {
                this.$refs.ruleForm.resetFields();
                this.$emit('update:dialogVisible', false);
                if(this.exportType == 'batchImport'){
                    this.$refs.inputer.value  = '';
                }
                this.$refs.areaDelegate.clearData();
                this.$emit('close');
                if (typeof done === 'function') {
                    done()
                }
            },
            downloading(){
                this.$emit('downloading')
            }
        }
    }
</script>

<style type="text/css" lang="scss">
    .batchImport{
        .el-form{
            padding: 0 20px;
             .el-form-item__content{
                .el-select{
                    width: 100%;
                }
                .el-input-group__append{
                    background: #fff;
                    &:hover{
                        background: #0588c3;
                        .look-file{
                            color: #fff;
                        }
                    }
                }
                .look-file{
                    cursor: pointer;
                    color: #0588c3;
                }
                .Js_file-input{
                    display: none;
                }
            }
        }
    }
</style>

