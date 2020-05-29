<template>
  <div class="freezeDialog commoncss">
    <el-dialog
      :title="title"
      :visible="freezeDialogFlag"
      :before-close="close"
      v-el-drag-dialog
      :close-on-click-modal="false"
    >
      <el-form :model="formFroze" ref="formFroze" :rules="formFrozeRules">
        <el-row>
          <el-col :span="24">
            <el-form-item label="冻结原因：" prop="freezeCause" :label-width="formLabelWidth">
              <!-- <el-input v-if="editType == 'remove'" v-model="formFroze.freezeCauseName" disabled></el-input> -->
              <el-select
                v-model="formFroze.freezeCause"
                placeholder="请选择"
                clearable
                :disabled="editType == 'remove'"
              >
                <el-option
                  v-for="item in optionsReason"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="解冻日期：" :label-width="formLabelWidth" prop="unfreezeTime">
              <el-input
                v-if="editType == 'remove'"
                :value="formFroze.unfreezeTime | parseTime"
                disabled
              ></el-input>
              <div v-else>
                <el-date-picker
                  v-model="formFroze.unfreezeTime"
                  placeholder="选择日期"
                  type="date"
                  format="yyyy-MM-dd"
                  :picker-options="pickerOptions"
                ></el-date-picker>
                <el-radio-group v-model="radio" @change="timeChange">
                  <el-radio :label="1">1天</el-radio>
                  <el-radio :label="3">3天</el-radio>
                  <el-radio :label="7">一周</el-radio>
                  <el-radio :label="9">一个月</el-radio>
                  <el-radio :label="10">永久</el-radio>
                </el-radio-group>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="冻结原因说明：" :label-width="formLabelWidth" prop="freezeCauseRemark">
              <el-input
                type="textarea"
                :rows="5"
                :maxlength="100"
                v-model="formFroze.freezeCauseRemark "
                :disabled="editType == 'remove'"
                class="textArea"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div v-if="editType == 'remove'">
          <div class="shipper_information">
            <h2>解冻</h2>
          </div>
          <el-row>
            <el-col :span="24">
              <el-form-item
                label="解冻原因说明："
                :label-width="formLabelWidth"
                prop="unfreezeCauseRemark"
              >
                <el-input
                  type="textarea"
                  :rows="5"
                  :maxlength="100"
                  v-model="formFroze.unfreezeCauseRemark "
                  class="textArea"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" icon="el-icon-success" plain @click="onSubmit">确 定</el-button>
        <el-button type="primary" icon="el-icon-error" plain @click="close">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { DicfreezeType } from "@/api/common.js";
import {
  authAflcLogisticsCompany,
  getaflcLogisticsCompanyFreezeReason
} from "@/api/users/logistics/LogisticsCompany.js";
import { objectMerge2, parseTime } from "@/utils/";

