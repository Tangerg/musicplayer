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
                <img src="" alt="">
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
          <span class="time time-l"></span>
          <div class="progress-bar-wrapper"></div>
          <span class="time time-r"></span>
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
    export default {
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
      position relative
      display flex
      align-items center
      box-sizing border-box
      height 50px
      .back
        flex 0 0 50px;
        text-align center
        height 50px
        line-height 50px
        color $color-text-white
        .icon-left
          font-size: 25px
          color: $color-theme-l
      .title-subtitle
        flex 1
        height 50px
        overflow hidden
        .title
          no-wrap()
          width: 90%;
          height 30px
          line-height 30px
          font-size $font-size-medium-x
          color $color-text-white
        .subtitle
          no-wrap()
          width: 90%;
          height 20px
          font-size $font-size-small
          color $color-text-gray
    .player-middle
      display: flex;
      align-items: center;
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;
      .middle-front
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
        &.middleL-enter-active, &.middleL-leave-active
          transition: all 0.3s
        &.middleL-enter, &.middleL-leave-to
          opacity: 0
        .cd-wrapper
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          height: 100%;
          .cd
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 15px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            &.play
              animation: rotate 20s linear infinite;
            &.pause
              animation-play-state: paused;
            .image
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
      .middle-behind
        display: inline-block;
        position: absolute;
        top: 0;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;
        &.middleR-enter-active, &.middleR-leave-active
          transition: all 0.2s;
        &.middleR-enter, &.middleR-leave-to
          opacity: 0;
        .lyric-wrapper
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;
          .text
            line-height: 40px;
            color: $color-text-ggg;
            font-size: $font-size-medium;
            &.current
              color: #FFF;
          .no-lyric
            line-height: 40px;
            margin-top: 60%;
            color: $color-text-ggg;
            font-size: $font-size-medium;
</style>
