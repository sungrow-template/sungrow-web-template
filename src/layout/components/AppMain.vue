<template>
  <section class="app-main">
    <div class="main-content">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <router-view :key="key" />
        </keep-alive>
      </transition>
    </div>

  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-main {
    position: relative;
    overflow: hidden;
    color: #333333;
    .main-content{
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      overflow: hidden;
      >div{
        display: flex;
        flex-direction: column;
        overflow: hidden;
        height: 100%;
      }
    }
  }
</style>