export default {
  name: "freezeDialog",
  components: {},
  props: {
    params: {
      type: Object
    },
    editType: {
      type: String,
      default: "edit"
    },
    freeze: {
      type: Boolean
    },
    freezeDialogFlag: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      type: "primary",
      text: "",
      optionsReason: [],
      formLabelWidth: "120px",
      formFroze: {
        // 冻结弹框表单
        freezeCause: "", //冻结原因Code
        freezeCauseName: "", //冻结原因Name
        unfreezeTime: "",
        freezeCauseRemark: "", //冻结原因说明
        unfreezeCauseRemark: ""
      },
      radio: "",
      currentRow: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      formFrozeRules: {
        freezeCause: {
          required: true,
          message: "请选择冻结原因",
          trigger: ["blur", "change"]
        },
        unfreezeTime: {
          required: true,
          message: "请选择解冻日期",
          trigger: ["change"]
        }
      }
    };
  },
  watch: {
    freezeDialogFlag: {
      handler: function(val, oldVal) {
        if (val) {
          this.getMoreInformation();
          this.openDialog();
        }
      }
    }
  },
  mounted() {},
  methods: {
    timeChange(val) {
      let oneDay = 1 * 24 * 60 * 60 * 1000;
      let time = +new Date();
      switch (val) {
        case 1:
          time += 1 * oneDay;
          break;
        case 3:
          time += 3 * oneDay;
          break;
        case 7:
          time += 7 * oneDay;
          break;
        case 9:
          time += 30 * oneDay;
          break;
        case 10:
          time += 100000 * oneDay;
          break;
      }
      this.formFroze.unfreezeTime = time;
    },
    close(done) {
      this.$emit("update:freezeDialogFlag", false);
      this.$emit("getData");
      this.$refs.formFroze.resetFields();
      this.formFroze = {
        // 冻结弹框表单
        freezeCause: "", //冻结原因Code
        freezeCauseName: "", //冻结原因Name
        unfreezeTime: "",
        freezeCauseRemark: "", //冻结原因说明
        unfreezeCauseRemark: ""
      };
      if (typeof done === "function") {
        done();
      }
    },
    openDialog() {
      console.log("this.params", this.params);
      if (this.editType == "add") {
        this.formFroze.unfreezeTime = new Date();
        // this.formFroze.id = this.params.id;
        // this.formFroze.account = this.params.account;
        this.radio = "";
      } else {
        getaflcLogisticsCompanyFreezeReason(this.params.id).then(res => {
          this.formFroze.freezeCause = res.data.auditCompany.freezeCause;
        });
        // this.formFroze = objectMerge2({}, this.params.auditCompany);
        this.formFroze.unfreezeTime = this.formFroze.unfreezeTime
          ? this.formFroze.unfreezeTime
          : new Date();
        // console.log(this.formFroze.unfreezeTime,new Date().getTime())
        var dateTime = 1000 * 60 * 60 * 24; //每一天的毫秒数
        let days = this.formFroze.unfreezeTime - new Date().getTime();
        this.radio = Math.abs(Math.ceil(days / dateTime));
        // console.log(this.radio)
      }
    },
    getMoreInformation() {
      // 获取冻结原因下拉
      DicfreezeType().then(res => {
        this.optionsReason = res.data;
      });
    },
    // 提交数据
    onSubmit() {
      this.$refs["formFroze"].validate(valid => {
        if (valid) {
          switch (this.editType) {
            case "add":
              if (this.formFroze.unfreezeTime <= new Date().getTime()) {
                return this.$message({
                  type: "warning",
                  message: "解冻日期必须大于当前日期!"
                });
              } else {
                this.formFroze.freezeCauseName = this.optionsReason.find(
                  item => item.code === this.formFroze.freezeCause
                )["name"];
                var forms = Object.assign(
                  {},
                  this.params,
                  { auditCompany: this.formFroze },
                  {
                    accountStatus: "AF0010502",
                    accountStatusName: "冻结中",
                    operateType: "4"
                  }
                );
                let item = forms.account;
                this.$confirm(
                  "确定要将账号为" + item + "的物流公司冻结吗？",
                  "提示",
                  {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                  }
                )
                  .then(() => {
                    authAflcLogisticsCompany(forms)
                      .then(res => {
                        this.$message({
                          type: "success",
                          message: "物流公司已被冻结!"
                        });
                        this.close();
                      })
                      .catch(err => {
                        this.$message.error(
                          "操作失败，失败原因：",
                          err.errorInfo
                        );
                      });
                  })
                  .catch(() => {
                    this.$message({
                      type: "info",
                      message: "已取消"
                    });
                  });
              }
              break;
            case "remove":
              var forms = Object.assign(
                {},
                this.params,
                { auditCompany: this.formFroze },
                {
                  accountStatus: "AF0010501",
                  accountStatusName: "正常",
                  operateType: "5"
                }
              );
              // var forms= Object.assign({}, this.formFroze,{accountStatus:"AF0010501",accountStatusName:'正常'})
              let itemMove = forms.account;
              this.$confirm(
                "确定要将账号为" + itemMove + "的物流公司解冻吗？",
                "提示",
                {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                }
              )
                .then(() => {
                  authAflcLogisticsCompany(forms)
                    .then(res => {
                      this.$message({
                        type: "success",
                        message: "物流公司已被解冻!",
                        duration: 2000
                      });
                      this.close();
                    })
                    .catch(err => {
                      this.$message.error(
                        "操作失败，失败原因：",
                        err.errorInfo
                      );
                    });
                })
                .catch(() => {
                  this.$message({
                    type: "info",
                    message: "已取消"
                  });
                });
              break;
            case "edit":
              // var forms= Object.assign({}, this.formFroze);
              var forms = Object.assign({}, this.params, {
                auditCompany: this.formFroze,
                operateType: "6"
              });
              authAflcLogisticsCompany(forms)
                .then(res => {
                  this.close();
                  this.$message({
                    type: "success",
                    message: "修改成功~"
                  });
                })
                .catch(err => {
                  this.$message.error("修改失败，失败原因：", err.errorInfo);
                });
          }
        }
      });
    }
  }
};
</script>
<style lang="scss">
</style>


