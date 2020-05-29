<template>
     <div class="cashAuditingDetail commoncss">
       <el-dialog :title="btntitle" :visible="dialogFormVisible_add" :before-close="change" top="5vh" v-el-drag-dialog :close-on-click-modal="false" ref="dialog">
        <el-form ref="formData" :model="formData">
            <el-row>    
                <el-col :span="12">
                    <el-form-item label="用户姓名 ：" :label-width="formLabelWidth" >
                    <span>{{formData.name}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="电话号码 ：" :label-width="formLabelWidth" >
                    <span class="mobileInfo" @click="pushOrderSerial">{{formData.mobile}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="提现金额 ：" :label-width="formLabelWidth" >
                    <span>{{formData.extractSum}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="申请时间 ：" :label-width="formLabelWidth" >
                    <span>{{formData.extractTime}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="收款方式 ：" :label-width="formLabelWidth" >
                    <span>{{formData.extractWay}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="收款账号 ：" :label-width="formLabelWidth" >
                    <span>{{formData.extractAccount}}</span>
                    </el-form-item>
                </el-col>
            </el-row>   
            <el-row>
                <el-col :span="12">
                    <el-form-item label="处理结果 ：" :label-width="formLabelWidth" v-if="editType=='view'">
                    <span>{{formData.auditOpinion}}</span>
                    </el-form-item>
                    <el-form-item label="处理结果 ：" :label-width="formLabelWidth" v-else>
                    <el-radio v-model="formData.auditOpinion" label="1">审核通过</el-radio>
                    <el-radio v-model="formData.auditOpinion" label="2">审核不通过</el-radio>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="审核时间 ：" :label-width="formLabelWidth"  v-if="editType=='view'">
                     <span>{{formData.extractTime}}</span>
                    </el-form-item>
                </el-col>
            </el-row>  
            <el-row>
                <el-col :span="12">
                    <el-form-item label="提现结果 ：" :label-width="formLabelWidth" >
                    <span>{{formData.extractStatus}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="备注信息 ：" :label-width="formLabelWidth" >
                    <span>{{formData.extractDes}}</span>
                    </el-form-item>
                </el-col>
            </el-row>    
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary"  @click="edit_data" v-if="editType!=='view'">确 定</el-button>
          <el-button @click="close()" type="primary">关 闭</el-button>
        </div>
      </el-dialog> 
      </div>
</template>
<script>
import {data_aflcExtractCashList_update} from '@/api/finance/transactionCash.js'
import { eventBus } from '@/eventBus'
export default {
  components:{
  },
  props:{
    params:{
      type:[Object,String,Array,Number],
    },
    btntitle: {
    type: String,
    default: ''
    },
    /*add新增，edit编辑，view查看*/
    editType: {
      type: String,
    },
    dialogFormVisible_add:{
        type:Boolean,
        default:false
    }
  },
  data(){
        return{
        formLabelWidth:'120px',
        formData:{
        auditOpinion:null,
        },
        }
  },
  watch:{
   dialogFormVisible_add:{
        handler: function(val, oldVal) {
            if(!val){
                 this.$emit('getData') 
            }
            else{
                 this.formData =  Object.assign({},this.params)
                if(this.formData.auditOpinion=='审核通过')
                {
                    this.formData.auditOpinion = '1'
                }
                else if(this.formData.auditOpinion=='审核不通过'){
                    this.formData.auditOpinion = '2'
                }
                else{
                    this.formData.auditOpinion = null
                }
            }
        },
    },
  },
  mounted(){
  },
  methods:{
   change:function(){
    this.$emit('update:dialogFormVisible_add', false);
   },
   close:function(){
    this.$emit('update:dialogFormVisible_add', false);
       }, 
    // 进入账户概况
    pushOrderSerial(item) {
      this.$router.push({ name: '车主账户详情', query: { accountId: this.formData.accountId }})
    },
    // 审核
    edit_data(){
        console.log('this.formData.auditOpinion',this.formData.auditOpinion)
       this.$refs['formData'].validate(valid=>{
        if(valid){
        if(!this.formData.auditOpinion){
            console.log('sss')
           this.$message.warning('处理结果必须填写')
        }
        else{
        this.$emit('update:dialogFormVisible_add', false);
        this.$message.info('审核中。。。')
        data_aflcExtractCashList_update(this.params.extractSerial,this.formData).then(res=>{
            this.$message.success('修改成功');
            this.$emit('getData') 
        }).catch(res=>{
            this.$message.error(res.errorInfo)
            this.$emit('getData') 
        })      
        }
       }
       })
    }

   },
}
</script>


<style lang="scss">
.cashAuditingDetail{
     display: inline-block;
    .el-button{
        padding: 6px 15px 6px;
        }
    .el-form-item__content{
        text-align: left;
    }
    .BtnInfo{
        font-weight: bold;
    }
    .mobileInfo{
        color: #0da0e4;
        cursor: pointer;
    }
}
</style>
