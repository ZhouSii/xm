<template>
  <div class="TwoColumns clearfix" v-loading="loading">
    <div class="columnsContainer">
      <div class="side_right">
        <el-form
          :inline="true"
          ref="ruleForm"
          class="demo-ruleForm classify_searchinfo"
        >
          <el-form-item label="题目分类 ：">
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
          <el-form-item label="题目名称 ：">
            <el-input
              v-model="title"
              placeholder="题目名称"
              clearable
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
              v-has:SYSTEM_DRIVER_TEST_MANAGE_DRIVER_QUESTION_BANK_ADD
              >新增题目</el-button
            >
            <el-button
              type="primary"
              size="mini"
              plain
              @click="handleClick('edit', selected)"
              v-has:SYSTEM_DRIVER_TEST_MANAGE_DRIVER_QUESTION_BANK_MODIFY
              >修改题目</el-button
            >
            <el-button
              type="primary"
              size="mini"
              plain
              @click="del(selected)"
              v-has:SYSTEM_DRIVER_TEST_MANAGE_DRIVER_QUESTION_BANK_DELETE
              >删除题目</el-button
            >
            <el-button
              type="primary"
              size="mini"
              plain
              @click="handleClick('look', selected)"
              v-has:SYSTEM_DRIVER_TEST_MANAGE_DRIVER_QUESTION_BANK_SEE
              >预览题目</el-button
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
                <template slot-scope="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column sortable label="题目分类" min-width="180">
                <template slot-scope="scope">
                  <div>
                    {{ scope.row.servicename }} - {{ scope.row.courseid }}
                  </div>
                  <span>({{ scope.row.learningTypeName }})</span>
                </template>
              </el-table-column>
              <el-table-column sortable label="题目类型" min-width="150">
                <template slot-scope="scope">
                  <div v-if="scope.row.cate === 'duo'">多选题</div>
                  <div v-else>单选题</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="title"
                sortable
                label="题目名称"
                min-width="150"
              >
              </el-table-column>
              <el-table-column sortable label="题目可选答案" min-width="150">
                <template slot-scope="scope">
                  <div
                    v-for="(item, index) in scope.row.contentList1"
                    :key="index"
                  >
                    <div>{{ item }}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column sortable label="题目答案" min-width="150">
                <template slot-scope="scope">
                  <div
                    v-for="(item, index) in scope.row.answerList1"
                    :key="index"
                  >
                    <div>{{ item }}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="score"
                sortable
                label="题目分数"
                min-width="150"
              >
              </el-table-column>
              <el-table-column
                prop="createtime"
                sortable
                label="题目创建时间"
                min-width="160"
              >
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
              <!-- <el-table-column width="280" sortable label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" plain @click="handleClick('edit',scope.row)" >修改题目</el-button>
                    <el-button type="primary" size="mini" plain @click="del(scope.row)">删除题目</el-button>
                    <el-button type="primary" size="mini" plain @click="handleClick('look',scope.row)">预览题目</el-button>
                </template>
                </el-table-column> -->
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
            label="选择题目分类："
            prop="classification"
            :rules="{
              required: true,
              message: '选择题目分类',
              trigger: 'change'
            }"
          >
            <el-cascader
              style="width: 50%"
              clearable
              :disabled="btntitle === '预览'"
              expand-trigger="hover"
              :options="classificationList"
              v-model="formData.classification"
              :props="props"
              @change="handleChange2"
            >
            </el-cascader>
          </el-form-item>
          <el-form-item label="选择题目类型：" v-if="btntitle === '新增'">
            <el-button type="text" size="mini" @click="addOption('单选题')"
              >单选题</el-button
            >
            <el-button type="text" size="mini" @click="addOption('多选题')"
              >多选题</el-button
            >
          </el-form-item>
          <el-form-item label="修改题目类型：" v-if="btntitle === '修改'">
            <el-button type="text" size="mini" @click="editOption('单选题')"
              >单选题</el-button
            >
            <el-button type="text" size="mini" @click="editOption('多选题')"
              >多选题</el-button
            >
          </el-form-item>

          <div v-for="(item, index) in formData.questionList" :key="index">
            <div
              class="subject_item"
              @mouseenter="enter(index)"
              @mouseleave="leave(index)"
              :style="{ background: item.showItem ? '#eeeeee' : 'white' }"
            >
              <div class="margin_b_10">
                <span class="f_r">*</span>{{ index + 1 }}.{{ item.title
                }}<span
                  class="margin_l_10"
                  style="color: #409eff"
                  v-if="item.cate === 'duo'"
                  >[多选题]</span
                >
                <span class="margin_l_10" v-if="item.score !== ''"
                  >分数：{{ item.score }}</span
                >
                <span class="margin_l_10 f_r">{{ item.title1 }}</span>
              </div>
              <div class="flex_f margin_l_10" v-if="item.cate === 'dan'">
                <div v-for="(item1, index1) in item.itemList" :key="index1">
                  <el-radio
                    class="margin_b_10"
                    v-model="item.radio"
                    :label="index1"
                    disabled
                    >&nbsp;</el-radio
                  ><span>{{ item1.name }}</span>
                </div>
              </div>
              <div class="flex_f margin_l_10" v-if="item.cate === 'duo'">
                <div
                  class="margin_b_10"
                  v-for="(item1, index1) in item.itemList"
                  :key="index1"
                >
                  <el-checkbox disabled v-model="item1.checked"></el-checkbox>
                  <span class="margin_l_10">{{ item1.name }}</span>
                </div>
              </div>
              <div style="height: 40px">
                <div class="flex_sb" v-show="item.showItem">
                  <el-popover
                    placement="bottom"
                    trigger="manual"
                    v-model="item.showAdd"
                  >
                    <el-button
                      type="text"
                      size="mini"
                      @click="insertOption('单选题', index, item)"
                      >单选题</el-button
                    >
                    <el-button
                      type="text"
                      size="mini"
                      @click="insertOption('多选题', index, item)"
                      >多选题</el-button
                    >
                    <el-button
                      type="text"
                      slot="reference"
                      @click="item.showAdd = !item.showAdd"
                      v-if="btntitle === '新增'"
                      >在此题后插入新题</el-button
                    >
                  </el-popover>
                  <div>
                    <el-button
                      type="primary"
                      size="mini"
                      icon="el-icon-edit-outline"
                      :disabled="item.showEdit"
                      v-if="btntitle !== '预览'"
                      @click="editClick(item, index)"
                      >编辑</el-button
                    >
                    <el-button
                      type="primary"
                      size="mini"
                      icon="el-icon-delete"
                      :disabled="formData.questionList.length === 1"
                      plain
                      @click="delClick(index)"
                      v-if="btntitle === '新增'"
                      >删除</el-button
                    >
                    <el-button
                      type="primary"
                      size="mini"
                      icon="el-icon-arrow-up"
                      plain
                      :disabled="index === 0"
                      v-if="btntitle === '新增'"
                      @click="upClick(formData.questionList, index, item)"
                      >上移</el-button
                    >
                    <el-button
                      type="primary"
                      size="mini"
                      icon="el-icon-arrow-down"
                      plain
                      :disabled="index === formData.questionList.length - 1"
                      v-if="btntitle === '新增'"
                      @click="downClick(formData.questionList, index, item)"
                      >下移</el-button
                    >
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="item.showEdit"
              class="subject_item"
              style="background: #eeeeee"
            >
              <el-form-item
                label="题目标题："
                :prop="'questionList.' + index + '.title'"
                :rules="{
                  required: true,
                  validator: (rule, value, callback) => {
                    return checkLength(
                      rule,
                      value,
                      callback,
                      '请输入最少5个字最多50个字题目名称'
                    );
                  },
                  trigger: 'blur'
                }"
              >
                <el-input
                  style="width: 50%"
                  v-model="item.title"
                  maxlength="50"
                  clearable
                  placeholder="请输入题目标题"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="题目分数："
                :prop="'questionList.' + index + '.score'"
                :rules="{
                  required: true,
                  validator: (rule, value, callback) => {
                    return checkNember(
                      rule,
                      value,
                      callback,
                      '请输入最少1位最多2位数字整数'
                    );
                  },
                  trigger: 'blur'
                }"
              >
                <el-input
                  style="width: 50%"
                  v-model="item.score"
                  maxlength="2"
                  clearable
                  placeholder="请输入题目分数"
                ></el-input>
              </el-form-item>
              <el-row :gutter="20" class="el_row">
                <el-col :span="10">选项文字</el-col>
                <el-col :span="7">上移下移</el-col>
                <el-col :span="7">确认题目答案</el-col>
              </el-row>
              <el-row
                :gutter="24"
                class="el_row"
                v-for="(item1, index1) in item.itemList"
                :key="index1"
              >
                <el-col :span="10">
                  <el-form-item
                    label=""
                    :prop="
                      'questionList.' + index + '.itemList.' + index1 + '.name'
                    "
                    label-width="0px"
                    :rules="{
                      required: true,
                      validator: (rule, value, callback) => {
                        return checkLength2(
                          rule,
                          value,
                          callback,
                          '请输入最少2个字最多50个字答案名称',
                          item.itemList,
                          index1
                        );
                      },
                      trigger: 'blur'
                    }"
                  >
                    <div class="flex_a">
                      <el-input
                        v-model="item1.name"
                        maxlength="50"
                        clearable
                        placeholder="请输入选项"
                      ></el-input>
                      <el-button
                        type="primary"
                        size="mini"
                        icon="el-icon-plus"
                        class="margin_l_10"
                        plain
                        @click="addItem(item.itemList)"
                      ></el-button>
                      <el-button
                        type="primary"
                        size="mini"
                        icon="el-icon-minus"
                        class="margin_l_10"
                        plain
                        @click="removeItem(item, index1)"
                        :disabled="
                          item.itemList.length === 1 ||
                            item.itemList.length === 2
                        "
                      ></el-button>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <div class="flex_a h">
                    <el-button
                      type="primary"
                      size="mini"
                      icon="el-icon-arrow-up"
                      plain
                      :disabled="index1 === 0"
                      @click="upItem(item, index1, item.itemList[index1])"
                      >上移</el-button
                    >
                    <el-button
                      type="primary"
                      class="margin_l_10"
                      size="mini"
                      icon="el-icon-arrow-down"
                      plain
                      :disabled="index1 === item.itemList.length - 1"
                      @click="downItem(item, index1, item.itemList[index1])"
                      >下移</el-button
                    >
                  </div>
                </el-col>
                <el-col :span="7" v-if="item.cate === 'dan'">
                  <div class="flex_a h">
                    <el-radio v-model="item.radio" :label="index1">
                      &nbsp;</el-radio
                    >
                  </div>
                </el-col>
                <el-col :span="7" v-else>
                  <div class="flex_a h">
                    <el-form-item
                      label=""
                      :prop="
                        'questionList.' +
                          index +
                          '.itemList.' +
                          index1 +
                          '.checked'
                      "
                      label-width="0px"
                      :rules="{
                        required: true,
                        validator: (rule, value, callback) => {
                          return checkCheckBox(
                            rule,
                            value,
                            callback,
                            '多选题最少选择2个答案',
                            item.itemList
                          );
                        },
                        trigger: 'blur'
                      }"
                      :inline-message="true"
                      class="my-form-item"
                    >
                      <el-checkbox v-model="item1.checked" :label="index1">
                        &nbsp;</el-checkbox
                      >
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <div slot="footer" class="dialog-footer">
                <el-button
                  type="warning"
                  icon="el-icon-success"
                  @click="finishEditing(item, index)"
                  >完成编辑</el-button
                >
              </div>
            </div>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            plain
            icon="el-icon-success"
            v-if="btntitle !== '预览'"
            @click="submit()"
            >保存</el-button
          >
          <el-button type="primary" plain icon="el-icon-error" @click="close"
            >关闭</el-button
          >
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
      radio: "",
      selected: {},
      loading: false,
      dialogFormVisible: false,
      btntitle: "",
      do: "",
      activeName: "single",
      page: 1,
      pagesize: 20,
      dataTotal: 0,
      classificationList: [],
      classification: [],
      courseid: "", // 课程分类
      serviceid: "", // 服务分类
      title: "",
      tableData: [],
      formData: {
        // 题目
        classification: [],
        courseid: "", // 课程分类
        serviceid: "", // 服务分类
        questionList: [
          {
            title: "标题",
            contentList: [],
            answerList: [],
            itemList: [
              { name: "选项", checked: true },
              { name: "选项", checked: true }
            ],
            radio: 0,
            cate: "dan",
            score: "",
            showItem: false,
            showAdd: false,
            showEdit: true
          }
        ]
      },
      props: {
        label: "name",
        value: "code",
        children: "children"
      },
      Arr: [],
      Pos: 0
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
    radioChange(e) {
      this.selected = this.tableData[e];
    },
    submit() {
      this.$refs["formData"].validate(valid => {
        if (valid) {
          this.formData.questionList.forEach(item => {
            const contentList = [];
            const answerList = [];
            item.itemList.forEach((item1, index1) => {
              contentList.push(item1.name);
              if (item.cate === "duo") {
                if (item1.checked) {
                  answerList.push(index1);
                }
              }
            });
            item.contentList = contentList;
            item.answerList = answerList;
            if (item.cate === "dan") {
              item.answerList = [item.radio];
            }
          });
          if (this.btntitle === "新增") {
            fetch({
              url: `/${this.$cms}/usercenter/aflcdriverlearningquestion/v1/batchAdd`,
              method: "post",
              data: this.formData
            })
              .then(res => {
                if (res.status === 200) {
                  this.$message.success("新增成功");
                  this.getList();
                  this.dialogFormVisible = false;
                  this.getErr();
                } else {
                  if (res.status === 100) {
                    console.log(res.data);
                  } else {
                    this.$message.warning(res.text);
                  }
                }
              })
              .catch(err => {
                if (err.status === 100 && err.data !== null) {
                  this.getErr(err.data);
                } else {
                  this.getErr();
                  this.$message.warning(err.text);
                }
              });
          } else {
            const parm = {
              id: this.formData.id,
              serviceid: this.formData.serviceid,
              courseid: this.formData.courseid,
              cate: this.formData.cate,
              title: this.formData.questionList[0].title,
              contentList: this.formData.questionList[0].contentList,
              answerList: this.formData.questionList[0].answerList,
              score: this.formData.questionList[0].score
            };
            fetch({
              url: `/${this.$cms}/usercenter/aflcdriverlearningquestion/v1/update?id=${this.formData.id}`,
              method: "post",
              data: parm
            })
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
    getErr(data = {}) {
      this.formData.questionList.forEach((item, index) => {
        const is = Object.keys(data).find(item1 => {
          return item1 * 1 === index;
        });
        if (is) {
          this.$set(item, "title1", data[index]);
        } else {
          this.$set(item, "title1", "");
        }
      });
    },
    handleChange(value) {
      this.serviceid = value[0];
      this.courseid = value[1];
    },
    handleChange2(value) {
      this.formData.serviceid = value[0];
      this.formData.courseid = value[1];
    },
    finishEditing(item, index) {
      let title,
        score,
        contentList,
        checked,
        itemList = [];
      this.$refs["formData"].validateField(
        "questionList." + index + ".title",
        err => {
          title = !err;
        }
      );
      this.$refs["formData"].validateField(
        "questionList." + index + ".score",
        err => {
          score = !err;
        }
      );
      item.itemList.forEach((item1, index1) => {
        this.$refs["formData"].validateField(
          "questionList." + index + ".itemList." + index1 + ".name",
          err => {
            itemList.push(!err);
          }
        );
      });
      if (item.cate === "dan") {
        if (title && score && !contentList) {
          item.showEdit = false;
        }
      } else {
        item.itemList.forEach((item1, index1) => {
          this.$refs["formData"].validateField(
            "questionList." + index + ".itemList." + index1 + ".checked",
            err => {
              checked = !err;
            }
          );
        });
        contentList = itemList.some(item => item === false);
        if (title && score && !contentList && checked) {
          item.showEdit = false;
        }
      }
    },
    insertOption(name, index, item) {
      item.showAdd = !item.showAdd;
      if (name === "单选题") {
        this.formData.questionList.splice(index + 1, 0, {
          title: "标题",
          contentList: [],
          answerList: [],
          itemList: [
            { name: "选项", checked: true },
            { name: "选项", checked: true }
          ],
          radio: 0,
          cate: "dan",
          score: "",
          showItem: false,
          showAdd: false,
          showEdit: true
        });
      } else {
        this.formData.questionList.splice(index + 1, 0, {
          title: "标题",
          contentList: [],
          answerList: [],
          itemList: [
            { name: "选项", checked: true },
            { name: "选项", checked: true }
          ],
          radio: 0,
          cate: "duo",
          score: "",
          showItem: false,
          showAdd: false,
          showEdit: true
        });
      }
    },
    addOption(name) {
      if (name === "单选题") {
        this.formData.questionList.push({
          title: "标题",
          contentList: [],
          answerList: [],
          itemList: [
            { name: "选项", checked: true },
            { name: "选项", checked: true }
          ],
          radio: 0,
          cate: "dan",
          score: "",
          showItem: false,
          showAdd: false,
          showEdit: true
        });
      } else {
        this.formData.questionList.push({
          title: "标题",
          contentList: [],
          answerList: [],
          itemList: [
            { name: "选项", checked: true },
            { name: "选项", checked: true }
          ],
          radio: 0,
          cate: "duo",
          score: "",
          showItem: false,
          showAdd: false,
          showEdit: true
        });
      }
    },
    editOption(name) {
      if (name === "单选题") {
        this.formData.cate = "dan";
        this.formData.questionList[0].cate = "dan";
      } else {
        this.formData.cate = "duo";
        this.formData.questionList[0].cate = "duo";
      }
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
      this.classification = [];
      this.courseid = "";
      this.serviceid = "";
      this.getList();
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
        this.editLook(item);
      }
      if (type === "look") {
        if (!item.id) {
          this.$message.warning("请选择一条列表数据!");
          return;
        }
        this.btntitle = "预览";
        this.editLook(item);
      }
      this.dialogFormVisible = true;
    },
    editLook(item) {
      item.classification = [item.serviceid, item.courseid];
      const list = [];
      let showEdit;
      if (item.cate === "dan") {
        item.contentList.forEach(item1 => {
          list.push({ name: item1, checked: true });
        });
        item.itemList = list;
        item.radio = item.answerList.join(",") * 1;
      } else {
        item.contentList.forEach((item1, index1) => {
          const checked = item.answerList.some(item2 => {
            return index1 === item2;
          });
          list.push({ name: item1, checked: checked });
          item.itemList = list;
        });
        item.radio = 0;
      }
      if (this.btntitle === "修改") {
        showEdit = true;
      }
      if (this.btntitle === "预览") {
        showEdit = false;
      }
      item.questionList = [
        {
          title: item.title,
          contentList: item.contentList,
          answerList: item.answerList,
          itemList: item.itemList,
          radio: item.radio,
          cate: item.cate,
          score: item.score,
          showItem: false,
          showAdd: false,
          showEdit: showEdit
        }
      ];
      this.formData = JSON.parse(JSON.stringify(item));
    },
    getList(parm = {}) {
      this.loading = true;
      const list = ["A.", "B.", "C.", "D.", "E.", "F.", "G."];
      fetch({
        url: `/${this.$cms}/usercenter/aflcdriverlearningquestion/v1/list?pageNum=${this.page}&pageSize=${this.pagesize}`,
        method: "post",
        data: parm
      })
        .then(res => {
          if (res.status === 200) {
            res.data.list.forEach(item => {
              const contentList1 = [];
              const answerList1 = [];
              item.contentList.forEach((item1, index1) => {
                contentList1.push(list[index1] + item1);
                item.answerList.forEach(item2 => {
                  if (index1 === item2) {
                    answerList1.push(list[index1] + item1);
                  }
                });
              });
              item.contentList1 = contentList1;
              item.answerList1 = answerList1;
            });
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
            url: `/${this.$cms}/usercenter/aflcdriverlearningquestion/v1/delete?id=${item.id}`,
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
        // 题目分类
        classification: [],
        courseid: "", // 课程分类
        serviceid: "", // 服务分类
        questionList: [
          {
            title: "标题",
            contentList: [],
            answerList: [],
            itemList: [
              { name: "选项", checked: true },
              { name: "选项", checked: true }
            ],
            radio: 0,
            cate: "dan",
            score: "",
            showItem: false,
            showAdd: false,
            showEdit: true
          }
        ]
      };
      this.$refs["formData"].resetFields();
    },
    checkLength(rule, value, callback, name) {
      if (value === "") {
        callback(new Error(name));
      } else {
        if (value.length < 5 || value.length > 50) {
          callback(new Error(name));
        } else {
          callback();
        }
      }
    },
    checkLength2(rule, value, callback, name, list, i) {
      if (value === "") {
        callback(new Error(name));
      } else {
        if (value.length < 2 || value.length > 50) {
          callback(new Error(name));
        } else {
          callback();
        }
      }
    },
    upItem(list, index1, item) {
      const name = list.itemList[list.radio].name;
      if (index1 !== 0) {
        list.itemList.splice(index1, 1);
        list.itemList.splice(index1 - 1, 0, item);
      }
      this.$nextTick(() => {
        list.itemList.forEach((item, index) => {
          if (item.name === name) {
            list.radio = index;
          }
        });
      });
    },
    downItem(list, index1, item) {
      const name = list.itemList[list.radio].name;
      if (index1 !== list.length - 1) {
        list.itemList.splice(index1, 1);
        list.itemList.splice(index1 + 1, 0, item);
      }
      this.$nextTick(() => {
        list.itemList.forEach((item, index) => {
          if (item.name === name) {
            list.radio = index;
          }
        });
      });
    },
    addItem(list) {
      if (list.length < 7) {
        list.push({ name: "选项", checked: false });
      }
    },
    removeItem(list, i) {
      if (list.cate === "dan") {
        list.itemList.splice(i, 1);
        if (list.radio === i) {
          list.radio = 0;
        }
      } else {
        list.itemList.splice(i, 1);
      }
    },
    // 编辑题目
    editClick(item) {
      item.showEdit = !item.showEdit;
    },
    // 删除题目
    delClick(index) {
      this.$confirm("此操作将删除此项的数据, 是否确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.formData.questionList.splice(index, 1);
        })
        .catch(() => {});
    },
    // 题目上移
    upClick(list, index, item) {
      if (index !== 0) {
        list.splice(index, 1);
        list.splice(index - 1, 0, item);
      }
    },
    // 题目下称
    downClick(list, index, item) {
      if (index !== list.length - 1) {
        list.splice(index, 1);
        list.splice(index + 1, 0, item);
      }
    },
    checkNember(rule, value, callback, name) {
      const re = /^[1-9][0-9]*$/g;
      if (value === "") {
        callback(new Error(name));
      } else {
        if (re.test(value)) {
          callback();
        } else {
          callback(new Error(name));
        }
      }
    },
    checkCheckBox(rule, value, callback, name, list) {
      let i = 0;
      list.forEach(item => {
        if (item.checked === true) {
          i++;
        }
      });
      if (i < 2) {
        callback(new Error(name));
      } else {
        callback();
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 2) {
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
            `${this.tableData[i].serviceidName} - ${this.tableData[i].courseid}` ===
            `${this.tableData[i - 1].serviceidName} - ${
              this.tableData[i - 1].courseid
            }`
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
    },
    enter(i) {
      this.formData.questionList[i].showItem = true;
    },
    leave(i) {
      this.formData.questionList[i].showItem = false;
    }
  }
};
</script>

<style type="text/css" lang="scss" scoped>
.margin_10 {
  margin: 10px;
}
.margin_l_10 {
  margin-left: 10px;
}
.margin_b_10 {
  margin-bottom: 10px;
}
.padding_b_10 {
  padding-bottom: 10px;
}
.el_row {
  margin-bottom: 10px;
}
.flex_a {
  display: flex;
  align-items: center;
}
.h {
  height: 40px;
}
.icon_size {
  font-size: 20px;
  margin: 0 5px;
}
.flex_f {
  display: flex;
  flex-direction: column;
}
.flex_sb {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.subject_item {
  border-bottom: 1px solid #999999;
  padding: 10px;
}
.f_r {
  color: red;
}
</style>
<style>
.my-form-item {
  margin-bottom: 0 !important;
}
</style>
