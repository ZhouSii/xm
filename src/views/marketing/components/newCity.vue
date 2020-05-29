<template>
     <div class="creatcity commoncss">
      <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()" size="mini">{{btntext}}</el-button>
      <div class="newMarketingCity">
      <el-dialog  :visible="dialogFormVisible_add" :before-close="change" :title="btntitle" :close-on-click-modal="false">
        <el-form :model="formAll" ref="formAll" :rules="rulesForm">
          <el-row v-if="editType=='edit'">
              <el-col>
            <div class="swith">
            启用状态：
            <el-switch
            style="display: inline-block"
            v-model="formAll.usingStatus"
            active-color="#ff4949"
            inactive-color="#13ce66"
            active-text="停用"
            active-value="0"
            inactive-value="1"
            inactive-text="启用">
            </el-switch>
             </div>
              </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
            <div class="table_box">
             <table class="ht_table">
            <tbody>
             <tr>
             <th width="200">所属区域</th>
             <th width="150">车辆类型</th>
             <th width="150">车主抽佣等级</th>                            
             <th width="100">开始抽佣单数</th>
             <th width="100">结束抽佣单数</th>
             <th width="100">每单抽佣（%）</th>
             <th width="100">至少抽佣金额</th>        
            </tr>
             <tr>
             <td>
                 <el-form-item  prop="areaCode" v-if="editType=='add'"> 
                 <GetCityList ref="area" v-model="formAll.areaCode"  @returnStr="getStr"></GetCityList>
                 </el-form-item>
                <el-form-item v-else> 
                    <el-input v-model="areaName" placeholder="" disabled ></el-input>   
                </el-form-item>
            </td>
             <td> 
                 <el-form-item  prop="carType"> 
                 <el-select  v-model="formAll.carType" clearable placeholder="请选择" :disabled="editType!=='add'">
                          <el-option
                             v-for="item in optionsCar"
                              :key="item.code"
                              :label="item.name"
                              :value="item.code"
                               :disabled="item.disabled">
                         </el-option>
                 </el-select>
                 </el-form-item>
            </td>
             <td>
                 <el-form-item  prop="commissionGrade"> 
                  <el-select v-model="formAll.commissionGrade" clearable placeholder="请选择" :disabled="editType!=='add'">
                          <el-option
                             v-for="item in MaidLevel"
                              :key="item.code"
                             :label="item.name"
                              :value="item.code"
                               :disabled="item.disabled">
                         </el-option>
                 </el-select>  
                 </el-form-item>
             </td>
             <td>
                 <el-form-item  prop="startNum"> 
                 <el-input min="0" maxlength="4"  v-model="formAll.startNum"></el-input>
                 </el-form-item>
             </td>
             <td>
                 <el-form-item  prop="endNum"> 
                 <el-input v-model="formAll.endNum" maxlength="4"></el-input>
                 </el-form-item>
                 </td>
             <td>
                 <el-form-item  prop="commissionPer"> 
                 <el-input v-model="formAll.commissionPer" maxlength="3"></el-input>
                 </el-form-item>
                 </td>
             <td>
                 <el-form-item  prop="commissionLowest"> 
                 <el-input v-model="formAll.commissionLowest" maxlength="4"></el-input>
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
import { data_Commission, data_CarList, data_MaidLevel } from '@/api/server/areaPrice.js'
import { data_get_Marketingsame_create, data_get_Marketingsame_update, data_get_Marketingsame_Id } from '@/api/marketing/carmarkting/carmarkting.js'
import Upload from '@/components/Upload/singleImage'
import { eventBus } from '@/eventBus'
import GetCityList from '@/components/GetCityList/city'
import { data_get_shipper_type, data_get_shipper_create, data_get_shipper_change, data_get_shipper_view } from '@/api/users/shipper/all_shipper.js'

