<template>
     <div class="CarCashOpertate commoncss">
        <el-dialog :title="typetitle" :visible="dialogcashOperate" :modal-append-to-body = 'false' :before-close="close" top="5vh" :close-on-click-modal="false" ref="dialog">
        <el-form>
          <el-row>
            <el-col :span="24">
              <el-table ref="multipleTable" style="width: 100%" stripe border height="100%" highlight-current-row :data="formAll"  tooltip-effect="dark">
              <el-table-column  label="序号" prop="" show-overflow-tooltip width="60">
                <template slot-scope="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column  label="流水号" prop="extractSerial"  show-overflow-tooltip></el-table-column>
              <el-table-column  label="申请时间" prop=""  show-overflow-tooltip width="160">
                <template slot-scope="scope">
                       {{scope.row.createTime|parseTime}}
                </template> 
              </el-table-column>
              <el-table-column  label="用户姓名" prop="name"  show-overflow-tooltip width="120"></el-table-column>
              <el-table-column  label="转账金额" prop="extractSum"  show-overflow-tooltip width="100"></el-table-column>
              <el-table-column  label="收款方式" prop="extractWay"  show-overflow-tooltip width="100"></el-table-column>
              <el-table-column  label="收款账号" prop="extractAccount"  show-overflow-tooltip width="280"></el-table-column>
              </el-table>
              <h2 class="carNewinfoH2">转账金额：{{totalExtractSum|totalFilter}}</h2>
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
import { aflcExtractCashId,Getwithdraw } from '@/api/finance/CarCash.js'
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
    dialogcashOperate:{
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
      formAll:[],
      rulesForm: {
      },
      totalExtractSum:0,
    }
  },
  watch: {
    dialogcashOperate: {
      handler: function(val, oldVal) {
        if (!val) {
        this.$emit('getData');
        this.formAll = []
        this.totalExtractSum = 0
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
    this.formAll = this.params
    this.formAll.forEach(item=>{
      this.totalExtractSum +=parseFloat(item.extractSum)
    })
    },
    close: function() {
      this.$emit('update:dialogcashOperate', false);
    },
    updataClick(){
    if (this.btnStatus) {
    this.btnStatus = false   
    let NewArray = []
    this.formAll.forEach((item,i)=>{
        NewArray.push(item.extractSerial)
    })
    Getwithdraw(NewArray).then(res=>{
        this.$emit('update:dialogcashOperate', false);
        this.$message.success('操作成功')
    }).catch(err=>{
        this.$emit('update:dialogcashOperate', false);
        this.$message.error(err.errorInfo)
    })
    }
    },
  },
  filters: {
    // 转账金额总金额
    totalFilter: function (value) {
      const arr = value.toString().split('.')
      if (arr.length === 1) {
        return `${value}.00`;
      } else if (arr.length === 2 && arr[1].length === 1) {
        return `${value}0`;
      } else {
        return value;
      }
    }
  }
}
</script>
<style lang="scss" >
.CarCashOpertate{
    .el-dialog{
        width:1200px!important;
    .carNewinfoH2{
        padding: 10px 0px;
        text-indent:10px;
        text-align: left;
    }
    }
}
</style>
