<template>
     <div class="salesManAchievement commoncss">
      <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()" size="mini">{{btntext}}</el-button>
      <div class="NewsalesManAchievement">
      <el-dialog  :visible="dialogFormVisible_add" :before-close="change" :title="btntitle">
        <el-form :model="formAll" ref="formAll" :rules="rulesForm">
          <el-row>
            <el-col :span="24">
            <div class="table_box">
             <table class="ht_table">
            <tbody>
             <tr>
             <th width="220" rowspan='2'>所属区域</th>
             <th width="220" rowspan='2'>业务组</th>
             <th width="220" rowspan='2'>姓名/手机号码</th>
             <th width="220" rowspan='2'>任务目标时间范围</th>
             <th colspan='4'>每周</th>
             <th colspan='4'>每月</th>
            </tr>
            <tr>
                <th width="105">发展货主数量</th> 
                <th width="105">发展车主数量</th> 
                <th width="105">发展物流公司数量</th> 
                <th width="105">发展区代数量</th> 
                <th width="105">发展货主数量</th> 
                <th width="105">发展车主数量</th> 
                <th width="105">发展物流公司数量</th> 
                <th width="105">发展区代数量</th> 
            </tr>
             <tr>
             <td>
                 <el-form-item  prop="areaName" v-if="editType!=='add'&&!selectFlag"> 
                    <el-input v-model="formAll.areaName" placeholder="" @focus="changeSelect"></el-input>   
                 </el-form-item>
                 <el-form-item v-else prop="areaName"> 
                     <GetCityList ref="area" v-model="formAll.areaName"  @returnStr="getStr"></GetCityList>
                </el-form-item>
            </td>
             <td> 
                 <el-form-item  prop="businessName">
                     <businessGroup  @change = "getId"  @inputObject = "getObject" v-model="formAll.businessName" ref="businessGroup"/>
                 </el-form-item>
            </td>
             <td>
                 <el-form-item  prop="salesmanTotal"> 
                        <el-select v-model="formAll.salesmanTotal" filterable placeholder="请选择" @change="handleSelect">
                            <el-option
                            v-for="item in restaurants"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name">
                            <span style="float: left">{{ item.name }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.mobile }}</span>
                            </el-option>
                        </el-select>
                 </el-form-item>
             </td>
             <td>
                 <el-form-item  prop="taskTime">
                    <el-date-picker
                        is-range
                        unlink-panels
                        :picker-options="pickerOptions2"
                        type="daterange"
                        align="right"
                        v-model="formAll.taskTime"
                        range-separator="-" 
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        placeholder="选择时间范围"
                        value-format="timestamp"
                        :default-time="['00:00:00', '23:59:59']"
                        @change='cTime'
                        >
                    </el-date-picker>
                 </el-form-item>
                 </td>
             <td>
                 <el-form-item  prop=""> 
                   <el-input v-model="formAll.weekDevelShipperNum" v-numberOnly maxlength='6'></el-input>
                 </el-form-item>
                 </td>
             <td>
                 <el-form-item  prop=""> 
                   <el-input v-model="formAll.weekDevelDriverNum" v-numberOnly maxlength='6'></el-input>
                 </el-form-item>
                 </td>
             <td>
                 <el-form-item  prop=""> 
                   <el-input v-model="formAll.weekDevelLogiscompanyNum" v-numberOnly maxlength='6'></el-input>
                 </el-form-item>
                 </td> 
             <td>
                 <el-form-item  prop=""> 
                   <el-input v-model="formAll.weekDevelDistrictNum" v-numberOnly maxlength='6'></el-input>
                 </el-form-item>
                 </td> 
             <td>
                 <el-form-item  prop=""> 
                   <el-input v-model="formAll.monthDevelShipperNum" v-numberOnly maxlength='6'></el-input>
                 </el-form-item>
                 </td> 
             <td>
                 <el-form-item  prop=""> 
                   <el-input v-model="formAll.monthDevelDriverNum" v-numberOnly maxlength='6'></el-input>
                 </el-form-item>
                 </td> 
             <td>
                 <el-form-item  prop=""> 
                  <el-input v-model="formAll.monthDevelLogiscompanyNum" v-numberOnly maxlength='6'></el-input>
                 </el-form-item>
                 </td>
            <td>
                 <el-form-item  prop=""> 
                  <el-input v-model="formAll.monthDevelDistrictNum" v-numberOnly maxlength='6'></el-input>
                 </el-form-item>
                 </td>    
            </tr>
            </tbody>
             </table>
             </div>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary"  v-if="editType=='add'" @click="add_data" >确 定</el-button>
          <el-button type="primary"  v-else @click="updata_data" >确 定</el-button>
          <el-button @click="close()" >取 消</el-button>
        </div>
      </el-dialog>
      </div>
    </div>
