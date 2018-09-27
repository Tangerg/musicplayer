<template>
  <div class="suggest">
    <div class="search-suggest" >
      <p class="title">你可能感兴趣</p>
      <div class="search-suggest-item" v-show="this.singer" @click="selectSinger">
        <img :src="this.singer.avatar" width="50" height="50">
        <span>歌手：{{this.singer.name}}</span>
      </div>
      <div class="search-suggest-item" v-show="this.songList" @click="selectList">
        <img :src="this.songList.picUrl" width="50" height="50">
        <div class="text">
          <p>歌单：{{this.songList.name}}</p>
          <p class="singer">{{this.songList.trackCount}}首&nbsp;by&nbsp;{{this.songList.creator}}</p>
        </div>
      </div>
    </div>
    <ul class="suggest-list" ref="suggestList">
      <li class="suggest-item" v-for="(song,index) in songs" :key="index" @click="selectSong">
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
  import {getSearchSongs, getSearchSuggest, getSongDetail,getSearchSinger,getSearchList} from '../../api/search'
  import {ERR_OK} from "../../common/js/config";
  import {creatSong} from "../../common/classes/song";
  import {creatSinger} from "../../common/classes/singer";
  import {createSearchMusicList} from "../../common/classes/musicList";
  import {mapMutations} from 'vuex'
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
        isFirst:false,
        songList:{},
        searchShow: true,
        page: 0,
        haveMore: true,
      }
    },
    methods:{
      ...mapMutations({
        setSingerInfo:'SET_SINGER_INFO',
        setMusicList:'SET_MUSIC_LIST'
      }),
      selectSinger(){
        this.setSingerInfo(this.singer)
        this.$router.push({
          path: `/home/singer/${this.singer.id}`
        })
      },
      selectList(){
        this.setMusicList(this.songList)
        this.$router.push({
          path: `/home/recommend/${this.songList.id}`
        })
      },
      selectSong(){

      },
      listScroll() {
        this.$emit('listScroll')
      },
      search(keyWorlds){
        this.searchShow = false
        this.haveMore = true
        this.page = 0
        this.isFirst = true
        this.searchSong(keyWorlds,this.page)
        this.searchSinger(keyWorlds)
        this.searchList(keyWorlds)
      },
      searchMore(){
        this.searchShow = false
        this.haveMore = true
        this.page += 30
        this.isFirst = false
        this.searchSong(this.keyWorlds,this.page)
        console.log(searchMore)
        this.$emit('refresh')
      },
      searchSong(keyWorlds,page){
        getSearchSongs(keyWorlds,page).then((res)=>{
          if (!res.result.songs) {
            this.haveMore = false
            return
          }
          if(res.code === ERR_OK){
            if(this.isFirst){
              this.songs = res.result.songs.map((music)=>{
                return creatSong(music)
              })
            }else if(!this.isFirst){
              let ret = []
              ret = res.result.songs.map((music)=>{
                return creatSong(music)
              })
              this.songs = this.songs.concat(ret)
            }
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
            let musicList = res.result.playlists[0]
            this.songList = createSearchMusicList(musicList)
          }
        })
      }
    },
    watch: {
      keyWorlds (val) {
        this.search(val)
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
