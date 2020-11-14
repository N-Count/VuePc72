<template>
    <div class="pictures">
      <el-card>
        <template v-slot:header>
              <Hm-breadcrumb>素材管理</Hm-breadcrumb>
        </template>
        <div>
          <el-radio-group v-model="collect" @change="change">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <el-button type="success" style="float:right;" @click="dialogVisible = true">上传素材</el-button>
        </div>
        <el-row :gutter="10" v-loading="loading">
            <el-col :span="4" v-for="item in pictures" :key="item.id">
           <el-image
            style="height: 180px"
            :src="item.url"
            fit="cover">
            </el-image>
            <div class="option" v-if="!collect">
              <span class="el-icon-star-off" :class="{active: item.is_collected}" @click="update(item)"></span>
              <span class="el-icon-delete" @click='del(item.id)'></span>
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
<!-- 上传框 -->
       <el-dialog
      title="上传素材"
      :visible.sync="dialogVisible"
      width="30%">
      <!--
        el-upload 上传组件
        action： 上传图片的地址  注意：必须要提供完整的地址，，，因为element上传图片不走axios
        headers: 因为我们的接口上传图片需要传token，，但是element不走axios
        name="image" 指定上传的图片的名字
        show-file-list: 是否显示上传的文件列表
        on-success： 上传成功的回调
        before-upload： 选完图片，上传图片之前的回调
       -->
       <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="headers"
        name="image"
        :show-file-list="false"
        :on-success="onSuccess"
        :before-upload="beforeUpload"
      >
        <img class="avatar" v-if="imgUrl" :src="imgUrl" alt="">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
       </el-dialog>
    </div>
</template>
<script>
import { getPictureList, updatePicture, delPicture } from '@/Api/pictures'
import { getToken } from '@/utils/storage'
export default {
  name: 'Pictrues',
  data () {
    return {
      collect: false,
      pictures: [],
      page: 1,
      per_page: 12,
      total: 0,
      loading: false,
      dialogVisible: false,
      imgUrl: '',
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    }
  },
  created () {
    this.getPictures()
  },
  methods: {
    async getPictures () {
      this.loading = true
      const res = await getPictureList({
        page: this.page,
        per_page: this.per_page,
        collect: this.collect
      })
      this.pictures = res.data.data.results
      this.total = res.data.data.total_count
      this.loading = false
    },
    handleCurrentChange (current) {
      this.page = current
      this.getPictures()
    },
    change () {
      this.page = 1
      this.getPictures()
    },
    async update (item) {
      const res = await updatePicture(item.id, !item.is_collected)
      console.log(res)
      // 取消收藏后发送请求重新获取图片数据
      // this.getPictures()
      // 不取消收藏，直接通过取反来使收藏按钮变回白色
      item.is_collected = !item.is_collected
      this.$message.success(item.is_collected ? '取消收藏成功' : '收藏成功')
    },
    async del (id) {
      try {
        await this.$confirm('确定删除该图片吗？', {
          type: 'warning'
        })
      } catch {
        return
      }
      try {
        await delPicture(id)
        this.$message.success('删除成功！')
        if (this.pictures.length === 1) {
          this.page--
        }
        this.getPictures()
      } catch {
        this.$message.error('删除失败，请稍后重试')
      }
    },
    onSuccess (res) {
      this.imgUrl = res.data.url
      this.$message.success('上传素材成功')
      setTimeout(() => {
        this.dialogVisible = false
        this.imgUrl = ''
        this.getPictures()
      }, 2000)
    },
    beforeUpload (file) {
      // 要求：只能上传png 或者 jpg 或者 gif 其他文件不让上传
      // 要求2： 只能上传2m以内的图片
      console.log(file)
      if (!['image/png', 'image/jpeg', 'image/gif'].includes(file.type)) {
        this.$message.error('上传的图片格式不正确')
        return false
      }
      if (file.size / 1024 / 1024 >= 2) {
        this.$message.error('上传文件超过了2M')
        return false
      }
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
