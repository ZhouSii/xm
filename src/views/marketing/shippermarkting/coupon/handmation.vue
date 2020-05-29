<template>
  <div class="identicalStyle Marketing" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="活动名称">
        <el-input v-model="formAllData.activityName" class="activeCss"></el-input>
      </el-form-item>
      <el-form-item label="发放区域">
        <GetCityList ref="area" v-model="formAllData.areaName" @returnStr="getStr"></GetCityList>
      </el-form-item>
      <el-form-item label="活动状态">
        <el-select v-model="formAllData.activityState" clearable placeholder="请选择">
          <el-option
            v-for="item in activeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-date-picker
          is-range
          type="daterange"
          v-model="createTime"
          range-separator="-"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
          value-format="yyyy-MM-dd HH:mm:ss"
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
        <newautocoupon
          btntext="新增"
          :plain="true"
          type="primary"
          btntype="primary"
          icon="el-icon-circle-plus"
          btntitle="创建"
          :editType="types"
          @getData="getDataList"
          v-has:MARKETING_SHIPPER_MANAGE_COUPON_ACTIVITY_MANUAL_SETTING_ADD
        ></newautocoupon>
        <modautocoupon
          btntext="修改"
          :plain="true"
          type="primary"
          btntype="primary"
          icon="el-icon-edit"
          btntitle="修改"
          :editType="types"
          :params="selectRowData"
          @getData="getDataList"
          v-has:MARKETING_SHIPPER_MANAGE_COUPON_ACTIVITY_MANUAL_SETTING_UPDATE
        ></modautocoupon>
        <span v-if="types=='two'" class="sw">
          <couponGive
            btntext="发放"
            :plain="true"
            type="primary"
            btntype="primary"
            icon="el-icon-news"
            editType="Give"
            btntitle="优惠券发放"
            :params="selectRowData"
            @getData="getDataList"
            :buttonStatus="buttonStatus"
            v-has:MARKETING_SHIPPER_MANAGE_COUPON_ACTIVITY_MANUAL_SETTING_ISSUE
          ></couponGive>
          <couponGive
            btntext="生成"
            :plain="true"
            type="primary"
            btntype="primary"
            icon="el-icon-news"
            editType="Build"
            btntitle="优惠券生成"
            :params="selectRowData"
            @getData="getDataList"
            :buttonStatus="buttonStatus"
            v-has:MARKETING_SHIPPER_MANAGE_COUPON_ACTIVITY_MANUAL_SETTING_CREATE
          ></couponGive>
        </span>
        <!-- <el-button
          type="primary"
          value="value"
          plain
          icon="el-icon-bell"
          @click="handleUseStates"
          v-if="types=='one'"
        >启用/停用</el-button>-->
        <el-button
          type="primary"
          plain
          icon="el-icon-delete"
          @click="delete_data"
          :size="btnsize"
          v-has:MARKETING_SHIPPER_MANAGE_COUPON_ACTIVITY_MANUAL_SETTING_DELETE
        >删除</el-button>
      </div>
      <div class="info_news">
        <el-table
          ref="multipleTable"
          style="width: 100%"
          stripe
          border
          height="100%"
          :data="tableDataAll"
          @selection-change="getSelection"
          @row-click="clickDetails"
          highlight-current-row
        >
          <el-table-column label="选择" type="selection" width="50"></el-table-column>
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column label="创建人" prop="creater" sortable></el-table-column>
          <el-table-column label="创建时间" prop="createTime" sortable></el-table-column>
          <el-table-column label="活动名称" prop="activityName" sortable width="250">
            <template slot-scope="scope">
              <h4 class="needMoreInfo" @click="JoinDetail(scope.row)">{{ scope.row.activityName}}</h4>
            </template>
          </el-table-column>
          <!-- <el-table-column label="活动类型" prop="activityType" sortable></el-table-column> -->
          <el-table-column label="发放区域" prop="areaName" show-overflow-tooltip sortable></el-table-column>
          <!-- <el-table-column  label="已派发优惠券金额" prop="distribution" sortable>
            </el-table-column>       
            <el-table-column  label="已使用优惠券金额" prop="alreadyuse" sortable>
          </el-table-column>-->
          <el-table-column label="开始时间" prop="startTime" sortable></el-table-column>
          <el-table-column label="结束时间" prop="endTime" sortable></el-table-column>
          <el-table-column label="活动状态" sortable prop="activityState">
            <template
              slot-scope="scope"
            >{{ (scope.row.activityState == 'AF047002'&&'进行中')||(scope.row.activityState == 'AF047001'&&'未开始')||(scope.row.activityState == 'AF047003'&&'已结束') }}</template>
          </el-table-column>
        </el-table>
        <!-- 页码 -->
        <div class="info_tab_footer">
          共计:{{ dataTotal }}
          <div class="show_pager">
            <Pager :total="dataTotal" @change="handlePageChange" :sizes="sizes" ref="pager" />
          </div>
        </div>
      </div>
    </div>
    <automationcheck
      :params="selectRowData"
      :editType="type"
      :typetitle="typetitle"
      :typedialog="typedialog"
      :dialogFormVisible_add.sync="dialogFormVisible_add"
      @getData="getDataList"
      :paramsId="paramsId"
    />
  </div>
</template>

