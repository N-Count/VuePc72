<template>
  <div class="hm-cover">
    <!-- 图片按钮 -->
    <div class="btn_img" @click="openDialig">
      <img :src='showImage' >
    </div>
    <el-dialog
        title="上传封面"
        :visible.sync="dialogVisible"
        width="720px">
        <el-tabs v-model="activeName" type='card'>
        <el-tab-pane label="素材库" name="picture">
          <el-radio-group v-model="collect" @change="change">
           <el-radio-button :label="false">全部</el-radio-button>
           <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <el-row :gutter="10">
            <el-col
            v-for='item in pictures'
            :key='item.id'
            :span='6'
           @click.native="selected(item.url)">
              <el-image
              :class = "{ selected:item.url === selectedImage }"
              :src="item.url"
              style="height: 120px; width: 100%"
              fit='cover'>
              </el-image>
            </el-col>
          </el-row>
          <el-pagination
          @current-change="handleCurrentChange"
          layout="total,prev,pager,next,jumper"
          :current-page="page"
          :page-size="per_page"
          :total="total"
          >

          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :headers="headers"
          name="image"
          :show-file-list="false"
          :on-success="success"
          :on-error="error"
          :before-upload="beforeUpload">
          <img :src="uploadImage" alt="" v-if='uploadImage' class="avatar" >
            <i v-else  class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
        </el-tabs>
     <template slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirm" >确 定</el-button>
  </template>
</el-dialog>
  </div>
</template>

<script>
import { getPictureList } from '@/Api/pictures'
import { getToken } from '@/utils/storage'
import img from '@/assets/default.png'
export default {
  props: ['value'],
  data () {
    return {
    // 控制对话框显示隐藏
      dialogVisible: false,
      activeName: 'picture',
      collect: false,
      pictures: [],
      page: 1,
      per_page: 8,
      total: 0,
      selectedImage: '',
      uploadImage: '',
      showImage: this.value || img,
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    }
  },
  watch: {
    value () {
      this.showImage = this.value || img
    }
  },
  methods: {
    openDialig () {
      this.dialogVisible = true
      this.getPictures()
    },
    async getPictures () {
      const res = await getPictureList({
        page: this.page,
        per_page: this.per_page,
        collect: this.collect
      })
      console.log(res)
      const { results, total_count } = res.data.data
      this.pictures = results
      this.total = total_count
    },
    handleCurrentChange (val) {
      this.page = val
      this.getPictures()
    },
    selected (url) {
      if (this.selectedImage === url) {
        this.selectedImage = ''
      } else {
        this.selectedImage = url
      }
    },
    success (res) {
      this.uploadImage = res.data.url
    },
    beforeUpload (file) {
      if (file.size / 1024 / 1024 > 2) {
        return this.$message.warning('上传的照片不能超过2兆!')
      }
    },
    error () {
      this.$message.error('上传失败，请稍后重试！')
    },
    confirm () {
      if (this.activeName === 'picture') {
        if (this.selectedImage) {
          this.showImage = this.selectedImage
          this.$message.success('上传成功！')
        } else {
          return this.$message.error('请选择图片！')
        }
      } else {
        if (this.uploadImage) {
          this.showImage = this.uploadImage
          this.dialogVisible = false
          this.$message.success('上传成功！')
        } else {
          return this.$message.error('请上传图片！')
        }
      }
      this.dialogVisible = false
      this.selectedImage = ''
      this.uploadImage = ''
      this.$emit('input', this.showImage)
    },
    change () {
      this.page = 1
      this.getPictures()
    }

  }
}
</script>

<style scoped lang='less'>
// 图片按钮
.btn_img {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
   object-fit: cover;
  }
}
.el-row {
  margin-top: 10px;
  .el-col {
    margin-top: 5px;
  }
}
.selected {
   &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:  rgba(0, 0, 0, 0.4) url('~@/assets/selected.png') no-repeat center / 60px 60px;
}
}
</style>
