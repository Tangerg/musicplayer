<template>
  <div class="rank-container" ref="rank">
    <scroll class="toplist" ref="scroll">
      <ul>
        <li class="item" v-for="item in rankList" :key="item.id" @click="selectItem(item)">
          <div class="icon">
            <img v-lazy="item.coverImgUrl" width="100" height="100">
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song, index) in item.topthree" :key="index">
              <span>{{index + 1}}.</span>
              <span>{{song.name}} - {{song.ar[0].name}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getRankList} from '../../api/rank'
  import Scroll from '../../base/scroll/scroll'
  import {ERR_OK} from "../../common/js/config";
  import {playlistMixin} from '../../common/js/mixin'
  import {mapMutations} from 'vuex'

  const TOP_CAT_ID = [0, 1, 2, 3, 4, 22, 23]
  export default {
    mixins:[playlistMixin],

    data(){
      return{
        rankList:[]
      }
    },
    created(){
      this._initRank()
    },
    methods:{
      ...mapMutations({
        setRankList:'SET_RANK_LIST'
      }),
      handlePlaylist (playlist) {
        const bottom = playlist.length > 0 ? '8%' : ''
        this.$refs.rank.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      _initRank(){
        let j = TOP_CAT_ID.length
        for(let i = 0 ; i < j ; i++){
          let id = TOP_CAT_ID[i]
          getRankList(id).then((res)=>{
            if(res.code === ERR_OK){
              let list = res.playlist
              list.topthree = res.playlist.tracks.slice(0, 3)
              this.rankList.push(list)
            }
          })
        }
      },
      selectItem(item){
        this.setRankList(item)
        this.$router.push({
          path: `/home/rank/${item.id}`
        })
      },
    },
     components:{
       Scroll
     }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .rank-container
    position fixed
    top 95px
    width 100%
    bottom 0
    z-index 100
    .toplist
      height 100%
      overflow hidden
      .item
        display flex
        margin 1% 3% 0 3%
        height 100px
        .icon
          flex 0 0 100px
          width 100px
          height 100px
          img
            border-radius 3px
        .songlist
          flex 1
          display flex
          flex-direction column
          justify-content center
          margin-left 3%
          height 100px
          overflow hidden
          color $color-text-black
          font-size $font-size-small-x
          border-bottom 1px solid $color-line-gray
          .song
            no-wrap()
            line-height 30px
</style>
