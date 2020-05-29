<template>
  <div class="identicalStyle RecommendReword" v-loading="loading">
    <el-form
      :inline="true"
      :model="listSystemObj"
      ref="ruleForm"
      class="demo-ruleForm classify_searchinfo"
    >
      <el-form-item label="被推荐人所在地" prop="recommendederAreaName">
        <el-input v-model="listSystemObj.vo.recommendederAreaName" clearable></el-input>
      </el-form-item>
      <el-form-item label="推荐人" prop="recommenderNameOrPhoneOrPlateNumber">
        <el-input v-model="listSystemObj.vo.recommenderNameOrPhoneOrPlateNumber" clearable></el-input>
      </el-form-item>
      <el-form-item label="奖励时间" prop="chooseTime">
        <el-date-picker
          v-model="chooseTime"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          unlink-panels
          align="right"
          :default-time="['00:00:00', '23:59:59']"
          value-format="timestamp"
        ></el-date-picker>
      </el-form-item>
      <el-form-item class="btnChoose fr" style="margin-left:0;">
        <el-button
          type="primary"
          :size="btnsize"
          icon="el-icon-search"
          plain
          @click="handleSearch('search')"
        >搜索</el-button>
        <el-button
          type="info"
          :size="btnsize"
          icon="fontFamily aflc-icon-qingkong"
          plain
          @click="handleSearch('clear')"
        >清空</el-button>
      </el-form-item>
    </el-form>
    <div class="classify_info">
      <div class="btns_box">
        <el-button
          type="primary"
          icon="el-icon-download"
          plain
          :size="btnsize"
          @click="importExcel()"
        >导出EXCEL</el-button>
      </div>
      <div class="info_news">
        <el-table
          :data="tableData"
          border
          ref="multipleTable"
          stripe
          align="center"
          height="100%"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <template v-for="(column,key) in tableColumn">
            <el-table-column
              :key="key"
              :fixed="column.fixed"
              :label="column.label"
              :show-overflow-tooltip="column.overflow"
              :prop="column.prop"
              v-if="!column.slot"
              :width="column.width"
            ></el-table-column>
            <el-table-column
              :key="key"
              :fixed="column.fixed"
              :label="column.label"
              :show-overflow-tooltip="column.overflow"
              v-else
              :width="column.width || ''"
            >
              <template slot-scope="scope">
                <span
                  class="clickitem"
                  v-if="column.click"
                  v-html="column.slot(scope)"
                  @click.stop="column.click(scope.row)"
                ></span>
                <span v-else v-html="column.slot(scope)"></span>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
    </div>
    <div class="info_tab_footer">
      共计:{{ totalCount }}
      <div class="show_pager">
        <Pager :total="totalCount" @change="handlePageChange" ref="pager" />
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import {
  ExpenditureRecommendRewordList,
  ExpenditureRecommendRewordListExcel
} from "@/api/marketing/distribution";
import Pager from "@/components/Pagination/index";
import { parseTime } from "@/utils/index.js";
import { SaveAsFile } from "@/utils/lodopFuncs";

export default {
  name: "RecommendReword",
  components: {
    Pager
  },
  data() {
    return {
      btnsize: "mini",
      loading: false, // 加载
      totalCount: 0,
      listSystemObj: {
        currentPage: 1,
        pageSize: 20,
        vo: {
          recommendederAreaName: "", //被推荐人所在地
          recommenderNameOrPhoneOrPlateNumber: "", //推荐人
          tradeStartTime: "", //奖励结束时间
          tradeEndTime: "" //奖励开始时间
        }
      },
      tableData: [],
      chooseTime: [],
      tableColumn: [
        {
          label: "序号",
          prop: "id",
          width: "60",
          fixed: false,
          slot: scope => {
            return (
              (this.listSystemObj.currentPage - 1) *
                this.listSystemObj.pageSize +
              scope.$index +
              1
            );
          }
        },
        {
          label: "被推荐人所在地",
          prop: "recommendederAreaName",
          fixed: false,
          overflow: true
        },
        {
          label: "被推荐人",
          prop: "recommendederName",
          fixed: false,
          overflow: true
        },
        {
          label: "被推荐人类型",
          prop: "recommendederTypeName",
          fixed: false,
          overflow: true
        },
        {
          label: "推荐人",
          prop: "recommenderName",
          fixed: false,
          overflow: true
        },
        {
          label: "推荐人所在地",
          prop: "recommenderAreaName",
          fixed: false,
          overflow: true
        },
        {
          label: "推荐人类型",
          prop: "recommenderTypeName",
          fixed: false,
          overflow: true
        },
        {
          label: "推荐人所属业务员",
          prop: "recommenderSalesmanName",
          fixed: false,
          overflow: true
        },
        {
          label: "奖励金额",
          prop: "rewardMoney",
          fixed: false,
          overflow: true
        },
        {
          label: "奖励类型",
          prop: "tradeTypeName",
          fixed: false,
          overflow: true
        },
        {
          label: "奖励时间",
          prop: "tradeTypeTimeNow",
          fixed: false,
          overflow: true
        }
      ]
    };
  },
  watch: {},
  mounted() {
    this.firstblood();
  },
  beforeDestroy() {},
  methods: {
    handlePageChange(obj) {
      this.listSystemObj.currentPage = obj.pageNum;
      this.listSystemObj.pageSize = obj.pageSize;
      this.firstblood();
    },
    handleSearch(type) {
      this.listSystemObj.vo.tradeEndTime = this.chooseTime
        ? this.chooseTime[1]
        : "";
      this.listSystemObj.vo.tradeStartTime = this.chooseTime
        ? this.chooseTime[0]
        : "";
      if (type == "clear") {
        this.listSystemObj.vo = {
          recommendederAreaName: "", //被推荐人所在地
          recommenderNameOrPhoneOrPlateNumber: "", //推荐人
          tradeStartTime: "", //奖励结束时间
          tradeEndTime: "" //奖励开始时间
        };
        this.chooseTime = [];
      }
      if (this.listSystemObj.currentPage != 1) {
        this.listSystemObj.currentPage = 1;
        this.$refs.pager.inputval = this.listSystemObj.currentPage;
        this.$refs.pager.pageNum = this.listSystemObj.currentPage;
      }
      this.firstblood();
    },
    // 刷新页面
    firstblood() {
      this.loading = true;
      ExpenditureRecommendRewordList(this.listSystemObj)
        .then(res => {
          this.tableData = res.data.list;
          this.tableData.forEach(el => {
            el.tradeTypeTimeNow = parseTime(el.tradeTime);
          });
          this.totalCount = res.data.totalCount;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    importExcel() {
      this.$message.info("正在导出中...");
      ExpenditureRecommendRewordListExcel(0, 0, this.listSystemObj.vo).then(
        res => {
          var blob = new Blob([res]);
          this.href = window.URL.createObjectURL(blob);
          var NewDom = document.createElement("a");
          NewDom.setAttribute("href", this.href);
          NewDom.setAttribute("target", "_blank");
          NewDom.setAttribute("download", "推荐奖励.xls");
          document.body.appendChild(NewDom);
          NewDom.click();
          document.body.removeChild(NewDom);
        }
      );
    }
  }
};
</script>

<style type="text/css" lang="scss" scoped>
.RecommendReword {
  height: 100%;
}
</style>
