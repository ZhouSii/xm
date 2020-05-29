<template>
  <div class="blackInfo commoncss">
    <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()"  size="mini">{{btntext}}</el-button>
    <el-dialog :title="btntext" :visible.sync="freezeDialogFlag" :before-close="change()" top=5vh v-dialogDrag :closeOnClickModal='false'>
      <el-form :model="formFroze" ref="formFroze" :rules="formFrozeRules" :inline="true">
          <div class="shipper_information">
            <h2>移入黑名单信息</h2>
          </div>
          <el-row>
            <el-col :span="24">
              <el-form-item label="移入原因：" prop="putBlackCause" :label-width="formLabelWidth">
              <el-select v-model="formFroze.putBlackCause" placeholder="请选择" clearable :disabled="editType == 'edit-five'">
                <el-option
                  v-for="item in putBlackCauseoptions"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select >
            </el-form-item>
            </el-col>
          </el-row>
          
          <el-row>
            <el-col :span="24">
              <el-form-item label="移入黑名单原因说明：" :label-width="formLabelWidth">
                <el-input type="textarea" :rows="2" :maxlength="100" v-model="formFroze.putBlackCauseRemark " :disabled="editType == 'edit-five'"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="shipper_information" v-if = "editType == 'edit-five'">
            <h2>移出黑名单信息</h2>
          </div>
          <el-row v-if = "editType == 'edit-five'">
            <el-col :span="24">
              <el-form-item label="移出黑名单原因说明：" :label-width="formLabelWidth">
                 <el-input class="textArea" type="textarea" :rows="2"  :maxlength="100" v-model="formFroze.outPutBlackCauseRemark " ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit1" v-if = "editType == 'edit-four'">确定</el-button>
        <el-button type="primary" @click="onSubmit2"  v-else-if="editType == 'edit-five'">确定</el-button>
        <el-button @click="freezeDialogFlag = false">取 消</el-button>
      </div>
    </el-dialog> 
  </div>
