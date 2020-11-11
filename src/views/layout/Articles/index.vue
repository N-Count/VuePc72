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
      <template v-slot:header>根据筛选条件查询到281822条数据,当前是第1页：</template>

      <!-- 内容 -->
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
        prop="date"
        label="封面"
        width="180">
        </el-table-column>
        <el-table-column
        prop="name"
        label="标题"
        width="180">
        </el-table-column>
        <el-table-column
        prop="address"
        label="状态">
        </el-table-column>
        <el-table-column
        prop="date"
        label="发布时间"
        width="180">
        </el-table-column>
        <el-table-column
        prop="date"
        label="操作"
        width="180">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Articles',
  data () {
    return {
      form: {
        resource: '',
        region: '',
        date: ''

      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>
<style scope lang="">

</style>
