<template>
  <div class="identicalStyle RankingTotal" v-loading="loading">
    <el-form inline class="demo-ruleForm classify_searchinfo">
      <el-form-item label="所属区域">
        <GetCityList ref="area" v-model="formAllData.areaName" @returnStr="getStr"></GetCityList>
      </el-form-item>
      <el-form-item label="业务组">
        <businessGroup
          @inputObject="getObject"
          v-model="formAllData.groupName"
          ref="businessGroup"
        />
      </el-form-item>
      <el-form-item label="业务员">
        <selectBelong
          :groupCode="formAllData.groupCode"
          :belongSalesman="formAllData.belongSalesmanMobile"
          @returnBelong="(value)=>{getReturnBelong(value)}"
          ref="selectBelong"
        />
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
      <el-form-item v-if="formAllData.timeQueryType == '5'">
        <el-date-picker
          v-model="chooseTime"
          @change="timeVal"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          unlink-panels
          align="right"
          :default-time="['00:00:00', '23:59:59']"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="注册时间">
        <el-date-picker
          @change="zctimeVal"
          v-model="zctime"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          unlink-panels
          align="right"
          :default-time="['00:00:00', '23:59:59']"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="认证时间">
        <el-date-picker
          @change="rztimeVal"
          v-model="rztime"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          unlink-panels
          align="right"
          :default-time="['00:00:00', '23:59:59']"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="货主类型">
        <el-select v-model="formAllData.shipperType" placeholder="请选择" @change="shipperChange">
          <el-option
            v-for="item in shipperType"
            :key="item.code"
            :label="item.name"
            :value="item.code"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="fr">
        <!-- <el-button type="primary" plain @click="getData_query"  :size="btnsize" icon="el-icon-search">搜索</el-button> -->
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
          v-has:DATA_CENTER_SHIPPER_LEADERBOARD_EXCEL
        >导出Excel</el-button>
      </div>
      <div class="info_news">
        <el-table
          ref="multipleTable"
          style="width: 100%"
          stripe
          border
          height="98%"
          highlight-current-row
          :data="tableDataAll"
          tooltip-effect="dark"
        >
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column label="所属区域" show-overflow-tooltip>
            <template
              slot-scope="scope"
            >{{scope.row.provinceName+scope.row.cityName+scope.row.areaName}}</template>
          </el-table-column>
          <el-table-column label="注册时间" prop="registerTime" sortable show-overflow-tooltip></el-table-column>
          <el-table-column label="认证时间" prop="authPassTime" sortable show-overflow-tooltip></el-table-column>
          <el-table-column label="首单完成时间" prop="minOrderFinishTime" sortable show-overflow-tooltip></el-table-column>
          <el-table-column label="最后下单时间" prop="maxOrderFinishTime" sortable show-overflow-tooltip></el-table-column>
          <el-table-column label="货主姓名" prop="shipperName" sortable show-overflow-tooltip></el-table-column>
          <el-table-column label="货主类型" prop="shipperTypeName" sortable show-overflow-tooltip></el-table-column>
          <el-table-column label="手机号" prop="shipperMobile" sortable show-overflow-tooltip></el-table-column>
          <el-table-column label="公司名称" prop="companyName" sortable show-overflow-tooltip></el-table-column>
          <el-table-column label="企业地址" sortable show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="needMoreInfo" @click="pushOrderSerial">{{scope.row.companyAddress}}</span>
            </template>
          </el-table-column>
          <el-table-column label="所属业务组" prop="groupName" sortable show-overflow-tooltip></el-table-column>
          <el-table-column label="所属业务员" prop="belongSalesmanName" sortable show-overflow-tooltip></el-table-column>
          <el-table-column label="完成单数" prop="orderFinishCount" sortable show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="needMoreInfo normalName">{{scope.row.orderFinishCount}}</span>
            </template>
          </el-table-column>
          <el-table-column label="取消单数" prop="orderCancelCount" sortable show-overflow-tooltip>
            <template slot-scope="scope">
              <span
                class="needMoreInfo"
                style="color:red;font-weight:bold"
              >{{scope.row.orderCancelCount}}</span>
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
<script type="text/javascript">
import { parseTime, pickerOptions2 } from "@/utils/index.js";
import { getDictionary } from "@/api/common.js";
import GetCityList from "@/components/GetCityList/city";
import {
  findShipperOrderSortList,
  exportShipperOrderSortExcel
} from "@/api/dataCenter/ranking";
import Pager from "@/components/Pagination/index";
import selectBelong from "@/views/users/shipper/selectBelong";
import businessGroup from "@/components/selectTree/businessGroup";
export default {
  data() {
    return {
      loading: true,
      btnsize: "mini",
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      dataTotal: 0,
      tableDataAll: [],
      chooseTime: [],
      zctime: [],
      rztime: [],
      dataType: [
        { name: "今天", value: "1", iscur: true },
        { name: "昨天", value: "2", iscur: false },
        { name: "本周", value: "3", iscur: false },
        { name: "本月", value: "4", iscur: false },
        { name: "指定时间段", value: "5", iscur: false }
      ],
      shipperType: [],
      formAllData: {
        areaName: null,
        queryBeginTime: null,
        queryEndTime: null,
        registerBeginTime: null,
        registerEndTime: null,
        authPassBeginTime: null,
        authPassEndTime: null,
        timeQueryType: "1",
        groupName: null,
        groupCode: null,
        belongSalesmanName: null,
        belongSalesman: null,
        belongSalesmanMobile: null
      },
      href: ""
    };
  },
  components: {
    GetCityList,
    Pager,
    selectBelong,
    businessGroup
  },
  methods: {
    // 获取数据字典
    getMoreInformation() {
      getDictionary("AF00101").then(res => {
        this.shipperType = res.data;
      });
    },
    firstblood() {
      this.loading = true;
      findShipperOrderSortList(this.page, this.pagesize, this.formAllData)
        .then(res => {
          this.dataTotal = res.data.totalCount;
          this.tableDataAll = res.data.list;
          this.tableDataAll.forEach(item => {
            item.registerTime = parseTime(
              item.registerTime,
              "{y}-{m}-{d} {h}:{i}:{s}"
            );
            item.authPassTime = parseTime(
              item.authPassTime,
              "{y}-{m}-{d} {h}:{i}:{s}"
            );
            item.minOrderFinishTime = parseTime(
              item.minOrderFinishTime,
              "{y}-{m}-{d} {h}:{i}:{s}"
            );
            item.maxOrderFinishTime = parseTime(
              item.maxOrderFinishTime,
              "{y}-{m}-{d} {h}:{i}:{s}"
            );
          });
          this.loading = false;
        })
        .catch(err => {
          if (err.errorInfo.indexOf("空") !== "-1") {
            this.$message.error("指定时间段不能为空");
          }
          this.loading = false;
        });
    },
    getStr(val) {
      this.formAllData.areaName = val.area.name;
      this.firstblood();
    },
    // 指定时间段
    timeVal(i) {
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      if (i) {
        this.formAllData.queryBeginTime = i[0];
        this.formAllData.queryEndTime = i[1];
      } else {
        this.formAllData.queryBeginTime = "";
        this.formAllData.queryEndTime = "";
      }
      this.firstblood();
    },
    // 注册时间段
    zctimeVal(i) {
      if (i) {
        this.formAllData.registerBeginTime = i[0];
        this.formAllData.registerEndTime = i[1];
      } else {
        this.formAllData.registerBeginTime = "";
        this.formAllData.registerEndTime = "";
      }
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.firstblood();
    },
    // 认证时间段
    rztimeVal(i) {
      if (i) {
        this.formAllData.authPassBeginTime = i[0];
        this.formAllData.authPassEndTime = i[1];
      } else {
        this.formAllData.authPassBeginTime = "";
        this.formAllData.authPassEndTime = "";
      }
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.firstblood();
    },
    setCur(index, value) {
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.dataType.forEach((el, idx) => {
        idx == index ? (el.iscur = true) : (el.iscur = false);
      });
      this.formAllData.timeQueryType = value;
      if (value != "5") {
        this.chooseTime = [];
        this.formAllData.queryBeginTime = "";
        this.formAllData.queryEndTime = "";
        this.firstblood();
      }
    },
    shipperChange(i) {
      this.formAllData.shipperType = i;
      this.firstblood();
    },
    // 搜索
    getData_query() {
      this.firstblood();
    },
    // 清空搜索
    clearSearch() {
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.$refs.area.clearData();
      this.dataType.forEach((el, idx) => {
        if (idx == 0) {
          el.iscur = true;
        } else {
          el.iscur = false;
        }
      });
      this.chooseTime = [];
      this.zctime = [];
      this.rztime = [];
      this.formAllData = {
        areaName: null,
        queryBeginTime: null,
        queryEndTime: null,
        registerBeginTime: null,
        registerEndTime: null,
        authPassBeginTime: null,
        authPassEndTime: null,
        timeQueryType: "1",
        groupName: null,
        groupCode: null,
        belongSalesmanName: null,
        belongSalesman: null,
        belongSalesmanMobile: null
      };
      this.firstblood();
    },
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    //   导出excel
    importExcel() {
      this.$message.info("正在导出中...");
      exportShipperOrderSortExcel(0, 0, this.formAllData).then(res => {
        var blob = new Blob([res]);
        this.href = window.URL.createObjectURL(blob);
        var NewDom = document.createElement("a");
        NewDom.setAttribute("href", this.href);
        NewDom.setAttribute("target", "_blank");
        NewDom.setAttribute("download", "货主接单排行榜.xls");
        document.body.appendChild(NewDom);
        NewDom.click();
        document.body.removeChild(NewDom);
      });
    },
    getObject(e) {
      this.formAllData.groupName = e.groupName;
      this.formAllData.groupCode = e.groupCode;
      this.firstblood();
    },
    getReturnBelong(val) {
      this.formAllData.belongSalesmanName = val.name;
      this.formAllData.belongSalesman = val.userId;
      this.formAllData.belongSalesmanMobile = val.mobile;
      this.firstblood();
    },

    // 跳转到货主
    pushOrderSerial() {
      this.$router.push({ name: "货主管理" });
    }
  },
  mounted() {
    this.getMoreInformation();
    this.firstblood();
  }
};
</script>

<style type="text/css" lang="scss">
.RankingTotal {
  .classify_searchinfo {
    .el-input__icon {
      line-height: 30px;
    }
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
}
</style>