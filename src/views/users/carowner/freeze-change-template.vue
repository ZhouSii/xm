<template>
  <div class="freezeInfo commoncss">
    <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()" size="mini"><span :class="editType=='view'?'BtnInfo':''">{{btntext}}</span ></el-button>
    <el-dialog :title="btntext" :visible.sync="freezeDialogFlag" :before-close="change()" top=5vh v-dialogDrag :closeOnClickModal='false'>
      <el-form :model="formFroze" ref="formFroze" :rules="formFrozeRules">
          <div class="shipper_information">
            <h2>冻结原因</h2>
          </div>
          <el-row>
            <el-col :span="24">
              <el-form-item label="冻结原因：" prop="freezeCause" :label-width="formLabelWidth">
              <el-select v-model="formFroze.freezeCause" placeholder="请选择" :disabled="editType == 'edit-three'" clearable>
                <el-option
                  v-for="item in optionsReason"
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
              <el-form-item label="解冻日期：" :label-width="formLabelWidth" prop="unfreezeTime">
                <el-date-picker
                  v-model="formFroze.unfreezeTime"
                  type="datetime"
                  placeholder="选择日期"
                  value-format="timestamp"
                  format="yyyy-MM-dd"
                  :picker-options="pickerOptions" :disabled="editType == 'edit-three'">
                </el-date-picker>
                <el-radio-group v-model="radio" @change="timeChange" :disabled="editType == 'edit-three'">
                  <el-radio :label="1">1天</el-radio>
                  <el-radio :label="3">3天</el-radio>
                  <el-radio :label="7">一周</el-radio>
                  <el-radio :label="9">一个月</el-radio>
                  <el-radio :label="10">永久</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="冻结原因说明：" :label-width="formLabelWidth">
                <el-input type="textarea" class="textArea" :rows="2" :maxlength="100" v-model="formFroze.freezeCauseRemark "  v-if=" editType == 'edit'|| editType == 'edit-two'" ></el-input>
                <el-input type="textarea" class="textArea" :rows="2" :maxlength="100" v-model="formFroze.freezeCauseRemark " v-else-if=" editType == 'edit-three'" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="shipper_information" v-if=" editType == 'edit-three'">
            <h2>解冻</h2>
          </div>
          <el-row v-if=" editType == 'edit-three'"> 
            <el-col :span="24">
              <el-form-item label="解冻原因说明：" :label-width="formLabelWidth">
                    <el-input type="textarea" class="textArea" :rows="2" :maxlength="100"  v-model="formFroze.unfreezeCauseRemark "></el-input>
              </el-form-item>
            </el-col>
          </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit" v-if=" editType == 'edit'">确 定</el-button>
        <el-button type="primary" @click="onSubmit2" v-else-if=" editType == 'edit-two'">确定</el-button>
        <el-button type="primary" @click="onSubmit3" v-else-if=" editType == 'edit-three'">确定</el-button>
        <el-button @click="freezeDialogFlag = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import GetCityList from '@/components/GetCityList'
import {parseTime} from '@/utils/'
import { eventBus } from '@/eventBus'
import  {data_put_freezeDriver,data_get_freezeDriverchange,data_unbind_freezeDriverchange,data_Get_carType,data_get_car_freezeType,data_get_driver_obStatus,data_get_shipper_carmaid,data_get_shipper_carOwner} from '@/api/users/carowner/total_carowner.js'
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
      formLabelWidth:'150px',
      freezeDialogFlag:false,
      formFroze: { // 冻结弹框表单
        driverMobile:null, // 手机号
        driverName: null, // 公司名称
        carTypeName:null,
        carNumber:null, // 详细地址
        driverCardid:null, // 身份证号码
        belongCity:null, // 所在地
        registerOrigin:'', // 注册来源
        creditCode:null, // 统一社会信用代码
        freezeTime:null,
        freezeCause:null,
        freezeCauseRemark :null,
        belongCityName:null,
        obtainGrade:null,
        obtainGradeName:null,
        obtainGradeTime:null,
        unfreezeCauseRemark:null,
        unfreezeTime:null,
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
        unfreezeTime:{required:true,message:'请选择解冻日期',trigger:'change'}
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
                this.formFroze.freezeCauseRemark = null
                this.radio = ''
            }
            else{
                this.getMoreInformation()
            }
        }
        }
        },
  methods:{
    timeChange(val){
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
      this.formFroze.unfreezeTime = time
    },
    change(){
      this.freezeDialogFlag!=this.freezeDialogFlag
    },

    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    changeList(){
      eventBus.$emit('changeListtwo')
    },
    openDialog(){
      //冻结
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
        if(this.params[0].accountStatusName == '冻结中' && this.editType == 'edit'){
            this.$message.info('您选中的车主已被冻结，不需多次冻结！');
            this.$emit('getData')
            return
        }
        else if(this.params[0].accountStatusName != '冻结中' && this.editType == 'edit-two'){
            this.$message.info('您选中的车主未被冻结，不可做此操作！');
            this.$emit('getData')
            return
        }
        else if(this.params[0].accountStatusName != '冻结中' && this.editType == 'edit-three'){
            this.$message.info('您选中的车主未被冻结，无需移除！');
            this.$emit('getData')
            return
        }
        else{
        data_get_driverName_id(this.params[0].driverId).then(res=>{
             this.formFroze = res.data;
             if(this.params[0].accountStatus !== 'AF0010502'){
               this.formFroze.freezeCause = null
               this.formFroze.unfreezeTime = null
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
            // 获取车主冻结原因下拉
            data_get_car_freezeType().then(res=>{
                this.optionsReason = res.data
            })           
            
    },
    // 冻结提交数据
    onSubmit(){
      this.$refs['formFroze'].validate((valid)=>{
        if(valid){
          this.formFroze.freezeTime = new Date().getTime()
          var forms= Object.assign({}, this.formFroze)
          data_put_freezeDriver(forms).then(res=>{
            this.freezeDialogFlag = false;
            this.$message.success('冻结修改成功')
            this.changeList();
          }).catch(err=>{
            this.freezeDialogFlag = false;
            this.$message.error('冻结修改失败')
          })
        }
      })
    },
    //冻结修改
    onSubmit2(){
        this.$refs['formFroze'].validate((valid)=>{
        if(valid){
          this.formFroze.freezeTime = new Date().getTime()
          var forms= Object.assign({}, this.formFroze)
          data_get_freezeDriverchange(forms).then(res=>{
            this.freezeDialogFlag = false;
            this.changeList();
            this.$message.success('冻结修改成功')
          }).catch(err=>{
            this.freezeDialogFlag = false;
            this.$message.error('冻结修改失败')
          })
        }
      })
    },
    //解冻
    onSubmit3(){
        this.$refs['formFroze'].validate((valid)=>{
        if(valid){
          var forms= Object.assign({}, this.formFroze)
         data_unbind_freezeDriverchange(forms).then(res=>{
            this.freezeDialogFlag = false;
            this.$message.success('解冻修改成功')
            this.changeList();
          }).catch(err=>{
            this.freezeDialogFlag = false;
            this.$message.error('解冻修改失败')
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
</style>




