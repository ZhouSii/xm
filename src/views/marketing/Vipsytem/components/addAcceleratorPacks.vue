<template>
     <div class="addAcceleratorPacks commoncss">
      <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()" size="mini">{{btntext}}</el-button>
      <el-dialog  :visible="dialogFormVisible_add" :before-close="change" :title="btntitle" :closeOnClickModal='false'>
        <el-form :model="formAll" ref="formAll" :rules="rulesForm" :label-width="formLabelWidth">
         <el-row>
         <el-col :span="12">
          <el-form-item label="加速包名称：" prop="quilckpackageName" >
          <el-input  v-model="formAll.quilckpackageName" maxlength="10"></el-input>   
          </el-form-item>
         </el-col>
         <el-col :span="12">
          <el-form-item label="加速倍数：" prop="quilckpackageMultiple" >
          <el-input  v-model="formAll.quilckpackageMultiple"></el-input>   
          </el-form-item>
         </el-col>
         </el-row>
         <el-row >
         <el-col :span="12">
          <el-form-item label="购买金额：" prop="purchasingPrice" >
          <el-input  v-model="formAll.purchasingPrice"></el-input>
          </el-form-item>
         </el-col>
         <el-col :span="12">
          <el-form-item label="页面提示原价：" prop="oriPurchasingPrice" >
          <el-input  v-model="formAll.oriPurchasingPrice"></el-input>   
          </el-form-item>
         </el-col>
         </el-row>
         <el-row >
         <el-col :span="12">
          <el-form-item label="加速天数：" prop="quickDay" >
          <el-input  v-model="formAll.quickDay" v-numberOnly></el-input>   
          </el-form-item>
         </el-col>
         <el-col :span="12">
          <el-form-item label="购买开始日期：" prop="purchasePeriodStart" >
            <el-date-picker
            v-model="formAll.purchasePeriodStart"
            type="datetime"
            value-format="timestamp"
            default-time="00:00:00"
            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
         </el-col>
         </el-row>
         <el-row >
         <el-col :span="12">
          <el-form-item label="购买结束日期：" prop="purchasePeriodEnd" >
            <el-date-picker
            type="datetime"
            v-model="formAll.purchasePeriodEnd"
            value-format="timestamp"
            default-time="23:59:59"
            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
         </el-col>
         </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="AddFrom" v-if="editType=='add'">确 定</el-button>
          <el-button type="primary" @click="EditFrom" v-else>确 定</el-button>
          <el-button @click="close()" >取 消</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import  { aflcQuickpackageSettingsAdd,aflcQuickpackageSettings_id,aflcQuickpackageSettingsEdit } from '@/api/marketing/AcceleratorPacks.js'
