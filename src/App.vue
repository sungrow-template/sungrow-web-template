<template>
  <div id="app">
    <el-input v-model="val"></el-input>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      val: ''
    }
  },
  watch: {
    val(newVal, oldVal) {
      if (newVal > 100) this.val = oldVal
    }
  },
  methods: {

  }
}
</script>
<style lang="scss">
  @import './assets/style/app.scss';
</style>
