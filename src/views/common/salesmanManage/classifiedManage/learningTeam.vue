<template>
  <el-dialog title="可见分组设置" :visible="LearningGroupId > 0" width="60%" :before-close="handleClose">
    <el-table
      ref="multipleTable"
      :data="tableData"
      stripe
      border
      tooltip-effect="dark"
      height="600"
      v-loading="loading"
       @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" ></el-table-column>
      <el-table-column sortable prop="groupName" label="组名"></el-table-column>
      <el-table-column prop="remarks"  sortable label="描述" show-overflow-tooltip></el-table-column>
    </el-table>
    <div style="text-align:center; margin-top:20px">
      <el-button type="primary" size="mini" plain icon="el-icon-success" @click="sure">确定</el-button>
      <el-button type="primary" size="mini" plain icon="el-icon-error" @click="handleClose">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import fetch from "@/utils/fetch";
export default {
  name: "learningTeam",
  props: {
    LearningGroupId: {
      default: '-1',
      type: String
    }
  },
  data() {
    return {
      tableData: [], //渲染数据
      groupList: [], // 提交的id数组
      loading: true
    };
  },
  methods: {
    //   被选中的数据
    handleSelectionChange(row) {
        this.groupList = row
    },
    // 提交数据
    sure() {
      const params = {
          id: this.LearningGroupId,
          groupList: this.groupList
      }
      fetch({ url: `/${this.$cms}/usercenter/aflcsalesmanlearningcase/v1/saveGroups`, method: 'post', data: params }).then((res) => {
              if (res.status === 200) {
                this.$message.success('提交成功')
                this.$parent.LearningGroupId = '-1'
                this.$emit('changge',true)
              } else {
                this.$message.warning(res.errorInfo)
              }
            }).catch((err) => {
              this.$message.warning(err.errorInfo)
            })
    },
    //   关闭弹窗
    handleClose() {
      this.$parent.LearningGroupId = '-1';
    },
    //   获取数据
    query() {
      const self = this;
      self.loading = true;
      fetch({
        url: `/${self.$cms}/usercenter/aflcsalesmanlearningcase/v1/findGroups/${
          self.LearningGroupId
        }`,
        method: "get"
      })
        .then(res => {
          self.loading = false;
          if (res.status === 200) {
            self.tableData = res.data;
            setTimeout(() => {
                self.tableData.forEach(row => {
                    if ( row.checked ) {
                        self.$refs.multipleTable.toggleRowSelection(row);
                    }
                });
            },500)
          } else {
            self.$message.warning(res.errorInfo);
          }
        })
        .catch(err => {
          self.loading = false;
          self.$message.warning(err.errorInfo);
        });
    }
  },
  created() {
    this.query();
  }
};
</script>