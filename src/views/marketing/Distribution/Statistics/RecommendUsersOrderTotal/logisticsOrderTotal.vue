<template>
  <div class="identicalStyle RecommendUsersOrderTotal" v-loading="loading">
    <el-form
      :inline="true"
      :model="listSystemObj"
      ref="ruleForm"
      class="demo-ruleForm classify_searchinfo"
    >
      <el-form-item label="发货地" prop="orderAreaName">
        <el-input v-model="listSystemObj.vo.orderAreaName" clearable></el-input>
      </el-form-item>
      <el-form-item label="揽货时间" prop="chooseTime">
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
      <el-form-item label="运单号" prop="orderSerial">
        <el-input v-model="listSystemObj.vo.orderSerial" clearable></el-input>
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
          @click="importExcel"
          v-has:MARKETING_DISTRIBUTION_STATISTICAL_RECOMMENDED_USEORDER_SUM_EXPORT_EXCEL
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
  lclRecommendUsersOrderTotal,
  lclRecommendUsersOrderTotalExcel
} from "@/api/marketing/distribution";
import Pager from "@/components/Pagination/index";
import { objectMerge2, parseTime } from "@/utils/";
import { SaveAsFile } from "@/utils/lodopFuncs";

export default {
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
          orderAreaName: "", //订单所属区域名称
          orderSerial: "", //订单流水号
          useStartTime: "", //下单开始时间
          useEndTime: "" //下单结束时间
        }
      },
      chooseTime: [],
      tableData: [],
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
          label: "运单号",
          prop: "orderSerial",
          width: "250",
          fixed: false,
          overflow: true,
          click: function(row) {
            // console.log('row',row)
            this.$router.push({
              name: "发物流订单详情",
              query: { orderSerial: row.orderSerial }
            });
          }.bind(this),
          slot: scope => {
            return '<h4 class="moreInfo">' + scope.row.orderSerial + "</h4>";
          }
        },
        {
          label: "服务类型",
          prop: "serviceClassifyName",
          fixed: false,
          width: "150",
          overflow: true
        },
        {
          label: "发货地",
          prop: "orderAreaName",
          width: "150",
          fixed: false,
          overflow: true
        },
        {
          label: "货主推荐人",
          prop: "shipperRecommenderName",
          width: "200",
          fixed: false,
          overflow: true
        },
        {
          label: "货主推荐人用户类型",
          prop: "shipperRecommenderUserTypeName",
          width: "150",
          fixed: false,
          overflow: true
        },
        {
          label: "货主推荐人所属的业务员",
          prop: "shipperRecommenderSalesmanName",
          width: "200",
          fixed: false,
          overflow: true
        },
        {
          label: "下单货主",
          prop: "orderShipperName",
          width: "200",
          fixed: false,
          overflow: true
        },
        {
          label: "区代",
          prop: "agencyName",
          width: "200",
          fixed: false,
          overflow: true
        },
        {
          label: "区代物流公司",
          prop: "agencyCompanyName",
          width: "200",
          fixed: false,
          overflow: true
        },
        {
          label: "运单状态",
          prop: "orderStatusName",
          width: "150",
          fixed: false,
          overflow: true
        },
        {
          label: "运费总金额",
          prop: "totalAmount",
          width: "150",
          fixed: false,
          overflow: true
        },
        {
          label: "支付方式",
          prop: "payAccountTypeName",
          width: "150",
          fixed: false,
          overflow: true
        },
        {
          label: "揽货时间",
          prop: "useTimeNow",
          width: "160",
          fixed: false,
          overflow: true
        }
      ]
    };
  },
  watch: {},
  mounted() {
    setTimeout(() => {
      this.$refs.multipleTable.$el.style.height =
        this.$refs.multipleTable.$el.offsetHeight + "px";
    }, 300);
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
      this.listSystemObj.vo.useStartTime = this.chooseTime
        ? this.chooseTime[0]
        : "";
      this.listSystemObj.vo.useEndTime = this.chooseTime
        ? this.chooseTime[1]
        : "";
      if (type == "clear") {
        this.listSystemObj.vo = {
          orderAreaName: "", //订单所属区域名称
          orderSerial: "", //订单流水号
          useStartTime: "", //下单开始时间
          useEndTime: "" //下单结束时间
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
      lclRecommendUsersOrderTotal(this.listSystemObj)
        .then(res => {
          this.totalCount = res.data.totalCount;
          let currentData = objectMerge2(res.data.list);
          currentData.forEach(el => {
            el.useTimeNow = parseTime(el.useTime);
          });
          this.tableData = currentData;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    importExcel() {
      this.$message.info("正在导出中...");
      lclRecommendUsersOrderTotalExcel(0, 0, this.listSystemObj.vo).then(
        res => {
          var blob = new Blob([res]);
          this.href = window.URL.createObjectURL(blob);
          var NewDom = document.createElement("a");
          NewDom.setAttribute("href", this.href);
          NewDom.setAttribute("target", "_blank");
          NewDom.setAttribute("download", "发物流推荐用户订单汇总.xls");
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
.RecommendUsersOrderTotal {
  height: 100%;
}
</style>
