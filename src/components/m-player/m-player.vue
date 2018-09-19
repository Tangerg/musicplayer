<template>
  <div class="m-player">
    <div class="normal-player">
      <div class="background">
        <div class="filter"></div>
        <img src="http://p1.music.126.net/4xv2Jsuhe1DBkDfIeVlaYQ==/39582418616705.jpg" width="100%" height="100%">
      </div>
      <div class="player-top">
        <div class="back">
          <i class="iconfont icon-left"></i>
        </div>
        <div class="title-subtitle">
          <h1 class="title">青花瓷</h1>
          <h2 class="subtitle">周杰伦</h2>
        </div>
      </div>
      <div class="player-middle">
        <div class="middle-front">
          <div class="cd-wrapper">
            <div class="cd">
              <img class="image" src="http://p1.music.126.net/4xv2Jsuhe1DBkDfIeVlaYQ==/39582418616705.jpg" alt="">
            </div>
          </div>
        </div>
        <div class="middle-behind">
          <div class="lyric-wrapper">
            <div class="currentLyric">
              <p class="text"></p>
              <p class="no-lyric"></p>
            </div>
          </div>
        </div>
      </div>
      <div class="player-bottom">
        <div class="progress-wrapper">
          <span class="time time-l">0:00</span>
            <div class="progress-bar-wrapper">
              <progress-bar></progress-bar>
            </div>
          <span class="time time-r">3:20</span>
        </div>
        <div class="operate">
          <div class="icon i-left" >
            <i class="iconfont icon-suiji" ></i>
          </div>
          <div class="icon i-left" >
            <i class="iconfont icon-backward"></i>
          </div>
          <div class="icon i-center" >
            <i class="iconfont icon-play"></i>
          </div>
          <div class="icon i-right" >
            <i class="iconfont icon-forward"></i>
          </div>
          <div class="icon i-right">
            <i class="iconfont icon-iconfontxihuan"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ProgressBar from '../../base/progress-bar/progress-bar'
  export default {
    components:{
      ProgressBar
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .m-player
    position fixed
    z-index 200
    top 0
    left 0
    bottom 0
    right 0
    background $color-background-gray-d
    .normal-player
      .background
        position absolute
        left -50%
        top -50%
        width 300%
        height 300%
        z-index -1
        opacity 0.6
        filter blur(30px)
        .filter
          position absolute
          width 100%
          height 100%
          background $color-background-black
          opacity 0.6
      .player-top
        position absolute
        width 100%
        display flex
        align-items center
        box-sizing border-box
        height 10%
        .back
          flex 0 0 60px
          text-align center
          height 50px
          line-height 50px
          color $color-text-white
          .icon-left
            font-size 25px
            color $color-theme
        .title-subtitle
          flex 1
          height 50px
          overflow hidden
          .title
            no-wrap()
            width 90%
            height 30px
            line-height 30px
            font-size $font-size-medium-x
            color $color-text-white
          .subtitle
            no-wrap()
            width 90%
            height 20px
            font-size $font-size-small
            color $color-text-gray
      .player-middle
        display flex
        align-items center
        position fixed
        width 100%
        top 15%
        bottom 25%
        white-space nowrap
        .middle-front
          display inline-block
          vertical-align top
          position relative
          width 100%
          height 0
          padding-top 80%
          &.middleL-enter-active, &.middleL-leave-active
            transition all 0.3s
          &.middleL-enter, &.middleL-leave-to
            opacity 0
          .cd-wrapper
            position absolute
            left 10%
            top 0
            width 80%
            height 100%
            .cd
              width 100%
              height 100%
              box-sizing border-box
              border 10px solid rgba(255, 255, 255, 0.1)
              border-radius 50%
              .image
                position: relative;
                width: 100%;
                height: 100%;
                border-radius: 50%;
        .middle-behind
          display inline-block
          position absolute
          top 0
          vertical-align top
          width 100%
          height 100%
          overflow hidden
          &.middleR-enter-active, &.middleR-leave-active
            transition all 0.2s
          &.middleR-enter, &.middleR-leave-to
            opacity 0
          .lyric-wrapper
            width 80%
            margin 0 auto
            overflow hidden
            text-align center
            .text
              line-height 40px
              color $color-text-ggg
              font-size $font-size-medium
              &.current
                color #FFF
            .no-lyric
              line-height 40px
              margin-top 60%
              color $color-text-ggg
              font-size $font-size-medium
      .player-bottom
        position absolute
        bottom 5%
        width 100%;
        .progress-wrapper
          display flex
          align-items center
          width 80%
          margin 0 auto
          padding 10px 0
          .time
            color $color-text-l
            font-size $font-size-small
            flex 0 0 30px
            line-height 30px
            width 30px
            &.time-l
              text-align left
              color $color-text-gray
            &.time-r
              text-align right
              color $color-text-gray-d
          .progress-bar-wrapper
            flex 1
        .operate
          display flex
          align-items center
          .icon
            flex 1
            color $color-theme-d
            &.disabl
              color $color-theme
            i
              font-size 30px
            .icon-suiji
              font-size 25px
            .icon-iconfontxihuan
              font-size 25px
            &.i-left
              text-align right
            &.i-center
              padding 0 20px
              text-align center
              i
                font-size 40px
            &.i-right
              text-align left

</style>
