<template>
  <transition name="slide" mode="out-in">
    <div class="rank-detail">
      <div class="header" ref="header">
        <div class="back" @click="_back">
          <i class="iconfont icon-left"></i>
        </div>
        <div class="text">
          <h1 class="title">{{headerTitle}}</h1>
        </div>
      </div>
      <scroll class="list"
              @scroll="scroll"
              :probe-type="probeType"
              :listen-scroll="listenScroll"
              :data="ListDetail"
              ref="list">
        <div class="music-list-wrapper">
          <div class="bg-image" :style="bgImg" ref="bgImage">
            <div class="filter"></div>
            <div class="text">
              <h2 class="list-title">{{listName}}</h2>
              <p class="play-count">
                <i class="iconfont icon-customer"></i>
                共计播放{{playCount}}
              </p>
            </div>
          </div>
          <div class="song-list-wrapper">
            <song-list :songs="ListDetail" @select="selectItem" @selectAll="playAll"></song-list>
          </div>
        </div>
      </scroll>
      <div v-show="!ListDetail.length" class="loading-content">
        <loading></loading>
      </div>
    </div>
  </transition>
</template>

<script>
  import {mapActions,mapGetters} from 'vuex'
  import {creatSongList} from "../../common/classes/song";
  import Scroll from '../../base/scroll/scroll'
  import SongList from '../../base/song-list/song-list'
  import Loading from '../../base/loading/loading'
  import {playlistMixin} from '../../common/js/mixin'
  const RESERVED_HEIGHT = 50
  export default {
    mixins:[playlistMixin],
    data() {
      return {
        ListDetail: [],
        scrollY: 0,
        headerTitle: '排行榜'
      }
    },
    created(){
      this._initRankList(this.rankList.tracks)
      this.probeType = 3
      this.listenScroll = true
    },
    mounted () {
      this.imageHeight = this.$refs.bgImage.clientHeight
      this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
    },
    computed:{
      ...mapGetters([
        'rankList',
      ]),
      playCount(){
        if (!this.rankList.playCount) {
          return
        }
        if (this.rankList.playCount < 1e4) {
          return Math.floor(this.rankList.playCount)
        } else if(this.rankList.playCount < 1e8) {
          return Math.floor(this.rankList.playCount / 10000) + '万'
        } else {
          return Math.floor(this.rankList.playCount / 100000000) + '亿'
        }
      },
      listName(){
        if (!this.rankList.name) {
          return
        }
        return this.rankList.name
      },
      bgImg() {
        return `background-image:url(${this.rankList.coverImgUrl})`
      }
    },
    components:{
      SongList,
      Scroll,
      Loading
    },
    methods:{
      ...mapActions([
        'selectPlay'
      ]),
      scroll (pos) {
        this.scrollY = pos.y
      },
      handlePlaylist (playlist) {
        const bottom = playlist.length > 0 ? '8%' : ''
        this.$refs.list.$el.style.bottom = bottom
        this.$refs.list.refresh()
      },

      _initRankList(list){
        if (!this.rankList.id) {
          this.$router.push('/home/rank')
          return
        }
        this.ListDetail = list.map((music)=>{
          return creatSongList(music)
        })
      },
      _back(){
        this.$router.back()
      },
      selectItem(item,index){
        this.selectPlay({
          list: this.ListDetail,
          index: index
        })
      },
      playAll(){
        this.selectPlay({
          list: this.ListDetail,
        })
      }
    },
    watch: {
      scrollY (newY) {
        const percent = Math.abs(newY / this.imageHeight)
        if (newY < (this.minTranslateY + RESERVED_HEIGHT - 20)) {
          this.headerTitle = this.rankList.name
        } else {
          this.headerTitle = '排行榜'
        }
        if (newY < 0) {
          this.$refs.header.style.background = `rgba(212, 68, 57, ${percent})`
        } else {
          this.$refs.header.style.background = `rgba(212, 68, 57, 0)`
        }
      }
    },
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(30%, 0, 0);
    opacity: 0;
  .rank-detail
    position fixed
    z-index: 150
    top 0
    left 0
    bottom 0
    right 0
    background $color-background-gray-d
    .header
      position relative
      display flex
      align-items center
      box-sizing border-box
      height 8%
      z-index 100
      .back
        flex 0 0 55px;
        text-align center
        color $color-text-white
        .icon-left
          font-size 22px
      .text
        color $color-text-white
        font-weight bold
        flex 1
        height 45px
        line-height 45px
    .list
      position fixed
      top 0
      bottom 0
      width 100%
      .music-list-wrapper
        .bg-image
          position relative
          width 100%
          height 0
          padding-top 75%
          transform-origin top
          background-size cover
          background-position 0 30%
          .filter
            position absolute
            top 0
            left 0
            width 100%
            height 100%
            background black
            opacity 0.2
          .text
            position absolute
            width 80%
            height 40px
            bottom 50px
            left 15px
            color #fff
            .play-count
              position absolute
              bottom -16px
              font-size $font-size-small
              .iconfont
                font-size 16px
            .list-title
              position absolute
              bottom 0
              font-size $font-size-medium-x
              line-height 20px
              font-weight bold
              letter-spacing 1px
        .song-list-wrapper
          border-radius 10px 10px 0 0
          position relative
          top -20px
    .loading-content
      position fixed
      width 100%
      top 70%
      transform: translateY(-50%)
</style>

