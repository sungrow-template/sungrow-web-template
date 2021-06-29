<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <div class="title">登录</div>
      </div>
      <el-form-item :class="{ 'border-white': loginForm.user_account }" prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
            v-model="loginForm.user_account"
            placeholder="Account"
            name="username"
            type="text"
            auto-complete="on"
        />
      </el-form-item>

      <el-form-item :class="{ 'border-white': loginForm.user_password }" prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
            :type="passwordType"
            v-model="loginForm.user_password"
            placeholder="Password"
            name="password"
            auto-complete="on"
            @keyup.enter.native="handleLogin(false)" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open' " />
        </span>
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;margin:20px 0 50px 0;" @click.native.prevent="handleLogin(false)">登录</el-button>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        loginForm: {
          user_account: '',
          user_password: ''
        },
        siteVal: NaN,
        passwordType: 'password',
        loading: false,
        redirect: undefined
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
          this.$store.commit('SET_REDIRECT', this.redirect)
        },
        immediate: true
      }
    },
    methods: {
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = 'text'
        } else {
          this.passwordType = 'password'
        }
      },
      handleLogin() {
        if (this.validate()) {
          this.loading = true
        }
      },
      validate() {
        if (!this.loginForm.user_account) {
          this.$message('请输入用户名')
          return false
        } else if (!this.loginForm.user_password) {
          this.$message('请输入密码')
          return false
        } else {
          return true
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg: #283443;
  $light_gray:#eee;
  $cursor: #fff;
  $black: #222222;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input{
      color: $cursor;
      &::first-line {
        color: $black; /* light_gray */
      }
    }
  }
  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0;
        -webkit-appearance: none;
        border-radius: 0;
        padding: 12px 5px 12px 15px;
        color: $black;
        height: 47px;
        caret-color: $black;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px $cursor inset !important;
          -webkit-text-fill-color: $black !important;
        }
      }
    }
    .el-form-item {
      transition: all 0.5s;
      border-bottom: 1px solid #909399;
      background: $cursor;
      /* background: rgba(0, 0, 0, 0.1); */
      color: $black;
    }
    .border-white{
      border-bottom: 1px solid #222222;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;
  $black: #222222;
  $orange: #FF7100;

  .login-container {
    height: 100%;
    width: 100%;
    background: url('../../assets/images/bg.jpg');
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-form {
      z-index: 10;
      width: 520px;
      max-width: 100%;
      background-color: white;
      /* background-color: $bg; */
      // background: linear-gradient(230deg, rgba(53, 57, 74, 0) 0%, rgb(0, 0, 0) 100%);
      padding: 35px;
      box-shadow: 0 0 26px 0 rgba(0,0,0,.10);
    }
    .lastTip{
      font-size: 12px;
      color: $black;
      display: flex;
      justify-content: space-between;
      cursor: default;
      .noCode{
        cursor: pointer;
        text-decoration: underline;

      }
    }
    .tips {
      font-size: 14px;
      color: $black;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .title-container {
      position: relative;
      .title {
        font-size: 22px;
        color: $black;
        cursor: default;
        margin: 0 auto 40px auto;
        text-align: center;
      }
      .set-language {
        color: $black;
        position: absolute;
        top: 5px;
        right: 0;
      }
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .thirdparty-button {
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
    .particleBack{
      position: absolute;
      display: block;
      top: 0;
      left: 0;
      z-index: 1;
    }

    .server-site {
      width:100%;
      text-align: left;
    }
  }
</style>
<style lang="scss">
  .server-item {
    .el-form-item__content {
      display: flex;
    }
    .el-input {
      width: 100%;
    }
  }
</style>
