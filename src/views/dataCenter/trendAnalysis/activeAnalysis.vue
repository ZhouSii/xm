<template>
  <div class="TwoColumns clearfix" v-loading="loading">
    <div class="columnsContainer">
      <div class="side_right">
        <el-form :inline="true" :model="formData" ref="ruleForm" class size="mini">
          <el-form-item label="时间">
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
          <el-form-item v-if="formData.specifyTime === null">
            <el-date-picker
              v-model="chooseTime"
              @change="timeVal"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              unlink-panels
              align="right"
              value-format="yyyy-MM-dd"
              :default-time="['00:00:00', '23:59:59']"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="业务组">
            <orgTree2
              @inputObject="getObject"
              @clearAnalysisOrderData="getClearAnalysisOrderData"
              ref="businessGroup"
            />
          </el-form-item>
          <el-form-item label="业务员">
            <el-input v-model="formData.userName" clearable></el-input>
          </el-form-item>
          <el-form-item class="btnChoose fr" style="margin-left:0;">
            <el-button type="primary" icon="el-icon-search" :size="btnsize" @click="search()">查询</el-button>
            <el-button
              type="primary"
              icon="el-icon-download"
              plain
              :size="btnsize"
              @click="exportExcel()"
              v-if="$_has_permission($route.name === '货主活跃分析'?'DATA_CENTER_TRENDANALYSIS_SHIPPERANALYSIS_DOWNLOAD':'DATA_CENTER_TRENDANALYSIS_CARANALYSIS_DOWNLOAD')"
            >下载</el-button>
          </el-form-item>
        </el-form>

        <div class="salespersonTotalH2">
          {{BeginTime}} 至 {{EndTimeTime}}
          <span v-if="$route.name === '货主活跃分析'">货主活跃分析</span>
          <span v-if="$route.name === '车主活跃分析'">车主活跃分析</span>
        </div>
        <div class="info_news">
          <el-table
            ref="multipleTable"
            :span-method="objectSpanMethod"
            :data="tableData"
            stripe
            border
            tooltip-effect="dark"
            height="100%"
            style="width: 100%"
          >
            <el-table-column label="所属业务组" prop="groupName" width="350"></el-table-column>
            <el-table-column label="业务员" prop="userName" width="200"></el-table-column>
            <el-table-column label="说明" prop="content" width="300">
              <template slot-scope="scope">
                <div class="info">
                  <div>
                    <span>{{scope.row.timeSpan}}</span>天内新
                    <i v-if="$route.name === '货主活跃分析'">货主</i>
                    <i v-if="$route.name === '车主活跃分析'">车主</i>注册
                    <span>{{scope.row.regCount}}</span>人,其中认证
                    <span>{{scope.row.authCount}}</span>人,
                    <span>{{scope.row.timeSpan}}</span>天内有交易
                    <span>{{scope.row.activeCount}}</span>人,
                    <span>{{scope.row.timeSpan}}</span>天内僵尸
                    <span>{{scope.row.inActiveCount}}</span>人
                  </div>
                  <div class="info_content">
                    {{scope.row.timeSpan}}天新
                    <span v-if="$route.name === '货主活跃分析'">货主</span>
                    <span v-if="$route.name === '车主活跃分析'">车主</span>
                    认证率:{{scope.row.authRatioStr}}
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="图例" prop="content" min-width="200">
              <template slot-scope="scope">
                <el-row type="flex">
                  <div style="height: 350px;width: 50%" :id="'echartL' + scope.row.userId"></div>
                  <div style="height: 350px;width: 50%" :id="'echartR' + scope.row.userId"></div>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="info_tab_footer">
      共计:{{ dataTotal }}
      <div class="show_pager">
        <Pager :total="dataTotal" @change="handlePageChange" ref="pager" />
      </div>
    </div>
  </div>
</template>


