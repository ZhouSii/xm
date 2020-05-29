<template>
  <div class="boutiqueLineTable commoncss">
    <el-dialog
      :title="formtitle"
      :close-on-click-modal="false"
      @open="reviseForms"
      v-el-drag-dialog
      top="5vh"
      :visible="dialogFormVisibleTable"
      @close="close"
    >
      <el-row>
        {{ isDelet }}
        <el-table
          ref="multipleTable"
          :data="currentTableData"
          stripe
          border
          align="center"
          height="600px"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column
            label="序号"
            type="index"
            width="50"
          ></el-table-column>
          <el-table-column
            sortable
            label="专线公司"
            prop="companyName"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            sortable
            label="始发地"
            prop="agencyArea"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            sortable
            label="目的地"
            :show-overflow-tooltip="true"
            prop="totalEndArea"
          >
          </el-table-column>
          <el-table-column
            v-if="!isDelet"
            sortable
            prop="priority"
            label="优先级"
          >
            <template slot-scope="scope">
                <el-select v-model="scope.row.priority" :size="btnSize" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          plain
          icon="el-icon-success"
          @click="submitForm('ruleForm')"
          :disabled="btnShow"
          >保 存</el-button
        >
        <el-button type="primary" plain icon="el-icon-error" @click="close"
          >取 消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { objectMerge2 } from "@/utils/";
import { deleteBoutiqueLine,priorityBoutiqueLine } from "@/api/marketing/boutiqueLine";
import { REGEX } from "@/utils/validate";

export default {
  name: "boutiqueLineTable",
  props: {
    dialogFormVisibleTable: {
      type: Boolean,
      required: true
    },
    formtitle: {
      type: String,
      required: false,
      default: "设置优先级"
    },
    isDelet: {
      type: Boolean,
      default: false
    },
    changeArr: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  data() {
    return {
      btnShow: false,
      dialogVisible: false,
      btnSize: "small",
      currentTableData: [],
        options: [  {
          label: "普通",
          value: 0
        },
        {
          label: "一级",
          value: 9
        },
        {
          label: "二级",
          value: 8
        },
        {
          label: "三级",
          value: 7
        }],
    };
  },
  mounted() {},
  methods: {
    reviseForms() {
      this.$nextTick(() => {
        this.currentTableData = this.changeArr;
      });
    },
    getinfomation() {},
    close() {
      if (this.dialogFormVisibleTable) {
        this.$emit("update:dialogFormVisibleTable", false);
        this.$emit("renovate");
      }
    },
    //初始化选择项数据
    init() {},
    submitForm(formName) {
      let func = this.isDelet
        ? deleteBoutiqueLine(this.currentTableData)
        : priorityBoutiqueLine(this.currentTableData);
      func
        .then(res => {
          this.$message({
            type: "success",
            message: this.formtitle + "成功！"
          });
          this.close();
        })
        .catch(err => {
          this.$message({
            type: "info",
            message:
              "操作失败，原因：" + (err.errorInfo ? err.errorInfo : err.text)
          });
        });
      //   this.$refs[formName].validate(valid => {
      //     if (valid) {
      //       //   this.btnShow = true;
      //       //   this.completeName();
      //       //   let forms = objectMerge2(this.standForm);
      //       //   let standarFunction = this.isDelet
      //       //     ? agentNetWorkUpdata(forms)
      //       //     : agentNetWorkAdd(forms);
      //       //   standarFunction
      //       //     .then(res => {
      //       //       this.$message({
      //       //         type: "success",
      //       //         message: this.formtitle + "成功！"
      //       //       });
      //       //       this.close();
      //       //     })
      //       //     .catch(err => {
      //       //       this.$message({
      //       //         type: "info",
      //       //         message:
      //       //           "操作失败，原因：" +
      //       //           (err.errorInfo ? err.errorInfo : err.text)
      //       //       });
      //       //       this.btnShow = false;
      //       //     });
      //       // } else {
      //       //   this.$message({
      //       //     type: "warning",
      //       //     message: "请填写完整数据!"
      //       //   });
      //       //   return false;
      //     }
      //   });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.boutiqueLineTable {
  .el-dialog .el-dialog__body .el-table {
    margin: 0;
  }
}
</style>
