<template>
  <div class="creaseRegister commoncss">
    <el-dialog
      :title="typetitle"
      :visible="creaseRegister_add"
      :modal-append-to-body="false"
      :before-close="close"
      top="5vh"
      :close-on-click-modal="false"
      ref="dialog"
    >
      <el-form :model="formAll" ref="formAll" :rules="rulesForm">
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="投诉发起人："
              prop="reporterType"
              :label-width="formLabelWidth"
            >
              <el-select
                clearable
                placeholder="请选择"
                v-model="formAll.reporterType"
                @change="reporterTypeChange"
                :disabled="editType == 'edit'"
              >
                <el-option
                  v-for="item in optionsOne"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>
              <el-select
                clearable
                placeholder="请选择"
                v-model="formAll.complainId"
                @change="complainObject"
                :disabled="editType == 'edit'"
                filterable
                :filter-method="Complainantfilter"
              >
                <el-option
                  v-for="item in ComplainantList"
                  :key="item.complainId"
                  :label="item.complainantMobile"
                  :value="item.complainId"
                >
                  <span style="float: left">{{ item.complainName }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{
                    item.complainantMobile
                  }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="被投诉对象："
              prop=""
              :label-width="formLabelWidth"
            >
              <el-select
                clearable
                placeholder="请选择"
                v-model="formAll.respondentType"
                @change="respondentTypeChange"
              >
                <el-option
                  v-for="item in optionsTwo"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>
              <el-select
                clearable
                placeholder="请选择"
                v-model="formAll.respondentMobile"
                @change="respondentObject"
                v-if="
                  formAll.respondentType == 'AF0053101' ||
                    formAll.respondentType == 'AF0053102' ||
                    formAll.respondentType == 'AF0053104'
                "
                filterable
                :filter-method="Respondentfilter"
              >
                <el-option
                  v-for="item in RespondentList"
                  :key="item.keys"
                  :label="item.respondentMobile"
                  :value="item.keys"
                >
                  <span style="float: left">{{ item.respondentName }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px"
                    >{{ item.respondentMobile
                    }}<span v-if="item.remark">({{ item.remark }})</span></span
                  >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="投诉分类："
              prop=""
              :label-width="formLabelWidth"
            >
              <el-select
                clearable
                placeholder="请选择"
                v-model="formAll.complainType"
                @focus="complainIfData"
                @change="complainTypeObject"
                filterable
              >
                <el-option
                  v-for="item in complainTypeList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="通知内容："
              prop=""
              :label-width="formLabelWidth"
              class="textArea"
            >
              <el-input
                type="textarea"
                :rows="2"
                placeholder="1-200间的字符"
                maxlength="200"
                ref="infofocus"
                v-model="formAll.complainDes"
                clearable
              ></el-input>
              <p class="countNum">
                <span class="">{{ formAll.complainDes.length }}</span>
                <span>/ 200</span>
              </p>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add_data">确 定</el-button>
        <el-button @click="close()">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { eventBus } from "@/eventBus";
import { getDictionary, getUploadPolicy } from "@/api/common.js";
import { parseTime, pickerOptions2 } from "@/utils/";
import Pager from "@/components/Pagination/index";
import {
  getAllBusinessGroup,
  aflcBusinessGroupUserList
} from "@/api/company/businessGroup";
import {
  postlistComplainant,
  postlistRespondent,
  postReportComplain,
  aflcOrderComplainId,
  aflcOrderComplainUpdate
} from "@/api/service/dispose.js";
export default {
  components: {
    Pager
  },
  props: {
    paramsId: {
      type: String,
      default: ""
    },
    typetitle: {
      type: String,
      default: ""
    },
    /*add新增，edit编辑，view查看*/
    editType: {
      type: String
    },
    creaseRegister_add: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      defaultImg: "/static/test.jpg",
      formLabelWidth: "150px",
      pickerOptions2: { shortcuts: pickerOptions2 },
      btnStatus: true, //新增修改按钮状态
      btnsize: "mini",
      formAll: {
        orderSerial: this.$route.query.orderSerial,
        reporterType: null,
        complainName: null,
        complainId: null,
        complainantMobile: null,
        respondentType: null,
        respondentName: null,
        respondentMobile: null,
        respondentId: null,
        complainTypeName: "",
        complainType: "",
        complainDes: ""
      },
      groupCode: null,
      optionsOne: [], //投诉发起人类型
      optionsTwo: [], //被投诉对象类型
      complainTypeList: [], //投诉分类
      rulesForm: {
        reporterType: {
          required: true,
          message: "请选择投诉发起人",
          trigger: "change"
        }
      },
      // 投诉人
      Complainant: {
        orderSerial: this.$route.query.orderSerial,
        reporterType: ""
      },
      ComplainantList: [],
      OldComplainantList: [],
      OldComplainantselect: "",
      // 被投诉人
      Respondent: {
        orderSerial: this.$route.query.orderSerial,
        respondentType: ""
      },
      RespondentList: [],
      oldRespondentList: [],
      OldRespondentselect: ""
    };
  },
  watch: {
    creaseRegister_add: {
      handler: function(val, oldVal) {
        if (!val) {
          this.$refs["formAll"].resetFields();
          this.$emit("getData");
          for (var key in this.formAll) {
            this.formAll[key] = "";
          }
          this.ComplainantList = [];
          this.OldComplainantList = [];
          this.RespondentList = [];
          this.oldRespondentList = [];
        } else {
          this.formAll.orderSerial = this.$route.query.orderSerial;
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
    close: function() {
      this.$emit("update:creaseRegister_add", false);
    },
    openDialog() {
      let _this = this;
      aflcOrderComplainId(this.paramsId).then(res => {
        console.log("res", res);
        this.formAll = res.data;
        if (!res.data.respondentType) {
          let respondentType = res.data.complainType.substring(
            0,
            res.data.complainType.length - 2
          );
          if (respondentType == "AF00719") {
            this.formAll.respondentType = "AF0053101";
          } else if (respondentType == "AF00424") {
            this.formAll.respondentType = "AF0053102";
          } else if (respondentType == "AF0052901") {
            this.formAll.respondentType = "AF0053103";
          } else if (respondentType == "AF0052902") {
            this.formAll.respondentType = "AF0053104";
          }
        }
        new Promise(function(resolve) {
          _this.Complainant.reporterType = _this.formAll.reporterType;
          _this.Respondent.respondentType = _this.formAll.respondentType;
          _this.ComplainantMethods();
          _this.RespondentMethods();
          _this.complainMethod();
          resolve();
        });
      });
    },
    // 获取  服务和车辆 类型列表
    getMoreInformation() {
      this.$store.dispatch("GetInfoDic", "AF00532").then(res => {
        this.optionsOne = res;
      });
      this.$store.dispatch("GetInfoDic", "AF00531").then(res => {
        this.optionsTwo = res;
      });
      getAllBusinessGroup().then(res => {
        this.groupCode = res.data[0].groupCode;
      });
    },
    // 投诉类型
    complainMethod() {
      let respondentType = "";
      if (this.formAll.respondentType == "AF0053101") {
        respondentType = "AF00719";
      } else if (this.formAll.respondentType == "AF0053102") {
        respondentType = "AF00424";
      } else if (this.formAll.respondentType == "AF0053103") {
        respondentType = "AF0052901";
      } else if (this.formAll.respondentType == "AF0053104") {
        respondentType = "AF0052902";
      }
      getDictionary(respondentType).then(res => {
        this.complainTypeList = res.data;
      });
    },
    complainIfData() {
      if (!this.formAll.respondentType) {
        this.$message({
          message: "请先选择被投诉对象！",
          type: "warning"
        });
      }
    },
    Complainantfilter(val) {
      if (this.OldComplainantselect.length > val.length) {
        this.ComplainantList = this.OldComplainantList;
        this.OldComplainantselect = val;
      }
      if (val) {
        this.OldComplainantselect = val;
        this.ComplainantList = this.ComplainantList.filter(el => {
          if (el.complainName.indexOf(val) !== -1) {
            return el;
          }
          if (el.complainantMobile) {
            if (el.complainantMobile.indexOf(val) !== -1) {
              return el;
            }
          }
        });
      } else {
        this.ComplainantList = this.OldComplainantList;
      }
    },
    Respondentfilter(val) {
      if (this.OldRespondentselect.length > val.length) {
        this.RespondentList = this.oldRespondentList;
        this.OldRespondentselect = val;
      }
      if (val) {
        this.OldRespondentselect = val;
        this.RespondentList = this.RespondentList.filter(el => {
          console.log("data", el);
          // let fiflerdata
          // if(el.respondentName){
          //  fiflerdata = el.respondentName.indexOf(val)!==-1;
          // }
          // else{
          //  fiflerdata = el.respondentName
          // }
          // return fiflerdata
          if (el.respondentName) {
            if (el.respondentName.indexOf(val) !== -1) {
              return el;
            }
          }
          if (el.respondentMobile) {
            if (el.respondentMobile.indexOf(val) !== -1) {
              return el;
            }
          }
        });
      } else {
        this.RespondentList = this.oldRespondentList;
      }
    },

    reporterTypeChange(i) {
      this.Complainant.reporterType = i;
      this.formAll.complainName = null;
      this.formAll.complainId = null;
      this.formAll.complainantMobile = null;
      this.ComplainantMethods();
    },
    respondentTypeChange(i) {
      this.Respondent.respondentType = i;
      this.formAll.respondentName = null;
      this.formAll.respondentId = null;
      this.formAll.respondentMobile = null;
      this.formAll.complainType = null;
      this.RespondentMethods();
      this.complainMethod();
    },
    complainObject(value) {
      this.ComplainantList = this.OldComplainantList;
      if (value) {
        let item = this.ComplainantList.filter(el => {
          return el.complainId == value;
        })[0];
        this.formAll.complainName = item.complainName;
        this.formAll.complainId = item.complainId;
        this.formAll.complainantMobile = item.complainantMobile;
      } else {
        this.formAll.complainName = null;
        this.formAll.complainId = null;
        this.formAll.complainantMobile = null;
      }
    },
    respondentObject(value) {
      this.RespondentList = this.oldRespondentList;
      if (value) {
        let item = this.RespondentList.filter(el => {
          return el.keys == value;
        })[0];
        this.formAll.respondentName = item.respondentName;
        this.formAll.respondentId = item.respondentId;
        this.formAll.respondentMobile = item.respondentMobile;
      } else {
        this.formAll.respondentName = null;
        this.formAll.respondentId = null;
        this.formAll.respondentMobile = null;
      }
    },
    complainTypeObject(value) {
      if (value) {
        let item = this.complainTypeList.filter(el => {
          return el.code == value;
        })[0];
      } else {
        this.formAll.complainType = null;
        this.formAll.complainTypeName = null;
      }
    },
    ComplainantMethods() {
      postlistComplainant(this.Complainant).then(res => {
        this.ComplainantList = res.data;
        this.OldComplainantList = res.data;
      });
    },
    RespondentMethods() {
      this.RespondentList = [];
      this.oldRespondentList = [];
      postlistRespondent(this.Respondent).then(res => {
        res.data.forEach((item, i) => {
          this.RespondentList.push(item);
          this.RespondentList[i].keys = i + 1;
          this.oldRespondentList.push(item);
          this.oldRespondentList[i].keys = i + 1;
        });
      });
    },
    // 投诉登记
    add_data() {
      if (this.formAll.complainType == "" && this.formAll.complainDes == "") {
        this.$message({
          message: "投诉分类及投诉内容至少选填一项",
          type: "warning"
        });
      } else if (
        this.formAll.reporterType == "AF0053201" &&
        !this.formAll.complainName
      ) {
        this.$message.warning("请选择货主");
      } else if (
        this.formAll.reporterType == "AF0053202" &&
        !this.formAll.complainName
      ) {
        this.$message.warning("请选择车主");
      } else if (
        this.formAll.reporterType == "AF0053203" &&
        !this.formAll.complainName
      ) {
        this.$message.warning("请选择投诉客服");
      } else if (
        this.formAll.reporterType == "AF0053204" &&
        !this.formAll.complainName
      ) {
        this.$message.warning("请选择投诉业务员");
      } else if (
        this.formAll.respondentType == "AF0053101" &&
        !this.formAll.respondentMobile
      ) {
        this.$message.warning("请选择被投诉货主");
      } else if (
        this.formAll.respondentType == "AF0053102" &&
        !this.formAll.respondentMobile
      ) {
        this.$message.warning("请选择被投诉车主");
      } else if (
        this.formAll.respondentType == "AF0053104" &&
        !this.formAll.respondentMobile
      ) {
        this.$message.warning("请选择被投诉业务员");
      } else {
        this.$refs["formAll"].validate(valid => {
          if (valid) {
            if (this.btnStatus) {
              this.btnStatus = false;
              if (this.editType == "add") {
                postReportComplain(this.formAll)
                  .then(res => {
                    this.$emit("update:creaseRegister_add", false);
                    this.$message.success("投诉登记成功");
                  })
                  .catch(err => {
                    this.$emit("update:creaseRegister_add", false);
                    this.$message.error(err.text);
                  });
              } else {
                // console.log("formAll", this.formAll);
                aflcOrderComplainUpdate(this.formAll)
                  .then(res => {
                    this.$emit("update:creaseRegister_add", false);
                    this.$message.success("投诉登记修改成功");
                  })
                  .catch(err => {
                    this.$emit("update:creaseRegister_add", false);
                    this.$message.error(err.text);
                  });
              }
            }
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" >
.creaseRegister {
  .el-select {
    width: 220px !important;
  }
}
</style>
