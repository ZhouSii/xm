<template>
     <div class="CarBackOPertate commoncss">
        <el-dialog :title="typetitle" :visible="dialogBackOperate" :modal-append-to-body = 'false' :before-close="close" top="5vh" :close-on-click-modal="false" ref="dialog">
        <el-form :model="formAll" ref="formAll">
          <el-row>
            <el-col :span="24">
              <el-form-item label="用户名：" :label-width="formLabelWidth">{{name}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="用户账号：" :label-width="formLabelWidth">{{mobile}}</el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="24">
              <el-form-item label="失败原因：" :label-width="formLabelWidth">{{extractDes}}</el-form-item>
            </el-col>
          </el-row> -->
          <el-row>
            <el-col :span="24">
              <el-form-item label="驳回原因：" :label-width="formLabelWidth" >
                 <el-input clearable v-model="formAll.extractFail" maxlength="8"></el-input>
                  <p class="countNum"><span class="red">{{formAll.extractFail.length}}</span> <span>/ 8</span> </p>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="updataClick" >确 定</el-button>
          <el-button @click="close()" >取 消</el-button>
        </div>
      </el-dialog>
     </div>
</template>
<script>
import { eventBus } from '@/eventBus'
import { parseTime,pickerOptions2 } from '@/utils/'
import { GetextractFailReject } from '@/api/finance/CarCash.js'
export default {
  components: {
  },
  props: {
    params:{
        type:[Object,Array],
    },
    typetitle: {
        type: String,
        default: ''
    },
    /*add新增，edit编辑，view查看*/
    editType: {
      type: String,
    },
    dialogBackOperate:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      defaultImg:'/static/test.jpg',
      formLabelWidth:'100px',
      pickerOptions2: {shortcuts: pickerOptions2},
      btnsize: 'mini',
      formAll:{
          extractFail:'',
          extractSerial:null,
      },
      name:null,
      mobile:null,
      extractDes:null,
    }
  },
  watch: {
    dialogBackOperate: {
      handler: function(val, oldVal) {
        if (!val) {
        this.$emit('getData');
        this.name = null
        this.mobile = null
        this.extractDes = null
        this.formAll = {
          extractFail:'',
          extractSerial:null,
        }
        }
        else{
        this.openDialog();
        this.btnStatus = true
        }
      }
    },
  },
  methods: {
    openDialog: function() {
        this.name = this.params[0].name
        this.mobile = this.params[0].mobile
        this.extractDes = this.params[0].extractDes
        this.formAll.extractSerial =  this.params[0].extractSerial
    },
    close: function() {
        this.$emit('update:dialogBackOperate', false);
    },
    updataClick(){
    if (this.btnStatus) {
    this.btnStatus = false   
    GetextractFailReject(this.formAll).then(res=>{
        this.$emit('update:dialogBackOperate', false);
        this.$message.success('驳回成功')
    }).catch(err=>{
        this.$emit('update:dialogBackOperate', false);
        this.$message.error(err.errorInfo)
    })
    }
    },
  }
}
</script>
<style lang="scss" >
.CarBackOPertate{
   .el-dialog{
   width:800px!important
   }
   .countNum{
     text-align:right;
     .red{
       color:red
     }
   }
}
</style>
