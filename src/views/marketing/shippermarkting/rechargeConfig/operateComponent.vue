<template>
  <div class="commoncss rechargeConfigAdd">
    <el-dialog
      :title="typetitle"
      :visible.sync="rechargedialogFormVisible"
      :modal-append-to-body="false"
      :before-close="close"
      top="5vh"
      :close-on-click-modal="false"
      ref="dialog"
      width="62%"
    >
      <el-form :model="formAll" ref="formAll" :rules="rulesForm" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="活动城市" prop="actCityCode">
              <getCityList
                class="chooseItem"
                @returnStr="getStrEnd"
                v-model="formAll.actCityCode"
                ref="endArea"
                :onlyOnce.sync="onlyOnceStatus"
                :currentObj="(editType=='edit'&&{'province':formAll.provinceCode,'city':formAll.actCityCode})||(editType=='add'&&{})"
              ></getCityList>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item v-for="(item,index) in formAll.gearList" :key="index" label-width="0">
              <el-row style="margin-bottom: 20px">
                <el-col :span="8">
                  <el-form-item
                    label="充值档位"
                    :prop="'gearList['+index+'].gearCode'"
                    :rules="{required: true, message: '请选择充值档位', trigger: 'blur'}"
                  >
                    <el-select
                      v-model="item.gearCode"
                      placeholder="请选择"
                      @change="checkSelected(item.gearCode,index)"
                    >
                      <el-option
                        v-for="item in gearCodeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code"
                        :disabled="item.disabled"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label-width="10px">
                    <el-checkbox v-model="item.isAddGive" true-label="1" false-label="0">与充值赠送金额叠加</el-checkbox>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="返券标题" :prop="'gearList['+index+'].retCouponTitle'">
                    <el-input
                      v-model="item.retCouponTitle"
                      clearable
                      placeholder="请输入返券标题"
                      maxlength="20"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label-width="10px">
                    <el-button @click="addItem" v-if="index == 0" type="primary">继续添加充值档位</el-button>
                    <el-button @click="reduceItem(index)" v-else type="danger">删除充值档位</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item
                    label="优惠券活动名称"
                    :prop="'gearList['+index+'].couponActs'"
                    :rules="{required: true, message: '请选择优惠券活动名称', trigger: 'blur'}"
                  >
                    <el-select
                      v-model="item.couponActs"
                      placeholder="请选择"
                      @change="chooseActTime($event,index)"
                    >
                      <el-option
                        v-for="item in couponActsList"
                        :key="item.id"
                        :label="item.activityName"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="活动时间" :prop="'gearList['+index+'].actTimePeriod'">
                    <el-date-picker
                      v-model="item.actTimePeriod"
                      type="daterange"
                      unlink-panels
                      :picker-options="pickerOptions2"
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :default-time="['00:00:00', '23:59:59']"
                      readonly
                      disabled
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- </el-form> -->
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
import getCityList from "@/components/GetCityList/chinaMap1";
import { getDictionary } from "@/api/common.js";
import { parseTime, pickerOptions2 } from "@/utils/";
import { data_get_couponActivehand_list } from "@/api/marketing/shippermarkting/couponActive.js";
import {
  rechargeDiscountSettingsAdd,
  rechargeDiscountSettingsGearDelete,
  rechargeDiscountSettingsUpdate,
  rechargeDiscountSettingsDetail
} from "@/api/marketing/shippermarkting/rechargeConfig.js";
export default {
  data() {
    return {
      pickerOptions2: { shortcuts: pickerOptions2 },
      formAll: {
        actCityName: "",
        actCityCode: "",
        province: "",
        city: "",
        gearList: [
          {
            gearCode: "",
            isAddGive: "0",
            retCouponTitle: "",
            couponActs: "",
            actTimePeriod: [],
            id: null, //每个档位的id
            settingId: null //该优惠配置总的id
          }
        ]
      },
      onlyOnceStatus: false,
      gearCodeList: [],
      couponActsList: [],
      rulesForm: {
        actCityCode: {
          required: true,
          message: "请选择发布城市",
          trigger: "change"
        }
      }
    };
  },
  computed: {
    // checkTime() {
    //   return function(rule, value, callback) {
    //     // console.log(rule);
    //     // console.log(value);
    //     // console.log(callback);
    //     if (!this.actTimePeriod) {
    //       callback(new Error("请选择活动时间"));
    //     } else {
    //       callback();
    //     }
    //   };
    // }
  },
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
    rechargedialogFormVisible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    getCityList
  },
  watch: {
    rechargedialogFormVisible: {
      handler: function(val, oldVal) {
        if (!val) {
          this.$refs["formAll"].resetFields();
          this.$emit("getData");
          this.formAll = {
            actCityName: "",
            actCityCode: "",
            province: "",
            city: "",
            gearList: [
              {
                gearCode: "",
                isAddGive: "0",
                retCouponTitle: "",
                couponActs: "", //优惠券活动id
                actTimePeriod: [],
                id: null, //每个档位的id
                settingId: null //该优惠配置总的id
              }
            ]
          };
        } else {
          if (this.editType != "add") {
            this.openDialog();
          } else {
            this.getDictionaryInfo();
            this.formAll.gearList[0].actTimePeriod = [];
          }
        }
      }
    }
  },
  mounted() {
    this.getActivityNameList();
  },
  methods: {
    getDictionaryInfo() {
      getDictionary("AF011").then(res => {
        this.gearCodeList = res.data;
        this.gearCodeList.map(item => {
          Object.assign(item, { disabled: false });
        });
      });
    },
    //获取优惠券活动名称下拉框列表
    getActivityNameList() {
      let selectedParams = {
        activityState: "AF047002"
      };
      data_get_couponActivehand_list(0, 0, selectedParams).then(res => {
        this.couponActsList = res.data.list;
      });
    },
    async openDialog() {
      let [codeRes, formRes] = await Promise.all([
        getDictionary("AF011"),
        rechargeDiscountSettingsDetail(this.params[0].id)
      ]);
      this.gearCodeList = codeRes.data;
      this.formAll = formRes.data;
      this.formAll.provinceCode = this.formAll.actCityCode.slice(0, 2) + "0000";
      this.onlyOnceStatus = true;
      //获取对应的优惠券活动的有效时间
      this.formAll.gearList.map(item => {
        if (typeof item.isAddGive !== "string") {
          // isAddGive数据类型为number时 checkbox无法显示选中
          item.isAddGive = item.isAddGive.toString();
        }
        let temArr = this.couponActsList.filter(item1 => {
          return item1.id == item.couponActs;
        });
        if (temArr.length == 0) {
          item.couponActs = item.activityName;
        } else {
          item.actTimePeriod = [temArr[0].startTime, temArr[0].endTime];
        }
        this.gearCodeList.map(item2 => {
          if (item.gearCode == item2.code) {
            item.gearValue = item2.value;
            item2.disabled = true;
          }
        });
      });
    },
    close: function() {
      this.$refs.endArea.clearData();
      this.$emit("update:rechargedialogFormVisible", false);
    },
    getStrEnd(d) {
      this.formAll.province = d.province ? d.province.name : "";
      this.formAll.city = d.city ? d.city.name : "";
      this.formAll.actCityCode = d.city ? d.city.code : "";
      this.formAll.actCityName =
        d.city.name == d.province.name
          ? d.city.name
          : d.province.name + d.city.name;
    },
    checkSelected(i, index) {
      let obj = this.gearCodeList.find(item => {
        return item.code == i;
      });
      this.formAll.gearList[index].gearValue = obj.value;
      this.formAll.gearList[index].gearClassify = obj.name;
      this.gearCodeList.map(item => {
        item.disabled = item.code == i;
        this.formAll.gearList.map(item1 => {
          if (item.code == item1.gearCode) {
            item.disabled = true;
          }
        });
      });
    },
    chooseActTime(value, i) {
      let chooseItem = this.couponActsList.find(item => {
        return item.id == value;
      });
      this.formAll.gearList[i].actTimePeriod = [
        chooseItem.startTime,
        chooseItem.endTime
      ];
      this.formAll.gearList[i].activityName = chooseItem.activityName;
      this.formAll.gearList[i].startTime = new Date(
        chooseItem.startTime
      ).getTime();
      this.formAll.gearList[i].endTime = new Date(chooseItem.endTime).getTime();
    },
    // cTime(i, index) {
    //   if (i) {
    //     this.formAll.gearList[index].showTimeStart = i[0];
    //     this.formAll.gearList[index].showTimeEnd = i[1];
    //   } else {
    //     this.formAll.gearList[index].showTimeStart = "";
    //     this.formAll.gearList[index].showTimeEnd = "";
    //   }
    // },
    //增加子节点
    addItem() {
      this.formAll.gearList.push({
        gearCode: "",
        isAddGive: "0",
        retCouponTitle: "",
        couponActs: "",
        actTimePeriod: [],
        id: null, //每个档位的id
        settingId: this.editType == "edit" ? this.formAll.id : null //该优惠配置总的id
      });
    },
    // 删除新增的子节点
    reduceItem(idx) {
      if (this.editType == "edit" && this.formAll.gearList[idx].id) {
        this.deletedGearRequest(idx);
      } else {
        this.deleteGear(idx);
      }
    },
    // 向后端发请求删除档位
    deletedGearRequest(i) {
      this.$confirm("该操作不可撤销，确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          rechargeDiscountSettingsGearDelete(this.formAll.gearList[i].id)
            .then(res => {
              this.$message.success("删除成功");
              this.deleteGear(i);
            })
            .catch(err => {
              this.$message.warning(
                "操作失败，原因：" + err.errorInfo || err.text
              );
            });
        })
        .catch(() => {
          this.$message.warning("已取消");
        });
    },
    deleteGear(i) {
      this.gearCodeList.map(item => {
        if (item.code == this.formAll.gearList[i].gearCode) {
          item.disabled = false;
        }
      });
      this.formAll.gearList.splice(i, 1);
    },
    operatedata() {
      this.$refs["formAll"].validate(valid => {
        if (valid) {
          if (this.editType == "add") {
            rechargeDiscountSettingsAdd(this.formAll)
              .then(res => {
                this.$message.success("新增成功");
                this.$emit("update:rechargedialogFormVisible", false);
              })
              .catch(err => {
                this.$message.error(err.errorInfo || err.text);
                this.$emit("update:rechargedialogFormVisible", false);
              });
            this.$refs.endArea.clearData();
          } else {
            rechargeDiscountSettingsUpdate(this.formAll)
              .then(res => {
                this.$message.success("修改成功");
                this.$emit("update:rechargedialogFormVisible", false);
              })
              .catch(err => {
                this.$message.error(err.errorInfo || err.text);
                this.$emit("update:rechargedialogFormVisible", false);
              });
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>