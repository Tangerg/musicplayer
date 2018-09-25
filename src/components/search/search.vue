<template>
  <div class="search" >
    <div class="search-box-wrapper">
      <div class="back" @click="_back">
        <i class="iconfont icon-left"></i>
      </div>
      <div class="input-searchBox">
        <search-box ref="searchBox"></search-box>
      </div>
    </div>
    <scroll class="search-scroll-wrapper" ref="scroll">
      <div ref="search">
        <div class="search-hots">
          <p class="title">热门搜索</p>
          <span class="search-hots-item">
            周杰伦
          </span>
          <span class="search-hots-item">
            王力宏
          </span>
          <span class="search-hots-item">
            烟花易冷
          </span>
          <span class="search-hots-item">
            飘向北方
          </span>
          <span class="search-hots-item">
            应用化学
          </span>
        </div>
        <div class="shortcut-wrapper">
          <div class="search-history">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear">
                  <i class="iconfont icon-lajitong"></i>
                </span>
            </h1>
            <search-list></search-list>
          </div>
        </div>
        <div class="search-result">
          <suggest></suggest>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from '../../base/scroll/scroll'
  import SearchBox from '../../base/search-box/search-box'
  import SearchList from '../../base/search-list/search-list'
    export default {
      methods:{
        _back(){
          this.$router.back()
        },
      },
     components:{
       SearchBox,
       SearchList,
       Scroll
     }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .search
    position fixed
    z-index 100
    width 100%
    top 0
    bottom 0
    background $color-background-gray-d
    .search-box-wrapper
      position relative
      display flex
      align-items center
      box-sizing border-box
      height 8%
      background-color $color-background-red
      .back
        flex 0 0 55px;
        text-align center
        color $color-text-white
        .icon-left
          font-size 22px
      .input-searchBox
        color $color-text-white
        font-weight bold
        flex 1
        height 100%
    .search-scroll-wrapper
      height 100%
      overflow hidden
      .search-hots
        margin 0 5%
        .title
          padding 5% 0 0 0
          height 30px;
          line-height 30px
          font-size $font-size-small-x
          color $color-text-gray-d
        .search-hots-item
          display inline-block
          padding 3px 5px
          margin 4px 4px 4px 0px
          border 1px solid $color-line-gray-d
          border-radius 100px
          line-height 20px
          color $color-text-black
          font-size $font-size-medium
      .shortcut-wrapper
        position relative
        margin 2% 5%
        .search-history
          position relative
          .title
            display flex
            align-items center
            height 30px
            line-height 30px
            font-size $font-size-small-x
            color $color-text-gray-d
            .text
              flex 1
            .clear
              include extend-click()
              .icon-lajitong
                font-size $font-size-large
                color $color-text-gray-d
      .search-result
        position relative
        width 100%
        top 10px
        bottom 0
</style>
