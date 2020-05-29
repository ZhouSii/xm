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
            <el-cascader
              size="mini"
              clearable
              expand-trigger="hover"
              :options="classificationList"
              v-model="classification"
              :props="props"
              @change="handleChange"
            >
            </el-cascader>
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
              v-has:SYSTEM_DRIVER_COLLEGE_MANAGE_COURSE_CONTENT_ADD
              >新增</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="handleClick('edit', selected)"
              >修改</el-button
            >
            <el-button type="primary" size="mini" plain @click="del(selected)"
              >删除</el-button
            >
            <el-button
              type="primary"
              size="mini"
              plain
              @click="preView(selected)"
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
              @row-click="clickDetails"
              style="width: 100%"
            >
              <el-table-column label="选择" width="60" align="center">
                <template slot-scope="scope">
                  <el-radio class="radio" v-model="radio" :label="scope.row.id"
                    >&nbsp;</el-radio
                  >
                </template>
              </el-table-column>
              <el-table-column label="序号" width="60">
                <template slot-scope="scope">{{
                  (page - 1) * pagesize + scope.$index + 1
                }}</template>
              </el-table-column>
              <el-table-column
                prop="courseId"
                sortable
                min-width="150"
                label="课程分类名称"
              >
                <template slot-scope="scope"
                  >{{ scope.row.serviceName }} -
                  {{ scope.row.courseId }}</template
                >
              </el-table-column>
              <el-table-column
                prop="learningTypeName"
                sortable
                min-width="150"
                label="课程学习类型"
              >
              </el-table-column>
              <el-table-column
                prop="title"
                sortable
                min-width="150"
                label="课程标题"
              >
              </el-table-column>
              <el-table-column
                prop="createtime"
                sortable
                min-width="160"
                label="发布时间"
              >
                <template slot-scope="scope">{{
                  scope.row.createtime | parseTime
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
              <el-table-column
                prop="updatetime"
                min-width="160"
                sortable
                label="更新时间"
              >
                <template slot-scope="scope">{{
                  scope.row.updatetime | parseTime
                }}</template>
              </el-table-column>
              <!--<el-table-column width="250" sortable label="操作">-->
              <!--  <template slot-scope="scope">-->
              <!--    <el-button type="primary" size="mini" @click="handleClick('edit',scope.row)" >修改</el-button>-->
              <!--    <el-button type="primary" size="mini" plain @click="del(scope.row)">删除</el-button>-->
              <!--    <el-button type="primary" size="mini" plain @click="preView(scope.row)">预览课程内容</el-button>-->
              <!--  </template>-->
              <!--</el-table-column>-->
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
            <el-cascader
              style="width: 50%"
              clearable
              expand-trigger="hover"
              :options="classificationList"
              v-model="formData.classification"
              :props="props"
              @change="handleChange2"
            >
            </el-cascader>
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
import {
  driverLearningCourseCateList,
  addDriverLearningCourse,
  updateDriverLearningCourse
} from "@/api/company/course";
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
      classification: [],
      cateId: "",
      courseid: "", // 课程分类
      serviceid: "", // 服务分类
      title: "",
      tableData: [],
      viewContent: "",
      formData: {
        classification: [],
        courseid: "", // 课程分类
        serviceid: "", // 服务分类
        title: "", // 课程标题
        content: "", // 课程内容
        cateId: ""
      },
      props: {
        label: "name",
        value: "id",
        children: "children"
      },
      Arr: [],
      Pos: 0,
      learningTypeArr: [],
      learningTypePos: 0,
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
    // radioChange(e) {
    //     console.log('e',e)
    //   this.selected = this.tableData[e];
    //     console.log('this.selected',this.selected)
    //     console.log('this.tableData',this.tableData)
    // },
    // 点击选中当前行
    clickDetails(row, event, column) {
      // this.$refs.multipleTable.toggleRowSelection(row)
      this.radio = row.id;
      this.selected = row;
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
      //   this.serviceid = value[0];
      this.cateId = value[1];
    },
    handleChange2(value) {
      this.formData.cateId = value[1];
      this.formData.serviceid = value[0];
    },
    searchClick() {
      this.page = 1;
      const parm = {
        // serviceid: this.serviceid,
        cateId: this.cateId,
        title: this.title
      };
      this.getList(parm);
    },
    clearClick() {
      this.page = 1;
      this.title = "";
      this.classification = [];
      this.cateId = "";
      this.serviceid = "";
      this.getList();
    },
    submit() {
      this.formData.content = tinyMCE.activeEditor.getContent();
      this.$refs["formData"].validate(valid => {
        if (valid) {
          if (this.btntitle === "新增") {
            // fetch({ url: `/${this.$cms}/usercenter/aflcdriverlearningcourse/v1/add`, method: 'post', data: this.formData }).then((res) =>
            // this.classificationList.forEach(el => {
            //     if(el.code === this.formData.classification[1]){

            // console.log(this.formData.cateId)
            //     }
            // })
            // console.log(this.formData);

            addDriverLearningCourse(this.formData)
              .then(res => {
                if (res.status === 200) {
                  this.$message.success("新增成功");
                  this.dialogFormVisible = false;
                  this.getList();
                } else {
                  this.$message.warning(res.text);
                }
              })
              .catch(err => {
                this.$message.warning(err.text);
              });
          } else {
            // fetch({ url: `/${this.$cms}/usercenter/aflcdriverlearningcourse/v1/update?id=${this.formData.id}`, method: 'post', data: this.formData }).then((res) => {
            updateDriverLearningCourse(this.formData)
              .then(res => {
                if (res.status === 200) {
                  this.$message.success("修改成功");
                  this.getList();
                  this.dialogFormVisible = false;
                } else {
                  this.$message.warning(res.text);
                }
              })
              .catch(err => {
                this.$message.warning(err.text);
              });
          }
        } else {
          return false;
        }
      });
    },
    getList(parm = {}) {
      this.loading = true;
      this.radio = "";
      //   fetch({ url: `/${this.$cms}/usercenter/aflcdriverlearningcourse/v1/list?pageNum=${this.page}&pageSize=${this.pagesize}`, method: 'post', data: parm }).then((res) => {
      driverLearningCourseCateList(this.page, this.pagesize, parm)
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
        item.classification = [item.serviceId, item.cateId];
        this.formData = JSON.parse(JSON.stringify(item));
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
            url: `/${this.$cms}/usercenter/aflcdriverlearningcourse/v1/delete?id=${item.id}`,
            method: "post",
            data: {}
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
        classification: [],
        courseid: "",
        serviceid: "",
        title: "",
        content: ""
      };
      this.$refs["formData"].resetFields();
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 2) {
        const _row_1 = this.Arr[rowIndex];
        const _col_1 = _row_1 > 0 ? 1 : 0;
        return { rowspan: _row_1, colspan: _col_1 };
      } else if (columnIndex === 3) {
        const _row_1 = this.learningTypeArr[rowIndex];
        const _col_1 = _row_1 > 0 ? 1 : 0;
        return { rowspan: _row_1, colspan: _col_1 };
      }
    },
    merage() {
      this.merageInit();
      for (let i = 0; i < this.tableData.length; i++) {
        if (i === 0) {
          this.Arr.push(1);
          this.learningTypeArr.push(1);
          this.Pos = 0;
          this.learningTypePos = 0;
        } else {
          if (
            `${this.tableData[i].serviceidName} - ${this.tableData[i].courseId}` ===
            `${this.tableData[i - 1].serviceidName} - ${
              this.tableData[i - 1].courseId
            }`
          ) {
            this.Arr[this.Pos] += 1;
            this.Arr.push(0);
          } else {
            this.Arr.push(1);
            this.Pos = i;
          }
          if (
            this.tableData[i].learningType ===
            this.tableData[i - 1].learningType
          ) {
            this.learningTypeArr[this.learningTypePos] += 1;
            this.learningTypeArr.push(0);
          } else {
            this.learningTypeArr.push(1);
            this.learningTypePos = i;
          }
        }
      }
    },

    merageInit() {
      this.Arr = [];
      this.Pos = 0;
      this.learningTypePos = 0;
      this.learningTypeArr = [];
    }
  }
};
</script>

<style type="text/css" lang="scss" scoped>
</style>
