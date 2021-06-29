<template>
  <div class="common-header">
    <i :class="openSidebarStatus ? 'el-icon-s-fold' : 'el-icon-s-unfold'" @click="tabSideBar"></i>
    <div class="common-header-routers">
      <tags-view />
    </div>
    <div class="common-header-operate">
      <img src="../../../assets/images/avatar.jpg">
      <span class="exit" @click="loginOut">退出登录</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { TagsView } from '../../components'

export default {
  name: 'CommonHeader',
  components: {
    TagsView
  },
  computed: {
    openSidebarStatus() {
      return this.$store.state.tagsView.openSidebarStatus
    }
  },
  methods: {
    tabSideBar() {
      this.$store.dispatch('tagsView/changeSidebarStatus', !this.openSidebarStatus)
    },
    async loginOut() {
      try {
        const res = await this.$AJAX.get(`/logout`, {})
        if (res && res.code === 10000) {
          this.$store.dispatch('user/setToken', '')
          this.$router.push('/login')
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .common-header{
    display: flex;
    border-bottom: 1px solid #d9d9d9;
    .el-icon-s-fold, .el-icon-s-unfold{
      color: #333333;
      font-size: 25px;
      vertical-align: middle;
      cursor: pointer;
      display: flex;
      align-items: center;
      margin-left: 10px;
    }
    .common-header-routers{
      width: calc(100% - 180px);
      flex: 0 0 calc(100% - 180px);
      display: flex;
      align-items: center;
    }
    .common-header-operate{
      cursor: pointer;
      margin-right: 20px;
      display: flex;
      align-items: center;
      font-size: 14px;
      img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .user-name{
        margin: 0 12px;
      }
    }
  }
</style>
