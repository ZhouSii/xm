<template>
    <div class="commoncss addDictionary">
        <el-dialog :title="formtitle" :close-on-click-modal="false" :visible="dialogAddDic" @close="close" v-loading="loading">
            <el-form :inline="true"  ref="ruleForm"  label-position="right">
                <el-form-item label="上级分类：" :label-width="formLabelWidth" required>
                    <el-select v-model="pidValue" placeholder="请选择" @change="currentValue" v-if="!isModify">
                        <el-option
                            v-for="item in optionsUptree"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-input v-model="reviseForm.pidNameVal" auto-complete="off" :disabled="true" v-else></el-input>
                </el-form-item>
                <div v-for="(form,idx) in AddDictionaryForm" :key="idx" class="moreInfo" v-if="!isModify"> 
                    <el-form-item label="编码：" class="codeStyle" label-width="80px" required>
                        <el-input v-model="form.code" auto-complete="off" :disabled="true" ></el-input>
                    </el-form-item>
                    <el-form-item label="分类名称：" required>
                        <el-input v-model="form.name" auto-complete="off" placeholder="少于20字" maxlength="20" ></el-input>
                    </el-form-item>
                    <el-form-item label="数据值：" >
                        <el-input v-model="form.value" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="描述：" class="textArea" label-width="80px">
                        <el-input
                        type="textarea"
                        :maxlength="maxlengthNum"
                        :autosize="{ minRows: 3, maxRows: 5}"
                        v-model="form.remark">
                        </el-input>
                        <p class="countNum">
                             <span class="">{{form.remark.length}}</span> <span>/ {{maxlengthNum}}</span> 
                        </p>
                    </el-form-item>
                        <span  @click="addItem" class="addItem" v-if="idx == 0">
                        </span>
                        <span  @click="reduceItem(idx)" class="reduceItem" v-else>
                        </span>
                </div>
                <div class="moreInfo" v-else>
                    <el-form-item label="编码" label-width="80px" required>
                        <el-input v-model="reviseForm.code" auto-complete="off" :disabled="true" ></el-input>
                    </el-form-item>
                    <el-form-item label="分类名称" required>
                        <el-input v-model="reviseForm.name" auto-complete="off" placeholder="少于20字" maxlength="20" ></el-input>
                    </el-form-item>
                    <el-form-item label="数据值" >
                        <el-input v-model="reviseForm.value" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="描述" class="textArea" label-width="80px">
                        <el-input
                        type="textarea"
                        :maxlength="maxlengthNum"
                        :autosize="{ minRows: 3, maxRows: 5}"
                        v-model="reviseForm.remark">
                        </el-input>
                        <p class="countNum">
                             <span class="">{{reviseForm.remark.length}}</span> <span>/ {{maxlengthNum}}</span> 
                        </p>
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('ruleForm')" :disabled="btnShow">确 定</el-button>
                <el-button @click="close">取 消</el-button>
            </div>
        </el-dialog>    
    </div>
</template>

