<template>
  <el-dialog :visible.sync="dialog" :close-on-click-modal="false" title="FastDFS配置" append-to-body width="580px">
    <el-form ref="form" :model="form" :rules="rules" style="margin-top: 6px;" size="small" label-width="140px">
      <el-form-item label="服务器连接用户名" prop="accessKey">
        <el-input v-model="form.accessKey" style="width: 95%" placeholder="服务器连接用户名" />
      </el-form-item>
      <el-form-item label="服务器连接密码" prop="secretKey">
        <el-input v-model="form.secretKey" type="password" style="width: 95%;" placeholder="服务器连接密码" />
      </el-form-item>
      <el-form-item label="空间名称" prop="bucket">
        <el-input v-model="form.bucket" style="width: 95%;" placeholder="存储空间名称作为唯一的 Bucket 识别符" />
      </el-form-item>
      <el-form-item label="外链域名" prop="host">
        <el-input v-model="form.host" style="width: 95%;" placeholder="访问域名" />
      </el-form-item>
      <el-form-item label="存储区域">
        <el-select v-model="form.zone" placeholder="请选择存储区域">
          <el-option key="CustomServer" label="自定义服务器" value="CustomServer" />
        </el-select>
      </el-form-item>
      <el-form-item label="空间类型" prop="type">
        <el-radio v-model="form.type" label="公开">公开</el-radio>
        <el-radio v-model="form.type" label="私有">私有</el-radio>
      </el-form-item>
      <el-form-item label="云存储类型">
        <el-select v-model="form.cloudType" placeholder="请选择云存储类型" disabled>
          <el-option
            v-for="item in dict.cloud_storage_type"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="dialog = false">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { get, update } from '@/api/tools/fdfs'

export default {
  // 数据字典
  dicts: ['cloud_storage_type'],
  data() {
    return {
      dialog: false,
      loading: false, form: { accessKey: '', secretKey: '', bucket: '', host: '', zone: 'CustomServer', type: '', cloudType: '' },
      rules: {
        accessKey: [
          { required: true, message: '服务器连接用户名', trigger: 'blur' }
        ],
        secretKey: [
          { required: true, message: '服务器连接密码', trigger: 'blur' }
        ],
        bucket: [
          { required: true, message: '请输入空间名称', trigger: 'blur' }
        ],
        host: [
          { required: true, message: '请输入外链域名', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '空间类型不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init() {
      get().then(res => {
        this.form = res
        this.form.cloudType = '4'
      })
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          update(this.form).then(res => {
            this.$notify({
              title: '修改成功',
              type: 'success',
              duration: 2500
            })
            this.$parent.crud.toQuery()
            this.loading = false
            this.dialog = false
          }).catch(err => {
            this.loading = false
            console.log(err.response.data.message)
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
