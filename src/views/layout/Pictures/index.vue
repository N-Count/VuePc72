<template>
    <div class="pictures">
      <el-card>
        <template v-slot:header>
              <Hm-breadcrumb>素材管理</Hm-breadcrumb>
        </template>
        <div>
          <el-radio-group v-model="radio">
            <el-radio-button label="1">全部</el-radio-button>
            <el-radio-button label="2">收藏</el-radio-button>
          </el-radio-group>
          <el-button type="success" style="float:right;">上传素材</el-button>
        </div>
        <el-row :gutter="10">
            <el-col :span="4" v-for="item in 12" :key="item.id">
           <el-image
            style="height: 180px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="cover">
            </el-image>
            <div class="option">
              <span class="el-icon-star-off" :class="{collect: item.is_collected}" @click="update(item)"></span>
              <span class="el-icon-delete"></span>
            </div>
           </el-col>
        </el-row>
        <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="per_page"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      </el-card>
    </div>
</template>
<script>
import { reqPictures } from '@/Api/pictures'
export default {
  name: 'Pictrues',
  data () {
    return {
      radio: '1',
      pictures: [],
      page: 1,
      per_page: 12,
      total: 0
    }
  },
  created () {
    this.getPictures()
  },
  methods: {
    async getPictures () {
      const res = await reqPictures({
        page: 1,
        per_page: 12
      })
      this.pictures = res.data.data.results
    },
    update () {
      console.log('变色')
    }
  }
}
</script>
<style scoped lang="less">
.pictures {

  .el-row {
    margin-top: 20px;
    .el-col {
      margin-top: 8px;
      position: relative;
      padding: 0;
      box-sizing: border-box;
      text-align: center;
      .option {
        position: absolute;
        left: 5px;
        right: 5px;
        bottom: 5px;
        height: 30px;
        line-height: 30px;
        background: rgba(0, 0, 0, 0.3);
        text-align: center;
        color: #fff;
        span {
          width: 50%;
          cursor: pointer;
        }
        .active {
          color: red;
        }
      }
    }
  }
  .collect {
  color: red;
}
}

</style>
