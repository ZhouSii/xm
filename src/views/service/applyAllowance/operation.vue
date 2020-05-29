<template>
  <div class="applyAllowance commoncss">
    <el-dialog
      :title="typetitle"
      :visible="dialogFormVisible_add"
      :modal-append-to-body="false"
      :before-close="close"
      top="5vh"
      :close-on-click-modal="false"
      ref="dialog"
    >
      <el-form :model="formAll" ref="formAll" :rules="rulesForm" status-icon>
        <el-row>
          <el-col :span="20">
            <el-form-item label="订单号：" prop="orderSerial" :label-width="formLabelWidth">
              <el-input
                clearable
                v-model="formAll.orderSerial"
                maxlength="25"
                @blur="checkOrderNo(formAll.orderSerial)"
              ></el-input>
              <!-- <el-autocomplete
                v-model="formAll.orderSerial"
                :fetch-suggestions="querySearchOrderSerial"
                placeholder="请输入订单号"
                :trigger-on-focus="false"
                @select="handleSelect"
              ></el-autocomplete>-->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="手机号：" prop="mobile" :label-width="formLabelWidth">
              <!-- <el-autocomplete
                v-model="formAll.mobile"
                :fetch-suggestions="querySearch"
                placeholder="请输入手机号"
                :trigger-on-focus="false"
                @select="handleSelect"
              ></el-autocomplete>-->
              <el-input
                clearable
                v-model="formAll.mobile"
                maxlength="11"
                @blur="getInfo(formAll.mobile)"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="车牌号：" prop="carNumber" :label-width="formLabelWidth">
              <el-input clearable v-model="formAll.carNumber" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="车主姓名：" prop="name" :label-width="formLabelWidth">
              <el-input clearable v-model="formAll.name" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="补贴金额：" prop="subsidyMoney" :label-width="formLabelWidth">
              <el-input clearable v-model="formAll.subsidyMoney" placeholder="请输入1-999的整数"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="补贴金额原因：" prop="subsidyMoneyCause" :label-width="formLabelWidth">
              <el-select v-model="formAll.subsidyMoneyCause" clearable placeholder="请选择">
                <el-option
                  v-for="item in subsidyMoneyCauseList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="补贴行为分：" prop="subsidyScore" :label-width="formLabelWidth">
              <el-input clearable v-model="formAll.subsidyScore" placeholder="请输入1-12的整数"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="补贴行为分原因：" prop="subsidyScoreCause" :label-width="formLabelWidth">
              <el-select v-model="formAll.subsidyScoreCause" clearable placeholder="请选择">
                <el-option
                  v-for="item in subsidyScoreCauseList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="备注：" prop="subsidyCause" :label-width="formLabelWidth">
              <el-input
                clearable
                v-model="formAll.subsidyCause"
                type="textarea"
                maxlength="500"
                placeholder="请输入备注信息"
                id="remarkText"
              ></el-input>
              <p class="countNum">
                <span class="red">{{formAll.subsidyCause.length}}</span>
                <span>/500</span>
              </p>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="operatedata">确 定</el-button>
        <el-button @click="close()">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { eventBus } from "@/eventBus";
