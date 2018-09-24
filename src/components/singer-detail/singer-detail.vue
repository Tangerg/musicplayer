<template>
  <div class="singer-detail">
    <div class="header">
      <div class="back" @click="_back">
        <i class="iconfont icon-left"></i>
      </div>
      <div class="text">
        <h1 class="title">{{headerTitle}}</h1>
      </div>
    </div>
    <scroll class="list" ref="list" :data="songList">
      <div class="music-list-wrapper">
        <div class="bg-image" :style="bgImg">
          <div class="filter"></div>
          <div class="text">
            <h2 class="list-title">{{singerName}}</h2>
          </div>
        </div>
        <div class="song-list-wrapper">
          <song-list :songs="songList" @select="selectItem" @selectAll="playAll"></song-list>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import {mapActions,mapGetters} from 'vuex'
  import {ERR_OK} from "../../common/js/config"
  import {getSongBySinger} from '../../api/song'
  import {creatSongList} from "../../common/classes/song";
  import Scroll from '../../base/scroll/scroll'
  import SongList from '../../base/song-list/song-list'
  import {playlistMixin} from '../../common/js/mixin'
  export default {
    mixins:[playlistMixin],
    data() {
      return {
        songList:[],
        headerTitle: '歌单',
      }
    },
    created() {
      this._initSingerDetail(this.singerInfo.id)
    },
    computed:{
      ...mapGetters([
        'singerInfo'
      ]),
      singerName(){
        if (!this.singerInfo.name) {
          return
        }
        return this.singerInfo.name
      },
      bgImg() {
        return `background-image:url(${this.singerInfo.bgImg})`
      }
    },
    components:{
      SongList,
      Scroll
    },
    methods:{
      ...mapActions([
        'selectPlay'
      ]),
      handlePlaylist (playlist) {
        const bottom = playlist.length > 0 ? '8%' : ''
        this.$refs.list.$el.style.bottom = bottom
        this.$refs.list.refresh()
      },
      _initSingerDetail(id){
        if (!id){
          this.$router.push('/home/singer')
          return
        }
        getSongBySinger(id).then((res) => {
          if(res.code === ERR_OK){
            this.songList = []
            this.songList = res.hotSongs.map((music)=>{
              return creatSongList(music)
            })
          }
        })
      },
      _back(){
        this.$router.back()
      },
      selectItem(item,index){
        this.selectPlay({
          list: this.songList,
          index: index
        })
      },
      playAll(){
        this.selectPlay({
          list: this.songList,
        })
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .singer-detail
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
        flex 0 0 50px;
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
</style>