<template>
  <div class="couponGive commoncss">
    <el-button
      :type="btntype"
      :value="value"
      :plain="plain"
      :icon="icon"
      @click="openDialog()"
      :disabled="buttonStatus"
    >{{btntext}}</el-button>
    <div class="couponGive">
      <el-dialog
        :visible="dialogFormVisible_add"
        :before-close="change"
        :title="btntitle"
        :closeOnClickModal="false"
      >
        <div class="couponBuild" v-if="editType=='Build'">
          <el-form :inline="true" :model="formAllOne" ref="formAllOne" :rules="rulesFormOne">
            <el-form-item label="生成张数：" :label-width="formLabelWidth" prop="num">
              <el-input v-model="formAllOne.num"></el-input>
            </el-form-item>
            <el-form-item label="优惠券领取人：" :label-width="formLabelWidth" prop="belongSalesmanName">
              <el-select
                v-model="formAllOne.belongSalesmanName"
                clearable
                placeholder="请选择人员"
                @change="UserTypeChange"
                filterable
              >
                <el-option
                  v-for="item in UserTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth">
              <el-button
                type="primary"
                plain
                icon="el-icon-circle-plus-outline"
                @click="produceCoupon"
              >生成</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div :class="editType=='Build'?'tableDataAllBox2':'tableDataAllBox1'">
          <el-table style="width: 100%" stripe border height="77%" :data="tableDataAll">
            <el-table-column label="优惠券名称" prop="couponName" show-overflow-tooltip></el-table-column>
            <el-table-column label="派发数量" prop="couponNum" width="80" show-overflow-tooltip></el-table-column>
            <el-table-column label="优惠券类型" prop="couponType" show-overflow-tooltip></el-table-column>
            <el-table-column
              label="满减/折扣"
              prop="remissionDiscount"
              width="90"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="满减条件/最高抵扣"
              prop="conditionDeduction"
              width="150"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column label="时效类型" prop="timeType" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column label="开始时间" prop="startTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="过期时间" prop="endTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="适用服务类型" prop="serivceCode" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column label="适用车辆类型" prop="carType" show-overflow-tooltip></el-table-column>
            <el-table-column label="发放区域" prop="areaName" show-overflow-tooltip></el-table-column>
            <el-table-column label="能否与大户券叠加" prop="ifvouchersuperposition">
              <template slot-scope="scope">{{ scope.row.ifvouchersuperposition == 1 ? '能' : '不能' }}</template>
            </el-table-column>
          </el-table>
        </div>
        <div class="couponGive_fun" v-if="editType=='Give'">
          <el-form :inline="true" :model="formAllTwo" ref="formAllTwo" :rules="rulesFormTwo">
            <el-form-item label="优惠券领取人：" :label-width="formLabelWidth" prop="belongSalesmanName">
              <el-select
                v-model="formAllTwo.belongSalesmanName"
                clearable
                placeholder="请选择人员"
                @change="UserTypeChange"
                filterable
              >
                <el-option
                  v-for="item in UserTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-tabs v-model="shipperName" type="border-card">
            <!-- 填写手机号 -->
            <el-tab-pane label="填写手机号" name="first">
              <div class="couponGive_piece">
                <h3 class="couponGive_piece_H3">请填写用户手机号</h3>
                <p class="couponGive_piece_P">一行一个手机号，优惠券将会发放到选中手机号</p>
                <el-input
                  type="textarea"
                  ref="infofocus"
                  clearable
                  v-model="mobile"
                  :autosize="{ minRows: 2}"
                ></el-input>
                <el-button type="primary" @click="grantCoupon">确认发放</el-button>
              </div>
            </el-tab-pane>

            <!-- 模板批量发放 -->
            <el-tab-pane label="模板批量发放" name="second">
              <div class="couponGive_piece">
                <h3 class="couponGive_piece_H3">请上传模板批量发放</h3>
                <p class="couponGive_piece_P">格式：txt文档，一行一个手机号</p>
                <input type="file" ref="inputer" id="inputer" />
                <el-button type="primary" @click="BatchDistribution">确认发放</el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import XLSX from "xlsx";
