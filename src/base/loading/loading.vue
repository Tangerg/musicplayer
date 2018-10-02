<template>
  <div class="loading">
    <img src="./loading.gif" width="24" height="24">
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '拼命加载中'
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .loading
    width 100%
    height 40px
    text-align center
    img
      margin-top 10px
</style>
