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
            v-for="item in incomeTypeList"
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
      <el-form-item label="审核状态">
        <el-select v-model="formAllData.auditOpinion" clearable placeholder="请选择">
          <el-option
            v-for="item in checkTypeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审核时间">
        <el-date-picker
          v-model="audit"
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
      <el-form-item label="付款状态">
        <el-select v-model="formAllData.payStatus" clearable placeholder="请选择">
          <el-option
            v-for="item in payTypeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="核销状态">
        <el-select v-model="formAllData.writeOffStatus" clearable placeholder="请选择">
          <el-option
            v-for="item in cancelTypeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="核销时间">
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
      <el-form-item label="提现状态">
        <el-select v-model="formAllData.extractStatus" clearable placeholder="请选择">
          <el-option
            v-for="item in cashTypeList"
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
      <div class="btns_box">
        <el-button
          type="primary"
          plain
          icon="el-icon-download"
          @click="importExcel"
          :size="btnsize"
          v-has:FINANCE_DISTRICTAGENTOVERVIEW_DETAILSOFDISTRICTAGENT_WITHDRAWALSRECORD_EXPORT
        >导出Excel</el-button>
        <el-button
          type="primary"
          icon="el-icon-coin"
          plain
          :size="btnsize"
          @click="handleClick()"
          v-has:FINANCE_DISTRICTAGENTOVERVIEW_DETAILSOFDISTRICTAGENT_WITHDRAWALSRECORD_CHECKDETAILS
        >查看明细</el-button>
        <span class="description">区代名称：</span>
        <span style="font-size:14px" class="titleName">{{agencyOrLineName?agencyOrLineName:''}}</span>
        <span class="description">待付款提现总金额：¥ {{waitTatle}}</span>
      </div>
      <div class="info_news">
        <el-table
          ref="multipleTable"
          style="width: 100%"
          stripe
          border
          height="99%"
          @selection-change="getSelection"
          @row-click="clickDetails"
          highlight-current-row
          :data="tableDataAll"
          tooltip-effect="dark"
        >
          <el-table-column label="选择" type="selection" width="50"></el-table-column>
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
            width="160"
          ></el-table-column>
          <el-table-column
            label="申请人账号"
            prop="accountMobile"
            sortable
            show-overflow-tooltip
            width="120"
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
            width="100"
          ></el-table-column>
          <el-table-column
            label="对方账户名"
            prop="sideAccountName"
            sortable
            show-overflow-tooltip
            width="120"
          ></el-table-column>
          <el-table-column
            label="对方账户号"
            prop="sideAccountNum"
            sortable
            show-overflow-tooltip
            width="120"
          ></el-table-column>
          <el-table-column
            label="对方所属银行/三方"
            prop="sideAccountBank"
            sortable
            show-overflow-tooltip
            width="150"
          ></el-table-column>
          <el-table-column
            label="审核状态"
            prop="auditOpinionName"
            sortable
            show-overflow-tooltip
            width="100"
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
            width="150"
          ></el-table-column>
          <el-table-column label="审核时间" prop="auditTime" sortable show-overflow-tooltip width="160"></el-table-column>
          <el-table-column label="审核人" prop="auditor" sortable show-overflow-tooltip width="100"></el-table-column>
          <el-table-column
            label="付款状态"
            prop="payStatusName"
            sortable
            show-overflow-tooltip
            width="100"
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
            width="120"
          ></el-table-column>
          <el-table-column
            label="未付金额（元）"
            prop="unpaidAmount"
            sortable
            show-overflow-tooltip
            width="120"
          ></el-table-column>
          <el-table-column
            label="核销状态"
            prop="writeOffStatusName"
            sortable
            show-overflow-tooltip
            width="100"
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
            width="160"
          ></el-table-column>
          <el-table-column label="核销人" prop="writer" sortable show-overflow-tooltip width="100"></el-table-column>
          <el-table-column
            label="提现状态"
            prop="extractStatusName"
            sortable
            show-overflow-tooltip
            width="100"
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
    <PaymentNotes
      :params="selectRowData"
      :editType="type"
      :typetitle="typetitle"
      :showFlag="true"
      :dialogPaymentNotes.sync="dialogPaymentNotes"
      @getData="getDataList"
    />
  </div>
