<template>
  <div class="CashSet">
    <el-form :model="formAll" ref="formAll" :rules="rulesForm">
      <h2>提现参数设置</h2>
      <el-form-item label="提现最小金额：" prop="extractMin" :label-width="formLabelWidth">
        <el-input
          clearable
          v-model="formAll.extractMin"
          maxlength="5"
          placeholder="请输入0-99999整数"
          v-numberOnly
        ></el-input>元
      </el-form-item>
      <el-form-item label="提现最大金额：" prop="extractMax" :label-width="formLabelWidth">
        <el-input
          clearable
          v-model="formAll.extractMax"
          maxlength="5"
          placeholder="请输入0-99999整数"
          v-numberOnly
        ></el-input>元
      </el-form-item>

      <h2>提现周期设置</h2>
      <el-form-item label prop="periodSetting" :label-width="formLabelWidth">
        <el-radio-group
          v-model="formAll.periodSetting"
          v-for="item of CashTypeList"
          :key="item.code"
          size="medium"
          @change="periodSettingRadio"
        >
          <el-radio-button :label="item.code">{{item.name}}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <!-- 固定次数 -->
      <el-form-item
        label="每月："
        prop="monthNum"
        :label-width="formLabelWidth"
        v-show="formAll.periodSetting=='0'"
      >
        <el-input
          clearable
          v-model="formAll.monthNum"
          maxlength="3"
          placeholder="请输入0-999整数"
          v-numberOnly
        ></el-input>次
      </el-form-item>
      <!-- 固定时间 -->
      <el-form-item
        label
        prop="weekList"
        :label-width="formLabelWidth"
        v-show="formAll.periodSetting=='1'"
      >
        <el-checkbox-group v-model="formAll.weekList">
          <el-checkbox
            v-for="item in DayType"
            :label="item.code"
            :key="item.code"
            border
            size="medium"
          >{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item
        label="每天："
        prop="dayNum"
        :label-width="formLabelWidth"
        v-show="formAll.periodSetting=='1'"
      >
        <el-input
          clearable
          v-model="formAll.dayNum"
          maxlength="3"
          placeholder="请输入0-999整数"
          v-numberOnly
        ></el-input>次
      </el-form-item>

      <h2>提现手续费设置</h2>
      <el-form-item label prop="extractLhandlingFee" :label-width="formLabelWidth">
        <el-radio-group
          v-model="formAll.extractLhandlingFee"
          v-for="item of handlingCostList"
          :key="item.code"
          size="medium"
          @change="extractLhandlingFeeRadio"
        >
          <el-radio-button :label="item.code">{{item.name}}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <!-- 固定金额 -->
      <el-form-item
        label="每笔手续费："
        prop="eachFee"
        :label-width="formLabelWidth"
        v-show="formAll.extractLhandlingFee=='0'"
      >
        <el-input
          clearable
          v-model="formAll.eachFee"
          maxlength="5"
          placeholder="请输入0-99999整数"
          v-numberOnly
        ></el-input>元
      </el-form-item>
      <el-form-item
        label="每月免费次数："
        prop
        :label-width="formLabelWidth"
        v-show="formAll.extractLhandlingFee=='0'"
      >
        <el-input
          clearable
          v-model="formAll.freeNumberTime"
          maxlength="4"
          placeholder="请输入0-999整数"
          v-numberOnly
        ></el-input>次
      </el-form-item>
      <!-- 按比例 -->
      <el-form-item
        label="最低手续费："
        prop
        :label-width="formLabelWidth"
        v-show="formAll.extractLhandlingFee=='1'"
      >
        <el-input
          clearable
          v-model="formAll.lowEachFee"
          maxlength="5"
          placeholder="请输入0-99999整数"
          v-numberOnly
        ></el-input>元/笔
      </el-form-item>
      <el-form-item
        label="手续费比例："
        prop="proportionOfFees"
        :label-width="formLabelWidth"
        v-show="formAll.extractLhandlingFee=='1'"
      >
        <el-input
          clearable
          v-model="formAll.proportionOfFees"
          maxlength="4"
          placeholder="请输入0.1-99.9整数"
        ></el-input>%
      </el-form-item>
      <el-form-item
        label="每月免费金额："
        prop
        :label-width="formLabelWidth"
        v-show="formAll.extractLhandlingFee=='1'"
      >
        <el-input
          clearable
          v-model="formAll.freeMonthlyAmount"
          maxlength="5"
          placeholder="请输入0-99999整数"
          v-numberOnly
        ></el-input>元
      </el-form-item>

      <h2>提现规则</h2>
      <el-form-item label prop :label-width="formLabelWidth">
        <el-input clearable v-model="formAll.extractRules" type="textarea" :rows="10"></el-input>
      </el-form-item>

      <div class="save">
        <el-button @click="save()" type="primary">确认保存</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import {
  aflcExtractSetting,
  data_aflcExtractSettingList
} from "@/api/finance/CarCash.js";
export default {
  data() {
    const extractMinValidator = (rule, val, cb) => {
      if (!val) {
        cb(new Error("请填写提现最小金额"));
      } else if (val > parseInt(this.formAll.extractMax)) {
        cb(new Error("提现最小金额不能大于提现最大金额"));
      } else {
        cb();
      }
    };
    const extractMaxValidator = (rule, val, cb) => {
      if (!val) {
        cb(new Error("请填写提现最小金额"));
      } else if (val < parseInt(this.formAll.extractMin)) {
        cb(new Error("提现最大金额不能小于提现最小金额"));
      } else {
        cb();
      }
    };
    const monthNumValidator = (rule, val, cb) => {
      if (!val && this.formAll.periodSetting == "0") {
        cb(new Error("请填写每月次数"));
      } else {
        cb();
      }
    };

    const dayNumValidator = (rule, val, cb) => {
      if (!val && this.formAll.periodSetting == "1") {
        cb(new Error("请填写每天次数"));
      } else {
        cb();
      }
    };

    const weekListValidator = (rule, val, cb) => {
      if (val.length == 0 && this.formAll.periodSetting == "1") {
        cb(new Error("请至少选中一个"));
      } else {
        cb();
      }
    };

    const eachFeeValidator = (rule, val, cb) => {
      if (!val && this.formAll.extractLhandlingFee == "0") {
        cb(new Error("请填写每天次数"));
      } else {
        cb();
      }
    };

    const proportionOfFeesValidator = (rule, val, cb) => {
      var reg = /^[0-9]+(.[0-9]{1})?$/;
      if (!val && this.formAll.extractLhandlingFee == "1") {
        cb(new Error("请填写手续费比例"));
      } else if (
        val > parseFloat(99.9) &&
        this.formAll.extractLhandlingFee == "1"
      ) {
        cb(new Error("手续费比例不能大于99.9"));
      } else if (!reg.test(val) && this.formAll.extractLhandlingFee == "1") {
        cb(new Error("手续费比例最多保留一位小数"));
      } else {
        cb();
      }
    };
    return {
      formLabelWidth: "120px",
      formAll: {
        extractMin: 0,
        extractMax: 0,
        periodSetting: "0",
        monthNum: 0,
        week: "",
        weekList: [],
        dayNum: 0,
        extractLhandlingFee: "0",
        eachFee: 0,
        freeNumberTime: 0,
        lowEachFee: 0,
        proportionOfFees: 0,
        freeMonthlyAmount: 0,
        extractRules: ""
      },
      rulesForm: {
        extractMin: {
          required: true,
          validator: extractMinValidator,
          trigger: "change"
        },
        extractMax: {
          required: true,
          validator: extractMaxValidator,
          trigger: "change"
        },
        monthNum: {
          required: true,
          validator: monthNumValidator,
          trigger: "change"
        },
        weekList: {
          required: true,
          validator: weekListValidator,
          trigger: "change"
        },
        dayNum: {
          required: true,
          validator: dayNumValidator,
          trigger: "change"
        },
        eachFee: {
          required: true,
          validator: eachFeeValidator,
          trigger: "change"
        },
        proportionOfFees: {
          required: true,
          validator: proportionOfFeesValidator,
          trigger: "change"
        }
      },
      CashTypeList: [
        { code: "0", name: "固定次数" },
        { code: "1", name: "固定时间" }
      ], //提现周期设置类型
      handlingCostList: [
        { code: "0", name: "固定金额" },
        { code: "1", name: "按比例" }
      ], //提现手续费设置类型
      DayType: [
        { code: "1", name: "周一" },
        { code: "2", name: "周二" },
        { code: "3", name: "周三" },
        { code: "4", name: "周四" },
        { code: "5", name: "周五" },
        { code: "6", name: "周六" },
        { code: "0", name: "周日" }
      ]
    };
  },
  methods: {
    firstblood() {
      data_aflcExtractSettingList(1, 10, {}).then(res => {
        if (res.data.list.length > 0) {
          this.formAll = res.data.list[0];
          this.formAll.extractMin = this.formAll.extractMin + "";
          this.formAll.extractMax = this.formAll.extractMax + "";
          this.formAll.eachFee = this.formAll.eachFee + "";
          if (this.formAll.week) {
            this.formAll.weekList = JSON.parse(this.formAll.week);
          } else {
            this.formAll.weekList = [];
          }
        }
      });
    },
    periodSettingRadio(i) {
      if (i == 1) {
        this.formAll.monthNum = 0;
      } else {
        this.formAll.weekList = [];
        this.formAll.week = "";
        this.formAll.dayNum = 0;
      }
    },
    extractLhandlingFeeRadio(i) {
      if (i == 1) {
        this.formAll.eachFee = 0;
        this.formAll.freeNumberTime = 0;
      } else {
        this.formAll.lowEachFee = 0;
        this.formAll.proportionOfFees = 0;
        this.formAll.freeMonthlyAmount = 0;
      }
    },
    save() {
      this.$refs["formAll"].validate(valid => {
        if (valid) {
          this.$message.info("正在保存中...");
          this.formAll.weekList.sort();
          aflcExtractSetting(this.formAll)
            .then(res => {
              this.$message.success("保存成功");
              this.firstblood();
            })
            .catch(err => {
              this.$message.error(err.errorInfo);
            });
        } else {
          this.$message.error("请填写完整的内容");
        }
      });
    }
  },
  mounted() {
    this.firstblood();
  }
};
</script>

<style type="text/css" lang="scss">
.CashSet {
  background: #ffffff;
  padding: 0px 20px 50px 20px;
  h2 {
    border-bottom: solid 2px #e0e0e0;
    line-height: 25px;
    font-size: 18px;
    padding: 36px 0 18px 0;
    color: #333333;
    font-weight: bold;
    margin-bottom: 10px;
    font-stretch: normal;
  }
  .el-input {
    width: 200px;
    margin-right: 10px;
  }
  .el-radio-group {
    margin-right: 20px;
  }
  .save {
    width: 100%;
    background: #fff;
    text-align: center;
    padding: 10px 0px;
    position: absolute;
    bottom: 0px;
    left: 0px;
  }
  .el-checkbox.is-bordered.el-checkbox--medium {
    padding: 9px 20px 9px 10px;
  }
}
</style>
