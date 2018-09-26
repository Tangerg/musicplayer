<template>
  <div class="suggest">
    <div class="search-suggest" >
      <p class="title">你可能感兴趣</p>
      <div class="search-suggest-item">
        <img src="http://p1.music.126.net/cnGpIQ6rQCKVrDyVVSpzeg==/3263350518850877.jpg" width="50" height="50">
        <span>歌手：林俊杰</span>
      </div>
      <div class="search-suggest-item">
        <img src="http://p1.music.126.net/wF9f--4Xa5Gm9nXamlWwEw==/109951163089450173.jpg" width="50" height="50">
        <div class="text">
          <p>歌单：林俊杰全部歌曲</p>
          <p class="singer">林俊杰</p>
        </div>
      </div>
    </div>
    <ul class="suggest-list" ref="suggestList" >
      <li class="suggest-item" v-for="(song,index) in songs" :key="index">
        <div class="icon">
          <i class="iconfont icon-yinle"></i>
        </div>
        <div class="name">
          <p class="song">{{song.name}}</p>
          <p class="singer">{{song.singer}} - {{song.album}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {getSearchSongs, getSearchSuggest, getSongDetail,getSearchSinger} from '../../api/search'
  import {ERR_OK} from "../../common/js/config";
  import {creatSong} from "../../common/classes/song";
  import {creatSinger} from "../../common/classes/singer";

  export default {
    props: {
      keyWorlds: {
        type: String,
        default: ''
      },
      showSinger: {
        type: Boolean,
        default: true
      },
      showList: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        singer: {},
        songs: [],
        songList:[],
        suggest: {},
        searchShow: true,
        page: 0,
        update: true,
        haveMore: true
      }
    },
    methods:{
      search(keyWorlds){
        this.searchShow = false
        this.haveMore = true
        getSearchSuggest(keyWorlds).then((res)=>{
          if(res.code === ERR_OK){
            this.songs = res.result.songs.map((music)=>{
              return creatSong(music)
            })
          }
        })
      },
      searchSong(keyWorlds,page){
        getSearchSongs(keyWorlds,page).then((res)=>{
          if(res.code === ERR_OK){
            this.songs = res.result.songs.map((music)=>{
              return creatSong(music)
            })
            console.log(this.songs)
          }
        })
      },
      searchSinger(keyWorlds){
        getSearchSinger(keyWorlds).then((res)=>{
          if(res.code === ERR_OK){
            let artists = res.result.artists[0]
            this.singer = creatSinger(artists)
          }
        })
      },
      searchList(keyWorlds){
        getSearchList(keyWorlds).then((res)=>{
          if(res.code === ERR_OK){
            this.songList = res.result.songs[0]
          }
        })
      }
    },
    watch: {
      keyWorlds (val) {
        this.searchSong(val,10)
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .suggest
    z-index 100
    height 100%
    overflow hidden
    margin 0 5%
    .search-suggest
      .title
        padding-bottom 5px
        color $color-text-gray-d
        font-size $font-size-medium
      .search-suggest-item
        display flex
        align-items center
        padding 10px 0
        border-bottom 1px solid $color-line-gray
        font-size $font-size-medium
        img
          flex 0 0 50px
          padding-right 15px
        .text
          width 100%
          display flex
          flex-direction column
          no-wrap()
          p
            padding 5px 0
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
          .singer
            font-size $font-size-small
            color $color-text-black
    .suggest-list
      padding-bottom 30px
      .suggest-item
        display flex
        height 50px
        align-items center
        .icon
          flex: 0 0 40px
          width: 30px
          font-size: 14px
          color: $color-text-gray-d
        .name
          flex 1
          font-size $font-size-medium
          color $color-text
          overflow hidden
          no-wrap()
          border-bottom 1px solid $color-line-gray
          .song
            height 30px
            line-height 30px
            font-size $font-size-medium
            color $color-text-black
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
          .singer
            height 20px
            font-size $font-size-small
            color $color-text-gray-d
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
</style>
