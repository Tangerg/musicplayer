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
