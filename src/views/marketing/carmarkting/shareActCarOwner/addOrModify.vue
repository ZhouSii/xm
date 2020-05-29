<template>
  <div class="commoncss shareActDialog">
    <div class="commoncss shareActDialog">
      <el-dialog
        :title="typetitle"
        :visible="shareActCarDialogVisible"
        :modal-append-to-body="false"
        :before-close="close"
        top="5vh"
        :close-on-click-modal="false"
        ref="dialog"
        width="60%"
      >
        <el-form :model="formAll" ref="formAll" :rules="rulesForm">
          <el-row>
            <el-col :span="15">
              <el-form-item
                label="区域(二选一)"
                prop="areaCode"
                :label-width="formLabelWidth"
                :rules="{required:allAreaChosed==true?false:true,message:'请选择活动区域'}"
              >
                <getCityList
                  class="chooseItem"
                  @returnStr="getStrEnd"
                  v-model="formAll.areaCode"
                  :clearStatus="true"
                  ref="endArea"
                  :disabled="disableStatus"
                  :onlyOnce.sync="onlyOnceStatus"
                  :currentObj="(editType=='edit'&&{'province':formAll.provinceCode,'city':formAll.areaCode})||(editType=='add'&&{})"
                ></getCityList>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label prop="allAreaChosed" label-width="40px">
                <el-checkbox v-model="allAreaChosed" @change="changeDisableStatus">所有区域开通</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21">
              <el-form-item label="标题" prop="name" :label-width="formLabelWidth">
                <el-input clearable v-model="formAll.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21">
              <el-form-item prop="actTime" label="活动时间" :label-width="formLabelWidth">
                <el-date-picker
                  v-model="formAll.actTime"
                  type="daterange"
                  unlink-panels
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="cTime"
                  value-format="timestamp"
                  :default-time="['00:00:00', '23:59:59']"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item label="每天领取次数限制" prop="daynumTime" :label-width="formLabelWidth">
                <el-input clearable v-model.number="formAll.daynumTime" v-numberOnly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="活动期内领取次数限制"
                prop="activitynumTime"
                :label-width="formLabelWidth"
                :rules="{required:true,validator: (rule, value, callback) => {
                                    if (value==0||!value) {
                                    callback('请输入大于0的正整数');
                                    } else {
                                    callback();
                                    }
                                }, trigger: 'blur'}"
              >
                <el-input clearable v-model.number="formAll.activitynumTime" v-numberOnly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21">
              <el-form-item label="APP广告图片" :label-width="formLabelWidth" prop="position">
                <el-select v-model="formAll.position" placeholder="请选择">
                  <el-option
                    v-for="item in adsPositionList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21">
              <el-form-item label :label-width="formLabelWidth" class="showTip">
                <el-table :data="formAll.aflcSharingActivitiesPicture" size="small" border>
                  <el-table-column label="时间  (提示:请先选择活动时间)" width="280">
                    <template slot-scope="scope">
                      <el-form-item
                        :prop="'aflcSharingActivitiesPicture[' + scope.$index + '].imgShowTime'"
                        :rules="{required:true,validator:(rule, value, callback)=>{
          return checkTimePeriod(rule, value, callback,scope,'请选择时间','请输入正确的在活动时间内的时间段','请勿选择与上一条重合的时间段')
          }, trigger: 'blur'}"
                      >
                        <el-date-picker
                          v-model="scope.row.imgShowTime"
                          type="daterange"
                          unlink-panels
                          range-separator="-"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          @change="imgShowPeriod(scope.row.imgShowTime,scope.$index)"
                          value-format="timestamp"
                          :default-time="['00:00:00', '23:59:59']"
                          :disabled="imgShowTimeStatus"
                        ></el-date-picker>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="图片">
                    <template slot-scope="scope">
                      <el-form-item
                        :prop="'aflcSharingActivitiesPicture[' + scope.$index + '].picUrl'"
                        :rules="{required:true,message:'请上传图片', trigger: 'blur'}"
                      >
                        <upload
                          class="licensePicture"
                          v-model="scope.row.picUrl"
                          tip="（必须为jpg/png并且小于5M）"
                          pictureStatus="true"
                        />
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="120">
                    <template slot-scope="scope">
                      <el-button
                        size="small"
                        type="primary"
                        icon="el-icon-plus"
                        @click="addData('aflcSharingActivitiesPicture')"
                      ></el-button>
                      <el-button
                        size="small"
                        type="danger"
                        icon="el-icon-minus"
                        @click="deleteData(scope.$index,'aflcSharingActivitiesPicture')"
                      ></el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="规则说明" prop="ruleDes" :label-width="formLabelWidth">
                <el-input
                  clearable
                  v-model="formAll.ruleDes"
                  type="textarea"
                  placeholder
                  maxlength="500"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21">
              <el-form-item label="基础奖励" :label-width="formLabelWidth" class="showTip">
                <el-table :data="formAll.aflcSharingActivitiesFoundationreward" size="small" border>
                  <el-table-column label="时间" width="250">
                    <template slot-scope="scope">
                      <el-form-item
                        :prop="'aflcSharingActivitiesFoundationreward[' + scope.$index + '].baseRewardTime'"
                      >
                        <el-date-picker
                          v-model="scope.row.baseRewardTime"
                          type="daterange"
                          unlink-panels
                          range-separator="-"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          value-format="timestamp"
                          :default-time="['00:00:00', '23:59:59']"
                          disabled
                        ></el-date-picker>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="每天红包总额">
                    <template slot-scope="scope">
                      <el-form-item
                        :prop="'aflcSharingActivitiesFoundationreward[' + scope.$index + '].redTotal'"
                        :rules="{required:true,validator: (rule, value, callback) => {
                                    if (value==0||!value) {
                                    callback('请输入大于0的正整数');
                                    } else {
                                    callback();
                                    }
                                },trigger:'blur'}"
                      >
                        <el-input clearable v-model.number="scope.row.redTotal" v-numberOnly></el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="单个红包金额上限">
                    <template slot-scope="scope">
                      <el-form-item
                        :prop="'aflcSharingActivitiesFoundationreward[' + scope.$index + '].redtop'"
                        :rules="{pattern:checkPoint.ONLY_NUMBER_POINT2,required:true,message:'请输入单个红包金额上限，最多两位小数'}"
                      >
                        <el-input clearable v-model.trim="scope.row.redtop" v-number-only:point3></el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                </el-table>
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
  </div>
