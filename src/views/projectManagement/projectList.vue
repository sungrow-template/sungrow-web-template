<template>
  <div>
    111
  </div>
</template>

<script>
import {
  getListAPI,
  postForm,
  login
} from '@/api'

export default {
  name: 'ProjectList',
  mounted() {
    try {
      const res = getListAPI({a: 1})
      const res1 = postForm({a: 1})
      const res2 = login({a: 1, b: 2})
      console.log(res)
      console.log(res1)
      console.log(res2)
    } catch (e) {
      console.log(e)
    }
  }
}
</script>
<style lang="scss">
  .project-list {
    .el-form-item .el-input {
      width: 170px;
    }
  }
</style>
<style lang="scss" scoped>
</style>
