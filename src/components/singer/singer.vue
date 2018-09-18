<template>
  <scroll class="singer-container">
    <div>
      <div class="singer-category">
      <span class="empty-line"></span>
      <span class="singer-features">华语男歌手</span>
      <span class="singer-features">华语女歌手</span>
      <span class="singer-features">华语乐队/组合</span>
      </div>
      <div class="singer-category">
        <span class="empty-line"></span>
        <span class="singer-features">欧美男歌手</span>
        <span class="singer-features">欧美女歌手</span>
        <span class="singer-features">欧美乐队/组合</span>
      </div>
      <div class="singer-category">
        <span class="empty-line"></span>
        <span class="singer-features">日本男歌手</span>
        <span class="singer-features">日本女歌手</span>
        <span class="singer-features">日本乐队/组合</span>
      </div>
      <div class="singer-category">
        <span class="empty-line"></span>
        <span class="singer-features">韩国男歌手</span>
        <span class="singer-features">韩国女歌手</span>
        <span class="singer-features">韩国乐队/组合</span>
      </div>
      <div class="singer-category">
        <span class="empty-line"></span>
        <span class="singer-features">其他男歌手</span>
        <span class="singer-features">其他女歌手</span>
        <span class="singer-features">其他乐队/组合</span>
      </div>
    </div>
  </scroll>
</template>

<script>
  import Scroll from '../../base/scroll/scroll'
    export default {
      components:{
        Scroll
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .singer-container
    position fixed
    top 85px
    width 100%
    max-height 100%
    bottom 0
    z-index -10
    overflow hidden
    .singer-category
      display flex
      flex-direction column
      align-items center
      text-align left
      .empty-line
        width 100%
        background-color $color-background-gray-d
        height 15px
      .singer-features
        padding-left 10%
        width 100%
        height 45px
        line-height 45px
        border-bottom 1px solid $color-background-gray-d
        font-size: $font-size-medium
        font-weight bold
</style>
