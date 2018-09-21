<template>
  <div class="progress-bar" ref="progressBar"  @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
        @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend.prevent="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {prefixStyle} from '../../common/js/dom'
  const progressBtnWidth = 16
  const transform = prefixStyle('transform')

  export default {
    data () {
      return {
        newPercent: 0
      }
    },
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    created () {
      this.touch = {}
    },
    methods: {
      progressClick (e) {
        // 这个有 bug
        // this._offset(e.offsetX)
        const rect = this.$refs.progressBar.getBoundingClientRect()
        // rect.left 元素距离左边的距离
        // e.pageX 点击距离左边的距离
        const offsetWidth = e.pageX - rect.left
        // console.log(rect, e.pageX)
        this._offset(offsetWidth)
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const percent = this.$refs.progress.clientWidth / barWidth
        this.$emit('percentChangeEnd', percent)
      },
      progressTouchStart (e) {
        this.touch.initiated = true
        this.touch.startX = e.touches[0].pageX
        this.touch.left = this.$refs.progress.clientWidth
      },
      progressTouchMove (e) {
        if (!this.touch.initiated) {
          return
        }
        this._triggerPercent()
        const deltaX = e.touches[0].pageX - this.touch.startX
        const offsetWidth = Math.min(Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX)))
        this._offset(offsetWidth)
      },
      progressTouchEnd (e) {
        this.touch.initiated = false
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const percent = this.$refs.progress.clientWidth / barWidth
        this.$emit('percentChangeEnd', percent)
      },
      _triggerPercent () {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const percent = this.$refs.progress.clientWidth / barWidth
        this.$emit('percentChange', percent)
      },
      _offset (offsetWidth) {
        this.$refs.progress.style.width = `${offsetWidth}px`
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
      }
    },
    watch: {
      percent (newPercent) {
        if (newPercent >= 0 && !this.touch.initiated) {
          console.log(newPercent);
          const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
          const offsetWidth = newPercent * barWidth
          this._offset(offsetWidth)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .progress-bar
    height 30px
    padding 0 5px
    .bar-inner
      position relative
      top 14px
      height 2px
      background $color-line-gray-d
      .progress
        position absolute
        height 100%
        background $color-theme
      .progress-btn-wrapper
        position absolute
        left -5px
        top -6px
        width 15px
        height 15px
        .progress-btn
          position relative
          left 0
          box-sizing border-box
          width 15px
          height 15px
          border 5px solid $color-background-white
          border-radius 50%
          background $color-line-gray-d
</style>
