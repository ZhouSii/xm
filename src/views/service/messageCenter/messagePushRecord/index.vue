<template>
  <div class="identicalStyle clearfix plantService" v-loading="loading">
    <el-form
      :inline="true"
      :model="searchInfo"
      ref="ruleForm"
      class="demo-ruleForm classify_searchinfo"
    >
      <!--      <el-form-item label="消息推送类型">-->
      <!--        <el-select v-model="searchInfo.complainType" clearable placeholder="请选择">-->
      <!--          <el-option-->
      <!--            v-for="item in optionsPlantService"-->
      <!--            :key="item.id"-->
      <!--            :label="item.name"-->
      <!--            :value="item.code">-->
      <!--          </el-option>-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <el-form-item label="消息类型">
        <el-select v-model="searchInfo.messageType" clearable placeholder="请选择">
          <el-option
            v-for="item in messageTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="推送用户类型">
        <el-select v-model="searchInfo.pushUserType" clearable placeholder="请选择">
          <el-option
            v-for="item in pushUserTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="推送渠道">
        <el-select v-model="searchInfo.pushChannel" clearable placeholder="请选择">
          <el-option
            v-for="item in pushChannelList"
            :key="item.id"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="推送状态">
        <el-select v-model="searchInfo.pushStatus" clearable placeholder="请选择">
          <el-option
            v-for="item in pushStatusList"
            :key="item.id"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="消息已读状态">
        <el-select v-model="searchInfo.readStatus" clearable placeholder="请选择">
          <el-option
            v-for="item in readStatusList"
            :key="item.id"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="btnChoose fr" style="margin-left:0;">
        <el-button
          type="primary"
          icon="el-icon-search"
          plain
          :size="btnsize"
          @click="handleSearch('search')"
        >搜索</el-button>
        <el-button
          type="info"
          icon="fontFamily aflc-icon-qingkong"
          :size="btnsize"
          plain
          @click="handleSearch('clear')"
        >清空</el-button>
      </el-form-item>
    </el-form>
    <div class="classify_info">
      <div class="info_news">
        <el-table
          ref="multipleTable"
          :data="tableData"
          stripe
          border
          align="center"
          height="100%"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column label="选择" type="selection" width="50"></el-table-column>
          <el-table-column label="序号" sortable width="80">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            prop="pushUser"
            label="推送用户"
            min-width="250"
            sortable
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="pushUserTypeName"
            label="推送用户类型"
            min-width="150"
            sortable
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="messageTypeName"
            label="消息类型"
            min-width="150"
            sortable
            show-overflow-tooltip
          ></el-table-column>
          <!--          <el-table-column prop="title" label="消息推送类型" min-width="150" sortable show-overflow-tooltip>-->
          <!--          </el-table-column>-->
          <el-table-column
            prop="pushChannelName"
            label="推送渠道"
            min-width="150"
            sortable
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="title" label="消息标题" min-width="200" sortable show-overflow-tooltip></el-table-column>
          <el-table-column
            prop="content"
            label="消息内容"
            min-width="250"
            sortable
            show-overflow-tooltip
          ></el-table-column>
          <!--          <el-table-column prop="phone" label="短信内容" min-width="150" sortable show-overflow-tooltip>-->
          <!--          </el-table-column>-->
          <el-table-column
            prop="pushStatusName"
            label="推送状态"
            min-width="150"
            sortable
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="readStatusName"
            label="站内消息已读状态"
            min-width="180"
            sortable
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="pushTime" label="推送时间" min-width="160" sortable>
            <template slot-scope="scope">{{ scope.row.pushTime | parseTime }}</template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 页码 -->
    <div class="info_tab_footer">
      共计:{{ dataTotal }}
      <div class="show_pager">
        <Pager :total="dataTotal" @change="handlePageChange" :sizes="sizes" />
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { getDictionary } from "@/api/common.js";
import { getRecords } from "@/api/service/message.js";
import { parseTime } from "@/utils/index.js";
import Pager from "@/components/Pagination/index";
export default {
  components: {
    Pager
  },
  data() {
    return {
      optionsPlantService: [],
      messageTypeList: [],
      pushChannelList: [],
      pushUserTypeList: [],
      pushStatusList: [
        { id: 0, name: "待推送", code: "0" },
        { id: 1, name: "已推送", code: "1" }
      ],
      readStatusList: [
        { id: 0, name: "全部", code: null },
        { id: 1, name: "已读", code: "Y" },
        { id: 2, name: "未读", code: "N" }
      ],
      btnsize: "mini",
      loading: true, // 加载
      sizes: [20, 50, 100],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      dataTotal: 0,
      searchInfo: {
        messageId: "", // 消息id
        messageType: "", // 消息类型(字典AF0711801)
        pushChannel: "", // 推送渠道(字典AF0711802)
        pushStatus: "", // 推送状态(0: 待推送，1: 已推送)
        pushUserType: "", // 推送用户类型(字典AF001)
        readStatus: "" //消息已读状态 (Y:已读，N：未读)
        // title: '' // 消息标题
      },
      tableData: []
    };
  },
  watch: {},
  created() {
    if (this.$route.query.id) {
      this.searchInfo.messageId = this.$route.query.id;
    }
    this.fetchData();
    getDictionary("AF0711801").then(res => {
      this.messageTypeList = res.data;
    });
    getDictionary("AF0711802").then(res => {
      this.pushChannelList = res.data;
    });
    getDictionary("AF001").then(res => {
      this.pushUserTypeList = res.data.filter(item => {
        return item.code === "AF00112" || item.code === "AF00113";
      });
    });
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.fetchData();
    },

    fetchData() {
      this.loading = true;
      getRecords(this.page, this.pagesize, this.searchInfo)
        .then(res => {
          this.tableData = res.data.list;
          this.dataTotal = res.data.total;
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
    handleSearch(type) {
      this.page = 1;
      switch (type) {
        case "search":
          this.fetchData();
          break;
        case "clear":
          this.searchInfo = this.$options.data().searchInfo;
          this.fetchData();
          break;
      }
    }
  }
};
</script>

<style type="text/css" lang="scss" scoped>
.plantService {
  height: 100%;
  .reMark {
    padding: 5px 15px;
    border-radius: 20% / 50%;
    background: #eca438;
    color: #fff;
  }
  .sussces {
    padding: 5px 15px;
    border-radius: 20% / 50%;
    background: skyblue;
    color: #fff;
  }
}
</style>
