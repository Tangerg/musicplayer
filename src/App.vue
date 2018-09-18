<template>
  <div id="app">
    <Mheader></Mheader>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import Mheader from './components/m-header/m-header'
export default {
  components:{
    Mheader
  }
}
</script>

<style>
#app {
}
</style>
