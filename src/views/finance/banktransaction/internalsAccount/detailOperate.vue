<template>
  <div class="commoncss">
    <el-dialog
      :title="typetitle"
      :visible="dialogDetailOperate"
      :modal-append-to-body="false"
      :before-close="close"
      top="5vh"
      :close-on-click-modal="false"
      ref="dialog"
    >
      <el-form :model="formAllData" ref="formAllData" :rules="rulesForm">
        <el-row>
          <el-col :span="18">
            <el-form-item label="账户号：" :label-width="formLabelWidth" prop="accountNum">
              <el-input clearable v-model="formAllData.accountNum" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="账户名：" :label-width="formLabelWidth" prop="accountName">
              <el-input clearable v-model="formAllData.accountName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="资金流水号：" :label-width="formLabelWidth" prop="fundSerial">
              <el-input
                clearable
                v-model="formAllData.fundSerial"
                maxlength="30"
                v-onlyNumberAndLetter
                placeholder="仅支持英文字母及数字输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="交易金额：" :label-width="formLabelWidth" prop="tradeAmount">
              <el-input
                clearable
                v-model="formAllData.tradeAmount"
                maxlength="10"
                v-numberOnly
                placeholder="仅支持数字输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="收支类型：" :label-width="formLabelWidth" prop="incomeExpendType">
              <el-radio v-model="formAllData.incomeExpendType" label="1">收入</el-radio>
              <el-radio v-model="formAllData.incomeExpendType" label="0">支出</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="交易时间：" :label-width="formLabelWidth" prop="tradeTime">
              <el-date-picker
                v-model="formAllData.tradeTime"
                type="date"
                value-format="timestamp"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="上传凭证：" :label-width="formLabelWidth" prop="certificateAddress">
              <upload
                class="licensePicture"
                tip="（必须为jpg/png并且小于5M）"
                v-model="formAllData.certificateAddress"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updataClick">确 定</el-button>
        <el-button @click="close()">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { eventBus } from "@/eventBus";
import { parseTime, pickerOptions2 } from "@/utils/";
import Upload from "@/components/Upload/CarSinglemage";
import {
  aflcFundAccountDetailAdd,
  aflcFundAccountDetailUpdate
} from "@/api/finance/banktransaction";
import { aflcLclExtractCashSettleAdd } from "@/api/finance/CashPrice.js";
export default {
  components: {
    Upload
  },
  props: {
    params: {
      type: [Object, Array]
    },
    accountInfo: {
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
    dialogDetailOperate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      formLabelWidth: "250px",
      pickerOptions2: { shortcuts: pickerOptions2 },
      btnsize: "mini",
      formAllData: {
        fundSerial: null,
        tradeAmount: null,
        incomeExpendType: "",
        tradeTime: null,
        certificateAddress: null,
        accountName: this.accountInfo.accountName,
        accountNum: this.accountInfo.accountNum,
        fundAccountId: this.accountInfo.fundAccountId
      },
      rulesForm: {
        fundSerial: {
          required: true,
          message: "请输入资金流水号",
          trigger: "change"
        },
        tradeAmount: {
          trigger: "blur",
          required: true,
          message: "请输入交易金额"
        },
        incomeExpendType: {
          required: true,
          trigger: "change",
          message: "请输入收支类型"
        },
        tradeTime: {
          required: true,
          trigger: "change",
          message: "请输入交易时间"
        }
      }
    };
  },
  watch: {
    dialogDetailOperate: {
      handler: function(val, oldVal) {
        if (!val) {
          this.$emit("getData");
          this.$refs["formAllData"].resetFields();
        } else {
          if (this.editType != "add") {
            this.openDialog();
          }
        }
      }
    }
  },
  methods: {
    openDialog: function() {
      this.formAllData = this.params[0];
      this.formAllData.accountName = this.accountInfo.accountName;
      this.formAllData.accountNum = this.accountInfo.accountNum;
    },
    close: function() {
      this.formAllData = {
        fundSerial: null,
        tradeAmount: null,
        incomeExpendType: "",
        tradeTime: null,
        certificateAddress: null,
        accountName: this.accountInfo.accountName,
        accountNum: this.accountInfo.accountNum,
        fundAccountId: this.accountInfo.fundAccountId
      };
      this.$emit("update:dialogDetailOperate", false);
    },
    updataClick() {
      this.$refs["formAllData"].validate(valid => {
        if (valid) {
          if (this.editType == "add") {
            aflcFundAccountDetailAdd(this.formAllData)
              .then(res => {
                this.$emit("update:dialogDetailOperate", false);
                this.$message.success("新增成功");
              })
              .catch(err => {
                this.$message.error(err.errorInfo);
                this.$emit("update:dialogDetailOperate", false);
              });
          } else {
            aflcFundAccountDetailUpdate(this.formAllData)
              .then(res => {
                this.$emit("update:dialogDetailOperate", false);
                this.$message.success("修改成功");
              })
              .catch(err => {
                this.$message.error(err.errorInfo);
                this.$emit("update:dialogDetailOperate", false);
              });
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" >
</style>