import { parseTime, pickerOptions2 } from "@/utils/";
import { validateMobile } from "@/utils/validate";
import { getDictionary } from "@/api/common.js";
import {
  aflcSubsidyAdd,
  aflcSubsidyupdateApply,
  aflcDriverCarMobile,
  findAflcOrderByOrderSerial
} from "@/api/service/applyAllowance";
export default {
  components: {},
  props: {
    params: {
      type: [Object, Array]
    },
    typetitle: {
      type: String,
      default: ""
    },
    /*add新增，edit编辑，view查看*/
    editType: {
      type: String
    },
    dialogFormVisible_add: {
      type: Boolean,
      default: false
    }
  },

  data() {
    var validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入电话号码"));
      } else if (!/^1[0-9][0-9]\d{8}$/.test(value)) {
        callback(new Error("请输入正确的11位手机号码"));
      } else {
        callback();
      }
    };
    var checkMoney = (rule, value, callback) => {
      if (value && !/^[1-9][0-9]{0,2}$/.test(value)) {
        callback(new Error("请输入1-999的整数"));
      } else if (this.formAll.subsidyMoneyCause && !value) {
        callback(new Error("请输入补贴金额"));
      } else {
        callback();
      }
    };
    var checkScore = (rule, value, callback) => {
      if (value && !/^(1[0-2]$|^[1-9])$/.test(value)) {
        callback(new Error("请输入1-12的整数"));
      } else if (this.formAll.subsidyScoreCause && !value) {
        callback(new Error("请输入补贴行为分"));
      } else {
        callback();
      }
    };
    var checkMoneyReason = (rule, value, callback) => {
      if (this.formAll.subsidyMoney && !value) {
        callback(new Error("请选择补贴金额原因"));
      } else {
        callback();
      }
    };
    var checkScoreReason = (rule, value, callback) => {
      if (this.formAll.subsidyScore && !value) {
        callback(new Error("请选择补贴行为分原因"));
      } else {
        callback();
      }
    };
    return {
      formLabelWidth: "200px",
      pickerOptions2: { shortcuts: pickerOptions2 },
      btnsize: "mini",
      formAll: {
        orderSerial: null,
        mobile: null,
        carNumber: null,
        name: null,
        subsidyMoney: null,
        subsidyScore: null,
        subsidyCause: "",
        subsidyMoneyCause: "",
        subsidyScoreCause: ""
      },
      rulesForm: {
        // orderSerial: [{ validator: checkOrderExist, trigger: "blur" }],
        mobile: [{ required: true, validator: validPhone, trigger: "blur" }],
        subsidyMoney: [{ trigger: blur, validator: checkMoney }],
        subsidyScore: [{ trigger: blur, validator: checkScore }],
        subsidyMoneyCause: [{ trigger: blur, validator: checkMoneyReason }],
        subsidyScoreCause: [{ trigger: blur, validator: checkScoreReason }]
      },
      subsidyScoreCauseList: [],
      subsidyMoneyCauseList: []
    };
  },
  watch: {
    dialogFormVisible_add: {
      handler: function(val, oldVal) {
        if (!val) {
          this.$refs["formAll"].resetFields();
          this.$emit("getData");
          this.formAll = {
            orderSerial: null,
            mobile: null,
            carNumber: null,
            name: null,
            subsidyMoney: null,
            subsidyScore: null,
            subsidyCause: "",
            subsidyMoneyCause: "",
            subsidyScoreCause: ""
          };
        } else {
          getDictionary("AF08511").then(res => {
            this.subsidyScoreCauseList = res.data;
          });
          getDictionary("AF08510").then(res => {
            this.subsidyMoneyCauseList = res.data;
          });
          if (this.editType != "add") {
            this.openDialog();
          }
        }
      }
    }
  },
  methods: {
    openDialog: function() {
      this.formAll = this.params[0];
    },
    close: function() {
      this.$emit("update:dialogFormVisible_add", false);
    },
    // 确认订单是否存在
    checkOrderNo(orderNo) {
      if (orderNo) {
        findAflcOrderByOrderSerial(orderNo.trim())
          .then(res => {})
          .catch(err => {
            this.$message.error("订单号不存在");
          });
      }
    },
    // 根据手机号获取车主姓名和车牌
    getInfo(i) {
      if (i && i.length == 11) {
        aflcDriverCarMobile(i)
          .then(res => {
            this.formAll.name = res.data.driverName;
            this.formAll.carNumber = res.data.carNumber;
          })
          .catch(err => {
            this.formAll.name = null;
            this.formAll.carNumber = null;
            this.$message.error("车主手机号不存在");
          });
      }
    },
    // 新增和修改补贴申请
    operatedata() {
      if (
        this.formAll.subsidyScore === null &&
        this.formAll.subsidyMoney === null
      ) {
        this.$message.error("请输入补贴金额或补贴行为分");
      } else {
        this.$refs["formAll"].validate(valid => {
          if (valid) {
            if (this.editType == "add") {
              aflcSubsidyAdd(this.formAll)
                .then(res => {
                  this.$emit("update:dialogFormVisible_add", false);
                  this.$message.success("新增成功");
                })
                .catch(err => {
                  this.$message.error(err.errorInfo);
                  this.$emit("update:dialogFormVisible_add", false);
                });
            } else {
              let passData = {
                id: this.formAll.id,
                carNumber: this.formAll.carNumber,
                mobile: this.formAll.mobile,
                name: this.formAll.name,
                orderSerial: this.formAll.orderSerial,
                subsidyCause: this.formAll.subsidyCause,
                subsidyMoney: this.formAll.subsidyMoney,
                subsidyScore: this.formAll.subsidyScore,
                subsidyMoneyCause: this.formAll.subsidyMoneyCause,
                subsidyScoreCause: this.formAll.subsidyScoreCause,
                serialNum: this.formAll.serialNum
              };
              aflcSubsidyupdateApply(passData)
                .then(res => {
                  this.$emit("update:dialogFormVisible_add", false);
                  this.$message.success("修改成功");
                })
                .catch(err => {
                  this.$message.error(err.errorInfo);
                  this.$emit("update:dialogFormVisible_add", false);
                });
            }
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.applyAllowance {
  .countNum {
    text-align: right;
    .red {
      color: red;
    }
  }
  /deep/ .el-textarea .el-textarea__inner#remarkText {
    min-height: 80px !important;
  }
}
</style>