export default {
  components: {
    Upload,
    GetCityList
  },
  props: {
    paramsView: {
      type: Object
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
    //    选择省市校验
    const belongCityNameValidator = (rule, val, cb) => {
      if (val) {
        if (val.length < 1) {
          cb(new Error('所属地区不能为空'))
        } else {
          cb()
        }
      } else {
        cb(new Error('所属地区不能为空'))
      }
    }

    //    选择车辆类型校验
    const carTypeValidator = (rule, val, cb) => {
      if (!val) {
        cb(new Error('车辆类型不能为空'))
      } else {
        cb()
      }
    }

    //    车主抽佣等级校验
    const commissionGradeValidator = (rule, val, cb) => {
      if (!val) {
        cb(new Error('车主抽佣等级不能为空'))
      } else {
        cb()
      }
    }

    //    开始抽佣单数校验
    const startNumValidator = (rule, val, cb) => {
      var reg = /^[0-9]*[1-9][0-9]*$/
      if (!val) {
        cb(new Error('开始抽佣不能为空'))
      } else if (!reg.test(val)) {
        cb(new Error('请输入正整数'))
      } else {
        cb()
      }
    }

    //    结束抽佣单数校验
    const endNumValidator = (rule, val, cb) => {
      var reg = /^[0-9]*[1-9][0-9]*$/
      if (!val) {
        cb(new Error(' 结束抽佣不能为空'))
      } else if (!reg.test(val)) {
        cb(new Error('请输入正整数'))
      } else {
        cb()
      }
    }

    //    每单抽佣比例校验
    const commissionPerValidator = (rule, val, cb) => {
      var reg = /^(1|([1-9]\d{0,1}))$/
      if (!val) {
        cb(new Error('每单抽佣比例不能为空'))
      } else if (!reg.test(val)) {
        cb(new Error('请输入1~99正整数'))
      } else {
        cb()
      }
    }

    //    至少抽佣金额校验
    const commissionLowestValidator = (rule, val, cb) => {
      var reg = /^[0-9]*[1-9][0-9]*$/
      if (!val) {
        cb(new Error(' 至少抽佣金额不能为空'))
      } else if (!reg.test(val)) {
        cb(new Error('请输入正整数'))
      } else {
        cb()
      }
    }

    return {
      btnStatus:true, //新增修改按钮状态  
      areaStatus:null,
      btnsize: 'mini',
      dialogFormVisible_add: false,
      MaidLevelValueCar: '',
      optionsCar: [],
      MaidLevel: [],
      areaName: null,
      formAll: {
        areaCode: null,
        areaName: null,
        carType: null,
        commissionGrade: null,
        startNum: null,
        endNum: null,
        commissionPer: null,
        commissionLowest: null,
        usingStatus: null
      },
      rulesForm: {
        areaCode: { trigger: 'change', required: true, validator: belongCityNameValidator },
        carType: { trigger: 'change', required: true, validator: carTypeValidator },
        commissionGrade: { trigger: 'change', required: true, validator: commissionGradeValidator },
        startNum: { trigger: 'change', required: true, validator: startNumValidator },
        endNum: { trigger: 'change', required: true, validator: endNumValidator },
        commissionPer: { trigger: 'change', required: true, validator: commissionPerValidator },
        commissionLowest: { trigger: 'change', required: true, validator: commissionLowestValidator }
      }
    }
  },
  watch: {
    dialogFormVisible_add: {
      handler: function(val, oldVal) {
        if (!val) {
          this.$refs['formAll'].resetFields()
          this.areaStatus = null 
          if(this.$refs.area){
          this.$refs.area.clearData();
          }
        }
        else{
          this.getMoreInformation()
          this.btnStatus = true
        }
      }
    }
  },
  mounted() {
  },
  methods: {
    getStr(val){
        if(!val.area){
            this.formAll.areaCode= val.city.code
            this.formAll.area = ''
        }
        else{
            this.formAll.areaCode= val.area.code
            this.formAll.area = val.area.name
        }
            this.formAll.province = val.province.name
            this.formAll.city = val.city.name
        },   
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
            if(this.params[0].usingStatus==0){
            this.$message.info('选中内容被已禁用，不能进行修改操作');
            this.$emit('getData') 
            return
           }
           else{
          data_get_Marketingsame_Id(this.params[0].id).then(res => {
            this.formAll = res.data
            this.areaName = res.data.province + res.data.city + res.data.area
          })
          this.dialogFormVisible_add = true
           }
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
    // 获取  服务和车辆 类型列表
    getMoreInformation() {
      data_CarList().then(res => {
          this.optionsCar = res.data
      })
      data_MaidLevel().then(res => {
          this.MaidLevel = res.data
      })
    },
    // 同城新增
    add_data() {
      this.$refs['formAll'].validate(valid => {
        if (valid) {
          const formAllData =
            [{
              areaCode: this.formAll.areaCode,
              carType: this.formAll.carType,
              commissionGrade: this.formAll.commissionGrade,
              startNum: this.formAll.startNum,
              endNum: this.formAll.endNum,
              commissionPer: this.formAll.commissionPer,
              province: this.formAll.province,
              city: this.formAll.city,
              area: this.formAll.area,
              commissionLowest: this.formAll.commissionLowest
            }]
          if(this.btnStatus){
          this.btnStatus = false
          this.$message.info('新增中...')
          data_get_Marketingsame_create(formAllData).then(res => {
            this.$message.success('新增成功')
            this.$emit('getData');
            this.dialogFormVisible_add = false
          }).catch(res => {
            this.$message.error('新增失败')
            this.$emit('getData');
            this.dialogFormVisible_add = false
          })
        }
        }
      }
       )
    },
//    同城修改
    updata_data() {
      this.$refs['formAll'].validate(valid => {
        var forms = Object.assign({}, this.formAll)
        if (valid) {
          if(this.btnStatus){
          this.btnStatus = false
          this.$message.info('修改中...')
          data_get_Marketingsame_update(forms).then(res => {
            this.$message.success('修改成功')
            this.$emit('getData');
            this.dialogFormVisible_add = false
          }).catch(res => {
            this.$message.error('修改失败')
            this.$emit('getData');
            this.dialogFormVisible_add = false
          })
        }
        }
      }
       )
    }
  }
}
</script>
<style lang="scss" >
    .creatcity{ 
        display: inline-block;
        .el-input__inner,.el-form-item__content{
            line-height: 40px!important; 
            height: 40px !important; 
        }
    .newMarketingCity{
        .el-dialog{
            width:1050px!important;
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
    }
    .table_box{
    .ht_table{
        width: 934px!important;
        margin:0px 10px;
        color: #333;
        border-left:1px solid #d0d7e5;
        border-bottom:1px solid #d0d7e5;
        tr{
            width: 100%;
            line-height: 34px;
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
