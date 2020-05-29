<template>
  <div class="shipperData identicalStyle miniHeaderSearch" v-loading="loading">
    <!-- <img src="../../../assets/zanshi/hz.png" alt="" @click="handlerJump"> -->
    <!-- <searchInfo @change="getSearchParam"></searchInfo> -->
    <div class="classify_info">
      <!-- <div class="btns_box">
			</div> -->
      <div class="info_news">
        <el-table
          ref="multipleTable"
          :data="tableDataAll"
          stripe
          border
          height="100%"
          @selection-change="getSelection"
          @row-click="clickDetails"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column label="序号" width="60px">
            <template slot-scope="scope">
              {{
                (searchInfo.currentPage - 1) * searchInfo.pageSize +
                  scope.$index +
                  1
              }}
            </template>
          </el-table-column>
          <el-table-column
            prop="mobile"
            min-width="150"
            sortable
            label="手机号码"
          >
            <template slot="header" slot-scope="scope">
              <tableHeaderSearch
                :scope="scope"
                :query="searchInfo"
                @change="changeKey"
              />
            </template>
            <template slot-scope="scope">
              <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">
                {{ scope.row.mobile }}
              </h4>
            </template>
          </el-table-column>
          <el-table-column
            label="货主姓名"
            :show-overflow-tooltip="true"
            prop="contacts"
            min-width="150"
            sortable
          >
            <template slot="header" slot-scope="scope">
              <tableHeaderSearch
                :scope="scope"
                :query="searchInfo"
                @change="changeKey"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="registerOrigin"
            sortable
            label="注册渠道"
            min-width="150"
          >
            <template slot="header" slot-scope="scope">
              <tableHeaderSearch
                :scope="scope"
                :query="searchInfo"
                @change="changeKey"
              />
            </template>
            <template slot-scope="scope">
              {{ scope.row.registerOriginName }}
            </template>
          </el-table-column>
          <el-table-column
            prop="accountStatus"
            min-width="150"
            sortable
            label="发货状态"
          >
            <template slot="header" slot-scope="scope">
              <tableHeaderSearch
                :scope="scope"
                :query="searchInfo"
                @change="changeKey"
              />
            </template>
            <template slot-scope="scope">
              {{ scope.row.accountStatusName }}
            </template>
          </el-table-column>
          <el-table-column
            prop="usingStatus"
            sortable
            label="登陆状态"
            min-width="150"
          >
            <template slot="header" slot-scope="scope">
              <tableHeaderSearch
                :scope="scope"
                :query="searchInfo"
                @change="changeKey"
              />
            </template>
            <template slot-scope="scope">
              {{ scope.row.usingStatus == "1" ? "启用" : "禁用" }}
            </template>
          </el-table-column>
          <!-- <el-table-column prop="" sortable  label="活跃状态" width="150">
                        <template slot="header" slot-scope="scope">
                            <tableHeaderSearch :scope="scope" :query="searchInfo" @change="changeKey"/>
                        </template>
                    </el-table-column> -->
          <el-table-column
            label="货主类型"
            sortable
            prop="shipperType"
            min-width="150"
          >
            <template slot="header" slot-scope="scope">
              <tableHeaderSearch
                :scope="scope"
                :query="searchInfo"
                @change="changeKey"
              />
            </template>
            <template slot-scope="scope">
              {{ scope.row.shipperTypeName }}
            </template>
          </el-table-column>
          <el-table-column
            prop="regisAddress"
            min-width="150"
            :show-overflow-tooltip="true"
            sortable
            label="注册所在地"
          >
            <template slot="header" slot-scope="scope">
              <tableHeaderSearch
                :scope="scope"
                :query="searchInfo"
                @change="changeKey"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="potentialGrade"
            min-width="150"
            :show-overflow-tooltip="true"
            sortable
            label="同城潜力等级"
          >
            <template slot="header" slot-scope="scope">
              <tableHeaderSearch
                :scope="scope"
                :query="searchInfo"
                @change="changeKey"
              />
            </template>
            <template slot-scope="scope">
              {{ scope.row.potentialGradeName }}
            </template>
          </el-table-column>
          <el-table-column
            prop="shipperStatus"
            min-width="150"
            :show-overflow-tooltip="true"
            sortable
            label="认证状态"
          >
            <template slot="header" slot-scope="scope">
              <tableHeaderSearch
                :scope="scope"
                :query="searchInfo"
                @change="changeKey"
              />
            </template>
            <template slot-scope="scope">
              {{ scope.row.shipperStatusName }}
            </template>
          </el-table-column>
          <el-table-column
            prop="belongCityName"
            min-width="150"
            :show-overflow-tooltip="true"
            sortable
            label="认证所在地"
          >
            <template slot="header" slot-scope="scope">
              <tableHeaderSearch
                :scope="scope"
                :query="searchInfo"
                @change="changeKey"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="tradeAreaId"
            min-width="150"
            :show-overflow-tooltip="true"
            sortable
            label="认证所属商圈"
          >
            <template slot="header" slot-scope="scope">
              <tableHeaderSearch
                :scope="scope"
                :query="searchInfo"
                @change="changeKey"
              />
            </template>
            <template slot-scope="scope">
              {{ scope.row.tradeAreaName }}
            </template>
          </el-table-column>
          <el-table-column
            prop="belongSalesmanName"
            min-width="150"
            sortable
            label="所属业务员"
          >
            <template slot="header" slot-scope="scope">
              <tableHeaderSearch
                :scope="scope"
                :query="searchInfo"
                @change="changeKey"
              />
            </template>
            <template slot-scope="scope">
              {{
                scope.row.belongSalesmanName
                  ? scope.row.belongSalesmanName
                  : "暂无"
              }}
            </template>
          </el-table-column>
          <!-- <el-table-column prop="tradeAreaId" min-width="150" :show-overflow-tooltip="true" sortable label="所属业务组">
                        <template slot="header" slot-scope="scope">
                            <tableHeaderSearch :scope="scope" :query="searchInfo" @change="changeKey"/>
                        </template>
                        <template  slot-scope="scope">
                            {{scope.row.tradeAreaName}}
                        </template>
                    </el-table-column> -->
          <el-table-column
            prop="belongCustomerService"
            min-width="150"
            sortable
            label="所属客服"
          >
            <template slot="header" slot-scope="scope">
              <tableHeaderSearch
                :scope="scope"
                :query="searchInfo"
                @change="changeKey"
              />
            </template>
            <template slot-scope="scope">
              {{
                scope.row.belongCustomerService
                  ? scope.row.belongCustomerService
                  : "暂无"
              }}
            </template>
          </el-table-column>
          <el-table-column
            prop="registerTime"
            sortable
            min-width="160"
            label="注册时间"
          >
            <template slot="header" slot-scope="scope">
              <tableHeaderSearch
                :scope="scope"
                :query="searchInfo"
                @change="changeKey"
              />
            </template>
            <template slot-scope="scope">
              <span>{{ scope.row.registerTime | parseTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="authPassTime"
            sortable
            min-width="160"
            label="认证通过时间"
          >
            <template slot="header" slot-scope="scope">
              <tableHeaderSearch
                :scope="scope"
                :query="searchInfo"
                @change="changeKey"
              />
            </template>
            <template slot-scope="scope">
              <span>{{ scope.row.authPassTime | parseTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="lastLoginTime"
            min-width="160"
            sortable
            label="最后登陆时间"
          >
            <template slot="header" slot-scope="scope">
              <tableHeaderSearch
                :scope="scope"
                :query="searchInfo"
                @change="changeKey"
              />
            </template>
            <template slot-scope="scope">
              <span>{{ scope.row.lastLoginTime | parseTime }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="info_tab_footer">
      共计:{{ totalCount }}
      <div class="show_pager">
        <Pager :total="totalCount" @change="handlePageChange" :sizes="sizes" ref="pager" />
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import searchInfo from "./searchInfo";
import Pager from "@/components/Pagination/index";
import { shipperListInfo } from "@/api/users/shipper/all_shipper.js";
import tableHeaderSearch from "@/components/tableHeaderSearch";
import { objectMerge2, parseTime } from "@/utils/";

export default {
  components: {
    searchInfo,
    Pager,
    tableHeaderSearch
  },
  data() {
    return {
      loading: false,
      searchInfo: {
        currentPage: 1,
        pageSize: 50,
        vo: {}
      },
      sizes: [50, 100, 200, 400],
      totalCount: 0,
      tableDataAll: [],
      selected: []
    };
  },
  created() {},
  mounted() {
    this.firstblood();
  },
  beforeDestroy() {},
  methods: {
    changeKey(obj) {
    //   console.log('changeKey',obj)
      this.total = 0;
      this.searchInfo = obj;
       this.$refs.pager.inputval = obj.currentPage;
        this.$refs.pager.pageNum = obj.currentPage;
      if (!this.loading) {
        this.firstblood();
      }
    },
    firstblood() {
      this.loading = true;
      shipperListInfo(
        this.searchInfo.currentPage,
        this.searchInfo.pageSize,
        this.searchInfo.vo
      )
        .then(res => {
          // console.log('shipperAll',res)
          this.totalCount = res.data.totalCount;
          this.tableDataAll = res.data.list;
          this.loading = false;
        })
        .catch(err => {
          this.$message({
            type: "info",
            message:
              "操作失败，原因：" + (err.errorInfo ? err.errorInfo : err.text)
          });
          this.loading = false;
        });
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
    pushOrderSerial(item) {
      this.$router.push({
        name: "货主详情",
        query: { userId: item.shipperId }
      });
    },
    handlerJump() {
      console.log("123");
      this.$router.push({
        name: "货主详情",
        query: { userId: item.shipperId }
      });
    },
    // getSearchParam(obj) {
    //     console.log(obj)
    //     this.searchInfo = Object.assign(this.searchInfo, obj)
    //     this.loading = false;
    //     this.firstblood()
    // },
    handlePageChange(obj) {
      this.searchInfo.currentPage = obj.pageNum;
      this.searchInfo.pageSize = obj.pageSize;
      this.firstblood();
    }
  }
};
</script>

<style type="text/css" lang="scss">
.shipperData {
  height: 100%;
}
</style>