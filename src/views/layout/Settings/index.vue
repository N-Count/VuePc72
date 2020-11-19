<template>
<div class="settings">
    <el-card>
            <template v-slot:header>
                <Hm-breadcrumb>个人设置</Hm-breadcrumb>
        </template>
        <el-row >
            <el-col :span="12" >
                <el-form label-width="100px" :rules="rules" :model="user" ref="user">
                    <el-form-item label='编号:'>{{ user.id}}</el-form-item>
                    <el-form-item label='手机:'>{{ user.mobile }}</el-form-item>
                    <el-form-item label='用户名:' prop="name">
                        <el-input v-model="user.name" ></el-input>
                    </el-form-item>
                    <el-form-item label='用户简介:' prop="intro" >
                        <el-input v-model="user.intro" type="textarea" :rows="3"></el-input>
                    </el-form-item>
                    <el-form-item label='用户邮箱:' prop="email">
                        <el-input v-model="user.email" type="email"></el-input>
                    </el-form-item>
                    <el-form-item >
                        <el-button type='primary' @click="update">保存设置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="12">
                <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :http-request="uploadPhoto">
                    <img v-if="user.photo" :src="user.photo"  class="avatar" alt="">
                    <i  v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-col>
        </el-row>
    </el-card>
</div>
</template>

<script>
import { getUserInfo, updateUserInfo, updateUserImage } from '@/Api/user'
export default {
  data () {
    return {
      user: {
        id: '',
        name: '',
        intro: '',
        email: '',
        photo: ''
      },
      rules: {
        name: [
          { required: true, message: '用户名不能为空', trigger: ['blur', 'change'] },
          { min: 3, max: 10, message: '用户名为3-10个字符', trigger: ['blur', 'change'] }
        ],
        intro: [
          { required: true, message: '用户简介不能为空', trigger: ['blur', 'change'] },
          { min: 8, message: '用简介不能低于8个字符', trigger: ['blur', 'change'] }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: ['blur', 'change'] },
          {
            pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,4}$/,
            message: '请输入正确的邮箱格式',
            trigger: ['blur', 'change']
          }
        ]
      }

    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    async getInfo () {
      const res = await getUserInfo()
      this.user = res.data.data
    },
    async update () {
      try {
        await this.$refs.user.validate()
      } catch {
        return this.$message.error('请填写符合格式的个人信息！')
      }
      console.log('校验成功')
      await updateUserInfo(this.user)
      this.$message.success('修改成功')
      //   把user中的name发布到事件总线中
      this.$bus.$emit('updataInfo', this.user.name, this.user.photo)
    },
    async uploadPhoto (config) {
      const fd = new FormData()
      fd.append('photo', config.file)
      const res = await updateUserImage(fd)
      console.log(res)
      this.user.photo = res.data.data.photo
    }
  }

}
</script>

<style>

</style>
