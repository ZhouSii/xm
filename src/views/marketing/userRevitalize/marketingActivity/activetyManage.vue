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
          icon="el-icon-circle-plus"
          plain
          :size="btnsize"
          @click="handleClick('add')"
          v-has:MARKETING_USERREVITALIZE_MARKETINGACTIVITYMANAGEMENT_ACTIVITYMANAGEMENT_ADD
        >新增</el-button>
        <el-button
          type="primary"
          icon="el-icon-edit"
          plain
          :size="btnsize"
          @click="handleClick('edit')"
          v-has:MARKETING_USERREVITALIZE_MARKETINGACTIVITYMANAGEMENT_ACTIVITYMANAGEMENT_MODIFY
        >修改</el-button>
        <el-button
          type="primary"
          icon="el-icon-folder"
          plain
          :size="btnsize"
          @click="handleClick('data')"
          v-has:MARKETING_USERREVITALIZE_MARKETINGACTIVITYMANAGEMENT_ACTIVITYMANAGEMENT_DATE
        >数据</el-button>
        <el-button
          type="primary"
          icon="el-icon-coin"
          plain
          :size="btnsize"
          @click="handleClick('Effect')"
          v-has:MARKETING_USERREVITALIZE_MARKETINGACTIVITYMANAGEMENT_ACTIVITYMANAGEMENT_EFFECTANALYSIS
        >效果分析</el-button>
        <el-button
          type="primary"
          icon="el-icon-bell"
          plain
          :size="btnsize"
          @click="handleClick('UseStates')"
          v-has:MARKETING_USERREVITALIZE_MARKETINGACTIVITYMANAGEMENT_ACTIVITYMANAGEMENT_ENABLEDISABLE
        >启用/禁用</el-button>
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
          <el-table-column label="活动名称" prop show-overflow-tooltip width="150">
            <template slot-scope="scope">
              <h4 class="needMoreInfo" @click="JoinDetail(scope.row)">{{scope.row.name}}</h4>
            </template>
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
          <el-table-column label="推送时间" prop="pushTime" sortable show-overflow-tooltip width="220"></el-table-column>
          <el-table-column label="启用状态" prop="status" sortable show-overflow-tooltip width="120">
            <template slot-scope="scope">
              <span
                :class="scope.row.status == '1'?'normalName':'blackName'"
              >{{scope.row.status=='1'?'启用':'禁用'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="活动人数"
            prop="pushUsersNum"
            sortable
            show-overflow-tooltip
            width="120"
          >
            <template slot-scope="scope">
              <h4 class="needMoreInfo" @click="JoinActivety(scope.row)">{{scope.row.pushUsersNum}}</h4>
            </template>
          </el-table-column>
          <el-table-column label="推送权益" prop="pushCouponName" sortable show-overflow-tooltip></el-table-column>
          <el-table-column
            label="创建时间"
            prop="createTime"
            sortable
            show-overflow-tooltip
            width="220"
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

    <addActivety
      :params="selectRowData"
      :editType="type"
      :typetitle="typetitle"
      :dialogFormVisible_add.sync="dialogFormVisible_add"
      @getData="getDataList"
      :paramsId="paramsId"
    />
  </div>
</template>
<script>
import {
  aflcMarketingActivityManagement_list,
  aflcCouponGetActivityupdate
} from "@/api/marketing/userRevitalize";
import { getDictionary } from "@/api/common.js";
import Pager from "@/components/Pagination/index";
import { parseTime, pickerOptions2 } from "@/utils/";
import addActivety from "./addActivety";
export default {
  data() {
    return {
      loading: false,
      pickerOptions2: { shortcuts: pickerOptions2 },
      btnsize: "mini",
      selectRowData: [],
      type: "", //新增或者修改或者详情
      typetitle: "", //新增或者详情title
      selectId: [],
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
        endTime: null
      },
      created: [],
      paramsId: null, //详情Id
      businessTypeList: [], //业务类型
      userTypeList: [
        { name: "货主", code: "AF00101" },
        { name: "车主", code: "AF00102" }
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
    Pager,
    addActivety
  },
  watch: {
    isvisible: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.getMoreInformation();
          this.firstblood();
        }
      },
      immediate: true
    }
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
      aflcMarketingActivityManagement_list(
        this.page,
        this.pagesize,
        this.formAllData
      ).then(res => {
        this.dataTotal = res.data.totalCount;
        this.tableDataAll = res.data.list;
        this.tableDataAll.forEach(item => {
          item.createTime = parseTime(
            item.createTime,
            "{y}-{m}-{d} {h}:{i}:{s}"
          );
        });
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
        endTime: null
      };
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.created = [];
      this.firstblood();
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
          case "add":
            this.type = "add";
            this.typetitle = "新增";
            this.dialogFormVisible_add = true;
            break;
          case "edit":
            this.type = "edit";
            this.typetitle = "修改";
            this.dialogFormVisible_add = true;
            this.selectRowData = this.selectRowData;
            break;
          case "data":
            this.$router.push({
              name: "营销活动数据",
              query: { name: this.selectRowData[0].name }
            });
            break;
          case "Effect":
            this.$router.push({ name: "货主订单分析" });
            this.$store.state.dataCenter.mobileList = this.selectRowData[0].pushUsers.split(
              ","
            );
            break;
          case "UseStates":
            let status;
            if (this.selectRowData[0].status == 1) {
              status = 0;
            } else {
              status = 1;
            }
            this.$message.info("正在操作中...");
            aflcCouponGetActivityupdate({
              id: this.selectRowData[0].id,
              status: status
            })
              .then(res => {
                if (status == 0) {
                  this.$message.warning("已禁用");
                } else {
                  this.$message.success("已启用");
                }
                this.firstblood();
              })
              .catch(err => {
                this.$message.error(err.errorInfo);
              });
            break;
        }
      }
    },
    //进入详情
    JoinDetail(i) {
      this.type = "view";
      this.typetitle = "详情";
      this.dialogFormVisible_add = true;
      this.paramsId = i.id;
    },
    // 判断选中与否
    getSelection(val) {
      console.log("选中内容", val);
      this.selectRowData = val;
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    // 进入营销活动数据
    JoinActivety(i) {
      this.$router.push({ name: "营销活动数据", query: { name: i.name } });
    },
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    getDataList() {
      this.firstblood();
      this.paramsId = null;
      this.$refs.multipleTable.clearSelection();
    }
  },
  destroyed() {
    if (!!this.$store.state.marketing.mobilePhone) {
      this.$store.state.marketing.mobilePhone = null;
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (
        this.$store.state.marketing.mobilePhone &&
        this.$store.state.marketing.mobilePhone.length > 0
      ) {
        this.handleClick("add");
      }
    });
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

