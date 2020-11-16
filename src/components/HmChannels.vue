<template>
  <div class="hm-channels">
    <el-select :value="value" @change="fn" placeholder="请选择频道" clearable>
      <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
  </div>
</template>

<script>
import { getChannelList } from '@/Api/article'
export default {
  props: ['value'],
  data () {
    return {
      channels: []
    }
  },
  created () {
    this.getChannels()
  },
  methods: {
    async getChannels () {
      const res = await getChannelList()
      // console.log(res)
      this.channels = res.data.data.channels
    },
    fn (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style>

</style>
