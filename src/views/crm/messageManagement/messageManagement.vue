<template>
  <div v-loading="loading" class="identicalStyle customerReported">
    <el-form
      :inline="true"
      :model="listSystemObj"
      ref="ruleForm"
      class="demo-ruleForm classify_searchinfo"
    >
      <el-form-item label="时间">
        <el-date-picker
          v-model="listSystemObj.chooseTime"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          unlink-panels
          align="right"
          :default-time="['00:00:00', '23:59:59']"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="关键词">
        <el-input v-model="listSystemObj.content" clearable maxlength="20"></el-input>
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
      <div class="btns_box">
        <el-button
          type="primary"
          icon="el-icon-circle-plus"
          plain
          @click="handleSearch('processed')"
          :size="btnsize"
        >处理</el-button>
      </div>
      <div class="info_news">
        <el-table
          ref="multipleTable"
          style="width: 100%"
          stripe
          border
          align="center"
          height="100%"
          :data="tableData"
          tooltip-effect="dark"
          @selection-change="getSelection"
          @row-click="clickDetails"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" label="序号" width="60"></el-table-column>

          <el-table-column label="标题" prop="title" width="200">
          </el-table-column>
          <el-table-column label="内容"  prop="content"></el-table-column>
          <el-table-column label="推送时间" width="150" prop="createTime"></el-table-column>
          <el-table-column label="处理状态" width="100">
              <template slot-scope="scope">
                {{scope.row.processStatus == 1 ? '已处理' : '未处理'}}
              </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 页码 -->
    <div class="info_tab_footer">
      共计:{{ dataTotal }}
      <div class="show_pager">
        <Pager :total="dataTotal" @change="handlePageChange" ref="pager" />
      </div>
    </div>

     <el-dialog
      class="StyleNewinfoComponent commoncss"
      width="40%"
      title="确认将打卡状态标记为已打卡"
      :visible.sync="innerFormData.isShow"
    >
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入备注"
        v-model="innerFormData.remark">
        </el-input>


      <div slot="footer" class="dialog-footer">
        <el-button icon="el-icon-success" type="primary" @click="innerClick('sure')">确 认</el-button>
        <el-button icon="el-icon-error" @click="innerClick('close')">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pager from "@/components/Pagination/index";
import {
  visitFailList,
  updateVisitFail
} from "@/api/crm/messageManagement/messageManagement.js";
import { param } from '@/utils/index.js'

export default {
  name: "messageManagement",
  props: {
    isvisible: {
      type: String,
      default: "all"
    }
  },
  components: {
    Pager
  },
  data() {
    return {
      loading: false, // 加载
      btnsize: "mini", //显示大小
      listSystemObj: {
        //查询提交数据
        processStatus: "all", // pending:待处理|success:已关联|fail:已拒绝|all:全部
        content: "", //关键词
        chooseTime: null // 选择的时间
      },
      dataTotal: 0, //查询总数
      tableData: [], //渲染数据
      pageNum: 1,
      pageSize: 20,
      saveDate:null, //被选中的数据
    //   弹窗数据
      innerFormData: {
          isShow: false, //是否显示弹窗
          remark: '', //备注
      }
    };
  },
  mounted() {
    this.firstblood();
  },
  methods: {
      // 获取被选中的数据
    getSelection(item) {
      this.saveDate = item
    },
    // 点击行选中与取消
    clickDetails(item) {
      this.$refs.multipleTable.toggleRowSelection(item);
    },
    // 修改页码
    handlePageChange(obj) {
      this.pageNum = obj.pageNum;
      this.pageSize = obj.pageSize;
      this.firstblood();
    },
    // 刷新页面
    firstblood() {
      const self = this;
      self.loading = true;
      const url = param({
          pageNum: self.pageNum,
          pageSize: self.pageSize
      })
      const params = {
            "processStatus": self.isvisible === 'all' ? null : self.isvisible === 'noProcessed' ? 0 : 1,
            "content": self.listSystemObj.content,
            "startTime": self.listSystemObj.chooseTime && self.listSystemObj.chooseTime.length > 1 ? self.listSystemObj.chooseTime[0] : '',
            "endTime": self.listSystemObj.chooseTime && self.listSystemObj.chooseTime.length > 1 ? self.listSystemObj.chooseTime[1] : ''
        }
      //查询客户上报列表
      visitFailList(url,params)
        .then(res => {
          if (res.status === 200) {
            self.tableData = res.data.list;
            self.dataTotal = res.data.total;
            self.loading = false;
          } else {
            self.loading = false;
          }
        })
        .catch(err => {
          self.loading = false;
        });
    },
    // 弹窗按钮
    innerClick(type) {
        const self = this;
        switch (type) {
            case 'sure':
                // 确认处理打卡
                updateVisitFail({
                    "id": self.saveDate[0].id,
                    "taskDetailId": self.saveDate[0].taskDetailId,
                    "remark": self.innerFormData.remark
                })
                    .then(res => {
                    if (res.status === 200) {
                        self.$message.success('处理成功')
                        self.innerFormData = {
                            isShow: false, //是否显示弹窗
                            remark: '', //备注
                        }
                        self.firstblood()
                    } else {
                       self.$message.error(res.errorInfo)
                    }
                    })
                    .catch(err => {
                        self.$message.error(err.errorInfo)
                    });
                break;
            default:
                // close取消
                self.innerFormData = {
                    isShow: false, //是否显示弹窗
                    remark: '', //备注
                }
        }
    },
    // 点击搜索还是清空
    handleSearch(type) {
        switch (type) {
            case 'clear':
                // 清除
                this.listSystemObj = {
                        //查询提交数据
                        processStatus: "all", // pending:待处理|success:已关联|fail:已拒绝|all:全部
                        content: "", //关键词
                        chooseTime: null // 选择的时间
                    }
                    this.$refs.pager.pageNum = 1
                    this.pageNum = 1
                this.firstblood();
                break;
            case 'search':
                // 搜索
                this.$refs.pager.pageNum = 1
                this.pageNum = 1
                this.firstblood();
                break;
            default:
                // processed处理
                if ( this.saveDate && this.saveDate.length === 1 ) {
                    if ( this.saveDate[0].processStatus == 1) {
                        this.$message.info('该数据已处理')
                    } else {
                        this.innerFormData.isShow = true
                    }
                    
                } else if ( !this.saveDate || this.saveDate.length === 0 ) {
                this.$message.info('请先选择您要操作的任务')
                } else {
                this.$message.info('每次只能操作单条数据~')
                this.$refs.multipleTable.clearSelection();
                }           
            }
    }
  }
};
</script>

<style scoped lang="scss">
.customerReported {
  height: 100%;
}
</style>
