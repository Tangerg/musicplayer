<template>
  <div class="m-player" v-show="playList.length">
    <div class="normal-player" v-show="fullScreen">
      <div class="background">
        <div class="filter"></div>
        <img :src="currentSong.image" width="100%" height="100%">
      </div>
      <div class="player-top">
        <div class="back" @click="back">
          <i class="iconfont icon-left"></i>
        </div>
        <div class="title-subtitle">
          <h1 class="title">{{currentSong.name}}</h1>
          <h2 class="subtitle">{{currentSong.singer}}</h2>
        </div>
      </div>
      <div class="player-middle">
        <div class="middle-front">
          <div class="cd-wrapper">
            <div class="cd">
              <img class="image" :src="currentSong.image" alt="">
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
            <i @click="handlePlay" class="iconfont" :class="playIcon"></i>
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
    <div  class="mini-player" v-show="!fullScreen" @click="open">
      <div class="icon">
        <img width="40" height="40" :src="currentSong.image">
      </div>
      <div class="text">
        <h2 class="name" v-html="currentSong.name"></h2>
        <p class="desc" v-html="currentSong.singer"></p>
      </div>
      <div class="control"></div>
      <div class="control">
        <i class="iconfont icon-play2"></i>
      </div>
    </div>
    <audio id="music-audio" :src="Song.url" ref="audio" autoplay>
    </audio>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import ProgressBar from '../../base/progress-bar/progress-bar'
  import {ERR_OK} from '../../common/js/config'
  import {getPlaySong} from '../../api/play-list'
  export default {
    data(){
      return{
        Song:{},
      }
    },
    computed:{
      ...mapGetters([
        'playList',
        'fullScreen',
        'sequenceList',
        'isPlaying',
        'currentIndex',
        'currentSong'
      ]),

      playIcon(){
        return this.isPlaying ? 'icon-pause' : 'icon-play'
      }
    },
    created(){

    },
    watch:{
      currentSong (newVal, oldVal) {
        if (!newVal.id) {
          return
        }
        if (newVal.id === oldVal.id) {
          return
        }
        this.$refs.audio.pause()
        this._getPlaySong(newVal.id)
      },
      isPlaying(Playing){
        const audio = this.$refs.audio
        Playing ?  audio.play() : audio.pause()
      }
    },
    methods:{
      ...mapMutations({
        setFullScreen:'SET_FULL_SCREEN',
        setPlayingState:'SET_PLAYING_STATE'
      }),
      back(){
        this.setFullScreen(false)
      },
      open(){
        this.setFullScreen(true)
      },

      handlePlay(){
        this.setPlayingState(!this.isPlaying)
      },

      _getPlaySong(id){
        getPlaySong(id).then((res) => {
          if(res.code === ERR_OK){
            this.Song = res.data[0]
          }
        })
      }
    },
    components:{
      ProgressBar
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .m-player
    .normal-player
      position fixed
      z-index 150
      top 0
      left 0
      bottom 0
      right 0
      background $color-background-gray-d
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
          flex 0.18
          text-align center
          height 100%
          display flex
          align-items center
          color $color-text-white
          .icon-left
            flex 1
            font-size 25px
            color $color-theme
        .title-subtitle
          flex 1
          height 100%
          display flex
          flex-direction column
          overflow hidden
          .title
            no-wrap()
            width 90%
            flex 0.6
            display flex
            align-items center
            font-size $font-size-medium-x
            color $color-text-white
          .subtitle
            no-wrap()
            width 90%
            flex 0.4
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

    .mini-player
      display flex
      align-items center
      position fixed
      left 0
      bottom 0
      z-index 180
      width 100%
      height 8%
      background $color-background-white
      border-top 1px solid $color-line-gray
      .icon
        flex: 0 0 40px
        width: 40px
        padding: 0 10px 0 20px
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          no-wrap()
          font-size: $font-size-medium
          color: $color-text
        .desc
          no-wrap()
          font-size: $font-size-small
          color: $color-text-black
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size: 30px
          color: $color-theme-d
        .icon-mini
          font-size: 32px
          position: absolute
          left: 0
          top: 0
</style>