</template>
<script>
import {
  data_aflcLclExtractCashList,
  data_aflcLclExtractCashListExcel
} from "@/api/finance/transactionCarrierPrice.js";
import { getDictionary } from "@/api/common.js";
import Pager from "@/components/Pagination/index";
import { parseTime, pickerOptions2 } from "@/utils/";
import PaymentNotes from "@/views/finance/transactionCash/CashPrice/components/PaymentNotes";
export default {
  data() {
    return {
      loading: true,
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
        extractStatus: null,
        userType: "AF00112",
        accountId: this.$route.query.Id
      },
      incomeTypeList: [], //收款类型
      checkTypeList: [], //审核类型
      payTypeList: [], //付款类型
      cancelTypeList: [], //核销类型
      cashTypeList: [], //提现类型
      created: [],
      audit: [],
      writeOff: [],
      agencyOrLineName: sessionStorage.getItem("transaCarrierPrice"),
      waitTatle: sessionStorage.getItem("transaWaitPayBalance"),
      dialogPaymentNotes: false
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
    PaymentNotes
  },
  watch: {
    isvisible: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.getMoreInformation();
          this.firstblood();
        }
      },
      immediate: true
    }
  },
  methods: {
    getMoreInformation() {
      getDictionary("AF08601").then(res => {
        this.incomeTypeList = res.data;
      });
      getDictionary("AF093").then(res => {
        this.checkTypeList = res.data;
      });
      getDictionary("AF096").then(res => {
        this.payTypeList = res.data;
      });
      getDictionary("AF092").then(res => {
        this.cancelTypeList = res.data;
      });
      getDictionary("AF08602").then(res => {
        this.cashTypeList = res.data;
      });
    },
    // 列表刷新页面
    firstblood() {
      this.loading = true;
      data_aflcLclExtractCashList(
        this.page,
        this.pagesize,
        this.formAllData
      ).then(res => {
        this.dataTotal = res.data.totalCount;
        this.tableDataAll = res.data.list;
        this.tableDataAll.forEach(item => {
          item.createTime = parseTime(
            item.createTime,
            "{y}-{m}-{d} {h}:{i}:{s}"
          );
          item.auditTime = parseTime(item.auditTime, "{y}-{m}-{d} {h}:{i}:{s}");
          item.writeOffTime = parseTime(
            item.writeOffTime,
            "{y}-{m}-{d} {h}:{i}:{s}"
          );
        });
        this.loading = false;
      });
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
      this.formAllData = {
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
        extractStatus: null,
        userType: "AF00112",
        accountId: this.$route.query.Id
      };
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.created = [];
      this.audit = [];
      this.writeOff = [];
      this.firstblood();
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
    // 判断选中与否
    getSelection(val) {
      console.log("选中内容", val);
      this.selectRowData = val;
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    //导出Excel
    importExcel() {
      let href = "";
      this.$message.info("正在导出中...");
      data_aflcLclExtractCashListExcel(0, 0, this.formAllData).then(res => {
        var blob = new Blob([res]);
        href = window.URL.createObjectURL(blob);
        var NewDom = document.createElement("a");
        NewDom.setAttribute("href", href);
        NewDom.setAttribute("target", "_blank");
        NewDom.setAttribute("download", "区代账户概况提现记录.xls");
        document.body.appendChild(NewDom);
        NewDom.click();
        document.body.removeChild(NewDom);
      });
    },
    handleClick() {
      if (this.selectRowData.length == 0) {
        return this.$message.warning("请选择您要操作的数据");
      } else if (this.selectRowData.length > 1) {
        this.$message({
          message: "每次只能操作单条数据~",
          type: "warning"
        });
        this.$refs.multipleTable.clearSelection();
      } else {
        this.type = "PaymentNotes";
        this.typetitle = "付款明细";
        this.dialogPaymentNotes = true;
      }
    },
    getDataList() {
      this.firstblood();
      this.$refs.multipleTable.clearSelection();
    },
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    }
  }
};
</script>
<style lang="scss">
</style>

