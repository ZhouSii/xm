<template>
  <div class="freezeDialog commoncss">
    <el-dialog :title="freezetitle" :visible="freezeDialogFlag"  :before-close="close" v-el-drag-dialog :close-on-click-modal="false" >
      <el-form :model="formFroze" ref="formFroze" :rules="formFrozeRules">
        <el-row>
            <el-col :span="12">
              <el-form-item label="手机号码：" :label-width="formLabelWidth">
                <!-- <span class="onlyShow">{{formFroze.mobile}}</span> -->
                <el-input v-model="formFroze.mobile" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公司名称：" :label-width="formLabelWidth">
                <!-- <span class="onlyShow">{{formFroze.companyName}}</span> -->
                <el-input v-model="formFroze.companyName" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-row>
            <el-col :span="12">
                <el-form-item label="联系人：" :label-width="formLabelWidth">
                    <!-- <span class="onlyShow">{{formFroze.contacts}}</span> -->
                    <el-input v-model="formFroze.contacts" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="所在地：" :label-width="formLabelWidth">
                    <!-- <span class="onlyShow">{{formFroze.belongCityName}}</span> -->
                    <el-input v-model="formFroze.belongCityName" disabled></el-input>
                </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24" class="moreLength">
                <el-form-item label="详细地址：" :label-width="formLabelWidth">
                    <!-- <span class="onlyShow">{{formFroze.address}}</span> -->
                    <el-input v-model="formFroze.address" disabled></el-input>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              	<el-form-item label="货主类型：" :label-width="formLabelWidth">
                    <!-- <span class="onlyShow">{{formFroze.shipperTypeName}}</span> -->
                    <el-input v-model="formFroze.shipperTypeName" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="注册来源：" :label-width="formLabelWidth">
                <!-- <span class="onlyShow">{{formFroze.registerOriginName}}</span> -->
                    <el-input v-model="formFroze.registerOriginName" disabled></el-input>
                </el-form-item>
            </el-col>
          </el-row>
          <div class="shipper_information">
            <h2>冻结信息</h2>
          </div>
          <el-row>
            <el-col :span="24">
                <el-form-item label="冻结原因：" prop="freezeCause" :label-width="formLabelWidth">
                    <!-- <span class="onlyShow" v-if="editType == 'remove'">{{formFroze.freezeCauseName}}</span> -->
                    <el-input v-model="formFroze.freezeCauseName" v-if="editType == 'remove'" disabled></el-input>
                    <el-select v-model="formFroze.freezeCause" placeholder="请选择" v-else clearable>
                        <el-option
                        v-for="item in optionsReason"
                        :key="item.id"
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
                <!-- <span class="onlyShow" v-if="editType == 'remove'">{{formFroze.unfreezeTime | parseTime}}</span> -->
                <el-input :value="formFroze.unfreezeTime | parseTime" v-if="editType == 'remove'" disabled></el-input>
                <div v-else>
                    <el-date-picker
                    v-model="formFroze.unfreezeTime"
                    placeholder="选择日期"
                    type="date"
                    format="yyyy-MM-dd" 
                    :picker-options="pickerOptions">
                    </el-date-picker>
                    <el-radio-group v-model="radio" @change="timeChange">
                    <el-radio :label="1">1天</el-radio>
                    <el-radio :label="3">3天</el-radio>
                    <el-radio :label="7">一周</el-radio>
                    <el-radio :label="9">一个月</el-radio>
                    <el-radio :label="10">永久</el-radio>
                    </el-radio-group>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="冻结说明：" :label-width="formLabelWidth">
                <el-input type="textarea" :rows="5" :maxlength="100" v-model="formFroze.freezeCauseRemark" :disabled="editType == 'remove'" class="textArea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div v-if="editType == 'remove'">
            <div class="shipper_information">
                <h2>解冻</h2>
            </div>
            <el-row>
                <el-col :span="24">
                <el-form-item label="解冻说明：" :label-width="formLabelWidth">
                    <el-input type="textarea" :rows="2" :maxlength="100" v-model="formFroze.unfreezeRemark" class="textArea"></el-input>
                </el-form-item>
                </el-col>
            </el-row>
          </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" plain  icon="el-icon-success" @click="onSubmit">确 定</el-button>
        <el-button type="primary" plain icon="el-icon-error" @click="close">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

// import {data_get_shipper_change} from '@/api/users/shipper/all_shipper.js'
import { DicfreezeType } from '@/api/common.js'
import { parseTime } from '@/utils/'
import { FreezeShipperConfig,ShipperConfigDetails } from '@/api/users/shipper/all_shipper.js'

