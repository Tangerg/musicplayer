<template>
  <div id="app">
    <Mheader></Mheader>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Mplayer></Mplayer>
  </div>
</template>

<script>
  import Mheader from './components/m-header/m-header'
  import Mplayer from './components/m-player/m-player'
export default {
  data () {
    return {
      stop: false
    }
  },
  mounted () {
    let m = document.querySelector('#app')
    m.addEventListener('touchend', this.firstPlay)
  },
  methods: {
    firstPlay () {
      let music = document.querySelector('#music-audio')
      music.play()
      if (music.src !== '') {
        this.stop = true
      }
    }
  },
  watch: {
    stop () {
      let m = document.querySelector('#app')
      m.removeEventListener('touchend', this.firstPlay)
    }
  },
  components:{
    Mplayer,
    Mheader
  }
}
</script>

<style>
#app {
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
