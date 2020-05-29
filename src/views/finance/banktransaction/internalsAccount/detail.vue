<template>
  <div class="identicalStyle" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="订单号">
        <el-input clearable v-model="formAllData.orderSerial"></el-input>
      </el-form-item>
      <el-form-item label="交易流水号">
        <el-input clearable v-model="formAllData.tradeSerial"></el-input>
      </el-form-item>
      <el-form-item label="资金流水号">
        <el-input clearable v-model="formAllData.fundSerial"></el-input>
      </el-form-item>
      <el-form-item label="对方账户名">
        <el-input clearable v-model="formAllData.sideAccountName"></el-input>
      </el-form-item>
      <el-form-item label="对方账户号">
        <el-input clearable v-model="formAllData.sideAccountNum"></el-input>
      </el-form-item>
      <el-form-item label="收支类型">
        <el-select v-model="formAllData.incomeExpendType" clearable placeholder="请选择">
          <el-option
            v-for="item in incomeExpendTypeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="交易时间">
        <el-date-picker
          v-model="tradeTime"
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
      <el-form-item label="操作时间">
        <el-date-picker
          v-model="updateTime"
          type="daterange"
          unlink-panels
          :picker-options="pickerOptions2"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
          @change="UTime"
        ></el-date-picker>
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
          icon="el-icon-circle-plus"
          plain
          :size="btnsize"
          @click="handleClick('add')"
        >新增</el-button>
        <el-button
          type="primary"
          icon="el-icon-edit"
          plain
          :size="btnsize"
          :disabled="btnStatus"
          @click="handleClick('edit')"
        >修改</el-button>
        <el-button
          type="primary"
          icon="el-icon-download"
          plain
          :size="btnsize"
          @click="importExcel"
        >导出Excel</el-button>
        <span class="description">收入金额：{{incomeAmount}}</span>
        <span class="description">支出金额：{{expendAmount}}</span>
      </div>
      <div class="info_news">
        <el-table
          ref="multipleTable"
          style="width: 100%"
          stripe
          border
          height="100%"
          highlight-current-row
          :data="tableDataAll"
          tooltip-effect="dark"
          @selection-change="getSelection"
          @row-click="clickDetails"
        >
          <el-table-column label="选择" type="selection" width="50"></el-table-column>
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            label="订单号"
            prop="orderSerial"
            sortable
            show-overflow-tooltip
            min-width="250"
          >
            <template slot-scope="scope">
              <h4
                class="needMoreInfo"
                @click="pushOrderSerial(scope.row)"
                v-if="scope.row.orderSerial.indexOf('AFTC')!== -1 || scope.row.orderSerial.indexOf('AFWL')!== -1"
              >{{ scope.row.orderSerial}}</h4>
              <span v-else>{{ scope.row.orderSerial}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="交易流水号"
            prop="tradeSerial"
            sortable
            show-overflow-tooltip
            min-width="250"
          ></el-table-column>
          <el-table-column
            label="资金流水号"
            prop="fundSerial"
            sortable
            show-overflow-tooltip
            min-width="220"
          ></el-table-column>
          <el-table-column
            label="收支类型"
            prop="incomeExpendTypeName"
            sortable
            show-overflow-tooltip
            min-width="120"
          >
            <template slot-scope="scope">
              <span
                :class="{blackName: scope.row.incomeExpendTypeName == '支出',normalName :scope.row.incomeExpendTypeName == '收入'}"
              >{{scope.row.incomeExpendTypeName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="交易金额(元)"
            prop="tradeAmount"
            sortable
            show-overflow-tooltip
            min-width="150"
          ></el-table-column>
          <el-table-column
            label="交易类型"
            prop="tradeType"
            sortable
            show-overflow-tooltip
            min-width="150"
          ></el-table-column>
          <el-table-column
            label="交易时间"
            prop="tradeTime"
            sortable
            show-overflow-tooltip
            min-width="160"
          >
            <template slot-scope="scope">{{scope.row.tradeTime|parseTime}}</template>
          </el-table-column>
          <el-table-column
            label="用户账号"
            prop="accountName"
            sortable
            show-overflow-tooltip
            min-width="200"
          ></el-table-column>
          <el-table-column
            label="账号类型"
            prop="accountType"
            sortable
            show-overflow-tooltip
            min-width="200"
          ></el-table-column>
          <el-table-column
            label="对方账户名"
            prop="sideAccountName"
            sortable
            show-overflow-tooltip
            min-width="200"
          ></el-table-column>
          <el-table-column
            label="对方账户号"
            prop="sideAccountNum"
            sortable
            show-overflow-tooltip
            min-width="250"
          ></el-table-column>
          <el-table-column
            label="对方所属银行/三方"
            prop="sideAccountBank"
            sortable
            show-overflow-tooltip
            min-width="180"
          ></el-table-column>
          <el-table-column
            label="操作时间"
            prop="updateTime"
            sortable
            show-overflow-tooltip
            min-width="160"
          >
            <template
              slot-scope="scope"
            >{{scope.row.updateTime== null?scope.row.createTime:scope.row.updateTime|parseTime}}</template>
          </el-table-column>
          <el-table-column
            label="操作人"
            prop="updater"
            sortable
            show-overflow-tooltip
            min-width="150"
          >
            <template
              slot-scope="scope"
            >{{scope.row.updater== null?scope.row.creater:scope.row.updater}}</template>
          </el-table-column>
          <el-table-column
            label="凭证"
            prop="certificateAddress"
            sortable
            show-overflow-tooltip
            min-width="180"
          >
            <template slot-scope="scope">
              <img :src="scope.row.certificateAddress" alt v-showPicture style="width:50px" />
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
      <detailOperate
        :params="editPassData"
        :accountInfo="accountInfo"
        :editType="type"
        :typetitle="typetitle"
        :dialogDetailOperate.sync="dialogDetailOperate"
        @getData="getDataList"
      />
    </div>
  </div>
</template>
<script>
import {
  data_aflcFundAccountDetail,
  aflcFundAccountDetailExcel
} from "@/api/finance/banktransaction";
import { getDictionary } from "@/api/common.js";
import Pager from "@/components/Pagination/index";
import { parseTime, pickerOptions2 } from "@/utils/";
import detailOperate from "./detailOperate";
import { Switch } from "element-ui";
export default {
  data() {
    return {
      loading: false,
      pickerOptions2: { shortcuts: pickerOptions2 },
      btnsize: "mini",
      btnStatus: false,
      selectRowData: [],
      type: "", //新增或者修改
      typetitle: "", //新增或者修改title
      selectId: [],
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      dataTotal: 0,
      tableDataAll: [],
      formAllData: {
        fundAccountId: this.$route.query.id,
        orderSerial: null,
        tradeSerial: null,
        fundSerial: null,
        sideAccountNum: null,
        sideAccountName: null,
        incomeExpendType: null,
        tradeStartTime: null,
        tradeEndTime: null,
        updateStartTime: null,
        updateEndTime: null
      },
      tradeTime: [],
      updateTime: [],
      incomeExpendTypeList: [
        { code: "1", name: "收入" },
        { code: "0", name: "支出" }
      ], //收入支出
      href: "",
      incomeAmount: 0,
      expendAmount: 0,
      dialogDetailOperate: false,
      editPassData: [],
      accountInfo: {
        accountName: this.$route.query.accountName,
        accountNum: this.$route.query.accountNum,
        fundAccountId: this.$route.query.id
      }
    };
  },
  components: {
    Pager,
    detailOperate
  },
  watch: {},
  methods: {
    // 列表刷新页面
    firstblood() {
      this.loading = true;
      data_aflcFundAccountDetail(
        this.page,
        this.pagesize,
        this.formAllData
      ).then(res => {
        this.dataTotal = res.data.totalCount;
        this.tableDataAll = res.data.list[0].accountDetailDtos;
        this.incomeAmount = res.data.list[0].incomeSum;
        this.expendAmount = res.data.list[0].expendSum;
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
        orderSerial: null,
        tradeSerial: null,
        fundAccountId: this.$route.query.id,
        fundSerial: null,
        sideAccountNum: null,
        sideAccountName: null,
        incomeExpendType: null,
        tradeStartTime: null,
        tradeEndTime: null,
        updateStartTime: null,
        updateEndTime: null
      };
      this.tradeTime = [];
      this.updateTime = [];
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.firstblood();
    },
    cTime(i) {
      if (i) {
        this.formAllData.tradeStartTime = i[0];
        this.formAllData.tradeEndTime = i[1];
      } else {
        this.formAllData.tradeStartTime = "";
        this.formAllData.tradeEndTime = "";
      }
    },
    UTime(i) {
      if (i) {
        this.formAllData.updateStartTime = i[0];
        this.formAllData.updateEndTime = i[1];
      } else {
        this.formAllData.updateStartTime = "";
        this.formAllData.updateEndTime = "";
      }
    },
    //   导出excel
    importExcel() {
      this.$message.info("正在导出中...");
      aflcFundAccountDetailExcel(0, 0, this.formAllData).then(res => {
        var blob = new Blob([res]);
        this.href = window.URL.createObjectURL(blob);
        var NewDom = document.createElement("a");
        NewDom.setAttribute("href", this.href);
        NewDom.setAttribute("target", "_blank");
        NewDom.setAttribute("download", "资金账户明细.xls");
        document.body.appendChild(NewDom);
        NewDom.click();
        document.body.removeChild(NewDom);
      });
    },
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    // 判断选中与否
    getSelection(val) {
      console.log("选中内容", val);
      this.selectRowData = val;
      if (this.selectRowData.length == 1) {
        this.btnStatus = this.selectRowData[0].remark == "1" ? true : false;
      } else {
        this.btnStatus = false;
      }
    },
    //点击选中当前行
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    getDataList() {
      this.firstblood();
      this.$refs.multipleTable.clearSelection();
    },
    pushOrderSerial(item) {
      if (item.orderSerial.indexOf("AFTC") !== -1) {
        this.$router.push({
          name: "订单详情",
          query: { orderSerial: item.orderSerial }
        });
      } else if (item.orderSerial.indexOf("AFWL") !== -1) {
        this.$router.push({
          name: "发物流订单详情",
          query: { orderSerial: item.orderSerial }
        });
      }
    },
    handleClick(type) {
      if (this.selectRowData.length == 0 && type != "add") {
        return this.$message.warning("请选择您要操作的数据");
      } else if (this.selectRowData.length > 1 && type != "add") {
        this.$message({
          message: "每次只能操作单条数据~",
          type: "warning"
        });
        this.$refs.multipleTable.clearSelection();
      } else {
        switch (type) {
          case "add":
            this.type = "add";
            this.typetitle = "新增";
            this.dialogDetailOperate = true;
            break;
          case "edit":
            this.type = "edit";
            this.typetitle = "修改";
            this.dialogDetailOperate = true;
            this.editPassData = this.selectRowData;
        }
      }
      this.$refs.multipleTable.clearSelection();
    }
  },
  mounted() {
    this.firstblood();
  }
};
</script>
<style lang="scss">
.needMoreInfoSpan {
  cursor: pointer;
  color: #3e9ff1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: bold;
  margin: 0px 5px;
}
</style>

