<template>
     <div class="appManagecread commoncss">
      <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()" size='mini'><span :class="editType=='view'?'BtnInfo':''">{{btntext}}</span ></el-button>
      <el-dialog  :visible="dialogFormVisible_add" :before-close="change" :title="btntitle">
        <el-form ref="formData"  :rules="rulesForm" :model="formData">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="app名称 ：" :label-width="formLabelWidth" prop="appName">
                        <el-input v-model="formData.appName" placeholder="" :disabled="editType=='view'||disabledFlag=='1'"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="app类型 ：" :label-width="formLabelWidth" prop="appType">
               <el-select  v-model="formData.appType" clearable placeholder="请选择" :disabled="editType=='view'||editType=='edit'||disabledFlag=='1'">
                          <el-option
                             v-for="item in appTypeList"
                              :key="item.code"
                              :label="item.name"
                              :value="item.code"
                               :disabled="item.disabled">
                         </el-option>
                 </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="app版本号 ：" :label-width="formLabelWidth" prop="appVersion">
                         <el-input v-model="formData.appVersion" placeholder=""  :disabled="editType=='view'||disabledFlag=='1'" maxlength="4"></el-input>   
                    </el-form-item>
                </el-col>    
                <el-col :span="12">
                    <el-form-item label="版本号名称 ：" :label-width="formLabelWidth" prop="appVersionName">
                         <el-input v-model="formData.appVersionName" placeholder="例如:1.0.0.0"  :disabled="editType=='view'||disabledFlag=='1'"></el-input>   
                    </el-form-item>
                </el-col> 
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="版本发布时间 ：" :label-width="formLabelWidth" prop="versionDate">
                         <el-date-picker v-model="formData.versionDate"
                                :disabled="editType=='view'||disabledFlag=='1'"
                                type="datetime" 
                                value-format="timestamp"
                                default-time="00:00:00"
                                placeholder="选择日期">
                         </el-date-picker>
                    </el-form-item>
                </el-col> 
                <el-col :span="12">
                    <el-form-item label="是否强制更新 ：" :label-width="formLabelWidth" prop="versionDate">
                        <el-radio v-model="formData.isForceUpdates" label="0" :disabled="editType=='view'" @change="changeRadio">不强制更新</el-radio>
                        <el-radio v-model="formData.isForceUpdates" label="1" :disabled="editType=='view'"  @change="changeRadio">强制更新</el-radio>
                    </el-form-item>
                </el-col> 
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="更新内容 ：" :label-width="formLabelWidth" class="textArea" prop="remark">
                                <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="1-200间的字符" 
                                    maxlength="200"
                                    v-model="formData.remark"
                                    :disabled="editType=='view'||disabledFlag=='1'"
                                    clearable>
                                </el-input>
                              <p class="countNum">
                             <span class="">{{formData.remark.length}}</span> <span>/ {{maxlengthNum}}</span> 
                        </p>
                    </el-form-item>
                </el-col> 
            </el-row>
            <el-row>
                <el-col :span="24" v-if="!formData.appType||formData.appType=='0'||formData.appType=='1'">
                    <el-form-item label="app下载地址 ：" :label-width="formLabelWidth" prop="appDownloadUrl">
                        <a :href="formData.appDownloadUrl" v-if="editType=='view'" class="urlapk" target="_blank">{{formData.appDownloadUrl}}</a>
                         <upload class="licensePicture" tip="（上传速度较慢，请等一会儿）" v-model="formData.appDownloadUrl" :apkurl="formData.appDownloadUrl" v-else :disabled="disabledFlag=='1'"/>
                    </el-form-item>
                </el-col>   
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="add_data" v-if="editType=='add'">确 定</el-button>
          <el-button type="primary" @click="edit_data" v-if="editType=='edit'">确 定</el-button>
          <el-button @click="close()" type="primary">关 闭</el-button>
        </div>
      </el-dialog> 
      </div>
