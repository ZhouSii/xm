<template>
    <div class="commoncss addDictionary">
        <el-dialog :title="formtitle" :close-on-click-modal="false" :visible="dialogAddExtra" @close="close" v-loading="loading">
            <el-form :inline="true"  ref="ruleForm"  label-position="right" size="mini">
                <el-form-item label="服务一级分类:" :label-width="formLabelWidth" required>
                    <el-radio-group v-model="classfyradio" >
                        <el-radio   v-for="(obj,key) in formclassfy" :label="obj.code" :key='key' >{{obj.name}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <div v-for="(form,idx) in AddDictionaryForm" :key="idx" class="moreInfo" v-if="!isModify"> 
                    <!-- <el-form-item label="编码" label-width="80px" required>
                        <el-input v-model="form.code" auto-complete="off" :disabled="true" ></el-input>
                    </el-form-item>
                    <el-form-item label="分类名称" required>
                        <el-input v-model="form.name" auto-complete="off" placeholder="少于20字" maxlength="20" ></el-input>
                    </el-form-item>
                    <el-form-item label="数据值" >
                        <el-input v-model="form.value" auto-complete="off" v-numberOnly maxlength="6" ></el-input>
                    </el-form-item>
                    <el-form-item label="描述" class="textArea" label-width="80px">
                        <el-input
                        type="textarea"
                        :maxlength="maxlengthNum"
                        :autosize="{ minRows: 3, maxRows: 5}"
                        v-model="form.remark">
                        </el-input>
                        <p class="countNum">
                             <span class="">{{form.remark.length}}</span> <span>/ {{maxlengthNum}}</span> 
                        </p>
                    </el-form-item> -->
                        <span  @click="addItem" class="addItem" v-if="idx == 0">
                        </span>
                        <span  @click="reduceItem(idx)" class="reduceItem" v-else>
                        </span>
                </div>
                <div class="moreInfo" v-else>
                    <!-- <el-form-item label="编码" label-width="80px" required>
                        <el-input v-model="reviseForm.code" auto-complete="off" :disabled="true" ></el-input>
                    </el-form-item>
                    <el-form-item label="分类名称" required>
                        <el-input v-model="reviseForm.name" auto-complete="off" placeholder="少于20字" maxlength="20" ></el-input>
                    </el-form-item>
                    <el-form-item label="数据值" >
                        <el-input v-model="reviseForm.value" auto-complete="off" v-numberOnly maxlength="6" ></el-input>
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
                    </el-form-item> -->
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
import { DicServiceType } from '@/api/common.js'

export default {
    name:'AddExtra',
    props:{
        dialogAddExtra:{
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
            maxlengthNum:200,
            formLabelWidth:'110px',
            loading:false,
            btnShow:false,
            AddExtraForm:[
                {
                    extraDes: "",
                    extraName: "",
                    extraPrice: "",
                    isFree: "0",
                    serivceCode: "",
                }
            ],
            forms: [{
                extraDes: "",
                extraName: "",
                extraPrice: "",
                isFree: "0",
                serivceCode: "",
            }],
            optionsService:[
            ],
        }
    },
    watch:{
        dialogAddExtra:{
            handler(newVal,oldVal){
              
            },  
            deep:true
        }
    },
    mounted(){
    },
    methods:{
        init(){
            DicServiceType().then(res => {
                this.optionsService = res.data;
            })
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
                console.log(this.isModify,this.reviseForm.name)
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
            this.$emit('update:dialogAddExtra', false);
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
    
</style>
