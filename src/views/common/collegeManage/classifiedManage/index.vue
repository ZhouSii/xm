<template>
  <div class="TwoColumns clearfix" v-loading="loading">
    <div class="columnsContainer">
      <div class="side_right">
        <div class="side_right_bottom clearfix">
          <div class="btns_box clearfix">
            <el-button
              type="primary"
              size="mini"
              plain
              icon="el-icon-circle-plus"
              @click="handleClick('add')"
              v-has:SYSTEM_DRIVER_COLLEGE_MANAGE_COURSE_CLASS_ADD
              >新增</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="handleClick('edit', selected)"
              >修改</el-button
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
                <template slot-scope="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column
                sortable
                prop="picurl"
                min-width="205"
                label="前端显示ICON"
              >
                <template slot-scope="scope">
                  <img
                    :src="scope.row.picurl"
                    alt=""
                    width="185"
                    height="150"
                  />
                </template>
              </el-table-column>
              <el-table-column
                prop="learningTypeName"
                min-width="150"
                sortable
                label="课程学习类型"
              >
              </el-table-column>
              <el-table-column
                prop="serviceid1"
                min-width="150"
                sortable
                label="服务分类"
              >
              </el-table-column>
              <el-table-column
                prop="courseid"
                min-width="150"
                sortable
                label="课程分类名称"
              >
              </el-table-column>
              <el-table-column
                prop="bymeans"
                min-width="150"
                sortable
                label="课程学习方式"
              >
                <template slot-scope="scope">
                  <div v-if="scope.row.bymeans === 'online'">线上培训</div>
                  <div v-if="scope.row.bymeans === 'offline'">实地培训</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="intro"
                sortable
                min-width="150"
                label="课程说明"
              >
              </el-table-column>
              <el-table-column
                prop="createtime"
                min-width="160"
                sortable
                label="创建时间"
              >
                <template slot-scope="scope">{{
                  scope.row.createtime | parseTime
                }}</template>
              </el-table-column>
              <el-table-column
                prop="openpublic"
                width="150"
                sortable
                label="是否公开"
              >
                <template slot-scope="scope">
                  <div v-if="scope.row.openpublic === 'Y'">公开</div>
                  <div v-if="scope.row.openpublic === 'N'">不公开</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="statusName"
                min-width="150"
                sortable
                label="课程状态"
              >
                <!-- <template slot-scope="scope">
                  <div v-if="scope.row.status === 'on'">发布</div>
                  <div v-if="scope.row.status === 'off'">下架</div>
                </template> -->
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
              <!--                          <el-table-column sortable width="140" label="操作">-->
              <!--                            <template slot-scope="scope">-->
              <!--                              <el-button type="primary" size="mini" @click="handleClick('edit',scope.row)" >修改</el-button>-->
              <!--                             &lt;!&ndash; <el-button type="primary" size="mini" plain @click="del(scope.row)">删除</el-button> &ndash;&gt;-->
              <!--                            </template>-->
              <!--                          </el-table-column>-->
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
        :title="btntitle"
        width="750px"
      >
        <el-form
          ref="formData"
          :model="formData"
          label-position="right"
          label-width="130px"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="前端显示ICON ："
                prop="picurl"
                :rules="{
                  required: true,
                  message: '请上传课程分类ICON',
                  trigger: 'blur'
                }"
              >
                <upload
                  class="licensePicture"
                  tip="（必须为jpg/png并且小于5M）"
                  v-model="formData.picurl"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="服务分类 ："
                prop="serviceid"
                :rules="{
                  required: true,
                  message: '请选择服务分类',
                  trigger: 'change'
                }"
              >
                <el-select
                  v-model="formData.serviceid"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, index) in serviceClassificationList"
                    :key="index"
                    :label="item.name"
                    :value="item.code"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="课程分类名称 ："
                prop="courseid"
                :rules="{
                  required: true,
                  validator: (rule, value, callback) => {
                    return checkLength(
                      rule,
                      value,
                      callback,
                      '请输入最少5个字最多25个字课程分类'
                    );
                  },
                  trigger: 'blur'
                }"
              >
                <el-input
                  v-model="formData.courseid"
                  placeholder="课程分类名称"
                  minlength="5"
                  maxlength="25"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="课程学习方式 ："
                prop="bymeans"
                :rules="{
                  required: true,
                  message: '请选择课程学习方式',
                  trigger: 'change'
                }"
              >
                <el-select
                  v-model="formData.bymeans"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, index) in learningStyleList"
                    :key="index"
                    :label="item.name"
                    :value="item.code"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="是否公开 ："
                prop="openpublic"
                :rules="{
                  required: true,
                  message: '请选择是否公开',
                  trigger: 'change'
                }"
              >
                <el-select
                  v-model="formData.openpublic"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, index) in openpublicList"
                    :key="index"
                    :label="item.name"
                    :value="item.code"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" v-if="clickType === 'edit'">
              <el-form-item
                label="课程状态 ："
                prop="status"
                :rules="{
                  required: true,
                  message: '请选择课程状态',
                  trigger: 'change'
                }"
              >
                <el-select
                  v-model="formData.status"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, index) in courseStatusList"
                    :key="index"
                    :label="item.name"
                    :value="item.code"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="课程学习类型 ："
                prop="learningType"
                :rules="{
                  required: true,
                  message: '请选择课程状态',
                  trigger: 'change'
                }"
              >
                <el-select
                  v-model="formData.learningType"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, index) in courselearningTypeList"
                    :key="index"
                    :label="item.name"
                    :value="item.code"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item
                label="课程说明 ："
                class="textArea"
                prop="intro"
                :rules="{
                  required: true,
                  validator: (rule, value, callback) => {
                    return checkLength(
                      rule,
                      value,
                      callback,
                      '请输入最少5个字最多200个字课程说明'
                    );
                  },
                  trigger: 'blur'
                }"
              >
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入最少5个字最多200个字课程说明"
                  minlength="5"
                  maxlength="200"
                  v-model="formData.intro"
                  clearable
                >
                </el-input>
                <p class="countNum">
                  <span class="">{{ formData.intro.length }}</span>
                  <span>/ 200</span>
                </p>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            plain
            icon="el-icon-success"
            @click="submit()"
            >确 定</el-button
          >
          <el-button
            @click="dialogFormVisible = false"
            type="primary"
            plain
            icon="el-icon-error"
            >关 闭</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/javascript">
