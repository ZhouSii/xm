<template>
  <div class="identicalStyle" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="提现单号">
        <el-input clearable v-model="formAllData.extractSerial"></el-input>
      </el-form-item>
      <el-form-item label="申请时间">
        <el-date-picker
          v-model="created"
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
      <el-form-item label="申请人账号">
        <el-input clearable v-model="formAllData.accountMobileOrName"></el-input>
      </el-form-item>
      <el-form-item label="收款方式">
        <el-select v-model="formAllData.extractWay" clearable placeholder="请选择">
          <el-option
            v-for="item in collectTypeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="对方账户名">
        <el-input clearable v-model="formAllData.sideAccountName"></el-input>
      </el-form-item>
      <el-form-item label="对方账户号">
        <el-input clearable v-model="formAllData.sideAccountNum"></el-input>
      </el-form-item>
      <el-form-item label="审核状态" v-if="!cashtype">
        <el-select v-model="formAllData.auditOpinion" clearable placeholder="请选择">
          <el-option
            v-for="item in waitTypeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审核时间" v-if="!cashtype">
        <el-date-picker
          v-model="auditOpinion"
          type="daterange"
          unlink-panels
          :picker-options="pickerOptions2"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
          @change="aTime"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="付款状态" v-if="!cashtype">
        <el-select v-model="formAllData.payStatus" clearable placeholder="请选择">
          <el-option
            v-for="item in payStatusTypeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="核销状态" v-if="!cashtype">
        <el-select v-model="formAllData.writeOffStatus" clearable placeholder="请选择">
          <el-option
            v-for="item in writeOffStatusTypeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="核销时间" v-if="!cashtype">
        <el-date-picker
          v-model="writeOff"
          type="daterange"
          unlink-panels
          :picker-options="pickerOptions2"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
          @change="wTime"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="提现状态" v-if="!cashtype">
        <el-select v-model="formAllData.extractStatus" clearable placeholder="请选择">
          <el-option
            v-for="item in extractStatusTypeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="fr">
        <el-button
          type="primary"
          plain
          @click="getData_query"
          :size="btnsize"
          icon="el-icon-search"
        >搜索</el-button>
        <el-button
          type="info"
          plain
          @click="clearSearch"
          :size="btnsize"
          icon="fontFamily aflc-icon-qingkong"
        >清空</el-button>
      </el-form-item>
    </el-form>
    <div class="classify_info">
      <div class="btns_box" v-if="cashtype">
        <el-button
          type="primary"
          icon="el-icon-check"
          plain
          :size="btnsize"
          @click="handleClick('check')"
          v-if="cashtype=='AF09301'&&$_has_permission('FINANCE_WITHDRAW_MANAGE_WITHDRAWALBYFRANCHISEE_TOBEAUDITED_TOEXAMINE')"
        >审核</el-button>
        <el-button
          type="primary"
          icon="el-icon-edit"
          plain
          :size="btnsize"
          @click="handleClick('PaymentReg')"
          v-if="cashtype=='AF09601'&&$_has_permission('FINANCE_WITHDRAW_MANAGE_WITHDRAWALBYFRANCHISEE_STAYFU_PAYMENTREGISTRATION')"
        >付款登记</el-button>
        <el-button
          type="primary"
          icon="el-icon-money"
          plain
          :size="btnsize"
          @click="handleClick('verification')"
          v-if="cashtype=='AF09201'&&$_has_permission('FINANCE_WITHDRAW_MANAGE_WITHDRAWALBYFRANCHISEE_WAITINGFORCANCELLATION_WRITEOFF')"
        >核销</el-button>
        <el-button
          type="primary"
          icon="el-icon-coin"
          plain
          :size="btnsize"
          @click="handleClick('PaymentNotes')"
          v-if="(cashtype=='AF09601'&&$_has_permission('FINANCE_WITHDRAW_MANAGE_WITHDRAWALBYFRANCHISEE_STAYFU_PAYMENTRECORD'))||(cashtype=='AF09201'&&$_has_permission('FINANCE_WITHDRAW_MANAGE_WITHDRAWALBYFRANCHISEE_WAITINGFORCANCELLATION_PAYMENTRECORD'))"
        >付款记录</el-button>
      </div>
      <div class="info_news" style="overflow-x: auto">
        <el-table
          :ref="'multipleTable'+cashtype"
          style="width: 100%"
          stripe
          border
          height="100%"
          @selection-change="getSelection"
          @row-click="clickDetails"
          highlight-current-row
          :data="tableDataAll"
          tooltip-effect="dark"
        >
          <el-table-column label="选择" type="selection" width="50" v-if="cashtype"></el-table-column>
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            label="提现单号"
            prop="extractSerial"
            sortable
            show-overflow-tooltip
            width="250"
          ></el-table-column>
          <el-table-column
            label="申请时间"
            prop="createTime"
            sortable
            show-overflow-tooltip
            width="200"
          ></el-table-column>
          <el-table-column
            label="申请人账号"
            prop="accountMobile"
            sortable
            show-overflow-tooltip
            width="150"
          ></el-table-column>
          <el-table-column
            label="专线承运商"
            prop="carriersLineName"
            sortable
            show-overflow-tooltip
            width="150"
          ></el-table-column>
          <el-table-column
            label="提现金额(元)"
            prop="extractAmount"
            sortable
            show-overflow-tooltip
            width="120"
          ></el-table-column>
          <el-table-column
            label="收款方式"
            prop="extractWayName"
            sortable
            show-overflow-tooltip
            width="120"
          ></el-table-column>
          <el-table-column
            label="对方账户名"
            prop="sideAccountName"
            sortable
            show-overflow-tooltip
            width="150"
          ></el-table-column>
          <el-table-column
            label="对方账户号"
            prop="sideAccountNum"
            sortable
            show-overflow-tooltip
            width="150"
          ></el-table-column>
          <el-table-column
            label="对方所属银行/三方"
            prop="sideAccountBank"
            sortable
            show-overflow-tooltip
            width="180"
          ></el-table-column>
          <el-table-column
            label="审核状态"
            prop="auditOpinionName"
            sortable
            show-overflow-tooltip
            width="150"
          >
            <template slot-scope="scope">
              <span
                :class="{freezeName: scope.row.auditOpinionName == '待审核' ,blackName: scope.row.auditOpinionName == '审核不通过',normalName :scope.row.auditOpinionName == '审核通过'}"
              >{{scope.row.auditOpinionName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="审核意见"
            prop="auditContent"
            sortable
            show-overflow-tooltip
            width="120"
            v-if="cashtype!=='AF09301'"
          ></el-table-column>
          <el-table-column
            label="审核时间"
            prop="auditTime"
            sortable
            show-overflow-tooltip
            width="200"
            v-if="cashtype!=='AF09301'&&cashtype!=='AF09601'&&cashtype!=='AF09201'"
          ></el-table-column>
          <el-table-column
            label="审核人"
            prop="auditor"
            sortable
            show-overflow-tooltip
            width="120"
            v-if="cashtype!=='AF09301'&&cashtype!=='AF09601'&&cashtype!=='AF09201'"
          ></el-table-column>
          <el-table-column
            label="付款状态"
            prop="payStatusName"
            sortable
            show-overflow-tooltip
            width="120"
            v-if="cashtype!=='AF09301'&&cashtype!=='AF09601'"
          >
            <template slot-scope="scope">
              <span
                :class="{freezeName: scope.row.payStatusName == '待付款' ,normalName :scope.row.payStatusName == '已付款'}"
              >{{scope.row.payStatusName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="已付金额（元）"
            prop="paidAmount"
            sortable
            show-overflow-tooltip
            width="150"
            v-if="cashtype!=='AF09301'"
          ></el-table-column>
          <el-table-column
            label="未付金额（元）"
            prop="unpaidAmount"
            sortable
            show-overflow-tooltip
            width="150"
            v-if="cashtype!=='AF09301'&&cashtype!=='AF09601'"
          ></el-table-column>
          <el-table-column
            label="核销状态"
            prop="writeOffStatusName"
            sortable
            show-overflow-tooltip
            width="120"
            v-if="cashtype!=='AF09301'&&cashtype!=='AF09601'"
          >
            <template slot-scope="scope">
              <span
                :class="{freezeName: scope.row.writeOffStatusName == '待核销' ,normalName :scope.row.writeOffStatusName == '已核销'}"
              >{{scope.row.writeOffStatusName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="核销时间"
            prop="writeOffTime"
            sortable
            show-overflow-tooltip
            width="200"
            v-if="cashtype!=='AF09301'&&cashtype!=='AF09601'&&cashtype!=='AF09201'"
          ></el-table-column>
          <el-table-column
            label="核销人"
            prop="writer"
            sortable
            show-overflow-tooltip
            width="120"
            v-if="cashtype!=='AF09301'&&cashtype!=='AF09601'&&cashtype!=='AF09201'"
          ></el-table-column>
          <el-table-column
            label="提现状态"
            prop="extractStatusName"
            sortable
            show-overflow-tooltip
            width="150"
          >
            <template slot-scope="scope">
              <span
                :class="{freezeName: scope.row.extractStatusName == '提现中' ,blackName: scope.row.extractStatusName == '提现失败',normalName :scope.row.extractStatusName == '提现成功'}"
              >{{scope.row.extractStatusName}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 页码 -->
      <div class="info_tab_footer">
        共计:{{ dataTotal }}
        <div class="show_pager">
          <Pager :total="dataTotal" @change="handlePageChange" :sizes="sizes" ref="pager" />
        </div>
      </div>
    </div>

    <check
      :params="selectRowData"
      :editType="type"
      :typetitle="typetitle"
      :dialogCheck.sync="dialogCheck"
      @getData="getDataList"
      :userType="formAllData.userType"
    />
    <PaymentReg
      :params="selectRowData"
      :editType="type"
      :typetitle="typetitle"
      :dialogPaymentReg.sync="dialogPaymentReg"
      @getData="getDataList"
      :userType="formAllData.userType"
    />
    <PaymentNotes
      :params="selectRowData"
      :editType="type"
      :typetitle="typetitle"
      :dialogPaymentNotes.sync="dialogPaymentNotes"
      @getData="getDataList"
    />
  </div>
</template>
<script>
import {
  data_aflcLclExtractCash,
  aflcwriteOff
} from "@/api/finance/CashPrice.js";
import { getDictionary } from "@/api/common.js";
import Pager from "@/components/Pagination/index";
import { parseTime, pickerOptions2 } from "@/utils/";
import check from "./components/check";
import PaymentReg from "./components/PaymentReg";
import PaymentNotes from "./components/PaymentNotes";
export default {
  data() {
    return {
      loading: false,
      pickerOptions2: { shortcuts: pickerOptions2 },
      btnsize: "mini",
      selectRowData: [],
      type: "", //新增或者修改或者详情
      typetitle: "", //新增或者详情title
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      dataTotal: 0,
      tableDataAll: [],
      formAllData: {
        userType: "AF00113",
        extractSerial: null,
        createStartTime: null,
        createEndTime: null,
        accountMobileOrName: null,
        extractWay: null,
        sideAccountName: null,
        sideAccountNum: null,
        auditOpinion: null,
        auditStartTime: null,
        auditEndTime: null,
        payStatus: null,
        writeOffStatus: null,
        writeOffStartTime: null,
        writeOffEndTime: null,
        extractStatus: null
      },
      collectTypeList: [], //收款方式
      waitTypeList: [], //审核状态
      payStatusTypeList: [], //付款方式
      writeOffStatusTypeList: [], //核销状态
      extractStatusTypeList: [], //提现方式
      created: [],
      auditOpinion: [],
      writeOff: [],
      dialogCheck: false, //审核弹框
      dialogPaymentReg: false, //付款登记弹框
      dialogPaymentNotes: false //付款记录弹框
    };
  },
  props: {
    isvisible: {
      type: Boolean,
      default: false
    },
    cashtype: {
      type: String,
      default: null
    }
  },
  components: {
    Pager,
    check,
    PaymentReg,
    PaymentNotes
  },
  watch: {
    isvisible: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.getMoreInformation();
          if (this.cashtype == "AF09301") {
            this.formAllData.auditOpinion = this.cashtype;
          }
          if (this.cashtype == "AF09601") {
            this.formAllData.payStatus = this.cashtype;
          }
          if (this.cashtype == "AF09201") {
            this.formAllData.writeOffStatus = this.cashtype;
          }
          setTimeout(() => {
            this.$refs["multipleTable" + this.cashtype].$el.style.height =
              this.$refs["multipleTable" + this.cashtype].$el.offsetHeight +
              "px";
          }, 300);
          this.firstblood();
        }
      },
      immediate: true
    }
  },
  methods: {
    getMoreInformation() {
      getDictionary("AF08601").then(res => {
        this.collectTypeList = res.data;
      });
      getDictionary("AF093").then(res => {
        this.waitTypeList = res.data;
      });
      getDictionary("AF096").then(res => {
        this.payStatusTypeList = res.data;
      });
      getDictionary("AF092").then(res => {
        this.writeOffStatusTypeList = res.data;
      });
      getDictionary("AF08602").then(res => {
        this.extractStatusTypeList = res.data;
      });
    },
    // 列表刷新页面
    firstblood() {
      this.loading = false;
      data_aflcLclExtractCash(this.page, this.pagesize, this.formAllData).then(
        res => {
          this.dataTotal = res.data.totalCount;
          this.tableDataAll = res.data.list;
          this.tableDataAll.forEach(item => {
            item.createTime = parseTime(
              item.createTime,
              "{y}-{m}-{d} {h}:{i}:{s}"
            );
            item.auditTime = parseTime(
              item.auditTime,
              "{y}-{m}-{d} {h}:{i}:{s}"
            );
            item.writeOffTime = parseTime(
              item.writeOffTime,
              "{y}-{m}-{d} {h}:{i}:{s}"
            );
          });
          this.loading = false;
        }
      );
    },
    // 申请时间
    cTime(i) {
      if (i) {
        this.formAllData.createStartTime = i[0];
        this.formAllData.createEndTime = i[1];
      } else {
        this.formAllData.createStartTime = "";
        this.formAllData.createEndTime = "";
      }
    },
    // 审核时间
    aTime(i) {
      if (i) {
        this.formAllData.auditStartTime = i[0];
        this.formAllData.auditEndTime = i[1];
      } else {
        this.formAllData.auditStartTime = "";
        this.formAllData.auditEndTime = "";
      }
    },
    // 核销时间
    wTime(i) {
      if (i) {
        this.formAllData.writeOffStartTime = i[0];
        this.formAllData.writeOffEndTime = i[1];
      } else {
        this.formAllData.writeOffStartTime = "";
        this.formAllData.writeOffEndTime = "";
      }
    },
    //  查询
    getData_query() {
      this.page = 1;
      this.$refs.pager.inputval = this.page;
      this.$refs.pager.pageNum = this.page;
      this.firstblood();
    },
    // 清空
    clearSearch() {
      for (var key in this.formAllData) {
        this.formAllData[key] = "";
      }
      this.formAllData.userType = "AF00113";
      if (this.cashtype == "AF09301") {
        this.formAllData.auditOpinion = this.cashtype;
      }
      if (this.cashtype == "AF09601") {
        this.formAllData.payStatus = this.cashtype;
      }
      if (this.cashtype == "AF09201") {
        this.formAllData.writeOffStatus = this.cashtype;
      }
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.created = [];
      this.auditOpinion = [];
      this.writeOff = [];
      this.firstblood();
    },
    handleClick(type) {
      if (this.selectRowData.length == 0) {
        return this.$message.warning("请选择您要操作的数据");
      } else if (this.selectRowData.length > 1) {
        this.$message({
          message: "每次只能操作单条数据~",
          type: "warning"
        });
        this.$refs["multipleTable" + this.cashtype].clearSelection();
      } else {
        switch (type) {
          case "check":
            this.type = "check";
            this.typetitle = "提现单审核";
            this.dialogCheck = true;
            break;
          case "PaymentReg":
            this.type = "PaymentReg";
            this.typetitle = "付款登记";
            this.dialogPaymentReg = true;
            break;
          case "verification":
            console.log("ddddd");
            this.$confirm("是否确定核销该提现单？", "核销", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                aflcwriteOff(this.selectRowData[0].id)
                  .then(res => {
                    this.$message.success("核销成功");
                    this.firstblood();
                    this.$refs[
                      "multipleTable" + this.cashtype
                    ].clearSelection();
                  })
                  .catch(err => {
                    this.firstblood();
                    this.$refs[
                      "multipleTable" + this.cashtype
                    ].clearSelection();
                    this.$message({
                      type: "info",
                      message: "操作失败，原因：" + err.text ? err.text : err
                    });
                  });
              })
              .catch(() => {
                this.firstblood();
                this.$refs["multipleTable" + this.cashtype].clearSelection();
                this.$message({
                  type: "info",
                  message: "已取消"
                });
              });
            break;
          case "PaymentNotes":
            this.type = "PaymentNotes";
            this.typetitle = "付款记录";
            this.dialogPaymentNotes = true;
            break;
        }
      }
    },
    pushExtractSerial(item) {
      this.type = "view";
      this.typetitle = "提现详情";
      this.dialogFormVisible_add = true;
    },
    // 判断选中与否
    getSelection(val) {
      console.log("选中内容", val);
      this.selectRowData = val;
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
      this.$refs["multipleTable" + this.cashtype].toggleRowSelection(row);
    },
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    getDataList() {
      this.firstblood();
      this.$refs["multipleTable" + this.cashtype].clearSelection();
    },
    // 详情弹窗
    pushOrderSerial(item) {
      this.$router.push({
        name: "车主详情",
        query: { driverId: item.accountId }
      });
      sessionStorage.getItem("CZdetailsName", "financial");
    }
  }
};
</script>
<style lang="scss">
</style>






