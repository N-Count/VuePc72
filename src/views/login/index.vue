<template>
  <div class="login-container">
    <!--
        el-form>el-form-item>各类表单元素,比如el-input
        model属性=>el-form的数据源 对象
        label-width 宽度
        v-model="form.?" 表单元素双绑数据
     -->
    <el-form ref="form" :model="form" :rules="rules" class="login-form-wrap ">
      <!-- logo -->
      <div class="login-head">
        <div class="logo"></div>
      </div>
      <el-form-item prop="mobile">
        <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>

      <el-form-item prop="code">
        <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
      </el-form-item>

      <el-form-item prop="agree">
        <el-checkbox
          v-model="form.agree"
          label="我已阅读并同意用户协议和隐私条款"
        ></el-checkbox>
      </el-form-item>

      <el-form-item>
        <el-button class="login-btn" type="primary" @click="onSubmit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { postLogin } from '@/Api/user'
import { setToken } from '@/utils/storage'

export default {
  name: 'Login',
  data () {
    // 自定义验证规则的方法
    // 1. 看形参
    // 1.1 看是否有默认形参(使用函数式,没有手动传入)
    // 1.2 看是否可以自己传递实参
    // 2. 看return
    // 2.1  看有没有
    // 2.2  看类型(数据类型, 返回值是函数)=> 影响该函数的使用时的接收者

    /*
    const fn = ()=>{
      return ()=>{}
    }

    const res = fn()
    res()
    */

    // value: 表单元素的值,这里是bool
    // cb: 回调函数
    const validatePass = (rule, value, callback) => {
      // console.log(
      //   { rule },
      //   { value },
      //   { callback })

      if (!value) {
        callback(new Error('请勾选同意'))
      } else {
        // 内存溢出->递归
        // cb触发validate的方法
        callback()
      }
    }

    return {
      form: {
        mobile: '13911111111',
        code: '246810',
        agree: false
      },
      rules: {
        mobile: [
          // { required: true, message: '请输入手机号', trigger: ['blur', 'change'] },
          // trigger:规定触发的时机=> 2重状态 =>容器保存=>数组 or 对象
          // { min: 3, max: 5, message: '请输入正确的手机格式', trigger: ['blur', 'change'] }

          {
            required: true,
            message: '请输入手机号',
            trigger: ['blur', 'change']
          },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '请输入正确的手机号',
            trigger: ['blur', 'change']
          }
        ],
        code: [
          {
            required: true,
            message: '请输入验证码',
            trigger: ['blur', 'change']
          },
          {
            pattern: /^\d{6}$/,
            message: '请输入正确的验证码',
            trigger: ['blur', 'change']
          }
        ],
        agree: [{ validator: validatePass, trigger: ['blur', 'change'] }]
      }
    }
  },
  methods: {
    async onSubmit () {
      try {
        await this.$refs.form.validate()
      } catch (error) {
        return console.log('error submit!!')
      }
      try {
        const res = await postLogin(this.form.mobile, this.form.code)
        // res的返回结果为：res.data.data.token
        setToken(res.data.data.token)
        console.log(res)
        this.$message.success('登录成功')
        this.$router.push('/')
      } catch (error) {
        this.$message.error('登录失败')
      }
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("~@/assets/login_bg.jpg") no-repeat;
  background-size: cover;
  .login-form-wrap {
    width: 300px;
    min-width: 300px;
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
