<template>
  <div class="identicalStyle" v-loading="loading">
    <el-form :inline="true" :model="formInline" ref="ruleForm" class="classify_searchinfo">
      <el-form-item label="认证所在地">
        <!-- <vregion :ui="true" @values="regionChange" class="form-control"> -->
        <el-input v-model="formInline.provinceCityArea" placeholder="请输入" clearable></el-input>
        <!-- </vregion> -->
      </el-form-item>
      <el-form-item label="账户状态">
        <el-select v-model="formInline.accountStatus" clearable placeholder="请选择">
          <el-option
            v-for="item in optionsAuidSataus"
            :key="item.id"
            :label="item.name"
            :value="item.code"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input placeholder="请输入内容" v-model.trim="formInline.mobile" clearable></el-input>
      </el-form-item>
      <el-form-item class="fr">
        <el-button
          type="primary"
          plain
          icon="el-icon-search"
          :size="btnsize"
          @click="handleSearch('search')"
        >查询</el-button>
        <el-button
          type="info"
          plain
          icon="fontFamily aflc-icon-qingkong"
          :size="btnsize"
          @click="handleSearch('clear')"
        >清空</el-button>
      </el-form-item>
    </el-form>
    <div class="classify_info">
      <div class="btns_box">
        <el-button
          type="primary"
          icon="el-icon-document"
          plain
          :size="btnsize"
          @click="handleClick('identification')"
        >代客认证</el-button>
        <!-- <el-button type="primary" icon="el-icon-edit-outline" plain :size="btnsize" @click="handleClick('edit')">修改</el-button> -->
      </div>
      <div class="info_news">
        <el-table
          ref="multipleTable"
          :data="tableData4"
          stripe
          border
          @selection-change="getSelection"
          @row-click="clickDetails"
          height="100%"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column sortable type="selection" width="50"></el-table-column>
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column label="手机号(会员账号)" prop="mobile" sortable width="150">
            <template slot-scope="scope">
              <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.mobile}}</h4>
            </template>
          </el-table-column>
          <el-table-column prop="contactsName" sortable label="联系人" width="150"></el-table-column>
          <el-table-column
            prop="companyName"
            sortable
            label="公司名称"
            :show-overflow-tooltip="true"
            width="250"
          ></el-table-column>
          <el-table-column
            prop="auditAreaName"
            sortable
            label="认证所在地"
            :show-overflow-tooltip="true"
            width="200"
          ></el-table-column>
          <el-table-column prop="registerOriginName" sortable label="注册来源" width="120"></el-table-column>
          <el-table-column prop="registerTime" sortable label="注册日期" width="160">
            <template slot-scope="scope">{{scope.row.registerTime | parseTime}}</template>
          </el-table-column>
          <el-table-column prop="accountStatusName" sortable label="账户状态" width="120">
            <template slot-scope="scope">
              <span
                :class="{freezeName: scope.row.accountStatusName == '冻结中' ,blackName: scope.row.accountStatusName == '黑名单',normalName :scope.row.accountStatusName == '正常'}"
              >{{scope.row.accountStatusName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="authStatusName" sortable label="认证状态" width="150"></el-table-column>
          <el-table-column prop="qq" label="QQ号码" sortable></el-table-column>
          <el-table-column prop="isOpenTms" sortable label="是否开通TMS" width="150">
            <template slot-scope="scope">
              <span
                :class="scope.row.isOpenTms == 1 ? 'isTMS' : 'noTMS'"
              >{{scope.row.isOpenTms == 1 ? '是' : '否'}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="info_tab_footer">
      共计:{{ totalCount }}
      <div class="show_pager">
        <Pager :total="totalCount" @change="handlePageChange" />
      </div>
    </div>
    <createdDialog
      :paramsView="paramsView"
      :typetitle="titleInfo"
      :editType="type"
      :dialogFormVisible_add.sync="dialogFormVisible_add"
      @getData="getDataList"
    />
  </div>
</template>
<script>
import GetCityList from "@/components/GetCityList";
import createdDialog from "./createdDialogA.vue";
import FreezeDialog from "./FreezeDialog.vue";
import {
  data_get_shipper_list,
  data_get_shipper_change,
  data_get_shipper_auid
} from "@/api/users/shipper/all_shipper.js";
import { data_LogisticsCompanyList } from "@/api/users/logistics/LogisticsCompany.js";
import Pager from "@/components/Pagination/index";
// import vregion from '@/components/vregion/Region.vue'
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
    FreezeDialog,
    GetCityList,
    Pager
    // vregion
  },
  data() {
    return {
      btnsize: "mini",
      dialogFormVisible_add: false,
      type: "",
      paramsView: {},
      optionsStatus: [], // 状态列表
      tableData4: [],
      totalCount: 0,
      page: 1,
      pagesize: 20,
      titleInfo: "",
      formInline: {
        accountStatus: null,
        provinceCityArea: "",
        mobile: "",
        authStatus: "AF0010401", // 未认证的状态码
        isVest: "0"
      },
      loading: true,
      optionsAuidSataus: [
        {
          code: null,
          name: "全部"
        }
      ], // 账户状态
      selected: [], //暂存数据
      selectRowData: {},
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      }
    };
  },
  watch: {
    isvisible: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.firstblood();
          this.getMoreInformation();
        }
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true
    }
  },
  mounted() {},
  methods: {
    // regionChange(d) {
    // 	// console.log('data:', d)
    // 	this.formInline.provinceCityArea = (!d.province && !d.city && !d.area && !d.town) ? '' : `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim()
    // },
    // getValue(obj) {
    // 	return obj ? obj.value : ''
    // },
    pushOrderSerial(row) {
      this.type = "view";
      this.titleInfo = "物流公司信息";
      this.paramsView = row;
      this.dialogFormVisible_add = true;
    },
    // 判断选中与否
    getSelection(val) {
      // console.log('选中内容',val)
      this.selected = val;
    },
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    getMoreInformation() {
      // 获取账户状态列表
      if (this.optionsAuidSataus.length > 1) {
        return;
      } else {
        data_get_shipper_auid().then(res => {
          res.data.map(item => {
            this.optionsAuidSataus.push(item);
          });
        });
      }
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
          // case 'edit' :
          // 	this.type = "edit";
          // 	this.typetitle = "修改货主";
          // 	// this.origin = 'ShipperUnauthorized';
          // 	this.dialogFormVisible_add = true;
          // 	break;
          case "identification":
            this.type = "identification";
            this.titleInfo = "代客认证";
            // this.origin = '';
            this.dialogFormVisible_add = true;
            break;
        }
        //清除选中状态，避免影响下个操作
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 点击查询按纽，按条件查询列表
    handleSearch(type) {
      switch (type) {
        case "search":
          break;
        case "clear":
          this.formInline = {
            accountStatus: null,
            mobile: "",
            authStatus: "AF0010401", // 未认证的状态码
            isVest: "0"
          };
          break;
      }
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.firstblood();
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    // 刷新页面
    firstblood() {
      data_LogisticsCompanyList(this.page, this.pagesize, this.formInline)
        .then(res => {
          this.totalCount = res.data.totalCount;
          this.tableData4 = res.data.list;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    getDataList() {
      this.firstblood();
    }
  }
};
</script>
<style lang="scss">
</style>

