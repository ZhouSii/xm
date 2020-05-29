<template>
     <div class="increase StyleNewinfoComponent commoncss">
        <el-dialog :title="typetitle" :visible="dialogFormVisible_add" :modal-append-to-body = 'false' :before-close="close" top="5vh" :close-on-click-modal="false" ref="dialog">
        <el-form :model="formAll" ref="formAll" :rules="rulesForm" label-position="top">
          <el-row>
            <el-col :span="11">
                <el-form-item label="领券活动名称(分享标题)：" prop="activityName">
                <el-input v-model="formAll.activityName" maxlength="20" :disabled="editType=='view'"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="11" class="top_input">
                <el-form-item label="活动时间：" prop="startTime">
                <el-date-picker
                v-model="created"
                type="daterange"
                unlink-panels
                clearable
                :picker-options="pickerOptions2"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
                :disabled="editType=='view'"
                @change='cTime'>
                </el-date-picker>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="23">
                <el-form-item label="分享说明内容：" prop="activityDes">
                <el-input v-model="formAll.activityDes" type="textarea" maxlength="20"  :rows="3" :disabled="editType=='view'"></el-input>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11" class="CheckPass">
                <el-form-item  labelPosition="top" prop="bannerUrl">
                <div class="uploadPicture">
                  <h3 class="uploadH3">
                    Banner图片：
                    <el-button type="primary" class="showPictureBtn" plain v-if="editType != 'view' && formAll.bannerUrl" @click="showCurrenPic('bannerUrl')">查看</el-button>
                  </h3>
                  <span v-if="editType == 'view'">
                    <div class="uploadImgBox" v-viewer>
                      <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                        <img :src="formAll.bannerUrl ? formAll.bannerUrl : defaultImg">
                      </el-tooltip>
                    </div>
                  </span>
                  <div class="upload_True" v-else>
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" pictureStatus=true v-model="formAll.bannerUrl" />
                  </div>
                </div>
                </el-form-item>
            </el-col>
            <el-col :span="11" class="top_input">
                <el-form-item  labelPosition="top" prop="shareIconUrl">
                <div class="uploadPicture">
                  <h3 class="uploadH3">
                    链接分享图标：
                    <el-button type="primary" class="showPictureBtn" plain v-if="editType != 'view' && formAll.shareIconUrl" @click="showCurrenPic('shareIconUrl')">查看</el-button>
                  </h3>
                  <span v-if="editType == 'view'">
                    <div class="uploadImgBox" v-viewer>
                      <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top">
                        <img :src="formAll.shareIconUrl ? formAll.shareIconUrl : defaultImg">
                      </el-tooltip>
                    </div>
                  </span>
                  <div class="upload_True" v-else>
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" pictureStatus=true v-model="formAll.shareIconUrl"/>
                  </div>
                </div>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
                <el-form-item label="领取间隔时间：" prop="getIntervalTimeCode">
                      <el-radio-group v-model="formAll.getIntervalTimeCode" v-for="item of optionsTime" :key="item.code" size="medium" :disabled="editType=='view'">
                        <el-radio-button :label="item.code">{{item.name}}</el-radio-button>
                      </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col :span="11" class="top_input">
                <el-form-item label="领取间隔时间内，可领取次数：" prop="intervalTimeLimit">
                <el-input v-model="formAll.intervalTimeLimit" v-numberOnly :disabled="editType=='view'"></el-input>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
                <el-form-item label="领取类型：" prop="getTypeCode">
                      <el-radio-group v-model="formAll.getTypeCode" v-for="item of optionsCoupon" :key="item.code" size="medium" :disabled="editType=='view'">
                        <el-radio-button :label="item.code">{{item.name}}</el-radio-button>
                      </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col :span="11" class="top_input">
                <el-form-item label="用户最多领取次数：" prop="perUserTimeLimit">
                <el-input v-model="formAll.perUserTimeLimit" v-numberOnly :disabled="editType=='view'"></el-input>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="23">
                <el-form-item>
                <div><span style="color:red;padding:0px 2px">*</span>优惠券活动名称：</div>
                <div class="getTypeList" v-for="(form,keys) in couponActivityIds" :key='keys'>
                 <el-select v-model="couponActivityIds[keys].id" clearable placeholder="请选择" :disabled="editType=='view'" filterable @change="couponActivityMethod(keys,$event)">
                          <el-option
                             v-for="item in tableDataAll"
                              :key="item.id"
                              :label="item.activityName"
                              :value="item.id">
                         </el-option>
                 </el-select>
                 <span class="addItem PositionCancle" v-if="keys == 0" @click="addItem"></span>
                 <span class="reduceItem PositionCancle" v-else @click="reduceItem(keys)"></span>
                 </div>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="23">
                <el-form-item label="活动规则(回车换行)：" prop="activityRuleDes">
                <el-input v-model="formAll.activityRuleDes" type="textarea"  :rows="3" :disabled="editType=='view'"></el-input>
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
        <transition name="el-zoom-in-top">
        <div class="PopupPic" v-el-drag-dialog v-show="showPopupPic">
            <div class="el-dialog">
            <div style="height:700px;">
                <div class="el-dialog__header">
                <i class="el-icon-close" @click="closePopPic"></i>
                </div>
                <div class="showPictureBox">
                <div class="PopupPicImg" v-viewer="{fullscreen: false,inline:true,navbar:false}">
                    <img :src="signImages ? signImages : defaultImg">
                </div>
                </div>
            </div>
            </div>
        </div>
        </transition>
    </div>
