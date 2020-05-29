<template>
    <div class="TwoColumns clearfix" v-loading ="loading">
        <div class="columnsContainer">
            <div class="side_right">
                <div class="side_right_bottom clearfix">
                    <div class="btns_box clearfix">
                        <el-button type="primary" size="mini" plain icon="el-icon-circle-plus" @click="handleClick('add')" v-has:SYSTEM_DRIVER_TEST_MANAGE_COURSE_PAPER_ADD>新增考卷</el-button>
                    </div>
                    <div class="info_news">
                        <el-table :data="tableData" :span-method="objectSpanMethod" stripe border height="100%" tooltip-effect="dark" style="width: 100%">
                            <el-table-column label="序号" width="60">
                                <template slot-scope="scope">
                                    {{ scope.$index + 1 }}
                                </template>
                            </el-table-column>  
                            <el-table-column sortable label="考卷分类">
                              <template slot-scope="scope">
                                <div>{{scope.row.servicename }} - {{scope.row.courseid }}</div>
                              </template>
                            </el-table-column>
                            <el-table-column prop="title" sortable label="考卷名称">
                            </el-table-column>
                            <el-table-column prop="intro" sortable label="考卷说明">
                            </el-table-column>
                            <el-table-column prop="dur" sortable label="考卷完成时间">
                              <template slot-scope="scope">
                                <div>{{scope.row.dur}}分钟</div>
                              </template>
                            </el-table-column>
                          <el-table-column prop="passscore" sortable label="最低通过分数">
                            <template slot-scope="scope">
                              <div>{{scope.row.passscore}}分</div>
                            </template>
                          </el-table-column>
                          <el-table-column prop="standardPrice" sortable label="题目总数/题目总分">
                            <template slot-scope="scope">
                              <div>{{scope.row.totalnum}}/{{scope.row.totalscore}}分</div>
                            </template>
                          </el-table-column>
                          <el-table-column prop="status" sortable label="考卷状态">
                            <template slot-scope="scope">
                              <div v-if="scope.row.status === 'on'">发布</div>
                              <div v-else>下架</div>
                            </template>
                          </el-table-column>
                          <el-table-column prop="standardPrice" sortable width="360" label="操作">
                            <template slot-scope="scope">
                              <el-button type="primary" size="mini" plain @click="handleClick('edit',scope.row)" >修改考卷</el-button>
                              <el-button type="primary" size="mini" plain @click="del(scope.row)">删除考卷</el-button>
                              <el-button type="primary" size="mini" plain @click="handleListQuestion(scope.row.id)">选择题目</el-button>
                              <el-button type="primary" size="mini" plain @click="handlePreview(scope.row)">预览考卷</el-button>
                            </template>
                          </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
        <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  ref="pager"/></div> </div>
      <div class="commoncss">
        <el-dialog :close-on-click-modal="false" v-el-drag-dialog :visible.sync="dialogFormVisible" :title="btntitle" @close="closeClick" width="750px">
          <el-form ref="formData" :model="formData" label-position="right" label-width="130px">
            <el-form-item label="选择考卷分类" prop="classification" :rules="{required: true, message: '选择考卷分类', trigger: 'change'}">
              <el-cascader
                style="width: 50%"
                clearable
                expand-trigger="hover"
                :options="classificationList"
                v-model="formData.classification"
                :props="props"
                @change="handleChange2">
              </el-cascader>
            </el-form-item>
            <el-form-item label="考卷状态" prop="status" :rules="{required: true, message: '选择考卷状态', trigger: 'change'}">
              <el-select style="width: 50%" v-model="formData.status" clearable placeholder="请选择">
                <el-option
                  v-for="(item,index) in courseStatusList"
                  :key="index"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="考试完成时间" prop="dur" :rules="{required: true, validator: (rule, value, callback)=>{
          return checkNember(rule, value, callback,'请输入最少1位最多3位数字整数')
          }, trigger: 'blur'}">
              <el-input v-model="formData.dur" maxlength="3" clearable placeholder="请输入最少1位最多3位数字整数"></el-input>
            </el-form-item>
            <el-form-item label="最低通过分数" prop="passscore" :rules="{required: true, validator: (rule, value, callback)=>{
          return checkNember(rule, value, callback,'请输入最少1位最多2位数字整数')
          }, trigger: 'blur'}">
              <el-input v-model="formData.passscore" maxlength="2" clearable placeholder="请输入最少1位最多2位数字整数"></el-input>
            </el-form-item>
            <el-form-item label="考卷名称" prop="title" :rules="{required: true, validator: (rule, value, callback)=>{
          return checkLength(rule, value, callback,'请输入最少5个字最多15个字考卷名称')
          }, trigger: 'blur'}">
              <el-input v-model="formData.title" minlength="5" maxlength="15" clearable placeholder="请输入最少5个字最多15个字考卷名称"></el-input>
            </el-form-item>
            <el-form-item label="考卷说明" prop="intro" :rules="{required: true, validator: (rule, value, callback)=>{
          return checkLength(rule, value, callback,'请输入最少5个字最多100个字考卷说明')
          }, trigger: 'blur'}">
              <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入最少5个字最多100个字考卷说明"
              minlength="5"
              maxlength="100"
              v-model="formData.intro"
              clearable>
              </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" plain  icon="el-icon-success" @click="submit()">确 定</el-button>
            <el-button @click="close()" type="primary" plain icon="el-icon-error">关 闭</el-button>
          </div>
        </el-dialog>
        <el-dialog :close-on-click-modal="false" v-el-drag-dialog :visible.sync="dialogFormVisible1" title="选择题目" @close="closeClickListQuestion" width="1200px">
          <el-row justify="center" type="flex" class="preview_top">
            <h2>车主考试题目列表</h2>
          </el-row>
            <el-form>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="题目名称 ：">
                    <el-input style="width: 280px;" size="mini" v-model="titleName" clearable placeholder="题目名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="">
                    <el-button type="primary" @click="searchListQuestion()" >查询</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          <el-row class="preview_top">
            <el-button type="primary" plain  icon="el-icon-success" @click="submitListQuestion()" >确定</el-button>
            <el-button type="primary" plain icon="el-icon-error" @click="clearListQuestion()">取消</el-button>
          </el-row>

          <el-table ref="multipleTable" @selection-change="handleSelectionChange" :data="tableDataListQuestion" stripe border tooltip-effect="dark" style="width: 100%">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column sortable label="题目分类">
              <template slot-scope="scope">
                <div>{{scope.row.servicename }} - {{scope.row.courseid }}</div>
              </template>
            </el-table-column>
            <el-table-column sortable label="题目类型">
              <template slot-scope="scope">
                <div v-if="scope.row.cate === 'duo'">多选题</div>
                <div v-else>单选题</div>
              </template>
            </el-table-column>
            <el-table-column prop="title" sortable label="题目名称">
            </el-table-column>
            <el-table-column sortable label="题目可选答案">
              <template slot-scope="scope">
                <div v-for="(item,index) in scope.row.contentList1" :key="index">
                  <div>{{item}}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column sortable label="题目答案">
              <template slot-scope="scope">
                <div v-for="(item,index) in scope.row.answerList1" :key="index">
                  <div>{{item}}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="score" sortable label="题目得分">
            </el-table-column>
            <el-table-column prop="updatetime" sortable label="题目创建时间">
            </el-table-column>
          </el-table>
          <div slot="footer" style="height: 80px" class="dialog-footer">
            <el-button @click="dialogFormVisible1 = false" type="primary">关 闭</el-button>
          </div>
          <div class="info_tab_footer">共计:{{ dataTotalListQuestion }} <div class="show_pager"> <Pager :total="dataTotalListQuestion" @change="handlePageChangeListQuestion"  ref="pager"/></div> </div>
        </el-dialog>
        <el-dialog :close-on-click-modal="false" v-el-drag-dialog :visible.sync="dialogFormVisible2" title="预览考卷" @close="closeClickPreview" width="750px">
          <el-row justify="center" type="flex" class="preview_top">
            <h2>考卷名称:{{name}}</h2>
          </el-row>
          <el-row justify="center" type="flex">
            <p><span v-if="previewData.dan">单选题:{{previewData.dan.count}}题</span> <span v-if="previewData.duo">多选题:{{previewData.duo.count}}题</span> <span v-if="previewData.totalScore">共{{previewData.totalScore}}分</span></p>
          </el-row>
          <div class="preview_divide"></div>
          <el-row v-if="previewData.dan">
            <h2>单选题(共{{previewData.dan.count}}题,{{previewData.dan.totalScore}}分)</h2>
            <div class="preview_item" v-for="(item,index) in previewData.dan.questionList" :key="index">
              <div>{{index + 1}}.{{item.title}}({{item.score}}分)</div>
              <div class="preview_item"  v-for="(item1,index1) in item.contentList1" :key="index1">
                <div>{{item1}}</div>
              </div>
              <div class="preview_item_bottom">答案:<span v-for="(item1,index1) in item.answerList1" :key="index1">{{item1}}&nbsp;&nbsp;&nbsp;</span> </div>
            </div>
          </el-row>
          <el-row v-if="previewData.duo">
            <h2>多选题(共{{previewData.duo.count}}题,{{previewData.duo.totalScore}}分)</h2>
            <div class="preview_item" v-for="(item,index) in previewData.duo.questionList" :key="index">
              <div>{{index + 1}}.{{item.title}}({{item.score}}分)</div>
              <div class="preview_item" v-for="(item1,index1) in item.contentList1" :key="index1">
                <div>{{item1}}</div>
              </div>
              <div class="preview_item_bottom">答案:<span v-for="(item1,index1) in item.answerList1" :key="index1">{{item1}}&nbsp;&nbsp;&nbsp;</span> </div>
            </div>
          </el-row>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false" type="primary">关 闭</el-button>
          </div>
        </el-dialog>
      </div>

    </div>
