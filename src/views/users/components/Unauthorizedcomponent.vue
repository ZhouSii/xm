<template>
  <div class="identicalStyle" v-loading="loading">
    <div class="shipper_searchinfo">
      <el-form inline class="demo-ruleForm classify_searchinfo">
        <el-form-item label="注册所在地">
          <el-input v-model.trim="formInline.regisAddress"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input
            placeholder="请输入内容"
            v-model.trim="formInline.driverMobile"
            clearable
            maxlength="11"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属业务员">
          <el-input v-model.trim="formInline.belongSalesmanName" clearable placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="注册时间段">
          <el-date-picker
            is-range
            unlink-panels
            type="daterange"
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
    </div>
    <div class="classify_info">
      <div class="btns_box">
        <driver-newTemplate
          btntext="代客认证"
          :plain="true"
          type="primary"
          btntype="primary"
          icon="el-icon-check"
          editType="valetAuth_un"
          :params="selectionData"
          driverStatus="AF0010401"
          btntitle="代客认证"
          @getData="getDataList"
          :updataflag="true"
          v-has:DRIVER_MANAGE_VALET_VALIDATED
        ></driver-newTemplate>

        <!-- <driver-newTemplate
          btntext="修改"
          :plain="true"
          type="primary"
          btntype="primary"
          icon="el-icon-edit-outline"
          editType="edit2"
          driverStatus="AF0010401"
          :params="selectionData"
          btntitle="修改"
          @getData="getDataList"
          v-has:DRIVER_MANAGE_UPDATE
          :isclick="isclick"
        ></driver-newTemplate>-->

        <el-button
          type="primary"
          plain
          @click="sendMsg"
          :size="btnsize"
          icon="el-icon-message"
          v-has:DRIVER_MANAGE_SEND_SMS
        >发送邀请认证短信</el-button>
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
          <el-table-column prop="driverMobile" label="手机号" sortable>
            <template slot-scope="scoped">
              <driver-newTemplate
                :paramsView="scoped.row"
                :driverStatus="scoped.row.driverStatus"
                :btntext="scoped.row.driverMobile"
                type="primary"
                btntype="text"
                editType="view"
                btntitle="车主详情"
              ></driver-newTemplate>
            </template>
          </el-table-column>
          <el-table-column prop="carNumber" label="车牌号" sortable></el-table-column>
          <el-table-column prop="driverName" label="车主" width="200" sortable></el-table-column>
          <el-table-column prop="registerOriginName" label="注册来源" sortable></el-table-column>
          <el-table-column prop="accountStatusName" label="账户状态" sortable>
            <template slot-scope="scope">
              <span
                :class="{freezeName: scope.row.accountStatusName == '冻结中' ,blackName: scope.row.accountStatusName == '黑名单',normalName :scope.row.accountStatusName == '正常'}"
              >{{scope.row.accountStatusName}}</span>
            </template>
          </el-table-column>
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
          <el-table-column prop="regisAddress" show-overflow-tooltip label="注册所在地" sortable></el-table-column>
          <el-table-column prop="driverStatusName" label="状态" sortable></el-table-column>
          <el-table-column prop="createTime" label="注册日期" sortable>
            <template slot-scope="scope">
              <span v-if="scope.row.createTime">{{ scope.row.createTime | parseTime}}</span>
            </template>
          </el-table-column>
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
  sendMsgInviteAuth
} from "@/api/users/carowner/total_carowner.js";
import vregion from "@/components/vregion/Region";
import { eventBus } from "@/eventBus";
import { parseTime, formatTime } from "@/utils/index.js";
import GetCityList from "@/components/GetCityList/city";
import Pager from "@/components/Pagination/index";
import DriverNewTemplate from "../carowner/driver-newTemplate1.vue";
export default {
  props: {
    isvisible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    DriverNewTemplate,
    vregion,
    Pager,
    GetCityList
  },
  data() {
    return {
      loading: true,
      btnsize: "mini",
      page: 1, //当前页
      pagesize: 20, //每页显示数
      totalCount: null, //总记录数
      formInline: {
        //查询条件
        driverMobile: null,
        driverStatus: "AF0010401",
        carNumber: null,
        belongCity: null,
        regisAddress: null,
        registerStartTime: null,
        registerEndTime: null
      },
      tableDataTree: [], //定义列表记录
      optionsService: [
        //状态
        {
          code: null,
          name: "全部"
        }
      ],
      createTime: [],
      selectionData: [],
      isclick: false //是否自动点击修改按钮
    };
  },
  created() {},
  watch: {
    isvisible: {
      handler(newVal, oldVal) {
        if (newVal) {
          if (!this.$route.query.mobile) {
            this.firstblood();
          }
        }
      },
      immediate: true
    },
    $route(to, from) {
      // 从客户上报进来进行操作
      if (from.path === "/service/customerReported/index") {
        const self = this;
        if (self.$route.query.mobile) {
          self.formInline.driverMobile = self.$route.query.mobile;
          self.firstblood(true);
        }
      }
    }
  },
  methods: {
    // 从客户上报进来弹出对应框
    toggleOne(data) {
      if (!!data) {
        this.$refs.multipleTable.toggleRowSelection(data);
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    cTime(i) {
      if (i !== null) {
        this.formInline.registerStartTime = i[0];
        this.formInline.registerEndTime = i[1];
      } else {
        this.formInline.registerStartTime = null;
        this.formInline.registerEndTime = null;
      }
    },
    //清空条件
    clearSearch() {
      this.formInline = {
        driverMobile: null,
        driverStatus: "AF0010401",
        carNumber: null,
        belongCity: null,
        regisAddress: null,
        driverCardid: null,
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
    //点击选中当前行
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    // 判断选中与否
    getSelection(val) {
      console.log("选中内容", val);
      this.selectionData = val;
    },
    // 发送短信
    sendMsg() {
      if (this.selectionData.length > 0) {
        let MsgData = [];
        this.selectionData.forEach(item => {
          MsgData.push(item.driverMobile);
        });
        sendMsgInviteAuth(MsgData)
          .then(res => {
            this.$message.success("发送成功");
            this.$refs.multipleTable.clearSelection();
          })
          .catch(err => {
            this.$message.error("发送失败");
            this.$refs.multipleTable.clearSelection();
          });
      } else {
        this.$message.warning("请勾选需要发送邀请认证短信的车主~");
      }
    },
    //刷新页面
    firstblood(boole) {
      const self = this;
      self.loading = true;
      data_get_driver_list(self.page, self.pagesize, self.formInline).then(
        res => {
          self.totalCount = res.data.totalCount;
          self.tableDataTree = res.data.list;
          //  self.tableDataTree.forEach(item => {
          //     item.registerTime = parseTime(item.registerTime,"{y}-{m}-{d}");
          // })
          self.loading = false;
          if (boole) {
            if (self.tableDataTree && self.tableDataTree.length == 1) {
              self.toggleOne(self.tableDataTree[0]);
              self.isclick = true;
              sessionStorage.setItem("once", true);
            }
          } else {
            sessionStorage.setItem("once", false);
          }
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
          this.optionsService.push(item);
        });
      });
    },
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },

    getDataList() {
      this.firstblood();
      this.$refs.multipleTable.clearSelection();
    }
  }
};
</script>