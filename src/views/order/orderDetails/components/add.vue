<template>
  <div class="wzlAddgenjing">
    <el-dialog
      :title="popTitle"
      :visible.sync="isShow"
      width="40%"
      top="18vh"
      v-el-drag-dialog
      center
      @close="closeMe"
      :close-on-click-modal="false"
      :before-close="closeMe"
    >
      <el-form
        :model="formAllData"
        :rules="rules"
        ref="ruleForm"
        :inline="false"
        label-width="150px"
        label-position="right"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="跟进人：" prop="followName">
              <el-input
                v-model="formAllData.followName"
                :maxlength="20"
                placeholder="请输入跟进人"
                auto-complete="off"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="code" label-width="50px">
              <el-checkbox v-model="formAllData.code">是否处理完毕</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row >
          <el-col :span="12">
            <el-form-item prop="code" label="扣除行为分：">
              <el-select
                v-model="formAllData.riskControlCode"
                multiple
                collapse-tags
                placeholder="请选择"
              >
                <el-option
                  v-for="item in optionsRisk"
                  :key="item.id"
                  :label="item.ruleDescSetting"
                  :value="item.code"
                >
                  <span style="float: left">{{ item.ruleDescSetting }}</span>
                  <span
                    style="float: right; color: #8492a6; font-size: 13px;margin-right: 16px;"
                  >{{ item.subBehaviorScore ? item.subBehaviorScore + '分' : '' }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>-->
        <el-row>
          <el-col :span="18">
            <el-form-item
              class="goodsclaimDes"
              :label="isClaim?'物损跟进：':'投诉跟进：'"
              prop="goodsclaimDes"
            >
              <el-input
                v-model="formAllData.goodsclaimDes"
                type="textarea"
                :maxlength="200"
                placeholder="投诉跟进最多输入200个字符"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item class="clearfix imgbox" label="上传附件：" prop="fileAddress">
          <div class="clearfix uploadcard">
            <upload
              :title="'本地上传'"
              @filelist="getFileList"
              v-model="formAllData.fileAddress"
              :showFileList="true"
              :limit="4"
              listtype="picture"
              @fileInfo="getFileInfo"
            />
          </div>
        </el-form-item>
        <div v-if="formAllData.code">
          <el-row>
            <el-col :span="12">
              <el-form-item label="违规行为：" prop="riskControlCode">
                <el-select
                  v-model="formAllData.riskControlCode"
                  multiple
                  collapse-tags
                  @change="riskeAction"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in optionsRisk"
                    :key="item.id"
                    :label="item.ruleDescSetting"
                    :value="item.code"
                  >
                    <span style="float: left">{{ item.ruleDescSetting }}</span>
                    <span
                      style="float: right; color: #8492a6; font-size: 13px;margin-right: 15px;"
                    >{{ item.subBehaviorScore ? item.subBehaviorScore + '分' : '' }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="扣行为分：" prop="deductionBehavior">
                <el-input v-model="formAllData.deductionBehavior" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="冻结车主账号：">
                <el-select v-model="formAllData.freezeFlag" clearable placeholder="请选择">
                  <el-option
                    v-for="item in optionsFrozen"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code"
                    :disabled="item.disabled"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="是否发短信通知：">
                <el-radio-group v-model="formAllData.sendMessageFlag">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="处罚原因：">
                <el-input
                  type="textarea"
                  placeholder="请输入处罚原因"
                  v-model="formAllData.punishmentDesc"
                  maxlength="20"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" plain icon="el-icon-success" @click="submitForm('ruleForm')">确 定</el-button>
        <el-button type="primary" plain icon="el-icon-error" @click="closeMe">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Upload from "@/components/Upload/multImage";
// import { DicClaimStatusType } from '@/api/common'
import { postReportClaimAdd } from "@/api/service/claim.js";
import { postAddComplain, listComplainSetting } from "@/api/service/dispose.js";
import { orderDetailsList } from "@/api/order/ordermange";
import { objectMerge2 } from "@/utils/index";
import { driverFrozenType } from "@/api/common.js";
export default {
  computed: {
    isShow: {
      get() {
        return this.centerDialogVisible;
      },
      set() {}
    }
  },
  components: {
    Upload
  },
  props: {
    centerDialogVisible: {
      type: Boolean,
      default: false
    },
    rowid: {
      type: [Number, String]
    },
    isDispose: {
      type: Boolean,
      default: false
    },
    isClaim: {
      type: Boolean,
      default: false
    },
    listForm: {
      type: Object
    }
  },
  data() {
    return {
      popTitle: "",
      btnsize: "mini",
      sizes: [30, 50, 100],
      dataset: [],
      dataTotal: 0,
      pagesize: 30, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      value: "",
      searchCreatTime: +new Date(),
      pickOption2: "",
      checked: false,
      options: [
        {
          value: "选项1",
          label: "货主"
        },
        {
          value: "选项2",
          label: "车主"
        }
      ],
      rules: {
        followName: [{ required: true, message: "请输入跟进人" }],
        goodsclaimDes: [
          { required: true, message: "投诉跟进内容最多可输入200个字符" }
        ],
        fileAddress: [{ required: false, message: "至少上传一张图片" }]
      },
      currentCity: "",
      optionsRisk: [],
      value11: [],
      formAllData: {
        // goodsclaimId: '',
        code: false,
        fileAddress: "", // 附件地址
        followName: "", // 跟进人
        // followupTime: '', // 跟进时间
        fileName: "", // 附件名称
        goodsclaimDes: "", // 投诉跟进描述
        orderSerial: "", //订单流水号
        complainType: "", //投诉类型type
        complainTypeName: "", //投诉类型name
        complainDes: "", //投诉内容
        riskControlCode: [], //风控类型code
        riskControlName: [], //风控类型Name
        riskControlValue: [], //风控类型value
        sendMessageFlag: "",
        freezeFlag: "",
        punishmentDesc: "", //处罚原因
        deductionBehavior: 0 //扣除行为分
      }
    };
  },
  watch: {
    isClaim: {
      handler(newVal) {
        if (this.isClaim) {
          this.popTitle = "记录物损跟进";
        }
      }
    },
    isDispose: {
      handler(newVal) {
        // console.log('newVal',newVal)/
        if (this.isDispose) {
          this.popTitle = "记录投诉跟进";
        }
      }
    }
  },
  mounted() {
    this.getMoreInformation();
  },
  methods: {
    reset() {
      this.$refs["ruleForm"].resetFields();
    },
    closeMe(done) {
      this.$emit("close");
      this.reset();
      if (typeof done === "function") {
        done();
      }
    },
    getMoreInformation() {
      orderDetailsList(this.$route.query.orderSerial).then(res => {
        // console.log('resdata',res)
        this.currentCity = res.data.belongCity;
        listComplainSetting(this.currentCity).then(res => {
          // console.log('resdata2',res)
          this.optionsRisk = res.data;
        });
      });
      driverFrozenType().then(res => {
        this.optionsFrozen = res.data;
      });
    },
    // 判断选中与否
    getSelection(val) {
      //   console.log('选中内容', val)
      this.selectRowData = val;
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    getFileInfo(obj) {
      //   console.log('pageUpFile:', obj, obj.name)
    },
    getFileList(list) {
      const address = [];
      const name = [];
      list.forEach((e, index) => {
        address.push(e.url);
        name.push(e.name);
      });
      this.$set(this.formAllData, "fileAddress", address.join(","));
      this.$set(this.formAllData, "fileName", name.join(","));
    },
    handleChange() {},
    uploadHandleFile(_this) {
      const file = _this.file;
      let extension = "";
      const fileName = file.name.toLowerCase();
      const i = fileName.lastIndexOf(".");
      if (i > -1) {
        extension = fileName.substring(i);
      }
      if (!extension || extension !== ".txt") {
        this.$message({
          type: "info",
          message: "只能上传 .txt 模板文件"
        });
        return;
      }
      const data = new FormData();
      data.append("uploadfile", file);
      data.append("excelSign", this.info);
    },
    //违规行为
    riskeAction(val) {
      let count = 0;
      let riskControlName = [];
      let riskControlValue = [];
      val.forEach(el => {
        this.optionsRisk.forEach(item => {
          if (el == item.code) {
            count += item.subBehaviorScore;
            riskControlName.push(item.ruleDescSetting);
            riskControlValue.push(item.subBehaviorScore);
          }
        });
      });
      this.formAllData.deductionBehavior = count;
      this.formAllData.riskControlName = riskControlName;
      this.formAllData.riskControlValue = riskControlValue;
      this.formAllData.riskControlCode = val;
    },
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          // console.log('this.formAllData',this.formAllData)
          if (this.formAllData.code === true) {
            this.formAllData.code = 1;
            this.formAllData.orderSerial = this.$route.query.orderSerial; //订单流水号
            this.formAllData.complainType = this.isClaim
              ? ""
              : this.listForm.complainType; //投诉类型type
            this.formAllData.complainTypeName = this.isClaim
              ? ""
              : this.listForm.complainTypeName; //投诉类型name
            this.formAllData.complainDes = this.isClaim
              ? ""
              : this.listForm.complainDes; //投诉内容
          } else {
            this.formAllData.code = 0;
            this.formAllData.orderSerial = ""; //订单流水号
            this.formAllData.complainType = ""; //投诉类型type
            this.formAllData.complainTypeName = ""; //投诉类型name
            this.formAllData.complainDes = ""; //投诉内容
            this.formAllData.riskControlCode = [];
            this.formAllData.riskControlName = []; //风控类型Name
            this.formAllData.riskControlValue = []; //风控类型value
          }
          this.$set(this.formAllData, "goodsclaimId", this.rowid);
          const data = objectMerge2({}, this.formAllData);
          console.log("datadata", data);
          let promiseObj;
          if (this.isClaim) {
            promiseObj = postReportClaimAdd(data);
          } else if (this.isDispose) {
            promiseObj = postAddComplain(data);
          }
          promiseObj
            .then(res => {
              this.$message({
                message: "保存成功~",
                type: "success"
              });
              this.closeMe();
              this.$emit("success");
            })
            .catch(err => {
              this.$message({
                type: "error",
                message: err.errorInfo || err.text || "未知错误，请重试~"
              });
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss">
.wzlAddgenjing {
  .classify_info {
    padding-bottom: 0 !important;
  }
  .el-dialog {
    max-width: 100%;
    min-width: 35%;
    border-radius: 4px;
    .el-dialog__header {
      border-bottom: 1px solid #ccc;
      text-align: center;
      height: 40px;
      padding: 10px 0;
      color: #fff;
      font-weight: bold;
      background-color: #42485b;
      .el-dialog__title {
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 20px;
        color: #ffffff;
      }
      .el-dialog__headerbtn {
        top: 10px;
        right: 10px;
      }
    }
    .el-input__inner {
      height: 35px;
      line-height: 35px;
    }
    .picklist {
      width: 217px;
    }
    .el-select {
      width: 100%;
    }
    .goodsclaimDes {
      width: 100%;
      .el-form-item__content {
        width: 82%;
      }
    }
    .uploadcard {
      width: 500px;
    }
    .el-upload-list--picture .el-upload-list__item {
      width: 48%;
      float: left;
      margin-right: 2%;
    }
  }
}
</style>
