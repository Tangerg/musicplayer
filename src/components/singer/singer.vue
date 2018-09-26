<template>
  <div>
    <scroll class="singer-container" ref="scroll">
      <div>
        <div class="singer-category">
          <span class="empty-line"></span>
          <span class="singer-features"@click="clickCategory(1001)">
            华语男歌手
          </span>
          <span class="singer-features"@click="clickCategory(1002)">
            华语女歌手
          </span>
          <span class="singer-features"@click="clickCategory(1003)">
            华语乐队/组合
          </span>
        </div>
        <div class="singer-category">
          <span class="empty-line"></span>
          <span class="singer-features"@click="clickCategory(2001)">
            欧美男歌手
          </span>
          <span class="singer-features"@click="clickCategory(2002)">
            欧美女歌手
          </span>
          <span class="singer-features"@click="clickCategory(2003)">
            欧美乐队/组合
          </span>
        </div>
        <div class="singer-category">
          <span class="empty-line"></span>
          <span class="singer-features"@click="clickCategory(6001)">
            日本男歌手
          </span>
          <span class="singer-features"@click="clickCategory(6002)">
            日本女歌手
          </span>
          <span class="singer-features"@click="clickCategory(6003)">
            日本乐队/组合
          </span>
        </div>
        <div class="singer-category">
          <span class="empty-line"></span>
          <span class="singer-features"@click="clickCategory(7001)">
            韩国男歌手
          </span>
          <span class="singer-features"@click="clickCategory(7002)">
            韩国女歌手
          </span>
          <span class="singer-features"@click="clickCategory(7003)">
            韩国乐队/组合
          </span>
        </div>
        <div class="singer-category">
          <span class="empty-line"></span>
          <span class="singer-features"@click="clickCategory(4001)">
            其他男歌手
          </span>
          <span class="singer-features"@click="clickCategory(4002)">
            其他女歌手
          </span>
          <span class="singer-features"@click="clickCategory(4003)">
            其他乐队/组合
          </span>
        </div>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import Scroll from '../../base/scroll/scroll'
  import {playlistMixin} from '../../common/js/mixin'
    export default {
      mixins:[playlistMixin],
      methods:{
        ...mapMutations({
          setSingerCategory: 'SET_SINGER_CATEGORY',
        }),
        handlePlaylist (playlist) {
          const bottom = playlist.length > 0 ? '8%' : ''
          this.$refs.scroll.$el.style.bottom = bottom
          this.$refs.scroll.refresh()
        },
        clickCategory(category){
          this.setSingerCategory(category)
          this.$router.push({
            path: '/home/singer/list'
          })
        }
      },
      components:{
        Scroll
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .singer-container
    position fixed
    top 95px
    width 100%
    max-height 100%
    bottom 0
    z-index -10
    overflow hidden
    .singer-category
      display flex
      flex-direction column
      align-items center
      text-align left
      .empty-line
        width 100%
        background-color $color-background-gray-d
        height 15px
      .singer-features
        padding-left 10%
        width 100%
        height 45px
        line-height 45px
        border-bottom 1px solid $color-background-gray-d
        font-size: $font-size-medium
</style>
