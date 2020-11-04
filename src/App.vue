<template>
  <div id="app">
<el-row>
  <el-button round>圆角按钮</el-button>
  <el-button type="primary" round>主要按钮</el-button>
  <el-button type="success" round>成功按钮</el-button>
  <el-button type="info" round>信息按钮</el-button>
  <el-button type="warning" round>警告按钮</el-button>
  <el-button type="danger" round>危险按钮</el-button>
</el-row>
    <router-view/>
  </div>
</template>

<script>
import request from './utils/request.js'
export default {
  created () {
    // axios的基本使用：axios（{url：‘’，methos：‘’}）
    //  axios.baseURL:''
    request().then().catch()
  }
}
</script>
