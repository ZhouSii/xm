<template>
     <div class="commoncss">
        <el-dialog :title="typetitle" :visible="dialogFormVisible_add" :modal-append-to-body = 'false' :before-close="close" top="5vh" :close-on-click-modal="false" ref="dialog">
        <el-form :model="formAll" ref="formAll" :rules="rulesForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="提货地所属区域：" :label-width="formLabelWidth"  prop="belongCity">
                  <el-input v-model="formAll.belongCityName" placeholder="" @focus="changeSelect" v-if="editType !=='add'&&!selectFlag"></el-input>
                  <GetCityList ref="area" v-model="formAll.belongCity"  @returnStr="getStr" v-else></GetCityList>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名：" :label-width="formLabelWidth" prop="name">
                   <selectBelong :groupCode="groupCode" :belongSalesman="this.formAll.name" @returnBelong="(value)=>{getReturnBelong(value)}"/>
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
import GetCityList from '@/components/GetCityList/city'
import { GetextractFailReject,aflcMsgNoticeManagementCreate,aflcMsgNoticeManagementupdate } from '@/api/dispatch/OperationsInformCity.js'
import { getAllBusinessGroup,aflcBusinessGroupUserList } from '@/api/company/businessGroup'
import selectBelong from "@/views/users/shipper/selectBelong";
export default { 
  components: {
      GetCityList,
      selectBelong
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
    dialogFormVisible_add:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      defaultImg:'/static/test.jpg',
      formLabelWidth:'130px',
      pickerOptions2: {shortcuts: pickerOptions2},
      btnsize: 'mini',
      formAll:{
          belongCity:null,
          belongCityName:null,
          name:null,
          mobile:null,
          userId:null
      },
      selectFlag:false,
      groupCode:null,
      listSystemObj:{
            "currentPage": 1,
            "pageSize": 1000,
            "vo": {
                groupCode:'',
            }
      },
      btnStatus:true,
      rulesForm: {
        belongCity: { required: true, message: "请选择提货地所属区域", trigger: "change" },
        name: { required: true, message: "请选择姓名", trigger: "change" },
      },
    }
  },
  watch: {
    dialogFormVisible_add: {
      handler: function(val, oldVal) {
        if (!val) {
        this.$refs['formAll'].resetFields()
        this.$emit('getData');
        for (var key in this.formAll) {
            this.formAll[key] = '';
        }
        this.selectFlag = false
        if(this.$refs.area){
        this.$refs.area.clearData();
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
    getStr(val){
        this.formAll.belongCity = val.area.code
        this.formAll.belongCityName = val.province.name + val.city.name + val.area.name
    },
    openDialog: function() {
      if(this.editType=='edit'){
        this.formAll = JSON.parse(JSON.stringify(this.params[0]))
     }
    },
    getReturnBelong(val) {
      this.formAll.name = val.name;
      this.formAll.userId = val.userId;
      this.formAll.mobile = val.mobile;
    },
    changeSelect(){
        if(this.editType==='add'){
            this.selectFlag=false
        } else{
            this.selectFlag=true
        }
    },
    MethodOne(){
    getAllBusinessGroup().then(res => {
        this.groupCode = res.data[0].groupCode
    })
    },
    close: function() {
        this.$emit('update:dialogFormVisible_add', false);
    },
    updataClick(){
    this.$refs['formAll'].validate(valid => {
    if(valid){
    if (this.btnStatus) {
    this.btnStatus = false
    if(this.editType=='add'){
    aflcMsgNoticeManagementCreate(this.formAll).then(res=>{
        this.$emit('update:dialogFormVisible_add', false);
        this.$message.success('新增成功')
    }).catch(err=>{
        this.$emit('update:dialogFormVisible_add', false);
        this.$message.error(err.errorInfo)
    })
    }
    else{
    aflcMsgNoticeManagementupdate(this.formAll).then(res=>{
        this.$emit('update:dialogFormVisible_add', false);
        this.$message.success('修改成功')
    }).catch(err=>{
        this.$emit('update:dialogFormVisible_add', false);
        this.$message.error(err.errorInfo)
    })
    }
    }}
    })
  }
  },
  mounted(){
    this.MethodOne()
  }
}
</script>
<style lang="scss" >

</style>