<script>
import { data_CreatCode,data_AddForms,data_ChangeForms,data_CreatCode_top } from '@/api/company/data_dic.js'
export default {
    name:'AddDictionary',
    props:{
        dialogAddDic:{
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
        pid:{
            type:String,
            default:null
        },
        pidName:{
            type:String,
            default:''
        },
        reviseForm:{
            type:Object
        }
    },
    components:{

    },
    data(){
        return {
            maxlengthNum:200,
            formLabelWidth:'110px',
            loading:false,
            pidValue:'',//pid
            nowcode:'',//当前编码
            btnShow:false,
            AddDictionaryForm:[
                {
                    code: '',
                    name: '',
                    pid: '',
                    remark: '',
                    value: ''
                }
            ],
            forms: [{
                code: '',
                name: '',
                pid: '',
                remark: '',
                value: ''
            }],
            optionsUptree:[
                {
                    value:null,
                    label:'无'
                }
            ],
        }
    },
    watch:{
        dialogAddDic:{
            handler(newVal,oldVal){
                if(newVal && !this.isModify){
                    this.init()
                    this.currentValue(this.pid)
                }else{
                    this.reviseForm.pidNameVal = this.reviseForm.pidName ? this.reviseForm.pidName : '无' ;
                }
            },  
            deep:true
        }
    },
    mounted(){
    },
    methods:{
        init(){
            this.optionsUptree=[
                {
                    value:null,
                    label:'无'
                }
            ];
            if(this.pid != this.optionsUptree[0].value){
                let upItem = {
                    value:this.pid,
                    label:this.pidName
                }
                this.optionsUptree.push(upItem);
            }
            this.pidValue = this.pid ? this.pid : null;
        },
         //添加最高层获取code
        currentValue(val){
            if(!val){
                data_CreatCode_top().then(res => {
                    this.AddDictionaryForm[0].code = res.data;
                    this.nowcode = res.data;
                })
            }else{
                data_CreatCode(this.pid).then(res => {
                    this.AddDictionaryForm[0].code = res.data;
                    this.nowcode = res.data;
                })
            }
            this. AddDictionaryForm=[
                {
                    code: '',
                    name: '',
                    pid: '',
                    remark: '',
                    value: ''
                }
            ];
        },
         //添加子节点新增
        addItem(){
            // 业务逻辑判断
            let strCode = this.nowcode.slice(2);
            let strCodenub = strCode *1 + 1;
            let len = String(strCodenub).length;
            let str = this.nowcode.slice(0,-len);
            let newCode = str + strCodenub;
            this.nowcode = newCode;
            this.AddDictionaryForm.push({
                code: newCode,
                name: '',
                pid: this.pid,
                remark: '',
                value: ''
            }); 
        },
        //删除子节点新增
        reduceItem(idx){
            this.AddDictionaryForm.splice(idx,1);
        },
        submitForm() {
            this.btnShow = true;
            let required = false;
            if(this.isModify){
                if(!this.reviseForm.name){
                    this.$message({
                        type: 'warning',
                        message: '请填写分类名称!'
                    })
                    required = true;
                }
            }else{
                this.AddDictionaryForm.map((item)=>{
                    item.pid = this.pidValue;
                    if(!item.name){
                        this.$message({
                            type: 'warning',
                            message: '请填写分类名称!'
                        })
                        required = true;
                    }
                })
            }
            if(required){
                return false
            }else{
                let config = this.isModify ? '确定要修改该条数据吗？' : '确定要新增该条数据吗？';
                let configFunction;
               
                this.$confirm(config, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then( ()=>{
                    if(this.isModify){
                        configFunction = data_ChangeForms(this.reviseForm);
                    }else{
                        configFunction = data_AddForms(this.AddDictionaryForm);
                    }
                    configFunction.then(res=>{
                        this.$message.success('新增数据成功！')
                        this.btnShow = false;
                        this.close();

                    }).catch(err => {
                        this.$message.error('操作失败，失败原因：',err.errorInfo)
                        this.btnShow = false;
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })
            }
        },  
        close(){
            this.$emit('update:dialogAddDic', false);
            this.$emit('close');
            this. AddDictionaryForm=[
                {
                    code: '',
                    name: '',
                    pid: '',
                    remark: '',
                    value: ''
                }
            ];
            if (typeof done === 'function') {
                done()
            }
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    .addDictionary{
        .moreInfo{
            border:1px solid #e6e6e6;
            padding:16px 0;
            position: relative;
            margin: 0 30px 0 0;
            margin-bottom: 10px;
            &>.el-form-item:nth-child(2n-1){
                .el-form-item__content{
                    width: 100px;
                }
            }
            &>.el-form-item:nth-child(2){
                .el-form-item__content{
                    width: 348px;
                }
            }
           
         }
        .el-dialog .el-dialog__body .addItem,.el-dialog .el-dialog__body .reduceItem{
             top: 0;
             left: 102%
        }

        .el-dialog .el-dialog__body .el-form .textArea .el-form-item__content {
            min-width: 86%;
        } 
    }
</style>