import fetch from "@/utils/fetch";
import Pager from "@/components/Pagination/index";
import upload from "@/components/Upload/singleImage";
import { parseTime } from "@/utils/index";
import { DicServiceType } from "@/api/common.js";
import {
  driverLearningCateList,
  addDriverLearningCate,
  updateDriverLearningCate
} from "@/api/company/course";
export default {
  data() {
    return {
      radio: "",
      selected: {},
      loading: false,
      dialogAreaPrice: false,
      dialogFormVisible: false,
      formLabelWidth: "140px",
      btntitle: "",
      serviceClassificationList: [],
      learningStyleList: [
        { code: "online", name: "线上培训" },
        { code: "offline", name: "实地培训" }
      ],
      courseStatusList: [
        { code: "on", name: "发布" },
        { code: "draft", name: "草稿" },
        { code: "off", name: "下架" }
      ],
      openpublicList: [
        { code: "Y", name: "公开" },
        { code: "N", name: "不公开" }
      ],
      courselearningTypeList: [
        { code: "1", name: "必学" },
        { code: "2", name: "选学" }
      ],
      formData: {
        picurl: "", // 前端显示ICON
        serviceid: "", // 服务分类
        courseid: "", // 课程分类名称
        bymeans: "", // 课程学习方式
        status: "", // 课程状态
        intro: "", // 课程说明
        openpublic: "", // 是否公开
        learningType: ""
      },
      clickType: "",
      page: 1,
      pagesize: 20,
      dataTotal: 0,
      tableData: []
    };
  },
  components: {
    Pager,
    upload
  },
  async created() {
    DicServiceType().then(res => {
      if (res.status === 200) {
        this.serviceClassificationList = res.data;
        this.getList();
      }
    });
  },
  mounted() {},

  methods: {
    radioChange(e) {
      this.selected = this.tableData[e];
    },
    submit() {
      this.$refs["formData"].validate(valid => {
        if (valid) {
          if (this.btntitle === "新增") {
            // fetch({
            //   url: `/${this.$cms}/usercenter/aflcdriverlearningcate/v1/add`,
            //   method: "post",
            //   data: this.formData
            // })
            addDriverLearningCate(this.formData)
              .then(res => {
                if (res.status === 200) {
                  this.$message.success("新增成功");
                  this.getList();
                  this.dialogFormVisible = false;
                } else {
                  this.$message.warning(res.errorInfo || res.text);
                }
              })
              .catch(err => {
                this.$message.warning(err.errorInfo || err.text);
              });
          } else {
            // fetch({
            //   url: `/${this.$cms}/usercenter/aflcdriverlearningcate/v1/update?id=${this.formData.id}`,
            //   method: "post",
            //   data: this.formData
            // })
            updateDriverLearningCate(this.formData)
              .then(res => {
                if (res.status === 200) {
                  this.$message.success("修改成功");
                  this.getList();
                  this.dialogFormVisible = false;
                } else {
                  this.$message.warning(res.errorInfo || res.text);
                }
              })
              .catch(err => {
                this.$message.warning(err.errorInfo || err.text);
              });
          }
        } else {
          return false;
        }
      });
    },
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.getList();
    },
    handleClick(type, item) {
      this.clickType = type;
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
      }
      this.dialogFormVisible = true;
    },
    getList() {
      this.loading = true;
      const parm = {};

      //   fetch({ url: `/${this.$cms}/usercenter/aflcdriverlearningcate/v1/list?pageNum=${this.page}&pageSize=${this.pagesize}`, method: 'post', data: parm }).then((res) => {
      driverLearningCateList(this.page, this.pagesize, parm)
        .then(res => {
          if (res.status === 200) {
            this.serviceClassificationList.forEach(item => {
              res.data.list.forEach(item2 => {
                if (item.code === item2.serviceid) {
                  item2.serviceid1 = item.name;
                }
              });
            });
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
    checkLength(rule, value, callback, name) {
      if (value === "") {
        callback(new Error(name));
      } else {
        if (value.length < 5 || value.length > 200) {
          callback(new Error(name));
        } else {
          callback();
        }
      }
    },
    del(item) {
      this.$confirm("此操作将删除选择的数据, 是否确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          fetch({
            url: `/${this.$cms}/usercenter/aflcdriverlearningcate/v1/delete?id=${item.id}`,
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
      this.formData = {
        picurl: "", // 前端显示ICON
        serviceid: "", // 服务分类
        courseid: "", // 课程分类名称
        bymeans: "", // 课程学习方式
        status: "", // 课程状态
        intro: "" // 课程说明
      };
      this.$refs["formData"].resetFields();
    }
  }
};
</script>

<style type="text/css" lang="scss" scoped>
</style>
