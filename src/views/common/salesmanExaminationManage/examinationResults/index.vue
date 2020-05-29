<template>
  <div class="TwoColumns clearfix" v-loading="loading">
    <div class="columnsContainer">
      <div class="side_right">
        <el-form :inline="true" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
          <el-form-item label="业务员手机号码">
            <el-input v-model="phone" placeholder="业务员手机号码"></el-input>
          </el-form-item>
          <el-form-item class="fr">
            <el-button type="primary" size="mini" icon="el-icon-search" plain @click="search()">查询</el-button>
            <el-button
              type="info"
              size="mini"
              icon="fontFamily aflc-icon-qingkong"
              plain
              @click="clear()"
            >清空</el-button>
          </el-form-item>
        </el-form>

        <div class="side_right_bottom clearfix">
          <div class="info_news">
            <el-table
              ref="multipleTable"
              :data="tableData"
              stripe
              border
              height="100%"
              tooltip-effect="dark"
              style="width: 100%"
            >
              <el-table-column label="序号" width="60">
                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
              </el-table-column>
              <el-table-column sortable prop="salesmanName" label="业务员姓名"></el-table-column>
              <el-table-column prop="salesmanMobile" sortable label="业务员手机号码"></el-table-column>
              <el-table-column sortable label="参加考卷分类">
                <template slot-scope="scope">
                  <div>{{scope.row.course }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="testpaperName" sortable label="参加考卷名称"></el-table-column>
              <el-table-column prop="startTime" sortable label="参加考试日期"></el-table-column>
              <el-table-column min-width="50" sortable label="考试结果">
                <template slot-scope="scope">
                  <div v-if="scope.row.status === 'P'">通过</div>
                  <div v-if="scope.row.status === 'F'">未通过</div>
                </template>
              </el-table-column>
              <el-table-column sortable label="考试分数">
                <template slot-scope="scope">
                  <el-button type="text" @click="open(scope.row)">{{scope.row.score}}分</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <!-- 页码 -->
    <div class="info_tab_footer">
      共计:{{ dataTotal }}
      <div class="show_pager">
        <Pager :total="dataTotal" @change="handlePageChange" ref="pager"/>
      </div>
    </div>
    <div class="commoncss">
      <el-dialog
        :close-on-click-modal="false"
        v-el-drag-dialog
        :visible.sync="dialogFormVisible"
        @close="closeClick"
        width="1200px"
      >
        <el-row class="top">
          <el-col :span="6">
            <div>业务员: {{formData.salesmanName}}</div>
          </el-col>
          <el-col :span="6">
            <div>手机号码: {{formData.salesmanMobile}}</div>
          </el-col>
          <el-col :span="6">
            <div>考试日期:{{formData.startTime}}</div>
          </el-col>
          <el-col :span="6">
            <div>得分:{{formData.score}}分</div>
          </el-col>
        </el-row>
        <div class="side_right_bottom clearfix">
          <div class="info_news">
            <el-table
              ref="multipleTable"
              :data="tableData1"
              stripe
              border
              tooltip-effect="dark"
              style="width: 100%"
            >
              <el-table-column label="序号" width="60">
                <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
              </el-table-column>
              <el-table-column prop="questionType1" sortable label="题目类型"></el-table-column>
              <el-table-column prop="questionTitle" sortable label="考试题目"></el-table-column>
              <el-table-column sortable label="考试选项">
                <template slot-scope="scope">
                  <div v-for="(item,index) in scope.row.contentList1" :key="index">{{item}}</div>
                </template>
              </el-table-column>
              <el-table-column sortable label="考试答案">
                <template slot-scope="scope">
                  <div v-for="(item,index) in scope.row.answerList1" :key="index">{{item}}</div>
                </template>
              </el-table-column>
              <el-table-column sortable label="业务员选择答案">
                <template slot-scope="scope">
                  <div v-for="(item,index) in scope.row.errorAnswerList1" :key="index">{{item}}</div>
                </template>
              </el-table-column>
              <el-table-column min-width="50" sortable label="得分">
                <template slot-scope="scope">
                  <div v-if="scope.row.errorAnswer === 'P'">{{scope.row.score}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="score" min-width="50" sortable label="题目分数"></el-table-column>
            </el-table>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">关闭</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/javascript">
import fetch from "@/utils/fetch";
import Pager from "@/components/Pagination/index";
export default {
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      phone: "",
      page: 1,
      pagesize: 20,
      dataTotal: 0,
      tableData: [],
      tableData1: [],
      formData: {
        salesmanName: "",
        salesmanMobile: "",
        startTime: "",
        score: ""
      }
    };
  },
  components: {
    Pager
  },
  created() {
    this.getList();
  },
  mounted() {},

  methods: {
    closeClick() {
      this.formData = {
        salesmanName: "",
        salesmanMobile: "",
        startTime: "",
        score: ""
      };
      this.tableData1 = [];
    },
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.getList();
    },
    getList() {
      this.loading = true;
      fetch({
        url: `/${
          this.$cms
        }/usercenter/aflcsalesmantestpaperrecord/v1/recordList?salesman=${
          this.phone
        }&pageNum=${this.page}&pageSize=${this.pagesize}`,
        method: "post",
        data: {}
      })
        .then(res => {
          if (res.status === 200) {
            this.tableData = res.data.list;
            this.dataTotal = res.data.total;
            this.loading = false;
          }
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

    open(item) {
      this.dialogFormVisible = true;
      this.loading = true;
      const list = ["A.", "B.", "C.", "D.", "E.", "F.", "G."];
      const list1 = ["A", "B", "C", "D", "E", "F", "G"];
      this.formData = {
        salesmanName: item.salesmanName,
        salesmanMobile: item.salesmanMobile,
        startTime: item.startTime,
        score: item.score
      };
      console.log(item);
      fetch({
        url: `/${
          this.$cms
        }/usercenter/aflcsalesmantestpaperrecord/v1/viewTestResult?recordId=${
          item.id
        }&pageNum=1&pageSize=500`,
        method: "post",
        data: {}
      })
        .then(res => {
          if (res.status === 200) {
            res.data.list.forEach(item => {
              item.questionType === "duo"
                ? (item.questionType1 = "多选题")
                : (item.questionType1 = "单选题");
              const contentList1 = [];
              const answerList1 = [];
              const errorAnswerList1 = [];
              item.questionContentList.forEach((item1, index1) => {
                contentList1.push(list[index1] + item1);
              });
              if (item.errorAnswerList !== null) {
                item.errorAnswerList.forEach((item1, index1) => {
                  list1.forEach((item2, index2) => {
                    if (item1 === index2) {
                      errorAnswerList1.push(list1[item1]);
                    }
                  });
                });
              }
              item.rightAnswerList.forEach((item1, index1) => {
                list.forEach((item2, index2) => {
                  if (item1 === index2) {
                    answerList1.push(list1[item1]);
                  }
                });
              });
              item.contentList1 = contentList1;
              item.answerList1 = answerList1;
              item.errorAnswerList1 = errorAnswerList1;
            });
            this.tableData1 = res.data.list;
            this.loading = false;
          }
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
    search() {
      this.page = 1;
      this.getList();
    },
    clear() {
      this.phone = "";
      this.page = 1;
      this.getList();
    }
  }
};
</script>

<style type="text/css" lang="scss" scoped>
.top {
  margin-bottom: 10px;
  font-size: 16px;
}
</style>
