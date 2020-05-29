<template>
  <div class="CashPriceCheck commoncss">
    <el-dialog
      :title="typetitle"
      :visible="dialogPaymentReg"
      :modal-append-to-body="false"
      :before-close="close"
      top="5vh"
      :close-on-click-modal="false"
      ref="dialog"
    >
      <el-form :model="formAllData" ref="formAllData" :rules="rulesForm">
        <el-row v-if="userType=='AF00113'">
          <el-col :span="12">
            <el-form-item label="专线承运商：" :label-width="formLabelWidth">{{formAll.carriersLineName}}</el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="userType=='AF00112'">
          <el-col :span="12">
            <el-form-item label="区代：" :label-width="formLabelWidth">{{formAll.areaAgencyName}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="区代物流公司："
              :label-width="formLabelWidth"
            >{{formAll.areaAgencyCompanyName}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="提现流水号：" :label-width="formLabelWidth">{{formAll.extractSerial}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="提现金额：" :label-width="formLabelWidth">{{formAll.extractAmount}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="对方账户名：" :label-width="formLabelWidth">{{formAll.sideAccountName}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="对方账户号：" :label-width="formLabelWidth">{{formAll.sideAccountNum}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="已付金额：" :label-width="formLabelWidth">{{formAll.paidAmount}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="未付金额：" :label-width="formLabelWidth">{{formAll.unpaidAmount}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="付款账户：" :label-width="formLabelWidth" prop="fundAccountName">
              <el-select
                v-model="formAllData.fundAccountName"
                clearable
                placeholder="请选择"
                @change="fundAccountObject"
              >
                <el-option
                  v-for="item in checkNameList"
                  :key="item.id"
                  :label="item.accountTypeName"
                  :value="item.id"
                >
                  <span style="float: left">{{ item.accountNum }}-{{ item.accountTypeName }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="付款金额：" :label-width="formLabelWidth" prop="settleAmount">
              <el-input clearable v-model="formAllData.settleAmount" v-numberOnly:point2></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="资金流水号：" :label-width="formLabelWidth" prop="fundSerial">
              <el-input clearable v-model="formAllData.fundSerial"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="付款时间：" :label-width="formLabelWidth">
              <el-date-picker
                v-model="formAllData.settleTime"
                type="date"
                value-format="timestamp"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="上传凭证：" :label-width="formLabelWidth">
              <upload
                class="licensePicture"
                tip="（必须为jpg/png并且小于5M）"
                v-model="formAllData.certificateUrl"
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
import { data_aflcFundAccount } from "@/api/finance/banktransaction";
import { aflcLclExtractCashSettleAdd } from "@/api/finance/CashPrice.js";
export default {
  components: {
    Upload
  },
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
    dialogPaymentReg: {
      type: Boolean,
      default: false
    },
    userType: {
      type: String,
      default: ""
    }
  },
  data() {
    const settleAmountValidator = (rule, val, cb) => {
      if (!val) {
        cb(new Error("请输入付款金额"));
      } else if (parseFloat(val) > parseFloat(this.formAll.unpaidAmount)) {
        cb(new Error("付款金额不能大于未付金额"));
      } else {
        cb();
      }
    };
    return {
      defaultImg: "/static/test.jpg",
      formLabelWidth: "150px",
      pickerOptions2: { shortcuts: pickerOptions2 },
      btnsize: "mini",
      formAll: {},
      formAllData: {
        extractCashId: null,
        fundAccountName: null,
        fundAccountId: null,
        fundAccountNum: null,
        fundAccountBank: null,
        settleAmount: null,
        fundSerial: null,
        settleTime: null,
        certificateUrl: null
      },
      checkNameList: [], //付款账户
      rulesForm: {
        fundAccountName: {
          required: true,
          message: "请选择付款账户",
          trigger: "change"
        },
        settleAmount: {
          trigger: "blur",
          required: true,
          validator: settleAmountValidator
        },
        fundSerial: {
          max: 50,
          message: "请不要超过50字符",
          trigger: "blur"
        }
      }
    };
  },
  watch: {
    dialogPaymentReg: {
      handler: function(val, oldVal) {
        if (!val) {
          this.$emit("getData");
          this.formAll = {};
          this.formAllData = {
            extractCashId: null,
            fundAccountName: null,
            fundAccountId: null,
            fundAccountNum: null,
            fundAccountBank: null,
            settleAmount: null,
            fundSerial: null,
            settleTime: null,
            certificateUrl: null
          };
          this.$refs["formAllData"].resetFields();
        } else {
          this.openDialog();
          this.getMoreInformation();
          this.btnStatus = true;
        }
      }
    }
  },
  methods: {
    openDialog: function() {
      this.formAll = this.params[0];
      this.formAllData.extractCashId = this.params[0].id;
    },
    getMoreInformation() {
      data_aflcFundAccount(0, 0, { status: 1 }).then(res => {
        this.checkNameList = res.data.list;
        console.log("dat", this.checkNameList);
      });
    },
    fundAccountObject(i) {
      if (i) {
        let item = this.checkNameList.filter(el => {
          return el.id == i;
        })[0];
        this.formAllData.fundAccountName = item.accountTypeName;
        this.formAllData.fundAccountId = item.id;
        this.formAllData.fundAccountNum = item.accountNum;
        this.formAllData.fundAccountBank = item.accountBank;
      } else {
        this.formAllData.fundAccountName = null;
        this.formAllData.fundAccountId = null;
        this.formAllData.fundAccountNum = null;
        this.formAllData.fundAccountBank = null;
      }
    },
    close: function() {
      this.$emit("update:dialogPaymentReg", false);
    },
    updataClick() {
      this.$refs["formAllData"].validate(valid => {
        if (valid) {
          if (this.btnStatus) {
            this.btnStatus = false;
            aflcLclExtractCashSettleAdd(this.formAllData)
              .then(res => {
                this.$emit("update:dialogPaymentReg", false);
                this.$message.success("付款登记成功");
              })
              .catch(err => {
                this.$emit("update:dialogPaymentReg", false);
                this.$message.error(err.errorInfo);
              });
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" >
.CashPriceCheck {
  .el-radio-group {
    &:nth-of-type(1) {
      margin-left: 0px;
    }
  }
  .countNum {
    text-align: right;
    .red {
      color: red;
    }
  }
}
</style>
