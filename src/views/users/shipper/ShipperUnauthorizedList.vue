<template>
  <div class="identicalStyle" v-loading="loading">
    <searchInfo @change="getSearchParam" :showType="tabType"></searchInfo>
    <div class="classify_info">
      <div class="btns_box">
        <el-button
            type="primary"
            icon="el-icon-document"
            plain
            :size="btnsize"
            @click="handleClick('identification')"
            v-has:SHIPPER_MANAGE_VALET_VALIDATED
        >代客认证</el-button>
        <el-button
            type="primary"
            icon="el-icon-edit-outline"
            plain
            :size="btnsize"
            @click="handleClick('edit')"
            v-has:SHIPPER_MANAGE_UPDATE
        >修改</el-button>
      </div>
      <div class="info_news">
        <el-table
          ref="multipleTable"
          :data="tableData4"
          stripe
          border
          height="100%"
          @selection-change="getSelection"
          @row-click="clickDetails"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="mobile" sortable label="手机号">
            <template slot-scope="scope">
              <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.mobile}}</h4>
            </template>
          </el-table-column>
          <el-table-column prop="contacts" :show-overflow-tooltip="true" sortable label="联系人"></el-table-column>
          <el-table-column sortable prop="registerOriginName" label="注册来源"></el-table-column>
          <el-table-column prop="shipperStatusName" sortable label="认证状态"></el-table-column>
          <el-table-column prop="accountStatusName" sortable label="账户状态">
            <template slot-scope="scope">
              <span
                :class="{freezeName: scope.row.accountStatusName == '冻结中' ,blackName: scope.row.accountStatusName == '黑名单',normalName :scope.row.accountStatusName == '正常'}"
              >{{scope.row.accountStatusName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="regisAddress" :show-overflow-tooltip="true" sortable label="注册所在地"></el-table-column>
          <!-- <el-table-column prop="aflcBusinessInformationList" sortable label="注册业务员" width="150">
                    <template  slot-scope="scope">
                        <span>{{scope.row.aflcBusinessInformationList.length > 0 && scope.row.aflcBusinessInformationList.length == 5 ? scope.row.aflcBusinessInformationList[0].belongSalesmanName : scope.row.belongSalesmanName }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="shipperFollowUp" sortable label="跟进业务员" width="150">
                    <template  slot-scope="scope">
                        <span>{{scope.row.aflcBusinessInformationList.length > 0 && scope.row.aflcBusinessInformationList.length == 5 ? scope.row.aflcBusinessInformationList[3].belongSalesmanName : scope.row.belongSalesmanName }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="shipperFollowUp" sortable label="跟进客服" width="150">
                    <template  slot-scope="scope">
                        <span>{{scope.row.aflcBusinessInformationList.length > 0 && scope.row.aflcBusinessInformationList.length == 5 ? scope.row.aflcBusinessInformationList[4].belongCustomerService : scope.row.belongCustomerService }}</span>
                    </template>
          </el-table-column>-->
          <el-table-column sortable prop="shipperTypeName" label="货主类型"></el-table-column>
          <el-table-column prop="belongSalesmanName" sortable width="150" label="所属业务员"></el-table-column>
          <el-table-column prop="belongCustomerService" sortable width="150" label="所属客服"></el-table-column>
          <el-table-column sortable prop="registerTime" label="注册日期">
            <template slot-scope="scope">
              <span v-if="scope.row.registerTime">{{ scope.row.registerTime | parseTime}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="info_tab_footer">
      共计:{{ totalCount }}
      <div class="show_pager">
        <Pager :total="totalCount" @change="handlePageChange" ref="pager" />
      </div>
    </div>
    <createdDialog
      :paramsView="paramsView"
      :typetitle="typetitle"
      :editType="type"
      :dialogFormVisible_add.sync="dialogFormVisible_add"
      @getData="getDataList"
    />
  </div>
</template>
<script>
import createdDialog from "./createdDialogA.vue";
import Pager from "@/components/Pagination/index";
import searchInfo from "./searchInfo";
import { shipperListInfo } from "@/api/users/shipper/all_shipper.js";
import { objectMerge2, parseTime } from "@/utils/";

export default {
  props: {
    isvisible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    createdDialog,
    Pager,
    searchInfo
  },
  data() {
    return {
      loading: true,
      tabType: "unauthorized",
      btnsize: "mini",
      dialogFormVisible_add: false,
      type: "",
      paramsView: {},
      typetitle: "",
      tableData4: [],
      totalCount: 0,
      page: 1,
      pagesize: 20,
      searchInfo: {
        accountStatus: "",
        belongCity: "",
        mobile: "",
        shipperStatus: "AF0010401" //未认证的状态码
      },
      selectRowData: {},
      selected: [] //暂存数据
    };
  },
  watch: {
    isvisible: {
      handler(newVal, oldVal) {
        if (newVal) {
            if (!this.$route.query.mobile) {
            this.firstblood();
          }
        }
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true
    },
  },
  methods: {
    // 从客户上报进来弹出对应框
    toggleOne(data) {
      if (data) {
        this.clickDetails(data);
        this.handleClick("edit");
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //点击选中当前行
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    // 判断选中与否
    getSelection(val) {
      console.log("选中内容", val);
      this.selected = val;
    },
    pushOrderSerial(row) {
      this.type = "view";
      this.typetitle = "货主详情";
      this.paramsView = objectMerge2({}, row);
      this.dialogFormVisible_add = true;
      this.clearTableSelection();
    },
    getSearchParam(obj) {
      this.searchInfo = objectMerge2({}, obj, { shipperStatus: "AF0010401" });
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      const isOnce = JSON.parse(sessionStorage.getItem('once'))
      if ( isOnce ) {
        this.firstblood(true);
      } else {
        this.firstblood()
      }
    },
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    handleClick(type) {
      if (this.selected.length == 0) {
        return this.$message.warning("请选择您要操作的用户");
      } else if (this.selected.length > 1) {
        this.$message({
          message: "每次只能操作单条数据~",
          type: "warning"
        });
        //清除选中状态，避免影响下个操作
        this.$refs.multipleTable.clearSelection();
      } else {
        this.selectRowData = this.selected[0];
        this.paramsView = objectMerge2({}, this.selectRowData);
        switch (type) {
          case "edit":
            this.type = "edit";
            this.typetitle = "修改货主";
            // this.origin = 'ShipperUnauthorized';
            this.dialogFormVisible_add = true;
            break;
          case "identification":
            this.type = "identification";
            this.typetitle = "代客认证";
            // this.origin = '';
            this.dialogFormVisible_add = true;
            break;
        }
        //清除选中状态，避免影响下个操作
        this.$refs.multipleTable.clearSelection();
      }
    },
    //刷新页面
    firstblood(boole) {
      this.loading = true;
      shipperListInfo(this.page, this.pagesize, this.searchInfo)
        .then(res => {
          // console.log('未认证',res)
          this.totalCount = res.data.totalCount;
          this.tableData4 = res.data.list;
          this.loading = false;
          if (boole) {
            if (this.tableData4 && this.tableData4.length == 1) {
              this.toggleOne(this.tableData4[0]);
            }
          }
        })
        .catch(err => {
          this.$message({
            type: "info",
            message:
              "操作失败，原因：" + err.errorInfo ? err.errorInfo : err.text
          });
          this.loading = false;
        });
    },
    getDataList() {
      this.$nextTick(() => {
        sessionStorage.setItem("once", false);
        this.firstblood();
      });
    }
  }
};
</script>
<style lang="scss">
</style>