</template>

<script type="text/javascript">
import fetch from '@/utils/fetch'
import Pager from '@/components/Pagination/index'
import upload from '@/components/Upload/singleImage'
export default{
  data() {
    return {
      loading: false,
      dialogAreaPrice: false,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      formLabelWidth: '140px',
      btntitle: '',
      name: '',
      classificationList: [],
      courseStatusList: [{ code: 'on', name: '发布' }, { code: 'off', name: '下架' }],
      formData: {
        classification: [], // 选择考卷分类
        courseid: '', // 课程分类
        serviceid: '', // 服务分类
        status: '', // 考卷状态
        dur: '', // 考试完成时间
        passscore: '', // 最低通过分数
        title: '', // 考卷名称
        intro: '' // 考卷说明
      },
      page: 1,
      pagesize: 20,
      dataTotal: 0,
      tableData: [],
      tableDataListQuestion: [],
      pageListQuestion: 1,
      pagesizeListQuestion: 20,
      dataTotalListQuestion: 0,
      multipleSelection: [],
      previewData: {},
      titles: '',
      titleName: '',
      testpaperid: '',
      props: {
        label: 'name',
        value: 'code',
        children: 'children'
      },
      Arr: [],
      Pos: 0
    }
  },
  components: {
    Pager, upload
  },
  created() {
    fetch({ url: `/${this.$cms}/usercenter/aflcdriverlearningcourse/v1/listCourseCateMenu`, method: 'post', data: {}}).then((res) => {
      if (res.status === 200) {
        this.classificationList = res.data
      }
    }).catch(err => {
      this.$message({
        type: 'info',
        message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
      })
    })
    this.getList()
  },
  mounted() {},

  methods: {
    submit() {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          if (this.btntitle === '新增') {
            fetch({ url: `/${this.$cms}/usercenter/aflcdriverlearningtestpaper/v1/add`, method: 'post', data: this.formData }).then((res) => {
              if (res.status === 200) {
                this.$message.success('新增成功')
                this.getList()
                this.dialogFormVisible = false
              } else {
                this.$message.warning(res.text)
              }
            }).catch((err) => {
              this.$message.warning(err.text)
            })
          } else {
            fetch({ url: `/${this.$cms}/usercenter/aflcdriverlearningtestpaper/v1/update`, method: 'post', data: this.formData }).then((res) => {
              if (res.status === 200) {
                this.$message.success('修改成功')
                this.getList()
                this.dialogFormVisible = false
              } else {
                this.$message.warning(res.text)
              }
            }).catch((err) => {
              this.$message.warning(err.text)
            })
          }
        } else {
          return false
        }
      })
    },
    close() {
      this.dialogFormVisible = false
    },
    del(item) {
      this.$confirm('此操作将删除选择的数据, 是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        fetch({ url: `/${this.$cms}/usercenter/aflcdriverlearningtestpaper/v1/delete`, method: 'post', data: { id: item.id }}).then((res) => {
          if (res.status === 200) {
            this.$message.success('删除成功')
            this.getList()
            this.loading = false
          }
        }).catch(err => {
          this.$message({
            type: 'info',
            message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
          })
          this.loading = false
        })
      })
    },
    closeClick() {
      this.formData = {
        classification: [], // 选择考卷分类
        courseid: '', // 课程分类
        serviceid: '', // 服务分类
        status: '', // 考卷状态
        dur: '', // 考试完成时间
        passscore: '', // 最低通过分数
        title: '', // 考卷名称
        intro: '' // 考卷说明
      }
      this.$refs['formData'].resetFields()
    },
    closeClickListQuestion() {
      this.titleName = ''
      this.testpaperid = ''
      this.$refs.multipleTable.clearSelection()
    },
    closeClickPreview() {
      this.previewData = {}
      this.name = ''
    },
    handleChange2(value) {
      this.formData.serviceid = value[0]
      this.formData.courseid = value[1]
    },
    handlePageChange(obj) {
      this.page = obj.pageNum
      this.pagesize = obj.pageSize
      this.getList()
    },
    handlePageChangeListQuestion(obj) {
      this.pageListQuestion = obj.pageNum
      this.pagesizeListQuestion = obj.pageSize
      this.getListQuestion()
    },
    handleClick(type, item) {
      if (type === 'add') {
        this.btntitle = '新增'
      }
      if (type === 'edit') {
        this.btntitle = '修改'
        item.classification = [item.serviceid, item.courseid]
        this.formData = JSON.parse(JSON.stringify(item))
      }
      this.dialogFormVisible = true
    },
    checkLength(rule, value, callback, name) {
      if (value === '') {
        callback(new Error(name))
      } else {
        if (value.length < 5 || value.length > 25) {
          callback(new Error(name))
        } else {
          callback()
        }
      }
    },
    checkNember(rule, value, callback, name) {
      const re = /^[1-9][0-9]*$/g
      if (value === '') {
        callback(new Error(name))
      } else {
        if (re.test(value)) {
          callback()
        } else {
          callback(new Error(name))
        }
      }
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    searchListQuestion() {
      this.pageListQuestion = 1
      this.getListQuestion()
    },
    submitListQuestion() {
      this.tableDataListQuestion.forEach((item) => {
        this.$set(item, 'checked', false)
        this.multipleSelection.forEach((item1) => {
          if (item.id === item1.id) {
            this.$set(item, 'checked', true)
          }
        })
      })
      const addIdList = []
      const deleteIdList = []
      this.tableDataListQuestion.forEach((item) => {
        if (item.checked) {
          addIdList.push(item.id)
        }
        if (!item.checked) {
          deleteIdList.push(item.id)
        }
      })
      const parm = {
        testpaperid: this.testpaperid,
        addIdList: addIdList,
        deleteIdList: deleteIdList
      }
      fetch({ url: `/${this.$cms}/usercenter/aflcdriverlearningtestpaper/v1/updateQuestion`, method: 'post', data: parm }).then((res) => {
        if (res.status === 200) {
          this.$message.success('添加成功')
          this.getList()
        } else {
          this.$message.warning(res.text)
        }
      }).catch((err) => {
        this.$message.warning(err.text)
      })
    },
    clearListQuestion() {
      this.$refs.multipleTable.clearSelection()
    },
    getListQuestion() {
      this.loading = true
      const parm = {
        title: this.titleName,
        testpaperid: this.testpaperid
      }
      const list = ['A.', 'B.', 'C.', 'D.', 'E.', 'F.', 'G.']
      fetch({ url: `/${this.$cms}/usercenter/aflcdriverlearningtestpaper/v1/listQuestion?pageNum=${this.pageListQuestion}&pageSize=${this.pagesizeListQuestion}`, method: 'post', data: parm }).then((res) => {
        if (res.status === 200) {
          res.data.list.forEach((item) => {
            const contentList1 = []
            const answerList1 = []
            item.contentList.forEach((item1, index1) => {
              contentList1.push(list[index1] + item1)
              item.answerList.forEach((item2) => {
                if (index1 === item2) {
                  answerList1.push(list[index1] + item1)
                }
              })
            })
            item.contentList1 = contentList1
            item.answerList1 = answerList1
          })
          this.tableDataListQuestion = res.data.list
          this.dataTotalListQuestion = res.data.total
          this.$nextTick(() => {
            this.tableDataListQuestion.forEach(item => {
              if (item.checked) {
                this.$refs.multipleTable.toggleRowSelection(item)
              }
            })
          })
          this.loading = false
        }
      }).catch(err => {
        this.$message({
          type: 'info',
          message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
        })
        this.loading = false
      })
    },
    handleListQuestion(id) {
      this.dialogFormVisible1 = true
      this.testpaperid = id
      this.getListQuestion(this.testpaperid)
    },
    handlePreview(item) {
      this.dialogFormVisible2 = true
      this.loading = true
      this.name = `${item.servicename} - ${item.courseid} - ${item.title}`
      const list = ['A.', 'B.', 'C.', 'D.', 'E.', 'F.', 'G.']
      fetch({ url: `/${this.$cms}/usercenter/aflcdriverlearningtestpaper/v1/previewTestpaper?id=${item.id}`, method: 'post', data: {}}).then((res) => {
        if (res.status === 200) {
          if (res.data.dan) {
            res.data.dan.questionList.forEach((item) => {
              const contentList1 = []
              const answerList1 = []
              item.contentList.forEach((item1, index1) => {
                contentList1.push(list[index1] + item1)
                item.answerList.forEach((item2) => {
                  if (index1 === item2) {
                    answerList1.push(list[index1] + item1)
                  }
                })
              })
              item.contentList1 = contentList1
              item.answerList1 = answerList1
            })
          }
          if (res.data.duo) {
            res.data.duo.questionList.forEach((item) => {
              const contentList1 = []
              const answerList1 = []
              item.contentList.forEach((item1, index1) => {
                contentList1.push(list[index1] + item1)
                item.answerList.forEach((item2) => {
                  if (index1 === item2) {
                    answerList1.push(list[index1] + item1)
                  }
                })
              })
              item.contentList1 = contentList1
              item.answerList1 = answerList1
            })
          }
          this.previewData = res.data
          this.loading = false
        }
      }).catch(err => {
        this.$message({
          type: 'info',
          message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
        })
        this.loading = false
      })
    },
    getList(parm = {}) {
      this.loading = true
      fetch({ url: `/${this.$cms}/usercenter/aflcdriverlearningtestpaper/v1/list?pageNum=${this.page}&pageSize=${this.pagesize}`, method: 'post', data: parm }).then((res) => {
        if (res.status === 200) {
          this.tableData = res.data.list
          this.dataTotal = res.data.total
          this.loading = false
          this.merage()
        }
      }).catch(err => {
        this.$message({
          type: 'info',
          message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
        })
        this.loading = false
      })
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        const _row_1 = this.Arr[rowIndex]
        const _col_1 = _row_1 > 0 ? 1 : 0
        return { rowspan: _row_1, colspan: _col_1 }
      }
    },
    merage() {
      this.merageInit()
      for (let i = 0; i < this.tableData.length; i++) {
        if (i === 0) {
          this.Arr.push(1)
          this.Pos = 0
        } else {
          if (`${this.tableData[i].serviceidName} - ${this.tableData[i].courseid}` === `${this.tableData[i - 1].serviceidName} - ${this.tableData[i - 1].courseid}`) {
            this.Arr[this.Pos] += 1
            this.Arr.push(0)
          } else {
            this.Arr.push(1)
            this.Pos = i
          }
        }
      }
    },

    merageInit() {
      this.Arr = []
      this.Pos = 0
    }
  }
}
</script>

<style type="text/css" lang="scss" scoped>
  .preview_top{
    margin-bottom: 10px;
  }
  .preview_divide{
    width: 100%;
    border-bottom: 1px solid #cccccc;
    margin: 10px 0;
  }
  .preview_item{
    margin: 10px;
  }
  .preview_item_bottom{
    color: blue;
    font-size: 16px;
  }
</style>
