<template>
    <scroll class="singer-item" :data="singers">
      <ul>
        <li class="item-list" v-for="(singer,index) in singers" @click.stop="selectItem(singer, index)">
          <div class="avatar">
            <img width="95%" height="95%" v-lazy="singer.avatar" />
          </div>
          <div class="content">
            <h2 class="name">{{singer.name}}</h2>
          </div>
        </li>
      </ul>
    </scroll>
</template>

<script>
  import Scroll from '../../base/scroll/scroll'
  export default {
    props:{
      singers:{
        type:Array,
        default:null
      }
    },
    methods:{
      selectItem (item, index) {
        this.$emit('selectItem', item, index)
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
  .singer-item
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: $color-background-white;
    .item-list
      display: flex;
      align-items: center;
      margin 1% 0
      .avatar
        flex 0 0 50px
        margin 0 1%
        text-align center
        color $color-text-black
        img
          border-radius 3px
      .content
        flex 1
        margin-left 1%
        height 50px
        overflow hidden
        border-bottom: 1px solid $color-line-gray
        .name
          no-wrap()
          width: 90%;
          height 50px
          line-height 50px
          font-size $font-size-small-x
          color $color-text-black
</style>
