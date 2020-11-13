<template>
  <div class="articles">
    <!-- 卡片组件 -->
    <el-card>
      <div slot="header">
        <!-- 路径导航（面包屑导航） -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
         <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
         <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
        <!-- 内容 -->
   <el-form :model="form" label-width="80px">
   <el-form-item label="状态">
    <el-radio-group v-model="form.status">
      <el-radio label="">全部</el-radio>
      <el-radio label="0">草稿</el-radio>
      <el-radio label="1">待审核</el-radio>
      <el-radio label="2">审核通过</el-radio>
      <el-radio label="3">审核失败</el-radio>
      <el-radio label="4">已删除</el-radio>
    </el-radio-group>
    </el-form-item>

    <el-form-item label="频道">
    <el-select v-model="form.channel_id" placeholder="选择频道" clearable>
      <el-option
      :label="item.name"
      :value="item.id"
      v-for="item in channels"
      :key="item.id"
      ></el-option>
    </el-select>
      </el-form-item>
    <el-form-item label="日期">
    <el-date-picker
      v-model="form.date"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="yyyy-MM-dd">
    </el-date-picker>
    </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query" :loading="loading">查询</el-button>
      </el-form-item>
      </el-form>
    </el-card>

<!-- 下表格 -->
    <el-card
      style="margin-top: 40px;"
      v-loading="loading"
      element-loading-text="拼命加载中...">
      <!-- 表头 -->
      <template v-slot:header>根据筛选条件查询到{{total}}条数据,当前是第{{page}}页：</template>

      <!-- 内容 -->
      <el-table :data="articles">
        <el-table-column prop="cover" label="封面">
          <template v-slot='{row}'>
            <el-image
            :src="row.cover.images[0]"
            fit='cover'
            style="width: 180px; height: 100px"
            >
            <template v-slot:error>
             <img src="@/assets/error.gif"
            style="width: 180px; height: 100px" alt="">
            </template>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template v-slot="{ row }">
            <el-tag v-if="row.status===0">草稿</el-tag>
            <el-tag type="info" v-if="row.status===1">待审核</el-tag>
            <el-tag type="success" v-if="row.status===2">审核通过</el-tag>
            <el-tag type="warning" v-if="row.status===3">审核失败</el-tag>
            <el-tag type="danger" v-if="row.status===4">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column prop="id" label="操作">
          <template slot-scope="scope">
              <el-button @click="edit(scope.row)" type="primary" icon="el-icon-edit"  size="small" circle></el-button>
           <el-button type="danger" icon="el-icon-delete"  size="small" circle @click="del(scope.row.id,scope.row.status)"></el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination
       background
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @current-change='handleCrrentChange'
      @size-change='handleSizeChange'
      >
        </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticleList, getChannelList, delArticle } from '@/Api/article'
export default {
  name: 'Articles',
  data () {
    return {
      form: {
        status: '',
        channel_id: '',
        date: ''
      },
      // 存放文章列表
      articles: [],
      channels: [],
      // 存放文章总数
      total: 0,
      page: 1,
      per_page: 10,
      loading: false

    }
  },
  created () {
    this.getArticles()
    this.getChannelList()
  },
  methods: {
    async getChannelList () {
      const res = await getChannelList()
      this.channels = res.data.data.channels
    },
    async getArticles () {
      this.loading = true
      try {
        // 结构赋值，因为在筛选条件时是日期范围，所以后台返回的日期数据是一个数组，
        // 注：axios会默认忽略值为null和undefined的属性
        const [begin, end] = this.form.date || []
        const res = await getArticleList({
          // 每页显示多少条数据
          per_page: this.per_page,
          // 当前页数
          page: this.page,
          begin_pubdate: begin,
          end_pubdate: end,
          status: this.form.status || null,
          channel_id: this.form.channel_id || null
        })
        this.articles = res.data.data.results
        this.total = res.data.data.total_count
      } catch {
        this.$message.error('服务器繁忙，请稍后再试')
      }
      this.loading = false
    },
    edit (row) {
    },
    handleCrrentChange (value) {
      this.page = value
      this.getArticles()
    },
    handleSizeChange (size) {
      this.per_page = size
      this.page = 1
      this.getArticles()
    },
    query () {
      this.page = 1
      this.getArticles()
    },
    async del (id, status) {
      if (status === 2) {
        return this.$message.warning('审核通过的文章不允许删除')
      }
      try {
        await this.$confirm('你确定要删除该文章吗?', '温馨提示', {
          type: 'warning'
        })
      } catch {
        return this.$message.info('取消操作')
      }
      console.log('需要发送请求')
      try {
        await delArticle(id.toString())
        this.$message.success('删除成功')
        this.getArticles()
      } catch {
        this.$message.error('删除失败')
      }
    }
  }
}
</script>
<style scope lang="">

</style>
