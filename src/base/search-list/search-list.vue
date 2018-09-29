<template>
  <div class="search-list">
    <ul>
      <li class="search-item" @click="selectItem(item)" v-for="(item,index) in searches" :key="index">
        <span class="text">{{item}}</span>
        <span class="icon" @click.stop="deleteOne(item)">
          <i class="iconfont icon-close"></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      searches: {
        type: Array
      }
    },
    methods: {
      selectItem (item) {
        this.$emit('select', item)
      },
      deleteOne (item) {
        this.$emit('delete', item)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .search-list
    .search-item
      display flex
      align-items center
      height 35px
      line-height 35px
      overflow hidden
      font-size 14px
      .text
        flex 1
        color $color-text
      .icon
        include extend-click()
        .icon-close
          font-size $font-size-medium-x
          color $color-text-gray-d
</style>
