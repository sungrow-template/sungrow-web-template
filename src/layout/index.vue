<template>
  <div class="sungrow">
    <sidebar class="sungrow-sidebar" />
    <div class="sungrow-content">
      <div class="sungrow-header">
        <common-header />
      </div>
      <app-main />
    </div>
  </div>

</template>

<script>
import { AppMain, Sidebar, CommonHeader } from './components'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Sidebar,
    CommonHeader
  },
  computed: {
    ...mapState({
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView
    })
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  .sungrow {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
  }
</style>
