<template>
  <div class="identicalStyle ShipperBusinessReword" v-loading="loading">
    <el-form
      :inline="true"
      :model="listSystemObj"
      ref="ruleForm"
      class="demo-ruleForm classify_searchinfo"
    >
      <el-form-item label="订单所属区域" prop="orderAreaName">
        <el-input v-model="listSystemObj.vo.orderAreaName" clearable></el-input>
      </el-form-item>
      <el-form-item label="货主推荐人" prop="userRecommenderPhoneOrNameOrPlateNumber">
        <el-input v-model="listSystemObj.vo.userRecommenderPhoneOrNameOrPlateNumber" clearable></el-input>
      </el-form-item>
      <el-form-item label="订单号" prop="orderNum">
        <el-input v-model="listSystemObj.vo.orderNum" clearable></el-input>
      </el-form-item>
      <el-form-item label="交易时间" prop="chooseTime">
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
          @click="importExcel"
          v-has:MARKETING_DISTRIBUTION_EXPENCE_SHIPPER_BUSINESS_REWARD_EXPORT_EXCEL
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
          v-has:MARKETING_DISTRIBUTION_EXPENCE_SHIPPER_BUSINESS_REWARD_LIST
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
    <div class="info_tab_footer" v-has:MARKETING_DISTRIBUTION_EXPENCE_SHIPPER_BUSINESS_REWARD_LIST>
      共计:{{ totalCount }}
      <div class="show_pager">
        <Pager :total="totalCount" @change="handlePageChange" ref="pager" />
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { ShipperBusinessRewordList, ShipperBusinessRewordListExcel} from "@/api/marketing/distribution";
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
          orderAreaName: "", //订单所属区域
          orderNum: "", //订单号
          userRecommenderPhoneOrNameOrPlateNumber: "", //货主/车主推荐人
          // rewardType:'AF06401',//奖励类型（AF06401：奖励推荐货主的用户，AF06402：奖励推荐车主的用户）
          tradeStartTime: "", //交易开始时间
          tradeEndTime: "" //交易结束时间
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
          label: "订单号",
          prop: "orderNum",
          width: "250",
          fixed: false,
          overflow: true,
          click: function(row) {
            // console.log('row',row)
            this.$router.push({
              name: "订单详情",
              query: { orderSerial: row.orderNum }
            });
          }.bind(this),
          slot: scope => {
            return '<h4 class="moreInfo">' + scope.row.orderNum + "</h4>";
          }
        },
        {
          label: "服务类型",
          prop: "serviceClassifyName",
          fixed: false,
          overflow: true
        },
        {
          label: "订单所属区域",
          prop: "orderAreaName",
          fixed: false,
          overflow: true
        },
        {
          label: "货主推荐人",
          prop: "userRecommenderName",
          fixed: false,
          overflow: true
        },
        {
          label: "推荐人用户类型",
          prop: "recommenderUserTypeName",
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
          label: "推荐人所属的业务员",
          prop: "recommenderSalesmanName",
          fixed: false,
          overflow: true
        },
        {
          label: "下单货主",
          prop: "orderShipperName",
          fixed: false,
          overflow: true
        },
        {
          label: "接单车主",
          prop: "orderDriverName",
          fixed: false,
          overflow: true
        },
        {
          label: "订单金额",
          prop: "orderMoney",
          fixed: false,
          overflow: true
        },
        {
          label: "付款方式",
          prop: "payWayName",
          fixed: false,
          overflow: true
        },
        {
          label: "交易时间",
          prop: "tradeTimeNew",
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
      this.listSystemObj.vo.tradeStartTime = this.chooseTime
        ? this.chooseTime[0]
        : "";
      this.listSystemObj.vo.tradeEndTime = this.chooseTime
        ? this.chooseTime[1]
        : "";
      if (type == "clear") {
        this.listSystemObj.vo = {
          orderAreaName: "", //订单所属区域
          orderNum: "", //订单号
          userRecommenderPhoneOrNameOrPlateNumber: "", //货主/车主推荐人
          // rewardType:'AF06401',//奖励类型（AF06401：奖励推荐货主的用户，AF06402：奖励推荐车主的用户）
          tradeStartTime: "", //交易开始时间
          tradeEndTime: "" //交易结束时间
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
      ShipperBusinessRewordList(this.listSystemObj)
        .then(res => {
          this.tableData = res.data.list;
          this.tableData.forEach(el => {
            el.tradeTimeNew = parseTime(el.tradeTime);
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
      ShipperBusinessRewordListExcel(0, 0, this.listSystemObj.vo).then(res => {
        var blob = new Blob([res]);
        this.href = window.URL.createObjectURL(blob);
        var NewDom = document.createElement("a");
        NewDom.setAttribute("href", this.href);
        NewDom.setAttribute("target", "_blank");
        NewDom.setAttribute("download", "小货车推荐货主业务奖励.xls");
        document.body.appendChild(NewDom);
        NewDom.click();
        document.body.removeChild(NewDom);
      });
    }
  }
};
</script>

<style type="text/css" lang="scss" scoped>
.ShipperBusinessReword {
  height: 100%;
}
</style>
