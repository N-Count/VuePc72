<template>

<div class="login-container">
   <el-form ref="form" :model="form" class="login-form-wrap" :rules='rules'>
       <div class="login-head">
    <div class="logo"></div>
       </div>
  <el-form-item prop='mobile'>
    <el-input v-model="form.mobile" placeholder="请输入手机号" ></el-input>
  </el-form-item>
 <el-form-item prop='code'>
    <el-input v-model="form.code" placeholder="请输入验证码" ></el-input>
  </el-form-item>
  <el-form-item >
      <el-checkbox label="我已阅读并同意用户协议和隐私条款" ></el-checkbox>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit" class="login-btn">登录 </el-button>
  </el-form-item>
 </el-form>

</div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        mobile: '',
        code: ''
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: ['blur', 'change'] },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: ['blur', 'change'] },
          { pattern: /^\d{6}$/, message: '请输入完整的验证码', trigger: ['blur', 'change'] }
        ],
        agree: [
          {}
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }

}
</script>

<style lang="less">
// 铺满整屏
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  background: url("~@/assets/login_bg.jpg") no-repeat;
  background-size: cover;
  .login-form-wrap {
    width: 300px;
    min-width: 200px;
    padding: 30px 50px 10px;
    background-color: #fff;
    .login-head {
      display: flex;
      justify-content: center;
      .logo {
        width: 200px;
        height: 57px;
        background: url("~@/assets/logo_index.png") no-repeat;
        background-size: contain;
      }
    }
      .login-btn {
        width: 100%;
      }
  }
}
</style>
