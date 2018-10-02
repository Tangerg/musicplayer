<template>
  <transition name="list-fade">
    <div class="playlist" v-show="showFlag" @click="hide()">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="iconfont" :class="iconMode" @click="changeMode"></i>
            <span class="text" @click="changeMode">
              {{modeText}}
            </span>
            <span class="clear" @click="showConfirm">
              <i class="iconfont icon-lajitong1"></i>
            </span>
          </h1>
        </div>
        <scroll ref="listContent" class="list-content" :data="sequenceList">
          <transition-group name="list" tag="ul">
            <li class="item"
              ref="listItem"
              v-for="(item,index) in sequenceList"
              @click="selectItem(item,index)"
              :key="item.id">
              <i class="iconfont" :class="getCurrentIcon(item)"></i>
              <span class="text">{{item.name}}</span>
              <span class="delete" @click.stop="deleteOne(item)">
                <i class="iconfont icon-close"></i>
              </span>
            </li>
          </transition-group>
        </scroll>
        <div class="list-close" @click="hide()">
          <span>关闭</span>
        </div>
      </div>
      <confirm ref="confirm" @confirm="confirmClear" text="是否清空播放列表" confirmBtnText="清空"></confirm>
    </div>
  </transition>
</template>

<script>
import Scroll from '../../base/scroll/scroll'
import Confirm from '../../base/confirm/confirm'
import {mapGetters,mapMutations,mapActions} from 'vuex'
import {Mode} from '../../common/js/config'
import {shuffle} from '../../common/js/util'
export default {
  data(){
    return{
      showFlag:false
    }
  },
  computed:{
    ...mapGetters([
      'sequenceList',
      'playList',
      'currentSong',
      'playMode'
    ]),
    modeText() {
      if (this.playMode === Mode.sequence) {
        return '顺序播放'
      } else if (this.playMode === Mode.loop) {
        return '单曲循环'
      } else {
        return '随机播放'
      }
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
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!this.showFlag || newSong.id === oldSong.id) {
        return
      }
      setTimeout(() => {
        this.scrollToCurrent(newSong)
      }, 20)
    }
  },
  methods:{
    ...mapMutations({
      setCurrentIndex : 'SET_CURRENT_INDEX',
      setPlayingMode:'SET_PLAYING_MODE',
      setPlayList:'SET_PLAY_LIST'
    }),
    ...mapActions([
      'deleteSong',
      'deleteSongList'
    ]),

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
    confirmClear(){
      this.deleteSongList()
      this.hide()
    },
    showConfirm () {
      this.$refs.confirm.show()
    },
    deleteOne(item){
      this.deleteSong(item)
      if (!this.playList.length) {
        this.hide()
      }
    },
    scrollToCurrent(current){
      const index = this.sequenceList.findIndex((song) =>{
        return current.id === song.id
      })
      this.$refs.listContent.scrollToElement(this.$refs.listItem[index - 2],300)
    },
    selectItem(item,index){
      if (this.playMode === Mode.random){
        index = this.playList.findIndex((song) => {
          return song.id === item.id
        })
      }
      this.setCurrentIndex(index)
    },
    getCurrentIcon(item){
      if(this.currentSong.id ===item.id){
        return 'icon-volume'
      }
      return ''
    },
    show(){
      this.showFlag = true
      setTimeout(()=>{
        this.$refs.listContent.refresh()
        this.scrollToCurrent(this.currentSong)
      },20)
    },
    hide(){
      this.showFlag = false
    }
  },
  components: {
    Scroll,
    Confirm
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .playlist
     position: fixed;
     left: 0;
     right: 0;
     top: 0;
     bottom: 0;
     z-index: 200;
     background-color: rgba(0, 0, 0, 0.3);
     &.list-fade-enter-active, &.list-fade-leave-active
       transition: opacity 0.3s;
       .list-wrapper
         transition: all 0.3s;
     &.list-fade-enter, &.list-fade-leave-to
       opacity: 0;
       .list-wrapper
         transform: translate3d(0, 100%, 0);
     .list-wrapper
       position: absolute;
       left: 0;
       bottom: 0;
       width: 100%;
       border-radius: 8px;
       background-color: $color-background-white;
       .list-header
         position: relative;
         padding: 20px 3% 20px 5%
         .title
           display: flex;
           align-items: center;
           .iconfont
             margin-right: 10px;
             font-size: 20px;
             color: $color-text-black;
             .icon-suiji
               font-size 25px
             .icon-danquxunhuan, .icon-liebiaoxunhuan
               font-size 30px
           .text
             flex: 1;
             font-size: $font-size-medium;
             color: $color-text-black;
           .clear
             extend-click();
             font-size: $font-size-small;
             color: $color-text-black;
       .list-content
         max-height: 240px;
         overflow: hidden;
         .item
           display: flex;
           align-items: center;
           height: 40px;
           padding: 0 5%
           overflow: hidden;
           &.list-enter-active, &.list-leave-active
             transition: all 0.1s;
           &.list-enter, &.list-leave-to
             height: 0;
           .icon-volume
             color: $color-text-red;
             margin-right: 5px;
           .text
             flex: 1;
             no-wrap();
             line-height: 20px;
             font-size: $font-size-medium;
             color: $color-text-black;
           .delete
             extend-click();
             font-size: $font-size-small;
             color: $color-text-black;
       .list-close
         text-align: center;
         line-height: 50px;
         background: $color-background-white;
         font-size: $font-size-medium-x;
         color: $color-text-black;
</style>
