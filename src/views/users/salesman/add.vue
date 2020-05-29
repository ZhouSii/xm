<template>
  <div class="commoncss">
    <el-dialog
      :title="isModify ? '修改二维码' : '新增二维码'"
      :modal="true"
      :visible="dialogVisible"
      custom-class="add-review"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      v-loading="loading"
      width="45%"
      v-el-drag-dialog
      @open="reviseForms"
      :before-close="close"
    >
      <el-form
        :model="standForm"
        :rules="newrules"
        ref="ruleForm"
        :label-width="formLabelWidth"
        label-position="right"
      >
        <el-form-item label="链接名称：" prop="urlValue">
          <el-select
            v-if="!isModify"
            v-model="standForm.urlValue"
            clearable
            placeholder="请选择"
            @change="getUrlObj"
          >
            <el-option
              v-for="item in optionsQRcode"
              :key="item.id"
              :label="item.name"
              :value="item.value"
              :disabled="item.disabled"
            >
              <span style="float: left">{{
                item.name
              }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.value
              }}</span>
            </el-option>
          </el-select>
          <el-input v-model="standForm.urlName" disabled v-else></el-input>
          <p></p>
        </el-form-item>
        <el-form-item label="渠道名称：" prop="channalCode">
          <selectChannel
            @inputObject="getVal"
            v-model="standForm.channalCode"
          />
        </el-form-item>
        <el-form-item label="所属业务组：" prop="groupId">
          <businessGroup
            @inputObject="getValBusiness"
            v-model="standForm.groupId"
            ref="businessGroup"
          />
        </el-form-item>
        <el-form-item label="业务员：" prop="belongSalesman">
          <el-select
            v-model="standForm.belongSalesman"
            @focus="getfollowUp"
            @change="getfollowUpName"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in optionseFollowUp"
              :key="item.id"
              :label="item.name"
              :value="item.userId"
            >
            </el-option>
          </el-select>
        </el-form-item>
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
import { getDictionary, DicQRcodeLink } from "@/api/common.js";
// import CustomerSearch from "@/components/CustomerSearch/select";
import businessGroup from "@/components/selectTree/businessGroup";
import {
  addUserQrCode,
  updateUserQrCode,
  userQrCodeDetails
} from "@/api/users/salesMan.js";
import selectChannel from "@/components/selectTree/QRcode";
import { aflcBusinessGroupUserList } from "@/api/company/businessGroup";
export default {
  name: "newQRcodeCompent",
  components: {
    // CustomerSearch,
    businessGroup,
    selectChannel
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    isModify: {
      type: Boolean,
      default: false
    },
    changeForm: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      cancelReason: "AF00512", //取消原因
      formLabelWidth: "15%",
      loading: false,
      optionsQRcode: [],
      optionseFollowUp: [],
      standForm: {
        belongSalesman: null, //业务员id
        belongSalesmanName: "",
        belongSalesmanMobile: "",
        channalCode: "", //渠道code
        channalName: "", //渠道名称
        // id: "",
        urlCode: "", //url数据字典code
        urlName: "", //链接名称
        urlValue: "", //链接
        groupId: null, //mock字段
        groupCode: ""
      },
      listSystemObj: {
        currentPage: 1,
        pageSize: 100000,
        vo: {
          groupCode: ""
        }
      },
      optionsCancel: [],
      ifClear: "", //判断字段
      newrules: {
        urlValue: [
          { required: true, message: "请选择链接名称", trigger: "change" }
        ]
        // name: { required: true, message: "请选择业务员", trigger: "change" },
        // channal: { required: true, message: "请选择渠道", trigger: "change" },
        // url: { required: true, message: "请输入链接", trigger: "change" }
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    reviseForms() {
      this.$nextTick(() => {
        if (this.isModify) {
          userQrCodeDetails(this.changeForm.id)
            .then(res => {
              this.listSystemObj.vo.groupCode = res.data.groupCode;
              this.getfollowUp(null, true);
              this.standForm = res.data;
            })
            .catch(err => {
              return this.$message.warning(err.errorInfo || err.text);
            });
        }
      });
    },
    init() {
      DicQRcodeLink().then(res => {
        this.optionsQRcode = res.data;
      });
    },
    getVal(val) {
      // console.log(val)
      this.standForm.channalName = val.name;
      this.standForm.channalCode = val.code;
    },
    getUrlObj(e) {
        console.log('getUrlObj',e);
    //   if (e.value) {
    //     this.standForm.urlName = e.name;
    //     this.standForm.urlCode = e.code;
    //   } else {
        this.optionsQRcode.forEach(el => {
          if (el.value === e) {
            this.standForm.urlName = el.name;
            this.standForm.urlCode = el.code;
          }
        });
    //   }
        console.log('this.standForm',this.standForm)
    },
    getfollowUp(val, status) {
      this.optionseFollowUp = [];
      if (!this.standForm.groupId && !status) {
        return this.$message({
          type: "warning",
          message: "请先选择所属业务组!"
        });
      } else {
        aflcBusinessGroupUserList(this.listSystemObj)
          .then(res => {
            this.optionseFollowUp = res.data.list;
            if (this.optionseFollowUp.length == 0 && this.standForm.groupId) {
              this.standForm.belongSalesman = "";
              this.standForm.belongSalesmanName = "";
              this.standForm.belongSalesmanMobile = "";
            }
          })
          .catch(err => {
            this.standForm.belongSalesman = "";
            this.standForm.belongSalesmanName = "";
            this.standForm.belongSalesmanMobile = "";
          });
      }
    },
    getfollowUpName(val) {
      // console.log(val)
      this.optionseFollowUp.forEach(el => {
        if (el.userId === this.standForm.belongSalesman) {
          this.standForm.belongSalesmanName = el.name;
          this.standForm.belongSalesmanMobile = el.mobile;
        }
      });
    },
    getValBusiness(val) {
      if (val !== this.ifClear) {
        // console.log("ifClearifClearifClear");
        this.ifClear = val;
        this.standForm.belongSalesman = "";
      }
      this.standForm.groupId = val.id;
      this.standForm.groupCode = val.groupCode;
      //   this.standForm.businessGroupName = val.groupName;
      this.listSystemObj.vo.groupCode = val.groupCode;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let form = Object.assign({}, this.standForm);
          console.log("form", form);
          let fc = this.isModify ? updateUserQrCode(form) : addUserQrCode(form);
          fc.then(res => {
            this.close();
            this.$message({
              type: "success",
              message: "操作成功~"
            });
          }).catch(err => {
            this.$message({
              type: "info",
              message: "操作失败，原因：" + (err.errorInfo || err.text)
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    close(done) {
      this.$refs.ruleForm.resetFields();
      this.standForm = this.$options.data().standForm;
      this.$emit("update:dialogVisible", false);
      this.$emit("close");
      if (typeof done === "function") {
        done();
      }
    }
  }
};
</script>

<style type="text/css" lang="scss" scoped>
</style>

