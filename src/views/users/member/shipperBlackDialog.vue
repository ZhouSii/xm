<template>
  <div class="shipperBlackDialog commoncss">
    <el-dialog
      :title="title"
      :visible="BlackDialogFlag"
      :before-close="close"
      v-el-drag-dialog
      :close-on-click-modal="false"
    >
      <el-form :model="formBlack" ref="formBlack" :rules="formBlackRules">
        <div class="shipper_information">
          <el-row>
            <el-form-item label="移入原因：" :label-width="formLabelWidth" prop="putBlackCause">
              <el-input v-model="formBlack.putBlackCauseName" disabled v-if="editType != 'add'"></el-input>
              <el-select v-model="formBlack.putBlackCause" placeholder="请选择" v-else>
                <el-option
                  v-for="item in optionsFormBlack"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="移入原因说明：" :label-width="formLabelWidth" prop="putBlackCauseRemark">
              <el-input
                v-model="formBlack.putBlackCauseRemark"
                :rows="5"
                :disabled="editType != 'add'"
                placeholder="请输入内容"
                type="textarea"
              ></el-input>
            </el-form-item>
          </el-row>
          <div
            class="shipper_information"
            v-show="editType == 'edit'"
            prop="outPutBlackCauseRemark"
          >
            <h2>移出黑名单信息</h2>
            <el-form-item label="移出原因说明：" :label-width="formLabelWidth">
              <el-input
                v-model="formBlack.outPutBlackCauseRemark"
                :maxlength="100"
                :rows="5"
                placeholder="请输入内容"
                type="textarea"
              ></el-input>
            </el-form-item>
          </div>
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
import { DicBlackType } from "@/api/common.js";
import { authAflcLogisticsCompany } from "@/api/users/logistics/LogisticsCompany.js";
import { objectMerge2, parseTime } from "@/utils/";

export default {
  name: "shipper_blackList-diaolog",
  components: {},
  props: {
    params: {
      type: Object
    },
    editType: {
      type: String
    },
    BlackDialogFlag: {
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
      optionsFormBlack: [],
      options: [],
      type: "primary",
      text: "",
      formLabelWidth: "120px",
      formBlack: {
        putBlackCause: "", //移入黑名单Code
        putBlackCauseName: "", //移入黑名单Name
        putBlackCauseRemark: "", //移入黑名单原因说明
        outPutBlackCauseRemark: "" //移出黑名单原因说明
      },
      currentRow: {},
      formBlackRules: {
        putBlackCause: {
          required: true,
          message: "请选择移入原因",
          trigger: "change"
        }
      }
    };
  },
  watch: {
    BlackDialogFlag: {
      handler: function(val, oldVal) {
        if (val) {
          this.openDialog();
          this.getMoreInformation();
        }
      }
    }
  },
  mounted() {},
  methods: {
    close(done) {
      this.$emit("update:BlackDialogFlag", false);
      this.$emit("getData");
      this.$refs.formBlack.resetFields();
      if (typeof done === "function") {
        done();
      }
    },
    openDialog() {
      // this.formBlack = Object.assign({},this.params);
      if (this.editType != "add") {
        this.formBlack = objectMerge2({}, this.params.auditCompany);
        console.log("this.formBlack", this.formBlack);
      }
    },
    getMoreInformation() {
      // 移入原因列表
      DicBlackType().then(res => {
        this.optionsFormBlack = res.data;
      });
    },
    // 提交数据
    onSubmit() {
      this.$refs["formBlack"].validate(valid => {
        if (valid) {
          switch (this.editType) {
            case "add":
              this.formBlack.putBlackCauseName = this.optionsFormBlack.find(
                item => item.code === this.formBlack.putBlackCause
              )["name"];
              // var forms= Object.assign({}, this.params,this.formBlack,{accountStatus:"AF0010503",accountStatusName:'黑名单'});
              var forms = Object.assign(
                {},
                this.params,
                { auditCompany: this.formBlack },
                {
                  accountStatus: "AF0010503",
                  accountStatusName: "黑名单",
                  operateType: "2"
                }
              );

              let item = forms.account;
              this.$confirm(
                "确定要将账号为" + item + " 的物流公司移入黑名单吗？",
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
                        message: "该物流公司已被移入黑名单!",
                        duration: 2000
                      });
                      this.close();
                    })
                    .catch(err => {
                      this.$message.error("操作失败，失败原因：", err.text);
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
              // var forms= Object.assign({}, this.formBlack,{accountStatus:"AF0010501",accountStatusName:'正常'})
              var forms = Object.assign(
                {},
                this.params,
                { auditCompany: this.formBlack },
                {
                  accountStatus: "AF0010501",
                  accountStatusName: "正常",
                  operateType: "3"
                }
              );
              let itemMove = forms.account;
              this.$confirm(
                "确定要将账号为" + itemMove + "的物流公司移出黑名单吗？",
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
                        message: "该物流公司已被移出黑名单!",
                        duration: 2000
                      });
                      this.close();
                    })
                    .catch(err => {
                      this.$message.error("操作失败，失败原因：", err.text);
                    });
                })
                .catch(() => {
                  this.$message({
                    type: "info",
                    message: "已取消"
                  });
                });
              break;
          }
        }
      });
    }
  }
};
</script>
<style lang="scss">

</style>


