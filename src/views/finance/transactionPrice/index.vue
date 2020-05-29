<template>
  <div class="identicalStyle" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="用户账号">
        <el-input clearable v-model="formAllData.accountMobileOrName"></el-input>
      </el-form-item>
      <el-form-item label="区代名称">
        <el-input clearable v-model="formAllData.agencyOrLineName"></el-input>
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
        <span class="description" style="margin-left:0">账户总余额：¥ {{balanceTotal}}</span>
        <span class="description">待入账总金额：¥ {{waitBalanceTotal}}</span>
        <span class="description">待付款总金额：¥ {{waitPayBalanceTotal}}</span>
        <span class="description">剩余保证金总金额：¥ {{collateralTotal}}</span>
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
        >
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column label="用户账号" prop="accountMobile" sortable show-overflow-tooltip width>
            <template slot-scope="scope">
              <h4
                class="needMoreInfo"
                @click="pushOrderSerial(scope.row)"
              >{{ scope.row.accountMobile}}</h4>
            </template>
          </el-table-column>
          <el-table-column
            label="区代名称"
            prop="agencyOrLineName"
            sortable
            show-overflow-tooltip
            width
          ></el-table-column>
          <el-table-column label="账户余额" prop="balance" sortable show-overflow-tooltip width></el-table-column>
          <el-table-column label="待入账金额" prop="waitBalance" sortable show-overflow-tooltip width></el-table-column>
          <el-table-column
            label="待付款提现金额"
            prop="waitPayBalance"
            sortable
            show-overflow-tooltip
            width
          ></el-table-column>
          <el-table-column label="剩余保证金" prop="collateral" sortable show-overflow-tooltip width></el-table-column>
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
  </div>
</template>
<script>
import { data_findMywalletTotal } from "@/api/finance/transactionCarrierPrice.js";
import { getDictionary } from "@/api/common.js";
import Pager from "@/components/Pagination/index";
import { parseTime, pickerOptions2 } from "@/utils/";
export default {
  data() {
    return {
      loading: true,
      pickerOptions2: { shortcuts: pickerOptions2 },
      btnsize: "mini",
      selectRowData: [],
      type: "", //新增或者修改或者详情
      typetitle: "", //新增或者详情title
      selectId: [],
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      dataTotal: 0,
      tableDataAll: [],
      formAllData: {
        accountMobileOrName: null,
        agencyOrLineName: null
      },
      balanceTotal: 0,
      collateralTotal: 0,
      waitBalanceTotal: 0,
      waitPayBalanceTotal: 0
    };
  },
  components: {
    Pager
  },
  mounted() {
    this.getMoreInformation();
    this.firstblood();
  },
  methods: {
    getMoreInformation() {},
    // 列表刷新页面
    firstblood() {
      this.loading = true;
      data_findMywalletTotal(
        this.page,
        this.pagesize,
        this.formAllData,
        "AF00112"
      ).then(res => {
        this.dataTotal = res.data.pageData.totalCount;
        this.tableDataAll = res.data.pageData.list;
        this.balanceTotal = res.data.mywalletTotalDto.balanceTotal;
        this.collateralTotal = res.data.mywalletTotalDto.collateralTotal;
        this.waitBalanceTotal = res.data.mywalletTotalDto.waitBalanceTotal;
        this.waitPayBalanceTotal =
          res.data.mywalletTotalDto.waitPayBalanceTotal;
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
        accountMobileOrName: null,
        agencyOrLineName: null
      };
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.firstblood();
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
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    getDataList() {
      this.firstblood();
      this.$refs.multipleTable.clearSelection();
    },
    // 详情弹窗
    pushOrderSerial(item) {
      this.$router.push({
        name: "区代账户账户详情",
        query: { Id: item.accountId }
      });
      sessionStorage.setItem("transaCarrierPrice", item.agencyOrLineName);
      sessionStorage.setItem("transaWaitPayBalance", item.waitPayBalance);
      sessionStorage.setItem("districtTypeName", "accountBalance");
    }
  }
};
</script>
<style lang="scss">
.pr50 {
  padding-right: 50px;
}
</style>

