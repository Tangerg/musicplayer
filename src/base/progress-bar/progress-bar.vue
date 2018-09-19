<template>
  <div class="progress-bar">
    <div class="bar-inner">
      <div class="progress"></div>
      <div class="progress-btn-wrapper">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "progress-bar"
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .progress-bar
    height 30px
    padding 0 5px
    .bar-inner
      position relative
      top 14px
      height 2px
      background $color-line-gray-d
      .progress
        position absolute
        height 100%
        background $color-theme
      .progress-btn-wrapper
        position absolute
        left -5px
        top -13px
        width 15px
        height 15px
        .progress-btn
          position relative
          top 7px
          left 0
          box-sizing border-box
          width 15px
          height 15px
          border 5px solid $color-background-white
          border-radius 50%
          background $color-background-gray
</style>
