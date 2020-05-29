<template>
    <div class="modcashSet commoncss">
      <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()">{{btntext}}</el-button>
      <div class="newMarketingCity">
      <el-dialog  :visible="dialogFormVisible_add" :before-close="change" :title="btntext" >
            <el-form :inline="true" ref="vestList" >
             <el-row>
            <el-col :span="12">
            <el-form-item label="每个月免费提现金额：" :label-width="formLabelWidth"  > 
                <el-input></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="提现手续费（%）：" :label-width="formLabelWidth" > 
                <el-input></el-input>
            </el-form-item>            
            </el-col>
             </el-row>
            </el-form>
         <div slot="footer" class="dialog-footer">
          <el-button type="primary"  @click="add_data" >确 定</el-button>
          <el-button @click="close()" >取 消</el-button>
        </div>
      </el-dialog>
      </div>
      </div>
</template>
<script>
export default {
    data(){
        return{
           dialogFormVisible_add:false,
           formLabelWidth:'200px'
        }
    },
    props:{
        paramsView:{
        type:Object,
        },
        params:{
        type:[Object,String],
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
        }
    },
    methods:{
       //弹框控制
        change() {
         this.dialogFormVisible_add = false;
        },
        openDialog(){
        this.dialogFormVisible_add = true;
        },
        close(){
        this.dialogFormVisible_add = false;
        },
        add_data(){

        }
    }
}
</script>


<style lang="scss">
.modcashSet{
        display: inline-block;
        margin-right: 10px;
        .el-button {
        margin-right:0px;
        padding: 7px 15px 7px;
        font-size:12px;
        }
}
</style>
