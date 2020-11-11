<template>
  <div class="not-found">
    抱歉！页面无法访问…… <router-link to="/">返回首页</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style lang="less" scoped>
.not-found {
  width: 100%;
  height: 100%;
  background: url('~@/assets/404.png') center;
  background-size: cover;
}
</style>