</template>
<script>
import {data_get_aflcAppDownload_create,data_get_aflcAppDownload_update} from '@/api/company/appManage.js'
import { eventBus } from '@/eventBus'
import axios from 'axios'
import Upload from '@/components/Upload/uploadApk'
export default {
  components:{
      Upload
  },
  props:{
    params:{
      type:[Object,String,Array,Number],
    },
    value:{
      type: String,
      default:''
    },
    btntype: {
      type: String,
      default: ''
    },
    btntext: {
      type: String,
      default: ''
    },
    btntitle: {
    type: String,
    default: ''
    },
    icon:{
      type: String,
      default: ''
    },
    plain:{
      type: Boolean,
      default: false
    },
    /*add新增，edit编辑，view查看*/
    editType: {
      type: String,
    },    
    paramsView:{
      type:Object
    }
  },
  data(){
        // app名称校验 
        const appNameValidator = (rule,val,cb)=>{
            if(!val){
            cb(new Error('app名称不能为空'))
            }
            else{
                cb()
            }
        }     
        // app下载地址校验 
        const appDownloadUrlValidator = (rule,val,cb)=>{
            if(!val){
            cb(new Error('app下载地址不能为空'))
            }
            else{
                cb()
            }
        }   
        // app类型校验 
        const appTypeValidator = (rule,val,cb)=>{
            if(!val){
            cb(new Error('app类型不能为空'))
            }
            else{
                cb()
            }
        } 
        // app版本号校验 
        const appVersionValidator = (rule,val,cb)=>{
            let reg = /^([1-9]\d*|[0]{1,1})$/
            if(!val){
            cb(new Error('app版本号不能为空'))
            }
            else if(!(reg.test(val))){
            cb(new Error('app版本号必须是正整数'))
            }
            else{
                cb()
            }
        } 
        // 版本号名称校验 
        const appVersionNameValidator = (rule,val,cb)=>{
            if(!val){
            cb(new Error('版本号名称不能为空'))
            }
            else{
                cb()
            }
        }   
        // 版本发布时间校验 
        const versionDateValidator = (rule,val,cb)=>{
            if(!val){
            cb(new Error('版本发布时间不能为空'))
            }
            else{
                cb()
            }
        }   
        // 更新内容校验 
        const remarkValidator = (rule,val,cb)=>{
            if(!val){
            cb(new Error('更新内容不能为空'))
            }
            else{
                cb()
            }
        }                   
        // 是否强制更新检验
        const isForceUpdatesValidator = (rule,val,cb)=>{
            if(!val){
            cb(new Error('是否强制更新不能为空'))
            }
            else{
                cb()
            }
        }        

        return{
        RadioFlag:'0',
        disabledFlag:'0',
        maxlengthNum:200,
        dialogFormVisible_add: false,
        formLabelWidth:'120px',
        formData:{
        appName:'',
        appDownloadUrl:'',
        appType:'',
        appVersion:'',
        appVersionName:'',
        versionDate:'',
        remark:'',
        isForceUpdates:'',
        },
        appTypeList:[{code:'0',name:'安卓车主'},{code:'1',name:'安卓货主'},{code:'2',name:'IOS车主'},{code:'3',name:'IOS货主'}],
        rulesForm:{
            appName:{validator:appNameValidator, trigger:'change',required:true,},
            appDownloadUrl:{validator:appDownloadUrlValidator, trigger:'change',required:true,},
            appType:{validator:appTypeValidator, trigger:'change',required:true,},
            appVersion:{validator:appVersionValidator, trigger:'change',required:true,},
            appVersionName:{validator:appVersionNameValidator, trigger:'change',required:true,},
            versionDate:{validator:versionDateValidator, trigger:'change',required:true,},
            remark:{validator:remarkValidator, trigger:'change',required:true,},
            isForceUpdates:{validator:isForceUpdatesValidator, trigger:'change',required:true,}
        }        
        }
  },
  watch:{
   dialogFormVisible_add:{
        handler: function(val, oldVal) {
            if(!val){
                 this.$refs.formData.resetFields()
                 this.formData.appDownloadUrl = ''
                 this.isForceUpdates = ''
                 this.disabledFlag = '0'
            }
        },
    },
  },
  mounted(){
  },
  methods:{
   changeRadio(e){
    if(this.editType=='add'){
     this.disabledFlag = '0'
    }
    else{
        if(this.RadioFlag==e){
        this.disabledFlag = '0'
        }
        else{
        this.disabledFlag = '1'
        }
    }
   },
   openDialog:function(){
       var _this = this
       if(this.editType=='add'){
        this.dialogFormVisible_add = true;
       }
       else if(this.editType=='view'){
            axios.get('/api/aflc-common/common/aflcAppDownload/v1/'+_this.paramsView.id).then(res=> {
                var NewData = res.data.data
                    for (var u in NewData) {
                    if(!NewData[u]){
                        NewData[u]=''
                    }
                    }
                _this.formData = NewData
                })
                .catch(err=>{
                });           
           this.dialogFormVisible_add = true;
       }
       else if(this.editType=='edit'){
                 if(this.params.length == 0 && this.editType !== 'add'){
               this.$message.warning('请选择您要操作的用户');
               return false
          }else if (this.params.length > 1 && this.editType !== 'add') {
                this.$message({
                    message: '每次只能操作单条数据~',
                    type: 'warning'
                })
                this.$emit('getData') 
                return false
          }
          else if(this.params.length == undefined && this.editType !== 'add')
          {
                this.$message.warning('请选择您要操作的用户');
               return false
          }
           else{
            if(this.params[0].usingStatus==0){
            this.$message.info('选中内容被已禁用，不能进行修改操作');
            this.$emit('getData') 
            return
           }
           else{
            axios.get('/api/aflc-common/common/aflcAppDownload/v1/'+_this.params[0].id).then(res=>{
                var NewData = res.data.data
                    for (var u in NewData) {
                    if(!NewData[u]){
                        NewData[u]=''
                    }
                    }
                _this.formData = NewData
                _this.RadioFlag = NewData.isForceUpdates
                })
                .catch(err=> {
                    console.log(err)
                });
          this.dialogFormVisible_add = true
           }
        }
       }
    },
   change:function(){
      this.dialogFormVisible_add = false;
   },
// 新增
   add_data:function(){
   this.$refs['formData'].validate(valid=>{
    if(valid){
        data_get_aflcAppDownload_create(this.formData).then(res=>{
              this.dialogFormVisible_add = false;
              this.$emit('getData');
              this.$message.success('新增成功');
                }).catch(res=>{
              this.$emit('getData');
              this.$message.error('新增失败,'+res.text)
            })
    }})
   },
   edit_data:function(){
   this.$refs['formData'].validate(valid=>{
    if(valid){       
        data_get_aflcAppDownload_update(this.formData).then(res=>{
            this.dialogFormVisible_add = false;
              this.$emit('getData');
              this.$message.success('修改成功');
                }).catch(res=>{
              this.$emit('getData');
              this.$message.error('修改失败,'+res.text)
            })
    }})
    },

// 关闭
   close:function(){
      this.dialogFormVisible_add = false;
       }, 
   },
}
</script>


<style lang="scss">
.appManagecread{
     display: inline-block;
    .el-form-item__content{
        text-align: left;
    }
    .el-date-editor{
        width: 100%;
    }
    .BtnInfo{
    font-weight: bold
    }
    .urlapk{
        color: #66b1ff;
    }
}
</style>
