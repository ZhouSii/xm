<template>
  
  <div class="login-container">
    <div class="container-top">
      <div class="login-top-wrapper clearfix">
        <!-- <img class="logo-img" src="../../assets/login_images/login_03.png" alt=""> -->
      </div>
    </div>
    <div class="login-wrapper clearfix">
      <div class="container-left">
        <img src="../../assets/login_images/left.png" alt="">
      </div>
      <div class="container-right">
        <!--  <div class="logo">
          <img  class="logo-img" src="../../assets/login_images/logo.png" alt="">
        </div> -->
        <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
          <h3 class="title">会员登录</h3>
          <!--<div v-if="errInfo">-->
          <!--<span>{{errInfo}}</span>-->
          <!--</div>--> 
          <!-- <el-form-item prop="accNum"> -->
          <!--<span class="svg-container svg-container_login">-->
          <!--<icon-svg icon-class="yonghuming" />-->
          <!--</span>-->
          <!-- <el-input name="accNum" type="text" v-model="loginForm.accNum" autoComplete="off" :placeholder="holder.accNum" @focus='accNum()'   clearable >
          <template slot="prepend">公司ID</template>
         </el-input>
        </el-form-item> -->
          <el-form-item prop="username">
            <el-input name="username" type="text" @keyup.enter.native="handleLogin" v-model="loginForm.username" autoComplete="off" :placeholder="holder.username" @focus='username()' clearable>
              <template slot="prepend"><i class="icon_login " :class="[loginError? 'icon_login_user_error':'icon_login_user']"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" class="previewPwd">
            <el-input name="password" :maxlength="20" :type="!isview? 'password' : 'text'" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="off" :placeholder="holder.password" @focus='password()' clearable onpaste="return false" oncontextmenu="return false" oncopy="return false" oncut="return false">
              <template slot="prepend">
                <i class="icon_login" :class="[loginError? 'icon_login_password_error':'icon_login_password']"></i>
                <!-- 两种写法都可以 -->
                <i @click="isview = !isview" :class="{ 'icon_zy': isview , 'icon_by':!isview}"></i>
                <!-- <i @click="isview = !isview" :class="[isview ? 'icon_by':'icon_zy']"></i> -->
              </template>
            </el-input>
          </el-form-item>
          <div class="login">
            <el-button class="el-but" type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
              登录
            </el-button>
          </div>
          <div class="rember">
            <el-checkbox v-model="checked">记住密码</el-checkbox>
            <!-- <p class="rember-tit" @click="forgetPsw">忘记密码</p> -->
          </div>
        </el-form>
      </div>

    <!-- </div>
    <div class="login-wrapper clearfix"> -->
      <div class="button-cont">
        <ul>
          <li>广州安发网络科技有限公司</li>
          <li>地址：天河区天河路石牌桥丰兴广场B座1804</li>
          <li>电话 ：020-38856254 </li>
          <li>网址：www.anfanet.com </li>
          <li class="hoverLink"><a href="http://www.miitbeian.gov.cn">粤ICP备16061301号-5</a></li>
        </ul>
        <!-- <div class="down">
          <img src="../../assets/login_images/code.png" alt="">
          <p>扫描二维码下载app</p>
        </div> -->
      </div>
    </div>
    <setApiUrl />
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import setApiUrl from '@/components/changeApiUrl/index'
export default {
  name: 'login',
  components: {
    setApiUrl
  },
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!isvalidUsername(value)) {
    //     callback(new Error('请输入正确的公司ID'))
    //   } else {
    //     callback()
    //   }
    // }
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else if (!value.length) {
        callback(new Error('请输入6位数字密码'))
      } else {
        callback()
      }
    }
    return {
      loginError: false,
      isview: false,
      holder: {
        accNum: '公司ID',
        username: '账号',
        password: '密码'
      },
      loading: false,
      checked: false,
      errInfo: false,
      //模拟登陆信息
      loginForm: {
        accNum: '4',
        username: '',
        password: ''
      },
    //   loginForm: {
    //     accNum: '',
    //     username: '',
    //     password: ''
    //   },
      loginRules: {
        accNum: [{ required: true, trigger: 'blur' }],
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      }
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        // console.log(valid)
        if (valid) {
            this.loading = true
            const data = Object.assign({}, this.loginForm);
            data.username = data.username + '|' + 'aflc-7';
            data.password = this.$md5(data.password);
            this.$store.dispatch('Login', data).then(() => {
            // if (!this.loginForm.accNum) {
            //   this.errInfo = true
            //   this.errInfo = '该公司Id不存在'
            // } else if (!this.loginForm.username) {
            //   this.errInfo = true
            //   this.errInfo = '该用户名不存在'
            // } else if (!this.loginForm.password) {
            //   this.errInfo = true
            //   this.errInfo = '输入的密码错误'
            // }
            this.loading = false
            // 获取登录前的页面地址
            // 有可能会出现前一个页面是现在登录账号没有权限访问的？
            // const nexturl = this.$route.query.tourl
            // this.$router.push({ path: nexturl && nexturl.indexOf('/login') === -1 ? nexturl : '/' })
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loginError = true;
            this.$message({
              message: '您的账号或者密码有误~',
              type: 'warning'
            })
            this.loading = false;
          })
        } else {
          this.loginError = true
          console.log('error submit!!')
          return false
        }
      })
    },
    forgetPsw() {
      // this.$router.push({ path: '/' })
      // console.log(5555)
    },
    accNum() {
      this.holder = ''
    },
    username() {
      this.holder = ''
    },
    password() {
      this.holder = ''
    },
    YJicon() {
      this.isview = !this.isview
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "../../styles/mixin.scss";
  @import "../../styles/login-index.css";
.hoverLink:hover{
  border-bottom: 1px solid #eee;
}

</style>
