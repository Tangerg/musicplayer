<template>
  <transition name="list-fade">
    <div class="singer-list">
      <div class="header">
        <div class="back" @click="_back">
          <i class="iconfont icon-left"></i>
        </div>
        <div class="text">
          <h1 class="title">{{title}}</h1>
        </div>
        <div class="filter">筛选</div>
      </div>
      <div class="container" ref="container">
          <singer-item :singers="singerDetail" @selectItem="selectSinger" ref="singer-item"></singer-item>
      </div>
      <div v-show="!singerDetail.length" class="loading-content">
        <loading></loading>
      </div>
    </div>
  </transition>
</template>

<script>
  import SingerItem from '../../base/singer-item/singer-item'
  import {mapGetters,mapMutations} from 'vuex'
  import {getSinger} from '../../api/singer'
  import {ERR_OK} from "../../common/js/config";
  import {creatSinger} from '../../common/classes/singer'
  import Scroll from '../../base/scroll/scroll'
  import Loading from '../../base/loading/loading'
  /*import {playlistMixin} from '../../common/js/mixin'*/
  export default {
    /*mixins:[playlistMixin],*/
    data(){
      return {
        singerDetail:[]
      }
    },
    created (){
      this._initSingerList(this.singerCategory)
    },
    computed:{
      ...mapGetters([
        'singerCategory',
      ]),
      title(){
        if(this.singerCategory === 1001){
          return '华语男歌手'
        }else if(this.singerCategory === 1002){
          return '华语女歌手'
        }else if(this.singerCategory === 1003){
          return '华语组合/乐队'
        }else if(this.singerCategory === 2001){
          return '欧美男歌手'
        }else if(this.singerCategory === 2002){
          return '欧美女歌手'
        }else if(this.singerCategory === 2003){
          return '欧美组合/乐队'
        }else if(this.singerCategory === 6001){
          return '日本男歌手'
        }else if(this.singerCategory === 6002){
          return '日本女歌手'
        }else if(this.singerCategory === 6003){
          return '日本组合/乐队'
        }else if(this.singerCategory === 7001){
          return '韩国男歌手'
        }else if(this.singerCategory === 7002){
          return '韩国女歌手'
        }else if(this.singerCategory === 7003){
          return '韩国组合/乐队'
        }else if(this.singerCategory === 4001){
          return '其他男歌手'
        }else if(this.singerCategory === 4002){
          return '其他女歌手'
        }else if(this.singerCategory === 4003){
          return '其他组合/乐队'
        }
      }
    },
    methods:{
      ...mapMutations({
        setSingerInfo:'SET_SINGER_INFO'
      }),
      _back(){
        this.$router.back()
      },
      _initSingerList(category){
        if (!category){
          this.$router.push('/home/singer')
          return
        }
        getSinger(category).then((res) => {
          if(res.code === ERR_OK){
            this.singerDetail = res.artists.map((singer)=>{
              return creatSinger(singer)
            })
          }
        })
      },
      selectSinger(item,index){
        this.setSingerInfo(item)
        this.$router.push({
          path: `/home/singer/${item.id}`
        })
      }
    },
    components:{
      SingerItem,
      Scroll,
      Loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  &.list-fade-enter-active, &.list-fade-leave-active
    transition: all 0.3s
  &.list-fade-enter, &.list-fade-leave-to
    opacity: 0
  .singer-list
    position fixed
    z-index: 100
    top 0
    left 0
    bottom 0
    right 0
    background $color-background-white
    .header
      position relative
      display flex
      align-items center
      box-sizing border-box
      height 8%
      z-index 100
      background-color $color-background-red
      .back
        flex 0 0 50px;
        text-align center
        color $color-text-white
        .icon-left
          font-size 22px
      .text
        color $color-text-white
        flex 1
        height 45px
        line-height 45px
        .title
          font-size $font-size-medium
      .filter
        flex 0 0 60px;
        text-align center
        font-size $font-size-small-x
        color $color-text-white
    .container
      overflow hidden
      width 100%
      height 100%
    .loading-content
      position fixed
      width 100%
      top 50%
      transform: translateY(-50%)
</style>
