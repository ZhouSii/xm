<template>
  <el-dialog
    title="车贴审查"
    class="carStickerEXAdd"
    top="15vh"
    :modal="false"
    :visible="dialogVisible"
    custom-class="add-review"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    v-loading="loading"
    width="30%"
    :before-close="close"
  >
    <div class="ifcancel">
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        :label-width="formLabelWidth"
        label-position="right"
      >
        <el-form-item label="审核结果：" prop="status">
          <el-select v-model="form.status" filterable placeholder="请选择">
            <el-option
              v-for="item in optionsEx"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="不通过原因："
          prop="checkNoPassCause"
          v-if="form.status == 'AF0880103'"
        >
          <el-select
            v-model="form.checkNoPassCause"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in optionsNoPass"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button
        type="primary"
        plain
        icon="el-icon-success"
        @click="submitForm('ruleForm')"
        >确认</el-button
      >
      <el-button type="primary" plain icon="el-icon-error" @click="close"
        >取消</el-button
      >
    </div>
  </el-dialog>
</template>

<script type="text/javascript">
import { CarStickerBatchCheck } from "@/api/order/carStickerEX.js";
// import { CarStickerImgNoPassType } from '@/api/common.js'
import { objectMerge2 } from "@/utils/";
export default {
  name: "batchImport",
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    currentArr: {
      type: Array,
      default: [],
      required: true
    }
  },
  watch: {
    dialogVisible(newVal, oldVal) {
      // console.log('newVal',newVal)
      if (newVal) {
        console.log("this.currentArr", this.currentArr);
        // this.init();
        // console.log(this.initForm)
      }
    }
  },
  data() {
    return {
      formLabelWidth: "120px",
      loading: true,
      form: {
        status: "",
        checkNoPassCause: ""
      },
      rules: {
        status: {
          required: true,
          message: "请选择审核结果",
          trigger: "change"
        },
        checkNoPassCause: {
          required: true,
          message: "请选择不通过原因",
          trigger: "change"
        }
      },
      optionsEx: [
        {
          name: "车贴照片通过",
          code: "AF0880102"
        },
        {
          name: "车贴照片不通过",
          code: "AF0880103"
        }
      ],
      optionsNoPass: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$store.dispatch("GetInfoDic", "AF08802").then(res => {
        this.optionsNoPass = res;
      });
      // CarStickerImgNoPassType().then(res => {
      //     this.optionsNoPass=res.data;
      // })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.btnShow = true;
          var subArr = [];
          this.currentArr.forEach(el => {
            subArr.push({
              id: el.id,
              status: this.form.status,
              checkNoPassCause: this.form.checkNoPassCause,
              driverId: el.driverId,
              carStickerOrderSerial: el.carStickerOrderSerial,
              createTime: el.createTime
            });
          });
          CarStickerBatchCheck(subArr)
            .then(res => {
              this.$message({
                type: "success",
                message: "操作成功！"
              });
              this.close();
            })
            .catch(err => {
              this.$message({
                type: "warning",
                message:
                  "操作失败，原因：" +
                  (err.errorInfo ? err.errorInfo : err.text)
              });
              // this.btnShow = false;
            });
        } else {
          this.$message({
            type: "warning",
            message: "请填写完整数据!"
          });
          return false;
        }
      });
    },
    close(done) {
      this.$refs.ruleForm.resetFields();
      this.$emit("update:dialogVisible", false);
      // this.$refs.areaDelegate.clearData();
      this.$emit("close");
      if (typeof done === "function") {
        done();
      }
    }
  }
};
</script>

<style type="text/css" lang="scss">
.carStickerEXAdd {
  .el-form {
    padding: 0 20px;
    .el-form-item__content {
      .el-select {
        width: 100%;
      }
    }
  }
}
</style>

