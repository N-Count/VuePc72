<template>
<div class="comments">
<el-card>
    <template v-slot:header>
<hm-breadcrumb>评论管理</hm-breadcrumb>
    </template>
    <el-table :data="comments">
<el-table-column label="序号"></el-table-column>
<el-table-column label="文章标题" prop="title"></el-table-column>
<el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
<el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
<el-table-column label="评论状态" >
    <template v-slot='{ row }'>
<el-tag v-if="row.comment_status" type="success">正常</el-tag>
<el-tag v-else type="danger">关闭</el-tag>
    </template>
</el-table-column>
<el-table-column label="操作" >
    <template  v-slot='{ row }'>
<el-button v-if="row.comment_status" type="danger"  >关闭评论</el-button>
<el-button  v-else type="primary">打开评论</el-button>
        </template>
</el-table-column>

    </el-table>
</el-card>
</div>
</template>

<script>
import { getArticleList } from '@/Api/article'
export default {
  name: 'Comments',
  data () {
    return {
      comments: []
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    async getComments () {
      const res = await getArticleList({
        page: 1,
        per_page: 10,
        response_type: 'comment'
      })
      console.log(res)
      this.comments = res.data.data.results
    }
  }
}
</script>

<style>

</style>
