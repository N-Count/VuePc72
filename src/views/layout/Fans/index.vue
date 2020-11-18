<template>
<div class="fans">
    <el-card>
         <template v-slot:header>
              <Hm-breadcrumb>粉丝管理</Hm-breadcrumb>
        </template>
        <template>
          <el-tabs type='card' v-model="activeName">
            <el-tab-pane name='fans' label="粉丝管理">
              <el-row :gutter="10">
                  <el-col :span="2" v-for="item in fans" :key="item.id.toString()">
                    <div class="item">
                    <el-avatar :size="80" :src="item.photo"></el-avatar>
                    <p>{{item.name}}</p>
                    <el-button type="primary" plain size="small">+关注</el-button>
                    </div>
                  </el-col>
              </el-row>
               <el-pagination
                background
                @current-change='handleCurrentChange'
                :total="total"
                :current-page="page"
                :page-size="per_page"
                layout="total,prev,pager,next,jumper"
                >
               </el-pagination>
            </el-tab-pane>
            <el-tab-pane name='chart' label="粉丝报表">
                <el-row>
               <el-col :span="12">
              <div ref="chart" class="chart">123</div>
            </el-col>
            <el-col :span="12">
              <div ref="chartPie" class="chart"></div>
            </el-col>
             </el-row>
            </el-tab-pane>
          </el-tabs>
        </template>

</el-card>
</div>
</template>

<script>
import { getFansList } from '@/Api/user'
import page from '@/mixins/page'
export default {
  mixins: [page],
  data () {
    return {
      activeName: 'fans',
      fans: [],
      per_page: 24
    }
  },

  methods: {
    async getList () {
      const res = await getFansList({
        page: this.page,
        per_page: this.per_page
      })
      console.log(res)
      const { results, total_count } = res.data.data
      this.fans = results
      this.total = total_count
    }
  }
}
</script>

<style scoped lang='less'>
.el-col {
  margin-bottom: 20px;
  .item {
    width: 100%;
    height: 180px;
    border: 1px dashed #ddd;
    text-align: center;
    padding-top: 10px;
    p {
      margin: 10px 0;
      font-size: 10px;
    }
  }
}
.chart {
  width: 700px;
  height: 400px;
}
</style>
