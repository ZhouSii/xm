<template>
  <div class="commoncss deliverySubsidyAdd">
    <el-dialog
      :title="typetitle"
      :visible.sync="subsidyDialogFormVisible"
      :modal-append-to-body="false"
      :before-close="close"
      top="5vh"
      :close-on-click-modal="false"
      ref="dialog"
      width="60%"
    >
      <el-form :model="formAll" ref="formAll" :rules="rulesForm" label-width="200px">
        <el-row :gutter="20">
          <el-col :span="editType=='add'?15:21">
            <el-form-item label="活动区域：" prop="cityCode" v-if="editType=='add'">
              <getCityList
                class="chooseItem"
                @returnStr="getStrEnd"
                v-model="formAll.cityCode"
                ref="endArea"
              ></getCityList>
            </el-form-item>
            <el-form-item v-else label="活动区域：">
              <el-input v-model="formAll.areaText" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="showStatus">
            <el-form-item prop="areaCodeList" label-width="0px">
              <el-select
                v-model="formAll.areaCodeList"
                multiple
                collapse-tags
                :loading="loadingArea"
                clearable
                placeholder="请选择活动区域"
                @visible-change="getSelectedAreaName"
                :disabled="disableStatus"
              >
                <el-option
                  v-for="item in optionsAreaArr"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21">
            <el-form-item label="服务分类：" prop="serviceClassify" v-if="editType=='add'">
              <el-select
                v-model="formAll.serviceClassify"
                clearable
                placeholder="请选择"
                @change="getServiceClassifyName"
                disabled
              >
                <el-option
                  v-for="item in orderTypeList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-else label="服务分类">
              <el-input v-model="formAll.serviceClassifyName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21">
            <el-form-item label="每单基础津贴：" prop="orderBaseSubsidy">
              <el-input v-model.number="formAll.orderBaseSubsidy" placeholder="元" v-numberOnly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21">
            <el-form-item label="单量梯度津贴：">
              <el-table :data="formAll.subsidyGradients" size="small" border>
                <el-table-column label="第N单">
                  <template slot-scope="scope">
                    <el-form :model="scope.row">
                      <el-form-item prop="orderSeq">
                        <el-input v-model.number="scope.row.orderSeq" placeholder="单" v-numberOnly />
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column label="梯度津贴">
                  <template slot-scope="scope">
                    <el-form :model="scope.row">
                      <el-form-item prop="gradientSubsidy">
                        <el-input
                          v-model.number="scope.row.gradientSubsidy"
                          placeholder="元"
                          v-numberOnly
                        />
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column label="订单总津贴">
                  <template slot-scope="scope">
                    <el-form :model="scope.row">
                      <el-form-item prop="orderTotalSubsidy">
                        <el-input v-model.number="scope.row.orderTotalSubsidy" disabled />
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button size="small" type="primary" icon="el-icon-plus" @click="addData"></el-button>
                    <el-button
                      size="small"
                      type="danger"
                      icon="el-icon-minus"
                      @click="reduceItem(scope.$index)"
                    ></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21">
            <el-form-item label="订单最低支付金额：" prop="orderMinPayAmount">
              <el-input v-model.number="formAll.orderMinPayAmount" placeholder="元" v-numberOnly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21">
            <el-form-item label="同一用户单月津贴最大单量：" prop="userMonthOrdersLimit">
              <el-input v-model.number="formAll.userMonthOrdersLimit" placeholder="单" v-numberOnly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21">
            <el-form-item label="活动时间：" prop="showTime">
              <el-date-picker
                v-model="showTime"
                type="monthrange"
                unlink-panels
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="timestamp"
                @change="checkShowTime"
              ></el-date-picker>
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
  subsidyActivitySettingsAdd,
  subsidyActivitySettingsUpdate,
  subsidyActivitySettingsDetail,
  subsidyActivitySettingsGradientDelete
} from "@/api/marketing/shippermarkting/deliverySubsidy.js";
import { getCityInfo } from "@/api/common";
export default {
  components: { getCityList },
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
    subsidyDialogFormVisible: {
      type: Boolean,
      default: false
    },
    orderTypeList: {
      type: Array
    }
  },
  data() {
    var checkOrderBaseSubsidy = (rule, value, callback) => {
      if (value == 0) {
        callback(new Error("请输入正整数"));
      } else {
        callback();
      }
    };
    var checkOrderMinPayAmount = (rule, value, callback) => {
      if (value == 0) {
        callback(new Error("请输入正整数"));
      } else {
        callback();
      }
    };
    var checkUserMonthOrdersLimit = (rule, value, callback) => {
      let compareData = this.formAll.subsidyGradients;
      if (value == 0) {
        callback(new Error("请输入正整数"));
      } else if (
        compareData.length >= 1 &&
        value < compareData[compareData.length - 1].orderSeq
      ) {
        callback(
          new Error("同一用户单月津贴最大单量不能小于单量梯度津贴的最大单量")
        );
      } else {
        callback();
      }
    };
    var checkSubsidyGradients = (rule, value, callback) => {
      value.map(item => {
        if (
          (!item.orderSeq && item.gradientSubsidy) ||
          (!item.gradientSubsidy && item.orderSeq)
        ) {
          callback(new Error("第N单或梯度津贴不能为空"));
        }
      });
      callback();
    };
    return {
      btnsize: "mini",
      showTime: [],
      formAll: {
        showTime: "",
        orderBaseSubsidy: "",
        serviceClassify: "",
        orderMinPayAmount: "",
        userMonthOrdersLimit: "",
        areaTextList: [],
        areaCodeList: [],
        actStartMonth: null,
        actEndMonth: null,
        cityCode: null,
        subsidyGradients: [
          {
            orderSeq: null,
            gradientSubsidy: null,
            orderTotalSubsidy: null
          }
        ]
      },
      rulesForm: {
        cityCode: {
          required: true,
          message: "请选择活动城市",
          trigger: "blur"
        },
        areaCodeList: {
          required: true,
          message: "请选择活动区域",
          trigger: "blur"
        },
        serviceClassify: {
          required: true,
          message: "请选择服务分类",
          trigger: "blur"
        },
        orderBaseSubsidy: {
          required: true,
          validator: checkOrderBaseSubsidy,
          trigger: "blur"
        },
        orderMinPayAmount: {
          required: true,
          validator: checkOrderMinPayAmount,
          trigger: "blur"
        },
        userMonthOrdersLimit: {
          required: true,
          validator: checkUserMonthOrdersLimit,
          trigger: "blur"
        },
        subsidyGradients: {
          //   required: true,
          validator: checkSubsidyGradients,
          trigger: "blur"
        },
        showTime: { required: true, message: "请选择活动时间", trigger: "blur" }
      },
      loadingArea: false,
      optionsAreaArr: [],
      chooseCity: null,
      showStatus: true,
      disableStatus: true
    };
  },
  watch: {
    subsidyDialogFormVisible: {
      handler: function(val, oldVal) {
        if (!val) {
          this.$refs["formAll"].resetFields();
          this.$emit("getData");
          this.formAll = {
            showTime: "",
            orderBaseSubsidy: "",
            serviceClassify: "",
            orderMinPayAmount: "",
            userMonthOrdersLimit: "",
            areaTextList: [],
            areaCodeList: [],
            actStartMonth: null,
            actEndMonth: null,
            cityCode: null,
            subsidyGradients: [
              {
                orderSeq: null,
                gradientSubsidy: null,
                orderTotalSubsidy: null
              }
            ]
          };
        } else {
          if (this.editType != "add") {
            this.showStatus = false;
            this.openDialog();
          } else {
            this.showTime = [];
            this.showStatus = true;
            //当前版本 服务分类暂只能选择小货车 将其写死
            this.formAll.serviceClassify = "AF01701";
            this.formAll.serviceClassifyName = "小货车";
          }
        }
      }
    },
    "formAll.cityCode": {
      deep: true,
      handler: function(newV, oldV) {
        // console.log("cityCode", newV);
        if (newV) {
          this.formAll.areaCodeList = [];
          this.loadingArea = true;
          this.optionsAreaArr = [];
          getCityInfo(newV)
            .then(res => {
              if (!res.data) {
                this.$message.info("该城市暂不需要选择区域噢");
                this.showStatus = false;
                this.formAll.areaCodeList = [newV];
                this.formAll.areaTextList = [this.chooseCity];
              } else {
                this.showStatus = true;
                this.loadingArea = false;
                this.optionsAreaArr = res.data;
              }
            })
            .catch(err => {
              this.formAll.areaCodeList = [];
              this.$message.error(err.errorInfo || err.text);
            });
        }
      }
    },
    "formAll.subsidyGradients": {
      deep: true,
      handler: function(newV, oldV) {
        // console.log("subsidyGradients", newV);
        if (newV) {
          newV.map((item, index) => {
            if (item.gradientSubsidy && this.formAll.orderBaseSubsidy) {
              item.orderTotalSubsidy =
                +item.gradientSubsidy + +this.formAll.orderBaseSubsidy;
            } else {
              item.orderTotalSubsidy = null;
            }
          });
        }
      }
    },
    "formAll.orderBaseSubsidy": {
      deep: true,
      handler: function(newV, oldV) {
        // console.log("orderBaseSubsidy", newV);
        this.formAll.subsidyGradients.map(item => {
          if (item.gradientSubsidy && newV) {
            item.orderTotalSubsidy = +item.gradientSubsidy + +newV;
          } else {
            item.orderTotalSubsidy = null;
          }
        });
      }
    }
  },
  methods: {
    openDialog: function() {
      subsidyActivitySettingsDetail(this.params.id).then(res => {
        this.formAll = res.data;
        this.showTime = [
          new Date(
            res.data.actStartMonth.toString().slice(0, 4) +
              "-" +
              res.data.actStartMonth.toString().slice(4) +
              "-01 00:00:00"
          ).getTime(),
          new Date(
            res.data.actEndMonth.toString().slice(0, 4) +
              "-" +
              res.data.actEndMonth.toString().slice(4) +
              "-01 00:00:00"
          ).getTime()
        ];
        this.formAll.showTime = this.showTime;
        if (this.formAll.subsidyGradients.length == 0) {
          this.formAll.subsidyGradients = [
            {
              orderSeq: null,
              gradientSubsidy: null,
              orderTotalSubsidy: null
            }
          ];
        }
      });
    },
    close: function() {
      if (this.editType == "add") {
        this.$refs.endArea.clearData();
      }
      this.$emit("update:subsidyDialogFormVisible", false);
    },
    checkShowTime(val) {
      this.formAll.showTime = val ? val : "";
      this.formAll.actStartMonth = val ? +parseTime(val[0], "{y}{m}") : "";
      this.formAll.actEndMonth = val ? +parseTime(val[1], "{y}{m}") : "";
    },
    getStrEnd(d) {
      this.chooseCity = d.city.name;
      this.formAll.cityCode = d.city ? d.city.code : "";
      this.disableStatus = this.formAll.cityCode ? false : true;
    },
    getActAreaList() {
      // this.optionsAreaArr = [];
      // if (!this.formAll.cityCode) {
      //   return this.$message({
      //     type: "warning",
      //     message: "请先选择活动城市"
      //   });
      // } else {
      //   this.loadingArea = true;
      //   getCityInfo(this.formAll.cityCode)
      //     .then(res => {
      //       setTimeout(() => {
      //         this.loadingArea = false;
      //         this.optionsAreaArr = res.data;
      //       }, 200);
      //     })
      //     .catch(err => {
      //       this.formAll.areaCodeList = [];
      //     });
      // }
    },
    getServiceClassifyName(val) {
      let obj = {};
      obj = this.orderTypeList.find(item => {
        return item.code == val;
      });
      this.formAll.serviceClassifyName = obj.name;
    },
    getSelectedAreaName(val) {
      if (!val) {
        let objArr = [];
        this.formAll.areaCodeList.map((areaCode, index) => {
          objArr[index] = this.optionsAreaArr.find(item => {
            return item.code == areaCode;
          });
        });
        this.formAll.areaTextList = [];
        objArr.map(obj => {
          this.formAll.areaTextList.push(this.chooseCity + obj.name);
        });
      }
    },
    // 新增梯度津贴子节点
    addData() {
      this.formAll.subsidyGradients.push({
        orderSeq: null,
        gradientSubsidy: null,
        orderTotalSubsidy: null
      });
    },
    //删除梯度津贴
    reduceItem(idx) {
      if (this.editType == "edit" && this.formAll.subsidyGradients[idx].id) {
        this.deletedGradientRequest(idx);
      } else {
        this.deleteData(idx);
      }
    },
    // 页面删除梯度津贴子节点
    deleteData(index) {
      if (this.formAll.subsidyGradients.length == 1) {
        this.formAll.subsidyGradients = [
          {
            orderSeq: null,
            gradientSubsidy: null,
            orderTotalSubsidy: null
          }
        ];
      } else {
        this.formAll.subsidyGradients.splice(index, 1);
      }
    },
    // 向后端发请求删除梯度津贴
    deletedGradientRequest(i) {
      this.$confirm("该操作不可撤销，确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          subsidyActivitySettingsGradientDelete(
            this.formAll.subsidyGradients[i].id
          )
            .then(res => {
              this.$message.success(res.text);
              this.deleteData(i);
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
    //新增/修改
    operatedata() {
      console.log(this.formAll);
      this.$refs["formAll"].validate(valid => {
        if (valid) {
          if (this.editType == "add") {
            subsidyActivitySettingsAdd(this.formAll)
              .then(res => {
                this.$message.success("新增成功");
                this.$emit("update:subsidyDialogFormVisible", false);
              })
              .catch(err => {
                this.$message.error(err.errorInfo || err.text);
                this.$emit("update:subsidyDialogFormVisible", false);
              });
            this.$refs.endArea.clearData();
          } else {
            subsidyActivitySettingsUpdate(this.formAll)
              .then(res => {
                this.$message.success("修改成功");
                this.$emit("update:subsidyDialogFormVisible", false);
              })
              .catch(err => {
                this.$message.error(err.errorInfo || err.text);
                this.$emit("update:subsidyDialogFormVisible", false);
              });
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.deliverySubsidyAdd /deep/ {
  .el-table__header {
    line-height: 0;
  }
}
</style>