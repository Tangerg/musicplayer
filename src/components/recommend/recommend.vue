<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="recommendlist&&recommendsong">
      <div>
        <div class="background-red"></div>
        <div v-if="banners.length" class="slider-wrapper">
          <slider>
            <div v-for="banner in banners" :key="banner.id" class="slider-item">
              <img @load="loadImage" :src="banner.picUrl">
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">
            推荐歌单
            <i class="iconfont icon-iconfontqianjin-copy"></i>
          </h1>
          <ul class="items">
            <li v-for="songList in recommendlist" :key="songList.id" class="item" @click="_chickList(songList)">
              <div class="icon">
                <div class="gradients"></div>
                <img @load="loadImage" :src="songList.picUrl" alt="">
              </div>
              <p class="play-count">
                <i class="iconfont icon-customer"></i>
                <span>{{Math.floor(songList.playCount / 10000)}}万</span>
              </p>
              <div class="text">
                {{songList.name}}
              </div>
            </li>
          </ul>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">
            推荐歌曲
            <i class="iconfont icon-iconfontqianjin-copy"></i>
          </h1>
          <ul  class="items">
            <li v-for="song in recommendsong" :key="song.id" class="item" >
              <div class="icon">
                <img @load="loadImage" :src="song.song.album.picUrl" alt="">
              </div>
              <div class="song-singer">
                <span class="song">{{song.name}}</span>
                <span class="singer">{{song.song.artists[0].name}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import Scroll from '../../base/scroll/scroll'
  import Slider from '../../base/slider/slider'
  import {getBanner,getRecommendList,getRecommendSong} from '../../api/recommend'
  import {ERR_OK} from "../../common/js/config"
  import {playlistMixin} from '../../common/js/mixin'
  export default {
    mixins:[playlistMixin],
    data(){
      return{
        banners:[],
        recommendlist: [],
        recommendsong: []
      }
    },
    created (){
      this._initBanner()
      this._initRecommendList()
      this._initRecommendSong()
    },
    methods:{
      ...mapMutations({
        setMuiscList: 'SET_MUSIC_LIST',
      }),
      handlePlaylist (playlist) {
        const bottom = playlist.length > 0 ? '8%' : ''
        this.$refs.recommend.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true
          this.$refs.scroll.refresh()
        }
      },
      _initBanner(){
        getBanner().then((res) => {
          if(res.code === ERR_OK){
            this.banners = res.banners
          }
        })
      },
      _initRecommendList(){
        getRecommendList().then((res) => {
          if(res.code === ERR_OK){
            this.recommendlist = res.result
          }
        })
      },
      _initRecommendSong(){
        getRecommendSong().then((res) => {
          if(res.code === ERR_OK){
            this.recommendsong = res.result
          }
        })
      },
      _chickList(songList){
        this.setMuiscList(songList)
        this.$router.push({
          path: `/home/recommend/${songList.id}`
        })

      }
    },
    components:{
      Slider,
      Scroll
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .recommend
    position fixed
    top 85px
    width 100%
    bottom 0
    z-index 100
    .recommend-content
      overflow hidden
      width 100%
      height 100%
      .background-red
        position absolute
        top -30vh
        z-index -10
        background $color-background-red
        width 100%
        height 50vh
        vertical-align inherit
      .slider-wrapper
        width 96%
        margin 0 auto
        border-radius 3px
        overflow hidden
        .slider
          min-height 1px
          position relative
          .slider-item
            width 100%
            box-sizing border-box
            overflow hidden
            text-align center
          img
            display block
            width 100%
      .recommend-list
        position relative
        box-sizing border-box
        width 100%
        text-align center
        .list-title
          height 50px
          line-height 50px
          padding-left 1.5%
          text-align left
          font-size $font-size-medium
          font-weight bold
          color $color-text-black
          .iconfont
            font-size $font-size-small
        .items
          padding 0 1%
          .item
            padding 0 0.6%
            display inline-block
            position relative
            box-sizing: border-box
            width 33%
            .icon
              position relative
              display inline-block
              width 100%
              margin-bottom 5px
              .gradients
                position absolute
                top 0
                width 100%
                height 35px
                border-radius 3px
                background linear-gradient(rgba(109, 109, 109, 0.4),rgba(255, 255, 255, 0))
              img
                width 100%
                height 100%
                border-radius 3px
            .play-count
              position absolute
              top 2%
              right 2%
              font-size $font-size-small-s
              color $color-text-white
              .iconfont
                font-size $font-size-small-s
            .text
              float left
              line-height 16px
              text-align left
              height 40px
              overflow hidden
              font-size $font-size-small
              font-weight bold
              color $color-text-black
              padding-bottom 15px
            .song-singer
              display flex
              flex-direction column
              .song
                text-align left
                text-overflow ellipsis
                overflow hidden
                white-space nowrap
                font-size $font-size-small
                font-weight bold
                color $color-text-black
              .singer
                text-align left
                text-overflow ellipsis
                overflow hidden
                white-space nowrap
                font-size $font-size-small-s
                color $color-text-black
                padding-bottom 5px
</style>
