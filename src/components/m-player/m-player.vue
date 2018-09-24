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
      <div class="player-middle" @click="changeMiddle">
        <div class="middle-front" v-show="currentShow === 'cd'">
          <div class="cd-wrapper">
            <div class="cd">
              <img class="image" :src="currentSong.image" >
            </div>
          </div>
        </div>
        <scroll class="middle-behind" ref="lyricList" :data="currentLyric && currentLyric.lines" v-show="currentShow === 'lyric'">
          <div class="lyric-wrapper">
            <div class="currentLyric" v-if="currentLyric">
              <p ref="lyricLine" class="text" :class="{'highLight':currentLineNum === index}"  v-for="(line,index) in currentLyric.lines">{{line.txt}}</p>
              <p class="no-lyric"></p>
            </div>
          </div>
        </scroll>
      </div>
      <div class="player-bottom">
        <div class="progress-wrapper">
          <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChange="onProgressBarChange" @percentChangeEnd="onPercentChangeEnd"></progress-bar>
            </div>
          <span class="time time-r">{{format(this.duration)}}</span>
        </div>
        <div class="operate">
          <div class="icon i-left" >
            <i class="iconfont" :class="iconMode" @click="changeMode"></i>
          </div>
          <div class="icon i-left" >
            <i @click="prevSong" class="iconfont icon-backward"></i>
          </div>
          <div class="icon i-center" >
            <i @click="handlePlay" class="iconfont" :class="playIcon"></i>
          </div>
          <div class="icon i-right" >
            <i @click="nextSong"class="iconfont icon-forward"></i>
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
        <progress-circle :radius="radius" :percent="percent">
          <i @click.stop="handlePlay" class="iconfont" :class="miniPlayIcon"></i>
        </progress-circle>
      </div>
    </div>
    <audio id="music-audio" ref="audio" @canplay="ready" @error="error" @timeupdate="updataTime" @ended="end" autoplay></audio>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import ProgressBar from '../../base/progress-bar/progress-bar'
  import ProgressCircle from '../../base/progress-circle/progress-circle'
  import {ERR_OK} from '../../common/js/config'
  import {getPlaySong,getSongLyric} from '../../api/song'
  import {Mode} from '../../common/js/config'
  import {shuffle} from '../../common/js/util'
  import Lyric from 'lyric-parser'
  import Scroll from '../../base/scroll/scroll'

  export default {
    data(){
      return{
        Song:{},
        musicUrl:'',
        currentLyric:null,
        currentLineNum:0,
        songReady: false,
        currentTime:0,
        duration: 0,
        radius:30,
        currentShow:'cd'
      }
    },
    created() {
      this.touch = {}
    },
    computed:{
      ...mapGetters([
        'playList',
        'fullScreen',
        'sequenceList',
        'isPlaying',
        'currentIndex',
        'currentSong',
        'playMode'
      ]),

      percent(){
        return this.currentTime/this.duration
      },
      iconMode(){
        if (this.playMode === Mode.sequence) {
          return 'icon-liebiaoxunhuan'
        } else if (this.playMode === Mode.loop) {
          return 'icon-danquxunhuan'
        } else {
          return 'icon-suiji'
        }
      },
      playIcon(){
        return this.isPlaying ? 'icon-pause' : 'icon-play'
      },
      miniPlayIcon(){
        return this.isPlaying ? 'icon-pause2' : 'icon-play2'
      }
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
        this.$refs.audio.currentTime = 0
        this._getPlaySong(newVal.id)
        if(this.currentLyric){
          this.currentLyric.stop()
        }
        this._getSongLyric(newVal.id)
      },
      musicUrl(url){
        this.$refs.audio.src = url
        let stop = setInterval(() => {
          this.duration = this.$refs.audio.duration
        }, 150)
        if (this.duration) {
          clearInterval(stop)
        }
        this.setPlayingState(true)
      },
      isPlaying(Playing){
        const audio = this.$refs.audio
        Playing ?  audio.play() : audio.pause()
      },
    },
    methods:{
      ...mapMutations({
        setFullScreen:'SET_FULL_SCREEN',
        setPlayingState:'SET_PLAYING_STATE',
        setCurrentIndex:'SET_CURRENT_INDEX',
        setPlayingMode:'SET_PLAYING_MODE',
        setPlayList:'SET_PLAY_LIST'
      }),
      changeMode(){
        const playMode = (this.playMode+1) % 3
        this.setPlayingMode(playMode)
        let list = null
        if(playMode === Mode.random){
          list = shuffle(this.sequenceList)
        }else{
          list = this.sequenceList
        }
        this.resetCurrentIndex(list)
        this.setPlayList(list)
      },
      resetCurrentIndex(list){
        let index = list.findIndex((item)=>{
          return item.id === this.currentSong.id
        })
        this.setCurrentIndex(index)
      },
      onProgressBarChange(percent){
        const currentTime = this.duration * percent
        this.$refs.audio.currentTime = this.duration * percent
        if(!this.isPlaying){
          this.handlePlay()
        }
        if(this.currentLyric){
          this.currentLyric.seek(currentTime * 1000)
        }
      },
      onPercentChangeEnd(percent){
        const currentTime = this.duration * percent
        this.$refs.audio.currentTime = this.duration * percent
        if(!this.isPlaying){
          this.handlePlay()
        }
        if(this.currentLyric){
          this.currentLyric.seek(currentTime * 1000)
        }
      },
      back(){
        this.setFullScreen(false)
      },
      open(){
        this.setFullScreen(true)
      },

      handlePlay(){
        if(!this.songReady){
          return
        }
        this.setPlayingState(!this.isPlaying)
        if(this.currentLyric){
          this.currentLyric.togglePlay()
        }
      },
      updataTime(e){
        this.currentTime = e.target.currentTime
      },
      end(){
        if(this.playMode === Mode.loop){
          this.loop()
        }else{
          this.nextSong()
        }
      },
      loop(){
        this.$refs.audio.currentTime =
        this.$refs.audio.play()
        if(this.currentLyric){
          this.currentLyric.seek(0)
        }
      },
      format(interval){
        interval = interval | 0
        let minute = interval / 60 | 0
        let second = interval % 60
        if (second < 10) {
          second = '0' + second
        }
        return minute + ':' + second
      },
      _getPlaySong(id){
        getPlaySong(id).then((res) => {
          if(res.code === ERR_OK){
            this.musicUrl = res.data[0].url
          }
        })
      },
      _getSongLyric(id){
        getSongLyric(id).then((res) => {
          if(res.code === ERR_OK){
            this.currentLyric = new Lyric(res.lrc.lyric,this.handleLyric)
            if(this.isPlaying){
              this.currentLyric.play()
            }
          }
        })
      },
      handleLyric({lineNum,txt}){
        this.currentLineNum = lineNum
        if(lineNum>4){
          let lineEl = this.$refs.lyricLine[lineNum - 4]
          this.$refs.lyricList.scrollToElement(lineEl, 1000)
        }else {
          this.$refs.lyricList.scrollTo(0, 0, 1000)
        }
      },

      ready (){
        this.songReady = true
      },
      error(){
        this.songReady = true
      },
      nextSong(){
        if (!this.songReady) {
          return
        }
        let index = this.currentIndex + 1
        if(index === this.playList.length){
          index = 0
        }
        this.setCurrentIndex(index)
        if(!this.isPlaying){
          this.handlePlay()
        }
        this.songReady = false
      },
      prevSong(){
        if (!this.songReady) {
          return
        }
        let index = this.currentIndex - 1
        if(index === -1){
          index = this.playList.length - 1
        }
        this.setCurrentIndex(index)
        if(!this.isPlaying){
          this.handlePlay()
        }
        this.songReady = false
      },

      changeMiddle () {
        if (this.currentShow === 'cd') {
          this.currentShow = 'lyric'
        } else {
          this.currentShow = 'cd'
        }
      },

    },
    components:{
      ProgressBar,
      ProgressCircle,
      Scroll
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
        opacity 0.8
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
              color $color-text-white-ll
              font-size $font-size-medium
              &.highLight
                color $color-text-white
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
            .icon-danquxunhuan, .icon-liebiaoxunhuan
              font-size 30px
            .icon-iconfontxihuan
              font-size 25px
            .icon-iconfontxihuan2
              color red
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
        .icon-play2, .icon-pause2
          font-size: 30px
          color: $color-background-d
        .iconfont
          position: absolute
          left: 0
          top: 0
</style>
