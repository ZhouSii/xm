<template>
  <div class="identicalStyle" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="活动区域">
        <!-- <getCityList class="chooseItem" @returnStr="getStrEnd" ref="endArea" :isArea="true"></getCityList> -->
        <el-input v-model="formAll.areaText"></el-input>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="formAll.name"></el-input>
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
          <el-table-column label="活动ID" prop="id" sortable show-overflow-tooltip min-width="180"></el-table-column>
          <el-table-column
            label="区域"
            prop="areaText"
            sortable
            show-overflow-tooltip
            min-width="140"
          ></el-table-column>
          <el-table-column label="标题" prop="name" sortable show-overflow-tooltip min-width="140"></el-table-column>
          <el-table-column
            label="活动时间"
            prop="actPeriod"
            sortable
            show-overflow-tooltip
            min-width="310"
          ></el-table-column>
          <el-table-column
            label="每天领取次数限制"
            prop="daynumTime"
            sortable
            show-overflow-tooltip
            min-width="160"
          ></el-table-column>
          <el-table-column
            label="活动期内领取次数限制"
            prop="activitynumTime"
            sortable
            show-overflow-tooltip
            min-width="190"
          ></el-table-column>
          <el-table-column
            label="状态"
            prop="usingStatus"
            sortable
            show-overflow-tooltip
            min-width="80"
          >
            <template slot-scope="scope">
              <span
                :class="{blackName:scope.row.usingStatus == '1',normalName:scope.row.usingStatus == '0'}"
              >{{scope.row.usingStatus==0?'启用':'禁用'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="最新操作人"
            prop="updater"
            sortable
            show-overflow-tooltip
            min-width="120"
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
          <el-table-column label="创建人" prop="creater" sortable show-overflow-tooltip min-width="90"></el-table-column>
          <el-table-column
            label="创建时间"
            prop="createTime"
            sortable
            show-overflow-tooltip
            min-width="160"
          >
            <template slot-scope="scope">{{scope.row.createTime|parseTime}}</template>
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

    <addOrModify
      :params="selectRowData"
      :editType="type"
      :typetitle="typetitle"
      :shareActCarDialogVisible.sync="shareActCarDialogVisible"
      @getData="getDataList"
    />
  </div>
</template>
<script>
import {
  aflcSharingActivitiesList,
  getFoundationRewardList,
  aflcSharingActivitiesChangeStatus
} from "@/api/marketing/shippermarkting/shareAct.js";
import { getDictionary } from "@/api/common.js";
import Pager from "@/components/Pagination/index";
import { parseTime, pickerOptions2 } from "@/utils/";
import addOrModify from "./addOrModify";
// import getCityList from "@/components/GetCityList/chinaMap1";
export default {
  data() {
    return {
      loading: true,
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
        areaCode: "",
        name: null,
        userType: "0" //0车主 1货主
      },
      shareActCarDialogVisible: false,
      selectId: [],
      passData: null
    };
  },
  components: {
    Pager,
    addOrModify
  },
  props: {
    isvisible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isvisible: {
      handler(newVal, oldVal) {
        if (newVal) {
          setTimeout(() => {
            this.$refs.multipleTable.$el.style.height =
              this.$refs.multipleTable.$el.offsetHeight + "px";
          }, 300);
          this.firstblood();
        }
      },
      immediate: true
    }
  },
  methods: {
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
      aflcSharingActivitiesList(this.page, this.pagesize, this.formAll)
        .then(res => {
          this.dataTotal = res.data.totalCount;
          this.tableDataAll = res.data.list;
          this.loading = false;
          this.tableDataAll.map(item => {
            item.actPeriod =
              parseTime(item.startTime, "{y}-{m}-{d}") +
              " 至 " +
              parseTime(item.endTime, "{y}-{m}-{d}");
          });
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
        areaCode: "",
        name: null,
        userType: "0"
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
            this.shareActCarDialogVisible = true;
            break;
          case "edit":
            this.type = "edit";
            this.typetitle = "修改";
            this.shareActCarDialogVisible = true;
            break;
          case "view":
            this.$router.push({
              name: "车主分享活动数据",
              query: {
                shareActivityId: this.selectRowData.id
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
        this.$message.info("正在操作中");
        this.selectId = [this.selectRowData.id];
        aflcSharingActivitiesChangeStatus(this.selectId).then(res => {
          this.selectRowData.usingStatus == "1"
            ? this.$message.success("启用成功")
            : this.$message.success("禁用成功");
          this.radio = "";
          this.firstblood();
        });
      }
    },
    getDataList() {
      this.firstblood();
      this.radio = "";
    }
  }
};
</script>
<style lang="scss">
</style>

