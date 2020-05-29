<template>
  <div class="identicalStyle salespersonTotal" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="区域" prop="belongCityName">
        <getCityList
          class="chooseItem"
          @returnStr="getStr"
          v-model="listSystemObj.belongCityName"
          ref="area"
        ></getCityList>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="listSystemObj.chooseTime"
          type="month"
          placeholder="选择月"
          @change="change"
          value-format="yyyy-MM"
        ></el-date-picker>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-row>
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
            @click="query"
            style="float:right;margin-right:10px;"
            :size="btnsize"
            icon="el-icon-search"
          >搜索</el-button>
        </el-row>
      </el-form-item>
    </el-form>
    <div class="classify_info">
      <el-row style="margin-bottom:20px">
        <el-button
          type="primary"
          size="mini"
          class="el-icon-circle-plus"
          plain
          @click="add()"
          v-has:DATA_CENTER_BUSINESSEXAMINATION_ASSESSMENTCONFIGURATION_ADD
        >添加考核规则</el-button>
      </el-row>
      <div class="info_news">
        <el-table
          border
          ref="multipleTable"
          id="out-table"
          :data="tableData"
          height="100%" 
          style="width: 100%"
        >
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="area" label="区域" width="200"></el-table-column>
          <el-table-column prop="specTime" label="时间" width="200"></el-table-column>
          <el-table-column label="指标值">
            <template slot-scope="scope">
              <p>有效车主：当月认证，且当月完成交易{{scope.row.effectiveDriverSetting}};</p>
              <p>优质车主：当月认证，且当月完成交易{{scope.row.highQuaDriverSetting}};</p>
              <p>有效货主：当月注册，且当月完成交易{{scope.row.effectiveShipperSetting}};</p>
              <p>优质货主：当月注册，且当月完成交易{{scope.row.highQuaShipperSetting}};</p>
            </template>
          </el-table-column>
          <el-table-column prop="updater" label="操作人" width="200"></el-table-column>
          <el-table-column prop="updateTime" label="操作时间" width="200"></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                :size="btnsize"
                type="primary"
                plain
                @click="edit(scope.row)"
                v-has:DATA_CENTER_BUSINESSEXAMINATION_ASSESSMENTCONFIGURATION_MODIFY
              >编辑</el-button>
              <el-button
                :size="btnsize"
                type="primary"
                plain
                @click="deleteData(scope.row)"
                v-has:DATA_CENTER_BUSINESSEXAMINATION_ASSESSMENTCONFIGURATION_DELETE
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 页码 -->
    <div class="info_tab_footer">
      共计:{{ dataTotal }}
      <div class="show_pager">
        <Pager :total="dataTotal" @change="handlePageChange" ref="pager" />
      </div>
    </div>
    <examination-rules-dialog :formData="formData" v-if="formData.isShow"></examination-rules-dialog>
  </div>
