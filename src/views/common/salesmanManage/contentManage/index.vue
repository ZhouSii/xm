<template>
  <div class="TwoColumns clearfix" v-loading="loading">
    <div class="columnsContainer">
      <div class="side_right">
        <el-form
          :inline="true"
          ref="ruleForm"
          class="demo-ruleForm classify_searchinfo"
        >
          <el-form-item label="课程分类">
            <el-select size="mini" clearable v-model="classification">
              <el-option
                v-for="item in classificationList"
                :key="item.id"
                :label="item.course"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课程标题">
            <el-input
              v-model="title"
              clearable
              placeholder="课程标题"
            ></el-input>
          </el-form-item>
          <el-form-item class="fr">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-search"
              plain
              @click="searchClick()"
              >查询</el-button
            >
            <el-button
              type="info"
              size="mini"
              icon="fontFamily aflc-icon-qingkong"
              plain
              @click="clearClick()"
              >清空</el-button
            >
          </el-form-item>
        </el-form>

        <div class="side_right_bottom clearfix">
          <div class="btns_box clearfix">
            <el-button
              type="primary"
              size="mini"
              plain
              icon="el-icon-circle-plus"
              @click="handleClick('add')"
              v-has:SYSTEM_SALESMANCOLLEGE_SALESMANCOURSECONTENT_ADD
              >新增</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="handleClick('edit', selected)"
              v-has:SYSTEM_SALESMANCOLLEGE_SALESMANCOURSECONTENT_MODIFY
              >修改</el-button
            >
            <el-button type="primary" size="mini" plain @click="del(selected)" 
              v-has:SYSTEM_SALESMANCOLLEGE_SALESMANCOURSECONTENT_DELETE
              >删除</el-button
            >
            <el-button
              type="primary"
              size="mini"
              plain
              @click="preView(selected)"
              v-has:SYSTEM_SALESMANCOLLEGE_SALESMANCOURSECONTENT_SEE
              >预览课程内容</el-button
            >
          </div>
          <div class="info_news">
            <el-table
              ref="multipleTable"
              :data="tableData"
              :span-method="objectSpanMethod"
              stripe
              border
              height="100%"
              tooltip-effect="dark"
              style="width: 100%"
            >
              <el-table-column label="选择" width="60" align="center">
                <template slot-scope="scope">
                  <el-radio
                    class="radio"
                    v-model="radio"
                    :label="scope.$index"
                    @change="radioChange"
                    >&nbsp;</el-radio
                  >
                </template>
              </el-table-column>
              <el-table-column label="序号" width="60">
                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
              </el-table-column>
              <el-table-column
                prop="course"
                sortable
                min-width="176"
                label="课程分类名称"
              >
              </el-table-column>
              <el-table-column
                prop="title"
                sortable
                min-width="176"
                label="课程标题"
              ></el-table-column>
              <el-table-column
                prop="updateTime"
                sortable
                min-width="176"
                label="发布时间"
              >
                <template slot-scope="scope">{{
                  scope.row.updateTime | parseTime
                }}</template>
              </el-table-column>
              <el-table-column
                prop="content"
                min-width="376"
                sortable
                label="课程内容"
              >
                <template slot-scope="scope">
                  <div
                    v-html="scope.row.content"
                    style="max-height: 200px;overflow: auto;"
                  ></div>
                </template>
              </el-table-column>
              <!--              <el-table-column width="250" sortable label="操作">-->
              <!--                <template slot-scope="scope">-->
              <!--                  <el-button type="primary" size="mini" @click="handleClick('edit',scope.row)">修改</el-button>-->
              <!--                  <el-button type="primary" size="mini" plain @click="del(scope.row)">删除</el-button>-->
              <!--                  <el-button type="primary" size="mini" plain @click="preView(scope.row)">预览课程内容</el-button>-->
              <!--                </template>-->
              <!--              </el-table-column>-->
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
        :title="btntitle"
        :visible.sync="dialogFormVisible"
        @close="closeClick"
        @open="openClick"
        width="1000px"
      >
        <el-form
          ref="formData"
          :model="formData"
          label-position="right"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="选择课程分类"
            prop="classification"
            :rules="{
              required: true,
              message: '请选择课程分类',
              trigger: 'change'
            }"
          >
            <el-select
              size="mini"
              style="width: 50%"
              clearable
              v-model="formData.classification"
            >
              <el-option
                v-for="item in classificationList"
                :key="item.id"
                :label="item.course"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="课程标题"
            prop="title"
            :rules="{
              required: true,
              validator: (rule, value, callback) => {
                return checkLength(
                  rule,
                  value,
                  callback,
                  '请输入最少5个字最多25个字课程标题'
                );
              },
              trigger: 'blur'
            }"
          >
            <el-input
              style="width: 50%"
              v-model="formData.title"
              minlength="5"
              maxlength="25"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            label="课程内容"
            class="editors"
            prop="content"
            :rules="{
              required: true,
              message: '请输入课程内容',
              trigger: 'blur'
            }"
          >
            <div>
              <editor
                class="editor"
                :value="formData.content"
                :setting="editorSetting"
                @show="editors"
                :url="Url"
                :max-size="MaxSize"
                :accept="Accept"
                :with-credentials="withCredentials"
                @on-upload-fail="onEditorReady"
                @on-upload-success="onEditorUploadComplete"
              ></editor>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            plain
            icon="el-icon-success"
            @click="submit()"
            >保存</el-button
          >
          <el-button type="primary" plain icon="el-icon-error" @click="close"
            >关闭</el-button
          >
        </div>
      </el-dialog>
    </div>
    <el-dialog
      :close-on-click-modal="true"
      v-el-drag-dialog
      title="预览课程内容"
      :visible.sync="dialogFormVisible1"
      width="500px"
    >
      <div v-html="viewContent"></div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import fetch from "@/utils/fetch";
