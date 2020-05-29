<template>
  <div class="commoncss">
    <el-dialog
      :title="typetitle"
      :visible="dialogFormVisible_add"
      :modal-append-to-body="false"
      :before-close="close"
      top="5vh"
      :close-on-click-modal="false"
      ref="dialog"
    >
      <el-form :model="formAll" ref="formAll" :rules="rulesForm">
        <el-row>
          <el-col :span="18">
            <el-form-item label="账户类型：" prop="accountType" :label-width="formLabelWidth">
              <el-select v-model="formAll.accountType" clearable placeholder="请选择">
                <el-option
                  v-for="item in businessTypeList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="账户名：" prop="accountName" :label-width="formLabelWidth">
              <el-input clearable v-model="formAll.accountName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="账户号：" prop="accountNum" :label-width="formLabelWidth">
              <el-input clearable v-model="formAll.accountNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="资金账户类型：" prop="capitalAccountType" :label-width="formLabelWidth">
              <el-select
                v-model="formAll.capitalAccountType"
                clearable
                placeholder="请选择"
                :disabled="disableStatus"
              >
                <el-option
                  v-for="item in cashTypeList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="formAll.capitalAccountType=='2'">
          <el-col :span="18">
            <el-form-item label="所属银行：" prop="accountBank" :label-width="formLabelWidth">
              <el-input clearable v-model="formAll.accountBank"></el-input>
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
import { getDictionary, getUploadPolicy } from "@/api/common.js";
import { parseTime, pickerOptions2 } from "@/utils/";
import {
  aflcFundAccountAdd,
  aflcFundAccountUpdate,
  aflcFundAccountId
} from "@/api/finance/banktransaction";
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
    return {
      defaultImg: "/static/test.jpg",
      formLabelWidth: "250px",
      pickerOptions2: { shortcuts: pickerOptions2 },
      btnStatus: true, //新增修改按钮状态
      btnsize: "mini",
      formAll: {
        accountType: null,
        accountName: null,
        accountNum: "",
        capitalAccountType: null,
        accountBank: null
      },
      businessTypeList: [], //账户类型
      disableStatus: false,
      cashTypeList: [
        { name: "支付宝", code: "0" },
        { name: "微信", code: "1" },
        { name: "银行", code: "2" },
        { name: "支付宝(虚拟账号)", code: "3" },
        { name: "微信(虚拟账号)", code: "4" }
      ],
      rulesForm: {
        accountType: {
          required: true,
          message: "请选择账户类型",
          trigger: "change"
        },
        accountName: {
          required: true,
          message: "账户名不能为空",
          trigger: "change"
        },
        accountNum: {
          required: true,
          message: "账户号不能为空",
          trigger: "change"
        },
        capitalAccountType: {
          required: true,
          message: "资金账户类型不能为空",
          trigger: "change"
        },
        accountBank: {
          required: true,
          message: "所属银行不能为空",
          trigger: "change"
        }
      }
    };
  },
  watch: {
    dialogFormVisible_add: {
      handler: function(val, oldVal) {
        if (!val) {
          this.$refs["formAll"].resetFields();
          this.$emit("getData");
          this.formAll = {
            accountType: null,
            accountName: null,
            accountNum: "",
            capitalAccountType: null,
            accountBank: null
          };
        } else {
          if (this.editType != "add") {
            this.openDialog();
          }
          this.getMoreInformation();
          this.btnStatus = true;
        }
      }
    }
  },
  methods: {
    openDialog: function() {
      this.formAll = this.params[0];
      if (
        this.formAll.capitalAccountType == "0" ||
        this.formAll.capitalAccountType == "1"
      ) {
        this.disableStatus = true;
      } else {
        this.disableStatus = false;
      }
      // aflcFundAccountId(this.params[0].id).then(res => {
      //   this.formAll = res.data;
      // });
    },
    close: function() {
      this.disableStatus = false;
      this.$emit("update:dialogFormVisible_add", false);
    },
    // 获取  服务和车辆 类型列表
    getMoreInformation() {
      getDictionary("AF089").then(res => {
        this.businessTypeList = res.data;
      });
    },
    // 同城新增
    operatedata() {
      this.$refs["formAll"].validate(valid => {
        if (valid) {
          if (this.btnStatus) {
            this.btnStatus = false;
            if (this.editType == "add") {
              aflcFundAccountAdd(this.formAll)
                .then(res => {
                  this.$emit("update:dialogFormVisible_add", false);
                  this.$message.success("新增成功");
                })
                .catch(err => {
                  this.$message.error(err.text);
                  this.$emit("update:dialogFormVisible_add", false);
                });
            } else {
              aflcFundAccountUpdate(this.formAll)
                .then(res => {
                  this.$emit("update:dialogFormVisible_add", false);
                  this.$message.success("修改成功");
                })
                .catch(err => {
                  this.$message.error(err.text);
                  this.$emit("update:dialogFormVisible_add", false);
                });
            }
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" >
</style>
