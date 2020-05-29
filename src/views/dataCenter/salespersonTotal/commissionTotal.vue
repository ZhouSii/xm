<template>
  <div class="identicalStyle salespersonTotal" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="区域" prop="belongCityName">
        <getCityList class="chooseItem" @returnStr="getStr" v-model="belongCityName" ref="area"></getCityList>
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
          @change="timeVal"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          unlink-panels
          value-format="timestamp"
          align="right"
          :default-time="['00:00:00', '23:59:59']"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div class="classify_info">
      <div class="salespersonTotalH2">{{BeginTime}} 至 {{EndTimeTime}}{{belongCityName}}业务提成汇总</div>
      <div class="info_news">
        <el-table
          ref="multipleTable"
          id="out-table"
          :data="tableData"
          stripe
          border
          align="center"
          tooltip-effect="dark"
          height="100%"
          style="width: 100%"
        >
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="groupName" label="业务区" min-with="120"></el-table-column>
          <el-table-column prop="salesmanName" label="业务人员" min-with="120"></el-table-column>
          <el-table-column prop label="业务指标">
            <el-table-column prop label="发展车主数">
              <el-table-column prop label="已认证且本月无首单">
                <el-table-column prop="driverAuthNoOderCount" label="数量" min-with="100" sortable>
                  <template slot-scope="scope">
                    <h4
                      class="needMoreInfo"
                      @click="showDetailPage(scope.row,'0','发展车主数')"
                    >{{ scope.row.driverAuthNoOderCount}}</h4>
                  </template>
                </el-table-column>
                <el-table-column prop label="单个提成标准" min-with="120" sortable></el-table-column>
              </el-table-column>
              <el-table-column prop label="已认证且本月有首单">
                <el-table-column prop="driverAuthHaveOderCount" label="数量" min-with="100" sortable>
                  <template slot-scope="scope">
                    <h4
                      class="needMoreInfo"
                      @click="showDetailPage(scope.row,'1','发展车主数')"
                    >{{ scope.row.driverAuthHaveOderCount}}</h4>
                  </template>
                </el-table-column>
                <el-table-column prop label="单个提成标准" min-with="120" sortable></el-table-column>
              </el-table-column>
            </el-table-column>
            <el-table-column prop label="发展货主数">
              <el-table-column prop label="已认证且本月无首单">
                <el-table-column prop="shipperAuthNoOderCount" label="数量" min-with="100" sortable>
                  <template slot-scope="scope">
                    <h4
                      class="needMoreInfo"
                      @click="showDetailPage(scope.row,'0','发展货主数')"
                    >{{ scope.row.shipperAuthNoOderCount}}</h4>
                  </template>
                </el-table-column>
                <el-table-column prop label="单个提成标准" min-with="120" sortable></el-table-column>
              </el-table-column>
              <el-table-column prop label="已认证且本月有首单">
                <el-table-column prop="shipperAuthHaveOderCount" label="数量" min-with="100" sortable>
                  <template slot-scope="scope">
                    <h4
                      class="needMoreInfo"
                      @click="showDetailPage(scope.row,'1','发展货主数')"
                    >{{ scope.row.shipperAuthHaveOderCount}}</h4>
                  </template>
                </el-table-column>
                <el-table-column prop label="单个提成标准" min-with="120" sortable></el-table-column>
              </el-table-column>
            </el-table-column>
            <el-table-column prop label="货主在线交易订单数">
              <el-table-column prop="onlineTradeCount" label="数量" min-with="100" sortable>
                <template slot-scope="scope">
                  <h4
                    class="needMoreInfo"
                    @click="showOrderDetailPage(scope.row)"
                  >{{ scope.row.onlineTradeCount}}</h4>
                </template>
              </el-table-column>
              <el-table-column prop label="单个提成标准" min-with="120" sortable></el-table-column>
            </el-table-column>
            <el-table-column prop label="个人提成总计" min-with="120" sortable></el-table-column>
            <el-table-column prop label="业务组提成总计" sortable></el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <h3 class="totalsum">总共 {{totalsum}} 条</h3>
    </div>
  </div>
</template>


<script>
import { parseTime, pickerOptions2 } from "@/utils/index.js";
import { getDictionary } from "@/api/common.js";
import getCityList from "@/components/GetCityList/index";
import { data_post_findSalesmanNamePercentageList } from "@/api/dataCenter/salespersonTotal/developTotal";
export default {
  components: {
    getCityList
  },
  data() {
    return {
      loading: true,
      btnsize: "mini",
      chooseTime: [],
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      belongCityName: "广东省广州市",
      dataType: [
        { name: "今天", value: "1", iscur: true },
        { name: "昨天", value: "2", iscur: false },
        { name: "本周", value: "3", iscur: false },
        { name: "本月", value: "4", iscur: false },
        { name: "指定时间段", value: "5", iscur: false }
      ],
      searchInfo: {
        cityName: "广州市",
        provinceName: "广东省",
        queryBeginTime: "",
        queryEndTime: "",
        timeQueryType: "1"
      },
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      BeginTime: null,
      EndTimeTime: null,
      totalsum: 0,
      tableData: []
    };
  },
  methods: {
    firstblood() {
      this.loading = true;
      data_post_findSalesmanNamePercentageList(this.searchInfo)
        .then(res => {
          this.tableData = res.data.salesmanNamePercentageList;
          this.BeginTime = parseTime(res.data.queryBeginTime, "{y}-{m}-{d}");
          this.EndTimeTime = parseTime(res.data.queryEndTime, "{y}-{m}-{d}");
          this.totalsum = res.data.size;
          this.loading = false;
        })
        .catch(err => {
          this.$message.error("获取数据失败");
          this.loading = false;
        });
    },
    getStr(d) {
      this.belongCityName =
        !d.province && !d.city && !d.area
          ? ""
          : `${this.getValue(d.province)}${this.getValue(
              d.city
            )}${this.getValue(d.area)}`.trim();
      this.searchInfo.cityName = d.city ? d.city.name : "";
      this.searchInfo.provinceName = d.province ? d.province.name : "";
      this.firstblood();
    },
    getValue(obj) {
      return obj ? obj.value : "";
    },
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
    timeVal(val) {
      if (val) {
        this.searchInfo.queryBeginTime = val[0];
        this.searchInfo.queryEndTime = val[1];
      } else {
        this.searchInfo.queryBeginTime = "";
        this.searchInfo.queryEndTime = "";
      }
      this.firstblood();
    },
    showDetailPage(item, i, routerName) {
      this.$router.push({
        name: routerName,
        query: {
          id: item.belongSalesmanId,
          isHave: i,
          status: "AF0010403",
          group: item.groupName,
          name: item.salesmanName,
          type: this.searchInfo.timeQueryType,
          start: this.searchInfo.queryBeginTime,
          end: this.searchInfo.queryEndTime
        }
      });
    },
    showOrderDetailPage(item) {
      this.$router.push({
        name: "发展货主在线交易订单数",
        query: {
          id: item.belongSalesmanId,
          group: item.groupName,
          name: item.salesmanName,
          status: "AF00807",
          start: this.BeginTime,
          end: this.EndTimeTime
        }
      });
    }
  },
  mounted() {
    this.firstblood();
  }
};
</script>

<style type="text/css" lang="scss" scoped>
.salespersonTotal {
  .classify_searchinfo {
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
  .salespersonTotalH2 {
    text-align: center;
    font-size: 28px;
    line-height: 50px;
  }
  .fixedExcel {
    position: absolute;
    left: 0px;
    top: 0px;
  }
  .totalsum {
    text-align: left;
    line-height: 50px;
  }
}
</style>