import Pager from "@/components/Pagination/index";
import editor from "@/components/tinymac/index";
import { parseTime } from "@/utils/index";
export default {
  data() {
    return {
      radio: "",
      selected: {},
      loading: false,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      btntitle: "",
      page: 1,
      pagesize: 20,
      dataTotal: 0,
      classificationList: [],
      classification: null,
      courseid: "", // 课程分类
      serviceid: "", // 服务分类
      title: "",
      tableData: [],
      viewContent: "",
      formData: {
        classification: null,
        courseid: "", // 课程分类
        serviceid: "", // 服务分类
        title: "", // 课程标题
        content: "" // 课程内容
      },
      props: {
        label: "name",
        value: "code",
        children: "children"
      },
      Arr: [],
      Pos: 0,
      editorSetting: {
        // 配置富文本编辑器高
        height: 300
      },
      Url: "", // 图片对应的上传地址,不传!
      MaxSize: 2097152, // 文件大小
      Accept: "image/jpeg, image/png", // 文件格式
      withCredentials: true
    };
  },
  components: {
    Pager,
    editor
  },
  created() {
    this.getClassificationList();
    this.getList();
  },
  mounted() {},

  methods: {
    radioChange(e) {
      this.selected = this.tableData[e];
    },
    preView(item) {
      if (!item.id) {
        this.$message.warning("请选择一条列表数据!");
        return;
      }
      this.viewContent = "";
      this.dialogFormVisible1 = true;
      this.viewContent = item.content;
    },
    handleChange(value) {
      this.serviceid = value[0];
      this.courseid = value[1];
    },
    handleChange2(value) {
      this.formData.serviceid = value[0];
      this.formData.courseid = value[1];
    },
    searchClick() {
      this.page = 1;
      const parm = {
        serviceid: this.serviceid,
        courseid: this.courseid,
        title: this.title
      };
      this.getList(parm);
    },
    clearClick() {
      this.page = 1;
      this.title = "";
      this.classification = null;
      this.courseid = "";
      this.serviceid = "";
      this.getList();
    },
    submit() {
      this.formData.content = tinyMCE.activeEditor.getContent();
      this.$refs["formData"].validate(valid => {
        if (valid) {
          if (this.btntitle === "新增") {
            let params = {
              caseId: this.formData.classification,
              title: this.formData.title,
              content: this.formData.content
            };
            fetch({
              url: `/${this.$cms}/usercenter/aflcsalesmanlearningcourse/v1/add`,
              method: "post",
              data: params
            })
              .then(res => {
                if (res.status === 200) {
                  this.$message.success("新增成功");
                  this.getList();
                  this.dialogFormVisible = false;
                } else {
                  this.$message.warning(res.errorInfo);
                }
              })
              .catch(err => {
                this.$message.warning(err.errorInfo);
              });
          } else {
            // 修改
            let params = {
              id: this.formData.id,
              caseId: this.formData.classification,
              title: this.formData.title,
              content: this.formData.content
            };
            fetch({
              url: `/${this.$cms}/usercenter/aflcsalesmanlearningcourse/v1/update`,
              method: "post",
              data: params
            })
              .then(res => {
                if (res.status === 200) {
                  this.$message.success("修改成功");
                  this.getList();
                  this.dialogFormVisible = false;
                } else {
                  this.$message.warning(res.errorInfo);
                }
              })
              .catch(err => {
                this.$message.warning(err.errorInfo);
              });
          }
        } else {
          return false;
        }
      });
    },
    // 获取课程分类
    getClassificationList() {
      fetch({
        url: `/${this.$cms}/usercenter/aflcsalesmanlearningcase/v1/list`,
        method: "post",
        data: {
          pageNum: 1,
          pageSize: 500 //获取全部分类不需要页码，所以写死一页500条
        }
      })
        .then(res => {
          if (res.status === 200) {
            this.classificationList = res.data.list;
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
    // 获取数据
    getList(parm = {}) {
      this.loading = true;
      parm = {
        pageNum: this.page,
        pageSize: this.pagesize,
        courseTitle: this.title,
        caseId: this.classification
      };
      fetch({
        url: `/${this.$cms}/usercenter/aflcsalesmanlearningcourse/v1/list`,
        method: "post",
        data: parm
      })
        .then(res => {
          if (res.status === 200) {
            this.tableData = res.data.list;
            this.dataTotal = res.data.total;
            this.loading = false;
            this.merage();
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
    close() {
      this.dialogFormVisible = false;
    },
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.getList();
    },
    handleClick(type, item) {
      if (type === "add") {
        this.btntitle = "新增";
      }
      if (type === "edit") {
        if (!item.id) {
          this.$message.warning("请选择一条列表数据!");
          return;
        }
        this.btntitle = "修改";
        this.formData = JSON.parse(JSON.stringify(item));
        this.formData.classification = item.caseId;
      }
      this.dialogFormVisible = true;
    },
    openClick() {
      this.$nextTick(() => {
        tinyMCE.activeEditor.setContent(this.formData.content);
      });
    },
    editors(content) {
      // editor组件传过来的值赋给content
      // console.log(content)
      // this.formData.content = content
    },
    onEditorReady(ins, ina) {
      // 上传失败的函数
      console.log("ins");
      console.log(ins);
      console.log(ina);
    },
    onEditorUploadComplete(url) {
      // 处理上传图片后返回数据，添加img标签到编辑框内
      console.log("url");
      console.log(url);
    },
    checkLength(rule, value, callback, name) {
      if (value === "") {
        callback(new Error(name));
      } else {
        if (value.length < 5 || value.length > 25) {
          callback(new Error(name));
        } else {
          callback();
        }
      }
    },
    del(item) {
      if (!item.id) {
        this.$message.warning("请选择一条列表数据!");
        return;
      }
      this.$confirm("此操作将删除选择的数据, 是否确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          fetch({
            url: `/${this.$cms}/usercenter/aflcsalesmanlearningcourse/v1/delete/${item.id}`,
            method: "get"
          })
            .then(res => {
              if (res.status === 200) {
                this.$message.success("删除成功");
                this.getList();
                this.loading = false;
              }
            })
            .catch(err => {
              this.$message({
                type: "info",
                message:
                  "操作失败，原因：" +
                  (err.errorInfo ? err.errorInfo : err.text)
              });
              this.loading = false;
            });
        })
        .catch(() => {});
    },
    closeClick() {
      tinyMCE.activeEditor.setContent("");
      this.formData = {
        classification: null,
        courseid: "",
        serviceid: "",
        title: "",
        content: ""
      };
      this.$refs["formData"].resetFields();
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        const _row_1 = this.Arr[rowIndex];
        const _col_1 = _row_1 > 0 ? 1 : 0;
        return { rowspan: _row_1, colspan: _col_1 };
      }
    },
    merage() {
      this.merageInit();
      for (let i = 0; i < this.tableData.length; i++) {
        if (i === 0) {
          this.Arr.push(1);
          this.Pos = 0;
        } else {
          if (
            `${this.tableData[i].course}` === `${this.tableData[i - 1].course}`
          ) {
            this.Arr[this.Pos] += 1;
            this.Arr.push(0);
          } else {
            this.Arr.push(1);
            this.Pos = i;
          }
        }
      }
    },

    merageInit() {
      this.Arr = [];
      this.Pos = 0;
    }
  }
};
</script>

<style type="text/css" lang="scss" scoped>
</style>
