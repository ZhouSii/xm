<template>
     <div class="bailManagePuls commoncss">
        <el-dialog :title="typetitle" :visible="dialogPlusNotes" :modal-append-to-body = 'false' :before-close="close" top="5vh" :close-on-click-modal="false" ref="dialog">
        <el-form :model="formAll" ref="formAll" :rules="rulesForm">
        <el-row>
            <el-col :span="24">
                <el-form-item label="账户/公司名称：" :label-width="formLabelWidth">
                    {{companyName}}
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-form-item label="保证金金额：" prop="collateral" :label-width="formLabelWidth">
                     <el-input clearable v-model="formAll.collateral" class='collInput'></el-input>元
                </el-form-item>

            </el-col>
        </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="add_data" >确 定</el-button>
          <el-button @click="close()" >取 消</el-button>
        </div>
      </el-dialog>
     </div>
</template>
<script>
import { eventBus } from '@/eventBus'
import { parseTime,pickerOptions2 } from '@/utils/'
import { agencyRechargeId } from '@/api/finance/bailManage.js'
import Pager from '@/components/Pagination/index'
export default {
  components: {
    Pager
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
    dialogPlusNotes:{
      type:Boolean,
      default:false
    },
    statusType: {
        type: String,
        default: null
    },
  },
  data() {
    const collateralValidator = (rule, val, cb) => {
    let reg = /^[0-9]+(.[0-9]{1,2})?$/;
      if (!val) {
        cb(new Error("不能为空"));
      } else if (!reg.test(val)) {
        cb(new Error("最多保留2位小数"));
      } else {
        cb();
      }
    }
    return {
      defaultImg:'/static/test.jpg',
      formLabelWidth:'350px',
      pickerOptions2: {shortcuts: pickerOptions2},
      btnsize: 'mini',
      formAll:{
          collateral:null,
      },
      companyName:'',
      accountId:'',
      btnStatus:true,
      rulesForm: {
        collateral: { validator: collateralValidator, trigger: "change", required: true },
      },

    }
  },
  watch: {
    dialogPlusNotes: {
      handler: function(val, oldVal) {
        if (!val) {
        this.$emit('getData');
        this.formAll = {
            collateral:null,
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
        this.companyName = this.params[0].companyName
        this.accountId = this.params[0].accountId
    },
    close: function() {
        this.$emit('update:dialogPlusNotes', false);
    },
    add_data(){
        this.$refs["formAll"].validate(valid => {
        if (valid) {
        if (this.btnStatus) {
        this.btnStatus = false
        agencyRechargeId(this.formAll,this.statusType,this.accountId).then(res=>{
           this.$emit('update:dialogPlusNotes', false);
           this.$message.success('代客充值成功')
           }).catch(err=>{
           this.$message.error(err.errorInfo)
           this.$emit('update:dialogPlusNotes', false);
         })
    }
    }})
    }
  }
}
</script>
<style lang="scss" >
.bailManagePuls{
    .el-dialog{
        min-height: 200px;
        .collInput{
            width: 220px;
            margin-right: 10px;
        }
    }
}
</style>
