<template>
  <div class="modifyCarMolib commoncss">
    <el-button
      :type="btntype"
      :value="value"
      :plain="plain"
      :icon="icon"
      @click="openDialog()"
      size="mini"
    >
      <span>{{btntext}}</span>
    </el-button>
    <el-dialog
      :title="btntitle"
      :visible="driverTemplateDialogFlag"
      top="5vh"
      :before-close="change"
      modal-append-to-body
      v-dialogDrag
      :closeOnClickModal="false"
    >
      <div>
        <el-form ref="templateModel" :model="templateModel" inline :rules="rulesForm">
          <!-- 身份信息 -->
          <el-row>
            <el-col :span="24">
              <el-form-item label="旧手机号:" :label-width="formLabelWidth">
                <el-input v-model="templateModel.oldMobile" placeholder="旧密码" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="新手机号:" :label-width="formLabelWidth" prop="newMobile">
                <el-input v-model="templateModel.newMobile" placeholder="新手机号" maxlength="11"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" plain @click="updata">确定</el-button>
        <el-button type="primary" plain @click="driverTemplateDialogFlag = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { updateUserMobile } from "@/api/users/carowner/all_car.js";
export default {
  name: "template-create-view-change",
  props: {
    templateItem: {
      type: [Object, Array]
    },
    params: {
      type: [Object, Array]
    },
    value: {
      type: String,
      default: ""
    },
    btntype: {
      type: String,
      default: ""
    },
    btntext: {
      type: String,
      default: ""
    },
    btntitle: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    plain: {
      type: Boolean,
      default: false
    }
  },
  data() {
    // 手机号校验
    const mobileValidator = (rule, val, cb) => {
      let phoneTest = /(^1[1|2|3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
      !val && cb(new Error("手机号码不能为空"));
      if (!phoneTest.test(val)) {
        cb(new Error("请输入正确的手机号码格式"));
      } else {
        cb();
      }
    };
    return {
      driverTemplateDialogFlag: false,
      formLabelWidth: "120px",
      templateModel: {
        newMobile: null,
        oldMobile: null,
        updateType: "1" //车主
      },
      rulesForm: {
        newMobile: {
          validator: mobileValidator,
          trigger: "change",
          required: true
        }
      }
    };
  },
  watch: {
    driverTemplateDialogFlag: {
      handler: function(val, oldVal) {
        if (!val) {
        } else {
        }
      }
    }
  },

  methods: {
    //打开
    openDialog() {
      if (!this.params) {
        this.$message.warning("请选择您要操作的用户");
        return false;
      } else if (this.params.length == 0) {
        this.$message.warning("请选择您要操作的用户");
        return;
      } else if (this.params.length > 1) {
        this.$message({
          message: "每次只能操作单条数据~",
          type: "warning"
        });
        this.$emit("getData");
        return;
      } else {
        if (this.params[0].accountStatus == "AF0010502") {
          this.$message.warning("账户已被冻结，无法操作");
        } else if (this.params[0].accountStatus == "AF0010503") {
          this.$message.warning("账户被加入黑名单，无法操作");
        } else {
          this.templateModel.oldMobile = this.params[0].driverMobile;
          this.driverTemplateDialogFlag = true;
        }
      }
    },
    //弹框控制
    change() {
      this.driverTemplateDialogFlag = false;
    },
    //确定
    updata() {
      this.$refs["templateModel"].validate(valid => {
        if (valid) {
          this.driverTemplateDialogFlag = false;
          updateUserMobile(this.templateModel)
            .then(res => {
              this.$message.success("修改成功");
              this.$emit("getData");
            })
            .catch(err => {
              this.$message.error(
                "修改失败,原因：" + err.errorInfo || err.text
              );
            });
        }
      });
    }
  },
  mounted() {}
};
</script>
            
<style lang="scss">
.modifyCarMolib {
  display: inline-block;
  .el-dialog {
    overflow: unset !important;
    width: 500px;
    max-height: inherit;
  }
}
</style>
            