</template>
<script>
import Upload from "@/components/Upload/CarSinglemage";
import { eventBus } from '@/eventBus'
import GetCityList from '@/components/GetCityList/city'
import { getDictionary } from "@/api/common.js";
import { parseTime,pickerOptions2 } from '@/utils/'
import {data_get_couponActivehand_list} from '@/api/marketing/shippermarkting/couponActive.js'
import { aflcCouponGetActivityCreate,aflcCouponGetActivityupdate,openOrForbidden,aflcCouponGetActivity_Id} from '@/api/marketing/shippermarkting/couponCollocation.js'
export default {
  components: {
    Upload,
    GetCityList
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
    // 注册所在地
    const startTimeValidator = (rule, val, cb) => {
      if(!this.formAll.startTime){
         cb(new Error("活动时间不能为空"));
      }
      else{
         cb()
      }
    };
     const checkZero = (rule, value, callback) => {
        if(!value||value == 0) {
          callback(new Error('请输入大于0的数字'));
        } else {
          callback();
        }
      };
    return {
      defaultImg:'/static/test.jpg',
      formLabelWidth:'150px',
      showPopupPic: false,
      signImages: "",
      pickerOptions2: {shortcuts: pickerOptions2},
      btnStatus:true, //新增修改按钮状态  
      areaStatus:null,
      btnsize: 'mini',
      optionsCoupon: [], //领取类型
      optionsTime: [],   //领取间隔时间
      tableDataAll:[],   //优惠卷活动
      areaName: null,
      formAll: {
          activityName:null,
          startTime:null,
          endTime:null,
          activityDes:null,
          bannerUrl:null,
          shareIconUrl:null,
          getIntervalTimeCode:'',
          intervalTimeLimit:null,
          getTypeCode:'',
          perUserTimeLimit:null,
          couponActivityIds:null,
          activityRuleDes:null,
      },
      couponActivityIds:[{id:null}],
      created:[],
      rulesForm: {
        activityName: { required: true, message: "领券活动名称不能为空", trigger: "change" },
        startTime: { validator: startTimeValidator, trigger: "change", required: true },
        activityDes:{ required: true, message: "分享说明内容不能为空", trigger: "change" },
        bannerUrl:{ required: true, message: "Banner图片不能为空", trigger: "change" },
        shareIconUrl:{ required: true, message: "链接分享图标不能为空", trigger: "change" },
        getIntervalTimeCode:{ required: true, message: "分享说明内容不能为空", trigger: "change" },
        intervalTimeLimit:{ required: true, validator: checkZero, trigger: "change" },
        getTypeCode:{ required: true, message: "领取类型不能为空", trigger: "change" },
        perUserTimeLimit:{ required: true, validator: checkZero, trigger: "change" },
        activityRuleDes:{ required: true, message: "领取类型不能为空", trigger: "change" },
      }
    }
  },
  watch: {
    dialogFormVisible_add: {
      handler: function(val, oldVal) {
        if (!val) {
          this.couponActivityIds=[{id:null}]
          this.created=[]
          this.$refs['formAll'].resetFields()
          this.$emit('getData');
        }
        else{
          if(this.editType!='add'){
          this.openDialog();
          }
          this.getMoreInformation()
          this.btnStatus = true
        }
      }
    }
  },
  mounted() {
  },
  methods: {
    cTime(i){
      if(i){
        this.formAll.startTime = i[0];
        this.formAll.endTime = i[1];
      }else{  
        this.formAll.startTime = '';
        this.formAll.endTime = '';
      }
    },
    showCurrenPic(type) {
      let vier = document.querySelector(".viewer-container");
      vier.style.width = "100%";
      vier.style.height = "100%";
      switch (type) {
        case "bannerUrl":
          this.signImages = this.formAll.bannerUrl;
        break;
        case "shareIconUrl":
          this.signImages = this.formAll.shareIconUrl;
        break;
      }
      this.showPopupPic = true;
    },
    closePopPic() {
      this.showPopupPic = false;
    },
    //新增优惠券活动
    addItem(){
      if(this.editType!=='view'){
      this.couponActivityIds.push({id:null})
      }
    },
    //减少优惠券活动
    reduceItem(i){
      if(this.editType!=='view'){
            if(this.couponActivityIds.length>1){
            this.couponActivityIds.splice(i,1);
            }
            else{
            return
      }
      }
   },
   // 优惠券活动去重
   couponActivityMethod(i,e){
    this.couponActivityIds.forEach((item,index)=>{
      if(item.id == e&&index!==i){
        this.$message.error('优惠券活动不能重复')
        this.couponActivityIds[i].id = null
      }
    })
   },
   // 打开窗口
    openDialog: function() {
        aflcCouponGetActivity_Id(this.params[0].id).then(res=>{
        this.formAll = res.data
        this.created = [this.formAll.createTime,this.formAll.endTime]
        let NewCouponActivityIds = this.formAll.couponActivityIds.split(',')
        for(var i=0;i<NewCouponActivityIds.length;i++)
        {
          if(i==0){
            this.couponActivityIds = [{id:NewCouponActivityIds[i]}]
          }
          else{
            this.couponActivityIds.push({id:NewCouponActivityIds[i]})
          }
        }
        this.formAll.activityRuleDes = this.formAll.activityRuleDes.replace(new RegExp('[|]','g'),'\n')
        })
    },
    close: function() {
      this.$emit('update:dialogFormVisible_add', false);
    },
    // 获取  服务和车辆 类型列表
    getMoreInformation() {
      getDictionary('AF0465').then(res => {
          this.optionsCoupon = res.data
      })
      getDictionary('AF0466').then(res => {
          this.optionsTime = res.data
      })
      data_get_couponActivehand_list(0,0,{usingStatus:'1'}).then(res => {
        this.tableDataAll = res.data.list;
      })
    },
    completeData(){
    for(var i=0;i<this.couponActivityIds.length;i++){
      if(!this.couponActivityIds[i].id){
            this.$message.warning('第'+(i+1)+'条优惠券活动名称不能为空');
            return false
      }
    }
    },
    // 同城新增
    add_data() {
      this.completeData()
        if(this.completeData()==false)
        {
          return
        }
      else{
        this.$refs['formAll'].validate(valid => {
          if(valid){
          this.formAll.activityRuleDes=this.formAll.activityRuleDes.replace(new RegExp('\n','g'),'|')
          this.couponActivityIds.forEach((item,i)=>{
            if(i==0){
            this.formAll.couponActivityIds = item.id
            }
            else{
            this.formAll.couponActivityIds+=','+item.id
            }
          })
          this.btnStatus = false;
          this.$message.info("新增中...");
          aflcCouponGetActivityCreate(this.formAll).then(res=>{
              this.$message.success('新增成功');
              this.$emit('update:dialogFormVisible_add', false);
          }).catch(err=>{
              this.$message.error(err.data)
              this.$emit('update:dialogFormVisible_add', false);
          })
          }
          else{
              this.$message.error('请填写完整的数据')
          }
        })
      }
    },
    // 修改
    updata_data() {
      this.completeData()
        if(this.completeData()==false)
        {
          return
        }
      else{
        this.$refs['formAll'].validate(valid => {
        if(valid){
          this.formAll.activityRuleDes=this.formAll.activityRuleDes.replace(new RegExp('\n','g'),'|')
          this.couponActivityIds.forEach((item,i)=>{
            if(i==0){
            this.formAll.couponActivityIds = item.id
            }
            else{
            this.formAll.couponActivityIds+=','+item.id
            }
          })
          this.btnStatus = false;
          this.$message.info("修改中...");
          aflcCouponGetActivityupdate(this.formAll).then(res=>{
              this.$message.success('修改成功');
              this.$emit('update:dialogFormVisible_add', false);
          }).catch(err=>{
              this.$message.error(err.data)
              this.$emit('update:dialogFormVisible_add', false);
          })
        }
        else{
              this.$message.error('请填写完整的数据')
        }
        })
      }
    }
  }
}
</script>
<style lang="scss" >
.increase{
    display: inline-block;
    .el-dialog{
    width:1090px;
      .el-select{
        width:40%!important
      }
      .PositionCancle{
        position:relative!important;
        left: 5px!important;
        top: 8px!important;
      }
      .el-radio-group:nth-of-type(1){
        margin-left: 0px;
      }
      .getTypeList{
        margin-bottom:10px;
      }
    }
    .top_input{
        margin-left:5%;
    }
    .CheckPass{
        .el-form-item:first-child{
            margin-bottom: 0;
        }
        .el-form-item + .el-form-item{
            border: 1px solid #eee;
            border-top:0 none;
            padding: 5px 10px 5px 0;
        }
    }
    .uploadH3{
        text-align:center;
        border-bottom:1px solid #eee;
        background: #eee;
        position: relative;
        .showPictureBtn{
            position: absolute;
            right: 3px;
            top: 3px;
            padding: 10px 20px;
        }
    }
    .uploadPicture{
        width: 100%;
        border:1px solid #eee;
        margin:0px auto;
        .uploadImgBox{
            width:100%;
            height: 240px;
            line-height:15px;
            text-align:center;
            img{
                width: 100%;
                height: 100%;
            }
            .picURL{
                width: 385px;
                height: 215px;
                cursor: pointer;
            }
        }
        .upload_True{
            padding: 2px;
        }
        .uploadRadioBox{
            padding-left:10px;
            display:flex;
            justify-content: space-between;
            border-top:1px solid #eee;
            .el-select{
                width:250px!important;
            }
        }
    }
            .PopupPic{
                width: 0;
                height: 0;
                position: fixed;
                left: 21.5%;
                top: 20%;
                z-index: 3019;
                .el-dialog{
                    .el-dialog__header{
                        background-color: #fff;
                        position: relative;
                        border: 0 none;
                        padding:20px 0;
                        background-color: #42485b;
                        .el-icon-close{
                            color: #999;
                            position:absolute;
                            right:20px;
                            top:12px;
                            font-size: 20px;
                            cursor: pointer;
                            &:hover{
                                color: #409eff;
                            }
                        }
                    }
                    .showPictureBox{
                        min-height: 700px;
                        .PopupPicImg{
                            width: 100%;
                            height:700px;
                            img{
                                display: none;
                                width: 100%;
                                height:700px;
                            }
                            .viewer-container{
                                width: 100% !important;
                                height: 700px !important;
                            }
                            .viewer-backdrop {
                                width: 100% !important;
                                height: 700px !important;
                            }
                        }
                    }
                }
            }
}

</style>
