<template>
  <div style="height:100%;" class="identicalStyle" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="注册所在地">
        <el-input v-model.trim="formInline.regisAddress"></el-input>
      </el-form-item>
      <el-form-item label="认证所在地">
        <el-input v-model.trim="formInline.belongCityName"></el-input>
      </el-form-item>
      <el-form-item label="认证状态">
        <el-select v-model="formInline.driverStatus" placeholder="请选择" clearable>
          <el-option
            v-for="item in optionsService"
            :key="item.code"
            :label="item.name"
            :value="item.code"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账户接单状态">
        <el-select v-model="formInline.accountStatus" placeholder="请选择" clearable>
          <el-option
            v-for="item in optionsAuidSataus"
            :key="item.id"
            :label="item.name"
            :value="item.code"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="在线状态">
        <el-select v-model="formInline.isOnLine" placeholder="请选择" clearable>
          <el-option
            v-for="item in isOnLineList"
            :key="item.id"
            :label="item.name"
            :value="item.code"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属业务员">
        <el-input v-model.trim="formInline.belongSalesmanName" clearable placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="身份证号码">
        <el-input v-model.trim="formInline.driverCardid" clearable placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="车主姓名">
        <el-input placeholder="请输入内容" v-model.trim="formInline.driverName" clearable></el-input>
      </el-form-item>
      <el-form-item label="账户登录状态">
        <el-select v-model="formInline.usingStatus" placeholder="请选择" clearable>
          <el-option
            v-for="item in usingStatusList"
            :key="item.id"
            :label="item.name"
            :value="item.code"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input
          placeholder="请输入内容"
          v-model.trim="formInline.driverMobile"
          clearable
          maxlength="11"
        ></el-input>
      </el-form-item>
      <el-form-item label="车主车牌号">
        <el-input placeholder="请输入内容" v-model.trim="formInline.carNumber" clearable></el-input>
      </el-form-item>
      <el-form-item label="注册时间段">
        <el-date-picker
          is-range
          unlink-panels
          type="daterange"
          :picker-options="pickerOptions2"
          v-model="createTime"
          range-separator="-"
          clear-icon
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
          :default-time="['00:00:00', '23:59:59']"
          @change="cTime"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="需要后续跟进">
        <el-select v-model="formInline.driverFollowUp" placeholder="请选择" clearable>
          <el-option
            v-for="item in driverFollowUpList"
            :key="item.id"
            :label="item.name"
            :value="item.code"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否广告车">
        <el-select v-model="formInline.isAd" placeholder="请选择" clearable>
          <el-option
            v-for="item in isAdList"
            :key="item.id"
            :label="item.name"
            :value="item.code"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="注册来源">
        <el-input placeholder="请输入内容" v-model.trim="formInline.registerOriginName" clearable></el-input>
      </el-form-item>
      <el-form-item class="fr">
        <el-button
          type="primary"
          plain
          @click="getdata_search"
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
        <driver-newTemplate
          btntext="新增"
          v-has:DRIVER_MANAGE_ADD
          :plain="true"
          type="primary"
          btntype="primary"
          icon="el-icon-circle-plus"
          editType="add"
          btntitle="新增车主"
          @getData="getDataList"
        ></driver-newTemplate>

        <freeze-change-template
          btntext="冻结接单"
          type="primary"
          v-has:DRIVER_MANAGE_FREEZE
          btntitle="冻结接单"
          :plain="true"
          editType="edit"
          btntype="primary"
          icon="fontFamily aflc-icon-dongjie1"
          :params="selectRowData"
          @getData="getDataList"
        ></freeze-change-template>
        <freeze-change-template
          btntext="冻结接单修改"
          type="primary"
          v-has:DRIVER_MANAGE_FREEZE_UPDATE
          btntitle="冻结接单修改"
          :plain="true"
          editType="edit-two"
          btntype="primary"
          icon="el-icon-edit"
          :params="selectRowData"
          @getData="getDataList"
        ></freeze-change-template>
        <freeze-change-template
          btntext="接单解冻"
          v-has:DRIVER_MANAGE_UNFREEZE
          type="primary"
          btntitle="接单解冻"
          :plain="true"
          editType="edit-three"
          btntype="primary"
          icon="fontFamily aflc-icon-jiedong1"
          :params="selectRowData"
          @getData="getDataList"
        ></freeze-change-template>
        <blacklist
          btntext="移入接单黑名单"
          v-has:DRIVER_MANAGE_PUT_BLACK
          type="primary"
          btntitle="移入接单黑名单"
          :plain="true"
          editType="edit-four"
          btntype="primary"
          icon="fontFamily aflc-icon-heimingdan"
          :params="selectRowData"
          @getData="getDataList"
        ></blacklist>
        <blacklist
          btntext="移出接单黑名单"
          v-has:DRIVER_MANAGE_OUT_BLACK
          type="primary"
          btntitle="移出接单黑名单"
          :plain="true"
          editType="edit-five"
          btntype="primary"
          icon="fontFamily aflc-icon-yichuheimingdan"
          :params="selectRowData"
          @getData="getDataList"
        ></blacklist>
        <el-button
          type="primary"
          plain
          icon="el-icon-bell"
          @click="handleUseStates"
          :size="btnsize"
          v-has:DRIVER_MANAGE_USE
        >启用/禁用</el-button>
        <modifyCarMoilb
          btntext="修改手机号"
          :plain="true"
          type="primary"
          btntype="primary"
          icon="el-icon-edit"
          editType="add"
          btntitle="修改手机号"
          :params="selectRowData"
          @getData="getDataList"
          v-has:DRIVER_MANAGE_UPDATE_MOBILE
        ></modifyCarMoilb>
        <CarBelongSalesman
          btntext="批量增加业务员"
          v-has:DRIVER_MANAGE_BATCH_ADD_SALESMAN
          :plain="true"
          type="primary"
          btntype="primary"
          icon="el-icon-user-solid"
          btntitle="批量增加业务员"
          :params="selectRowData"
          @getData="getDataList"
        ></CarBelongSalesman>

        <el-button
          type="primary"
          plain
          @click="CarLine"
          :size="btnsize"
          icon="el-icon-location"
          v-has:DRIVER_MANAGE_GET_DRIVER_TRAJECTORY
        >获取车主轨迹</el-button>
      </div>
      <div class="info_news">
        <el-table
          ref="multipleTable"
          :data="tableDataTree"
          stripe
          border
          height="100%"
          highlight-current-row
          current-row-key
          tooltip-effect="dark"
          @selection-change="getSelection"
          @row-click="clickDetails"
          style="width: 100%"
        >
          <el-table-column label="选择" type="selection" width="50"></el-table-column>
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="driverMobile" label="手机号" sortable width="140">
            <template slot-scope="scoped">
              <driver-newTemplate
                :paramsView="scoped.row"
                :btntext="scoped.row.driverMobile"
                :driverStatus="scoped.row.driverStatus"
                type="primary"
                btntype="text"
                editType="view"
                btntitle="车主详情"
              ></driver-newTemplate>
            </template>
          </el-table-column>
          <el-table-column prop="carNumber" width="120" label="车牌号" sortable show-overflow-tooltip></el-table-column>
          <el-table-column prop="driverName" label="车主" width="120" show-overflow-tooltip sortable></el-table-column>
          <el-table-column prop="registerOriginName" width="100" label="注册来源" sortable></el-table-column>
          <el-table-column prop="accountStatusName" label="账户状态" sortable width="100">
            <template slot-scope="scope">
              <span
                :class="{freezeName: scope.row.accountStatusName == '冻结中' ,blackName: scope.row.accountStatusName == '黑名单',normalName :scope.row.accountStatusName == '正常'}"
              >{{scope.row.accountStatusName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="usingStatus" width="120" label="账户登录状态" sortable>
            <template slot-scope="scope">
              <span class="normalName" v-if="scope.row.usingStatus=='1'">启用</span>
              <span class="blackName" v-else>禁用</span>
            </template>
          </el-table-column>
          <el-table-column
            width="150"
            prop="regisAddress"
            label="注册所在地"
            sortable
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            width="150"
            prop="belongCityName"
            label="认证所在地"
            sortable
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="belongCustomerService"
            label="所属客服"
            sortable
            width="120"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="belongSalesmanName"
            label="所属业务员"
            sortable
            width="120"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="dataSourcesType" label="是否马甲车主" sortable width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.dataSourcesType == '1'">马甲</span>
              <span v-if="scope.row.dataSourcesType == '2'">爬虫</span>
              <span v-if="scope.row.dataSourcesType == '3'">手工</span>
              <span v-if="scope.row.dataSourcesType == '4'">真实</span>
            </template>
          </el-table-column>
          <el-table-column prop="isOnLine" label="是否在线" sortable width="100">
            <template slot-scope="scope">
              <span class="blackName" v-if="scope.row.isOnLine=='0'">不在线</span>
              <span class="normalName" v-else>在线</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="driverStatusName"
            label="状态"
            sortable
            width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="driverFollowUp" sortable label="需要后续跟进" width="120">
            <template slot-scope="scope">{{scope.row.driverFollowUp == '1' ? '是' : '否'}}</template>
          </el-table-column>
          <el-table-column prop="createTime" width="155" label="注册日期" sortable>
            <template slot-scope="scope">
              <span v-if="scope.row.createTime">{{ scope.row.createTime | parseTime}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="authenticationTime"
            label="提交认证时间"
            sortable
            width="180"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
        <div class="info_tab_footer">
          共计:{{ totalCount }}
          <div class="show_pager">
            <Pager :total="totalCount" @change="handlePageChange" ref="pager" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import {
  data_get_driver_list,
  data_get_driver_status,
  data_get_shipper_auid,
  DriverCarenableOrDisable
} from "@/api/users/carowner/total_carowner.js";
import DriverNewTemplate from "../carowner/driver-newTemplate1";
import { parseTime, formatTime, pickerOptions2 } from "@/utils/index.js";
import vregion from "@/components/vregion/Region";
import { eventBus } from "@/eventBus";
import Pager from "@/components/Pagination/index";
import FreezeChangeTemplate from "../carowner/freeze-change-template";
import GetCityList from "@/components/GetCityList/city";
import blacklist from "../carowner/blacklist";
import modifyCarMoilb from "../carowner/modifyCarMoilb";
import carMapDetail from "../carowner/carMapDetail";
import CarBelongSalesman from "../carowner/CarBelongSalesman";
export default {
  data() {
    return {
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      createTime: [],
      loading: true,
      btnsize: "mini",
      selectId: [], //选中的数组
      optionsAuidSataus: [], // 账户状态列表
      page: 1, //当前页
      pagesize: 20, //每页显示数
      totalCount: null, //总记录数
      formInline: {
        //查询条件
        driverMobile: "",
        driverStatus: "",
        carNumber: "",
        accountStatus: "",
        belongCity: null,
        regisAddress: null,
        belongCityName: null,
        isOnLine: null,
        usingStatus: null,
        driverFollowUp: null,
        driverName: null,
        registerStartTime: null,
        registerEndTime: null,
        isAd: null
      },
      belongCityName: null,
      tableDataTree: [], //定义列表记录
      optionsService: [
        //状态
        {
          code: null,
          name: "全部"
        }
      ],
      isOnLineList: [
        { code: "0", name: "不在线" },
        { code: "1", name: "在线" }
      ],
      usingStatusList: [
        { code: "1", name: "启用" },
        { code: "0", name: "禁用" }
      ],
      driverFollowUpList: [
        { code: "0", name: "否" },
        { code: "1", name: "是" }
      ],
      isAdList: [
        { code: "0", name: "否" },
        { code: "1", name: "是" }
      ],
      selectRowData: [],
      selected: [] //暂存的数据
    };
  },
  props: {
    isvisible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    vregion,
    DriverNewTemplate,
    FreezeChangeTemplate,
    Pager,
    blacklist,
    GetCityList,
    modifyCarMoilb,
    carMapDetail,
    CarBelongSalesman
  },
  created() {},
  watch: {
    isvisible: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.firstblood();
          this.getMoreInformation();
        }
      },
      immediate: true
    }
  },
  mounted() {},

  methods: {
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    clearSearch() {
      this.formInline = {
        driverMobile: null,
        belongCity: null,
        regisAddress: null,
        belongCityName: null,
        driverStatus: null,
        carNumber: null,
        accountStatus: null,
        driverCardid: null,
        isOnLine: null,
        usingStatus: null,
        driverFollowUp: null,
        driverName: null,
        registerStartTime: null,
        registerEndTime: null
      };
      this.createTime = [];
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      // this.$refs.area.clearData();
      this.firstblood();
    },
    // 判断选中与否
    getSelection(val) {
      console.log("选中内容", val);
      this.selectRowData = val;
    },
    //点击选中当前行
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },

    //刷新页面
    firstblood() {
      this.loading = true;
      data_get_driver_list(this.page, this.pagesize, this.formInline).then(
        res => {
          this.totalCount = res.data.totalCount;
          this.tableDataTree = res.data.list;
          this.loading = false;
          this.tableDataTree.forEach(item => {
            item.authenticationTime = parseTime(
              item.authenticationTime,
              "{y}-{m}-{d} {h}:{i}:{s}"
            );
          });
        }
      );
    },

    //点击查询按纽，按条件查询列表
    getdata_search(event) {
      this.page = 1;
      this.$refs.pager.inputval = this.page;
      this.$refs.pager.pageNum = this.page;
      this.firstblood();
    },

    //获取车主状态列表
    getMoreInformation() {
      data_get_driver_status().then(res => {
        res.data.map(item => {
          this.optionsService = res.data;
        });
      });
      // 账户状态获取
      data_get_shipper_auid().then(res => {
        this.optionsAuidSataus = res.data;
      });
    },
    // 启用/禁用
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
        this.selectId.push(this.selectRowData[0].driverId);
        DriverCarenableOrDisable(this.selectId).then(res => {
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
    // 注册时间
    cTime(i) {
      if (i !== null) {
        this.formInline.registerStartTime = i[0];
        this.formInline.registerEndTime = i[1];
      } else {
        this.formInline.registerStartTime = null;
        this.formInline.registerEndTime = null;
      }
    },
    // 获取车主轨迹
    CarLine() {
      this.$router.push({
        name: "获取车主轨迹",
        query: { driverId: this.selectRowData[0].driverId }
      });
    },

    getDataList() {
      this.firstblood();
      this.$refs.multipleTable.clearSelection();
    }
  }
};
</script>
<style lang="scss">
</style>
