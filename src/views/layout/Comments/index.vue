<template>
<div class="comments">
<el-card>
    <template v-slot:header>
<hm-breadcrumb>评论管理</hm-breadcrumb>
    </template>
    <el-table :data="comments" border v-loading='loading'>
<el-table-column label="序号" type="index" width="100" :index="indexMethod"  align='center'></el-table-column>
<el-table-column label="文章标题" prop="title"  align='center'></el-table-column>
<el-table-column label="总评论数" prop="total_comment_count"  align='center'></el-table-column>
<el-table-column label="粉丝评论数" prop="fans_comment_count"  align='center'></el-table-column>
<el-table-column label="评论状态"  align='center'>
    <template v-slot='{ row }' >
<el-tag v-if="row.comment_status" type="success">正常</el-tag>
<el-tag v-else type="danger" >关闭</el-tag>
    </template>
</el-table-column>
<el-table-column label="操作" align='center'>
    <template  v-slot='{ row }'>
<el-button v-if="row.comment_status" type="danger" @click="updateComment(row, false)">关闭评论</el-button>
<el-button  v-else type="primary" @click="updateComment(row, true)">打开评论</el-button>
        </template>
</el-table-column>
    </el-table>
    <el-pagination
    background
    @current-change='handleCurrentChange'
    :total="total"
    :current-page="page"
    :page-size="per_page"
    layout="total,prev,pager,next,jumper"
    >
    </el-pagination>
</el-card>
</div>
</template>

<script>
import { getArticleList, updateCommentStatus } from '@/Api/article'
export default {
  name: 'Comments',
  data () {
    return {
      comments: [],
      total: 0,
      page: 1,
      per_page: 10
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    async getComments () {
      this.loading = true
      const res = await getArticleList({
        page: this.page,
        per_page: this.per_page,
        response_type: 'comment'
      })
      console.log(res)
      this.comments = res.data.data.results
      this.total = res.data.data.total_count
      this.loading = false
    },
    indexMethod (index) {
      return index + 1 + (this.page - 1) * this.per_page
    },
    handleCurrentChange (val) {
      this.page = val
      this.getComments()
    },
    async updateComment (row, status) {
      try {
        const res = await updateCommentStatus(row.id.toString(), status)
        this.$message.success('修改成功！')
        console.log(res)
        row.comment_status = status
      } catch (error) {
        this.$message.error('服务器繁忙，请稍后再试！')
      }
    }
  }
}
</script>

<style>

</style>
