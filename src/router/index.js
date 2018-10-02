import Vue from 'vue'
import Router from 'vue-router'
/*
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
import PlayHistory from '../components/play-history/play-history'
import Favourate from '../components/favourate/favourate'
*/

Vue.use(Router)

const MV = (resolve) => {
  import('../components/mv/mv').then((module) => {
    resolve(module)
  })
}
const Music = (resolve) => {
  import('../components/music/music').then((module) => {
    resolve(module)
  })
}
const Search = (resolve) => {
  import('../components/search/search').then((module) => {
    resolve(module)
  })
}
const Home = (resolve) => {
  import('../components/home/home').then((module) => {
    resolve(module)
  })
}
const Recommend = (resolve) => {
  import('../components/recommend/recommend').then((module) => {
    resolve(module)
  })
}
const Singer = (resolve) => {
  import('../components/singer/singer').then((module) => {
    resolve(module)
  })
}
const Rank = (resolve) => {
  import('../components/rank/rank').then((module) => {
    resolve(module)
  })
}
const RankDetail = (resolve) => {
  import('../components/rank-detail/rank-detail').then((module) => {
    resolve(module)
  })
}
const MusicList = (resolve) => {
  import('../components/music-list/music-list').then((module) => {
    resolve(module)
  })
}
const SingerList = (resolve) => {
  import('../components/singer-list/singer-list').then((module) => {
    resolve(module)
  })
}
const SingerDetail = (resolve) => {
  import('../components/singer-detail/singer-detail').then((module) => {
    resolve(module)
  })
}
const PlayHistory = (resolve) => {
  import('../components/play-history/play-history').then((module) => {
    resolve(module)
  })
}
const Favourate = (resolve) => {
  import('../components/favourate/favourate').then((module) => {
    resolve(module)
  })
}

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
      component:Music,
      children:[
        {
          path:'/music/history',
          component:PlayHistory
        },
        {
          path:'/music/favourate',
          component:Favourate
        }
      ]
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