export default {
  props: {
    CityCode:{
      type: [String,Number],
      default: ''
    },
    params: {
      type: [Object, String, Array]
    },
    value: {
      type: String,
      default: ''
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
    icon: {
      type: String,
      default: ''
    },
    plain: {
      type: Boolean,
      default: false
    },
    /* add新增，edit编辑，view查看*/
    editType: {
      type: String
    }
  },
  data() {
    const quilckpackageMultipleValidator = (rule, val , cb) => {
      var reg = /^[0-9]+(.[0-9]{1,2})?$/ 
        if(!val){
            cb(new Error('输入不能为空'))
        }
        else if(parseInt(val)<1){
            cb(new Error('输入值需要大于1'))
        }
        else if(!reg.test(val)){
            cb(new Error('保留2位小数'))
        }
        else{
            cb()
        }
    }

    const purchasingPriceValidator = (rule, val, cb) => {
         var reg = /^[0-9]+(.[0-9]{1,2})?$/ 
         if(val==0){
            cb(new Error('请输入大于零的数'))
         }
         else if(!reg.test(val)){
            cb(new Error('最多保留2位小数'))
         }
         else{
             cb()
          }       
    }

    const oriPurchasingPriceValidator = (rule, val, cb) => {
         var reg = /^[0-9]+(.[0-9]{1,2})?$/ 
         if(val==0){
            cb(new Error('请输入大于零的数'))
          }
         else if(!reg.test(val)){
            cb(new Error('保留2位小数'))
         }
         else if(parseFloat(this.formAll.purchasingPrice)>parseFloat(val)){
             cb(new Error('须大于购买金额'))
         }
         else{
             cb()
         }      
    }
    const DayValidator = (rule, val, cb) => {
         var reg = /^[\d]+$/
         if(val==0){
            cb(new Error('请输入大于零的正整数'))
          }
          else if(!reg.test(val)){
            cb(new Error('请输入大于零的正整数'))
          }
          else{
                cb()
          }       
    }
    const purchasePeriodEndValidator = (rule, val, cb) =>{
      let reg = /^[\d]+$/
         if(!val){
            cb(new Error('购买结束日期不能为空'))
          }
          else if(parseInt(val)<parseInt(this.formAll.purchasePeriodStart)){
            cb(new Error('购买结束日期不能小于购买开始日期'))
          }
          else{
            cb()
          }  
    }
    return {
      formLabelWidth:'150px',
      dialogFormVisible_add: false,
      rulesForm:{
       quilckpackageName:{required:true, message:'加速包名称不能为空', trigger:'change'},
       quilckpackageMultiple:{validator: quilckpackageMultipleValidator, trigger:'change',required:true,},
       purchasingPrice:{validator: purchasingPriceValidator, trigger:'change',required:true,},
       oriPurchasingPrice:{validator: oriPurchasingPriceValidator, trigger:'change',required:true,},
       quickDay:{validator: DayValidator, trigger:'change',required:true,},
       purchasePeriodStart:{required:true, message:'购买开始日期不能为空', trigger:'change'},
       purchasePeriodEnd:{validator: purchasePeriodEndValidator, trigger:'change',required:true,},
      },
      formAll:{
      quilckpackageName:null,
      quilckpackageMultiple:null,
      purchasingPrice:null,
      oriPurchasingPrice:null,
      quickDay:null,
      purchasePeriodStart:null,
      purchasePeriodEnd:null,
      cityCode:null,
      }
    }
  },
  watch: {
    dialogFormVisible_add: {
      handler: function(val, oldVal) {
        if (!val) {
          this.$refs.formAll.resetFields()
        }
        else{
        }
      }
    }
  },
  mounted() {
    console.log('data',this.CityCode)
  },
  methods: {
    openDialog: function() {
      if(this.editType=='add'){
      this.dialogFormVisible_add = true
      }
      else if(this.editType=='edit'){
          if(this.params.length == 0){
               this.$message.warning('请选择您要操作的数据');
               return false
          }else if (this.params.length > 1) {
                this.$message({
                    message: '每次只能操作单条数据~',
                    type: 'warning'
                })
                this.$emit('getData')
                return false
          }
          else if(this.params.length == undefined)
          {
              this.$message.warning('请选择您要操作的数据');
               return false
          }
          else{
            this.dialogFormVisible_add = true
            aflcQuickpackageSettings_id(this.params[0].id).then(res=>{
               this.formAll = res.data
            })
          }
      }
    },
    change: function() {
      this.dialogFormVisible_add = false
    },
    close: function() {
      this.dialogFormVisible_add = false
    },
    AddFrom(){
      this.$refs['formAll'].validate((valid)=>{
      if(valid){
      this.formAll.cityCode = this.CityCode
      if(!this.formAll.cityCode){
        this.$message.error('请选择需要新增的所在城市')
      }
      else{
          aflcQuickpackageSettingsAdd(this.formAll).then(res=>{
          this.dialogFormVisible_add = false
          this.$message.success('新增成功')
          this.$emit('getData')
      })
      }
      }else{
      return this.$message({
      type: 'warning',
      message: '请填写正确的完整数据'
      })
      }
      })
    },
    EditFrom(){
      this.$refs['formAll'].validate((valid)=>{
      if(valid){
        this.formAll.cityCode = this.CityCode
      if(!this.formAll.cityCode){
        this.$message.error('请选择需要修改的所在城市')
      }
      else{
      aflcQuickpackageSettingsEdit(this.formAll).then(res=>{
          this.dialogFormVisible_add = false
          this.$message.success('修改成功')
          this.$emit('getData')
      })
      }
      }else{
      return this.$message({
      type: 'warning',
      message: '请填写完整数据'
      })
      }
      })
    }
  }
}
</script>
<style lang="scss" >
    .addAcceleratorPacks{
        display: inline;
        .el-date-editor{
            width: 100%;
        }
}
</style>