<script>
import {
  data_CarList,
  data_MaidLevel,
  data_ServerClassList
} from "@/api/server/areaPrice.js";
import {
  data_get_couponActivehand_list,
  data_Del_couponActive,
  data_Able_couponActive,
  data_automationActive,
  data_couponActive,
  data_couponActiveTime,
  data_couponStatus
} from "@/api/marketing/shippermarkting/couponActive.js";
import GetCityList from "@/components/GetCityList/city";
import { eventBus } from "@/eventBus";
import Pager from "@/components/Pagination/index";
import { parseTime, pickerOptions2 } from "@/utils/";
import newautocoupon from "./newautocoupon";
import automationcheck from "./automationcheck";
import modautocoupon from "./modautocoupon";
import couponGive from "./couponGive";
import { getDictionary } from "@/api/common.js";
export default {
  props: {
    types: {
      type: [Object, String],
      default: ""
    }
  },
  data() {
    return {
      buttonStatus: false,
      loading: true,
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      btnsize: "mini",
      selectRowData: [],
      selectId: [],
      createTime: null,
      tableDataAll: [],
      dataTotal: null,
      type: "", //新增或者修改或者详情
      typetitle: "", //新增或者详情title
      sizes: [20, 50, 100],
      pagesize: 20, //每页显示数
      page: 1, //当前页
      formAllData: {
        activityName: null,
        activityState: null,
        areaCode: null,
        startTime: null,
        endTime: null,
        areaName: null
      },
      typedialog: false,
      activeList: [{ code: null, name: "全部" }],
      paramsId: null,
      dialogFormVisible_add: false
    };
  },
  components: {
    Pager,
    newautocoupon,
    automationcheck,
    modautocoupon,
    couponGive,
    GetCityList
  },
  methods: {
    // 列表刷新页面
    firstblood() {
      this.loading = true;
      data_get_couponActivehand_list(
        this.page,
        this.pagesize,
        this.formAllData
      ).then(res => {
        this.dataTotal = res.data.totalCount;
        this.tableDataAll = res.data.list;
        this.loading = false;
      });
    },
    getStr(val) {
      if (!val.area) {
        this.formAllData.areaCode = val.city.code;
      } else {
        this.formAllData.areaCode = val.area.code;
      }
    },
    //每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    cTime(i) {
      if (i !== null) {
        this.formAllData.startTime = i[0];
        this.formAllData.endTime = i[1];
      } else {
        this.formAllData.startTime = null;
        this.formAllData.endTime = null;
      }
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
      this.createTime = null;
      this.formAllData = {
        activityName: null,
        activityState: null,
        startTime: null,
        endTime: null,
        areaCode: null,
        province: null,
        city: null,
        area: null,
        areaName: null
      };
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.$refs.area.clearData();
      this.firstblood();
    },

    // 判断选中与否
    getSelection(val) {
      console.log("选中内容", val);
      this.selectRowData = val;
      if (
        val.length == 1 &&
        (val[0].activityState == "AF047001" ||
          val[0].activityState == "AF047003")
      ) {
        this.buttonStatus = true;
      } else {
        this.buttonStatus = false;
      }
    },
    //点击选中当前行
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    // 选择删除
    delete_data() {
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
        this.delDataInformation();
      }
    },
    //确认删除
    delDataInformation() {
      this.$confirm("确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          data_Del_couponActive(this.selectRowData[0].id)
            .then(res => {
              this.$message.success("删除成功");
              this.firstblood();
              this.$refs.multipleTable.clearSelection();
            })
            .catch(err => {
              this.$message({
                type: "info",
                message: "操作失败，原因：" + err.text ? err.text : err
              });
              this.$refs.multipleTable.clearSelection();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
          this.$refs.multipleTable.clearSelection();
        });
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
        this.selectId = [this.selectRowData[0].id];

        data_Able_couponActive(this.selectId).then(res => {
          this.selectId.splice(0, 1);
          if (this.selectRowData[0].usingStatus == 1) {
            this.$message.warning("已禁用");
          } else {
            this.$message.success("已启用");
          }
          this.firstblood();
          this.selectRowData = "";
        });
      }
    },
    getMoreInformation() {
      getDictionary("AF0470").then(res => {
        res.data.map(item => {
          this.activeList.push(item);
        });
        // this.activeList.splice(0, 1);
      });
    },
    //进入详情
    JoinDetail(i) {
      this.type = "view";
      this.typetitle = "详情";
      this.dialogFormVisible_add = true;
      this.paramsId = i.id;
      this.typedialog = false;
    },
    getDataList() {
      this.firstblood();
      this.paramsId = null;
      this.$refs.multipleTable.clearSelection();
    }
  },
  mounted() {
    // if (this.types == "two") this.formAllData.usingStatus = "1";
    this.getMoreInformation();
    this.firstblood();
    setTimeout(() => {
      this.$refs.multipleTable.$el.style.height =
        this.$refs.multipleTable.$el.offsetHeight + "px";
    }, 300);
    if (this.$route.query.activityType == "two") {
      this.type = "view";
      this.typetitle = "详情";
      this.dialogFormVisible_add = true;
      this.paramsId = this.$route.query.activityId;
      this.typedialog = true;
    }
  }
};
</script>
<style lang="scss">
.Marketing {
  .el-cascader {
    margin-top: -10px;
  }
  .sw {
    display: inline-block;
  }
}
</style>
