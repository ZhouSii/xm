<template>
  <div class="commoncss">
    <el-dialog
      :title="typetitle"
      :visible="adsDialogFormVisible"
      :modal-append-to-body="false"
      :before-close="close"
      top="5vh"
      :close-on-click-modal="false"
      ref="dialog"
    >
      <el-form :model="formAll" ref="formAll" :rules="rulesForm">
        <el-row>
          <el-col :span="18">
            <!-- <el-form-item label="发布城市：" prop="pubCityName" :label-width="formLabelWidth">
              <vregion :ui="true" @values="regionChange" class="form-control">
                <el-input
                  v-model="formAll.pubCityName"
                  placeholder="请选择"
                  :disabled="editType=='edit'"
                ></el-input>
              </vregion>
            </el-form-item>-->
            <el-form-item
              label="发布城市："
              prop="pubCityCode"
              v-if="editType=='add'"
              :label-width="formLabelWidth"
            >
              <getCityList
                class="chooseItem"
                @returnStr="getStrEnd"
                v-model="formAll.pubCityCode"
                ref="endArea"
              ></getCityList>
            </el-form-item>
            <el-form-item label="发布城市：" prop="pubCityCode" v-else :label-width="formLabelWidth">
              <el-input :value="formAll.pubCityName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="用户应用端：" prop="appTerminalCode" :label-width="formLabelWidth">
              <el-select
                v-model="formAll.appTerminalCode"
                clearable
                placeholder="请选择"
                @change="getSelectedName($event,appTerminalList,'appTerminalName')"
                :disabled="editType=='edit'"
              >
                <el-option
                  v-for="item in appTerminalList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="广告位：" prop="advLocationCode" :label-width="formLabelWidth">
              <el-select
                v-model="formAll.advLocationCode"
                clearable
                placeholder="请选择"
                :disabled="editType=='edit'"
                @change="getSelectedName($event,advLocationList,'advLocationName')"
              >
                <el-option
                  v-for="item in advLocationList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="广告图：" :label-width="formLabelWidth" prop="advPosterImage">
              <upload
                class="licensePicture"
                v-model="formAll.advPosterImage"
                tip="（必须为jpg/png并且小于5M）"
                pictureStatus="true"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item
              label="广告链接地址："
              :label-width="formLabelWidth"
              prop="advPosterLink"
              :rules="{required:formAll.appTerminalCode!=='AF10103',message:'请输入地址',trigger:'blur'}"
            >
              <el-input
                clearable
                v-model="formAll.advPosterLink"
                maxlength="100"
                :disabled="formAll.appTerminalCode=='AF10103'"
              ></el-input>
              <el-button
                @click="skipToPreview(formAll.advPosterLink)"
                :size="btnsize"
                v-if="formAll.appTerminalCode!=='AF10103'"
              >点击预览</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="展示时间:" :label-width="formLabelWidth" prop="showTime">
              <el-date-picker
                v-model="formAll.showTime"
                type="daterange"
                unlink-panels
                :picker-options="pickerOptions2"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
                @change="cTime"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="备注说明：" prop="remark" :label-width="formLabelWidth">
              <el-input
                clearable
                v-model="formAll.remark"
                type="textarea"
                placeholder="请输入备注信息"
                maxlength="100"
              ></el-input>
              <p class="countNum">
                <span style="color:red">{{formAll.remark.length}}</span>
                <span>/100</span>
              </p>
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
import Upload from "@/components/Upload/CarSinglemage";
import vregion from "@/components/vregion/Region";
import getCityList from "@/components/GetCityList/chinaMap1";
import { getCityInfo } from "@/api/common";
import {
  marketingAdvSettingsAdd,
  marketingAdvSettingsUpdate
} from "@/api/marketing/adsConfig";
export default {
  components: { Upload, vregion, getCityList },
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
    adsDialogFormVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formLabelWidth: "250px",
      pickerOptions2: { shortcuts: pickerOptions2 },
      btnsize: "mini",
      formAll: {
        pubCityName: "",
        pubCityCode: "",
        appTerminalName: "",
        appTerminalCode: "",
        advLocationName: "",
        advLocationCode: "",
        advPosterImage: "",
        advPosterLink: "",
        remark: "",
        showTime: "",
        province: "",
        city: ""
      },
      rulesForm: {
        pubCityCode: {
          required: true,
          message: "请选择发布城市",
          trigger: "blur"
        },
        appTerminalCode: {
          required: true,
          message: "请选择用户应用端",
          trigger: "blur"
        },
        advLocationCode: {
          required: true,
          message: "请选择广告位",
          trigger: "blur"
        },
        advPosterImage: {
          required: true,
          message: "请上传图片",
          trigger: "blur"
        },
        showTime: {
          required: true,
          message: "请选择展示时间",
          trigger: "blur"
        }
      },
      appTerminalList: [],
      advLocationList: []
    };
  },
  watch: {
    adsDialogFormVisible: {
      handler: function(val, oldVal) {
        if (!val) {
          this.$refs["formAll"].resetFields();
          this.$emit("getData");
          this.formAll = {
            pubCityName: "",
            appTerminalName: "",
            appTerminalCode: "",
            advLocationName: "",
            advPosterImage: "",
            advPosterLink: "",
            remark: ""
          };
        } else {
          getDictionary("AF101").then(res => {
            this.appTerminalList = res.data;
          });
          if (this.editType != "add") {
            this.openDialog();
          } else {
            this.$set(this.formAll, "showTime", []);
          }
        }
      }
    },
    "formAll.appTerminalCode": {
      deep: true,
      handler: function(newV, oldV) {
        if (newV) {
          getDictionary(newV).then(res => {
            this.advLocationList = res.data;
            if (newV == "AF10103") {
              this.formAll.advLocationName = "首页弹框广告位";
              this.formAll.advLocationCode = "AF1010301";
            } else if (newV !== "AF10103" && this.editType == "add") {
              this.formAll.advLocationName = "";
              this.formAll.advLocationCode = "";
            }
          });
        }
      }
    }
  },
  methods: {
    openDialog: function() {
      this.formAll = this.params;
      this.$set(this.formAll, "showTime", [
        this.params.showTimeStart,
        this.params.showTimeEnd
      ]);
    },
    close: function() {
      if (this.editType == "add") {
        this.$refs.endArea.clearData();
      }
      this.$emit("update:adsDialogFormVisible", false);
    },
    cTime(i) {
      if (i) {
        this.formAll.showTimeStart = i[0];
        this.formAll.showTimeEnd = i[1];
      } else {
        this.formAll.showTimeStart = "";
        this.formAll.showTimeEnd = "";
      }
    },
    getStrEnd(d) {
      this.formAll.province = d.province ? d.province.name : "";
      this.formAll.city = d.city ? d.city.name : "";
      this.formAll.pubCityCode = d.city ? d.city.code : "";
      this.formAll.pubCityName =
        d.city.name == d.province.name
          ? d.city.name
          : d.province.name + d.city.name;
    },
    skipToPreview(url) {
      if (url) {
        window.open(url);
      } else {
        this.$message.warning("请输入地址");
      }
    },
    getSelectedName(val, list, selectedName) {
      let obj = {};
      obj = list.find(item => {
        return item.code == val;
      });
      this.formAll[selectedName] = obj.name;
    },
    //新增/修改
    operatedata() {
      console.log(this.formAll);
      this.$refs["formAll"].validate(valid => {
        if (valid) {
          if (this.editType == "add") {
            marketingAdvSettingsAdd(this.formAll)
              .then(res => {
                this.$message.success("新增成功");
                this.$emit("update:adsDialogFormVisible", false);
              })
              .catch(err => {
                this.$message.error(err.errorInfo || err.text);
                this.$emit("update:adsDialogFormVisible", false);
              });
            this.$refs.endArea.clearData();
          } else {
            marketingAdvSettingsUpdate(this.formAll)
              .then(res => {
                this.$message.success("修改成功");
                this.$emit("update:adsDialogFormVisible", false);
              })
              .catch(err => {
                this.$message.error(err.errorInfo || err.text);
                this.$emit("update:adsDialogFormVisible", false);
              });
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" >
</style>
