<template>
  <div class="identicalStyle clearfix announcement" v-loading="loading">
    <searchInfo @change="getSearchParam"></searchInfo>
    <div class="classify_info">
      <div class="btns_box">
        <el-button
          type="primary"
          icon="el-icon-tickets"
          :size="btnsize"
          plain
          @click="handleSearch('publish')"
          v-has:MARKETING_PUBLISH_NOTICE_PUBLISH
        >发布公告</el-button>
      </div>
      <div class="info_news">
        <el-table
          ref="multipleTable"
          :data="tableData"
          stripe
          :key="tablekey"
          border
          @row-click="clickDetails"
          @selection-change="getSelection"
          height="100%"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <!-- <el-table-column
                            prop="noticeLocation"
                            sortable
                            :show-overflow-tooltip="true"
                            label="区域"
                            width="200">
                        </el-table-column>
                        <el-table-column
                            prop="title"
                            sortable
                            :show-overflow-tooltip="true"
                            label="标题"
                            width="400">
                        </el-table-column>
                          <el-table-column
                            prop="startTime"
                            sortable
                            :show-overflow-tooltip="true"
                            label="有效期"
                            width="400">
                                <template slot-scope="scope">
                                    <p v-if="scope.row.endTime">{{scope.row.startTime | parseTime('{y}-{m}-{d}')}}<span class="youxiaoqi">至</span>{{scope.row.endTime | parseTime('{y}-{m}-{d}')}}</p>
                                    <p v-else>{{scope.row.startTime | parseTime('{y}-{m}-{d}')}}<span class="youxiaoqi">至</span> 长期</p>
                                </template>
          </el-table-column>-->
          <template v-for="column in tableColumn">
            <el-table-column
              :key="column.id"
              :fixed="column.fixed"
              :align="column.alignName"
              sortable
              :label="column.label"
              :show-overflow-tooltip="column.overflow"
              :prop="column.prop"
              v-if="!column.slot"
              :width="column.width"
            ></el-table-column>
            <el-table-column
              :key="column.id"
              :fixed="column.fixed"
              :align="column.alignName"
              sortable
              :label="column.label"
              :show-overflow-tooltip="column.overflow"
              v-else
              :width="column.width || ''"
            >
              <template slot-scope="scope">
                <span
                  class="clickitem"
                  v-if="column.click"
                  v-html="column.slot(scope)"
                  @click.stop="column.click(scope)"
                ></span>
                <span v-else v-html="column.slot(scope)"></span>
              </template>
            </el-table-column>
          </template>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                :size="btnsize"
                :type="scope.row.isTop == 0 ? 'primary' : 'info'"
                plain
                @click="handleClick(scope.row,'ifTop')"
              >{{scope.row.isTop == 0 ? '置顶' : '取消'}}</el-button>
              <el-button
                :size="btnsize"
                type="primary"
                plain
                @click="handleClick(scope.row,'revise')"
              >修改</el-button>
              <el-button
                :size="btnsize"
                :type="scope.row.display == 0 ? 'primary' : 'info'"
                @click="handleClick(scope.row,'display')"
                plain
              >{{scope.row.display == 0 ? '显示' : '隐藏'}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="info_tab_footer">
      共计:{{ dataTotal }}
      <div class="show_pager">
        <Pager :total="dataTotal" @change="handlePageChange" :sizes="sizes" ref="pager" />
      </div>
    </div>
    <announcement
      :dialogFormVisible.sync="dialogFormVisible"
      :Atitle="Atitle"
      :announceForm="announceForm"
      :operateType="operateType"
      @close="shuaxin"
    />
  </div>
</template>

<script type="text/javascript">
import {
  CommonNoticeList,
  updateNotice,
  dispayNotice
} from "@/api/company/announcement.js";
import { parseTime } from "@/utils/index.js";
import Pager from "@/components/Pagination/index";
import vregion from "@/components/vregion/Region";
import searchInfo from "./components/searchInfo";
import announcement from "./components/newAnnounce";
import editor from "@/components/tinymac/index";

export default {
  components: {
    Pager,
    searchInfo,
    vregion,
    announcement,
    editor
  },
  data() {
    return {
      btnsize: "mini",
      Atitle: "",
      operateType: "", //操作类型：新增，修改
      announceForm: {}, //传递的对象
      dialogFormVisible: false,
      tablekey: "",
      timeOutWaitPay: null,
      loading: false, //加载
      sizes: [20, 50, 100],
      pagesize: 20, //初始化加载数量
      page: 1, //初始化页码
      dataTotal: 0,
      searchInfo: {
        belongCityName: "", //区域
        title: "", //标题
        province: "",
        city: ""
      },
      tableData: [],
      tableColumn: [
        {
          label: "区域",
          prop: "noticeLocation",
          width: "160",
          fixed: false,
          overflow: true,
          alignName: "center"
        },
        {
          label: "标题",
          prop: "title",
          width: "350",
          fixed: false,
          overflow: true,
          alignName: "center"
        },
        {
          label: "有效期",
          prop: "endTime",
          width: "380",
          fixed: false,
          overflow: true,
          alignName: "center",
          slot: scope => {
            let startTime = parseTime(scope.row.startTime);
            let endTime = scope.row.endTime
              ? parseTime(scope.row.endTime)
              : "长期";
            return startTime + '<span class="youxiaoqi">至</span>' + endTime;
          }
        },
        {
          label: "权重",
          prop: "weightRatio",
          width: "100",
          fixed: false,
          overflow: true,
          alignName: "center"
        },
        {
          label: "操作人",
          prop: "creater",
          width: "150",
          fixed: false,
          overflow: true,
          alignName: "center"
        },
        {
          label: "操作时间",
          prop: "createTime",
          width: "200",
          fixed: false,
          overflow: true,
          alignName: "center",
          slot: scope => {
            return parseTime(scope.row.createTime, "{y}-{m}-{d} {h}:{i}:{s}");
          }
        }
      ]
    };
  },
  watch: {},
  created() {},
  mounted() {
    this.firstblood();

    // console.log('```````````',process.env.NODE_ENV)
  },
  beforeDestroy() {
    clearInterval(this.timeOutWaitPay);
  },
  methods: {
    editors(content) {
      // editor组件传过来的值赋给content
      console.log(content);
      this.content = content;
    },
    onEditorReady(ins, ina) {
      // 上传失败的函数
      console.log("ins");
      console.log(ins);
      console.log(ina);
    },
    onEditorUploadComplete(json) {
      // 处理上传图片后返回数据，添加img标签到编辑框内
      console.log("json");
      console.log(json);
      console.log(json[0].data.filePath);
      this.content = this.content + "<img src=" + json[0].data.filePath + ">";
    },
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    //刷新页面
    firstblood() {
      this.loading = true;
      CommonNoticeList(this.page, this.pagesize, this.searchInfo)
        .then(res => {
          // console.log('公告',res)
          this.dataTotal = res.data.totalCount;
          this.tableData = res.data.list;
          this.loading = false;
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
    shuaxin() {
      this.firstblood();
    },
    //按钮功能
    handleClick(row, type) {
      console.log(row, type);
      switch (type) {
        case "ifTop":
          let ifTop = row.isTop == "0" ? "1" : "0";
          let rowData = Object.assign({}, row, { isTop: ifTop });
          updateNotice(rowData)
            .then(res => {
              console.log("iftop", res);
              this.firstblood();
            })
            .catch(err => {
              this.$message({
                type: "info",
                message:
                  "操作失败，原因：" + err.errorInfo ? err.errorInfo : err.text
              });
            });
          break;
        case "revise":
          this.announceForm = Object.assign({}, row);
          this.operateType = type;
          this.dialogFormVisible = true;
          this.Atitle = "修改公告";
          break;
        case "display":
          this.loading = true;
          dispayNotice([row.id])
            .then(res => {
              this.$message.success("操作成功");
              this.firstblood();
            })
            .catch(err => {
              this.$message.error(
                "操作失败，原因：" + err.errorInfo || err.text
              );
            });
          break;
      }
      // 清除选中状态，避免影响下个操作
      this.$refs.multipleTable.clearSelection();
    },
    getSearchParam(obj) {
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.searchInfo = Object.assign(this.searchInfo, obj);
      this.firstblood();
    },
    getSelection() {},
    //模糊查询 分类名称或者code
    handleSearch(type) {
      switch (type) {
        case "publish":
          this.operateType = type;
          this.dialogFormVisible = true;
          this.Atitle = "发布公告";
          break;
      }
      // 清除选中状态，避免影响下个操作
      this.$refs.multipleTable.clearSelection();
    },
    //判断是否选中
    getinfomation(selection) {
      this.checkedinformation = selection;
    },
    //点击选中当前行
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row);
    }
  }
};
</script>

<style type="text/css" lang="scss">
.announcement {
  .info_news {
    .el-table {
      td {
        .cell {
          .youxiaoqi {
            display: inline-block;
            margin: 0 10px;
            color: #3e9ff1;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>