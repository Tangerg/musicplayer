import Vue from 'vue'
import Router from 'vue-router'
import MV from '../components/mv/mv'
import Music from '../components/music/music'
import Search from '../components/search/search'
import Home from '../components/home/home'
import Recommend from '../components/recommend/recommend'
import Singer from '../components/singer/singer'
import Rank from '../components/rank/rank'
import RankDetail from '../components/rank-detail/rank-detail'
import MusicList from '../components/music-list/music-list'
import SingerList from '../components/singer-list/singer-list'
import SingerDetail from '../components/singer-detail/singer-detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home/'
    },
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
          component:Singer,
          children:[
            {
              path:'/home/singer/list',
              component:SingerList,
            },
            {
              path:':id',
              component:SingerDetail,
            },
          ]
        },
        {
          path:'/home/rank',
          component:Rank,
          children:[{
            path:':id',
            component:RankDetail
          }]
        }
      ]
    },
    {
      path :'/search',
      component:Search,
      children:[
        {
          path:'singer/:id',
          component:SingerDetail
        },
        {
        path:'list/:id',
        component:MusicList
        }
      ]
    }
  ]
})
