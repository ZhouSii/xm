<template>
     <div class="userRevitalize commoncss">
        <el-dialog :title="typetitle" :visible="dialogFormVisible_add" :modal-append-to-body = 'false' :before-close="close" top="5vh" :close-on-click-modal="false" ref="dialog">
        <el-form :model="formAll" ref="formAll" :rules="rulesForm">
          <el-row>
            <el-col :span="24">
                <el-form-item label="业务类型：" prop="" :label-width="formLabelWidth">
                  <el-radio-group v-model="formAll.businessType" v-for="item of businessTypeList" :key="item.code" size="medium">
                      <el-radio-button :label="item.code">{{item.name}}</el-radio-button>
                  </el-radio-group>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
                <el-form-item label="推送用户：" prop="" :label-width="formLabelWidth">
                  <el-radio-group v-model="formAll.userType" v-for="item of userTypeList" :key="item.code" size="medium">
                      <el-radio-button :label="item.code">{{item.name}}</el-radio-button>
                  </el-radio-group>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
                <el-form-item label="变量内容：" prop="" :label-width="formLabelWidth" class="textArea">
                        <el-input type="textarea" :rows="2" placeholder="1-50间的字符" maxlength="50" ref="infofocus" v-model="formAll.smsContent" clearable></el-input>
                        <p class="countNum"><span class="">{{formAll.smsContent.length}}</span> <span>/ 50</span> </p>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
                <el-form-item label="短信内容：" prop="" :label-width="formLabelWidth" class="textArea">
                        <el-input type="textarea" :rows="2" placeholder="1-50间的字符" maxlength="50" ref="infofocus" v-model="formAll.smsContent" clearable></el-input>
                        <p class="countNum"><span class="">{{formAll.smsContent.length}}</span> <span>/ 50</span> </p>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
            <el-form-item label="温馨提示：" prop="" :label-width="formLabelWidth" class="textArea">
              <p>1.新增模板或修改模板预计两小时完成审核</p>
              <p>2.审核工作时间: 周一至周日9:00-23:00（法定节日顺延）</p>
              <p>3.不支持【】，可能会与签名混淆。</p>
              <p>4.推广短信模板结尾处必须说明退订方式。仅支持回复TD、T或N退订短信，回复其他内容无效。</p>
              <p>5.短信模板最多500字，按照67个字符为1条短信收费。</p>
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
    </div>
</template>
<script>
import Upload from "@/components/Upload/CarSinglemage";
import { eventBus } from '@/eventBus'
import { getDictionary,getUploadPolicy } from "@/api/common.js";
import { parseTime,pickerOptions2 } from '@/utils/'
import Pager from '@/components/Pagination/index'
import { aflcCouponGetActivityCreate,aflcCouponGetActivityupdate,aflcMarketingActivityManagement_Id,aflcSmsTemplate_list } from '@/api/marketing/userRevitalize'
import {data_get_couponActivehand_list} from '@/api/marketing/shippermarkting/couponActive.js'
export default {
  components: {
    Upload,
    Pager
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
      formLabelWidth:'150px',
      pickerOptions2: {shortcuts: pickerOptions2},
      btnStatus:true, //新增修改按钮状态  
      btnsize: 'mini',
      formAll: {
          businessType:null,
          userType:null,
          smsContent:'',
      },
      businessTypeList:[],    //业务类型
      userTypeList:[{name:'货主',code:'AF00101'},{name:'车主',code:'AF00102'}],            //用户类型
      rulesForm: {
        activityName: { required: true, message: "领券活动名称不能为空", trigger: "change" },
      },
    }
  },
  watch: {
    dialogFormVisible_add: {
      handler: function(val, oldVal) {
        if (!val) {
          this.$refs['formAll'].resetFields()
          this.$emit('getData');
          this.formAll = {
          businessType:null,
          userType:null,
          smsContent:'',
          }
        }
        else{
          if(this.editType!='add'){
          this.openDialog();
          }
          this.getMoreInformation()
          this.btnStatus = true
        }
      }
    },
  },
  methods: {
    openDialog: function() {
        aflcMarketingActivityManagement_Id(this.params[0].id).then(res=>{
        this.formAll = res.data
        })
    },
    close: function() {
      this.$emit('update:dialogFormVisible_add', false);
    },
    // 获取  服务和车辆 类型列表
    getMoreInformation() {
      getDictionary('AF017').then(res => {
          this.businessTypeList = res.data
      })
    },
    completeData(){
    },
    // 同城新增
    add_data() {
        this.$refs['formAll'].validate(valid => {
        console.log(this.formAll)
        })
    },
    // 修改
  updata_data() {

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
}
</style>
