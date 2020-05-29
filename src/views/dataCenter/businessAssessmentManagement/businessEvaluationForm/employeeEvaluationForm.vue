<template>
  <div class="identicalStyle salespersonTotal" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="区域">
        <getCityList class="chooseItem" @returnStr="getStr" ref="area"></getCityList>
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
      <el-form-item v-if="searchInfo.timeQueryType == '3'">
        <el-date-picker
          v-model="chooseTime"
          type="month"
          @change="timeVal"
          value-format="yyyy-MM"
          align="right"
        ></el-date-picker>
      </el-form-item>

      <el-form-item v-if="dates.length > 0 && searchInfo.timeQueryType == '3'">
        <span style="margin: 0 10px;">开始日期</span>
        <el-select v-model="startTime" placeholder="请选择" style="width:80px">
          <el-option
            v-for="item in dates"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span style="margin: 0 10px;">截止日期</span>
        <el-select v-model="value" placeholder="请选择" style="width:80px">
          <el-option
            v-for="item in dates"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-button
        type="info"
        plain
        @click="clearSearch"
        style="float:right;margin-right:10px;"
        :size="btnsize"
        icon="fontFamily aflc-icon-qingkong"
      >清空</el-button>
      <el-button
        type="primary"
        plain
        @click="firstblood"
        style="float:right;margin-right:10px;"
        :size="btnsize"
        icon="el-icon-search"
      >搜索</el-button>
    </el-form>
    <div class="classify_info">
      <div
        class="salespersonTotalH2"
      >{{BeginTime}} 至 {{EndTimeTime}}{{searchInfo.provinceName? searchInfo.provinceName + searchInfo.cityName : '广东省广州市'}}业务{{assessType === 'personage'?'个人':'团队'}}考核表</div>
      <el-row class="rowLine">
        <span v-if="rules.length > 0">
          <el-tooltip placement="right-start">
            <div slot="content">
              有效车主：当月认证，且当月完成交易{{rules[0]}};
              <br />
              优质车主：当月认证，且当月完成交易{{rules[1]}};
              <br />
              有效货主：当月认证，且当月完成交易{{rules[2]}};
              <br />
              优质货主：当月认证，且当月完成交易{{rules[3]}};
            </div>
            <span>
              规则说明
              <i class="el-icon-question"></i>
            </span>
          </el-tooltip>
        </span>
        <el-button
          type="primary"
          icon="el-icon-download"
          plain
          style="float:right;margin-right:10px;"
          :size="btnsize"
          @click="handleClick"
          v-if="$_has_permission(assessType === 'personage'?'DATA_CENTER_BUSINESSEXAMINATION_FORM_OWN_EXPORT':'DATA_CENTER_BUSINESSEXAMINATION_FORM_TEAM_EXPORT')"
        >导出EXCEL</el-button>
      </el-row>

      <div class="info_news">
        <el-table
          ref="multipleTable"
          id="out-table"
          :data="tableData"
          height="100%"
          border
          :span-method="arraySpanMethod"
          style="width: 100%"
        >
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="groupName" label="业务区" width="200"></el-table-column>
          <el-table-column
            prop="salesmanName"
            :label="assessType === 'personage' ? '业务人员' : '负责人'"
            width="150"
          ></el-table-column>
          <el-table-column prop="effectiveDriverNum" label="有效车主数" width="150"></el-table-column>
          <el-table-column prop="highQuaDriverNum" label="优质车主数" width="150"></el-table-column>
          <el-table-column prop="effectiveShipperNum" label="有效货主数" width="150"></el-table-column>
          <el-table-column prop="highQuaShipperNum" label="优质货主数" width="150"></el-table-column>
          <el-table-column prop="orderNum" label="在线交易订单量" sortable></el-table-column>
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
import {
  viewGroupMemberData,
  exportGroupMemberDataExcel,
  viewGroupData,
  exportGroupDataExcel
} from "@/api/dataCenter/businessAssessmentManagement/index";
export default {
  name: "employeeEvaluationForm",
  props: {
    assessType: {
      default: "person",
      type: String
    }
  },
  components: {
    getCityList
  },
  data() {
    return {
      loading: false,
      btnsize: "mini",
      chooseTime: "",
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      dataType: [
        { name: "本月", value: "1", iscur: true },
        { name: "上个月", value: "2", iscur: false },
        { name: "指定时间段", value: "3", iscur: false }
      ],
      searchInfo: {
        cityName: "",
        provinceName: "",
        queryBeginTime: "",
        queryEndTime: "",
        timeQueryType: "1",
        number: ""
      },
      BeginTime: null,
      EndTimeTime: null,
      totalsum: 0,
      tableData: [],
      startTime: "", //开始时间
      value: "", //结束时间
      dates: [], //日期选择
      rules: [] //规则数据
    };
  },
  watch: {
    startTime(data) {
      this.firstblood();
    },
    value(data) {
      this.firstblood();
    }
  },
  methods: {
    // 导出下载
    handleClick() {
      this.firstblood("excel");
    },
    setExcel(params) {
      let funType;
      if (this.assessType === "team") {
        // 团队
        funType = exportGroupDataExcel;
      } else {
        // 个人
        funType = exportGroupMemberDataExcel;
      }

      funType(params).then(res => {
        const blob = new Blob([res]);
        let name =
          this.BeginTime +
          "至" +
          this.EndTimeTime +
          (this.searchInfo.provinceName
            ? this.searchInfo.provinceName + this.searchInfo.cityName
            : "广东省广州市") +
          "业务" +
          (this.assessType === "personage" ? "个人" : "团队") +
          "考核表.xlsx";
        this.href = window.URL.createObjectURL(blob);
        const NewDom = document.createElement("a");
        NewDom.setAttribute("href", this.href);
        NewDom.setAttribute("target", "_blank");
        NewDom.setAttribute("download", name);
        document.body.appendChild(NewDom);
        NewDom.click();
        document.body.removeChild(NewDom);
      });
    },
    //   清空数据
    clearSearch() {
      this.$refs["area"].clearData();
      this.searchInfo.provinceName = "";
      this.searchInfo.cityName = "";
      this.setCur(0, "1");
    },
    // 获取数据
    firstblood(type) {
      if (this.searchInfo.timeQueryType === "1") {
        // 本月
        let date = new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          0
        ).getDate();
        this.searchInfo.queryBeginTime =
          new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-01";
        this.searchInfo.queryEndTime =
          new Date().getFullYear() +
          "-" +
          (new Date().getMonth() + 1) +
          "-" +
          date;
      } else if (this.searchInfo.timeQueryType === "2") {
        // 上月
        let date = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          0
        ).getDate();
        this.searchInfo.queryBeginTime =
          new Date().getFullYear() + "-" + new Date().getMonth() + "-01";
        this.searchInfo.queryEndTime =
          new Date().getFullYear() + "-" + new Date().getMonth() + "-" + date;
      } else {
        // 指定时间段
        if (!!this.chooseTime) {
          this.searchInfo.queryBeginTime =
            this.chooseTime + "-" + this.startTime;
          this.searchInfo.queryEndTime = this.chooseTime + "-" + this.value;
        } else {
          this.$message.info("请选择时间段");
          return false;
        }
      }
      let params = {
        provinceName: !!this.searchInfo.provinceName
          ? this.searchInfo.provinceName
          : null,
        cityName: !!this.searchInfo.cityName ? this.searchInfo.cityName : null,
        beginTime: this.searchInfo.queryBeginTime,
        endTime: this.searchInfo.queryEndTime
      };
      console.log(params, "this.searchInfo");
      if (type === "excel") {
        // 导出
        this.setExcel(params);
      } else {
        // 获取数据
        this.query(params);
      }
    },
    // 获取数据
    query(data) {
      this.loading = true;
      let funType;
      if (this.assessType === "team") {
        // 团队
        funType = viewGroupData;
      } else {
        // 个人
        funType = viewGroupMemberData;
      }

      funType(data)
        .then(res => {
          if (res.status === 200) {
            this.tableData = res.data.list;
            this.BeginTime = res.data.beginTime;
            this.EndTimeTime = res.data.endTime;
            this.totalsum = res.data.totalCount;
            this.loading = false;
            this.rules = [
              res.data.effectiveDriverSetting,
              res.data.highQuaDriverSetting,
              res.data.effectiveShipperSetting,
              res.data.highQuaShipperSetting
            ];
            this.merage();
          } else {
            this.tableData = [];
            this.totalsum = 0;
            this.rules = [];
            this.$message.error(res.errorInfo);
          }
        })
        .catch(err => {
          this.tableData = [];
          this.totalsum = 0;
          this.rules = [];
          this.$message.error(err.errorInfo);
          this.loading = false;
        });
    },
    getStr(d) {
      this.searchInfo.cityName = d.city ? d.city.name : "";
      this.searchInfo.provinceName = d.province ? d.province.name : "";
      this.firstblood();
    },
    getValue(obj) {
      return obj ? obj.value : "";
    },
    // 选择时间段
    setCur(index, value) {
      this.dataType.forEach((el, idx) => {
        idx == index ? (el.iscur = true) : (el.iscur = false);
      });
      this.searchInfo.timeQueryType = value;
      // console.log(this.searchInfo,'this.searchInfo',this.dataType)
      if (value != "3") {
        this.dates = [];
        this.chooseTime = "";
        this.searchInfo.number = "";
        this.firstblood();
      }
    },
    // 获取当前月最大日期
    timeVal(val) {
      // 获取选择时间的月份天数
      if (!!this.chooseTime) {
        const dates = new Date(
          this.chooseTime.slice(0, 4),
          this.chooseTime.slice(5, 7),
          0
        ).getDate();
        this.dates = [];
        for (let index = 1; index <= dates; index++) {
          this.dates.push({
            value: index,
            label: index + "号"
          });
        }
        this.startTime = 1;
        this.value = dates;
      } else {
        this.dates = [];
        this.startTime = "";
        this.value = "";
      }
    },
    // 表格分类格式化
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
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
    this.firstblood();
  }
};
</script>

<style type="text/css" lang="scss" scoped>
.salespersonTotal {
  .rowLine {
    line-height: 30px;
    margin-bottom: 10px;
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

