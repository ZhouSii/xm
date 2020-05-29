<template>
  <div class="CashPriceCheck commoncss">
    <el-dialog
      :title="typetitle"
      :visible="dialogCheck"
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
            <el-form-item label="用户账号：" :label-width="formLabelWidth">{{formAll.accountMobile}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账号类型：" :label-width="formLabelWidth">{{formAll.userTypeName}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="提现金额：" :label-width="formLabelWidth">{{formAll.extractAmount}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="提现单号：" :label-width="formLabelWidth">{{formAll.extractSerial}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请时间：" :label-width="formLabelWidth">{{formAll.createTime}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="对方账户名：" :label-width="formLabelWidth">{{formAll.sideAccountName}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="对方账户号：" :label-width="formLabelWidth">{{formAll.sideAccountNum}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="审核意见：" :label-width="formLabelWidth">
              <el-input
                clearable
                v-model="formAllData.auditContent"
                maxlength="100"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
              ></el-input>
              <p class="countNum">
                <span class="red">{{formAllData.auditContent.length}}</span>
                <span>/100</span>
              </p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="审核类型：" prop="auditOpinion" :label-width="formLabelWidth">
              <el-radio-group
                v-model="formAllData.auditOpinion"
                v-for="item of waitTypeList"
                :key="item.code"
                size="medium"
              >
                <el-radio-button :label="item.code">{{item.name}}</el-radio-button>
              </el-radio-group>
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
import {
  aflcLclExtractCashId,
  aflcLclExtractCashAudit
} from "@/api/finance/CashPrice.js";
import { getDictionary } from "@/api/common.js";
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
    dialogCheck: {
      type: Boolean,
      default: false
    },
    userType: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      defaultImg: "/static/test.jpg",
      formLabelWidth: "150px",
      pickerOptions2: { shortcuts: pickerOptions2 },
      btnsize: "mini",
      formAll: {},
      formAllData: {
        auditContent: "",
        auditOpinion: "",
        id: ""
      },
      rulesForm: {
        auditOpinion: {
          required: true,
          message: "请选择审核类型",
          trigger: "change"
        }
      },
      checkTypeList: [{ code: 1, name: "通过" }, { code: 0, name: "不通过" }],
      waitTypeList: []
    };
  },
  watch: {
    dialogCheck: {
      handler: function(val, oldVal) {
        if (!val) {
          this.$emit("getData");
          this.formAll = {};
          this.formAllData = {
            auditContent: "",
            auditOpinion: "",
            id: ""
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
    },
    getMoreInformation() {
      getDictionary("AF093").then(res => {
        this.waitTypeList = res.data.filter(el => {
          if (el.name !== "待审核") {
            return el;
          }
        });
      });
    },
    close: function() {
      this.$emit("update:dialogCheck", false);
    },
    updataClick() {
      this.$refs["formAllData"].validate(valid => {
        if (valid) {
          if (this.btnStatus) {
            this.btnStatus = false;
            this.formAllData.id = this.params[0].id;
            aflcLclExtractCashAudit(this.formAllData)
              .then(res => {
                this.$emit("update:dialogCheck", false);
                this.$message.success("审核成功");
              })
              .catch(err => {
                this.$emit("update:dialogCheck", false);
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
