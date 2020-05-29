<template>
  <div class="identicalStyle developShipper" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="是否有首单">
        <el-select v-model="searchInfo.isHaveFirstOrder" clearable placeholder="请选择" disabled>
          <el-option
            v-for="item in isHaveFirstOrderList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="认证状态">
        <el-select v-model="searchInfo.shipperStatus" clearable placeholder="请选择" disabled>
          <el-option
            v-for="item in shipperStatusList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="margin-right:10px;">
        <ul class="timeLine">
          <li
            v-for="(item,index) in dataType"
            :key="item.name"
            :class="{currentClick:item.iscur}"
            @click="setCur(index,item.value)"
          >
            <span>{{item.name}}</span>
          </li>
        </ul>
      </el-form-item>
      <el-form-item v-if="searchInfo.timeQueryType == '5'">
        <el-date-picker
          v-model="chooseTime"
          @change="searchTime"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="timestamp"
          unlink-panels
          align="right"
          :default-time="['00:00:00', '23:59:59']"
          :clearable="false"
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
        <!-- <el-button
          type="info"
          plain
          @click="clearSearch"
          :size="btnsize"
          icon="fontFamily aflc-icon-qingkong"
        >清空</el-button>-->
      </el-form-item>
    </el-form>
    <div class="classify_info">
      <div class="btns_box" style="font-size:24px">
        <span class="description" style="margin-left:0">业务区：{{group||'无'}}</span>
        <span class="description" style="margin-left:40px">业务员：{{name||'无'}}</span>
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
          <el-table-column label="手机号码" prop="shipperMobile" show-overflow-tooltip min-width="120">
            <template slot-scope="scope">
              <h4
                class="needMoreInfo"
                @click="pushUserDetail(scope.row)"
              >{{ scope.row.shipperMobile}}</h4>
            </template>
          </el-table-column>
          <el-table-column
            label="公司名称"
            sortable
            show-overflow-tooltip
            min-width="180"
            prop="companyName"
          ></el-table-column>
          <el-table-column
            label="联系人"
            prop="shipperName"
            sortable
            show-overflow-tooltip
            min-width="120"
          ></el-table-column>
          <el-table-column
            label="注册来源"
            prop="registerOriginName"
            sortable
            show-overflow-tooltip
            min-width="110"
          ></el-table-column>
          <el-table-column
            label="货主类型"
            prop="shipperTypeName"
            sortable
            show-overflow-tooltip
            min-width="150"
          ></el-table-column>
          <el-table-column
            label="注册所在地"
            prop="regisAddress"
            sortable
            show-overflow-tooltip
            min-width="150"
          ></el-table-column>
          <el-table-column
            label="注册时间"
            prop="registerTime"
            sortable
            show-overflow-tooltip
            min-width="160"
          >
            <template slot-scope="scope">{{scope.row.registerTime|parseTime}}</template>
          </el-table-column>
          <el-table-column
            label="认证状态"
            prop="shipperStatusName"
            sortable
            show-overflow-tooltip
            min-width="110"
          ></el-table-column>
          <el-table-column
            label="认证所在地"
            prop="belongCityName"
            sortable
            show-overflow-tooltip
            min-width="150"
          ></el-table-column>
          <el-table-column
            label="认证通过时间"
            prop="authPassTime"
            sortable
            show-overflow-tooltip
            min-width="160"
          >
            <template slot-scope="scope">{{scope.row.authPassTime|parseTime}}</template>
          </el-table-column>
          <el-table-column
            label="企业地址"
            prop="companyAddress"
            sortable
            show-overflow-tooltip
            min-width="160"
          ></el-table-column>
          <el-table-column label="是否有首单" sortable show-overflow-tooltip min-width="120">
            <template slot-scope="scope">
              <span
                :class="scope.row.isHaveFirstOrder == '1'?'normalName':'blackName'"
              >{{scope.row.isHaveFirstOrder=='1'?'有':'否'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="首单下单时间(已完单)"
            prop="minOrderFinishTime"
            sortable
            show-overflow-tooltip
            min-width="190"
          >
            <template slot-scope="scope">{{scope.row.minOrderFinishTime|parseTime}}</template>
          </el-table-column>
          <el-table-column
            label="完成订单数"
            prop="orderFinishCount"
            sortable
            show-overflow-tooltip
            min-width="120"
          ></el-table-column>
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
import { eventBus } from "@/eventBus";
import Pager from "@/components/Pagination/index";
import { parseTime } from "@/utils/";
import { findSalesmanShipperDevelopDetailList } from "@/api/dataCenter/salespersonTotal/developTotal.js";
export default {
  data() {
    return {
      loading: true,
      btnsize: "mini",
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      dataTotal: 0,
      tableDataAll: [],
      chooseTime: [],
      group: "",
      name: "",
      isHaveFirstOrderList: [
        { name: "全部", code: null },
        { name: "是", code: "1" },
        { name: "否", code: "0" }
      ],
      shipperStatusList: [
        { name: "全部", code: null },
        { name: "未认证", code: "AF0010401" },
        { name: "待认证", code: "AF0010402" },
        { name: "已认证", code: "AF0010403" },
        { name: "认证不通过", code: "AF0010404" }
      ],
      searchInfo: {
        shipperStatus: this.$route.query.status,
        isHaveFirstOrder: this.$route.query.isHave,
        belongSalesmanId: this.$route.query.id,
        timeQueryType: this.$route.query.type,
        queryBeginTime: this.$route.query.start,
        queryEndTime: this.$route.query.end
      },
      dataType: [
        { name: "今天", value: "1", iscur: true },
        { name: "昨天", value: "2", iscur: false },
        { name: "本周", value: "3", iscur: false },
        { name: "本月", value: "4", iscur: false },
        { name: "指定时间段", value: "5", iscur: false }
      ]
    };
  },
  components: {
    Pager
  },
  watch: {
    $route(to, from) {
      if (
        (from.name == "营销人员业务提成汇总" ||
          from.name == "营销人员业务发展汇总") &&
        to.name == "发展货主数"
      ) {
        if (Object.keys(this.$route.query).length !== 0) {
          this.searchInfo.belongSalesmanId = this.$route.query.id;
          this.init();
        }
      }
    }
  },
  methods: {
    setCur(index, value) {
      this.dataType.forEach((el, idx) => {
        idx == index ? (el.iscur = true) : (el.iscur = false);
      });
      this.searchInfo.timeQueryType = value;
      if (value != "5") {
        this.chooseTime = [];
        this.searchInfo.queryBeginTime = "";
        this.searchInfo.queryEndTime = "";
        this.firstblood();
      }
    },
    searchTime(i) {
      if (i) {
        this.searchInfo.queryBeginTime = i[0];
        this.searchInfo.queryEndTime = i[1];
      } else {
        this.searchInfo.queryBeginTime = "";
        this.searchInfo.queryEndTime = "";
      }
      this.firstblood();
    },
    // 列表刷新页面
    firstblood() {
      this.loading = true;
      findSalesmanShipperDevelopDetailList(
        this.page,
        this.pagesize,
        this.searchInfo
      )
        .then(res => {
          this.dataTotal = res.data.totalCount;
          this.tableDataAll = res.data.list;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$message.error(err.errorInfo || err.text);
        });
    },
    //查询
    getData_query() {
      this.page = 1;
      this.$refs.pager.inputval = this.page;
      this.$refs.pager.pageNum = this.page;
      this.firstblood();
    },
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    pushUserDetail(item) {
      this.$router.push({
        name: "货主详情",
        query: { userId: item.shipperId }
      });
    },
    init() {
      this.dataType.forEach((el, idx) => {
        el.value == this.$route.query.type
          ? (el.iscur = true)
          : (el.iscur = false);
      });
      this.chooseTime = this.$route.query.start
        ? [this.$route.query.start, this.$route.query.end]
        : [];
      this.searchInfo = {
        shipperStatus: this.$route.query.status,
        isHaveFirstOrder: this.$route.query.isHave,
        belongSalesmanId: this.$route.query.id,
        timeQueryType: this.$route.query.type,
        queryBeginTime: this.$route.query.start,
        queryEndTime: this.$route.query.end
      };
      this.group = this.$route.query.group;
      this.name = this.$route.query.name;
      this.firstblood();
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="scss" scoped>
.developShipper {
  .timeLine {
    overflow: hidden;
    padding-top: 2px;
    .currentClick {
      color: #1890ff;
    }
    li {
      float: left;
      font-size: 16px;
      cursor: pointer;
      span {
        border-right: 1px solid #000;
        padding: 0 10px;
      }
    }
    li:last-child span {
      border-right: 0 none;
    }
  }
}
</style>

