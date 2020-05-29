<template>
  <div class="identicalStyle" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="活动区域">
        <!-- <getCityList class="chooseItem" @returnStr="getStrEnd" ref="endArea" :isArea="true"></getCityList> -->
        <el-input v-model="formAll.areaText"></el-input>
      </el-form-item>
      <el-form-item label="服务分类">
        <el-select v-model="formAll.serviceClassify" clearable placeholder="请选择">
          <el-option
            v-for="item in orderTypeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
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
        >新增</el-button>
        <el-button
          type="primary"
          icon="el-icon-edit"
          plain
          :size="btnsize"
          @click="handleClick('edit')"
        >修改</el-button>
        <el-button
          type="primary"
          plain
          icon="el-icon-bell"
          @click="handleUseStates"
          :size="btnsize"
        >启用/禁用</el-button>
        <el-button
          type="primary"
          plain
          icon="el-icon-delete"
          :size="btnsize"
          @click="handleClick('view')"
        >查看活动数据</el-button>
      </div>
      <div class="info_news">
        <el-table
          ref="multipleTable"
          style="width: 100%"
          stripe
          border
          height="100%"
          @row-click="clickDetails"
          :data="tableDataAll"
          tooltip-effect="dark"
        >
          <el-table-column label="选择" type="selection" width="50">
            <template slot-scope="scope">
              <el-radio class="radio" v-model="radio" :label="scope.row.id">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            label="活动区域"
            prop="areaText"
            sortable
            show-overflow-tooltip
            min-width="150"
          ></el-table-column>
          <el-table-column
            label="服务类型"
            prop="serviceClassifyName"
            sortable
            show-overflow-tooltip
            min-width="120"
          ></el-table-column>
          <el-table-column
            label="每单基础津贴(元)"
            prop="orderBaseSubsidy"
            sortable
            show-overflow-tooltip
            min-width="160"
          ></el-table-column>
          <el-table-column
            label="同一用户单月津贴最大单量(单)"
            prop="userMonthOrdersLimit"
            sortable
            show-overflow-tooltip
            min-width="200"
          ></el-table-column>
          <el-table-column
            label="活动开始时间"
            prop="actStartMonth"
            sortable
            show-overflow-tooltip
            min-width="160"
          >
            <template slot-scope="scope">{{scope.row.actStartMonth|formatTime}}</template>
          </el-table-column>
          <el-table-column
            label="活动结束时间"
            prop="actEndMonth"
            sortable
            show-overflow-tooltip
            min-width="160"
          >
            <template slot-scope="scope">{{scope.row.actEndMonth|formatTime}}</template>
          </el-table-column>
          <el-table-column label="状态" prop="status" sortable show-overflow-tooltip min-width="90">
            <template slot-scope="scope">
              <span
                :class="{blackName:scope.row.status == '0',normalName:scope.row.status == '1'}"
              >{{scope.row.statusText}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="最新操作人"
            prop="operatorName"
            sortable
            show-overflow-tooltip
            min-width="140"
          ></el-table-column>
          <el-table-column
            label="最新操作时间"
            prop="updateTime"
            sortable
            show-overflow-tooltip
            min-width="160"
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

    <addOrEdit
      :params="selectRowData"
      :editType="type"
      :typetitle="typetitle"
      :subsidyDialogFormVisible.sync="subsidyDialogFormVisible"
      @getData="getDataList"
      :orderTypeList="orderTypeList"
    />
  </div>
</template>
<script>
import {
  subsidyActivitySettingsList,
  subsidyActivitySettingsEnable,
  subsidyActivitySettingsDisable
} from "@/api/marketing/shippermarkting/deliverySubsidy.js";
import { getDictionary } from "@/api/common.js";
import { eventBus } from "@/eventBus";
import Pager from "@/components/Pagination/index";
import { parseTime, pickerOptions2 } from "@/utils/";
import addOrEdit from "./addOrEdit";
// import getCityList from "@/components/GetCityList/chinaMap1";
import { DicServiceType } from "@/api/common.js";
export default {
  data() {
    return {
      loading: false,
      btnsize: "mini",
      selectRowData: null,
      type: "", //新增或者修改或者详情
      typetitle: "", //新增或者详情title
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      dataTotal: 0,
      tableDataAll: [],
      radio: "",
      formAll: {
        areaText: "",
        serviceClassify: null
      },
      orderTypeList: [{ name: "全部", code: null }],
      subsidyDialogFormVisible: false
    };
  },
  props: {},
  components: {
    Pager,
    // getCityList
    addOrEdit
  },
  filters: {
    formatTime(val) {
      let temVal = val.toString();
      if (temVal && temVal.toString().charAt(4) == 0) {
        return temVal.slice(0, 4) + "年" + temVal.slice(5) + "月";
      } else {
        return temVal.slice(0, 4) + "年" + temVal.slice(4) + "月";
      }
    }
  },
  methods: {
    // 获取服务类型列表
    getMoreInformation() {
      DicServiceType().then(res => {
        this.orderTypeList.push(...res.data);
      });
    },
    // getStrEnd(d) {
    //   this.formAll.province = d.province ? d.province.name : "";
    //   this.formAll.city = d.city ? d.city.name : "";
    //   this.formAll.area = d.area ? d.area.name : "";
    //   this.formAll.cityCode = d.city ? d.city.code : "";
    //   this.formAll.areaCode = d.area ? d.area.code : "";
    //   this.formAll.provinceCode = d.province ? d.province.code : "";
    // },
    // 列表刷新页面
    firstblood() {
      this.loading = true;
      this.radio = "";
      subsidyActivitySettingsList(this.page, this.pagesize, this.formAll)
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
        areaText: "",
        serviceClassify: null
      };
      // this.$refs.endArea.clearData();
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.firstblood();
    },
    handleClick(type) {
      if (!this.selectRowData && type !== "add") {
        this.$message.warning("请选择您要操作的数据");
      } else {
        switch (type) {
          case "add":
            this.type = "add";
            this.typetitle = "新增";
            this.subsidyDialogFormVisible = true;
            break;
          case "edit":
            this.type = "edit";
            this.typetitle = "修改";
            this.subsidyDialogFormVisible = true;
            break;
          case "view":
            this.$router.push({
              name: "发货津贴活动数据",
              query: {
                subsidyActivityId: this.selectRowData.id
              }
            });
        }
      }
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
      //   this.$refs.multipleTable.toggleRowSelection(row);
      this.radio = row.id;
      this.selectRowData = row;
      console.log("选中内容", this.selectRowData);
    },
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    // 启用禁用
    handleUseStates() {
      if (!this.selectRowData) {
        this.$message.warning("请选择您要操作的数据");
        return;
      } else {
        this.$message.info("正在操作中...");
        if (this.selectRowData.status == 0) {
          subsidyActivitySettingsEnable(this.selectRowData.id)
            .then(res => {
              this.$message.success("已启用");
              this.firstblood();
            })
            .catch(err => {
              this.$message.error(err.errorInfo || err.text);
            });
        } else {
          subsidyActivitySettingsDisable(this.selectRowData.id)
            .then(res => {
              this.$message.success("已禁用");
              this.firstblood();
            })
            .catch(err => {
              this.$message.error(err.errorInfo || err.text);
            });
        }
      }
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

