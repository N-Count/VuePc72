<template>
<div class="AddArticle">
    <el-card>
      <template v-slot:header>
       <Hm-breadcrumb>发布文章</Hm-breadcrumb>
      </template>
      <el-form :model="form" label-width="80px" :rules="rules" ref="form">
          <el-form-item label="标题" prop="title">
            <el-input placeholder="请输入标题" v-model="form.title"> </el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <el-input placeholder="请输入文章内容" v-model="form.content" type="textarea" :rows="10"> </el-input>
          </el-form-item>
            <el-form-item label="封面">
                <el-radio-group v-model="form.cover.type">
                    <el-radio :label="1">单图</el-radio>
                    <el-radio :label="3">三图</el-radio>
                    <el-radio :label="0">无图</el-radio>
                    <el-radio :label="-1">自动</el-radio>
                </el-radio-group>
          </el-form-item>
          <el-form-item label="频道" prop="channel_id" >
           <el-select v-model="form.channel_id" placeholder="请选择频道" clearable>
             <el-option
            :label="item.name"
            v-for="item in channels"
            :key='item.id'
            :value='item.id'></el-option>
           </el-select>
          </el-form-item>
          <el-form-item>
             <el-button type="primary" @click="add(false)">发表</el-button>
          <el-button @click="add(true)">存入草稿</el-button>
          </el-form-item>
      </el-form>
    </el-card>
</div>
</template>
<script>
import { getChannelList, addArticle } from '@/Api/article'
export default {
  name: 'AddArticles',
  data () {
    return {
      form: {
        title: '',
        content: '',
        cover: {
          type: 0,
          image: []
        },
        channel_id: ''
      },
      rules: {
        title: [
          { required: true, message: '文章标题不能为空', trigger: ['blur', 'change'] },
          { min: 5, max: 20, message: '文章标题为5-20个字符', trigger: ['blur', 'change'] }
        ],
        content: [
          { required: true, message: '文章内容不能为空', trigger: ['blur', 'change'] },
          { min: 20, message: '文章内容不能低于20个字符', trigger: ['blur', 'change'] }
        ],
        channel_id: [
          { required: true, message: '请选择频道！', trigger: ['blur', 'change'] }
        ]

      },
      channels: []
    }
  },
  created () {
    this.getChannels()
  },
  methods: {
    async getChannels () {
      const res = await getChannelList()
      this.channels = res.data.data.channels
      console.log(res)
    },
    async add (draft) {
      // 对整体表单进行校验
      try {
        await this.$refs.form.validate()
      } catch {
        return
      }
      console.log('校验成功了发送请求了')
      const res = await addArticle(draft, this.form)
      console.log(res)
      this.$message.success('发表文章成功')
      this.$router.push('/articles')
    }
  }
}
</script>
<style scoped lang="less">

</style>