<script>
import { parseTime } from "@/utils/index.js";
import Pager from "@/components/Pagination/index";
import {
  getViewData,
  getExcel
} from "@/api/dataCenter/trendAnalysis/trendAnalysis";
import orgTree2 from "@/components/selectTree/orgTree2";
import echarts from "echarts";
export default {
  components: { orgTree2, Pager },
  data() {
    return {
      loading: true,
      btnsize: "mini",
      chooseTime: [],
      href: "",
      dataType: [
        { name: "今天", value: "today", iscur: true },
        { name: "昨天", value: "yesterday", iscur: false },
        { name: "本周", value: "thisWeek", iscur: false },
        { name: "本月", value: "thisMonth", iscur: false },
        { name: "本年", value: "thisYear", iscur: false },
        { name: "指定时间段", value: null, iscur: false }
      ],
      tableData: [],
      formData: {
        startTime: "",
        endTime: "",
        specifyTime: "today",
        groupCode: "",
        userName: "",
        pageNum: 1,
        pageSize: 20
      },
      BeginTime: null,
      EndTimeTime: null,
      dataTotal: 0
    };
  },
  methods: {
    handlePageChange(obj) {
      this.formData.pageNum = obj.pageNum;
      this.formData.pageSize = obj.pageSize;
      this.getList();
    },
    search() {
      if (
        this.formData.specifyTime === null &&
        this.formData.startTime === "" &&
        this.formData.endTime === ""
      ) {
        this.$message.info("请选择时间");
        return;
      }
      this.resetPage();
      this.getList();
    },
    getClearAnalysisOrderData() {
      this.resetPage();
      this.formData.groupCode = "";
      this.getList();
    },
    getObject(e) {
      this.resetPage();
      this.formData.groupCode = e.groupCode;
      this.getList();
    },
    getList() {
      this.loading = true;
      switch (this.$route.name) {
        case "货主活跃分析":
          getViewData(
            "/report/aflcbusinessstatisticsdata/v1/viewActiveShipperData",
            this.formData
          )
            .then(res => {
              this.setTableData(res);
            })
            .catch(e => {
              this.$message.error("获取数据失败");
              this.loading = false;
            });
          break;
        case "车主活跃分析":
          getViewData(
            "/report/aflcbusinessstatisticsdata/v1/viewActiveDriverData",
            this.formData
          )
            .then(res => {
              this.setTableData(res);
            })
            .catch(e => {
              this.$message.error("获取数据失败");
              this.loading = false;
            });
          break;
      }
    },
    setTableData(res) {
      this.tableData = res.data.list;
      this.BeginTime = parseTime(res.data.list[0].startTime, "{y}-{m}-{d}");
      this.EndTimeTime = parseTime(res.data.list[0].endTime, "{y}-{m}-{d}");
      this.dataTotal = res.data.total;
      this.loading = false;
      this.merage();
      this.$nextTick(() => {
        this.tableData.forEach(item => {
          const hasL0 = item.authCount === 0 && item.notAuthCount === 0;
          const dataL = [
            {
              value: hasL0 ? 0 : item.authCount === 0 ? "" : item.authCount,
              percent: item.authRatioStr
                ? item.authRatioStr === "0%"
                  ? ""
                  : `人(${item.authRatioStr})`
                : "人",
              name: "已认证"
            },
            {
              value: hasL0
                ? 0
                : item.notAuthCount === 0
                ? ""
                : item.notAuthCount,
              percent: item.notAuthRatioStr
                ? item.notAuthRatioStr === "0%"
                  ? ""
                  : `人(${item.notAuthRatioStr})`
                : "人",
              name: "未认证"
            }
          ];
          const hasR0 = item.inActiveCount === 0 && item.activeCount === 0;
          const dataR = [
            {
              value: hasR0
                ? 0
                : item.inActiveCount === 0
                ? ""
                : item.inActiveCount,
              name: hasR0 ? "僵尸" : item.inActiveCount === 0 ? "" : "僵尸"
            },
            {
              value: hasR0 ? 0 : item.activeCount === 0 ? "" : item.activeCount,
              name: hasR0 ? "交易" : item.activeCount === 0 ? "" : "交易"
            }
          ];
          this.echartData(
            `#echartL${item.userId}`,
            `#echartR${item.userId}`,
            dataL,
            `交易率：${item.activeRatioStr ? item.activeRatioStr : ""}`,
            dataR,
            `僵尸率：${item.inactiveRatioStr ? item.inactiveRatioStr : ""}`
          );
        });
      });
    },
    setCur(index, value) {
      this.dataType.forEach((el, idx) => {
        idx === index ? (el.iscur = true) : (el.iscur = false);
      });
      this.formData.specifyTime = value;
      if (value !== null) {
        this.chooseTime = [];
        this.formData.startTime = "";
        this.formData.endTime = "";
        this.resetPage();
        this.getList();
      }
    },
    timeVal(val) {
      if (val) {
        this.formData.startTime = val[0];
        this.formData.endTime = val[1];
        this.formData.specifyTime = null;
      } else {
        this.formData.startTime = "";
        this.formData.endTime = "";
        this.formData.specifyTime = "today";
        this.dataType.forEach((el, idx) => {
          idx === 0 ? (el.iscur = true) : (el.iscur = false);
        });
      }
      this.resetPage();
      this.getList();
    },
    resetPage() {
      this.formData.pageNum = 1;
      this.$refs.pager.inputval = 1;
      this.$refs.pager.pageNum = 1;
    },
    // 导出Excel
    exportExcel() {
      switch (this.$route.name) {
        case "货主活跃分析":
          getExcel(
            "/report/aflcbusinessstatisticsdata/v1/exportActiveShipperDataExcel",
            this.formData
          ).then(res => {
            this.setExcel(res, "货主活跃分析");
          });
          break;
        case "车主活跃分析":
          getExcel(
            "/report/aflcbusinessstatisticsdata/v1/exportActiveDriverDataExcel",
            this.formData
          ).then(res => {
            this.setExcel(res, "车主活跃分析");
          });
          break;
      }
    },
    setExcel(res, name) {
      const blob = new Blob([res]);
      this.href = window.URL.createObjectURL(blob);
      const NewDom = document.createElement("a");
      NewDom.setAttribute("href", this.href);
      NewDom.setAttribute("target", "_blank");
      NewDom.setAttribute(
        "download",
        this.BeginTime + "至" + this.EndTimeTime + `${name}.xlsx`
      );
      document.body.appendChild(NewDom);
      NewDom.click();
      document.body.removeChild(NewDom);
    },
    echartData(idL, idR, dataL, textL, dataR, textR) {
      const cL = ["#39B54A", "#008713"];
      const cR = ["#FFD400", "#FFB600"];
      const optionL = {
        title: {
          show: true,
          text: textL,
          x: "center",
          bottom: "0%",
          textStyle: {
            color: "#409eff",
            fontWeight: "bolder",
            fontSize: 16
          }
        },
        series: [
          {
            name: "",
            type: "pie",
            hoverAnimation: false,
            avoidLabelOverlap: false,
            radius: [0, "74%"],

            label: {
              normal: {
                position: "inner",
                // formatter: '{c}\n{b}',
                formatter: function(params) {
                  return `${params.name}\n${params.value}${params.data.percent}`;
                },
                fontSize: 14
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            color: cL,
            data: dataL
          }
        ]
      };
      const optionR = {
        title: {
          show: true,
          text: textR,
          x: "center",
          bottom: "0%",
          textStyle: {
            color: "#409eff",
            fontWeight: "bolder",
            fontSize: 16
          }
        },
        series: [
          {
            name: "",
            type: "pie",
            hoverAnimation: false,
            avoidLabelOverlap: false,
            radius: [0, "50%"],

            label: {
              normal: {
                position: "inner",
                // formatter: '{c}\n{b}',
                formatter: function(params) {
                  return `${params.value}人\n${params.name}`;
                },
                fontSize: 14
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            color: cR,
            data: dataR
          }
        ]
      };
      const myChartbar = echarts.init(document.querySelector(idL));
      myChartbar.setOption(optionL);

      const myChartbar1 = echarts.init(document.querySelector(idR));
      myChartbar1.setOption(optionR);
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row_1 = this.Arr[rowIndex];
        const _col_1 = _row_1 > 0 ? 1 : 0;
        return { rowspan: _row_1, colspan: _col_1 };
      }
    },
    merage() {
      this.merageInit();
      for (let i = 0; i < this.tableData.length; i++) {
        if (i === 0) {
          this.Arr.push(1);
          this.Pos = 0;
        } else {
          if (
            `${this.tableData[i].groupName}` ===
            `${this.tableData[i - 1].groupName}`
          ) {
            this.Arr[this.Pos] += 1;
            this.Arr.push(0);
          } else {
            this.Arr.push(1);
            this.Pos = i;
          }
        }
      }
    },

    merageInit() {
      this.Arr = [];
      this.Pos = 0;
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style type="text/css" lang="scss" scoped>
.info {
  white-space: normal;
  span {
    color: #409eff;
  }
  i {
    font-style: normal;
  }
  .info_content {
    margin-top: 40px;
    color: #409eff;
    font-size: 18px;
    font-weight: bold;
  }
}
.timeLine {
  overflow: hidden;
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
.salespersonTotalH2 {
  text-align: center;
  font-size: 28px;
  margin-bottom: 10px;
  position: relative;
}
</style>
