<template>
  <el-dialog title="学习分组管理" :visible="showLearningGroup" width="70%" :before-close="handleClose">
    <div class="btns_box clearfix">
        <el-button type="primary" size="mini" plain icon="el-icon-circle-plus" @click="handleClick('add')" >新增分组</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      stripe
      border
      height="300"
      tooltip-effect="dark"
      style="width: 100%; margin-bottom:30px"
      v-loading ="loading"
    >
      <el-table-column label="序号" width="60">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column sortable prop="groupName" width="200" label="组名"></el-table-column>
      <el-table-column prop="remarks" min-width="200" sortable label="描述" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" width="200" sortable label="创建时间"></el-table-column>
      <el-table-column sortable width="140" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleClick('edit',scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
     <!-- 页码 -->
    <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  ref="pager"/></div> </div>
    <div v-if="innerVisible">
        <salesman-dialog :innerVisible="innerVisible" :formData="formData" v-on:changge="changge"></salesman-dialog>
    </div>
  </el-dialog>
</template>
<script>
import fetch from "@/utils/fetch";
import Pager from '@/components/Pagination/index'
import salesmanDialog from './salesmanDialog'
export default {
  name:'learningGroupManagement',
  props: {
    showLearningGroup: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      tableData: [], //渲染数据
      page: 1, //展示第几页
      pagesize: 20, //每页展示个数
      dataTotal: 0, //数据总数
      innerVisible: false, //是否展示新增弹窗
      formData: {//弹窗数据
          formTitle: '', 
          formRow:{}
      },
      loading: true,
      
    };
  },
  components: {
    Pager, salesmanDialog
  },
  methods: {
    //   关闭弹窗需要更新页面时调用
    changge(data) {
        if ( data ) {
           this.query() 
        }
    },
    //   页码修改
    handlePageChange(obj) {
      this.page = obj.pageNum
      this.pagesize = obj.pageSize
      this.query()
    },
    handleClose(done) {
      this.$parent.showLearningGroup = false
    },
    //   修改培训学习分组
    handleClick(type,row) { 
        this.innerVisible = true  
        if ( type == 'add' ) {
            this.formData.formTitle = '新增业务员培训分组'
        } else {
            this.formData.formTitle = '修改业务员培训分组'
            this.formData.formRow = row
        }
    },
    // 获取培训学习分组
    query() {
      let params = {
        pageNum: this.page,
        pageSize: this.pagesize
      };
      this.loading = true
      fetch({
        url: `/${this.$cms}/usercenter/aflcsalesmanlearninggroup/v1/list`,
        method: "post",
        data: params
      })
        .then(res => {
          this.loading = false
          if (res.status === 200) {
            this.tableData = res.data.list;
            this.dataTotal = res.data.total
          } else {
            this.$message.warning(res.errorInfo);
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.warning(err.errorInfo);
        });
    }
  },
  created() {
      this.query()
  }
};
</script>
