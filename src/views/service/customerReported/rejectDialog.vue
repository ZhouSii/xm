<template>
      <div class="customerReportedDialog commoncss StyleNewinfoComponent" v-loading="loading" >
    <el-dialog
      :visible="!!recordid"
      :modal-append-to-body="false"
      :modal="false"
      top="30vh"
      title="拒绝关联"
      :close-on-click-modal="false"
      :before-close="handleClose"
      ref="dialog"
      width="30%"
    >
      <el-row style="margin-bottom:22px;">
            <el-radio v-model="radio" label="1" style="margin-bottom:10px;">拒绝关联</el-radio>
            <el-input
                type="textarea"
                placeholder="请输入原因"
                v-model="processmemo"
                maxlength="50"
                show-word-limit
                :rows="4"
                >
            </el-input>
      </el-row>
      <el-row style="margin-bottom:22px;">
            <p class="aflcBusinessBtn">
              <el-button type="primary" plain icon="el-icon-success" @click="reject">确 定</el-button>
              <el-button type="primary" plain icon="el-icon-error" @click="handleClose">取 消</el-button>
            </p>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import fetch from "@/utils/fetch";
export default {
    name: 'reject',
    props: {
        recordid: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            loading: false, // 加载
            radio: '1',
            processmemo: '', //拒绝理由
        }
    },
    methods: {
        handleClose() {
            this.$parent.recordid = ''
        },
        reject() {
            this.loading = true;
            const params = {
                "recordid": this.recordid,
                "processmemo": this.processmemo
            }
            fetch({
            url: `/${this.$cms}/usercenter/aflcsalesmanperformancesubmit/v1/refuse`,
            method: "post",
            data: params
            })
            .then(res => {
            if (res.status === 200) {
                this.loading = false;
                this.$parent.recordid = ''
                this.$parent.firstblood()
                console.log(res,'4545454454545454')
                 this.$message({
                    message: '提交成功~',
                    type: 'success'
                })
            } else {
                this.loading = false;
                this.$parent.recordid = ''
            }
            })
            .catch(err => {
            this.loading = false;
            this.$parent.recordid = ''
            });
        }
    }
    
}
</script>