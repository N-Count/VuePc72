<template>
  <div class="my-cover">
    <!-- 图片按钮 -->
    <div class="btn_img" @click="openDialig">
      <img src="@/assets/default.png" />
    </div>
    <el-dialog
        title="上传封面"
        :visible.sync="dialogVisible"
        width="720px">
        <el-tabs v-model="activeName" type='card' @click="handleClick">
        <el-tab-pane label="素材库" name="1">素材库</el-tab-pane>
        <el-tab-pane label="上传图片" name="2">上传图片</el-tab-pane>
        </el-tabs>
     <template slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </template>
</el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
    // 控制对话框显示隐藏
      dialogVisible: false,
      activeName: 'image'

    }
  },
  methods: {
    openDialig () {
      this.dialogVisible = true
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
  }
}
</style>
