<template>
  <div class="identicalStyle salespersonTotal" v-loading="loading">
    <el-form
      :inline="true"
      :model="formData"
      ref="ruleForm"
      class="demo-ruleForm classify_searchinfo"
    >
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
      <el-form-item v-if="formData.timeQueryType == '5'">
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
      <el-form-item class="btnChoose fr" style="margin-left:0;">
        <el-button
          type="primary"
          icon="el-icon-download"
          plain
          :size="btnsize"
          @click="exportExcel()"
          v-has:DATA_CENTER_BUSINESS_DEVELOP_SUM_EXPORT_EXCEL
        >导出Excel</el-button>
      </el-form-item>
    </el-form>
    <div class="classify_info">
      <div class="salespersonTotalH2">{{BeginTime}} 至 {{EndTimeTime}}{{belongCityName}}业务发展情况</div>
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
          <el-table-column prop="groupName" label="业务区" show-overflow-tooltip></el-table-column>
          <el-table-column prop="salesmanName" label="业务人员" show-overflow-tooltip></el-table-column>
          <el-table-column label="业务信息汇总">
            <el-table-column label="发展车主数">
              <el-table-column prop="driverNoAuthCount" label="未认证" sortable>
                <template slot-scope="scope">
                  <h4
                    class="needMoreInfo"
                    @click="showDetailPage(scope.row,'AF0010401','发展车主数')"
                  >{{ scope.row.driverNoAuthCount}}</h4>
                </template>
              </el-table-column>
              <el-table-column prop="driverWaitAuthCount" label="待认证" sortable>
                <template slot-scope="scope">
                  <h4
                    class="needMoreInfo"
                    @click="showDetailPage(scope.row,'AF0010402','发展车主数')"
                  >{{ scope.row.driverWaitAuthCount}}</h4>
                </template>
              </el-table-column>
              <el-table-column prop="driverHaveAuthCount" label="已认证" sortable>
                <template slot-scope="scope">
                  <h4
                    class="needMoreInfo"
                    @click="showDetailPage(scope.row,'AF0010403','发展车主数')"
                  >{{ scope.row.driverHaveAuthCount}}</h4>
                </template>
              </el-table-column>
              <el-table-column prop="driverUnPassAuthCount" label="认证未通过" sortable>
                <template slot-scope="scope">
                  <h4
                    class="needMoreInfo"
                    @click="showDetailPage(scope.row,'AF0010404','发展车主数')"
                  >{{ scope.row.driverUnPassAuthCount}}</h4>
                </template>
              </el-table-column>
              <el-table-column prop="driverPersonalSumCount" label="个人汇总" sortable>
                <!-- <template slot-scope="scope">
                  <h4
                    class="needMoreInfo"
                    @click="showDetailPage(scope.row,null,'发展车主数')"
                  >{{ scope.row.driverPersonalSumCount}}</h4>
                </template>-->
              </el-table-column>
            </el-table-column>
            <el-table-column prop label="发展货主数">
              <el-table-column prop="shipperNoAuthCount" label="未认证" sortable>
                <template slot-scope="scope">
                  <h4
                    class="needMoreInfo"
                    @click="showDetailPage(scope.row,'AF0010401','发展货主数')"
                  >{{ scope.row.shipperNoAuthCount}}</h4>
                </template>
              </el-table-column>
              <el-table-column prop="shipperWaitAuthCount" label="待认证" sortable>
                <template slot-scope="scope">
                  <h4
                    class="needMoreInfo"
                    @click="showDetailPage(scope.row,'AF0010402','发展货主数')"
                  >{{ scope.row.shipperWaitAuthCount}}</h4>
                </template>
              </el-table-column>
              <el-table-column prop="shipperHaveAuthCount" label="已认证" sortable>
                <template slot-scope="scope">
                  <h4
                    class="needMoreInfo"
                    @click="showDetailPage(scope.row,'AF0010403','发展货主数')"
                  >{{ scope.row.shipperHaveAuthCount}}</h4>
                </template>
              </el-table-column>
              <el-table-column prop="shipperUnPassAuthCount" label="认证未通过" sortable>
                <template slot-scope="scope">
                  <h4
                    class="needMoreInfo"
                    @click="showDetailPage(scope.row,'AF0010404','发展货主数')"
                  >{{ scope.row.shipperUnPassAuthCount}}</h4>
                </template>
              </el-table-column>
              <el-table-column prop="shipperPersonalSumCount" label="个人汇总" sortable>
                <!-- <template slot-scope="scope">
                  <h4
                    class="needMoreInfo"
                    @click="showDetailPage(scope.row,null,'发展货主数')"
                  >{{ scope.row.shipperPersonalSumCount}}</h4>
                </template>-->
              </el-table-column>
            </el-table-column>
            <el-table-column prop label="订单数">
              <el-table-column prop="orderFinishCount" label="在线已完成" sortable>
                <template slot-scope="scope">
                  <h4
                    class="needMoreInfo"
                    @click="showOrderDetailPage(scope.row,'AF00807')"
                  >{{ scope.row.orderFinishCount}}</h4>
                </template>
              </el-table-column>
              <el-table-column prop="orderCancelCount" label="已取消" sortable>
                <template slot-scope="scope">
                  <h4
                    class="needMoreInfo"
                    @click="showOrderDetailPage(scope.row,'AF00808')"
                  >{{ scope.row.orderCancelCount}}</h4>
                </template>
              </el-table-column>
              <el-table-column prop="orderPersonalSumCount" label="个人汇总" sortable>
                <!-- <template slot-scope="scope">
                  <h4
                    class="needMoreInfo"
                    @click="showOrderDetailPage(scope.row,null)"
                  >{{ scope.row.orderPersonalSumCount}}</h4>
                </template>-->
              </el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <h3 class="totalsum">总共 {{totalsum}} 条</h3>
    </div>
  </div>
