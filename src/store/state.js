import {Mode} from '../common/js/config'
import {loadSearch, loadPlay, loadFavorite} from '../common/js/cache'
const state = {
  singerCategory: 0,
  singerInfo:{},
  recommendList:[],
  musicList: {},
  playList:[],
  rankList:{},
  sequenceList:[],
  isPlaying: true,
  fullScreen:false,
  currentIndex:-1,
  playMode:Mode.sequence,
  searchHistory:loadSearch(),
  playHistory:loadPlay(),
  favourate:loadFavorite(),
}

export default state
