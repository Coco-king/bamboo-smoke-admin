<template>
  <el-tabs v-model="activeName" style="padding-left: 8px;" @tab-click="tabClick">
    <el-tab-pane label="本地存储" name="localStorage">
      <Local v-if="activeName === 'localStorage'" ref="local" />
    </el-tab-pane>
    <el-tab-pane label="阿里云存储" name="aliStorage">
      <Ali v-if="activeName === 'aliStorage'" ref="ali" />
    </el-tab-pane>
    <el-tab-pane label="腾讯云存储" name="tencentStorage">
      暂未支持
    </el-tab-pane>
    <el-tab-pane label="七牛云存储" name="qiNiuStorage">
      <QiNiu v-if="activeName === 'qiNiuStorage'" ref="qiNiu" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Ali from './ali/index'
import QiNiu from './qiniu/index'
import Local from './local/index'
export default {
  name: 'Storage',
  components: { Ali, QiNiu, Local },
  data() {
    return {
      activeName: 'localStorage'
    }
  },
  methods: {
    tabClick(name) {
      if (this.activeName === 'localStorage') {
        this.$refs.local.crud.toQuery()
      } else if (this.activeName === 'qiNiuStorage') {
        this.$refs.qiNiu.crud.toQuery()
      } else if (this.activeName === 'aliStorage') {
        this.$refs.ali.crud.toQuery()
      }
    }
  }
}
</script>

<style scoped>
</style>