</template>


<script>
import { parseTime, pickerOptions2 } from "@/utils/index.js";
import getCityList from "@/components/GetCityList/index";
import {
  data_post_findBusinessDevelopCaseList,
  data_post_exportBusinessDevelopCaseExcel
} from "@/api/dataCenter/salespersonTotal/developTotal";
export default {
  components: {
    getCityList
  },
  data() {
    return {
      loading: true,
      btnsize: "mini",
      chooseTime: [],
      href: "",
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
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      tableData: [],
      formData: {
        cityName: "广州市",
        provinceName: "广东省",
        queryBeginTime: "",
        queryEndTime: "",
        timeQueryType: "1"
      },
      BeginTime: null,
      EndTimeTime: null,
      totalsum: 0
    };
  },
  methods: {
    firstblood() {
      this.loading = true;
      data_post_findBusinessDevelopCaseList(this.formData)
        .then(res => {
          this.tableData = res.data.businessDevelopCaseList;
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
      this.formData.cityName = d.city ? d.city.name : "";
      this.formData.provinceName = d.province ? d.province.name : "";
      this.firstblood();
    },
    getValue(obj) {
      return obj ? obj.value : "";
    },
    setCur(index, value) {
      this.dataType.forEach((el, idx) => {
        idx == index ? (el.iscur = true) : (el.iscur = false);
      });
      this.formData.timeQueryType = value;
      if (value != "5") {
        this.chooseTime = [];
        this.formData.queryBeginTime = "";
        this.formData.queryEndTime = "";
        this.firstblood();
      }
    },
    timeVal(val) {
      if (val) {
        this.formData.queryBeginTime = val[0];
        this.formData.queryEndTime = val[1];
      } else {
        this.formData.queryBeginTime = "";
        this.formData.queryEndTime = "";
      }
      this.firstblood();
    },
    // 导出Excel
    exportExcel() {
      this.$message.info("正在导出中...");
      data_post_exportBusinessDevelopCaseExcel(this.formData).then(res => {
        var blob = new Blob([res]);
        this.href = window.URL.createObjectURL(blob);
        var NewDom = document.createElement("a");
        NewDom.setAttribute("href", this.href);
        NewDom.setAttribute("target", "_blank");
        NewDom.setAttribute(
          "download",
          this.BeginTime +
            "至" +
            this.EndTimeTime +
            this.belongCityName +
            "业务发展情况.xls"
        );
        document.body.appendChild(NewDom);
        NewDom.click();
        document.body.removeChild(NewDom);
      });
    },
    showDetailPage(item, i, routerName) {
      this.$router.push({
        name: routerName,
        query: {
          id: item.salesmanId,
          isHave: null,
          status: i,
          group: item.groupName,
          name: item.salesmanName,
          type: this.formData.timeQueryType,
          start: this.formData.queryBeginTime,
          end: this.formData.queryEndTime
        }
      });
    },
    showOrderDetailPage(item, i) {
      this.$router.push({
        name: "发展货主在线交易订单数",
        query: {
          id: item.salesmanId,
          group: item.groupName,
          name: item.salesmanName,
          status: i,
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
  .classify_info {
    padding-bottom: 0px;
  }
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
    margin-bottom: 10px;
    position: relative;
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
