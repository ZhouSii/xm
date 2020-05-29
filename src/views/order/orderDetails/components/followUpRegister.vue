<template>
  <div class="followUpRegister commoncss">
    <el-dialog
      :title="typetitle"
      :visible="followUpRegister_add"
      :modal-append-to-body="false"
      :before-close="close"
      top="5vh"
      :close-on-click-modal="false"
      ref="dialog"
    >
      <el-form :model="formAll" ref="formAll" :rules="rulesForm">
        <el-row>
          <el-col :span="16">
            <el-form-item
              label="跟进内容："
              prop="goodsclaimDes"
              :label-width="formLabelWidth"
              class="textArea"
            >
              <el-input
                type="textarea"
                :rows="2"
                placeholder="1-500间的字符"
                maxlength="500"
                ref="infofocus"
                v-model="formAll.goodsclaimDes"
                clearable
                :disabled="editType=='view'"
              ></el-input>
              <p class="countNum">
                <span class>{{formAll.goodsclaimDes.length}}</span>
                <span>/ 500</span>
              </p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="上传附件：" prop :label-width="formLabelWidth">
              <upload
                class="licensePicture"
                tip="（必须为jpg/png并且小于5M）"
                v-model="formAll.fileAddress"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="违规行为：" prop="riskControlCode" :label-width="formLabelWidth">
              <el-select
                v-model="formAll.riskControlCode"
                multiple
                collapse-tags
                @change="riskeAction"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
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
          <el-col :span="10">
            <el-form-item label="扣行为分：" prop="deductionBehavior" :label-width="formLabelWidth">
              <el-input v-model="formAll.deductionBehavior" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="冻结车主账号：" :label-width="formLabelWidth">
              <el-select v-model="formAll.freezeFlag" clearable placeholder="请选择">
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
            <el-form-item label="是否发短信通知：" :label-width="formLabelWidth">
              <el-radio-group v-model="formAll.sendMessageFlag">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="处罚原因：" :label-width="formLabelWidth">
              <el-input
                type="textarea"
                placeholder="请输入处罚原因"
                v-model="formAll.punishmentDesc"
                maxlength="20"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-col :span="18">
          <el-form-item label="扣除行为分：" prop :label-width="formLabelWidth">
            <el-select v-model="formAll.riskControlCode" multiple collapse-tags placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.ruleDescSetting"
                :value="item.code"
              >
                <span style="float: left">{{ item.ruleDescSetting }}</span>
                <span
                  style="float: right; color: #8492a6; font-size: 13px;margin-right:20px"
                >{{ item.subBehaviorScore ? item.subBehaviorScore + '分' : '' }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>-->
        <el-row>
          <el-col :span="18">
            <el-form-item label :label-width="formLabelWidth">
              <el-checkbox v-model="unloadingFeeFlag" :disabled="unloadingFeeDisableFlag">修改等候费</el-checkbox>
              <span v-if="unloadingFeeFlag">
                原系统等候费为￥{{UnloadingFee}}，现改为
                <el-input
                  clearable
                  v-model="formAll.adjustUnloadingFee"
                  v-numberOnly
                  class="adjustUnloadingFee"
                ></el-input>
              </span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label :label-width="formLabelWidth">
              <el-checkbox
                v-model="driverChangeFeeFlag"
                :disabled="driverChangeFeeDisableFlag"
              >修改车主改价费</el-checkbox>
              <span v-if="driverChangeFeeFlag">
                原车主改价费为￥{{driverChangeFee}}，现改为
                <el-input
                  clearable
                  v-model="formAll.driverChangeFee"
                  v-numberOnly
                  class="adjustUnloadingFee"
                ></el-input>
              </span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label :label-width="formLabelWidth">
              <span @click="complainStatusChange">
                <el-checkbox
                  v-model="complainStatus"
                  :disabled="!this.newParams.respondentType"
                >已处理完毕</el-checkbox>
              </span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18" v-show="complainStatus">
            <el-form-item label="是否定责：" :label-width="formLabelWidth" prop="IsRule">
              <el-radio-group
                v-model="formAll.IsRule"
                v-for="item of dutyList"
                :key="item.code"
                @change="IsRuleRadio"
              >
                <el-radio :label="item.code">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18" v-show="formAll.IsRule=='1'">
            <el-form-item
              label="责任区域："
              prop="responsibilityBusinessGroupName"
              :label-width="formLabelWidth"
            >
              <businessGroup
                @inputObject="getObject"
                v-model="formAll.responsibilityBusinessGroupName"
                ref="businessGroup"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18" v-show="formAll.IsRule=='1'">
            <el-form-item label="责任人:" prop="responsibilityName" :label-width="formLabelWidth">
              <selectBelong
                :groupCode="groupCode"
                :belongSalesman="formAll.responsibilityName"
                @returnBelong="(value)=>{getReturnBelong(value)}"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add_data">确 定</el-button>
        <el-button @click="close()">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { eventBus } from "@/eventBus";
// import {
//   getDictionary,
//   getUploadPolicy,
//   driverFrozenType
// } from "@/api/common.js";
import { parseTime, pickerOptions2 } from "@/utils/";
import Pager from "@/components/Pagination/index";
import businessGroup from "@/components/selectTree/businessGroup";
import selectBelong from "./selectBelong";
import {
  getAllBusinessGroup,
  aflcBusinessGroupUserList
} from "@/api/company/businessGroup";
import Upload from "@/components/Upload/CarSinglemage";
import {
  recordFollowup,
  OutorderSerial,
  listComplainSetting,
  aflcOrderComplainId
} from "@/api/service/dispose.js";
import { orderDetailsList } from "@/api/order/ordermange";
export default {
  components: {
    Pager,
    selectBelong,
    Upload,
    businessGroup
  },
  props: {
    paramsId: {
      type: String,
      default: ""
    },
    typetitle: {
      type: String,
      default: ""
    },
    /*add新增，edit编辑，view查看*/
    editType: {
      type: String
    },
    followUpRegister_add: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const IsRuleValidator = (rule, val, cb) => {
      if (!val && this.complainStatus) {
        cb(new Error("请选择是否定责"));
      } else {
        cb();
      }
    };
    const responsibilityBusinessGroupName = (rule, val, cb) => {
      if (!val && this.formAll.IsRule == "1") {
        cb(new Error("请选择责任区域"));
      } else {
        cb();
      }
    };
    const responsibilityName = (rule, val, cb) => {
      if (!val && this.formAll.IsRule == "1") {
        cb(new Error("请选择责任人"));
      } else {
        cb();
      }
    };

    return {
      defaultImg: "/static/test.jpg",
      formLabelWidth: "200px",
      pickerOptions2: { shortcuts: pickerOptions2 },
      btnStatus: true, //新增修改按钮状态
      btnsize: "mini",
      formAll: {
        goodsclaimDes: "",
        fileAddress: "",
        riskControlCode: [], //风控类型code
        riskControlName: [], //风控类型Name
        riskControlValue: [], //风控类型value
        adjustUnloadingFee: "",
        IsRule: "",
        responsibilityBusinessGroupId: "",
        responsibilityBusinessGroupName: "",
        responsibilityName: "",
        responsibilityId: "",
        goodsclaimId: "",
        orderSerial: this.$route.query.orderSerial,
        deductionBehavior: 0, //扣除行为分
        sendMessageFlag: "",
        freezeFlag: "",
        punishmentDesc: "" //处罚原因
      },
      payStatus: "",
      groupCode: "",
      unloadingFeeFlag: false,
      unloadingFeeDisableFlag: true,
      driverChangeFeeFlag: false,
      driverChangeFeeDisableFlag: true,
      complainStatus: false,
      UnloadingFee: "",
      driverChangeFee: "",
      options: [], //违规行为选项
      optionsFrozen: [], // 冻结账号选项
      dutyList: [{ code: "1", name: "定责" }, { code: "0", name: "不定责" }],
      newParams: {},
      rulesForm: {
        goodsclaimDes: {
          required: true,
          message: "跟进内容不能为空",
          trigger: "change"
        },
        IsRule: {
          required: true,
          validator: IsRuleValidator,
          trigger: "change"
        },
        responsibilityBusinessGroupName: {
          required: true,
          validator: responsibilityBusinessGroupName,
          trigger: "change"
        },
        responsibilityName: {
          required: true,
          validator: responsibilityName,
          trigger: "change"
        }
      }
    };
  },
  watch: {
    followUpRegister_add: {
      handler: function(val, oldVal) {
        if (!val) {
          this.$refs["formAll"].resetFields();
          this.$emit("getData");
          for (var key in this.formAll) {
            this.formAll[key] = "";
          }
          this.formAll.riskControlCode = [];
          this.formAll.riskControlName = [];
          this.formAll.riskControlValue = [];
          this.unloadingFeeFlag = false;
          this.driverChangeFeeFlag = false;
          this.complainStatus = false;
        } else {
          this.formAll.orderSerial = this.$route.query.orderSerial;
          this.getMoreInformation();
          this.btnStatus = true;
        }
      }
    }
  },
  methods: {
    close: function() {
      this.$emit("update:followUpRegister_add", false);
    },
    // 获取  服务和车辆 类型列表
    getMoreInformation() {
      orderDetailsList(this.$route.query.orderSerial).then(res => {
        this.currentCity = res.data.belongCity;
        listComplainSetting(this.currentCity).then(res => {
          this.options = res.data;
        });
      });
      OutorderSerial(this.$route.query.orderSerial).then(res => {
        this.driverChangeFeeDisableFlag = !(
          res.data.orderStatus.indexOf("AF0080607PT") != -1 &&
          res.data.payStatus == "AF00801"
        );
        this.unloadingFeeDisableFlag = !(
          res.data.orderStatus.indexOf("AF0080607PT") != -1 &&
          res.data.payStatus == "AF00801" &&
          res.data.unloadingFee > 0
        );
        this.UnloadingFee = res.data.unloadingFee;
        this.driverChangeFee = res.data.driverChangeFee;
        this.payStatus = res.data.payStatus;
      });
      aflcOrderComplainId(this.paramsId).then(res => {
        this.newParams = res.data;
      });
      this.$store.dispatch("GetInfoDic", "AF02005").then(res => {
        this.optionsFrozen = res;
      });
    //   driverFrozenType().then(res => {
    //     this.optionsFrozen = res.data;
    //   });
    },
    getObject(e) {
      this.formAll.responsibilityBusinessGroupName = e.groupName;
      this.formAll.responsibilityBusinessGroupId = e.id;
      this.groupCode = e.groupCode;
      this.formAll.responsibilityName = "";
      this.formAll.responsibilityId = "";
    },
    getReturnBelong(val) {
      this.formAll.responsibilityName = val.name;
      this.formAll.responsibilityId = val.userId;
    },
    complainStatusChange(i) {
      if (!this.newParams.respondentType) {
        this.$message.warning("请先选择被投诉对象");
        this.complainStatus = !i;
      }
    },
    IsRuleRadio(i) {
      if (i == 0) {
        this.formAll.responsibilityBusinessGroupName = "";
        this.formAll.responsibilityBusinessGroupId = "";
        this.groupCode = "";
        this.formAll.responsibilityName = "";
        this.formAll.responsibilityId = "";
      }
    },
    //违规行为
    riskeAction(val) {
      let count = 0;
      let riskControlName = [];
      let riskControlValue = [];
      val.forEach(el => {
        this.options.forEach(item => {
          if (el == item.code) {
            count += item.subBehaviorScore;
            riskControlName.push(item.ruleDescSetting);
            riskControlValue.push(item.subBehaviorScore);
          }
        });
      });
      this.formAll.deductionBehavior = count;
      this.formAll.riskControlName = riskControlName;
      this.formAll.riskControlValue = riskControlValue;
      this.formAll.riskControlCode = val;
    },
    // 投诉登记
    add_data() {
      this.$refs["formAll"].validate(valid => {
        if (
          !this.formAll.adjustUnloadingFee &&
          this.payStatus == "AF00801" &&
          this.UnloadingFee > 0
        ) {
          this.$message.warning("请输入等候费");
        } else if (
          this.formAll.adjustUnloadingFee > this.UnloadingFee &&
          this.payStatus == "AF00801"
        ) {
          this.$message.warning("等候费需小于原系统等候费");
        } else {
          if (valid) {
            this.formAll.unloadingFeeFlag = this.unloadingFeeFlag ? 1 : 0;
            this.formAll.driverChangeFeeFlag = this.driverChangeFeeFlag ? 1 : 0;
            this.formAll.complainStatus = this.complainStatus ? "AF04002" : "";
            this.formAll.goodsclaimId = this.paramsId;
            recordFollowup(this.formAll)
              .then(res => {
                this.$emit("update:followUpRegister_add", false);
                this.$message.success("操作成功");
              })
              .catch(err => {
                this.$emit("update:followUpRegister_add", false);
                this.$message.error(err.errorInfo || err.text);
              });
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" >
.followUpRegister {
  .el-select {
    width: 180px !important;
  }
  .adjustUnloadingFee {
    width: 100px;
  }
  .el-radio-group {
    &:nth-of-type(1) {
      margin-left: 0px;
    }
  }
}
</style>
