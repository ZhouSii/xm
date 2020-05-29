<template>
  <div class="identicalStyle" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="对账日期">
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
          :size="btnsize"
          icon="el-icon-download"
          plain
          @click="importExcel"
        >导出Excel</el-button>
      </div>
      <div class="info_news">
        <el-table
          ref="multipleTable"
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
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column label="对账日期" prop="month" sortable show-overflow-tooltip min-width="160">
            <!-- <template slot-scope="scope">
              <h4 class="needMoreInfo" @click="jumpToDetailPage(scope.row,'summary')"></h4>
            </template>-->
          </el-table-column>
          <el-table-column label="收入对比">
            <el-table-column label="平台收入笔数" sortable show-overflow-tooltip min-width="160"></el-table-column>
            <el-table-column label="平台收入金额" sortable show-overflow-tooltip min-width="160"></el-table-column>
            <el-table-column
              label="支付宝收入笔数"
              sortable
              show-overflow-tooltip
              min-width="160"
              v-if="accountTypeName=='支付宝'"
            ></el-table-column>
            <el-table-column label="微信收入笔数" sortable show-overflow-tooltip min-width="160" v-else></el-table-column>
            <el-table-column
              label="支付宝收入金额"
              sortable
              show-overflow-tooltip
              min-width="160"
              v-if="accountTypeName=='支付宝'"
            ></el-table-column>
            <el-table-column label="微信收入金额" sortable show-overflow-tooltip min-width="160" v-else></el-table-column>
          </el-table-column>
          <el-table-column label="支出对比">
            <el-table-column label="平台支出笔数" sortable show-overflow-tooltip min-width="160"></el-table-column>
            <el-table-column label="平台支出金额" sortable show-overflow-tooltip min-width="160"></el-table-column>
            <el-table-column
              label="支付宝支出笔数"
              sortable
              show-overflow-tooltip
              min-width="160"
              v-if="accountTypeName=='支付宝'"
            ></el-table-column>
            <el-table-column label="微信支出笔数" sortable show-overflow-tooltip min-width="160" v-else></el-table-column>
            <el-table-column
              label="支付宝支出金额"
              sortable
              show-overflow-tooltip
              min-width="160"
              v-if="accountTypeName=='支付宝'"
            ></el-table-column>
            <el-table-column label="微信收入金额" sortable show-overflow-tooltip min-width="160" v-else></el-table-column>
          </el-table-column>
          <!-- <el-table-column label="操作" min-width="160">
            <template slot-scope="scope">
              <el-button
                @click="jumpToDetailPage(scope.row,'detail')"
                type="text"
                size="medium"
              >每月本日数据</el-button>
            </template>
          </el-table-column>-->
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
import Pager from "@/components/Pagination/index";
import { parseTime, pickerOptions2 } from "@/utils/";
export default {
  name: "zhifubaoBusinessDetail",
  components: {
    Pager
  },
  data() {
    return {
      loading: false,
      pickerOptions2: { shortcuts: pickerOptions2 },
      dataTotal: 0,
      btnsize: "mini",
      tableDataAll: [],
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      created: []
    };
  },
  props: {
    isvisible: {
      type: Boolean,
      default: false
    },
    accountType: {
      type: String,
      default: null
    },
    accountTypeName: {
      type: String,
      default: null
    }
  },
  methods: {
    firstblood() {
      // this.loading = true;
    },
    importExcel() {
      // this.selectRowData.forEach(item => {
      //   this.formAllData.selected.push(item.id);
      // });
      // this.$message.info("正在导出中...");
      // let href = "";
      // aflcSubsidyExportExcel(0, 0, this.formAllData).then(res => {
      //   this.formAllData.selected = [];
      //   var blob = new Blob([res]);
      //   href = window.URL.createObjectURL(blob);
      //   var NewDom = document.createElement("a");
      //   NewDom.setAttribute("href", href);
      //   NewDom.setAttribute("target", "_blank");
      //   NewDom.setAttribute(
      //     "download",
      //     "补贴申请-" +
      //       this.statusTypeName +
      //       "_" +
      //       parseTime(new Date(), "{y}{m}{d}{h}{i}{s}") +
      //       ".xls"
      //   );
      //   document.body.appendChild(NewDom);
      //   NewDom.click();
      //   document.body.removeChild(NewDom);
      // });
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
    jumpToDetailPage(item, i) {
      i === "detail"
        ? this.$router.push({
            name: "支付宝业务明细详情"
            // query: { orderSerial: item.orderSerial }
          })
        : this.$router.push({
            name: "支付宝业务明细-日"
            // query: { orderSerial: item.orderSerial }
          });
    },
    cTime(i) {
      //   if (i) {
      //     this.formAllData.createStartTime = i[0];
      //     this.formAllData.createEndTime = i[1];
      //   } else {
      //     this.formAllData.createStartTime = "";
      //     this.formAllData.createEndTime = "";
      //   }
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
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.created = [];
      this.firstblood();
    }
  }
};
</script>

<style>
</style>