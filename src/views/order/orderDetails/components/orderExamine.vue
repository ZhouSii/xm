<template>
  <div class="identicalStyle clearfix orderEx" v-loading="loading">
    <div class="classify_info">
      <!-- <h2 v-if="exName">审查状态：{{exName}}</h2> -->
      <div class="btns_box">
        <div v-if="exName">
          <span>审查状态：{{exName}}</span>
          <!-- <el-button
            type="primary"
            plain
            icon="el-icon-edit-outline"
            :size="btnsize"
            @click="handleClick('ex')"
            :disabled="exName == '已审查'"
          >审查登记</el-button> -->
          <el-button
            type="primary"
            plain
            icon="el-icon-circle-plus"
            :size="btnsize"
            @click="handleClick('new')"
            :disabled="exName == '已审查'"
          >新增</el-button>
          <el-button
            type="primary"
            plain
            icon="el-icon-edit"
            :size="btnsize"
            @click="handleClick('modify')"
            :disabled="exName == '已审查'"
          >修改</el-button>
          <el-button
            type="primary"
            plain
            icon="el-icon-edit-outline"
            :size="btnsize"
            @click="handleClick('revise')"
            :disabled="auditStatusName =='待复审' || auditStatusName =='已复审'"
          >修改审查状态</el-button>
          <el-button
            type="primary"
            plain
            icon="el-icon-check"
            :size="btnsize"
            @click="handleClick('exGo')"
            :disabled="auditStatusName =='待复审' || auditStatusName =='已复审'"
          >审核通过</el-button>
        </div>
      </div>
      <div class="info_news">
        <el-table
          ref="multipleTable"
          :data="tableData"
          stripe
          border
          align="center"
          height="100%"
          tooltip-effect="dark"
            @row-click="clickDetails"
          style="width: 100%"
        >
        <el-table-column label="选择" width="60" align="center">
            <template slot-scope="scope">
                <el-radio class="radio"  v-model="radio"  :label="scope.row.id">&nbsp;</el-radio>
            </template>
        </el-table-column> 
          <el-table-column label="序号" width="60">
            <template
              slot-scope="scope"
            >{{ (listSystemObj.currentPage - 1)*listSystemObj.pageSize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable prop="userType" label="用户类型"></el-table-column>
          <el-table-column min-width="250" sortable prop="userInfo" label="用户信息"></el-table-column>
          <el-table-column min-width="150" sortable prop="riskControlName" label="违规行为"></el-table-column>
          <el-table-column min-width="150" sortable prop="deductionBehavior" label="扣行为分"></el-table-column>
          <el-table-column min-width="150" sortable prop="deductionReward" label="扣奖励金"></el-table-column>
          <el-table-column min-width="150" sortable prop="deductionReductionAmount" label="扣发货津贴"></el-table-column>
          <el-table-column min-width="150" sortable prop="deductionCouponReward" label="扣优惠金"></el-table-column>
          <el-table-column min-width="150" sortable prop="deductionCoupon" label="扣优惠券"></el-table-column>
          <el-table-column min-width="150" sortable prop="deductionCodeReward" label="扣车主接单码奖励"></el-table-column>
          <el-table-column min-width="150" sortable prop="deductionRecommendShipper" label="扣车主推荐货主发货奖励"></el-table-column>
          <el-table-column min-width="150" sortable prop="deductionRecommendDriver" label="扣车主推荐车主接单奖励"></el-table-column>
          <el-table-column min-width="150" sortable prop="freezeFlag" label="是否冻结账号"></el-table-column>
          <el-table-column min-width="160" sortable prop="freezeStartTime" label="冻结账号开始时间">
            <template slot-scope="scope">{{ scope.row.freezeStartTime | parseTime }}</template>
          </el-table-column>
          <el-table-column min-width="160" sortable prop="freezeEndTime" label="冻结账号结束时间">
            <template slot-scope="scope">{{ scope.row.freezeEndTime | parseTime }}</template>
          </el-table-column>
          <el-table-column
            min-width="150"
            sortable
            prop="auditDesc"
            label="备注"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column min-width="150" sortable prop="creater" label="创建人"></el-table-column>
          <el-table-column min-width="160" sortable prop="createTime" label="创建时间">
            <template slot-scope="scope">{{ scope.row.createTime | parseTime }}</template>
          </el-table-column>
          <el-table-column min-width="150" sortable prop="updater" label="修改人"></el-table-column>
          <el-table-column min-width="160" sortable prop="updateTime" label="最新修改时间">
            <template slot-scope="scope">{{ scope.row.updateTime | parseTime }}</template>
          </el-table-column>
           <el-table-column min-width="150" sortable prop="dealName" label="处罚状态">
            <template slot-scope="scope">{{ scope.row.dealName ? '已处罚' : '未处罚' }}</template>
          </el-table-column>
           <el-table-column min-width="150" sortable prop="dealName" label="处理人"></el-table-column>
          <el-table-column min-width="160" sortable prop="dealTime" label="处理时间">
            <template slot-scope="scope">{{ scope.row.dealTime | parseTime }}</template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 页码 -->
    <div class="info_tab_footer">
      共计:{{ dataTotal }}
      <div class="show_pager">
        <Pager :total="dataTotal" @change="handlePageChange" ref="pager" />
      </div>
    </div>

    <el-dialog
      :title="currentTitle"
      class="exClass"
      top="15vh"
      :modal="false"
      :visible="dialogVisible"
      custom-class="add-review"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      width="30%"
      :before-close="close"
    >
      <div class="ifcancel">
        <el-form
          :model="form"
          :rules="rules"
          ref="ruleForm"
          :label-width="formLabelWidth"
          label-position="right"
        >
          <el-form-item label="审查描述：" prop="auditDesc">
            <el-input
              :autosize="{ minRows: 2, maxRows: 5}"
              type="textarea"
              :maxlength="500"
              placeholder="请详细描述您的备注内容"
              v-model="form.auditDesc"
            ></el-input>
          </el-form-item>
          <el-form-item label="异常订单：" prop="unusualFlagStatus">
            <el-checkbox v-model="form.unusualFlagStatus"></el-checkbox>
          </el-form-item>
          <!-- <div v-if="form.unusualFlagStatus"> -->
          <el-form-item prop="code" label="扣除行为分：">
            <el-select v-model="form.riskControlCodeArr" multiple collapse-tags placeholder="请选择">
              <el-option
                v-for="item in optionsRisk"
                :key="item.id"
                :label="item.ruleDescSetting"
                :value="item.code"
              >
                <span style="float: left">{{ item.ruleDescSetting }}</span>
                <span
                  style="float: right; color: #8492a6; font-size: 13px;margin-right: 20px;"
                >{{ item.subBehaviorScore ? item.subBehaviorScore + '分' : '' }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="扣奖励金：" prop="deductionRewardFlag">
            <!-- <el-checkbox v-model="form.deductionRewardFlag"></el-checkbox> -->
            <el-radio-group v-model="form.deductionRewardFlag" :disabled="!expense.driverReward">
              <el-radio :label="'0'">否</el-radio>
              <el-radio :label="'1'">是</el-radio>
            </el-radio-group>
            <span v-if="form.deductionRewardFlag == '1'">当前订单奖励{{expense.driverReward || 0}}元</span>
          </el-form-item>
          <el-form-item label="扣优惠金：" prop="deductionCouponRewardFlag">
            <el-radio-group v-model="form.deductionCouponRewardFlag" :disabled="!expense.reward">
              <el-radio :label="'0'">否</el-radio>
              <el-radio :label="'1'">是</el-radio>
            </el-radio-group>
            <span v-if="form.deductionCouponRewardFlag == '1'">当前订单优惠{{expense.reward || 0}}元</span>
          </el-form-item>
          <el-form-item label="扣优惠券：" prop="deductionCouponFlag">
            <el-radio-group
              v-model="form.deductionCouponFlag"
              :disabled="!expense.preferentialPrice"
            >
              <el-radio :label="'0'">否</el-radio>
              <el-radio :label="'1'">是</el-radio>
            </el-radio-group>
            <span v-if="form.deductionCouponFlag == '1'">当前订单优惠{{expense.preferentialPrice || 0}}元</span>
          </el-form-item>
          <el-form-item label="是否冻结账号：" prop="freezeFlag">
            <el-radio-group v-model="form.freezeFlag">
              <el-radio :label="'0'">否</el-radio>
              <el-radio :label="'1'">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="冻结结束时间：" prop="freezeEndTime" v-if="form.freezeFlag == '1'">
            <el-date-picker
              v-model="form.freezeEndTime"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              :picker-options="pickerOptions"
              value-format="timestamp"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="短信通知：" prop="sendMessageFlag">
            <el-radio-group v-model="form.sendMessageFlag">
              <el-radio :label="'0'">否</el-radio>
              <el-radio :label="'1'">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- </div> -->
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" plain icon="el-icon-success" @click="submitForm('ruleForm')">保存</el-button>
        <el-button type="primary" plain icon="el-icon-error" @click="close">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="修改审查状态"
      class="exClass"
      top="15vh"
      :modal="false"
      :visible="dialogVisibleRevise"
      custom-class="add-review"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      width="30%"
      :before-close="close"
    >
      <div class="ifcancel">
        <el-form
          :model="form2"
          :rules="rules2"
          ref="ruleForm2"
          :label-width="formLabelWidth"
          label-position="right"
        >
          <el-form-item prop="reviewStatus" label="审查状态：">
            <el-select v-model="form2.reviewStatus" placeholder="请选择">
              <el-option
                v-for="item in optionsEx"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" plain icon="el-icon-success" @click="submitForm2('ruleForm2')">保存</el-button>
        <el-button type="primary" plain icon="el-icon-error" @click="close2">取消</el-button>
      </div>
    </el-dialog>
    <exDialog :dialogFormVisibleEx.sync="dialogFormVisibleEx"  @renovate="firstblood" :currentData="currentData" :type="toBeAuditType" :formtitle="formtitle"/>

  </div>
</template>

<script type="text/javascript">
import { parseTime, objectMerge2 } from "@/utils/index.js";
import { listComplainSetting } from "@/api/service/dispose.js";
import {
  orderDetailsList,
  orderReview,
  orderManagerAuditPass,
  findByOrderSerial,
  orderExamineList,
  reviseOrderExStatus
} from "@/api/order/ordermange";

import Pager from "@/components/Pagination/index";
import exDialog from '../../tongcheng/toExamine/components/exOrderDialog'

export default {
  components: {
    Pager,
    exDialog
  },
  props: {
    isvisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
        formtitle:'',
        toBeAuditType:'exOrder',
        currentData:{},
        dialogFormVisibleEx:false,
        radio:'',
        formLabelWidth: "120px",
        btnsize: "mini",
        loading: false, //加载
        sizes: [20, 50, 100],
        listSystemObj: {
            currentPage: 1,
            pageSize: 20,
            vo: {
            orderSerial: ""
            }
        },
        pickerOptions: {
            disabledDate(time) {
            return time.getTime() < Date.now() - 1 * 24 * 60 * 60 * 1000;
            }
        },
        form: {
            auditDesc: "", //审查描述
            deductionBehavior: 0, //扣除行为分
            deductionBehaviorFlag: "0", //扣除行为分Flag（0 不扣除 1 扣除）
            deductionCoupon: 0, //扣除优惠券
            deductionCouponFlag: "0", //扣除优惠券Flag（0 不扣除 1 扣除）
            deductionCouponReward: 0, //扣除优惠金
            deductionCouponRewardFlag: "0", //扣除优惠金Flag（0 不扣除 1 扣除）
            deductionReward: 0, //扣除奖励金
            deductionRewardFlag: "0", //扣除奖励金Flag（0 不扣除 1 扣除）
            orderSerial: "", //订单流水号
            riskControlCode: "", //风控Code
            riskControlName: "", //风控Name
            riskControlValue: "", //风控Value
            sendMessageFlag: "0", //发送短信Flag（0 不扣除 1 扣除）
            trackUnusualFlag: "0", //轨迹异常Flag（0 不扣除 1 扣除）
            riskControlCodeArr: [],
            unusualFlag: "0",
            unusualFlagStatus: false,
            freezeFlag: "0", //是否冻结账号
            freezeStartTime: "", //
            freezeEndTime: "" //
        },
        optionsEx: [
            {
            code: "AF0850102",
            name: "审查中"
            },
            {
            code: "AF0850103",
            name: "已审查"
            }
        ],
        // btnShow:false,
        isSure: false,
        expense: {},
        dataTotal: 0,
        tableData: [],
        currentTitle: "",
        dialogVisible: false,
        dialogVisibleRevise: false,
        form2: {
            orderSerial: "", //订单流水号
            reviewStatus: "" //reviewStatus
        },
        rules: {
            auditDesc: {
            required: false,
            message: "请输入审查描述",
            trigger: "change"
            },
            freezeEndTime: {
            required: true,
            message: "请选择冻结结束日期",
            trigger: "change"
            }
        },
        rules2: {
            reviewStatus: {
            required: true,
            message: "请选择审查状态",
            trigger: "change"
            }
        },
        optionsRisk: [],
        listInformation: {},
        exName: "",
        auditStatusName: "",
        selected:{},
        };
  },
  watch: {
    isvisible: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.firstblood();
        }
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true
    }
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {},
  methods: {
    passOrder(){

    },
    handlePageChange(obj) {
      this.listSystemObj.currentPage = obj.pageNum;
      this.listSystemObj.pageSize = obj.pageSize;
      this.firstblood();
    },
    //刷新页面
    firstblood() {
      this.loading = true;
      this.listSystemObj.vo.orderSerial = this.$route.query.orderSerial;
      this.$nextTick(() => {
        orderExamineList(this.listSystemObj)
          .then(res => {
            this.tableData = res.data.carrierPage.list;
            this.exName = res.data.reviewStatusName;
            this.auditStatusName = res.data.auditStatusName;
            this.dataTotal = res.data.carrierPage.totalCount;
            this.$refs.multipleTable.doLayout();
            this.loading = false;
          })
          .catch(err => {
            this.loading = false;
          });
      });
    },
    handleClick(type) {
      // console.log(this.chooseTime)
      switch (type) {
        case 'new':
            this.formtitle = '新增审查记录';
            this.dialogFormVisibleEx = true;
            this.currentData = {};
            break;
        case 'modify':
            if(this.selected.orderSerial){
                this.formtitle = '修改审查记录';
                this.dialogFormVisibleEx = true;
                this.currentData = this.selected;
            }else{
                this.$message({
                    type: 'warning',
                    message: '请至少选择一条列表数据!'
                });
            }
            break;
        case "ex":
          this.currentTitle = "审查登记";
          this.dialogVisible = true;
          // this.isSure = false;
          break;
        case "exGo":
          // this.currentTitle = '审查通过';
          // this.dialogVisible = true;
          // this.isSure = true;
          this.$confirm("确认将订单通过审查吗？", "订单审查", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              orderManagerAuditPass(this.$route.query.orderSerial)
                .then(res => {
                  this.$message({
                    type: "success",
                    message: "订单已通过审查!"
                  });
                  this.firstblood();
                })
                .catch(err => {
                  this.$message({
                    type: "error",
                    message:
                      "操作失败，原因：" +
                      (err.errorInfo ? err.errorInfo : err.text)
                  });
                });
            })
            .catch(() => {});
          break;
        case "revise":
          this.dialogVisibleRevise = true;
          break;
      }
    },
    close(done) {
      this.$refs.ruleForm.resetFields();
      this.dialogVisible = false;
      this.firstblood();
      if (typeof done === "function") {
        done();
      }
    },
    close2(done) {
      this.$refs.ruleForm2.resetFields();
      this.dialogVisibleRevise = false;
      this.firstblood();
      if (typeof done === "function") {
        done();
      }
    },
    doActions(cityCode) {
      // let currentCity = '440106';
      listComplainSetting(cityCode).then(res => {
        // console.log('resdata2',res)
        this.optionsRisk = res.data;
      });
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
        // this.$refs.multipleTable.toggleRowSelection(row);
        this.radio = row.id;
        this.selected = row;
        // console.log('this.selected',this.selected)
    },
    init() {
      const orderSerial = this.$route.query.orderSerial;
      // this.loading = true;
      findByOrderSerial(orderSerial)
        .then(res => {
          // console.log('details', res)
          this.listInformation = res.data;
          this.expense = this.listInformation;
          this.doActions(this.listInformation.belongCity);
          // this.loading = false;
          // console.log('this.listInformation',this.listInformation)
        })
        .catch(err => {
          this.$message({
            type: "info",
            message:
              "操作失败，原因：" + (err.errorInfo ? err.errorInfo : err.text)
          });
        });
    },
    completeName() {
      let riskControlName = [];
      let riskControlValue = [];
      let countVal = 0;
      this.form.riskControlCodeArr.forEach(el => {
        this.optionsRisk.forEach(item => {
          if (el == item.code) {
            riskControlName.push(item.ruleDescSetting);
            riskControlValue.push(item.subBehaviorScore);
            countVal += parseInt(item.subBehaviorScore);
          }
        });
      });

      this.form.deductionBehavior = countVal;
      this.form.deductionBehaviorFlag = countVal > 0 ? "1" : "0";
      this.form.orderSerial = this.$route.query.orderSerial;
      this.form.riskControlName = riskControlName.join(",");
      this.form.riskControlValue = riskControlValue.join(",");
      this.form.riskControlCode = this.form.riskControlCodeArr.join(",");

      this.form.deductionCouponReward = this.expense.reward || 0;
      this.form.deductionReward = this.expense.driverReward || 0;
      this.form.deductionCoupon = this.expense.preferentialPrice || 0;
      this.form.unusualFlag = this.form.unusualFlagStatus ? "1" : "0";
    },
    submitForm2(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.form2.orderSerial = this.$route.query.orderSerial;
          let forms = objectMerge2(this.form2);
          reviseOrderExStatus(forms)
            .then(res => {
              this.$message({
                type: "success",
                message: "操作成功！"
              });
              this.close2();
            })
            .catch(err => {
              this.$message({
                type: "info",
                message:
                  "操作失败，原因：" +
                  (err.errorInfo ? err.errorInfo : err.text)
              });
            });
        } else {
          this.$message({
            type: "warning",
            message: "请填写完整数据!"
          });
          return false;
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.btnShow = true;
          this.completeName();
          this.form.freezeStartTime = new Date().getTime();
          this.form.freezeEndTime =
            this.form.freezeEndTime + 1 * 24 * 60 * 60 * 1000 - 1000;
          let forms = objectMerge2(this.form);
          // console.log(forms)
          // let standarFunction;
          // standarFunction = this.isSure ? orderManagerAuditPass : orderReview;
          orderReview(forms)
            .then(res => {
              this.$message({
                type: "success",
                message: "操作成功！"
              });
              this.close();
            })
            .catch(err => {
              this.$message({
                type: "info",
                message:
                  "操作失败，原因：" +
                  (err.errorInfo ? err.errorInfo : err.text)
              });
              // this.btnShow = false;
            });
        } else {
          this.$message({
            type: "warning",
            message: "请填写完整数据!"
          });
          return false;
        }
      });
    }
  }
};
</script>

<style type="text/css" lang="scss" scoped>
.orderEx {
  padding: 0;
  .el-form-item {
    margin-bottom: 10px;
  }
  .el-form-item__content {
    .el-select {
      width: 100%;
    }
    span {
      margin-left: 10px;
    }
  }
  .btns_box span {
    // font-weight: 500;
    // font-size: 18px;
    // line-height: 40px;
    // height: 40px;
    margin-right: 20px;
  }
}
</style>