<template>
     <div class="userRevitalize commoncss">
        <el-dialog :title="typetitle" :visible="dialogFormVisible_add" :modal-append-to-body = 'false' :before-close="close" top="5vh" :close-on-click-modal="false" ref="dialog">
        <el-form :model="formAll" ref="formAll" :rules="rulesForm">
          <el-row>
            <el-col :span="24">
                <el-form-item label="业务类型：" prop="businessType" :label-width="formLabelWidth">
                  <el-radio-group v-model="formAll.businessType" v-for="item of businessTypeList" :key="item.code" size="medium" :disabled="editType=='view'">
                      <el-radio-button :label="item.code">{{item.name}}</el-radio-button>
                  </el-radio-group>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
                <el-form-item label="推送用户：" prop="userType" :label-width="formLabelWidth">
                  <el-radio-group v-model="formAll.userType" v-for="item of userTypeList" :key="item.code" size="medium" :disabled="editType=='view'">
                      <el-radio-button :label="item.code">{{item.name}}</el-radio-button>
                  </el-radio-group>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
                <el-form-item label="活动名称：" prop="name" :label-width="formLabelWidth">
                      <el-input clearable v-model="formAll.name" :disabled="editType=='view'" maxlength="30" ></el-input>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
                <el-form-item label="推送方式：" prop="pushType" :label-width="formLabelWidth">
                  <el-checkbox-group v-model="formAll.pushType" :disabled="editType=='view'">
                     <el-checkbox v-for="item in pushTypeList" :label="item.code" :key="item.code" border size="medium">{{item.name}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" v-if="formAll.pushType.includes(0)">
                <el-form-item label="通知标题：" prop="title" :label-width="formLabelWidth">
                      <el-input clearable v-model="formAll.title" maxlength="30" :disabled="editType=='view'"></el-input>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" v-if="formAll.pushType.includes(0)">
                <el-form-item label="通知内容：" prop="content" :label-width="formLabelWidth" class="textArea" >
                        <el-input type="textarea" :rows="2" placeholder="1-50间的字符" maxlength="50" ref="infofocus" v-model="formAll.content" clearable :disabled="editType=='view'"></el-input>
                        <p class="countNum"><span class="">{{formAll.content.length}}</span> <span>/ 50</span> </p>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" v-if="formAll.pushType.includes(1)">
                <el-form-item label="短信内容：" prop="smsContent" :label-width="formLabelWidth" >
                      <el-button type="primary" size='mini' @click="OpenSMSdialog">从短信模板库选择</el-button>
                      <el-input clearable v-model="formAll.smsContent" disabled></el-input>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
          <el-col :span="24">
                <el-form-item label="推送权益：" :label-width="formLabelWidth">
                 <el-select v-model="formAll.pushCoupon" clearable placeholder="请选择" :disabled="editType=='view'" filterable >
                          <el-option
                              v-for="item in coupontableDataAll"
                              :key="item.id"
                              :label="item.activityName"
                              :value="item.id">
                         </el-option>
                 </el-select>
                </el-form-item>
          </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
                <el-form-item label="推送时间：" prop="pushTimeType" :label-width="formLabelWidth">
                  <el-radio-group v-model="formAll.pushTimeType" v-for="item of pushTimeTypeList" :key="item.code" size="medium" :disabled="editType=='view'">
                      <el-radio-button :label="item.code">{{item.name}}</el-radio-button>
                  </el-radio-group>
                 <div v-if="formAll.pushTimeType=='1'">
                 <div class="getTypeList" v-for="(form,keys) in FlxedTimeList" :key='keys'>
                  <el-date-picker
                  :disabled="editType=='view'"
                  v-model="FlxedTimeList[keys].time"
                  type="datetime"
                  default-time="00:00:00"
                  value-format="timestamp"
                  @change="Ctime(keys,$event)"
                  placeholder="选择日期">
                  </el-date-picker>
                 <span class="addItem PositionCancle" v-if="keys == 0" @click="addItem"></span>
                 <span class="reduceItem PositionCancle" v-else @click="reduceItem(keys)"></span>
                 </div>
                 </div>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
                <el-form-item label="推送用户：" prop="pushUsers" :label-width="formLabelWidth">
                  <div class="tabsWrap">
                     <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
                          <el-tab-pane label="填写手机号" name="first">
                            <p class="">请填写用户手机号，一行一个手机号</p>
                            <el-input type="textarea" :rows="5" v-model="mobile" clearable :disabled="editType=='view'"></el-input>
                          </el-tab-pane>
                          <el-tab-pane label="模板批量推送" name="second">
                            <p>请上传模板批量推送</p>
                            <p>格式：txt文档，一行一个手机号</p>
                            <div class="upload-container">
                            <el-upload
                              class="image-uploader"
                              :data="upload"
                              :before-upload="beforeUpload" 
                              :on-success="handleImageScucess"
                              :action="uploadUrl"
                               multiple
                               :show-file-list="false"
                              :limit="3"
                              v-show="!fileName"
                              ref="upload"
                              >
                            <slot name="content">
                                <el-button size="mini" type="primary">点击上传</el-button>
                            </slot>
                            </el-upload>
                            <div class="image-preview" v-show="fileName">
                                <div class="image-preview-wrapper">
                                    <a class="fileName" target="_blank" :href="fileName">{{fileName}}</a>
                                    <i @click="rmImage" class="el-icon-delete" v-if="editType!=='view'"></i>
                                </div>
                            </div>
                            </div>
                          </el-tab-pane>
                      </el-tabs>
                  </div>
                </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary"  v-if="editType=='add'&&editType!=='view'" @click="add_data" >确 定</el-button>
          <el-button type="primary"  v-if="editType=='edit'&&editType!=='view'" @click="updata_data" >确 定</el-button>
          <el-button @click="close()" >取 消</el-button>
        </div>
      </el-dialog>

      <el-dialog title="短信模板" :visible="SMSdialog" :modal-append-to-body = 'false' :before-close="SMSdialogClose" top="5vh" :close-on-click-modal="false">
      <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
          <el-form-item label="短信内容">
                <el-input clearable v-model="SmsForm.smsContent"></el-input>
          </el-form-item>
          <el-form-item class="fr">         
          <el-button type="primary" plain @click="getData_query" :size="btnsize" icon="el-icon-search">搜索</el-button>
          <el-button type="info" plain @click="clearSearch"  :size="btnsize" icon="fontFamily aflc-icon-qingkong">清空</el-button>
          </el-form-item>
          </el-form>
          	<div class="classify_info">
            <div class="info_news">    
            <el-table ref="multipleTable" style="width: 100%" stripe border height="100%" highlight-current-row :data="tableDataAll"  tooltip-effect="dark">
           <el-table-column label="序号" width="60">
                <template slot-scope="scope">
                  {{ (page - 1)*pagesize + scope.$index + 1 }}
                </template>
            </el-table-column>
            <el-table-column  label="业务类型" prop="businessType"  show-overflow-tooltip width="100"></el-table-column>
            <el-table-column  label="推送用户" prop="userType"  show-overflow-tooltip width="100"></el-table-column>
            <el-table-column  label="短信内容" prop="smsContent"  show-overflow-tooltip ></el-table-column>
            <el-table-column  label="操作" prop=""  show-overflow-tooltip width="100">
              <template slot-scope="scope">
              <h4 class="needMoreInfo" @click="JoinDetail(scope.row)">选择</h4>
              </template>
              </el-table-column>  
            </el-table>
            <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes" ref="pager"/></div> </div>  
          <div slot="footer" class="dialog-footer">
            <el-button @click="SMSdialogClose()" >取 消</el-button>
          </div>
          </div>
          </div>
      </el-dialog>
    </div>
</template>
<script>
import Upload from "@/components/Upload/CarSinglemage";
import { eventBus } from '@/eventBus'
import GetCityList from '@/components/GetCityList/city'
import { getDictionary,getUploadPolicy } from "@/api/common.js";
import { parseTime,pickerOptions2 } from '@/utils/'
import Pager from '@/components/Pagination/index'
import { aflcCouponGetActivityCreate,aflcCouponGetActivityupdate,aflcMarketingActivityManagement_Id,aflcSmsTemplate_list } from '@/api/marketing/userRevitalize'
import {data_get_couponActivehand_list} from '@/api/marketing/shippermarkting/couponActive.js'
export default {
  components: {
    Upload,
    GetCityList,
    Pager
  },
  props: {
    params:{
        type:[Object,Array],
    },
    paramsId:{
        type: String,
        default: ''
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
    // 推送用户
    const pushUsersValidator = (rule, val, cb) => {
      if(this.activeName == 'first'){
         if(!this.mobile){
          cb(new Error("请填写推送用户"));
         }
         else{
          cb()
         }
         
      }
      else{
        if(!this.fileName){
          cb(new Error("请填写推送用户"));
         }
         else{
          cb()
         }
      }
    };
    return {
      defaultImg:'/static/test.jpg',
      formLabelWidth:'150px',
      activeName:'first',
      coupontableDataAll:[],
      pickerOptions2: {shortcuts: pickerOptions2},
      btnStatus:true, //新增修改按钮状态  
      btnsize: 'mini',
      formAll: {
        businessType:null,
        userType:null,
        name:null,
        pushType:[],
        title:null,
        content:'',
        smsTemp:null,
        smsContent:null,
        pushCoupon:null,
        pushTimeType:null,
        pushTime:null,
        pushUsers:null,
      },
      rulesForm: {
        businessType: { required: true, message: "请选择业务类型", trigger: "change" },
        userType: { required: true, message: "请选择推送用户", trigger: "change" },
        name: { required: true, message: "请输入活动名称", trigger: "change" },
        pushType: { required: true, message: "请选择至少一种推送方式", trigger: "change" },
        title: { required: true, message: "请输入活动标题", trigger: "change" },
        content: { required: true, message: "请输入通知内容", trigger: "change" },
        smsContent: { required: true, message: "请从短信模板库选择短信内容", trigger: "change" },
        pushTimeType: { required: true, message: "请选择推送时间类型", trigger: "change" },
        pushUsers: { validator: pushUsersValidator, trigger: "change", required: true },
      },
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      dataTotal: 0,
      tableDataAll: [],
      SMSdialog:false,
      businessTypeList:[],    //业务类型
      userTypeList:[{name:'货主',code:'AF00101'},{name:'车主',code:'AF00102'}],            //用户类型
      pushTypeList:[{name:'通知栏',code:0},{name:'短信',code:1}],                 //推送模式
      pushTimeTypeList:[{name:'立即推送',code:0},{name:'定时推送',code:1}],             //推送时间类型
      created:[],
      mobile: this.$store.state.marketing.mobilePhone,
      template:null,
      SmsForm:{
        smsContent:null,
      },
      FlxedTimeList:[{time:''}],
      upload: {
        'key': '', // 文件名称
        'policy': '',
        'OSSAccessKeyId': '',
        'success_action_status': '201', // 让服务端返回200,不然，默认会返回204;201会返回xml格式
        'signature': ''
      },
      uploadUrl:'',
      fileName:'',
      dir:''
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
          this.formAll.pushType = []
          this.$refs.upload.clearFiles()
          this.activeName = 'first'
          this.fileName = ''
          this.uploadUrl = ''
          this.mobile = ''
          this.FlxedTimeList = [{time:''}]
        }
        else{
          if(this.editType!='add'){
          this.openDialog();
          }
          this.getMoreInformation()
          this.getPolicy()
          this.Smsfirstblood()
          this.btnStatus = true
        }
      }
    },
    SMSdialog:{
      handler: function(val, oldVal) {
      if(!val){
       this.clearSearch()
      }
      }
    }
  },
  methods: {
    getPolicy(){
      return getUploadPolicy('aflc').then(data => {
        this.upload.OSSAccessKeyId = data.accessid
        this.upload.policy = data.policy
        this.upload.signature = data.signature
        this.uploadUrl = data.host
        this.dir = data.dir
      }).catch(err => {
        console.log('get Policy ERror:', err)
      })
    },
    openDialog: function() {
     if(this.editType=='view'){
       this.getMethods(this.paramsId)
     }
     else{
       this.getMethods(this.params[0].id)
     }
    },
    getMethods(id){
        aflcMarketingActivityManagement_Id(id).then(res=>{
        this.formAll = res.data
        if(this.formAll.pushUsers.indexOf('.txt')=='-1'){
        this.activeName = 'first'
        this.mobile = this.formAll.pushUsers.replace(new RegExp('[,]','g'),'\n')
        }
        else{
        this.activeName = 'second'
        this.fileName = this.formAll.pushUsers
        }
        this.formAll.pushType = JSON.parse(this.formAll.pushType)
        this.formAll.pushTime.split(',').forEach((item,i)=>{
        if(i==0){
          this.FlxedTimeList[i].time= new Date(item).getTime()
        }
        else{
          this.FlxedTimeList.push({time:new Date(item).getTime()})
        }
        })
        })
    },
    close: function() {
      this.$emit('update:dialogFormVisible_add', false);
    },
    handleClick(tab, event){
      this.activeName = tab.name;
    },
    // 获取  服务和车辆 类型列表
    getMoreInformation() {
      data_get_couponActivehand_list(1,1000000,{usingStatus:'1'}).then(res => {
        this.coupontableDataAll = res.data.list;
      })
      getDictionary('AF017').then(res => {
          this.businessTypeList = res.data
      })
    },
    // 短信模板列表
    Smsfirstblood(){
      aflcSmsTemplate_list(this.page, this.pagesize, this.SmsForm).then(res => {
        this.dataTotal = res.data.totalCount
        this.tableDataAll = res.data.list
      })
    },
    // 定时日期增加
    addItem(){
      if(this.editType!=='view'){
      this.FlxedTimeList.push({time:null})
      }
    },
    // 定时日期减少
    reduceItem(i){
      if(this.editType!=='view'){
            if(this.FlxedTimeList.length>1){
            this.FlxedTimeList.splice(i,1);
            }
            else{
            return
      }
      }
   },
   Ctime(i,e){
    var nowTime = new Date().getTime()
    if(nowTime > e){
      this.$message.info('定时推送时间不能小于当前时间')
      this.FlxedTimeList[i].time = null
    }
   },
   // 打开短信模板弹窗
   OpenSMSdialog(){
     this.SMSdialog= true
   },
   // 关闭短信模板弹窗
   SMSdialogClose(){
     this.SMSdialog= false
   },
   // 短信模板弹窗搜索
   getData_query(){
   this.Smsfirstblood()
   },
   // 短信模板弹窗清空
   clearSearch(){
   this.SmsForm.smsContent = null
   if(this.page!= 1){
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
    }
    this.Smsfirstblood()
   },
   // 短信模板弹窗页数
   handlePageChange(obj){
      this.page = obj.pageNum
      this.pagesize = obj.pageSize
      this.firstblood()
   },
   JoinDetail(i){
   if(i.status==1){
   this.formAll.smsContent = i.smsContent
   this.formAll.smsTemp = i.smsTempCode
   this.SMSdialogClose()
   }
   else{
   this.$message.error('该条短信模板已被禁用！')
   }
   },
    // txt文件上传前
    beforeUpload(file){
      const _self = this
      const isJPG = file.type.indexOf('text')
      return new Promise((resolve, reject) => {
        if (isJPG==-1) {
          this.$message.error('上传图片只能是txt格式!')
          reject(false)
        } else {
          // 上传前统一获取下凭证
          this.getPolicy().then(res => {
            // 设置文件名
            this.upload.key = this.dir+ parseTime(new Date(), '{y}{m}{d}') + '/' + parseInt(Math.random()*100000) + '_' + file.name 
            resolve(true)
          }).catch(err => {
            this.$message.error('未知错误：' + JSON.stringify(err))
            resolve(false)
          })
        }
      })
    },
    // txt文件上传成功
    handleImageScucess(xml){
      let url = ''
      if (xml.indexOf('Location') !== -1) {
          url = xml.match(/<Location>([^<]+)<\/Location>/m)
          url = url ? url[1] : ''
      }
      this.fileName = url
    },
    //删除txt文件
    rmImage() {
      this.fileName = ''
    },
    judgeData(){
         var nowTime = new Date().getTime()
         if(this.formAll.pushTimeType=='1'){
         for(var i=0;this.FlxedTimeList.length>i;i++){
         if(!this.FlxedTimeList[i].time){
            this.$message.warning('定时推送时间第'+ (i+1) + '条不能为空')
            return false  
         }
         if(nowTime > this.FlxedTimeList[i].time){
            this.$message.warning('定时推送时间第'+ (i+1) + '条不能小于当前时间')
            return false  
         }
        }
      }
    },
    completeData(){
    if(this.activeName == 'first')
    {
      if(this.mobile){
      this.formAll.pushUsers = this.mobile
      this.formAll.pushUsers = this.formAll.pushUsers.replace(new RegExp('\n','g'),',')
      }
    }
    else{
      this.formAll.pushUsers = this.fileName
    }
    if(this.formAll.pushType.includes(0)&&!this.formAll.pushType.includes(1)){
      this.formAll.smsContent = ''
      this.formAll.smsTemp = ''
    }
    if(this.formAll.pushType.includes(1)&&!this.formAll.pushType.includes(0)){
      this.formAll.title = ''
      this.formAll.content = ''
    }
    this.FlxedTimeList.forEach((item,i)=>{
          if(i==0){
          this.formAll.pushTime = item.time
          }
          else{
          this.formAll.pushTime+=','+item.time
          }
    })
    },
    // 同城新增
    add_data() {
      console.log(this.formAll)
      this.completeData()
        this.$refs['formAll'].validate(valid => {
        if(valid){
        this.judgeData(); 
        if(this.judgeData()==false)
        {return}
        else{
          if (this.btnStatus) {
            this.btnStatus = false
        this.formAll.pushType = JSON.stringify(this.formAll.pushType)
           aflcCouponGetActivityCreate(this.formAll).then(res=>{
           this.$emit('update:dialogFormVisible_add', false);
           this.$message.success('新增成功')
         }).catch(err=>{
           this.$message.error(err.errorInfo)
           this.$emit('update:dialogFormVisible_add', false);
         })
          }
         }
        }
        })
    },
    // 修改
  updata_data() {
      this.completeData()
        this.$refs['formAll'].validate(valid => {
        if(valid){
        this.judgeData(); 
        if(this.judgeData()==false)
        {return}
        else{
          if (this.btnStatus) {
          this.btnStatus = false
          this.formAll.pushType = JSON.stringify(this.formAll.pushType)
           aflcCouponGetActivityupdate(this.formAll).then(res=>{
           this.$emit('update:dialogFormVisible_add', false);
           this.$message.success('修改成功')
           }).catch(err=>{
           this.$message.error(err.errorInfo)
           this.$emit('update:dialogFormVisible_add', false);
         })
         }
         }
        }
  })
  }
  }
}
</script>
<style lang="scss" >
.userRevitalize{
  .el-radio-group{
    &:nth-of-type(1){
     margin-left:0px;
    }
  }
  .el-checkbox{
    margin-right:10px;
  }
  .el-checkbox.is-bordered.el-checkbox--medium{
    padding: 9px 20px 9px 10px;
  }
  .getTypeList{
    position:relative;
    margin:5px 0px;
    .el-date-editor.el-input{
      width:220px;
    }
    .PositionCancle{
      left: 230px!important; 
      top: 7px!important;
    }
  }
  .classify_searchinfo{
      .el-input__inner{
        height:30px!important;
        line-height:30px!important;
      }
  }
  .info_tab_footer{
    position:relative;
    margin:10px 0px;
  }
  .classify_info{
        padding-bottom: 0px;
  }
  .upload-container{
    height: 50px;
    .el-upload{
      text-align: left;
    }
  }
  .textArea{
    .el-form-item__content{
      min-width: 80%!important;
    }
  }
  .fileName{
    color:#3e9ff1
  }
}

</style>