</template>
<script>
import Upload from '@/components/Upload/singleImage'
import { eventBus } from '@/eventBus'
import GetCityList from '@/components/GetCityList/city'
import businessGroup from '@/components/selectTree/businessGroup'  
import {aflcSalesmanAimsSettingAdd,aflcSalesmanAimsSettingUpdate,aflcSalesmanAimsSetting_Id} from '@/api/dispatch/salesManAchievement.js'
import {data_get_aflcPartner_findAuthCompany} from '@/api/users/district/manageDistrict.js'
import {aflcBusinessGroupUserList,getAllBusinessGroup } from '@/api/company/businessGroup'
import {parseTime,pickerOptions2} from '@/utils/'
export default {
  components: {
    Upload,
    GetCityList,
    businessGroup,
  },
  props: {
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
    return {
      pickerOptions2:{shortcuts:pickerOptions2},
      btnsize: 'mini',
      dialogFormVisible_add: false,
      restaurants:[],
      selectFlag: false,
      formAll: {
          areaName:null,
          province:null,
          city:null,
          area:null,
          areaCode:null,
          groupCode:null,
          businessId:null,
          businessName:null,
          salesmanTotal:null,
          salesmanId:null,
          salesmanName:null,
          salesmanPhone:null,
          taskTime:[],
          taskStartTime:null,
          taskEndTime:null,
          weekDevelShipperNum:null,
          weekDevelDriverNum:null,
          weekDevelLogiscompanyNum:null,
          weekDevelDistrictNum:null,
          monthDevelShipperNum:null,
          monthDevelDriverNum:null,
          monthDevelLogiscompanyNum:null,
          monthDevelDistrictNum:null,
      },
       listSystemObj:{
                "currentPage": 1,
                "pageSize": 1000,
                "vo": {
                    groupCode:'',
                }
        },
      rulesForm: {
          areaName:{ required: true, message: '所属区域不能为空', trigger: 'change' },
          businessName:{ required: true, message: '业务组不能为空', trigger: 'change'},
          salesmanTotal:{ required: true, message: '姓名/手机号不能为空', trigger: 'change'},
          taskTime:{ required: true, message: '任务目标时间不能为空', trigger: 'change'},
      }
    }
  },
  watch: {
    dialogFormVisible_add: {
      handler: function(val, oldVal) {
        if (!val) {
          if(this.$refs.area){
          this.$refs.area.clearData();
          }
        for(var item in this.formAll){
            this.formAll[item] = null
        }
        this.formAll.taskTime = []
        this.selectFlag = false
        this.$refs['formAll'].resetFields()
        this.$refs.businessGroup.clearInput()
        }
        else{
            this.formAll.taskTime = null
            
        }
      }
    }
  },
  mounted() {
      this.getMoreInformation()
  },
  computed:{
    NewformAll(){
        let formObject = {
          province:this.formAll.province,
          city:this.formAll.city,
          area:this.formAll.area,
          areaCode:this.formAll.areaCode,
          businessId:this.formAll.businessId,
          businessName:this.formAll.businessName,
          groupCode:this.formAll.groupCode,
          salesmanId:this.formAll.salesmanId,
          salesmanTotal:this.formAll.salesmanName,
          salesmanName:this.formAll.salesmanName,
          salesmanPhone:this.formAll.salesmanPhone,
          taskStartTime:this.formAll.taskStartTime,
          taskEndTime:this.formAll.taskEndTime,
          weekDevelShipperNum:this.formAll.weekDevelShipperNum,
          weekDevelDriverNum:this.formAll.weekDevelDriverNum,
          weekDevelLogiscompanyNum:this.formAll.weekDevelLogiscompanyNum,
          weekDevelDistrictNum:this.formAll.weekDevelDistrictNum,
          monthDevelShipperNum:this.formAll.monthDevelShipperNum,
          monthDevelDriverNum:this.formAll.monthDevelDriverNum,
          monthDevelLogiscompanyNum:this.formAll.monthDevelLogiscompanyNum,
          monthDevelDistrictNum:this.formAll.monthDevelDistrictNum,
        }
        return  formObject
    }
  },
  methods: {
    // 所属区域
    getStr(val){
        this.formAll.areaCode = val.area.code
        this.formAll.province = val.province.name
        this.formAll.city = val.city.name
        this.formAll.area = val.area.name
        this.formAll.areaName = val.province.name + val.city.name + val.area.name
    },
     // 省市状态表
    changeSelect(){
            if(this.editType==='add'){
                this.selectFlag = false
            } else{
                this.selectFlag = true
            }
            },
    // 业务组
    getId(val){
            this.formAll.businessId = val;
    },
    getObject(val){
            this.formAll.businessName = val.groupName;
            this.formAll.groupCode = val.groupCode;
            this.listSystemObj.vo.groupCode = val.groupCode
            this.getCommonFunction();
            this.formAll.salesmanTotal = null
            this.formAll.salesmanName = null
            this.formAll.salesmanId = null
            this.formAll.salesmanPhone = null
    },
    // 任务目标时间    
    cTime(i){
            if(i!==null){
            this.formAll.taskStartTime = i[0]
            this.formAll.taskEndTime = i[1]
            }
            else{
            this.formAll.taskStartTime = null
            this.formAll.taskEndTime = null
            }
    },
    handleSelect(item) {
          let SelectObj = {};
          SelectObj = this.restaurants.find((data)=>{
          return data.name==item;
          });
         this.formAll.salesmanTotal = SelectObj.name+'('+SelectObj.mobile+')'
         this.formAll.salesmanName = SelectObj.name
         this.formAll.salesmanId = SelectObj.userId
         this.formAll.salesmanPhone = SelectObj.mobile
         this.$forceUpdate()
    },
    getMoreInformation(){
            getAllBusinessGroup().then(res => {
                this.listSystemObj.vo.groupCode = res.data[0].groupCode;
                this.getCommonFunction();
            })
    }, 
    getCommonFunction() {
            aflcBusinessGroupUserList(this.listSystemObj).then(res => {
                this.restaurants = res.data.list;
            })
        },

    // 打开弹框
    openDialog: function() {
        if (this.editType == 'edit') {
            if(this.params.length == 0 && this.editType !== 'add'){
                this.$message.warning('请选择您要操作的数据');
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
                    this.$message.warning('请选择您要操作的数据');
                return false
            }
            else{
                aflcSalesmanAimsSetting_Id(this.params[0].id).then(res=>{
                this.formAll = res.data
                this.$set(this.formAll, 'taskTime', [this.formAll.taskStartTime,this.formAll.taskEndTime])
                this.formAll.salesmanTotal = res.data.salesmanName+'('+res.data.salesmanPhone+')'
                this.formAll.areaName = res.data.province + res.data.city + res.data.area
                this.listSystemObj.vo.groupCode = res.data.groupCode;
                this.getCommonFunction();
                })
                this.dialogFormVisible_add = true
            }
        } else {
            this.dialogFormVisible_add = true
        }
        },
    changeList(){
        eventBus.$emit('pushListtwo')
        },  
    change: function() {
        this.dialogFormVisible_add = false
        },
    close: function() {
        this.dialogFormVisible_add = false
        },
    completeData(){
        var weekDevel = [this.formAll.weekDevelShipperNum,this.formAll.weekDevelDriverNum,this.formAll.weekDevelLogiscompanyNum,this.formAll.weekDevelDistrictNum]
        var monthDeve = [this.formAll.monthDevelShipperNum,this.formAll.monthDevelDriverNum,this.formAll.monthDevelLogiscompanyNum,this.formAll.monthDevelDistrictNum]
        var weekStatus = 0;
        var monthStatus = 0;
        for(var i=0;i<weekDevel.length;i++){
             if(weekDevel[i]){
                 weekStatus++
             }
        }
        for(var j=0;j<monthDeve.length;j++){
            if(monthDeve[j]){
                 monthStatus++
             }
        }
        if(weekStatus==0){
            this.$message.warning('每周分类项输入项至少有一项数据不为空');
            return false
        }
        if(monthStatus==0){
            this.$message.warning('每月分类项输入项至少有一项数据不为空');
            return false
        }
        else{
            return
        }
    },
    // 新增
    add_data() {
            this.completeData(); 
            if(this.completeData()==false)
            {
               return
            }
            else{
      this.$refs['formAll'].validate(valid => {
        if (valid) {
           this.dialogFormVisible_add = false
          aflcSalesmanAimsSettingAdd(this.NewformAll).then(res => {
            this.$message.success('新增成功')
            this.$emit('getData');
          }).catch(err=> {
            this.$message.error(err.data)
            this.$emit('getData');
          })
        }
      })
       }
    },
//    修改
    updata_data() {
      this.$refs['formAll'].validate(valid => {
        var forms = Object.assign({}, this.NewformAll,{id:this.params[0].id})
        if (valid) {
            this.dialogFormVisible_add = false
          aflcSalesmanAimsSettingUpdate(forms).then(res => {
            this.$message.success('修改成功')
            this.$emit('getData');
          }).catch(err => {
            this.$message.error(err.data)
            this.$emit('getData');
          })
        }
      }
    )
    }
  }
}
</script>
<style lang="scss" >
    .salesManAchievement{ 
        display: inline-block;
        .el-input__inner,.el-form-item__content{
            line-height: 40px!important; 
            height: 40px !important; 
        }
    .NewsalesManAchievement{
        .el-dialog{
            width:85%!important;
        }
        .swith{
            margin:0px 0px 10px 10px;
            .el-switch{
                display: inline-block;
            }
        }
        .el-dialog__footer{
            padding: 20px 20px 20px;
        }
       .el-dialog{
           overflow: unset;
       }
       .el-date-editor--daterange{
           width:230px;
       }
    }
    .table_box{
    .ht_table{
        width: 100%;
        margin:0px 10px;
        color: #333;
        border-left:1px solid #d0d7e5;
        border-bottom:1px solid #d0d7e5;
        tr{
            width: 100%;
            line-height: 20px;
            height: 34px;
        }
        th{
            background: #EAF0FF;
            text-align:center;
            border-top:1px solid #d0d7e5;
            border-right:1px solid #d0d7e5;
        }
        td{
            border-top:1px solid #d0d7e5;
            text-align: center;
            border-right:1px solid #d0d7e5;
            .el-form-item{
            margin-bottom: 0px!important;
            width:100%;
            .el-cascader{
                width:100%
            }
            }
            .el-input{
                width:100%;
            }
        }
        }
        }
    }
</style>
