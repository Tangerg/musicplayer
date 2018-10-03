<template>
  <div class="suggest">
    <div class="search-suggest" v-show="!searchShow && keyWorlds && songs.length > 0">
      <p class="title">你可能感兴趣</p>
      <div class="search-suggest-item" v-show="!searchShow&&singer" @click="selectSinger(singer)">
        <img :src="singer.avatar" width="50" height="50">
        <span>歌手：{{singer.name}}</span>
      </div>
      <div class="search-suggest-item" v-show="!searchShow&&songList" @click="selectList(songList)">
        <img :src="songList.picUrl" width="50" height="50">
        <div class="text">
          <p>歌单：{{songList.name}}</p>
          <p class="singer">{{songList.trackCount}}首&nbsp;by&nbsp;{{songList.creator}}</p>
        </div>
      </div>
    </div>
    <ul class="suggest-list" ref="suggestList" v-show="!searchShow">
      <li class="suggest-item" v-for="(song,index) in songs" :key="index" @click="selectSong(song)">
        <div class="icon">
          <i class="iconfont icon-yinle"></i>
        </div>
        <div class="name">
          <p class="song">{{song.name}}</p>
          <p class="singer">{{song.singer}} - {{song.album}}</p>
        </div>
      </li>
      <loading v-show="haveMore && keyWorlds"></loading>
    </ul>
    <div v-show="!haveMore && !songs.length && keyWorlds" class="no-result-wrapper">
      <no-result title="暂无搜索结果"></no-result>
    </div>
  </div>
</template>

<script>
  import {getSearchSongs, getSongDetail,getSearchSinger,getSearchList} from '../../api/search'
  import {ERR_OK} from "../../common/js/config";
  import {creatSong} from "../../common/classes/song";
  import {creatSinger} from "../../common/classes/singer";
  import {createSearchMusicList} from "../../common/classes/musicList";
  import {mapMutations,mapActions} from 'vuex'
  import Loading from '../../base/loading/loading'
  import NoResult from '../../base/no-result/no-result'
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
      ...mapActions([
        'insertSong'
      ]),
      selectSinger(singer){
        this.setSingerInfo(singer)
        this.$router.push({
          path: `/search/singer/${singer.id}`
        })
      },
      selectList(list){
        this.setMusicList(list)
        this.$router.push({
          path: `/search/list/${list.id}`
        })
      },
      selectSong(song){
        getSongDetail(song.id).then((res) => {
          song.image = res.songs[0].al.picUrl
          this.insertSong(song)
        })
        this.$emit('select')
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
      searchMore () {
        this.isFirst = false
        if (!this.haveMore) {
          return
        }
        if (!this.songs.length) {
          return
        }
        this.searchSong(this.keyWorlds,this.page)
        this.page += 30
      },
      searchSong(keyWorlds,page){
        getSearchSongs(keyWorlds,page).then((res)=>{
          if (!res.result.songs) {
            this.haveMore = false
            return
          }
          if(res.code === ERR_OK){
            if(this.isFirst){
              this.page += 30
              this.songs = res.result.songs.map((music)=>{
                return creatSong(music)
              })
              if(this.songs.length<30){
                this.haveMore = false
              }
            }else if(!this.isFirst){
              let list = res.result.songs
              if (!res.result.songs) {
                this.haveMore = false
                return
              }
              let ret = []
              list.forEach((item) => {
                ret.push(creatSong(item))
              })
              this.songs = this.songs.concat(ret)
            }
          }
          this.$emit('refresh')
        })
      },
      searchSinger(keyWorlds){
        getSearchSinger(keyWorlds).then((res)=>{
          if(res.code === ERR_OK &&res.result.artistCount>0){
            let artists = res.result.artists[0]
            this.singer = creatSinger(artists)
          }
        })
      },
      searchList(keyWorlds){
        getSearchList(keyWorlds).then((res)=>{
          if(res.code === ERR_OK && res.result.playlistCount>0){
              let musicList = res.result.playlists[0]
              this.songList = createSearchMusicList(musicList)
          }
        })
      }
    },
    watch: {
      keyWorlds (val) {
        if (val === '') {
          this.songs = []
          this.haveMore = false
          return
        }
        this.singer={},
        this.isFirst=true,
        this.songList={},
        this.songs = []
        this.searchShow = true
        this.page = 0
        this.haveMore = true
        this.search(val)
      }
    },
    components:{
      Loading,
      NoResult
    }
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
    .no-result-wrapper
      position fixed
      overflow hidden
      left 50%
      top 40vh
      transform translatex(-50%)
      color $color-text-black
</style>