</template>
<script>
import GetCityList from '@/components/GetCityList'
import {parseTime} from '@/utils/'
import { eventBus } from '@/eventBus'
import  {data_put_PutBlack,data_put_OutBlack,data_get_car_freezeType,data_get_car_BlackType,data_get_driver_obStatus,data_get_shipper_carmaid,data_get_shipper_carOwner} from '@/api/users/carowner/total_carowner.js'
import {data_get_driverName_id} from '@/api/users/carowner/all_car.js'
export default {
  name:'create-Change-ViewDialog',
  components:{
    GetCityList
  },
  props:{
    params:{
      type:[Object,Array],
    },
    icon:{
      type: String,
      default: ''
    },
    btntype: {
      type: String,
      default: ''
    },
    btntitle: {
      type: String,
      default: ''
    },
    plain:{
      type: Boolean,
      default: false
    },
    btntext: {
      type: String,
      default: ''
    },
    value:{
      type: String,
      default:''
    },
     editType: {
      type: String,
      default: 'edit'
    },
    count:{
        type:Number
    }
  },
  data(){
    return{
      type:'primary',
      title:'',
      text:'',
      optionsReason:[],
      putBlackCauseoptions:[],
      formLabelWidth:'150px',
      freezeDialogFlag:false,
      formFroze: { // 冻结弹框表单
        driverMobile: null, // 手机号
        driverName: '', // 公司名称
        carTypeName:null,
        carNumber:'', // 详细地址
        driverCardid:'', // 身份证号码
        belongCity:null, // 所在地
        registerOrigin:'', // 注册来源
        creditCode:'', // 统一社会信用代码
        freezeTime:'',
        freezeCause:null,
        freezeCauseRemark :'',
        belongCityName:'',
        obtainGrade:'',
        obtainGradeName:'',
        obtainGradeTime:'',
        unfreezeCauseRemark:'',
        outPutBlackCauseRemark:'',
        putBlackCause:'',
        putBlackCauseRemark:''
        // radio1:'',
        // radio2:'',
        // radio3:''
      },
      radio: '',
      currentRow:null,
      pickerOptions:{
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      formFrozeRules:{
        freezeCause:{required: true,message:'请选择冻结原因',trigger:'change'},
        freezeTime:{required:true,message:'请选择解冻日期',trigger:'change'},
        putBlackCause:{required:true,message:'请选择移入黑名单原因',trigger:'change'}
      }
    }
  },
  mounted(){
  },
    watch:{
        freezeDialogFlag:{
        handler: function(val, oldVal) {
            if(!val){
                this.$refs.formFroze.resetFields();
                this.$emit('getData') 
            }
            else{
                this.getMoreInformation()
            }
        }
        }
        },
  methods:{
    timeChange(val){
      let currentTime = this.formFroze.freezeTime || new Date()
      let oneDay = 1* 24 * 60 * 60 * 1000
      let time = +new Date()
      switch(val){
        case 1:
          time += 1 * oneDay
          break
        case 3:
          time += 3 * oneDay
          break
        case 7:
          time += 7 * oneDay
          break
        case 9:
          time += 30 * oneDay
          break
        case 10:
          time += 100000 * oneDay
          break
      }

      this.formFroze.freezeTime = time
    },
    change(){
      this.freezeDialogFlag!=this.freezeDialogFlag
    },
    changeList(){
      eventBus.$emit('changeListtwo')
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    openDialog(){
            if(this.params.length == 0 && this.editType !== 'add'){
               this.$message.warning('请选择您要操作的用户');
               return
            }else if (this.params.length > 1 && this.editType !== 'add') {
                this.$message({
                    message: '每次只能操作单条数据~',
                    type: 'warning'
                })
                this.$emit('getData') 
            }
        else{
      if(this.params[0].accountStatusName == '黑名单' && this.editType == 'edit-four'){
             this.$emit('getData')
             this.$message.info('您选中的车主已被移入黑名单，不需多次拉黑！');
             return
           }
      else if(this.params[0].accountStatusName != '黑名单' && this.editType == 'edit-five'){
            this.$message.info('您选中的车主未被移入黑名单，不可做此操作！');
            this.$emit('getData')
             return
       }
        else{
        data_get_driverName_id(this.params[0].driverId).then(res=>{
             this.formFroze = res.data;
             if(this.params[0].accountStatus !== 'AF0010503'){
               this.formFroze.putBlackCause = null
             }
        }).catch(err=>{
            console.log('err',err) 
            this.$message.error('获取数据失败')
        })
        this.freezeDialogFlag=true
        }
      }
    },

    getMoreInformation(){
            // 获取冻结原因下拉
            data_get_car_freezeType().then(res=>{
                this.optionsReason =res.data
              })
            // 获取移入黑名单原因下拉
            data_get_car_BlackType().then(res=>{
                this.putBlackCauseoptions = res.data
            })
    
    },

    //移入黑名单
    onSubmit1(){
      this.changeList()
        this.$refs['formFroze'].validate((valid)=>{
        if(valid){
          var forms= Object.assign({}, this.formFroze)
          data_put_PutBlack(forms).then(res=>{
            this.freezeDialogFlag = false;
            this.$message.success('移入黑名单成功')
            this.changeList()
          }).catch(err=>{
            this.freezeDialogFlag = false;
            this.$message.error('移入黑名单失败')
          })  
        }
      })
    },
    //移出黑名单
    onSubmit2(){
        this.changeList()
        this.$refs['formFroze'].validate((valid)=>{
        if(valid){
          var forms= Object.assign({}, this.formFroze)
          data_put_OutBlack(forms).then(res=>{
            this.freezeDialogFlag = false;
            this.$message.success('移出黑名单成功')
            this.changeList()
          }).catch(err=>{
            this.freezeDialogFlag = false;
            this.$message.success('移出黑名单失败')
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
.blackInfo{
}
</style>




