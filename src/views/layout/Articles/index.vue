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
    <el-radio-group v-model="form.resource">
      <el-radio label="全部"></el-radio>
      <el-radio label="草稿"></el-radio>
      <el-radio label="待审核"></el-radio>
      <el-radio label="审核通过"></el-radio>
      <el-radio label="审核失败"></el-radio>
      <el-radio label="已删除"></el-radio>
    </el-radio-group>
    </el-form-item>

    <el-form-item label="频道">
    <el-select v-model="form.region" placeholder="选择频道">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
      </el-form-item>
    <el-form-item label="活动时间">
    <el-date-picker
      v-model="form.date"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right">
    </el-date-picker>
    </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      </el-form>
    </el-card>

<!-- 下表格 -->
    <el-card style="margin-top: 40px;">
      <!-- 表头 -->
      <template v-slot:header>根据筛选条件查询到{{total}}条数据,当前是第1页：</template>

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
           <el-button type="danger" icon="el-icon-delete"  size="small" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getArticleList } from '@/Api/article'
export default {
  name: 'Articles',
  data () {
    return {
      form: {
        resource: '',
        region: '',
        date: ''

      },
      // 存放文章列表
      articles: [

      ],
      // 存放文章总数
      total: 0
    }
  },
  async created () {
    const res = await getArticleList({
      per_page: 30
    })
    console.log(res)
    this.articles = res.data.data.results
    this.total = res.data.data.total_count
  },
  methods: {
    edit (row) {
      console.log(row)
    }
  }
}
</script>
<style scope lang="">

</style>
