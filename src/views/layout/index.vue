<template>
  <div class="layout-container">
    <el-container>
  <el-aside :width="!isCollapse ? '200px' : '64px'">
    <div class='logo' :class="{minLogo: isCollapse}"></div>
    <div>

     <el-menu
     :default-active="$route.path"
     :router="true"
      class="el-menu-vertical-demo"
      background-color="#002033"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
      :collapse-transition="false">
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/articles">
       <i class="el-icon-document"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
       <el-menu-item index="/pictrues">
       <i class="el-icon-picture"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
       <el-menu-item index="/addArticle">
       <i class="el-icon-s-promotion"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
       <el-menu-item index="/comments">
       <i class="el-icon-chat-dot-round"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
       <el-menu-item index="/fans">
       <i class="el-icon-setting"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
       <el-menu-item index="/settings">
       <i class="el-icon-setting"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
    </div>

  </el-aside>
  <el-container>
    <el-header>
      <div class="left">
    <i :class="!isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'" @click="isCollapse=!isCollapse"></i>
    <span>江苏传智播客科技教育有限公司</span>
  </div>
   <el-dropdown>
    <div class="avatar-wrap">
      <img class="avatar" :src="userInfo.photo" >
      <span>{{userInfo.name}}</span>
      <i class="el-icon-arrow-down el-icon--right"></i>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>设置</el-dropdown-item>
      <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
    </el-dropdown-menu>

  </el-dropdown>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</el-container>
  </div>
</template>

<script>
import { removeToken } from '@/utils/storage'
import { getUserInfo } from '@/Api/user.js'
export default {
  name: 'Layout',
  data () {
    return {
      isCollapse: false,
      userInfo: {}

    }
  },
  async created () {
    const res = await getUserInfo()
    this.userInfo = res.data.data
    // 监听updatename事件
    this.$bus.$on('updataInfo', (name, photo) => {
      this.userInfo.name = name
      this.userInfo.photo = photo
    })
  },
  methods: {
    async logout () {
      try {
        await this.$confirm('是否确认推出账号？', '温馨提示', {
          type: 'warning'
        })
        removeToken()
        this.$router.push('/login')
        this.$message('退出成功！')
      } catch {
        console.log('操作取消')
      }
    }
  }
}
</script>

<style scope lang='less'>
.layout-container {
  width: 100%;
  height: 100%;
  .el-container {
    width: 100%;
    height: 100%;
  }
  .el-aside {
    background-color: #002033;
     .el-menu {
    border-right: none;
  }
  .logo {
    width: 100%;
    height: 60px;
    background: #002244 url(~@/assets/logo_admin.png) no-repeat center;
    background-size: 140px auto;
     &.minLogo{
        background-image: url(~@/assets/logo_admin_01.png);
        background-size: 36px auto;
      }
  }
  }
  .el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .avatar-wrap {
    display: flex;
    align-items: center;
    cursor: pointer;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
  .el-main {
    background-color: #e9eef3;
  }
}

</style>
