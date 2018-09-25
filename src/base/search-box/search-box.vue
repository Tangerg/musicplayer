<template>
  <div class="search-box">
    <input :placeholder="placeholder" v-model="query" type="text" class="input-box">
    <i v-show="query" class="iconfont icon-close" @click="clear"></i>
  </div>
</template>

<script>
  import {debounce} from '../../common/js/util'

  export default {
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手'
      }
    },
    data () {
      return {
        query: '',
        clickInfo: '搜索'
      }
    },
    created () {
      this.$watch('query', debounce((newQuery) => {
        this.$emit('query', newQuery)
      }, 300))
    },
    methods: {
      clear () {
        this.query = ''
      },
      setQuery (query) {
        this.query = query
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .search-box
    position relative
    display flex
    align-items center
    width 95%
    height 90%
    border-bottom 1px solid rgba(255, 255, 255, 0.6)
    .input-box
      width 85%
      height 90%
      background $color-background-red
      color $color-background-white
      font-size $font-size-medium-x
      border none
      outline medium
      &::placeholder
        color rgba(255, 255, 255, 0.6)
    .icon-close
      position absolute
      right 1%
      color $color-background-white
      border none
</style>
