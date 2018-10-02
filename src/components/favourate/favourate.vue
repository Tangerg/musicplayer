<template>
  <transition name="slide" mode="out-in">
    <div class="play-history">
      <div class="header">
        <div class="back" @click="_back">
          <i class="iconfont icon-left"></i>
        </div>
        <div class="text">
          <h1 class="title">{{headerTitle}}</h1>
        </div>
        <div class="clear" @click="showConfirm" v-show="favourateList.length">
          <h1 class="title">清空</h1>
        </div>
      </div>
      <scroll class="list" ref="list" :data="favourateList" v-show="favourateList.length">
        <div class="music-list-wrapper">
          <div class="song-list-wrapper">
            <song-list :songs="favourateList" @select="selectItem" @selectAll="playAll"></song-list>
          </div>
        </div>
      </scroll>
      <confirm ref="confirm" @confirm="clearFavoriteList" text="是否取消全部收藏？" confirmBtnText="是" cancelBtnText="否"></confirm>
      <div v-show="!favourateList.length" class="no-result">
        <no-result title="暂无收藏歌曲"></no-result>
      </div>
    </div>
  </transition>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  import NoResult from '../../base/no-result/no-result'
  import SongList from '../../base/song-list/song-list'
  import Scroll from '../../base/scroll/scroll'
  import Confirm from '../../base/confirm/confirm'
  import {playlistMixin} from '../../common/js/mixin'
  export default {
    mixins:[playlistMixin],
    data(){
      return{
        headerTitle:'我的收藏',
      }
    },
    computed:{
      ...mapGetters([
        'favourateList',
      ]),
    },
    methods:{
      ...mapActions([
        'selectPlay',
        'sequencePlay',
        'clearFavoriteList'
      ]),
      showConfirm () {
        this.$refs.confirm.show()
      },
      handlePlaylist (playlist) {
        const bottom = playlist.length > 0 ? '8%' : ''
        this.$refs.list.$el.style.bottom = bottom
        this.$refs.list.refresh()
      },
      _back(){
        this.$router.back()
      },
      selectItem(item,index){
        this.selectPlay({
          list: this.favourateList,
          index: index
        })
      },
      playAll(){
        this.sequencePlay({
          list: this.favourateList,
        })
      }
    },
    components:{
      NoResult,
      SongList,
      Scroll,
      Confirm
    }
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
  .play-history
    position fixed
    z-index: 100
    top 0
    left 0
    bottom 0
    right 0
    background $color-background-white
    .header
      background-color $color-background-red
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
      .clear
        flex 0 0 55px;
        text-align center
        color $color-text-white
    .list
      position fixed
      top 8%
      bottom 0
      width 100%
      .music-list-wrapper
        .song-list-wrapper
          position relative
    .no-result
      position fixed
      width 100%
      top 40%
      transform: translateY(-50%)
</style>
