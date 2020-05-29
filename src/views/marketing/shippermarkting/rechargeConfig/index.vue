<template>
  <div class="identicalStyle" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="活动城市" prop="actCityCode">
        <getCityList
          class="chooseItem"
          @returnStr="getStrEnd"
          v-model="formAll.actCityCode"
          ref="endArea"
        ></getCityList>
      </el-form-item>
      <!-- <el-form-item label="活动时间">
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
      </el-form-item>-->
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
          v-has:MARKETING_SHIPPER_MANAGE_RECHARGECONFIGURATION_ADD
        >新增</el-button>
        <el-button
          type="primary"
          icon="el-icon-edit"
          plain
          :size="btnsize"
          @click="handleClick('edit')"
          v-has:MARKETING_SHIPPER_MANAGE_RECHARGECONFIGURATION_MODIFY
        >修改</el-button>
        <el-button
          type="primary"
          plain
          icon="el-icon-bell"
          @click="handleUseStates"
          :size="btnsize"
          v-has:MARKETING_SHIPPER_MANAGE_RECHARGECONFIGURATION_ENABLEDISABLE
        >启用/停用</el-button>
        <el-button
          type="primary"
          plain
          icon="el-icon-delete"
          :size="btnsize"
          @click="delete_data"
          v-has:MARKETING_SHIPPER_MANAGE_RECHARGECONFIGURATION_DELETE
        >删除</el-button>
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
          <el-table-column
            label="活动城市"
            prop="actCityName"
            sortable
            show-overflow-tooltip
            min-width="150"
          >
            <!-- <template slot-scope="scope">
              <h4 class="needMoreInfo" @click="JoinDetail(scope.row)">{{ scope.row.activityName}}</h4>
            </template>-->
          </el-table-column>
          <el-table-column
            label="充值档位"
            prop="rechargeGearText"
            sortable
            show-overflow-tooltip
            min-width="230"
          ></el-table-column>
          <el-table-column
            label="活动状态"
            prop="actStatus"
            sortable
            show-overflow-tooltip
            min-width="120"
          >
            <template slot-scope="scope">
              <span
                :class="{blackName:scope.row.actStatus == '2',normalName:scope.row.actStatus == '1'}"
              >{{scope.row.actStatus=='1'?'启用':'停用'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="创建人"
            prop="operatorName"
            sortable
            show-overflow-tooltip
            min-width="180"
          ></el-table-column>
          <el-table-column
            label="创建时间"
            prop="updateTime"
            sortable
            show-overflow-tooltip
            min-width="180"
          >
            <template slot-scope="scope">{{scope.row.updateTime|parseTime}}</template>
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

    <operate
      :params="selectRowData"
      :editType="type"
      :typetitle="typetitle"
      :rechargedialogFormVisible.sync="rechargedialogFormVisible"
      @getData="getDataList"
    />
  </div>
</template>
<script>
import {
  rechargeDiscountSettingsList,
  rechargeDiscountSettingsChangeState,
  rechargeDiscountSettingsListDelete
} from "@/api/marketing/shippermarkting/rechargeConfig.js";
import { getDictionary } from "@/api/common.js";
import { eventBus } from "@/eventBus";
import Pager from "@/components/Pagination/index";
import { parseTime, pickerOptions2 } from "@/utils/";
import operateComponent from "./operateComponent";
import getCityList from "@/components/GetCityList/chinaMap1";
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
      radio: 1,
      optionsCoupon: [], //领取类型
      optionsTime: [], //领取间隔时间
      formAll: {
        actCityCode: "",
        actCityName: "",
        province: "",
        city: ""
      },
      //   created: [],
      rechargedialogFormVisible: false
    };
  },
  props: {},
  components: {
    Pager,
    getCityList,
    operate: operateComponent
  },
  methods: {
    // 获取  服务和车辆 类型列表
    getMoreInformation() {
      //   getDictionary("AF0465").then(res => {
      //     this.optionsCoupon = res.data;
      //   });
      //   getDictionary("AF0466").then(res => {
      //     this.optionsTime = res.data;
      //   });
    },
    getStrEnd(d) {
      this.formAll.province = d.province ? d.province.name : "";
      this.formAll.city = d.city ? d.city.name : "";
      this.formAll.actCityCode = d.city ? d.city.code : "";
      this.formAll.actCityName =
        d.city.name == d.province.name
          ? d.city.name
          : d.province.name + d.city.name;
    },
    // 活动时间
    // cTime(i) {
    //   if (i) {
    //     this.formAll.createStartTime = i[0];
    //     this.formAll.createEndTime = i[1];
    //   } else {
    //     this.formAll.createStartTime = "";
    //     this.formAll.createEndTime = "";
    //   }
    // },
    // 列表刷新页面
    firstblood() {
      this.loading = true;
      rechargeDiscountSettingsList(this.page, this.pagesize, this.formAll)
        .then(res => {
          this.dataTotal = res.data.totalCount;
          this.tableDataAll = res.data.list;
          this.loading = false;
        })
        .catch(err => {
          this.$message.error(err.errorInfo || err.text);
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
      this.formAll = {
        actCityCode: "",
        actCityName: "",
        province: "",
        city: ""
      };
      this.$refs.endArea.clearData();
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
            this.rechargedialogFormVisible = true;
            break;
          case "edit":
            this.type = "edit";
            this.typetitle = "修改";
            this.rechargedialogFormVisible = true;
            break;
        }
      }
    },
    //进入详情
    // JoinDetail(i) {
    //   this.type = "view";
    //   this.typetitle = "详情";
    //   this.dialogFormVisible_add = true;
    //   this.selectRowData = [i];
    // },
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
      } else {
        this.$message.info("正在操作中");
        this.selectId = [];
        this.selectRowData.map(item => {
          this.selectId.push(item.id);
        });
        rechargeDiscountSettingsChangeState(this.selectId).then(res => {
          this.selectId.length == 1
            ? this.selectRowData[0].actStatus == "2"
              ? this.$message.success("启用成功")
              : this.$message.success("停用成功")
            : this.$message.success("启用/停用成功");
          this.firstblood();
          this.$refs.multipleTable.clearSelection();
        });
      }
    },
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
          rechargeDiscountSettingsListDelete(this.selectRowData[0].id)
            .then(res => {
              this.$message.success("删除成功");
              this.firstblood();
              this.$refs.multipleTable.clearSelection();
            })
            .catch(err => {
              this.$message({
                type: "info",
                message:
                  "操作失败，原因：" + err.errorInfo ? err.errorInfo : err.text
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
    getDataList() {
      this.firstblood();
      this.$refs.multipleTable.clearSelection();
    }
  },

  mounted() {
    this.getMoreInformation();
    this.firstblood();
    setTimeout(() => {
      this.$refs.multipleTable.$el.style.height =
        this.$refs.multipleTable.$el.offsetHeight + "px";
    }, 300);
  }
};
</script>
<style lang="scss">
</style>

