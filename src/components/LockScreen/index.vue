<template>
  <el-dialog class="screenLockPop" title="系统解锁" :visible="lockScreen.opened" :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false">
    <p>当前账号【 {{name}} 】已锁定，请输入密码后解锁</p>
    <br>
    <el-form size="mini" :model="form" status-icon :rules="rules" ref="lockForm">
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
      </el-form-item> 
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" type="primary" :disabled="form.password.trim().length < 4" :loading="loading" @click="submitForm('lockForm')">解锁</el-button>
      <el-button size="mini"  @click="doLogin">重新登录</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { removeToken, getUsername } from '../../utils/auth'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'username',
      'name',
      'company',
      'lockScreen'
    ])
  },
  mounted() {
  },
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      formLabelWidth: '60px',
      rules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          console.log('username',this.username)
          let username = this.username ? (this.username.indexOf('aflc-7') > -1 ? this.username : (this.username + '|' + 'aflc-7')) : (getUsername() + '|' + 'aflc-7');
          this.form.username = username;
            this.form.password = this.$md5(this.form.password);
          this.$store.dispatch('Login', this.form).then(() => {
            this.loading = false
            this.$store.dispatch('UnLockScreen')
            this.form.password = ''
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 后续可以考虑提取到工具类中
    doLogin() {
      removeToken()
      this.$store.dispatch('UnLockScreen')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss">
  .screenLockPop .el-dialog{
    min-width: 300px;
    max-width: 400px;
    p{
      text-align: center;
    }
    .el-dialog__header{
      padding-top: 10px;
      border-bottom: 1px solid #e6e6e6;
    }
    .el-dialog__title{
      font-size: 14px;
      font-weight: bold;
    }
    .el-dialog__footer{
      border-top: 1px solid #b6dfff;
      padding-bottom: 10px;
    }
  }
</style>
