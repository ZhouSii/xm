<template>
  <div class="TwoColumns clearfix" v-loading="loading">
    <div class="columnsContainer">
      <div class="side_right">
        <el-form
          :inline="true"
          ref="ruleForm"
          class="demo-ruleForm classify_searchinfo"
        >
          <el-form-item label="车主手机号码">
            <el-input
              v-model="searchObj.driverMobile"
              placeholder="车主手机号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="考卷分类">
            <el-cascader
              style="line-height:30px;"
              clearable
              expand-trigger="hover"
              :options="classificationList"
              v-model="classification"
              :props="props"
              @change="handleChange"
            >
            </el-cascader>
          </el-form-item>
          <el-form-item label="参加考试日期" prop="chooseTime">
            <el-date-picker
              v-model="chooseTime"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              unlink-panels
              align="right"
              :default-time="['00:00:00', '23:59:59']"
              value-format="timestamp"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item class="fr">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-search"
              plain
              @click="search()"
              >查询</el-button
            >
            <el-button
              type="info"
              size="mini"
              icon="fontFamily aflc-icon-qingkong"
              plain
              @click="clear()"
              >清空</el-button
            >
          </el-form-item>
        </el-form>

        <div class="side_right_bottom clearfix">
          <div class="btns_box">
            <el-button
              type="primary"
              icon="el-icon-upload"
              plain
              @click="handleClick('export')"
              :size="btnsize"
              >导出Excel</el-button
            >
          </div>
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
                <template slot-scope="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column
                sortable
                prop="driverName"
                label="车主姓名"
                min-width="150"
              >
              </el-table-column>
              <el-table-column
                prop="driverMobile"
                sortable
                label="车主手机号码"
                min-width="150"
              >
              </el-table-column>
              <el-table-column sortable label="参加考卷分类" min-width="150">
                <template slot-scope="scope">
                  <div>
                    {{ scope.row.serviceName }} - {{ scope.row.courseName }}
                  </div>
                  <span>({{ scope.row.learningTypeName }})</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="testpaperName"
                sortable
                label="参加考卷名称"
                min-width="150"
              >
              </el-table-column>
              <el-table-column
                prop="startTime"
                min-width="160"
                sortable
                label="参加考试日期"
              >
                <template slot-scope="scope">{{
                  scope.row.startTime | parseTime
                }}</template>
              </el-table-column>
              <el-table-column
                prop="driverTestNum"
                min-width="150"
                sortable
                label="考试次数"
              >
              </el-table-column>
              <el-table-column
                prop="testStatusName"
                min-width="150"
                sortable
                label="考试结果"
              >
                <!-- <template slot-scope="scope">
                  <div v-if="scope.row.status === 'P'">通过</div>
                  <div v-if="scope.row.status === 'F'">未通过</div>
                </template> -->
              </el-table-column>
              <el-table-column
                prop="correctScore"
                min-width="150"
                sortable
                label="考试分数"
              >
                <template slot-scope="scope">
                  <el-button type="text" @click="open(scope.row)"
                    >{{ scope.row.correctScore }}分</el-button
                  >
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
        <Pager :total="dataTotal" @change="handlePageChange" ref="pager" />
      </div>
    </div>
    <div class="commoncss">
      <el-dialog
        :close-on-click-modal="false"
        v-el-drag-dialog
        :visible.sync="dialogFormVisible"
        @close="closeClick"
        width="1200px"
        top="5vh"
      >
        <el-row class="top">
          <el-col :span="6">
            <div>车主: {{ formData.name }}</div>
          </el-col>
          <el-col :span="6">
            <div>手机号码: {{ formData.mobile }}</div>
          </el-col>
          <el-col :span="6">
            <div>考试日期:{{ formData.starttime }}</div>
          </el-col>
          <el-col :span="6">
            <div>得分:{{ formData.score }}分</div>
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
                <template slot-scope="scope">
                  {{ (page - 1) * pagesize + scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column sortable prop="cate1" label="题目类型" min-width="100">
              </el-table-column>
              <el-table-column prop="title" sortable label="考试题目" min-width="150">
              </el-table-column>
              <el-table-column sortable label="考试选项" min-width="150">
                <template slot-scope="scope">
                  <div
                    v-for="(item, index) in scope.row.contentList1"
                    :key="index"
                  >
                    {{ item }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column sortable min-width="80" label="考试答案">
                <template slot-scope="scope">
                  <div
                    v-for="(item, index) in scope.row.answerList1"
                    :key="index"
                  >
                    {{ item }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column sortable min-width="80" label="车主选择答案">
                <template slot-scope="scope">
                  <div
                    v-for="(item, index) in scope.row.erroranswerlist1"
                    :key="index"
                  >
                    {{ item }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column min-width="80" prop="driverScore" sortable label="得分">
                <!-- <template slot-scope="scope">
                  <div v-if="scope.row.erroranswer === 'P'">
                    {{ scope.row.score }}
                  </div>
                </template> -->
              </el-table-column>
              <el-table-column
                prop="score"
                min-width="80"
                sortable
                label="题目分数"
              >
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" plain icon="el-icon-error" @click="dialogFormVisible = false">关闭</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/javascript">
import fetch from "@/utils/fetch";
import Pager from "@/components/Pagination/index";
import {
  driverLearningTestpaperRecordList,
  exportDriverLearningTestpaperRecordExcel,
  driverLearningTestpaperRecordDetail
} from "@/api/company/course";
import { parseTime } from "@/utils/index";
export default {
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      //   phone: "",
      page: 1,
      pagesize: 20,
      dataTotal: 0,
      tableData: [],
      tableData1: [],
      btnsize: "mini",
      formData: {
        name: "",
        mobile: "",
        starttime: "",
        score: ""
      },
      searchObj: {
        cateId: "", //考卷分类Id
        driverMobile: "", //车主手机号码
        endJoinTestTime: "", //参加考试时间结束值
        startJoinTestTime: "" //参加考试时间起始值
      },
      optionsTestType: [],
      chooseTime: [],
      classificationList: [],
      classification: [],
      props: {
        label: "name",
        value: "id",
        children: "children"
      }
    };
  },
  components: {
    Pager
  },
  created() {
    fetch({
      url: `/${this.$cms}/usercenter/aflcdriverlearningcourse/v1/listCourseCateMenu`,
      method: "post",
      data: {}
    })
      .then(res => {
        if (res.status === 200) {
          this.classificationList = res.data;
        }
      })
      .catch(err => {
        this.$message({
          type: "info",
          message:
            "操作失败，原因：" + (err.errorInfo ? err.errorInfo : err.text)
        });
      });
    this.getList();
  },
  mounted() {},

  methods: {
    handleChange(value) {
      this.searchObj.cateId = value[1];
    },
    closeClick() {
      this.formData = {
        name: "",
        mobile: "",
        starttime: "",
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
      //   fetch({
      //     url: `/${this.$cms}/usercenter/aflcdriverlearningtestpaper/v1/listTestResult2?searchstr=${this.phone}&pageNum=${this.page}&pageSize=${this.pagesize}`,
      //     method: "post",
      //     data: {}
      //   })
      driverLearningTestpaperRecordList(
        this.page,
        this.pagesize,
        this.searchObj
      )
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
    handleClick(type) {
      switch (type) {
        case "export":
          this.$message.info("正在导出中...");
          exportDriverLearningTestpaperRecordExcel(this.searchObj)
            .then(res => {
              var blob = new Blob([res]);
              let href = window.URL.createObjectURL(blob);
              var NewDom = document.createElement("a");
              NewDom.setAttribute("href", href);
              NewDom.setAttribute("target", "_blank");
              NewDom.setAttribute(
                "download",
                "车主考试结果" +
                  parseTime(new Date().getTime(), "{y}{m}{d}{h}{i}{s}") +
                  ".xlsx"
              );
              document.body.appendChild(NewDom);
              NewDom.click();
              document.body.removeChild(NewDom);
            })
            .catch(err => {
              this.$message({
                type: "warning",
                message:
                  "操作失败，原因：" +
                  (err.errorInfo ? err.errorInfo : err.text)
              });
            });
          break;
        default:
          return;
      }
    },
    open(item) {
      this.dialogFormVisible = true;
      this.loading = true;
      const list = ["A.", "B.", "C.", "D.", "E.", "F.", "G."];
      const list1 = ["A", "B", "C", "D", "E", "F", "G"];
      this.formData = {
        name: item.driverName,
        mobile: item.driverMobile,
        starttime: parseTime(item.startTime),
        score: item.correctScore
      };
      //   fetch({
      //     url: `/${this.$cms}/usercenter/aflcdriverlearningtestpaper/v1/viewTestResult2?recordid=${item.recordId}&pageNum=1&pageSize=500`,
      //     method: "post",
      //     data: {}
      //   })
      driverLearningTestpaperRecordDetail(item.recordId)
        .then(res => {
          if (res.status === 200) {
            res.data.forEach(item => {
              item.cate === "duo"
                ? (item.cate1 = "多选题")
                : (item.cate1 = "单选题");
              const contentList1 = [];
              const answerList1 = [];
              const erroranswerlist1 = [];
              JSON.parse(item.content).forEach((item1, index1) => {
                contentList1.push(list[index1] + item1);
              });
              if (item.driverAnswer) {
                JSON.parse(item.driverAnswer).forEach((item1, index1) => {
                  list1.forEach((item2, index2) => {
                    if (item1 === index2) {
                      erroranswerlist1.push(list1[item1]);
                    }
                  });
                });
              }
              JSON.parse(item.answer).forEach((item1, index1) => {
                list.forEach((item2, index2) => {
                  if (item1 === index2) {
                    answerList1.push(list1[item1]);
                  }
                });
              });
              item.contentList1 = contentList1;
              item.answerList1 = answerList1;
              item.erroranswerlist1 = erroranswerlist1;
            });
            this.tableData1 = res.data;
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
      if (this.chooseTime.length) {
        this.searchObj.startJoinTestTime = this.chooseTime[0];
        this.searchObj.endJoinTestTime = this.chooseTime[1];
      }
      this.page = 1;
      this.getList();
    },
    clear() {
      //   this.phone = "";
      this.chooseTime = [];
      this.searchObj = this.$options.data().searchObj;
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
