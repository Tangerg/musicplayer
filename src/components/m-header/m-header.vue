<template>
  <div class="m-header">
    <div class="header-left">
      <i class="iconfont icon-hamburg"></i>
    </div>
    <div class="header-center">
      <span class="header-center-item" @click="goTo('/music')">
        <i class="iconfont icon-customer"></i>
      </span>
      <span class="header-center-item" @click="goTo('/home')">
        <i class="iconfont icon-home"></i>
      </span>
      <span class="header-center-item" @click="goTo('/mv')">
        <i class="iconfont icon-fingerprint"></i>s
      </span>
    </div>
    <div class="header-right" @click="goToPush('/search')">
      <i class="iconfont icon-chaxun"></i>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      goTo (path) {
        this.$router.replace(path)
      },
      goToPush (path) {
        this.$router.push(path)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .m-header
    background-color $color-background-red
    position: relative
    height: 45px
    text-align: center
    color: $color-text-white
    font-size: 0
    display flex
    flex-direction row
    align-items center
    z-index 100
    .header-left
      padding-left 5%
      text-align left
    .header-center
      display flex
      flex 1
      text-align center
      align-items center
      padding-left 15%
      padding-right 15%
      .header-center-item
        flex 1
        align-items center
        text-align center
    .header-right
      padding-right 5%
      text-align right
</style>
