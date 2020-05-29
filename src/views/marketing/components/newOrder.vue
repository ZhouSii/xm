<template>
     <div class="ordercreatcity commoncss">
      <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()" size="mini">{{btntext}}</el-button>
      <div class="newMarketingOrder">
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
             <table class="ht_table">
            <tbody>
             <tr>
             <th width="200">所属区域</th>
             <th width="100">车辆类型</th>   
             <th width="100">车主抽佣等级</th>                            
             <th width="70">1单/ 天</th>
             <th width="70">2单/ 天</th>
             <th width="70">3单/ 天</th>  
             <th width="70">4单/ 天</th>
             <th width="70">5单/ 天</th>
             <th width="70">6单/ 天</th>
             <th width="70">7单/ 天</th>
             <th width="70">8单/ 天</th>
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
                 <el-form-item  prop="reward1"> 
                 <el-input min="0" maxlength="3"  v-model="formAll.reward1" ></el-input>
                 </el-form-item>
             </td>
             <td>
                 <el-form-item  prop="reward2"> 
                 <el-input v-model="formAll.reward2" maxlength="3"></el-input>
                 </el-form-item>
                 </td>
             <td>
                 <el-form-item  prop="reward3"> 
                 <el-input v-model="formAll.reward3" maxlength="3"></el-input>
                 </el-form-item>
                 </td>
             <td>
                 <el-form-item  prop="reward4"> 
                 <el-input v-model="formAll.reward4" maxlength="3"></el-input>
                 </el-form-item>
                 </td>
             <td>
                 <el-form-item  prop="reward5"> 
                 <el-input v-model="formAll.reward5" maxlength="3"></el-input>
                 </el-form-item>
                 </td>
             <td>
                 <el-form-item  prop="reward6"> 
                 <el-input v-model="formAll.reward6" maxlength="3"></el-input>
                 </el-form-item>
                 </td>
             <td>
                 <el-form-item  prop="reward7"> 
                 <el-input v-model="formAll.reward7" maxlength="3"></el-input>
                 </el-form-item>
                 </td>
             <td>
                 <el-form-item  prop="reward8"> 
                 <el-input v-model="formAll.reward8" maxlength="3"></el-input>
                 </el-form-item>
                 </td> 
            </tr>
            </tbody>
             </table>
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
import { data_Commission ,data_CarList,data_MaidLevel} from '@/api/server/areaPrice.js'
import { data_get_orderFromsame_create,data_get_orderFromsame_update,data_get_orderFromsame_Id} from '@/api/marketing/carmarkting/orderFrom.js'
import Upload from '@/components/Upload/singleImage'
import GetCityList from '@/components/GetCityList/city'
import { eventBus } from '@/eventBus'
import {data_get_shipper_type,data_get_shipper_create,data_get_shipper_change,data_get_shipper_view} from '@/api/users/shipper/all_shipper.js'
export default {
  components:{
    Upload,
    GetCityList
  },
  props:{
    paramsView:{
      type:Object,
    },
    params:{
      type:[Object,String,Array],
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
  data(){
    //    选择省市校验
        const belongCityNameValidator = (rule, val, cb) => {
            if(val){
            if(val.length<1){
            cb(new Error('所属地区不能为空'))
            }
            else{
                cb()
            }                 
            }else{
            cb(new Error('所属地区不能为空'))
            }   
        }

    //    选择车辆类型校验
        const carTypeValidator = (rule, val, cb) => {
            if(!val){
            cb(new Error('车辆类型不能为空'))
            }
            else{
                cb()
            }        
        }

    //    车主抽佣等级校验
        const commissionGradeValidator = (rule, val, cb) => {
                    if(!val){
            cb(new Error('车主抽佣等级不能为空'))
            }
            else{
                cb()
            }        
        }

    //    开始抽佣单数校验
        const rewardValidator = (rule, val, cb) => {
            var reg= /[^\d]/g
            if(!val){
            cb(new Error('不能为空'))
            }
            else if(reg.test(val)){
            cb(new Error('请输入正整数'))
            }
            else{
                cb()
            }        
        }     
    

        return{
        btnStatus:true, //新增修改按钮状态
        areaStatus:null,
        areaName:null, 
        dialogFormVisible_add: false,
        MaidLevelValueCar:'',
        optionsCar:[],
        MaidLevel:[],
        formAll:{
            usingStatus:null,
            areaCode: [],
            carType:null,
            commissionGrade:null,
            reward1:null,
            reward2:null,
            reward3:null,
            reward4:null,
            reward5:null,
            reward6:null,
            reward7:null,
            reward8:null,
            },
            rulesForm:{
            areaCode:{trigger:'change',required:true,validator: belongCityNameValidator},
            carType:{trigger:'change',required:true,validator:carTypeValidator},
            commissionGrade:{trigger:'change',required:true,validator:commissionGradeValidator},
            reward1:{trigger:'change',required:true,validator:rewardValidator},
            reward2:{trigger:'change',required:true,validator:rewardValidator},
            reward3:{trigger:'change',required:true,validator:rewardValidator},
            reward4:{trigger:'change',required:true,validator:rewardValidator},
            reward5:{trigger:'change',required:true,validator:rewardValidator},   
            reward6:{trigger:'change',required:true,validator:rewardValidator}, 
            reward7:{trigger:'change',required:true,validator:rewardValidator}, 
            reward8:{trigger:'change',required:true,validator:rewardValidator},                                    
            },
        }
  },
  watch:{
   dialogFormVisible_add:{
        handler: function(val, oldVal) {
            if(!val){
            this.$refs['formAll'].resetFields();
            this.areaStatus = null;
       if(this.$refs.area){
          this.$refs.area.clearData();
          }
            }
            else{
            this.getMoreInformation();
            this.btnStatus = true
            }     
        },
    },
  },
  mounted(){
  },
  methods:{
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
   openDialog:function(){
       if(this.editType=='edit'){
          if(this.params.length == 0 && this.editType !== 'add'){
               this.$message.warning('请选择您要操作的数据');
               return
          }else if (this.params.length > 1 && this.editType !== 'add') {
                this.$message({
                    message: '每次只能操作单条数据~',
                    type: 'warning'
                })
                this.$emit('getData') 
                return
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
            this.dialogFormVisible_add = true;
           data_get_orderFromsame_Id(this.params[0].id).then(res=>{
                this.areaName = res.data.province+res.data.city+res.data.area
                this.formAll = res.data
           })
           }
           }
       }
       else{
        this.dialogFormVisible_add = true;
       }
   },
   change:function(){
      this.dialogFormVisible_add = false;
   },
   close:function(){
      this.dialogFormVisible_add = false;
       },
            //获取  服务和车辆 类型列表
    getMoreInformation(){
                data_CarList().then(res=>{
                        this.optionsCar = res.data
                    })
                data_MaidLevel().then(res=>{
                        this.MaidLevel = res.data
                })
          }, 
    changeList(){
            eventBus.$emit('pushListtwo')
        },  
    // 同城新增    
   add_data(){
       this.$refs['formAll'].validate(valid=>{
        if(valid){
        var forms=[{
            areaCode:this.formAll.areaCode,
            carType:this.formAll.carType,
            commissionGrade:this.formAll.commissionGrade,
            reward1:this.formAll.reward1,
            reward2:this.formAll.reward2,
            reward3:this.formAll.reward3,
            reward4:this.formAll.reward4,
            reward5:this.formAll.reward5,
            reward6:this.formAll.reward6,
            reward7:this.formAll.reward7,
            reward8:this.formAll.reward8,
            province:this.formAll.province,
            city:this.formAll.city,
            area:this.formAll.area,
        }]
        if(this.btnStatus){
          this.btnStatus = false
          this.$message.info('新增中...')  
        data_get_orderFromsame_create(forms).then(res=>{
            this.$message.success('新增成功');
            this.$emit('getData');
            this.dialogFormVisible_add = false;
        }).catch(res=>{
            this.$message.error('新增失败');
            this.$emit('getData');
            this.dialogFormVisible_add = false;
       });
       }
       }
       }
       )
   },
//    同城修改
   updata_data(){
       this.$refs['formAll'].validate(valid=>{
        var forms= Object.assign({}, this.formAll);
        if(valid){
          if(this.btnStatus){
          this.btnStatus = false
          this.$message.info('修改中...')  
        data_get_orderFromsame_update(forms).then(res=>{
            this.$message.success('修改成功');
            this.$emit('getData');
            this.dialogFormVisible_add = false;
        }).catch(res=>{
            this.$message.error('修改失败');
            this.$emit('getData');
            this.dialogFormVisible_add = false;
       });
       }
       }
       }
       )
   },    
  }
}
</script>
<style lang="scss" >
    .ordercreatcity{
        display: inline-block;
        .el-input__inner,.el-form-item__content{
            line-height: 40px !important; 
            height: 40px !important; 
        }
        .newMarketingOrder{
            .el-dialog{
                width: 1100px!important;
                overflow: unset;
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
        }
        .ht_table{
        width: 980px;
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
            text-align:center;
            background: #EAF0FF;
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
            }
            .el-cascader{
                width:100%
            }
            .el-input{
                width:100%;
            }
        }
        }
    }
</style>