</template>
<script>
import Pager from "@/components/Pagination/index";
import getCityList from "@/components/GetCityList/index";
import examinationRulesDialog from "./examinationRulesDialog.vue";
import {
  getViewSetting,
  deleteSetting
} from "@/api/dataCenter/businessAssessmentManagement/index";
export default {
  name: "examinationRules",
  data() {
    return {
      tableData: [],
      loading: false,
      btnsize: "mini",
      totalsum: 0,
      // 表单数据
      formData: {
        isShow: false, // 是否显示弹窗
        title: "", //弹窗标题
        cityName: "", //选择城市
        provinceName: "", //选择省份
        procity: "", //省份城市
        chooseTime: "", //选择时间
        effectiveDriverSetting: 0, //有效车主
        highQuaDriverSetting: 0, //优质车主
        effectiveShipperSetting: 0, //有效货主
        highQuaShipperSetting: 0 //优质货主
      },
      dataTotal: 0, //查询总数
      listSystemObj: {
        //查询提交数据
        pageNum: 1,
        pageSize: 20,
        chooseTime: "", //选择时间
        cityName: "", //选择城市
        provinceName: "" //选择省份
      }
    };
  },
  components: {
    getCityList,
    examinationRulesDialog,
    Pager
  },
  methods: {
    // 选择时间
    change(data) {
      this.firstblood();
    },
    // 添加考核规则
    add() {
      this.formData = {
        isShow: true, // 是否显示弹窗
        title: "添加考核规则", //弹窗标题
        cityName: "", //选择城市
        provinceName: "", //选择省份
        procity: "", //省份城市
        chooseTime: "", //选择时间
        effectiveDriverSetting: 0, //有效车主
        highQuaDriverSetting: 0, //优质车主
        effectiveShipperSetting: 0, //有效货主
        highQuaShipperSetting: 0 //优质货主
      };
    },
    // 修改页码
    handlePageChange(obj) {
      this.listSystemObj.pageNum = obj.pageNum;
      this.listSystemObj.pageSize = obj.pageSize;
      this.firstblood();
    },
    // 城市选择
    getStr(d) {
      // this.listSystemObj.belongCityName =
      //   !d.province && !d.city && !d.area
      //     ? ""
      //     : `${this.getValue(d.province)}${this.getValue(
      //         d.city
      //       )}${this.getValue(d.area)}`.trim();
      this.listSystemObj.cityName = d.city ? d.city.name : "";
      this.listSystemObj.provinceName = d.province ? d.province.name : "";
      this.firstblood();
    },
    // 获取城市
    getValue(obj) {
      return obj ? obj.value : "";
    },
    // 搜索数据
    firstblood() {
      console.log("搜索数据", this.listSystemObj);
      this.loading = true;
      const params = {
        provinceName: !!this.listSystemObj.provinceName
          ? this.listSystemObj.provinceName
          : null,
        cityName: !!this.listSystemObj.cityName
          ? this.listSystemObj.cityName
          : null,
        specTimeStr: !!this.listSystemObj.chooseTime
          ? this.listSystemObj.chooseTime
          : null, //格式”2019-07”
        pageNum: this.listSystemObj.pageNum, //翻页
        pageSize: this.listSystemObj.pageSize
      };
      getViewSetting(params)
        .then(res => {
          if (res.status === 200) {
            this.tableData = res.data.list;
            this.dataTotal = res.data.total;
            this.loading = false;
          } else {
            this.tableData = [];
            this.dataTotal = 0;
            this.$message.error(res.errorInfo);
          }
        })
        .catch(err => {
          this.tableData = [];
          this.dataTotal = 0;
          this.loading = false;
        });
    },
    query() {
      this.$refs.pager.pageNum = 1;
      this.listSystemObj.pageNum = 1;
      this.firstblood();
    },
    // 清空数据
    clearSearch() {
      this.listSystemObj = {
        //查询提交数据
        pageNum: 1,
        pageSize: 20,
        chooseTime: "", //选择时间
        cityName: "", //选择城市
        provinceName: "" //选择省份
      };
      this.$refs.pager.pageNum = 1;
      this.$refs["area"].clearData();
      this.firstblood();
    },
    // 编辑
    edit(data) {
      this.formData = {
        isShow: true, // 是否显示弹窗
        title: "修改考核规则", //弹窗标题
        cityName: data.cityName, //选择城市
        provinceName: data.provinceName, //选择省份
        procity: data.provinceName + "/" + data.cityName, //省份城市
        chooseTime: this.dataChange(data.specTime), //选择时间
        effectiveDriverSetting: data.eDriverMin, //有效车主
        highQuaDriverSetting: data.bDriverMin, //优质车主
        effectiveShipperSetting: data.eShipperMin, //有效货主
        highQuaShipperSetting: data.bShipperMin, //优质货主
        id: data.id
      };
    },
    // 时间格式转换
    dataChange(time) {
      const index = time.indexOf("年");
      let day = time.slice(index + 1, time.length - 1);
      const year = time.slice(0, index);
      if (day < 10) {
        day = "0" + day;
      }
      return year + "-" + day;
    },
    // 删除
    deleteData(data) {
    //   console.log("??????", data);
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteSetting({
            id: data.id
          })
            .then(res => {
              if (res.status === 200) {
                this.firstblood();
                this.$message.success("删除成功");
              } else {
                this.$message.error(res.errorInfo);
              }
            })
            .catch(err => {
              this.$message.error("删除失败");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.firstblood();
  }
};
</script>
