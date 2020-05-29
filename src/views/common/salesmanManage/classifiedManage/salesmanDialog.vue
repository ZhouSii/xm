<template>
  <div class="salesmanDialog">
    <el-dialog
      width="40%"
      :title="formData.formTitle"
      :visible="innerVisible"
      :before-close="handleClose"
      append-to-body
      center
    >
    <el-form ref="formData" :model="subFormData" label-position="right" label-width="130px">
        <el-form-item label="组名 ：" prop="groupName" :rules="{required: true, message: '请输入组名', trigger: 'change'}">
           <el-input
                placeholder="请输入组名"
                maxlength="25"
                show-word-limit
                style="line-height: 38px"
                v-model="subFormData.groupName">
            </el-input>
        </el-form-item>
        <el-form-item label="描述 ：" prop="remarks" :rules="{required: true, message: '请输入描述', trigger: 'change'}">
           <el-input
                type="textarea"
                placeholder="请输入描述"
                maxlength="50"
                show-word-limit
                style="resize: none"
                v-model="subFormData.remarks">
            </el-input>
        </el-form-item>
        
      </el-form>
      <el-transfer
        class="transfer"
        v-model="userList"
        :props="{
        key: 'userId',
        label: 'label'
        }"
        :titles="['所有业务员', '可见业务员']"
        v-loading="loading"
        :data="list">
    </el-transfer>
    <div style="text-align:center; margin-top:20px">
        <el-button type="primary" size="mini" plain icon="el-icon-success" @click="sure('formData')" >确定</el-button>
        <el-button type="primary" size="mini" plain icon="el-icon-error" @click="handleClose('formData')" >取消</el-button>
    </div>
    </el-dialog>
  </div>
</template>
<script>
import fetch from "@/utils/fetch";
import { aflcBusinessGroupUserList } from "@/api/company/businessGroup";
export default {
  name: "salesmanDialog",
  props: {
    innerVisible: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: {
        formTitle: "",
        formRow: {}
      }
    }
  },
  data() {
    return {
      loading: true, //是否显示loading
      list: [], //所有业务员列表
      userList: [], //已被选择的业务员id
      subFormData: {
        groupName: '', //当前分组
        remarks: '', //提交备注
      }

    };
  },
  methods: {
    // 关闭弹窗
    handleClose() {
      this.$parent.$parent.innerVisible = false;
      this.$parent.$parent.formData = {};
      this.$refs['formData'].resetFields(); 
    },
    // 获取业务员培训分组明细
    getGroupList() {
      if (this.formData.formTitle === "修改业务员培训分组") {
        fetch({
          url: `/${this.$cms}/usercenter/aflcsalesmanlearninggroup/v1/${
            this.formData.formRow.id
          }`,
          method: "get"
        })
          .then(res => {
            if (res.status === 200) {
                this.userList = []
                res.data.userList.forEach(item => {
                    this.userList.push(item.userId)
                })
                this.subFormData.groupName = res.data.groupName
                this.subFormData.remarks = res.data.remarks
            } else {
              this.$message.warning(res.errorInfo);
            }
          })
          .catch(err => {
            this.$message.warning(err.errorInfo);
          });
      }
    },
    // 获取所有业务员
    getSalesman() {
      this.loading = true;
        // 由于获取的是全部，参数写死即可
      aflcBusinessGroupUserList({
        currentPage: 1,
        pageSize: 500,
        vo: { groupCode: "101" },
        groupCode: "101"
      })
        .then(res => {
          this.loading = false;
          this.list = []
          res.data.list.forEach(item => {
                this.list.push({
                    userId: item.userId,
                    label:item.name + ',' + item.mobile
                })
          })
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
    // 获取被选中的业务员
    saveSalesman(all,save) {
        let arr = [];
        save.forEach(item=>{
            all.map(_item=>{
                if(item===_item.userId) {
                    arr.push({
                        userId: item,
                        salesmanName: _item.label.slice(0,_item.label.indexOf(',')),
                        salesmanMobile: _item.label.slice(_item.label.indexOf(',')+1)
                    })
                }
            })
        })
        return arr
        
    },
    // 提交修改
    sure(formName) {
        const isEdit =  this.formData.formTitle === "修改业务员培训分组" ? true : false;
        const params = {
            id: isEdit ? this.formData.formRow.id : undefined,
            groupName: this.subFormData.groupName,
	        remarks: this.subFormData.remarks,
            userList:this.saveSalesman(this.list,this.userList)
        }
        const url = isEdit ? '/usercenter/aflcsalesmanlearninggroup/v1/update' : '/usercenter/aflcsalesmanlearninggroup/v1/add'
        this.$refs[formName].validate((valid) => {
          if (valid) {
            fetch({
                url: `/${this.$cms}${url}`,
                method: "post",
                data:params
            })
            .then(res => {
                if (res.status === 200) {
                    isEdit ? this.$message.success('修改成功') : this.$message.success('新增成功')
                    this.handleClose(formName)
                    this.$emit('changge',true)
                } else {
                    this.$message.warning(res.errorInfo);
                }
            })
            .catch(err => {
                this.$message.warning(err.errorInfo);
            });
          } else {
            return false;
          }
        });
    }
  },
  created() {
    this.getGroupList();
    this.getSalesman();
  }
};
</script>
<style scoped>
.transfer {
    display: flex;
    justify-content: center;
    align-items: center;
}
.transfer /deep/ .el-transfer-panel{
    width: 300px;
}    
</style>