</template>
<script>
import { eventBus } from "@/eventBus";
import { getDictionary, getUploadPolicy } from "@/api/common.js";
import { parseTime, pickerOptions2 } from "@/utils/";
import Upload from "@/components/Upload/CarSinglemage";
import getCityList from "@/components/GetCityList/chinaMap1";
import { REGEX } from "@/utils/validate";
import {
  aflcSharingActivitiesAdd,
  aflcSharingActivitiesDetail,
  aflcSharingActivitiesUpdate
} from "@/api/marketing/shippermarkting/shareAct.js";
export default {
  components: { Upload, getCityList },
  props: {
    params: {
      type: [Object, Array]
    },
    typetitle: {
      type: String,
      default: ""
    },
    /*add新增，edit编辑*/
    editType: {
      type: String
    },
    shareActCarDialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    var checkDrawTime = (rule, value, callback) => {
      if (!value || value == 0 || value > 99) {
        callback(new Error("请输入1-99的整数"));
      } else {
        callback();
      }
    };
    return {
      checkPoint: REGEX,
      formLabelWidth: "160px",
      // pickerOptions2: { shortcuts: pickerOptions2 },
      btnsize: "mini",
      allAreaChosed: false,
      formAll: {
        userType: "0",
        areaCode: "",
        actTime: "",
        name: "",
        daynumTime: "",
        activitynumTime: "",
        position: "",
        aflcSharingActivitiesPicture: [
          {
            imgShowTime: "",
            startTime: "",
            endTime: "",
            picUrl: ""
          }
        ],
        ruleDes: "",
        aflcSharingActivitiesFoundationreward: [
          {
            redTotal: "",
            redtop: "",
            startTime: "",
            endTime: "",
            baseRewardTime: ""
          }
        ]
        // aflcSharingActivitiesAdditionalreward: [
        //   {
        //     stepvalue: "",
        //     activityName: "",
        //     couponId: "",
        //     link: "",
        //     subsidiary: ""
        //   }
        // ]
      },
      rulesForm: {
        name: {
          required: true,
          message: "请输入活动标题",
          trigger: "blur"
        },
        position: {
          required: true,
          message: "请选择广告位置",
          trigger: "blur"
        },
        daynumTime: {
          required: true,
          validator: checkDrawTime,
          trigger: "blur"
        },
        ruleDes: {
          required: true,
          message: "请输入至多500字的规则说明",
          trigger: "blur"
        },
        actTime: {
          required: true,
          message: "请选择活动时间",
          trigger: "blur"
        }
      },
      onlyOnceStatus: false,
      disableStatus: false,
      adsPositionList: [
        { id: "0", name: "第一" },
        { id: "1", name: "最后" }
      ],
      imgShowTimeStatus: true
    };
  },
  watch: {
    shareActCarDialogVisible: {
      handler: function(val, oldVal) {
        if (!val) {
          this.$refs["formAll"].resetFields();
          this.$emit("getData");
          this.allAreaChose = false;
          this.formAll = {
            userType: "0",
            areaCode: "",
            name: "",
            daynumTime: "",
            activitynumTime: "",
            position: "",
            aflcSharingActivitiesPicture: [
              {
                imgShowTime: "",
                startTime: "",
                endTime: "",
                picUrl: ""
              }
            ],
            ruleDes: "",
            aflcSharingActivitiesFoundationreward: [
              {
                redTotal: "",
                redtop: "",
                startTime: "",
                endTime: "",
                baseRewardTime: ""
              }
            ]
            // aflcSharingActivitiesAdditionalreward: [
            //   {
            //     stepvalue: "",
            //     activityName: "",
            //     couponId: "",
            //     link: "",
            //     subsidiary: ""
            //   }
            // ]
          };
        } else {
          if (this.editType != "add") {
            this.openDialog();
            this.imgShowTimeStatus = false;
          } else {
            this.allAreaChosed = false;
            this.disableStatus = false;
          }
        }
      }
    }
  },
  methods: {
    openDialog: function() {
      aflcSharingActivitiesDetail(this.params.id)
        .then(res => {
          this.formAll = res.data;
          this.$set(this.formAll, "actTime", [
            this.formAll.startTime,
            this.formAll.endTime
          ]);
          this.formAll.aflcSharingActivitiesPicture.map(
            (item, index, array) => {
              this.$set(item, "imgShowTime", [item.startTime, item.endTime]);
              this.$set(
                this.formAll.aflcSharingActivitiesFoundationreward[index],
                "baseRewardTime",
                [item.startTime, item.endTime]
              );
            }
          );
          if (this.formAll.areaCode) {
            this.allAreaChosed = false;
            this.disableStatus = false;
            this.formAll.provinceCode =
              this.formAll.areaCode.slice(0, 2) + "0000";
          } else {
            this.allAreaChosed = true;
            this.disableStatus = true;
          }
          this.onlyOnceStatus = true;
        })
        .catch(err => {
          this.$message.error(err.errorInfo || err.text);
        });
    },
    close: function() {
      this.$refs.endArea.clearData();
      this.allAreaChosed = false;
      this.$emit("update:shareActCarDialogVisible", false);
    },
    getStrEnd(d) {
      this.formAll.province = d.province ? d.province.name : "";
      this.formAll.city = d.city ? d.city.name : "";
      this.formAll.areaCode = d.city ? d.city.code : "";
      this.formAll.provinceCode = d.province ? d.province.code : "";
      this.formAll.areaText =
        d.province && d.city
          ? d.city.name == d.province.name
            ? d.city.name
            : d.province.name + d.city.name
          : "";
    },
    changeDisableStatus() {
      if (this.allAreaChosed) {
        this.$refs.endArea.clearData();
        this.formAll.areaCode = "";
        this.formAll.province = "";
        this.formAll.city = "";
        this.formAll.areaText = "不限";
        this.formAll.provinceCode = "";
        this.disableStatus = true;
      } else {
        this.disableStatus = false;
      }
    },
    // 新增图片
    addData() {
      this.formAll.aflcSharingActivitiesPicture.push({
        imgShowTime: "",
        startTime: "",
        endTime: "",
        picUrl: ""
      });
      this.formAll.aflcSharingActivitiesFoundationreward.push({
        redTotal: "",
        redtop: "",
        startTime: "",
        endTime: "",
        baseRewardTime: ""
      });
    },

    deleteData(index) {
      if (this.formAll.aflcSharingActivitiesPicture.length == 1) {
        this.formAll.aflcSharingActivitiesPicture = [
          {
            imgShowTime: "",
            startTime: "",
            endTime: "",
            picUrl: ""
          }
        ];
        this.formAll.aflcSharingActivitiesFoundationreward = [
          {
            redTotal: "",
            redtop: "",
            startTime: "",
            endTime: "",
            baseRewardTime: ""
          }
        ];
      } else {
        this.$confirm("该操作不可撤销，确定要删除吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.formAll.aflcSharingActivitiesPicture.splice(index, 1);
            this.formAll.aflcSharingActivitiesFoundationreward.splice(index, 1);
          })
          .catch(() => {
            this.$message.warning("已取消");
          });
      }
    },

    imgShowPeriod(i, index) {
      this.formAll.aflcSharingActivitiesPicture[index].startTime = i
        ? i[0]
        : "";
      this.formAll.aflcSharingActivitiesPicture[index].endTime = i ? i[1] : "";
      this.formAll.aflcSharingActivitiesFoundationreward[index].startTime = i
        ? i[0]
        : "";
      this.formAll.aflcSharingActivitiesFoundationreward[index].endTime = i
        ? i[1]
        : "";
      this.formAll.aflcSharingActivitiesFoundationreward[
        index
      ].baseRewardTime = i;
    },
    cTime(i) {
      if (i) {
        this.formAll.startTime = i[0];
        this.formAll.endTime = i[1];
        this.imgShowTimeStatus = false;
      } else {
        this.formAll.startTime = "";
        this.formAll.endTime = "";
        this.formAll.actTime = "";
        this.imgShowTimeStatus = true;
      }
    },
    //验证时间
    checkTimePeriod(rule, value, callback, item, tip1, tip2, tip3) {
      if (!value) {
        callback(new Error(tip1));
      } else {
        let tempArr = this.formAll.aflcSharingActivitiesPicture;
        if (
          this.formAll.actTime &&
          (value[0] < this.formAll.actTime[0] ||
            value[1] > this.formAll.actTime[1])
        ) {
          callback(new Error(tip2));
        }
        if (item.$index > 0) {
          if (
            !(
              value[0] > tempArr[item.$index - 1].endTime ||
              value[1] < tempArr[item.$index - 1].startTime
            )
          ) {
            callback(new Error(tip3));
          } else {
            callback();
          }
        } else {
          callback();
        }
      }
    },
    //验证大小关系
    compareCheck() {
      if (+this.formAll.daynumTime > +this.formAll.activitynumTime) {
        this.$message.warning("每天领取次数要小于活动期内领取次数");
        return false;
      }
      let tempRedArr = this.formAll.aflcSharingActivitiesFoundationreward;
      for (let i = 0; i <= tempRedArr.length - 1; i++) {
        if (+tempRedArr[i].redTotal < +tempRedArr[i].redtop) {
          this.$message.warning("单个红包金额上限要小于每天红包总额");
          return false;
        }
      }
    },
    //新增/修改
    operatedata() {
      if (this.compareCheck() == false) {
        return;
      } else {
        this.$refs["formAll"].validate(valid => {
          if (valid) {
            if (this.editType == "add") {
              aflcSharingActivitiesAdd(this.formAll)
                .then(res => {
                  this.$emit("update:shareActCarDialogVisible", false);
                  this.$message.success("新增成功");
                })
                .catch(err => {
                  this.$emit("update:shareActCarDialogVisible", false);
                  this.$message.error(err.errorInfo || err.text);
                });
              this.$refs.endArea.clearData();
            } else {
              aflcSharingActivitiesUpdate(this.formAll)
                .then(res => {
                  this.$emit("update:shareActCarDialogVisible", false);
                  this.$message.success("修改成功");
                })
                .catch(err => {
                  this.$emit("update:shareActCarDialogVisible", false);
                  this.$message.error(err.errorInfo || err.text);
                });
            }
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.shareActDialog /deep/ {
  .el-form-item {
    // margin-bottom: 20px;
    .el-form-item__content {
      line-height: 26px;
    }
  }
  .upload-container {
    height: 150px;
    .image-preview .image-preview-action {
      line-height: 160px;
    }
  }
  .showTip .el-form-item__error {
    position: relative;
  }
}
</style>

