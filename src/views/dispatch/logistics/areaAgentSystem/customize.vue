<template>
  <div class="customize commoncss StyleNewinfoComponent">
    <el-dialog
      title="自定义主题"
      class="garde"
      top="15vh"
      :modal="true"
      :visible="dialogVisible"
      @open="init"
      custom-class="add-review"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      v-loading="loading"
      width="50%"
      :before-close="close"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        :label-width="formLabelWidth"
        label-position="right"
      >
        <el-form-item label="标题：" prop="title">
          <el-input v-model="form.title" clearable maxlength="16"></el-input>
        </el-form-item>
        <el-form-item label="内容：" prop="content">
          <el-input
            placeholder="少于600字符"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 6 }"
            clearable
            maxlength="500"
            v-model="form.content"
          >
          </el-input>
        </el-form-item>
        <div class="uploadMultImage">
          <el-form-item label="图片：" prop="img1">
            <UploadMultImage
              :title="'本地上传'"
              tip=""
              v-model="form.img1"
              :showFileList="true"
              :limit="limitImg"
              :key="UploadMultImageKey"
            />
          </el-form-item>
        </div>
      </el-form>
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
  </div>
</template>

<script type="text/javascript">
import { batchPotentialGrade } from "@/api/users/potentialGrade/shipperGrade.js";
import UploadMultImage from "@/components/Upload/singleImage2";
import { objectMerge2, parseTime } from "@/utils/";

export default {
  name: "garde",
  components: {
    UploadMultImage
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    initForm: {
      type: Array
    }
  },
  watch: {
    // dialogVisible(newVal,oldVal){
    //     // console.log('newVal',newVal)
    //     if(newVal){
    //         // this.init();
    //         console.log(this.initForm)
    //         this.form.potentialGrade = this.initForm[0].levelAdjustmentCode;
    //     }
    // },
  },
  data() {
    return {
      formLabelWidth: "60px",
      UploadMultImageKey: null,
      limitImg: 4,
      loading: true,
      form: {
        title: "", //标题
        content: "", //内容
        img1: ""
      },
      rules: {
        title: [
          { required: true, message: "请输入自定义主题标题", trigger: "change" }
        ]
        // potentialGrade: {
        //   required: true,
        //   message: "请选择调整等级",
        //   trigger: "change"
        // }
      }
    };
  },
  mounted() {
    // this.init();
  },
  methods: {
    init() {
      this.$nextTick(() => {
        this.UploadMultImageKey = Math.random();
        if (this.$parent.customType === "edit") {
          this.form = this.$parent.standForm.customList[
            this.$parent.customIndex
          ];
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.form.content && !this.form.img1) {
            return this.$message.warning("内容与图片不能同时为空!");
          } else {
            let cacheData = objectMerge2(this.form);
            if (this.$parent.customType === "edit") {
              this.$parent.standForm.customList[
                this.$parent.customIndex
              ] = cacheData;
              this.$parent.tableKeys = Math.random();
            } else {
              this.$parent.standForm.customList.push(cacheData);
            }
            this.close();
          }
        } else {
          return this.$message({
            type: "warning",
            message: "请填写完整数据!"
          });
        }
      });
    },
    close(done) {
      //   this.$refs.ruleForm.resetFields();
      this.form = this.$options.data().form;
      this.$emit("update:dialogVisible", false);
      if (typeof done === "function") {
        done();
      }
    }
  }
};
</script>

<style type="text/css" lang="scss">
.garde {
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