export default {
  name:'shipperfreezeDialog',
  components:{

  },
  props:{
    freezetitle:{
        type:String,
        default:'冻结'
    },
    paramsView:{
        type:Object,
    },
    freezeDialogFlag:{
        type:Boolean,
        default:false
    },
    editType: {
        type: String,
        default: 'edit'
    },
    freeze:{
        type:Boolean
    },
  },
  data(){
    return{
      type:'primary',
      title:'',
      text:'',
      optionsReason:[],
      formLabelWidth:'120px',
      formFroze: { // 冻结弹框表单
        // accountStatus:'',//账户状态
        // address:'',//详细地址
        // belongCityName:'',//所在地名称
        // companyName:'',//公司名称
        // contacts:'',//联系人
        // mobile:'',//手机号码
        // registerOrigin:'',//注册来源
      },
        radio: '',
        pickerOptions:{
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      formFrozeRules:{
        freezeCause:{required: true,message:'请选择冻结原因',trigger:['blur', 'change']},
        unfreezeTime:{required:true,message:'请选择解冻日期',trigger:['change']}
      }
    }
  },
  watch:{
       freezeDialogFlag:{
        handler: function(val, oldVal) {
            if(val){
                this.openDialog();
                // if(this.editType != 'remove'){
                    // this.getMoreInformation();
                // }
            }
        },
    },
  },
  mounted(){
    this.getMoreInformation();
  },
  methods:{
    close(done) {
        this.$emit('update:freezeDialogFlag', false);
        this.$emit('getData');
        this.$refs.formFroze.resetFields();
        this.formFroze = { // 冻结弹框表单
            freezeCause:null,
            unfreezeTime:null,
            freezeCauseRemark:null,
            unfreezeRemark:null
        }
        if (typeof done === 'function') {
            done()
        }
    },
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
    openDialog(){
        console.log('this.paramsView',this.paramsView)
        ShipperConfigDetails(this.paramsView.shipperId).then(res => {
            this.formFroze = Object.assign({},res.data) ;
            this.formFroze.unfreezeTime = this.formFroze.unfreezeTime ? this.formFroze.unfreezeTime : Date.parse(new Date());;
            this.formFroze.freezeCauseName = this.optionsReason.find(item => item.code === this.formFroze.freezeCause)['name'];
            if(this.editType == 'add'){
                // this.formFroze.unfreezeTime = this.formFroze.unfreezeTime ? this.formFroze.unfreezeTime : new Date();
                this.formFroze.id = this.paramsView.id;
                this.formFroze.mobile = this.paramsView.mobile;
            }else{
                this.formFroze.unfreezeTime = this.formFroze.unfreezeTime ? this.formFroze.unfreezeTime : new Date();
            }
        })
    },
    getMoreInformation(){
        // 获取冻结原因下拉
        // DicfreezeType().then(res=>{
        //     this.optionsReason = res.data;
        // })
        this.$store.dispatch("GetInfoDic", "AF02003").then(res => {
            this.optionsReason = res;
        });
    }, 
    // 提交数据
    onSubmit(){
        this.$refs['formFroze'].validate((valid)=>{
            if(valid){
                switch (this.editType){
                    case 'add' :
                        var forms = Object.assign({}, this.formFroze,{accountStatus:"AF0010502",accountStatusName:'冻结中'});
                        // forms.freezeCauseName = this.optionsReason.find(item => item.code === forms.freezeCause)['name'];
                        // console.log('forms',forms)
                        let item =  forms.mobile;
                        this.$confirm('确定要将'+ item +' 货主冻结吗？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then( ()=>{
                            FreezeShipperConfig(forms).then(res=>{
                                this.$message({
                                    type: 'success',
                                    message: '该货主已被冻结',
                                })
                                this.close()
                            }).catch(err => {
                                this.$message({
                                    type: 'info',
                                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                                })
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            })
                        })
                        break;
                    case 'remove':
                        var forms= Object.assign({}, this.formFroze,{accountStatus:"AF0010501",accountStatusName:'正常'})
                        let itemMove =  forms.mobile;
                        this.$confirm('确定要将'+ itemMove +' 货主解冻吗？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then( ()=>{
                            FreezeShipperConfig(forms).then(res=>{
                                this.$message({
                                    type: 'success',
                                    message: '该货主已被解冻',
                                    duration:2000
                                })
                                this.close()
                            }).catch(err => {
                                this.$message({
                                    type: 'info',
                                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                                })
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            })
                        })
                        break;
                    case 'edit' :
                        var forms= Object.assign({}, this.formFroze)
                        FreezeShipperConfig(forms).then(res=>{
                            this.close()
                            this.$message({
                                type: 'success',
                                message: '操作成功~'
                            })
                        }).catch(err => {
                             this.$message({
                                type: 'info',
                                message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                            })
                        })
                }
            }
        })
    }
  }
}
</script>
<style lang="scss">
    .freezeDialog{
        .el-date-editor.el-input, .el-date-editor.el-input__inner {
            width: 220px;
        }
    }
</style>


