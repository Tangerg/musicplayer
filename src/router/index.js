import Vue from 'vue'
import Router from 'vue-router'
import MV from '../components/mv/mv'
import Music from '../components/music/music'
import Home from '../components/home/home'
import Recommend from '../components/recommend/recommend'
import Singer from '../components/singer/singer'
import Rank from '../components/rank/rank'
import MusicList from '../components/music-list/music-list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path :'/mv',
      component:MV
    },
    {
      path :'/music',
      component:Music
    },
    {
      path :'/home',
      component:Home,
      children:[
        {
          path: '/',
          redirect: '/home/recommend'
        },
        {
          path:'/home/recommend',
          component:Recommend,
          children:[{
            path:':id',
            component:MusicList
          }]
        },
        {
          path:'/home/singer',
          component:Singer
        },
        {
          path:'/home/rank',
          component:Rank
        }
      ]
    }
  ]
})
