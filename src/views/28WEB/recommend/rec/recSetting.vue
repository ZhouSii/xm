<template>
  <div class="commoncss lll-recsetting">
    <el-dialog title="推荐位设置" :close-on-click-modal="false" :visible="isVisibleDialog" @close="close"
               v-loading="loading" width="40%">
      <el-form :model="form" :rules="newrules" ref="ruleForm" class="clearfix" label-width="100px">
        <div class="message-left clearfix">
          <el-form-item label="推荐栏目:" prop='recommendColumn'>
            <el-input v-model="form.recommendColumn" clearable :maxlength="25" disabled></el-input>
          </el-form-item>
          <el-form-item label="推荐位置:" prop='recommendPosition'>
            <el-input v-model="form.recommendPosition" clearable :maxlength="25" disabled></el-input>
          </el-form-item>
        </div>
        <div class="message-bottom clearfix">
          <el-form-item label=" 自定义属性:" prop='limitStr'>
            <!--推荐限制类型(0 - 不限制 1-限制)-->
            <el-checkbox v-model="checked">推荐条数限制</el-checkbox>

            <p style="color: red;font-size: 12px;line-height: 20px" v-if="checked===true">
              超过{{form.recommendLimit===null||form.recommendLimit===''?'0':form.recommendLimit}}则不展示更多推荐（必填）</p>
            <!--<template slot="append">超过×则不展示更多推荐（必填）</template>-->
            <el-input placeholder="请输入推荐条数" v-model="form.recommendLimit" :maxlength="5" v-number-only v-if="checked===true">
              <template slot="prepend">超出</template>
              <template slot="append">条，超出的推荐则不生效</template>
            </el-input>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input type="textarea" :rows="2" placeholder="请输入备注信息" v-model="form.recommendRemarks" :maxlength="100">
            </el-input>

          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" plain @click="submitForm('ruleForm')">确定</el-button>
        <el-button type="primary" plain @click="close">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getRecDetial, putRecDetial} from '@/api/web/recFetch'
  import {objectMerge2, parseTime} from '@/utils/'

  export default {
    name: "rec-setting",
    props: {
      isVisibleDialog: {
        type: Boolean,
        default: false
      },
      info: {
        type: [Array, Object],
        default: () => {
        }
      },
    },
    watch: {
      isVisibleDialog: {
        handler(n) {
          if (this.$refs['ruleForm']) {
            this.$refs['ruleForm'].resetFields()
          }
          this.fetchInfo(this.info.id)
        }
      },
      info: {
        handler(n) {
        },
        immediate: true
      },
    },
    data() {
      return {
        loading: false,
        form: {
          recommendColumn: '',
          recommendPosition: '',
          recommendLimitType: '',
          recommendLimit: '',
          recommendRemarks: '',

        },
        checked: true,
        newrules: {},
        getRecDetialId: ''
      }
    },
    mounted() {
    },
    methods: {
      fetchInfo(id) {
        this.loading = true
        return getRecDetial(id).then(res => {
          this.comWatch(res.data)
          if (res.data.recommendLimitType === 1) {
            this.checked = true
          } else {
            this.checked = false
          }
          this.loading = false
        }).catch(err => {
          this.$message.warning(err.text ? err.text : err.errorInfo)
          // this.$message.warning(err.text || err.errorInfo || '无法获取服务端数据~')
          this.loading = false;
        })
      },
      comWatch(item) {
        this.form = {
          recommendColumn: item.recommendColumn,
          recommendPosition: item.recommendPosition,
          recommendLimitType: item.recommendLimitType,
          recommendLimit: item.recommendLimit,
          recommendRemarks: item.recommendRemarks,
        }
      },
      submitForm() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.loading = true
            if (this.checked === true) {
              this.form.recommendLimitType = 1
              this.senFetch()
            } else {
              this.form.recommendLimitType = 0
              // this.form.recommendLimit === ''
              let data
              data = objectMerge2(this.form)
              data.recommendLimit=''
              console.log(data,'data');
              putRecDetial(this.info.id, data).then(res => {
                this.$emit('success')
                this.$message.success('保存成功')
                this.close()
                // this.loading = false
              })

            }
          } else {
            return false
          }
        })
      },
      senFetch() {
        if (this.form.recommendLimit === '' || this.form.recommendLimit === null) {
          this.$message.info('请输入推荐限制数')
          this.loading = false
          return false
        } else {
          let data
          data = objectMerge2(this.form)
          putRecDetial(this.info.id, data).then(res => {
            this.$emit('success')
            this.$message.success('保存成功')
            this.close()
            // this.loading = false
          }).catch(err => {
            this.$message.warning(err.text ? err.text : err.errorInfo)
            // this.$message.warning(err.text || err.errorInfo || '无法获取服务端数据~')
            this.loading = false;
          })
        }

      },
      reset() {
        this.$refs['ruleForm'].resetFields()
        // this.form = {}
      },
      close(done) {
        this.reset()
        this.$emit('update:isVisibleDialog', false);
        this.$emit('close');
        // this.btnShow = false;
        if (typeof done === 'function') {
          done()
        }
      }
    }
  }
</script>

<style lang="scss">
  .lll-recsetting {
    .el-dialog__wrapper {
      .el-dialog {

      }
      .el-dialog__header {

      }
      .el-dialog__body {
        .el-form {
          .message-left {
            .el-form-item {
              display: inline-block;
            }
          }
          .message-bottom {
            .el-input-group {
              width: 83%;
              .el-input-group__append, .el-input-group__prepend {
                background-color: #fff;
              }
              .el-input__inner {

              }
            }
            .el-textarea__inner {
              width: 83%;
              color: #3e9ff1;
            }
          }
        }
      }

    }
    .el-dialog__footer {

    }
  }
</style>
