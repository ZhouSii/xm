<template>
  <div class="identicalStyle" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="领券活动名称">
        <el-input v-model="formAllData.activityName" maxlength="20" clearable></el-input>
      </el-form-item>
      <el-form-item label="领取类型">
        <el-select v-model="formAllData.getTypeCode" clearable placeholder="请选择">
          <el-option
            v-for="item in optionsCoupon"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="领取间隔时间">
        <el-select v-model="formAllData.getIntervalTimeCode" clearable placeholder="请选择">
          <el-option
            v-for="item in optionsTime"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
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
      <el-form-item label="活动时间">
        <el-date-picker
          v-model="created2"
          type="daterange"
          unlink-panels
          :picker-options="pickerOptions2"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
          @change="aTime"
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
          v-has:MARKETING_SHIPPER_MANAGE_COILCONFIGURATION_COILCONFIGURATION_ADD
        >新增</el-button>
        <el-button
          type="primary"
          icon="el-icon-edit"
          plain
          :size="btnsize"
          @click="handleClick('edit')"
          v-has:MARKETING_SHIPPER_MANAGE_COILCONFIGURATION_COILCONFIGURATION_MODIFY
        >修改</el-button>
        <el-button
          type="primary"
          plain
          icon="el-icon-bell"
          @click="handleUseStates"
          :size="btnsize"
          v-has:MARKETING_SHIPPER_MANAGE_COILCONFIGURATION_COILCONFIGURATION_ENABLEDISABLE
        >启用/停用</el-button>
      </div>
      <div class="info_news">
        <el-table
          ref="multipleTable"
          style="width: 100%"
          stripe
          border
          height="100%"
          @selection-change="getSelection"
          @row-click="clickDetails"
          highlight-current-row
          :data="tableDataAll"
          tooltip-effect="dark"
        >
          <el-table-column label="选择" type="selection" width="50"></el-table-column>
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column label="领券活动名称" prop="activityName" sortable show-overflow-tooltip>
            <template slot-scope="scope">
              <h4 class="needMoreInfo" @click="JoinDetail(scope.row)">{{ scope.row.activityName}}</h4>
            </template>
          </el-table-column>
          <el-table-column
            label="领取类型"
            prop="getTypeName"
            sortable
            show-overflow-tooltip
            width="100"
          ></el-table-column>
          <el-table-column
            label="领取间隔时间"
            prop="getIntervalTimeName"
            sortable
            show-overflow-tooltip
            width="120"
          ></el-table-column>
          <el-table-column
            label="间隔时间最大领取次数"
            prop="intervalTimeLimit"
            sortable
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="用户最大领取次数" prop="perUserTimeLimit" sortable show-overflow-tooltip></el-table-column>
          <el-table-column label="开始时间" prop="startTime" sortable show-overflow-tooltip width="160"></el-table-column>
          <el-table-column label="结束时间" prop="endTime" sortable show-overflow-tooltip width="160"></el-table-column>
          <el-table-column
            label="活动创建时间"
            prop="createTime"
            sortable
            show-overflow-tooltip
            width="160"
          ></el-table-column>
          <el-table-column label="活动链接" prop="activityUrl" sortable show-overflow-tooltip></el-table-column>
          <el-table-column
            label="活动状态"
            prop="usingStatus"
            sortable
            show-overflow-tooltip
            width="100"
          >
            <template slot-scope="scope">
              <span
                :class="{blackName: scope.row.usingStatus == '0',normalName :scope.row.usingStatus == '1'}"
              >{{scope.row.usingStatus=='1'?'启用':'停用'}}</span>
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

    <increase
      :params="selectRowData"
      :editType="type"
      :typetitle="typetitle"
      :dialogFormVisible_add.sync="dialogFormVisible_add"
      @getData="getDataList"
    />
  </div>
</template>
<script>
import {
  aflcCouponGetActivityList,
  openOrForbidden
} from "@/api/marketing/shippermarkting/couponCollocation.js";
import { getDictionary } from "@/api/common.js";
import { eventBus } from "@/eventBus";
import Pager from "@/components/Pagination/index";
import { parseTime, pickerOptions2 } from "@/utils/";
import increase from "./components/increase";
export default {
  data() {
    return {
      loading: true,
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
      radio: 1,
      optionsCoupon: [], //领取类型
      optionsTime: [], //领取间隔时间
      formAllData: {
        activityName: null,
        getTypeCode: null,
        getIntervalTimeCode: null,
        createStartTime: null,
        createEndTime: null,
        startTime: null,
        endTime: null
      },
      created: [],
      created2: [],
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
    increase
  },
  watch: {
    isvisible: {
      handler(newVal, oldVal) {
        if (newVal) {
          setTimeout(() => {
            this.$refs.multipleTable.$el.style.height =
              this.$refs.multipleTable.$el.offsetHeight + "px";
          }, 300);
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
      getDictionary("AF0465").then(res => {
        this.optionsCoupon = res.data;
      });
      getDictionary("AF0466").then(res => {
        this.optionsTime = res.data;
      });
    },
    // 创建时间
    cTime(i) {
      if (i) {
        this.formAllData.createStartTime = i[0];
        this.formAllData.createEndTime = i[1];
      } else {
        this.formAllData.createStartTime = "";
        this.formAllData.createEndTime = "";
      }
    },
    // 活动时间
    aTime(i) {
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
      this.loading = true;
      aflcCouponGetActivityList(
        this.page,
        this.pagesize,
        this.formAllData
      ).then(res => {
        this.dataTotal = res.data.totalCount;
        this.tableDataAll = res.data.list;
        this.tableDataAll.forEach(item => {
          item.startTime = parseTime(item.startTime, "{y}-{m}-{d} {h}:{i}:{s}");
          item.endTime = parseTime(item.endTime, "{y}-{m}-{d} {h}:{i}:{s}");
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
        activityName: null,
        getTypeCode: null,
        getIntervalTimeCode: null,
        createStartTime: null,
        createEndTime: null,
        startTime: null,
        endTime: null
      };
      this.created = [];
      this.created2 = [];
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.firstblood();
    },
    handleClick(type) {
      if (this.selectRowData.length == 0 && type != "add") {
        return this.$message.warning("请选择您要操作的用户");
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
            break;
        }
      }
    },
    //进入详情
    JoinDetail(i) {
      this.type = "view";
      this.typetitle = "详情";
      this.dialogFormVisible_add = true;
      this.selectRowData = [i];
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
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    // 启用禁用
    handleUseStates() {
      if (this.selectRowData.length == 0) {
        this.$message.warning("请选择您要操作的数据");
        return;
      } else if (this.selectRowData.length > 1) {
        this.$message({
          message: "每次只能操作单条数据~",
          type: "warning"
        });
        this.$refs.multipleTable.clearSelection();
      } else {
        this.selectId = [];
        this.selectId.push(this.selectRowData[0].id);
        openOrForbidden(this.selectId).then(res => {
          this.selectId.splice(0, 1);
          if (this.selectRowData[0].usingStatus == 1) {
            this.$message.warning("已禁用");
          } else {
            this.$message.success("已启用");
          }
          this.firstblood();
          this.$refs.multipleTable.clearSelection();
        });
      }
    },
    getDataList() {
      this.firstblood();
      this.$refs.multipleTable.clearSelection();
    }
  },

  mounted() {}
};
</script>
<style lang="scss">
</style>

