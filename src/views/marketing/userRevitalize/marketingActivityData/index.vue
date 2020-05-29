<template>
  <div class="identicalStyle" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="业务类型">
        <el-select v-model="formAllData.businessType" clearable placeholder="请选择">
          <el-option
            v-for="item in businessTypeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="推送用户">
        <el-select v-model="formAllData.userType" clearable placeholder="请选择">
          <el-option
            v-for="item in userTypeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动名称">
        <el-input clearable v-model="formAllData.name"></el-input>
      </el-form-item>
      <el-form-item label="推送时间">
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
      <el-form-item label="手机号">
        <el-input clearable v-model="formAllData.mobile"></el-input>
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
          icon="el-icon-coin"
          plain
          :size="btnsize"
          @click="handleClick('Effect')"
          v-has:MARKETING_USERREVITALIZE_CAMPAIGNDATA_EFFECTANALYSIS
        >效果分析</el-button>
        <el-button
          type="primary"
          :size="btnsize"
          plain
          @click="OutExcel"
          icon="el-icon-download"
          v-has:MARKETING_USERREVITALIZE_CAMPAIGNDATA_EXPORT
        >导出Excel</el-button>
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
          @selection-change="getSelection"
          @row-click="clickDetails"
          tooltip-effect="dark"
        >
          <el-table-column label="选择" type="selection" width="50"></el-table-column>
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column label="活动名称" prop="name" show-overflow-tooltip width="150">
            <!-- <template slot-scope="scope">
                <h4 class="needMoreInfo" @click="JoinDetail(scope.row)">{{scope.row.name}}</h4>
            </template>-->
          </el-table-column>
          <el-table-column
            label="业务类型"
            prop="businessTypeName"
            sortable
            show-overflow-tooltip
            width="120"
          ></el-table-column>
          <el-table-column
            label="推送用户"
            prop="userTypeName"
            sortable
            show-overflow-tooltip
            width="120"
          ></el-table-column>
          <el-table-column label="手机号" prop="mobile" sortable show-overflow-tooltip width="120"></el-table-column>
          <el-table-column label="推送时间" prop="pushTime" sortable show-overflow-tooltip width="220"></el-table-column>
          <el-table-column
            label="推送方式"
            prop="pushTypeName"
            sortable
            show-overflow-tooltip
            width="120"
          ></el-table-column>
          <el-table-column label="已推送次数" prop="pushNum" sortable show-overflow-tooltip width="120"></el-table-column>
          <el-table-column label="推送权益" prop="pushCouponName" sortable show-overflow-tooltip>
            <template slot-scope="scope">
              <h4
                class="needMoreInfo"
                @click="activityNameOperate(scope.row)"
              >{{scope.row.pushCouponName}}</h4>
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
  </div>
</template>
<script>
import {
  aflcMarketingActivityData_list,
  aflcMarketingActivityDataExcel
} from "@/api/marketing/userRevitalize";
import { data_get_couponActive_Id } from "@/api/marketing/shippermarkting/couponActive.js";
import { getDictionary } from "@/api/common.js";
import Pager from "@/components/Pagination/index";
import { parseTime, pickerOptions2 } from "@/utils/";
export default {
  data() {
    return {
      loading: false,
      pickerOptions2: { shortcuts: pickerOptions2 },
      btnsize: "mini",
      selectRowData: [],
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      dataTotal: 0,
      tableDataAll: [],
      formAllData: {
        businessType: null,
        userType: null,
        name: null,
        startTime: null,
        endTime: null,
        mobile: null
      },
      created: [],
      businessTypeList: [], //业务类型
      userTypeList: [
        { name: "货主", code: "AF00101" },
        { name: "车主", code: "AF00102" },
        { name: "物流公司", code: "AF00107" }
      ], //用户类型
      dialogFormVisible_add: false
    };
  },
  props: {
    isvisible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Pager
  },
  methods: {
    // 获取  服务和车辆 类型列表
    getMoreInformation() {
      getDictionary("AF017").then(res => {
        this.businessTypeList = res.data;
      });
    },
    // 推送时间
    cTime(i) {
      if (i) {
        this.formAllData.startTime = i[0];
        this.formAllData.endTime = i[1];
      } else {
        this.formAllData.startTime = "";
        this.formAllData.endTime = "";
      }
    },
    // 列表刷新页面
    firstblood() {
      this.loading = false;
      aflcMarketingActivityData_list(
        this.page,
        this.pagesize,
        this.formAllData
      ).then(res => {
        this.dataTotal = res.data.totalCount;
        this.tableDataAll = res.data.list;
        // this.tableDataAll.forEach(item => {
        //     item.createTime = parseTime(item.createTime,"{y}-{m}-{d} {h}:{i}:{s}");
        // })
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
        businessType: null,
        userType: null,
        name: null,
        startTime: null,
        endTime: null,
        mobile: null
      };
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.created = [];
      this.firstblood();
    },
    // 数据按钮
    DataDetail(i) {},

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
          case "Effect":
            this.$router.push({ name: "货主订单分析" });
            this.$store.state.dataCenter.mobileList = this.selectRowData[0].mobile.split(
              ","
            );
            break;
        }
      }
    },
    activityNameOperate(i) {
      data_get_couponActive_Id(i.pushCoupon).then(res => {
        if (res.data.activityType == "AF046101") {
          this.$router.push({
            name: "优惠券",
            query: { activityId: res.data.id, activityType: "two" }
          });
        } else {
          this.$router.push({
            name: "优惠券",
            query: { activityId: res.data.id, activityType: "one" }
          });
        }
      });
    },
    // 导出Excel
    OutExcel() {
      aflcMarketingActivityDataExcel(this.page, 1000000, this.formAllData).then(
        res => {
          var blob = new Blob([res]);
          this.href = window.URL.createObjectURL(blob);
          var NewDom = document.createElement("a");
          NewDom.setAttribute("href", this.href);
          NewDom.setAttribute("target", "_blank");
          NewDom.setAttribute("download", "营销活动数据.xls");
          document.body.appendChild(NewDom);
          NewDom.click();
          document.body.removeChild(NewDom);
        }
      );
    }
  },

  mounted() {
    this.getMoreInformation();
    if (this.$route.query.name) {
      this.formAllData.name = this.$route.query.name;
    }
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