import Cookies from "js-cookie";
const TokenKey = "TMS-Token";
import {
  data_Commission,
  data_CarList,
  data_MaidLevel,
  data_ServerClassList
} from "@/api/server/areaPrice.js";
import {
  data_get_couponActive3_Id,
  data_get_produceCoupon,
  data_get_BatchDistribution,
  data_get_grantCoupon,
  data_get_produceCouponExcel
} from "@/api/marketing/shippermarkting/couponActive.js";
import Upload from "@/components/Upload/singleImage";
import vregion from "@/components/vregion/Region";
import { eventBus } from "@/eventBus";
import { getAllUser } from "@/api/company/employeeManage";
import { exportWithIframe } from "@/utils/";

export default {
  components: {
    Upload,
    vregion
  },
  props: {
    paramsView: {
      type: Object
    },
    params: {
      type: [Object, String, Array]
    },
    value: {
      type: String,
      default: ""
    },
    btntype: {
      type: String,
      default: ""
    },
    btntext: {
      type: String,
      default: ""
    },
    btntitle: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    plain: {
      type: Boolean,
      default: false
    },
    buttonStatus: {
      type: Boolean,
      default: false
    },
    /*add新增，edit编辑，view查看*/
    editType: {
      type: String
    }
  },
  data() {
    // 车长宽高校验
    const NumValidator = (rule, val, cb) => {
      var reg = /^[1-9]\d*$/;
      if (!reg.test(val)) {
        cb(new Error("仅能输入大于0的正整数"));
      } else {
        cb();
      }
    };
    return {
      btnStatus: false,
      mobile: null,
      formLabelWidth: "120px",
      shipperName: "first",
      tableDataAll: [],
      dialogFormVisible_add: false,
      MaidLevelValueCar: "",
      optionsCar: [],
      MaidLevel: [],
      href: "",
      formAllOne: {
        num: null,
        belongSalesmanName: null,
        belongSalesman: null,
        id: null
      },
      formAllTwo: {
        belongSalesmanName: null,
        belongSalesman: null,
        id: null,
        mobiles: []
      },
      rulesFormOne: {
        num: { validator: NumValidator, trigger: "change", required: true },
        belongSalesmanName: {
          required: true,
          message: "请选择优惠券领取人",
          trigger: "change"
        }
      },
      rulesFormTwo: {
        belongSalesmanName: {
          required: true,
          message: "请选择优惠券领取人",
          trigger: "change"
        }
      },
      UserTypeList: []
    };
  },
  watch: {
    dialogFormVisible_add: {
      handler: function(val, oldVal) {
        if (!val) {
          if (this.editType == "Build") {
            this.formAllOne = {
              num: null,
              belongSalesmanName: null,
              belongSalesman: null,
              id: null
            };
            this.$refs["formAllOne"].resetFields();
          }
          if (this.editType == "Give") {
            this.formAllTwo = {
              belongSalesmanName: null,
              belongSalesman: null,
              id: null,
              mobiles: []
            };
            this.mobile = null;
            this.$refs["formAllTwo"].resetFields();
            var inputer = document.getElementById("inputer");
            inputer.value = "";
          }
          this.$emit("getData");
        } else {
          this.getMoreInformation();
          this.btnStatus = true;
          this.shipperName = "first";
        }
      }
    }
  },
  components: {
    vregion
  },
  mounted() {},
  methods: {
    openDialog: function() {
      if (this.params.length == 0 && this.editType !== "add") {
        this.$message.warning("请选择您要操作的数据");
        return;
      } else if (this.params.length > 1 && this.editType !== "add") {
        this.$message({
          message: "每次只能操作单条数据~",
          type: "warning"
        });
        this.$emit("getData");
      } else if (this.params.length == undefined && this.editType !== "add") {
        this.$message.warning("请选择您要操作的数据");
        return false;
      } else {
        data_get_couponActive3_Id(this.params[0].id).then(res => {
          this.tableDataAll = res.data;
        });
        this.dialogFormVisible_add = true;
      }
    },
    UserTypeChange(value) {
      let item = this.UserTypeList.filter(el => {
        return el.id == value;
      })[0];
      if (this.editType == "Build") {
        this.formAllOne.belongSalesmanName = item.name;
        this.formAllOne.belongSalesman = item.id;
      } else {
        this.formAllTwo.belongSalesmanName = item.name;
        this.formAllTwo.belongSalesman = item.id;
      }
      console.log("formAllOne", this.formAllOne);
      console.log("formAllTwo", this.formAllTwo);
    },
    change: function() {
      this.dialogFormVisible_add = false;
    },
    close: function() {
      this.dialogFormVisible_add = false;
    },
    //获取  服务和车辆 类型列表
    getMoreInformation() {
      data_CarList().then(res => {
        this.optionsCar = res.data;
      });
      data_MaidLevel().then(res => {
        this.MaidLevel = res.data;
      });
      getAllUser(1, "", "", 0, 0).then(res => {
        this.UserTypeList = res.list;
      });
    },
    changeList() {
      eventBus.$emit("pushListtwo");
    },
    produceCoupon() {
      this.$refs["formAllOne"].validate(valid => {
        if (valid) {
          this.formAllOne.id = this.params[0].id;
          if (this.btnStatus) {
            this.btnStatus = false;
            this.$message.info("正在生成中...");
            data_get_produceCouponExcel(this.formAllOne).then(res => {
              var blob = new Blob([res]);
              this.href = window.URL.createObjectURL(blob);
              var NewDom = document.createElement("a");
              NewDom.setAttribute("href", this.href);
              NewDom.setAttribute("target", "_blank");
              NewDom.setAttribute("download", "优惠券.xls");
              document.body.appendChild(NewDom);
              NewDom.click();
              document.body.removeChild(NewDom);
              this.$message.success("生成成功");
              this.dialogFormVisible_add = false;
            });
          }
        }
      });
    },

    BatchDistribution() {
      this.$refs["formAllTwo"].validate(valid => {
        if (valid) {
          let inputFile = this.$refs.inputer;
          if (inputFile.files.length > 0) {
            var formdata = new FormData();
            formdata.append("id", this.params[0].id);
            formdata.append("belongSalesman", this.formAllTwo.belongSalesman);
            formdata.append(
              "belongSalesmanName",
              this.formAllTwo.belongSalesmanName
            );
            formdata.append("multipartFile", inputFile.files[0]);
            if (this.btnStatus) {
              this.btnStatus = false;
              this.$message.info("正在发放中...");
              data_get_BatchDistribution(formdata)
                .then(res => {
                  this.$emit("getData");
                  this.$message.success("发放成功");
                  this.dialogFormVisible_add = false;
                })
                .catch(res => {
                  this.$emit("getData");
                  this.$message.error(res.text);
                  this.dialogFormVisible_add = false;
                });
            }
          }
        }
      });
    },
    grantCoupon() {
      this.$refs["formAllTwo"].validate(valid => {
        if (valid) {
          if (this.mobile) {
            let mobile_Araay = this.mobile.split("\n");
            for (var i = 0; i < mobile_Araay.length; i++) {
              let phoneTest = /(^1[2|3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/;
              if (
                !phoneTest.test(mobile_Araay[i].replace(/(^\s+)|(\s+$)/g, ""))
              ) {
                this.$message.warning("第" + (i + 1) + "行手机号输入有误");
                return;
              }
            }
            this.formAllTwo.id = this.params[0].id;
            this.formAllTwo.mobiles = mobile_Araay;
            if (this.btnStatus) {
              this.btnStatus = false;
              this.$message.info("正在发放中...");
              data_get_grantCoupon(this.formAllTwo)
                .then(res => {
                  this.$emit("getData");
                  this.$message.success("发放成功");
                  this.dialogFormVisible_add = false;
                })
                .catch(res => {
                  this.$emit("getData");
                  this.$message.error(res.text);
                  this.dialogFormVisible_add = false;
                });
            }
          } else {
            this.$message.warning("请填写用户手机号");
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" >
.couponGive {
  display: inline-block;
  .el-button {
    margin-right: 0px;
    padding: 7px 15px 7px;
    font-size: 12px;
  }
  height: 100%;
  .el-dialog {
    height: 100%;
    width: 80% !important;
  }
  .el-button {
    display: inline-block;
  }
  .el-dialog__body {
    padding: 30px 20px !important;
  }
  .swith {
    margin: 0px 0px 10px 10px;
    .el-switch {
      display: inline-block !important;
    }
  }
  .el-dialog__footer {
    padding: 20px 20px 20px;
  }
  .el-dialog {
    overflow: unset;
  }
  .tableDataAllBox1 {
    height: 40%;
  }
  .tableDataAllBox2 {
    height: 90%;
  }
  .el-dialog__body {
    height: 100%;
  }
  .couponGive_piece_H3 {
    margin-bottom: 10px;
  }
  .couponGive_piece {
    padding: 20px;
    .el-textarea__inner {
      min-height: 120px !important;
    }
    .el-button {
      margin-top: 20px;
    }
  }
  .couponBuild {
    .el-input__inner {
      height: 30px !important;
      line-height: 30px !important;
    }
  }
}
</style>